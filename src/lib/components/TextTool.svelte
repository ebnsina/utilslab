<script lang="ts">
	import type { Tool } from '$lib/tools/types';
	import { categoryTheme } from '$lib/theme';
	import Copy from '@lucide/svelte/icons/copy';
	import Check from '@lucide/svelte/icons/check';

	let { tool }: { tool: Tool } = $props();

	const theme = $derived(categoryTheme(tool.category));

	let input = $state('');
	let output = $state('');
	let error = $state('');
	let copied = $state(false);

	const msg = (e: unknown) => (e instanceof Error ? e.message : 'Could not process input');

	// Live transform — supports sync and async (e.g. hashing) transforms.
	// Errors (invalid JSON/Base64/etc.) are caught and surfaced.
	$effect(() => {
		const value = input;
		if (!value.trim()) {
			output = '';
			error = '';
			return;
		}
		let cancelled = false;
		try {
			const r = tool.transform!(value);
			if (r instanceof Promise) {
				r.then((o) => !cancelled && ((output = o), (error = ''))).catch(
					(e) => !cancelled && ((output = ''), (error = msg(e)))
				);
			} else {
				output = r;
				error = '';
			}
		} catch (e) {
			output = '';
			error = msg(e);
		}
		return () => {
			cancelled = true;
		};
	});

	const result = $derived({ output, error });

	// Help avoid "is it broken?" confusion when a transform is a no-op
	// (e.g. decoding text that wasn't encoded in the first place).
	const unchanged = $derived(!error && output !== '' && output === input);

	async function copy() {
		if (!output) return;
		await navigator.clipboard.writeText(output);
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
			{#if unchanged}
				<p class="mt-2 text-xs text-ink-muted">
					Output matches the input — there was nothing to change.
				</p>
			{/if}
		{/if}
	</section>
</div>
