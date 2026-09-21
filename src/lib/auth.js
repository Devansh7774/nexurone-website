import { cache } from 'react';
import { cookies } from 'next/headers';
import { query } from './db';
import { canManageUsers } from './roles';
import { ADMIN_LOGIN_PATH } from './adminRoutes';

const COOKIE_NAME = 'nexuron_auth';
const EXPIRY_DAYS = parseInt(process.env.AUTH_TOKEN_EXPIRY_DAYS || '7', 10);
const SESSION_TOUCH_MS = parseInt(process.env.AUTH_SESSION_TOUCH_MS || '60000', 10);

/** Debounce session last_used_at writes (avoids extra DB connections per request). */
const sessionTouchCache = globalThis.__nexuronSessionTouch ??= new Map();

/**
 * Generate a cryptographically-random opaque token.
 */
export function generateToken() {
  return crypto.randomUUID().replace(/-/g, '') + crypto.randomUUID().replace(/-/g, '');
}

/**
 * Create a session token in the DB and set it as an HttpOnly cookie.
 * @param {string} userId
 * @param {{ ip?: string, userAgent?: string }} meta
 */
export async function createSession(userId, meta = {}) {
  const token = generateToken();
  const expiresAt = new Date(Date.now() + EXPIRY_DAYS * 24 * 60 * 60 * 1000);

  await query(
    `INSERT INTO auth_tokens (id, user_id, token, token_type, expires_at, ip_address, user_agent)
     VALUES ($1, $2, $3, 'session', $4, $5, $6)`,
    [crypto.randomUUID(), userId, token, expiresAt, meta.ip || null, meta.userAgent || null]
  );

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    expires: expiresAt,
    path: '/',
  });

  return token;
}

/**
 * Verify the token from the cookie and return the user row, or null.
 * Deduplicated per request; throttles last_used_at updates.
 */
export const verifySession = cache(async function verifySession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;

  const result = await query(
    `SELECT u.id, u.name, u.email, u.role, u.avatar_url, u.is_active,
            t.expires_at
     FROM auth_tokens t
     JOIN users u ON u.id = t.user_id
     WHERE t.token = $1
       AND t.expires_at > NOW()
       AND u.is_active = 1`,
    [token]
  );

  if (result.rowCount === 0) return null;

  const now = Date.now();
  const lastTouch = sessionTouchCache.get(token) || 0;
  if (now - lastTouch >= SESSION_TOUCH_MS) {
    sessionTouchCache.set(token, now);
    query(`UPDATE auth_tokens SET last_used_at = NOW() WHERE token = $1`, [token]).catch(() => {});
  }

  return result.rows[0];
});

/**
 * Delete the current session token and clear the cookie.
 */
export async function destroySession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (token) {
    await query(`DELETE FROM auth_tokens WHERE token = $1`, [token]);
    cookieStore.delete(COOKIE_NAME);
  }
}

/**
 * Require authentication in a server component / route handler.
 * Throws a Response redirect to the admin login page if not authenticated.
 */
export async function requireAuth() {
  const user = await verifySession();
  if (!user) {
    throw new Response(null, {
      status: 302,
      headers: { Location: ADMIN_LOGIN_PATH },
    });
  }
  return user;
}

/** API helper — returns user or null response for 401/403. */
export async function requireApiUser(options = {}) {
  const user = await verifySession();
  if (!user) {
    return { error: Response.json({ error: 'Unauthorized.' }, { status: 401 }) };
  }
  if (options.superAdmin && !canManageUsers(user)) {
    return { error: Response.json({ error: 'Forbidden. Admin access required.' }, { status: 403 }) };
  }
  return { user };
}
