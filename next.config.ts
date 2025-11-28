import type { NextConfig } from "next";

const isProduction = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
	basePath: isProduction ? "/citation_checker" : "",
	assetPrefix: isProduction ? "/citation_checker/" : "",
};

export default nextConfig;
