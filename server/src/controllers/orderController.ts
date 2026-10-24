import type { Request, Response } from 'express';
import {
  isOrderStatus,
  isPaymentStatus,
  type OrderStatus,
} from '../../../shared/config';
import type { CreateOrderInput } from '../../../shared/api';
import { env } from '../config/env';
import { orderService } from '../services/orderService';
import {
  paginationFromQuery,
  parseId,
  requireAuthUser,
} from '../utils/request';

const readStatusFilter = (value: unknown): OrderStatus | undefined =>
  typeof value === 'string' && isOrderStatus(value) ? value : undefined;

export const orderController = {
  async create(req: Request, res: Response): Promise<void> {
    const user = requireAuthUser(req);
    const order = await orderService.create(user.id, req.body as CreateOrderInput);
    res.status(201).json({
      success: true,
      message: 'تم إنشاء الطلب بنجاح',
      data: { order },
    });
  },

  async listMine(req: Request, res: Response): Promise<void> {
    const user = requireAuthUser(req);
    const page = paginationFromQuery(
      req.query,
      env.pagination.defaultLimit,
      env.pagination.maxLimit,
    );
    const result = await orderService.listForUser(
      user.id,
      page,
      readStatusFilter(req.query.status),
    );
    res.json({ success: true, data: result });
  },

  async getById(req: Request, res: Response): Promise<void> {
    const user = requireAuthUser(req);
    const id = parseId(String(req.params.id), 'معرّف الطلب');
    const order = await orderService.getById(id, user);
    res.json({ success: true, data: { order } });
  },

  async updateStatus(req: Request, res: Response): Promise<void> {
    const id = parseId(String(req.params.id), 'معرّف الطلب');
    const status = req.body.orderStatus as OrderStatus;
    const order = await orderService.updateStatus(id, status);
    res.json({
      success: true,
      message: 'تم تحديث حالة الطلب',
      data: { order },
    });
  },

  async adminList(req: Request, res: Response): Promise<void> {
    const page = paginationFromQuery(
      req.query,
      env.pagination.defaultLimit,
      env.pagination.maxLimit,
    );
    const paymentStatus =
      typeof req.query.paymentStatus === 'string' &&
      isPaymentStatus(req.query.paymentStatus)
        ? req.query.paymentStatus
        : undefined;

    const result = await orderService.listAll(page, {
      status: readStatusFilter(req.query.status),
      paymentStatus,
    });
    res.json({ success: true, data: result });
  },

  async stats(_req: Request, res: Response): Promise<void> {
    const stats = await orderService.getStats();
    res.json({ success: true, data: { stats } });
  },
};
