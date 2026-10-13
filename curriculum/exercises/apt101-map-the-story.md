# Exercise: Map the *story*

**Time:** 55 minutes.

**Session** *(new, "Day 3 - Learn faster than the market")*

<span class="rt-code">Start a new Claude Code session at your training-directory root.</span><span class="rt-cowork">Start a new Cowork task with your training-directory root as the working folder.</span>

```
/rename apt101-day-3
```

**What you do:**

You chose one bet on Day 2, and each of you made a first piece of it. Now you lay the customer's journey out flat, cut it into slices by what each one teaches you, and build the first slice so it works end to end. Five people who do the job your product serves will use that slice next.

The shape is Jeff Patton's story map. The backbone is the customer's journey, left to right, in their words. The walking skeleton is the thinnest version that still works from the first step to the last. Each slice below it is cut across the whole journey and named for the assumption it tests.

The map lives on your team's Miro board, in the *Story map* frame. Post-its go up first, then Claude works on what the board holds, then the board again. Claude reads and writes the board through the Miro connector; if your company has not turned it on, paste a screenshot of the frame into the chat. The text the agents keep reading goes in `team/story-map.md`.

## Phase 1: Lay the backbone

*15 min*

**Post-its first, five minutes.** Each of you writes the steps a customer goes through for this bet, one per post-it, in the words customers used. The designer arranges them left to right on the frame. Duplicates stack; gaps stay visible.

**Then the designer drives** at their screen. You hold what customers actually said, so the backbone starts from you.

Ask Claude to read the frame and check each step against the customers' own words.

{{prompt:apt101-d3-backbone}}

While the designer drives:

- **The product owner** opens `team/chosen-bet.md` and finds the assumption still riskiest after Day 2. Write it on a post-it at the top of the frame. The slices hang from it.
- **The team lead** reads each step as Claude posts it and asks: did a customer do this, or did we imagine they would? A step the team invented gets a red dot, not the bin.

One pattern to watch: the first backbone often reads like your product's menu, not like the customer's day. If the steps are screens, push back: *"Write the steps as what the customer is trying to get done, in their words."*

## Phase 2: Slice by what you learn

*15 min*

**The product owner drives.** You decide which idea is worth testing, so the cuts are yours to call.

Ask Claude to cut the map into slices, the riskiest assumption first.

{{prompt:apt101-d3-slice-by-learning}}

**Then the board again.** The three of you move post-its between the rows until each slice still runs from the first step to the last. Then choose the first slice and tell Claude.

While you move post-its:

- **The designer** checks every row reaches the last step. A slice that builds one step well and leaves the rest is a car without brakes. Say which step is missing.
- **The team lead** asks of the first slice: what can an agent build in twenty minutes, and what needs one of us? Say it before the slice is chosen.

Push back on a first slice chosen because it is easy to build. The question is which slice teaches you the most if it comes back no. If Claude's rows follow the roadmap instead of the assumption map, ask it to reorder them by risk.

## Phase 3: Build the first slice

*20 min*

**The designer drives the build**, starting from the prototype you made on Day 2. It already holds the customers' words; the slice extends it across the whole backbone.

Ask Claude to build the first slice as a clickable page set.

{{prompt:apt101-d3-build-the-slice}}

While the build runs:

- **The product owner** writes the one thing you will watch for when someone uses the slice: the signal from the story map, said as a moment you could see. Put it in `team/<your-name>/watch-for.md`.
- **The team lead**, once the first version lands, asks Claude on their own laptop to walk the slice as someone who has never seen it.

{{prompt:apt101-d3-walk-the-slice}}

The team lead reads the list to the designer. The designer decides which breaks get fixed now. Fix only what stops the walk. A slice that works end to end and looks rough is ready. A polished slice that stops halfway is not.

## Phase 4: Take stock

*5 min*

Laptops half shut, standing at the board. Each of you says one sentence: what the first slice is built to find out, and what you would see if the answer is no.

If the three sentences name three different things, the slice is testing too much. Point at the row on the frame and agree which one it tests. The other two become the next slices.

<!-- maintainer -->

**Quality:** compendium-audited 2026-10-08 (writing@9d3527f2 story@ba032676 technical@a16b0c55 behavior@ba032676 pedagogy@d49f18bf strategy@2a492ac7 slides@ccbff4e7)
- judges @a16b0c55: writing PASS, story PASS, technical PASS, behavior PASS, pedagogy PASS, strategy PASS, slides PASS

**Role in Day 3:** The day's first build: the chosen bet becomes a story map on the board and one end-to-end slice that five users meet in the next exercise.

**Reuse:** new. No Agents 101 source. Phase rhythm borrowed from `personal-site-with-guardrails` (build, then a cold read): the team lead's walk-through plays the cold critic.

**Frameworks:**
- User story map: backbone, walking skeleton, slices by learning goal (Jeff Patton). Named once in the body; the lecture *Slice by what you learn* names him before the exercise, which does different work (the law), so the pair is credit at point of use plus the law (`check_writing.md` §11 carve-out).
- Hypothesis statement and signal, carried from Day 2's `team/chosen-bet.md`.
- Assumption map (riskiest first), carried from Day 1.

**Board:** *Story map* frame, set up by the trainer (empty backbone row, three empty slice rows). Rhythm: post-its (phase 1), Claude reads and posts back (phases 1–2), the board again (phase 2 regrouping, phase 4 stand-up). Fallback without the Miro connector: a frame screenshot into the chat, and the driver moves Claude's rows onto the board by hand.

**Artefacts:**
- Produces: *Story map* frame (board), `team/story-map.md` (backbone, slices, chosen first slice), `team/slice-1/` (clickable first slice), `team/<product owner>/watch-for.md`.
- Consumes: `team/chosen-bet.md`, `team/tree.md`, `team/bet.md`, `team/product-box.html`, the designer's Day 2 piece in `team/<designer>/`, `memory/`.

**Room:** each phase names one driver at the shared screen; the other two react (`check_workshop.md` §3). Only the driver writes the team root. Protected phase: 3 (the slice must exist for five users). Overrun: phase 4 drops to one sentence from the product owner.

**Failure modes:** phase 1, steps drift into the product's menu instead of the customer's journey (ask for the customer's words and the interview behind each step); phase 2, the first slice picked for ease, not for the riskiest assumption (ask what the slice would teach if it worked); phase 3, polish on one screen while the walk stops halfway (the team lead's walk names the stop; build the stop first); phase 4, one-sentence round answered with features (ask what you'd see if the answer is no).

**Leap test:** on Monday the trio (1) has a story map with a backbone in customers' words; (2) can name the assumption the first slice tests and the signal that says no; (3) has a clickable slice that runs from the first step to the last.

**View summary:** The three of you lay the customer's journey out on the board, cut it by what each slice would teach you, and build the first slice so it works end to end. The artefact is a story map and a rough slice that five people will use next.
