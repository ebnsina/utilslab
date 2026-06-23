<script lang="ts">
	import type { SeriesResult } from '$lib/tools/types';

	let { result }: { result: SeriesResult } = $props();

	// Fixed viewBox; the SVG scales responsively to its container.
	const W = 600;
	const H = 220;
	const PAD = 8;

	const max = $derived(Math.max(1, ...result.series.flatMap((s) => s.points)));
	const count = $derived(Math.max(...result.series.map((s) => s.points.length), 2));

	function x(i: number): number {
		return PAD + (i / (count - 1)) * (W - PAD * 2);
	}
	function y(v: number): number {
		return H - PAD - (v / max) * (H - PAD * 2);
	}
	function linePath(points: number[]): string {
		return points.map((v, i) => `${i === 0 ? 'M' : 'L'} ${x(i)} ${y(v)}`).join(' ');
	}
	function areaPath(points: number[]): string {
		const top = points.map((v, i) => `${i === 0 ? 'M' : 'L'} ${x(i)} ${y(v)}`).join(' ');
		return `${top} L ${x(points.length - 1)} ${H - PAD} L ${x(0)} ${H - PAD} Z`;
	}
</script>

<div class="rounded-2xl border border-border bg-surface-2 p-4">
	{#if result.label}
		<div class="mb-3 text-sm font-medium text-ink-muted">{result.label}</div>
	{/if}

	<svg viewBox="0 0 {W} {H}" class="h-auto w-full" preserveAspectRatio="none" role="img">
		{#each result.series as s, si (s.name)}
			<defs>
				<linearGradient id="grad-{si}" x1="0" y1="0" x2="0" y2="1">
					<stop offset="0%" stop-color={s.color} stop-opacity="0.35" />
					<stop offset="100%" stop-color={s.color} stop-opacity="0" />
				</linearGradient>
			</defs>
			<path d={areaPath(s.points)} fill="url(#grad-{si})" />
			<path
				d={linePath(s.points)}
				fill="none"
				stroke={s.color}
				stroke-width="2.5"
				stroke-linejoin="round"
			/>
		{/each}
	</svg>

	{#if result.xLabels && result.xLabels.length}
		<div class="mt-1 flex justify-between font-mono text-xs text-ink-muted/70">
			<span>{result.xLabels[0]}</span>
			<span>{result.xLabels.at(-1)}</span>
		</div>
	{/if}
</div>
