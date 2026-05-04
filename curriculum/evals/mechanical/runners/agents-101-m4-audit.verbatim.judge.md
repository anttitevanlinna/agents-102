# Judge — Agents 101 M4 audit-your-agent verbatim

**Dispatch with `model: "haiku"`.** Acceptance-test judge — script-first, no taste judgements. Content quality belongs to the eval system, not here.

Grading whether the M4 audit chain ran end-to-end on inherited scratch and whether the file artefacts have the expected SHAPE. The forcing-function grep on the four attack-class names is load-bearing. The reusable check files must NOT be modified.

## Inputs

- **Scratch:** `/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/scratch/agents-101-m4`
- **Actor transcript:** `<ACTOR_TRANSCRIPT_PATH>`
- **Actor report:** `.../instances/agents-101-m4-audit-actor-report.md`
- **Actor scrollback:** `.../instances/agents-101-m4-audit-actor-scrollback.md`
- **Prompt files:** `/tmp/prompts/audit-your-agent/prompt-00{1,2,3,4}.txt`
- **Authored source:** `<scratch>/module-4/skills/security-audit/SKILL.md`
- **Installed skill:** `<scratch>/skill-install/.claude/skills/security-audit/SKILL.md`
- **Outputs:** `<scratch>/outputs/{policy-report-raw,policy-report,security-report}.md`, `<scratch>/agents/monday-risks.md`

## Tooling

- `curriculum/evals/mechanical/bin/prompt-read-check.sh <prompt> <transcript>`
- `curriculum/evals/mechanical/bin/prompt-source-audit.sh audit-your-agent`
- `grep -i` / `grep -iE` / `diff` / `test -f` / `jq`

## Method

For every assertion: run the named script, capture exit code + first line. **Per rule #20: PASS on exit 0; FAIL on any non-zero. Do not re-derive from scrollback when a script returns non-zero.**

Generic Judge fixes (M3-style):
- Heading-depth regex: `^#{2,3} ` (Actor may use `##` or `###`).
- English-heading greps: `grep -i*`.
- Word-count caps at 1.5× spec.

## Assertions

### Verbatim round-trip

- **V1.** prompt-001 read → `bin/prompt-read-check.sh /tmp/prompts/audit-your-agent/prompt-001.txt <transcript>`.
- **V2.** prompt-002 read.
- **V3.** prompt-003 read.
- **V4.** prompt-004 read.

### Inherited state

- **A1.** Inherited paths exist: `test -f memory/index.md` (or any memory page), `agents/monday-risks.md`, `module-3/answer.md`, `outputs/policy-report-raw.md`, `module-4/skills/security-audit/SKILL.md`.
- **A2.** `outputs/policy-report-raw.md` byte-unchanged: capture shasum at start; compare at end. FAIL if differs.
- **A3.** Authored source byte-unchanged: shasum on `module-4/skills/security-audit/SKILL.md` start vs end.

### Phase 1 — install-skill

- **A4.** Install destination created: `test -f skill-install/.claude/skills/security-audit/SKILL.md`.
- **A5.** Installed SKILL.md byte-identical to authored source: `diff module-4/skills/security-audit/SKILL.md skill-install/.claude/skills/security-audit/SKILL.md` empty.
- **A6.** Substitution log present in scrollback: `grep -F 'install location ~/.claude/skills/security-audit/' <scrollback>`.
- **A7.** No Write to `~/.claude/` on host: `jq` transcript filter for any path matching `$HOME/.claude/`.

### Phase 2 — policy audit + meta-read

- **A8.** Actor Read `skill-install/.claude/skills/security-audit/SKILL.md`. `jq` transcript.
- **A9.** `outputs/policy-report.md` exists with table header `| Rule | Description | Verdict | Evidence |`. `grep -F`.
- **A10.** ≥12 data rows: `awk '/^\|/{n++}END{print n}' outputs/policy-report.md` minus 2 ≥ 12.
- **A11.** All three verdict values present: `grep -ic 'compliant'`, `grep -ic 'violating'`, `grep -ic "I can't tell"` each ≥1.
- **A12.** Substitution log: `grep -F '[harness substitution - reusable lens' <scrollback>` ≥1 hit.
- **A13.** Meta-read in scrollback: at least three rule-name quotes appear in scrollback after the policy-report Write but before prompt-003 paste. Heuristic: count `\`Rule:` or quoted rule names; or `grep -cE '(surprises|I can.t tell|push back)' <scrollback>` ≥3.

