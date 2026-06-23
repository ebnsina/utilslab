<script lang="ts">
	import type { Field } from '$lib/tools/types';

	let { field, value = $bindable() }: { field: Field; value: number | string } = $props();

	const id = $derived(`f-${field.name}`);
</script>

<label for={id} class="block">
	<span class="mb-1.5 block text-sm font-medium text-ink-muted">{field.label}</span>

	<div class="relative">
		{#if field.type === 'select'}
			<select
				{id}
				bind:value
				class="w-full appearance-none rounded-xl border border-line bg-surface-2 px-3.5 py-2.5 text-ink outline-none transition focus:border-brand focus:ring-2 focus:ring-brand focus:ring-offset-2 focus:ring-offset-surface"
			>
				{#each field.options ?? [] as opt (opt.value)}
					<option value={opt.value}>{opt.label}</option>
				{/each}
			</select>
			<svg
				class="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-ink-muted"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
			>
				<path d="m6 9 6 6 6-6" />
			</svg>
		{:else if field.type === 'date'}
			<input
				{id}
				type="date"
				bind:value
				class="w-full rounded-xl border border-line bg-surface-2 px-3.5 py-2.5 text-ink outline-none transition [color-scheme:dark] focus:border-brand focus:ring-2 focus:ring-brand focus:ring-offset-2 focus:ring-offset-surface"
			/>
		{:else}
			<input
				{id}
				type="number"
				bind:value
				min={field.min}
				max={field.max}
				step={field.step ?? 'any'}
				inputmode="decimal"
				class="w-full rounded-xl border border-line bg-surface-2 px-3.5 py-2.5 font-mono tabular-nums text-ink outline-none transition focus:border-brand focus:ring-2 focus:ring-brand focus:ring-offset-2 focus:ring-offset-surface"
				class:pr-12={field.unit}
			/>
			{#if field.unit}
				<span
					class="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 font-mono text-sm text-ink-muted"
				>
					{field.unit}
				</span>
			{/if}
		{/if}
	</div>

	{#if field.hint}
		<span class="mt-1 block text-xs text-ink-muted/70">{field.hint}</span>
	{/if}
</label>
