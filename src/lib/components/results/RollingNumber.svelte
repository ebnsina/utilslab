<script lang="ts">
	/**
	 * Animates a formatted value string (e.g. "$2,022.62", "22.9", "5:00 /km")
	 * like a slot-machine / odometer: each digit sits in a vertical 0–9 strip
	 * that rolls to its target, staggered left-to-right so the digits settle
	 * one after another (à la YouTube's view counter).
	 *
	 * Non-digit characters (currency symbols, commas, units) render statically.
	 */
	import { onMount } from 'svelte';

	let { value }: { value: string } = $props();

	const DIGITS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

	const chars = $derived(value.split(''));

	// First paint renders every digit at 0; once mounted we move to the real
	// targets so the columns roll up into place. Later `value` changes animate
	// because each column's transform simply changes.
	let mounted = $state(false);
	onMount(() => {
		mounted = true;
	});

	// Stagger only across digit columns so the cascade reads cleanly.
	function digitIndex(upto: number): number {
		let n = 0;
		for (let i = 0; i < upto; i++) if (/\d/.test(chars[i])) n++;
		return n;
	}
</script>

<span class="sr-only">{value}</span>
<span class="rolling" aria-hidden="true">
	{#each chars as ch, i (i)}
		{#if /\d/.test(ch)}
			<span class="digit">
				<span
					class="col"
					style="transform: translateY(-{mounted ? Number(ch) : 0}em); --i: {digitIndex(i)}"
				>
					{#each DIGITS as d (d)}<span>{d}</span>{/each}
				</span>
			</span>
		{:else}
			<span class="static">{ch}</span>
		{/if}
	{/each}
</span>

<style>
	.rolling {
		display: inline-flex;
		align-items: flex-end;
		font-variant-numeric: tabular-nums;
		line-height: 1;
	}

	.digit,
	.static {
		display: inline-block;
		height: 1em;
		line-height: 1;
		overflow: hidden;
		vertical-align: bottom;
	}

	.col {
		display: flex;
		flex-direction: column;
		transition: transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
		transition-delay: calc(var(--i) * 55ms);
	}

	.col > span {
		display: block;
		height: 1em;
		line-height: 1;
	}

	@media (prefers-reduced-motion: reduce) {
		.col {
			transition: none;
		}
	}
</style>
