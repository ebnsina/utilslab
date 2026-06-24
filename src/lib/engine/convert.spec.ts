import { describe, it, expect } from 'vitest';
import {
	UNIT_CATEGORIES,
	convertUnit,
	convertTemperature,
	parseColor,
	rgbToHex,
	rgbToHsl
} from './convert';
import { round } from './format';

const length = UNIT_CATEGORIES.find((c) => c.id === 'length')!;

describe('unit conversion', () => {
	it('converts km to miles', () => {
		expect(round(convertUnit(length, 1, 'km', 'mi'), 4)).toBe(0.6214);
	});
	it('converts feet to meters', () => {
		expect(round(convertUnit(length, 10, 'ft', 'm'), 4)).toBe(3.048);
	});
});

describe('temperature', () => {
	it('C to F', () => {
		expect(convertTemperature(100, 'c', 'f')).toBe(212);
		expect(convertTemperature(0, 'c', 'f')).toBe(32);
	});
	it('F to C', () => {
		expect(convertTemperature(32, 'f', 'c')).toBe(0);
	});
	it('C to K', () => {
		expect(convertTemperature(0, 'c', 'k')).toBe(273.15);
	});
});

describe('color', () => {
	it('parses hex and shorthand', () => {
		expect(parseColor('#ff8800')).toEqual({ r: 255, g: 136, b: 0 });
		expect(parseColor('#f80')).toEqual({ r: 255, g: 136, b: 0 });
	});
	it('round-trips rgb<->hex', () => {
		expect(rgbToHex({ r: 255, g: 136, b: 0 })).toBe('#ff8800');
	});
	it('converts to hsl', () => {
		expect(rgbToHsl({ r: 255, g: 0, b: 0 })).toEqual({ h: 0, s: 100, l: 50 });
	});
	it('throws on garbage', () => {
		expect(() => parseColor('nope')).toThrow();
	});
});
