# Exercise: The eval loop runs itself

**What you do:**

In Module 5 you ran a benchmark on four detectors and picked the one that caught the most fabrication. The winner got saved as `judges/groundedness-judge.md`. That judge is now yours. It works. You watched it work.

Now you stop running it by hand.

**Eval as infrastructure:** the judge is a fixed yardstick. It doesn't move. What moves is the thing being measured. You set up a loop where a generator produces a briefing, the judge scores it and writes per-claim feedback, and the main session turns that feedback into a better generation tactic for the next round. Three rounds under the same judge. The score goes up because the generator learns what the yardstick punishes. The measuring stick never shifts. A yardstick you rewrite is not a yardstick.

First, run the judge once by hand on a fresh briefing. See what it catches. Then ask Claude to run the loop: generation and judging happen in separate <span class="rt-code">subagents</span><span class="rt-cowork">agents</span>; the main session owns the tactic update between rounds.

You will come back to a short run note: *round 1 flagged 11 claims, round 2 flagged 6 after the tactic tightened numeric sourcing, round 3 flagged 3 after probability-plus-timeline claims got banned.* The generator you left with is sharper than the one you started with, under the exact same judge you started with.

**Phase 0: Run the judge once (~5 min).**

One move before you automate. See what your judge does on a fresh output, end to end, with no loop in the middle. You should already be in this module's fresh session at the training-directory root.

Ask Claude to generate one briefing and score it with the judge from Module 5.

**Prompt** *(Claude Code)*

```
Three things, in sequence:

1. Produce a fresh one-page briefing on the question in ./crux.md, using sources/ and module-3/stances/ for grounding. Use the same rough shape as the Module 5 test corpus: a concrete number, two contrasting takes, a competitor or outside-world claim, one quote, and one recommended action. Mark anything that relies on general knowledge rather than the local files. Save to module-6/fresh-briefing.md.

2. Run the judge at judges/groundedness-judge.md against module-6/fresh-briefing.md. For every claim, write the claim, the judge's verdict, and one sentence of per-claim feedback naming what would make it more groundable. Save to module-6/first-run-judgment.md.

3. In the chat, summarize in three lines: what the judge caught, the one specific fix the judgment most clearly surfaces, and what the judge did not reach that you would still want checked.
```

That's the manual version. Your judge ran once. You saw what it catches and what it tells the generator to fix.

Now make that happen three times without you feeding the output back by hand.

**Phase 1: Start the loop (~3 min).**

Ask Claude to create the tactic file and run three rounds. Generation and judging should happen in separate <span class="rt-code">subagents</span><span class="rt-cowork">agents</span>; the main session reads the judgment and rewrites the tactic between rounds.

<div class="rt-code">

**Prompt** *(Claude Code)*

```
Run a three-round eval loop using my fixed judge.

Fixed judge:
- Read judges/groundedness-judge.md.
- If judges/groundedness-judge.md is missing, stop and tell me Module 5 has not handed off the judge yet.
- Never edit judges/groundedness-judge.md.
- Before round 1, compute and record the starting SHA of judges/groundedness-judge.md.
- After round 3, compute the ending SHA and report whether the judge stayed byte-identical.

Starting tactic:
- Create ./generation-tactic.md with this starting tactic: "Produce a one-page briefing on the question in ./crux.md. Use sources/ and module-3/stances/. Prefer local evidence. Mark anything that relies on general knowledge. No special rules yet."
- Create the module-6/runs/round-1/, module-6/runs/round-2/, and module-6/runs/round-3/ directories as needed.

For each of 3 rounds:
1. Dispatch a generator subagent. It must read ./generation-tactic.md, ./crux.md, sources/, and module-3/stances/. It writes the briefing for that round:
   - round 1: module-6/runs/round-1/briefing.md
   - round 2: module-6/runs/round-2/briefing.md
   - round 3: module-6/runs/round-3/briefing.md
2. Dispatch a separate judge subagent. It must read judges/groundedness-judge.md and the briefing for that round. It writes the judgment for that round:
   - round 1: module-6/runs/round-1/judgment.md
   - round 2: module-6/runs/round-2/judgment.md
   - round 3: module-6/runs/round-3/judgment.md
   Each judgment includes verdicts and one-sentence feedback per claim, plus a top-line count of flagged claims.
3. The main session, not a subagent, reads the judgment for that round and rewrites ./generation-tactic.md for the next round. Integrate the lesson; do not append retro notes. Save a short explanation of the change for that round:
   - round 1: module-6/runs/round-1/tactic-change.md
   - round 2: module-6/runs/round-2/tactic-change.md
   - round 3: module-6/runs/round-3/tactic-change.md

After round 3:
- Write module-6/eval-notes.md with the score trajectory, the tactic change after each round, the judge SHA check, one thing the judge still cannot see, and one human decision still needed.
- In chat, show me the same summary in under 12 lines.

Do not stop for confirmation between rounds.
```

