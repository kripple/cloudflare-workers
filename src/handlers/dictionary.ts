import { handleError } from '../utils/errors';
import { ErrorResponse } from '../utils/errors';
import { match } from 'node-match-path';

export async function getDictionary(req: Request, env: Env) {
	try {
		const url = new URL(req.url);
		const { params } = match('/dictionary/:word', url.pathname);
		const word = params?.word;
		if (!word) return ErrorResponse(404);
		const result = await fetch(`https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${env.DICTIONARY_API_KEY}`);
		return new Response(JSON.stringify(result), { status: 200 });
	} catch (error) {
		return handleError({ error, env });
	}
}
