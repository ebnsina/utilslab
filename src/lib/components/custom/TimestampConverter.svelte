<script lang="ts">
	let unix = $state('');
	let human = $state('');

	const inputClass =
		'w-full rounded-xl border border-line bg-surface-2 px-3.5 py-2.5 font-mono tabular-nums text-ink outline-none transition focus:ring-2 focus:ring-brand focus:ring-offset-2 focus:ring-offset-surface';

	// Unix seconds (or ms) -> formatted dates
	const fromUnix = $derived.by(() => {
		const raw = unix.trim();
		if (!raw) return null;
		const n = Number(raw);
		if (!Number.isFinite(n)) return { error: 'Enter a numeric timestamp' };
		// Heuristic: 13+ digits = milliseconds, otherwise seconds.
		const ms = raw.replace('-', '').length >= 13 ? n : n * 1000;
		const d = new Date(ms);
		if (Number.isNaN(d.getTime())) return { error: 'Out of range' };
		return {
			utc: d.toUTCString(),
			iso: d.toISOString(),
			local: d.toLocaleString()
		};
	});

	// datetime-local string -> unix
	const toUnix = $derived.by(() => {
		if (!human) return null;
		const d = new Date(human);
		if (Number.isNaN(d.getTime())) return { error: 'Invalid date' };
		return { seconds: Math.floor(d.getTime() / 1000), millis: d.getTime() };
	});

	function setNow() {
		unix = String(Math.floor(Date.now() / 1000));
	}
</script>

<div class="grid items-start gap-6 lg:grid-cols-2">
	<!-- From timestamp -->
	<section class="rounded-card border border-border bg-surface p-5 sm:p-6">
		<h2 class="tag mb-4 text-sm text-developer">Unix → Date</h2>
		<div class="flex gap-2">
			<input bind:value={unix} placeholder="1700000000" inputmode="numeric" class={inputClass} />
			<button
				onclick={setNow}
				class="shrink-0 rounded-xl bg-developer/15 px-3 text-sm font-medium text-developer transition hover:brightness-110"
				>Now</button
			>
		</div>
		<div class="mt-4 space-y-2 text-sm">
			{#if fromUnix?.error}
				<p class="text-financial">{fromUnix.error}</p>
			{:else if fromUnix}
				<div class="flex justify-between gap-3 rounded-xl bg-surface-2 px-3.5 py-2.5">
					<span class="text-ink-muted">Local</span><span class="font-mono text-ink"
						>{fromUnix.local}</span
					>
				</div>
				<div class="flex justify-between gap-3 rounded-xl bg-surface-2 px-3.5 py-2.5">
					<span class="text-ink-muted">UTC</span><span class="font-mono text-ink"
						>{fromUnix.utc}</span
					>
				</div>
				<div class="flex justify-between gap-3 rounded-xl bg-surface-2 px-3.5 py-2.5">
					<span class="text-ink-muted">ISO</span><span class="font-mono text-ink"
						>{fromUnix.iso}</span
					>
				</div>
			{:else}
				<p class="text-ink-muted">Enter a Unix timestamp (seconds or milliseconds).</p>
			{/if}
		</div>
	</section>

	<!-- To timestamp -->
	<section class="rounded-card border border-border bg-surface p-5 sm:p-6">
		<h2 class="tag mb-4 text-sm text-developer">Date → Unix</h2>
		<input type="datetime-local" bind:value={human} class="{inputClass} [color-scheme:dark]" />
		<div class="mt-4 space-y-2 text-sm">
			{#if toUnix?.error}
				<p class="text-financial">{toUnix.error}</p>
			{:else if toUnix}
				<div class="flex justify-between gap-3 rounded-xl bg-surface-2 px-3.5 py-2.5">
					<span class="text-ink-muted">Seconds</span><span class="font-mono tabular-nums text-ink"
						>{toUnix.seconds}</span
					>
				</div>
				<div class="flex justify-between gap-3 rounded-xl bg-surface-2 px-3.5 py-2.5">
					<span class="text-ink-muted">Milliseconds</span><span
						class="font-mono tabular-nums text-ink">{toUnix.millis}</span
					>
				</div>
			{:else}
				<p class="text-ink-muted">Pick a date and time to get its Unix timestamp.</p>
			{/if}
		</div>
	</section>
</div>
