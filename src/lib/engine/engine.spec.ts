import { describe, it, expect } from 'vitest';
import { monthlyPayment, amortize, futureValue } from './finance';
import { bmi, bmr, tdee, bodyFatNavy } from './health';
import { gcd, simplifyFraction, fractionOp, whatPercentOf, percentOf } from './math';
import { round } from './format';

describe('finance', () => {
	it('computes a 30yr mortgage payment', () => {
		// $300k @ 6.5% over 360 months ≈ $1896.20/mo
		expect(round(monthlyPayment(300_000, 6.5, 360), 2)).toBeCloseTo(1896.2, 1);
	});

	it('handles a zero-interest loan as straight division', () => {
		expect(monthlyPayment(1200, 0, 12)).toBe(100);
	});

	it('amortizes to a zero final balance', () => {
		const { schedule, totalPaid } = amortize(10_000, 5, 24);
		expect(schedule.at(-1)!.balance).toBe(0);
		expect(totalPaid).toBeGreaterThan(10_000);
	});

	it('grows a lump sum with monthly compounding', () => {
		// $1000 @ 5% for 10yr, monthly ≈ $1647
		expect(round(futureValue(1000, 5, 10, 12), 0)).toBeCloseTo(1647, 0);
	});
});

describe('health', () => {
	it('computes BMI and category', () => {
		const r = bmi(70, 175);
		expect(round(r.bmi, 1)).toBe(22.9);
		expect(r.category).toBe('Normal');
	});

	it('computes Mifflin-St Jeor BMR for a male', () => {
		// 80kg, 180cm, 30yr male = 1780
		expect(round(bmr('male', 80, 180, 30), 0)).toBe(1780);
	});

	it('applies activity factor for TDEE', () => {
		expect(tdee(1780, 1.55)).toBeCloseTo(2759, 0);
	});

	it('computes Navy body fat within a sane range', () => {
		const bf = bodyFatNavy('male', 180, 38, 85);
		expect(bf).toBeGreaterThan(5);
		expect(bf).toBeLessThan(35);
	});
});

describe('math', () => {
	it('reduces fractions', () => {
		expect(gcd(12, 8)).toBe(4);
		expect(simplifyFraction(8, 12)).toEqual({ numerator: 2, denominator: 3 });
	});

	it('adds fractions', () => {
		// 1/2 + 1/3 = 5/6
		const r = fractionOp({ numerator: 1, denominator: 2 }, 'add', { numerator: 1, denominator: 3 });
		expect(r).toEqual({ numerator: 5, denominator: 6 });
	});

	it('computes percentages', () => {
		expect(whatPercentOf(25, 200)).toBe(12.5);
		expect(percentOf(12.5, 200)).toBe(25);
	});
});
