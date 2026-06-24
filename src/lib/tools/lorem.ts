import type { Tool } from './types';
import LoremGenerator from '$lib/components/custom/LoremGenerator.svelte';

export const lorem: Tool = {
	slug: 'lorem-ipsum',
	title: 'Lorem Ipsum Generator',
	category: 'developer',
	description: 'Generate placeholder paragraphs of lorem ipsum text.',
	keywords: ['lorem', 'ipsum', 'placeholder', 'dummy text', 'filler'],
	custom: LoremGenerator
};
