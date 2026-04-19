# Exercise: Groundedness eval

**What you do:**

Yesterday you were the eval. You read `module-5/briefing-v1.md`, walked through it claim by claim, and classified each one GROUNDED, UNGROUNDED, MISREPRESENTS, OVERREACHES, or UNGROUNDED-SHAPE. It worked. It also took you twenty minutes on a single page of output.

Today you automate that. Same five categories. Same judgment. A judge that runs in seconds, tonight, without you in the room. Three phases. 25–30 minutes. Target material: your Module 5 briefings (`module-5/briefing-v1.md` and `module-5/briefing-v2.md`).

**Phase 1 — Save your judge as a file.**

An eval is judgment written down. Today yours gets a home on disk — a file you can edit, re-run, and share. Open a fresh Claude Code session in the training directory. Paste:

```
Help me build a groundedness judge and save it as module-6/groundedness-judge.md.

The judge's job: read a briefing plus the set of source files it was supposed to be grounded in, and for each specific claim (named person, number, quoted sentence, competitor behaviour, timeline, outcome) classify:

GROUNDED — clearly supported by a specific file on disk. Name the file.
UNGROUNDED — sounds reasonable but isn't in the source material.
MISREPRESENTS — claims to quote or cite a source, but the quote/citation isn't there.
OVERREACHES — the source says something narrower than the briefing claims.
UNGROUNDED-SHAPE — stated with certainty the source can't support (timeline, probability, measurable outcome).

Pass threshold: 80%+ GROUNDED and zero MISREPRESENTS.

Write the file as instructions a future judge-run can follow — the five categories, the threshold, the output format (markdown table: claim | category | file or one-line reason), and a summary line at the end (% GROUNDED, dominant non-grounded category, PASS/FAIL).

Show me the file before saving.
```

Review the file Claude proposes. Save. You now have a judge on disk — a durable artifact, not a scroll of chat.

Run it. Paste:

```
Run the judge at module-6/groundedness-judge.md against module-5/briefing-v1.md, grounded on source files in sources/, module-3/retrievals/, and module-3/stances/.

Read everything directly from disk. Save the judgment as module-6/eval-runs/run-2026-04-19-1.md (increment the number for future runs).
```

Watch it. The machine does exactly what you did yesterday. Same five categories. No domain expertise. Rigorous application of rules you wrote down. Open the saved judgment. See the rows. See the FAIL verdict you already knew was coming.

**Phase 2 — Run the loop.**

Feed the judgment back to the generator. Paste:

```
Read the latest judgment in module-6/eval-runs/. For every claim it marked UNGROUNDED, MISREPRESENTS, OVERREACHES, or UNGROUNDED-SHAPE in module-5/briefing-v1.md, either:
- Rewrite the claim to cite a specific file that supports it, OR
- Remove the claim entirely, OR
- Replace the claim with "Not in source material" where the briefing needs the beat but the ground can't carry it.

Don't touch the GROUNDED claims. Save the result as module-5/briefing-v1-pass-1.md.

Then re-run the judge at module-6/groundedness-judge.md against the new file. Save the new judgment as module-6/eval-runs/run-2026-04-19-2.md. Tell me what changed.
```

Two or three passes usually gets there. If the briefing stays failing past three passes, the issue is outline-level, not line-level — flag it and move on.

This is convergence. Not a fix — a loop. Judge → regenerate → judge. The generator doesn't get smarter, the judge doesn't get smarter, but every pass reduces the delta until the output clears the bar.

You just did by machine what you did yesterday by hand — and the machine can do it again tonight, on ten briefings, while you sleep. That's the floor of what evals buy you. The mechanical rescue from Module 5, industrialised.

**Phase 3 — Catch the judge being wrong.**

The judge is an assumption. Theories are wrong sometimes.

Open your latest judgment. Pick one GROUNDED row you can check. Before asking Claude anything, open the source file it cites yourself. Read the passage. Does the source actually state or clearly imply the specific claim? Or does it just mention the topic?

