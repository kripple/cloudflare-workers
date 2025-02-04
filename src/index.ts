import { getProfile } from './profile';
import { getRepos } from './repos';
import { getAvatar } from './avatar';

export default {
	async fetch(request, env, ctx): Promise<Response> {
		const url = new URL(request.url);
		try {
			switch (url.pathname) {
				case '/avatar':
					return getAvatar();
				case '/profile':
					return getProfile();
				case '/repos':
					return getRepos();
				default:
					return new Response(JSON.stringify({ error: 'Not Found' }), { status: 404 });
			}

			// const value = await env.GITHUB_KV.list();

			// const headers = {
			// 	'Access-Control-Allow-Origin': '*',
			// 	'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, HEAD',
			// 	'Access-Control-Allow-Headers': 'Content-Type, Authorization',
			// 	'Access-Control-Allow-Credentials': 'true',
			// };

			// // Handle preflight requests
			// if (request.method === 'OPTIONS') {
			// 	return new Response(null, { status: 204, headers });
			// }

			// return new Response(JSON.stringify(value.keys), {
			// 	status: 200,
			// 	headers: {
			// 		...headers,
			// 		'Content-Type': ContentType.JSON,
			// 	},
			// });
		} catch (error) {
			if (error instanceof Error) {
				return new Response(error.message, { status: 500 });
			} else {
				return new Response('An unknown error occurred', { status: 500 });
			}
		}
	},
} satisfies ExportedHandler<Env>;
