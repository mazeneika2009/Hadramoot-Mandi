import type {
  AdminStats,
  OrderDto,
  OrderItemDto,
  OrderStatus,
  PaymentStatus,
} from '../../../shared/api';
import { supabase } from '../db/client';
import { assertNoError, unwrap } from '../db/query';
import type { OrderItemRecord, OrderRecord } from '../types/domain';
import { toIsoString, toNullableIsoString, toNumber } from '../utils/sanitize';

type PaymentMethod = 'ONLINE' | 'CASH';

interface EmbeddedCustomer {
  name: string;
  email: string;
  phone: string | null;
}

interface EmbeddedDeliveryUser {
  name: string;
  phone: string | null;
}

interface EmbeddedMenuItem {
  name: string;
  name_en: string | null;
  image_url: string | null;
}

interface OrderRow {
  id: number;
  user_id: number;
  total_amount: string | number;
  delivery_address: string;
  payment_status: PaymentStatus;
  order_status: OrderStatus;
  payment_id: string | null;
  payment_url: string | null;
  notes: string | null;
  payment_method: PaymentMethod;
  delivery_user_id: number | null;
  dispatched_at: string | null;
  delivered_at: string | null;
  cash_received: string | number | null;
  cash_change: string | number | null;
  created_at: string;
  updated_at: string;
  customer: EmbeddedCustomer | EmbeddedCustomer[] | null;
  delivery: EmbeddedDeliveryUser | EmbeddedDeliveryUser[] | null;
}

interface OrderItemRow {
  id: number;
  order_id: number;
  menu_item_id: number;
  quantity: number;
  price_at_purchase: string | number;
  menu_item: EmbeddedMenuItem | EmbeddedMenuItem[] | null;
}

interface OrderStatsRow {
  total_orders: number;
  pending_orders: number;
  preparing_orders: number;
  out_for_delivery_orders: number;
  delivered_orders: number;
  cancelled_orders: number;
  total_revenue: string | number;
}

/** Normalises a PostgREST many-to-one relation to a single object. */
const relation = <T>(value: T | T[] | null | undefined): T | null => {
  if (Array.isArray(value)) return value[0] ?? null;
  return value ?? null;
};

const mapOrder = (row: OrderRow): OrderRecord => {
  const customer = relation(row.customer);
  const delivery = relation(row.delivery);

  return {
    id: Number(row.id),
    userId: Number(row.user_id),
    customerName: customer?.name,
    customerEmail: customer?.email,
    customerPhone: customer?.phone ?? null,
    totalAmount: toNumber(row.total_amount),
    deliveryAddress: row.delivery_address,
    paymentStatus: row.payment_status,
    orderStatus: row.order_status,
    paymentId: row.payment_id,
    paymentUrl: row.payment_url,
    notes: row.notes,
    paymentMethod: row.payment_method,
    deliveryUserId:
      row.delivery_user_id === null ? null : Number(row.delivery_user_id),
    deliveryUserName: delivery?.name ?? null,
    deliveryUserPhone: delivery?.phone ?? null,
    dispatchedAt: toNullableIsoString(row.dispatched_at),
    deliveredAt: toNullableIsoString(row.delivered_at),
    cashReceived:
      row.cash_received === null ? null : toNumber(row.cash_received),
    cashChange: row.cash_change === null ? null : toNumber(row.cash_change),
    createdAt: toIsoString(row.created_at),
    updatedAt: toIsoString(row.updated_at),
  };
};

const mapOrderItem = (row: OrderItemRow): OrderItemRecord => {
  const menuItem = relation(row.menu_item);

  return {
    id: Number(row.id),
    orderId: Number(row.order_id),
    menuItemId: Number(row.menu_item_id),
    name: menuItem?.name ?? '',
    nameEn: menuItem?.name_en ?? null,
    imageUrl: menuItem?.image_url ?? null,
    quantity: Number(row.quantity),
    priceAtPurchase: toNumber(row.price_at_purchase),
  };
};

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
  paymentMethod: order.paymentMethod,
  deliveryUserId: order.deliveryUserId,
  deliveryUserName: order.deliveryUserName ?? null,
  deliveryUserPhone: order.deliveryUserPhone ?? null,
  dispatchedAt: order.dispatchedAt,
  deliveredAt: order.deliveredAt,
  cashReceived: order.cashReceived,
  cashChange: order.cashChange,
});

