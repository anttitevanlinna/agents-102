# AE101 trainer-script audit — findings

## TL;DR

The maintainer blocks across AE101 are an Antti-voice intelligence dossier — rich on diagnostics, watch-fors, and pedagogical theory — but they are not a per-phase delivery script. A competent engineer-trainer who has never delivered AE101 cannot run it cold from these blocks. Three structural gaps cost the most: (1) **no phase-by-phase trainer beat** anywhere in the corpus — push-backs are catalogued by failure-mode, not sequenced into the timeline a trainer is actually walking; (2) **conversation pauses are named in CLAUDE.md theory but absent from every maintainer block** — not one designed pause beat appears as "stop here, ask the room X, expected length Y"; (3) **agent-wait fillers are missing wholesale**, including the load-bearing M4 send-off, the M3 sub-agent invocations, and Phase 4 of M2's second-pass read which can run 10+ minutes. A first-cohort trainer who is not Antti will improvise the entire pause cadence and most of the wait-filler content from cold.

## Severity-ordered findings

### Severity 1 (BLOCKING for first cohort)

#### S1-1. Zero per-phase trainer beats anywhere in the corpus

- **File + section:** All seven module files + all nine exercise files; the entire `<!-- maintainer -->` block in each.
- **Gap:** The maintainer blocks are organised by *category* (Meta, Push-back moves, Watch-fors, Decision points, Plug points, Frameworks). They are not organised by *phase number*. A trainer at minute 27 of M2 looking for "what do I demo at Phase 3, what do I say while Claude regenerates the plan" finds bullet lists titled "P3 rubber-stamp" / "P3 generic push-back" / "P3 softening" — diagnostic triggers, not a delivery sequence. The trainer must read all six P3 entries, hold the timeline in their head, and improvise a script.
- **Why it matters under "someone-else-leads":** Antti-as-trainer has the timeline in his head from authoring it; the bullet list is a refresher. A non-Antti trainer has nothing to refresh. They will read the M2 maintainer block before class, recognise it as "useful context if something goes wrong," and walk into the room with no scripted opener for Phase 1, no scripted demo cadence for Phase 2, no scripted pause beats. Symptom in the room: trainer reads the exercise prose aloud (because it is the only sequenced text they have) and the room treats it as a recording.
- **Concrete fix:** Add a `### Per-phase script` block to every exercise's maintainer block, immediately under Meta. Each phase gets four lines: *Demo* (what the trainer does on the projected screen), *Pause* (what the trainer says to the room mid-phase, expected duration), *Wait-filler* (what to talk about during agent execution if any), *Stuck-recovery* (the single most common failure-shape and how to unblock it). Not the full failure list — that lives in Watch-fors. The script is the spine; Watch-fors is the appendix.

#### S1-2. Designed conversation pauses entirely absent from maintainer blocks

