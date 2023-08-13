const { withSuperjson } = require('next-superjson');

const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
});

const nextConfig = withSuperjson()({
  reactStrictMode: true,
  i18n: {
    locales: ['en', 'es'],
    defaultLocale: 'en',
  },
  experimental: {
    optimizeCss: true,
  },
});

module.exports =
  process.env.NODE_ENV !== 'development' ? withPWA(nextConfig) : nextConfig;
