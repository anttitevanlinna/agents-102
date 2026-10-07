# Exercise: Catch it making things *up*

**Time:** 60 minutes. Phase 1 ~10, Phase 2 ~7, Phase 3 ~18, Phase 4 ~10, Phase 5 ~10, close ~5.

**What you do:**

Claude writes a briefing on your outcome from your own evidence, with made-up claims planted in it. You don't hunt for them by hand. Four ways of checking compete to find them, a scorer measures which one caught what, and the winner becomes the check you keep, with a note of what it can't see. Then you run that check on a real research summary your team is about to rely on.

The team lead runs the benchmark on their laptop, in the <span class="rt-code">session</span><span class="rt-cowork">task</span> opened at the start of the day, against their own evidence. Your three memories were curated from the same retrievals, so one benchmark speaks for all three.

## While the benchmark runs: ready your real summary

*Designer and product owner, while phases 1 to 3 run*

Pick the summary you will check in phase 5: the overnight digest, your curator's synthesis note, or a research summary from your team's drive that someone is about to put in front of a priority call. Read it where you know the material best. Then ask Claude to get it ready, and say which claim you would bet is unsupported before any judge exists.

**Prompt** · `apt101-d2-ready-a-real-summary`, writes to `team/<my-name>/real-summary.md` the path of the summary file I name and of each source file it cites or was built from, and writes under `## My bet` the one claim I quote as the one I think is unsupported, in my words, without checking it

Then join the team lead's screen when the scoreboard lands in phase 3.

## Phase 1: Plant the claims

*10 min, team lead*

Ask Claude to pick a bounded set of evidence, write an overreaching briefing in a separate worker, and save both without showing you the briefing.

{{prompt:hallucination-bakeoff-1}}

Aim for roughly one claim in ten made up or stretched. Claude cannot hit that number exactly. It is enough for the checks to have work to do.

**Don't open the briefing.** Your main session stays blind, so it cannot quietly help the checks along.

Ask Claude to turn the briefing into a pool of claims the checks can score.

{{prompt:hallucination-bakeoff-2}}

## Phase 2: Run four checks

*7 min, team lead*

Four checks, four methods, the same claim pool, each in its own <span class="rt-code">subagent</span><span class="rt-cowork">agent</span>, each writing to its own file.

<div class="rt-code">

{{prompt:hallucination-bakeoff-3}}

</div>
<div class="rt-cowork">

{{prompt:hallucination-bakeoff-4}}

</div>

Don't read the four files as they land. The scorer reads them.

## Phase 3: Let the scorer decide

*18 min, the three of you at the team lead's screen*

A fifth agent checks every claim against the evidence and measures each method: of what it flagged, how much was really made up, and of what was made up, how much it caught.

Before it runs, the team lead reads the four methods aloud from the phase 2 files. Each of you writes on a post-it which one will catch the most, and why, in one line. Face down until the scoreboard lands.

{{prompt:hallucination-bakeoff-5}}

Turn the post-its over. Whoever called it says what they saw that the others didn't; whoever missed says what they trusted instead.

Ask Claude to explain the two columns using your own rows.

{{prompt:hallucination-bakeoff-6}}

Then ask Claude to set what you just did beside the usual way of checking a research summary. Each of you answers its question about what surprised you, one sentence each, and the team lead types all three.

{{prompt:hallucination-bakeoff-7}}

Push back on a surprise that could belong to anyone: "the scoreboard was interesting". Point at the row, the number, and what it means for the next summary that reaches a priority call.

## Phase 4: Keep the winner

*10 min, team lead drives*

Ask Claude to save the winning method as a short judge you can run on any summary.

{{prompt:hallucination-bakeoff-8}}

Open `judges/groundedness-judge.md`. Under twenty lines, named for what it does, with a *Known limit:* line at the bottom. Push back if the limit says something like "quality is hard". It should describe one kind of claim this judge will let through.

When the judge is right, the team lead copies `judges/groundedness-judge.md` and `module-5/` to `team/<team lead's name>/`. The other two ask Claude to copy both into their own training folder, at the same paths.