</div>
<div class="rt-cowork">

**Prompt** *(Claude Code)*

```
Run a three-round eval loop using my fixed judge.

Fixed judge:
- Read judges/groundedness-judge.md.
- If judges/groundedness-judge.md is missing, stop and tell me Module 5 has not handed off the judge yet.
- Never edit judges/groundedness-judge.md.
- Before round 1, compute and record the starting SHA of judges/groundedness-judge.md.
- After round 3, compute the ending SHA and report whether the judge stayed byte-identical.

Starting tactic:
- Create ./generation-tactic.md with this starting tactic: "Produce a one-page briefing on the question in ./crux.md. Use sources/ and module-3/stances/. Prefer local evidence. Mark anything that relies on general knowledge. No special rules yet."
- Create the module-6/runs/round-1/, module-6/runs/round-2/, and module-6/runs/round-3/ directories as needed.

For each of 3 rounds:
1. Dispatch a generator agent. It must read ./generation-tactic.md, ./crux.md, sources/, and module-3/stances/. It writes the briefing for that round:
   - round 1: module-6/runs/round-1/briefing.md
   - round 2: module-6/runs/round-2/briefing.md
   - round 3: module-6/runs/round-3/briefing.md
2. Dispatch a separate judge agent. It must read judges/groundedness-judge.md and the briefing for that round. It writes the judgment for that round:
   - round 1: module-6/runs/round-1/judgment.md
   - round 2: module-6/runs/round-2/judgment.md
   - round 3: module-6/runs/round-3/judgment.md
   Each judgment includes verdicts and one-sentence feedback per claim, plus a top-line count of flagged claims.
3. The main session, not an agent, reads the judgment for that round and rewrites ./generation-tactic.md for the next round. Integrate the lesson; do not append retro notes. Save a short explanation of the change for that round:
   - round 1: module-6/runs/round-1/tactic-change.md
   - round 2: module-6/runs/round-2/tactic-change.md
   - round 3: module-6/runs/round-3/tactic-change.md

After round 3:
- Write module-6/eval-notes.md with the score trajectory, the tactic change after each round, the judge SHA check, one thing the judge still cannot see, and one human decision still needed.
- In chat, show me the same summary in under 12 lines.

Do not stop for confirmation between rounds.
```

</div>

Now step away. The point is not to watch Claude type. The point is to come back to a generator that has been tightened by a judge you did not move.

**Bonus prompts while the loop runs.**

If the loop is underway and you want to understand the shape of the leverage, ask about parallel search:

**Prompt** *(Claude Code)*

```
Claude: can we scale this by adding more generation tracks to try more options faster?
```

Then ask for the model-training analogy in small pieces:

**Prompt** *(Claude Code)*

```
Claude: what is the similarity to model training here? Tell me in 5 snippets, one at a time. After each snippet, wait for me to say "next."
```

**Phase 2: Come back to the notes (~10 min).**

Ask Claude to show the loop result and the final tactic.

**Prompt** *(Claude Code)*

```
Show me module-6/eval-notes.md and ./generation-tactic.md.

Then answer in five bullets:
- Did the judge file stay byte-identical?
- What was the score trajectory?
- Which tactic change most clearly improved the next round?
- Which failure did the tactic still not absorb?
- What would you test in the next run?
```

Read the answer. Push back where it is too neat. If round 3 still failed on numbers, the tactic does not yet know how to handle numbers. If the judge marked weak claims as grounded, the judge has a blind spot. If the score got worse, that is data: the tactic absorbed the wrong lesson or the generator ignored it.

