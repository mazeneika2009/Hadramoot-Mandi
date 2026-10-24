import type { RowDataPacket } from 'mysql2/promise';
import type {
  AdminStats,
  OrderDto,
  OrderItemDto,
  OrderStatus,
  PaymentStatus,
} from '../../../shared/api';
import { pool } from '../db/pool';
import { executeStatement, queryRows, type DbClient } from '../db/query';
import type { OrderItemRecord, OrderRecord } from '../types/domain';
import { toIsoString, toNumber } from '../utils/sanitize';

interface OrderRow extends RowDataPacket {
  id: number;
  user_id: number;
  customer_name?: string;
  customer_email?: string;
  customer_phone?: string | null;
  total_amount: string | number;
  delivery_address: string;
  payment_status: PaymentStatus;
  order_status: OrderStatus;
  payment_id: string | null;
  payment_url: string | null;
  notes: string | null;
  created_at: Date | string;
  updated_at: Date | string;
}

interface OrderItemRow extends RowDataPacket {
  id: number;
  order_id: number;
  menu_item_id: number;
  name: string;
  name_en: string | null;
  image_url: string | null;
  quantity: number;
  price_at_purchase: string | number;
}

const mapOrder = (row: OrderRow): OrderRecord => ({
  id: Number(row.id),
  userId: Number(row.user_id),
  customerName: row.customer_name,
  customerEmail: row.customer_email,
  customerPhone: row.customer_phone,
  totalAmount: toNumber(row.total_amount),
  deliveryAddress: row.delivery_address,
  paymentStatus: row.payment_status,
  orderStatus: row.order_status,
  paymentId: row.payment_id,
  paymentUrl: row.payment_url,
  notes: row.notes,
  createdAt: toIsoString(row.created_at),
  updatedAt: toIsoString(row.updated_at),
});

const mapOrderItem = (row: OrderItemRow): OrderItemRecord => ({
  id: Number(row.id),
  orderId: Number(row.order_id),
  menuItemId: Number(row.menu_item_id),
  name: row.name,
  nameEn: row.name_en,
  imageUrl: row.image_url,
  quantity: Number(row.quantity),
  priceAtPurchase: toNumber(row.price_at_purchase),
});

export const toOrderItemDto = (item: OrderItemRecord): OrderItemDto => ({
  id: item.id,
  menuItemId: item.menuItemId,
  name: item.name,
  nameEn: item.nameEn,
  imageUrl: item.imageUrl,
  quantity: item.quantity,
  priceAtPurchase: item.priceAtPurchase,
  lineTotal: Number((item.quantity * item.priceAtPurchase).toFixed(2)),
});

export const toOrderDto = (
  order: OrderRecord,
  items: OrderItemRecord[],
): OrderDto => ({
  id: order.id,
  userId: order.userId,
  customerName: order.customerName,
  customerEmail: order.customerEmail,
  customerPhone: order.customerPhone,
  totalAmount: order.totalAmount,
  deliveryAddress: order.deliveryAddress,
  paymentStatus: order.paymentStatus,
  orderStatus: order.orderStatus,
  paymentId: order.paymentId,
  paymentUrl: order.paymentUrl,
  notes: order.notes,
  items: items.map(toOrderItemDto),
  createdAt: order.createdAt,
  updatedAt: order.updatedAt,
});

const orderSelect = `o.id, o.user_id, o.total_amount, o.delivery_address,
  o.payment_status, o.order_status, o.payment_id, o.payment_url, o.notes,
  o.created_at, o.updated_at`;

const customerSelect = `u.name AS customer_name, u.email AS customer_email,
  u.phone AS customer_phone`;

const itemSelect = `oi.id, oi.order_id, oi.menu_item_id, oi.quantity,
  oi.price_at_purchase, mi.name, mi.name_en, mi.image_url`;

export interface OrderListFilters {
  userId?: number;
  status?: OrderStatus;
  paymentStatus?: PaymentStatus;
}

export interface PageOptions {
  limit: number;
  offset: number;
}

