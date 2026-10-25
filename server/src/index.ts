import { brand } from '../../shared/config';
import { createApp } from './app';
import { env } from './config/env';
import { ensureDatabase } from './db/bootstrap';
import { pool, verifyDatabaseConnection } from './db/pool';
import { initializeSchema } from './db/schema';
import { ensureDefaultAccounts } from './db/seed';

const start = async (): Promise<void> => {
  await ensureDatabase();
  await initializeSchema();
  await ensureDefaultAccounts();
  await verifyDatabaseConnection();

  const app = createApp();
  const server = app.listen(env.port, () => {
    console.log(
      `${brand.name} API is running on http://localhost:${env.port} (${env.nodeEnv})`,
    );
  });

  const shutdown = (signal: string): void => {
    console.log(`${signal} received, shutting down gracefully...`);
    server.close(() => {
      void pool.end().finally(() => process.exit(0));
    });
  };

  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));
};

void start().catch((error: unknown) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});
