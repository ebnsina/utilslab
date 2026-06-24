import type { Tool } from './types';
import UnitConverter from '$lib/components/custom/UnitConverter.svelte';

export const unit: Tool = {
	slug: 'unit-converter',
	title: 'Unit Converter',
	category: 'other',
	description: 'Convert length, weight, volume, area, speed, data, and temperature units.',
	keywords: ['unit', 'convert', 'metric', 'imperial', 'length', 'weight', 'temperature'],
	featured: true,
	custom: UnitConverter
};
