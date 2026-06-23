import type { Tool, Inputs, Result } from './types';
import { bodyFatNavy, type Sex } from '$lib/engine/health';
import { percent } from '$lib/engine/format';

export const bodyFat: Tool = {
	slug: 'body-fat',
	title: 'Body Fat Calculator',
	category: 'health',
	description: 'Estimate body fat percentage using the U.S. Navy circumference method.',
	keywords: ['body fat', 'navy method', 'composition', 'lean mass'],
	featured: false,
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
			name: 'neck',
			label: 'Neck',
			type: 'number',
			default: 38,
			unit: 'cm',
			min: 20,
			max: 80,
			step: 0.1
		},
		{
			name: 'waist',
			label: 'Waist',
			type: 'number',
			default: 85,
			unit: 'cm',
			min: 40,
			max: 200,
			step: 0.1
		},
		{
			name: 'hip',
			label: 'Hip (females)',
			type: 'number',
			default: 95,
			unit: 'cm',
			min: 40,
			max: 200,
			step: 0.1,
			hint: 'Only used for females'
		}
	],
	compute(inputs: Inputs): Result[] {
		const sex = inputs.sex as Sex;
		const value = bodyFatNavy(
			sex,
			Number(inputs.height),
			Number(inputs.neck),
			Number(inputs.waist),
			Number(inputs.hip)
		);
		const category =
			sex === 'male'
				? value < 6
					? 'Essential'
					: value < 14
						? 'Athletic'
						: value < 18
							? 'Fitness'
							: value < 25
								? 'Average'
								: 'High'
				: value < 14
					? 'Essential'
					: value < 21
						? 'Athletic'
						: value < 25
							? 'Fitness'
							: value < 32
								? 'Average'
								: 'High';

		return [
			{
				kind: 'stat',
				label: 'Body fat',
				value: percent(value, 1),
				caption: category,
				primary: true
			}
		];
	}
};
