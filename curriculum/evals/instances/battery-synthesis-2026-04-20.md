# Test Battery Synthesis — 2026-04-20

First full battery run. 4 subagents in parallel, ~4 min wall clock. Coverage: all 8 modules + prework × 3 lints + 8 seams + 1 arc-pass = 32 distinct checks.

**Verdict:** APPROVE WITH TODOs. Arc holds; M3→M4→M5 rescue is gold; M8 is the weakest module by every measure.

## Outputs

- **Lints:** `curriculum/evals/instances/lints-full-bootstrap-2026-04-20.md`
- **Seams 1-4:** `curriculum/evals/seams/instances/seams-1-to-4-2026-04-20.md`
- **Seams 5-8:** `curriculum/evals/seams/instances/seams-5-to-8-2026-04-20.md`
- **Arc-pass:** `curriculum/evals/instances/arc-pass-2026-04-20.md`

## Convergent findings (multiple tests agree)

### 1. M8 is structurally incomplete
**Seen by:** arc-pass #1 (severity 5), seam 8, lints (no time budget)
- No Connections section
- No Debrief section
- "Tentative Live Deliberation" reads as internal design notes in student-facing copy
- No **Time:** lines anywhere
- Sponsor's "You are now agent builders" close risks reading as graduation ceremony — directly violates the M8 mood contract (awe/forward-hunger, NOT completion)

**This is arc-breaking.** M8 is the peak module and currently hedges its own peak.

### 2. Implicit artifact handoff across multiple seams
**Seen by:** seams 2, 3, 5, 8 all flag RIGHT modules assuming artifacts that aren't named in student-facing text
- Seam 2 (M1→M2): `module-1/CLAUDE.md` scope, `module-2/challenge.md` consumption, scaffold zip timing all silent
- Seam 3 (M2→M3): M2's crux.md, challenge.md, scheduled-agent homework dropped
- Seam 5 (M4→M5): M4 Homework micro-skill has no landing in M5
- Seam 8 (M7→M8): flywheel claim ("shared context") told but not shown — which artifacts arrive?

**Fix template:** Seam 4 is the gold pattern — M4 Phase 1 names M3's artifacts by path. Apply the same shape to the RIGHT side of every fraying seam. One-line "You arrive with [named files]" in each RIGHT module's Meta or Connections.

### 3. Banned jargon leaks in M3 Meta
**Seen by:** lints — *architecture*, *orchestrates*, *pipeline* in M3 Meta line 8 (unearned, pre-student-facing introduction)
- Plus *retrieval-augmented generation* unglossed in `grounded.md` line 45
- M3 Meta also has a borderline *subagent* leak

**Fix:** single-file rewrite of M3 Meta in business-audience language.

### 4. Time budgets missing universally
**Seen by:** lints + arc-pass implicitly
- No module has all five phases timed (Connections / Lectures / Exercise / Debrief / Bridge)
- M6 lecture, M8 everywhere, M1 lectures — zero Time: lines
- Pre-existing Pass-3 debt, but needed before any cohort

## Prioritized fix list

| Sev | Finding | File(s) | Effort |
|---|---|---|---|
| 5 | M8 missing Connections + Debrief, "Tentative Live Deliberation" in student-facing copy | `trainings/bootstrap/agents-building-agents.md` | Medium — needs authoring, not just editing |
| 5 | M8 close risks graduation-ceremony; violates mood contract | same file, sponsor close | Medium — reframe the identity-naming as forward, not closure |
| 4 | M3 Meta leaks 3 banned terms | `trainings/bootstrap/multi-agent-systems.md` line 8 | Small — single-paragraph rewrite |
| 4 | Implicit artifact handoff — Seams 2, 3, 5, 8 | `building-agent-systems.md`, `multi-agent-systems.md`, `output-quality.md`, `agents-building-agents.md` | Small — one-line "You arrive with..." per file, modeled on M4 |
| 4 | M8 doesn't name arriving M1-M7 artifacts | `agents-building-agents.md` | Small once Sev-5 authoring is in |
| 3 | M7 pre-read front-loads Access-Trust Gap stat before mood earns it | M7 pre-read | Small — move statistic to payoff position |
| 3 | `name-your-challenge.md` prompt: `challenge.md` → `module-2/challenge.md` | `exercises/name-your-challenge.md` | Trivial |
| 3 | `retrieval-augmented generation` unglossed | `exercises/grounded.md` line 45 | Trivial |
| 3 | M7 "bounded-question primitive" undefined | M7 module | Small — define or remove |
| 3 | M7 strategy-skills-move unresolved (Rumelt/Martin/Klein in pre-read, skills in M8 scaffold) | M7 + M8 | Decision needed before fix |
| 2 | Time: lines missing across modules | all module files + lectures | Medium — pass across files, but mechanical |
| 2 | M4 Homework micro-skill landing in M5 | `output-quality.md` opener | Small |
| 2 | M6 Bridge vs M7 Connections focus mismatch | both module files | Small — align Bridge target |
| 1 | prework prompts don't name target folder | prework.md | Already covered by Workbench scoping; non-issue |
| 1 | M1 module-1/ scope boundary silent | getting-going.md | Self-study SKILL.md covers it |

## What's strong (preserve)

- **M3 → M4 → M5 rescue arc** is the best-engineered seam in the training. Don't touch.
- **Seam 6 (M5 → M6)** is the gold standard — `judges/groundedness-judge.md` path matches verbatim; "you weren't in the room" nails the rescue→leverage pivot. Pattern to emulate.
- **Philosophy callouts** are earned-in-body throughout. Zero front-loaded belief numbers in student-facing text.
- **"Crux" vocabulary progression** is exemplary — introduced in M2, reused in M7, context carries.
- **Seam 4 (M3 → M4)** is the template for fixing the implicit-artifact-handoff pattern elsewhere.

## Impact on Antti's prework + M1 manual run

**No new blockers.** The battery surfaced no issue that affects the prework + M1 run specifically:

- Seam 1 (prework → M1): HOLDS
- Prework lints: clean (BREAK issues were already caught + fixed pre-battery)
- M1 lints: clean apart from missing Time: lines (known debt)

Your manual run remains good-to-go.

## Battery performance

- **4 subagents, ~4 min wall clock** (longest ~4.2 min)
- **~440K tokens total** across subagents
- **32 checks covered** (27 lint × 3 lints, 8 seams, 1 arc-pass, minus acceptance)
- **Signal density:** ~15 findings from ~4 min of compute, prioritized automatically
