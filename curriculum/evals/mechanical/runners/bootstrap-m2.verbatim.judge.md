# Judge — Bootstrap M2 chain verbatim

**Dispatch with `model: "haiku"`.** This is an acceptance-test judge — script-first, no taste judgements. Content quality belongs to the eval system, not here.

You are grading whether the M2 prompt chain ran end-to-end on the staged scratch and whether the file artefacts have the expected SHAPE. You are NOT grading whether memory pages are sharp, whether risks are well-grounded, whether the Paavo answer is good.

## Inputs

- **Scratch:** `/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/scratch/bootstrap-m2`
- **Actor transcript:** `<ACTOR_TRANSCRIPT_PATH>`
- **Actor report:** `curriculum/evals/mechanical/instances/bootstrap-m2-verbatim-actor-report.md`
- **Actor scrollback:** `curriculum/evals/mechanical/instances/bootstrap-m2-verbatim-actor-scrollback.md`
- **Prompt files:** `/tmp/prompts/name-your-challenge/prompt-00{1,2}.txt` + `/tmp/prompts/build-your-challenge-memory/prompt-00{1..11}.txt`
- **Mock library:** `/tmp/bootstrap-mocks/{confluence,onedrive,practitioners}/`

## Tooling

- `curriculum/evals/mechanical/bin/verbatim-check.sh <prompt> <scrollback>` — V-checks
- `curriculum/evals/mechanical/bin/prompt-source-audit.sh build-your-challenge-memory` and `name-your-challenge` — P/E checks
- `jq` / `grep` / `test -f` / `wc -l` for shape sampling

## Method

For every assertion: run the named script, capture exit code + first line. No quoting, no narration, no taste calls. If you find yourself reading scrollback to judge whether content is "good," stop — that's not your job.

## Assertions

### Verbatim round-trip (V1–V13)

- **V1–V2.** name-your-challenge prompt-001, prompt-002 via `verbatim-check.sh`.
- **V3–V13.** build-your-challenge-memory prompt-001 through prompt-011.

### File-existence + shape

- **A1.** `./challenge.md` exists. `test -f`.
- **A2.** `sources/` has ≥ 8 files. `ls sources/ | wc -l` ≥ 8.
- **A3.** Each `sources/` file has a header naming path/URL + title. Sample 2 files; `grep -E '^(path|url|title):'` should hit.
- **A4.** `memory/index.md` exists. `memory/` has 5-8 topic pages (excluding index + soft-pages). `find memory -name '*.md' -not -name 'index.md' -not -name 'soft-pages.md' | wc -l` between 4 and 10.
- **A5.** Memory pages cite `[sources/...]`. Sample one page; `grep -c '\[sources/'` ≥ 1.
- **A6.** `agents/monday-risks.md` exists. No `[BRACKET]` placeholders: `grep -nE '\[[A-Z][A-Z_]+\]'` returns nothing.
- **A7.** Hard-line rule about `maija-prep-notes-skeptics.md` present in `agents/monday-risks.md`: `grep -F 'maija-prep-notes-skeptics'`.
- **A8.** Phase 3 added one source: `ls sources/ | wc -l` increased to ~10.

### One-at-a-time (anti-question-dump)

- **A9.** Ex1 walked Q1-Q3 separately. Between prompt-001 paste and `challenge.md` Write, count distinct assistant turns. Expect ≥ 3. FAIL if a single turn fires ≥ 3 questions.
- **A10.** Ex2 Phase 2 walked Q1 then Q2 separately. Between prompt-005 paste and `agents/monday-risks.md` Write, ≥ 2 distinct assistant turns.

### Substitutions logged

- **A11.** Mock-connector substitution log present in scrollback. `grep -c 'harness substitution' <scrollback>` ≥ 1.
- **A12.** Plan-mode substitution logged. `grep -c 'plan mode' <scrollback>` ≥ 1.

### Continuation between phases

- **A13.** Memory pages updated in Phase 3 (not rebuilt): for one page identified by Actor as "sharpened," `diff` against pre-Phase-3 state should be > 0 lines AND < 80% of original. Reconstruct pre-state from transcript Write calls; if not feasible, note as `SCRIPT-RATCHET TODO`.

### Harness leakage (H1–H6)

- **H1.** `jq` transcript for Read of `curriculum/exercises/`. FAIL if hit.
- **H2.** No Read of judge or sibling actor runner (own actor allowed).
- **H3.** No Read of `*.maintainer.md`.
- **H4.** No real WebFetch on mock URLs. Filter transcript for `WebFetch` tool calls; FAIL if any URL matches a mock-library `url:` header.
- **H5.** Debrief truncation held: `test ! -f <scratch>/CLAUDE.md` AND `test ! -f <scratch>/crux.md`.
- **H6.** `ls <scratch>` matches expected: `module-1/`, `module-2/`, `memory/`, `sources/`, `agents/`, `challenge.md`. Anything else → FAIL.

### Prompt-source audits

Run `bin/prompt-source-audit.sh name-your-challenge` and `bin/prompt-source-audit.sh build-your-challenge-memory`. Capture exit code + verdict. PASS if `READY` or `READY-WITH-FLAGS`; FAIL on `BLOCK`.

## Report

Write `curriculum/evals/mechanical/instances/bootstrap-m2-verbatim-judge-report.md`:

```markdown
# Judge report — Bootstrap M2 verbatim

## Summary
Verdict: PASS | FAIL (N/M assertions). Sev-1 from prompt-source-audits: K.

## V1–V13 (verbatim-check.sh)
V1: PASS — <prefix>
...

## A-series (mechanics + continuation)
A1: PASS — file present
...

## H-series (harness leakage)
H1: PASS — no Read of curriculum/exercises/
...

## Prompt-source audits
<paste both scripts' stdout>
```

Under 500 words. No quoting beyond what scripts emit.

## What you must NOT do

- Quote a sentence from a memory page and judge if it's "distinctive."
- Decide whether the Paavo answer reads as "well-grounded."
- Read `agents/monday-risks.md` to evaluate voice.
- Compare phases qualitatively beyond the diff-bound continuity check.

If an assertion can't be reduced to a script call or a `jq`/`grep` one-liner, drop it and flag the gap as a script-ratchet TODO.
