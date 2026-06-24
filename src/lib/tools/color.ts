import type { Tool } from './types';
import ColorConverter from '$lib/components/custom/ColorConverter.svelte';

export const color: Tool = {
	slug: 'color-converter',
	title: 'Color Converter',
	category: 'developer',
	description: 'Convert colors between HEX, RGB, and HSL with a live picker and swatch.',
	keywords: ['color', 'hex', 'rgb', 'hsl', 'picker', 'convert'],
	custom: ColorConverter
};
