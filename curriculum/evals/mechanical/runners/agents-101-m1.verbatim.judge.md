# Judge — Agents 101 M1 personal-site-with-guardrails verbatim

**Dispatch with `model: "haiku"`.** This is an acceptance-test judge — script-first, no taste judgements. Content quality belongs to the eval system, not here.

You are grading whether the M1 prompt chain ran end-to-end on a clean scratch and whether the file artefacts have the expected SHAPE. You are NOT grading whether the HTML is good, whether the strengths are specific enough, whether the rules-file reads well. Those are eval-system concerns.

## Inputs

- **Scratch:** `curriculum/evals/mechanical/scratch/agents-101-m1`
- **Actor transcript:** `<ACTOR_TRANSCRIPT_PATH>`
- **Actor report:** `curriculum/evals/mechanical/instances/agents-101-m1-verbatim-actor-report.md`
- **Actor scrollback:** `curriculum/evals/mechanical/instances/agents-101-m1-verbatim-actor-scrollback.md`
- **Prompt files:** `/tmp/prompts/personal-site-with-guardrails/prompt-00{1..6}.txt`
- **Substitutes:** `/tmp/agents-101-m1-substitutes/{linkedin-paste,project-story,strengths-pushback,hate-list}.txt`

## Tooling

- `curriculum/evals/mechanical/bin/verbatim-check.sh <prompt> <scrollback>` — V-checks
- `curriculum/evals/mechanical/bin/prompt-source-audit.sh personal-site-with-guardrails` — P/E checks (static lint)
- `curriculum/evals/mechanical/bin/runner-mapping-check.sh <runner> <exercise>` — pre-flight: phase ↔ prompt-NNN.txt agreement
- `curriculum/evals/mechanical/bin/no-write-between-reads.sh <jsonl> <start-anchor> <end-anchor> <forbidden-pattern>` — A16 enforcement
- `curriculum/evals/mechanical/bin/continuation-diff.sh <old> <new> [max_ratio]` — A13/A21 enforcement (HTML-aware: strips `<style>` blocks)

## Method

For every assertion below: run the named script, capture its exit code + first line of output, paste into the report. No quoting, no narration, no taste calls. If you find yourself reading scrollback to judge whether content is "good," stop — that's not your job.

## Assertions

### Verbatim round-trip (V1–V6)

For each `prompt-00N.txt`: `verbatim-check.sh <prompt> <scrollback>`. Report exit code + prefix.

### File-existence (mechanics)

- **A1.** LinkedIn paste appears in scrollback before Prompt 1: `verbatim-check.sh /tmp/agents-101-m1-substitutes/linkedin-paste.txt <scrollback>`.
- **A2.** `site.html.v1-baseline` exists. `test -f <scratch>/site.html.v1-baseline`. Has `<html` and `<body`: `grep -q '<html' && grep -q '<body'`.
- **A5.** `site.html.v2-storybrand` exists.
- **A8.** Actor read or pasted the project story: either `grep -F` first 40 chars of `project-story.txt` in scrollback, OR transcript has a Read of that path (`jq` on `.jsonl`).
- **A9.** Actor produced three strengths: scrollback contains a numbered or bulleted list of 3 items in the strengths phase. Heuristic: between the strengths-pushback substitute paste and v3 generation, count `^[1-9]\.` or `^- ` lines — expect ≥ 3.
- **A14.** Actor read v1 baseline during look-back (Phase 5): transcript Read of `site.html.v1-baseline` (`jq -c 'select(.message.content[]?.input.file_path? | test("v1-baseline"))' <jsonl>`).
- **A15.** Look-back named ≥ 3 quoted claims from v1: scrollback Phase-5 / look-back section contains ≥ 3 backtick or blockquote spans.
- **A16.** No regeneration in look-back: `no-write-between-reads.sh <jsonl> "prompt-005.txt" "prompt-006.txt" "site.html"`. PASS on exit 0.
- **A17.** Hate-list appears verbatim in scrollback after Prompt 4: `verbatim-check.sh hate-list.txt scrollback`.
- **A22.** `personal-brand-generation.md` exists: `test -f <scratch>/personal-brand-generation.md`.
- **A25.** No `[BRACKET]` placeholders in `personal-brand-generation.md`: `grep -nE '\[[A-Z][A-Z_]+\]' file && FAIL`.

