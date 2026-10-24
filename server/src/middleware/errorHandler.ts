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

  if (dbError.code === 'ER_DUP_ENTRY') {
    res.status(409).json({
      success: false,
      message: 'هذا السجل موجود مسبقاً',
    });
    return;
  }

  if (
    dbError.code === 'ER_ROW_IS_REFERENCED_2' ||
    dbError.code === 'ER_NO_REFERENCED_ROW_2'
  ) {
    res.status(409).json({
      success: false,
      message: 'لا يمكن تنفيذ العملية لوجود بيانات مرتبطة',
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
