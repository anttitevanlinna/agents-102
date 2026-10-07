# Exercise: Imagine it *failed*

**Time:** 20 minutes.

**What you do:**

It is a year from now. The bet you chose today failed. Each of you writes why, alone and in silence, on the pre-mortem frame of your team board. Then quick rounds of ranking. Then Claude adds the causes the three of you did not write, and you rank once more.

## Phase 1: Write why it failed

*5 min*

No talking, no Claude. Each of you, in your own sticky colour, one reason per sticky, in the past tense: "Admins never found the import button." "The team stopped reading the digest in week three."

Write the reasons you would normally keep to yourself. The one about the team, the one about your own piece, the one about the agents. A reason nobody else writes is worth more than one all three of you write.

## Phase 2: Rank in rounds

*7 min*

Go round one sticky at a time, each of you reading one of yours to the other two, until the stickies are all up. No arguing yet; questions only to understand.

Then rank. Each of you puts three dots on the causes you think most likely. A second quick round: one dot each on the cause that would hurt most if it happened. The trainer keeps time.

## Phase 3: Add the causes you missed

*5 min*

The team lead drives at the shared screen. Ask Claude to read the board and add what the three of you did not see.

{{prompt:apt101-d2-the-failure-we-missed}}

Push back on a cause that is a rewording of one already on the board. You want the one nobody in the trio was in a position to see.

## Phase 4: Rank once more

*3 min*

One dot each on the board for the cause you now think most likely, Claude's included. That top cause is what you talk about with laptops shut.

<!-- maintainer -->

**Role in Day 2:** beat 9. A pre-mortem on the chosen bet and its three pieces, at the moment confidence peaks. Feeds beat 10, *Laptops shut* (a module section), which talks the top cause through. The lecture *Imagine it already failed*, right after this exercise, names Klein's method and why it fits peak confidence, once the trio has done it.

**Reuse:** shape only, from Agents 101 `share-your-work-6` (failure stories: social, technical, "the failure I'm not seeing", each with a week-two warning sign). Here the humans write the causes first and Claude adds only the third leg. New prompt: `apt101-d2-the-failure-we-missed`.

**Frameworks:** pre-mortem (Gary Klein): past tense, alone, in silence, then round-robin. Not named in body; the slide after names it.

**Artefacts:**
- Consumes: `team/chosen-bet.md`; the three pieces in `team/<name>/` (make your piece); the pre-mortem frame on the team's Miro board (trainer-built; it replaces the beat sheet's voting page, and the dot rounds are its ranking).
- Produces: ranked stickies on the board; `team/premortem.md` (team lead drives; authors kept, Claude's additions marked). Read by keep and run tonight and Day 3 five users.

**Room:** phase 1 solo in silence; phases 2 and 4 the trio on the board, trainer times the rounds; phase 3 team lead drives. Ranking is input to the talk in beat 10, not a decision; nothing is decided by the dots (workshop §11). Overrun: drop to one ranking round (beat sheet).

**Failure modes:** reasons written in the future conditional ("might not adopt") lose the past-tense effect, push back to "did not"; Claude's additions restate board stickies (push back).

**View summary:** You imagine the chosen bet failed a year from now, write why alone, rank the causes together on the team board, and let Claude add the ones none of you were placed to see.