**Integrity check.** The score trajectory only means something if the yardstick stayed still. A SHA match in `module-6/eval-notes.md` is the run's proof claim. If the judge file moved, the exercise failed. If only `./generation-tactic.md` moved, the loop worked.

**What happens:**

Round 1 is the floor. Your generator runs with a minimal tactic and the judge catches whatever it catches. Round 2 is where the mechanism kicks in. The main session read round 1's per-claim feedback, absorbed it into `./generation-tactic.md`, and the next generator read the tighter tactic. Round 3 runs on the even tighter tactic.

The transcript is the proof. You can point at every tactic change and name the feedback that produced it. No black box. No "it got better." You watched, from the outside, a generator learn to pass a fixed test.

And you weren't there.

**The point:**

In Module 5 you were the eval. In Module 6 the eval is fixed infrastructure, and the thing being evaluated learns to pass it. The judge has moved from object to yardstick. You do not inspect every output; you define the pressure that shapes the next output.

This is what "we can automate the loop" actually means. Not a scheduled script. A PDCA loop at the eval layer: Plan (tactic), Do (generate), Check (judge), Act (rewrite tactic). Each round, the Plan gets sharper under Check pressure. The next run on a different topic starts from the tighter tactic; the learning stuck on disk.

**Take-home: put any judge in a loop that improves the thing it scores.**

Any judge you own becomes infrastructure the moment you stop editing it and start improving what it scores.

Ask Claude to set up the loop around a different judge:

<div class="rt-code">

**Prompt** *(Builder Claude)*

```
I have a judge that scores one of my outputs. Put the output in a self-improving loop against the fixed judge using these four moves:

- Generation: a subagent produces the output using a tactic file I can read.
- Scoring + feedback: a separate judge subagent runs the judge and writes per-claim or per-item feedback alongside the score.
- Tactic update: between rounds, the main session reads the feedback and rewrites the tactic file. The judge file stays untouched.
- Notes: after three rounds, write the score trajectory, the tactic changes, the judge-integrity check, and the next boundary case to test.

Ask me one question at a time, wait for my answer, and do not show the list. You need to know where the judge lives, where to save round artifacts, and what topic or output to generate. Then run the loop end to end. The judge file is never written to by anything in this loop.
```

</div>
<div class="rt-cowork">

**Prompt** *(Builder Claude)*

```
I have a judge that scores one of my outputs. Put the output in a self-improving loop against the fixed judge using these four moves:

- Generation: an agent produces the output using a tactic file I can read.
- Scoring + feedback: a separate judge agent runs the judge and writes per-claim or per-item feedback alongside the score.
- Tactic update: between rounds, the main session reads the feedback and rewrites the tactic file. The judge file stays untouched.
- Notes: after three rounds, write the score trajectory, the tactic changes, the judge-integrity check, and the next boundary case to test.

Ask me one question at a time, wait for my answer, and do not show the list. You need to know where the judge lives, where to save round artifacts, and what topic or output to generate. Then run the loop end to end. The judge file is never written to by anything in this loop.
```

</div>

Convergence was the floor in Module 5. Eval-as-yardstick is the ceiling here. The next natural question (*who else on my team would want this?*) is Module 7's problem.

**Time:** 35-45 min. Phase 0 manual run ~5 min, Phase 1 kickoff ~3 min, walk-away window ~20-25 min, Phase 2 return and read notes ~10 min.

<!-- maintainer -->

**Central concept — eval as fixed yardstick. The thing being measured learns to pass it.**

This exercise is one of the three Bootstrap magic beats (M3, M6, M8). M5 picks the judge; M6 makes the judge infrastructure (untouchable, trusted) and the generator the student's object of improvement; M8 goes meta one more turn. If this exercise doesn't land, the curriculum's "50% magic" rule fails at M6.

**Keep the surface simple.** The older version had an orchestrator file, heartbeat, dashboard, optional deltas, and explicit folder setup. That made the exercise feel like infrastructure construction. The student-facing shape is now one manual eval, one loop prompt, and one return prompt. The infrastructure lesson still lands because generation and judging are separated into agents and the main session updates `./generation-tactic.md`.

