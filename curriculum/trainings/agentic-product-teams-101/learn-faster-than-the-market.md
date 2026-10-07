# Learn faster than the market

## Big Idea

What is each of us for, the product owner, the designer and the team lead, when building gets cheap?

## What you arrive with

The chosen bet, each role's first piece of it, a judge that caught invented claims, and a digest that ran after Day 2 closed.

## What You'll Learn
After this day, you will be able to:
- **Slice** a bet on a story map by what each slice would teach you, and build the first slice end to end
- **Write** what good means for your team's summaries, and check a fixed judge's passes against your own calls
- **Test** a slice with five users and **decide** persevere, pivot or stop on the signal you agreed before building
- **Propose** to your wider team how agents could join its work, with a named person for each part
- **Explain** what each of the three of you is for when building gets cheap

## Start here

Open the digest your agent wrote after Day 2 closed: `module-2/morning-agent/latest.html`, in your browser. Read it against the bet you chose together on Day 2.

Which line in it would you now cut? Each of you says yours out loud, and why.

[Lecture: Slice by what you learn](lectures/apt101-slice-by-learning.md)

[Exercise: Map the story](exercises/apt101-map-the-story.md)

[Exercise: Write what good means](exercises/apt101-write-what-good-means.md)

[Lecture: What good means is yours to write](lectures/apt101-what-good-means.md)

[Exercise: Put it in front of five users](exercises/apt101-five-users.md)

[Lecture: Your bet meets five users](lectures/apt101-bet-meets-five-users.md)

[Lecture: Three jobs, rewritten](lectures/apt101-three-jobs-rewritten.md)

[Exercise: Take it to the team](exercises/apt101-take-it-to-the-team.md)

[Lecture: From the three of you to your team](lectures/apt101-from-us-to-the-team.md)

## Sharpen the proposal

Five minutes. **The team lead drives**; the other two read along. Claude reads everything in `module-7/` and looks for the one file your wider team will actually touch. Here that is the way of working: when Claude names a path, tell it which file holds it. Claude reviews the file, rewrites it in place and reports what changed.

{{prompt:a101-m7-debrief-sharing-artifact}}

Push back where the rewrite is wrong: *"the team's job wasn't vague, you just didn't see it"* or *"you took out the part where a person reads it first, put it back."* If the rewrite changes a line the team will see, ask Claude to carry it into `team/monday.md`.

[Lecture: Where you go from here](lectures/apt101-where-you-go-from-here.md)

## Say it to each other

Before the laptops shut, the team lead reads two files out loud, with no comment after either. First `team/caught.md`: what your own lines caught in the digest that agreed with you. Then `team/monday.md`.

Laptops shut. The question you started Day 1 with, asked of what you just heard: is anything in `team/monday.md` the next thing your team builds that nobody asked for? Who decided it, and what are you sure of?

Then one round, each of you in turn, no discussion until all three have spoken:

- the bet, as you would now say it to your team;
- your first move on Monday;
- one piece of work you would let an agent do on its own, and one you would not.

## Key Concepts
- The first slice tests the assumption you are least sure of, from the first step of the journey to the last.
- A fixed judge holds the floor. The team's written lines are the ceiling. A pass is the judge's claim until your own calls agree with it.
- Five users did things the digest could not have said. The bet is read against the signal agreed before anyone built.
- The product owner picks the bet and its signal, the designer holds what customers said and did, the team lead agrees how agents join the work.
- What goes to your team is a proposal, with a name on every part. They decide.

## Bring to Monday

**Bring `team/monday.md` to your team, and the story map with it.** Each of you has one move in it. The proposal only becomes theirs once they have changed it, and they can only change what they have seen.

## Next

The bet is still open, and the next slice is yours to place. When models analyse wider, deeper and faster, what will your insight be?

<!-- maintainer -->

**STATUS:** built from the build plan (`curriculum/module-design/apt101-build-plan.md` § Day 3), 2026-10-07. `simulation: true` training: pages and prompts land uncarded. Big Idea kept as written (adopted positioning line, strategy 2026-10-05). H1 kept as the registered module title in `site/layouts/curriculum.js` ("Learn faster than the market"); the build plan's day name is "Where your team goes next", and the two are the maintainer's to reconcile.

