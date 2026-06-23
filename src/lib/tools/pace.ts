import type { Tool, Inputs, Result } from './types';
import { number } from '$lib/engine/format';

/** Format a duration in seconds as "m:ss" or "h:mm:ss". */
function clock(totalSeconds: number): string {
	if (!Number.isFinite(totalSeconds) || totalSeconds <= 0) return '—';
	const s = Math.round(totalSeconds);
	const h = Math.floor(s / 3600);
	const m = Math.floor((s % 3600) / 60);
	const sec = s % 60;
	const pad = (n: number) => String(n).padStart(2, '0');
	return h > 0 ? `${h}:${pad(m)}:${pad(sec)}` : `${m}:${pad(sec)}`;
}

export const pace: Tool = {
	slug: 'pace',
	title: 'Pace Calculator',
	category: 'health',
	description: 'Find your running pace per km/mile from a distance and finish time.',
	keywords: ['running', 'pace', 'speed', 'marathon', '5k', '10k'],
	featured: false,
	fields: [
		{
			name: 'distance',
			label: 'Distance',
			type: 'number',
			default: 10,
			unit: 'km',
			min: 0.1,
			max: 1000,
			step: 0.1
		},
		{
			name: 'hours',
			label: 'Hours',
			type: 'number',
			default: 0,
			unit: 'h',
			min: 0,
			max: 99,
			step: 1
		},
		{
			name: 'minutes',
			label: 'Minutes',
			type: 'number',
			default: 50,
			unit: 'min',
			min: 0,
			max: 59,
			step: 1
		},
		{
			name: 'seconds',
			label: 'Seconds',
			type: 'number',
			default: 0,
			unit: 's',
			min: 0,
			max: 59,
			step: 1
		}
	],
	compute(inputs: Inputs): Result[] {
		const distance = Number(inputs.distance);
		const totalSeconds =
			Number(inputs.hours) * 3600 + Number(inputs.minutes) * 60 + Number(inputs.seconds);
		const secPerKm = distance > 0 ? totalSeconds / distance : 0;
		const kmPerHour = totalSeconds > 0 ? distance / (totalSeconds / 3600) : 0;
		const secPerMile = secPerKm * 1.609344;

		return [
			{ kind: 'stat', label: 'Pace', value: `${clock(secPerKm)} /km`, primary: true },
			{ kind: 'stat', label: 'Pace', value: `${clock(secPerMile)} /mi` },
			{ kind: 'stat', label: 'Speed', value: `${number(kmPerHour, 2)} km/h` }
		];
	}
};
