const isDevelopment = process.env.NODE_ENV === "development";

export const ENV = {
	MODE: process.env.NEXT_PUBLIC_MODE || "development",
	TOKEN_KEY: process.env.NEXT_PUBLIC_TOKEN_KEY || "@example/token",
	URI: {
		BASE_URL: isDevelopment
			? process.env.NEXT_PUBLIC_API_URL_DEV
			: process.env.NEXT_PUBLIC_API_URL_PROD || "http://localhost:3000",
	},
};
