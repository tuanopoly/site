# tuanopoly.com

Landing page for [tuanopoly.com](https://tuanopoly.com). One hand-written HTML file, deployed as Cloudflare Workers static assets.

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
- `public/_headers` — response headers served with the static assets (HSTS, nosniff, framing, referrer, permissions)
- `wrangler.jsonc` — Worker name, assets directory, custom domain routes
- `CONTEXT.md` — glossary of the terms used when talking about this site

## Adding a Project

When the first Project ships, replace the "What I'm building" row with a Projects grid: one card per Project with a screenshot, a one-liner, the Live URL, and a three-bullet Build Log.
