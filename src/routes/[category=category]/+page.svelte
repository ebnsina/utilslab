<script lang="ts">
	import { resolve } from '$app/paths';
	import { toolsByCategory } from '$lib/tools/registry';
	import { categoryTheme } from '$lib/theme';
	import BentoCard from '$lib/components/BentoCard.svelte';
	import CategoryIcon from '$lib/components/CategoryIcon.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const theme = $derived(categoryTheme(data.category));
	const tools = $derived(toolsByCategory(data.category));
</script>

<svelte:head>
	<title>{theme.name} Calculators — UtilsLab</title>
	<meta name="description" content="{theme.name} calculators: {theme.tagline}." />
</svelte:head>

<nav class="mb-6 flex items-center gap-2 text-sm text-ink-muted">
	<a href={resolve('/')} class="transition hover:text-ink">Home</a>
	<span>/</span>
	<span class="text-ink">{theme.name}</span>
</nav>

<header class="mb-8 flex items-center gap-4">
	<span class="grid size-14 place-items-center rounded-2xl {theme.bg} {theme.ink}">
		<CategoryIcon category={data.category} class="size-7" />
	</span>
	<div>
		<h1 class="text-3xl font-bold tracking-tight sm:text-4xl">{theme.name}</h1>
		<p class="text-ink-muted">{theme.tagline}</p>
	</div>
</header>

<div class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
	{#each tools as tool (tool.slug)}
		<BentoCard
			href={resolve('/tools/[slug]', { slug: tool.slug })}
			colorClass="bg-surface"
			inkClass="text-ink"
		>
			<span class="grid size-10 place-items-center rounded-xl {theme.soft} {theme.text}">
				<CategoryIcon category={tool.category} class="size-5" />
			</span>
			<h2 class="mt-4 font-semibold leading-snug">{tool.title}</h2>
			<p class="mt-1 line-clamp-2 text-sm text-ink-muted">{tool.description}</p>
		</BentoCard>
	{/each}
</div>
