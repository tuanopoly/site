# tuanopoly.com — project rules for coding agents (Claude Code, Codex)

## About this project

- Purpose: landing page for tuanopoly.com. Hand-written HTML and CSS, deployed as Cloudflare Workers static assets.
- Stack: static HTML/CSS/JS in `public/`, `three` for the 3D element, `wrangler` for dev and deploy. npm.
- Run: `npm run dev` (wrangler dev)
- Deploy: `npm run deploy` (wrangler deploy). Ask before deploying.
- Test/lint: none. Check the page in a browser before calling a change done.
- Design system: the colours in `public/styles.css` are an AccentPal Palette from accent `#12468f`; same twelve roles, Light and Dark Modes, Geist type as accentpal.tuanopoly.com. Read `CONTEXT.md` for the vocabulary and keep the two sites consistent.

## Working agreements

- Read `HANDOFF.md` at the start of a session if it exists. Update it before you stop or when switching between Claude Code and Codex.
- Do not commit or push unless the user says so. Leave changes staged and describe them.
- Ask before deleting files, changing DNS or Cloudflare settings, or deploying.
- Prefer the smallest change that solves the task.
- Secrets live in `.env` (gitignored).

## Agent-specific notes

- Codex: local state in `.codex/`, gitignored.
- Claude Code: `CLAUDE.md` imports this file; Claude-only notes go there. Local state in `.claude/`, gitignored.
