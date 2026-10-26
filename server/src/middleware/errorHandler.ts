import type { NextFunction, Request, Response } from 'express';
import { env } from '../config/env';
import { ApiError } from '../utils/ApiError';

interface DatabaseError extends Error {
  code?: string;
  type?: string;
}

export const notFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  if (req.path.startsWith('/api')) {
    res.status(404).json({ success: false, message: 'المسار غير موجود' });
    return;
  }
  next();
};

export const errorHandler = (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  if (res.headersSent) return;

  if (error instanceof ApiError) {
    res.status(error.statusCode).json({
      success: false,
      message: error.message,
      ...(error.code ? { code: error.code } : {}),
      ...(error.errors ? { errors: error.errors } : {}),
    });
    return;
  }

  const dbError = error as DatabaseError;

  // PostgreSQL SQLSTATE 23505: unique_violation.
  if (dbError.code === '23505') {
    res.status(409).json({
      success: false,
      message: 'هذا السجل موجود مسبقاً',
    });
    return;
  }

  // PostgreSQL SQLSTATE 23503: foreign_key_violation.
  if (dbError.code === '23503') {
    res.status(409).json({
      success: false,
      message: 'لا يمكن تنفيذ العملية لوجود بيانات مرتبطة',
    });
    return;
  }

  // PostgreSQL SQLSTATE 23514 / 22P02 / 22023: invalid value, enum or check.
  if (
    dbError.code === '23514' ||
    dbError.code === '22P02' ||
    dbError.code === '22023'
  ) {
    res.status(400).json({
      success: false,
      message: 'البيانات المرسلة غير صالحة',
    });
    return;
  }

  // PostgREST cannot return a single row (for example after an update).
  if (dbError.code === 'PGRST116') {
    res.status(404).json({
      success: false,
      message: 'العنصر غير موجود',
    });
    return;
  }

  if (dbError.type === 'entity.too.large') {
    res.status(413).json({
      success: false,
      message: 'حجم البيانات المرسل كبير جداً',
    });
    return;
  }

  if (dbError.type === 'entity.parse.failed') {
    res.status(400).json({
      success: false,
      message: 'صيغة JSON غير صالحة',
    });
    return;
  }

  console.error('Unhandled error:', error);
  res.status(500).json({
    success: false,
    message: env.isProduction
      ? 'حدث خطأ في الخادم، يرجى المحاولة لاحقاً'
      : error instanceof Error
        ? error.message
        : 'حدث خطأ غير متوقع',
  });
};
