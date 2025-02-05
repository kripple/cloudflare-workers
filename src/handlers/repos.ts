import { request } from '@octokit/request';
import { config } from '../config';
import { headers } from '../utils/request';

export async function getRepos(req: Request, env: Env) {
	try {
		let url = `/users/${config.username}/repos?type=public&sort=updated`;
		const pattern = /(?<=<)([\S]*)(?=>; rel="Next")/i;
		let pagesRemaining = true;
		let data: any[] = [];

		while (pagesRemaining) {
			const response = await request(`GET ${url}`, { ...headers(env), per_page: 100 });
			data.push(...response.data);

			const linkHeader = response.headers.link;
			const nextUrl = linkHeader?.match(pattern)?.[0];

			if (linkHeader && linkHeader.includes(`rel=\"next\"`) && nextUrl) {
				url = nextUrl;
			} else {
				pagesRemaining = false;
			}
		}

		return new Response(JSON.stringify(data), { status: 200 });
	} catch (error) {
		if (error instanceof Error) {
			return new Response(`${error.name}: ${error.message}\n${JSON.stringify(error.stack)}`, { status: 500 });
		} else {
			return new Response('An unknown error occurred', { status: 500 });
		}
	}
}
