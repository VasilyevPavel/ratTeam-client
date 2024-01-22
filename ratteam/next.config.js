/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'rat-team.selstorage.ru',
        port: '',
        // pathname: '/1/upload/**',
      },
      {
        protocol: 'https',
        hostname: 'cac356e0-1c44-4442-8e41-007c9d879a3e.selstorage.ru',
        port: '',
        // pathname: '/1/upload/**',
      },
    ],
  },
};

module.exports = nextConfig;
