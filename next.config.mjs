/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        REDIS_URL: process.env.REDIS_URL,
        REDIS_PASSWORD: process.env.REDIS_PASSWORD,
        REDIS_PORT: process.env.REDIS_PORT,
        CLIENT_URL: process.env.CLIENT_URL
      },
};

export default nextConfig;
