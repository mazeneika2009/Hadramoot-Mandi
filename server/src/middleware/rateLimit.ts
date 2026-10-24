import rateLimit, { type Options } from 'express-rate-limit';
import type { Request, Response } from 'express';
import { env } from '../config/env';

const handler = (_req: Request, res: Response): void => {
  res.status(429).json({
    success: false,
    message: 'محاولات كثيرة جداً، يرجى المحاولة بعد قليل',
  });
};

const buildLimiter = (windowMs: number, limit: number, name: string) =>
  rateLimit({
    windowMs,
    limit,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    handler,
    message: `${name} limit exceeded`,
  } satisfies Partial<Options>);

export const generalLimiter = buildLimiter(
  env.rateLimit.generalWindowMs,
  env.rateLimit.generalMax,
  'general',
);

export const authLimiter = buildLimiter(
  env.rateLimit.generalWindowMs,
  env.rateLimit.authMax,
  'auth',
);

export const checkoutLimiter = buildLimiter(
  env.rateLimit.generalWindowMs,
  env.rateLimit.checkoutMax,
  'checkout',
);

export const paymentLimiter = buildLimiter(
  env.rateLimit.generalWindowMs,
  env.rateLimit.paymentMax,
  'payment',
);

export const reservationLimiter = buildLimiter(
  env.rateLimit.generalWindowMs,
  env.rateLimit.reservationMax,
  'reservation',
);
