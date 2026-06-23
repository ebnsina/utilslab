import type { Tool } from './types';
import { jsonBeautify, jsonMinify } from '$lib/engine/text';

export const jsonBeautifyTool: Tool = {
	slug: 'json-beautify',
	title: 'JSON Beautify',
	category: 'developer',
	type: 'text',
	description: 'Pretty-print JSON with clean 2-space indentation.',
	keywords: ['json', 'beautify', 'format', 'pretty', 'indent'],
	featured: true,
	transform: jsonBeautify,
	inputPlaceholder: 'Paste JSON to format…'
};

export const jsonMinifyTool: Tool = {
	slug: 'json-minify',
	title: 'JSON Minify',
	category: 'developer',
	type: 'text',
	description: 'Collapse JSON into a single compact line.',
	keywords: ['json', 'minify', 'compact', 'compress'],
	transform: jsonMinify,
	inputPlaceholder: 'Paste JSON to minify…'
};
