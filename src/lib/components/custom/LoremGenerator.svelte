<script lang="ts">
	import RefreshCw from '@lucide/svelte/icons/refresh-cw';
	import Copy from '@lucide/svelte/icons/copy';
	import Check from '@lucide/svelte/icons/check';

	const WORDS =
		'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco laboris nisi aliquip ex ea commodo consequat duis aute irure in reprehenderit voluptate velit esse cillum eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt culpa qui officia deserunt mollit anim id est laborum'.split(
			' '
		);

	let count = $state(3);
	let text = $state('');
	let copied = $state(false);

	const pick = () => WORDS[Math.floor(Math.random() * WORDS.length)];

	function sentence(): string {
		const len = 8 + Math.floor(Math.random() * 8);
		const s = Array.from({ length: len }, pick).join(' ');
		return s.charAt(0).toUpperCase() + s.slice(1) + '.';
	}

	function paragraph(): string {
		const n = 3 + Math.floor(Math.random() * 4);
		return Array.from({ length: n }, sentence).join(' ');
	}

	function generate() {
		const n = Math.min(Math.max(count, 1), 50);
		text = Array.from({ length: n }, paragraph).join('\n\n');
	}

	$effect(() => {
		if (!text) generate();
	});

	async function copy() {
		await navigator.clipboard.writeText(text);
		copied = true;
		setTimeout(() => (copied = false), 1500);
	}
</script>

<div class="mx-auto max-w-2xl rounded-card border border-border bg-surface p-5 sm:p-6">
	<div class="mb-4 flex flex-wrap items-center gap-3">
		<label class="flex items-center gap-2 text-sm text-ink-muted">
			Paragraphs
			<input
				type="number"
				min="1"
				max="50"
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
			onclick={copy}
			class="ml-auto flex items-center gap-1.5 rounded-badge bg-developer/15 px-3 py-2 text-xs font-medium text-developer transition hover:brightness-110"
		>
			{#if copied}<Check class="size-3.5" /> Copied{:else}<Copy class="size-3.5" /> Copy{/if}
		</button>
	</div>

	<div class="space-y-3 whitespace-pre-wrap text-sm leading-relaxed text-ink-muted">
		{text}
	</div>
</div>
