/** Canonical site URL for metadata, sitemap, and canonical links. */
export function getSiteUrl() {
  const fromEnv =
    process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_APP_URL;
  if (fromEnv) {
    return fromEnv.replace(/\/$/, '');
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return 'http://localhost:3000';
}

/** Prefer env URL; otherwise derive from the incoming request (production canonical). */
export function getRequestSiteUrl(headersList) {
  const fromEnv =
    process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_APP_URL;
  if (fromEnv && !fromEnv.includes('localhost')) {
    return fromEnv.replace(/\/$/, '');
  }

  const host = headersList?.get('x-forwarded-host') || headersList?.get('host');
  if (host && !host.includes('localhost')) {
    const proto = headersList.get('x-forwarded-proto') || 'https';
    return `${proto}://${host.split(',')[0].trim()}`;
  }

  return getSiteUrl();
}

export function absoluteUrl(path = '/', base = getSiteUrl()) {
  const normalizedBase = base.replace(/\/$/, '');
  if (!path || path === '/') return normalizedBase;
  return `${normalizedBase}${path.startsWith('/') ? path : `/${path}`}`;
}
