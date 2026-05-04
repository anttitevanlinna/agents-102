# Judge — Agents 101 M4 author-security-skill verbatim

**Dispatch with `model: "haiku"`.** Acceptance-test judge — script-first, no taste judgements. Content quality belongs to the eval system, not here.

Grading whether the M4 author chain ran end-to-end on inherited M3 + planted policies, and whether the personal skill source `module-4/skills/security-audit/SKILL.md` exists with the expected forcing-function content. The grep on the four attack-class names is load-bearing — those phrases must appear verbatim.

## Inputs

- **Scratch:** `/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/scratch/agents-101-m4`
- **Actor transcript:** `<ACTOR_TRANSCRIPT_PATH>`
- **Actor report:** `.../instances/agents-101-m4-author-actor-report.md`
- **Actor scrollback:** `.../instances/agents-101-m4-author-actor-scrollback.md`
- **Prompt files:** `/tmp/prompts/author-security-skill/prompt-{001,002,003}.txt`
- **Raw report:** `<scratch>/outputs/policy-report-raw.md`
- **Authored skill:** `<scratch>/module-4/skills/security-audit/SKILL.md`

## Tooling

- `curriculum/evals/mechanical/bin/prompt-read-check.sh <prompt> <transcript>`
- `curriculum/evals/mechanical/bin/prompt-source-audit.sh author-security-skill`
- `grep -i` / `grep -iE` / `grep -F` / `test -f` / `jq`

## Method

For every assertion: run the named script, capture exit code + first line. No quoting, no taste calls. **Per rule #20: PASS on exit 0; FAIL on any non-zero. Do not re-derive from scrollback when a script returns non-zero.**

Generic Judge fixes (M3-style, applied preemptively):
- Heading-depth regex on Actor headings: `^#{2,3} Phase` (Actor may use `##` or `###`).
- English-heading greps are `grep -i*` (Actor title-cases freely).
- Word-count caps at 1.5× spec (Haiku stub overshoot is OK).

## Assertions

### Verbatim round-trip

- **V1.** prompt-001 read → `bin/prompt-read-check.sh /tmp/prompts/author-security-skill/prompt-001.txt <transcript>`
- **V2.** prompt-002 read → same shape.
- **V3.** prompt-003 read → same shape.

### Arrange — inherited state

- **A1.** Inherited M3 paths exist: `test -f memory/index.md`, `agents/monday-risks.md`, `module-3/answer.md`. `ls sources/ | wc -l` ≥ 3.
- **A2.** `module-4/policies/` exists with `.md` files: `ls module-4/policies/*.md | wc -l` ≥ 1.

### Phase 1 — raw policy run

- **A3.** Order: prompt-001 read → policy-file Reads → `outputs/policy-report-raw.md` Write. `jq` transcript ordering on tool_use timestamps.
- **A4.** Raw report header: `grep -F '| Rule | Description | Verdict | Evidence |' outputs/policy-report-raw.md`.
- **A5.** ≥12 data rows: `awk '/^\|/{n++}END{print n}' outputs/policy-report-raw.md` minus 2 (header + separator) ≥ 12.
- **A6.** Verdict `I can't tell` present at least once: `grep -F "I can't tell" outputs/policy-report-raw.md`.
- **A7.** No `module-4/skills/security-audit/` Writes before raw report. `jq` transcript order: every `Write` whose path matches `module-4/skills/security-audit/` has timestamp > the `outputs/policy-report-raw.md` Write.

### Phase 2 — dictation + proposal

- **A8.** Maija's 5-line dictation appears as blockquote in scrollback AFTER raw report and BEFORE Phase 3 paste of prompt-003. Position grep for `> 1. We process partner-NDA` in scrollback.
- **A9.** Actor waited for lines (no skill-file Read between prompt-002 paste and Maija's lines paste). `jq` transcript: between the prompt-002 read and the Maija-blockquote in scrollback, there is no Read or Write under `module-4/skills/security-audit/`.

### Phase 3 — reusable check authored

- **A10.** Authored skill exists: `test -f module-4/skills/security-audit/SKILL.md`.
- **A11. Forcing-function: SKILL.md names all four attack classes verbatim** (case-insensitive against `module-4/skills/security-audit/SKILL.md`):
  - `grep -iF 'prompt injection'` AND `grep -iF 'direct'` AND `grep -iF 'indirect'`
  - `grep -iF 'secrets in context'` AND `grep -iF 'scrollback'`
  - `grep -iF 'tool confusion'`
  - `grep -iF 'skill supply-chain'`
  Any miss → FAIL (headline).
- **A12.** Layering preamble: at least one of `grep -iE 'layered|on top of|in place of' SKILL.md` returns hit.
- **A13.** ≥2 classical controls in SKILL.md from {network, IAM, identity, mTLS, perimeter, WAF, logging, vendor}: count distinct case-insensitive hits ≥ 2.
- **A14.** All five mitigation shape names appear verbatim, case-insensitive: `scope`, `split`, `filter`, `gate`, `review`.
- **A15.** POLICY lens names the report shape: `grep -E '\| Rule|Report shape:|sections:'` returns hit in the POLICY section (treat first half of file as POLICY lens).
- **A16.** POLICY rule enumeration ≥12: `grep -c '^|' SKILL.md` minus header/separator ≥12 OR `grep -cE '^[[:space:]]*[0-9]+\.' SKILL.md` ≥12 OR `grep -cE '^[[:space:]]*-' SKILL.md` ≥12.
- **A17.** Grill-before-save: scrollback shows Claude asking ≥1 question after prompt-003 paste and before any Write to `module-4/skills/security-audit/`. `jq` ordering + grep for `?` in scrollback between markers.

### Truncations

- **A18.** No Write to `~/.claude/` or `skill-install/` outside scratch. `jq` transcript filter for any path matching `$HOME/.claude/` or `<scratch>/skill-install/`.
- **A19.** No Phase 4/5 executed: no Write to `outputs/security-report.md`, no edit of `agents/monday-risks.md`. `jq` transcript filter.

### State protection

- **A20.** `module-3/` byte-unchanged. `diff -r scratch/agents-101-m3/module-3/ scratch/agents-101-m4/module-3/` empty.
- **A21.** `module-4/policies/` byte-unchanged from scaffold. `diff -r curriculum/scaffolds/module-4-starter/policies/ scratch/agents-101-m4/module-4/policies/` empty.

### Harness leakage

- **H1-H4.** No Read of `curriculum/exercises/`, judge/sibling runner, maintainer docs, `/tmp/agents-101-mocks/`. `jq` per category.

### Prompt-source audit

Run `bin/prompt-source-audit.sh author-security-skill`. Capture exit + verdict.

## Report

Write `.../instances/agents-101-m4-author-judge-report.md`:

```markdown
# Judge report — Agents 101 M4 author verbatim

## Summary
Verdict: PASS | FAIL (N/M). Sev-1 from prompt-source-audit: K.

## V1–V3
...

## A-series
A1 ... A21

## H-series
H1 ... H4

## Prompt-source audit
<paste stdout>
```

Under 500 words. If A11 fails (any attack class missing), headline finding. If A3-A6 fail (raw-run ordering), headline alternative.

## What you must NOT do

- Quote a sentence from SKILL.md and judge if it's "well-scoped."
- Decide whether the package shape is "appropriate."
- Read the raw report to evaluate evidence quality.
- Compare lenses qualitatively.

If an assertion can't be a script call or grep one-liner, drop it and flag as a script-ratchet TODO.
