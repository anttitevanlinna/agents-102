# Mechanical-test framework — next-session state

**Last updated:** 2026-05-02 (end-of-session checkpoint)

## Bootstrap battery — current verdict

| Module | Verdict | Notes |
|---|---|---|
| M1 | **PASS (all)** | scratch/bootstrap-m1 fresh, transcript at agent-a5eee81b697b442e7 |
| M2 | **PASS 24/24** | scratch/bootstrap-m2, agent-ae3e86db4a3188df6 (Actor) + adcfa123bf9618922 (Judge re-run) |
| M3 | **PASS 18/18** | 4 actors (wiki/docs/internet/synthesizer) + inline Judge battery |
| M4 audit | not yet | scratch pre-staged from M3 |
| M4 author | **runner broken** | stale `author-security-plugin` slug + nonstandard prompt suffixes (see below) |
| M5 setup/detector/scorer | not yet | scratch pre-staged provisionally |
| M6 setup/run | not yet | scratch pre-staged provisionally |

## Known bugs to fix before dispatching

### M4 author runner — stale exercise reference (BLOCKER)

`bootstrap-m4-author.verbatim.actor.md` references `/tmp/prompts/author-security-plugin/prompt-{001,002,003,004-cli,005-verify}.txt`. Two problems:

1. **Exercise was renamed.** No `curriculum/exercises/author-security-plugin.md` — the live file is `author-security-skill.md`. Same fix as M3 needed: bulk substitute `author-security-plugin` → `author-security-skill` in actor + judge.

2. **Nonstandard prompt suffixes.** `parse-prompts.sh` produces sequential `prompt-NNN.txt` files. The runner's `prompt-004-cli.txt` and `prompt-005-verify.txt` don't exist — `parse-prompts.sh` will produce `prompt-001/002/003.txt` only (3 prompts in the new file). Either:
   - The new exercise was simplified from 5 prompts to 3 — revise the runner to match.
   - Or the suffixed naming was a custom convention that needs `parse-prompts.sh` extending.
   
   Recommendation: revise runner to walk the 3 actual prompts. Drop the "-cli" and "-verify" phases (likely consolidated into the main prompts on the rename).

### Likely Judge-runner brittleness in M4-M6 (preventive)

Same pattern hit M2 + M3:
- `### Phase` regex when Actor writes `## Phase` — generalise to `^#{2,3} Phase`.
- Case-sensitive grep on title-case English headings — switch to `grep -i*`.
- Word caps tighter than Haiku stub realism — bump to 1.5× spec.

These all go in the Judge runners' assertion language. Easiest pattern: dispatch + diagnose, patch as the failures surface.

### Substitute-paste assertions in M1 still use `verbatim-check.sh` (low priority)

M1 PASSES with `verbatim-check.sh` because all 6 prompts are long enough that Haiku didn't optimization-shortcut. The migration from `verbatim-check.sh` → `prompt-read-check.sh` is a code-cleanup move; not blocking M4-M6.

## Pre-staged state (deterministic)

- `/tmp/bootstrap-mocks/` — 12-file fixture re-staged via `bin/stage-bootstrap-mocks.sh`.
- `/tmp/prompts/audit-your-agent/` (4), `/author-security-skill/` (3), `/hallucination-bakeoff/` (7), `/eval-loop/` (8). Plus M2-M3 chain.
- `scratch/bootstrap-m4/` — copied from M3 final state + empty `module-4/` (30 files).
- `scratch/bootstrap-m5/` — copied from M4 placeholder + `module-5/detectors/` (30 files; will be re-staged from real M4 output once M4 runs).
- `scratch/bootstrap-m6/` — copied from M5 placeholder + `module-6/judges/` (30 files; same pattern).

## Dispatch order for next session

1. Patch M4 author runner (rename + drop suffixed prompts).
2. Re-stage M4 scratch from M3 (any time prior to dispatch).
3. Dispatch M4 audit + M4 author (parallel; disjoint output files in `module-4/`).
4. Run inline Judge battery against both transcripts.
5. Re-stage M5 scratch from M4 final state.
6. Dispatch M5 setup. Then in parallel: M5 detector + M5 scorer.
7. Inline Judge.
8. Re-stage M6 scratch from M5 final state.
9. Dispatch M6 setup, then M6 run.
10. Inline Judge.

## Universal discipline (codified this session)

- Slugs in chain-runner `### Phase N — slug` headings must contain words that uniquely appear in the referenced prompt's content (pre-flight catches collisions).
- V-checks via `bin/prompt-read-check.sh <prompt> <transcript>` — transcript Reads are unforgeable; scrollback grep is theatre that Haiku skips on short mid-chain prompts.
- Tracked mock fixtures under `playgrounds/bootstrap-mocks/`; staged via `bin/stage-bootstrap-mocks.sh`. Never trust `/tmp` to persist.
- Judge regex: `grep -i*` for English headings (Actors title-case).
- Word caps in Judge: 1.5× the spec to allow Haiku stub overshoot.
- Heading-depth regex: `^#{2,3} Phase` (Actors choose between `##` and `###`).
- Per rule #20: `PASS on exit 0; FAIL on any non-zero` — Judge does NOT re-derive from scrollback when a script returns non-zero.

## Script ratchet — what `bin/` now contains

```
bin/
├── continuation-diff.sh           HTML-aware v-N → v-N+1 continuity
├── migrate-judges-to-prompt-read.sh  bulk migration scaffold (M2 only — needs different match strategy for abstract V-check refs)
├── no-write-between-reads.sh      A16-style assertion
├── preflight-all.sh               survey every actor runner's verdict at once
├── prompt-read-check.sh           V-checks via transcript jq for Read of prompt-NNN.txt
├── prompt-source-audit.sh         P/E lint on curriculum source
├── run-mechanical.sh              one-shot orchestrator: pre-flight + parse + stage + audit
├── runner-mapping-check.sh        chain-runner aware pre-flight + coverage check
├── stage-bootstrap-mocks.sh       playground → /tmp fixture stage
└── verbatim-check.sh              substitute-paste check (linkedin / hate-list etc.) — kept; not for prompts
```

Aspirational endpoint: `bin/judge.sh <runner-slug>` runs the full per-module assertion battery with no LLM Judge dispatch. Inline-Judge pattern for M1+M3 demonstrated this is achievable for verifiable assertions; remaining LLM use is for content-quality grades that belong in the eval system, not here.
