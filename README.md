# tuanopoly.com

Landing page for [tuanopoly.com](https://tuanopoly.com). Hand-written HTML and CSS, deployed as Cloudflare Workers static assets.

The look is the same design system as [accentpal.tuanopoly.com](https://accentpal.tuanopoly.com): the colours in `public/styles.css` are an AccentPal Palette generated from the Tuanopoly accent `#12468f` (split-complementary pairing), with the same twelve roles, light and dark Modes, Geist type, and components.

## Run locally

```sh
npm install
npm run dev
```

## Deploy

```sh
npx wrangler login   # once
npm run deploy
```

## Layout

- `public/index.html` — the whole page
- `public/styles.css` — palette variables (generated, don't hand-edit hex values) and all styles
- `public/main.js` — light/dark toggle
- `public/favicon.svg`, `public/404.html`
- `public/_headers` — response headers served with the static assets (HSTS, CSP, nosniff, framing, referrer, permissions)
- `wrangler.jsonc` — Worker name, assets directory, custom domain routes
- `CONTEXT.md` — glossary of the terms used when talking about this site

## Regenerating the palette

From the AccentPal repo (`../accentpal`), run the engine on the accent and paste the `toCss` output over the variable blocks at the top of `public/styles.css`:

```ts
import { generateCandidates, expandPalette, toCss } from '@accentpal/core';
const c = generateCandidates('#12468f').find((c) => c.harmony === 'split-complementary')!;
console.log(toCss(expandPalette('#12468f', c).palette));
```

## Adding a Project

Add another `<article class="project">` to the Projects grid in `public/index.html`: a one-liner, the Live URL, and a three-bullet Build Log.
