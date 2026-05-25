# Dino's skill stacking system

How Dino's Claude Code skills compose. Personal skills live in `~/.claude/skills/`, project skills in `./.claude/skills/`. The harness merges them at runtime; they're indistinguishable to the model.

**Read for the patterns, not for copying.** This is one engineer's stack on one codebase; your kit will look different. The four composition mechanisms below are the move. The specific skills (and the Dino-specific names — `Arctic Deep`, `bronto/MAP.md`, `src/analytics-dashboard/`) are how Dino instantiates the mechanisms against his own work. Read for the shape, then map your own.

---

## TL;DR

Skills are single-purpose named procedures. Four composition mechanisms stitch them into workflows: **explicit load**, **orchestrator sequencing** (`/ship`), **routing dispatch** (CLAUDE.md predicates), and **hand-off pipelines**. The system has a clear shape: read-only analysis clusters at the front of the lifecycle, mutating skills cluster in the middle, ops loops back to build. `/ship` is the spine: it absorbs the last four commands of every workflow (`/cp`, `/release-notes`, `/multi-agent-review`, `/ci`) into one user-typed verb.

---

## The three-layer model

### Layer 1: Shape of one skill

Every `SKILL.md` follows the same minimal contract:

```
name + description (triggers)  →  body (procedure)  →  optional cross-skill loads
user_invocable: true            ← gates /<name> as a slash command
allowed-tools:                  ← optional, restricts what the skill can touch
```

That uniformity is what makes stacking possible.

### Layer 2: Classification axes

| Axis | Poles | Notes |
|---|---|---|
| **Scope** | personal ↔ project | Workflow skills tied to team CLAUDE.md → project. Voice/identity skills → personal. |
| **Phase** | plan → build → verify → ship → ops | Analysis at front, mutating in middle, read-only at ends. |
| **Posture** | read-only ↔ mutating ↔ **orchestrator** | Orchestrator is a new pole; `/ship` is the only one. |
| **Enforcement** | mandatory ↔ opt-in | Mandatory gates have tight predicates (file paths, content predicates), never blanket. |

### Layer 3: Composition mechanisms

Four mechanisms, in order of visibility:

**1. Explicit load.** One skill names another as a precondition.
- `/qa` requires `/chrome-fast` before any Chrome MCP call.
- `/access-control-analysis` produces a surface map consumed by `/stride`.
- `/tdd` references `/testing` for commands rather than inlining them.

**2. Orchestrator composition.** `/ship` sequences the ship-half of every workflow.
- Chain: `/testing` → `[/qa if UI]` → `/release-notes` → `/cp` → open PR → `/multi-agent-review` (fresh sub-agent) → `/ci` (background) → hand-off.
- Each step gates the next. Any failure stops the chain; the user fixes and re-invokes `/ship`: that re-invocation is the loop.
- The review step runs in a fresh sub-agent that loads `/multi-agent-review` internally. Sub-agent isolation gives the same unbiased-context property the old `/clear` step provided manually.

