<script lang="ts">
	import { parseColor, rgbToHex, rgbToHsl } from '$lib/engine/convert';

	let text = $state('#6b86c4');

	const parsed = $derived.by(() => {
		try {
			const rgb = parseColor(text);
			return { rgb, hex: rgbToHex(rgb), hsl: rgbToHsl(rgb), error: '' };
		} catch (e) {
			return { error: e instanceof Error ? e.message : 'Invalid color' };
		}
	});

	// Native picker value must be a valid #rrggbb.
	const swatch = $derived(parsed.error ? '#000000' : parsed.hex!);

	const formats = $derived(
		parsed.error
			? []
			: [
					{ label: 'HEX', value: parsed.hex! },
					{ label: 'RGB', value: `rgb(${parsed.rgb!.r}, ${parsed.rgb!.g}, ${parsed.rgb!.b})` },
					{ label: 'HSL', value: `hsl(${parsed.hsl!.h}, ${parsed.hsl!.s}%, ${parsed.hsl!.l}%)` }
				]
	);
</script>

<div class="mx-auto max-w-2xl rounded-card border border-border bg-surface p-5 sm:p-6">
	<div class="flex flex-wrap items-center gap-4">
		<div
			class="size-20 shrink-0 rounded-2xl border border-border"
			style="background: {swatch}"
		></div>
		<div class="flex flex-1 items-center gap-3">
			<input
				type="color"
				value={swatch}
				oninput={(e) => (text = e.currentTarget.value)}
				aria-label="Pick a color"
				class="size-11 cursor-pointer rounded-xl border border-line bg-surface-2 [color-scheme:dark]"
			/>
			<input
				bind:value={text}
				placeholder="#6b86c4 or rgb(107,134,196)"
				class="min-w-0 flex-1 rounded-xl border border-line bg-surface-2 px-3.5 py-2.5 font-mono tabular-nums text-ink outline-none transition focus:ring-2 focus:ring-brand focus:ring-offset-2 focus:ring-offset-surface"
			/>
		</div>
	</div>

	<div class="mt-5 space-y-2">
		{#if parsed.error}
			<p class="text-sm text-financial">{parsed.error}</p>
		{:else}
			{#each formats as f (f.label)}
				<div class="flex items-center justify-between gap-3 rounded-xl bg-surface-2 px-3.5 py-2.5">
					<span class="tag text-xs text-developer">{f.label}</span>
					<span class="font-mono tabular-nums text-ink">{f.value}</span>
				</div>
			{/each}
		{/if}
	</div>
</div>
