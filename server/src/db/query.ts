import type { PostgrestError } from '@supabase/supabase-js';

/**
 * Wraps a PostgREST error so the Express error handler can inspect the
 * PostgreSQL SQLSTATE code (for example `23505` for a unique violation).
 */
export class DatabaseError extends Error {
  public readonly code?: string;
  public readonly details: string | null;
  public readonly hint: string | null;

  constructor(context: string, error: PostgrestError) {
    super(`${context}: ${error.message}`);
    this.name = 'DatabaseError';
    this.code = error.code;
    this.details = error.details;
    this.hint = error.hint;
  }
}

export const assertNoError = (
  error: PostgrestError | null,
  context: string,
): void => {
  if (!error) return;

  console.error(`[supabase] ${context}:`, {
    code: error.code,
    message: error.message,
    details: error.details,
    hint: error.hint,
  });

  throw new DatabaseError(context, error);
};

export const unwrap = <T>(
  result: { data: T; error: PostgrestError | null },
  context: string,
): T => {
  assertNoError(result.error, context);
  return result.data;
};
