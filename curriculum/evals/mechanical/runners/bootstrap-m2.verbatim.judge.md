# Judge — Bootstrap M2 chain verbatim

**Dispatch with `model: "haiku"`.** This is an acceptance-test judge — script-first, no taste judgements. Content quality belongs to the eval system, not here.

You are grading whether the M2 prompt chain ran end-to-end on the staged scratch and whether the file artefacts have the expected SHAPE. You are NOT grading whether memory pages are sharp, whether risks are well-grounded, whether the Paavo answer is good.

**Discipline rule (rule #20):** every assertion below ends with *"PASS on exit 0; FAIL on any non-zero exit (including script error)."* The script's exit code IS the verdict. Do NOT re-derive the assertion by reading scrollback when a script returns non-zero. If a script appears broken, capture its exit code and first-line output verbatim and mark FAIL.

## Inputs

- **Scratch:** `/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/scratch/bootstrap-m2`
- **Actor transcript:** `<ACTOR_TRANSCRIPT_PATH>`
- **Actor report:** `curriculum/evals/mechanical/instances/bootstrap-m2-verbatim-actor-report.md`
- **Actor scrollback:** `curriculum/evals/mechanical/instances/bootstrap-m2-verbatim-actor-scrollback.md`
- **Prompt files:** `/tmp/prompts/name-your-challenge/prompt-00{1,2}.txt` + `/tmp/prompts/build-your-challenge-memory/prompt-00{1..9}.txt`
- **Mock library:** `/tmp/bootstrap-mocks/{confluence,onedrive,practitioners}/`

## Tooling

- `bin/prompt-read-check.sh <prompt> <transcript.jsonl>` — V-checks (transcript-based, replaces scrollback grep)
- `bin/prompt-source-audit.sh <slug>` — P/E checks (static lint)
- `bin/runner-mapping-check.sh <runner> <exercise>` — pre-flight (called twice; once per exercise)
- `jq` / `grep` / `test -f` / `wc -l` for shape sampling

## Method

For every assertion: run the named script, capture exit code + first line of stdout. PASS on exit 0; FAIL on any non-zero exit. No quoting, no narration, no taste calls. If you find yourself reading scrollback to judge whether content is "good," stop — that's not your job.

## Assertions

### Verbatim round-trip (V1–V11)

For each prompt file, run `bin/prompt-read-check.sh <prompt> <ACTOR_TRANSCRIPT_PATH>`. The transcript records every Read; a `Read` of `prompt-NNN.txt` is unforgeable evidence the model received the prompt content unmodified. Replaces the older scrollback-grep approach (which depended on Actor discipline to blockquote-paste).

- **V1.** name-your-challenge prompt-001 (Q1-Q3 challenge brief).
- **V2.** name-your-challenge prompt-002 (source preview).
- **V3.** build-your-challenge-memory prompt-001 (curate).
- **V4.** build-your-challenge-memory prompt-002 (ingest).
- **V5.** build-your-challenge-memory prompt-003 (build memory).
- **V6.** build-your-challenge-memory prompt-004 (audit self).
- **V7.** build-your-challenge-memory prompt-005 (author agent).
- **V8.** build-your-challenge-memory prompt-006 (use agent).
- **V9.** build-your-challenge-memory prompt-007 (compound).
- **V10.** build-your-challenge-memory prompt-008 (self-maintain).
- **V11.** build-your-challenge-memory prompt-009 (final invocation).

PASS on exit 0; FAIL on any non-zero exit.

### File-existence + shape (A-series)

- **A1.** `./challenge.md` exists. `test -f <scratch>/challenge.md`. PASS on exit 0; FAIL on any non-zero exit.
- **A2.** `sources/` has between 9 and 11 files (9 ingested + 1 compound + slack for renames). `n=$(ls <scratch>/sources/ | wc -l); [[ $n -ge 9 && $n -le 11 ]]`. PASS on exit 0; FAIL on any non-zero exit.
- **A3.** Each `sources/` file has a header naming path/URL + title. Sample 2 files; for each, `grep -E '^(- \*\*URL / path|- \*\*Title|path:|url:)' <file>` should exit 0. PASS on exit 0; FAIL on any non-zero exit.
- **A4.** `memory/index.md` exists AND `memory/` has 5-8 topic pages (excluding index + soft-pages). `test -f <scratch>/memory/index.md && n=$(find <scratch>/memory -name '*.md' -not -name 'index.md' -not -name 'soft-pages.md' | wc -l); [[ $n -ge 4 && $n -le 10 ]]`. PASS on exit 0; FAIL on any non-zero exit.
- **A5.** Memory pages cite `[sources/...]`. Sample one topic page (not index, not soft-pages); `grep -c '\[sources/' <file>` ≥ 1. PASS on exit 0; FAIL on any non-zero exit.
- **A6.** `agents/monday-risks.md` exists AND has no `[BRACKET]` placeholders. `test -f <scratch>/agents/monday-risks.md && ! grep -nE '\[[A-Z][A-Z_]+\]' <scratch>/agents/monday-risks.md`. PASS on exit 0; FAIL on any non-zero exit.
- **A7.** Hard-line rule about `maija-prep-notes-skeptics.md` present in `agents/monday-risks.md`. `grep -F 'maija-prep-notes-skeptics' <scratch>/agents/monday-risks.md`. PASS on exit 0; FAIL on any non-zero exit.
- **A8.** Phase 9 added one source: `sources/skeptics-thread-paavo.md` exists. `test -f <scratch>/sources/skeptics-thread-paavo.md`. PASS on exit 0; FAIL on any non-zero exit.
- **A8b.** Memory was updated in Phase 9 (not rebuilt): `memory/index.md` mentions skeptic / forcing-function or similar topic and the file's mtime is later than at least one topic page's mtime. Heuristic: `[[ $(stat -f %m <scratch>/memory/index.md) -ge $(stat -f %m <scratch>/memory/$(ls <scratch>/memory/ | grep -v -E 'index|soft-pages' | head -1)) ]]`. PASS on exit 0; FAIL on any non-zero exit.

### One-at-a-time (anti-question-dump)

- **A9.** Phase 1 walked Q1-Q3 separately. `jq` count of distinct assistant turns between the prompt-001 paste anchor and the `challenge.md` Write should be ≥ 3. Heuristic via scrollback: count `^### Q[123] —` or `^**Q[123]` lines in the Phase 1 section. ≥ 3 expected. PASS on exit 0; FAIL on any non-zero exit.
- **A10.** Phase 7 walked Q1 then Q2 separately (≥ 2 distinct assistant turns between prompt-005 paste and `agents/monday-risks.md` Write). Same heuristic. PASS on exit 0; FAIL on any non-zero exit.

### Substitutions logged

- **A11.** Mock-connector substitution log present in scrollback. `grep -c 'harness substitution.*mock' <scrollback>` ≥ 1. PASS on exit 0; FAIL on any non-zero exit.
- **A12.** Plan-mode substitution logged. `grep -c 'harness substitution.*plan' <scrollback>` ≥ 1. PASS on exit 0; FAIL on any non-zero exit.

### Harness leakage (H1–H6)

- **H1.** `jq` transcript for Read of `curriculum/exercises/`: `jq -c 'select(.message.content[]?.input.file_path? | tostring | test("curriculum/exercises/"))' <jsonl>`. Exit 0 if no matches; non-zero output → FAIL.
- **H2.** No Read of judge or sibling actor runner (own actor allowed). Same `jq` shape, pattern `runners/.*\.(judge|actor)\.md`, then exclude own actor by name. PASS if no other runner Reads.
- **H3.** No Read of `*.maintainer.md`. Same `jq` shape with pattern `\.maintainer\.md`. PASS if no matches.
- **H4.** No real WebFetch on mock URLs. `jq -c 'select(.message.content[]?.type? == "tool_use" and .message.content[]?.name? == "WebFetch")' <jsonl>` — list URL inputs. FAIL if any URL matches a mock-library `url:` header (`alasaarela.example`, `klaassen.example`, `karpathy.com`, the Karpathy twitter URL).
- **H5.** Debrief truncation held: `test ! -f <scratch>/CLAUDE.md && test ! -f <scratch>/crux.md`. PASS on exit 0; FAIL on any non-zero exit.
- **H6.** `ls <scratch>` matches expected: `module-1/`, `module-2/`, `memory/`, `sources/`, `agents/`, `challenge.md`. Anything else → FAIL. Use `ls <scratch> | sort` and compare against the expected sorted list.

### Pre-flight + prompt-source audits

- **PF1.** `bin/runner-mapping-check.sh runners/bootstrap-m2.verbatim.actor.md curriculum/exercises/name-your-challenge.md`. PASS on exit 0; FAIL on any non-zero exit.
- **PF2.** `bin/runner-mapping-check.sh runners/bootstrap-m2.verbatim.actor.md curriculum/exercises/build-your-challenge-memory.md`. PASS on exit 0; FAIL on any non-zero exit.
- **PS1.** `bin/prompt-source-audit.sh name-your-challenge`. PASS if `READY` or `READY-WITH-FLAGS` in stdout; FAIL on `BLOCK`.
- **PS2.** `bin/prompt-source-audit.sh build-your-challenge-memory`. Same rule.

## Report

Write `curriculum/evals/mechanical/instances/bootstrap-m2-verbatim-judge-report.md`:

```markdown
# Judge report — Bootstrap M2 verbatim

## Summary
Verdict: PASS | FAIL (N/M assertions). Sev-1 from PS audits: K.

## V1–V11 (verbatim-check.sh)
V1: PASS — exit 0, <prefix>
...

## A-series (mechanics + continuation)
A1: PASS — file present, exit 0
...

## H-series (harness leakage)
H1: PASS — no Read of curriculum/exercises/
...

## Pre-flight + prompt-source audits
PF1: PASS — runner-mapping-check exit 0
PF2: PASS — exit 0
PS1: PASS — READY-WITH-FLAGS
PS2: PASS — READY
```

Under 500 words. No quoting beyond what scripts emit.

## What you must NOT do

- Quote a sentence from a memory page and judge if it's "distinctive."
- Decide whether the Paavo answer reads as "well-grounded."
- Read `agents/monday-risks.md` to evaluate voice.
- Re-derive an assertion when its script returns non-zero — that's a FAIL by definition (rule #20).
- Compare phases qualitatively beyond the diff-bound continuity check.

If an assertion can't be reduced to a script call or a `jq`/`grep` one-liner, drop it and flag the gap as a script-ratchet TODO.
