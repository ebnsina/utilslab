import type { Tool, Inputs, Result } from './types';
import { currency, percent } from '$lib/engine/format';

export const salesTax: Tool = {
	slug: 'sales-tax',
	title: 'Sales Tax Calculator',
	category: 'financial',
	description: 'Add sales tax to a price, or work backward from a tax-inclusive total.',
	keywords: ['vat', 'tax', 'price', 'gross', 'net'],
	featured: false,
	fields: [
		{
			name: 'amount',
			label: 'Price before tax',
			type: 'number',
			default: 100,
			unit: '$',
			min: 0,
			step: 1
		},
		{
			name: 'rate',
			label: 'Tax rate',
			type: 'number',
			default: 7.25,
			unit: '%',
			min: 0,
			max: 50,
			step: 0.01
		}
	],
	compute(inputs: Inputs): Result[] {
		const amount = Number(inputs.amount);
		const rate = Number(inputs.rate);
		const tax = amount * (rate / 100);

		return [
			{ kind: 'stat', label: 'Total with tax', value: currency(amount + tax), primary: true },
			{ kind: 'stat', label: 'Tax amount', value: currency(tax) },
			{ kind: 'stat', label: 'Effective rate', value: percent(rate) }
		];
	}
};
