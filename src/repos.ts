export async function getRepos(env: Env) {
	const value = await env.GITHUB_KV.list({ prefix: 'repos:' });

	return new Response(JSON.stringify(value), {
		status: 200,
		headers: {
			'Content-Type': 'application/json',
		},
	});
}
