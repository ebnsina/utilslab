# UtilsLab

> Modern tools for everyday life — a fast, free collection of financial, health, math, everyday, and developer utilities.

UtilsLab is a fully static SvelteKit site bundling **49 calculators and tools** across five categories. Everything runs in the browser — no accounts, no servers, no data leaves your machine — and every page is prerendered to static HTML for instant loads and clean SEO.

## Tools

- **Financial** — mortgage, loan, auto loan, compound interest, sales tax, ROI, savings goal
- **Health & Fitness** — BMI, calorie, body fat, BMR, ideal weight, water intake, running pace
- **Math** — scientific calculator, percentage, fraction, quadratic, statistics
- **Everyday** — age, tip, discount, unit converter, color converter
- **Developer** — Base64, URL & HTML encode/decode, JSON / CSS / JS / HTML / SQL / Markdown formatters, hash, JWT decoder, UUID, timestamp, case converter, slugify, sort/dedupe lines, text counter, lorem ipsum

Adding a tool is a one-liner: define it in `src/lib/tools/` and append it to the catalog in `src/lib/tools/registry.ts`. A generic shell renders each tool from its declarative field schema.

## Tech stack

- [SvelteKit 2](https://svelte.dev/docs/kit) + [Svelte 5](https://svelte.dev) (runes)
- [Tailwind CSS 4](https://tailwindcss.com)
- TypeScript, fully prerendered via `adapter-static`
- Library-backed formatters (`js-beautify`, `sql-formatter`, `marked`, `terser`), code-split per route

## Developing

Install dependencies, then start the dev server:

```sh
npm install
npm run dev

# or open the app in a new browser tab
npm run dev -- --open
```

## Building

```sh
npm run build      # produce the static production build
npm run preview    # preview the build locally
```

## Quality checks

```sh
npm run check      # svelte-check (types)
npm run lint       # prettier + eslint
npm run format     # prettier --write
npm run test       # vitest
```
