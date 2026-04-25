# AE101 megaprompt + designed-pause audit — findings

## TL;DR

AE101 has **seven megaprompt candidates** (>200 words OR >15 lines), of which **three are MUST-SPLIT** before classroom: the prework Step 5 four-jobs prompt (250w / 11 lines, but four distinct jobs in one block), the M3 Debrief two-task prompt at `earn-the-trust.md` L60–74 (13 lines, 304 words, two big tasks fused), and the M5 Phase 4 reference+plan.md prompt at `diagnose-and-resend.md` L110–128 (17 lines, 271 words, two artefacts in one block). Designed-pause cadence is **healthy in module-file Debriefs and in M2/M5 phase-bounded exercises**, but **structurally absent in M1 exercises** (Ex1, Ex2 are flat narratives with no authored stop-and-talk beats), and **thin in M4 walk-and-send-off** (60-min exercise, three phases, zero authored conversation pauses; the long subagent audit at Phase 2 is a 90-second wait with no filler guidance for the trainer). Highest-leverage fix: split the prework Step 5 prompt into two prompts at the install/screen seam — the install gives a natural 60–90 second pause that anchors the rest of the room.

---

## Megaprompt inventory

Word count is load-bearing. Most AE101 prompts are paragraph-style single lines, so line count under-reports density. **>200 words OR >15 lines = candidate.**

