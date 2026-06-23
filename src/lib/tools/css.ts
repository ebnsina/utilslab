import type { Tool } from './types';
import { cssMinify, cssBeautify } from '$lib/engine/text';

export const cssMinifyTool: Tool = {
	slug: 'css-minify',
	title: 'CSS Minify',
	category: 'developer',
	type: 'text',
	description: 'Strip comments and whitespace to shrink CSS.',
	keywords: ['css', 'minify', 'compress', 'whitespace'],
	transform: cssMinify,
	inputPlaceholder: 'Paste CSS to minify…'
};

export const cssBeautifyTool: Tool = {
	slug: 'css-beautify',
	title: 'CSS Beautify',
	category: 'developer',
	type: 'text',
	description: 'Reformat minified CSS into a readable, indented block.',
	keywords: ['css', 'beautify', 'format', 'pretty', 'indent'],
	transform: cssBeautify,
	inputPlaceholder: 'Paste CSS to format…'
};
