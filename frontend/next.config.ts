import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/uploadthing/:path*",
        destination: "/api/uploadthing/:path*", // tetap di-handle Next.js
      },
      {
        source: "/api/:path*",
        destination: `${process.env.NEXT_PUBLIC_API_URL}/api/:path*`,
      },
      {
        source: "/auth/:path*",
        destination: `${process.env.NEXT_PUBLIC_AUTH_URL}/api/auth/:path*`,
      },
    ];
  },
};

export default nextConfig;
