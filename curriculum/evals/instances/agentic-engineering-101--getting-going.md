# Eval instance — AE101 M1 "Getting going + context (+ MCP + first skills)"

**Target artifact:** `curriculum/exercises/ship-trivial-bug.md`
**Module file:** `curriculum/trainings/agentic-engineering-101/getting-going.md`

> **Post-restructure note (2026-04-22):** M1 renamed from "Ship with agents" to "Getting going + context" as part of the 6+2 shape. Eval judges below are pre-restructure; re-audit needed when the MCP/first-skill orientation ramp gets added to the module body (Pass 2 work).
**Eval template:** `curriculum/evals/exercise.md`

**Eval runs:**
- 2026-04-21 — initial draft shipped; LLM-judge APPROVE, simulation 7.5/10 with 4 findings
- 2026-04-21 (late) — delivery architecture reshape: content folder on disk, compounding artifacts in student's real repo (no `module-1/` training-dir state, no `prework/bug.md`, ADR goes to `docs/adr/`, CLAUDE.md at repo root). Re-run judges after reshape.

---

## The judges

### Primary — the leap test

After completing this exercise, the student can:
- Run Plan → Work → Review end-to-end on a real bug in their own repo, with plan mode used deliberately and at least one turn of push-back on the plan
- Name the shape of what they just ran (four beats: plan / work / review / loop back) when asked, without having been taught it as a concept first
- Log a decision-journal entry as an ADR in their repo (`docs/adr/NNNN-slug.md` or the repo's existing convention), capturing one trade-off from the fix (choice, alternative, reasoning)

If a self-taught mid-layer engineer (1–8 years, using Claude Code weekly, never taught any of this formally) walks out of this exercise able to do these three things, it's good enough.

### Framing fidelity

The exercise leads with the module's Big Idea: **The first compound loop closes on a trivial bug from your own backlog — the substrate every module after this one rides on.**

Anti-framings to avoid:
- Framing the loop as "a new technique to learn" — it's a shape to recognize after running
- Framing plan mode as "a feature to try" — it's a habit to install on trivial work, so it's there on non-trivial work
- Treating the bug as the point — the bug is the vehicle

### Learning goal fit

Enables these Bloom-tagged LOs from the module file:
- **Run** Plan → Work → Review end-to-end on a trivial bug, plan mode used deliberately (Apply) — P2, P3
- **Recognize** the shape of what you just ran, named by two practitioners who wrote it up before you (Analyze) — P5
- **Log** one decision-journal entry capturing a trade-off you made during the fix (Apply) — P4
- **Seed** a rules file from a session retro — covered in module Debrief, not in this exercise (Apply)

### Module-to-module arc

Picks up from: **"the trick you brought"** (Connections) + **the wizard move** (opener lecture, framing that the loop is the shared trick the room gets on top of its own tricks).

Hands off to: **the M1 Debrief** (Compound step) — the ADR entry in the repo + the P5 shape-naming feed the Debrief prompt that writes (or integrates into) the repo's `CLAUDE.md`.

Sets up for M2: **the rules-file-from-retro pattern scales to multi-repo + business context.**

### Mood lands

Module 1 mood contract: **joyful creation — *"it works, on my repo."*** Leave the student feeling their velocity just multiplied on real work. Do NOT resolve into "now the real work begins" — M2 handles that shift.

Scored per phase + close, 8+/10 required:
- **P1 close** — curiosity + mild ownership (*"okay, this is actually my thing"*). Drift risk: bureaucratic feel if criteria read as a gate.
- **P2 close** — friction-but-productive (*"I pushed back on Claude and Claude took it"*). Drift risk: rubber-stamp feels flat → facilitator-premium signature (7/10 without Nerd push-back).
- **P3 close** — quiet satisfaction (*"the agent worked while I watched"*). Drift risk: stall/drift → frustration.
- **P4 close** — possession (*"I saw it, I journaled it, it's mine"*). Drift risk: skim-not-read → hollowness.
- **P5 close** — recognition, the *"oh — that's what I just did"* moment. **This is the joy beat.** Drift risk: over-teaching Klaassen/Huryn → academic feel → kills recognition.
- **Exercise close** — joyful creation, primed for the Debrief to sharpen. Drift risk: exhaustion from P3 overrun → compound step feels like more work.

### The teaching moment lands

The exercise is designed to reliably produce this aha:
- **"I just ran a structured loop on real code, and when I look back at it, I can name the shape — four beats. Two practitioners wrote this up before I did it, and I recognize their names because I recognize what they named."**

The load-bearing beat is P5. If P5 is skipped, compressed, or pre-empted (facilitator explaining Klaassen up front), the exercise fails the teaching moment even if the bug ships.

Fragility check: reasonable skill variation cannot skip the moment. Engineers who ship fast go to the "run it again on a second bug" extension; engineers who stall on P3 still hit P5 because P5 is short and depends on the diff + decision journal, not on a clean PR merge.

### Failure modes named

See maintainer section in the exercise file — watch-fors cover rubber-stamp (P2), drift (P3), skim-not-read (P4), over-teach-temptation (P5). Decision points cover P3 overrun, early finish, repos without tests.

### Time-boxed

55–70 min inside 1h45 module. Phase breakdown:
- P1: 5 min
- P2: 10 min
- P3: 25 min
- P4: 10 min
- P5: 5 min
= 55 min target, 70 min ceiling

### Facilitator briefing complete

Watch-fors, decision points, plug points, Nerd logic — all in maintainer section. Agentic Nerd skill doesn't exist yet; TODO flagged in module file + exercise file.

### Riffs on recognized frameworks

Two frameworks, both practitioner-grounded:
- **Compound engineering** (Kieran Klaassen, Every Inc.) — named and attributed at P5. Convergence Level 3. Will Larson validation Jan 2026.
- **Three-block memory** (Paweł Huryn) — Block 2 (Decision Journal) runs in P4; attributed at P5. Level 2 single-experiment.

Integration, not decoration: the exercise *runs* the frameworks before naming them. The P5 recognition is the "I just did this" moment. Not vendor fluff, not outdated consultancy.

### Scaffold / worked example provided

Every artifact the student produces has an explicit prompt scaffold inline:
- P2 plan prompt (copy-paste, no mid-prompt placeholders besides the student's bug description)
- P4 decision-journal prompt (with line/file/alternative filled in by student)
- P5 shape-naming prompt

No unfamiliar artifact type expected from thin air.

### Prompt design

All three prompts are paragraph-structured, under ~200 words each, no mid-prompt `[BRACKETS]` the student must inline-edit besides the natural `[line X in file Y]` reference which the student writes once at composition time. Closing markers present. Copy targets named (*"copy → Claude Code"*).

### Plug points real

- Student's own repo (universal plug)
- Student's own bug from prework (specific plug)
- Student's own diff line for P4 push-back
- Nerd interview at P1 as last-resort fallback

Never generic, never pre-built.

### Voice

- Written TO the student throughout; no facilitator directives in body
- Trailing `<!-- maintainer -->` cut marker used; facilitator notes below
- Second person
- Builder voice with Rory counterintuitive beats (*"Don't pick a good bug. Pick a trivial one."*, *"Plan mode on a trivial bug feels like overkill. Run it anyway."*)
- Banned words audited: `honest`, `delve`, `landscape` (verb), `importantly`, `crucial`, `ritual`, `practice` (noun), `ceremony` — zero instances in student-facing body (verify at ship time)

### Business-audience language

AE101 audience is software engineers, NOT the Bootstrap builder-leader audience. Engineer-earned terms are fine: `plan mode`, `diff`, `PR`, `stack trace`, `repro`, `decision journal`, `stall`, `drift`. Still banned in student-facing prose without earning: `orchestrator`, `RAG`, `embeddings`, `subagent` (subagents haven't been earned yet in M1; deferred to later modules).

SVP test replaced with: *"would a 3-year Django/Rails/Go engineer flinch at this word without explanation?"* No flinches detected.

### Length

Student-facing body: ~650 words. Within 400–700 band.

### Specificity

Named mechanics (exact prompts, Shift+Tab plan-mode move, specific push-back quotes), named practitioners with source URLs, realistic participant dimensions (*"agent picks up unrelated refactors"*, *"student says 'looks fine' in under 30 seconds"*).

### Research-backed claims

Every detail-layer claim sourced:
- **Compound engineering / four-step loop** — Klaassen, Every Inc. Source: `continuous-research/platform-watch/coding-agents/runs/2026-04-21-klaasen-compounding-engineering.md` + `every.to/source-code/compound-engineering-the-definitive-guide` `[practitioner direct]`. Freshness: within 6 months. Convergence Level 3 (10+ independent practitioners per the cross-adoption run file).
- **Three-block memory / decision journal** — Paweł Huryn. Source: `continuous-research/insights.md` lines 1051–1065 + `productcompass.pm/p/claude-md-snippets` `[practitioner direct]`. Freshness: 2026-04-01. Level 2 single-experiment — flagged as "one practitioner's precise framing," not claimed as convergence.

Vision-layer framing (no KB backing needed, labeled as framing):
- *"The substrate every module after this one rides on is the loop"* — Antti's arc framing
- *"Teach the loop abstractly and engineers nod. Run the loop head-on and the shape lives in muscle memory."* — pedagogical vision
- *"You become the Claude wizard by running the loop on real work"* — positioning

---

## Essential vs contributory

**Essential (must pass):** Primary leap test, Framing fidelity, LO fit, Arc, Mood 8+/10 per phase, Teaching moment, Frameworks, Facilitator briefing, Scaffold, Prompt design, Plug points, Business-audience language, Auto-fail red flags none.

**Contributory (can TODO):** Failure modes fully named (already covered), Time estimate precision (covered), Voice polish (covered), Length (within band), Specificity depth (solid).

**Red flags check:**
- Framed as "test" / "validation"? No.
- Pre-built criterion? No — student brings bug.
- No time estimate? No — 55–70 present.
- LLM-tell words? Zero (to verify at grep time).
- Toy data? No — student's repo.
- Could run without producing teaching moment? No — P5 is load-bearing and depends on P2–P4 artifacts.
- Unfamiliar artifact from thin air? No — every artifact has an inline scaffold.
- `[BRACKET]` placeholders inline? No — `[line X in file Y]` is one-time composition, not find-replace.
- More than one H1? No.
- `---` YAML? No.
- Unearned tech jargon? No — all engineer-earned.

---

## LLM-as-judge prompt

Run separately — instance ready for judge.
