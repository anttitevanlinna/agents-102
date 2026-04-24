# AE101 M6 — Run 1 vs Run 2 generation diff

Applying Phase 1 of `spot-gaps-build-the-loop.md` to the meta-target: the M6 generation session itself. Run 1 = subagent dispatch + self-paced `/loop` + "done" summary. Run 2 = Antti's *"you must run the evals and simulations too and fix all todos"* intervention, triggering three-persona sim + LLM-as-judge eval + source-verify + capability check in parallel, plus ten content fixes. Same file set; the one changed variable is the sim/eval pass.

---

## What packaging caught

The Run 2 sim/eval/source-verify/capability check caught real drift the Run 1 loop declared clean.

**1. Credibility-performance in the closer's tricolon.** Run 1 shipped *"You know how to test. You know how to learn. You know how to encode."* at the closer. The reference artefact bans credibility-performance verbatim (*"Failure shapes that steal the mood: … credibility-performance (*'we live what we teach'*)"*). The Story opener explicitly cuts it at turn 7. Loop iterations 1–3 passed this line — grep has no read for mood. Greg-persona sim flagged it: *"Greg-persona major catch: closer's closing tricolon … contradicts the Story opener's explicit rejection of credibility-performance. CUT."* Replacement: *"Close the laptop. Monday's task is waiting."* Mood score climbed 7.0 → 8.0 after the fix. The rule was in context; the LLM wrote it anyway; only the persona read against the Story caught the contradiction.

**2. Ramp number and quote — paraphrase shipped as fact.** Run 1 closer wrote *"Last public count put it in the hundreds"* and *"the harness was the bottleneck, not the model"* (close paraphrase). Source-verify found the primary: Geoff Charles, 2026-04-09, x.com — *"The models were good enough. The harness wasn't."* Specific count: 350. Run 2 restored the number and lifted the verbatim quote. Run 1's subagent explicitly logged the softening decision (*"dropped the hard '350-skill marketplace' number in body, used 'hundreds' with a source-verification TODO"*) — a defensive move that shipped a weaker, also-inaccurate paraphrase as its tradeoff. Source-verify was the only gate that could settle it.

**3. `/schedule` capability wrong.** Run 1 subagent-3 shipped `reference/scheduled-agents.md` assuming `/schedule` and local scheduled tasks were one primitive. Capability check corrected: *"`/schedule` is cloud-based Routines (NOT local tasks). Desktop local scheduled tasks are a separate primitive (GUI-only, catch-up on wake). Reference page rewritten with the three-primitive split distinct."* `curriculum/CLAUDE.md` § *Working with actual Claude Code behavior* rule 1 (*"Verify capabilities BEFORE asserting, not after"*) existed; it didn't fire at subagent-3's drafting turn. The capability-check subagent was the only gate that read the assertion against ground truth.

**4. `<project-folder>` placeholder confusion.** Maria-persona (mid-competent) hit the Phase 1 prompt's `<project-folder>` literally on first turn. Run 1 passed the J5 placeholder-in-fence check because `<project-folder>` is a legitimate variable form in some conventions — the deterministic grep doesn't model a student's paste-and-go behavior. Sim caught it: replaced with *"find the folder under `~/.claude/projects/` matching this repo"*.

**5. `RLHF` unearned in Story lecture.** Contributory J8 on Story. Replaced with *"post-training"*. J8 is in the verifier but fired as a contributory (non-blocking) on the loop; the sim's register read treated it as blocking.

**6. Self-help register in arc-retrospective.** *"the note's your mirror"* — Greg flagged as self-help. Cut. Added kill-if-thin instruction. No deterministic rule catches register; the sim did.

**7. Senior-archetype pacing note.** Greg on Phase 2 three-prompt staging: *"reads scripted for senior archetypes."* Added senior-compression note at Phase 2 intro. This is the compounded rule *2026-04-23-pedagogy-scripted-reactions-vs-forcing-functions* firing in a different shape than the grep catches — sim caught the residue.

---

## What packaging missed

Even Run 2 had drift the sim/eval did not catch.

**1. §14 em-dash rule vs. M5 practice.** Loop iter 2 surfaced the inconsistency: *"Compendium §14 says 'use parentheses only when the aside is a true parenthetical,' but the reference files the subagents mirrored use em-dashes throughout. Applied-rule vs practised-rule gap."* Sim did not help — personas read the prose naturally; eval J10 scored the closer 3/5 but approve-with-todos, treating the overshoot as contributory. The verifier's bar sat beside the real failure: the rule is either wrong or the M5 references need retro-audit. Neither packaging pass resolved it.

**2. §1 banned-word universality.** Loop iter 1 caught two `honest`/`honestly` instances in maintainer blocks (`story-of-module-6.md:59`, `arc-retrospective.md:60`). The subagent verifier passed both. Loop iter 1's note: *"`check_writing §1` does not explicitly exempt maintainer blocks the way §4 (student-POV) and §7 (always-you) do; strict reading applies the banned-word rule universally."* Packaging caught these, but only because the loop re-grepped; the subagent's own pre-ship verifier did not. The reference artefact did not pin maintainer-block scope, so the subagents defaulted to treating maintainer prose as exempt — a plan-shape miss.

**3. `~/.claude/skills/` path-in-fence rule edge case.** J6 fired on 10+ hits across three files. Iter 1 ruled them authoring ship-destinations, not invocation targets, and left them. Rule vs. intent drift; verifier template's J6 wording over-catches. Sim didn't help — personas read them as ship destinations too. The rule needs refinement; the verifier cannot decide.

