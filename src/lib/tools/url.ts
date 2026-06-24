import type { Tool } from './types';
import { urlEncode, urlDecode } from '$lib/engine/text';

export const urlEncodeTool: Tool = {
	slug: 'url-encode',
	title: 'URL Encode',
	category: 'developer',
	type: 'text',
	description: 'Percent-encode text for safe use in URLs.',
	keywords: ['url', 'encode', 'percent', 'uri', 'encodeURIComponent'],
	featured: true,
	transform: urlEncode,
	inputPlaceholder: 'Type or paste text to encode…',
	reverse: 'url-decode'
};

export const urlDecodeTool: Tool = {
	slug: 'url-decode',
	title: 'URL Decode',
	category: 'developer',
	type: 'text',
	description: 'Decode percent-encoded URL text.',
	keywords: ['url', 'decode', 'percent', 'uri', 'decodeURIComponent'],
	transform: urlDecode,
	inputPlaceholder: 'Paste URL-encoded text to decode…',
	reverse: 'url-encode'
};
