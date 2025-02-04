import { getResource } from './resource';
import { endpoints } from './endpoints';
import { getPathResource } from './url';
import { isResource, type Resource } from './resource';

function getPath(request: Request): Resource | undefined {
	const url = new URL(request.url);
	const resource = getPathResource(url.pathname) || '';
	return isResource(resource) ? resource : undefined;
}

export default {
	async fetch(request, env, ctx): Promise<Response> {
		const { Octokit } = await import('octokit');
		const octokit = new Octokit({ auth: env.GITHUB_API_KEY, userAgent: 'cloudflare-worker' });

		const {
			data: { login },
		} = await octokit.rest.users.getAuthenticated();

		return new Response(`Hello, ${login}!`, { status: 200 });

		// try {
		// 	const path = getPath(request);
		// 	return path ? getResource(path, env) : new Response(JSON.stringify({ error: 'Not Found' }), { status: 404 });
		// } catch (error) {
		// 	if (error instanceof Error) {
		// 		return new Response(error.message, { status: 500 });
		// 	} else {
		// 		return new Response('An unknown error occurred', { status: 500 });
		// 	}
		// }
	},
} satisfies ExportedHandler<Env>;
