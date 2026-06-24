/** Unit & color conversions. Pure + unit-testable. */

/* ------------------------------ Units ----------------------------- */

export interface UnitDef {
	id: string;
	label: string;
	/** Multiplier to the category's base unit (linear units only). */
	factor: number;
}

export interface UnitCategory {
	id: string;
	label: string;
	units: UnitDef[];
}

/** Linear unit categories (everything except temperature). */
export const UNIT_CATEGORIES: UnitCategory[] = [
	{
		id: 'length',
		label: 'Length',
		units: [
			{ id: 'mm', label: 'Millimeters', factor: 0.001 },
			{ id: 'cm', label: 'Centimeters', factor: 0.01 },
			{ id: 'm', label: 'Meters', factor: 1 },
			{ id: 'km', label: 'Kilometers', factor: 1000 },
			{ id: 'in', label: 'Inches', factor: 0.0254 },
			{ id: 'ft', label: 'Feet', factor: 0.3048 },
			{ id: 'yd', label: 'Yards', factor: 0.9144 },
			{ id: 'mi', label: 'Miles', factor: 1609.344 }
		]
	},
	{
		id: 'mass',
		label: 'Weight',
		units: [
			{ id: 'mg', label: 'Milligrams', factor: 0.001 },
			{ id: 'g', label: 'Grams', factor: 1 },
			{ id: 'kg', label: 'Kilograms', factor: 1000 },
			{ id: 't', label: 'Metric tons', factor: 1_000_000 },
			{ id: 'oz', label: 'Ounces', factor: 28.349523125 },
			{ id: 'lb', label: 'Pounds', factor: 453.59237 },
			{ id: 'st', label: 'Stone', factor: 6350.29318 }
		]
	},
	{
		id: 'volume',
		label: 'Volume',
		units: [
			{ id: 'ml', label: 'Milliliters', factor: 0.001 },
			{ id: 'l', label: 'Liters', factor: 1 },
			{ id: 'm3', label: 'Cubic meters', factor: 1000 },
			{ id: 'tsp', label: 'Teaspoons (US)', factor: 0.00492892159 },
			{ id: 'tbsp', label: 'Tablespoons (US)', factor: 0.0147867648 },
			{ id: 'floz', label: 'Fluid ounces (US)', factor: 0.0295735296 },
			{ id: 'cup', label: 'Cups (US)', factor: 0.2365882365 },
			{ id: 'pt', label: 'Pints (US)', factor: 0.473176473 },
			{ id: 'qt', label: 'Quarts (US)', factor: 0.946352946 },
			{ id: 'gal', label: 'Gallons (US)', factor: 3.785411784 }
		]
	},
	{
		id: 'area',
		label: 'Area',
		units: [
			{ id: 'cm2', label: 'Square cm', factor: 0.0001 },
			{ id: 'm2', label: 'Square meters', factor: 1 },
			{ id: 'km2', label: 'Square km', factor: 1_000_000 },
			{ id: 'ha', label: 'Hectares', factor: 10_000 },
			{ id: 'ft2', label: 'Square feet', factor: 0.09290304 },
			{ id: 'yd2', label: 'Square yards', factor: 0.83612736 },
			{ id: 'ac', label: 'Acres', factor: 4046.8564224 },
			{ id: 'mi2', label: 'Square miles', factor: 2_589_988.110336 }
		]
	},
	{
		id: 'speed',
		label: 'Speed',
		units: [
			{ id: 'mps', label: 'Meters / second', factor: 1 },
			{ id: 'kph', label: 'Kilometers / hour', factor: 0.2777777778 },
			{ id: 'mph', label: 'Miles / hour', factor: 0.44704 },
			{ id: 'fps', label: 'Feet / second', factor: 0.3048 },
			{ id: 'knot', label: 'Knots', factor: 0.5144444444 }
		]
	},
	{
		id: 'data',
		label: 'Digital storage',
		units: [
			{ id: 'b', label: 'Bytes', factor: 1 },
			{ id: 'kb', label: 'Kilobytes', factor: 1024 },
			{ id: 'mb', label: 'Megabytes', factor: 1024 ** 2 },
			{ id: 'gb', label: 'Gigabytes', factor: 1024 ** 3 },
			{ id: 'tb', label: 'Terabytes', factor: 1024 ** 4 },
			{ id: 'bit', label: 'Bits', factor: 0.125 }
		]
	}
];

/** Convert a linear unit value from one unit to another within a category. */
export function convertUnit(
	category: UnitCategory,
	value: number,
	fromId: string,
	toId: string
): number {
	const from = category.units.find((u) => u.id === fromId);
	const to = category.units.find((u) => u.id === toId);
	if (!from || !to) return NaN;
	return (value * from.factor) / to.factor;
}

/* Temperature is non-linear, handled separately. */
export const TEMPERATURE_UNITS = [
	{ id: 'c', label: 'Celsius' },
	{ id: 'f', label: 'Fahrenheit' },
	{ id: 'k', label: 'Kelvin' }
];

export function convertTemperature(value: number, from: string, to: string): number {
	// Normalise to Celsius, then to target.
	let c: number;
	if (from === 'c') c = value;
	else if (from === 'f') c = (value - 32) * (5 / 9);
	else c = value - 273.15; // kelvin

	if (to === 'c') return c;
	if (to === 'f') return c * (9 / 5) + 32;
	return c + 273.15;
}

/* ------------------------------ Colors ---------------------------- */

export interface Rgb {
	r: number;
	g: number;
	b: number;
}

/** Parse "#rgb", "#rrggbb", or "rgb(r,g,b)" into RGB. Throws if invalid. */
export function parseColor(input: string): Rgb {
	const s = input.trim().toLowerCase();
	const hex = s.replace('#', '');
	if (/^[0-9a-f]{3}$/.test(hex)) {
		return {
			r: parseInt(hex[0] + hex[0], 16),
			g: parseInt(hex[1] + hex[1], 16),
			b: parseInt(hex[2] + hex[2], 16)
		};
	}
	if (/^[0-9a-f]{6}$/.test(hex)) {
		return {
			r: parseInt(hex.slice(0, 2), 16),
			g: parseInt(hex.slice(2, 4), 16),
			b: parseInt(hex.slice(4, 6), 16)
		};
	}
	const m = s.match(/rgba?\(\s*(\d+)[,\s]+(\d+)[,\s]+(\d+)/);
	if (m) return { r: +m[1], g: +m[2], b: +m[3] };
	throw new Error('Enter a hex (#1a2b3c) or rgb(…) color');
}

export function rgbToHex({ r, g, b }: Rgb): string {
	const h = (n: number) => Math.round(n).toString(16).padStart(2, '0');
	return `#${h(r)}${h(g)}${h(b)}`;
}

export function rgbToHsl({ r, g, b }: Rgb): { h: number; s: number; l: number } {
	r /= 255;
	g /= 255;
	b /= 255;
	const max = Math.max(r, g, b);
	const min = Math.min(r, g, b);
	const l = (max + min) / 2;
	let h = 0;
	let s = 0;
	if (max !== min) {
		const d = max - min;
		s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
		if (max === r) h = (g - b) / d + (g < b ? 6 : 0);
		else if (max === g) h = (b - r) / d + 2;
		else h = (r - g) / d + 4;
		h /= 6;
	}
	return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}