- **File + section:** Every exercise file. Most acutely: `push-back-on-the-plan.md` (60-min exercise, five phases, zero authored pauses); `walk-and-send-off.md` (60-min exercise with a 35-min Phase 2, zero pauses inside Phase 2); `diagnose-and-resend.md` (65 min, four phases, zero pauses); `spot-gaps-build-the-loop.md` (40-50 min, two phases, the second runs 25-35 min with no pause beat).
- **Gap:** `curriculum/CLAUDE.md` § Classroom delivery — default mode is explicit: *"A 25-minute exercise without a single designed pause is a draft."* Push-back-on-the-plan is 60 minutes. Walk-and-send-off is 60 minutes. Both contain zero `### Pause` or "stop and ask the room" beats in their maintainer blocks. The exercise body contains a single timebox check in M2 Phase 4; nothing in the trainer-side material tells the trainer when to stop the room and what to ask.
- **Why it matters under "someone-else-leads":** In-class concurrency math (`check_pedagogy.md` #24) only works if the trainer paces. Without authored pauses, a non-Antti trainer either races ahead (room falls behind silently — `check_pedagogy.md` #19's "silent failure" condition) or improvises pause prompts that drift into reflection-theatre. Both kill the mood arc the modules are sized around.
- **Concrete fix:** Each exercise gets a *Designed pauses* sub-block listing 2-4 authored pauses by phase, each with: trigger condition (e.g., "after Claude finishes the access-control output"), question to the room (e.g., "shout out one surface the skill flagged that you'd underweighted — three voices, then move on"), expected duration (60-90 sec). Pauses sit inside phases, not between them — between-phase pauses are already implicit in the exercise prose; in-phase pauses are what's missing.

#### S1-3. Agent-wait fillers missing wholesale

- **File + section:** Most acutely: `walk-and-send-off.md` Phase 2 audit (subagent dispatched on student's whole rules+memory+ADR set, multi-minute run); `map-the-access-surface.md` Phase 1 (subagent runs the access-control skill on a real feature, multi-minute); `threat-model-with-stride.md` Phase 1 (same shape); `diagnose-and-resend.md` Phase 1 (Claude reads M4 commits + transcript — this can take 5-10 minutes on real artefacts); `spot-gaps-build-the-loop.md` Phase 1 (reads BOTH M4 and M5 transcripts, even longer); `getting-going.md` M1 send-off (the Module 4 walk-and-send-off send-off is the longest single wait in the curriculum and there is not one line of trainer-side filler guidance).
- **Gap:** Per `curriculum/CLAUDE.md` § Classroom delivery: *"Long agent waits (multi-minute send-offs, multi-file audits) are the natural pause anchors. While the agent runs, the trainer talks."* Not a single maintainer block tells the trainer what to talk about during these waits. Meta entries say "trainer demos slowly, room copy-pastes concurrently" — true for fast-prompt beats, but irrelevant when Claude is running for 4 minutes against a real codebase and the room is staring at their screens.
- **Why it matters under "someone-else-leads":** A 4-minute silent wait in a corporate cohort is a credibility hole. Antti can riff for four minutes from the framework attribution list. A non-Antti trainer cannot. The default failure: trainer fills the wait with "any questions so far?" — the room stays silent, the wait extends, the room loses confidence, and the next agent wait gets worse.
- **Concrete fix:** Each maintainer block gets a *Wait-filler script* block per long-wait phase. Three things per wait: (a) the topic to talk about (e.g., "while STRIDE runs: name the three things STRIDE adds that ad-hoc threat-listing misses — Repudiation and Information Disclosure are the cheap wins"), (b) a fallback if the wait runs longer than expected ("if STRIDE is still going at 4 min: surface one practitioner attribution from the lecture — Shostack's *Threat Modeling* is the canonical text"), (c) a watch-the-screen cue ("when STRIDE prints the threats list, stop talking — the room will start scrolling").

#### S1-4. The M4 send-off has no in-room script

- **File + section:** `run-the-first-experiment.md` Debrief; `walk-and-send-off.md` "What closes the module" section.
- **Gap:** This is the highest-stakes single moment in the entire training — the un-packaged multi-hour send-off that M5 depends on. The module file says "Student passes the final prompt to the SAME Claude Code session" and "Keep the laptop awake and plugged in." The maintainer block notes it as "Send-off 5 min" in the runtime breakdown. There is zero script for: how the trainer demos pasting the send-off prompt, what the trainer says while every student watches their own send-off begin, how the room closes the session together (do they leave together? do they wait for first commit? do they verify the laptop is awake before leaving?).
- **Why it matters under "someone-else-leads":** If every student in the room leaves with their laptop in a different state of "running," M5 opens with 60% of students saying "my laptop slept" or "I closed the wrong thing." That's a curriculum failure, not a student failure, and it kills M5's contrast lesson before it begins. Antti would catch this in the room by walking around; a non-Antti trainer needs the script.
- **Concrete fix:** Add an `### M4 send-off — in-room choreography` block to `run-the-first-experiment.md`. Five beats: (1) trainer demos paste on projected screen first, names the prompt out loud; (2) room pastes concurrently into their own session, agent begins; (3) trainer walks the room asking each student "did your agent take the prompt? what did its first message say?" — surfaces students whose session crashed before walking out; (4) trainer demos the power-settings move on the projected laptop ("caffeinate -dims" / equivalent), 60 seconds; (5) trainer names the M5 contract — "you walk in next week with whatever's there. We diagnose together." Closes the module on a shared commitment, not on each student's individual laptop anxiety.

#### S1-5. Push-back moves catalogued, not sequenced

- **File + section:** All exercise maintainer blocks. Worst case: `push-back-on-the-plan.md` (8 push-back moves listed under Push-back moves + 7 more under Watch-fors, all overlapping by phase, none ranked).
- **Gap:** A push-back move list of 15 entries does not tell a trainer *which one is most likely to fire on this cohort* or *which two to be ready to deliver versus which to skip*. Antti has implicit priors from running the simulation; a non-Antti trainer reads 15 equally-weighted entries.
- **Why it matters under "someone-else-leads":** Trainer either over-prepares (memorises 15 push-backs, freezes mid-delivery trying to recall the right one) or under-prepares (reads them once, defaults to the first plausible one in the room). Both miss the actual moment.
- **Concrete fix:** Rank push-back moves *by likelihood-on-first-cohort* (high / medium / low) and *by phase position*. Two new annotations per push-back: `[freq: high|med|low]` and `[fires: P3 mid-phase]`. Trainer pre-reads the highs only; the rest are reference.

### Severity 2 (cohort works but trainer struggles)

#### S2-1. Pacing decision points read as post-hoc, not in-flight

- **File + section:** Every maintainer block's "Decision points" section.
- **Gap:** The decision points are written as "if Phase 1 runs >15 min, force a slice" — readable as forensic analysis after the cohort, less readable as "right now, what do I do?" A trainer in the room with a watch needs *an in-flight cue + an action*, not a conditional clause.
- **Why it matters:** Phase budget overruns happen mid-phase. Trainer spots the overrun at minute 14 of a 10-minute phase. Reading "if phase runs >15 min" requires translating "I'm at 14, am I going to hit 15?" Decision points should fire on observable cues, not on stopwatch hindsight.
- **Concrete fix:** Re-shape each Decision point as `Cue → Action`. Example: `Cue: at 12 min into Phase 1, student is still describing the second candidate task. Action: interrupt with 'pick one, scope it in two sentences, move on.'`

#### S2-2. "Trainer projects the recap site" is named once, never operationalised

- **File + section:** Module-file Meta blocks reference "Trainer demos slowly, room copy-pastes concurrently." The recap-site projection is in `curriculum/CLAUDE.md` but never re-named in the maintainer blocks.
- **Gap:** Trainer-side instructions assume the trainer knows that the projected screen is the recap site (not a Claude Code window, not slides). When an exercise says "trainer demos pasting the prompt," a non-Antti trainer doesn't know whether to demo from their own Claude Code (so the room sees the agent execute) or from the recap site (so the room sees the prompt-block they'll copy). Both are valid in different beats; neither is named.
- **Why it matters:** First-cohort trainer will pick one mode and stick with it. If they pick "demo my own Claude Code" they trade follow-along clarity for execution drama. If they pick "demo from recap site" they trade execution drama for clarity. Author should pick per phase.
- **Concrete fix:** Each Per-phase script entry (S1-1) names the surface: `Demo from: [recap site Copy button | trainer's Claude Code projected | both — Copy then switch]`. Standardise the vocabulary in `curriculum/CLAUDE.md` § Classroom delivery and use it in every script.

#### S2-3. M3's three exercises share one feature but the maintainer blocks don't sequence the handoff demo

- **File + section:** `map-the-access-surface.md` + `threat-model-with-stride.md` + `author-test-strategy-skill.md` maintainer blocks.
- **Gap:** Three exercises chain: access-surface map → STRIDE threat list → test-strategy skill. The handoff between them is a real classroom moment — trainer needs to verify every student has the artefact from the previous exercise before the next one starts. Maintainer blocks don't script the handoff check.
- **Why it matters:** Student who lost the temp-directory path between Ex1 and Ex2 derails Ex2 silently. Map-the-access-surface notes "Claude picks a temp directory… reports the absolute path back" — but doesn't tell the trainer to verify each student wrote the path down or has it in scrollback before Ex2 starts.
- **Concrete fix:** Add an `### Inter-exercise handoff` block to module files with chained exercises. M3 handoff between Ex1 and Ex2: "Trainer asks 'shout out where Claude put your map — anyone lost the path?' Surfaces students who need the recovery move (re-print path from scrollback) before Ex2's invocation."

#### S2-4. Mood diagnostics are theoretically clean but trainer can't observe them mid-flight

- **File + section:** Every module's `Mood target` block.
- **Gap:** "Watch for: mood drift toward technical warm-up. Diagnostic: student narrates Ex2 as a generic engineering move with no surprise." The diagnostic is real but requires the trainer to be hearing student narration during a quiet phase. In a 30-person cohort, the trainer hears 5% of student narration. The mood diagnostic is observable in 1-on-1 self-study (where Antti can hear the Nerd's responses) and effectively invisible in cohort.
- **Why it matters:** Mood drift is real; the diagnostic doesn't fire in cohort because the trainer can't hear it. Without a cohort-shaped diagnostic, mood drift is detected at retrospective, not in-flight.
- **Concrete fix:** Re-shape mood diagnostics for cohort delivery. Replace "student narrates X" with "trainer asks the room at a Designed Pause beat: 'one word — what does this loop feel like?' Listen for: 'mechanical,' 'tedious,' 'fine.' Those are the mood-drift signals." Cohort mood diagnostics fire from a question the trainer asks, not from listening alone.

#### S2-5. Multi-week gap between sessions is structurally invisible to maintainer blocks

- **File + section:** `earn-the-trust.md`, `run-the-first-experiment.md`, `learn-from-the-test.md`, `spot-gaps-build-the-loop.md`.
- **Gap:** Each module assumes the student walks in with state from the previous module: M3 with the feature; M4 with M3's authored skill + repo; M5 with M4's artefact; M6 with both M4 and M5 artefacts. In a multi-week format, "walks in with" is a real risk — students may have lost laptop state, switched repos, run out of credit. The "Connections blocker" push-backs in M5/M6 acknowledge this but treat it as an edge case, not a default-shape concern.
- **Why it matters:** First cohort, multi-week, non-Antti trainer: 20% of students will have some form of state loss between sessions. The trainer needs a *first-90-seconds-of-the-room* protocol, not a per-student blocker push-back.
- **Concrete fix:** Add a `### Session-open protocol` block to M3 onward: "First 90 seconds: trainer asks the room — 'who has their [M2 plan / M3 feature / M4 artefact] accessible right now? Hands up.' Surface state-loss before exercise starts. Recovery: if more than 3 students lost state, run the recovery prompt as the warmup; if fewer, pair them with a neighbour for the warmup phase." This is a context-decay concern but the protocol is trainer-script-shaped, not a memory issue. (Context-decay across modules is the other agent's lens; this entry is about the cohort-open beat the trainer needs.)

### Severity 3 (polish, defer)

#### S3-1. Frameworks-riffed-on lists belong in source material, not script

- **File + section:** Every maintainer block's "Frameworks riffed on" section.
- **Gap:** Long attribution lists are reference material, not delivery script. A trainer running the room doesn't need to know Klaassen's URL mid-phase. They need it before delivery, perhaps in handout, perhaps in opening prep.
- **Concrete fix:** Move framework attribution to a per-module reference appendix; keep only the in-room attribution moment ("name Klaassen at the closer, here's the one-line Klaassen quote") in the script.

#### S3-2. Open-questions blocks belong in pre-cohort-todos, not maintainer

- **File + section:** `earn-the-trust.md` "Open questions for later passes"; `learn-from-the-test.md` "First-cohort observation questions"; `spot-gaps-build-the-loop.md` "First-cohort observation questions" + "TODO (from pre-ship verifier pass)".
- **Gap:** These are author-side open items, not trainer-side delivery material. Mixed into the maintainer block, they dilute the script-readability of what's actually trainer-relevant.
- **Concrete fix:** Move to `pre-cohort-todos.md` (already referenced from the same files); leave a one-line pointer in the maintainer block.

#### S3-3. Self-study notes interleaved with cohort notes

- **File + section:** Multiple files. Worst case: `spot-gaps-build-the-loop.md` "Debrief round awkwardness" push-back addresses self-study Teacher Claude, not cohort trainer.
- **Gap:** Self-study and cohort modes are distinct delivery surfaces; mixing them in one push-back list forces the trainer to mentally filter every entry.
- **Concrete fix:** Split push-back lists by mode: `### Cohort push-backs` / `### Self-study push-backs (Teacher Claude / Nerd)`. The shared ones land under both with a note.

#### S3-4. M1's prework runtime is "30 min" but Step 5 has six sub-tasks under one prompt

- **File + section:** `prework.md` Meta + Step 5.
- **Gap:** "Steps 1-4 are crisp; step 5 is where time can expand if the student's repo is messy." Acknowledged but no mitigation. A student whose repo is messy hits Step 5 cold without trainer support (it's prework, before classroom).
- **Concrete fix:** Optional — surface a "if you hit a wall at Step 5, post in the cohort Slack with the phrase 'prework Step 5 stuck'" line in the prework body. Trainer-side: a "first 5 minutes of M1: ask 'who needed help on prework? what blocked you?' surfaces install debt before exercises begin."

## Cross-cutting patterns

1. **Maintainer blocks are catalogues, not scripts.** Every block is organised by *kind* (Push-back / Watch-for / Decision point / Plug point / Framework). None is organised by *phase number*. The trainer reads horizontally to assemble a vertical timeline. Antti can do this from memory; a non-Antti trainer cannot in real time. **Highest-leverage fix: add a Per-phase script block at the top of every exercise's maintainer block.**

2. **Pause beats live in `curriculum/CLAUDE.md` philosophy, not in the maintainer blocks where the trainer would read them.** The "25-min exercise without a designed pause is a draft" rule fires at authoring time and was apparently not back-applied to the AE101 corpus. M2's 60-min exercise has zero pauses; M4's 60-min exercise has zero pauses; M5's 65-min exercise has zero pauses; M6's 40-50 min exercise has zero pauses.

3. **Long agent waits are unscripted.** Every exercise that dispatches a subagent (M3 Ex1+Ex2, M4 Phase 2, M5 Phase 1, M6 Phase 1) creates a multi-minute wait. None is anchored with trainer-side filler content. The corpus-wide message: "Claude is running, trainer figures it out."

4. **Push-back lists optimise for completeness, not for prioritisation.** 8-15 push-back moves per exercise, all weighted equally, no frequency annotation, no phase-position annotation. Antti memorises the list; non-Antti trainer either over-prepares or under-prepares.

5. **Mood diagnostics assume 1-on-1 audibility.** "Student narrates Ex2 as a generic move" is a self-study Teacher Claude diagnostic; in cohort, the trainer doesn't hear it. Mood diagnostics need a cohort-shape: questions the trainer can ask the room, not patterns to listen for.

6. **Inter-exercise and inter-session handoffs are theoretically continuous, practically risky.** M3's three-exercise chain shares a feature; M4→M5→M6 share artefacts across weeks. None of the handoffs has a "verify state before next phase" trainer move scripted. Edge cases get push-backs; the handoff itself doesn't have an opening protocol.

## File-by-file matrix

| File | Per-phase script | Designed pauses | Wait-fillers | Failure modes named | Pacing judgment | Cold-readable |
|---|---|---|---|---|---|---|
| prework.md | GAP (no phases — prework, but Step 5 has no in-step script) | N/A (prework) | N/A | PASS (install blockers, repo messiness called out) | GAP (no in-flight cue, only "time can expand") | GAP (Antti-voice meta, no protocol if Slack help fails) |
| getting-going.md (M1) | MISSING | MISSING | MISSING | PASS (8 push-back moves, well-shaped) | GAP (overruns named, no in-flight cue) | GAP (rich intel, no script) |
| orient-and-introspect.md | MISSING | MISSING | N/A (short prompts, no waits) | PASS (2 watch-fors, sharp) | N/A (15-20 min single-piece) | GAP (assumes trainer holds the move in their head) |
| fix-tests-first.md | MISSING | MISSING | GAP (test-running can be a wait, no filler) | PASS (tests-skipped, diff-rubber-stamp) | PASS (clear runs-over/under decision points) | PARTIAL (decision points readable) |
| plan-mode-done-right.md (M2) | MISSING | MISSING | GAP (P4 second-pass read can run 10+ min, no filler) | PASS (8+ push-backs) | GAP (post-hoc framing) | GAP |
| push-back-on-the-plan.md | MISSING | MISSING (60-min exercise, zero authored pauses) | MISSING (P4 has long agent thinking, P2 plan generation) | PASS (15 entries — over-catalogued) | GAP | GAP (richest intel in corpus, hardest to deliver from cold) |
| earn-the-trust.md (M3) | MISSING | MISSING | MISSING (three subagent invocations) | PASS | GAP | GAP |
| map-the-access-surface.md | MISSING | MISSING | MISSING (P1 is a multi-minute subagent run) | PASS | PASS (compress-to-15 named) | GAP |
| threat-model-with-stride.md | MISSING | MISSING | MISSING (P1 STRIDE subagent run) | PASS | GAP | GAP |
| author-test-strategy-skill.md | MISSING | MISSING | GAP (P1 question-by-question, natural pause shape, not exploited) | PASS | PASS (one-sharpen-then-ship) | PARTIAL |
| run-the-first-experiment.md (M4) | MISSING | MISSING | **MISSING — the M4 send-off has no in-room script** | PASS | GAP | GAP |
| walk-and-send-off.md | MISSING | MISSING (60-min exercise, P2 is 35 min) | MISSING (P2 audit subagent, multi-minute) | PASS | PASS (Phase 1 / 2 / 3 cues) | GAP |
| learn-from-the-test.md (M5) | MISSING | MISSING | MISSING | PASS | GAP | GAP |
| diagnose-and-resend.md | MISSING | MISSING (65-min exercise) | MISSING (P1 reads M4 commits + transcript, can run 5-10 min) | PASS | PASS (Phase >20/<10 cues) | GAP |
| spot-gaps-build-the-loop.md (M6 module) | MISSING | MISSING | MISSING | PASS (with self-study/cohort blur — see S3-3) | PASS | GAP |
| spot-gaps-build-the-loop.md (M6 exercise) | MISSING | MISSING (40-50 min, P2 is 25-35 min) | MISSING (P1 reads BOTH M4 and M5 transcripts) | PASS | PASS (cues named) | GAP |

Verdict legend: PASS = trainer has what they need; PARTIAL = trainer has half of what they need; GAP = trainer can deliver but will struggle; MISSING = trainer cannot deliver from the maintainer block alone.

Pattern: every file PASSes on failure-mode catalogues and most PASS on pacing-judgment cues. Every file MISSING or GAP on per-phase script, designed pauses, wait-fillers, and cold-readability. The maintainer blocks are *good intelligence dossiers* and *bad delivery scripts*. The fix is structural, not additive — re-shape the existing material into a phase-sequenced script with the catalogues moved to appendix position.
