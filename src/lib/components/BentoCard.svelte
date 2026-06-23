<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		href,
		colorClass,
		inkClass = 'text-ink',
		size = 'sm',
		children
	}: {
		href: string;
		/** Tailwind background utility (solid category color or a surface). */
		colorClass: string;
		/** Ink color readable on the background. */
		inkClass?: string;
		/** Grid footprint within the bento layout. */
		size?: 'sm' | 'wide' | 'tall' | 'hero';
		children: Snippet;
	} = $props();

	const span: Record<string, string> = {
		sm: '',
		wide: 'col-span-2 sm:col-span-2',
		tall: 'sm:row-span-2',
		// Full-width on phones, then a 2×2 hero tile from `sm` up.
		hero: 'col-span-2 sm:row-span-2'
	};
</script>

<!-- Callers pass an already-resolved href (via resolve()); the rule can't track that across the prop boundary. -->
<!-- eslint-disable svelte/no-navigation-without-resolve -->
<a
	{href}
	class="group relative flex flex-col overflow-hidden rounded-card p-5 transition-transform duration-200 will-change-transform hover:-translate-y-1 sm:p-6 {colorClass} {inkClass} {span[
		size
	]}"
>
	<!-- Subtle top highlight for the glossy card look -->
	<div
		class="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent"
	></div>
	<div class="relative flex h-full flex-col">
		{@render children()}
	</div>
</a>
<!-- eslint-enable svelte/no-navigation-without-resolve -->
