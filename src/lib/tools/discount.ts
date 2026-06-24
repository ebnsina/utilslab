import type { Tool, Inputs, Result } from './types';
import { currency } from '$lib/engine/format';

export const discount: Tool = {
	slug: 'discount',
	title: 'Discount Calculator',
	category: 'other',
	description: 'Work out the sale price and how much you save with a percentage off.',
	keywords: ['discount', 'sale', 'percent off', 'savings', 'price'],
	featured: true,
	fields: [
		{
			name: 'price',
			label: 'Original price',
			type: 'number',
			default: 80,
			unit: '$',
			min: 0,
			step: 1
		},
		{
			name: 'off',
			label: 'Discount',
			type: 'number',
			default: 25,
			unit: '%',
			min: 0,
			max: 100,
			step: 1
		}
	],
	compute(i: Inputs): Result[] {
		const price = Number(i.price);
		const saved = price * (Number(i.off) / 100);
		return [
			{ kind: 'stat', label: 'Final price', value: currency(price - saved), primary: true },
			{ kind: 'stat', label: 'You save', value: currency(saved) }
		];
	}
};
