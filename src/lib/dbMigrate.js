import fs from 'fs';
import path from 'path';
import mysql from 'mysql2/promise';
import { parseDatabaseUrl } from './mysqlConfig.js';

/** Keep in sync with INSERT statements at the end of migrations/migrate.sql */
export const MIGRATION_VERSIONS = [
  { version: '1.0', description: 'Full Nexuron schema migration' },
  { version: '1.1', description: 'Add email_verified_at to users' },
];

const IGNORABLE_ERROR_CODES = new Set(['ER_DUP_KEYNAME']);

function getConnectionConfig() {
  return parseDatabaseUrl(process.env.DATABASE_URL);
}

function resolveMigrationFile() {
  const migrationFile = path.join(
    /* turbopackIgnore: true */ process.cwd(),
    'migrations',
    'migrate.sql'
  );

  if (!fs.existsSync(migrationFile)) {
    throw new Error('Migration file not found: migrations/migrate.sql');
  }

  return migrationFile;
}

function splitSqlStatements(sql) {
  return sql
    .split(/;\s*\n/)
    .map((chunk) =>
      chunk
        .split('\n')
        .filter((line) => !line.trim().startsWith('--'))
        .join('\n')
        .trim()
    )
    .filter(Boolean);
}

async function getAppliedVersions(conn) {
  try {
    const [rows] = await conn.query(
      'SELECT version FROM schema_migrations ORDER BY version'
    );
    return rows.map((row) => row.version);
  } catch (err) {
    if (err.code === 'ER_NO_SUCH_TABLE') {
      return [];
    }
    throw err;
  }
}

async function runMigrationFile(conn, migrationFile) {
  const sql = fs.readFileSync(migrationFile, 'utf8');
  const statements = splitSqlStatements(sql);

  console.log(`Running ${statements.length} statements from migrate.sql…\n`);

  for (const statement of statements) {
    const preview = statement.replace(/\s+/g, ' ').slice(0, 72);
    try {
      await conn.query(statement);
      console.log(`✓ ${preview}${statement.length > 72 ? '…' : ''}`);
    } catch (err) {
      if (IGNORABLE_ERROR_CODES.has(err.code)) {
        console.log(`↷ skipped (already exists): ${preview}…`);
        continue;
      }
      throw err;
    }
  }
}

/**
 * Apply pending SQL migrations. No-op when schema_migrations is up to date.
 */
export async function runMigrations() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not set');
  }

  const requiredVersions = MIGRATION_VERSIONS.map((migration) => migration.version);
  const migrationFile = resolveMigrationFile();
  const conn = await mysql.createConnection(getConnectionConfig());

  try {
    await conn.query('SELECT 1');

    const applied = await getAppliedVersions(conn);
    const appliedSet = new Set(applied);
    const pending = requiredVersions.filter((version) => !appliedSet.has(version));

    if (pending.length === 0) {
      console.log(
        `✓ Database already migrated (${applied.join(', ')}). Nothing to do.`
      );
      return { skipped: true, applied };
    }

    console.log(`Pending migrations: ${pending.join(', ')}\n`);
    await runMigrationFile(conn, migrationFile);

    const appliedAfter = await getAppliedVersions(conn);
    const stillPending = requiredVersions.filter(
      (version) => !new Set(appliedAfter).has(version)
    );

    if (stillPending.length > 0) {
      throw new Error(
        `Migration incomplete. Still pending: ${stillPending.join(', ')}`
      );
    }

    console.log('\nApplied migrations:');
    for (const row of appliedAfter) {
      const meta = MIGRATION_VERSIONS.find((migration) => migration.version === row);
      console.log(`  ${row} — ${meta?.description || 'applied'}`);
    }

    console.log('\nMigration complete.');
    return { skipped: false, applied: appliedAfter };
  } finally {
    await conn.end();
  }
}
