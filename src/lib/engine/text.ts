/**
 * Text / code transforms for the developer tools. Pure functions that take a
 * string and return a string; they may THROW on invalid input (the UI catches
 * the error and shows it). Native APIs only — no dependencies.
 */

/* ----------------------------- Base64 ----------------------------- */

/** UTF-8 safe Base64 encode. */
export function base64Encode(input: string): string {
	const bytes = new TextEncoder().encode(input);
	let binary = '';
	for (const byte of bytes) binary += String.fromCharCode(byte);
	return btoa(binary);
}

/** UTF-8 safe Base64 decode. Throws if the input isn't valid Base64. */
export function base64Decode(input: string): string {
	const binary = atob(input.trim());
	const bytes = Uint8Array.from(binary, (ch) => ch.charCodeAt(0));
	return new TextDecoder().decode(bytes);
}

/* ------------------------------- URL ------------------------------ */

export function urlEncode(input: string): string {
	return encodeURIComponent(input);
}

/** Throws on malformed percent-encoding. */
export function urlDecode(input: string): string {
	return decodeURIComponent(input);
}

/* ------------------------------ JSON ------------------------------ */

/** Pretty-print JSON with 2-space indentation. Throws on invalid JSON. */
export function jsonBeautify(input: string): string {
	return JSON.stringify(JSON.parse(input), null, 2);
}

/** Collapse JSON to a single line. Throws on invalid JSON. */
export function jsonMinify(input: string): string {
	return JSON.stringify(JSON.parse(input));
}

/* ------------------------------- CSS ------------------------------ */

/**
 * Lightweight CSS minifier: strips comments and collapses whitespace.
 * Good for typical stylesheets; not a full parser (whitespace inside
 * string/url() values is also collapsed).
 */
export function cssMinify(input: string): string {
	return input
		.replace(/\/\*[\s\S]*?\*\//g, '') // comments
		.replace(/\s+/g, ' ') // collapse whitespace
		.replace(/\s*([{}:;,>~+])\s*/g, '$1') // trim around punctuation
		.replace(/;}/g, '}') // drop trailing semicolons
		.trim();
}

/* ---------------------------- Text utils -------------------------- */

/** Lowercase, hyphenated, URL-safe slug. */
export function slugify(input: string): string {
	return input
		.normalize('NFKD')
		.replace(/[̀-ͯ]/g, '') // strip accents
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '');
}

const HTML_ENTITIES: Record<string, string> = {
	'&': '&amp;',
	'<': '&lt;',
	'>': '&gt;',
	'"': '&quot;',
	"'": '&#39;'
};

export function htmlEncode(input: string): string {
	return input.replace(/[&<>"']/g, (ch) => HTML_ENTITIES[ch]);
}

const HTML_NAMED: Record<string, string> = {
	amp: '&',
	lt: '<',
	gt: '>',
	quot: '"',
	apos: "'",
	nbsp: ' ',
	copy: '©',
	reg: '®'
};

export function htmlDecode(input: string): string {
	return input.replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (m, body) => {
		if (body[0] === '#') {
			const code =
				body[1] === 'x' || body[1] === 'X'
					? parseInt(body.slice(2), 16)
					: parseInt(body.slice(1), 10);
			return Number.isFinite(code) ? String.fromCodePoint(code) : m;
		}
		return HTML_NAMED[body.toLowerCase()] ?? m;
	});
}

/** Sort lines alphabetically (case-insensitive). */
export function sortLines(input: string): string {
	return input
		.split('\n')
		.sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }))
		.join('\n');
}

/** Remove duplicate lines, preserving first occurrence order. */
export function dedupeLines(input: string): string {
	const seen = new Set<string>();
	return input
		.split('\n')
		.filter((line) => (seen.has(line) ? false : (seen.add(line), true)))
		.join('\n');
}

