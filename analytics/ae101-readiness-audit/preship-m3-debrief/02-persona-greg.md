# Persona sim — Greg, Staff Engineer (skeptical)

I run platform at a mid-size fintech. I've sat through enough "agentic" workshops to know the smell. Here's how M3 lands when I read it the way I actually read training material — fast, scanning for the moment the author gets cute.

Focus is the Debrief. I walked the whole module to get there in the right mood.

---

## Connections — mood 7/10

Why: short, concrete, not preachy. The size rule is real ("not a typo-fix, not a quarter-long epic") and respects that I have judgement about my own work.

What I'd argue with:

> "You've watched Claude work for two modules. Pick the size that fits the rhythm you've seen."

That's a nice line. Trust-the-reader move. I don't hate it.

> "The room's features will differ wildly; that's the point."

Slight throat-clear. The point doesn't need announcing — if features differ, I'll notice.

Net: I'm in. I picked a feature in 90 seconds. Good opening.

---

## Lectures — mood 6/10

I didn't read the lecture file in detail (out of scope), but the link is there and the framing in Big Idea is honest about the move: two curated skills do security, one authored skill does quality. Fine. The phrase "a gift from the frontier" in Key Concepts is the kind of thing I'd roll my eyes at if it appeared in lecture body. Hopefully it stays in the module-page emergent list where it can read as shorthand and not as Tony Robbins.

What I'd argue with from the module page itself:

> "A curated skill is a gift from the frontier; you invoke it, you don't re-derive it"

"Gift from the frontier" — pick one: gift, or frontier. Both is sales copy. Drop one and the line lands.

---

## Exercises — mood 7/10

I didn't open all three exercise files, but the LO list tells me what's being asked: invoke, decide, write an ADR, author a skill, ask the skill to disclose its weakest part, push back, re-invoke, ship personal-first.

That's a real arc. Six modules of training I've sat through don't get to "ship something personal-first that you'd actually use Monday." This does. Mood up.

What I'd argue with:

> "Discriminate when a job belongs in a subagent (breadth-first curated skills, long structured output) versus the main thread (one-question-at-a-time authoring, interactive steering)"

LO #3 is doing real work. Keep it. But "discriminate" as a verb in an LO line reads Bloom-taxonomy-flavoured. I'd just say "Decide."

> "Ask the agent what's weakest about its own output; the mirror reflects what your own read would miss"

The "mirror reflects" bit is the second time the file reaches for a metaphor when the plain version is fine. "The agent's self-critique catches what you wouldn't" lands harder.

Net: the arc is good. The prose around it occasionally puts on a hat.

---

## Debrief — mood 8/10 (focus area)

This is where I expected to bail. Most training Debriefs are Q1/Q2/Q3 retro theatre — "what went well, what would you change, how did this feel" — and I've fled rooms over less. This one isn't that. It's a single prompt that tells Claude to read the actual session artifacts (skill outputs, the ADR I wrote, the authored skill, the invocation output, scrollback for push-backs), do two specific things (integrate one named pattern into `./CLAUDE.local.md`, sharpen the authored skill in place), and report back in 3–5 lines.

That's a real Debrief. It treats the agent as the thing that read what I did and reports on it, not as a stage-manager asking me how I feel.

Specific things I noticed:

**Bulletified input list.** Reads fast. I can scan five bullets and know what Claude is being asked to consume. A paragraph version would have lost me by the third comma.

**`./CLAUDE.local.md` everywhere, with the `.gitignore` step inline.** Fine. This is the non-negotiable detail — I do not want session-level rules sneaking into the team `CLAUDE.md` and then onto a PR I have to defend in review. Calling out "personal file, not team `./CLAUDE.md`" inside the prompt is the kind of small precision that signals the author has actually thought about social dynamics in a real engineering team. That earns trust.

**The "name the branch, not the rule" example.**

> "Not 'always run STRIDE' (generic). Something like 'features touching the billing webhook need access-control mapping before STRIDE; the event-replay path is invisible from a first read.'"

This is the line that flipped my mood from 6 to 8. A worked example of what counts vs. what doesn't, written in the actual register of a real codebase. "Event-replay path is invisible from a first read" is something an engineer would say. Not "leverage event-driven architectures." This earns the Debrief.

**"Integrate, don't append."** Three words. Doing real work. Tells Claude not to bolt the new pattern onto the bottom of `CLAUDE.local.md` like a changelog.

**The relocated team-worthy flag.** This is the thing I was specifically asked to attack. Here's the line as it now reads in the closing reporting requirement:

> "Tell me in 3–5 lines: the pattern you named in `./CLAUDE.local.md` and whether it's team-worthy (one every engineer on this codebase would benefit from), what you sharpened in the skill, and which moment in the session made you pick those over others."

Read as a structured deliberation step? **Yes — barely.** "One every engineer on this codebase would benefit from" is the right test, in plain language, and it's wired into the report shape so it actually fires. The student gets a one-line judgement back ("team-worthy: yes / no") that they then have to act on (open a PR or don't). That's a decision the report forces.

