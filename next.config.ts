import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  productionBrowserSourceMaps: false,
  poweredByHeader: false,
  redirects: async () => [
    // The /ai site variant was retired — the main site is now AI-forward.
    { source: '/ai', destination: '/', permanent: true },
    { source: '/ai/:path*', destination: '/:path*', permanent: true },
    // Renamed project slugs.
    {
      source: '/projects/titan-site',
      destination: '/projects/titan-platform',
      permanent: true,
    },
    {
      source: '/projects/funded-academy-pre-launch',
      destination: '/projects/funded-academy-platform',
      permanent: true,
    },
  ],
  headers: async () => [
    {
      source: '/(.*)',
      headers: [
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      ],
    },
  ],
};

export default nextConfig;