### Phase 3 — agent-security audit

- **A14.** `outputs/security-report.md` exists.
- **A15. Forcing-function: all four attack classes named verbatim** in `outputs/security-report.md` (case-insensitive):
  - `grep -iF 'prompt injection'` AND `grep -iF 'direct'` AND `grep -iF 'indirect'`
  - `grep -iF 'secrets in context'` AND `grep -iF 'scrollback'`
  - `grep -iF 'tool confusion'`
  - `grep -iF 'skill supply-chain'`
  Any miss → FAIL (headline).
- **A16.** All five mitigation shape names present (case-insensitive whole-word): `for s in scope split filter gate review; do grep -iwF "$s" outputs/security-report.md; done`. All five must hit.
- **A17.** Classical-controls floor named: `grep -iE 'perimeter|IAM|identity|mTLS|network|WAF|logging|vendor' outputs/security-report.md` ≥ 2 distinct.
- **A18.** Tier markers present: `grep -iE '(high|medium|low)' outputs/security-report.md` ≥3 distinct hits OR a 3-tier list block.
- **A19.** Access-control section enumerates ≥2 reaches: `grep -ciE '^\s*[-*0-9]' outputs/security-report.md` in the access-control section ≥2.

### Phase 4 — mitigate

- **A20.** Actor edited `agents/monday-risks.md`. Pre-state shasum captured pre-Phase-4; post-state differs.
- **A21.** Edited file names the excluded path: `grep -F 'maija-prep-notes-skeptics' agents/monday-risks.md`.
- **A22.** `## Mitigation applied and residual` section appended to `outputs/security-report.md`: `grep -iE '^#{1,3} *Mitigation applied and residual' outputs/security-report.md`.
- **A23.** Residual section names what changed AND what's left: word count of section between heading and EOF or next `^#` ≥30 words AND ≤300 words (1.5× cap).

### Truncations

- **A24.** No Write to any path under `module-4/skills/security-audit/` or `skill-install/.claude/skills/security-audit/`. `jq` transcript filter.
- **A25.** No Write to `module-3/` paths. `jq`.
- **A26.** No Debrief executed: scrollback does not contain a `## Debrief` heading.

### State protection

- **A27.** Authored skill files byte-unchanged: `diff -r` against pre-state. (A3 + diff of full directory.)
- **A28.** Installed skill file byte-unchanged after Phase 1: shasum at end of Phase 1 vs end of run.

### Harness leakage

- **H1.** No Read of `curriculum/exercises/`. `jq`.
- **H2.** No Read of judge / sibling runner.
- **H3.** No Read of maintainer / planted-state docs.
- **H4.** No Read of `/tmp/agents-101-mocks/`.

### Prompt-source audit

Run `bin/prompt-source-audit.sh audit-your-agent`. Capture exit + verdict.

## Report

Write `.../instances/agents-101-m4-audit-judge-report.md`:

```markdown
# Judge report — Agents 101 M4 audit verbatim

## Summary
Verdict: PASS | FAIL (N/M assertions). Sev-1 from prompt-source-audit: K.

## V1–V4
...

## A-series
A1 ... A28

## H-series
H1 ... H4

## Prompt-source audit
<paste stdout>
```

Under 500 words. If A15 fails (any attack class missing), headline. If A27 fails (reusable check modified), critical.

## What you must NOT do

- Quote a sentence from the security report and judge if it's "specific."
- Decide whether the mitigation is "the right shape."
- Read `agents/monday-risks.md` to evaluate prose quality of the new rule.
- Compare phases qualitatively.

If an assertion can't be a script call or grep one-liner, drop it and flag as a script-ratchet TODO.