| File:line | Lines | Words | Verdict | Proposed split |
|---|---|---|---|---|
| prework.md L28–30 (`/add-dir`) | 1 | 2 | CLEAN | — |
| prework.md L40–52 (Step 5 four-jobs) | 11 | 250 | **MUST-SPLIT** | After job 2 (skills install). Install completes → trainer asks the room what `ls ~/.claude/skills/` shows them → then job-3 bug-screening + job-4 readiness check go in a second prompt. Install completing is the natural pause anchor. |
| getting-going.md (no body prompts) | — | — | CLEAN | Module file delegates to exercise files. |
| orient-and-introspect.md L15–17 (orient) | 1 | 40 | CLEAN | — |
| orient-and-introspect.md L26–28 (introspect) | 1 | 30 | CLEAN | — |
| orient-and-introspect.md L35–37 (`/context`) | 1 | 1 | CLEAN | — |
| fix-tests-first.md L19–21 (fix prompt) | 1 | 45 | CLEAN | — |
| plan-mode-done-right.md L50–60 (M2 Debrief) | 9 | **280** | **SPLIT-CANDIDATE** | This is the M2 Debrief prompt and it does three jobs: (1) read three plan versions, (2) name the design pattern, (3) integrate one named pattern into `CLAUDE.local.md` with a long quoting-rules paragraph. Could split at "Then integrate one named pattern…" — let Claude name the pattern aloud first (designed pause: room compares pattern names), then a second prompt for the rules-file write. Acceptable as one block IF the trainer pastes via Copy and uses the agent's read-time as the designed pause. Mark as SPLIT-CANDIDATE — not blocking, but a cleaner shape. |
| push-back-on-the-plan.md L25–27 (P2 plan-mode) | 1 | 91 | CLEAN | — |
| push-back-on-the-plan.md L56–58 (P4 walk-down) | 1 | 65 | CLEAN | — |
| push-back-on-the-plan.md L75–77 (P5 see-pattern) | 1 | 47 | CLEAN | — |
| earn-the-trust.md L60–74 (M3 Debrief) | 13 | **304** | **MUST-SPLIT** | Two big tasks numbered "1." and "2." inside a single fenced block. Task 1 = integrate pattern into `CLAUDE.local.md`. Task 2 = sharpen the authored test-strategy skill. These are two writes to two different files. Split into two prompts: Debrief-Part-A (rules-file integration) → designed pause: trainer asks the room what their summary said → Debrief-Part-B (skill sharpening). Task 1 alone runs ~90s and gives a natural conversation pause anchor. |
| map-the-access-surface.md L23–27 (P1 invoke) | 3 | 109 | CLEAN | — |
| map-the-access-surface.md L49–59 (P3 delta) | 9 | 123 | CLEAN | — |
| threat-model-with-stride.md L19–23 (P1 invoke) | 3 | 95 | CLEAN | — |
| threat-model-with-stride.md L36–46 (P2 pick) | 9 | 126 | CLEAN | — |
| threat-model-with-stride.md L57–63 (P3 ADR) | 5 | 105 | CLEAN | — |
| author-test-strategy-skill.md L25–33 (P1 author) | 7 | 169 | LONG-OK | Long but does one job (author the skill via Q&A). Trainer pastes via Copy; the multi-question Q&A loop IS the designed pause cadence (Claude asks one question at a time). |
| author-test-strategy-skill.md L44–52 (P2 critique) | 7 | 103 | CLEAN | — |
| author-test-strategy-skill.md L63–69 (P3 invoke) | 5 | 103 | CLEAN | — |
| run-the-first-experiment.md L53–61 (M4 Debrief) | 7 | 167 | CLEAN | One job (rewrite `CLAUDE.local.md`); 167w is fine. |
| run-the-first-experiment.md L72–76 (M4 send-off) | 3 | 90 | CLEAN | — |
| walk-and-send-off.md L21–30 (P1 pick) | 8 | 126 | CLEAN | — |
| walk-and-send-off.md L47–55 (P2 audit) | 7 | 180 | LONG-OK | One job (subagent audit); 180w is fine; subagent run IS the multi-minute pause. |
| walk-and-send-off.md L83–95 (P3 Huryn frame) | 11 | 167 | LONG-OK | 11 lines is borderline; could trim quoted-bullet examples for projection legibility but content-wise does one job. |
| learn-from-the-test.md L51–59 (M5 Debrief) | 7 | 165 | CLEAN | — |
| learn-from-the-test.md L70–74 (M5 re-send) | 3 | 56 | CLEAN | — |
| diagnose-and-resend.md L21–35 (P1 read return) | 13 | 217 | SPLIT-CANDIDATE | Does two things: (a) read repo state + transcript, (b) walk the work through three lenses. Split could land at "Then walk the work through three lenses:" — let the agent finish the read first (natural pause: trainer asks room what their agent surfaced), then second prompt walks the lenses. Marginal — current shape works if trainer uses agent-read-time as the pause. |
| diagnose-and-resend.md L50–62 (P3 verifier) | 11 | 204 | LONG-OK | One job (build the verifier in chosen shape). The Q&A back-and-forth IS the cadence. |
| diagnose-and-resend.md L81–93 (P2 align-reverse) | 11 | 139 | CLEAN | — |
| diagnose-and-resend.md L110–128 (P4 reference+plan) | 17 | **271** | **MUST-SPLIT** | Builds two artefacts (reference artefact, plan.md) inside one prompt. Lines 17 = over the 15-line ceiling per #27. Split at "Second, plan.md." — first prompt builds the reference; designed pause: trainer asks room how their reference reads ("does it read like THIS task or like generic best practices?"); second prompt builds plan.md. Two artefacts → two prompts. The "Show me both files before you save" beat collapses into "Show me before you save" twice — cleaner per artefact. |
| spot-gaps-build-the-loop.md L21–36 (P1 diff) | 14 | **265** | **MUST-SPLIT** | Does three jobs: (1) read both runs' repo state + transcripts, (2) walk the diff across four dimensions, (3) rank gaps. The four-dimension list is itself dense. Split at "Walk the diff across four dimensions:" — first prompt reads both runs and reports what each did; second prompt walks the four-dimension diff with the read in scrollback. The read pass IS a natural multi-minute pause. |
| spot-gaps-build-the-loop.md L63–71 (P2 author skill) | 7 | 197 | LONG-OK | One job (author the second skill). Q&A loop = pause cadence, same shape as M3 author-test-strategy. |
| spot-gaps-build-the-loop.md L80–88 (P2 critique) | 7 | 105 | CLEAN | — |
| spot-gaps-build-the-loop.md L97–103 (P2 invoke) | 5 | 98 | CLEAN | — |

**Summary count:**
- MUST-SPLIT: 4 (prework Step 5; M3 Debrief; M5 P4 reference+plan; M6 P1 diff)
- SPLIT-CANDIDATE: 2 (M2 Debrief; M5 P1 read return)
- LONG-OK: 5 (long, single-job, agent-run-time covers the wait)
- CLEAN: rest

---

## Multi-job prompts

Prompts that do >2 distinct jobs in a single fenced block. Each is a candidate to split at the strongest job seam.

### 1. prework.md L40–52 — known offender, still one block

