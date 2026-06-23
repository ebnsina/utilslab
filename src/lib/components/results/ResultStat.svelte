<script lang="ts">
	import type { StatResult } from '$lib/tools/types';
	import RollingNumber from './RollingNumber.svelte';

	let { result }: { result: StatResult } = $props();
</script>

<div
	class="rounded-2xl border border-border p-4 {result.primary ? 'bg-brand/10' : 'bg-surface-2'}"
	class:border-brand={result.primary}
>
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
