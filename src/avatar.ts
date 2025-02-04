export function getAvatar() {
	return new Response(JSON.stringify({ resource: 'avatar' }), {
		status: 200,
		headers: {
			'Content-Type': 'application/json',
		},
	});
}
