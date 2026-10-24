import { Router } from 'express';
import { paymentController } from '../controllers/paymentController';
import { authenticate } from '../middleware/auth';
import { paymentLimiter } from '../middleware/rateLimit';
import { asyncHandler } from '../utils/asyncHandler';

export const paymentRoutes = Router();

paymentRoutes.post(
  '/webhook',
  paymentLimiter,
  asyncHandler(paymentController.webhook),
);

paymentRoutes.post(
  '/retry/:orderId',
  authenticate,
  paymentLimiter,
  asyncHandler(paymentController.retry),
);
