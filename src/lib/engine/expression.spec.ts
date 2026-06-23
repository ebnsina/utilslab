import { describe, it, expect } from 'vitest';
import { evaluate } from './expression';

describe('expression evaluator', () => {
	it('respects operator precedence', () => {
		expect(evaluate('2 + 3 * 4')).toBe(14);
		expect(evaluate('(2 + 3) * 4')).toBe(20);
	});

	it('handles exponentiation (right-associative)', () => {
		expect(evaluate('2 ^ 3 ^ 2')).toBe(512);
	});

	it('handles unary minus', () => {
		expect(evaluate('-5 + 3')).toBe(-2);
		expect(evaluate('3 * -2')).toBe(-6);
	});

	it('evaluates functions and constants', () => {
		expect(evaluate('sqrt(16)')).toBe(4);
		expect(evaluate('cos(0)')).toBe(1);
		expect(evaluate('log(1000)')).toBeCloseTo(3, 10);
		expect(evaluate('pi')).toBeCloseTo(Math.PI, 10);
	});

	it('returns NaN on malformed input', () => {
		expect(evaluate('2 +')).toBeNaN();
		expect(evaluate('(2 + 3')).toBeNaN();
		expect(evaluate('foo(2)')).toBeNaN();
		expect(evaluate('')).toBeNaN();
	});
});
