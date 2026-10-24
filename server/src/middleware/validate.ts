import type { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { ApiError } from '../utils/ApiError';

export const validate = (
  req: Request,
  _res: Response,
  next: NextFunction,
): void => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    next();
    return;
  }

  const errors = result.array().map((error) => {
    if (typeof error.msg === 'string') return error.msg;
    return 'قيمة غير صالحة';
  });

  next(ApiError.badRequest('بيانات غير صالحة', errors));
};
