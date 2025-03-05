import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "**", // ✅ Allows all HTTP hosts
      },
      {
        protocol: "https",
        hostname: "**", // ✅ Allows all HTTPS hosts
      },
    ],
    dangerouslyAllowSVG: true, // Optional: Allows SVG images
  },
  eslint: {
    ignoreDuringBuilds: true
  }
};

export default nextConfig;
