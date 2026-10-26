import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { env } from '../config/env';

/**
 * Single Supabase client for the API process.
 *
 * The API uses the service-role key because it performs privileged operations
 * (creating staff accounts, updating orders, etc.) and enforces authorization
 * in Express middleware. Row Level Security stays enabled in the database, so
 * the anon/public keys cannot read or write these tables directly.
 */
export const supabase: SupabaseClient = createClient(
  env.supabase.url,
  env.supabase.serviceRoleKey,
  {
    auth: {
      autoRefreshToken: false,
      detectSessionInUrl: false,
      persistSession: false,
    },
    db: {
      schema: 'public',
    },
  },
);

const delay = (milliseconds: number): Promise<void> =>
  new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });

/**
 * Fails fast at startup when the Supabase project is unreachable or the
 * migration has not been applied yet. A few retries cover the short window
 * after a migration while PostgREST refreshes its schema cache.
 */
export const verifyDatabaseConnection = async (): Promise<void> => {
  const attempts = 5;
  let lastMessage = 'unknown error';

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    const { error } = await supabase
      .from('users')
      .select('id', { count: 'exact', head: true })
      .limit(1);

    if (!error) return;

    lastMessage = error.message;
    if (attempt < attempts) {
      await delay(500);
    }
  }

  throw new Error(
    `Unable to reach Supabase (${env.supabase.url}): ${lastMessage}. Has "npm run db:init" been run?`,
  );
};
