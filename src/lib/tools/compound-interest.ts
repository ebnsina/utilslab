import type { Tool, Inputs, Result } from './types';
import { futureValue } from '$lib/engine/finance';
import { currency } from '$lib/engine/format';

const FREQUENCIES = [
	{ value: '1', label: 'Annually' },
	{ value: '4', label: 'Quarterly' },
	{ value: '12', label: 'Monthly' },
	{ value: '365', label: 'Daily' }
];

export const compoundInterest: Tool = {
	slug: 'compound-interest',
	title: 'Compound Interest Calculator',
	category: 'financial',
	description:
		'See how an investment grows over time with compounding and recurring contributions.',
	keywords: ['savings', 'investment', 'interest', 'future value', 'growth'],
	featured: true,
	fields: [
		{
			name: 'principal',
			label: 'Initial amount',
			type: 'number',
			default: 10000,
			unit: '$',
			min: 0,
			step: 500
		},
		{
			name: 'contribution',
			label: 'Added each period',
			type: 'number',
			default: 200,
			unit: '$',
			min: 0,
			step: 50,
			hint: 'Recurring deposit per compounding period'
		},
		{
			name: 'rate',
			label: 'Annual rate',
			type: 'number',
			default: 7,
			unit: '%',
			min: 0,
			max: 50,
			step: 0.1
		},
		{
			name: 'years',
			label: 'Years',
			type: 'number',
			default: 20,
			unit: 'yr',
			min: 1,
			max: 80,
			step: 1
		},
		{ name: 'frequency', label: 'Compounding', type: 'select', default: '12', options: FREQUENCIES }
	],
	compute(inputs: Inputs): Result[] {
		const principal = Number(inputs.principal);
		const contribution = Number(inputs.contribution);
		const rate = Number(inputs.rate);
		const years = Number(inputs.years);
		const n = Number(inputs.frequency);

		const future = futureValue(principal, rate, years, n, contribution);
		const contributed = principal + contribution * n * years;
		const interest = future - contributed;

		// Year-by-year balance for the growth chart.
		const balance: number[] = [];
		const xLabels: string[] = [];
		for (let y = 0; y <= years; y++) {
			balance.push(Math.round(futureValue(principal, rate, y, n, contribution)));
			xLabels.push(String(y));
		}

		return [
			{ kind: 'stat', label: 'Future value', value: currency(future, 0), primary: true },
			{ kind: 'stat', label: 'Total contributed', value: currency(contributed, 0) },
			{ kind: 'stat', label: 'Interest earned', value: currency(interest, 0) },
			{
				kind: 'series',
				label: 'Balance over time',
				series: [{ name: 'Balance', color: 'var(--color-financial)', points: balance }],
				xLabels
			}
		];
	}
};
