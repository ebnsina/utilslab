<script lang="ts">
	import RefreshCw from '@lucide/svelte/icons/refresh-cw';
	import Copy from '@lucide/svelte/icons/copy';
	import Check from '@lucide/svelte/icons/check';

	let count = $state(5);
	let ids = $state<string[]>([]);
	let copiedAll = $state(false);

	function generate() {
		ids = Array.from({ length: Math.min(Math.max(count, 1), 100) }, () => crypto.randomUUID());
	}

	// Seed an initial batch. Varying nothing here is fine — values are random.
	$effect(() => {
		if (ids.length === 0) generate();
	});

	async function copyAll() {
		await navigator.clipboard.writeText(ids.join('\n'));
		copiedAll = true;
		setTimeout(() => (copiedAll = false), 1500);
	}
</script>

<div class="mx-auto max-w-2xl rounded-card border border-border bg-surface p-5 sm:p-6">
	<div class="mb-4 flex flex-wrap items-center gap-3">
		<label class="flex items-center gap-2 text-sm text-ink-muted">
			How many
			<input
				type="number"
				min="1"
				max="100"
				bind:value={count}
				class="w-20 rounded-xl border border-line bg-surface-2 px-3 py-2 text-center font-mono tabular-nums text-ink outline-none transition focus:ring-2 focus:ring-brand focus:ring-offset-2 focus:ring-offset-surface"
			/>
		</label>
		<button
			onclick={generate}
			class="flex items-center gap-2 rounded-xl bg-brand px-4 py-2 text-sm font-semibold text-brand-ink transition hover:brightness-110"
		>
			<RefreshCw class="size-4" /> Generate
		</button>
		<button
			onclick={copyAll}
			class="ml-auto flex items-center gap-1.5 rounded-badge bg-developer/15 px-3 py-2 text-xs font-medium text-developer transition hover:brightness-110"
		>
			{#if copiedAll}<Check class="size-3.5" /> Copied{:else}<Copy class="size-3.5" /> Copy all{/if}
		</button>
	</div>

	<ul class="space-y-2">
		{#each ids as id (id)}
			<li
				class="rounded-xl border border-border bg-surface-2 px-3.5 py-2.5 font-mono text-sm tabular-nums text-ink"
			>
				{id}
			</li>
		{/each}
	</ul>
</div>