/** Character / word / line statistics, one labelled line each. */
export function textStats(input: string): string {
	const chars = input.length;
	const charsNoSpaces = input.replace(/\s/g, '').length;
	const words = (input.trim().match(/\S+/g) ?? []).length;
	const lines = input === '' ? 0 : input.split('\n').length;
	const sentences = (input.match(/[.!?]+(\s|$)/g) ?? []).length;
	return [
		`Characters        ${chars}`,
		`Characters (no spaces)  ${charsNoSpaces}`,
		`Words             ${words}`,
		`Lines             ${lines}`,
		`Sentences         ${sentences}`
	].join('\n');
}

/** Split a string into its constituent words for case conversion. */
function words(input: string): string[] {
	return (
		input
			.replace(/([a-z])([A-Z])/g, '$1 $2') // camelCase boundaries
			.replace(/[_\-/.]+/g, ' ')
			.match(/[A-Za-z0-9]+/g) ?? []
	).map((w) => w.toLowerCase());
}

/** Convert text to every common programming/writing case, labelled. */
export function toCases(input: string): string {
	const w = words(input);
	if (w.length === 0) return '';
	const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
	const variants: [string, string][] = [
		['UPPERCASE', input.toUpperCase()],
		['lowercase', input.toLowerCase()],
		['Title Case', w.map(cap).join(' ')],
		['Sentence case', cap(w.join(' '))],
		['camelCase', w[0] + w.slice(1).map(cap).join('')],
		['PascalCase', w.map(cap).join('')],
		['snake_case', w.join('_')],
		['kebab-case', w.join('-')],
		['CONSTANT_CASE', w.join('_').toUpperCase()]
	];
	const width = Math.max(...variants.map(([l]) => l.length));
	return variants.map(([label, value]) => `${label.padEnd(width)}   ${value}`).join('\n');
}

/* ------------------------------- JWT ------------------------------ */

/** Decode a base64url segment to a UTF-8 string. */
function base64UrlToText(segment: string): string {
	let b64 = segment.replace(/-/g, '+').replace(/_/g, '/');
	while (b64.length % 4) b64 += '=';
	const binary = atob(b64);
	return new TextDecoder().decode(Uint8Array.from(binary, (ch) => ch.charCodeAt(0)));
}

/**
 * Decode a JWT's header and payload (does NOT verify the signature).
 * Returns pretty-printed JSON. Throws if the token is malformed.
 */
export function jwtDecode(input: string): string {
	const parts = input.trim().split('.');
	if (parts.length < 2) {
		throw new Error('Not a valid JWT — expected header.payload.signature');
	}
	const header = JSON.parse(base64UrlToText(parts[0]));
	const payload = JSON.parse(base64UrlToText(parts[1]));
	return JSON.stringify({ header, payload }, null, 2);
}

/* ------------------------------ Hashes ---------------------------- */

const HASH_ALGORITHMS = ['SHA-1', 'SHA-256', 'SHA-384', 'SHA-512'] as const;

async function sha(algorithm: string, input: string): Promise<string> {
	const data = new TextEncoder().encode(input);
	const digest = await crypto.subtle.digest(algorithm, data);
	return Array.from(new Uint8Array(digest))
		.map((b) => b.toString(16).padStart(2, '0'))
		.join('');
}

/** Compute all supported SHA hashes, one labelled line each. */
export async function hashAll(input: string): Promise<string> {
	const lines = await Promise.all(
		HASH_ALGORITHMS.map(async (algo) => `${algo.padEnd(8)}  ${await sha(algo, input)}`)
	);
	return lines.join('\n');
}

/** Re-expand minified CSS into an indented, readable block. */
export function cssBeautify(input: string): string {
	const min = cssMinify(input);
	let out = '';
	let depth = 0;
	const pad = () => '  '.repeat(depth);

	for (const ch of min) {
		if (ch === '{') {
			out += ' {\n';
			depth++;
			out += pad();
		} else if (ch === '}') {
			depth = Math.max(0, depth - 1);
			out = out.replace(/[ \t]+$/, '');
			out += `\n${pad()}}\n${pad()}`;
		} else if (ch === ';') {
			out += `;\n${pad()}`;
		} else {
			out += ch;
		}
	}
	return out.replace(/\n\s*\n/g, '\n').trim();
}
