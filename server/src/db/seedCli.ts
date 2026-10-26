import { runMigrations } from './migrate';
import { runSeed } from './seed';

const run = async (): Promise<void> => {
  await runMigrations();
  await runSeed();
};

void run()
  .then(() => {
    console.log('Database seeded successfully');
    process.exitCode = 0;
  })
  .catch((error: unknown) => {
    console.error('Seeding failed:', error);
    process.exitCode = 1;
  });
