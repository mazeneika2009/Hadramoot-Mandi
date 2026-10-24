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

  const payload = verifyToken(token);
  const user = await userRepository.findById(payload.id);
  if (!user) {
    throw ApiError.unauthorized('الحساب غير موجود', 'AUTH_USER_NOT_FOUND');
  }

  req.user = { id: user.id, email: user.email, role: user.role };
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
    next(ApiError.unauthorized());
    return;
  }
  if (req.user.role !== 'admin') {
    next(ApiError.forbidden());
    return;
  }
  next();
};
