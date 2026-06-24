<script lang="ts">
	import { stats } from '$lib/engine/math';
	import { number } from '$lib/engine/format';
	import ResultStat from '../results/ResultStat.svelte';

	let raw = $state('2, 4, 4, 4, 5, 5, 7, 9');

	const values = $derived(
		raw
			.split(/[\s,]+/)
			.map(Number)
			.filter((n) => Number.isFinite(n))
	);
	const s = $derived(stats(values));

	const cards = $derived(
		s.count === 0
			? []
			: [
					{ label: 'Mean', value: number(s.mean, 4), primary: true },
					{ label: 'Median', value: number(s.median, 4) },
					{ label: 'Std dev (population)', value: number(s.stdevP, 4) },
					{ label: 'Std dev (sample)', value: number(s.stdevS, 4) },
					{ label: 'Min', value: number(s.min, 4) },
					{ label: 'Max', value: number(s.max, 4) },
					{ label: 'Sum', value: number(s.sum, 4) },
					{ label: 'Count', value: number(s.count, 0) }
				]
	);
</script>

<div class="grid items-start gap-6 lg:grid-cols-[minmax(0,360px)_1fr]">
	<section class="rounded-card border border-border bg-surface p-5 sm:p-6">
		<h2 class="tag mb-4 text-sm text-math">Numbers</h2>
		<textarea
			bind:value={raw}
			placeholder="Enter numbers separated by commas, spaces, or new lines…"
			class="h-48 w-full resize-y rounded-xl border border-line bg-surface-2 p-3.5 font-mono text-sm tabular-nums text-ink outline-none transition focus:ring-2 focus:ring-brand focus:ring-offset-2 focus:ring-offset-surface"
		></textarea>
		<p class="mt-2 text-xs text-ink-muted">{values.length} valid numbers</p>
	</section>

	<section class="rounded-card border border-border bg-surface p-5 sm:p-6">
		<h2 class="tag mb-4 text-sm text-math">Results</h2>
		{#if cards.length}
			<div class="grid gap-3 sm:grid-cols-2">
				{#each cards as c (c.label)}
					<ResultStat
						result={{ kind: 'stat', label: c.label, value: c.value, primary: c.primary }}
					/>
				{/each}
			</div>
		{:else}
			<p class="text-sm text-ink-muted">Enter some numbers to see the statistics.</p>
		{/if}
	</section>
</div>
