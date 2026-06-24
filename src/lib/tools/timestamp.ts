import type { Tool } from './types';
import TimestampConverter from '$lib/components/custom/TimestampConverter.svelte';

export const timestamp: Tool = {
	slug: 'timestamp-converter',
	title: 'Timestamp Converter',
	category: 'developer',
	description: 'Convert between Unix timestamps and human-readable dates, both ways.',
	keywords: ['unix', 'timestamp', 'epoch', 'date', 'time', 'iso'],
	custom: TimestampConverter
};
