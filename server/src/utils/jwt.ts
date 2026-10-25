import jwt, { type SignOptions } from 'jsonwebtoken';
import type { AuthUser, Role } from '../types/domain';
import { env } from '../config/env';
import { ApiError } from './ApiError';

interface TokenPayload extends jwt.JwtPayload {
  sub: string;
  email: string;
  role: Role;
}

const isRole = (value: unknown): value is Role =>
  value === 'customer' ||
  value === 'admin' ||
  value === 'kitchen' ||
  value === 'cashier';

export const signToken = (user: AuthUser): string => {
  const options: SignOptions = {
    expiresIn: env.jwt.expiresIn as SignOptions['expiresIn'],
    issuer: 'hadramout-house-of-mandi',
    audience: 'hadramout-web',
  };
  return jwt.sign(
    { sub: String(user.id), email: user.email, role: user.role },
    env.jwt.secret,
    options,
  );
};

export const verifyToken = (token: string): AuthUser => {
  try {
    const payload = jwt.verify(token, env.jwt.secret, {
      issuer: 'hadramout-house-of-mandi',
      audience: 'hadramout-web',
    }) as TokenPayload;
    const id = Number(payload.sub);
    if (
      !Number.isInteger(id) ||
      id <= 0 ||
      typeof payload.email !== 'string' ||
      !isRole(payload.role)
    ) {
      throw ApiError.unauthorized('رمز الدخول غير صالح', 'AUTH_TOKEN_INVALID');
    }
    return { id, email: payload.email, role: payload.role };
  } catch (error) {
    if (error instanceof ApiError) throw error;
    if (error instanceof jwt.TokenExpiredError) {
      throw ApiError.unauthorized(
        'انتهت صلاحية الجلسة، يرجى تسجيل الدخول',
        'AUTH_TOKEN_EXPIRED',
      );
    }
    throw ApiError.unauthorized('رمز الدخول غير صالح', 'AUTH_TOKEN_INVALID');
  }
};
