/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  output: 'export',

  staticPageGenerationTimeout: 2000,
  env: {
    NEXT_PUBLIC_IMAGE_HOSTING_URL: process.env.NEXT_PUBLIC_IMAGE_HOSTING_URL,
    ENV_LOCAL_URL: process.env.ENV_LOCAL_URL,
    NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
  },
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
