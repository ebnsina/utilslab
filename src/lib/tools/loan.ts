import type { Tool, Inputs, Result } from './types';
import { amortize } from '$lib/engine/finance';
import { currency } from '$lib/engine/format';

export const loan: Tool = {
	slug: 'loan',
	title: 'Loan Calculator',
	category: 'financial',
	description: 'Work out the monthly payment and total interest on any fixed-rate loan.',
	keywords: ['personal loan', 'auto loan', 'car loan', 'installment', 'repayment'],
	featured: true,
	fields: [
		{
			name: 'amount',
			label: 'Loan amount',
			type: 'number',
			default: 25000,
			unit: '$',
			min: 0,
			step: 500
		},
		{
			name: 'rate',
			label: 'Interest rate',
			type: 'number',
			default: 7.5,
			unit: '%',
			min: 0,
			max: 40,
			step: 0.01
		},
		{
			name: 'months',
			label: 'Term',
			type: 'number',
			default: 60,
			unit: 'mo',
			min: 1,
			max: 480,
			step: 1
		}
	],
	compute(inputs: Inputs): Result[] {
		const amount = Number(inputs.amount);
		const rate = Number(inputs.rate);
		const months = Number(inputs.months);
		const { payment, totalInterest, totalPaid } = amortize(amount, rate, months);

		return [
			{ kind: 'stat', label: 'Monthly payment', value: currency(payment), primary: true },
			{ kind: 'stat', label: 'Total interest', value: currency(totalInterest) },
			{ kind: 'stat', label: 'Total of payments', value: currency(totalPaid) }
		];
	}
};
