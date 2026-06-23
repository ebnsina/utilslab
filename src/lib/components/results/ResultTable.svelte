<script lang="ts">
	import type { TableResult } from '$lib/tools/types';

	let { result }: { result: TableResult } = $props();

	let expanded = $state(false);
	const limit = $derived(result.previewRows ?? result.rows.length);
	const hasMore = $derived(result.rows.length > limit);
	const visible = $derived(expanded ? result.rows : result.rows.slice(0, limit));
</script>

<div class="rounded-2xl border border-border bg-surface-2 p-4">
	{#if result.label}
		<div class="mb-3 text-sm font-medium text-ink-muted">{result.label}</div>
	{/if}
	<div class="overflow-x-auto">
		<table class="w-full text-sm">
			<thead>
				<tr class="text-left text-ink-muted">
					{#each result.columns as col (col)}
						<th class="pb-2 pr-4 font-medium">{col}</th>
					{/each}
				</tr>
			</thead>
			<tbody class="font-mono tabular-nums">
				{#each visible as row, i (i)}
					<tr class="border-t border-border/60">
						{#each row as cell, j (j)}
							<td class="py-2 pr-4 {j === 0 ? 'text-ink-muted' : 'text-ink'}">{cell}</td>
						{/each}
					</tr>
				{/each}
			</tbody>
		</table>
	</div>

	{#if hasMore}
		<button
			onclick={() => (expanded = !expanded)}
			class="mt-3 text-sm font-medium text-brand transition hover:opacity-80"
		>
			{expanded ? 'Show less' : `Show all ${result.rows.length} rows`}
		</button>
	{/if}
</div>
