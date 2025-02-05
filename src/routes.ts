import { match } from 'node-match-path';
import { isDev } from './utils/env';

export const routes = ['profile', 'repos', 'languages'] as const;
export type Route = Union<typeof routes>;
export function isRoute(value: string): value is Route {
	return (routes as readonly string[]).includes(value);
}

export function getRoute(request: Request, env: Env): Route | undefined {
	return routes.find((route) => {
		try {
			const url = new URL(request.url);
			const { matches } = match(`/${route}`, url.pathname);
			return matches;
		} catch (error) {
			isDev(env) && console.debug(error);
			return undefined;
		}
	});
}
