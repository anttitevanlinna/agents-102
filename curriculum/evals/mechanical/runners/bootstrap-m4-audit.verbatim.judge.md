# Judge — Bootstrap M4 audit-your-agent verbatim

**Dispatch with `model: "haiku"`.** This is an acceptance-test judge — script-first, no taste judgements. Content quality belongs to the eval system, not here.

Grading whether the M4 audit chain ran end-to-end on inherited scratch and whether the file artefacts have the expected SHAPE. You are NOT grading whether findings are insightful, evidence is well-quoted, or mitigations are sound. You ARE checking that the verbatim attack-class names appear (forcing-function grep), and that the reusable check files were not modified.

## Inputs

- **Scratch:** `/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/scratch/bootstrap-m4`
- **Actor transcript:** `<ACTOR_TRANSCRIPT_PATH>`
- **Actor report:** `.../instances/bootstrap-m4-audit-actor-report.md`
- **Actor scrollback:** `.../instances/bootstrap-m4-audit-actor-scrollback.md`
- **Prompt files:** `/tmp/prompts/audit-your-agent/prompt-00{1,2,3,4}.txt`
- **Source plugin:** `<scratch>/module-4/plugins/security-audit/`
- **Installed CLI skills:** `<scratch>/skill-install/.claude/skills/security-audit-{policy,agent-security}/`
- **Outputs:** `<scratch>/outputs/{policy-report-raw,policy-report,security-report}.md`, `<scratch>/agents/monday-risks.md`, `<scratch>/guardrails.md`

## Tooling

- `curriculum/evals/mechanical/bin/verbatim-check.sh`
- `curriculum/evals/mechanical/bin/prompt-source-audit.sh audit-your-agent`
- `grep -i` / `grep -F` / `diff` / `test -f`

## Method

For every assertion: run the named script, capture exit code + first line. No quoting, no narration, no taste calls.

## Assertions

### Verbatim round-trip

- **V1-V4.** prompt-001..004 via `verbatim-check.sh`.

### Inherited state

- **A1.** Inherited paths exist: `test -f` on `memory/index.md` (or any memory page), `agents/monday-risks.md`, `module-3/answer.md`, `outputs/policy-report-raw.md`, source plugin SKILL.md files, both installed CLI skills.
- **A2.** `outputs/policy-report-raw.md` byte-unchanged: capture shasum at start; compare at end. FAIL if differs.

### Phase 1 — packaged policy audit

- **A3.** Actor Read `skill-install/.claude/skills/security-audit-policy/SKILL.md`. `jq` transcript.
- **A4.** `outputs/policy-report.md` exists with table header `| Rule | Description | Verdict | Evidence |`. `grep -F`.
- **A5.** ≥12 data rows: `grep -c '^|' outputs/policy-report.md` minus header/separator ≥ 12.
- **A6.** All three verdict values present: `grep -ic 'compliant' && grep -ic 'violating' && grep -ic "I can't tell"`.
- **A7.** Substitution log: `grep -F '[harness substitution - reusable lens policy' <scrollback>`.

### Phase 1.5 — meta read

- **A8.** Actor Read `outputs/policy-report.md` after writing it. `jq` transcript ordering.

### Phase 2 — agent-security audit

- **A9.** Actor Read agent-security SKILL.md. `jq` transcript.
- **A10.** `outputs/security-report.md` exists.
- **A11. Forcing-function: all four attack classes named verbatim** (case-insensitive):
  - `grep -iF 'prompt injection' outputs/security-report.md` AND `grep -iF 'direct'` AND `grep -iF 'indirect'`
  - `grep -iF 'secrets in context'` AND `grep -iF 'scrollback'`
  - `grep -iF 'tool confusion'`
  - `grep -iF 'plugin supply-chain'`
  Any miss → FAIL (this is the load-bearing check).
- **A12.** All five mitigation shape names present: `for s in scope split filter gate review; do grep -iwF "$s" outputs/security-report.md; done`. All five must hit.
- **A13.** Classical-controls floor named: `grep -iE 'perimeter|IAM|mTLS|network|WAF' outputs/security-report.md` ≥ 2 distinct.
- **A14.** Tier markers present: `grep -iE '\b(high|medium|low)\b' outputs/security-report.md`.

### Phase 3 — mitigate

- **A15.** Actor edited `agents/monday-risks.md`. `diff` against pre-Phase-3 state shows changes (capture pre-state from author runner end-state). FAIL if byte-identical.
- **A16.** Edited file names the excluded path: `grep -F 'maija-prep-notes-skeptics' agents/monday-risks.md`.
- **A17.** `guardrails.md` exists at scratch root: `test -f`.

### Close

- **A18.** `## Doors I would rather not open` (or `Doors I'd rather not open`) section in `guardrails.md`: `grep -iF 'Doors I'`.

### Truncations

- **A19.** Debrief NOT executed.
- **A20.** No Write to any path under `module-4/plugins/security-audit/` or `skill-install/.claude/skills/security-audit-*`. `jq` transcript filter.
- **A21.** No Write to `module-3/` paths. `jq`.

### State protection

- **A22.** Reusable-check files byte-unchanged. `diff -r module-4/plugins/security-audit/` against pre-state. `diff -r skill-install/.claude/skills/security-audit-policy/` and `security-audit-agent-security/` against pre-state.

### Harness leakage

- **H1.** No Read of `curriculum/exercises/`. `jq`.
- **H2.** No Read of judge / sibling runner.
- **H3.** No Read of maintainer / planted-state docs.
- **H4.** No Read of `/tmp/bootstrap-mocks/`.

### Prompt-source audit

Run `bin/prompt-source-audit.sh audit-your-agent`. Capture exit + verdict.

## Report

Write `.../instances/bootstrap-m4-audit-judge-report.md`:

```markdown
# Judge report — Bootstrap M4 audit verbatim

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

Under 500 words. If A11 fails (any attack class missing), call that the headline finding. If A22 fails (reusable check modified), call that critical.

## What you must NOT do

- Quote a sentence from the security report and judge if it's "specific."
- Decide whether the mitigation is "the right shape."
- Read `agents/monday-risks.md` to evaluate prose quality of the new rule.
- Compare phases qualitatively.

If an assertion can't be a script call or grep one-liner, drop it and flag as a script-ratchet TODO.
