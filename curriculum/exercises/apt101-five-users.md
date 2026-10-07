# Exercise: Put it in front of five *users*

**Time:** 50 minutes.

**What you do:**

The first slice works end to end. Now people who did not build it use it. Five short sessions, each with someone from outside the trios who resembles the people your product serves: they do the job it is for, or one close to it. You watch what they do, not what they say about it.

Then you put three things side by side: the bet you chose with the signal you agreed before anyone built, your Day 1 digests, and what the five people did. And the three of you decide what happens to the bet.

What the users did goes on the *Five users* frame of your team's Miro board, one column per user. Claude reads the board through the Miro connector; if your company has not turned it on, paste a screenshot of the frame into the chat.

## Phase 1: Write the test script

*10 min*

**The designer drives.** You know how to ask a customer something without telling them the answer.

Ask Claude to write a test script for the first slice.

{{prompt:apt101-d3-test-script}}

While the designer drives:

- **The product owner** reads the tasks against `team/<your-name>/watch-for.md`. Will the tasks give a user the chance to show the signal? If not, say which task to change.
- **The team lead** walks the three tasks against the clock. Four minutes per session: if the tasks do not fit, say which one to cut.

Push back on any task that reads like a question about your product. *"Find out what this costs for your team"* is a task. *"Do you like the pricing page?"* is an opinion poll.

## Phase 2: Run five sessions

*25 min*

Laptops open on the slice only. No Claude in the room for this phase.

- **The designer** sits beside the user, shows the box front, reads the opening line and the tasks, and stays quiet. If they ask what to do, answer *"what would you try?"*
- **The product owner** writes moments, not verdicts, one per post-it in that user's column: where they hesitated, what they tried instead, what they said they would use it for.
- **The team lead** keeps the four minutes and brings the next person.

One pattern to watch: after the second session, someone wants to explain the slice to the next user before they start. Don't. The confusion is the finding.

When the fifth user leaves, the three of you stand at the wall for two minutes. Put a dot on every moment you saw in more than one column.

## Phase 3: Read it against the bet

*10 min*

**The product owner drives** at their screen.

Ask Claude to read the wall and lay the bet, the digest and the five users side by side.

{{prompt:apt101-d3-read-the-sessions}}

While the product owner drives, the designer and the team lead each pick the one moment they would not have predicted from the digest. Say it when Claude finishes.

Push back if Claude reads a signal into the moments that the bet did not name. Read the result against the signal you agreed before building, not against what would feel better now.

## Phase 4: Decide

*5 min*

Before the laptops shut, each of you reads your own Day 1 hypothesis where Claude quoted it, and says out loud the line in it the five users touched, and whether it held or broke. If none of your lines broke, say what result would have broken it. Your own line, not someone else's.

Laptops shut, back at the wall. Persevere, pivot or stop: the three of you decide, and write the call on a post-it at the top of the frame. Then the product owner opens the laptop and tells Claude the call and the three lines. Claude records them as you said them.

<!-- maintainer -->

**Quality:** compendium-audited 2026-10-07 (technical@1faabaa8 behavior@3d7fd713 pedagogy@761a20a3)
- judges @1faabaa8: technical PASS, behavior PASS, pedagogy PASS (2 findings see instances/agentic-product-teams-101--exercise--apt101-five-users.pedagogy.json)

**Role in Day 3:** The chosen bet meets people who did not build it; each person's Day 1 digest, which found what its look-for line asked for, is read against what they did; the trio makes the persevere / pivot / stop call.

**Reuse:** new. No Agents 101 source.

**Frameworks:**
- Test with five users (Nielsen). Not named in the body: the lecture *Your bet meets five users* comes after and names him, so naming here would pre-state the law before the room has run it (recognition before naming, `curriculum/story-craft.md`).
- Persevere / pivot / stop (Ries), likewise named only in the lecture after.
- Hypothesis statement and signal from Day 2's `team/chosen-bet.md`.
- Each person's own Day 1 hypothesis (`team/bet.md`, under its author's name): phase 4 has each author name the line the users touched and say whether it held or broke, or name the result that would have broken it (build plan § Hidden spine, thread 2). It is a decision, not a scripted confession: five sessions may confirm a line. The prompt quotes the hypotheses unmarked so the author finds the line.

**Artefacts:**
- Produces: *Five users* frame (board: one column per user, the call on top), `team/five-users.md` (script, the moments copied from the wall, decision verbatim, each author's touched line and whether it held or broke, what the team now believes).
- Consumes: `team/bet.md` (each person's Day 1 hypothesis), `team/story-map.md`, `team/slice-1/`, `team/chosen-bet.md`, `team/<product owner>/watch-for.md` (from map the story), `team/<name>/digest-day1.html` (Day 2's read the digest), `team/product-box.html` (the box front opens each session: Day 1 *Paint the product box* promised that five people from outside the team look at it on Day 3).

**Board:** *Five users* frame, five empty columns, set up by the trainer. Rhythm: post-its during the sessions, Claude reads the wall and copies it to file (phase 3), the wall again for the call (phase 4). The moments are copied into `team/five-users.md` because Day 3's `apt101-d3-team-monday` reads them. Fallback without the Miro connector: a frame screenshot into the chat.

**Room:** the five users are five people from outside the trios who resemble the product's users (do its job, or one close to it), booked by the trainer before the day for each team (Day 2 *Bring to Day 3*). Colleagues from an unrelated function are not stand-ins: a dispatcher product tested on salespeople reads the wrong behaviour (trial r1). Where no such people can be booked, the trio says so in the decision. Fewer than five arrive: the trio runs what it has and says so in the decision. Protected: phase 4, the human decision (`check_workshop.md` §11). Overrun: phase 2 drops to four sessions.

**Leap test (next working day, own product):** (1) books one user who does the product's job and writes three tasks as goals, no button named; (2) watches a first use without explaining and writes what the user did as moments, not verdicts; (3) names the line of their own hypothesis a user touched, says held or broke, then calls persevere, pivot or stop against the signal agreed before building.

**Failure modes:** phase 1, tasks that name a button or ask for an opinion (push back; the product owner checks against watch-for.md); phase 2, the designer explains the slice after the second user (the confusion is the finding; hold the next user cold) and moments written as verdicts such as "liked it" (ask what the user did); phase 3, Claude reads a signal the bet did not name (ask which line of chosen-bet.md names it); phase 4, the call made without naming a line (ask what result would have broken it).

**View summary:** People who resemble your users see your box and use your first slice while you watch, and you read what they did against the bet you chose and your Day 1 digest. The artefact is the team's persevere, pivot or stop call, in its own words.
