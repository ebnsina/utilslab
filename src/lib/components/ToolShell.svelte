<script lang="ts">
	import type { Tool, Inputs, Result } from '$lib/tools/types';
	import { categoryTheme } from '$lib/theme';
	import Field from './ui/Field.svelte';
	import ResultStat from './results/ResultStat.svelte';
	import ResultTable from './results/ResultTable.svelte';
	import ResultChart from './results/ResultChart.svelte';

	let { def }: { def: Tool } = $props();

	const theme = $derived(categoryTheme(def.category));

	// Seed reactive input state from the field defaults. The page remounts this
	// component per tool (via {#key}), so reading `def` once at init is correct.
	// svelte-ignore state_referenced_locally
	const initial: Inputs = Object.fromEntries((def.fields ?? []).map((f) => [f.name, f.default]));
	let inputs = $state<Inputs>(initial);

	// Live recompute — re-runs whenever any input changes.
	const results = $derived<Result[]>(def.compute ? def.compute(inputs) : []);

	const stats = $derived(results.filter((r) => r.kind === 'stat'));
	const blocks = $derived(results.filter((r) => r.kind !== 'stat'));
</script>

<div class="grid items-start gap-6 lg:grid-cols-[minmax(0,360px)_1fr]">
	<!-- Inputs -->
	<section class="rounded-card border border-border bg-surface p-5 sm:p-6">
		<h2 class="tag mb-4 text-sm {theme.text}">Inputs</h2>
		<div class="space-y-4">
			{#each def.fields ?? [] as field (field.name)}
				<Field {field} bind:value={inputs[field.name]} />
			{/each}
		</div>
	</section>

	<!-- Results -->
	<section class="rounded-card border border-border bg-surface p-5 sm:p-6">
		<h2 class="tag mb-4 text-sm {theme.text}">Results</h2>

		<div class="grid gap-3 sm:grid-cols-2">
			{#each stats as result, i (i)}
				<ResultStat {result} />
			{/each}
		</div>

		{#if blocks.length}
			<div class="mt-3 space-y-3">
				{#each blocks as result, i (i)}
					{#if result.kind === 'table'}
						<ResultTable {result} />
					{:else if result.kind === 'series'}
						<ResultChart {result} />
					{/if}
				{/each}
			</div>
		{/if}
	</section>
</div>