**4. Reference artefact thin on Debrief self-study variant.** Jin-persona (fast operator) flagged the Debrief as thin-but-not-blocking. Only after re-sim did the Debrief skip-path land (*"If you've already shipped a skill that fires on your real-work gap shape and you can name the move in one sentence, that's the marker"*). The reference specified the default shape but did not specify the archetype-compression path, so the first dispatch produced a one-shape Debrief that Jin nearly rejected.

**5. Loop stop-condition blind to mood drift.** The loop reached PASS 2 clean at iter 2–3. It stopped. The closer's credibility-performance tricolon was already in the file at that point. Two consecutive clean grep passes was the wrong stop signal — it measured the cheap dimension, declared done, and shipped a mood-contradicting line. Without Antti's intervention, Run 1 would have shipped that tricolon.

---

## What packaging introduced

New failure shapes that only exist because of sim/eval.

**1. Persona-set scope.** The three personas (Maria / Greg / Jin) caught credibility-performance, self-help register, archetype pacing. What they did not cover: CTO conversion, first-cohort trainer reading the maintainer block, a student who has only done M1–M6 (no L3 context). Eval-findings flags this: *"three-persona sim (CTO / senior engineer / M1–M6-only engineer)"* as a TODO on the closer. The three chosen personas are optimized for the exercise; the closer wants a different set. Sim scope is a design choice, and this run's choice was exercise-shaped.

**2. Source-verify's all-or-nothing framing.** Source-verify produced a binary (HOLD / REVISE) on each claim. The Ramp "harness" claim was a close paraphrase — technically REVISE, practically a stylistic choice (*attribute-to-Ramp-engineers* generic framing vs. *attribute-to-Charles-verbatim*). Source-verify correctly pushed to verbatim; the design question *"do we ever want generic-industry framing when the practitioner quote is crisper?"* was collapsed into a bug fix. Not wrong — just a shape that forecloses a framing choice.

**3. LLM-judge J10 em-dash scoring without context.** Eval scored the closer J10 = 3/5 for moderate em-dash use. The judge does not know the M5 references shipped with em-dashes. The score reads as a bug; the actual issue is compendium inconsistency. The judge over-fits on the rule as written, under-fits on the practice as shipped.

**4. Capability-check scope drift.** The check caught `/schedule` vs. local tasks cleanly. It did not verify Task-tool sub-task reliability in the arc-retrospective prompt (flagged as a standing TODO: *"Confirm Task-tool sub-task read reliability before first cohort"*). Scope was implicitly *"check the things we're asserting new capabilities on"*, not *"check all tool dependencies in prompts"*. Good scoping for this run; a future gap-finder needs the broader scope.

**5. Greg re-sim echo-chamber risk.** Greg's 7.0 → 8.0 climb on re-sim is per Greg's own stated delta. Re-simming the same persona after fixes measures persona-consistency more than actual improvement. Useful signal but not independent.

---

## Where the fix belongs

| Gap | Home |
|---|---|
| Loop stop-condition measures only grep-cheap dimension; ships mood-contradicting prose | `curriculum/module-design-long-running-strategy.md` — stop condition must include one sim/eval pass after two clean grep passes, not instead of |
| Sim + eval + source-verify + capability-check should auto-fire at end of subagent dispatch, not on Antti's prompt | Already compounded: `memory/compounded/2026-04-23-content_creation-evals-sim-auto-fire.md`. Rule exists; this run it did not fire. Forcing function needed — `.claude/skills/content-creation/SKILL.md` hand-off step must name the four parallel gates as mandatory, not optional |
| §14 em-dash rule vs. M5-shipped practice gap | `memory/check_writing.md` §14 — refine or retro-audit M5. Surface as `/compound` at session close |
| §1 banned-word scope vs. §4/§7 exemption asymmetry on maintainer blocks | `memory/check_writing.md` §1 — clarify maintainer-block scope; propose via `/compound` |
| J6 skill-path-in-fence over-catches authoring ship destinations | Verifier template (`curriculum/module-design/ae101-m6-verifier.md` and ancestors) — J6 wording; split authoring ship-destination from invocation target |
| Reference artefact did not pin archetype-compression paths for Debrief | Reference-artefact template (`curriculum/module-design/` reference conventions) — add *"variant paths per archetype"* section when the exercise has archetype branching |
| Persona set scope is exercise-optimized; closer wants different set | `.claude/skills/content-creation/SKILL.md` simulation protocol — personas chosen per surface-type (exercise vs. closer vs. reference), not per module |
| Capability-check scope implicit — covers new assertions only, not full tool dependency | `curriculum/CLAUDE.md` § *Working with actual Claude Code behavior* rule 1 — extend to *"every tool invocation in a fenced prompt gets a capability check, not just new-capability assertions"* |
| Source-verify binary framing forecloses style choice | `.claude/skills/content-creation/SKILL.md` — source-verify outputs three verdicts (HOLD / REVISE-factual / RECONSIDER-framing), not two |

---

## Dominant gap

**The loop stopped on two clean grep passes and declared done while credibility-performance was still in the closer.**

Ranked by damage-to-a-future-session:

1. **Loop stop-condition** — would ship mood-contradicting prose every session until fixed. The whole M6 message (evals-with-full-weight, loop-as-stance) depends on the closer landing. This one almost shipped with the rug pulled by its own last line. Had Antti not intervened, Run 1 ships. Every future module-generation session inherits the same blind stop.
2. **Sim/eval auto-fire rule not firing** — compounded memory entry exists from 2026-04-23 (one day earlier). It did not fire in Run 1. Rules that exist but don't fire are worse than rules that don't exist — they produce false confidence and miss the forcing function. The `compound` memory needs a forcing function, not just a rule.
3. **Reference artefact thinness on archetype-compression paths** — downstream exercises with branching archetypes will repeat the Jin-thin-Debrief shape until the reference-artefact template pins it.

The rest are refinements. These three shape what a future session ships or doesn't.

— ends
