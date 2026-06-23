/** Health & fitness formulas. Metric units throughout (kg, cm). Pure. */

export type Sex = 'male' | 'female';

export interface BmiResult {
	bmi: number;
	category: 'Underweight' | 'Normal' | 'Overweight' | 'Obese';
}

/** Body Mass Index from weight (kg) and height (cm). */
export function bmi(weightKg: number, heightCm: number): BmiResult {
	const m = heightCm / 100;
	const value = m > 0 ? weightKg / (m * m) : 0;
	const category: BmiResult['category'] =
		value < 18.5 ? 'Underweight' : value < 25 ? 'Normal' : value < 30 ? 'Overweight' : 'Obese';
	return { bmi: value, category };
}

/** Basal Metabolic Rate — Mifflin-St Jeor equation (kcal/day). */
export function bmr(sex: Sex, weightKg: number, heightCm: number, ageYears: number): number {
	const base = 10 * weightKg + 6.25 * heightCm - 5 * ageYears;
	return sex === 'male' ? base + 5 : base - 161;
}

/** Activity multipliers for Total Daily Energy Expenditure. */
export const ACTIVITY_LEVELS = [
	{ value: '1.2', label: 'Sedentary (little/no exercise)' },
	{ value: '1.375', label: 'Light (1–3 days/week)' },
	{ value: '1.55', label: 'Moderate (3–5 days/week)' },
	{ value: '1.725', label: 'Active (6–7 days/week)' },
	{ value: '1.9', label: 'Very active (hard daily exercise)' }
] as const;

/** Total Daily Energy Expenditure (kcal/day) = BMR × activity factor. */
export function tdee(bmrValue: number, activityFactor: number): number {
	return bmrValue * activityFactor;
}

/**
 * Body fat percentage — U.S. Navy method.
 * Circumferences in cm. `hipCm` required for females.
 */
export function bodyFatNavy(
	sex: Sex,
	heightCm: number,
	neckCm: number,
	waistCm: number,
	hipCm = 0
): number {
	const log10 = Math.log10;
	if (sex === 'male') {
		return 495 / (1.0324 - 0.19077 * log10(waistCm - neckCm) + 0.15456 * log10(heightCm)) - 450;
	}
	return (
		495 / (1.29579 - 0.35004 * log10(waistCm + hipCm - neckCm) + 0.221 * log10(heightCm)) - 450
	);
}
