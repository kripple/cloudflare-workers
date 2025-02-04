export async function getProfile(env: Env) {
	const value = await env.GITHUB_KV.list({ prefix: 'profile:' });

	return new Response(JSON.stringify(value.keys), {
		status: 200,
		headers: {
			'Content-Type': 'application/json',
		},
	});
}
