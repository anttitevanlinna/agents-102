# Pre-cohort punchlist, AE101 M1–M6

Open decisions before the first paying cohort. Module files carry zero TODOs; this is the single tracking surface. Delete items when done, git is the history, this file is current state.

Sim sweeps and platform-capability checks are not tracked here. The `curriculum-pre-ship-audit` skill auto-fires on touched files; `check_platform_and_boundaries.md` fires on platform claims at content-time. **Per-class verdicts (PASS / REVISE / grandfathered) live in each module's own `**Quality:**` block**, `update-quality.sh` stamps both PASS and REVISE with the instance-JSON path so a successor can grep Quality blocks for state without consulting this file.

## Hook mechanics depth

Write `reference/hooks-and-loops.md` (1–2 page reference doc): stop-hook vs. command-loop tradeoff, two minimal examples, when to reach for which. Link from M3 + M5 maintainer blocks. Separate session.

## Per-file specific concerns (not caught by auto-fire)

- **`reading-the-return.md` + `learning-through-contrast.md`**, custom-persona sim: dual-mode reader (pre-read + in-room handout) at the M5 openers. Standard Maija/Greg/Jin trio doesn't simulate the dual-mode use.
- **`learning-through-contrast.md`**, cross-file framing alignment with its pre-read (no contradictions, no different vocabulary). Auto-fire is per-file; cross-file consistency needs explicit invocation.
- **`the-loop-has-a-name.md`**, custom-persona sim: CTO (vendor-plug risk on Ramp/Intercom anchoring), senior engineer (recognition vs remedial), engineer who never went past M1–M6 (does the scheduled-agents callout grow a need-to-try-now itch).
- **`the-loop-has-a-name.md`**, `/schedule` and `/loop` capability recheck via `claude-code-guide` within two weeks of any cohort date. Delivery-time exercise, not a content-time check.
- **`arc-retrospective.md`**, confirm Task-tool sub-task read of training-arc artefacts is reliable enough to ground the note. If flaky, route through main conversation with the same quote rule.
- **Worked-example skill triplet** (sharpened-verifier / LLM-judge / gap-finder) for Nerd's M6 reference library, by engineer archetype. First cohort outputs may seed these; track explicitly so it doesn't fall through.

## Cross-cutting maintainer-block additions (every AE101 module)

The 2026-05-03 compendium-amendment batch added rules 44–47 to `check_pedagogy.md`. Every AE101 module is currently missing the rows these rules require in maintainer blocks. Applies to `getting-going.md`, `earn-the-trust.md`, `plan-mode-done-right.md`, `run-the-first-experiment.md`, `spot-gaps-build-the-loop.md`, `learn-from-the-test.md`. One bulk pass closes all four:

- **Rule 44, Plug points + UX**: every `## Plug Points` entry names the *kind* of org context that fits (`sponsor-stated ticket tracker`, `team's CI gate`), not vague slot labels.
- **Rule 45, Per-exercise leap test**: maintainer block adds a section naming three observable Monday-morning outcomes the student exhibits on their own codebase by the next working day, in falsifiable verbs (`opens a worktree from the previous run's branch` beats `practices worktree workflow`).
- **Rule 46, Cross-module artefact contracts**: maintainer block adds a contract row for each artefact a phase produces that a later phase or module reads by stable path (`CLAUDE.local.md`, ADRs, authored skills, `plan.md`, worktree branches, eval reports, packaged subagents), naming the stable identifier, the producing prompt, and the consuming module.
- **Rule 47, Per-phase failure mode + escape hatch**: for each phase shipping a forcing function, the maintainer block names the dominant student failure mode and one escape hatch (trainer move, Nerd line, fallback prompt, maintainer-block diagnostic).

## Cross-cutting ops

- **Architecture integrity reference**, write `reference/architecture-under-agentic-velocity.md`: how teams preserve architectural intent while agents make local changes quickly. Survey practitioner patterns (Klaassen / Curran on review structure, Cherny on stop-hooks as architectural enforcement, Ramp's skill marketplace as crystallized convention). Candid about being a survey, not a settled answer. Source: Uncle Bob (Robert C. Martin) on architecture + agentic coding. Separate session.
- **Trainer post-cohort feedback capture mechanism**, design how trainer's classroom observations route into module-file edits. Today the trainer-guide line says TBD. Options to weigh: per-cohort `customer/<cohort>/notes.md` + scheduled maintainer review; GitHub issues with `[cohort-feedback]` label; informal trainer judgment + customer-surface notes. Pick before first cohort.

---

**Canonical home:** this file. Module files carry zero TODOs, all pre-cohort open items route here.

**When an item closes:** delete the bullet. Git log carries the history. Don't annotate "done", closed = gone.

**When a new item surfaces mid-session:** add it here, not in the module file.
