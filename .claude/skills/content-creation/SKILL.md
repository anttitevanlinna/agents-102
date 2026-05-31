---
name: content-creation
description: Create or revise curriculum content for Agents 102 (modules, exercises, lectures). Use when writing a new module/exercise/lecture, reshaping existing content, creating a new training variant, or reviewing whether content follows project rules. Enforces the three-pass build, the one-exercise-per-module principle, include-link conventions, and content-strategy ↔ module file alignment.
---

# Content Creation — Agents 102

Generation-time rules. Architecture → `curriculum/CLAUDE.md`. Pedagogy → `curriculum/lecture-guardrails.md`.

## Preflight

1. **`bosser-strategy` skill installed?** If absent → STOP. Skill missing, generation requires private strategic context, contact maintainer. Cross-refs use `` `bosser-strategy:<filename>` `` — read on demand.
2. **Pin delivery architecture** (Agents 101 vs AE101 vs other) before any student-facing file. Different models, different runtime contracts.
3. **Identify today's surface.** Load matching `memory/check_*.md` compendium per `.claude/rules/content-rules.md`. Generation-time, not post-hoc.

## Firing-moment router

SKILL.md = always-on (preflight + PDCA + mood arc). Compendiums (`check_*.md`) autoload via surface-detector hook. Load skill companions on firing moment:

- Prompt block → **`prompts.md`**
- Body prose / student-facing → **`writing.md`**
- PDCA step 6 (sim/test), parallel:
  - **`simulation.md`** — Class A persona-reader (mood / confusion / arc)
  - **`simulation-behavior.md`** — Class B per-prompt risk distribution

## Session shape default

Apply the training's own pattern to producing the training. M5 → diagnose/package/re-send the session itself. M6 → run M6 prompts on session artefacts. SKILL.md update → run SKILL.md's PDCA on the update. Pin at session open.

## Strategy-first

Before drafting, answer:

1. **Which module** — Big Idea from `bosser-strategy:content-strategy.md`.
2. **Which mood** — per-module `Mood (deliberate)` + mood arc below.
3. **Where in the 8-module rhythm** — each mood feeds the next.
4. **Which canonical structure** — when module names one (e.g., M7's four sharing strategies), use verbatim.

Can't answer? Read content-strategy.md until you can.

## Pre-generation reads

1. `bosser-strategy:content-strategy.md`
2. `curriculum/CLAUDE.md`
3. `curriculum/lecture-guardrails.md`
4. `bosser-strategy:philosophy.md`
5. `.claude/rules/content-rules.md` → today's compendium(s)
6. `continuous-research/insights.md` + domain findings as needed

Verify: `python3 -m http.server 8000` at repo root → `http://localhost:8000/site/curriculum.html`.

## Two modes

- **Strategy-session** — iterative, Antti steers per turn.
- **Long-running** — plan pinned two turns + sign-off; Do/Test/Check run autonomous; handoff = draft + sim report + self-eval. Strategy: `curriculum/module-design-long-running-strategy.md`.

Same PDCA, different cadence.

## PDCA

**Plan:**
1. **Antti's input** — what + why + constraints.
2. **Strategy alignment** — read module section + Big Idea + Mood. State the mood in one sentence (emotional state student leaves in + sets up next piece). Sibling files (module spine, content-strategy, eval instance) update same edit.
3. **Evals** — propose judges. Update template if missing judge. Save instance to `curriculum/evals/instances/<training>--<slug>.md`. Mood = unease/complexity → leap-test rewards unease.
4. **LOs** — pull Bloom-tagged verbatim from module file into eval instance.

**Do:**
5. **Write** per `writing.md` / `prompts.md`.

**Test:**
6. **Simulate** per `simulation.md` + `simulation-behavior.md`. **Auto-fire `curriculum-pre-ship-audit`** when any cycle turn changed: phase structure / LOs / mood contract / forcing-function / practitioner artefact. Polish in unchanged phases doesn't trigger. Not deferrable as pre-cohort TODO.

**Check:**
7. **Eval** — LLM-as-judge + Antti taste review. Verdicts: APPROVE / APPROVE WITH TODOs / REVISE. Same auto-fire rule.

**Act:**
8. **Compound** — update system in same turn (eval template, sim protocol, this file, `curriculum/CLAUDE.md`, `memory/`). Invoke `/compound` for cross-cycle corrections.

**Cycle-close:** if this cycle was triggered by sim/eval REVISE, re-fire same skill against same file list to confirm PASS. Author assessment ≠ verdict.

**Edit-direction boundary** → `compounded/2026-05-02-platform-sim-eval-verdicts-are-read-only.md`

**Quality line per touched file** → `curriculum/quality-format.md` (enforced by `curriculum-pre-ship-audit`; mechanical-tested requires `@ <short-sha>`).

**TODO discipline** → `compounded/2026-04-28-content_creation-remove-done-todos-not-strikethrough.md` + `-todo-vs-deferred-marker.md` + `-evaluate-dont-default-defer.md` + `2026-05-14-content_creation-todo-surface-open-decisions-only.md` + `2026-05-25-content_creation-harness-findings-route-to-improvements-not-cohort-punchlist.md` (cohort punchlist = curriculum decisions only; harness → runner `IMPROVEMENTS.md`). Open decisions only; CLOSED = DELETE the bullet — never a decision-record/history. A closed item that carries a design decision → move it to source (prompt frontmatter `note:` / exercise maintainer block) THEN delete the bullet.

**Splitting a SKILL.md or compendium** → `compounded/2026-04-27-content_creation-pre-split-rule-docs-shrink-or-die.md`.

## Mood arc

| Module | Mood | Quote | Failure (wrong edit) |
|---|---|---|---|
| M1 | Joyful creation | *"I made this. It's me."* | Tech warm-up |
| M2 | Satisfied compounding | *"It runs while I sleep."* | Tool setup |
| M3 | Unsettled competence | *"I wonder if this is right?"* | Resolving the doubt |
| M4 | Deepened unease | *"Damn, this is complex stuff."* | Security tidy/solved |
| M5 | Mechanical rescue | *"Ahh, this is actually fixable."* | Premature rescue |
| M6 | Unleashed leverage | *"We can automate the loop."* | Eval = compliance |
| M7 | Generous impulse | *"This is starting to work. I wonder if others could benefit?"* | Sharing = governance |
| M8 | Awe and curiosity | *"Oh shit. Where is this all going?"* | Graduation ceremony |

Rhythm: joy → compound → unease → deeper unease → rescue → leverage → generosity → awe.

Operational:
- Check current + next mood before Debrief / Close / Bridge.
- *"Does it feel right to be uncertain here?"* valid when mood = unease.
- No verification / check-URL / fix-bug steps in sustained-doubt modules. Checking resolves doubt; doubt is the curriculum.
- Don't front-load M5's rescue into M3/M4.
