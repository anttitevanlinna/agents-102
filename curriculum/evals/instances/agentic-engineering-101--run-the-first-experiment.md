# Eval — AE101 M4 "Run the first experiment" (exercise: walk-and-send-off)

Filled instance of `curriculum/evals/exercise.md`. Target: `curriculum/exercises/walk-and-send-off.md` + module file `curriculum/trainings/agentic-engineering-101/run-the-first-experiment.md` (module-level Debrief + send-off are evaluated together with the exercise).

**Eval runs:**
- 2026-04-23 (Pass 2 handoff) — LLM-as-judge + three-persona sim (Maija mid-competent / Greg opinionated-senior / Jin fast-operator).
  - **LLM-judge verdict: APPROVE** — all 18 essential judges pass; no auto-fails; mood 8+ at every beat by judge read. Two pre-cohort TODOs noted: Huryn freshness re-check, Claude Code session-persistence capability check.
  - **Three-persona sim verdict: APPROVE WITH RESHAPE** — mood averages below 8+ bar across all three personas (Maija 7.8, Greg 7.5, Jin 7.7). Personas converged on seven reshape items.
  - **Reshape applied 2026-04-23** (same cycle): Phase 1 three-candidate move softened to conditional (*"if I already have one, name it"*); Phase 2 "pick exactly three" → "probably two or three, not all five"; sponge-not-rock metaphor trimmed from student-facing prose (kept in Nerd scripted line + trainer calibration); *"Run this as a subagent"* spelled out (Task tool / `/clear`); laptop-close prose rewritten to "leave awake, plugged in" with OS-specific caffeinate guidance; lecture coda *"You're testing. You're learning."* cut; *"Claude's job is to draft, yours is to correct"* replaced with codebase-judgement framing. Plus new Nerd-logic entry: hard push against Phase 2 gaps deferred as "architectural" (per Jin's critical finding — boring failures can't be diagnosed by contrast).
  - **Not applied:** re-simulation after reshape; Huryn freshness re-check; Claude Code session-persistence capability check. All tracked as Pass 3 TODOs.

---

## The judges

### Primary — the leap test *(Antti steers)*

After completing this exercise, the participant can:
- **Pick a multi-hour task** from their backlog that meets the three load-bearing criteria (sustained coherence, requirement-weaving, multi-file reasoning) — and explain in a sentence why a smaller or larger task wouldn't teach what M5 needs to diagnose
- **Run gap analysis on an agent setup** without prompting help — walk a rules file + memory + tools against a task and surface the top 3 thin spots that will hurt a multi-hour run
- **Launch an un-packaged long-running task as an experiment, not a performance** — choose between letting it run or stopping when traces reveal enough, without feeling they failed the module if they stop early

If a self-taught mid-layer IC walks out of M4 able to do these three things on their own code on Monday, it's good enough.

### Framing fidelity *(universal)*

The exercise leads with the module's Big Idea: **Walk what you've built against a real multi-hour task, fill the worst gaps, send it off un-packaged — and learn from what the agent does with your system as it stands.**

It avoids these anti-framings:
- *"Prepare the agent correctly before you launch."* (Compliance framing — wrong mood, wrong operator stance. M4 is readiness, not correctness.)
- *"Three-layer memory architecture: single-repo, multi-repo, business rules."* (The Pass-1 shape, explicitly rejected. M4 thickens what the coming task needs, not a reference architecture.)
- *"This is the send-off module."* (M5 owns packaging and the second send-off; framing M4 as THE send-off module smuggles M5's leverage mood back into M4's curious readiness.)

### Learning goal fit *(universal)*

Enables every LO from the module file (all six). No LO is delegated to a different exercise — M4 ships a single exercise covering pick / walk / fill / frame-recognition / compound / send-off.

### Module-to-module arc *(universal)*

Picks up from **M3's "earn the trust" close** — student has a small shipped feature, one authored skill in the team kit, a hardening ADR, and a `CLAUDE.md` grown with one codebase-specific pattern.

Subtly hands off to **M5's "learn from the test, re-send packaged"** — the un-packaged run (or stopped-with-traces result) is what M5 reads on open. The un-packaged-ness of the send-off IS the handoff; M5 has nothing to teach with if M4 packages.

