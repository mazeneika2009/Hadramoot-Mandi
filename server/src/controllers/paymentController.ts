import type { Request, Response } from 'express';
import { paymentService } from '../services/paymentService';
import { parseId, requireAuthUser } from '../utils/request';

const readSignature = (value: string | string[] | undefined): string | undefined => {
  if (Array.isArray(value)) return value[0];
  return value;
};

export const paymentController = {
  async webhook(req: Request, res: Response): Promise<void> {
    const payload =
      typeof req.body === 'object' && req.body !== null
        ? (req.body as Record<string, unknown>)
        : {};

    const signature = readSignature(
      req.headers['x-fawaterak-signature'] as string | string[] | undefined,
    ) ??
      readSignature(req.headers['x-signature'] as string | string[] | undefined) ??
      readSignature(req.headers.signature as string | string[] | undefined);

    const result = await paymentService.handleWebhook(
      payload,
      signature,
      req.rawBody,
    );

    res.json({
      success: true,
      message: 'تم استلام إشعار الدفع',
      data: result,
    });
  },

  async retry(req: Request, res: Response): Promise<void> {
    const user = requireAuthUser(req);
    const orderId = parseId(String(req.params.orderId), 'معرّف الطلب');
    const payment = await paymentService.retryPayment(
      orderId,
      user.id,
      user.role === 'admin',
    );
    res.json({
      success: true,
      message: 'تم إنشاء رابط الدفع',
      data: { payment },
    });
  },
};
