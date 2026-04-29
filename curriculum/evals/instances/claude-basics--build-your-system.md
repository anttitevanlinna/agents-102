# Eval Instance — Claude Basics M1: Build your system

**Target file:** `curriculum/trainings/claude-basics/exercises/build-your-system.md`
**Module file:** `curriculum/trainings/claude-basics/stop-chatting-build-a-system.md`
**Strategy:** `bosser-strategy:content-strategy-claude-basics.md` § *Stop chatting — build a system*
**Eval template:** `curriculum/evals/exercise.md`
**Audience persona (primary):** IT admin / info-management specialist with medium-to-light chat experience. Has used ChatGPT or Claude a handful of times, knows it produces output, has not yet built a system on top of it. Joining a 3 × 45-minute Claude Basics cohort to learn rollout custodianship.

---

## The judges

### Primary — the leap test

After completing this exercise, the participant can:
- **Generate** a one-page response on a real team task by running a Cowork session with bare prompt (Phase 1) AND with a folder CLAUDE.md (Phase 3), and feel the difference between the two on the same task
- **Write** a folder CLAUDE.md with 3 to 5 rules that reflect the team's specific voice and procedures (not generic LLM-best-practice rules), starting from rule 1 pre-shipped (the OneDrive runtime line)
- **Identify and catch** at least one specific generic claim Claude made about their team in Phase 1, then add a CLAUDE.md rule that prevents the same shape of wrongness from recurring (Phase 4)

If an IT admin with medium-to-light chat experience walks out able to do these three things on a fresh task at their desk after the cohort, the exercise has worked.

### Framing fidelity

Leads with the module's Big Idea: **"With a CLAUDE.md and a real task, you build a system in 45 minutes. Not a chat session. A system."**

Avoids:
- **Tooling-tutorial register.** Cowork setup, connector setup, how-to-paste, OneDrive sync explainer. Those belong in pre-work; the exercise opens with the participant building, not configuring
- **Vendor-demo register.** *"Evaluate Claude's output"* is wrong. The participant isn't evaluating Claude; they're catching Claude on facts they know cold and writing rules that bind the agent to their team's reality

### Learning goal fit

Enables these Bloom-tagged learning goals from the module file (verbatim):
- **Generate** output on your own work by running Claude with no guardrails first, deliberately, to feel the gap
- **Apply** a folder CLAUDE.md and watch the same task produce a different answer
- **Identify** generic or off output by using your own domain knowledge as the evaluator
- **Adjust** guardrails to fix specific failure modes you can name

### Module-to-module arc