Read as pedagogy theatre? Almost. The risk is "team-worthy" reading as a checkbox the trainer asks you to tick. The post-prompt prose catches this:

> "Any team-worthy flag is your decision; nothing auto-PR'd."

That sentence saves it. It tells me — the engineer — that I'm the one deciding. Nobody auto-promotes my session note to a team PR. That respects how engineering teams actually work; rules don't get into shared `CLAUDE.md` because Claude said so, they get there because a human walked into a conversation and made the case.

If I were sharpening: I'd cut "(one every engineer on this codebase would benefit from)" to "(would every engineer on this codebase benefit from it?)" — make it a question the report answers, not a parenthetical definition. Tighter.

But the move itself — flag in the report, not in mid-prose — is right. Mid-prose, it reads as a passing aside that no one acts on. In the report, it's something I see at the end and have to look at.

**Post-prompt prose tightening.**

> "12–15 minutes. Push back on the summary; quote the session moment when something's wrong. Two files changed (`./CLAUDE.local.md` + the test-strategy skill); check both. Any team-worthy flag is your decision; nothing auto-PR'd."

Four sentences, each doing a job: budget, push-back instruction, what to verify, autonomy boundary. No "pause for reflection," no "take a moment," no "this is where the magic happens." Adult register. I'd ship this.

What I'd still argue with in the Debrief:

> "Read these inputs:"

I'd kill the colon and just write "Read:" — the bullets follow either way. Tiny.

> "Then do two things:"

Same. "Then:" is enough. The numbered list does the work.

> "I shouldn't have to open the files to know."

I like this line. It's the test. Keep it.

The prompt is ~17 lines inside the fence. That's at the upper edge of what I'd paste without skim-reading. But it's earning the length — every clause does a job. I wouldn't cut.

---

## Bridge — mood 7/10

> "M4 turns the discipline inward: memory that reads your system, not just a feature."

Good. One sentence, names what's coming, names the shift (feature → system). The follow-up about the three blocks is a bit tidy — "the quality criteria you named today become Block 3 of the three-block memory; the access-surface facts become Block 1 observations; the hardening decision is a Block 2 entry already" — reads as the author wanting me to admire the architecture. I get it. I'd cut to one example and let M4 prove the rest.

---

## Close

**End-mood: 8/10.**

**Verdict in one sentence:** I'd recommend this to a senior engineer at my shop, with a note that the Debrief specifically is the part I'd point to as proof the training takes the work seriously.

**Three quoted moments where the training earned or lost me:**

1. **Earned (big):** "Not 'always run STRIDE' (generic). Something like 'features touching the billing webhook need access-control mapping before STRIDE; the event-replay path is invisible from a first read.'" — worked example in the right register. This is the line.
2. **Earned (medium):** "Any team-worthy flag is your decision; nothing auto-PR'd." — respects how teams actually adopt rules.
3. **Lost (small):** "A curated skill is a gift from the frontier; you invoke it, you don't re-derive it" — sales-copy phrasing in a Key Concepts list. Drop "gift" or drop "frontier."

**Specific attack on the relocated team-worthy flag:**

Reads as a structured deliberation step, not as theatre. The flag is wired into the report shape — the student gets a yes/no back and the post-prompt prose explicitly frames the decision as theirs ("Any team-worthy flag is your decision; nothing auto-PR'd"). The supporting sentence is:

> "Tell me in 3–5 lines: the pattern you named in `./CLAUDE.local.md` and whether it's team-worthy (one every engineer on this codebase would benefit from)..."

That's a forcing function, not a reaction-script. The risk is the parenthetical — "(one every engineer on this codebase would benefit from)" — which reads as a definition the trainer is supplying. Convert to a question form ("would every engineer on this codebase benefit from it?") and the deliberation becomes something the report answers, not something the report defines. Small fix.

If the flag had stayed in mid-Job-1 prose, I'd have called it pedagogy theatre — a passing aside that no one acts on. Moved to the report, it's a decision I see at the end and act on. Good move.

**Register check — anything trip the "training company" alarm?**

Two minor flickers, no full alarms:

- "A gift from the frontier" — Key Concepts list, not in the Debrief. Cosmetic.
- "The mirror reflects what your own read would miss" — Key Concepts list again. Same issue. Plain language ("the agent's self-critique catches what you wouldn't") would carry the work.

Inside the Debrief itself: nothing tripped. No "pause to reflect," no "moment of truth," no "step back," no Q1/Q2/Q3 retro. The closing four-sentence prose block is the cleanest piece of facilitator-adjacent writing in the module. If the rest of M3 read like the Debrief's post-prompt prose, this would be 9/10.

---

## Closing note

The Debrief is the strongest beat in the module. The prompt does real work, the post-prompt prose is tight, the team-worthy flag is in the right place, and `./CLAUDE.local.md` precision earns the trust the module's title promises. The cosmetic stuff in Key Concepts ("gift from the frontier," "the mirror reflects") is the only place I'd push back hard on register — and that's outside the Debrief.

8/10. Ship it. Sharpen the parenthetical and the two Key Concepts metaphors when the next pass lands.
