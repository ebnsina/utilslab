import type { Tool, Inputs, Result } from './types';
import { currency } from '$lib/engine/format';

export const tip: Tool = {
	slug: 'tip',
	title: 'Tip Calculator',
	category: 'other',
	description: 'Split the bill and work out the tip per person in seconds.',
	keywords: ['gratuity', 'restaurant', 'split bill', 'service'],
	featured: true,
	fields: [
		{
			name: 'bill',
			label: 'Bill amount',
			type: 'number',
			default: 60,
			unit: '$',
			min: 0,
			step: 0.5
		},
		{
			name: 'tip',
			label: 'Tip',
			type: 'number',
			default: 18,
			unit: '%',
			min: 0,
			max: 100,
			step: 1
		},
		{
			name: 'people',
			label: 'Split between',
			type: 'number',
			default: 2,
			unit: 'ppl',
			min: 1,
			max: 100,
			step: 1
		}
	],
	compute(inputs: Inputs): Result[] {
		const bill = Number(inputs.bill);
		const tipPct = Number(inputs.tip);
		const people = Math.max(Number(inputs.people), 1);

		const tipAmount = bill * (tipPct / 100);
		const total = bill + tipAmount;

		return [
			{ kind: 'stat', label: 'Total per person', value: currency(total / people), primary: true },
			{ kind: 'stat', label: 'Tip amount', value: currency(tipAmount) },
			{ kind: 'stat', label: 'Grand total', value: currency(total) }
		];
	}
};
