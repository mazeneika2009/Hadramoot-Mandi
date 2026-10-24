import type {
  AdminStats,
  CreateOrderInput,
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
