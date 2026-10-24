import type { Request } from 'express';
import type { AuthUser } from '../types/domain';
import { ApiError } from './ApiError';

export const requireAuthUser = (req: Request): AuthUser => {
  if (!req.user) {
    throw ApiError.unauthorized();
  }
  return req.user;
};

export const parseId = (value: string | undefined, label = 'المعرّف'): number => {
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed <= 0) {
    throw ApiError.badRequest(`${label} غير صالح`);
  }
  return parsed;
};

export const paginationFromQuery = (
  query: Request['query'],
  defaultLimit: number,
  maxLimit: number,
): { page: number; limit: number; offset: number } => {
  const rawPage = Number(query.page ?? 1);
  const rawLimit = Number(query.limit ?? defaultLimit);
  const page =
    Number.isInteger(rawPage) && rawPage > 0 ? Math.min(rawPage, 100000) : 1;
  const limit =
    Number.isInteger(rawLimit) && rawLimit > 0
      ? Math.min(rawLimit, maxLimit)
      : defaultLimit;
  return { page, limit, offset: (page - 1) * limit };
};

export const escapeLike = (value: string): string =>
  value.replace(/[\\%_]/g, (character) => `\\${character}`);
