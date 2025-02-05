import { parseUrl } from './utils/url';

export const routes = ['profile', 'repos', 'languages'] as const;
export type Route = Union<typeof routes>;
export function isRoute(value: string): value is Route {
	return (routes as readonly string[]).includes(value);
}

export function getRoute(request: Request): Route | undefined {
	const resource = parseUrl(request.url) || '';
	return isRoute(resource) ? resource : undefined;
}
