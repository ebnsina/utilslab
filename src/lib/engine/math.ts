/** General math helpers. Pure + unit-testable. */

/** Greatest common divisor (Euclid). Operates on absolute values. */
export function gcd(a: number, b: number): number {
	a = Math.abs(a);
	b = Math.abs(b);
	while (b) [a, b] = [b, a % b];
	return a;
}

/** Least common multiple. */
export function lcm(a: number, b: number): number {
	if (a === 0 || b === 0) return 0;
	return Math.abs(a * b) / gcd(a, b);
}

export interface Fraction {
	numerator: number;
	denominator: number;
}

/** Reduce a fraction to lowest terms, keeping the sign on the numerator. */
export function simplifyFraction(numerator: number, denominator: number): Fraction {
	if (denominator === 0) return { numerator: NaN, denominator: 0 };
	const divisor = gcd(numerator, denominator) || 1;
	const sign = denominator < 0 ? -1 : 1;
	return {
		numerator: (numerator / divisor) * sign,
		denominator: Math.abs(denominator / divisor)
	};
}

export type FractionOp = 'add' | 'subtract' | 'multiply' | 'divide';

/** Add/subtract/multiply/divide two fractions, returning a reduced result. */
export function fractionOp(a: Fraction, op: FractionOp, b: Fraction): Fraction {
	let n: number;
	let d: number;
	switch (op) {
		case 'add':
			n = a.numerator * b.denominator + b.numerator * a.denominator;
			d = a.denominator * b.denominator;
			break;
		case 'subtract':
			n = a.numerator * b.denominator - b.numerator * a.denominator;
			d = a.denominator * b.denominator;
			break;
		case 'multiply':
			n = a.numerator * b.numerator;
			d = a.denominator * b.denominator;
			break;
		case 'divide':
			n = a.numerator * b.denominator;
			d = a.denominator * b.numerator;
			break;
	}
	return simplifyFraction(n, d);
}

/** `whatPercentOf(25, 200)` -> 12.5  ("25 is 12.5% of 200"). */
export function whatPercentOf(part: number, whole: number): number {
	return whole === 0 ? NaN : (part / whole) * 100;
}

/** `percentOf(12.5, 200)` -> 25  ("12.5% of 200"). */
export function percentOf(pct: number, whole: number): number {
	return (pct / 100) * whole;
}

/** Percentage change from `from` to `to`, as a signed percentage. */
export function percentChange(from: number, to: number): number {
	return from === 0 ? NaN : ((to - from) / Math.abs(from)) * 100;
}
