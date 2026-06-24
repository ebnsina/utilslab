<script lang="ts">
	import {
		UNIT_CATEGORIES,
		TEMPERATURE_UNITS,
		convertUnit,
		convertTemperature,
		type UnitCategory
	} from '$lib/engine/convert';
	import { number } from '$lib/engine/format';
	import ArrowLeftRight from '@lucide/svelte/icons/arrow-left-right';

	const categories = [
		...UNIT_CATEGORIES,
		{ id: 'temperature', label: 'Temperature', units: TEMPERATURE_UNITS }
	];

	let catId = $state('length');
	let from = $state('m');
	let to = $state('ft');
	let value = $state(1);

	const cat = $derived(categories.find((c) => c.id === catId)!);

	// Reset the unit selects whenever the category changes.
	// svelte-ignore state_referenced_locally
	let lastCat = catId;
	$effect(() => {
		if (catId !== lastCat) {
			lastCat = catId;
			from = cat.units[0].id;
			to = cat.units[1]?.id ?? cat.units[0].id;
		}
	});

	const result = $derived.by(() => {
		const v = Number(value);
		if (!Number.isFinite(v)) return NaN;
		if (catId === 'temperature') return convertTemperature(v, from, to);
		return convertUnit(cat as UnitCategory, v, from, to);
	});

	function swap() {
		[from, to] = [to, from];
	}

	const selectClass =
		'w-full appearance-none rounded-xl border border-line bg-surface-2 px-3.5 py-2.5 text-ink outline-none transition focus:ring-2 focus:ring-brand focus:ring-offset-2 focus:ring-offset-surface';
</script>

<div class="mx-auto max-w-2xl rounded-card border border-border bg-surface p-5 sm:p-6">
	<!-- Category tabs -->
	<div class="mb-5 flex flex-wrap gap-2">
		{#each categories as c (c.id)}
			<button
				onclick={() => (catId = c.id)}
				class="tag rounded-badge px-3 py-1.5 text-xs transition {catId === c.id
					? 'bg-brand text-brand-ink'
					: 'bg-surface-2 text-ink-muted hover:text-ink'}"
			>
				{c.label}
			</button>
		{/each}
	</div>

	<div class="grid gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-end">
		<!-- From -->
		<div>
			<span class="mb-1.5 block text-sm text-ink-muted">From</span>
			<input
				type="number"
				bind:value
				class="mb-2 w-full rounded-xl border border-line bg-surface-2 px-3.5 py-2.5 font-mono tabular-nums text-ink outline-none transition focus:ring-2 focus:ring-brand focus:ring-offset-2 focus:ring-offset-surface"
			/>
			<select bind:value={from} class={selectClass}>
				{#each cat.units as u (u.id)}
					<option value={u.id}>{u.label}</option>
				{/each}
			</select>
		</div>

		<!-- Swap -->
		<button
			onclick={swap}
			aria-label="Swap units"
			class="mb-1 grid size-11 place-items-center justify-self-center rounded-xl bg-brand/15 text-brand transition hover:brightness-110"
		>
			<ArrowLeftRight class="size-4" />
		</button>

		<!-- To -->
		<div>
			<span class="mb-1.5 block text-sm text-ink-muted">To</span>
			<div
				class="mb-2 w-full overflow-x-auto rounded-xl border border-border bg-brand/10 px-3.5 py-2.5 font-display text-xl font-bold tabular-nums text-brand"
			>
				{Number.isFinite(result) ? number(result, 6) : '—'}
			</div>
			<select bind:value={to} class={selectClass}>
				{#each cat.units as u (u.id)}
					<option value={u.id}>{u.label}</option>
				{/each}
			</select>
		</div>
	</div>
</div>
