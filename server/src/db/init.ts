import { ensureDatabase } from './bootstrap';
import { initializeSchema } from './schema';
import { ensureDefaultAccounts } from './seed';
import { pool } from './pool';

const run = async (): Promise<void> => {
  await ensureDatabase();
  await initializeSchema();
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
  })
  .finally(() => {
    void pool.end();
  });
