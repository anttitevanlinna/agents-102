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

Ask Claude to record the lines as you say them.

**Prompt** · `apt101-d3-what-good-means`, record each person's line verbatim with their name in `team/what-good-means.md`, split into floor (already in `judges/groundedness-judge.md`) and ceiling (not in it); do not touch the judge

Then hold your Day 1 digests against those lines.

**Prompt** · `apt101-d3-caught`, read each of our Day 1 digests in `team/<name>/digest-day1.html` against the ceiling lines in `team/what-good-means.md`; under each ceiling line in `team/caught.md`, quote the digest lines that fall short of it, with whose digest each came from; show me the file before saving

Push back if Claude rewrites your line into something smoother. The line is yours as you said it.

## Phase 2: Run the judge once, then the loop

*25 min*

Back to your own laptop. First one run by hand, so you see what the fixed judge does on fresh work.

Ask Claude to write a fresh digest on the outcome you picked on Day 2 in `./crux.md`, and score it with your judge.

{{prompt:eval-loop-1}}

Then ask Claude to run the loop. Generation and judging run separately, so neither grades its own work. The main session rewrites `./generation-tactic.md` between rounds. The judge never moves.

{{prompt:eval-loop-2}}

While the loop runs, each of you writes one post-it: the ceiling line in `team/what-good-means.md` you predict the looped digest will fail.

## Phase 3: See what it missed

*10 min*

Ask Claude to show the loop result and the final generation tactic.

{{prompt:eval-loop-5}}

Push back where the answer is too neat. If the score dropped and the digest still reads thin, the judge passed work you would have sent back. If the judge file moved, the loop did not hold: `module-6/eval-notes.md` records whether it changed.

Then put your own calls next to the judge's.

**Prompt** · `apt101-d3-what-it-missed`, read the last round's briefing and judgment in `module-6/runs/`, the ceiling lines in `team/what-good-means.md`, what they caught in `team/caught.md`, and the line I marked as trusting least in `team/<my-name>/doubts.md` with my reason; put that line and my reason first; then show me five claims the judge passed, one at a time, beside it, and ask whether I would send each back; then list where my call and the judge's verdict differ, append them to `module-6/eval-notes.md`, and add the one ceiling line the team lacked to `team/<my-name>/what-it-missed.md`

Hold your post-it against what you found. Each of you says your missing line out loud. If two of you found the same one, it goes into `team/what-good-means.md`. The judge stays as it is. A yardstick you rewrite mid-run is not a yardstick.

<!-- maintainer -->

**Role in Day 3:** The digest from Day 1 gets caught by the team's own standard: the fixed judge holds the floor, the team's written lines are the ceiling, and the gap between them is what the criteria missed.

**Reuse:** `eval-loop` keys `eval-loop-1`, `eval-loop-2`, `eval-loop-5`, unchanged. The briefing is framed as the digest regenerated against `./crux.md` (Day 2's outcome). Bonus prompts `eval-loop-3/4` dropped for time. New: `apt101-d3-what-good-means`, `apt101-d3-caught`, `apt101-d3-what-it-missed`.

**Frameworks:**
- LLM-as-judge with a fixed yardstick; the generator learns to pass it (Agents 101 M6).
- Floor and ceiling criteria: the body sets them up; the lecture *What good means is yours to write* names them after this exercise.
- Checking the check against your own calls (Phase 3 produces it; the lecture's *A pass is a claim* slide names it after, Husain there, not here).
- Goodhart via Strathern stays in the lecture; the closing line of Phase 3 is its in-room instance.

**Artefacts:**
- Produces: `team/what-good-means.md`, `team/caught.md` (what the ceiling lines caught in the Day 1 digests, read by `apt101-d3-what-it-missed`), `./generation-tactic.md`, `module-6/fresh-briefing.md`, `module-6/runs/round-N/`, `module-6/eval-notes.md` (with the disagreements appended), `team/<name>/what-it-missed.md`.
- Consumes: `judges/groundedness-judge.md` (Day 2, never edited), `team/<name>/doubts.md` (Day 2 read the digest: the line each person trusted least, set beside the judge's passes in `apt101-d3-what-it-missed`), `./crux.md` (Day 2), `memory/` (Day 1), `team/<name>/digest-day1.html` (each person's Day 1 digest, saved in Day 2's read the digest before any rerun).

**Design note:** the judge is not rewritten with the team's lines. The reused keys fix it, and the lesson is the fixed yardstick. The team's ceiling lines are what a person holds the passing digest against; they go into the judge only in a later run, outside this loop.

**View summary:** You write down what a summary has to be before it reaches a priority call, let a fixed judge tighten the digest round by round, and then put your own calls beside the judge's. The artefact is the team's written standard and the line the judge could not see.
