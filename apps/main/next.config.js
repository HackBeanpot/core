/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  transpilePackages: ["@repo/ui"],
  // The old standalone pages are now sections of the single-page landing.
  async redirects() {
    return [
      { source: "/projects", destination: "/#projects", permanent: true },
      { source: "/sponsors", destination: "/#sponsors", permanent: true },
      { source: "/team", destination: "/#team", permanent: true },
      { source: "/sponsor-us", destination: "/#sponsors", permanent: true },
    ];
  },
};
