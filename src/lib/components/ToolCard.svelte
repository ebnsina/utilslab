<script lang="ts">
	import { resolve } from '$app/paths';
	import type { Tool } from '$lib/tools/types';
	import { categoryTheme } from '$lib/theme';
	import BentoCard from './BentoCard.svelte';
	import ToolIcon from './ToolIcon.svelte';

	let {
		tool,
		size = 'sm',
		showDescription = false
	}: { tool: Tool; size?: 'sm' | 'wide' | 'tall' | 'hero'; showDescription?: boolean } = $props();

	const theme = $derived(categoryTheme(tool.category));
</script>

<BentoCard
	href={resolve('/tools/[slug]', { slug: tool.slug })}
	colorClass={theme.bg}
	inkClass={theme.ink}
	{size}
>
	<!-- Oversized watermark glyph, cropped by the card's overflow -->
	<ToolIcon
		slug={tool.slug}
		category={tool.category}
		class="pointer-events-none absolute -right-4 -top-5 size-28 opacity-15 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110"
	/>

	<!-- Foreground icon chip -->
	<span
		class="grid size-10 place-items-center rounded-xl bg-black/10 transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110"
	>
		<ToolIcon slug={tool.slug} category={tool.category} class="size-5" />
	</span>

	<div class="mt-auto pt-6">
		<div class="flex items-end justify-between gap-2">
			<h3 class="font-semibold leading-snug">{tool.title}</h3>
			<span
				class="shrink-0 translate-x-0 text-lg opacity-50 transition-all group-hover:translate-x-1 group-hover:opacity-100"
				aria-hidden="true">→</span
			>
		</div>
		{#if showDescription}
			<p class="mt-1 line-clamp-2 text-sm opacity-75">{tool.description}</p>
		{/if}
	</div>
</BentoCard>