**Beat order (build plan § Day 3):** 1 what came back (§ Start here, no Claude: the digest opens in a browser, so the day's session opens in the first exercise) · lecture *Slice by what you learn* · 2 map the story · 3 write what good means · lecture *What good means* (after: slides 3–4 name what Phase 3 produces; the lecture file cannot split here, and the exercise body sets up floor and ceiling itself) · 4 five users · lecture *Bet meets five users* (after) · 5 lecture *Three jobs, rewritten* · 6 take it to the team · lecture *From the three of you* (after) · 7 close: § Sharpen the proposal, lecture *Where you go from here*, § Say it to each other.

**Close shape:** Day 1 closes on `CLAUDE.md`, Day 2 on groundedness rules; Day 3 sharpens the sharing artefact (`a101-m7-debrief-sharing-artifact`), so the compound shape differs per day (`check_student_facing.md` §7). The round after it is laptops shut, no prompts, trainer silent (`check_workshop.md` §12). It opens on the spine-1 payoff (`team/caught.md` read aloud, the digest that agreed caught by the team's own lines) and `team/monday.md`, then asks the Day 1 opening question (`our-product-our-system.md` § the last thing your team built that nobody asked for) of Monday's proposal. `## Next` asks the stance question again and does not answer it; the lecture *Where you go from here* asks it first, so `## Next` is two sentences and nothing else.

**Board:** the trainer sets up three frames on each team's Miro board before the day: *Story map* (backbone row plus three slice rows), *Five users* (five columns), *Way of working* (three columns: agents do, people keep, where the old way wins). Criteria, the judge, rules and `team/monday.md` stay in files because agents keep reading them.

**Meta (trainer):**
- **Five users:** the trainer books five people from outside the trios per team before the day (announced in Day 2 *Bring to Day 3*).
- **Transitions:** start 10 @start "Which line would you now cut?" · debrief 5 @end "Sharpen the proposal" · round 12 @end "Say it to each other"
- **Minutes against the beat sheet:** 10 + 55 + 15 break + 45 + 50 + 75 lunch + 15 + 55 + 15 break + 25 = 360. Lectures before or after an exercise sit inside that beat's minutes, as the beat sheet prices them.
- **Primary Bloom's level:** Apply → Evaluate (slice, test, decide), Create at the close (the proposal).
- **Protected:** five users phase 4 (the human call) and take it to the team phase 5 (`team/monday.md`). Overrun: map the story phase 4 shrinks to one sentence; write what good means drops its walk-away comparison; the close round drops the third bullet.

**Artefact contracts**
| Artefact | Stable identifier | Produced by | Consumed by |
|---|---|---|---|
| The fresh digest | `module-2/morning-agent/latest.html` | Day 2 run set at close (Day 2 writer owns the path) | § Start here |
| The Day 1 digests | `team/<name>/digest-day1.html` | Day 2 read the digest (saved before any rerun) | write what good means (`apt101-d3-caught`); five users |
| Caught | `team/caught.md` | write what good means (`apt101-d3-caught`) | write what good means (`apt101-d3-what-it-missed`); § Say it to each other (read aloud) |
| Story map | *Story map* frame, `team/story-map.md` | map the story | five users; take it to the team |
| First slice | `team/slice-1/` | map the story | five users |
| What good means | `team/what-good-means.md`, `team/<name>/what-it-missed.md` | write what good means | later runs of the judge (outside this day) |
| Eval run | `./generation-tactic.md`, `module-6/runs/`, `module-6/eval-notes.md` | write what good means (`eval-loop-1/2/5`) | write what good means (`apt101-d3-what-it-missed` reads `module-6/runs/`) |
| Each Day 1 hypothesis | `team/bet.md` | Day 1 write the bet | five users (`apt101-d3-read-the-sessions`, phase 4) |
| Five users | *Five users* frame, `team/five-users.md` (call, proved-wrong lines, the sentence now believed) | five users | take it to the team (phase 1, `apt101-d3-the-job-your-team-hires`, `apt101-d3-team-monday`) |
| Sharing package | `module-7/*.md` | take it to the team (`apt101-d3-the-job-your-team-hires`, `apt101-d3-bottleneck-and-plans`, `apt101-d3-test-the-switch`) | § Sharpen the proposal |
| Monday | *Way of working* frame, `team/monday.md` | take it to the team (`apt101-d3-team-monday`), sharpened in § Sharpen the proposal | § Say it to each other (read aloud); the wider team, Monday |
