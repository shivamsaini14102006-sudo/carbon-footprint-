import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // ESLint warnings/errors do not block the production build
    ignoreDuringBuilds: true,
  },
  typescript: {
    // TypeScript errors do not block the production build
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.dicebear.com",
      },
    ],
  },
};

export default nextConfig;
