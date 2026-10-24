import { ensureDatabase } from './bootstrap';
import { initializeSchema } from './schema';
import { pool } from './pool';

const run = async (): Promise<void> => {
  await ensureDatabase();
  await initializeSchema();
  console.log('Database schema initialized successfully');
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
