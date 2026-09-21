/** Hostinger runs `npm start` → `next start`. Migrations: `npm run db:migrate` */
export async function register() {
  if (process.env.NEXT_RUNTIME === 'edge') return;

  const masked = maskDatabaseUrl(process.env.DATABASE_URL);
  console.log('[nexuron-start] PORT=', process.env.PORT ?? '(not set)');
  console.log('[nexuron-start] NODE_ENV=', process.env.NODE_ENV ?? '(not set)');
  console.log('[nexuron-start] DATABASE_URL set=', Boolean(process.env.DATABASE_URL));
  console.log('[nexuron-start] DATABASE_URL=', masked);
}

function maskDatabaseUrl(url) {
  if (!url) return '(not set)';

  try {
    const parsed = new URL(url);
    const user = decodeURIComponent(parsed.username);
    const password = decodeURIComponent(parsed.password || '');
    const host = parsed.hostname;
    const port = parsed.port || '3306';
    const database = parsed.pathname.replace(/^\//, '');

    return `mysql://${user}:***(${password.length} chars)@${host}:${port}/${database}`;
  } catch {
    return '(invalid URL — check encoding)';
  }
}