### Mood lands *(universal — essential)*

Module mood: **curious readiness** — *"I've built enough to try; let's see what the agent does."*

Scored 1–10 per phase + close. Target 8+/10 at every beat.

- **Phase 1 end:** student has a task scoped, feels ready to read their own work against it. Stakes in the room.
- **Phase 2 end:** student has closed three gaps and feels more-ready-than-before, not complete. Deliberate incompleteness.
- **Phase 3 end:** student has recognised the three-block frame in their own material. Quiet satisfaction without triumph.
- **Debrief end:** student has pushed back on Claude's `CLAUDE.md` summary, feels the rules file is the best version of itself tonight. Ready to launch.
- **Close of exercise + send-off:** student has launched the task, closed the laptop (or stopped mid-run). **Curious readiness** — *"I wonder what it'll do. I wonder what I'll find."* Primed for M5's learning-through-contrast, not closing a loop that's already closed.

Mood-stealing diagnostics:
- Compliance drift (*"did I prepare enough?"*) → Phase 2 Nerd reframe
- Performance anxiety at send-off (*"what if it fails?"*) → Debrief cancel-is-legit rule
- M5-leverage voice smuggling in (*"I just sent an agent off with real work!"*) → Phase 3 or Debrief prose wrong-register; fix in copy
- M1-joy voice smuggling in (*"look what I built!"*) → Phase 3 quote-from-own-work framing misread as triumph rather than recognition

### The teaching moment lands *(exercise-specific — essential)*

The exercise is designed to reliably produce this aha:
- **"I've been building Huryn's three blocks for four modules without knowing I was. The frame is not something I have to build — it's something I already have."**

And this secondary aha:
- **"I'm launching this as a test, not a performance. I can stop it when I've seen enough."**

If reasonable variation in student skill can skip the primary aha — the recognition of the three-block frame in their own work — the exercise is fragile. Primary mitigation: Phase 3 prompt explicitly asks Claude to quote from the student's own ADR / observation / test-strategy skill BEFORE naming the frame. If Claude names the frame first, the recognition is replaced by a vocabulary lesson.

### Failure modes named *(exercise-specific)*

- **Task-sprawl at Phase 1** → diagnostic: scoped task has no "done" the student can state in a sentence → fix: Nerd forces a slice
- **Audit busywork at Phase 2** → diagnostic: Claude returns 12+ items instead of top 5 → fix: re-run prompt with ranked-top-5 enforced
- **Over-fill at Phase 2** → diagnostic: student tries to close all five gaps → fix: Nerd names sponge-not-rock rule; M5 teaches the other two
- **Huryn-as-lecture at Phase 3** → diagnostic: student reads the three-block frame from Claude without recognition → fix: re-run Phase 3 prompt insisting on quote-first, name-second
- **Package-pre-empt at Debrief** → diagnostic: student adds a plan.md or builds a verifier before sending off → fix: Nerd names the design rule — "un-packaged is by design, don't pre-empt M5's learning"
- **Send-off anxiety** → diagnostic: student hesitates on the final prompt → fix: Nerd names cancel-is-legit
- **Business-rules skipped** → diagnostic: student has no business-rules layer and moves on silently → fix: Nerd names the finding — "the gap IS the finding; write one line in memory"

### Time-boxed *(exercise-specific)*

**Exercise body: 60 min** (Phase 1: 10 / Phase 2: 35 / Phase 3: 15). **Module Debrief + send-off: 15–20 min** (owned by module file, not this exercise).

Drop-in use outside a 2h module slot: not supported as designed. The arc depends on the compounded M1–M3 state; outside a cohort that has done M1–M3, the exercise has nothing to walk against.

### Facilitator briefing complete *(exercise-specific — essential)*

- Watch-for notes: task sprawl / audit busywork / voice-smuggling / package-pre-empt (all in exercise maintainer block)
- Decision points: Phase 1 >15 min (force slice), Phase 2 audit >15 min (re-run prompt), Phase 3 <10 min (redo with quote-first), whole-room mood <7 (check Phase 1 task quality)
- Plug points: student's task + sponsor-stated rules-file home + sponsor-stated memory home
- If a participant stalls past 10 min in any phase: Nerd takes over the pacing; facilitator moves to the next room if cohort delivery.

