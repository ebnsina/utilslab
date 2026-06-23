<script lang="ts">
	import { resolve } from '$app/paths';
	import { getTool } from '$lib/tools/registry';
	import { categoryTheme } from '$lib/theme';
	import ToolShell from '$lib/components/ToolShell.svelte';
	import CategoryIcon from '$lib/components/CategoryIcon.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	// Full definition (incl. compute / custom component) comes from the registry.
	const tool = $derived(getTool(data.slug)!);
	const theme = $derived(categoryTheme(data.category));
	const Custom = $derived(tool.custom);
</script>

<svelte:head>
	<title>{data.title} — UtilsLab</title>
	<meta name="description" content={data.description} />
</svelte:head>

<!-- Breadcrumb + heading -->
<nav class="mb-6 flex items-center gap-2 text-sm text-ink-muted">
	<a href={resolve('/')} class="transition hover:text-ink">Home</a>
	<span>/</span>
	<a
		href={resolve('/[category=category]', { category: data.category })}
		class="transition hover:text-ink">{theme.name}</a
	>
</nav>

<header class="mb-8 flex items-start gap-4">
	<span class="grid size-12 shrink-0 place-items-center rounded-2xl {theme.soft} {theme.text}">
		<CategoryIcon category={data.category} class="size-6" />
	</span>
	<div>
		<h1 class="text-3xl font-bold tracking-tight sm:text-4xl">{tool.title}</h1>
		<p class="mt-1 max-w-2xl text-ink-muted">{tool.description}</p>
	</div>
</header>

{#key data.slug}
	{#if Custom}
		<Custom />
	{:else}
		<ToolShell def={tool} />
	{/if}
{/key}
