/**
 * Extracts the first part of the path from a given URL.
 *
 * @param url - The URL string to parse.
 * @returns The first part of the path if it exists, otherwise `undefined`.
 */
export function parseUrl(url: string): string | undefined {
	if (!url.startsWith('https://')) return undefined;
	try {
		const pathname = new URL(url).pathname;

		// Split the pathname by slashes and filter out empty segments
		const parts = pathname.split('/').filter((part) => part.length > 0);

		// Return the first path segment or undefined if the path is empty
		return parts.length > 0 ? parts[0] : undefined;
	} catch (error) {
		// If the URL is invalid or malformed, return undefined
		console.error('Error parsing URL:', error);
		return undefined;
	}
}
