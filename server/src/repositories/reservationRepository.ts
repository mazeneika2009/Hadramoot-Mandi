import type { RowDataPacket } from 'mysql2/promise';
import type {
  CreateReservationInput,
  ReservationDto,
  ReservationStatus,
} from '../../../shared/api';
import { pool } from '../db/pool';
import { executeStatement, queryRows, type DbClient } from '../db/query';
import type { ReservationRecord } from '../types/domain';
import { toIsoString } from '../utils/sanitize';

interface ReservationRow extends RowDataPacket {
  id: number;
  user_id: number | null;
  name: string;
  phone: string;
  email: string | null;
  date: Date | string;
  time: string;
  guests: number;
  status: ReservationStatus;
  notes: string | null;
  created_at: Date | string;
}

const mapReservation = (row: ReservationRow): ReservationRecord => ({
  id: Number(row.id),
  userId: row.user_id === null ? null : Number(row.user_id),
  name: row.name,
  phone: row.phone,
  email: row.email,
  date:
    row.date instanceof Date
      ? row.date.toISOString().slice(0, 10)
      : String(row.date).slice(0, 10),
  time: String(row.time).slice(0, 5),
  guests: Number(row.guests),
  status: row.status,
  notes: row.notes,
  createdAt: toIsoString(row.created_at),
});

export const toReservationDto = (reservation: ReservationRecord): ReservationDto => ({
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
    client: DbClient = pool,
  ): Promise<number> {
    const result = await executeStatement(
      client,
      `INSERT INTO reservations
         (user_id, name, phone, email, date, time, guests, status, notes)
       VALUES (?, ?, ?, ?, ?, ?, ?, 'PENDING', ?)`,
      [
        data.userId,
        data.name,
        data.phone,
        data.email ?? null,
        data.date,
        data.time,
        data.guests,
        data.notes ?? null,
      ],
    );
    return Number(result.insertId);
  },

  async findById(
    id: number,
    client: DbClient = pool,
  ): Promise<ReservationRecord | null> {
    const rows = await queryRows<ReservationRow>(
      client,
      `SELECT ${selectColumns} FROM reservations WHERE id = ? LIMIT 1`,
      [id],
    );
    return rows[0] ? mapReservation(rows[0]) : null;
  },

  async list(
    filters: ReservationFilters,
    page: { limit: number; offset: number },
    client: DbClient = pool,
  ): Promise<{ reservations: ReservationRecord[]; total: number }> {
    const conditions: string[] = [];
    const params: unknown[] = [];

    if (filters.userId !== undefined) {
      conditions.push('user_id = ?');
      params.push(filters.userId);
    }
    if (filters.status) {
      conditions.push('status = ?');
      params.push(filters.status);
    }
    if (filters.fromDate) {
      conditions.push('date >= ?');
      params.push(filters.fromDate);
    }

    const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
    const countRows = await queryRows<RowDataPacket & { total: number }>(
      client,
      `SELECT COUNT(*) AS total FROM reservations ${where}`,
      params,
    );
    const rows = await queryRows<ReservationRow>(
      client,
      `SELECT ${selectColumns} FROM reservations ${where}
       ORDER BY date DESC, time DESC
       LIMIT ? OFFSET ?`,
      [...params, page.limit, page.offset],
    );

    return {
      reservations: rows.map(mapReservation),
      total: Number(countRows[0]?.total ?? 0),
    };
  },

  async updateStatus(
    id: number,
    status: ReservationStatus,
    client: DbClient = pool,
  ): Promise<boolean> {
    const result = await executeStatement(
      client,
      'UPDATE reservations SET status = ? WHERE id = ?',
      [status, id],
    );
    return result.affectedRows > 0;
  },
};
