import type {
  AdminStats,
  CreateOrderInput,
  OrderDto,
  OrderStatus,
  Paginated,
  PaymentStatus,
} from '../../../shared/api';
import { pool } from '../db/pool';
import { menuRepository } from '../repositories/menuRepository';
import {
  orderRepository,
  toOrderDto,
} from '../repositories/orderRepository';
import type { AuthUser, OrderItemRecord, OrderRecord } from '../types/domain';
import { ApiError } from '../utils/ApiError';
import { roundMoney } from '../utils/sanitize';
import { paymentService } from './paymentService';

const groupItems = (
  orders: OrderRecord[],
  items: OrderItemRecord[],
): OrderDto[] => {
  const grouped = new Map<number, OrderItemRecord[]>();
  for (const item of items) {
    const bucket = grouped.get(item.orderId);
    if (bucket) {
      bucket.push(item);
    } else {
      grouped.set(item.orderId, [item]);
    }
  }
  return orders.map((order) => toOrderDto(order, grouped.get(order.id) ?? []));
};

const loadOrderDto = async (orderId: number): Promise<OrderDto> => {
  const [order, items] = await Promise.all([
    orderRepository.findById(orderId),
    orderRepository.findItemsByOrderId(orderId),
  ]);
  if (!order) throw ApiError.notFound('الطلب غير موجود');
  return toOrderDto(order, items);
};

export const orderService = {
  async create(userId: number, input: CreateOrderInput): Promise<OrderDto> {
    const quantities = new Map<number, number>();
    for (const item of input.items) {
      quantities.set(
        item.menuItemId,
        (quantities.get(item.menuItemId) ?? 0) + item.quantity,
      );
    }

    const menuItemIds = [...quantities.keys()];
    const connection = await pool.getConnection();
    let orderId = 0;

    try {
      await connection.beginTransaction();

      const menuItems = await menuRepository.findByIds(menuItemIds, connection);
      const menuById = new Map(menuItems.map((item) => [item.id, item]));

      const validatedItems: {
        menuItemId: number;
        quantity: number;
        price: number;
      }[] = [];
      let totalAmount = 0;

      for (const menuItemId of menuItemIds) {
        const menuItem = menuById.get(menuItemId);
        if (!menuItem) {
          throw ApiError.badRequest(`الصنف رقم ${menuItemId} غير موجود`);
        }
        if (!menuItem.isAvailable) {
          throw ApiError.badRequest(`الصنف "${menuItem.name}" غير متوفر حالياً`);
        }

        const quantity = quantities.get(menuItemId) ?? 0;
        const lineTotal = roundMoney(menuItem.price * quantity);
        totalAmount = roundMoney(totalAmount + lineTotal);
        validatedItems.push({
          menuItemId,
          quantity,
          price: menuItem.price,
        });
      }

      const paymentMethod = input.paymentMethod ?? 'ONLINE';
      orderId = await orderRepository.insertOrder(connection, {
        userId,
        totalAmount,
        deliveryAddress: input.deliveryAddress,
        paymentMethod,
        notes: input.notes?.trim() || null,
      });

      for (const item of validatedItems) {
        await orderRepository.insertOrderItem(connection, {
          orderId,
          menuItemId: item.menuItemId,
          quantity: item.quantity,
          priceAtPurchase: item.price,
        });
      }

      await connection.commit();
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }

    try {
      await paymentService.createInvoiceForOrder(orderId);
    } catch (error) {
      if (error instanceof ApiError && error.statusCode === 503) {
        console.warn('Payment gateway unavailable:', error.message);
      } else {
        console.error('Payment invoice could not be generated:', error);
      }
    }

    return loadOrderDto(orderId);
  },

  async listForUser(
    userId: number,
    page: { page: number; limit: number; offset: number },
    status?: OrderStatus,
  ): Promise<Paginated<OrderDto>> {
    const { orders, total } = await orderRepository.list(
      { userId, status },
      { limit: page.limit, offset: page.offset },
    );
    const items = await orderRepository.findItemsByOrderIds(
      orders.map((order) => order.id),
    );
    return {
      items: groupItems(orders, items),
      pagination: {
        page: page.page,
        limit: page.limit,
        total,
        totalPages: Math.ceil(total / page.limit),
      },
    };
  },

  async listAll(
    page: { page: number; limit: number; offset: number },
    filters: { status?: OrderStatus; paymentStatus?: PaymentStatus },
  ): Promise<Paginated<OrderDto>> {
    const { orders, total } = await orderRepository.list(filters, {
      limit: page.limit,
      offset: page.offset,
    });
    const items = await orderRepository.findItemsByOrderIds(
      orders.map((order) => order.id),
    );
    return {
      items: groupItems(orders, items),
      pagination: {
        page: page.page,
        limit: page.limit,
        total,
        totalPages: Math.ceil(total / page.limit),
      },
    };
  },

  async getById(orderId: number, user: AuthUser): Promise<OrderDto> {
    const order = await orderRepository.findById(orderId);
    if (!order) throw ApiError.notFound('الطلب غير موجود');
    if (user.role !== 'admin' && order.userId !== user.id) {
      throw ApiError.forbidden('لا يمكنك عرض طلب لا يخصك');
    }
    const items = await orderRepository.findItemsByOrderId(orderId);
    return toOrderDto(order, items);
  },

  async updateStatus(orderId: number, status: OrderStatus): Promise<OrderDto> {
    const order = await orderRepository.findById(orderId);
    if (!order) throw ApiError.notFound('الطلب غير موجود');
    await orderRepository.updateOrderStatus(orderId, status);
    return loadOrderDto(orderId);
  },

  async getStats(): Promise<AdminStats> {
    return orderRepository.getStats();
  },

  async listKitchen(
    page: { page: number; limit: number; offset: number },
  ): Promise<Paginated<OrderDto>> {
    const { orders, total } = await orderRepository.list(
      { userId: undefined, status: ['PENDING', 'PREPARING'] },
      page,
    );
    const items = await orderRepository.findItemsByOrderIds(
      orders.map((order) => order.id),
    );
    return {
      items: groupItems(orders, items),
      pagination: {
        page: page.page,
        limit: page.limit,
        total,
        totalPages: Math.ceil(total / page.limit),
      },
    };
  },

  async listCashier(
    page: { page: number; limit: number; offset: number },
  ): Promise<Paginated<OrderDto>> {
    const { orders, total } = await orderRepository.list(
      { userId: undefined, status: ['READY'] },
      page,
    );
    const items = await orderRepository.findItemsByOrderIds(
      orders.map((order) => order.id),
    );
    return {
      items: groupItems(orders, items),
      pagination: {
        page: page.page,
        limit: page.limit,
        total,
        totalPages: Math.ceil(total / page.limit),
      },
    };
  },
};
