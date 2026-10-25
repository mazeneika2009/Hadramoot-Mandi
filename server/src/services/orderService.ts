import type {
  AdminStats,
  CreateOrderInput,
  DeliveryDriverDto,
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
import { userRepository } from '../repositories/userRepository';
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
    const canView =
      user.role === 'admin' ||
      order.userId === user.id ||
      (user.role === 'delivery' && order.deliveryUserId === user.id);
    if (!canView) {
      throw ApiError.forbidden('لا يمكنك عرض طلب لا يخصك');
    }
    const items = await orderRepository.findItemsByOrderId(orderId);
    return toOrderDto(order, items);
  },

  async updateStatus(
    orderId: number,
    status: OrderStatus,
    actor: AuthUser,
  ): Promise<OrderDto> {
    const order = await orderRepository.findById(orderId);
    if (!order) throw ApiError.notFound('الطلب غير موجود');

    if (order.orderStatus === 'DELIVERED' || order.orderStatus === 'CANCELLED') {
      throw ApiError.conflict('لا يمكن تعديل طلب مكتمل أو ملغي');
    }

    if (actor.role === 'kitchen') {
      if (status === 'PREPARING' && order.orderStatus === 'PENDING') {
        // valid
      } else if (
        status === 'READY' &&
        (order.orderStatus === 'PENDING' || order.orderStatus === 'PREPARING')
      ) {
        // valid
      } else {
        throw ApiError.forbidden(
          'يمكن للمطبخ تحويل الطلب إلى "قيد التحضير" أو "جاهز" فقط',
        );
      }
    } else if (actor.role === 'cashier' || actor.role === 'delivery') {
      throw ApiError.forbidden(
        'تحديث هذه الحالة يتم من خلال شاشة التوصيل المخصصة',
      );
    }

    // Dispatch and delivery completion must go through the dedicated
    // endpoints so a driver is always assigned and payment is recorded.
    if (status === 'OUT_FOR_DELIVERY' || status === 'DELIVERED') {
      throw ApiError.forbidden(
        'إسناد التوصيل وتأكيد التسليم يتمان من شاشتي الكاشير والتوصيل',
      );
    }

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

  async listDrivers(): Promise<DeliveryDriverDto[]> {
    const drivers = await userRepository.listApprovedByRole('delivery');
    return drivers.map((driver) => ({
      id: driver.id,
      name: driver.name,
      email: driver.email,
      phone: driver.phone,
    }));
  },

  async listForDelivery(
    page: { page: number; limit: number; offset: number },
    actor: AuthUser,
  ): Promise<Paginated<OrderDto>> {
    const { orders, total } = await orderRepository.list(
      {
        status: ['OUT_FOR_DELIVERY'],
        deliveryUserId: actor.role === 'delivery' ? actor.id : undefined,
      },
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

  async dispatch(
    orderId: number,
    deliveryUserId: number,
    actor: AuthUser,
  ): Promise<OrderDto> {
    if (actor.role !== 'cashier' && actor.role !== 'admin') {
      throw ApiError.forbidden('هذه العملية مخصصة للكاشير');
    }

    const order = await orderRepository.findById(orderId);
    if (!order) throw ApiError.notFound('الطلب غير موجود');
    if (order.orderStatus !== 'READY') {
      throw ApiError.conflict('لا يمكن إسناد الطلب قبل أن يصبح جاهزاً');
    }

    const driver = await userRepository.findById(deliveryUserId);
    if (!driver || driver.role !== 'delivery' || !driver.isApproved) {
      throw ApiError.badRequest('سائق التوصيل المحدد غير متاح');
    }

    const dispatched = await orderRepository.dispatchToDriver(
      orderId,
      deliveryUserId,
    );
    if (!dispatched) {
      throw ApiError.conflict(
        'تم تحديث هذا الطلب من قبل موظف آخر، يرجى إعادة التحميل',
      );
    }
    return loadOrderDto(orderId);
  },

  async confirmDelivery(
    orderId: number,
    cashReceived: number | undefined,
    actor: AuthUser,
  ): Promise<OrderDto> {
    const order = await orderRepository.findById(orderId);
    if (!order) throw ApiError.notFound('الطلب غير موجود');

    if (order.orderStatus !== 'OUT_FOR_DELIVERY') {
      throw ApiError.conflict('هذا الطلب ليس في مرحلة التوصيل حالياً');
    }
    if (
      actor.role === 'delivery' &&
      order.deliveryUserId !== actor.id
    ) {
      throw ApiError.forbidden('هذا الطلب مسند إلى مندوب آخر');
    }
    if (actor.role !== 'delivery' && actor.role !== 'admin') {
      throw ApiError.forbidden('هذه العملية مخصصة لمندوب التوصيل');
    }

    let recordedCash: number | null = null;
    let change: number | null = null;

    // Orders that were already paid online do not involve a cash handover.
    if (order.paymentStatus !== 'PAID') {
      if (cashReceived === undefined || !Number.isFinite(cashReceived)) {
        throw ApiError.badRequest('المبلغ المستلم مطلوب لإتمام التسليم');
      }
      const normalizedCash = roundMoney(cashReceived);
      if (normalizedCash < order.totalAmount) {
        throw ApiError.badRequest(
          'المبلغ المستلم أقل من إجمالي الطلب',
        );
      }
      recordedCash = normalizedCash;
      change = roundMoney(normalizedCash - order.totalAmount);
    }

    const completed = await orderRepository.completeDelivery(
      orderId,
      recordedCash,
      change,
    );
    if (!completed) {
      throw ApiError.conflict(
        'تم تأكيد تسليم هذا الطلب من قبل، يرجى إعادة التحميل',
      );
    }
    return loadOrderDto(orderId);
  },
};
