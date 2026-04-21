# Exercise: The eval loop runs itself

**What you do:**

Yesterday in Module 5 you picked a winner out of four judges — a bake-off. The one that caught the most fabrication without flagging things that were fine got saved as `judges/groundedness-judge.md`. That judge is now yours. It works. You watched it work.

Today, you stop running it.

**Eval as infrastructure** — not a score you check occasionally, but a judge that runs on every build, watches what it misses, and sharpens itself. The eval is live machinery now, not an artifact you inspect. That's the shift today.

You set up an **orchestrator** — one Claude session whose whole job is to direct other work. It launches **two generation tracks in parallel**, each producing a fresh briefing on the same topic from your Module 3 system. A **continuous eval loop** runs alongside: your judge scores every output, a meta-agent watches what the judge missed, and the judge's own rules get rewritten between rounds. Three rounds. No intervention. You start it and walk away.

You will come back to a dashboard: *round 1 caught 8 issues, round 2 caught 11 including the two you flagged as missed, round 3 caught 13 and both briefings converged on groundedness.* The judge you left with is sharper than the judge you started with — not because you edited it, but because it watched itself fail and patched itself.

Two loops compounding. Generation sharpens under eval pressure. The eval sharpens from watching generation.

**Phase 1 — Set the orchestrator (12 min).**

Open a fresh Claude Code session in your training directory.

**Prompt** *(copy → Claude Code)*

```
Build me an orchestrator for a self-improving eval loop. Save it as module-6/orchestrator.md.

The orchestrator runs 3 rounds. In each round it does this, in order:

1. Launch two parallel generation tracks by dispatching two subagents at the same time. Each track regenerates a briefing on the same topic using sources in sources/, memory/, and module-3/retrievals/. Save as module-6/runs/round-N/briefing-A.md and briefing-B.md.

2. Run the judge at judges/groundedness-judge.md against both briefings. Save judgments as module-6/runs/round-N/judgment-A.md and judgment-B.md.

3. Dispatch a subagent whose sole role is meta-evaluation of the judge. It reads: the current judge file, both judgments just produced, and any human-annotated deltas at module-6/runs/round-N/deltas.md if that file exists. It must over-flag, not under-flag — propose at least one specific rule edit per round, even if the judge looks fine. Tighten categories that missed real issues; loosen categories that flagged non-issues. Save the proposed edit as module-6/runs/round-N/judge-diff.md. Then apply the edit directly to judges/groundedness-judge.md — write the edited file to disk so round N+1 reads the new version. Log one line of reasoning per rule change to module-6/runs/round-N/meta-log.md.

4. After each round (including round 1), append one line to module-6/heartbeat.md — timestamp + round number + phase just completed ("round-1 generation done", "round-1 judge done", "round-1 meta-eval done, judge patched"). This is the signal the student peeks at during walk-away to confirm the loop is alive.

5. Between rounds, pause for 60 seconds. This is the window where I can drop a deltas.md file into the next round's folder if I want to flag something the judge missed.

At the end of round 3, write a summary to module-6/dashboard.md: issues caught per round per briefing, rules changed per round with one-line reasoning, whether the two briefings converged on groundedness (claim-level agreement above 90%), and the final state of the judge.

Before you write the orchestrator file, show me the 3-round pseudo-code outline in under 20 lines. I'll approve the shape, then you save the full file.
```

*(end of prompt)*

Claude proposes the orchestrator. Read the structure — not the prose, the shape. Two tracks. Three rounds. Judge → meta-agent → judge edit. Approve. Save.

You now have a conductor on disk.

**Phase 2 — Kick it off and walk away (25-30 min).**

Create the empty run folders:

**Prompt** *(copy → Claude Code)*

```
Create module-6/runs/round-1/, round-2/, round-3/ and module-6/dashboard.md.
```

*(end of prompt)*

Start the loop:

**Prompt** *(copy → Claude Code)*

```
Read module-6/orchestrator.md and run it end to end. Do all three rounds. Do not stop for confirmation between rounds. Write outputs to the paths specified. When round 3 finishes, write module-6/dashboard.md.
```

*(end of prompt)*

