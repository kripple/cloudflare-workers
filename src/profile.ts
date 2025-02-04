export function getProfile() {
	return new Response(JSON.stringify({ resource: 'profile' }), {
		status: 200,
		headers: {
			'Content-Type': 'application/json',
		},
	});
}
