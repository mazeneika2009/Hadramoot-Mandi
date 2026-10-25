import type { NextFunction, Request, Response } from 'express';
import { userRepository } from '../repositories/userRepository';
import { ApiError } from '../utils/ApiError';
import { asyncHandler } from '../utils/asyncHandler';
import { verifyToken } from '../utils/jwt';

const authenticateRequest = async (req: Request): Promise<void> => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    throw ApiError.unauthorized('يجب تسجيل الدخول للمتابعة', 'AUTH_REQUIRED');
  }

  const token = header.slice(7).trim();
  if (!token) {
    throw ApiError.unauthorized('يجب تسجيل الدخول للمتابعة', 'AUTH_REQUIRED');
  }

  try {
    const payload = verifyToken(token);
    const user = await userRepository.findById(payload.id);
    if (!user) {
      throw ApiError.unauthorized('الحساب غير موجود', 'AUTH_USER_NOT_FOUND');
    }

    // Approval only gates staff accounts. Customers are auto-approved and
    // administrators can never be locked out of their own panel.
    const requiresApproval =
      user.role === 'kitchen' ||
      user.role === 'cashier' ||
      user.role === 'delivery';
    if (requiresApproval && !user.isApproved) {
      throw ApiError.unauthorized(
        'حسابك قيد المراجعة، يرجى انتظار موافقة الإدارة',
        'USER_NOT_APPROVED',
      );
    }

    req.user = { id: user.id, email: user.email, role: user.role, isApproved: user.isApproved };
  } catch (error) {
    // إذا كان الخطأ مسجلاً مسبقاً كـ ApiError نمرره، وإلا نعتبر أي خطأ في الـ Token هو 401
    if (error instanceof ApiError) {
      throw error;
    }
    throw ApiError.unauthorized('انتهت صلاحية الجلسة ', 'INVALID_TOKEN');
  }
};

export const authenticate = asyncHandler(
  async (req: Request, _res: Response, next: NextFunction) => {
    await authenticateRequest(req);
    next();
  },
);

export const optionalAuthenticate = asyncHandler(
  async (req: Request, _res: Response, next: NextFunction) => {
    if (req.headers.authorization) {
      try {
        await authenticateRequest(req);
      } catch {
        req.user = undefined;
      }
    }
    next();
  },
);

export const requireAdmin = (
  req: Request,
  _res: Response,
  next: NextFunction,
): void => {
  if (!req.user) {
    next(ApiError.unauthorized('يجب تسجيل الدخول للمتابعة', 'AUTH_REQUIRED'));
    return;
  }
  if (req.user.role !== 'admin') {
    next(ApiError.forbidden('غير مصرح لك بالوصول'));
    return;
  }
  next();
};

export const requireKitchen = (
  req: Request,
  _res: Response,
  next: NextFunction,
): void => {
  if (!req.user) {
    next(ApiError.unauthorized('يجب تسجيل الدخول للمتابعة', 'AUTH_REQUIRED'));
    return;
  }
  if (req.user.role !== 'kitchen' && req.user.role !== 'admin') {
    next(ApiError.forbidden('هذه الصفحة مخصصة لفريق المطبخ'));
    return;
  }
  next();
};

export const requireCashier = (
  req: Request,
  _res: Response,
  next: NextFunction,
): void => {
  if (!req.user) {
    next(ApiError.unauthorized('يجب تسجيل الدخول للمتابعة', 'AUTH_REQUIRED'));
    return;
  }
  if (req.user.role !== 'cashier' && req.user.role !== 'admin') {
    next(ApiError.forbidden('هذه الصفحة مخصصة للكاشير'));
    return;
  }
  next();
};

export const requireStaff = (
  req: Request,
  _res: Response,
  next: NextFunction,
): void => {
  if (!req.user) {
    next(ApiError.unauthorized('يجب تسجيل الدخول للمتابعة', 'AUTH_REQUIRED'));
    return;
  }
  if (
    req.user.role !== 'admin' &&
    req.user.role !== 'kitchen' &&
    req.user.role !== 'cashier'
  ) {
    next(ApiError.forbidden('غير مصرح لك بتحديث حالة الطلب'));
    return;
  }
  next();
};

export const requireDelivery = (
  req: Request,
  _res: Response,
  next: NextFunction,
): void => {
  if (!req.user) {
    next(ApiError.unauthorized('يجب تسجيل الدخول للمتابعة', 'AUTH_REQUIRED'));
    return;
  }
  if (req.user.role !== 'delivery' && req.user.role !== 'admin') {
    next(ApiError.forbidden('هذه الصفحة مخصصة لفريق التوصيل'));
    return;
  }
  next();
};