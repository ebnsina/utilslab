<script lang="ts">
	import type { Tool } from '$lib/tools/types';
	import { categoryTheme } from '$lib/theme';
	import Copy from '@lucide/svelte/icons/copy';
	import Check from '@lucide/svelte/icons/check';

	let { tool }: { tool: Tool } = $props();

	const theme = $derived(categoryTheme(tool.category));

	let input = $state('');
	let copied = $state(false);

	// Live transform. Errors (invalid JSON/Base64/etc.) are caught and surfaced
	// instead of breaking the page.
	const result = $derived.by(() => {
		if (!input.trim()) return { output: '', error: '' };
		try {
			return { output: tool.transform!(input), error: '' };
		} catch (e) {
			return { output: '', error: e instanceof Error ? e.message : 'Could not process input' };
		}
	});

	async function copy() {
		if (!result.output) return;
		await navigator.clipboard.writeText(result.output);
		copied = true;
		setTimeout(() => (copied = false), 1500);
	}

	const fieldClass =
		'h-72 w-full resize-y rounded-xl border border-line bg-surface-2 p-3.5 font-mono text-sm text-ink outline-none transition focus:ring-2 focus:ring-brand focus:ring-offset-2 focus:ring-offset-surface';
</script>

<div class="grid items-start gap-6 lg:grid-cols-2">
	<!-- Input -->
	<section class="rounded-card border border-border bg-surface p-5 sm:p-6">
		<div class="mb-4 flex items-center justify-between">
			<h2 class="tag text-sm {theme.text}">Input</h2>
			{#if input}
				<button
					onclick={() => (input = '')}
					class="text-xs text-ink-muted transition hover:text-ink">Clear</button
				>
			{/if}
		</div>
		<textarea
			bind:value={input}
			placeholder={tool.inputPlaceholder ?? 'Type or paste here…'}
			class={fieldClass}></textarea>
	</section>

	<!-- Output -->
	<section class="rounded-card border border-border bg-surface p-5 sm:p-6">
		<div class="mb-4 flex items-center justify-between">
			<h2 class="tag text-sm {theme.text}">Output</h2>
			<button
				onclick={copy}
				disabled={!result.output}
				class="flex items-center gap-1.5 rounded-badge px-2.5 py-1 text-xs font-medium transition disabled:opacity-40 {theme.soft} {theme.text}"
			>
				{#if copied}
					<Check class="size-3.5" /> Copied
				{:else}
					<Copy class="size-3.5" /> Copy
				{/if}
			</button>
		</div>

		{#if result.error}
			<div
				class="flex h-72 items-center justify-center rounded-xl border border-financial/40 bg-financial/10 p-3.5 text-center text-sm text-financial"
			>
				{result.error}
			</div>
		{:else}
			<textarea
				readonly
				value={result.output}
				placeholder="Result appears here…"
				class="{fieldClass} placeholder:text-ink-muted/50"></textarea>
		{/if}
	</section>
</div>
