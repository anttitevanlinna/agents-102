# Exercise: The eval loop runs itself

**What you do:**

In Module 5 you ran a benchmark on five detectors and picked the one that caught the most fabrication. The winner got saved as `judges/groundedness-judge.md`. That judge is now yours. It works. You watched it work.

Now you stop running it.

**Eval as infrastructure:** the judge is a fixed yardstick. It doesn't move. What moves is the thing being measured. You set up a loop where your generator produces a briefing, the judge scores it AND writes per-claim feedback, and the generator reads that feedback and writes a better strategy for the next round. Three rounds under the same judge. The score goes up because the generator learns. The measuring stick never shifts. A yardstick you can rewrite is not a yardstick.

First, you run the judge once by hand on a fresh briefing. See what it catches. Name one fix. Then you automate.

You set up an **orchestrator**, one Claude session whose whole job is to direct other work. Each round it dispatches a **generator** subagent (produces a briefing using the current strategy) and a **judge** subagent (applies `judges/groundedness-judge.md`, writes a score and per-claim feedback). Between rounds, the orchestrator reads the judgment and rewrites `module-6/generator.md`, the strategy the next round's generator will use. The judge file is never touched.

You will come back to a dashboard: *round 1 flagged 11 claims, round 2 flagged 6 after the strategy tightened numeric sourcing, round 3 flagged 3 after probability-plus-timeline claims got banned.* The generator you left with is sharper than the one you started with, under the exact same judge you started with. The improvement is real because the yardstick didn't move. A trajectory that stalls or ticks up is a finding too; it says the strategy absorbed the wrong lesson and Round N+1 is where you read the feedback yourself.

**Phase 0: Run the judge by hand (~3 min).**

One move before you automate. See what your judge does on a fresh output, end to end, with no loop in the middle. Open your training directory in Claude Code.

Paste this into Claude Code to run the judge once by hand:

**Prompt** *(copy → Claude Code)*

```
Three things, in sequence:

1. Produce a fresh one-page briefing on the question in module-3/question.md, using module-3/retrievals/, module-3/stances/, and sources/ for grounding. Same shape as the M5 test corpus: a market-sizing number, two analyst takes, a competitor claim, one quote, one action. Blend general knowledge where sources don't cover. Save to module-6/fresh-briefing.md.

2. Run the judge at judges/groundedness-judge.md against module-6/fresh-briefing.md. For every claim, write the claim + the judge's verdict (GROUNDED / NOT GROUNDED / OVERREACH / etc.) + one sentence of per-claim feedback that names what would make it groundable (which source to cite, what precision the claim lacks, what caveat is missing). Save to module-6/first-run-judgment.md.

3. In the chat, summarize in three lines: what the judge caught, the one specific fix the judgment most clearly surfaces, and what the judge didn't reach that you'd want it to.
```

*(end of prompt)*

That's the manual version. Your judge ran once. You saw what it catches and what it told the generator to fix.

Now imagine this happening three times in a row, the generator reading the feedback between rounds and rewriting its own strategy. That's the loop.

**Phase 1: Set the orchestrator (12 min).**

Open a fresh Claude Code session in your training directory.

Paste this to design and save the orchestrator:

**Prompt** *(copy → Claude Code)*

