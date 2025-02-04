export function getRepos() {
	return new Response(JSON.stringify({ resource: 'repos' }), {
		status: 200,
		headers: {
			'Content-Type': 'application/json',
		},
	});
}
