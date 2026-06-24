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

export interface QuadraticResult {
	discriminant: number;
	/** Real roots (0, 1, or 2 of them). Empty when roots are complex. */
	roots: number[];
	/** Complex roots as { re, im } pairs when the discriminant is negative. */
	complex?: { re: number; im: number }[];
}

/** Solve ax² + bx + c = 0. */
export function quadratic(a: number, b: number, c: number): QuadraticResult {
	if (a === 0) {
		// Linear: bx + c = 0
		return { discriminant: NaN, roots: b === 0 ? [] : [-c / b] };
	}
	const d = b * b - 4 * a * c;
	if (d > 0) {
		const s = Math.sqrt(d);
		return { discriminant: d, roots: [(-b + s) / (2 * a), (-b - s) / (2 * a)] };
	}
	if (d === 0) return { discriminant: d, roots: [-b / (2 * a)] };
	const re = -b / (2 * a);
	const im = Math.sqrt(-d) / (2 * a);
	return {
		discriminant: d,
		roots: [],
		complex: [
			{ re, im },
			{ re, im: -im }
		]
	};
}

/** Mean, median, population & sample standard deviation of a number list. */
export function stats(values: number[]) {
	const n = values.length;
	if (n === 0)
		return {
			count: 0,
			mean: NaN,
			median: NaN,
			min: NaN,
			max: NaN,
			stdevP: NaN,
			stdevS: NaN,
			sum: NaN
		};
	const sum = values.reduce((a, b) => a + b, 0);
	const mean = sum / n;
	const sorted = [...values].sort((a, b) => a - b);
	const median = n % 2 ? sorted[(n - 1) / 2] : (sorted[n / 2 - 1] + sorted[n / 2]) / 2;
	const sqDiff = values.reduce((a, b) => a + (b - mean) ** 2, 0);
	return {
		count: n,
		sum,
		mean,
		median,
		min: sorted[0],
		max: sorted[n - 1],
		stdevP: Math.sqrt(sqDiff / n),
		stdevS: n > 1 ? Math.sqrt(sqDiff / (n - 1)) : NaN
	};
}

/** Percentage change from `from` to `to`, as a signed percentage. */
export function percentChange(from: number, to: number): number {
	return from === 0 ? NaN : ((to - from) / Math.abs(from)) * 100;
}
