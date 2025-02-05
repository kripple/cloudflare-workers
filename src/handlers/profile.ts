import { request } from '@octokit/request';
import { config } from '../config';
import { headers } from '../utils/request';
import { handleError } from '../utils/errors';

export async function getProfile(env: Env) {
	try {
		const result = await request(`GET /users/${config.username}`, headers(env));
		return new Response(JSON.stringify(result), { status: 200 });
	} catch (error) {
		return handleError({ error, env });
	}
}
