<script lang="ts">
	import { resolve } from '$app/paths';
	import { CATEGORY_ORDER, categoryTheme } from '$lib/theme';
	import { toolsByCategory, featuredTools } from '$lib/tools/registry';
	import BentoCard from '$lib/components/BentoCard.svelte';
	import CategoryIcon from '$lib/components/CategoryIcon.svelte';
	import ToolCard from '$lib/components/ToolCard.svelte';

	const featured = featuredTools();
	// First category gets the hero footprint, the rest are standard tiles.
	const sizes = ['hero', 'sm', 'wide', 'sm', 'wide'] as const;
</script>

<svelte:head>
	<title>UtilsLab — Modern Tools for Everyday Life</title>
	<meta
		name="description"
		content="A beautiful, free collection of financial, health, math, and everyday tools."
	/>
</svelte:head>

<section class="mb-10">
	<h1 class="max-w-2xl text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl">
		Every tool,<br /><span class="text-brand">beautifully simple.</span>
	</h1>
	<p class="mt-4 max-w-xl text-lg text-ink-muted">
		Fast, free, and ad-light tools for money, health, math, and daily life. Press
		<kbd class="rounded border border-border px-1.5 font-mono text-sm">⌘K</kbd> to search.
	</p>
</section>

<!-- Category bento -->
<section class="mb-12">
	<div
		class="grid auto-rows-[minmax(140px,auto)] grid-flow-row-dense grid-cols-2 gap-4 sm:grid-cols-3"
	>
		{#each CATEGORY_ORDER as id, i (id)}
			{@const theme = categoryTheme(id)}
			{@const count = toolsByCategory(id).length}
			<BentoCard
				href={resolve('/[category=category]', { category: id })}
				colorClass={theme.bg}
				inkClass={theme.ink}
				size={sizes[i]}
			>
				<CategoryIcon category={id} class="size-7 opacity-90" />
				<div class="mt-auto">
					<h2 class="text-2xl font-bold">{theme.name}</h2>
					<p class="mt-1 max-w-xs text-sm opacity-80">{theme.tagline}</p>
					<p class="mt-3 text-sm font-medium opacity-70">{count} tools →</p>
				</div>
			</BentoCard>
		{/each}
	</div>
</section>

<!-- Popular -->
<section>
	<h2 class="tag mb-4 text-sm text-ink-muted">Popular</h2>
	<div class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
		{#each featured as calc (calc.slug)}
			<ToolCard tool={calc} />
		{/each}
	</div>
</section>
