import { getResource } from './resource';

export default {
	async fetch(request, env, ctx): Promise<Response> {
		const url = new URL(request.url);
		try {
			switch (url.pathname) {
				case '/avatar':
					return getResource('avatar', env);
				case '/profile':
					return getResource('profile', env);
				case '/repos':
					return getResource('repos', env);
				default:
					return new Response(JSON.stringify({ error: 'Not Found' }), { status: 404 });
			}
		} catch (error) {
			if (error instanceof Error) {
				return new Response(error.message, { status: 500 });
			} else {
				return new Response('An unknown error occurred', { status: 500 });
			}
		}
	},
} satisfies ExportedHandler<Env>;
