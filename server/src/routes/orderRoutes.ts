import { Router } from 'express';
import { orderController } from '../controllers/orderController';
import { authenticate, requireAdmin } from '../middleware/auth';
import { checkoutLimiter } from '../middleware/rateLimit';
import {
  orderIdRules,
  orderRules,
  orderStatusRules,
} from '../middleware/validators';
import { validate } from '../middleware/validate';
import { asyncHandler } from '../utils/asyncHandler';

export const orderRoutes = Router();

orderRoutes.use(authenticate);

orderRoutes.post(
  '/',
  checkoutLimiter,
  orderRules,
  validate,
  asyncHandler(orderController.create),
);

orderRoutes.get('/', asyncHandler(orderController.listMine));

orderRoutes.get(
  '/:id',
  orderIdRules,
  validate,
  asyncHandler(orderController.getById),
);

orderRoutes.patch(
  '/:id/status',
  requireAdmin,
  orderStatusRules,
  validate,
  asyncHandler(orderController.updateStatus),
);
