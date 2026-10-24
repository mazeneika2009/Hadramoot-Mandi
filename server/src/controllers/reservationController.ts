import type { Request, Response } from 'express';
import {
  isReservationStatus,
  type ReservationStatus,
} from '../../../shared/config';
import type { CreateReservationInput } from '../../../shared/api';
import { env } from '../config/env';
import { reservationService } from '../services/reservationService';
import {
  paginationFromQuery,
  parseId,
  requireAuthUser,
} from '../utils/request';

export const reservationController = {
  async create(req: Request, res: Response): Promise<void> {
    const reservation = await reservationService.create(
      req.body as CreateReservationInput,
      req.user,
    );
    res.status(201).json({
      success: true,
      message: 'تم إرسال طلب الحجز وسيتم تأكيده هاتفياً',
      data: { reservation },
    });
  },

  async listMine(req: Request, res: Response): Promise<void> {
    const user = requireAuthUser(req);
    const page = paginationFromQuery(
      req.query,
      env.pagination.defaultLimit,
      env.pagination.maxLimit,
    );
    const result = await reservationService.listForUser(user.id, page);
    res.json({ success: true, data: result });
  },

  async adminList(req: Request, res: Response): Promise<void> {
    const page = paginationFromQuery(
      req.query,
      env.pagination.defaultLimit,
      env.pagination.maxLimit,
    );
    const status =
      typeof req.query.status === 'string' &&
      isReservationStatus(req.query.status)
        ? req.query.status
        : undefined;
    const fromDate =
      typeof req.query.fromDate === 'string' ? req.query.fromDate : undefined;

    const result = await reservationService.listAll(
      { status, fromDate },
      page,
    );
    res.json({ success: true, data: result });
  },

  async updateStatus(req: Request, res: Response): Promise<void> {
    const id = parseId(String(req.params.id), 'معرّف الحجز');
    const status = req.body.status as ReservationStatus;
    const reservation = await reservationService.updateStatus(id, status);
    res.json({
      success: true,
      message: 'تم تحديث حالة الحجز',
      data: { reservation },
    });
  },
};
