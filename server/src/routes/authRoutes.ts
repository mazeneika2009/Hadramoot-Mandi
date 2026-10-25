import { Router } from 'express';
import { authController } from '../controllers/authController';
import { authenticate, requireAdmin } from '../middleware/auth';
import { authLimiter } from '../middleware/rateLimit';
import { loginRules, registerRules } from '../middleware/validators';
import { validate } from '../middleware/validate';
import { asyncHandler } from '../utils/asyncHandler';

export const authRoutes = Router();

authRoutes.post(
  '/register',
  authLimiter,
  registerRules,
  validate,
  asyncHandler(authController.register),
);

authRoutes.post(
  '/login',
  authLimiter,
  loginRules,
  validate,
  asyncHandler(authController.login),
);

authRoutes.get('/me', authenticate, asyncHandler(authController.me));

authRoutes.patch(
  '/users/:id/approve',
  authenticate,
  requireAdmin,
  asyncHandler(authController.approveUser),
);

authRoutes.post(
  '/staff/create',
  authenticate,
  requireAdmin,
  asyncHandler(authController.createStaff),
);
