<script lang="ts">
	import { evaluate } from '$lib/engine/expression';
	import { number } from '$lib/engine/format';

	let expr = $state('');
	let answer = $state<number | null>(null);

	const preview = $derived.by(() => {
		if (!expr) return '';
		const v = evaluate(expr);
		return Number.isFinite(v) ? number(v, 8) : '';
	});

	function press(token: string) {
		expr += token;
	}
	function clearAll() {
		expr = '';
		answer = null;
	}
	function backspace() {
		expr = expr.slice(0, -1);
	}
	function equals() {
		const v = evaluate(expr);
		answer = Number.isFinite(v) ? v : null;
		if (answer !== null) expr = number(answer, 10);
	}

	// label = what the user sees, token = what gets appended (defaults to label)
	type Key = { label: string; token?: string; kind?: 'fn' | 'op' | 'eq' | 'clear' };
	const keys: Key[] = [
		{ label: 'sin', token: 'sin(', kind: 'fn' },
		{ label: 'cos', token: 'cos(', kind: 'fn' },
		{ label: 'tan', token: 'tan(', kind: 'fn' },
		{ label: 'AC', kind: 'clear' },
		{ label: '⌫', kind: 'clear' },

		{ label: 'ln', token: 'ln(', kind: 'fn' },
		{ label: 'log', token: 'log(', kind: 'fn' },
		{ label: '√', token: 'sqrt(', kind: 'fn' },
		{ label: '^', kind: 'op' },
		{ label: '÷', token: '/', kind: 'op' },

		{ label: 'π', token: 'pi' },
		{ label: '7' },
		{ label: '8' },
		{ label: '9' },
		{ label: '×', token: '*', kind: 'op' },

		{ label: 'e', token: 'e' },
		{ label: '4' },
		{ label: '5' },
		{ label: '6' },
		{ label: '−', token: '-', kind: 'op' },

		{ label: '(', token: '(' },
		{ label: '1' },
		{ label: '2' },
		{ label: '3' },
		{ label: '+', token: '+', kind: 'op' },

		{ label: ')', token: ')' },
		{ label: '0' },
		{ label: '.' },
		{ label: '=', kind: 'eq' }
	];

	function handle(key: Key) {
		if (key.kind === 'eq') return equals();
		if (key.label === 'AC') return clearAll();
		if (key.label === '⌫') return backspace();
		press(key.token ?? key.label);
	}

	function styleFor(key: Key): string {
		if (key.kind === 'eq') return 'bg-brand text-brand-ink hover:brightness-110 col-span-1';
		if (key.kind === 'op') return 'bg-surface text-brand';
		if (key.kind === 'fn') return 'bg-surface text-ink-muted text-sm';
		if (key.kind === 'clear') return 'bg-surface text-math';
		return 'bg-surface-2 text-ink';
	}
</script>

<div class="mx-auto max-w-md rounded-card border border-border bg-surface p-4 sm:p-5">
	<!-- Display -->
	<div class="mb-4 rounded-2xl border border-border bg-canvas p-4 text-right">
		<input
			bind:value={expr}
			onkeydown={(e) => e.key === 'Enter' && equals()}
			placeholder="0"
			aria-label="Expression"
			class="w-full bg-transparent text-right font-mono text-2xl tabular-nums text-ink outline-none placeholder:text-ink-muted/40"
		/>
		<div class="mt-1 h-5 font-mono tabular-nums text-sm text-ink-muted">
			{preview ? `= ${preview}` : ''}
		</div>
	</div>

	<!-- Keypad -->
	<div class="grid grid-cols-5 gap-1.5 sm:gap-2">
		{#each keys as key (key.label)}
			<button
				onclick={() => handle(key)}
				class="h-11 rounded-xl font-medium transition active:scale-95 hover:brightness-125 sm:h-12 {styleFor(
					key
				)}"
			>
				{key.label}
			</button>
		{/each}
	</div>
</div>
