# Slide-format sweep — AE101

Runbook for the slides-class audit + fix pass across slide-rendered AE101 files. Compendium: `memory/check_slides.md`. Judge: `curriculum/evals/judges/slides.md` via `/eval-fire slides`. Overwrite this file on rerun (latest = only truth; history is git).

## State: SWEEP COMPLETE (2026-07-08)

All tier-1 + tier-2 targets judged under compendium v2 (sequential deck read) and stamped `slides PASS` — verbatim or with a logged override note (`the-agent-loop`, `the-loop-half-filled` locked-file accept, `skills-from-the-frontier`, `open-the-side-quest`, `earn-the-trust` unverified-evidence, `learn-from-the-test`, `spot-gaps-build-the-loop` module). ~45 real fixes landed across M1–M6 during the sweep; instance JSONs in `instances/*.slides.json` carry the per-rule detail. Exceptions: `the-machine-you-just-met.md` judged PASS but carries no Quality line by design (new lecture, full six-class audit still owed). The compendium was recalibrated v1→v2 mid-sweep (per-slide isolation → sequential read + carve-outs); verdicts stamped only from v2 rounds. The "re-audit before ship" markers from the 2026-07-02 slides pass are satisfied for the slides class; the OTHER classes' stale pins on those files remain owed separately.

## Why

AE101 renders one `##` = one slide (`site/layouts/slides.js`). The 2026-07-02 slides-only re-chunk converted long-read prose to slide chunks without a per-chunk referent audit; every converted file's maintainer block says "unaudited; re-audit before ship". An M1 full-module sample (2026-07-08) found recurring per-slide failures: pronouns whose antecedent lives on the previous slide, references to beats that no longer exist, demo beats that reveal before the guess, and LLM-cadence tics. The slides class exists to catch these; this sweep applies it to the backlog.

## Targets

**Tier 1 — slides-passed lectures (16; carry "re-audit before ship" or are new-unaudited):**

- curriculum/lectures/agents-that-build-agents.md
- curriculum/lectures/how-this-training-was-built.md
- curriculum/lectures/learning-through-contrast.md
- curriculum/lectures/painting-the-picture-with-the-llm.md
- curriculum/lectures/quality-is-grounding.md
- curriculum/lectures/reading-the-return.md
- curriculum/lectures/skills-from-the-frontier.md
- curriculum/lectures/test-and-learn.md
- curriculum/lectures/the-2-frontiers.md
- curriculum/lectures/the-loop-has-a-name.md
- curriculum/lectures/the-machine-you-just-met.md
- curriculum/lectures/the-wizard-move.md
- curriculum/lectures/what-packaging-is.md
- curriculum/lectures/when-a-plan-is-good.md
- curriculum/lectures/where-the-rule-could-live.md
- curriculum/lectures/will-company-memory-emerge.md

**Tier 2 — everything else AE101 projects as slides (never had a slides pass at all):**

- Remaining AE101-referenced lectures: composing-the-workflow, ironies-of-automation, the-agent-loop, the-far-half, the-gate-is-a-claim, the-loop-half-filled, the-map-filled-in, the-whole-map (all under `curriculum/lectures/`)
- All 13 AE101-referenced exercises (`curriculum/exercises/`): author-test-strategy-skill, compound-and-close, diagnose-and-resend, extract-the-task-shaping-rule, fix-tests-first, map-the-access-surface, open-the-side-quest, orient-and-introspect, push-back-on-the-plan, spot-gaps-build-the-loop, threat-model-with-stride, walk-and-send-off
- The 6 AE101 module files + prework (`curriculum/trainings/agentic-engineering-101/`)

M1's three exercises are already known-dirty (see Calibration) — the M1 sample found violations without a slides pass ever having touched them, so tier 2 is not optional.

## Calibration — known-true findings from the M1 sample (2026-07-08)

A judge run over these files that does NOT flag these is under-sensitive; fix the judge template, not the findings. Rule numbers per `check_slides.md`.

