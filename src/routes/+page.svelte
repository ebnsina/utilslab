<script lang="ts">
	import { resolve } from '$app/paths';
	import { CATEGORY_ORDER, categoryTheme } from '$lib/theme';
	import { toolsByCategory, featuredTools } from '$lib/tools/registry';
	import BentoCard from '$lib/components/BentoCard.svelte';
	import CategoryIcon from '$lib/components/CategoryIcon.svelte';
	import ToolCard from '$lib/components/ToolCard.svelte';

	// Interleave featured tools round-robin by category so no single category
	// (e.g. calculators) dominates the Popular row — every type gets equal billing.
	const byCategory = CATEGORY_ORDER.map((id) => featuredTools().filter((t) => t.category === id));
	const featured: ReturnType<typeof featuredTools> = [];
	for (let i = 0; byCategory.some((arr) => arr[i]); i++) {
		for (const arr of byCategory) if (arr[i]) featured.push(arr[i]);
	}
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

<!-- Categories — every category gets equal billing -->
<section class="mb-12">
	<div class="grid auto-rows-[minmax(150px,auto)] grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
		{#each CATEGORY_ORDER as id (id)}
			{@const theme = categoryTheme(id)}
			{@const count = toolsByCategory(id).length}
			<BentoCard
				href={resolve('/[category=category]', { category: id })}
				colorClass={theme.bg}
				inkClass={theme.ink}
			>
				<CategoryIcon category={id} class="size-7 opacity-90" />
				<div class="mt-auto">
					<h2 class="text-xl font-bold">{theme.name}</h2>
					<p class="mt-2 text-sm font-medium opacity-70">{count} tools →</p>
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
