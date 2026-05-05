# Claude Basics, pre-cohort TODOs

Tracking surface for known TODOs that must clear before the first paying cohort runs. AE101 convention (per `curriculum/CLAUDE.md` § Quality-state tagging): module files carry zero floating TODOs; this file is the single tracking surface.

Update each row when the TODO clears (mark DONE + date + sha).

## Today's audit and fix cycle (2026-05-05)

The strategy restructure on 2026-04-30 introduced three new module wrappers (live repo demo + live crux + homework launch) and reshaped the underlying exercises. Quality state on most files dropped to `draft`. On 2026-05-05 a fresh-eyes review surfaced fix-list items, edits landed, then `/curriculum-pre-ship-audit` fired the four class-judges across the eight files. All eight files returned BLOCK; today's edits resolved the BLOCKING findings. Re-fire of the four class-judges is the remaining gate.

| File | Audit verdict (2026-05-05 first fire) | Fix shipped today | Action remaining |
|---|---|---|---|
| `curriculum/trainings/claude-basics/agentic-systems-repo-demo.md` | story REVISE (cohort-management cue line 21) | "Hold two answers in the room" rewritten to a contrast invitation | re-fire four class-judges |
| `curriculum/trainings/claude-basics/where-is-this-all-going.md` | story REVISE (Close in completion register; teaching-moment under-named); technical TODO (Rumelt citation needs URL) | Close rewritten for forward register; "Chat level in" fragment dropped | re-fire four class-judges + add Rumelt source URL to maintainer block |
| `curriculum/trainings/claude-basics/homework-build-and-verify.md` | behavior REVISE (summary prompt: preamble + overwrite-anxiety + self-report-inflation) | Summary prompt sharpened: "matters most" → "changed the most answers (be specific, not complimentary)" + overwrite instruction | re-fire four class-judges |
| `curriculum/exercises/build-your-system.md` | technical REVISE (CLAUDE.md auto-load claim flagged as unverified, false positive, capability is real per Cowork notes); story REVISE (Phase 1+3 mood floor; forcing functions in body); behavior REVISE (P2/P4/P5 self-audit-charity carve-out) | Phase 1: added Claude-audits-Claude prompt. Phase 3: replaced "Trust the summary" with push-back move + overwrite | re-fire four class-judges |
| `curriculum/exercises/the-it-directors-prompt.md` | story REVISE (Phase 1 push-back criteria in body); behavior REVISE (P1/P3/P4 self-audit-charity carve-out) | Phase 1 push-back criteria moved into prompt fence | re-fire four class-judges |
| `curriculum/exercises/organisers-prepare-claude-basics.md` | technical REVISE (missing CLAUDE.md in shared workshop folder, rule 7a); behavior REVISE (P2 append-vs-integrate, P3 niceness-tax) | Phase 2 step added: create CLAUDE.md at workshop folder root naming SharePoint runtime + eventual consistency. Phase 2 cross-pollination + Phase 3 readout sharpened in-prompt | re-fire four class-judges |
| `curriculum/exercises/organisers-synthesize-rollout.md` | behavior REVISE (P1 niceness-tax on "useful disagreement") | "useful disagreement" → "the sharpest disagreement, even if uncomfortable" + priorities-as-problems framing | re-fire four class-judges |
| `curriculum/lectures/agentic-systems-demo-script.md` | writing REVISE (line 13 third-person student framing); technical TODO (line 17 auto-load qualification) | "the cohort" → "the room" | re-fire four class-judges |

The find-the-crux exercise (`curriculum/exercises/find-the-crux.md`) is `compendium-audited 2026-05-05 @edf18d5` and was not in this audit cycle. See its own maintainer block for the maintainer-accepted Cowork-loop capability claim and the queued mechanical re-run below.

## Maintainer-block additions queued

These are non-blocking but improve trainer rehearsal-passability and source provenance. Not gating ship.

- `where-is-this-all-going.md`: add Rumelt source URL in a maintainer-block source-verification row.
- `agentic-systems-demo-script.md`: add failure-mode + escape-hatch rows for Steps 6 (define "tiny" change), 7 (build-fail fallback), 11 (canonical loop-naming line).
- `homework-build-and-verify.md`, `build-your-system.md`, `the-it-directors-prompt.md`: leap tests + per-phase failure-mode rows (story-judge rules 45 + 47).

## Maintainer-accepted capability claims needing mechanical re-run

| Claim | File | Status | Action |
|---|---|---|---|
| Cowork loop capability, Phase 3 prompt asks Claude to run cycles continuously without re-prompt and detect "new sections since last check" | `curriculum/exercises/find-the-crux.md` Phase 3 | Maintainer-accepted per `memory/compounded/2026-05-04-platform-cowork-capabilities-ui-and-rename.md`. Existing mechanical row 2026-04-28 @ c25d7c4 is STALE | Re-run mechanical harness against the reshaped Phase 3 cross-pollination prompt before the first cohort |

## How to clear

1. Re-fire `/curriculum-pre-ship-audit` against the eight files. Confirm all four class-judges PASS.
2. Re-fire mechanical on the find-the-crux Phase 3 prompt.
3. Address the maintainer-block additions queued above.
4. Update each file's Quality block when its row clears; flip the row in this file to DONE + date + sha.
5. Re-read this file before the cohort runs. The workshop is ready when every row is DONE.
