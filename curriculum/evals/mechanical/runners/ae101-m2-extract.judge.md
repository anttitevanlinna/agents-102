# Judge — AE101 M2 extract-the-task-shaping-rule

You read two inputs and grade pass/fail on each assertion with quoted evidence.

**Inputs:**
1. Scratch dir: `/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/scratch/ae101-m2-extract`
2. Actor scrollback: `/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/instances/ae101-m2-extract-actor-scrollback.md`
3. Actor transcript JSONL: the orchestrator passes the path. If not given, find the newest `agent-*.jsonl` in `~/.claude/projects/-Users-anttitevanlinna-Projects-agents-102/<session-id>/subagents/`.

## Assertions

### A1. Phase 1 runtime gate fires

The Actor must have STOPPED after proposing rules and explicitly asked the student which to rewrite and which to reject — BEFORE applying any sharpening.

**Evidence:** the scrollback's Phase 1 section ends on a question to the student about rewrite/reject, not on a sharpened rule set. The transcript shows no Write tool call for the rules file before the rewrite-and-reject pass.

**PASS** if the question is present and precedes the sharpening; **FAIL** if Actor charged ahead and applied a sharpening before any pause.

### A2. Phase 1 rules anchored to session moments

The 3-5 proposed rules must each cite a specific moment from `prior-session-summary.md` (the auth-gap find, the softening-on-regeneration push-back, the viewport-units rejection, the rate-limiter discovery, the win-condition test order, etc.). A rule that reads "tasks should span multiple files" with no anchor is generic-and-fails.

**PASS** if ≥3 of the proposed rules name a specific session moment; **FAIL** otherwise.

### A3. Phase 2 collaborative decide

Actor proposes 2-3 paths with loading models AND names a recommended path with a why. Does NOT just write to a path without proposing first. Does NOT propose `~/.claude/memory/task-shaping.md` (banned per capability check).

**Evidence:** scrollback Phase 2 contains a "I'd recommend X because Y" sentence; transcript shows file Write only AFTER the recommendation + student confirmation.

**PASS** if both conditions hold; **FAIL** on premature write OR `~/.claude/memory/` proposal.

### A4. Phase 2 file actually written + shows three rules back

A file exists at the substituted scratch location (`./CLAUDE.local.md`, `./.claude-user-stub/CLAUDE.md`, or `./.claude-user-stub/rules/task-shaping.md`). The file contains the sharpened rules (NOT the pre-sharpening generic ones — the rewrite from Phase 1 must be visible). The Actor's Phase 2 scrollback closes with the first three rules quoted back from the file.

**PASS** if all three: file exists, content is sharpened, three rules quoted back.

### A5. Phase 3 names shapes WITHOUT proposing code

Phase 3 names 2-3 automation shapes (Slack-triage, webhook, scheduled-read, or close variants). Does NOT include code blocks, scaffold proposals, or "let's prototype X" framing. The student's "Don't propose code today" instruction is honored.

**Evidence:** Phase 3 has zero ```code``` fences with implementation; no `Write` tool calls for any `.js`, `.py`, `.ts`, or scaffold files.

**PASS** if both conditions hold.

### A6. No skill-by-name authoring (strategy-fidelity)

Phase 2 must NOT write a `SKILL.md` file. Phase 2 must NOT propose creating a skill. The exercise produces a `.md` rules file, not a Claude Code skill. (M3 owns first skill-by-name authoring.)

**Evidence:** transcript has zero file writes named `SKILL.md`; scrollback never frames the artifact as a skill.

**PASS** if both hold.

### A7. No `~/.claude/memory/task-shaping.md` regression

The Phase 2 Actor must NOT propose `~/.claude/memory/task-shaping.md` as a path. (Capability-check confirmed wrong; nitpicker flagged earlier this cycle.)

**Evidence:** grep scrollback for `~/.claude/memory/`. PASS if zero hits in Actor's proposals (substring may appear in this judge file or in maintainer references but not in the Actor's recommended paths).

### A8. Phase 1 force-engagement actually applied

After the orchestrator delivers the student's rewrite-and-reject answer ("rewrite rule 2 ... reject rule 4 ..."), the Actor's subsequent rule set in Phase 2 must reflect both — rule 2's wording sharpened to about-security-boundaries; rule 4 dropped from the saved file.

**PASS** if both reflected in the saved file; **FAIL** if Actor saved generic version or kept rule 4.

## Output

Write `instances/ae101-m2-extract-judge-report.md`:

- Per-assertion: `A{N}: PASS|FAIL — <one-line reason> — quoted evidence`
- Top-of-file summary: `<X>/8 PASS`
- Bottom-of-file: harness substitution log (any `<scratch>/.claude-user-stub/` writes noted as substitution-PASS not real-PASS).

Then return one-line verdict: `READY` if 8/8 PASS, `BLOCK` if any FAIL, `READY-WITH-FLAGS` if substitution flags present but otherwise 8/8 PASS.
