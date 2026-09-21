import mysql from 'mysql2/promise';
import { parseDatabaseUrl } from './mysqlConfig.js';
const globalForDb = globalThis;
const POOL_KEY = '__nexuronMysqlPool';
const SHUTDOWN_REGISTERED_KEY = '__nexuronMysqlShutdownRegistered';

const RETRIABLE_ERROR_CODES = new Set([
  'ER_CON_COUNT_ERROR',
  'PROTOCOL_CONNECTION_LOST',
  'ECONNRESET',
  'ETIMEDOUT',
  'ECONNREFUSED',
]);

function parseIntEnv(name, fallback, { min = 1, max = 50 } = {}) {
  const raw = process.env[name];
  if (raw == null || raw === '') return fallback;
  const value = Number.parseInt(raw, 10);
  if (!Number.isFinite(value)) return fallback;
  return Math.min(max, Math.max(min, value));
}

function getMysqlConfig() {
  const parsed = parseDatabaseUrl(process.env.DATABASE_URL);
  const isDev = process.env.NODE_ENV !== 'production';

  return {
    ...parsed,
    connectionLimit: parseIntEnv('DB_POOL_LIMIT', isDev ? 5 : 10),
    maxIdle: parseIntEnv('DB_POOL_MAX_IDLE', isDev ? 2 : 5),
    idleTimeout: parseIntEnv('DB_POOL_IDLE_MS', 60_000, { min: 1000, max: 600_000 }),
    waitForConnections: true,
    queueLimit: parseIntEnv('DB_POOL_QUEUE_LIMIT', 0, { min: 0, max: 1000 }),
    connectTimeout: parseIntEnv('DB_CONNECT_TIMEOUT_MS', 15_000, { min: 1000, max: 60_000 }),
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
  };
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function registerPoolShutdown(pool) {
  if (globalForDb[SHUTDOWN_REGISTERED_KEY]) return;
  globalForDb[SHUTDOWN_REGISTERED_KEY] = true;

  const shutdown = async () => {
    try {
      await pool.end();
    } catch {
      // ignore shutdown errors
    } finally {
      globalForDb[POOL_KEY] = undefined;
    }
  };

  process.once('SIGINT', shutdown);
  process.once('SIGTERM', shutdown);
}

function getPool() {
  if (!globalForDb[POOL_KEY]) {
    const pool = mysql.createPool(getMysqlConfig());
    globalForDb[POOL_KEY] = pool;

    pool.on('error', (err) => {
      console.error('[db] MySQL pool error:', err.code || err.message);
    });

    registerPoolShutdown(pool);
  }
  return globalForDb[POOL_KEY];
}

/**
 * Convert PostgreSQL $1, $2 placeholders to MySQL ? and reorder params.
 * PG binds by index ($3 → params[2]); MySQL binds left-to-right in the SQL string.
 */
function toMysqlSql(text, params = []) {
  const safeParams = Array.isArray(params) ? params : [params];
  const placeholders = [...text.matchAll(/\$(\d+)/g)];
  if (placeholders.length === 0) {
    return { sql: text, orderedParams: safeParams };
  }

  const orderedParams = placeholders.map((match) => {
    const index = parseInt(match[1], 10) - 1;
    if (index < 0 || index >= safeParams.length) {
      throw new Error(`SQL placeholder $${match[1]} out of range (${safeParams.length} params)`);
    }
    return safeParams[index];
  });

  const sql = text.replace(/\$(\d+)/g, '?');
  return { sql, orderedParams };
}

/** Normalize COUNT(*) and parse JSON tag columns from MySQL rows. */
function normalizeRows(rows) {
  if (!Array.isArray(rows)) return [];

  return rows.map((row) => {
    const normalized = { ...row };

    for (const [key, value] of Object.entries(row)) {
      if (key.toLowerCase() === 'count(*)') {
        normalized.count = value;
      }
    }

    if (normalized.tags != null && typeof normalized.tags === 'string') {
      try {
        normalized.tags = JSON.parse(normalized.tags);
      } catch {
        // keep raw string if not valid JSON
      }
    }

    return normalized;
  });
}

function formatQueryResult(result) {
  if (Array.isArray(result)) {
    const rows = normalizeRows(result);
    return { rows, rowCount: rows.length };
  }

  return {
    rows: [],
    rowCount: result.affectedRows ?? 0,
    insertId: result.insertId,
  };
}

async function runWithRetry(operation, label = 'query') {
  const maxAttempts = parseIntEnv('DB_QUERY_RETRIES', 2, { min: 0, max: 5 }) + 1;

  let lastError;
  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      return await operation();
    } catch (err) {
      lastError = err;
      const canRetry = RETRIABLE_ERROR_CODES.has(err?.code) && attempt < maxAttempts;
      if (!canRetry) throw err;

      const delayMs = 150 * attempt;
      console.warn(`[db] ${label} failed (${err.code}), retry ${attempt}/${maxAttempts - 1} in ${delayMs}ms`);
      await sleep(delayMs);
    }
  }

  throw lastError;
}

function createClientAdapter(conn) {
  return {
    async query(text, params = []) {
      const { sql, orderedParams } = toMysqlSql(text, params);
      const [result] = await conn.query(sql, orderedParams);
      return formatQueryResult(result);
    },
  };
}

/**
 * Run a single query. Uses the shared pool so connections are always released.
 * Accepts PostgreSQL-style $1, $2 placeholders for compatibility.
 */
export async function query(text, params = []) {
  const { sql, orderedParams } = toMysqlSql(text, params);

  return runWithRetry(async () => {
    const [result] = await getPool().query(sql, orderedParams);
    return formatQueryResult(result);
  });
}

/**
 * Run multiple queries inside a single transaction (one connection).
 */
export async function withTransaction(fn) {
  return runWithRetry(async () => {
    const conn = await getPool().getConnection();
    const client = createClientAdapter(conn);

    try {
      await conn.beginTransaction();
      const result = await fn(client);
      await conn.commit();
      return result;
    } catch (err) {
      await conn.rollback();
      throw err;
    } finally {
      conn.release();
    }
  }, 'transaction');
}

/** Lightweight health check for ops/debug endpoints. */
export async function pingDb() {
  await query('SELECT 1');
  return true;
}

/** Close the shared pool (mainly for scripts/tests). */
export async function closePool() {
  const pool = globalForDb[POOL_KEY];
  if (!pool) return;
  await pool.end();
  globalForDb[POOL_KEY] = undefined;
}