Picks up from **prework (Cowork connected to personal SharePoint folder, personal CLAUDE.md written, morning planner agent run once)**. Hands off to **M2 verification (the same instinct, applied to a task where you don't already know the ground truth)**.

### Mood lands

Per-phase + close, score 1 to 10. Threshold: 8+/10 every beat.

| Beat | Expected mood signal |
|---|---|
| Phase 1 close (5 min) | Mild dissatisfaction. *"This output is plausibly fine and I can already see what's generic."* If reads as *"this is great"* — Phase 1 task is too soft |
| Phase 2 close (12 min) | Light pride. *"My rules. My voice. The OneDrive line is pre-shipped, the rest is mine."* If reads as *"Claude wrote my rules"* — participant didn't edit |
| Phase 3 close (16 min) | Surprise. *"Same task, visibly different answer."* If reads as *"basically the same"* — CLAUDE.md is too generic |
| Phase 4 close (23 min) | Custodial confidence. *"I named the wrong thing, the rule catches it, the regenerated output is cleaner."* If reads as theatre — wrong claim was generic-not-specific |
| Phase 5 close / exercise close (28 min) | Confident creation (the module mood). *"Three specific things in this output are mine."* If reads as *"good enough I guess"* — sub-criterion didn't bite |

### The teaching moment lands

Designed to reliably produce: **the feel-the-difference moment between a bare-prompt response on the IT Director's chosen task and a folder-CLAUDE.md response on the same task — where the participant catches Phase 1's wrongness because they know the truth, then turns the catch into a rule they wrote in Phase 2, and watches Phase 3 produce visibly better output on the same input.**

Fragility check: a participant whose IT Director picked a vague Phase 1 task ("how should we use Claude?") may not produce catchable Phase 1 wrongness. The exercise's maintainer block names this and prescribes a pre-cohort dry-run.

### Failure modes named

- **Phase 1 produces output that "looks fine"** → diagnostic = task too generic for catchable wrongness → fix = pre-cohort dry-run; trainer pivots in-room to tone-and-team-voice catch (always wrong on a generic LLM output)
- **Participant edits CLAUDE.md by hand instead of asking Claude** → diagnostic = participant in chat-mode not system-mode → fix = redirect ("ask Claude to make the edit; you read the proposal and push back")
- **Phase 5's "I'd put my name on this" reads as vibe check** → diagnostic = subjective stop condition → fix (already in exercise) = name-three-things-that-are-mine sub-criterion with Claude naming them
- **OneDrive runtime line feels like trainer trivia** → diagnostic = lectured rather than shipped → fix (already in exercise) = pre-shipped as Phase 2 prompt rule 1, not lectured

### Time-boxed

Exercise budget: **28 minutes**. Module budget: 45 minutes (3 Connections + 4 concept + 28 exercise + 7 lecture + 3 Debrief). Phase budget: 5 + 7 + 4 + 7 + 5 = 28. Within Bootstrap exercise time band (drop-in: 20-30 min). NOT under 40 because Claude Basics modules are 45 min, not 1h45.

### Facilitator briefing complete

Maintainer block in exercise file covers: phase-boundary conversation pauses, default task fallback, pre-cohort dry-run instruction, watch-fors per phase, stall-past-5-minutes redirect, plug points list. Plus reference back to strategy doc and eval instance.

### Riffs on a recognized framework

**Compounding.** Named in the closing lecture (`how-do-you-make-your-system-learn.md`) as the finance team's word for returns building on returns. Lightweight framework anchor — IT-team audience doesn't need a heavyweight pedagogical framework on M1. Compounding is the right anchor because it's the move M2 and M3 both extend.

### Scaffold / worked example provided

- **Pre-shipped CLAUDE.md rule 1** (the OneDrive runtime line) gives the participant a starting line they don't have to invent
- **Default Phase 1 task fallback** in maintainer block (*"is it safe to paste customer email content into Claude?"*) covers the case where IT Director hasn't picked a task pre-cohort
- **Phase 4 prompt structures the wrong-claim isolation** (the participant names ONE specific claim, the rule fires on similar future claims, not on everything)

### Prompt design

Five fenced prompts in the exercise. Audit:
- All five carry a one-sentence action lead-in (rule 2)
- Phases 1 and 4 use the open-hook pattern with single colon at end of fence (rule 1, no `[BRACKETS]`)
- No skill paths inside fenced blocks (rule 4 — no skills invoked in M1)
- No markdown shout (`**bold**`, `*italic*`) inside fences (rule 9)
- No runtime forks (Cowork-only training; rule 10 doesn't fire)
- Phase 3 chains by back-reference to *"response.md and CLAUDE.md"* with deterministic paths (rule 5)
- Phase 4 uses append-mode integration explicitly (*"Add ONE rule to CLAUDE.md"*) — append is correct here, not integrate (rule 12)
- Phase 5 names the keep-edge condition implicitly via push-back ("I will confirm or push back on each one"); Phase 5 is iteration not regeneration so niceness-tax (rule 14) doesn't fire as a primary risk

### Plug points real

- **Phase 1 task** — buyer-chosen, IT Director picks pre-cohort. Real
- **CLAUDE.md content** — participant's voice, team's terminology. Real
- **Phase 4 wrong claim** — participant's own catch from Phase 1, not seeded. Real
- **Phase 5 specifics** — what's "specifically yours" is the participant's call, confirmed against Claude's three-name proposal. Real

No pre-built artifacts, no toy data, no generic LLM-prompt-engineering placeholders.

### Voice

Bootstrap voice trio (Godin × Sutherland × Siilasmaa) carries here too. Peer warmth (Godin), counterintuitive reframe (Sutherland — *"build it boring, then build it yours"*), optimistic action on the future (Siilasmaa — the closing lecture lands the *next move* mood, M2 verification).

Body writes TO the participant ("you"); facilitator instructions live below `<!-- maintainer -->`. No author-"we." No creator's name.

### Business-audience language

IT-admin medium-light-chat audience. Tech terms earned on first use:
- *Cowork* — earned in pre-work, used here without re-earning. Acceptable
- *Folder CLAUDE.md* — earned in Phase 2 ("a plain markdown file Claude reads at the start of every session in this folder. It's the contract between you and the agent.")
- *Guardrails* — earned implicitly through use; could earn more directly. Mild contributory issue, not a fail
- *Compounding* — earned in lecture, not in exercise. Lecture-side coverage. OK

No SVP-flinch jargon (no leverage, no robust, no comprehensive). Read-aloud test passes.

### Length

Exercise file body prose: **567 words** (excluding fenced prompt blocks; total above maintainer ~785 with prompts). Within 400-700 prose target. Earlier self-report of "~480" was inflated — verified at the artifact post-judge feedback.

### Specificity

- Named mechanics: Cowork, OneDrive sync, folder CLAUDE.md, response.md filename
- Realistic participant dimensions: IT team going chat-to-system, the IT Director-picked task
- Named conversation-pause beats: Phase 2 *"tell the person sitting next to you,"* Phase 4 *"read aloud the rule"* (organic, not mandated)

### Research-backed claims

No detail-layer claims in exercise body. The compounding metaphor in the lecture is vision-layer (Antti's framing). No practitioner attributions, no numbers, no zombie-stat risk. Clean on `check_research_claims.md`.

---

## Auto-fail red flags

- **Framed as "test" or "validation check"?** No
- **Participant's criterion / artifact pre-built?** No (only the OneDrive runtime line is pre-shipped, by deliberate design)
- **No time estimate?** Has 28 min total + per-phase budgets
- **Toy data instead of participant's own initiative?** No (IT Director's task + participant's team voice + participant's wrong-claim catch)
- **Exercise could plausibly run without producing the teaching moment?** Risk if Phase 1 task too vague — mitigated by pre-cohort dry-run + tone-catch fallback in maintainer block

**Compendium auto-fails (`check_writing.md`, `check_student_facing.md`, `check_prompts.md`):**
- Banned words grep clean (verified)
- Em-dashes in body grep clean (verified)
- No author-"we" or creator's name in body
- No contemplative-pause theatre or room-share commands (Phase 2 and Phase 4 banter cues are organic, not commanded)
- No placeholders inside fenced blocks (verified — Phases 1 and 4 use open-hook)
- All five prompts carry action lead-ins
- Quality line tagged in module + exercise files

---

## Verdict (filled at audit time)

| Judge | Pass / Fail | Evidence |
|---|---|---|
| Primary — leap test | TBD by sim/judge | The three named outcomes are observable in the participant's saved files (response.md, CLAUDE.md) at exercise close |
| Framing fidelity | PASS | Big idea leads. Tooling-tutorial register avoided (no Cowork-setup beats in body) |
| Learning goal fit | PASS | Each LO maps to a phase. Generate=Phase 1, Apply=Phase 2-3, Identify=Phase 1 catch + Phase 4, Adjust=Phase 4-5 |
| Module-to-module arc | PASS | Prework→Phase 1 setup is implicit; Bridge handoff to M2 named in module file |
| Mood lands | TBD by sim | Per-phase signals enumerated above |
| Teaching moment lands | TBD by sim | Feel-the-difference depends on Phase 1 task quality (mitigation in maintainer) |
| Riffs on a recognized framework | PASS | Compounding, finance metaphor, named in lecture |
| Failure modes named | PASS | Four named with diagnostic + fix |
| Time-boxed | PASS | 28 min within 45-min module budget |
| Facilitator briefing complete | PASS | Maintainer block carries watch-fors, defaults, dry-run instruction |
| Scaffold / worked example provided | PASS | OneDrive line + default task fallback |
| Prompt design | PASS | Open-hook pattern used, lead-ins present, no placeholders, no shout |
| Plug points real | PASS | Task, voice, wrong-claim, three-specifics all participant-owned |
| Business-audience language | PASS | Audience read passes; one mild contributory note (guardrails could earn more) |
| Voice | PASS | Bootstrap trio applied; no author-we, no creator-name, second person |
| Length | PASS | ~480 words body |
| Specificity | PASS | Named mechanics, realistic dimensions, organic banter cues |

**Verdict:** APPROVE WITH TODOs (sim + LLM-judge both returned this same verdict, 2026-04-27).

**Sim findings (IT-admin-medium-light-chat persona):**
- Mood scores: 8/7/9/8/9/8 across phases. Phase 2 dipped to 7 on pair-share theatre.
- Three smells caught: pair-share command (Phase 2), clock-watching framing in opening, single-point-of-failure on IT Director Connections opening
- Three lands: *"Tuesday file"* line, *"that bar is too low"* in Phase 5, *"system gets better by being edited"*

**Judge findings:**
- Body word count was 826 (eval-instance self-reported 480, ~70% inflation — `compounded/2026-04-27-pedagogy-self-report-inflation.md`)
- Phase 3 thinness flagged (4 min, no pause cue at the surprise beat)
- Phase 5 *"specifically yours"* sub-criterion needed a worked example in body, not just maintainer

**Fixes applied 2026-04-27 (post sim + judge):**
1. Phase 2 pair-share replaced with individual *read-list-and-strike* move
2. Phase 4 *"read aloud the rule"* same-shape removed
3. Phase 3 close gained individual pause cue (*"note one specific line that wasn't there before"*)
4. Phase 5 worked examples added in body (*tool name, phrase, tone choice*)
5. Length trimmed: 826 → 785 total / 567 prose (within 400-700 prose band)
6. Lecture gained *"where rules live"* paragraph on CLAUDE.md folder-scope and portability
7. Module file maintainer gained Connections fallback for IT-Director-didn't-prep case

**Remaining contributory TODOs (acceptable for ship):**
- *Guardrails* term doesn't appear in body — *rules* used throughout. Eval-instance flag was a false positive. No fix needed
- The compounding framework lives in the lecture only. M1 exercise-side framework anchor is implicit (rules-file-grows-by-editing). Acceptable — close-of-module is the right beat, not Phase 5

**One-sentence overall read:** A clean five-phase exercise that puts a chat-level IT person into builder mode in 28 minutes by making them catch their own truth and turn it into a rule, with a single defensible point of fragility (Phase 1 task choice) that the maintainer block already addresses.
