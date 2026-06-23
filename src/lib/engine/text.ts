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