Claude starts. Round 1 begins. Both generation tracks run. The judge lands its first scores.

**Now leave the chair.**

The facilitator uses this window for a parallel activity — the debrief prep below. You can also use it to annotate one thing you want the judge to catch that it probably won't. That's Phase 2b.

**Phase 2b (optional, during the walk-away window).**

Open `module-6/runs/round-1/judgment-A.md` once it lands (give it ~5 minutes). Skim for two claims the judge marked GROUNDED that you don't believe. Open the cited source file. Confirm. If the judge is wrong, write a two-line `module-6/runs/round-2/deltas.md` before round 2 starts.

Example shape (do not paste — write your own against what you actually saw):

```
Claim: "Competitor X cut pricing 15% in Q3." Judge marked GROUNDED citing sources/competitive-notes.md. The file mentions pricing pressure but does not state the 15% figure. Judge's GROUNDED rule is too lenient on numeric precision.

Claim: "Regulators are likely to act within six months." Judge marked GROUNDED citing memory/regulatory-outlook.md. The file says "eventually" — not a timeline. Judge's UNGROUNDED-SHAPE rule should trigger on probability+timeline claims even when topic is covered.
```

Save it. Don't tell Claude. The orchestrator is already watching for that file.

Close the laptop. Walk.

**One signal you can peek at.** If you get anxious during the walk-away — *is it actually running, or has it hit a confirmation prompt I can't see?* — open `module-6/heartbeat.md`. One line per phase. If the last line is recent, the loop is alive. Don't open anything else. The dashboard is the payoff; looking at artifacts mid-run robs the return.

**Phase 3 — Come back to the dashboard (15 min).**

Open `module-6/dashboard.md`. Read it end to end. You should see something like:

- Round 1: briefing-A caught 8 issues, briefing-B caught 6. No rule changes yet — meta-agent needed a baseline.
- Round 2: briefing-A caught 11 issues (including both flagged in your deltas.md), briefing-B caught 9. Rules changed: GROUNDED tightened on numeric claims (requires the exact figure in source, not the topic). UNGROUNDED-SHAPE broadened to trigger on probability-plus-timeline even when topic is covered.
- Round 3: briefing-A caught 13 issues, briefing-B caught 12. Claim-level agreement between A and B: 94%. Convergence verdict: YES.
- Final judge state: two rules tightened, one loosened, one new category edge handled.

**Integrity check.** Before you celebrate, verify the judge actually changed on disk.

**Prompt** *(copy → Claude Code)*

```
Diff judges/groundedness-judge.md against its state at the end of Module 5. Show me every line that changed. Confirm: at least one rule was actually rewritten (not just appended, not just logged). If no rule changed in the file itself, tell me — the meta-agent may have proposed edits without applying them.
```

*(end of prompt)*

Read the diff. At least one rule line must be different from yesterday's version. If the file is unchanged, the "self-improving" claim failed silently — flag it to the facilitator. If the diff is real, the loop worked.

Open `module-6/runs/round-2/judge-diff.md` and `round-3/judge-diff.md`. Each one names a specific rule that got edited and the reasoning. That's the proof — the judge didn't drift, it learned. You can read what it learned.

Now the artifact beat. Write one line to `module-6/eval-notes.md` — in your own words — naming how many new rules the judge picked up across the three rounds, the two specific things it watched itself miss, and what changed for you about evals now that the loop runs on the loop itself.

Save.

**What happens:**

Round 1 is the floor. Your M5 winner judge catches what it knew to catch. Round 2 is where the mechanism kicks in — the meta-agent read round 1's judgments, noticed patterns (and, if you dropped a deltas.md, human signal too), and proposed rule edits. Round 3 runs on the tighter judge. The two briefings converge because they're both under the same (now stricter) pressure.

The transcript is the proof. You can point at every rule change and name why it happened. No black box. No "it got better." You watched, from the outside, a quality discipline automate itself.

And you weren't there. That's the part that matters.

**The point:**

In Module 5 you were the eval. In Module 6 the eval is the eval, and the eval is *also* the thing being evaluated. The judge has moved from object to infrastructure. You don't inspect it — you watch it improve.

