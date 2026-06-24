import type { Tool, Inputs, Result } from './types';
import { bmr, idealWeight, waterIntakeLiters, type Sex } from '$lib/engine/health';
import { number } from '$lib/engine/format';

const SEX_FIELD = {
	name: 'sex',
	label: 'Sex',
	type: 'select' as const,
	default: 'male',
	options: [
		{ value: 'male', label: 'Male' },
		{ value: 'female', label: 'Female' }
	]
};

export const bmrTool: Tool = {
	slug: 'bmr',
	title: 'BMR Calculator',
	category: 'health',
	description: 'Calculate your Basal Metabolic Rate — calories burned at complete rest.',
	keywords: ['bmr', 'basal metabolic rate', 'calories', 'metabolism'],
	fields: [
		SEX_FIELD,
		{
			name: 'age',
			label: 'Age',
			type: 'number',
			default: 30,
			unit: 'yr',
			min: 14,
			max: 100,
			step: 1
		},
		{
			name: 'weight',
			label: 'Weight',
			type: 'number',
			default: 75,
			unit: 'kg',
			min: 30,
			max: 400,
			step: 0.1
		},
		{
			name: 'height',
			label: 'Height',
			type: 'number',
			default: 178,
			unit: 'cm',
			min: 120,
			max: 260,
			step: 0.5
		}
	],
	compute(i: Inputs): Result[] {
		const base = bmr(i.sex as Sex, Number(i.weight), Number(i.height), Number(i.age));
		return [
			{
				kind: 'stat',
				label: 'BMR',
				value: `${number(base, 0)} kcal`,
				caption: 'per day at rest',
				primary: true
			}
		];
	}
};

export const idealWeightTool: Tool = {
	slug: 'ideal-weight',
	title: 'Ideal Weight Calculator',
	category: 'health',
	description: 'Estimate a healthy target body weight for your height (Devine formula).',
	keywords: ['ideal weight', 'healthy weight', 'target weight', 'devine'],
	fields: [
		SEX_FIELD,
		{
			name: 'height',
			label: 'Height',
			type: 'number',
			default: 175,
			unit: 'cm',
			min: 120,
			max: 260,
			step: 0.5
		}
	],
	compute(i: Inputs): Result[] {
		const kg = idealWeight(i.sex as Sex, Number(i.height));
		return [
			{ kind: 'stat', label: 'Ideal weight', value: `${number(kg, 1)} kg`, primary: true },
			{ kind: 'stat', label: 'In pounds', value: `${number(kg * 2.2046226, 1)} lb` }
		];
	}
};

export const waterIntake: Tool = {
	slug: 'water-intake',
	title: 'Water Intake Calculator',
	category: 'health',
	description: 'Find roughly how much water you should drink each day for your weight.',
	keywords: ['water', 'hydration', 'intake', 'drink', 'fluid'],
	fields: [
		{
			name: 'weight',
			label: 'Weight',
			type: 'number',
			default: 70,
			unit: 'kg',
			min: 20,
			max: 400,
			step: 0.1
		}
	],
	compute(i: Inputs): Result[] {
		const liters = waterIntakeLiters(Number(i.weight));
		return [
			{ kind: 'stat', label: 'Daily water', value: `${number(liters, 2)} L`, primary: true },
			{ kind: 'stat', label: 'In cups', value: `${number(liters / 0.2365882365, 0)} cups` },
			{ kind: 'stat', label: 'In fluid ounces', value: `${number(liters / 0.0295735296, 0)} fl oz` }
		];
	}
};
