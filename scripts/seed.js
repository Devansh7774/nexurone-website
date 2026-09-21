/**
 * Seed script — creates the first super admin (bootstrap only).
 *
 * Usage:
 *   SEED_ADMIN_EMAIL=info@nexurontechnologies.com SEED_ADMIN_PASSWORD='YourStrongPassword12!' npm run seed
 *
 * Requires DATABASE_URL in .env (MySQL connection string).
 * Only runs when no super_admin exists in the database.
 */

import bcrypt from 'bcryptjs';
import { loadEnv } from './lib/load-env.js';

loadEnv();
import { withScriptConnection } from './lib/db-script.js';

function getSeedConfig() {
  const email = process.env.SEED_ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.SEED_ADMIN_PASSWORD;
  const name = process.env.SEED_ADMIN_NAME?.trim() || 'Super Admin';

  if (!email) {
    throw new Error('SEED_ADMIN_EMAIL is required (e.g. info@nexurontechnologies.com).');
  }

  if (!password || password.length < 12) {
    throw new Error('SEED_ADMIN_PASSWORD is required and must be at least 12 characters.');
  }

  return {
    name,
    email,
    password,
    role: 'super_admin',
  };
}

async function seed() {
  try {
    const admin = getSeedConfig();
    console.log('Connecting to database…');

    await withScriptConnection(async (conn) => {
      await conn.query('SELECT 1');
      console.log('Connected.\n');

      const [superAdmins] = await conn.execute(
        `SELECT id, email FROM users WHERE role = 'super_admin' LIMIT 1`
      );

      if (superAdmins.length > 0) {
        console.log(`Super admin already exists: ${superAdmins[0].email}`);
        console.log('Skipping seed.');
        return;
      }

      const [existingEmail] = await conn.execute(
        `SELECT id FROM users WHERE email = ?`,
        [admin.email]
      );

      if (existingEmail.length > 0) {
        console.error(`A user with email ${admin.email} already exists but is not a super admin.`);
        console.error('Use a different SEED_ADMIN_EMAIL or promote that user manually.');
        process.exit(1);
      }

      const passwordHash = await bcrypt.hash(admin.password, 12);
      const userId = crypto.randomUUID();

      await conn.execute(
        `INSERT INTO users (id, name, email, password_hash, role, email_verified_at)
         VALUES (?, ?, ?, ?, ?, NOW())`,
        [userId, admin.name, admin.email, passwordHash, admin.role]
      );

      console.log('Super admin created successfully!');
      console.log('─────────────────────────────────────');
      console.log(`  Email:    ${admin.email}`);
      console.log(`  Role:     ${admin.role}`);
      console.log(`  ID:       ${userId}`);
      console.log('  Email:    pre-verified (bootstrap account)');
      console.log('─────────────────────────────────────');
      console.log('\nSign in at /shiv_admin_login with the password you set in SEED_ADMIN_PASSWORD.\n');
    });
  } catch (err) {
    console.error('Seed failed:', err.message);
    process.exit(1);
  }
}

seed();
