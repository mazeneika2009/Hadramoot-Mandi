import type {
  AdminStats,
  CreateOrderInput,
  DeliveryDriverDto,
  OrderDto,
  OrderStatus,
  Paginated,
  PaymentStatus,
} from '@shared/api';
import { request } from './client';

export interface AdminOrderFilters {
  status?: OrderStatus;
  paymentStatus?: PaymentStatus;
  page?: number;
  limit?: number;
}

const buildAdminQuery = (filters: AdminOrderFilters): string => {
  const params = new URLSearchParams();
  if (filters.status) params.set('status', filters.status);
  if (filters.paymentStatus) params.set('paymentStatus', filters.paymentStatus);
  if (filters.page) params.set('page', String(filters.page));
  if (filters.limit) params.set('limit', String(filters.limit));
  const query = params.toString();
  return query ? `?${query}` : '';
};

const buildPageQuery = (page?: number, limit?: number): string => {
  const params = new URLSearchParams();
  if (page) params.set('page', String(page));
  if (limit) params.set('limit', String(limit));
  const query = params.toString();
  return query ? `?${query}` : '';
};

export const orderApi = {
  async create(input: CreateOrderInput): Promise<OrderDto> {
    const data = await request<{ order: OrderDto }>('/orders', {
      method: 'POST',
      body: JSON.stringify(input),
    });
    return data.order;
  },

  listMine(): Promise<Paginated<OrderDto>> {
    return request<Paginated<OrderDto>>('/orders?limit=50');
  },

  listKitchen(page?: number, limit?: number): Promise<Paginated<OrderDto>> {
    return request<Paginated<OrderDto>>(
      `/orders/kitchen${buildPageQuery(page, limit)}`,
    );
  },

  listCashier(page?: number, limit?: number): Promise<Paginated<OrderDto>> {
    return request<Paginated<OrderDto>>(
      `/orders/cashier${buildPageQuery(page, limit)}`,
    );
  },

  async listDrivers(): Promise<DeliveryDriverDto[]> {
    const data = await request<{ drivers: DeliveryDriverDto[] }>(
      '/orders/drivers',
    );
    return data.drivers;
  },

  listDelivery(page?: number, limit?: number): Promise<Paginated<OrderDto>> {
    return request<Paginated<OrderDto>>(
      `/orders/delivery${buildPageQuery(page, limit)}`,
    );
  },

  async dispatch(id: number, deliveryUserId: number): Promise<OrderDto> {
    const data = await request<{ order: OrderDto }>(
      `/orders/${id}/dispatch`,
      {
        method: 'POST',
        body: JSON.stringify({ deliveryUserId }),
      },
    );
    return data.order;
  },

  async confirmDelivery(
    id: number,
    cashReceived?: number,
  ): Promise<OrderDto> {
    const data = await request<{ order: OrderDto }>(
      `/orders/${id}/confirm-delivery`,
      {
        method: 'POST',
        body: JSON.stringify(
          cashReceived === undefined ? {} : { cashReceived },
        ),
      },
    );
    return data.order;
  },

  async getById(id: number): Promise<OrderDto> {
    const data = await request<{ order: OrderDto }>(`/orders/${id}`);
    return data.order;
  },

  async updateStatus(id: number, orderStatus: OrderStatus): Promise<OrderDto> {
    const data = await request<{ order: OrderDto }>(`/orders/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ orderStatus }),
    });
    return data.order;
  },

  listAll(filters: AdminOrderFilters = {}): Promise<Paginated<OrderDto>> {
    return request<Paginated<OrderDto>>(
      `/admin/orders${buildAdminQuery(filters)}`,
    );
  },

  async stats(): Promise<AdminStats> {
    const data = await request<{ stats: AdminStats }>('/admin/stats');
    return data.stats;
  },

  async retryPayment(orderId: number): Promise<string> {
    const data = await request<{
      payment: { paymentUrl: string; paymentId: string };
    }>(`/payments/retry/${orderId}`, { method: 'POST' });
    return data.payment.paymentUrl;
  },
};
