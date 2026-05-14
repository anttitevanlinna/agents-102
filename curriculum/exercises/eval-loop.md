# Exercise: The eval loop runs itself

**Time:** 35-45 min. Phase 0 manual run ~5 min, Phase 1 kickoff ~3 min, walk-away window ~20-25 min, Phase 2 return and read notes ~10 min.

**Session** *(new, "Module 6 - Evaluations")*

Start a new Claude session at your training-directory root.

```
/rename m6-evaluations
```

**What you do:**

In Module 5 you ran a benchmark on four detectors and picked the one that caught the most fabrication. The winner got saved as `judges/groundedness-judge.md`. That judge is now yours. It works. You watched it work.

Now you stop running it by hand.

**Eval as infrastructure:** the judge is a fixed yardstick. It doesn't move. What moves is the thing being measured. You set up a loop where a generator prompt produces a briefing, the judge scores it and writes per-claim feedback, and the main session rewrites the prompt for the next round. Run at least three rounds under the same judge, then continue until the next round no longer improves meaningfully. The score goes up because the generation prompt learns what the yardstick punishes. The measuring stick never shifts. A yardstick you rewrite is not a yardstick.

**Subagents** are isolated Claude sessions that run inside the same project, each gets fresh context for its own job, no cross-contamination.

First, write the generation prompt and run the judge once by hand on its first briefing. See what it catches. Then ask Claude to run the loop: generation and judging happen in separate subagents; the main session owns the prompt rewrite between rounds.

You will come back to a short run note: *round 1 flagged 11 claims, round 2 flagged 6 after the generation prompt tightened numeric sourcing, round 3 flagged 3 after probability-plus-timeline claims got banned.* The generator prompt you left with is sharper than the one you started with, under the exact same judge you started with.

**Phase 0: Run the judge once (~5 min).**

One move before you automate. See what your judge does on a fresh output, end to end, with no loop in the middle.

Ask Claude to generate one briefing and score it with the judge from Module 5.

{{prompt:eval-loop-1}}

That's the manual version. Your judge ran once. You saw what it catches and what the generation prompt will need to learn.

Now make that happen three times without you feeding the output back by hand.

**Phase 1: Start the loop (~3 min).**

Ask Claude to run the loop. Generation and judging should happen in separate subagents; the main session reads the judgment and rewrites `./generation-prompt.md` between rounds.

{{prompt:eval-loop-2}}

Now step away. The point is not to watch Claude type. The point is to come back to a generator that has been tightened by a judge you did not move.

**Bonus prompts while the loop runs.**

If the loop is underway and you want to understand the shape of the leverage, ask about parallel search:

{{prompt:eval-loop-3}}

Then ask for the model-training analogy in small pieces:

{{prompt:eval-loop-4}}

**Phase 2: Come back to the notes (~10 min).**

Ask Claude to show the loop result and the final generation prompt.

{{prompt:eval-loop-5}}

Read the answer. Push back where it is too neat. If round 3 still failed on numbers, the generation prompt does not yet know how to handle numbers. If the judge marked weak claims as grounded, the judge has a blind spot. If the score got worse, that is data: the prompt absorbed the wrong lesson or the generator ignored it.

**Integrity check.** The score trajectory only means something if the yardstick stayed still. A SHA match in `module-6/eval-notes.md` is the run's proof claim. If the judge file moved, the exercise failed. If only `./generation-prompt.md` moved, the loop worked.

**What happened:**

Round 1 is the floor. Your generator runs with the prompt you wrote in Phase 0 and the judge catches whatever it catches. Round 2 is where the mechanism kicks in. The main session read round 1's per-claim feedback, absorbed it into `./generation-prompt.md`, and the next generator read the tighter prompt. Round 3 runs on the even tighter prompt.

The transcript is the proof. You can point at every prompt change and name the feedback that produced it. No black box. No "it got better." You watched, from the outside, a generator learn to pass a fixed test.

And you weren't there.

**The point:**

In Module 5 you were the eval. In Module 6 the eval is fixed infrastructure, and the thing being evaluated learns to pass it. The judge has moved from object to yardstick. You do not inspect every output; you define the pressure that shapes the next output.

This is what "we can automate the loop" actually means. Not a scheduled script. A PDCA loop at the eval layer: Plan (generation prompt), Do (generate), Check (judge), Act (rewrite prompt). Each round, the Plan gets sharper under Check pressure. The next run on a different topic starts from the tighter prompt; the learning stuck on disk.

**Take-home: put any judge in a loop that improves the thing it scores.**

Any judge you own becomes infrastructure the moment you stop editing it and start improving what it scores.

Ask Claude to set up the loop around a different judge:

{{prompt:eval-loop-6}}

Convergence was the floor in Module 5. Eval-as-yardstick is the ceiling here. The next natural question (*who else on my team would want this?*) is Module 7's problem.

<!-- maintainer -->

**Central concept — eval as fixed yardstick. The thing being measured learns to pass it.**

