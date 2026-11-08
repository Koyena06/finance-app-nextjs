import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Old / stray URLs now point at the real pages.
      {
        source: '/dashboard/overview',
        destination: '/dashboard',
        permanent: true,
      },
      {
        source: '/customer',
        destination: '/dashboard/customers',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
