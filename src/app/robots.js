import { absoluteUrl } from '@/lib/site';

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/shiv_admin/', '/api/', '/shiv_admin_login'],
      },
    ],
    sitemap: absoluteUrl('/sitemap.xml'),
  };
}
