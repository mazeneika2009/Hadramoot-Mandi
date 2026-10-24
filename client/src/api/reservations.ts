import type {
  CreateReservationInput,
  Paginated,
  ReservationDto,
  ReservationStatus,
} from '@shared/api';
import { request } from './client';

export interface AdminReservationFilters {
  status?: ReservationStatus;
  page?: number;
  limit?: number;
}

export const reservationApi = {
  async create(input: CreateReservationInput): Promise<ReservationDto> {
    const data = await request<{ reservation: ReservationDto }>(
      '/reservations',
      {
        method: 'POST',
        body: JSON.stringify(input),
      },
    );
    return data.reservation;
  },

  listMine(): Promise<Paginated<ReservationDto>> {
    return request<Paginated<ReservationDto>>('/reservations/my?limit=50');
  },

  listAll(
    filters: AdminReservationFilters = {},
  ): Promise<Paginated<ReservationDto>> {
    const params = new URLSearchParams();
    if (filters.status) params.set('status', filters.status);
    if (filters.page) params.set('page', String(filters.page));
    if (filters.limit) params.set('limit', String(filters.limit));
    const query = params.toString();
    return request<Paginated<ReservationDto>>(
      `/admin/reservations${query ? `?${query}` : ''}`,
    );
  },

  async updateStatus(
    id: number,
    status: ReservationStatus,
  ): Promise<ReservationDto> {
    const data = await request<{ reservation: ReservationDto }>(
      `/admin/reservations/${id}/status`,
      {
        method: 'PATCH',
        body: JSON.stringify({ status }),
      },
    );
    return data.reservation;
  },
};