This exercise is one of the three Agents 101 magic beats (M3, M6, M8). M5 picks the judge; M6 makes the judge infrastructure (untouchable, trusted) and the generator the student's object of improvement; M8 goes meta one more turn. If this exercise doesn't land, the curriculum's "50% magic" rule fails at M6.

**Keep the surface simple.** The older version had an orchestrator file, heartbeat, dashboard, optional deltas, and explicit folder setup. That made the exercise feel like infrastructure construction. The student-facing shape is now one manual eval, one loop prompt, and one return prompt. The infrastructure lesson still lands because generation and judging are separated into subagents and the main session updates `./generation-prompt.md`.

**The walk-away matters, but it no longer needs theatre.** The facilitator should still push the student out of the chair once the loop starts. The run note is the payoff. If the loop completes quickly, that is fine; the teaching moment is the role shift, not the duration.

**Mechanism legibility is non-negotiable.** Every round writes a briefing and a judgment, and `module-6/eval-notes.md` names how `./generation-prompt.md` changed. A student who asks *"but did it really learn, or did the judge just get easier?"* must be able to read the prompt changes and confirm `judges/groundedness-judge.md` is byte-identical to its starting SHA. The integrity check is the anti-mystification device.

**The judge is sacrosanct.** The entire exercise rests on the judge not moving. If any subagent or prompt path writes to `judges/groundedness-judge.md` during this module, the score trajectory is meaningless and the exercise has failed. Facilitator must reinforce this if a student asks "should the judge get better too?" The answer is "not in this loop; in this loop the judge is infrastructure and the generator is the project."

**Dependency on M5.** This exercise assumes `judges/groundedness-judge.md` exists on disk from the M5 benchmark. If a cohort skips M5, facilitator hands a reference judge file and notes it as a variant adjustment. Do not run this module without the judge artifact in place.

**Why `generation-prompt.md`, not a separate tactic file.**
- The prompt is the thing the generator actually reads. Improving a second file teaches indirection too early.
- It leaves room for non-text actions later. A generation prompt can govern a proposed email, ticket update, CRM edit, query, or command.
- It keeps the steering frame open: later evals can nudge the prompt toward groundedness, brevity, tone, generosity, risk posture, or any other dimension.

**Frameworks riffed on:**
- **LLM-as-judge with fixed yardstick** — canonical evals pattern. Move the object of improvement to the generation side, not the scoring side.
- **Role separation** — M3's subagent shape reused at a different level. Generator and judge are separate subagents so neither grades itself.
- **PDCA at the eval layer** — Plan (generation prompt), Do (generator), Check (judge), Act (prompt rewrite).
- **Eval-as-hypothesis** — the generation prompt is a list of assumptions about what groundedness requires, and the judge tests it empirically each round.

**Plug points:**
- Topic for the generation track. Default: the Module 3 system's primary output topic.
- Starting generation prompt for round 1. Default: minimal. Regulated cohorts may seed with 2-3 non-negotiable rules.
- Number of rounds. Default 3. Compressed variants may use 2, but then the trajectory is thinner.

**Capability checks owed (before first delivery):**
- **Subagent dispatch isolation.** The loop dispatches a generator subagent and a judge subagent per round. Claude has no per-file ACL or deny-write primitive; the read-only-judge invariant is prose-only and verified post-hoc via SHA.
- **File-write reliability.** Verify Claude writes each briefing, judgment, final `./generation-prompt.md`, and `module-6/eval-notes.md`.
- **Judge-file immutability.** Verify on a dry run that the starting and ending SHA for `judges/groundedness-judge.md` match.
- **Generation prompt actually gets rewritten.** Verify each generator reads the prompt file updated after the previous round, not the starting default.

**Facilitator notes:**

*Watch-fors:*
- **Chair-sitter.** Student refuses to walk away. Push them out: *"The point is to come back to the loop, not supervise every token."*
- **Score worship.** Student treats a lower flagged-claim count as complete success. Push: *"What did the judge still not see?"*
- **Judge-drift suspicion.** Student suspects the judge silently softened. This is healthy. Point to the SHA check.
- **Generic prompt rule.** Claude may write bland rules like "be more specific." Push for failure-class rules: numbers, timelines, quotes, competitor claims, causality, recommendations.

*Decision points:*
- If the loop stalls, ask Claude to continue from the last completed round by reading `./generation-prompt.md` and `module-6/runs/`.
- If the score gets worse, treat it as data. Did the prompt over-correct? Did the generator ignore the prompt? Did the judge catch a new class of claim?

**Why this is the only M6 exercise:**
- The older manual groundedness loop fed judge output back to the generator by hand. This exercise automates that loop while keeping the judge fixed.
- The older steering exercise was a useful second dimension, but a second full exercise steals focus from the magic beat. Steering now appears in the closing lecture as a compact goal-nudger eval.

**Quality:** compendium-audited 2026-05-09 (behavior@56f9332)
- judges @56f9332: writing grandfathered, story grandfathered, technical grandfathered, behavior PASS (accepted-by-design-walk-away-absorbs-preamble)