// Explicit foreign-key hints keep PostgREST from confusing the two users
// relationships on the orders table.
const orderSelect = `id, user_id, total_amount, delivery_address,
  payment_status, order_status, payment_id, payment_url, notes,
  payment_method, delivery_user_id, dispatched_at, delivered_at,
  cash_received, cash_change, created_at, updated_at,
  customer:users!orders_user_id_fkey(name, email, phone),
  delivery:users!orders_delivery_user_id_fkey(name, phone)`;

const itemSelect = `id, order_id, menu_item_id, quantity, price_at_purchase,
  menu_item:menu_items!order_items_menu_item_id_fkey(name, name_en, image_url)`;

export interface OrderListFilters {
  userId?: number;
  deliveryUserId?: number;
  status?: OrderStatus | readonly OrderStatus[];
  paymentStatus?: PaymentStatus;
}

export interface PageOptions {
  limit: number;
  offset: number;
}

export interface CreateOrderItemRecord {
  menuItemId: number;
  quantity: number;
  priceAtPurchase: number;
}

export const orderRepository = {
  async findById(id: number): Promise<OrderRecord | null> {
    const result = await supabase
      .from('orders')
      .select(orderSelect)
      .eq('id', id)
      .maybeSingle();

    const row = unwrap(result, 'find order') as OrderRow | null;
    return row ? mapOrder(row) : null;
  },

  async findByPaymentId(paymentId: string): Promise<OrderRecord | null> {
    const result = await supabase
      .from('orders')
      .select(orderSelect)
      .eq('payment_id', paymentId)
      .order('id', { ascending: true })
      .limit(1)
      .maybeSingle();

    const row = unwrap(result, 'find order by payment id') as OrderRow | null;
    return row ? mapOrder(row) : null;
  },

  async list(
    filters: OrderListFilters,
    page: PageOptions,
  ): Promise<{ orders: OrderRecord[]; total: number }> {
    let query = supabase.from('orders').select(orderSelect, { count: 'exact' });

    if (filters.userId !== undefined) {
      query = query.eq('user_id', filters.userId);
    }
    if (filters.deliveryUserId !== undefined) {
      query = query.eq('delivery_user_id', filters.deliveryUserId);
    }
    if (filters.status) {
      query = Array.isArray(filters.status)
        ? query.in('order_status', filters.status)
        : query.eq('order_status', filters.status);
    }
    if (filters.paymentStatus) {
      query = query.eq('payment_status', filters.paymentStatus);
    }

    const result = await query
      .order('created_at', { ascending: false })
      .range(page.offset, page.offset + page.limit - 1);

    const rows = unwrap(result, 'list orders') as OrderRow[] | null;

    return {
      orders: (rows ?? []).map(mapOrder),
      total: result.count ?? 0,
    };
  },

  async findItemsByOrderIds(
    orderIds: readonly number[],
  ): Promise<OrderItemRecord[]> {
    if (orderIds.length === 0) return [];

    const result = await supabase
      .from('order_items')
      .select(itemSelect)
      .in('order_id', [...orderIds])
      .order('id', { ascending: true });

    const rows = unwrap(result, 'find order items') as OrderItemRow[] | null;
    return (rows ?? []).map(mapOrderItem);
  },

  async findItemsByOrderId(orderId: number): Promise<OrderItemRecord[]> {
    return orderRepository.findItemsByOrderIds([orderId]);
  },

  /**
   * Creates the order and its items in a single PostgreSQL transaction via the
   * `create_order_with_items` RPC defined in the Supabase migration.
   */
  async createWithItems(data: {
    userId: number;
    totalAmount: number;
    deliveryAddress: string;
    paymentMethod: PaymentMethod;
    notes: string | null;
    items: readonly CreateOrderItemRecord[];
  }): Promise<number> {
    const result = await supabase.rpc('create_order_with_items', {
      p_user_id: data.userId,
      p_total_amount: data.totalAmount,
      p_delivery_address: data.deliveryAddress,
      p_payment_method: data.paymentMethod,
      p_notes: data.notes,
      p_items: data.items.map((item) => ({
        menu_item_id: item.menuItemId,
        quantity: item.quantity,
        price_at_purchase: item.priceAtPurchase,
      })),
    });

    assertNoError(result.error, 'create order');
    return Number(result.data);
  },

  async updatePaymentInfo(
    orderId: number,
    paymentId: string | null,
    paymentUrl: string | null,
  ): Promise<void> {
    const { error } = await supabase
      .from('orders')
      .update({ payment_id: paymentId, payment_url: paymentUrl })
      .eq('id', orderId);

    assertNoError(error, 'update order payment info');
  },

  async updateStatuses(
    orderId: number,
    paymentStatus: PaymentStatus,
    orderStatus: OrderStatus,
  ): Promise<void> {
    const { error } = await supabase
      .from('orders')
      .update({
        payment_status: paymentStatus,
        order_status: orderStatus,
      })
      .eq('id', orderId);

    assertNoError(error, 'update order statuses');
  },

  async updateOrderStatus(
    orderId: number,
    orderStatus: OrderStatus,
  ): Promise<void> {
    const { error } = await supabase
      .from('orders')
      .update({ order_status: orderStatus })
      .eq('id', orderId);

    assertNoError(error, 'update order status');
  },

  /**
   * Assigns a ready order to a driver and dispatches it in one atomic step.
   * The status predicate prevents two cashiers from dispatching the same
   * order concurrently.
   */
  async dispatchToDriver(
    orderId: number,
    deliveryUserId: number,
  ): Promise<boolean> {
    const result = await supabase
      .from('orders')
      .update({
        delivery_user_id: deliveryUserId,
        order_status: 'OUT_FOR_DELIVERY',
        dispatched_at: new Date().toISOString(),
        delivered_at: null,
        cash_received: null,
        cash_change: null,
      })
      .eq('id', orderId)
      .eq('order_status', 'READY')
      .select('id');

    const rows = unwrap(result, 'dispatch order') as { id: number }[] | null;
    return (rows?.length ?? 0) > 0;
  },

  /**
   * Completes a dispatched order, records the cash handover and marks the
   * payment as paid. The status predicate makes confirmation idempotent-safe:
   * a second request cannot overwrite the recorded delivery.
   */
  async completeDelivery(
    orderId: number,
    cashReceived: number | null,
    cashChange: number | null,
  ): Promise<boolean> {
    const result = await supabase
      .from('orders')
      .update({
        order_status: 'DELIVERED',
        payment_status: 'PAID',
        delivered_at: new Date().toISOString(),
        cash_received: cashReceived,
        cash_change: cashChange,
      })
      .eq('id', orderId)
      .eq('order_status', 'OUT_FOR_DELIVERY')
      .select('id');

    const rows = unwrap(result, 'complete delivery') as
      | { id: number }[]
      | null;
    return (rows?.length ?? 0) > 0;
  },

  async getStats(): Promise<AdminStats> {
    const [statsResult, menuResult, reservationResult] = await Promise.all([
      supabase.rpc('get_order_stats'),
      supabase.from('menu_items').select('id', { count: 'exact', head: true }),
      supabase.from('reservations').select('id', { count: 'exact', head: true }),
    ]);

    assertNoError(statsResult.error, 'load order statistics');
    assertNoError(menuResult.error, 'count menu items');
    assertNoError(reservationResult.error, 'count reservations');

    const rows = statsResult.data as OrderStatsRow[] | null;
    const row = rows?.[0];

    return {
      totalOrders: Number(row?.total_orders ?? 0),
      pendingOrders: Number(row?.pending_orders ?? 0),
      preparingOrders: Number(row?.preparing_orders ?? 0),
      outForDeliveryOrders: Number(row?.out_for_delivery_orders ?? 0),
      deliveredOrders: Number(row?.delivered_orders ?? 0),
      cancelledOrders: Number(row?.cancelled_orders ?? 0),
      totalRevenue: toNumber(row?.total_revenue),
      totalMenuItems: menuResult.count ?? 0,
      totalReservations: reservationResult.count ?? 0,
    };
  },
};
