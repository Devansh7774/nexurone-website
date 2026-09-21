/**
 * Load env files the same way Next.js does: .env then .env.local (local overrides).
 */
import dotenv from 'dotenv';

export function loadEnv() {
  dotenv.config({ path: '.env' });
  dotenv.config({ path: '.env.local', override: true });
}
