---
name: research-review
description: Run the four research review personas (source-type-auditor, zombie-stat-detector, freshness-checker, evidence-ladder-classifier) in parallel against a new or modified research file, synthesis doc, or article draft. Merges findings, dedupes, and presents a unified punch list with severity ordering. Use before publishing any research synthesis or article that depends on research claims.
argument-hint: <file-path>
---

# /research-review — parallel persona audit

This skill runs four narrow review personas against a target file and merges their findings. Each persona returns structured JSON with severity + file:line + recommendation. The orchestrator dedupes overlapping findings and presents a single punch list.

## When to invoke

- **Before shipping** a new `continuous-research/findings/**` file or synthesis doc
- **Before publishing** an article that depends on research claims
- **After a large research round** where multiple files were added or modified
- **During `/refresh` audits** when compounded entries point at research files as stale

## What it does NOT do

- Edit the file. The orchestrator presents findings; Antti (or a follow-up skill) decides and applies fixes.
- Propose new sources. Audit only.
- Run continuously. On-demand.

## The flow

### Step 1 — Target resolution

Accept `$ARGUMENTS[0]` as the file path. If missing, ask for one. Do not run on directories — one file per invocation.

### Step 2 — Parallel launch

Launch all four persona agents in a single message (parallel tool calls). Each gets:

- The target file path
- A copy of `.claude/rules/research-rules.md` prepended to the prompt
- Explicit instruction: return JSON per the agent's output format, no prose

Agents:

- `source-type-auditor` — flags unlabeled URLs and Level 0 sources used as evidence
- `zombie-stat-detector` — flags round-number AI stats and known zombies
- `freshness-checker` — flags sources over 6 months used as current evidence
- `evidence-ladder-classifier` — flags overclaiming (L3/L4 framing on L1/L2 evidence)

### Step 3 — Merge and dedupe

Collect the four JSON responses. Merge findings by `(file, line, quoted_claim)` tuple. When two personas flag the same line, combine their recommendations (keep both, do not pick one).

### Step 4 — Order by severity

Sort findings:
1. All `high` (blocking) — grouped by persona
2. All `medium`
3. All `low`

### Step 5 — Present punch list

```
## Research review — <file> — <date>

### Blocking (high, N)

**source-type-auditor (K)**
- line 42: [vendor press release] SAP claim used as evidence → mark L0 or replace
- ...

**zombie-stat-detector (J)**
- line 18: "95% fail" — MIT NANDA N=52 custom tools only; remove or contextualize
- ...

### Medium (N)
- ...

### Low (N)
- ...

### Summary
X blocking findings — file is NOT ready to ship.
Y medium — worth fixing before publish.
Z low — nice to have.
```

### Step 6 — Decision gate

Ask Antti: *apply high-severity fixes? Mark them for `/compound`? Ship anyway with override?*

If Antti overrides, log the override (file, date, ignored finding) to `memory/compounded/` as a `type: decision` entry so `/refresh` can audit later whether overrides correlate with post-hoc corrections.

## Hook into the OODA cycle

When the `continuous-research/platform-watch/cycle-prompt.md` ships a new file, the cycle orchestrator should call `/research-review` before marking the file as "ready for synthesis." Update the cycle-prompt to include this step when touching that file.

## The real test

A month after shipping, how many `memory/compounded/` entries have `violates_rule` pointing at a rule this review covers (source-type, zombie, freshness, evidence ladder)? If the number is going down, the review is compounding. If it's flat or rising, the review is theater — invoke `/refresh` to find out why.