## Phase 5: Run it on something real

*10 min, each on your own laptop*

The briefing was built to be caught. Your real summary was not. Team lead, pick yours now: your curator's synthesis note is ready to hand.

Ask Claude to run the judge on it against the sources it claims to draw on.

**Prompt** · `apt101-d2-judge-a-real-summary`, runs `judges/groundedness-judge.md` on my real summary against its sources (from `team/<my-name>/real-summary.md` if I readied one, else the summary file I name and the files it cites or was built from); lists each flagged claim with the sentence from the source that supports it or "not found"; sets the result beside the claim under `## My bet`, if there is one; saves to `team/<my-name>/judge-run.md`; ends with the one flagged claim most likely to have reached a decision unchecked

Then tell your two teammates which line it was, and whether the judge caught the claim you bet on. "The agent got this wrong" is the sentence.

## Take stock

Four checks ran, a scorer measured them, and the one that won on your own evidence is now a file you can run on the next summary. It found something in a summary nobody planted anything in, and two of you know whether it caught the claim you would have bet on. Its *Known limit* line says what it still won't see.

<!-- maintainer -->

**Role in Day 2:** beat 6, the trust centre of the day. Produces the groundedness judge every later beat leans on, and the first real catch. *Safe to say it's wrong* and *Fluent is not true* sit after: the first names the norm the phase 5 share just used ("the agent got this wrong", said about a real summary), the second names what the trio caught (stretch, smooth, the made-up quote).

**Reuse:** Agents 101 `hallucination-bakeoff`, keys `hallucination-bakeoff-1` to `-8`, unchanged (`-3`/`-4` runtime fork). New: `apt101-d2-ready-a-real-summary`, `apt101-d2-judge-a-real-summary`. The benchmark plants its own fabrications via `hallucination-bakeoff-1`; the beat sheet's trainer-built "two hidden false claims per group" is not used. Paths stay `module-5/` as the prompts write them.

**Frameworks:** benchmarking and precision / recall, felt not lectured (Agents 101 M5); psychological safety (Edmondson, in the lecture before).

**Artefacts:**
- Consumes: `./crux.md` (`## Question`), `module-3/stances/` (grow the tree), `memory/`, `sources/`.
- Produces (team lead's laptop, then copied to every folder at the end of phase 4 via `team/<team lead>/`): `module-5/evidence-roster.md`, `module-5/briefing.md`, `module-5/claim-pool.md`, `module-5/detectors/`, `module-5/adjudicated-claims.md`, `module-5/scoreboard.md`; `judges/groundedness-judge.md` (read by choose the bet, keep and run tonight, Day 3 what good means); `team/<name>/real-summary.md` (designer and product owner, during phases 1–2); `team/<name>/judge-run.md`.

**Room:** one benchmark per trio, on the team lead's laptop. During phases 1–2 the other two ready their real summary and write down the claim they bet is unsupported (their own prediction, checked by the judge in phase 5); phases 3–4 are the trio at one screen, each giving their own surprise line; phase 5 each on their own laptop. The phase 5 share is to the other two in the trio, not the room. Every seat has a move throughout; three identical benchmarks would leave about 30 minutes with nobody able to watch anyone.

**Watch-fors (as Agents 101 M5):** reading the briefing before extraction; scorer hedging "all four are useful" (re-run, force a pick, ensemble cap two); judge file sprawl past 20 lines; generic *Known limit*. Phase 5: the real summary comes back clean. That is a result, not a failure; the judge's limit line says what it could have missed.

**Timing:** 70-minute beat = this exercise 60 + the two lectures after it ~10. Phase 5 runs 10 because two summaries and their sources were readied during phases 1–2.

**View summary:** One of you plants made-up claims in a briefing built from your evidence, four checking methods compete to find them, and the trio keeps the winner as a judge. The other two ready a real research summary meanwhile. Then each of you runs the judge on a summary your team was about to trust.
