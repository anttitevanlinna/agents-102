# Legacy megajudge instances (pre-2026-05-02)

These 29 files are audit reports from the megajudge-shaped eval system that ran before the three-class refactor (writing / story / technical) shipped 2026-05-02. They are kept for historical reference — superseded as active audit artefacts but retained to trace what each module/exercise/lecture had previously cleared.

## Why they're not active

- Megajudge instances bundled multiple criteria (mood + voice + leap test + framing + Claude-behavior + ...) into one report. The new architecture splits these by evidence source: text → writing class, sim trace → story class, platform reality → technical class. See `memory/compounded/2026-05-02-content_creation-judge-granularity-by-class-not-criterion.md`.
- New audits via `/eval-fire <class> <file>` and `/curriculum-pre-ship-audit` write per-class structured JSON to `curriculum/evals/instances/<file-slug>.<class>.json`. The .md megajudge format is no longer produced.

## What replaces them

For each curriculum file an instance here referenced (e.g., `bootstrap--context-is-king.md` referenced `curriculum/exercises/context-is-king.md`):

1. Run `/eval-fire writing curriculum/exercises/context-is-king.md` (cheap, Haiku).
2. Run `/eval-fire story curriculum/exercises/context-is-king.md` (Sonnet, generates sim trace on first call).
3. Run `/eval-fire technical curriculum/exercises/context-is-king.md` (Sonnet, static checks).
4. Or run all three at once via `/curriculum-pre-ship-audit curriculum/exercises/context-is-king.md`.

The Quality dimension log on the source file's `<!-- maintainer -->` block records the per-class SHA pin going forward — the audit instance's job moves from "be the report" to "ship the verdict."

## Don't add new files here

This directory is closed. New audits go to `curriculum/evals/instances/<slug>.<class>.json` (per-class JSON output from the new judges).

If you need historical context for a specific module's prior verdict, grep this directory by slug. Otherwise leave it alone.
