# Curriculum widget catalog

The author-typed widget palette + the add-a-widget procedure. Mechanical source of truth = the `decorate*` / `wrap*` header comments in `site/layouts/curriculum.js`; this catalog is the author-facing index that points there. Generation-time *check* (match meaning, don't overload) = `check_pedagogy.md` §52/§52b.

**Rule that governs all of them:** a widget carries a *semantic*, not just emphasis. Pick the widget whose meaning fits the beat — never the one that renders biggest. If a beat must be loud but no meaning fits, add a widget (procedure below); don't borrow a meaning-bearing one. Prominence is rendering; meaning is the widget's job.

## Palette (author-typed)

| Source marker | Renders | Means → use when |
|---|---|---|
| `**Session** *(verb, "name")*` | amber chip (`.session-block`) | **Session boundary** — start / continue / fork a Claude Code session. Verbs: `new`, `continue or new`, `switch to`-is-NOT-this (that's a focus move → Note). Inner `/rename` `<pre>` auto-wrapped `.rt-cli`. Placement: §52 four patterns. |
| `**HOX** <prose>` | hot-orange (`.hox-block`, badge "HOX HOX") | **Imminent mistake right HERE** — wrong worktree, wrong branch, about to overwrite. Used sparingly; crying wolf burns it. Leading `-`/`—`/`:` after badge dropped. |
| `**Note** <prose>` | calm-teal (`.note-block`, badge "NOTE") | **Prominent guidance, no boundary or hazard** — focus/window switch between already-open sessions, where-you-are cue, anything worth not missing. Louder than a buried sentence, quieter than HOX. |
| `**Prompt** *(Claude Code)*` + fenced block, **or** `{{prompt:<key>}}` marker | oxblood block (`.prompt-block`) | **A prompt to run.** Registry marker `{{prompt:<key>}}` is the source-side reference; build expander reconstructs the fenced shape. Bare `**Prompt**` blocks = pre-migration inline form. |
| paired `<div class="rt-code">` / `<div class="rt-cowork">` (or narrower `.rt-cli` / `.rt-desktop`) | per-runtime show/hide | **Runtime-mechanical fork** — content that differs only by runtime surface (subagent ↔ agent, plan-mode-as-feature ↔ plan-as-ask). Both forks keep the `**Prompt** *(Claude Code)*` chip; renderer auto-swaps per active runtime — writing `*(Cowork)*` short-circuits it. Forks differ ONLY in runtime mechanic; pedagogy stays identical. Fires on dual-runtime trainings (Agents 101); AE101 is Code-only so it does not. → `compounded/2026-04-25-prompts-runtime-fork-paired-divs.md`. |

## Automatic (no author decision)

Derived from structure, not a typed marker — nothing to choose: image figures (`wrapImageFigures`), diagram zoom (`decorateDiagramZoom`, `.diagram`), module hero (`buildModuleHero`, `.module-hero`), TOC (`buildTocSections`), prompt-anchor spans (`.prompt-anchor`, planted at prompt-expand).

## Decision

START/FORK a session → `**Session**`. Guard an imminent mistake → `**HOX**`. Neither, but must not be missed → `**Note**`. A thing to run → prompt block / `{{prompt:}}`. Same beat, runtime surface differs → runtime-fork divs. None fit → add a widget.

## Add a widget

What the Note widget cost (2026-05-31), as the template:

1. **Renderer** — `site/layouts/curriculum.js`: a `decorateX(root)` fn keyed on a literal marker word (`:scope > strong` text === `"X"`), mirroring `decorateHox`'s boundary discipline (badge + body, drop the label strong). Run in the same pass: **after `decorateSessions`, before `decoratePrompts`** (so the `**Prompt**` stop-condition stays intact). Export it on the `CurriculumRuntime` object.
2. **CSS** — `site/layouts/curriculum.css`: a `--x` `:root` colour var + `.x-block` + `.x-block__badge` + `.x-block__body` + `.phase--exercise .x-block` (dark-band tint) + `@media print` override. Mirror `.hox-block`.
3. **Call sites (3)** — invoke `CurriculumRuntime.decorateX` right after `decorateHox` at all three: `curriculum-spa.js` (SPA runtime), `build-workbook.js` ×2 (workbook init + standalone init).
4. **Marker-collision check** — `grep -rn '^\*\*X\*\*' curriculum/` must return only your intended uses; any existing prose leading with `**X**` would silently become a widget.
5. **Parse-shape check** — confirm `marked.parse("**X** …")` emits `<p><strong>X</strong> …` so the `:scope > strong` selector matches.

Miss any of the three call sites and the widget renders in one surface but not the others (SPA-only, or workbook-only) — a silent partial.
