import type { NextConfig } from "next";

const isProduction = process.env.NEXT_PUBLIC_RUN_MODE === "production";

const nextConfig: NextConfig = {
	assetPrefix: isProduction ? "/citation_checker/" : "",
};

export default nextConfig;
