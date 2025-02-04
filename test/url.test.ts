import { describe, it, expect } from 'vitest';
import { getPathResource } from '../src/url';

describe('getPathResource', () => {
	it('should return undefined for root path', () => {
		const result = getPathResource('https://example.com/');
		expect(result).toBeUndefined();
	});

	it('should return the first path segment', () => {
		const result = getPathResource('https://example.com/products/12345/details');
		expect(result).toBe('products');
	});

	it('should return the first path segment for a simple path', () => {
		const result = getPathResource('https://example.com/about');
		expect(result).toBe('about');
	});

	it('should handle paths with multiple slashes', () => {
		const result = getPathResource('https://example.com//products/12345');
		expect(result).toBe('products');
	});

	it('should return undefined for empty paths', () => {
		const result = getPathResource('https://example.com/');
		expect(result).toBeUndefined();
	});
});
