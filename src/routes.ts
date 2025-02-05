import { parseUrl } from './utils/url';

const routes = ['profile', 'repos', 'languages'] as const;
export type Route = Union<typeof routes>;
export function isRoute(value: string): value is Route {
	return (routes as readonly string[]).includes(value);
}

export function getRoute(request: Request): Route | undefined {
	const url = new URL(request.url);
	const resource = parseUrl(url.pathname) || '';
	return isRoute(resource) ? resource : undefined;
}
