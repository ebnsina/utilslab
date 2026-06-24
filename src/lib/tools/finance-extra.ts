import type { Tool, Inputs, Result } from './types';
import { amortize, roi, requiredContribution } from '$lib/engine/finance';
import { currency, percent, number } from '$lib/engine/format';

export const autoLoan: Tool = {
	slug: 'auto-loan',
	title: 'Auto Loan Calculator',
	category: 'financial',
	description: 'Estimate your car payment including down payment, trade-in, and sales tax.',
	keywords: ['car', 'auto', 'vehicle', 'loan', 'payment'],
	featured: true,
	fields: [
		{
			name: 'price',
			label: 'Vehicle price',
			type: 'number',
			default: 35000,
			unit: '$',
			min: 0,
			step: 500
		},
		{
			name: 'down',
			label: 'Down payment',
			type: 'number',
			default: 5000,
			unit: '$',
			min: 0,
			step: 500
		},
		{
			name: 'trade',
			label: 'Trade-in value',
			type: 'number',
			default: 0,
			unit: '$',
			min: 0,
			step: 500
		},
		{
			name: 'tax',
			label: 'Sales tax',
			type: 'number',
			default: 7,
			unit: '%',
			min: 0,
			max: 25,
			step: 0.1
		},
		{
			name: 'rate',
			label: 'Interest rate',
			type: 'number',
			default: 6.9,
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
			max: 120,
			step: 1
		}
	],
	compute(i: Inputs): Result[] {
		const price = Number(i.price);
		const taxable = Math.max(price - Number(i.trade), 0);
		const tax = taxable * (Number(i.tax) / 100);
		const financed = Math.max(price - Number(i.down) - Number(i.trade) + tax, 0);
		const { payment, totalInterest } = amortize(financed, Number(i.rate), Number(i.months));
		return [
			{ kind: 'stat', label: 'Monthly payment', value: currency(payment), primary: true },
			{ kind: 'stat', label: 'Amount financed', value: currency(financed, 0) },
			{ kind: 'stat', label: 'Sales tax', value: currency(tax, 0) },
			{ kind: 'stat', label: 'Total interest', value: currency(totalInterest, 0) }
		];
	}
};

export const roiTool: Tool = {
	slug: 'roi',
	title: 'ROI Calculator',
	category: 'financial',
	description: 'Calculate return on investment, total gain, and annualized return.',
	keywords: ['roi', 'return', 'investment', 'profit', 'gain'],
	featured: true,
	fields: [
		{
			name: 'initial',
			label: 'Amount invested',
			type: 'number',
			default: 10000,
			unit: '$',
			min: 0,
			step: 100
		},
		{
			name: 'final',
			label: 'Final value',
			type: 'number',
			default: 15000,
			unit: '$',
			min: 0,
			step: 100
		},
		{
			name: 'years',
			label: 'Holding period',
			type: 'number',
			default: 3,
			unit: 'yr',
			min: 0,
			max: 100,
			step: 0.5
		}
	],
	compute(i: Inputs): Result[] {
		const initial = Number(i.initial);
		const final = Number(i.final);
		const years = Number(i.years);
		const r = roi(initial, final);
		const annualized =
			years > 0 && initial > 0 ? (Math.pow(final / initial, 1 / years) - 1) * 100 : NaN;
		const out: Result[] = [
			{ kind: 'stat', label: 'Total ROI', value: percent(r), primary: true },
			{ kind: 'stat', label: 'Net gain', value: currency(final - initial) }
		];
		if (Number.isFinite(annualized)) {
			out.push({
				kind: 'stat',
				label: 'Annualized return',
				value: percent(annualized),
				caption: `over ${number(years)} yr`
			});
		}
		return out;
	}
};

export const savingsGoal: Tool = {
	slug: 'savings-goal',
	title: 'Savings Goal Calculator',
	category: 'financial',
	description: 'Find the monthly contribution needed to reach a savings target.',
	keywords: ['savings', 'goal', 'target', 'contribution', 'save'],
	fields: [
		{
			name: 'target',
			label: 'Savings goal',
			type: 'number',
			default: 50000,
			unit: '$',
			min: 0,
			step: 1000
		},
		{
			name: 'current',
			label: 'Current savings',
			type: 'number',
			default: 5000,
			unit: '$',
			min: 0,
			step: 500
		},
		{
			name: 'rate',
			label: 'Annual return',
			type: 'number',
			default: 4,
			unit: '%',
			min: 0,
			max: 30,
			step: 0.1
		},
		{
			name: 'years',
			label: 'Time frame',
			type: 'number',
			default: 5,
			unit: 'yr',
			min: 0.5,
			max: 60,
			step: 0.5
		}
	],
	compute(i: Inputs): Result[] {
		const monthly = requiredContribution(
			Number(i.target),
			Number(i.current),
			Number(i.rate),
			Number(i.years)
		);
		const contributed = Number(i.current) + monthly * 12 * Number(i.years);
		return [
			{
				kind: 'stat',
				label: 'Monthly contribution',
				value: currency(Math.max(monthly, 0)),
				primary: true
			},
			{ kind: 'stat', label: 'You contribute', value: currency(Math.max(contributed, 0), 0) },
			{
				kind: 'stat',
				label: 'Growth earned',
				value: currency(Math.max(Number(i.target) - contributed, 0), 0)
			}
		];
	}
};