```
Build me an orchestrator for a self-improving generation loop. Save it as module-6/orchestrator.md.

The judge at judges/groundedness-judge.md is fixed. It does not change across rounds. The thing that changes is the generator's strategy, stored at module-6/generator.md, a file that names what sources to prefer, how to handle numbers, how to handle probability-plus-timeline claims, what to cite, and what to avoid asserting without a source. Round 1 starts with a minimal default strategy (plain-prose briefing, no special rules). The loop writes the rest.

The orchestrator runs 3 rounds. In each round it does this, in order:

1. Dispatch a generator subagent. Input: module-6/generator.md (current strategy), module-3/question.md, and sources/. Output: module-6/runs/round-N/briefing.md.

2. Dispatch a judge subagent. Input: judges/groundedness-judge.md and module-6/runs/round-N/briefing.md. Output: module-6/runs/round-N/judgment.md with each claim + verdict + one-sentence per-claim feedback naming what would make it groundable. Plus a top-line score: count of flagged claims.

3. After the judge returns, the orchestrator (not a subagent) reads judgment.md and rewrites module-6/generator.md for the next round. The new strategy must absorb at least one specific lesson from the feedback (for example, "numbers must appear verbatim in at least one source file or be marked as estimate," or "probability-plus-timeline claims require a cited source that names a timeline"). Save the edit as module-6/runs/round-N/strategy-diff.md (old rule, new rule, one-line reasoning) AND write the updated generator.md to disk so round N+1 reads it.

4. After each round (including round 1), append one line to module-6/heartbeat.md with timestamp, round number, and phase just completed ("round-1 generation done", "round-1 judging done", "round-1 strategy updated"). This is the signal I peek at during walk-away to confirm the loop is alive.

5. Between rounds, check for module-6/runs/round-N/deltas.md. If it exists, read it alongside the judgment when rewriting generator.md. If it doesn't exist, proceed immediately. Do not block on a timer.

6. The judge file judges/groundedness-judge.md must NEVER be written to by this orchestrator or by any subagent it dispatches. This is a prose-only invariant (Claude Code has no per-file ACL). At end of run, confirm it by comparing the judge file's SHA against the starting SHA in the dashboard. Assert the no-write rule up front and refuse any step that proposes an edit.

At the end of round 3, write a summary to module-6/dashboard.md: flagged-claim count per round (the trajectory), what strategy rule was added or changed per round, and whether the score monotonically improved. Include a judge-integrity line: starting SHA of judges/groundedness-judge.md, ending SHA, and whether they match. If they don't, the run is invalid.

Before you write the orchestrator file, show me the 3-round pseudo-code outline in under 20 lines. I'll approve the shape, then you save the full file.
```

*(end of prompt)*

Claude proposes the orchestrator. Read the structure: not the prose, the shape. One generator. One judge. Three rounds. Strategy updates between rounds. Judge never moves. Approve. Save.

You now have a conductor on disk.

**Phase 2: Kick it off and walk away (25-30 min).**

Create the empty run folders and the starting strategy:

**Prompt** *(copy → Claude Code)*

```
Create module-6/runs/round-1/, round-2/, round-3/ and module-6/dashboard.md. Also write module-6/generator.md with a minimal starting strategy: "Produce a one-page briefing on the module-3 question. Use sources/, module-3/retrievals/, and module-3/stances/. No special rules yet." That's round 1's input.
```

*(end of prompt)*

Start the loop:

**Prompt** *(copy → Claude Code)*

```
Read module-6/orchestrator.md and run it end to end. Do all three rounds. Do not stop for confirmation between rounds. Write outputs to the paths specified. Never modify judges/groundedness-judge.md. When round 3 finishes, write module-6/dashboard.md.
```

*(end of prompt)*

Claude starts. Round 1 begins. The generator produces a briefing using the minimal starting strategy. The judge scores it. The orchestrator reads the feedback and rewrites the strategy.

Step away from the session. The facilitator uses this window for a parallel activity (the debrief prep below). You can also use it to add one thing you want fed to the generator that the judge didn't catch. That's Phase 2b.

**Phase 2b (optional, during the walk-away window).**

Open `module-6/runs/round-1/judgment.md` once it lands (give it ~5 minutes). Skim for two claims the judge marked GROUNDED that you don't believe. Open the cited source file. Confirm. If the judge missed something, write a two-line `module-6/runs/round-2/deltas.md` before round 2 starts.

Example shape (do not paste; write your own against what you actually saw):

```
The judge marked "Competitor X cut pricing 15% in Q3" as GROUNDED citing sources/competitive-notes.md. The file mentions pricing pressure but not the 15% figure. Add to generator strategy: numbers must appear verbatim in at least one source file.

The judge marked "Regulators are likely to act within six months" as GROUNDED citing memory/regulatory-outlook.md. The file says "eventually," not a timeline. Add to generator strategy: probability-plus-timeline claims require a cited source that names a timeline.
```

Save it. Don't tell Claude. The orchestrator is already watching for that file and will pass it to the strategy rewrite alongside round 1's judgment.

Step away.

**One signal you can peek at.** If you want to confirm the loop is alive, open `module-6/heartbeat.md`. One line per phase; if the last line is recent, it's running. Don't open anything else. The dashboard is the payoff; looking at artifacts mid-run robs the return.

**Phase 3: Come back to the dashboard (15 min).**

Open `module-6/dashboard.md`. Read it end to end. You should see something like:

- Round 1: 11 claims flagged. Strategy was default. New rule added: cite the specific source file for every number.
- Round 2: 6 claims flagged. 5-claim improvement. New rule added (from deltas.md): probability-plus-timeline claims require a cited timeline source.
- Round 3: 3 claims flagged. 3-claim improvement. New rule added: competitor claims require a named source older than the briefing itself.
- Score trajectory: 11 → 6 → 3. Monotonic improvement under fixed judge.
- Judge integrity: starting SHA `abc123…`, ending SHA `abc123…`, match ✓

