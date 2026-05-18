import type { NextConfig } from "next";
import path from "node:path";

const projectRoot = process.cwd();

const nextConfig: NextConfig = {
  turbopack: {
    root: path.dirname(projectRoot),
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
