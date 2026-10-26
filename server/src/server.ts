import { brand } from '../../shared/config';
import { env } from './config/env';
import app from './index';
import { verifyDatabaseConnection } from './db/client';
import { ensureDefaultAccounts } from './db/seed';

const start = async (): Promise<void> => {
  await verifyDatabaseConnection();
  await ensureDefaultAccounts();

  const server = app.listen(env.port, () => {
    console.log(
      `${brand.name} API is running on http://localhost:${env.port} (${env.nodeEnv})`,
    );
  });

  const shutdown = (signal: string): void => {
    console.log(`${signal} received, shutting down gracefully...`);
    server.close(() => process.exit(0));
  };

  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));
};

void start().catch((error: unknown) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});
