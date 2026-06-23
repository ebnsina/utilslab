<script lang="ts">
	import './layout.css';
	import { resolve } from '$app/paths';
	import favicon from '$lib/assets/favicon.svg';
	import SearchPalette from '$lib/components/SearchPalette.svelte';

	let { children } = $props();
	let palette = $state<ReturnType<typeof SearchPalette>>();
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
				<svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" />
				</svg>
				<span class="hidden sm:inline">Search calculators</span>
				<kbd class="hidden rounded border border-border px-1.5 font-mono text-xs sm:inline">⌘K</kbd>
			</button>
		</div>
	</header>

	<main class="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 sm:py-12">
		{@render children()}
	</main>

	<footer class="border-t border-border/60">
		<div class="mx-auto max-w-6xl px-4 py-8 text-sm text-ink-muted sm:px-6">
			<p>UtilsLab — a modern, free collection of everyday calculators.</p>
		</div>
	</footer>
</div>

<SearchPalette bind:this={palette} />
