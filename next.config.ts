import type { NextConfig } from "next";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
const AUTH_URL = process.env.NEXT_PUBLIC_AUTH_URL || "http://localhost:8080";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/uploadthing/:path*",
        destination: "/api/uploadthing/:path*", // tetap di-handle Next.js
      },
      {
        source: "/api/:path*",
        destination: `${API_URL}/api/:path*`,
      },
      {
        source: "/auth/:path*",
        destination: `${AUTH_URL}/api/auth/:path*`,
      },
    ];
  },
};

export default nextConfig;
