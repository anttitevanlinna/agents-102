# Exercise: The eval loop runs itself

**Time:** 45 min: manual run ~5, walk-away ~30, return and read notes ~10.

**Session** *(new, "Module 6 - Evaluations")*

Start a new session at your training-directory root, named `m6-evaluations` if supported.

**What you do:**

Stop running `judges/groundedness-judge.md` by hand.

**Eval as infrastructure:** the judge is a fixed yardstick; the generator changes under it. A generator writes a briefing from its tactic, the judge scores it with per-claim feedback, and the main session rewrites the tactic. Run at least three rounds, then continue until improvement stops. A yardstick you rewrite is not a yardstick.

**Helper agents** are isolated workers, each with fresh context for its own job.

First write the tactic and run the judge once by hand on the first briefing. Then ask the lead agent to run the loop: separate helpers generate and judge; the lead session rewrites the tactic between rounds.

Example run note: *round 1 flagged 11 claims, round 2 flagged 6, round 3 flagged 3.*

## Phase 1: Run the judge once

*5 min*

Before automating, run the judge once by hand: ask the agent to generate one briefing and score it with the judge from Module 5.

{{prompt:eval-loop-1}}

Note what the judge catches; the tactic must learn that. Next, the loop runs three times without you feeding output back.

## Phase 2: Start the loop, then walk away

*30 min*

Ask the lead agent to run the loop. Generation and judging run in separate helpers; the lead reads the judgment and rewrites `./generation-tactic.md` between rounds.

{{prompt:eval-loop-2}}

Now step away. Come back to a generator tightened by a judge you did not move.

While the loop runs, ask about parallel search:

{{prompt:eval-loop-3}}

Then the model-training analogy, in small pieces:

{{prompt:eval-loop-4}}

## Phase 3: Come back to the notes

*10 min*

Ask for the loop result and final generation tactic.

{{prompt:eval-loop-5}}

Failed numbers in round 3 mean the tactic cannot handle numbers yet; weak claims marked grounded mean the judge has a blind spot.

**Integrity check.** The score means something only if the judge stayed still: the SHA in `module-6/eval-notes.md` must match. If the judge file moved, the exercise failed; if only `./generation-tactic.md` moved, the loop worked.

## Trace what each round changed

**What happened:**

Round 1 is the floor: your generator runs with the tactic you wrote in Phase 1, and the judge catches what it catches. In round 2, the main session read round 1's per-claim feedback and absorbed it into `./generation-tactic.md`; the next generator read the tighter tactic. Round 3 runs on a tighter one still.

And you weren't there.

## Take the judge from object to yardstick

**The point:**

In Module 5 you were the eval. Now the judge is a fixed, separate yardstick, and the generator learns to pass it. You do not inspect every output; you design the loop and own the yardstick.

PDCA at the eval layer: Plan (generation tactic), Do (generate), Check (judge), Act (rewrite tactic). The next run, on any topic, starts from the tighter tactic on disk.

## Put another judge in the same loop

**Take-home: put any judge in a loop that improves the thing it scores.**

Ask the agent to set up the loop around a different judge:

{{prompt:eval-loop-6}}

Convergence was the floor in Module 5. Eval-as-yardstick is the ceiling here.

<!-- maintainer -->

**Quality:** compendium-audited 2026-08-25 (behavior@725101ec pedagogy@725101ec strategy@725101ec slides@4d9c4af2)
- judges @4d9c4af2: writing grandfathered, story grandfathered, technical grandfathered, behavior PASS, pedagogy PASS, strategy PASS, slides PASS

**Central concept — eval as fixed yardstick. The thing being measured learns to pass it.**

This exercise is one of the three Agents 101 magic beats (M3, M6, M8). M5 picks the judge; M6 makes the judge infrastructure (untouchable, trusted) and the generator the student's object of improvement; M8 goes meta one more turn. If this exercise doesn't land, the curriculum's "50% magic" rule fails at M6.

**Keep the surface simple.** The older version had an orchestrator file, heartbeat, dashboard, optional deltas, and explicit folder setup. That made the exercise feel like infrastructure construction. The student-facing shape is now one manual eval, one loop prompt, and one return prompt. The infrastructure lesson still lands because generation and judging are separated into subagents and the main session updates `./generation-tactic.md`.

**The walk-away matters, but it no longer needs theatre.** The facilitator should still push the student out of the chair once the loop starts. The run note is the payoff. If the loop completes quickly, that is fine; the teaching moment is the role shift, not the duration.

**Mechanism legibility is non-negotiable.** Every round writes a briefing and a judgment, and `module-6/eval-notes.md` names how `./generation-tactic.md` changed. A student who asks *"but did it really learn, or did the judge just get easier?"* must be able to read the tactic changes and confirm `judges/groundedness-judge.md` is byte-identical to its starting SHA. The integrity check is the anti-mystification device.

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
- **Subagent dispatch isolation.** The loop dispatches a generator subagent and a judge subagent per round. Claude has no per-file ACL or deny-write primitive; the read-only-judge invariant is prose-only and verified post-hoc via SHA.
- **File-write reliability.** Verify Claude writes each briefing, judgment, final `./generation-tactic.md`, and `module-6/eval-notes.md`.
- **Judge-file immutability.** Verify on a dry run that the starting and ending SHA for `judges/groundedness-judge.md` match.
- **Generation tactic actually gets rewritten.** Verify each generator reads the tactic file updated after the previous round, not the starting default.

**Facilitator notes:**

*Watch-fors:*
- **Chair-sitter.** Student refuses to walk away. Push them out: *"The point is to come back to the loop, not supervise every token."*
- **Score worship.** Student treats a lower flagged-claim count as complete success. Push: *"What did the judge still not see?"*
- **Judge-drift suspicion.** Student suspects the judge silently softened. This is healthy. Point to the SHA check.
- **Generic tactic rule.** Claude may write bland rules like "be more specific." Push for failure-class rules: numbers, timelines, quotes, competitor claims, causality, recommendations.

*Decision points:*
- If the loop stalls, ask Claude to continue from the last completed round by reading `./generation-tactic.md` and `module-6/runs/`.
- If the score gets worse, treat it as data. Did the prompt over-correct? Did the generator ignore the prompt? Did the judge catch a new class of claim?

**Why this is the only M6 exercise:**
- The older manual groundedness loop fed judge output back to the generator by hand. This exercise automates that loop while keeping the judge fixed.
- The older steering exercise was a useful second dimension, but a second full exercise steals focus from the magic beat. Steering now appears in the closing lecture as a compact goal-nudger eval.

**View summary:** You fix the judge you picked as infrastructure, start a loop in which the generator learns to pass it, and walk away for half an hour. The artifact is a generation tactic that improved without you, and the question of who checked the judge.
