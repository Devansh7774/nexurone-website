/** @type {import('next').NextConfig} */
const securityHeaders = [
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
];

const nextConfig = {
  poweredByHeader: false,
  experimental: {
    optimizePackageImports: ['lucide-react', 'swiper'],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/login',
        destination: '/shiv_admin_login',
        permanent: true,
      },
      {
        source: '/admin/login',
        destination: '/shiv_admin_login',
        permanent: true,
      },
      {
        source: '/admin',
        destination: '/shiv_admin',
        permanent: true,
      },
      {
        source: '/admin/:path*',
        destination: '/shiv_admin/:path*',
        permanent: true,
      },
      { source: '/about', destination: '/about-us', permanent: true },
      { source: '/our-works', destination: '/case-study', permanent: true },
      { source: '/our-work', destination: '/case-study', permanent: true },
      { source: '/our-work/:slug', destination: '/case-study/:slug', permanent: true },
      { source: '/blogs', destination: '/insights', permanent: true },
      { source: '/blogs/:slug', destination: '/insights/:slug', permanent: true },
      { source: '/project', destination: '/contact', permanent: true },
      { source: '/services', destination: '/services/mean-mern', permanent: true },
      { source: '/hire', destination: '/hire/javascript-developer', permanent: true },
    ];
  },
  images: {
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'nexurontechnologies.com',
      },
      {
        protocol: 'https',
        hostname: 'wpriverthemes.com',
      },
      {
        protocol: 'https',
        hostname: 'randomuser.me',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'pub-010e8de3204a4ed28c74880b1d5e91d3.r2.dev',
      },
      {
        protocol: 'https',
        hostname: 'cdn.jsdelivr.net',
      },
      {
        protocol: 'https',
        hostname: 'cdn.simpleicons.org',
      },
    ],
  },
};

export default nextConfig;
