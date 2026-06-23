import type { Tool, Inputs, Result } from './types';
import { bmr, tdee, ACTIVITY_LEVELS, type Sex } from '$lib/engine/health';
import { number } from '$lib/engine/format';

export const calorie: Tool = {
	slug: 'calorie',
	title: 'Calorie Calculator',
	category: 'health',
	description:
		'Estimate your daily calorie needs (TDEE) plus targets for losing or gaining weight.',
	keywords: ['tdee', 'maintenance calories', 'bmr', 'deficit', 'surplus', 'diet'],
	featured: true,
	fields: [
		{
			name: 'sex',
			label: 'Sex',
			type: 'select',
			default: 'male',
			options: [
				{ value: 'male', label: 'Male' },
				{ value: 'female', label: 'Female' }
			]
		},
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
		},
		{
			name: 'activity',
			label: 'Activity level',
			type: 'select',
			default: '1.55',
			options: [...ACTIVITY_LEVELS]
		}
	],
	compute(inputs: Inputs): Result[] {
		const sex = inputs.sex as Sex;
		const base = bmr(sex, Number(inputs.weight), Number(inputs.height), Number(inputs.age));
		const maintenance = tdee(base, Number(inputs.activity));

		return [
			{
				kind: 'stat',
				label: 'Maintenance calories',
				value: `${number(maintenance, 0)} kcal`,
				caption: 'per day',
				primary: true
			},
			{
				kind: 'stat',
				label: 'Mild weight loss',
				value: `${number(maintenance - 500, 0)} kcal`,
				caption: '−0.5 kg / week'
			},
			{
				kind: 'stat',
				label: 'Weight gain',
				value: `${number(maintenance + 500, 0)} kcal`,
				caption: '+0.5 kg / week'
			},
			{ kind: 'stat', label: 'BMR', value: `${number(base, 0)} kcal`, caption: 'at complete rest' }
		];
	}
};
