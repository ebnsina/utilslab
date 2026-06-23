import type { Tool, Inputs, Result } from './types';
import { amortize } from '$lib/engine/finance';
import { currency } from '$lib/engine/format';

export const mortgage: Tool = {
	slug: 'mortgage',
	title: 'Mortgage Calculator',
	category: 'financial',
	description:
		'Estimate your monthly mortgage payment, total interest, and full amortization schedule.',
	keywords: ['home loan', 'house payment', 'amortization', 'principal', 'interest'],
	featured: true,
	fields: [
		{
			name: 'price',
			label: 'Home price',
			type: 'number',
			default: 400000,
			unit: '$',
			min: 0,
			step: 1000
		},
		{
			name: 'down',
			label: 'Down payment',
			type: 'number',
			default: 80000,
			unit: '$',
			min: 0,
			step: 1000
		},
		{
			name: 'rate',
			label: 'Interest rate',
			type: 'number',
			default: 6.5,
			unit: '%',
			min: 0,
			max: 30,
			step: 0.01
		},
		{
			name: 'years',
			label: 'Loan term',
			type: 'number',
			default: 30,
			unit: 'yr',
			min: 1,
			max: 40,
			step: 1
		}
	],
	compute(inputs: Inputs): Result[] {
		const price = Number(inputs.price);
		const down = Number(inputs.down);
		const rate = Number(inputs.rate);
		const years = Number(inputs.years);

		const principal = Math.max(price - down, 0);
		const months = years * 12;
		const { payment, totalInterest, totalPaid, schedule } = amortize(principal, rate, months);

		// Yearly summary rows keep the table digestible.
		const yearly = schedule
			.filter((row) => row.period % 12 === 0)
			.map((row) => {
				const year = row.period / 12;
				return [
					year,
					currency(schedule.slice((year - 1) * 12, year * 12).reduce((s, r) => s + r.interest, 0)),
					currency(row.balance)
				];
			});

		return [
			{ kind: 'stat', label: 'Monthly payment', value: currency(payment), primary: true },
			{ kind: 'stat', label: 'Loan amount', value: currency(principal, 0) },
			{ kind: 'stat', label: 'Total interest', value: currency(totalInterest, 0) },
			{ kind: 'stat', label: 'Total of payments', value: currency(totalPaid, 0) },
			{
				kind: 'table',
				label: 'Yearly breakdown',
				columns: ['Year', 'Interest paid', 'Remaining balance'],
				rows: yearly,
				previewRows: 6
			}
		];
	}
};
