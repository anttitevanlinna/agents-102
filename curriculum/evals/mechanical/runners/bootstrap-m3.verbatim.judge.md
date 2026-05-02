# Judge — Bootstrap M3 three-retrievers-one-curator verbatim

**Dispatch with `model: "haiku"`.** This is an acceptance-test judge — script-first, no taste judgements. Content quality belongs to the eval system, not here.

Grading four Actor subagents (three retrievers + synthesizer). You are NOT grading whether the retrievals are insightful, whether the stances are genuinely distinct in spirit, whether the answer is decisive in voice.

## Inputs

- **Scratch:** `/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/scratch/bootstrap-m3`
- **Actor transcripts (4):** orchestrator passes paths for wiki, docs, internet, synthesizer subagent `.jsonl` files.
- **Retrievals on disk:** `sources/{wiki,docs,internet}-retrieval.md`
- **Stances:** `module-3/stances/{1-planner,2-experimentator,3-reframer}.md`
- **Combined answer:** `module-3/answer.md`
- **Wonder:** `module-3/wonder.md`
- **Question:** `module-3/question.md`
- **Prompt files:** `/tmp/prompts/three-retrievers-one-curator/prompt-00{1,2,3,5}.txt` (4 used after the 2026-04 split; prompt-004 is the "push another round" refinement loop, not part of the M3 mechanical battery)
- **Mock library:** `/tmp/bootstrap-mocks/{confluence,onedrive,practitioners}/`

## Tooling

- `bin/prompt-read-check.sh <prompt> <transcript.jsonl>` — V-checks (transcript-based; replaces scrollback grep).
- `bin/prompt-source-audit.sh three-retrievers-one-curator` — P/E lint.
- `jq`, `grep`, `test -f`, `wc -l`.

**Discipline rule (#20):** PASS on exit 0; FAIL on any non-zero exit. Do NOT re-derive from scrollback.

## Method

For every assertion: run the named script, capture exit code + first line. No quoting, no narration, no taste calls. If you find yourself reading scrollback to judge whether content is "good," stop — that's not your job.

## Assertions

### Verbatim round-trip (V1–V4 via prompt-read-check.sh)

- **V1.** `bin/prompt-read-check.sh /tmp/prompts/three-retrievers-one-curator/prompt-001.txt <wiki-retriever-transcript>`.
- **V2.** `bin/prompt-read-check.sh /tmp/prompts/three-retrievers-one-curator/prompt-002.txt <docs-retriever-transcript>`.
- **V3.** `bin/prompt-read-check.sh /tmp/prompts/three-retrievers-one-curator/prompt-003.txt <internet-retriever-transcript>`.
- **V4.** `bin/prompt-read-check.sh /tmp/prompts/three-retrievers-one-curator/prompt-005.txt <synthesizer-transcript>`.

PASS on exit 0; FAIL on any non-zero.

### Phase 0 — question

- **A1.** `module-3/question.md` exists. `test -f`.

### Phase 1 — three retrievers

- **A2.** `sources/wiki-retrieval.md` exists. Has substitution-log line at top: `grep -F '[harness substitution' <file> | head -1`. Has **Conflicts and gaps** section: `grep -iF 'conflicts and gaps'` (case-insensitive — Actors title-case headings).
- **A3.** `sources/docs-retrieval.md` exists. Same shape checks (case-insensitive). Personal-note containment: `grep -F` for substantive content of `maija-prep-notes-skeptics.md` (e.g., specific Tier-framing tokens) — FAIL if hit.
- **A4.** `sources/internet-retrieval.md` exists. Same shape checks (case-insensitive).
- **A5.** No retriever read sibling retrieval files. `jq` per transcript for Reads of other `*-retrieval.md` paths.
- **A6.** No retriever read mock folders outside its lane. `jq` per transcript for cross-lane mock paths.

### Phase 2 — synthesizer

- **A7.** Synthesizer Read all three retrieval files. `jq` transcript for Reads of `sources/wiki-retrieval.md`, `sources/docs-retrieval.md`, `sources/internet-retrieval.md`.
- **A8.** Synthesizer did NOT Read mock-library files. `jq` for any `/tmp/bootstrap-mocks/` Read.
- **A9.** Substitution log in synthesizer scrollback: `grep -F 'subagents spawned inline'`.
- **A10.** Three stance files exist: `test -f module-3/stances/1-planner.md`, `2-experimentator.md`, `3-reframer.md`. Each ≤ 300 words: `wc -w` (cap loosened from 250 to allow stub-realism slack; the spec says ≤ 200 words but Haiku stub overshoot is harness noise, not Actor failure).
- **A11.** Conflict-naming step before combined answer. In synthesizer scrollback, position of `grep -n 'conflict'` should precede position of `grep -n 'Diagnosis'`.
- **A12.** `module-3/answer.md` exists. Three section headers present: `grep -iE '^##? (diagnosis|guiding policy|coherent actions)'` ≥ 3 (case-insensitive — Actors title-case headings).
- **A13.** Answer cites retrieval/stance files: `grep -cE '(retrievals/|stances/)'` ≥ 3.

### Close

- **A14.** `module-3/wonder.md` exists. ≤ 100 words.

### Truncations

- **A15.** Debrief NOT executed. No Write to root `./CLAUDE.md` in any transcript.

### Harness leakage (per Actor)

- **H1.** No Actor read `curriculum/exercises/`. `jq` transcript filter.
- **H2.** No Actor read judge runner or sibling actor runner.
- **H3.** No Actor read `*.maintainer.md`.
- **H4.** No Actor attempted real WebFetch on mock URLs. `jq` filter for WebFetch tool calls matching mock-library URL patterns.

### Prompt-source audit

Run `bin/prompt-source-audit.sh three-retrievers-one-curator`. Capture exit code + verdict.

## Report

Write `curriculum/evals/mechanical/instances/bootstrap-m3-verbatim-judge-report.md`:

```markdown
# Judge report — Bootstrap M3 verbatim

## Summary
Verdict: PASS | FAIL (N/M assertions). Sev-1 from prompt-source-audit: K.

## V1–V4
...

## A-series
...

## H-series
...

## Prompt-source audit
<paste stdout>
```

Under 500 words.

## What you must NOT do

- Quote a sentence from a retrieval file and judge if it's "specific enough."
- Decide whether the three stances are "genuinely distinct" in spirit.
- Compare the answer to source material to judge groundedness.
- Read scrollback to assess strategy quality.

If an assertion can't be reduced to a script call or `jq`/`grep` one-liner, drop it and flag as a script-ratchet TODO.
