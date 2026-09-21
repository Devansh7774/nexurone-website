/**
 * Run pending migrations from migrations/migrate.sql.
 * Skips entirely when all tracked versions are already applied.
 *
 * Usage: npm run db:migrate
 */
import { runMigrations } from '../src/lib/dbMigrate.js';
import { loadEnv } from './lib/load-env.js';

async function main() {
  loadEnv();

  console.log('Connecting to database…');
  await runMigrations();
}

main().catch((err) => {
  console.error('\nMigration failed:', err.message);
  process.exit(1);
});

// test
