import { getRoute } from './routes';
import { getProfile } from './handlers/profile';
import { getLanguages } from './handlers/languages';
import { getRepos } from './handlers/repos';

export default {
	async fetch(request, env, _ctx): Promise<Response> {
		try {
			const route = getRoute(request);
			if (!route) return new Response(JSON.stringify({ error: 'Not Found' }), { status: 404 });
			switch (route) {
				case 'languages': {
					return getLanguages(request, env);
				}
				case 'profile': {
					return getProfile(env);
				}
				case 'repos': {
					return getRepos(request, env);
				}
				default: {
					return new Response(`${route} route not yet implemented`, { status: 200 });
				}
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
