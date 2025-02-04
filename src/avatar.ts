export async function getAvatar(env: Env) {
	const value = await env.GITHUB_KV.list({ prefix: 'avatar:' });

	return new Response(JSON.stringify(value.keys), {
		status: 200,
		headers: {
			'Content-Type': 'application/json',
		},
	});
}
