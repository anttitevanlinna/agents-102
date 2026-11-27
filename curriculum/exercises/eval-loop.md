# Exercise: The eval loop runs itself

**Time:** 45 min: first score ~5, walk-away ~30, read the notes ~10.

**Session** *(new, "Module 6 - Evaluations")*

**What you do:**

Start a loop: each round an agent writes your briefing again from better rules. Nobody edits a briefing by hand.

**How the loop works.** Each round, one helper agent writes a fresh briefing and a second helper agent scores it with your Module 5 judge. The main session turns what the judge flagged into rules in `./generation-tactic.md`, the file the next writer follows. The judge never changes, so fewer flagged claims means a better briefing.

A typical result: *11 claims flagged in your Module 3 briefing, then 7, 7 and 4 over three rounds.*

## Phase 1: Score your Module 3 briefing

*5 min*

Ask the agent to score your Module 3 briefing with the Module 5 judge, then write the first rules in `./generation-tactic.md` from what the judge flagged.

{{prompt:eval-loop-1}}

The agent shows today's count beside the Module 5 count for the same briefing. The difference is the judge's noise: how much the score moves when nothing changed.

## Phase 2: Start the loop, then walk away

*30 min*

Ask the agent to run the loop: at least three rounds, until a round no longer improves on the one before.

{{prompt:eval-loop-2}}

Round 1's score arrives with nothing from you. Then open the newest briefing in `module-6/runs/` and read it the way the person receiving it would. Add two or three remarks to `./remarks.md` in plain words: *"too hedged"*, *"this number is not ours"*, *"lead with the decision"*. Leave the loop running. The next rounds turn your remarks into rules. The judge never sees them.

Then ask how the loop could try more options at once.

{{prompt:eval-loop-3}}

Then ask how the loop resembles model training.

{{prompt:eval-loop-4}}

## Phase 3: Come back to the notes

*10 min*

Ask the agent whether the last round beat your Module 3 briefing by more than the judge's noise, and which rule failed to stop the miss it was written for. The Debrief removes that rule.

{{prompt:eval-loop-5}}

If numbers are still flagged in round 3, no rule for numbers works yet. If a weak claim passes as grounded, the judge has a blind spot.

## Trace what each round changed

**What happened:**

The notes list every round: how many claims the judge flagged, which rule changed before the round, and which of your remarks became a rule. Compare round 0, your Module 3 briefing, with the last round. Each briefing followed tighter rules than the one before.

## The loop improved the briefing without you

**The point:**

The agent rewrites the rules after every round, and the score improves while you do nothing. The judge never changed, so you can trust the improvement.

**Spot-check the judge.** Mark three claims from the last round as grounded or not, before you see the judge's verdicts. The agent adds them to your five marks from Module 5. Where you and the judge disagree, the judge has a blind spot the loop cannot see.

{{prompt:eval-loop-spot-check}}

This is Plan-Do-Check-Act, run by agents: the rules are the plan, a helper writes, the judge checks, and the main session rewrites the rules. Your next briefing, on any topic, starts from the tighter rules.

## Put another judge in the same loop

**Take-home: put any judge in a loop that improves the thing it scores.**

Ask the agent to set up the same loop around a different judge. Name the output and the judge after the colon.

{{prompt:eval-loop-6}}

<!-- maintainer -->

**Quality:** compendium-audited 2026-11-26 (behavior@42b9610a pedagogy@78d17fc9 strategy@78d17fc9 slides@78d17fc9)
- judges @42b9610a: writing grandfathered, story grandfathered, technical grandfathered, behavior PASS, pedagogy PASS (7 findings see instances/agents-101--exercise--eval-loop.pedagogy.json), strategy PASS, slides PASS (1 finding see instances/agents-101--exercise--eval-loop.slides.json)

**Central concept: the loop improves the work by itself, round after round. The fixed judge is why the rise can be believed.**

This exercise is one of the three Agents 101 magic beats (M3, M6, M8). M5 picks the judge; M6 makes the judge infrastructure (untouchable, trusted) and the generator the student's object of improvement; M8 goes meta one more turn. If this exercise doesn't land, the curriculum's "50% magic" rule fails at M6.

**Keep the surface simple.** The older version had an orchestrator file, heartbeat, dashboard, optional deltas, and explicit folder setup. That made the exercise feel like infrastructure construction. The student-facing shape is now one manual eval, one loop prompt, and one return prompt. The infrastructure lesson still lands because generation and judging are separated into subagents and the main session updates `./generation-tactic.md`.