### One-at-a-time (anti-question-dump)

- **A4.** Phase 2 walked five beats one at a time. Mechanical heuristic: between prompt-002 paste and v2 generation, count distinct assistant turns that ask a single beat question. Expect ≥ 4 (Character / Problem / Guide / Plan / Success — Success is sometimes batched). FAIL if a single assistant turn fires ≥ 3 questions.
- **A18.** Anti-brand walked four steps (Phase 4): ≥ 3 distinct assistant turns between prompt-004 paste and v4 generation.
- **A27.** Cross-phase: no question-dump anywhere a prompt says *"one at a time."* Already covered by A4 + A18.

### Continuation between phases

- **A13.** v3 is a continuation of v2: `continuation-diff.sh <scratch>/site.html.v2-storybrand <scratch>/site.html.v3-drucker`. PASS on exit 0.
- **A21.** v4 is a continuation of v3: `continuation-diff.sh <scratch>/site.html.v3-drucker <scratch>/site.html.v4-antibrand`. PASS on exit 0. (Script strips `<style>` blocks before diffing — added inline CSS no longer false-fails the bound.)

### Substitution log

- **A28.** Actor report lists substitutions for: LinkedIn paste, project story, strengths pushback, hate list, Phase 6 truncation. `grep -c` for each on the report — expect ≥ 5 entries.

### Harness leakage (H1–H5)

Run `jq` on transcript for any Read of:
- `curriculum/exercises/personal-site-with-guardrails.md` → H1 FAIL.
- Any judge runner or sibling actor runner (own actor file allowed) → H2 FAIL.
- Any `*.maintainer.md` → H3 FAIL.
- Any harness-internal file inside `<scratch>` that the Actor then Read again → H4 FAIL.
- `ls <scratch>` should match expected set (site.html + 4 snapshots + personal-brand-generation.md + .keep). Anything else → H5 FAIL.

### Prompt-source audit

Run: `bin/prompt-source-audit.sh personal-site-with-guardrails`. Capture exit code + verdict. PASS if `Verdict: READY` or `READY-WITH-FLAGS`; FAIL if `BLOCK`.

### Runner-mapping pre-flight

Run: `bin/runner-mapping-check.sh curriculum/evals/mechanical/runners/agents-101-m1.verbatim.actor.md curriculum/exercises/personal-site-with-guardrails.md`. PASS on exit 0 (`READY` or `READY-WITH-FLAGS`); FAIL on `BLOCK`. This catches phase-mapping rot before the Actor runs and is an additional Judge spot-check after the run.

## Report

Write `curriculum/evals/mechanical/instances/agents-101-m1-verbatim-judge-report.md`. Shape:

```markdown
# Judge report — agents-101-m1 verbatim

## Summary
Verdict: PASS | FAIL (N/M assertions). Sev-1 from prompt-source-audit: K.

## V1–V6 (verbatim-check.sh)
V1: PASS — <prefix>
...

## A-series (mechanics + continuation)
A1: PASS — verbatim-check exit 0
A2: PASS — file present, valid HTML
...

## H-series (harness leakage)
H1: PASS — no Read of curriculum/exercises/
...

## Prompt-source audit
<paste the script's stdout>
```

Under 400 words. No quoting beyond what scripts emit. Leave artifacts in place.

## What you must NOT do

- Quote a sentence from `personal-brand-generation.md` and judge if it's "grounded."
- Decide whether the strengths are "specific" or "generic."
- Read the HTML snapshots to evaluate voice or framing.
- Compare phases qualitatively beyond the diff-bound continuity check.

If an assertion can't be reduced to a script call or a `jq`/`grep` one-liner, drop it from this judge and flag the gap in the report — that's a script-ratchet TODO, not a Judge job.
