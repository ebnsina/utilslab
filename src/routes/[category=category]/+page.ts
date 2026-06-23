import { CATEGORY_ORDER } from '$lib/theme';
import type { CategoryId } from '$lib/tools/types';
import type { EntryGenerator, PageLoad } from './$types';

export const entries: EntryGenerator = () => CATEGORY_ORDER.map((category) => ({ category }));

export const load: PageLoad = ({ params }) => {
	return { category: params.category as CategoryId };
};
