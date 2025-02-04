import { getResource } from './resource';
import { endpoints } from './endpoints';
import { getPathResource } from './url';
import { isResource, type Resource } from './resource';
import { request as octokit } from '@octokit/request';

function getPath(request: Request): Resource | undefined {
	const url = new URL(request.url);
	const resource = getPathResource(url.pathname) || '';
	return isResource(resource) ? resource : undefined;
}

export default {
	async fetch(request, env, ctx): Promise<Response> {
    return new Response(env.THIS_IS_A_TEST, { status: 200 });
		// try {
		// 	const result = await octokit('GET /users/kripple', {
		// 		headers: {
		// 			authorization: `Bearer ${env.GITHUB_API_KEY}`,
		// 		},
		// 	});
		// 	return new Response(JSON.stringify(result), { status: 200 });
		// } catch (error) {
		// 	if (error instanceof Error) {
		// 		return new Response(`${error.name}: ${error.message}\n${JSON.stringify(error.stack)}`, { status: 500 });
		// 	} else {
		// 		return new Response('An unknown error occurred', { status: 500 });
		// 	}
		// }

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
