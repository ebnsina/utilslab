<script lang="ts">
	import type { StatResult } from '$lib/tools/types';
	import RollingNumber from './RollingNumber.svelte';
	import Copy from '@lucide/svelte/icons/copy';
	import Check from '@lucide/svelte/icons/check';

	let { result }: { result: StatResult } = $props();

	let copied = $state(false);
	async function copy() {
		await navigator.clipboard.writeText(result.value);
		copied = true;
		setTimeout(() => (copied = false), 1500);
	}
</script>

<div
	class="group relative rounded-2xl border border-border p-4 {result.primary
		? 'bg-brand/10'
		: 'bg-surface-2'}"
	class:border-brand={result.primary}
>
	<button
		onclick={copy}
		aria-label="Copy value"
		class="absolute right-3 top-3 grid size-7 place-items-center rounded-lg text-ink-muted opacity-0 transition hover:bg-ink/10 hover:text-ink focus:opacity-100 group-hover:opacity-100"
	>
		{#if copied}<Check class="size-4 text-brand" />{:else}<Copy class="size-4" />{/if}
	</button>

	<div class="text-sm text-ink-muted">{result.label}</div>
	<div
		class="mt-1 font-display font-bold tracking-tight {result.primary
			? 'text-3xl text-brand'
			: 'text-2xl text-ink'}"
	>
		<RollingNumber value={result.value} />
	</div>
	{#if result.caption}
		<div class="mt-0.5 text-sm text-ink-muted">{result.caption}</div>
	{/if}
</div>
