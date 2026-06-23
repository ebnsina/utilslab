<script lang="ts">
	import type { CategoryId } from '$lib/tools/types';

	let { category, class: klass = 'size-6' }: { category: CategoryId; class?: string } = $props();

	// Inline SVG paths — no icon dependency.
	const paths: Record<CategoryId, string> = {
		financial: 'M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6',
		health:
			'M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z',
		math: 'M4 4h16M4 4l4 4-4 4m6 8h10M4 16h4m-4 4 4-4',
		other: 'M12 6v6l4 2M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Z'
	};
</script>

<svg
	class={klass}
	viewBox="0 0 24 24"
	fill="none"
	stroke="currentColor"
	stroke-width="2"
	stroke-linecap="round"
	stroke-linejoin="round"
	aria-hidden="true"
>
	<path d={paths[category]} />
</svg>
