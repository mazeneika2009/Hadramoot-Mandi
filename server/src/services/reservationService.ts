import type {
  CreateReservationInput,
  Paginated,
  ReservationDto,
  ReservationStatus,
} from '../../../shared/api';
import {
  reservationRepository,
  toReservationDto,
  type ReservationFilters,
} from '../repositories/reservationRepository';
import type { AuthUser } from '../types/domain';
import { ApiError } from '../utils/ApiError';

export const reservationService = {
  async create(
    input: CreateReservationInput,
    user: AuthUser | undefined,
  ): Promise<ReservationDto> {
    const date = new Date(`${input.date}T00:00:00`);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (Number.isNaN(date.getTime()) || date < today) {
      throw ApiError.badRequest('تاريخ الحجز غير صالح');
    }

    const id = await reservationRepository.create({
      ...input,
      userId: user?.id ?? null,
      notes: input.notes?.trim() || undefined,
      email: input.email?.trim() || undefined,
    });

    const reservation = await reservationRepository.findById(id);
    if (!reservation) throw new ApiError(500, 'تعذر إنشاء الحجز');
    return toReservationDto(reservation);
  },

  async listForUser(
    userId: number,
    page: { page: number; limit: number; offset: number },
  ): Promise<Paginated<ReservationDto>> {
    const { reservations, total } = await reservationRepository.list(
      { userId },
      { limit: page.limit, offset: page.offset },
    );
    return {
      items: reservations.map(toReservationDto),
      pagination: {
        page: page.page,
        limit: page.limit,
        total,
        totalPages: Math.ceil(total / page.limit),
      },
    };
  },

  async listAll(
    filters: ReservationFilters,
    page: { page: number; limit: number; offset: number },
  ): Promise<Paginated<ReservationDto>> {
    const { reservations, total } = await reservationRepository.list(filters, {
      limit: page.limit,
      offset: page.offset,
    });
    return {
      items: reservations.map(toReservationDto),
      pagination: {
        page: page.page,
        limit: page.limit,
        total,
        totalPages: Math.ceil(total / page.limit),
      },
    };
  },

  async updateStatus(id: number, status: ReservationStatus): Promise<ReservationDto> {
    const existing = await reservationRepository.findById(id);
    if (!existing) throw ApiError.notFound('الحجز غير موجود');
    await reservationRepository.updateStatus(id, status);
    const updated = await reservationRepository.findById(id);
    if (!updated) throw ApiError.notFound('الحجز غير موجود');
    return toReservationDto(updated);
  },
};