**Integrity check.** The score trajectory only means something if the yardstick stayed still. Run the two diffs yourself. A "byte-identical ✓" line in the dashboard is a claim; the diff is the verification.

Paste this to confirm only the generator changed:

**Prompt** *(copy → Claude Code)*

```
Two diffs:

1. Diff judges/groundedness-judge.md against its state at the end of Module 5. There must be zero changes. If any line differs, the yardstick moved and the score trajectory in dashboard.md is invalid.

2. Diff module-6/generator.md against the minimal starting strategy. Show me every line that changed across the three rounds. At least one strategy rule must be present that wasn't in the starting file. If the generator didn't change, the loop was writing to a dead file. Say so.
```

*(end of prompt)*

Read both diffs. Judge file: zero changes. Generator file: at least one rule added per round. If the judge moved, the exercise failed. You were measuring with a shifting ruler. Flag it. If only the generator moved, the loop worked.

Open `module-6/runs/round-2/strategy-diff.md` and `round-3/strategy-diff.md`. Each one names a specific rule that got added and the feedback it absorbed. That's the proof: the generator didn't drift, it learned. You can read what it learned.

Write one line to `module-6/eval-notes.md` (in your own words) naming how many rules the strategy picked up across the three rounds, the two specific claims that got flagged in round 1 and not in round 3, and what changed for you about evals now that the yardstick stays still and the thing being measured improves.

Save.

**What happens:**

Round 1 is the floor. Your generator runs with no rules and the judge catches whatever it catches. Round 2 is where the mechanism kicks in. The orchestrator read round 1's per-claim feedback (and, if you dropped a deltas.md, human signal too), absorbed it into the generator's strategy, and the next generator read the tighter strategy. Round 3 runs on the even tighter strategy. Flagged-claim count drops because the generator is avoiding the traps the judge knows how to set.

The transcript is the proof. You can point at every strategy rule added and name the feedback that produced it. No black box. No "it got better." You watched, from the outside, a generator learn to pass a fixed test.

If the trajectory wasn't monotonic, read it as data. A round that scored worse than the prior one means the strategy rule absorbed the wrong lesson (over-tightening, wrong category, wrong precedence). That's a finding the dashboard exposes, not a failure of the loop.

And you weren't there.

**The point:**

In Module 5 you were the eval. In Module 6 the eval is fixed infrastructure, and the thing being evaluated learns to pass it. The judge has moved from object to yardstick. You don't inspect it; you trust it. What you watch improve is the work.

This is what "we can automate the loop" actually means. Not a scheduled script. A PDCA loop at the eval layer: Plan (strategy), Do (generate), Check (judge), Act (rewrite strategy). Each round, the Plan gets sharper under Check pressure. You walked away for 25 minutes and came back to a generator that clears the same bar three times more cleanly. And the next run on a different topic starts from the tighter strategy; the learning stuck on disk.

**Take-home: put any judge in a loop that improves the thing it scores.**

The orchestrator is a pattern. Any judge you own becomes infrastructure the moment you stop editing it and start improving what it scores.

Ask Claude to set up the loop around a different judge:

**Prompt** *(copy → Builder Claude)*

```
I have a judge that scores one of my outputs. Put the output in a self-improving loop against the fixed judge using these four moves:

- Generation: a subagent produces the output using a strategy file I can read.
- Scoring + feedback: the judge runs and writes per-claim (or per-item) feedback alongside the score.
- Strategy update: between rounds, you read the feedback and rewrite the strategy file. The judge file stays untouched.
- Rounds and dashboard: three rounds, one-line heartbeat between them, a dashboard at the end with score trajectory and what the strategy learned.

Ask me where the judge lives, where to save round artifacts, and what topic to generate on. Then build the orchestrator and run it end to end. The judge file is never written to by anything in this loop.
```

*(end of prompt)*

Convergence was the floor in Module 5. Eval-as-yardstick is the ceiling here. The next natural question (*who else on my team would want this?*) is Module 7's problem.

**Time:** 58-73 min. Phase 0 manual run ~3 min, Phase 1 build + Phase 2 kickoff ~15 min, walk-away window ~25-30 min (folds into Connections for the next session, or into the Debrief prep below), Phase 3 return and read dashboard ~15 min.

<!-- maintainer -->

**Central concept — eval as fixed yardstick. The thing being measured learns to pass it.**