This is what "we can automate the loop" actually means. Not a scheduled script. A second-order loop: one loop scores output, the other loop scores the scorer. Each round, both sides get tighter. The student who walked away for 25 minutes came back to a sharper tool than the one they set up. And tomorrow's run on a different topic starts from the sharper tool — the learning stuck on disk.

Convergence was the floor in Module 5. Eval-as-infrastructure is the ceiling here. The next natural question — *who else on my team would want this?* — is Module 7's problem.

**Time:** 55-70 min. Phase 1 build + Phase 2 kickoff ~15 min, walk-away window ~25-30 min (folds into Connections for the next session, or into the Debrief prep below), Phase 3 return and read dashboard ~15 min.

<!-- maintainer -->

**Central concept — two loops compounding. Eval as infrastructure, not as object.**

This exercise is one of the three Bootstrap magic beats (M3, M6, M8). M5 picks the judge; M6 makes the judge alive; M8 goes meta one more turn. If this exercise doesn't land, the curriculum's "50% magic" rule fails at M6.

**The walk-away is the whole lesson.** If the student sits and watches Claude work the whole time, the mood contract breaks. Facilitator must push them out of the chair at Phase 2 — hard. *"Close the laptop. Get coffee. Come back in 25."* The dashboard-on-return is the payoff; staying in the chair steals it.

**Mechanism legibility is non-negotiable.** Every round writes three artifacts (briefings, judgments, judge-diff). A student who asks *"but did it really learn, or did it just log an update?"* must be able to open `judge-diff.md` and read the specific rule change + the reasoning. The meta-log is the anti-mystification device.

**Dependency on M5.** This exercise assumes `judges/groundedness-judge.md` exists on disk from the M5 bake-off. If a cohort skips M5 (rare — executive-briefing variants), facilitator hands a reference judge file and notes it as a variant adjustment. Don't run this module without the judge artifact in place.

**Why two generation tracks, not three or four.**
- One track can't show convergence (nothing to converge with).
- Two tracks let the claim-level agreement metric exist — it's the convergence proof.
- Three+ tracks multiply token cost, session time, and cognitive load for marginal teaching gain. Two is the minimum that honors the pattern.

**Frameworks riffed on:**
- **LLM-as-judge + self-improvement** — canonical evals pattern extended with a meta-loop. Named in Phase 1; expanded in the lecture.
- **Orchestrator + fan-out** — M3's multi-agent shape, reused at a different level. The student has seen fan-out before; this is fan-out put to work.
- **Eval-as-hypothesis** — strategy-as-assumptions (Roger Martin) extended: the judge itself is an assumption, and the loop tests it empirically.
- **PDCA at the eval layer** — Plan (orchestrator design), Do (generation tracks), Check (judge), Act (meta-agent rewrites judge). Not named to students; available to facilitators who want to draw the parallel.

**Philosophy callouts (sparing):**
- Belief on the loop running on the loop — lands in Phase 3 when the student reads the judge-diff files.
- Belief on encoding judgment as machine-runnable — already landed in M5; do NOT repeat here.

**Plug points:**
- Topic for the two generation tracks. Default: the Module 3 system's primary output topic (same source set the student has been working with all week). Variant for cohorts without a strong M3 artifact: a generic "competitive briefing on [customer domain]" prompt.
- Convergence threshold (default 90% claim-level agreement). Cohorts with regulated outputs may push to 95%+ before calling it converged.
- Walk-away duration. Default 25-30 min. Short-session variants (mid-management, 60-min slot) compress to 15 min with 2 rounds; facilitator notes this loses some of the mood.

**Mood check (before shipping):**
- M6's mood is unleashed leverage — *"we can automate the loop."* The walk-away window and the dashboard-on-return are the mood's load-bearing moments. If either collapses, the mood collapses.
- Phase 3's dashboard must read like a scoreboard, not a log. The facilitator can cue: *"Don't read it line by line. Look at the three rows. What changed between them?"*
- Do NOT steal M7's generosity. The judge is the student's own; the *"who would want this?"* question belongs to next module. Stay on personal leverage.

