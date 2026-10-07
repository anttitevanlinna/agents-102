# Exercise: Put it in front of five *users*

**Time:** 50 minutes.

**What you do:**

The first slice works end to end. Now people who did not build it use it. Five short sessions, each with someone from another team in the room, each one a stand-in for your customer. You watch what they do, not what they say about it.

Then you put three things side by side: the bet you chose with the signal you agreed before anyone built, your Day 1 digests, and what the five people did. And the three of you decide what happens to the bet.

What the users did goes on the *Five users* frame of your team's Miro board, one column per user. Claude reads the board through the Miro connector; if your company has not turned it on, paste a screenshot of the frame into the chat.

## Phase 1: Write the test script

*10 min*

**The designer drives.** You know how to ask a customer something without telling them the answer.

Ask Claude to write a test script for the first slice.

**Prompt** · `apt101-d3-test-script`, read `team/story-map.md` (the first slice and its signal), `team/chosen-bet.md` and `team/slice-1/`; write a script of three tasks a customer would bring to this slice, phrased as goals, never naming a button or a screen; one opening line, no leading questions; a short list of moments worth noting; write `team/five-users.md`

While the designer drives:

- **The product owner** reads the tasks against `team/<your-name>/watch-for.md`. Will the tasks give a user the chance to show the signal? If not, say which task to change.
- **The team lead** walks the three tasks against the clock. Four minutes per session: if the tasks do not fit, say which one to cut.

Push back on any task that reads like a question about your product. *"Find out what this costs for your team"* is a task. *"Do you like the pricing page?"* is an opinion poll.

## Phase 2: Run five sessions

*25 min*

Laptops open on the slice only. No Claude in the room for this phase.

- **The designer** sits beside the user, reads the opening line and the tasks, and stays quiet. If they ask what to do, answer *"what would you try?"*
- **The product owner** writes moments, not verdicts, one per post-it in that user's column: where they hesitated, what they tried instead, what they said they would use it for.
- **The team lead** keeps the four minutes and brings the next person.

One pattern to watch: after the second session, someone wants to explain the slice to the next user before they start. Don't. The confusion is the finding.

When the fifth user leaves, the three of you stand at the wall for two minutes. Put a dot on every moment you saw in more than one column.

## Phase 3: Read it against the bet

*10 min*

**The product owner drives** at their screen.

Ask Claude to read the wall and lay the bet, the digest and the five users side by side.

**Prompt** · `apt101-d3-read-the-sessions`, read the *Five users* frame on our Miro board, `team/chosen-bet.md` (the hypothesis and its signal), our Day 1 digests in `team/<name>/digest-day1.html` and `team/five-users.md`; copy every moment from the wall into `team/five-users.md` under its user; for each moment, say whether the digest said it, could have said it, or could not have; then read the moments against the agreed signal and lay out what persevere, pivot and stop would each mean for the next slice; do not choose; when we come back with our call, record it in `team/five-users.md` exactly as we say it, with who said what, and the one sentence we now believe instead

While the product owner drives, the designer and the team lead each pick the one moment they would not have predicted from the digest. Say it when Claude finishes.

Push back if Claude reads a signal into the moments that the bet did not name. Read the result against the signal you agreed before building, not against what would feel better now.

## Phase 4: Decide

*5 min*

Laptops shut, back at the wall. Persevere, pivot or stop: the three of you decide, and write the call on a post-it at the top of the frame. Then the product owner opens the laptop and tells Claude the call. Claude records it as you said it.

<!-- maintainer -->

**Role in Day 3:** The chosen bet meets people who did not build it; the Day 1 digest that agreed with the team is read against what they did; the trio makes the persevere / pivot / stop call.

**Reuse:** new. No Agents 101 source.

**Frameworks:**
- Test with five users (Nielsen). Not named in the body: the lecture *Your bet meets five users* comes after and names him, so naming here would pre-state the law before the room has run it (recognition before naming, `curriculum/story-craft.md`).
- Persevere / pivot / stop (Ries), likewise named only in the lecture after.
- Hypothesis statement and signal from Day 2's `team/chosen-bet.md`.

**Artefacts:**
- Produces: *Five users* frame (board: one column per user, the call on top), `team/five-users.md` (script, the moments copied from the wall, decision verbatim, what the team now believes).
- Consumes: `team/story-map.md`, `team/slice-1/`, `team/chosen-bet.md`, `team/<product owner>/watch-for.md` (from map the story), `team/<name>/digest-day1.html` (Day 2's read the digest), `team/product-box.html` (via the slice).

**Board:** *Five users* frame, five empty columns, set up by the trainer. Rhythm: post-its during the sessions, Claude reads the wall and copies it to file (phase 3), the wall again for the call (phase 4). The moments are copied into `team/five-users.md` because Day 3's `apt101-d3-team-monday` reads them. Fallback without the Miro connector: a frame screenshot into the chat.

**Room:** the five users are five people from outside the trios, booked by the trainer before the day for each team (Day 2 *Bring to Day 3*). Fewer than five arrive: the trio runs what it has and says so in the decision. Protected: phase 4, the human decision (`check_workshop.md` §11). Overrun: phase 2 drops to four sessions.

**View summary:** People from other teams use your first slice while you watch, and you read what they did against the bet you chose and the Day 1 digest that agreed with you. The artefact is the team's persevere, pivot or stop call, in its own words.
