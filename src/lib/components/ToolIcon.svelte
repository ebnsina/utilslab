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
	import Code from '@lucide/svelte/icons/code';
	import Binary from '@lucide/svelte/icons/binary';
	import FileText from '@lucide/svelte/icons/file-text';
	import Link from '@lucide/svelte/icons/link';
	import Unlink from '@lucide/svelte/icons/unlink';
	import Braces from '@lucide/svelte/icons/braces';
	import FileJson from '@lucide/svelte/icons/file-json';
	import Minimize2 from '@lucide/svelte/icons/minimize-2';
	import Palette from '@lucide/svelte/icons/palette';
	import Hash from '@lucide/svelte/icons/hash';
	import KeyRound from '@lucide/svelte/icons/key-round';
	import Fingerprint from '@lucide/svelte/icons/fingerprint';
	import Clock from '@lucide/svelte/icons/clock';
	import Pipette from '@lucide/svelte/icons/pipette';
	import Ruler from '@lucide/svelte/icons/ruler';
	import CaseSensitive from '@lucide/svelte/icons/case-sensitive';
	import Link2 from '@lucide/svelte/icons/link-2';
	import CodeXml from '@lucide/svelte/icons/code-xml';
	import FileX from '@lucide/svelte/icons/file-x';
	import ArrowDownAZ from '@lucide/svelte/icons/arrow-down-a-z';
	import CopyMinus from '@lucide/svelte/icons/copy-minus';
	import Tally5 from '@lucide/svelte/icons/tally-5';
	import Pilcrow from '@lucide/svelte/icons/pilcrow';
	import Car from '@lucide/svelte/icons/car';
	import ChartLine from '@lucide/svelte/icons/chart-line';
	import PiggyBank from '@lucide/svelte/icons/piggy-bank';
	import Activity from '@lucide/svelte/icons/activity';
	import Weight from '@lucide/svelte/icons/weight';
	import GlassWater from '@lucide/svelte/icons/glass-water';
	import Superscript from '@lucide/svelte/icons/superscript';
	import ChartColumn from '@lucide/svelte/icons/chart-column';
	import TicketPercent from '@lucide/svelte/icons/ticket-percent';

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
		tip: Coins,
		'base64-encode': Binary,
		'base64-decode': FileText,
		'url-encode': Link,
		'url-decode': Unlink,
		'json-beautify': Braces,
		'json-minify': FileJson,
		'css-minify': Minimize2,
		'css-beautify': Palette,
		'hash-generator': Hash,
		'jwt-decoder': KeyRound,
		'uuid-generator': Fingerprint,
		'timestamp-converter': Clock,
		'color-converter': Pipette,
		'unit-converter': Ruler,
		'case-converter': CaseSensitive,
		slugify: Link2,
		'html-encode': CodeXml,
		'html-decode': FileX,
		'sort-lines': ArrowDownAZ,
		'dedupe-lines': CopyMinus,
		'text-counter': Tally5,
		'lorem-ipsum': Pilcrow,
		'auto-loan': Car,
		roi: ChartLine,
		'savings-goal': PiggyBank,
		bmr: Activity,
		'ideal-weight': Weight,
		'water-intake': GlassWater,
		quadratic: Superscript,
		statistics: ChartColumn,
		discount: TicketPercent
	};

	const CATEGORY_FALLBACK: Record<CategoryId, typeof House> = {
		financial: Landmark,
		health: HeartPulse,
		math: Sigma,
		other: Wrench,
		developer: Code
	};

	let {
		slug,
		category,
		class: klass = 'size-6'
	}: { slug: string; category: CategoryId; class?: string } = $props();

	const Icon = $derived(TOOL_ICONS[slug] ?? CATEGORY_FALLBACK[category]);
</script>

<Icon class={klass} aria-hidden="true" />