**Jobs:** (1) verify content folder is visible / report path back, (2) read `lectures/the-wizard-move.md` and report the framing, (3) install all curated skills as personal skills, (4) screen three candidate bugs with criteria + pick most trivial-and-visible, (5) confirm repo readiness for M1.

That's **five jobs** in one prompt, against rule #27's no-megaprompt-trainer-types-live constraint. The trainer pastes from the recap site, but the room reads a 250-word block while the agent runs 5 sequential subtasks; that's 2–4 minutes of unscaffolded room time.

**Proposed split:** split at the install/screen seam — the install completing is a natural conversation pause anchor.

- **Prompt A (verify + read framing + install skills):** jobs 1, 2, 3. Trainer pastes; while the install runs (~30–60s), trainer asks the room *"check that you can see your content folder — what path does Claude report?"* Pause beat = install completion + path-confirm round.
- **Prompt B (screen + ready-check):** jobs 4, 5. Student is already warm; the bug-screening is the conversational beat that closes prework.

Pre-engagement consequence: prework Step 5 currently sets a 15-min timer and the room is on its own. Splitting into two prompts lets the maintainer block carry "Pause 1 (after install): confirm everyone sees the skills folder; Pause 2 (after pick): confirm everyone has a single bug picked."

### 2. earn-the-trust.md L60–74 — M3 Debrief, two writes fused

**Jobs:** (1) read four artefacts (access-control output, STRIDE output + ADR, authored test-strategy skill, invocation output) + scrollback, (2) integrate one named pattern into `CLAUDE.local.md`, (3) sharpen the authored test-strategy skill in place. **Two file writes inside one block, against rule #27.**

**Proposed split:** Debrief-Part-A (rules-file integration), designed pause where trainer asks *"what did your `CLAUDE.local.md` get? read it aloud,"* then Debrief-Part-B (skill sharpening). Each prompt: ~150 words, ~5 lines body. Part-A's agent run is ~60–90s — clean conversation pause anchor.

### 3. diagnose-and-resend.md L110–128 — M5 P4, two artefacts

**Jobs:** (1) build the task-scoped reference artefact (5 sub-bullets), (2) build plan.md (5 sub-bullets), (3) propose paths + show before save.

17 lines is over the 15-line ceiling. Two artefacts in one prompt means the room watches Claude write file A then file B with no break.

**Proposed split:** "First, the reference artefact." → reference written → designed pause where trainer asks *"does your reference read like THIS task or like generic best practices?"* → "Now plan.md." → plan written. Each prompt 8–9 lines.

### 4. spot-gaps-build-the-loop.md L21–36 — M6 P1 diff, three jobs

**Jobs:** (1) read repo state for both runs, (2) read both session transcripts under `~/.claude/projects/`, (3) walk the diff across four dimensions, (4) rank gaps by damage.

The four-dimension list itself is dense (12 sub-lines). Split at "Walk the diff across four dimensions:" → first prompt does the read and reports what each run touched; designed pause where trainer asks *"what's one moment in your M5 run that surprised you?"* → second prompt walks the four-dimension diff against the read.

---

## Placeholder + em-dash violations

Per check_prompts.md §1 (no `[BRACKETS]` placeholders inside fenced blocks) and the project em-dash convention for parentheticals.

### Placeholder violations inside fenced blocks

**None found.** AE101 prompts use back-reference style ("the feature I brought to Module 3," "the task we just scoped earlier in this session") and back-references to scrollback, not placeholders. This is consistent across all 30+ prompts checked. Good.

One borderline pattern in `threat-model-with-stride.md` L23 — *"if not, ask me for it"* fallback. Per check_prompts.md §5 this is "fine for first-create intent; harmful as filler that papers over upstream drift." Here it's filler — the path WAS written in scrollback in the previous exercise. Not a violation, but a minor deterministic-path miss. Flag to consider tightening to *"the absolute path is in scrollback from when you wrote it"* without the fallback.

### Em-dash in parentheticals

Checked every `*(Claude Code...)*` parenthetical. **None found** with em-dash separators. AE101 uses comma form correctly: *"(Claude Code)"*, *"(Claude Code, final move of the module)"*. Good.

