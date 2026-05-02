# Judge — Bootstrap M4 run-and-package-security-check verbatim

**Dispatch with `model: "haiku"`.** This is an acceptance-test judge — script-first, no taste judgements. Content quality belongs to the eval system, not here.

Grading whether the M4 author chain ran end-to-end on inherited M3 + planted policies, and whether the source plugin + installed CLI skills exist with expected shape. The forcing-function grep on the four attack-class names is load-bearing — those phrases must appear verbatim in the agent-security SKILL.md.

## Inputs

- **Scratch:** `/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/scratch/bootstrap-m4`
- **Actor transcript:** `<ACTOR_TRANSCRIPT_PATH>`
- **Actor report:** `.../instances/bootstrap-m4-author-actor-report.md`
- **Actor scrollback:** `.../instances/bootstrap-m4-author-actor-scrollback.md`
- **Prompt files:** `/tmp/prompts/author-security-plugin/prompt-{001,002,003,004-cli,005-verify}.txt`
- **Raw report:** `<scratch>/outputs/policy-report-raw.md`
- **Authored source plugin:** `<scratch>/module-4/plugins/security-audit/`
- **Installed CLI skills:** `<scratch>/skill-install/.claude/skills/security-audit-{policy,agent-security}/`

## Tooling

- `curriculum/evals/mechanical/bin/verbatim-check.sh`
- `curriculum/evals/mechanical/bin/prompt-source-audit.sh author-security-plugin`
- `grep -i` / `grep -F` / `test -f` / `jq`

## Method

For every assertion: run the named script, capture exit code + first line. No quoting, no taste calls.

## Assertions

### Verbatim round-trip

- **V1-V5.** prompt-001..005 via `verbatim-check.sh`.

### Arrange — inherited state

- **A1.** Inherited M3 paths exist: `test -f memory/index.md`, `agents/monday-risks.md`, `module-3/answer.md`. `ls sources/ | wc -l` ≥ 3.
- **A2.** `module-4/policies/` exists with `.md` files: `ls module-4/policies/*.md | wc -l` ≥ 1.
- **A3.** `skill-install/.claude/skills/` exists: `test -d`.

### Phase 1 — raw policy run

- **A4.** Order: prompt-001 paste → policy-file Reads → `outputs/policy-report-raw.md` Write. `jq` transcript ordering.
- **A5.** Raw report header: `grep -F '| Rule | Description | Verdict | Evidence |' outputs/policy-report-raw.md`.
- **A6.** ≥12 data rows: `grep -c '^|' outputs/policy-report-raw.md` minus header/separator ≥ 12.
- **A7.** Verdict `I can't tell` present at least once: `grep -F "I can't tell"`.
- **A8.** No `module-4/plugins/security-audit/` or `skill-install/.claude/skills/security-audit-*` Writes before raw report. `jq` transcript order.

### Phase 2 — dictation + proposal

- **A9.** Maija's 5-line dictation appears as blockquote in scrollback AFTER raw report and BEFORE package proposal. Position grep on scrollback.
- **A10.** Actor waited (asked for lines before reading/writing package files for Phase 2). `jq` transcript: no plugin-file Read between prompt-002 paste and Maija's lines paste.

### Phase 3 — reusable check authored

- **A11.** Plugin manifest exists: `test -f module-4/plugins/security-audit/.claude-plugin/plugin.json`. Valid JSON: `jq . <file>`.
- **A12.** Both source SKILL.md files exist: `test -f` on both.
- **A13. Forcing-function: AGENT-SECURITY SKILL.md names all four attack classes verbatim** (case-insensitive, against `module-4/plugins/security-audit/skills/agent-security/SKILL.md`):
  - `grep -iF 'prompt injection'` AND `grep -iF 'direct'` AND `grep -iF 'indirect'`
  - `grep -iF 'secrets in context'` AND `grep -iF 'scrollback'`
  - `grep -iF 'tool confusion'`
  - `grep -iF 'plugin supply-chain'`
  Any miss → FAIL (headline).
- **A14.** AGENT-SECURITY preamble: `grep -iwF 'layered' <file>`.
- **A15.** ≥2 classical controls in agent-security SKILL.md from {network, IAM, mTLS, perimeter, WAF}: count distinct hits ≥ 2.
- **A16.** POLICY SKILL.md has rule rows: `grep -c '^|' module-4/plugins/security-audit/skills/policy/SKILL.md` ≥ 12, OR enumerated rule list count ≥ 12.
- **A17.** Each lens SKILL.md names report shape (table header or "sections:" enumeration). `grep -E '\| Rule|sections:|Report shape:'` per lens.
- **A18.** Substitution log: `grep -F '[harness substitution - cowork/desktop' <scrollback>`.

### Phase 4 — install + verify

- **A19.** CLI skills installed: `test -f skill-install/.claude/skills/security-audit-policy/SKILL.md` and `security-audit-agent-security/SKILL.md`.
- **A20.** Source plugin still exists: `test -d module-4/plugins/security-audit/`.
- **A21.** Sandbox substitution log: `grep -F 'install location ~/.claude/skills/' <scrollback>`.
- **A22.** Verify output: 2-3 table rows in scrollback under prompt-005 section. Count `^|` lines minus header/separator. FAIL if 0 or > 5.
- **A23.** Verify scope = one file: `jq` transcript for Read calls in Phase 5; expect exactly one target Read of `./challenge.md`.

### Truncations

- **A24.** No Debrief. No homework prompt executed.
- **A25.** No Write to `~/.claude/` outside scratch. `jq` transcript filter for any path matching `$HOME/.claude/` not under `<scratch>/skill-install/`.

### State protection

- **A26.** `module-3/` byte-unchanged. `diff -r` against `scratch/bootstrap-m3/module-3/`.
- **A27.** `module-4/policies/` byte-unchanged from scaffold. `diff -r` against scaffold source.

### Harness leakage

- **H1-H4.** No Read of `curriculum/exercises/`, judge/sibling runner, maintainer docs, `/tmp/bootstrap-mocks/`. `jq` per category.

### Prompt-source audit

Run `bin/prompt-source-audit.sh author-security-plugin`. Capture exit + verdict.

## Report

Write `.../instances/bootstrap-m4-author-judge-report.md`:

```markdown
# Judge report — Bootstrap M4 author verbatim

## Summary
Verdict: PASS | FAIL (N/M). Sev-1 from prompt-source-audit: K.

## V1–V5
...

## A-series
...

## H-series
...

## Prompt-source audit
<paste stdout>
```

Under 500 words. If A13 fails (any attack class missing), headline finding. If A4-A8 fail (raw-run ordering), headline alternative.

## What you must NOT do

- Quote a sentence from a SKILL.md and judge if it's "well-scoped."
- Decide whether the package shape is "appropriate."
- Read the raw report to evaluate evidence quality.
- Compare lenses qualitatively.

If an assertion can't be a script call or grep one-liner, drop it and flag as a script-ratchet TODO.
