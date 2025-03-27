export const routes = ['profile', 'repos', 'languages', 'dictionary'] as const;
export type Route = Union<typeof routes>;
export function isRoute(value: string): value is Route {
	return (routes as readonly string[]).includes(value);
}