### Riffs on a recognized framework *(exercise-specific — essential)*

- **Gap analysis** — named in Phase 2 prose as *walk the system you have against the system the task needs.* Pedagogically central; student uses the move to generate the filled gaps. Transferable to every future agent hand-off.
- **Huryn's three-block memory** — named in Phase 3 through recognition in student's own material. Pedagogically central; the aha IS the recognition.
- **Compound engineering** (Klaassen) — Debrief is Klaassen's Review + Compound step; fourth rep for the student. Not name-attributed here (landed at M1).

All three are practitioner-grounded frames, not consultancy theatre.

### Scaffold / worked example provided *(exercise-specific — essential)*

Every artifact the student produces is either (a) familiar from a prior module or (b) scaffolded inline:
- Subagent invocation for audit — new pattern introduced at M3 (Ex1 + Ex2 as subagents); reused here
- Gap-analysis fill — conversation, not artifact-production; no new pattern
- Huryn three-block rearrangement — inline prompt does the rearrangement; student does not author the frame from scratch
- `CLAUDE.md` self-compound at Debrief — pattern introduced at M1 Debrief; fourth rep

No artifact is asked for from thin air.

### Prompt design *(exercise-specific — essential)*

Four prompts total (three in exercise, one in module Debrief). Each checked:
- No mid-prompt `[BRACKET]` placeholders. Variable content handled via (a) conversation-before (Phase 1 task pick), (b) reading-from-disk (audit, Huryn rearrangement, Debrief compound), (c) literal task-reference (send-off prompt refers to "the task we scoped").
- Paragraph structure — all four prompts under 1 page, multi-paragraph readable.
- Canonical presentation shape used (label + blank line + fenced block + close marker).

### Plug points real *(exercise-specific — essential)*

All three plug points are real and named in module/exercise prose: student's own task, sponsor-stated rules-file home, sponsor-stated memory + business-rules home. None are generic; none are pre-built.

### Voice *(universal)*

- Second person throughout body ✓
- Builder voice (Seth × Rory × Risto) — tested: "you are testing and you are learning" lands epistemically direct without performing; "sponge, not a rock" is concrete and memorable; "traces are data" earns its reframe.
- No facilitator instructions in student-facing body ✓ (watch-fors live below `<!-- maintainer -->`)

### Business-audience language *(universal — essential)*

AE101 audience is engineer ICs, so some technical terms are earned by audience baseline:
- "subagent" — was introduced at M3 (Ex1 + Ex2 as subagents, LO included); reused here, no re-earning needed
- "connector" — earned at M1; reused
- "ADR" — earned at M3 Ex2; reused
- "CLAUDE.md" — earned at M1; reused
- "skill" — earned at M3; reused

No unearned tech jargon flagged.

**Banned-word grep:** `honest`, `delve`, `landscape` (verb), `importantly`, `crucial`, `substrate`, `ritual`, `practice` (noun), `ceremony` — zero hits in module file + exercise file + lecture file. Verified at generation close.

### Length *(universal)*

- Module file: ~175 lines incl. maintainer block (body ~80 lines)
- Exercise body: ~750 words
- Lecture: ~620 words

Within targets.

### Specificity *(universal)*

Named mechanics (four full prompts, none placeholder-bearing); named artifacts from M1/M2/M3 carried through (CLAUDE.md, ADRs, test-strategy skill, connectors); realistic student task dimensions in Connections (migration / refactor / test-coverage / performance chase / API cutover).

### Research-backed claims *(universal — essential)*

**Detail-layer claims + their backing:**
- **Huryn's three-block memory** — source: Huryn's practitioner-direct writing; verified during M1 generation cycle 2026-04-21. **TODO (Pass 3):** freshness re-check before first cohort delivery (6-month rule).
- **Ronacher's three-pattern** — mentioned as forward reference; named but not taught here. M5 owns the practitioner-direct source verification.
- **Compound engineering (Klaassen)** — attributed in M1; implicit in M4's Debrief pattern. Source verified at M1 generation.

**Vision-layer claims (not requiring KB backing):**
- Test-and-learn spirit, two-run arc framing, cancel-is-legit rule, task-design requirement (sponge-not-rock). Antti's framing; labeled as framing, not empirical finding.

