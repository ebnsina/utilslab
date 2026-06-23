<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { fade, scale } from 'svelte/transition';
	import { searchTools } from '$lib/tools/registry';
	import { categoryTheme } from '$lib/theme';
	import CategoryIcon from './CategoryIcon.svelte';

	let open = $state(false);
	let query = $state('');
	let active = $state(0);

	const results = $derived(searchTools(query).slice(0, 8));

	export function show() {
		open = true;
		query = '';
		active = 0;
	}
	function close() {
		open = false;
	}

	function onWindowKeydown(e: KeyboardEvent) {
		if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
			e.preventDefault();
			if (open) close();
			else show();
		} else if (e.key === 'Escape') {
			close();
		}
	}

	function onInputKeydown(e: KeyboardEvent) {
		if (e.key === 'ArrowDown') {
			e.preventDefault();
			active = Math.min(active + 1, results.length - 1);
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			active = Math.max(active - 1, 0);
		} else if (e.key === 'Enter' && results[active]) {
			select(results[active].slug);
		}
	}

	function select(slug: string) {
		close();
		goto(resolve('/tools/[slug]', { slug }));
	}
</script>

<svelte:window onkeydown={onWindowKeydown} />

{#if open}
	<div
		class="fixed inset-0 z-50 flex items-start justify-center bg-black/60 px-4 pt-[12vh] backdrop-blur-sm"
		transition:fade={{ duration: 120 }}
		onclick={close}
		role="presentation"
	>
		<div
			class="w-full max-w-xl overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl"
			transition:scale={{ duration: 150, start: 0.97 }}
			onclick={(e) => e.stopPropagation()}
			role="presentation"
		>
			<!-- svelte-ignore a11y_autofocus -->
			<input
				autofocus
				bind:value={query}
				onkeydown={onInputKeydown}
				placeholder="Search calculators…"
				class="w-full border-b border-border bg-transparent px-5 py-4 text-ink outline-none placeholder:text-ink-muted"
			/>
			<ul class="max-h-80 overflow-y-auto p-2">
				{#each results as calc, i (calc.slug)}
					{@const theme = categoryTheme(calc.category)}
					<li>
						<button
							onclick={() => select(calc.slug)}
							onmouseenter={() => (active = i)}
							class="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition {i ===
							active
								? 'bg-surface-2'
								: ''}"
						>
							<span class="grid size-9 place-items-center rounded-lg {theme.soft} {theme.text}">
								<CategoryIcon category={calc.category} class="size-4" />
							</span>
							<span class="min-w-0">
								<span class="block truncate font-medium text-ink">{calc.title}</span>
								<span class="block truncate text-xs text-ink-muted">{calc.description}</span>
							</span>
						</button>
					</li>
				{:else}
					<li class="px-4 py-6 text-center text-sm text-ink-muted">No calculators found.</li>
				{/each}
			</ul>
		</div>
	</div>
{/if}
