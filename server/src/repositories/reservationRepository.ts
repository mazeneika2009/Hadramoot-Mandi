import type {
  CreateReservationInput,
  ReservationDto,
  ReservationStatus,
} from '../../../shared/api';
import { supabase } from '../db/client';
import { unwrap } from '../db/query';
import type { ReservationRecord } from '../types/domain';
import { toIsoString } from '../utils/sanitize';

interface ReservationRow {
  id: number;
  user_id: number | null;
  name: string;
  phone: string;
  email: string | null;
  date: string;
  time: string;
  guests: number;
  status: ReservationStatus;
  notes: string | null;
  created_at: string;
}

const mapReservation = (row: ReservationRow): ReservationRecord => ({
  id: Number(row.id),
  userId: row.user_id === null ? null : Number(row.user_id),
  name: row.name,
  phone: row.phone,
  email: row.email,
  date: String(row.date).slice(0, 10),
  time: String(row.time).slice(0, 5),
  guests: Number(row.guests),
  status: row.status,
  notes: row.notes,
  createdAt: toIsoString(row.created_at),
});

export const toReservationDto = (
  reservation: ReservationRecord,
): ReservationDto => ({
  id: reservation.id,
  userId: reservation.userId,
  name: reservation.name,
  phone: reservation.phone,
  email: reservation.email,
  date: reservation.date,
  time: reservation.time,
  guests: reservation.guests,
  status: reservation.status,
  notes: reservation.notes,
  createdAt: reservation.createdAt,
});

const selectColumns = `id, user_id, name, phone, email, date, time, guests,
  status, notes, created_at`;

export interface ReservationFilters {
  userId?: number;
  status?: ReservationStatus;
  fromDate?: string;
}

export const reservationRepository = {
  async create(
    data: CreateReservationInput & { userId: number | null },
  ): Promise<number> {
    const result = await supabase
      .from('reservations')
      .insert({
        user_id: data.userId,
        name: data.name,
        phone: data.phone,
        email: data.email ?? null,
        date: data.date,
        time: data.time,
        guests: data.guests,
        status: 'PENDING',
        notes: data.notes ?? null,
      })
      .select('id')
      .single();

    const row = unwrap(result, 'create reservation') as { id: number };
    return Number(row.id);
  },

  async findById(id: number): Promise<ReservationRecord | null> {
    const result = await supabase
      .from('reservations')
      .select(selectColumns)
      .eq('id', id)
      .maybeSingle();

    const row = unwrap(result, 'find reservation') as ReservationRow | null;
    return row ? mapReservation(row) : null;
  },

  async list(
    filters: ReservationFilters,
    page: { limit: number; offset: number },
  ): Promise<{ reservations: ReservationRecord[]; total: number }> {
    let query = supabase
      .from('reservations')
      .select(selectColumns, { count: 'exact' });

    if (filters.userId !== undefined) {
      query = query.eq('user_id', filters.userId);
    }
    if (filters.status) {
      query = query.eq('status', filters.status);
    }
    if (filters.fromDate) {
      query = query.gte('date', filters.fromDate);
    }

    const result = await query
      .order('date', { ascending: false })
      .order('time', { ascending: false })
      .range(page.offset, page.offset + page.limit - 1);

    const rows = unwrap(result, 'list reservations') as ReservationRow[] | null;

    return {
      reservations: (rows ?? []).map(mapReservation),
      total: result.count ?? 0,
    };
  },

  async updateStatus(
    id: number,
    status: ReservationStatus,
  ): Promise<boolean> {
    const result = await supabase
      .from('reservations')
      .update({ status })
      .eq('id', id)
      .select('id');

    const rows = unwrap(result, 'update reservation status') as
      | { id: number }[]
      | null;
    return (rows?.length ?? 0) > 0;
  },
};
