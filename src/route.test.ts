import { describe, it, expect, vi } from 'vitest';
import { getRoute } from './routes';
import { isRoute, routes } from './routes';

const testEnv = {
	MODE: 'test',
} as Env;

describe('isRoute', () => {
	routes.map((validRoute) => {
		it(`should return true for valid route "${validRoute}"`, () => {
			const result = isRoute(validRoute);
			expect(result).toBe(true);
		});
	});

	it('should return false for a string not in the routes list', () => {
		const result = isRoute('about');
		expect(result).toBe(false);
	});

	it('should return false for an empty string', () => {
		const result = isRoute('');
		expect(result).toBe(false);
	});

	it('should return false for undefined (invalid type)', () => {
		const result = isRoute(undefined as any);
		expect(result).toBe(false);
	});

	it('should return false for a number (invalid type)', () => {
		const result = isRoute(123 as any);
		expect(result).toBe(false);
	});
});

describe('getRoute', () => {
	routes.map((validRoute) => {
		it(`should return the route for valid route "${validRoute}"`, () => {
			const mockRequest = { url: `https://api.example.com/${validRoute}` } as Request;
			const result = getRoute(mockRequest, testEnv);
			expect(result).toBe(validRoute);
		});
	});

	it('should return undefined if the resource is invalid', () => {
		const invalidRoute = 'invalid-route';
		const mockRequest = { url: `https://api.example.com/${invalidRoute}` } as Request;

		const result = getRoute(mockRequest, testEnv);
		expect(result).toBeUndefined();
	});

	it('should handle edge case when pathname is empty', () => {
		const mockRequest = { url: 'https://api.example.com' } as Request;

		const result = getRoute(mockRequest, testEnv);
		expect(result).toBeUndefined();
	});

	it('should handle edge case when url is missing', () => {
		const mockRequest = {} as Request;

		const result = getRoute(mockRequest, testEnv);
		expect(result).toBeUndefined();
	});
});
