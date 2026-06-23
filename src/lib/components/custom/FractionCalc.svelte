<script lang="ts">
	import { fractionOp, type FractionOp } from '$lib/engine/math';

	let a = $state({ n: 1, d: 2 });
	let b = $state({ n: 1, d: 3 });
	let op = $state<FractionOp>('add');

	const ops: { value: FractionOp; symbol: string }[] = [
		{ value: 'add', symbol: '+' },
		{ value: 'subtract', symbol: '−' },
		{ value: 'multiply', symbol: '×' },
		{ value: 'divide', symbol: '÷' }
	];

	const result = $derived(
		fractionOp({ numerator: a.n, denominator: a.d }, op, { numerator: b.n, denominator: b.d })
	);
	const decimal = $derived(result.denominator ? result.numerator / result.denominator : NaN);

	const inputClass =
		'w-16 rounded-lg border border-line bg-surface-2 px-2 py-1.5 text-center font-mono text-ink outline-none transition focus:border-brand focus:ring-2 focus:ring-brand focus:ring-offset-2 focus:ring-offset-surface';
</script>

{#snippet fraction(f: { n: number; d: number })}
	<div class="flex flex-col items-center gap-1">
		<input type="number" bind:value={f.n} aria-label="Numerator" class={inputClass} />
		<div class="h-px w-16 bg-ink-muted"></div>
		<input type="number" bind:value={f.d} aria-label="Denominator" class={inputClass} />
	</div>
{/snippet}

<div class="mx-auto max-w-xl rounded-card border border-border bg-surface p-6 sm:p-8">
	<div class="flex flex-wrap items-center justify-center gap-4">
		{@render fraction(a)}

		<select
			bind:value={op}
			aria-label="Operation"
			class="rounded-lg border border-line bg-surface-2 px-3 py-2 text-xl text-brand outline-none transition focus:border-brand focus:ring-2 focus:ring-brand focus:ring-offset-2 focus:ring-offset-surface"
		>
			{#each ops as o (o.value)}
				<option value={o.value}>{o.symbol}</option>
			{/each}
		</select>

		{@render fraction(b)}

		<span class="text-2xl text-ink-muted">=</span>

		<!-- Result fraction -->
		<div class="flex flex-col items-center gap-1 font-mono text-2xl font-bold text-brand">
			{#if Number.isFinite(decimal)}
				<span>{result.numerator}</span>
				{#if result.denominator !== 1}
					<div class="h-px w-12 bg-brand"></div>
					<span>{result.denominator}</span>
				{/if}
			{:else}
				<span class="text-xl text-ink-muted">—</span>
			{/if}
		</div>
	</div>

	{#if Number.isFinite(decimal)}
		<div class="mt-6 text-center text-sm text-ink-muted">
			Decimal: <span class="font-mono text-ink">{decimal.toFixed(6).replace(/\.?0+$/, '')}</span>
		</div>
	{/if}
</div>
