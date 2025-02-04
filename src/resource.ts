export async function getResource(name: 'avatar' | 'profile' | 'repos', env: Env) {
	let complete: boolean = false;
	const keys: any[] = [];

	while (!complete) {
		let cursor: string | undefined;

		const value = await env.GITHUB_KV.list({ cursor, prefix: name });
		keys.push(value.keys);

		if (!value.list_complete) {
			cursor = value.cursor;
		} else {
			complete = true;
		}
	}

	return new Response(JSON.stringify(keys), {
		status: 200,
		headers: {
			'Content-Type': 'application/json',
		},
	});
}
