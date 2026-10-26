import fs from 'node:fs/promises';
import path from 'node:path';
import { Client, type ClientConfig } from 'pg';
import { env } from '../config/env';

const findMigrationsDirectory = async (): Promise<string> => {
  const candidates = [
    path.resolve(process.cwd(), 'supabase', 'migrations'),
    path.resolve(process.cwd(), '..', 'supabase', 'migrations'),
  ];

  for (const candidate of candidates) {
    try {
      const stats = await fs.stat(candidate);
      if (stats.isDirectory()) return candidate;
    } catch {
      // Try the next candidate.
    }
  }

  throw new Error(
    'Could not find supabase/migrations. Run this command from the repository root or the server workspace.',
  );
};

/**
 * pg-connection-string maps `sslmode=require` to strict certificate checking,
 * which rejects Supabase's certificate chain in some environments. We supply
 * the `ssl` options explicitly instead.
 */
const normalizeConnectionString = (url: string): string => {
  try {
    const parsed = new URL(url);
    parsed.searchParams.delete('sslmode');
    return parsed.toString();
  } catch {
    return url;
  }
};

const buildClientConfig = (): ClientConfig => {
  if (env.postgres.url) {
    return {
      connectionString: normalizeConnectionString(env.postgres.url),
      ssl: { rejectUnauthorized: false },
    };
  }

  if (!env.postgres.host || !env.postgres.user) {
    throw new Error(
      'Set POSTGRES_URL_NON_POOLING (recommended) or POSTGRES_HOST/POSTGRES_USER/POSTGRES_PASSWORD before running db:init.',
    );
  }

  return {
    host: env.postgres.host,
    port: env.postgres.port,
    user: env.postgres.user,
    password: env.postgres.password,
    database: env.postgres.database,
    ssl:
      env.postgres.host === 'localhost' || env.postgres.host === '127.0.0.1'
        ? false
        : { rejectUnauthorized: false },
  };
};

/**
 * Applies SQL files from supabase/migrations in filename order and records
 * them in public.schema_migrations to keep reruns cheap.
 *
 * Supabase's JS client cannot execute DDL, so this one-off tool uses a direct
 * PostgreSQL connection. The API runtime never imports `pg`.
 */
export const runMigrations = async (): Promise<void> => {
  const migrationsDir = await findMigrationsDirectory();
  const files = (await fs.readdir(migrationsDir))
    .filter((file) => file.endsWith('.sql'))
    .sort();

  if (files.length === 0) {
    console.log('No migration files found.');
    return;
  }

  const client = new Client(buildClientConfig());

  try {
    await client.connect();

    await client.query(`
      create table if not exists public.schema_migrations (
        filename text primary key,
        applied_at timestamptz not null default now()
      )
    `);

    await client.query(
      'alter table public.schema_migrations enable row level security',
    );

    const appliedResult = await client.query<{ filename: string }>(
      'select filename from public.schema_migrations',
    );
    const applied = new Set(appliedResult.rows.map((row) => row.filename));

    for (const file of files) {
      if (applied.has(file)) {
        console.log(`Skipping already applied migration: ${file}`);
        continue;
      }

      const sql = await fs.readFile(path.join(migrationsDir, file), 'utf8');
      console.log(`Applying migration: ${file}`);

      await client.query('begin');
      try {
        await client.query(sql);
        await client.query(
          'insert into public.schema_migrations (filename) values ($1)',
          [file],
        );
        await client.query('commit');
      } catch (error) {
        await client.query('rollback').catch(() => undefined);
        throw error;
      }
    }

    console.log('Database migrations applied successfully.');
  } finally {
    await client.end().catch(() => undefined);
  }
};
