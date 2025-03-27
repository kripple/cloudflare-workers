import { getProfile } from './handlers/profile';
import { getLanguages } from './handlers/languages';
import { getRepos } from './handlers/repos';
import { getDictionary } from './handlers/dictionary';
import { ErrorResponse } from './utils/errors';
import { match } from 'node-match-path';

export default {
	async fetch(request, env, _ctx): Promise<Response> {
		try {
			const url = new URL(request.url);

			const { matches: profile } = match('/profile', url.pathname);
			if (profile) return getProfile(env);

			const { matches: repos } = match('/repos', url.pathname);
			if (repos) return getRepos(request, env);

			const { matches: languages } = match('/languages/:repo', url.pathname);
			if (languages) return getLanguages(request, env);

			const { matches: dictionary } = match('/dictionary/:word', url.pathname);
			if (dictionary) return getDictionary(request, env);

			return ErrorResponse(404);
		} catch (error) {
			if (error instanceof Error) {
				return new Response(error.message, { status: 500 });
			} else {
				return ErrorResponse(500);
			}
		}
	},
} satisfies ExportedHandler<Env>;
