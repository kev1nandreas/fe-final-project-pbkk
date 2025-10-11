export const MAIN_ENDPOINT = {
	Auth: {
		Login: "/auth/login",
		CurrentUser: "/auth/me",
	},
	Documents: {
		// NOTE: these are reasonable default paths. Adjust if your backend uses different routes.
		Upload: "/documents/upload",
		List: "/documents",
	},
};
