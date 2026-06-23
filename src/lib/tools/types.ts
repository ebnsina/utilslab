import type { Component } from 'svelte';

/** The top-level categories, each with its own signature color. */
export type CategoryId = 'financial' | 'health' | 'math' | 'other' | 'developer';

export interface Category {
	id: CategoryId;
	name: string;
	/** Short tagline shown on the category card. */
	tagline: string;
}

/* ------------------------------------------------------------------ *
 * Input fields — a declarative schema the generic shell can render.
 * ------------------------------------------------------------------ */

export type FieldType = 'number' | 'select' | 'date';

export interface SelectOption {
	value: string;
	label: string;
}

export interface Field {
	/** Key used in the inputs record passed to `compute`. */
	name: string;
	label: string;
	type: FieldType;
	/** Initial value. Numbers for `number`, option value for `select`, ISO date for `date`. */
	default: number | string;
	/** Optional helper text shown under the field. */
	hint?: string;
	/** Unit suffix shown inside the input (e.g. "kg", "%", "yr"). */
	unit?: string;
	min?: number;
	max?: number;
	step?: number;
	/** Required for `type: 'select'`. */
	options?: SelectOption[];
}

/** Normalised input record handed to a calculator's `compute` function. */
export type Inputs = Record<string, number | string>;

/* ------------------------------------------------------------------ *
 * Results — a small set of widgets the shell knows how to render.
 * ------------------------------------------------------------------ */

export interface StatResult {
	kind: 'stat';
	label: string;
	value: string;
	/** Optional secondary line (e.g. a category label or note). */
	caption?: string;
	/** Highlight the headline figure. */
	primary?: boolean;
}

export interface TableResult {
	kind: 'table';
	label?: string;
	columns: string[];
	rows: (string | number)[][];
	/** Collapse to first/last N rows with a toggle when long. */
	previewRows?: number;
}

export interface SeriesResult {
	kind: 'series';
	label?: string;
	/** Each series is rendered as a stacked/overlaid area in the chart. */
	series: { name: string; color: string; points: number[] }[];
	/** X-axis labels (optional). */
	xLabels?: string[];
}

export type Result = StatResult | TableResult | SeriesResult;

/* ------------------------------------------------------------------ *
 * Tool definition — the single unit of the registry.
 *
 * Today every tool is a `calculator`, but the model is intentionally
 * generic: new kinds (converters, generators, encoders, …) can be added
 * later by extending `ToolType` and giving them their own renderer.
 * ------------------------------------------------------------------ */

export type ToolType = 'calculator' | 'text';

export interface Tool {
	slug: string;
	title: string;
	category: CategoryId;
	/** What kind of tool this is. Defaults to a calculator when omitted. */
	type?: ToolType;
	/** One-line description used on cards and as the meta description. */
	description: string;
	/** Search keywords / synonyms. */
	keywords?: string[];
	/** Show on the home "popular" grid. */
	featured?: boolean;

	/** Declarative input schema. Omitted when a custom component owns the UI. */
	fields?: Field[];
	/** Pure function: inputs -> result widgets. Omitted for custom calculators. */
	compute?: (inputs: Inputs) => Result[];

	/**
	 * For `type: 'text'` tools — a pure string→string transform rendered by
	 * TextTool (input on the left, live output on the right). May throw on
	 * invalid input; the error is shown to the user.
	 */
	transform?: (input: string) => string;
	/** Placeholder for the text-tool input area. */
	inputPlaceholder?: string;

	/**
	 * Escape hatch for calculators that don't fit the generic form
	 * (e.g. Scientific keypad, Fraction). When set, the shell renders
	 * this component instead of the fields/results panels.
	 */
	custom?: Component;
}
