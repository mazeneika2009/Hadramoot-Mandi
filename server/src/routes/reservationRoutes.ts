import { Router } from 'express';
import { reservationController } from '../controllers/reservationController';
import { authenticate, optionalAuthenticate } from '../middleware/auth';
import { reservationLimiter } from '../middleware/rateLimit';
import { reservationRules } from '../middleware/validators';
import { validate } from '../middleware/validate';
import { asyncHandler } from '../utils/asyncHandler';

export const reservationRoutes = Router();

reservationRoutes.post(
  '/',
  reservationLimiter,
  optionalAuthenticate,
  reservationRules,
  validate,
  asyncHandler(reservationController.create),
);

reservationRoutes.get(
  '/my',
  authenticate,
  asyncHandler(reservationController.listMine),
);
