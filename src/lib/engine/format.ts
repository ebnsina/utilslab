/** Formatting helpers shared across calculators. Pure + unit-testable. */

const USD = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD',
	maximumFractionDigits: 2
});

const USD0 = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD',
	maximumFractionDigits: 0
});

/** "$1,234.56" — pass `decimals: 0` for whole-dollar figures. */
export function currency(value: number, decimals: 0 | 2 = 2): string {
	if (!Number.isFinite(value)) return '—';
	return (decimals === 0 ? USD0 : USD).format(value);
}

/** "1,234.5" with a fixed number of fraction digits, trailing zeros trimmed. */
export function number(value: number, maxDecimals = 2): string {
	if (!Number.isFinite(value)) return '—';
	return new Intl.NumberFormat('en-US', { maximumFractionDigits: maxDecimals }).format(value);
}

/** "12.5%" — `value` is a percentage already (e.g. 12.5, not 0.125). */
export function percent(value: number, maxDecimals = 2): string {
	if (!Number.isFinite(value)) return '—';
	return `${number(value, maxDecimals)}%`;
}

/** Clamp a number into [min, max]. */
export function clamp(value: number, min: number, max: number): number {
	return Math.min(max, Math.max(min, value));
}

/** Round to a fixed number of decimal places (avoids FP noise like 0.1+0.2). */
export function round(value: number, decimals = 2): number {
	const f = 10 ** decimals;
	return Math.round((value + Number.EPSILON) * f) / f;
}

/** Pluralise: `plural(2, 'day')` -> "2 days". */
export function plural(count: number, word: string): string {
	return `${number(count, 0)} ${word}${count === 1 ? '' : 's'}`;
}
