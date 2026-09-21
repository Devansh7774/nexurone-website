/**
 * Parse DATABASE_URL into mysql2 connection options.
 *
 * Hostinger: MySQL users are often granted for remote hosts (`%`), not
 * `localhost`/`127.0.0.1`. Use `@82.25.121.46` in DATABASE_URL on the server.
 * Keep `localhost` as-is (mysql2 may use a Unix socket); do not force 127.0.0.1.
 */
const HOSTINGER_IPV4 = {
  'srv1990.hstgr.io': '82.25.121.46',
};

export function parseDatabaseUrl(databaseUrl) {
  if (!databaseUrl) {
    throw new Error('DATABASE_URL is not set');
  }

  const parsed = new URL(databaseUrl);
  let host = parsed.hostname;

  if (process.env.DB_HOST_IPV4) {
    host = process.env.DB_HOST_IPV4;
  } else if (HOSTINGER_IPV4[host.toLowerCase()]) {
    host = HOSTINGER_IPV4[host.toLowerCase()];
  }

  return {
    host,
    port: parsed.port ? Number(parsed.port) : 3306,
    user: decodeURIComponent(parsed.username),
    password: decodeURIComponent(parsed.password),
    database: parsed.pathname.replace(/^\//, ''),
  };
}