**3. CLAUDE.md routing.** Predicate-driven dispatch from the project's CLAUDE.md. Examples below are from Dino's CLAUDE.md; the predicates point at his codebase.
- "behavior change" → `/tdd` (mandatory)
- "dashboard file under src/analytics-dashboard/" → `/ui` (mandatory; `src/analytics-dashboard/` is Dino's project path)
- "shared credentials or 3rd-party API" → `/multi-tenant-security`
- "complex plan" → `/walk-plan`
- "ship it" → `/ship`

CLAUDE.md is the dispatch table; skills are the handlers.

**4. Hand-off pipeline.** Output of one skill feeds the input of the next, without orchestration.
- `/plan-mega-review` → `/walk-plan` → spec stable → `/new-branch`
- `/bug-triage` → user picks tickets → ticket(s) in Linear → eventually `/new-branch` to fix

---

## Skill catalog by phase

### PLAN (read-only analysis)
- `/plan-mega-review`: one-shot deep critique, 10-section sweep
- `/walk-plan`: collaborative second pass, one question at a time, model recommends
- `/grill-me`: adversarial defense, no recommendations
- `/access-control-analysis`: map who can reach what
- `/stride`: threat-model pass against an access-surface map

### BUILD (mutating)
- `/new-branch`: fetch main + cut branch
- `/tdd`: Red-Green TDD, **mandatory on behavior change**
- `/ui`: Arctic Deep design system (Dino's local design system; your equivalent would be your team's component library), **mandatory on dashboard files**
- `/multi-tenant-security`: shared-credentials checklist, **mandatory on touch**
- `/docker-dev`: local services

### VERIFY
- `/testing`: canonical test commands per layer
- `/qa`: browser-driven regression, chains `/chrome-fast`
- `/chrome-fast`: Chrome MCP precondition

### SHIP (orchestrator)
- `/ship`: composes the ship chain
- `/cp`: commit + push
- `/release-notes`: add highlight if user-facing
- `/multi-agent-review`: parallel-agent review (runs in fresh sub-agent inside `/ship`)
- `/ci`: background CI watch

### OPS (read-only)
- `/bug-triage`: discover production issues, prompt user, file tickets

---

## Workflow shapes

Six workflow archetypes. Five funnel into `/ship`; one is standalone.

| Workflow | Path | Notes |
|---|---|---|
| **A · Standard feature** | `/new-branch` → write code → `/ship` | The spine. |
| **B · Dashboard edit** | open file → `/ui` (routed) → `/ship` | `/ui` injects positionally when the file opens. |
| **C · Multi-tenant integration** | `/new-branch` → `/multi-tenant-security` (routed) → `/access-control-analysis` → `/stride` → `/ship` | Three injection mechanisms in one flow. |
| **D · Browser QA standalone** | `/docker-dev start` → `/qa` (→ chains `/chrome-fast`) → report | Doesn't ship. |
| **E · Front-loaded design** | `/plan-mega-review` → `/walk-plan` → `/grill-me` → drops into A | Three postures on the same artifact. |
| **F · Ops triage** | `/bug-triage` → prompt user → tickets → eventually trigger A | The loop-back from OPS to BUILD. |

---

## Design principles

These are the non-obvious rules the system enforces:

1. **A skill never duplicates another's logic.** `/tdd` references `/testing` rather than inlining commands. `/qa` requires `/chrome-fast` rather than reimplementing it. `/ship` composes: it doesn't reimplement.
2. **Orchestrators sequence and gate, never reimplement.** `/ship` adds value only through sequencing logic and stop conditions. If you'd write the same code in two skills, refactor: don't duplicate.
3. **Mandatory gates have tight predicates.** Never "always run this." Always "run this when file X is touched" or "when shared credentials are involved." Tight predicates keep the mandatory set small.
4. **Composition over inheritance.** Skills don't extend or wrap each other. They invoke.
5. **The loop is re-invocation, not internal recursion.** When a skill stops on a failure, the user fixes and re-invokes. Internal auto-fix loops are tempting but risky: review feedback is interpretive; auto-applying it can regress correct code.
6. **Fresh sub-agents replace `/clear`.** When a step needs unbiased context (review, audit), spawn a sub-agent rather than asking the user to clear. Same property, no human hand-off.
7. **CLAUDE.md is half the system.** Half the stacking lives in predicate-dispatch rules in CLAUDE.md, not inside the skills. Skills are handlers; CLAUDE.md is the dispatcher.

---

## Diagrams

Three companion diagrams ship with this doc.

**Marker legend** (used across all three):

- **`[R]`**: routed (CLAUDE.md predicate dispatches to this skill on a matching condition).
- **`[C]`**: chains (this skill names another as a precondition or explicit load).
- **`[O]`**: orchestrates (this skill, only `/ship` in Dino's stack, sequences and gates other skills).

![Phase swimlane placing every skill in its lifecycle phase, with /ship's orchestration arrows.](skill-stacking/01-meta-model.svg)

*Meta-model: every skill placed by phase, mandatory routing skills highlighted, `/ship`'s `[O]` arrows showing what it sequences.*

![/ship's nine-step internal flow with every stop condition and the re-invocation loop.](skill-stacking/02-ship-anatomy.svg)

*`/ship` anatomy: the nine-step internal flow, every stop condition, and the re-invocation loop.*

![Six workflow archetypes, five funnelling into /ship and one standalone.](skill-stacking/03-workflows.svg)

*Workflow archetypes: six shapes converging on `/ship` (five funnel in; QA is the standalone).*

---

## What's special about this stack

- **Front-loaded read-only analysis.** Five PLAN-phase skills whose only job is to inspect before mutating. Unusually high analysis-to-action ratio.
- **`/ship` is the only orchestrator.** Skills don't normally compose others; `/ship` is the deliberate exception, justified by absorbing four end-of-workflow commands into one verb.
- **`/aios` is pure routing.** Meta-layer over Dino's company-level repo map (his is at `bronto/MAP.md`; yours would name your company's repo inventory) that points other invocations to the right repo. Same role as CLAUDE.md but for cross-repo company context.
- **Mandatory gates fire positionally.** `/ui` doesn't fire at session start: it fires when you open a dashboard file. Mid-workflow injection by predicate is what lets the mandatory set stay narrow.
- **Re-invocation as control flow.** Failures don't get patched mid-skill; they stop, the human (or main session) fixes, and the user types the slash command again. The slash command itself is the loop construct, composable with everything else the user might want to do between iterations.

---

## Map your own kit

You shipped a second skill in M6. Hold it up against Dino's four mechanisms and ask:

- Is it a **route** (CLAUDE.md predicate fires it when the right file is touched, or the right phrase appears in a plan)?
- Is it a **leaf** (you invoke it by name when the task calls for it, no chain)?
- Is it an **orchestrator** (it sequences other skills with stop conditions, like `/ship`)?
- Is it a **hand-off** (its output feeds the input of the next skill, no orchestrator needed)?

The answer is often "leaf today, route later" or "leaf today, hand-off when the next skill exists." Naming the shape now makes the next skill's place obvious.
