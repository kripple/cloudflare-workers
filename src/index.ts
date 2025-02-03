/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.json`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export default {
	async fetch(request, env, ctx): Promise<Response> {
		try {
			const value = await env.GITHUB_KV.list();

			const headers = {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': 'GET, PUT',
				'Access-Control-Allow-Headers': 'Content-Type, Authorization',
				'Access-Control-Allow-Credentials': 'true',
			};

			// Handle OPTIONS requests for preflight CORS
			if (request.method === 'OPTIONS') {
				return new Response(null, { status: 204, headers });
			}

			return new Response(JSON.stringify(value.keys), {
				status: 200,
        headers: {
          ...headers,
          'Content-Type': 'application/json',
        },
			});
		} catch (error) {
			if (error instanceof Error) {
				return new Response(error.message, { status: 500 });
			} else {
				return new Response('An unknown error occurred', { status: 500 });
			}
		}
	},
} satisfies ExportedHandler<Env>;
