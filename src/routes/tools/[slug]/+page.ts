import { error } from '@sveltejs/kit';
import { TOOLS, getTool } from '$lib/tools/registry';
import type { EntryGenerator, PageLoad } from './$types';

// Tell the static adapter which slugs to prerender.
export const entries: EntryGenerator = () => TOOLS.map((t) => ({ slug: t.slug }));

export const load: PageLoad = ({ params }) => {
	const tool = getTool(params.slug);
	if (!tool) error(404, 'Tool not found');

	// Only return serializable metadata for <head>; the page component
	// resolves the full Tool (with its compute fn / custom component)
	// straight from the registry by slug.
	return {
		slug: tool.slug,
		title: tool.title,
		description: tool.description,
		category: tool.category
	};
};
