import { Router } from 'express';
import { orderController } from '../controllers/orderController';
import { reservationController } from '../controllers/reservationController';
import { authenticate, requireAdmin } from '../middleware/auth';
import { reservationStatusRules } from '../middleware/validators';
import { validate } from '../middleware/validate';
import { asyncHandler } from '../utils/asyncHandler';

export const adminRoutes = Router();

adminRoutes.use(authenticate, requireAdmin);

adminRoutes.get('/orders', asyncHandler(orderController.adminList));
adminRoutes.get('/stats', asyncHandler(orderController.stats));
adminRoutes.get('/reservations', asyncHandler(reservationController.adminList));

adminRoutes.patch(
  '/reservations/:id/status',
  reservationStatusRules,
  validate,
  asyncHandler(reservationController.updateStatus),
);
