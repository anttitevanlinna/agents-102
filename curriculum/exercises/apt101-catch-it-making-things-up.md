# Exercise: Catch it making things *up*

**Time:** 65 minutes. Phase 1 ~10, Phase 2 ~7, Phase 3 ~18, Phase 4 ~10, Phase 5 ~15, close ~5.

**What you do:**

Claude writes a briefing on your outcome from your own evidence, with made-up claims planted in it. You don't hunt for them by hand. Four ways of checking compete to find them, a scorer measures which one caught what, and the winner becomes the check you keep, with a note of what it can't see. Then you run that check on a real research summary your team is about to rely on.

Each of you runs this on your own laptop, in the <span class="rt-code">session</span><span class="rt-cowork">task</span> you opened at the start of the day, against your own evidence.

## Phase 1: Plant the claims

*10 min*

Ask Claude to pick a bounded set of evidence, write an overreaching briefing in a separate worker, and save both without showing you the briefing.

{{prompt:hallucination-bakeoff-1}}

The prompt says "the challenge"; here it is the outcome and the question at the top of your `./crux.md`, and the stances are the three reads you made of the tree's evidence. Aim for roughly one claim in ten made up or stretched. Claude cannot hit that number exactly. It is enough for the checks to have work to do.

**Don't open the briefing.** Your main session stays blind, so it cannot quietly help the checks along.

Ask Claude to turn the briefing into a pool of claims the checks can score.

{{prompt:hallucination-bakeoff-2}}

## Phase 2: Run four checks

*7 min*

Four checks, four methods, the same claim pool, each in its own <span class="rt-code">subagent</span><span class="rt-cowork">agent</span>, each writing to its own file.

<div class="rt-code">

{{prompt:hallucination-bakeoff-3}}

</div>
<div class="rt-cowork">

{{prompt:hallucination-bakeoff-4}}

</div>

Don't read the four files as they land. The scorer reads them.

## Phase 3: Let the scorer decide

*18 min*

A fifth agent checks every claim against the evidence and measures each method: of what it flagged, how much was really made up, and of what was made up, how much it caught.

{{prompt:hallucination-bakeoff-5}}

Ask Claude to explain the two columns using your own rows.

{{prompt:hallucination-bakeoff-6}}

Then ask Claude to set what you just did beside the usual way of checking a research summary, and answer its question about what surprised you in one sentence.

{{prompt:hallucination-bakeoff-7}}

Push back on a surprise that could belong to anyone: "the scoreboard was interesting". Point at the row, the number, and what it means for the next summary that reaches a priority call.

## Phase 4: Keep the winner

*10 min*

Ask Claude to save the winning method as a short judge you can run on any summary.

{{prompt:hallucination-bakeoff-8}}

Open `judges/groundedness-judge.md`. Under twenty lines, named for what it does, with a *Known limit:* line at the bottom. Push back if the limit says something like "quality is hard". It should describe one kind of claim this judge will let through.

## Phase 5: Run it on something real

*15 min*

The briefing was built to be caught. Now pick a summary nobody built to be caught: the overnight digest, the curator's `memory/_synthesis-m3.md` if you ran the curator, or a research summary from your team's drive that someone is about to put in front of a priority call.

Ask Claude to run your judge on it against the sources it claims to draw on.

**Prompt** · `apt101-d2-judge-a-real-summary`, runs `judges/groundedness-judge.md` on the summary file I name, against the source files that summary cites or was built from; lists each flagged claim with the sentence from the source that supports it or "not found"; saves the result to `team/<your-name>/judge-run.md`; ends with the one flagged claim most likely to have reached a decision unchecked

Then tell your two teammates which line it was. "The agent got this wrong" is the sentence. Nobody's work is on trial; the agent's is.

## Take stock

Four checks ran, a scorer measured them, and the one that won on your own evidence is now a file you can run on the next summary. It found something in a summary nobody planted anything in. Its *Known limit* line says what it still won't see.

<!-- maintainer -->

**Role in Day 2:** beat 6, the trust centre of the day. Produces the groundedness judge every later beat leans on, and the first real catch. *Safe to say it's wrong* sits before (sets the norm the phase 5 share depends on); *Fluent is not true* sits after and names what the trio just caught (stretch, smooth, the made-up quote).

**Reuse:** Agents 101 `hallucination-bakeoff`, keys `hallucination-bakeoff-1` to `-8`, unchanged (`-3`/`-4` runtime fork). New: `apt101-d2-judge-a-real-summary`. The benchmark plants its own fabrications via `hallucination-bakeoff-1`; the beat sheet's trainer-built "two hidden false claims per group" is not used. Paths stay `module-5/` as the prompts write them.

**Frameworks:** benchmarking and precision / recall, felt not lectured (Agents 101 M5); psychological safety (Edmondson, in the lecture before).

**Artefacts:**
- Consumes: `./crux.md` (`## Question`), `module-3/stances/` (grow the tree), `memory/`, `sources/`.
- Produces: `module-5/evidence-roster.md`, `module-5/briefing.md`, `module-5/claim-pool.md`, `module-5/detectors/`, `module-5/adjudicated-claims.md`, `module-5/scoreboard.md`; `judges/groundedness-judge.md` (read by choose the bet, keep and run tonight, Day 3 what good means); `team/<name>/judge-run.md`.

**Room:** solo on each laptop; the phase 5 share is to the other two in the trio, not the room.

**Watch-fors (as Agents 101 M5):** reading the briefing before extraction; scorer hedging "all four are useful" (re-run, force a pick, ensemble cap two); judge file sprawl past 20 lines; generic *Known limit*. Phase 5: the real summary comes back clean. That is a result, not a failure; the judge's limit line says what it could have missed.

**Timing:** 75-minute beat = this exercise 65 + the two lectures around it ~10.

**View summary:** You plant made-up claims in a briefing built from your own evidence, let four checking methods compete to find them, and keep the winner as a judge. Then you run it on a real research summary your team was about to trust.
