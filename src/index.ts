import { getRoute } from './routes';
import { getProfile } from './handlers/profile';
import { getLanguages } from './handlers/languages';
import { getRepos } from './handlers/repos';
import { ErrorResponse } from './utils/errors';

export default {
	async fetch(request, env, _ctx): Promise<Response> {
		try {
			const route = getRoute(request, env);
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
					return ErrorResponse(404);
				}
			}
		} catch (error) {
			if (error instanceof Error) {
				return new Response(error.message, { status: 500 });
			} else {
				return ErrorResponse(500);
			}
		}
	},
} satisfies ExportedHandler<Env>;
