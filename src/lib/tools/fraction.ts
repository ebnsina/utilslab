import type { Tool } from './types';
import FractionCalc from '$lib/components/custom/FractionCalc.svelte';

export const fraction: Tool = {
	slug: 'fraction',
	title: 'Fraction Calculator',
	category: 'math',
	description:
		'Add, subtract, multiply, and divide fractions with an automatically reduced result.',
	keywords: ['fraction', 'simplify', 'reduce', 'numerator', 'denominator'],
	featured: false,
	custom: FractionCalc
};