**The walk-away matters, but it no longer needs theatre.** The facilitator should still push the student out of the chair once the loop starts. The run note is the payoff. If the loop completes quickly, that is fine; the teaching moment is the role shift, not the duration.

**Mechanism legibility is non-negotiable.** Every round writes a briefing and a judgment, and `module-6/eval-notes.md` names how `./generation-tactic.md` changed. A student who asks *"but did it really learn, or did the judge just get easier?"* must be able to read the tactic changes round by round. The prompt tells the agent never to edit `judges/groundedness-judge.md`; the student prompt carries no SHA check (maintainer 2026-11-27: not needed). The tmux runner still compares the judge's SHA before and after.

**The judge is sacrosanct.** The entire exercise rests on the judge not moving. If any subagent or prompt path writes to `judges/groundedness-judge.md` during this module, the score trajectory is meaningless and the exercise has failed. Facilitator must reinforce this if a student asks "should the judge get better too?" The answer is "not in this loop; in this loop the judge is infrastructure and the generator is the project."

**Dependency on M5.** This exercise assumes `judges/groundedness-judge.md` exists on disk from the M5 benchmark. If a cohort skips M5, facilitator hands a reference judge file and notes it as a variant adjustment. Do not run this module without the judge artifact in place.

**Why one tactic file, not a separate prompt plus tactic.**
- `./generation-tactic.md` is the single thing the generator actually reads. Splitting it into a working prompt plus a separate tactic file teaches indirection too early.
- One file leaves room for non-text actions later. A generation tactic can govern a proposed email, ticket update, CRM edit, query, or command.
- It keeps the steering frame open: later evals can nudge the tactic toward groundedness, brevity, tone, generosity, risk posture, or any other dimension.

**Frameworks riffed on:**
- **LLM-as-judge with fixed yardstick** — canonical evals pattern. Move the object of improvement to the generation side, not the scoring side.
- **Role separation** — M3's subagent shape reused at a different level. Generator and judge are separate subagents so neither grades itself.
- **PDCA at the eval layer** — Plan (generation tactic), Do (generator), Check (judge), Act (tactic rewrite).
- **Eval-as-hypothesis** — the generation tactic is a list of assumptions about what groundedness requires, and the judge tests it empirically each round.

**Plug points:**
- Topic for the generation track. Default: the Module 3 system's primary output topic.
- Starting generation tactic for round 1. Default: minimal. Regulated cohorts may seed with 2-3 non-negotiable rules.
- Number of rounds. Default 3. Compressed variants may use 2, but then the trajectory is thinner.

**Capability checks owed (before first delivery):**
- **Subagent dispatch isolation.** The loop dispatches a generator subagent and a judge subagent per round. Claude has no per-file ACL or deny-write primitive; the read-only-judge invariant is prose-only; the tmux runner verifies it via SHA.
- **File-write reliability.** Verify Claude writes each briefing, judgment, final `./generation-tactic.md`, and `module-6/eval-notes.md`.
- **Judge-file immutability.** On a dry run, `git diff judges/groundedness-judge.md` or the runner's SHA comparison shows whether the judge moved.
- **Generation tactic actually gets rewritten.** Verify each generator reads the tactic file updated after the previous round, not the starting default.

**Facilitator notes:**

*Watch-fors:*
- **Chair-sitter.** Student refuses to walk away. Push them out: *"The point is to come back to the loop, not supervise every token."*
- **Score worship.** Student treats a lower flagged-claim count as complete success. Push: *"What did the judge still not see?"*
- **Judge-drift suspicion.** Student suspects the judge silently softened. This is healthy. Open the judge file with them, or diff it.
- **Generic tactic rule.** Claude may write bland rules like "be more specific." Push for failure-class rules: numbers, timelines, quotes, competitor claims, causality, recommendations.

*Decision points:*
- If the loop stalls, ask Claude to continue from the last completed round by reading `./generation-tactic.md` and `module-6/runs/`.
- If the score gets worse, treat it as data. Did the prompt over-correct? Did the generator ignore the prompt? Did the judge catch a new class of claim?

**Why this is the only M6 exercise:**
- The older manual groundedness loop fed judge output back to the generator by hand. This exercise automates that loop while keeping the judge fixed.
- The older steering exercise was a useful second dimension, but a second full exercise steals focus from the magic beat. Steering now appears in the closing lecture as a compact goal-nudger eval.

**View summary:** You fix the judge you picked as infrastructure, start a loop in which the generator learns to pass it, and walk away for half an hour. The artifact is a generation tactic that improved without you, and the question of who checked the judge.
