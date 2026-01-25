/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Suppress middleware deprecation warning - using middleware pattern is still valid
    middlewareWarning: false,
  },
};

export default nextConfig;
