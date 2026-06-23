import type { Tool } from './types';
import { base64Encode, base64Decode } from '$lib/engine/text';

export const base64EncodeTool: Tool = {
	slug: 'base64-encode',
	title: 'Base64 Encode',
	category: 'developer',
	type: 'text',
	description: 'Encode text to Base64 (UTF-8 safe).',
	keywords: ['base64', 'encode', 'btoa', 'binary'],
	featured: true,
	transform: base64Encode,
	inputPlaceholder: 'Type or paste text to encode…'
};

export const base64DecodeTool: Tool = {
	slug: 'base64-decode',
	title: 'Base64 Decode',
	category: 'developer',
	type: 'text',
	description: 'Decode Base64 back to readable text.',
	keywords: ['base64', 'decode', 'atob'],
	transform: base64Decode,
	inputPlaceholder: 'Paste Base64 to decode…'
};
