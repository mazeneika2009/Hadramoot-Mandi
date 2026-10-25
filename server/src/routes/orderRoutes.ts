import { Router } from 'express';
import { orderController } from '../controllers/orderController';
import {
  authenticate,
  requireCashier,
  requireDelivery,
  requireKitchen,
  requireStaff,
} from '../middleware/auth';
import { checkoutLimiter } from '../middleware/rateLimit';
import {
  confirmDeliveryRules,
  dispatchOrderRules,
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

// Static routes must be declared before "/:id" so that "kitchen",
// "cashier", "delivery" and "drivers" are not interpreted as order IDs.
orderRoutes.get(
  '/kitchen',
  requireKitchen,
  asyncHandler(orderController.kitchenList),
);

orderRoutes.get(
  '/cashier',
  requireCashier,
  asyncHandler(orderController.cashierList),
);

orderRoutes.get(
  '/drivers',
  requireCashier,
  asyncHandler(orderController.driverList),
);

orderRoutes.get(
  '/delivery',
  requireDelivery,
  asyncHandler(orderController.deliveryList),
);

orderRoutes.get(
  '/:id',
  orderIdRules,
  validate,
  asyncHandler(orderController.getById),
);

orderRoutes.patch(
  '/:id/status',
  requireStaff,
  orderStatusRules,
  validate,
  asyncHandler(orderController.updateStatus),
);

orderRoutes.post(
  '/:id/dispatch',
  requireCashier,
  dispatchOrderRules,
  validate,
  asyncHandler(orderController.dispatch),
);

orderRoutes.post(
  '/:id/confirm-delivery',
  requireDelivery,
  confirmDeliveryRules,
  validate,
  asyncHandler(orderController.confirmDelivery),
);
