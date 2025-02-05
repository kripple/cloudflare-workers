export const headers = (env: Env) =>
	({
		headers: {
			authorization: `Bearer ${env.GITHUB_API_TOKEN}`,
		},
	} as const);
