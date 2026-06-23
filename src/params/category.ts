import type { ParamMatcher } from '@sveltejs/kit';
import { CATEGORY_ORDER } from '$lib/theme';

/** Restrict the `/[category]` route to the known category ids. */
export const match: ParamMatcher = (param): param is (typeof CATEGORY_ORDER)[number] => {
	return (CATEGORY_ORDER as string[]).includes(param);
};
