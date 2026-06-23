<script lang="ts">
	import './layout.css';
	import { resolve } from '$app/paths';
	import Search from '@lucide/svelte/icons/search';
	import favicon from '$lib/assets/favicon.svg';
	import SearchPalette from '$lib/components/SearchPalette.svelte';
	import { CATEGORY_ORDER, categoryTheme } from '$lib/theme';

	let { children } = $props();
	let palette = $state<ReturnType<typeof SearchPalette>>();

	const year = 2026;
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<div class="flex min-h-dvh flex-col">
	<header class="sticky top-0 z-30 border-b border-border/60 bg-canvas/80 backdrop-blur">
		<div class="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6">
			<a href={resolve('/')} class="flex items-center gap-2">
				<span
					class="grid size-8 place-items-center rounded-lg bg-brand font-display text-lg font-extrabold text-brand-ink"
					>U</span
				>
				<span class="font-display text-lg font-bold tracking-tight">UtilsLab</span>
			</a>

			<button
				onclick={() => palette?.show()}
				class="flex items-center gap-2 rounded-xl border border-border bg-surface px-3 py-2 text-sm text-ink-muted transition hover:border-brand/50"
			>
				<Search class="size-4" />
				<span class="hidden sm:inline">Search tools</span>
				<kbd class="hidden rounded border border-border px-1.5 font-mono text-xs sm:inline">⌘K</kbd>
			</button>
		</div>
	</header>

	<main class="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 sm:py-12">
		{@render children()}
	</main>

	<footer class="mt-8 border-t border-border/60">
		<div
			class="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-end sm:justify-between sm:px-6"
		>
			<div>
				<a href={resolve('/')} class="flex items-center gap-2">
					<span
						class="grid size-7 place-items-center rounded-lg bg-brand font-display text-base font-extrabold text-brand-ink"
						>U</span
					>
					<span class="font-display text-base font-bold tracking-tight">UtilsLab</span>
				</a>
				<p class="mt-3 max-w-xs text-sm text-ink-muted">
					Handy tools for the curious. No sign-ups, no clutter — just quick answers. ✨
				</p>
			</div>

			<nav class="flex flex-wrap gap-2">
				{#each CATEGORY_ORDER as id (id)}
					{@const theme = categoryTheme(id)}
					<a
						href={resolve('/[category=category]', { category: id })}
						class="rounded-full px-3 py-1.5 text-sm font-medium transition hover:-translate-y-0.5 {theme.soft} {theme.text}"
					>
						{theme.name}
					</a>
				{/each}
			</nav>
		</div>
		<div class="mx-auto max-w-6xl px-4 pb-8 text-xs text-ink-muted/70 sm:px-6">
			© {year} UtilsLab
		</div>
	</footer>
</div>

<SearchPalette bind:this={palette} />