| File | Line (approx) | Rule | Finding |
|---|---|---|---|
| lectures/painting-the-picture-with-the-llm.md | 19 | 1 | "How fast can **it** learn? … **a system like this**" — no system named on the slide |
| lectures/the-machine-you-just-met.md | 9 | 2 | Opens pointing backwards: "This is the machinery under the chameleon. **The opening lecture** said…" (cross-file, by position) |
| lectures/the-machine-you-just-met.md | 9 | 7 | Verb triplet with empty leg: "it flatters, **it progresses**, it mirrors" |
| lectures/how-this-training-was-built.md | 27 | 2 | Slide opens "**That story** is the shape you just ran" |
| lectures/how-this-training-was-built.md | 29 | 7 | "Not written from a blank page. Not a template… Yours, grown from evidence." |
| lectures/how-this-training-was-built.md | 23 | 7 | Anaphora triple, empty third leg: "Every session **reached for better scale**" |
| lectures/how-this-training-was-built.md | 17, 21 | 8 | Internal dialect on slides: "writing **surface**… **firing** at the moment it matters", "against a **compendium**" |
| lectures/the-wizard-move.md | 13 | 4 | "Take a guess before you watch the second session run" — both outcomes narrated in the bullets above |
| lectures/the-wizard-move.md | 25 | 8 | "The trick you brought to **Connections**" — maintainer vocabulary, never named in student body |
| exercises/compound-and-close.md | 65 | 3 | "the catch on **the missing PR**" — no missing-PR beat exists in M1 |
| exercises/compound-and-close.md | 77 | 1 | "**What you stored** may or may not help you" — ambiguous (rules file? window?); also "You can now clear" leans on unearned `/clear` (check_student_facing §2) |
| exercises/orient-and-introspect.md | 32–34 | 5 | Orphan slide: "Read the shape the agent reported" — one wait-state bullet |
| exercises/orient-and-introspect.md | 39 | 7 | Self-grading superlative: "one of the most useful moves in the training" |
| exercises/orient-and-introspect.md | 47 | 7 | ~~Number + retraction~~ — WITHDRAWN: maintainer-attested deliberate phrasing (see the file's maintainer block + rule 7's attest carve-out); judges accept-with-note |
| exercises/orient-and-introspect.md | 61 | 7 | Abstraction stack: "the bounded-window reality", "steer what lands in those bytes" |

## Dispatch shape

1. **Audit:** `/eval-fire slides <files>` in batches (parallel judge subagents, one per file — orchestrator pattern, disjoint files). Tier 1 first; calibration check against the table above on the M1 files before trusting tier-1 verdicts at scale.
2. **Stamp:** every verdict via `update-quality.sh <file> --slides PASS|REVISE:<note>` (script extended for the slides class 2026-07-08; slides omitted from legacy rows until first judged).
3. **Fix:** REVISE files route per eval-fire step 7 — parallel fan-out with `content-creation-brief.sh` output prepended per subagent (3+ files, disjoint, surgical), or `/content-creation` single-file for anything touching mood/arc. Referent fixes are usually one-clause restatements; demo-beat and orphan-slide fixes can reshape a chunk — those get the brief.
4. **Re-fire:** cycle-close re-run of `/eval-fire slides` on fixed files; overwrite REVISE with PASS.
5. **Neighbours:** a fix that renames a heading or cuts a beat re-checks inbound anchors (`grep -rn "<slug>#"` + module include lines).

## Open decisions (Antti)

- **Add `slides` to `/curriculum-pre-ship-audit`'s per-file class set?** Today it dispatches six classes; slides would be the seventh. Recommended: yes — slides are the default classroom render, and without it new re-chunks ship unaudited. Cost: +1 haiku/sonnet judge per file per audit.
- **Backward-reference fixes that need new prose** (e.g. compound-and-close's dead "missing PR" reference — cut, or re-anchor to a real beat?) are per-file maintainer calls at fix time, not sweep defaults.

## Done-when

Every tier-1 and tier-2 file carries `slides PASS` in its judges row, the 2026-07-02 "re-audit before ship" markers are resolved (re-audited, marker removed), and all 15 calibration findings are fixed or logged as deliberate accepts in `memory/compounded/`.
