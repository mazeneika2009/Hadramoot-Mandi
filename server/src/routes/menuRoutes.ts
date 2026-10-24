import { Router } from 'express';
import { menuController } from '../controllers/menuController';
import { authenticate, optionalAuthenticate, requireAdmin } from '../middleware/auth';
import {
  menuIdRules,
  menuItemRules,
  menuQueryRules,
} from '../middleware/validators';
import { validate } from '../middleware/validate';
import { asyncHandler } from '../utils/asyncHandler';

export const menuRoutes = Router();

menuRoutes.get(
  '/',
  optionalAuthenticate,
  menuQueryRules,
  validate,
  asyncHandler(menuController.list),
);

menuRoutes.get(
  '/:id',
  menuIdRules,
  validate,
  asyncHandler(menuController.getById),
);

menuRoutes.post(
  '/',
  authenticate,
  requireAdmin,
  menuItemRules,
  validate,
  asyncHandler(menuController.create),
);

menuRoutes.put(
  '/:id',
  authenticate,
  requireAdmin,
  menuIdRules,
  menuItemRules,
  validate,
  asyncHandler(menuController.update),
);

menuRoutes.patch(
  '/:id',
  authenticate,
  requireAdmin,
  menuIdRules,
  menuItemRules,
  validate,
  asyncHandler(menuController.update),
);

menuRoutes.delete(
  '/:id',
  authenticate,
  requireAdmin,
  menuIdRules,
  validate,
  asyncHandler(menuController.remove),
);
