import type { Tool } from './types';

/**
 * Formatter / minifier tools backed by real parsers. The libraries are
 * dynamically imported inside each transform so they are code-split and only
 * downloaded when the tool is actually used (keeping the main bundle small).
 */

export const jsBeautify: Tool = {
	slug: 'js-beautify',
	title: 'JS Beautify',
	category: 'developer',
	type: 'text',
	description: 'Format and indent messy JavaScript into clean, readable code.',
	keywords: ['javascript', 'js', 'beautify', 'format', 'pretty', 'indent'],
	featured: true,
	inputPlaceholder: 'Paste JavaScript to format…',
	reverse: 'js-minify',
	transform: async (input) => {
		const jb = (await import('js-beautify')).default;
		return jb.js(input, { indent_size: 2 });
	}
};

export const jsMinify: Tool = {
	slug: 'js-minify',
	title: 'JS Minify',
	category: 'developer',
	type: 'text',
	description: 'Compress JavaScript by removing whitespace and shortening code (Terser).',
	keywords: ['javascript', 'js', 'minify', 'compress', 'uglify', 'terser'],
	inputPlaceholder: 'Paste JavaScript to minify…',
	reverse: 'js-beautify',
	transform: async (input) => {
		const { minify } = await import('terser');
		const result = await minify(input);
		return result.code ?? '';
	}
};

export const htmlBeautify: Tool = {
	slug: 'html-beautify',
	title: 'HTML Beautify',
	category: 'developer',
	type: 'text',
	description: 'Indent and tidy up HTML markup into a readable structure.',
	keywords: ['html', 'beautify', 'format', 'pretty', 'indent'],
	inputPlaceholder: 'Paste HTML to format…',
	transform: async (input) => {
		const jb = (await import('js-beautify')).default;
		return jb.html(input, { indent_size: 2 });
	}
};

export const sqlFormatter: Tool = {
	slug: 'sql-formatter',
	title: 'SQL Formatter',
	category: 'developer',
	type: 'text',
	description: 'Format SQL queries with consistent keywords and indentation.',
	keywords: ['sql', 'format', 'beautify', 'query', 'database'],
	featured: true,
	inputPlaceholder: 'Paste a SQL query to format…',
	transform: async (input) => {
		const { format } = await import('sql-formatter');
		return format(input, { keywordCase: 'upper' });
	}
};

export const markdownToHtml: Tool = {
	slug: 'markdown-to-html',
	title: 'Markdown to HTML',
	category: 'developer',
	type: 'text',
	description: 'Convert Markdown into clean HTML markup.',
	keywords: ['markdown', 'md', 'html', 'convert', 'render'],
	inputPlaceholder: '# Hello\n\nSome **markdown** text…',
	transform: async (input) => {
		const { marked } = await import('marked');
		return marked.parse(input, { async: false }) as string;
	}
};
