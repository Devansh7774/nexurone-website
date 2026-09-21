/**
 * One-off script helper: opens a single connection and always closes it.
 * Use this in seed/migration scripts — never create long-lived pools in scripts.
 */
import mysql from 'mysql2/promise';
import { parseDatabaseUrl } from '../../src/lib/mysqlConfig.js';

export function getScriptConnectionConfig() {
  return parseDatabaseUrl(process.env.DATABASE_URL);
}

export async function withScriptConnection(fn) {
  const conn = await mysql.createConnection(getScriptConnectionConfig());
  try {
    return await fn(conn);
  } finally {
    await conn.end();
  }
}
