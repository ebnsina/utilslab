import type { Tool, Inputs, Result } from './types';
import { plural } from '$lib/engine/format';

/** Calendar difference between two dates, broken into years/months/days. */
function dateDiff(from: Date, to: Date) {
	let years = to.getFullYear() - from.getFullYear();
	let months = to.getMonth() - from.getMonth();
	let days = to.getDate() - from.getDate();

	if (days < 0) {
		months -= 1;
		// Days in the month preceding `to`.
		days += new Date(to.getFullYear(), to.getMonth(), 0).getDate();
	}
	if (months < 0) {
		years -= 1;
		months += 12;
	}
	const totalDays = Math.floor((to.getTime() - from.getTime()) / 86_400_000);
	return { years, months, days, totalDays };
}

export const age: Tool = {
	slug: 'age',
	title: 'Age Calculator',
	category: 'other',
	description: 'Calculate exact age in years, months, and days between two dates.',
	keywords: ['age', 'birthday', 'date difference', 'how old'],
	featured: true,
	fields: [
		{ name: 'birth', label: 'Date of birth', type: 'date', default: '1995-06-15' },
		{ name: 'as_of', label: 'Age at the date', type: 'date', default: '2026-06-23' }
	],
	compute(inputs: Inputs): Result[] {
		const from = new Date(String(inputs.birth));
		const to = new Date(String(inputs.as_of));
		if (Number.isNaN(from.getTime()) || Number.isNaN(to.getTime()) || to < from) {
			return [
				{ kind: 'stat', label: 'Age', value: '—', caption: 'Check the dates', primary: true }
			];
		}
		const { years, months, days, totalDays } = dateDiff(from, to);
		return [
			{ kind: 'stat', label: 'Age', value: `${years} yr ${months} mo ${days} d`, primary: true },
			{ kind: 'stat', label: 'In months', value: plural(years * 12 + months, 'month') },
			{ kind: 'stat', label: 'In weeks', value: plural(Math.floor(totalDays / 7), 'week') },
			{ kind: 'stat', label: 'In days', value: plural(totalDays, 'day') }
		];
	}
};
