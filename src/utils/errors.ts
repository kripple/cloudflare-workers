import { isProd } from '../utils/env';

export const ErrorResponse = (error: 404 | 500) =>
	({
		404: () => new Response(JSON.stringify({ error: 'Not Found' }), { status: 404 }),
		500: () => new Response('An unknown error occurred', { status: 500 }),
	}[error]());

export const handleError = ({ env, error }: { env: Env; error: unknown }) => {
	if (!isProd(env) && error instanceof Error) {
		return new Response(`${error.name}: ${error.message}\n${JSON.stringify(error.stack)}`, { status: 500 });
	} else {
		return ErrorResponse(500);
	}
};
