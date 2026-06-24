<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import type { Tool } from '$lib/tools/types';
	import { categoryTheme } from '$lib/theme';
	import { getTool } from '$lib/tools/registry';
	import Copy from '@lucide/svelte/icons/copy';
	import Check from '@lucide/svelte/icons/check';
	import ArrowLeftRight from '@lucide/svelte/icons/arrow-left-right';

	let { tool }: { tool: Tool } = $props();

	const theme = $derived(categoryTheme(tool.category));
	const reverseTool = $derived(tool.reverse ? getTool(tool.reverse) : undefined);

	let input = $state('');
	let output = $state('');
	let error = $state('');
	let copied = $state(false);

	const msg = (e: unknown) => (e instanceof Error ? e.message : 'Could not process input');

	// Live transform — supports sync and async (e.g. hashing) transforms.
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

	const unchanged = $derived(!error && output !== '' && output === input);

	async function copy() {
		if (!output) return;
		await navigator.clipboard.writeText(output);
		copied = true;
		setTimeout(() => (copied = false), 1500);
	}

	// Hand the current result to the inverse tool across navigation.
	const HANDOFF = 'utilslab:handoff';
	function reverse() {
		if (!tool.reverse) return;
		sessionStorage.setItem(HANDOFF, output || input);
		goto(resolve('/tools/[slug]', { slug: tool.reverse }));
	}
	onMount(() => {
		const handed = sessionStorage.getItem(HANDOFF);
		if (handed !== null) {
			input = handed;
			sessionStorage.removeItem(HANDOFF);
		}
	});

	const fieldClass =
		'h-72 w-full min-w-0 resize-y rounded-xl border border-line bg-surface-2 p-3.5 font-mono text-sm text-ink outline-none transition focus:ring-2 focus:ring-brand focus:ring-offset-2 focus:ring-offset-surface';
</script>

<div class="grid items-start gap-6 lg:grid-cols-2">
	<!-- Input -->
	<section class="min-w-0 rounded-card border border-border bg-surface p-5 sm:p-6">
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
	<section class="min-w-0 rounded-card border border-border bg-surface p-5 sm:p-6">
		<div class="mb-4 flex items-center justify-between gap-2">
			<h2 class="tag text-sm {theme.text}">Output</h2>
			<div class="flex items-center gap-2">
				{#if reverseTool}
					<button
						onclick={reverse}
						title="Send the result to {reverseTool.title}"
						class="flex items-center gap-1.5 rounded-badge bg-surface-2 px-2.5 py-1 text-xs font-medium text-ink-muted transition hover:text-ink"
					>
						<ArrowLeftRight class="size-3.5" />
						<span class="hidden sm:inline">{reverseTool.title}</span>
						<span class="sm:hidden">Reverse</span>
					</button>
				{/if}
				<button
					onclick={copy}
					disabled={!output}
					class="flex items-center gap-1.5 rounded-badge px-2.5 py-1 text-xs font-medium transition disabled:opacity-40 {theme.soft} {theme.text}"
				>
					{#if copied}
						<Check class="size-3.5" /> Copied
					{:else}
						<Copy class="size-3.5" /> Copy
					{/if}
				</button>
			</div>
		</div>

		{#if error}
			<div
				class="flex h-72 items-center justify-center rounded-xl border border-financial/40 bg-financial/10 p-3.5 text-center text-sm text-financial"
			>
				{error}
			</div>
		{:else}
			<textarea
				readonly
				value={output}
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