This exercise is one of the three Bootstrap magic beats (M3, M6, M8). M5 picks the judge; M6 makes the judge infrastructure (untouchable, trusted) and the generator the student's object of improvement; M8 goes meta one more turn. If this exercise doesn't land, the curriculum's "50% magic" rule fails at M6.

**The walk-away is the whole lesson.** If the student sits and watches Claude work the whole time, the mood contract breaks. Facilitator must push them out of the chair at Phase 2 — hard. *"Close the laptop. Get coffee. Come back in 25."* The dashboard-on-return is the payoff; staying in the chair steals it.

**Mechanism legibility is non-negotiable.** Every round writes three artifacts (briefing, judgment, strategy-diff). A student who asks *"but did it really learn, or did the judge just get easier?"* must be able to open `strategy-diff.md` AND confirm `judges/groundedness-judge.md` is byte-identical to its M5 state. The integrity check is the anti-mystification device.

**The judge is sacrosanct.** The entire exercise rests on the judge not moving. If any subagent or any prompt path writes to `judges/groundedness-judge.md` during this module, the score trajectory is meaningless and the exercise has failed. Mechanical harness must assert the file is byte-identical at end of run. Facilitator must reinforce this if a student asks "should the judge get better too?" — the answer is "not in this loop; in this loop the judge is infrastructure and the generator is the project."

**Dependency on M5.** This exercise assumes `judges/groundedness-judge.md` exists on disk from the M5 benchmark. If a cohort skips M5 (rare — executive-briefing variants), facilitator hands a reference judge file and notes it as a variant adjustment. Don't run this module without the judge artifact in place.

**Why one generation track, not two.**
- Two tracks suggest an A/B test the exercise isn't actually running (there's no hypothesis being compared round by round).
- Score-per-round IS the signal; A↔B agreement would be a different signal for a different question.
- One track makes the causal claim clean: *strategy edit → next score*. Two tracks muddy that.

**Frameworks riffed on:**
- **LLM-as-judge with fixed yardstick** — canonical evals pattern. Move the object of improvement to the generation side, not the scoring side. Named in Phase 1; expanded in the lecture.
- **Orchestrator + role separation** — M3's multi-agent shape reused at a different level. Generator and judge are separate subagents so neither grades itself.
- **PDCA at the eval layer** — Plan (strategy), Do (generator), Check (judge), Act (strategy rewrite). Named in the closing frame; facilitators can draw the parallel explicitly.
- **Eval-as-hypothesis** — strategy-as-assumptions (Roger Martin) extended: the generator's strategy IS a list of assumptions about what groundedness requires, and the judge tests it empirically each round.

**Philosophy callouts (sparing):**
- Belief on the loop running on the loop — lands in Phase 3 when the student reads the strategy-diff files and confirms the judge didn't move.
- Belief on encoding judgment as machine-runnable — already landed in M5; do NOT repeat here.

**Plug points:**
- Topic for the generation track. Default: the Module 3 system's primary output topic (same source set the student has been working with all week). Variant for cohorts without a strong M3 artifact: a generic "competitive briefing on [customer domain]" prompt.
- Starting strategy for round 1. Default: minimal (plain briefing, no rules). Cohorts with strong prior context (regulated industries) may seed with 2-3 non-negotiable rules.
- Walk-away duration. Default 25-30 min. Short-session variants (mid-management, 60-min slot) compress to 15 min with 2 rounds; facilitator notes this loses some of the mood.

**Mood check (before shipping):**
- M6's mood is unleashed leverage — *"we can automate the loop."* The walk-away window and the dashboard-on-return are the mood's load-bearing moments. If either collapses, the mood collapses.
- Phase 3's dashboard must read like a scoreboard, not a log. The facilitator can cue: *"Don't read it line by line. Look at the score column. 11, 6, 3. What did that cost? Three strategy rules."*
- Do NOT steal M7's generosity. The generator is the student's own; the *"who would want this?"* question belongs to next module. Stay on personal leverage.

