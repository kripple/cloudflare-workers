export const ErrorResponse = (error: 404 | 500) =>
	({
		404: () => new Response(JSON.stringify({ error: 'Not Found' }), { status: 404 }),
		500: () => new Response('An unknown error occurred', { status: 500 }),
	}[error]());
