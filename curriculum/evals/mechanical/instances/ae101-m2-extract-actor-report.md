# Actor report — AE101 M2 extract-the-task-shaping-rule

**Scrollback:** `/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/instances/ae101-m2-extract-actor-scrollback.md`

## Phase 1 — rules surfaced

Proposed five rules, each anchored in a specific moment from `prior-session-summary.md`:
1. State-shape assumptions between two files (anchor: Q2/Q3 walk-down).
2. Security boundary not mapped (anchor: Q5 auth gap) — flagged as candidate for student rewrite.
3. Write-vs-test reorder (anchor: push-back B / TDD).
4. "Run the tests" without naming which (anchor: v2→v3 verification) — self-flagged as plan-reading-craft.
5. UI element intercepts input or layout (anchor: Q4 resize, Q8 keyboard).

Stopped and asked for rewrite/reject. Applied the student response: rejected Rule 4, rewrote Rule 2 in the student's voice ("touches a security boundary you didn't think to map"). Carried four rules forward.

## Phase 2 — saved

Proposed three paths with loading models:
- A: `~/.claude/CLAUDE.md` — fires anywhere on the laptop.
- B: `~/.claude/rules/task-shaping.md` — global but referrer-gated.
- C: `./CLAUDE.local.md` — fires only in this repo.

Picked A. Reasoning: task-shape rules generalise across codebases; firing-only-in-this-repo would leave them unavailable when planning a task in another repo.

**Intended real path:** `~/.claude/CLAUDE.md` (appended section, not full overwrite).
**Test-environment substitution:** `/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/scratch/ae101-m2-extract/.claude-user-stub/CLAUDE.md` — file written.

Showed first three rules back from the file.

## Phase 3 — automation shapes

Named three shapes, no code:
1. **Backlog groomer** — scheduled batch over issue tracker; rules act as guardrail flagging slices needing plan-mode.
2. **Intake triager** — event-driven router on incoming requests; rules act as the routing policy (Rule 2 as a hard security gate).
3. **PR pre-flight** — synchronous, developer-in-the-loop slash command; rules read fresh each invocation.

Did not write code, did not scaffold a Slack bot, did not propose specific file scaffolds beyond naming each shape.
