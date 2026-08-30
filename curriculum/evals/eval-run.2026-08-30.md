# Eval run — 2026-08-30 (in flight)

Scratch state for a run that spans a compaction. Delete when the queue is clear.

## Scope, and how it was narrowed

`npm run board -- --training ae101` reported 112 owing (file,class) pairs. Three
buckets, only one of which is judgeable:

| bucket | pairs | disposition |
|---|---|---|
| `check_slides §10` rule-drift | 34 | **Re-read the rule, do not re-judge** — the board says so in its own output. The rule moved today; the amendment is mine. |
| Body identical since that class's pin | 44 | Tier markers, backing ledger, maintainer notes. Nothing a judge reads changed. |
| Body genuinely moved since pin | 34 | Real. Narrowed to 15 below, Antti's call. |

Method for the split: for each pair, `git show <class-pin-sha>:<file>` vs HEAD,
comparing the **student-facing body only** — `stripMaintainerTail`, backing ledger
cut, `<!--tier:N-->` lines dropped, blank runs collapsed. Not the raw diff, which
counts a comment insertion as a body change and is what makes a marker pass look
like 5 stale classes.

**Not one of the 34 is from this session's tier tagging.** Long-read text hashes
identical to the pre-tagging build (`9770880206a8`, 2673 blocks either side).
The debt is the 2026-08-29 cut pass plus older supplementary/reference edits.

**Narrowed (Antti, 2026-08-30):** fire the 6 module bodies + 3 lectures this
week's work touched. The 6 supplementaries + 2 references (19 pairs, `writing` +
`slides`) predate the session — they go on the punch list, not this run.

## The 15 pairs

| file | classes |
|---|---|
| `trainings/agentic-engineering-101/earn-the-trust.md` | pedagogy, strategy |
| `trainings/agentic-engineering-101/getting-going.md` | pedagogy, strategy |
| `trainings/agentic-engineering-101/learn-from-the-test.md` | story, pedagogy |
| `trainings/agentic-engineering-101/plan-mode-done-right.md` | strategy |
| `trainings/agentic-engineering-101/run-the-first-experiment.md` | story, pedagogy |
| `trainings/agentic-engineering-101/spot-gaps-build-the-loop.md` | story, pedagogy, strategy |
| `lectures/skills-from-the-frontier.md` | pedagogy |
| `lectures/the-loop-half-filled.md` | story |
| `lectures/when-a-plan-is-good.md` | story |

## Contract

Judges read `curriculum/evals/judges/_dispatch-preamble.md` in full. Read-only on
every curriculum source — the only write is the class's own instance JSON plus its
prefill sidecar. The orchestrator applies findings and stamps the Quality block;
a judge that stamps produces a `body_sha` matching no commit.

## After the run — orchestrator checklist

1. `node curriculum/evals/scripts/check-instance-evidence.js <instances>` — a
   skim is visible in the evidence, never in the summary.
2. Compare tool-call count to file count.
3. Apply findings, THEN stamp: `curriculum/evals/scripts/update-quality.sh`.
4. Re-run `npm run board -- --training ae101`.
5. Punch list: the 19 supplementary/reference pairs left out of this run.