**The walk-away matters, but it no longer needs theatre.** The facilitator should still push the student out of the chair once the loop starts. The run note is the payoff. If the loop completes quickly, that is fine; the teaching moment is the role shift, not the duration.

**Mechanism legibility is non-negotiable.** Every round writes a briefing, a judgment, and a tactic-change note. A student who asks *"but did it really learn, or did the judge just get easier?"* must be able to open `tactic-change.md` and confirm `judges/groundedness-judge.md` is byte-identical to its starting SHA. The integrity check is the anti-mystification device.

**The judge is sacrosanct.** The entire exercise rests on the judge not moving. If any agent or prompt path writes to `judges/groundedness-judge.md` during this module, the score trajectory is meaningless and the exercise has failed. Facilitator must reinforce this if a student asks "should the judge get better too?" The answer is "not in this loop; in this loop the judge is infrastructure and the generator is the project."

**Dependency on M5.** This exercise assumes `judges/groundedness-judge.md` exists on disk from the M5 benchmark. If a cohort skips M5, facilitator hands a reference judge file and notes it as a variant adjustment. Do not run this module without the judge artifact in place.

**Why `generation-tactic.md`, not `grounding-style.md`.**
- "Tactic" sounds operational: the file is what the generator does next, not a style preference.
- It leaves room for non-text actions later. A tactic can govern a proposed email, ticket update, CRM edit, query, or command.
- It keeps the steering frame open: later evals can nudge a tactic toward groundedness, brevity, tone, generosity, risk posture, or any other dimension.

**Frameworks riffed on:**
- **LLM-as-judge with fixed yardstick** — canonical evals pattern. Move the object of improvement to the generation side, not the scoring side.
- **Role separation** — M3's multi-agent shape reused at a different level. Generator and judge are separate agents so neither grades itself.
- **PDCA at the eval layer** — Plan (tactic), Do (generator), Check (judge), Act (tactic rewrite).
- **Eval-as-hypothesis** — the generator's tactic is a list of assumptions about what groundedness requires, and the judge tests it empirically each round.

**Plug points:**
- Topic for the generation track. Default: the Module 3 system's primary output topic.
- Starting tactic for round 1. Default: minimal. Regulated cohorts may seed with 2-3 non-negotiable rules.
- Number of rounds. Default 3. Compressed variants may use 2, but then the trajectory is thinner.

**Capability checks owed (before first delivery):**
- **Subagent dispatch isolation.** The loop dispatches a generator subagent/agent and a judge subagent/agent per round. Claude Code/Cowork have no per-file ACL or deny-write primitive; the read-only-judge invariant is prose-only and verified post-hoc via SHA.
- **File-write reliability.** Verify Claude writes each briefing, judgment, tactic-change note, final `./generation-tactic.md`, and `module-6/eval-notes.md`.
- **Judge-file immutability.** Verify on a dry run that the starting and ending SHA for `judges/groundedness-judge.md` match.
- **Tactic actually gets rewritten.** Verify round N+1's generator reads the round-N-updated tactic file, not the starting default.

**Facilitator notes:**

*Watch-fors:*
- **Chair-sitter.** Student refuses to walk away. Push them out: *"The point is to come back to the loop, not supervise every token."*
- **Score worship.** Student treats a lower flagged-claim count as complete success. Push: *"What did the judge still not see?"*
- **Judge-drift suspicion.** Student suspects the judge silently softened. This is healthy. Point to the SHA check.
- **Generic tactic.** Claude may write bland rules like "be more specific." Push for failure-class rules: numbers, timelines, quotes, competitor claims, causality, recommendations.

*Decision points:*
- If the loop stalls, ask Claude to continue from the last completed round by reading `./generation-tactic.md` and `module-6/runs/`.
- If the score gets worse, treat it as data. Did the tactic over-correct? Did the generator ignore the tactic? Did the judge catch a new class of claim?

**Why this is the only M6 exercise:**
- The older manual groundedness loop fed judge output back to the generator by hand. This exercise automates that loop while keeping the judge fixed.
- The older steering exercise was a useful second dimension, but a second full exercise steals focus from the magic beat. Steering now appears in the closing lecture as a compact goal-nudger eval.