---

## Essential vs. contributory — this instance

**Essential — passes at Pass 2 handoff:**
- Primary leap test ✓ (three outcomes observable on Monday)
- Framing fidelity ✓ (three anti-framings explicitly refused)
- Learning goal fit ✓ (all six LOs covered in the exercise)
- Module-to-module arc ✓ (M3 → M4 → M5 hooks both directions)
- Mood lands (TBD — awaits simulation + human eval)
- Teaching moment lands ✓ (primary + secondary aha named + forcing function in Phase 3 prompt)
- Riffs on recognized frameworks ✓ (gap analysis + Huryn three-block)
- Scaffold / worked example ✓ (all artifacts familiar or inlined)
- Prompt design ✓ (no mid-prompt placeholders; canonical shape)
- Plug points real ✓
- Business-audience language ✓ (banned-word grep clean)
- Auto-fail red flags: none triggered at write time

**Contributory — TODO list:**
- Simulation results (three personas) — dispatched in parallel with this eval
- Task-size calibration reference file — `curriculum/reference/picking-a-first-long-task.md` (Pass 3)
- Agentic Nerd skill — portfolio-level TODO; Nerd logic is in maintainer block
- Capability check on overnight session-left-running + mid-run Ctrl+C (M5 capability check; feeds back into Pass 3)

---

## LLM-as-judge verdict (2026-04-23)

**Auto-fail red flags triggered:** None.

**Per-judge scoring:** 18/18 essential judges pass. Mood 8+ at every phase-end + close + send-off.

**Verdict:** APPROVE.

**Top 3 items to defer / sharpen:**
1. Huryn source freshness re-check (Pass 3, pre-cohort) — 6-month rule.
2. Claude Code session-persistence capability check (overnight session-left-running + mid-run Ctrl+C trace preservation) — high-risk for live cohort.
3. Task-size calibration reference (`curriculum/reference/picking-a-first-long-task.md`) — Pass 3.

**One-sentence overall read:** A tight M4 that keeps its curious-readiness mood under every register test, builds the Huryn recognition into the prompt itself so the aha doesn't depend on a skilled facilitator, and holds the un-packaged send-off firmly as M5's material — ready to ship pending two pre-cohort TODOs.

---

## Three-persona sim summary (2026-04-23)

Moods and convergent findings from Maija (mid-competent IC) / Greg (opinionated senior) / Jin (fast operator).

**Mood scores per beat (target 8+):**
| Phase | Maija | Greg | Jin |
|---|---|---|---|
| Phase 1 pick | 7 | 7 | 7 |
| Phase 2 walk+fill | 8 | 8 | 8 |
| Phase 3 frame | 9 | 7 | 6 |
| Debrief | 8 | 8 | 8 |
| Send-off | 7 | 8 | 9 |

**Convergent findings (reshape applied above):**
1. Three-candidate ritual at Phase 1 felt compliance-flavored for students who already have a task.
2. "Pick exactly three" at Phase 2 fill smelled coached; real audit returns often suggest 2 or 5.
3. Sponge-not-rock metaphor over-used across student-facing prose.
4. "Run this as a subagent" ambiguous in Claude Code (Task tool / `/clear` / sub-session).
5. Laptop-close prose confident where capability is TODO.
6. Lecture closing coda *"You're testing. You're learning."* performed what the prose had already earned.
7. *"Claude's job is to draft, yours is to correct"* read consultant-coached.

**Persona-specific critical finding (Jin — applied to Nerd logic):**
Fast operators defer Phase 2 gaps that look "architectural not contextual" — producing boring failures (wrong DB assumption) that M5's diagnosis-by-contrast cannot rescue. Nerd now has a hard-push line for this case.

**Maija's novel win (confirmed):**
Business-rules gap-as-finding pattern ("the gap IS the finding") — "felt like cheating but the exercise blesses it — I'll use this move forever." Strong transfer-to-Monday signal.

**Outstanding after reshape:**
- Re-simulation against reshaped prose — Pass 3.
- Huryn source freshness re-check — pre-cohort.
- Claude Code session-persistence capability check — pre-cohort; blocks M5 Pass 2 as well.
