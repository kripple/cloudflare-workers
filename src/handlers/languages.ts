import { request } from '@octokit/request';
import { config } from '../config';
import { headers } from '../utils/request';
import { match } from 'node-match-path';
import { ErrorResponse } from '../utils/errors';

export async function getLanguages(req: Request, env: Env) {
	try {
		const url = new URL(req.url);
		const { params } = match('/languages/:repo', url.pathname);
		const repo = params?.repo;
		if (!repo) return ErrorResponse(404);
    
		const result = await request(`GET /repos/${config.username}/${repo}/languages`, headers(env));
		return new Response(JSON.stringify(result), { status: 200 });
	} catch (error) {
		if (error instanceof Error) {
			return new Response(`${error.name}: ${error.message}\n${JSON.stringify(error.stack)}`, { status: 500 });
		} else {
			return ErrorResponse(500);
		}
	}
}
