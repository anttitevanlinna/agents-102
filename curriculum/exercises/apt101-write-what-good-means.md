# Exercise: Write what *good* means

**Time:** 45 minutes. Phase 1 the team's lines ~10 min, Phase 2 the judge once and the loop ~25 min, Phase 3 what it missed ~10 min.

**What you do:**

On Day 2 the check you kept caught claims nobody had made. It lives at `judges/groundedness-judge.md`. That check is the floor: every claim traces to your sources. Here it stays fixed. It does not move while the digest is rewritten against it.

What it cannot see is the ceiling: whether a summary is worth bringing to a priority call. That standard lives in the three of you. Written down, it becomes something the agents can aim at, and something you can hold a passing digest against.

Each of you runs the loop on your own laptop. The lines you agree on go in the team folder.

## Phase 1: Write the team's lines

*10 min*

**The product owner drives** at their screen. Each of you brings one line that a summary must meet before you would take it into a priority call:

- **The designer:** a line about the customer's own words. A quote is a quote, not a paraphrase.
- **The product owner:** a line about the decision. What would a summary have to name for the next call to be obvious?
- **The team lead:** a line about what the team would act on without checking first.

Ask Claude to record the lines as you say them, then hold the digest against them.

**Prompt** · `apt101-d3-what-good-means`, record each person's line verbatim with their name in `team/what-good-means.md`, split into floor (already in `judges/groundedness-judge.md`) and ceiling (not in it); then read `module-2/morning-agent/latest.html` against the ceiling lines and show us in chat where the digest falls short of each one; do not touch the judge

Push back if Claude rewrites your line into something smoother. The line is yours as you said it.

## Phase 2: Run the judge once, then the loop

*25 min*

Back to your own laptop. First one run by hand, so you see what the fixed judge does on fresh work.

Ask Claude to generate one briefing and score it with your judge. Claude calls it a briefing; it is your digest, written fresh on the outcome you picked on Day 2 in `./crux.md`.

{{prompt:eval-loop-1}}

Then ask Claude to run the loop. Generation and judging happen in separate subagents, isolated Claude sessions with fresh context each, so neither grades its own work. The main session rewrites `./generation-tactic.md` between rounds. The judge never moves.

{{prompt:eval-loop-2}}

Now step away from the screen. While the loop runs, the three of you compare what the calibration run caught on each laptop. Same judge, three memories: where did it flag the same kind of claim?

## Phase 3: See what it missed

*10 min*

Ask Claude to show the loop result and the final generation tactic.

{{prompt:eval-loop-5}}

Push back where the answer is too neat. If the score dropped and the digest still reads thin, the judge passed work you would have sent back. If the judge file moved, the loop did not hold: the starting and ending SHA in `module-6/eval-notes.md` are the proof.

Then put your own calls next to the judge's.

**Prompt** · `apt101-d3-what-it-missed`, read the last round's briefing and judgment in `module-6/runs/` and the ceiling lines in `team/what-good-means.md`; show me five claims the judge passed, one at a time, and ask whether I would send each back; then list where my call and the judge's verdict differ, append them to `module-6/eval-notes.md`, and add the one ceiling line the team lacked to `team/<my-name>/what-it-missed.md`

Each of you says your missing line out loud. If two of you found the same one, it goes into `team/what-good-means.md`. The judge stays as it is. A yardstick you rewrite mid-run is not a yardstick.

<!-- maintainer -->

**Role in Day 3:** The digest from Day 1 gets caught by the team's own standard: the fixed judge holds the floor, the team's written lines are the ceiling, and the gap between them is what the criteria missed.

**Reuse:** `eval-loop` keys `eval-loop-1`, `eval-loop-2`, `eval-loop-5`, unchanged. The briefing is framed as the digest regenerated against `./crux.md` (Day 2's outcome). Bonus prompts `eval-loop-3/4` dropped for time. New: `apt101-d3-what-good-means`, `apt101-d3-what-it-missed`.

**Frameworks:**
- LLM-as-judge with a fixed yardstick; the generator learns to pass it (Agents 101 M6).
- Floor and ceiling criteria (lecture *What good means is yours to write*, before this exercise).
- Checking the check against your own calls (the lecture's *A pass is a claim* slide; Husain named there, not here).
- Goodhart via Strathern stays in the lecture; the closing line of Phase 3 is its in-room instance.

**Artefacts:**
- Produces: `team/what-good-means.md`, `./generation-tactic.md`, `module-6/fresh-briefing.md`, `module-6/runs/round-N/`, `module-6/eval-notes.md` (with the disagreements appended), `team/<name>/what-it-missed.md`.
- Consumes: `judges/groundedness-judge.md` (Day 2, never edited), `./crux.md` (Day 2), `memory/` (Day 1), `module-2/morning-agent/latest.html` (the digest; Day 2's run-tonight exercise owns where it lands).

**Design note:** the judge is not rewritten with the team's lines. The reused keys fix it, and the lesson is the fixed yardstick. The team's ceiling lines are what a person holds the passing digest against; they go into the judge only in a later run, outside this loop.

**View summary:** You write down what a summary has to be before it reaches a priority call, let a fixed judge tighten the digest round by round, and then put your own calls beside the judge's. The artefact is the team's written standard and the line the judge could not see.
