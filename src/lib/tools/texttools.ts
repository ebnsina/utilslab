import type { Tool } from './types';
import {
	toCases,
	slugify,
	htmlEncode,
	htmlDecode,
	sortLines,
	dedupeLines,
	textStats
} from '$lib/engine/text';

export const caseConverter: Tool = {
	slug: 'case-converter',
	title: 'Case Converter',
	category: 'developer',
	type: 'text',
	description: 'Convert text to camelCase, snake_case, kebab-case, Title Case, and more at once.',
	keywords: ['case', 'camel', 'snake', 'kebab', 'title', 'uppercase'],
	featured: true,
	transform: toCases,
	inputPlaceholder: 'Type or paste text…'
};

export const slugifyTool: Tool = {
	slug: 'slugify',
	title: 'Slugify',
	category: 'developer',
	type: 'text',
	description: 'Turn any text into a clean, URL-friendly slug.',
	keywords: ['slug', 'url', 'permalink', 'seo'],
	transform: slugify,
	inputPlaceholder: 'My Great Article Title'
};

export const htmlEncodeTool: Tool = {
	slug: 'html-encode',
	title: 'HTML Encode',
	category: 'developer',
	type: 'text',
	description: 'Escape special characters into HTML entities.',
	keywords: ['html', 'encode', 'entities', 'escape'],
	transform: htmlEncode,
	inputPlaceholder: 'Paste HTML/text to escape…'
};

export const htmlDecodeTool: Tool = {
	slug: 'html-decode',
	title: 'HTML Decode',
	category: 'developer',
	type: 'text',
	description: 'Convert HTML entities back into readable characters.',
	keywords: ['html', 'decode', 'entities', 'unescape'],
	transform: htmlDecode,
	inputPlaceholder: 'Paste text with &amp; entities…'
};

export const sortLinesTool: Tool = {
	slug: 'sort-lines',
	title: 'Sort Lines',
	category: 'developer',
	type: 'text',
	description: 'Sort lines of text alphabetically.',
	keywords: ['sort', 'lines', 'alphabetical', 'order'],
	transform: sortLines,
	inputPlaceholder: 'One item per line…'
};

export const dedupeLinesTool: Tool = {
	slug: 'dedupe-lines',
	title: 'Remove Duplicate Lines',
	category: 'developer',
	type: 'text',
	description: 'Strip duplicate lines, keeping the first occurrence.',
	keywords: ['duplicate', 'dedupe', 'unique', 'lines'],
	transform: dedupeLines,
	inputPlaceholder: 'One item per line…'
};

export const textCounter: Tool = {
	slug: 'text-counter',
	title: 'Word & Character Counter',
	category: 'developer',
	type: 'text',
	description: 'Count characters, words, lines, and sentences in your text.',
	keywords: ['count', 'words', 'characters', 'letters', 'lines'],
	transform: textStats,
	inputPlaceholder: 'Type or paste text to analyze…'
};
