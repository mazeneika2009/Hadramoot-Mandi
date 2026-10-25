import { pool } from './pool';
import { runSeed } from './seed';

void runSeed()
  .then(() => {
    console.log('Database seeded successfully');
    process.exitCode = 0;
  })
  .catch((error: unknown) => {
    console.error('Seeding failed:', error);
    process.exitCode = 1;
  })
  .finally(() => {
    void pool.end();
  });
