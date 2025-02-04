/**
 * Extracts the first part of the path from a given URL.
 *
 * @param url - The URL string to parse.
 * @returns The first part of the path if it exists, otherwise `undefined`.
 */
export function getPathResource(url: string): string | undefined {
  const parsedUrl = new URL(url);
  const pathParts = parsedUrl.pathname.split('/').filter(part => part.length > 0);
  return pathParts.length > 0 ? pathParts[0] : undefined;
}
