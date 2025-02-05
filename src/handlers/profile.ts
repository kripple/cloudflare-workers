import { request } from '@octokit/request';
import { config } from '../config';
import { headers } from '../utils/request';

export async function getProfile(env: Env) {
	try {
		const result = await request(`GET /users/${config.username}`, headers(env));
		return new Response(JSON.stringify(result), { status: 200 });
	} catch (error) {
		if (error instanceof Error) {
			return new Response(`${error.name}: ${error.message}\n${JSON.stringify(error.stack)}`, { status: 500 });
		} else {
			return new Response('An unknown error occurred', { status: 500 });
		}
	}
}
