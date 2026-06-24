import type { Tool } from './types';
import UuidGenerator from '$lib/components/custom/UuidGenerator.svelte';

export const uuid: Tool = {
	slug: 'uuid-generator',
	title: 'UUID Generator',
	category: 'developer',
	description: 'Generate random version-4 UUIDs in bulk and copy them in one click.',
	keywords: ['uuid', 'guid', 'unique id', 'v4', 'random'],
	featured: true,
	custom: UuidGenerator
};
