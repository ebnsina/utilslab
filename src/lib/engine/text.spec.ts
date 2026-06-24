import { describe, it, expect } from 'vitest';
import {
	base64Encode,
	base64Decode,
	urlEncode,
	urlDecode,
	jsonBeautify,
	jsonMinify,
	cssMinify,
	cssBeautify,
	jwtDecode,
	hashAll
} from './text';

describe('base64', () => {
	it('round-trips UTF-8 text', () => {
		const s = 'Hello, 世界! ✨';
		expect(base64Decode(base64Encode(s))).toBe(s);
	});
	it('encodes a known value', () => {
		expect(base64Encode('hello')).toBe('aGVsbG8=');
	});
	it('throws on invalid base64', () => {
		expect(() => base64Decode('@@not base64@@')).toThrow();
	});
});

describe('url', () => {
	it('encodes and decodes', () => {
		expect(urlEncode('a b&c=d')).toBe('a%20b%26c%3Dd');
		expect(urlDecode('a%20b%26c%3Dd')).toBe('a b&c=d');
	});
	it('throws on malformed input', () => {
		expect(() => urlDecode('%E0%A4%A')).toThrow();
	});
});

describe('json', () => {
	it('beautifies with 2-space indent', () => {
		expect(jsonBeautify('{"a":1}')).toBe('{\n  "a": 1\n}');
	});
	it('minifies', () => {
		expect(jsonMinify('{ "a" : 1 , "b" : [1, 2] }')).toBe('{"a":1,"b":[1,2]}');
	});
	it('throws on invalid json', () => {
		expect(() => jsonMinify('{nope}')).toThrow();
	});
});

describe('css', () => {
	it('minifies (strips comments + whitespace)', () => {
		const css = '/* c */\n.a {\n  color: red;\n  margin: 0;\n}';
		expect(cssMinify(css)).toBe('.a{color:red;margin:0}');
	});
	it('beautifies back into a block', () => {
		const out = cssBeautify('.a{color:red;margin:0}');
		expect(out).toContain('.a {');
		expect(out).toContain('color:red;');
		expect(out.trim().endsWith('}')).toBe(true);
	});
});

describe('jwt', () => {
	it('decodes header and payload', () => {
		// {"alg":"HS256","typ":"JWT"} . {"sub":"123","name":"Jo"} . sig
		const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjMiLCJuYW1lIjoiSm8ifQ.sig';
		const out = jwtDecode(token);
		expect(out).toContain('"alg": "HS256"');
		expect(out).toContain('"name": "Jo"');
	});
	it('throws on a non-token', () => {
		expect(() => jwtDecode('not-a-jwt')).toThrow();
	});
});

describe('hash', () => {
	it('computes a known SHA-256', async () => {
		const out = await hashAll('abc');
		// SHA-256("abc")
		expect(out).toContain('ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad');
	});
});
