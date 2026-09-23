import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  output: "standalone",
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: false,
  turbopack: {
    root: path.resolve(__dirname),
  },
  allowedDevOrigins: ["localhost:3000", "192.168.1.109:3000"],
  async rewrites() {
    return [
      { source: "/wa", destination: "/" },
      { source: "/whatsapp", destination: "/" },
      { source: "/li", destination: "/" },
      { source: "/linkedin", destination: "/" },
      { source: "/ig", destination: "/" },
      { source: "/instagram", destination: "/" },
      { source: "/fb", destination: "/" },
      { source: "/facebook", destination: "/" },
      { source: "/tt", destination: "/" },
      { source: "/tiktok", destination: "/" },
    ];
  },
};

export default nextConfig;
