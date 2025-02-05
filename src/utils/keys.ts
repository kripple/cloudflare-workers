import type { Route } from '../routes';

export async function getKeys(route: Route, env: Env) {
	let complete: boolean = false;
	const keys: any[] = [];

	while (!complete) {
		let cursor: string | undefined;

		const value = await env.GITHUB_KV.list({ cursor, prefix: route });
		keys.push(...value.keys);

		if (!value.list_complete) {
			cursor = value.cursor;
		} else {
			complete = true;
		}
	}

	return keys;
}