The known anti-pattern called out in the audit brief — `*(Builder Claude — for the student...)*` — does not appear in AE101. AE101 does not use the Builder/Teacher Claude split (per check_pedagogy.md #25, AE101 cohort default is no host-skill, trainer delivers push-backs). Bootstrap is where the Builder/Teacher convention lives.

---

## Designed-pause cadence — file by file

### `prework.md` (30 min target, async/self-paced)

- **Total runtime:** 30 min, async (not classroom-paced)
- **Phase count:** 6 numbered steps
- **Designed pauses present:** the structural pauses are the step boundaries themselves (each step ends; the student moves on). Step 5 is where this breaks down.
- **Designed pauses missing:** Step 5 is one 15-min block running four jobs in a single agent conversation, against rule #27's pause cadence. Even async, a four-job block has no internal recovery point — if step 5's job 2 (skill install) fails, the student doesn't have a clean restart point for jobs 3–4.
- **Long agent waits:** skill install (~30–60s) + bug screening conversation (~3–5 min). The bug screening is the conversational beat itself; the install is the unscaffolded wait.
- **Severity:** Severity 1 (blocking) for classroom — prework is read async but reviewed at M1 opening; a four-job prompt that fails mid-way leaves a student walking into M1 without skills installed.

### `getting-going.md` (M1, 2h)

The module file delegates to exercise files. Module-level structure has Connections (10 min) → Lecture (10 min) → 3 exercises (95 min) → Bridge. **Inter-exercise transitions are silent in the module file** — no authored "everyone catch your breath, then we go to fix-tests-first" beat. Standard practice is for the trainer to improvise these, but per #27 they should be authored in.

- **Designed pauses missing at module level:** Connections-to-Lecture seam, Lecture-to-Ex1 seam, Ex1-to-Ex2 seam, Ex2-to-Ex3 seam. The maintainer block's "exercise breakdown" gives times but no conversation prompts.
- **Severity:** Severity 2 (trainer struggles) — the room reconvenes between exercises naturally, but a "what did you notice" beat at each seam would catch stragglers.

### `orient-and-introspect.md` (M1 Ex1, 15–20 min)

- **Phase count:** Three prompts (orient → introspect → `/context`), no phase headers, narrative structure
- **Designed pauses present:** The narrative gates (*"Claude reads and reports. Let it finish."*) read like single-sentence pauses, but they're not labelled or anchored. *"Now look at the instrument directly"* is a transition, not a pause beat.
- **Designed pauses missing:** No authored "stop here, ask the room X" beat. For a 15–20 min exercise this is borderline (per #27, "A 25-minute exercise without a single designed pause is a draft" — at 15–20 min the bar is softer), but Ex1 is the FIRST exercise of the training and needs a conversation beat between orient-output and introspect-prompt. Suggested ask: *"trainer asks the room: what did your Claude pick to read first? does it match what you'd have read?"* lands between the orient prompt and the introspect prompt.
- **Long agent waits:** Each prompt's read pass is ~30–60s. Three short waits, no filler guidance.
- **Severity:** Severity 2 — short exercise, but introducing the move without a designed beat means the introspect prompt feels like more reading instead of a contrast.

### `fix-tests-first.md` (M1 Ex2, 35–40 min)

- **Phase count:** Single prompt + diff-reading instructions, no phase headers
- **Designed pauses present:** The "read the diff" beat is implicitly a pause (*"If a line isn't what you'd have written, push back"*) but not authored as a stop-and-talk beat.
- **Designed pauses missing:** This is a 35–40 min exercise with **zero authored conversation pauses** against the #27 25-minute draft bar. The natural seam is between "tests written + failing" and "fix written + passing" — the trainer should ask the room *"who's at red? who's at green?"* Another seam is between "diff produced" and "PR opened."
- **Long agent waits:** Test-write + test-run + fix + test-run-again is multi-minute. The trainer is told nothing about what to talk about while these run.
- **Severity:** **Severity 1 (blocking)** — this is the longest M1 exercise and it has no authored cadence. Risk: stragglers fall behind during the multi-minute fix cycle, and the trainer has no scripted recovery beat.

### `compound-and-close.md` (M1 Ex3 — referenced but not in audit list)

Not audited per scope.

### `plan-mode-done-right.md` (M2, 1h45 module file)

- **Total runtime:** 1h45 (Connections 10 / Lecture 10 / Exercise 60 / Debrief 15 / Bridge 5)
- **Designed pauses present:** Module-file Debrief has a clean cadence — prompt → "Read the summary. Push back where it's wrong" is a designed beat.
- **Designed pauses missing:** None at module-file level beyond what's present.
- **Severity:** Severity 3 — fine.

### `push-back-on-the-plan.md` (M2 exercise, 60 min)

- **Phase count:** 5 phases with explicit Phase headers, time budgets (5 / 15 / 15 / 15 / 10)
- **Designed pauses present:** **This is the gold standard in AE101 for cadence.** Each phase has clear seams. P3's *"Stuck on the soft item? Ask Claude which step it's least confident about"* is a designed micro-pause. P5's *"Read carefully. The pattern it names should be something like..."* anchors a conversation. The Timebox check at end of P4 (*"When the slot ends, we stop"*) is an authored pause beat.
- **Designed pauses missing:** P2 has a 15-min phase including "open the plan file" + "read the plan" — no scripted "trainer asks the room what their plan said" beat. Suggested ask: between plan-write and approval-prompt, *"trainer asks: name one step in your plan that says 'the relevant files' — that's your soft-item candidate."*
- **Long agent waits:** Plan-mode write at P2 can be 30–90s. P4 second-pass walk-down is ~5–12 questions, multi-minute. Both are pause anchors but not labelled.
- **Severity:** Severity 3 — the cadence is essentially right; the missing P2-internal beat is a polish item.

### `earn-the-trust.md` (M3, 1h45)

- **Total runtime:** 1h45 across three exercises (20+20+28) + Debrief 12
- **Designed pauses present:** Each exercise file has its own phases (see below). Module-level Debrief prompt is followed by *"Read it. Push back where it's wrong"* — minimal but present.
- **Designed pauses missing:** **No authored beat between Ex1 (access surface), Ex2 (STRIDE), and Ex3 (test-strategy authoring).** Three back-to-back exercises is 68 minutes of work; per #27 this needs designed pauses at each seam. Ex1→Ex2 hand-off carries an artefact (the surface map), so the natural ask is *"trainer asks: what did your map flag that you'd missed?"* before Ex2 starts. Ex2→Ex3 hand-off carries the ADR; ask *"what hardening did you pick?"*
- **Severity:** **Severity 1** — three exercises with no authored seam-pauses is the worst module-level cadence in AE101.

### `map-the-access-surface.md` (M3 Ex1, 20 min)

- **Phase count:** 4 phases (7 / 3 / 7 / 3), explicit headers
- **Designed pauses present:** Phase 2 (3 min "sit with the map") is **literally a designed pause** — the cleanest example in AE101. P4 is optional handoff check, also pause-shaped.
- **Designed pauses missing:** None notable.
- **Severity:** Severity 3 — exemplary.

### `threat-model-with-stride.md` (M3 Ex2, 20 min)

- **Phase count:** 3 phases (7 / 8 / 5)
- **Designed pauses present:** P2's "one question at a time" Q&A loop is the cadence; P3's "Read it. If the Decision section reads like..." is a designed read-aloud beat.
- **Designed pauses missing:** None notable for a 20-min exercise.
- **Severity:** Severity 3.

### `author-test-strategy-skill.md` (M3 Ex3, 25–30 min)

- **Phase count:** 4 phases (12 / 5 / 6 / 2)
- **Designed pauses present:** The one-question-at-a-time authoring loop in P1 IS the cadence. P2 critique-then-pushback is a clean pause beat.
- **Designed pauses missing:** P1 is 12 min of agent Q&A — within the agent-Q&A this is fine (the cadence is built in), but the seam between P1 (skill written) and P2 (critique) has no authored "trainer asks: what was your weakest question to answer" beat. Minor.
- **Severity:** Severity 2 (trainer struggles slightly at P1→P2 seam).

### `run-the-first-experiment.md` (M4, 1h45 module file)

- **Total runtime:** 1h45 (Connections 10 / Lecture 12 / Exercise 55 / Debrief 12 / Send-off 5 / Bridge 3)
- **Designed pauses present:** Module-file Debrief has clean prompt → "Read the summary" cadence. Send-off explicitly authored as a single move ("Let it run. Keep the laptop awake...").
- **Designed pauses missing:** None notable at module-file level.
- **Severity:** Severity 3.

### `walk-and-send-off.md` (M4 exercise, 60 min)

- **Phase count:** 3 phases (10 / 35 / 15), with Phase 2 internally split (audit 10 / fill 25)
- **Designed pauses present:** The audit→fill split is a cadence beat. P3's "Read the examples first. If they're from your own files, the frame should click" is a designed beat.
- **Designed pauses missing:** **P2 fill-the-gaps is 25 minutes with no authored conversation beat.** The student picks 2–3 gaps and closes each in conversation; per #27, 25 minutes of unscaffolded prompting is over the draft bar. Suggested ask: between "audit complete" and "pick the worst three," *"trainer asks: name the worst gap on your list. Are you sure it's the worst, or is it the easiest?"* Another ask after first gap closed: *"who closed their first gap? what did Claude write that you pushed back on?"*
- **Long agent waits:** P2 audit subagent run is ~60–120s. **No filler guidance for the trainer.** Suggested filler: *"while the audit runs, narrate to the room what you'd expect to see in a top-5 ranked gap list: thin spots, missing context, wrong assumptions, unwired tools."*
- **Severity:** **Severity 1 (blocking)** — 60-min exercise, three phases, zero authored conversation pauses. This is the canonical "draft" per #27.

### `learn-from-the-test.md` (M5, 1h45 module file)

- **Total runtime:** 1h45 (Connections 5 / Opener 6 / Exercise 60 / Debrief 12 / Re-send 3 / Closer 15 / Bridge 3)
- **Designed pauses present:** Module-file Debrief has clean cadence. Closer-after-Debrief is itself a structural pause.
- **Designed pauses missing:** None notable at module-file level.
- **Severity:** Severity 3.

### `diagnose-and-resend.md` (M5 exercise, 65 min)

- **Phase count:** 4 phases (15 / 10 / 20 / 20), explicit headers and time budgets
- **Designed pauses present:** P1's "Push back where Claude generalises" is a designed beat. P3's "Read what Claude proposes. Push back if..." is another. P4's "Read both files. Push back if..." another.
- **Designed pauses missing:** P3 (20 min, build verifier) has the menu-pick beat (background-agent / shell-hook / Ralph) but no authored "trainer asks the room which shape they picked and why" — that's a key recovery beat for the verifier-shape mismatch failure mode the maintainer block flags. Suggested ask: *"trainer asks: which shape did you pick? show me one line of evidence from your M4 artefact that points at that shape."*
- **Long agent waits:** P1's transcript-read can be 60–90s. P3 verifier build is multi-minute. **No filler guidance for either.**
- **Severity:** Severity 2 — phase boundaries are present, but within-phase pauses are missing.

### `spot-gaps-build-the-loop.md` (M6, 1h45 module file)

- **Total runtime:** 1h45 (Story opener 5 / Exercise 45 / Arc-retrospective 20 / Debrief 12 / Closer 15 / Bridge 3)
- **Designed pauses present:** Module-file Debrief is human-voiced (per #25 host-skill optional convention) — *"Trainer and group pick the exact form — pair exchange, whole-room round, silent write-then-share."* This IS the designed pause for M6.
- **Designed pauses missing:** None at module-file level.
- **Severity:** Severity 3.

### `spot-gaps-build-the-loop.md` (M6 exercise, 40–50 min)

- **Phase count:** 2 phases (P1 diff 15 / P2 author skill 25–35)
- **Designed pauses present:** P2 has three sub-prompts (author / critique / invoke) — that's the cadence within Phase 2. The maintainer block notes "If you've run this move before and are working solo, collapse them" — explicitly authored cadence with self-paced override.
- **Designed pauses missing:** **P1 diff is 15 min in one prompt, then "End with: which gap matters most?"** — no authored conversation beat between read-completion and rank. Suggested ask: between read and rank, *"trainer asks: what's one moment from your M5 run that the M4 run didn't have? quote it."* P2's author→critique→invoke chain has clean seams but no authored "trainer asks" beat between author-output and critique-input. Critique is invited reflexively ("Default-acceptance is the failure mode here too") but the room beat is missing.
- **Severity:** Severity 2 — P1 has one phase boundary that wants a beat; P2's three sub-prompts are good but seam-pauses are missing.

---

## Severity-ordered fix list

The single ranked list a "ship in 2 weeks" trainer would want.

### Severity 1 — Blocking

1. **Split prework Step 5 prompt at the install/screen seam.** Five jobs in one block; if any sub-job fails the student walks into M1 cold. Pause anchor = install completion. Two prompts of ~125 words each.

2. **Split M3 Debrief prompt (`earn-the-trust.md` L60–74) into Part-A/Part-B.** Two writes to two different files (rules-file + skill sharpening) inside one 304-word block. Pause anchor = Part-A's `CLAUDE.local.md` write completes; trainer asks the room what their summary said before Part-B fires.

3. **Split M5 Phase 4 reference+plan.md prompt (`diagnose-and-resend.md` L110–128) into two artefact-scoped prompts.** 17 lines, 271 words, two artefacts. Pause anchor = reference written; trainer asks *"does it read like THIS task?"* before plan.md prompt.

4. **Split M6 Phase 1 diff prompt (`spot-gaps-build-the-loop.md` L21–36) at the four-dimension seam.** Three jobs in one 265-word block. Pause anchor = read-pass completes; trainer asks *"what surprised you?"* before the diff walk.

5. **Author designed-pause cadence into `fix-tests-first.md` (M1 Ex2, 35–40 min, zero authored pauses).** Add one beat at the test-write/fix seam (*"who's at red? who's at green?"*) and a second after the diff produces (*"find me one line you'd have written differently, paste it in chat"*).

6. **Author module-level inter-exercise pause beats into `earn-the-trust.md` (M3, three exercises back-to-back).** Two seams: Ex1→Ex2 (*"what did your map flag that you'd underweighted?"*) and Ex2→Ex3 (*"what hardening did you pick?"*). Both are artefact-anchored and short.

7. **Author designed-pause cadence into `walk-and-send-off.md` Phase 2 (M4 Ex, 25 min unscaffolded).** Three seams: pre-fill (worst-or-easiest check), mid-fill (first-gap pushback), post-fill (gap-three rationale). Plus filler guidance for the audit subagent wait.

### Severity 2 — Trainer struggles

8. **Split or accept M2 Debrief prompt (`plan-mode-done-right.md` L50–60).** SPLIT-CANDIDATE not MUST-SPLIT — current shape works if trainer pastes via Copy and uses agent-read-time as the pause. Decision: leave for cohort 1, revisit based on observed cadence.

9. **Add M5 Phase 3 verifier-shape beat to `diagnose-and-resend.md`.** Mid-phase ask: *"which shape did you pick? show me one line of evidence from your M4 artefact."* Catches the verifier-shape mismatch failure mode the maintainer block already flags.

10. **Add M6 Phase 1 read→rank beat to `spot-gaps-build-the-loop.md`.** Between read-completion and rank-by-damage: *"what's one moment from your M5 run that the M4 run didn't have?"*

11. **Add M1 Ex1 orient→introspect beat to `orient-and-introspect.md`.** First exercise of the training; needs an authored conversation seam between Claude's read-output and the introspection prompt.

12. **Add filler guidance to `walk-and-send-off.md` Phase 2 audit subagent wait** (60–120s of silent time the trainer is told nothing about).

13. **Add filler guidance to `diagnose-and-resend.md` Phase 1 transcript-read wait** (60–90s).

14. **Tighten `threat-model-with-stride.md` L23 fallback** (*"if not, ask me for it"*) to deterministic-path form per check_prompts.md §5. Minor.

### Severity 3 — Defer

15. **Trim 11-line P3 prompt at `walk-and-send-off.md` L83–95** for projection legibility. Current is content-correct; cuts only if cohort 1 reports legibility issues.

16. **Module-level seam beats in `getting-going.md`** (Connections→Lecture, Lecture→Ex1, Ex1→Ex2, Ex2→Ex3). Trainer improvises naturally; authored beats are polish.

17. **`author-test-strategy-skill.md` P1→P2 seam beat.** Polish item.

---

## Single highest-leverage fix to ship first

**Split the prework Step 5 prompt** (Severity 1, item 1).

Reasoning: prework runs async ahead of M1 Day 1 and is the **first prompt the cohort ever pastes**. A five-job megaprompt that fails partway leaves students walking into M1 with no skills installed, no bug picked, and a flavor of "this training doesn't work" already set. Splitting at the install/screen seam:

- Halves the megaprompt density immediately
- Creates a natural recovery point (if install fails, restart from Prompt B is clean)
- Establishes the cadence shape the rest of AE101's authored fixes will mirror — every megaprompt-split throughout the audit has the same shape: prompt-A runs → designed pause → prompt-B runs
- Costs ~30 minutes of editing time
- Lands before any other fix matters because every subsequent module assumes prework worked

Second-place candidate: fix #5 (M1 Ex2 cadence) — same rationale but downstream of prework. Ship #1 first, #5 second.