**Capability checks owed (before first delivery):**
- **Long-running single session.** Verify Claude Code holds a single session through three full rounds (~25-30 min) without timing out or asking for intervention. If the session prompts mid-run, the orchestrator prompt needs a "do not pause for confirmation" instruction (already included; verify it works).
- **Parallel track execution.** Claude Code does parallel work within a single session by dispatching subagents. Verify the orchestrator prompt reliably spawns two generation subagents rather than sequentializing them. If sequential, the exercise still works but loses ~10 min — adjust time budget.
- **File-write reliability under load.** Nine artifacts per run (briefings, judgments, diffs, meta-log) plus dashboard. Verify Claude doesn't skip writes under cognitive load. If writes drop, reduce artifacts per round to the minimum (briefing, judgment, diff).
- **Meta-agent actually edits the judge.** This is the load-bearing capability. Verify on a dry run that the meta-agent's proposed edits get applied to `judges/groundedness-judge.md` and that round N+1 uses the edited version. If the meta-agent proposes without applying, exercise falls apart. Fix in prompt if needed: make "apply the edit if sound" explicit.
- **Walk-away realism.** Time an actual end-to-end run on a representative training directory. If it completes in 12 minutes, the walk-away is too short to feel real; pad with a fourth round or deeper source reading per track. If it takes 45 minutes, trim source set.

**Facilitator notes:**

*Watch-fors:*
- **Chair-sitter.** Student refuses to walk away. Push them out: *"The whole point is to come back. Close the laptop."* Offer a specific thing to do in that time (debrief prep, a walk, the Phase 2b delta annotation) so the walk-away feels purposeful, not idle.
- **Dashboard skim.** Student glances at dashboard and declares it "worked" without reading the judge-diff files. Push: *"Open round-2/judge-diff.md. Read the specific rule that changed. Why did the meta-agent change that one and not another?"*
- **Meta-agent distrust.** Student doesn't believe the judge actually learned, suspects cosmetic logging. This is healthy — lean into it. *"Compare judges/groundedness-judge.md to last session's version. Diff the rules. That's the evidence."*
- **Deltas.md skipped.** Student doesn't annotate Phase 2b, so the meta-agent only learns from patterns in its own output. The loop still works but the human-signal demonstration is thinner. Not a failure — note for next cohort whether Phase 2b should be mandatory.
- **Run stalls mid-round.** Rare but possible. If round 2 hangs, facilitator kills the session and restarts from `orchestrator.md` with `--resume from round 2`. Build this fallback into the prompt on next iteration.

*Decision points:*
- At 15 min elapsed, Phase 1 still being debated → cut the orchestrator review short, push Phase 2. The orchestrator is a means, not a deliverable.
- At 40 min elapsed, dashboard hasn't landed → session may be slow; facilitator shortens Phase 3 to dashboard-read only, skip the eval-notes line.
- At 60 min elapsed, convergence not reached → that's a finding. *"Your sources aren't rich enough for 90% agreement. Or your judge's tightening went too far. Which one?"* Different failure modes, both teachable.

*Pacing:* 10-12 min Phase 1 (build orchestrator, approve), 3 min Phase 2 kickoff, 25-30 min walk-away, 12-15 min Phase 3 return + read dashboard + write eval-notes line. Debrief follows.

**Why this replaces groundedness-eval.md AND steering-eval.md as the primary M6 exercise:**
- groundedness-eval.md was a manual loop (student feeds judge output back to generator). Banned pattern per the "agents do the heavy lifting" rule from M2 onward.
- steering-eval.md was a useful second dimension (encoding preference, not correctness) but splitting M6 across two exercises steals focus from the magic beat. The steering dimension is still teachable — facilitator can fold a 5-min framing into the Debrief ("what would you steer toward, not just steer against?") or keep steering-eval.md as a supplementary for cohorts that want a second pass.

**Disposition of the old exercises:**
- `groundedness-eval.md` — **supersedes.** Keep on disk as reference for facilitators who want to see the old convergence-only version; not referenced from any Bootstrap module file. Add a header note directing readers to `eval-loop.md`.
- `steering-eval.md` — **keep as supplementary.** Useful for variants (mid-management, executive briefing, or a second-day deep-dive cohort). Not inlined in the Bootstrap M6 module file.
