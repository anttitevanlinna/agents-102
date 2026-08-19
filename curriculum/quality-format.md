# Quality-state tagging

Canonical format spec. Loaded by `/curriculum-pre-ship-audit`, `/wind-down`, and any session touching Quality lines. Pointer from `curriculum/CLAUDE.md`.

Every student-facing artifact (module / exercise / lecture / prework) carries a Quality line in its maintainer block. The contract between sessions.

**LLM-checks ladder** (cheap → expensive; each tier earns the next):
`compendium-audited` → `sim-passed`.

No `draft` rung (removed 2026-05-31). A file is either audited — `compendium-audited` or higher — or carries no Quality line at all. Un-audited is the absence of a state, not a state; the stamper refuses to fabricate one (`update-quality.sh` errors rather than mint a floor).

**Mechanical is not a rung (removed 2026-06-01).** The `tmux-runner` battery is a pre-ship system test: run it, fix what it finds, ship — it gates release like a software system test, but is not recorded as a stamp. No `- mechanical` row in artifacts; no `mechanical-tested` ladder state.

The ladder tops at `sim-passed` — the last *recorded* LLM check. Two things gate release but are NOT rungs, for the same reason touch-degrade would forbid ever standing on one: the `tmux-runner` system test (run pre-ship, unrecorded), and delivery reality (a cohort ran it; survived many — logged on the `- cohorts:` row as a factual record).

**There is no `maintainer-reviewed` axis (removed 2026-08-15, Antti-directed).** It went stale the moment any body moved and nobody re-marked it. Maintainer direction is visible where it actually lands: dated decision notes in the maintainer block. The stamper strips any stray `- maintainer-reviewed` row it encounters on re-stamp.

**Position: first in the maintainer block (ruled 2026-08-19).** The `**Quality:**` line opens the block, its `- ` rows run unbroken directly beneath it, and decision notes, accept-notes and source-verification blocks follow. The parser is the reason: `scan-stale-classes.js:blockRow` reads only the unbroken run of rows under the Quality line, so a note that lands between them takes `cross_module` and `voice_panel` out of the queue's sight without any error. Agents 101 has held this shape across all eight modules; AE101 accreted the other way and sits anywhere from 2 to 92 lines in, which is what a position nobody ruled on looks like. AE101 converges to this on next touch of each file.

**Format** (top-state line + dimension log in maintainer block):
```
**Quality:** <top-state> <YYYY-MM-DD> (writing@<sha> story@<sha> technical@<sha> behavior@<sha> pedagogy@<sha> strategy@<sha> slides@<sha>)
- judges @<sha>: writing PASS, story PASS, technical PASS, behavior PASS, pedagogy PASS, strategy PASS, slides PASS
- cross_module @<set-sha>: PASS — set=[<M(N)>, <M(N+1)>, ...]    # module-set scope; only when ≥2 modules audited together
- voice_panel @<sha>: PASS — 6/6 signatures                       # six-persona taste read; AE101 student-facing surfaces
- sim-passed <YYYY-MM-DD> (<persona names + scores>)  # carry forward when storytelling or behavior judge regen + PASS
- cohorts: <none yet | cohort-name + date + post-cohort changes>
```

`compendium-audited` carries seven per-class git short-SHA pins. Per-file classes mirror the compendium split:

| Class | Surface | Compendium |
|---|---|---|
| `writing` | banned words / register / surface lints | `check_writing.md` |
| `story` | mood / teaching moment / arc (Class A sim trace) | storytelling-class |
| `technical` | platform claims / citations / static prompt mechanics | technical-class |
| `behavior` | per-prompt distribution vs 15-pattern catalog (Class B sim trace) | `check_prompts.md` + behavior-class |
| `pedagogy` | module architecture + dynamics (static) | `check_pedagogy.md` |
| `strategy` | file × strategy-doc alignment (static) | `check_strategy_tie_in.md` |
| `slides` | per-`##`-chunk cold read; each slide resolves its own referents | `check_slides.md` |

Each class's SHA = file's git short-SHA when that judge passed.

**Cross_module** = separate axis (own row), not per-file pin. Fires at module-set scope (`/curriculum-pre-ship-audit` when ≥2 modules audited together). Stamps each module in set; touching any member degrades the row for all; restored when set re-audits clean.

**Voice_panel** = separate axis (own row), per file. Six personas, five authors plus the reader who vetoes (`curriculum/evals/judges/voice-panel.md`). PASS = all six signed; a withheld signature is a punch list, never a release gate — panel findings route to `pre-cohort-todos.md` or a card, and no other axis waits on them. Taste is whole-file, so there is no diff-region routing: any body line moved since the pin re-owes the read. Scope is AE101 student-facing surfaces; reference lookup pages are out (flat tables have no voice to be pleased by).

Both scope axes degrade executably: `scan-stale-classes.js` reads the rows (`crossState` / `panelState`), `eval-queue.js` prints them in their own sections. Cross_module prints folded back into the SET it names — it fires once per set, never per file.

## Key rules

- **Auto-degrade is touch-based, not time-based.** File touched after audit date → that tier and higher degrade. Cosmetic edits below `<!-- maintainer -->` don't degrade.
- **Per-class auto-degrade.** Touching a writing-only line invalidates only `writing@<sha>`; others carry forward. Mappings: prompt block → `behavior@` (+ usually `technical@`); `## Phase` / `## Plug Points` / `## Bridge` → `pedagogy@`; `## Big Idea` / `## Key Concepts` / `## What You'll Learn` → `strategy@`; any body line → `writing@` + `slides@` (both exempt fence interiors and the maintainer block, so bookkeeping does not stale them). `curriculum/evals/scripts/eval-queue.js` (`npm run evals:queue`) derives these owings from the pins themselves — it walks the universe, so it catches edits made by any tool, session, or person.
- **Never delete a Quality block to avoid a stale marker.** A body edit degrades named classes; it does not void the record. The stamp must survive to go stale, because `scan-stale-classes.js` routes diff-regions to classes by diffing against the pinned SHAs — remove them and the routing has nothing to compare, so a recoverable to-do becomes an unrecoverable one. Deleting also takes the `cross_module:` row with it, which costs a judge run across the whole set to regenerate (up to seven files). Editing body and dropping the block reads as tidiness and is data loss. Restore from `git show <sha>:<path>` if it already happened. (2026-08-09: `f45db08` did this to M3 + M4; an orphaned axis bullet under no parent is the tell.)
- **Grandfather rule** for files audited pre-2026-05-14: existing `compendium-audited @ <sha>` satisfies the four old classes (writing / story / technical / behavior) IF mtime unchanged. The three later classes (`pedagogy@`, `strategy@`, `slides@`) = `grandfathered` until next touch.
- **Reference files** (`curriculum/trainings/<training>/reference/`) **exempt** — flat lookup, no mood / sim surface.

Full rationale → `memory/compounded/2026-04-25-content_creation-quality-state-tagging.md`.
