import { describe, it, expect } from 'vitest';
import { parseUrl } from './url';

describe('parseUrl', () => {
	it('should return undefined for root path', () => {
		const result = parseUrl('https://api.example.com/');
		expect(result).toBeUndefined();
	});

	it('should return the first path segment', () => {
		const result = parseUrl('https://api.example.com/products/12345/details');
		expect(result).toBe('products');
	});

	it('should return the first path segment for a simple path', () => {
		const result = parseUrl('https://api.example.com/about');
		expect(result).toBe('about');
	});

	it('should handle paths with multiple slashes', () => {
		const result = parseUrl('https://api.example.com//products/12345');
		expect(result).toBe('products');
	});

	it('should return undefined for empty paths', () => {
		const result = parseUrl('https://api.example.com/');
		expect(result).toBeUndefined();
	});

	it('should handle paths with query parameters', () => {
		const result = parseUrl('https://api.example.com/products/12345?ref=homepage');
		expect(result).toBe('products');
	});

	it('should return undefined for an invalid URL format', () => {
		const result = parseUrl('not-a-valid-url');
		expect(result).toBeUndefined();
	});

	it('should return undefined for a URL with only the domain', () => {
		const result = parseUrl('https://api.example.com');
		expect(result).toBeUndefined();
	});

	it('should handle URLs with a hash fragment', () => {
		const result = parseUrl('https://api.example.com/products#section2');
		expect(result).toBe('products');
	});
});
