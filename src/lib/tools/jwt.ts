import type { Tool } from './types';
import { jwtDecode } from '$lib/engine/text';

export const jwtTool: Tool = {
	slug: 'jwt-decoder',
	title: 'JWT Decoder',
	category: 'developer',
	type: 'text',
	description: 'Decode a JSON Web Token to inspect its header and payload (no signature check).',
	keywords: ['jwt', 'token', 'decode', 'json web token', 'auth'],
	featured: true,
	transform: jwtDecode,
	inputPlaceholder: 'Paste a JWT (header.payload.signature)…'
};
