/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@repo/ui"],
  experimental: {
    serverComponentsExternalPackages: ["mongodb"],
  },
};

module.exports = nextConfig;
