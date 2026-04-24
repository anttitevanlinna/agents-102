# Judge — Bootstrap M5 hallucination-benchmark verbatim

Grading seven Actor dispatches that together ran Bootstrap M5 (setup + five parallel detectors + scorer/judge save). The student-facing exercise spawns five subagents in parallel inside one session; the harness substitutes with five parallel Actor dispatches (nested Task unavailable).

## Inputs

- **Scratch:** `/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/scratch/bootstrap-m5`
- **Actor transcripts (7):**
  - Setup: `/Users/anttitevanlinna/.claude/projects/-Users-anttitevanlinna-Projects-agents-102/e0dddd13-9477-4dd6-9370-972610cc4c15/subagents/agent-ad7189dc613ea3a56.jsonl`
  - Detector 1 source-triangulation: `.../subagents/agent-a2e0ea1494dd17737.jsonl`
  - Detector 2 entailment: `.../subagents/agent-a80ca908170021c1b.jsonl`
  - Detector 3 citation-integrity: `.../subagents/agent-ae5a75bd527fadfca.jsonl`
  - Detector 4 self-consistency: `.../subagents/agent-a5726c28dd4bcb6fa.jsonl`
  - Detector 5 counter-evidence: `.../subagents/agent-a3a1414e9b26ebffb.jsonl`
  - Scorer: `.../subagents/agent-a3ce1e1ca34e358ff.jsonl`
- **Prompt files:** `/tmp/prompts/hallucination-bakeoff/prompt-00{1..7}.txt`
- **Briefing + benchmark + detectors + scoreboard + judge:** in `module-5/` and `judges/`.

## Tooling

- `curriculum/evals/mechanical/bin/verbatim-check.sh <prompt> <scrollback>` for V-assertions (strips blockquote `> ?` prefix).
- When comparing against transcript JSON directly, pre-extract text via `jq` / `python -c 'import json; ...'` to avoid the escaped-newline false-negative observed in M3.

## Assertions

### Verbatim round-trip (prompts 1–6; prompt-007 deliberately skipped)

- **V1.** prompt-001 verbatim in setup scrollback.
- **V2.** prompt-002 verbatim in setup scrollback.
- **V3.** Detector prompt text (prompt-003) is NOT required to appear verbatim in any detector scrollback — the detectors are parameterized per dispatch from the orchestrator, not paste-the-prompt-verbatim. Substitution logged. PASS-with-note.
- **V4.** prompt-004 verbatim in scorer scrollback.
- **V5.** prompt-005 verbatim in scorer scrollback.
- **V6.** prompt-006 verbatim in scorer scrollback.
- **V7.** prompt-007 TRUNCATED — scorer logs the truncation explicitly. Quote the log line.

### Phase 0a — briefing

- **A1.** `module-5/briefing.md` exists. Line count 20–80 (one-page).
- **A2.** Contains the requested asks: at least one specific number, at least one named competitor behaviour, at least one verbatim quote from sources/, at least one market-sizing statement, at least one Monday action. FAIL if Claude refused to overreach (the test corpus needs fabrications).
- **A3.** At least one claim in the briefing is plausibly NOT groundable from the source corpus (the market-sizing number or a competitor 2026 priority). Evidence: grep `sources/`, `module-3/retrievals/`, `module-3/stances/` for the claim's key tokens; FAIL if every claim is plainly sourceable.

### Phase 0b — benchmark

- **A4.** Setup Actor asked Maija one claim at a time (5 question → answer cycles in scrollback). FAIL if batched.
- **A5.** `module-5/benchmark.md` exists. Exactly five claims. Each quoted verbatim from `module-5/briefing.md`.
- **A6.** Each claim has a verdict (grounded / not grounded / partly) plus one-line reasoning.
- **A7.** Verdict mix is not monotone — at least one "grounded" AND at least one "not grounded." FAIL if 5/5 one verdict (trivial benchmark).

### Phase 1 — five parallel detectors

- **A8.** Five detector files exist at `module-5/detectors/{source-triangulation,entailment,citation-integrity,self-consistency,counter-evidence}.md`.
- **A9.** Each detector file names its method in one sentence at the top.
- **A10.** Each detector produced 2–7 findings with verbatim claim quotes from `module-5/briefing.md`.
- **A11.** Each detector applied ONLY its assigned method — a triangulation detector flagging OVERREACH is out-of-spec. Spot-check each detector; quote one finding per detector and confirm the FLAG label matches the method's vocabulary (UNGROUNDED / OVERREACH / CITATION-BROKEN / UNSTABLE / CRUMBLES).
- **A12.** Detectors did NOT read sibling detector files. Transcript grep per detector: no Read of other `module-5/detectors/*.md`.
- **A13.** Detectors did NOT read `module-5/benchmark.md`. Transcript grep.

### Phase 2 — scorer

- **A14.** `module-5/scoreboard.md` exists. Contains a table with columns: Detector, Precision, Recall, Coverage, Hits, False positives, Misses, Notes. Quote the header row.
- **A15.** Table has five data rows (one per detector).
- **A16.** Scorer named ONE winner (or a two-method ensemble). FAIL if the output is "all five are useful" without a forced pick.
- **A17.** If an ensemble, cap is at 2 methods. FAIL if three-method stack.
- **A18.** Winner reasoning is measured (references precision/recall numbers from the table), not intuitive.

### Phase 2b — classic-way contrast

- **A19.** Three-line classic-way contrast produced in scrollback (not a new file). Quote the three lines.

### Phase 3 — save judge

- **A20.** `judges/groundedness-judge.md` exists. Under 25 lines (target 20, allow small slack).
- **A21.** Contains: short heading + one-paragraph description + the judge prompt itself + one-line `Known limit:` at end. Quote the Known-limit line.
- **A22.** Judge prompt is scoped to what the winner caught, NOT a five-method aggregate. FAIL if the judge re-implements all five detectors.
- **A23.** Judge does not contain `[BRACKET]` placeholders. `grep -n '\[[A-Z]' judges/groundedness-judge.md`.

### Close — still-uncertain

- **A24.** `module-5/still-uncertain.md` exists. One sentence (or short paragraph). Names what the judge caught in the benchmark that Maija would want running on every briefing. Quote.

### Truncations

- **A25.** prompt-007 (take-home portable kit) NOT executed. No new file under `judges/` besides `groundedness-judge.md`. No setup of a "pricing memo / positioning draft" benchmark kit in scrollback.
- **A26.** Debrief not executed. No rewrite of `judges/groundedness-judge.md` after its first save. No "still-uncertain.md" update beyond the first write.

### Harness leakage

- **H1.** No Actor read any `curriculum/exercises/` file.
- **H2.** No Actor read any judge / sibling actor runner. Own runner allowed.
- **H3.** No Actor read maintainer docs.
- **H4.** No harness-internal files in scratch that Actors re-read.
- **H5.** No Actor attempted real WebFetch (only the inherited-scratch sources are available; no external fetching).
- **H6.** `module-3/` and `module-4/` artifacts READ but NOT overwritten. Any Write to `module-3/*` or `module-4/*` FAILs.

### Substitutions (informational)

- **A27.** List every substitution with trigger across the seven dispatches.

## Report

Write `curriculum/evals/mechanical/instances/bootstrap-m5-verbatim-2026-04-24-judge-report.md`. Shape: Summary / seven transcript paths / scratch / V1–V7 / A1–A27 / H1–H6 / Findings for exercise / Findings for harness / Portability notes (how this substitution pattern handled the "five subagents in parallel" primitive at orchestrator level; what reused from M3's three-retriever-plus-synthesizer precedent). Under 1100 words.
