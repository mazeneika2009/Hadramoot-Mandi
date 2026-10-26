import { verifyDatabaseConnection } from './client';
import { runMigrations } from './migrate';
import { ensureDefaultAccounts } from './seed';

const run = async (): Promise<void> => {
  await runMigrations();
  await verifyDatabaseConnection();
  await ensureDefaultAccounts();
  console.log('Database schema and default accounts initialized successfully');
};

void run()
  .then(() => {
    process.exitCode = 0;
  })
  .catch((error: unknown) => {
    console.error('Database initialization failed:', error);
    process.exitCode = 1;
  });
