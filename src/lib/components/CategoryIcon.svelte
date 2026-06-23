<script lang="ts">
	import type { CategoryId } from '$lib/tools/types';
	import Landmark from '@lucide/svelte/icons/landmark';
	import HeartPulse from '@lucide/svelte/icons/heart-pulse';
	import Sigma from '@lucide/svelte/icons/sigma';
	import Wrench from '@lucide/svelte/icons/wrench';
	import Code from '@lucide/svelte/icons/code';

	let { category, class: klass = 'size-6' }: { category: CategoryId; class?: string } = $props();

	const ICONS: Record<CategoryId, typeof Landmark> = {
		financial: Landmark,
		health: HeartPulse,
		math: Sigma,
		other: Wrench,
		developer: Code
	};

	const Icon = $derived(ICONS[category]);
</script>

<Icon class={klass} aria-hidden="true" />