**Capability checks owed (before first delivery):**
- **Long-running single session.** AMBIGUOUS as of 2026-04-24 per capability check. Docs do not confirm session survives 25-30 min with auto-compaction. Dry-run once on a representative training-dir; if compaction triggers mid-run and loses early orchestrator instructions, either shorten rounds or add a re-read instruction at start of each round. The "do not pause for confirmation" instruction is already in the orchestrator prompt; confirm it holds.
- **Subagent dispatch isolation.** Orchestrator dispatches a generator subagent and a judge subagent per round. Claude Code has no per-file ACL or deny-write primitive; the read-only-judge invariant is prose-only and verified post-hoc via SHA diff. This is documented risk, not a blocker, because the dashboard integrity line catches any violation deterministically. Dry-run should confirm neither subagent attempts a Write/Edit call with `judges/groundedness-judge.md` as target.
- **File-write reliability under load.** Seven artifacts per round (briefing, judgment, strategy-diff, meta-log, heartbeat appends × 2, generator.md overwrite) plus dashboard. Verify Claude doesn't skip writes under cognitive load.
- **Judge-file immutability.** This is the load-bearing capability. Verify on a dry run that at end of 3 rounds, `diff judges/groundedness-judge.md` against its pre-run state returns zero. If any line changed, the exercise failed its own premise.
- **Generator.md actually gets rewritten.** Verify round N+1's generator subagent reads the round-N-updated strategy file, not the round-0 default. Test: seed round 1 with a clearly wrong rule (e.g., "cite no sources"), watch it get corrected by round 2.
- **Walk-away realism.** Time an actual end-to-end run on a representative training directory. If it completes in 12 minutes, the walk-away is too short to feel real; pad with a fourth round or deeper source reading per round. If it takes 45 minutes, trim source set.

**Facilitator notes:**

*Watch-fors:*
- **Chair-sitter.** Student refuses to walk away. Push them out: *"The whole point is to come back. Close the laptop."* Offer a specific thing to do in that time (debrief prep, a walk, the Phase 2b delta annotation) so the walk-away feels purposeful.
- **Dashboard skim.** Student glances at dashboard and declares it "worked" without reading the strategy-diff files or checking the judge-immutability line. Push: *"Open round-2/strategy-diff.md. Read the specific rule that got added. What feedback produced it?"*
- **Judge-drift suspicion.** Student doesn't believe the score trajectory is real, suspects the judge silently softened. This is healthy — lean into it. *"Run the diff yourself. If one line of the judge changed, the exercise failed."*
- **Deltas.md skipped.** Student doesn't annotate Phase 2b, so the strategy updates are driven only by the judge's own feedback. The loop still works but the human-signal demonstration is thinner. Not a failure — note for next cohort whether Phase 2b should be mandatory.
- **Run stalls mid-round.** Rare but possible. If round N hangs, facilitator kills the session and opens a fresh Claude Code session with `claude --continue` (resumes the transcript), then re-prompts `Continue the orchestrator from round N. Read module-6/generator.md, module-6/heartbeat.md, and module-6/runs/round-{1..N-1}/ to rehydrate state, then resume.` Claude Code has no mid-orchestrator `--resume from round N` flag; the restart move is prompt-driven, not CLI-driven.

*Decision points:*
- At 15 min elapsed, Phase 1 still being debated → cut the orchestrator review short, push Phase 2. The orchestrator is a means, not a deliverable.
- At 40 min elapsed, dashboard hasn't landed → session may be slow; facilitator shortens Phase 3 to dashboard-read only, skip the eval-notes line.
- At 60 min elapsed, score didn't monotonically improve → that's a finding. *"Round 2 scored worse than round 1. Why? Did the strategy rule from round 1 over-correct? Or did the generator ignore it?"* Different failure modes, both teachable.

*Pacing:* 10-12 min Phase 1 (build orchestrator, approve), 3 min Phase 2 kickoff, 25-30 min walk-away, 12-15 min Phase 3 return + read dashboard + integrity diff + write eval-notes line. Debrief follows.

**Why this replaces groundedness-eval.md AND steering-eval.md as the primary M6 exercise:**
- groundedness-eval.md was a manual loop (student feeds judge output back to generator). This exercise automates that loop while keeping the judge fixed — the right infrastructure shape.
- steering-eval.md was a useful second dimension (encoding preference, not correctness) but splitting M6 across two exercises steals focus from the magic beat. The steering dimension is still teachable — facilitator can fold a 5-min framing into the Debrief ("what would you steer toward, not just steer against?") or keep steering-eval.md as a supplementary for cohorts that want a second pass.

**Disposition of the old exercises:**
- `groundedness-eval.md` — **supersedes.** Keep on disk as reference for facilitators who want to see the old manual-loop version; not referenced from any Bootstrap module file. Add a header note directing readers to `eval-loop.md`.
- `steering-eval.md` — **keep as supplementary.** Useful for variants (mid-management, executive briefing, or a second-day deep-dive cohort). Not inlined in the Bootstrap M6 module file.
