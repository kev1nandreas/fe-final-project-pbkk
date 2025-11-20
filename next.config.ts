import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  assetPrefix: "/citation-checker",
  experimental: {
    serverActions: {
      bodySizeLimit: "50mb",
    },
  },
};

export default nextConfig;