This is the citation-cargo-cult pattern you saw in Module 5 — the citation's format is right, the substance isn't there. Your judge has the same weakness you did before you learned to check citations at source.

Now write the tightening. Paste:

```
Open module-6/groundedness-judge.md. I want to tighten the GROUNDED rule: GROUNDED only if the cited file contains a sentence that states or clearly implies the claim — topic overlap is not enough.

Show me the proposed edit. After I approve, rewrite the file and re-run the judge on module-5/briefing-v1-pass-[latest].md. Save the new judgment as module-6/eval-runs/run-2026-04-19-[next].md.

Tell me which rows flipped and why.
```

Watch rows flip. Write one line to `module-6/eval-notes.md`:

*"My groundedness judge was too lenient on [category]. I tightened [rule]. [N] rows flipped from GROUNDED to [new category]. The eval is an assumption — today's version of it is [one sentence]."*

That line is the artifact. You built a judge, ran it, caught it being wrong, adjusted the file, re-ran. The judge now lives on disk — tomorrow's version is one edit away, not one session away.

**What happens:**

Phase 1 reproduces your M5 hand-check in seconds and saves the judge as a file you can keep. Phase 2's convergence loop closes — a failing briefing clears the threshold in two or three passes, mechanically. Phase 3 catches the judge being wrong on at least one row, rewrites the file, re-runs — the eval itself is now on the same loop the output is on.

**The point:**

Convergence is the floor. A groundedness judge doesn't tell you the output is *good* — it tells you the output isn't *inventing*. That's a lot. It's also not enough. No convergence eval produces differentiation. A competitor running the same LLM with the same judge gets the same correct-and-forgettable briefing. The ceiling lives in the next exercise, where you write a judge for something that's specifically yours.

And the judge itself is a hypothesis. Every run tests the criterion as much as the output. You just adjusted it. You'll adjust it again tomorrow when it misses something today's version couldn't see. The loop runs on the output, and the loop runs on the loop.

**Time:** 25–30 minutes. Paired with the Steering eval exercise in the same module session.

<!-- maintainer -->

**Central concept — convergence.**

This exercise makes convergence experiential. Generate → eval → adjust → regenerate → eval → pass. The student feels the mechanical rescue from Module 5 scale: same judgment, now running without them. Pairs directly with Steering eval (the ceiling) — convergence is the floor.

**The five-category frame is reused from Module 5 on purpose.**
The student already owns the vocabulary. Phase 1 is strictly "write down what you already know how to do." The leverage feeling lands because there's no new classification discipline to learn — the discipline was learned in M5, and today it gets automated.

**Why the judge is a file, not a chat prompt.**
Simulation surfaced that chat-scrollback judges vanish at session end — the "eval-as-living-artifact" beat evaporates. Saving `groundedness-judge.md` in Phase 1 gives the criterion a home. Phase 3's tightening becomes a file edit, not a re-paste. The loop-on-the-loop is persistent by construction.

**Frameworks riffed on:**
- **LLM-as-judge** — canonical evals pattern. Named in Phase 1; expanded in the lecture.
- **Convergence loop** — iterative-optimisation shape (PID / gradient descent without the math). Student sees the delta shrink empirically.
- **Eval-as-hypothesis** — strategy-as-assumptions (Roger Martin) extended to the eval itself. Carries Module 8's "what would have to be true for these evals to be the right ones?" throughline.
- **Citation cargo-culting** — failure mode named in M5; Phase 3 re-surfaces it as the specific thing to hunt for.

**Philosophy callouts (sparing):**
- Belief on encoding judgment so machines can run it — lands in Phase 1.
- Belief on the loop — eval the eval — lands in Phase 3.
- Neither front-loaded; both named after the move is done.

