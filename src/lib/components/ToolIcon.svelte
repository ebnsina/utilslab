<script lang="ts">
	import type { CategoryId } from '$lib/tools/types';
	// Direct icon imports tree-shake to only what we use.
	import House from '@lucide/svelte/icons/house';
	import HandCoins from '@lucide/svelte/icons/hand-coins';
	import TrendingUp from '@lucide/svelte/icons/trending-up';
	import ReceiptText from '@lucide/svelte/icons/receipt-text';
	import Scale from '@lucide/svelte/icons/scale';
	import Flame from '@lucide/svelte/icons/flame';
	import PersonStanding from '@lucide/svelte/icons/person-standing';
	import Timer from '@lucide/svelte/icons/timer';
	import Calculator from '@lucide/svelte/icons/calculator';
	import Percent from '@lucide/svelte/icons/percent';
	import Divide from '@lucide/svelte/icons/divide';
	import Cake from '@lucide/svelte/icons/cake';
	import Coins from '@lucide/svelte/icons/coins';
	import Landmark from '@lucide/svelte/icons/landmark';
	import HeartPulse from '@lucide/svelte/icons/heart-pulse';
	import Sigma from '@lucide/svelte/icons/sigma';
	import Wrench from '@lucide/svelte/icons/wrench';

	// A distinct Lucide icon per tool, with a per-category fallback so new
	// tools always render something sensible.
	const TOOL_ICONS: Record<string, typeof House> = {
		mortgage: House,
		loan: HandCoins,
		'compound-interest': TrendingUp,
		'sales-tax': ReceiptText,
		bmi: Scale,
		calorie: Flame,
		'body-fat': PersonStanding,
		pace: Timer,
		scientific: Calculator,
		percentage: Percent,
		fraction: Divide,
		age: Cake,
		tip: Coins
	};

	const CATEGORY_FALLBACK: Record<CategoryId, typeof House> = {
		financial: Landmark,
		health: HeartPulse,
		math: Sigma,
		other: Wrench
	};

	let {
		slug,
		category,
		class: klass = 'size-6'
	}: { slug: string; category: CategoryId; class?: string } = $props();

	const Icon = $derived(TOOL_ICONS[slug] ?? CATEGORY_FALLBACK[category]);
</script>

<Icon class={klass} aria-hidden="true" />