export const orderRepository = {
  async findById(
    id: number,
    client: DbClient = pool,
  ): Promise<OrderRecord | null> {
    const rows = await queryRows<OrderRow>(
      client,
      `SELECT ${orderSelect}, ${customerSelect}
       FROM orders o JOIN users u ON u.id = o.user_id
       WHERE o.id = ? LIMIT 1`,
      [id],
    );
    return rows[0] ? mapOrder(rows[0]) : null;
  },

  async findByPaymentId(
    paymentId: string,
    client: DbClient = pool,
  ): Promise<OrderRecord | null> {
    const rows = await queryRows<OrderRow>(
      client,
      `SELECT ${orderSelect}, ${customerSelect}
       FROM orders o JOIN users u ON u.id = o.user_id
       WHERE o.payment_id = ? LIMIT 1`,
      [paymentId],
    );
    return rows[0] ? mapOrder(rows[0]) : null;
  },

  async list(
    filters: OrderListFilters,
    page: PageOptions,
    client: DbClient = pool,
  ): Promise<{ orders: OrderRecord[]; total: number }> {
    const conditions: string[] = [];
    const params: unknown[] = [];

    if (filters.userId !== undefined) {
      conditions.push('o.user_id = ?');
      params.push(filters.userId);
    }
    if (filters.status) {
      conditions.push('o.order_status = ?');
      params.push(filters.status);
    }
    if (filters.paymentStatus) {
      conditions.push('o.payment_status = ?');
      params.push(filters.paymentStatus);
    }

    const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
    const countRows = await queryRows<RowDataPacket & { total: number }>(
      client,
      `SELECT COUNT(*) AS total FROM orders o ${where}`,
      params,
    );

    const rows = await queryRows<OrderRow>(
      client,
      `SELECT ${orderSelect}, ${customerSelect}
       FROM orders o JOIN users u ON u.id = o.user_id
       ${where}
       ORDER BY o.created_at DESC
       LIMIT ? OFFSET ?`,
      [...params, page.limit, page.offset],
    );

    return {
      orders: rows.map(mapOrder),
      total: Number(countRows[0]?.total ?? 0),
    };
  },

  async findItemsByOrderIds(
    orderIds: readonly number[],
    client: DbClient = pool,
  ): Promise<OrderItemRecord[]> {
    if (orderIds.length === 0) return [];
    const placeholders = orderIds.map(() => '?').join(', ');
    const rows = await queryRows<OrderItemRow>(
      client,
      `SELECT ${itemSelect}
       FROM order_items oi JOIN menu_items mi ON mi.id = oi.menu_item_id
       WHERE oi.order_id IN (${placeholders})
       ORDER BY oi.id`,
      orderIds,
    );
    return rows.map(mapOrderItem);
  },

  async findItemsByOrderId(
    orderId: number,
    client: DbClient = pool,
  ): Promise<OrderItemRecord[]> {
    return this.findItemsByOrderIds([orderId], client);
  },

  async insertOrder(
    client: DbClient,
    data: {
      userId: number;
      totalAmount: number;
      deliveryAddress: string;
      notes: string | null;
    },
  ): Promise<number> {
    const result = await executeStatement(
      client,
      `INSERT INTO orders
         (user_id, total_amount, delivery_address, payment_status, order_status, notes)
       VALUES (?, ?, ?, 'PENDING', 'PENDING', ?)`,
      [
        data.userId,
        data.totalAmount,
        data.deliveryAddress,
        data.notes,
      ],
    );
    return Number(result.insertId);
  },

  async insertOrderItem(
    client: DbClient,
    data: {
      orderId: number;
      menuItemId: number;
      quantity: number;
      priceAtPurchase: number;
    },
  ): Promise<void> {
    await executeStatement(
      client,
      `INSERT INTO order_items
         (order_id, menu_item_id, quantity, price_at_purchase)
       VALUES (?, ?, ?, ?)`,
      [
        data.orderId,
        data.menuItemId,
        data.quantity,
        data.priceAtPurchase,
      ],
    );
  },

  async updatePaymentInfo(
    orderId: number,
    paymentId: string | null,
    paymentUrl: string | null,
    client: DbClient = pool,
  ): Promise<void> {
    await executeStatement(
      client,
      `UPDATE orders SET payment_id = ?, payment_url = ? WHERE id = ?`,
      [paymentId, paymentUrl, orderId],
    );
  },

  async updateStatuses(
    orderId: number,
    paymentStatus: PaymentStatus,
    orderStatus: OrderStatus,
    client: DbClient = pool,
  ): Promise<void> {
    await executeStatement(
      client,
      `UPDATE orders SET payment_status = ?, order_status = ? WHERE id = ?`,
      [paymentStatus, orderStatus, orderId],
    );
  },

  async updateOrderStatus(
    orderId: number,
    orderStatus: OrderStatus,
    client: DbClient = pool,
  ): Promise<void> {
    await executeStatement(
      client,
      'UPDATE orders SET order_status = ? WHERE id = ?',
      [orderStatus, orderId],
    );
  },

  async getStats(client: DbClient = pool): Promise<AdminStats> {
    const rows = await queryRows<
      RowDataPacket & {
        total_orders: number;
        pending_orders: number;
        preparing_orders: number;
        out_for_delivery_orders: number;
        delivered_orders: number;
        cancelled_orders: number;
        total_revenue: string | number;
      }
    >(
      client,
      `SELECT
         COUNT(*) AS total_orders,
         SUM(order_status = 'PENDING') AS pending_orders,
         SUM(order_status = 'PREPARING') AS preparing_orders,
         SUM(order_status = 'OUT_FOR_DELIVERY') AS out_for_delivery_orders,
         SUM(order_status = 'DELIVERED') AS delivered_orders,
         SUM(order_status = 'CANCELLED') AS cancelled_orders,
         COALESCE(SUM(CASE WHEN payment_status = 'PAID' THEN total_amount ELSE 0 END), 0) AS total_revenue
       FROM orders`,
    );

    const menuRows = await queryRows<RowDataPacket & { total: number }>(
      client,
      'SELECT COUNT(*) AS total FROM menu_items',
    );
    const reservationRows = await queryRows<RowDataPacket & { total: number }>(
      client,
      'SELECT COUNT(*) AS total FROM reservations',
    );

    const row = rows[0];
    return {
      totalOrders: Number(row?.total_orders ?? 0),
      pendingOrders: Number(row?.pending_orders ?? 0),
      preparingOrders: Number(row?.preparing_orders ?? 0),
      outForDeliveryOrders: Number(row?.out_for_delivery_orders ?? 0),
      deliveredOrders: Number(row?.delivered_orders ?? 0),
      cancelledOrders: Number(row?.cancelled_orders ?? 0),
      totalRevenue: toNumber(row?.total_revenue),
      totalMenuItems: Number(menuRows[0]?.total ?? 0),
      totalReservations: Number(reservationRows[0]?.total ?? 0),
    };
  },
};
