import type { Tool } from './types';
import StatisticsCalc from '$lib/components/custom/StatisticsCalc.svelte';

export const statistics: Tool = {
	slug: 'statistics',
	title: 'Standard Deviation Calculator',
	category: 'math',
	description: 'Compute mean, median, standard deviation, and more from a list of numbers.',
	keywords: ['statistics', 'standard deviation', 'mean', 'median', 'variance', 'average'],
	featured: true,
	custom: StatisticsCalc
};
