export const ENV = {
	MODE: process.env.NEXT_PUBLIC_MODE || "development",
	TOKEN_KEY: process.env.NEXT_PUBLIC_TOKEN_KEY || "auth_token",
	JWT_SECRET: process.env.NEXT_PUBLIC_JWT_SECRET || "secret_jwt",
	URI: {
		BASE_URL: process.env.NEXT_PUBLIC_BASE_API_URL
	},
};
