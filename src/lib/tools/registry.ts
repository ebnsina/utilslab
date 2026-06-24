import type { Tool, CategoryId } from './types';

// Financial
import { mortgage } from './mortgage';
import { loan } from './loan';
import { compoundInterest } from './compound-interest';
import { salesTax } from './sales-tax';
// Health & Fitness
import { bmiCalculator } from './bmi';
import { calorie } from './calorie';
import { bodyFat } from './body-fat';
import { pace } from './pace';
// Math
import { scientific } from './scientific';
import { percentage } from './percentage';
import { fraction } from './fraction';
// Everyday
import { age } from './age';
import { tip } from './tip';
// Developer
import { base64EncodeTool, base64DecodeTool } from './base64';
import { urlEncodeTool, urlDecodeTool } from './url';
import { jsonBeautifyTool, jsonMinifyTool } from './json';
import { cssMinifyTool, cssBeautifyTool } from './css';
import { hashTool } from './hash';
import { jwtTool } from './jwt';
import { uuid } from './uuid';
import { timestamp } from './timestamp';
import { color } from './color';
import { unit } from './unit';
import {
	caseConverter,
	slugifyTool,
	htmlEncodeTool,
	htmlDecodeTool,
	sortLinesTool,
	dedupeLinesTool,
	textCounter
} from './texttools';
import { lorem } from './lorem';

/** The complete catalog. Adding a calculator = import + append here. */
export const TOOLS: Tool[] = [
	mortgage,
	loan,
	compoundInterest,
	salesTax,
	bmiCalculator,
	calorie,
	bodyFat,
	pace,
	scientific,
	percentage,
	fraction,
	age,
	tip,
	base64EncodeTool,
	base64DecodeTool,
	urlEncodeTool,
	urlDecodeTool,
	jsonBeautifyTool,
	jsonMinifyTool,
	cssMinifyTool,
	cssBeautifyTool,
	hashTool,
	jwtTool,
	uuid,
	timestamp,
	color,
	unit,
	caseConverter,
	slugifyTool,
	htmlEncodeTool,
	htmlDecodeTool,
	sortLinesTool,
	dedupeLinesTool,
	textCounter,
	lorem
];

const BY_SLUG = new Map(TOOLS.map((c) => [c.slug, c]));

export function getTool(slug: string): Tool | undefined {
	return BY_SLUG.get(slug);
}

export function toolsByCategory(category: CategoryId): Tool[] {
	return TOOLS.filter((c) => c.category === category);
}

export function featuredTools(): Tool[] {
	return TOOLS.filter((c) => c.featured);
}

/** Lightweight client-side search across title, description, and keywords. */
export function searchTools(query: string): Tool[] {
	const q = query.trim().toLowerCase();
	if (!q) return TOOLS;
	return TOOLS.filter((c) => {
		const haystack = [c.title, c.description, ...(c.keywords ?? [])].join(' ').toLowerCase();
		return haystack.includes(q);
	});
}
