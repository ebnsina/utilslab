import type { Tool } from './types';
import ScientificCalc from '$lib/components/custom/ScientificCalc.svelte';

export const scientific: Tool = {
	slug: 'scientific',
	title: 'Scientific Calculator',
	category: 'math',
	description: 'A full scientific calculator with trig, logs, powers, and constants.',
	keywords: ['scientific', 'trig', 'sin', 'cos', 'log', 'exponent', 'calculator'],
	featured: true,
	custom: ScientificCalc
};
