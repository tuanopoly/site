# tuanopoly.com log

Entries go at the bottom, oldest first, one per working session.

## 2026-10-02 | Claude
Checked the project against the standard layout in `E:\README.md`. The root already held only entry and config files, so nothing moved. Nothing is committed.
- `README.md`: status and "Where things are" table added
- `LOG.md`: new

## 2026-10-04 | Claude
Renamed `CONTEXT.md` to `GLOSSARY.md` with `git mv`, because Matt Pocock's skills v1.3 read only `GLOSSARY.md` now. The rename is staged and nothing is committed.
- Pointers to the glossary updated in `AGENTS.md`, `CLAUDE.md` (the `@GLOSSARY.md` import) and `README.md`
- Older log entries, finished tickets and archived reviews keep the old name

## 2026-10-08 | Claude
Tested the T3 Code preview pane before redesign mockups. A small neon test page was served on localhost:8765 and checked at 1280×800 and iPhone 12 Pro size. Both rendered and the animation ran. The live site is unchanged.
- `scratch/preview-test/index.html`: new, throwaway test page

## 2026-10-09 | Claude
Added front matter to the README, so `E:\projects\INDEX.md` lists this project with its status. Removed the empty `social/` folder.
- `README.md`: front matter added, removed the empty `social/` row
- `social/`: empty, removed

## 2026-10-09 | Claude
Removed the AccentPal section from the page and published the site, at the user's request. AccentPal is retired and its site no longer resolves, so the section's "Try it live" button led nowhere. The nav link "Building" and the hero button "See what I'm building" pointed at that section, so they went too. Wrangler deployed version `0fcf722f-dc22-4a8a-84d4-a0139ea63bec`, and tuanopoly.com and www.tuanopoly.com answer 200 without the section. Nothing is committed.
- `public/index.html`: the "What I'm building" section, its nav link and its hero button removed
- `README.md`: status line updated, and the palette notes now say the AccentPal source is gone

## 2026-10-09 | Claude
Moved from `E:\projects\tuanopoly\site` to `E:\tuanopoly\brand\studio\site`, with everything else from `E:\projects`, which now lives in `E:\tuanopoly` as brand, work and personal.
- this folder: moved from `E:\projects\tuanopoly\site`

## 2026-10-09 | Claude
Committed the open changes in four local commits. The user approved local commits only, so nothing is pushed. Before the commits, removed "That change is not committed yet." from the README status line, because the AccentPal removal is now in a commit.
- Commits, oldest first: "Rename CONTEXT.md to GLOSSARY.md", "Remove the AccentPal section from the page", "Ignore the scratch folder" and "Add front matter, a where-things-are table and a session log". The last one holds this entry.
- `.gitignore`: `scratch/` added under the comment "Agent output, safe to delete"
- `README.md`: one sentence removed from the status line
- `scratch/preview-test/index.html`: not committed. It is the throwaway test page from 2026-10-08, and the new `scratch/` rule ignores it. The file stays on disk.
