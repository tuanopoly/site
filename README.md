---
status: active
summary: The tuanopoly.com landing page, hand-written HTML and CSS on Cloudflare Workers.
live: https://tuanopoly.com
---

# tuanopoly.com

Landing page for [tuanopoly.com](https://tuanopoly.com). Hand-written HTML and CSS, deployed as Cloudflare Workers static assets.

The look is the same design system as AccentPal, the retired Figma plugin: the colours in `public/styles.css` are an AccentPal Palette generated from the Tuanopoly accent `#12468f` (split-complementary pairing), with the same twelve roles, light and dark Modes, Geist type, and components.

Status: deployed to tuanopoly.com and www.tuanopoly.com through the routes in `wrangler.jsonc`. On 2026-10-09 the AccentPal section, its nav link and its hero button were removed and deployed.

## Where things are

| Thing | Path |
| --- | --- |
| Live site | https://tuanopoly.com |
| The page | `public/index.html` |
| Styles and palette | `public/styles.css` |
| Deploy config | `wrangler.jsonc` |
| Glossary | `GLOSSARY.md` |
| Agent rules | `AGENTS.md` |
| Session log | `LOG.md` |

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
- `GLOSSARY.md` — glossary of the terms used when talking about this site

## Regenerating the palette

The AccentPal source and its GitHub repository were deleted on 2026-10-09, so the steps below no longer run. The variable blocks at the top of `public/styles.css` are now the only copy of the palette.

From the AccentPal repo (`../accentpal`), run the engine on the accent and paste the `toCss` output over the variable blocks at the top of `public/styles.css`:

```ts
import { generateCandidates, expandPalette, toCss } from '@accentpal/core';
const c = generateCandidates('#12468f').find((c) => c.harmony === 'split-complementary')!;
console.log(toCss(expandPalette('#12468f', c).palette));
```

## Adding a Project

Add another `<article class="project">` to the Projects grid in `public/index.html`: a one-liner, the Live URL, and a three-bullet Build Log.
