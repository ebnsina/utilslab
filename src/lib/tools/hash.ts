import type { Tool } from './types';
import { hashAll } from '$lib/engine/text';

export const hashTool: Tool = {
	slug: 'hash-generator',
	title: 'Hash Generator',
	category: 'developer',
	type: 'text',
	description: 'Generate SHA-1, SHA-256, SHA-384 and SHA-512 hashes of any text.',
	keywords: ['hash', 'sha', 'sha256', 'checksum', 'digest', 'crypto'],
	featured: true,
	transform: hashAll,
	inputPlaceholder: 'Type or paste text to hash…'
};
