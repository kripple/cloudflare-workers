import { request } from '@octokit/request';
import { config } from '../config';
import { headers } from '../utils/request';
import { match } from 'node-match-path';

export async function getLanguages(req: Request, env: Env) {
	try {
		const { params } = match('/languages/:repo', req.url);
		const repo = params?.repo;
		if (!repo) throw Error('unable to fetch languages, repository name is missing');
		const result = await request(`GET /repos/${config.username}/${repo}/languages`, headers(env));
		return new Response(JSON.stringify(result), { status: 200 });
	} catch (error) {
		if (error instanceof Error) {
			return new Response(`${error.name}: ${error.message}\n${JSON.stringify(error.stack)}`, { status: 500 });
		} else {
			return new Response('An unknown error occurred', { status: 500 });
		}
	}
}
