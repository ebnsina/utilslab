import type { Category, CategoryId } from './tools/types';

/** Category metadata + the Tailwind utility classes for its signature color. */
export interface CategoryTheme extends Category {
	/** Solid card background utility. */
	bg: string;
	/** Readable ink color on top of `bg`. */
	ink: string;
	/** Subtle tinted surface (for badges/section accents on the dark canvas). */
	soft: string;
	/** Text color matching the accent (for use on dark surfaces). */
	text: string;
}

export const CATEGORIES: Record<CategoryId, CategoryTheme> = {
	financial: {
		id: 'financial',
		name: 'Financial',
		tagline: 'Loans, savings, taxes & investing',
		bg: 'bg-financial',
		ink: 'text-financial-ink',
		soft: 'bg-financial/15',
		text: 'text-financial'
	},
	health: {
		id: 'health',
		name: 'Health & Fitness',
		tagline: 'Body metrics, calories & training',
		bg: 'bg-health',
		ink: 'text-health-ink',
		soft: 'bg-health/15',
		text: 'text-health'
	},
	math: {
		id: 'math',
		name: 'Math',
		tagline: 'Numbers, fractions & statistics',
		bg: 'bg-math',
		ink: 'text-math-ink',
		soft: 'bg-math/15',
		text: 'text-math'
	},
	other: {
		id: 'other',
		name: 'Everyday',
		tagline: 'Dates, time & handy utilities',
		bg: 'bg-other',
		ink: 'text-other-ink',
		soft: 'bg-other/15',
		text: 'text-other'
	}
};

export const CATEGORY_ORDER: CategoryId[] = ['financial', 'health', 'math', 'other'];

export function categoryTheme(id: CategoryId): CategoryTheme {
	return CATEGORIES[id];
}
