import type { Tool, Inputs, Result } from './types';
import { bmi } from '$lib/engine/health';
import { number } from '$lib/engine/format';

export const bmiCalculator: Tool = {
	slug: 'bmi',
	title: 'BMI Calculator',
	category: 'health',
	description: 'Calculate your Body Mass Index and see which weight category it falls into.',
	keywords: ['body mass index', 'weight', 'height', 'overweight', 'obese'],
	featured: true,
	fields: [
		{
			name: 'weight',
			label: 'Weight',
			type: 'number',
			default: 70,
			unit: 'kg',
			min: 1,
			max: 400,
			step: 0.1
		},
		{
			name: 'height',
			label: 'Height',
			type: 'number',
			default: 175,
			unit: 'cm',
			min: 50,
			max: 260,
			step: 0.5
		}
	],
	compute(inputs: Inputs): Result[] {
		const { bmi: value, category } = bmi(Number(inputs.weight), Number(inputs.height));
		return [
			{
				kind: 'stat',
				label: 'Your BMI',
				value: number(value, 1),
				caption: category,
				primary: true
			},
			{ kind: 'stat', label: 'Healthy range', value: '18.5 – 24.9', caption: 'Normal weight BMI' }
		];
	}
};
