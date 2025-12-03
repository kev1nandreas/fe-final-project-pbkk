import type { NextConfig } from "next";

const isProduction = process.env.NEXT_PUBLIC_RUN_MODE === "production";

const nextConfig: NextConfig = {
	assetPrefix: isProduction ? "/citation-checker/" : "",
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "s6.imgcdn.dev",
			},
		],
	},
	experimental: {
		serverActions: {
			bodySizeLimit: "50mb",
		},
	},
};

export default nextConfig;
