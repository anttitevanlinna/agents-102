---
name: mermaid-diagrams
description: Render Mermaid .mmd diagram sources to committed .svg for curriculum docs. Use when creating or updating a diagram embedded in a module/supplementary/reference page, or when a .mmd source changed and its .svg must be regenerated. Produces vector (crisp at any width, tiny), not raster.
---

# Mermaid → SVG for curriculum diagrams

Diagrams ship as **vector**. `.mmd` source + rendered `.svg`, both committed, side by side with the doc. Never raster (PNG): a raster forces a fixed pixel width, so it clips in a narrow column or blurs when scaled — vector dissolves the tradeoff and is ~⅓ the bytes.

## Run

```
node .claude/skills/mermaid-diagrams/render-mermaid.js <dir-or-file.mmd> [...more]
```

- Dir arg → renders every `.mmd` in it. File arg → that one. Each `.mmd` → sibling `.svg`.
- After editing any `.mmd`, rerun this, then rebuild the affected workbook (`node scripts/build-workbook.js <customer> <training>`).

## Author labels for `<img>`-safe SVG

Renders with `htmlLabels:false` → native `<text>`, no `<foreignObject>` → loads correctly via `<img>` in every browser. The cost lands on label syntax:

- Plain text only. `<br/>` for line breaks = fine (sublabel on its own line).
- **No** `<i>`/`<b>`/markup tags — they print literally.
- **No** `&` — double-escapes to `&amp;`. Reword (`Q&A` → `Q and A`).

The renderer strips the root `width`/`height`/`style`, leaving the `viewBox` — the doc's CSS then sizes the diagram losslessly.

## Embed in a doc

Normal markdown image, path relative to the doc:

```
![One-line description for screen readers](skill-stacking/01-meta-model.svg)

*Visible caption naming what the diagram shows.*
```

- SPA serves the `.svg` from the doc's dir (image targets are re-rooted in `curriculum-spa.js`).
- Workbook inlines it as a data URI (`scripts/build-workbook.js` → `inlineImages`), so the single page stays self-contained.
- `.module .diagram` (in `curriculum.css`) breaks the figure out of the 40em prose column to the full content width — diagrams want the page, prose wants the measure.
- `wrapImageFigures` (in `curriculum.js`) auto-wraps the `<img>` in `<figure class="diagram">` and adds an "Open in new tab ↗" link (lossless zoom). Don't hand-author the figure or the link — just write the markdown image + caption.

## Deps

- **Headless Chrome.** Default macOS path; override with `CHROME_BIN`.
- **mermaid** pinned in `render-mermaid.js`, auto-downloaded once to `vendor/` (gitignored). No mmdc/puppeteer.
- Scratch harness goes in a `.scratch-*` dir under the skill, deleted on exit. Nothing in `/tmp`.
