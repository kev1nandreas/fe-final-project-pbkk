import type { NextConfig } from "next";

const isProduction = process.env.NEXT_PUBLIC_RUN_MODE === "production";

const nextConfig: NextConfig = {
	basePath: isProduction ? "/citation-checker" : "",
	experimental: {
		serverActions: {
			bodySizeLimit: "50mb",
		},
	},
};

export default nextConfig;
