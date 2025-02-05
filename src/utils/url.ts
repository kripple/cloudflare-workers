/**
 * Extracts the first part of the path from a given URL.
 *
 * @param url - The URL string to parse.
 * @returns The first part of the path if it exists, otherwise `undefined`.
 */
export function parseUrl(url: string): string | undefined {
	const pathname = new URL(url).pathname;
	const parts = pathname.split('/').filter((part) => part.length > 0);
	return parts.length > 0 ? parts[0] : undefined;
}