**Plug points:**
- Default threshold (80%+ GROUNDED, zero MISREPRESENTS) is calibrated for strategic briefings. Operational outputs (status reports, CS replies) may run tighter — 95%+ with no UNGROUNDED-SHAPE. Note in variant.
- Five-category frame is the default. Regulated-industry cohorts may add a category (REGULATORY-OVERREACH). Welcome the addition.
- Briefing-v1/v2 as targets is default. Cohorts that skipped M5 (mid-management single-day) substitute Module 3 synthesis output directly.

**Why this exercise precedes Steering eval in the module:**
- Convergence is the easier shift — the criterion is already written (M5 classification). Steering is harder because the student has to articulate preference.
- Floor, then ceiling. A participant who only gets through Phase 1–2 still leaves with convergence. Steering is the premium.

**Facilitator notes:**

*Watch-fors:*
- **One-pass stopper.** Student runs the judge once, gets a verdict, calls it done. Coach: *"You built the tool. The tool is the loop, not the single run. Run it on v2, then a new briefing."*
- **Judge-trusting reader.** Student treats the judge's GROUNDED calls as gospel. Phase 3 is the inoculation. Enforce it: *"Pick a GROUNDED row. Open the source file yourself. Does the sentence actually back the claim?"*
- **Self-audit charity.** When the student asks Claude to check its own judge calls, Claude tends to confirm. Push the student to open source files themselves before Claude does — Phase 3 now structures this explicitly, but some will skip the step. Nudge: *"Don't ask Claude. You read the file first."*
- **Threshold paralysis.** Student calibrates the threshold (*"is 80% right? 90%?"*). Coach: *"Threshold is a dial, not a truth. Pick a default, the loop picks it up."*
- **Briefing-v1 too ungrounded.** If the convergence loop churns past three passes, call it: *"Three passes is normal — more than that means outline-level rewrite, not line-edit. Different failure mode."*

*Decision points:*
- Still setting up the judge at 10 min → hand a reference `groundedness-judge.md` and push to Phase 2.
- Clean pass at 15 min → push to Phase 3 and insist on a criterion adjustment (*"find one GROUNDED row that's citation-cargo-culting"*).

*Pacing:* 8–10 min Phase 1 (build + first run); 8–10 min Phase 2 (convergence loop, usually two passes); 8–10 min Phase 3 (interrogate + rewrite + rerun). Banter welcomed — *"look at what mine classified as UNGROUNDED"* is where pattern recognition consolidates.

**Capability checks owed (before first delivery):**
- **Read-from-disk in Phase 1.** Verify Claude Code reads referenced files without explicit attachment. If the model asks "should I read these?" add "read these first" as an explicit step.
- **File save with specified filename.** Verify `module-6/groundedness-judge.md` and `run-YYYY-MM-DD-N.md` save without Claude asking for filename confirmation. If it stalls, pre-bake "use exactly this filename" in the prompt.
- **Judge consistency across runs.** Run the same judge on the same briefing twice in one session. Scores should be stable; edge cases (OVERREACHES vs UNGROUNDED-SHAPE) may flip. If drift is high, tighten the judge file's category definitions before first delivery.
- **Judge-file-edit-and-rerun flow.** Verify Claude can edit `groundedness-judge.md` and then run the edited file. If the session doesn't reliably pick up the new file, use separate prompts for edit and run.

**Mood check (before shipping):**
- M6's mood is unleashed leverage. Phase 1 and 2 must *feel like scale*. Language ("industrialised," "while you sleep," "ten briefings tonight") earns the mood.
- Phase 3 is the epistemic beat, not a damper — catching the judge being wrong extends leverage (the eval itself iterates), doesn't qualify it. Tone: *"even the judge iterates."* The file-on-disk framing supports this — the judge isn't a transient thing you have to re-explain every session; it's a growing artifact.
- Do not steal M7's generosity. Personal-leverage frame only — your judge, your output, your loop. M7 comes back for "who else would want this judge?"

**Deferred:**
- Variant extensions (mid-management — briefer exercise, skip Phase 3 scaffolding; executive briefing — demo only, no build).
- Reference `groundedness-judge.md` file for facilitators to hand out when a student is stuck past 10 min in Phase 1.
