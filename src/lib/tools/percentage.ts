import type { Tool, Inputs, Result } from './types';
import { percentOf, whatPercentOf, percentChange } from '$lib/engine/math';
import { number, percent } from '$lib/engine/format';

export const percentage: Tool = {
	slug: 'percentage',
	title: 'Percentage Calculator',
	category: 'math',
	description:
		'Solve the three common percentage questions at once — of, is-what-percent, and change.',
	keywords: ['percent', '%', 'percentage change', 'discount', 'increase'],
	featured: true,
	fields: [
		{ name: 'x', label: 'Value X', type: 'number', default: 25, step: 0.01 },
		{ name: 'y', label: 'Value Y', type: 'number', default: 200, step: 0.01 }
	],
	compute(inputs: Inputs): Result[] {
		const x = Number(inputs.x);
		const y = Number(inputs.y);
		return [
			{
				kind: 'stat',
				label: `${number(x)}% of ${number(y)}`,
				value: number(percentOf(x, y)),
				primary: true
			},
			{
				kind: 'stat',
				label: `${number(x)} is what % of ${number(y)}`,
				value: percent(whatPercentOf(x, y))
			},
			{
				kind: 'stat',
				label: `% change ${number(x)} → ${number(y)}`,
				value: percent(percentChange(x, y))
			}
		];
	}
};
