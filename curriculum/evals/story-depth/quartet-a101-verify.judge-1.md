# Agents 101 — story-depth verification (judge 1)

Branch `a101-story`, judged from disk, student order.

## Running notes

### Prework + M1 Getting Going
Files: `trainings/agents-101/prework.md`, `getting-going.md`, `lectures/context-is-king.md`, `exercises/personal-site-with-guardrails.md`, `lectures/what-just-happened.md`, `lectures/module-2-prework.md`.

- Frame candidate stated early: "Context is whatever you tell it." / "every useful thing in this training is built on this one idea" (M1, `lectures/context-is-king.md`).
- Self-doubt about the instrument already in M1: "the LLM tends to be lovely about its own prior output" (M1, `exercises/personal-site-with-guardrails.md`); "Agreeable answers won the round the model was tuned on." (M1, `lectures/what-just-happened.md`).
- Stance against own commercial interest, candidate: "Reading a McKinsey report on the agentic enterprise is not the same category of activity as what you just did." + "Nobody knows where agents are going. Not Anthropic, not your board, not the people running this training." (M1, `lectures/what-just-happened.md`) — the training names itself as not-knowing.
- Narrator present but generic-second-person so far; no incident yet.

### M2 Building Agent Systems
- Frame carries: "This is the same mechanism from Module 1: context shapes output, run at system scale." (M2, `lectures/compounding.md`).
- Frame's edge named: "The agent can only work from what somebody wrote down. Most of what you know about your own company, nobody has." (M2, `lectures/compounding.md`) — where the frame breaks.
- Stance vs commercial interest: "No database. No special tool. No paid tier. No setup." + "the simplest possible setup beats the fancy ones" (M2, `lectures/compounding.md`).
- Stance defended by mechanism: plain text wins because "reading it is reading, and updating it is writing. Nothing sits between the model and what it's best at." (M2, same).
- "The model will change under this. The memory will not." (M2, `building-agent-systems.md`) — positional, argued.

### M3 Multi-Agent Systems
- **Turn candidate (strong):** "Everything you just did is the move this training teaches, run properly. It still handed you something you cannot vouch for." (M3, `exercises/three-minds-one-synthesis.md`). Followed by "Hold the doubt. Name it to yourself. Don't fix it here."
- Module-level echo: "The doubt stays. Hold it." + "Nothing in it reads the briefing and tells you whether it is true." (M3, `multi-agent-systems.md`).
- Stance against commercial interest: "Start with don't. Default to one agent with a good prompt." / "A whole module just showed you multi-agent works. Next Monday, you will be tempted to apply it to everything. Don't." (M3, `lectures/when-to-split-an-agent.md`).
- Self-doubt about the instrument: "Diplomatic is the failure mode at a handoff seam." (M3, `multi-agent-systems.md`).

### M4 Security
- Stance against own commercial interest, explicit: "It costs whoever sells you agents too, this training included: an agent that reaches less is a smaller thing to sell, and it is still the right call." (M4, `lectures/practice-of-risk.md`).
- Frame inversion stated: "Everything you have built so far gave the agent more... Now the move is to give it less." + "More context makes a good answer likelier. Less access makes a bad answer smaller." (M4, `lectures/practice-of-risk.md`) — the frame naming its own limit.
- Stance defended by mechanism: "You get *safe enough, under these conditions, within these limits, for now.*" argued from non-determinism + emergent capability (M4, same).
- Doubt kept open: "The unease stays. Nothing today resolves it. That's the curriculum." (M4, `security.md`).
- Narrator: still second person + "we" ("We did this for a single mitigation", `exercises/audit-your-agent.md`). No narrator incident yet. Failure incidents present but borrowed (Mata v. Avianca, Deloitte), not the narrator's own.

### M5 Grounded Output
- Frame at system scale again: "You have done this before. Three stances, one framework. Four detectors, one scoreboard." (M5, `lectures/grounded.md`).
- Training turns its own method on its own teaching material: "Against the Mata v. Avianca pre-read, source triangulation caught an unsourced 'small firm' descriptor and an unsupported 'ten minutes' estimate... Even a careful teaching case benefits from the check." (M5, `lectures/grounded.md`) — nearest thing to a narrator incident; told passively, no narrator named.
- Stance: "Method selection in agent quality work is empirical, not intuitive." defended by the scoreboard mechanism (M5, `exercises/hallucination-bakeoff.md`).
- Honest about its own numbers: "The arithmetic is an illustration, not a measurement" / "treat it as a working prior, not a measurement" (M5, `lectures/grounded.md`).
- Honest about its own exercise's limits: "Two runs is a demo, not a measurement." and "yours was 30 claims. A real production judge wants hundreds."

### M6 Evaluations
- **Second turn / the training doubting its own instrument:** "The judge has been scoring your work all the way through the loop. Nothing has been scoring the judge." + "the judge and you do not agree as often as the number suggests." (M6, `lectures/when-the-score-stops-moving.md`).
- Self-undermining question: "If the fabrication your judge was built for mostly stops arriving, what is left for it to check?" (M6, same).
- Stance against own product: "Every clean week is real evidence the loop is working, and real erosion of your ability to tell when it stops working." (M6, `lectures/new-human-role-in-the-loop.md`).
- Debrief names the self-grading risk: "This is Claude auditing a tactic it helped sharpen." (M6, `evaluations.md`).

### M7 From Personal to Team
- Frame's hardest break: "Your agent runs on the part of your work you could never have written down." + Polanyi, "we know more than we can tell" (M7, `lectures/access-is-not-absorption.md`).
- Stance against the field: "*Share the whole agent* is a vendor pitch and is NOT on the list." (M7, `exercises/share-your-work.md`), defended in the lecture by mechanism: "Three parts copy, one does not... Accountability is the part with a name on it, and a name does not travel inside a folder."
- "Access is a switch somebody flips, and it completes in a minute. Absorption happens in other people's weeks."

### M8 Agents Building Agents
- Stance against own commercial interest: "We could have spent today building you one impressive agent to show on Friday. It would have demoed well and it would have been the wrong thing to sell you." (M8, `agents-building-agents.md`).
- Turn re-echoed at the close: "The kernel came out of the same move as your first briefing: agents read, agents argued, something chose, and nothing in the room checked it. Hold that doubt the way you held it then." (M8, `lectures/where-is-this-all-going.md`).
- Narrator admits not knowing: "Nobody in this room knows yet, and the people running this training do not know either." (M8, same).
- Frame at room scale: "Now open the kernel and count how many folders it actually cites. That ratio is your rollout, in miniature."

### Path note
`lectures/story-of-module-6.md` and `lectures/agents-that-build-agents.md` carry a first-person authoring incident, but both are linked only from **agentic-engineering-101** (`trainings/agentic-engineering-101/spot-gaps-build-the-loop.md`). No Agents 101 module links either, so neither counts as evidence here.

## Frame

**The training's frame, in one sentence — and it says it itself:** *"generic AI becomes your AI when you shape the context that surrounds it"* (M2, `lectures/compounding.md`).

Three modules that only make sense through it:

- **M1** is the frame at prompt scale, and says so: *"Context is whatever you tell it. A fact. A role. A preference. A constraint. All of it colors what comes next."* (`lectures/context-is-king.md`). The whole exercise is one variable moved seven times: *"The mechanism is the same every phase. The agent's output is shaped by what you put in the context ahead of the task."* (`exercises/personal-site-with-guardrails.md`).
- **M2** is the same move with shelf life, and names the continuity: *"This is the same mechanism from Module 1: context shapes output, run at system scale. The context for this work is what the previous work produced."* (`lectures/compounding.md`). Without the frame, Phase 3 is just file management; with it, *"the old claims and the new claims met each other, and the ones that couldn't survive the meeting got cut."*
- **M6** runs the frame with one term pinned: *"The judge stays fixed... The score goes up because the generation tactic learns what the yardstick punishes."* (`exercises/eval-loop.md`). *"A yardstick you rewrite is not a yardstick."* A module about evals only coheres as a context module — the tactic file is context being sharpened by feedback.

**Where the frame breaks, said on the page, three times and each time load-bearing:**

- M2: *"The agent can only work from what somebody wrote down. Most of what you know about your own company, nobody has. It sits in heads, in corridors, in the judgement of the person who has been there long enough to stop noticing they have it."* (`lectures/compounding.md`).
- M4 inverts it outright: *"Everything you have built so far gave the agent more... Now the move is to give it less."* and then resolves the contradiction instead of ducking it: *"Both moves are right, and the difference is what happens when the agent is wrong. More context makes a good answer likelier. Less access makes a bad answer smaller."* (`lectures/practice-of-risk.md`).
- M3 kills the lazy reading of the frame: *"And more input is not the fix either. The beige answer was not short of context. It had three stances in front of it and could not choose between them."* (`lectures/when-to-split-an-agent.md`).
- M7 gives the break a name and an authority: *"we know more than we can tell. Your agent runs on the part of your work you could never have written down."* (`lectures/access-is-not-absorption.md`).

Deduction: the sentence that states the frame lands in M2, not M1 — a student carries the mechanism for a module before they are handed the words for it.

## Narrative

**Five sentences, with the turn.** You arrive carrying a real unsolved challenge and a suspicion that AI output is generic; M1 proves the generic goes away when you feed it your own world, so you scale the move into a memory that compounds. M2 and M3 give you the system you came for — a memory, an agent, three retrievers, three stances, a framework — and M3 hands back a synthesized answer on your own crux. Then the training turns on itself: the method, run correctly, produces something you cannot vouch for, and it refuses to fix it. M4 and M5 answer only part of it (scope what the agent can reach; measure which detector actually catches fabrication on *your* output), and M6 turns the judge into infrastructure — then immediately admits nothing has been scoring the judge. M7 and M8 widen the frame to other people and to the room, and the close does not resolve: *"You leave with a flywheel, not a graduation."*

**The turn, quoted:** *"Everything you just did is the move this training teaches, run properly. It still handed you something you cannot vouch for. Hold the doubt. Name it to yourself. Don't fix it here."* (M3, `exercises/three-minds-one-synthesis.md`).

It is the training's own failure and the student lives it — the unvouchable briefing is their own artifact on their own challenge, and it is then re-used as the test corpus: *"Your target is the ungrounded briefing from Module 3... The briefing already lives somewhere on the edge of ungroundedness; that's why it's the right test."* (M5, `exercises/hallucination-bakeoff.md`). The refusal to close it is held at module level (*"The doubt stays. Hold it."* — M3, `multi-agent-systems.md`), honoured at M5 (*"This module is the rescue. Not full closure"* — `output-quality.md`), turned a second time at M6 (*"Nothing has been scoring the judge."*), and paid off in the last lecture (M8, `lectures/where-is-this-all-going.md`).

Deduction: M7 is a lateral chapter — the sharing arc has its own small shape but does not raise the main stake, so the middle of the arc widens rather than tightens.

## Point of view

**Who is telling this:** a practitioner-trainer who sells agent work, has run this room before, and says out loud that they do not know where it goes.

Three places the narrator shows:

- M1, `lectures/what-just-happened.md`: *"Nobody knows where agents are going. Not Anthropic, not your board, not the people running this training."*
- M3, `lectures/when-to-split-an-agent.md`: *"The test is unkind on purpose. Business people who have just seen multi-agent work want to split everything. Resist it."* — and *"please, for the sake of your sanity, write the one prompt."* Someone has watched this happen.
- M4, `lectures/practice-of-risk.md`: *"Damn, this is complex stuff. It will still be complex when the next agent gets built."* Plus the seller stepping into frame: *"It costs whoever sells you agents too, this training included."*
- M8, `agents-building-agents.md`: *"We could have spent today building you one impressive agent to show on Friday."* — the narrator naming the choice they made about this day.

**Is the narrator's own failure on the page? No.** The nearest thing is M5, `lectures/grounded.md`: *"Against the Mata v. Avianca pre-read, source triangulation caught an unsourced 'small firm' descriptor and an unsupported 'ten minutes' estimate... Citation integrity caught a direct quote that did not appear in the linked sanctions order. Even a careful teaching case benefits from the check."* That is the training's own material failing its own check — but it is told in one passive clause with no one in it: nobody wrote the descriptor, nobody decided anything, nobody found out. No incident shape (what was built, what went wrong, how it surfaced). The failures told as incidents belong to other people — Schwartz and ChatGPT, Deloitte and DEWR (M4, `lectures/module-5-prework.md`). Everything else is admitted uncertainty and self-doubt, which the anchors credit under Stance and the pair, not here. Caps at 80.

## Stance

Positions the training could lose a customer over, each with where it is defended rather than asserted:

1. **Don't split agents; default to one.** Held immediately after a whole module demonstrating multi-agent. Defended by mechanism (three named tests plus a coordination-cost argument): *"Splitting adds coordination cost: handoffs to manage, mis-framing to watch for, prompts to tune per agent, a synthesis step that lies if you let it."* and enforced by a bluff test: *"can I write one prompt that produces the same quality of output? If yes, you didn't need to split."* (M3, `lectures/when-to-split-an-agent.md`).
2. **Don't open the door — and this costs us.** *"Avoidance beats reduction. Scope beats patch. Don't-open beats mitigate."* with the commercial cost stated in the same breath: *"Expect it to cost you a feature somebody in your company wanted. It costs whoever sells you agents too, this training included: an agent that reaches less is a smaller thing to sell, and it is still the right call."* (M4, `lectures/practice-of-risk.md`). **Against its own commercial interest, on the page.**
3. **You cannot share an agent; "share the whole agent" is a vendor pitch.** *"*Share the whole agent* is a vendor pitch and is NOT on the list."* (M7, `exercises/share-your-work.md`), defended by a mechanism about what copies: *"An agent is context, a boundary, a set of checks and somebody who answers for what it does. The first three copy in an afternoon. The fourth does not copy at all, which is why the product being sold as a shared agent is always three of the four parts."* (M7, `lectures/access-is-not-absorption.md`).
4. **No database, no platform, no paid tier.** *"The memory is a folder of markdown files. That's it. No database. No special tool. No paid tier. No setup."* defended by mechanism: *"When you store knowledge as text, reading it is reading, and updating it is writing. Nothing sits between the model and what it's best at. Every fancier setup that promised to 'fix' this added a layer that the model had to work *around*."* (M2, `lectures/compounding.md`). **Against commercial interest** for anyone who would rather sell a platform.
5. **We refused to sell you the demo.** *"We could have spent today building you one impressive agent to show on Friday. It would have demoed well and it would have been the wrong thing to sell you, because the agent that matters in six months is one nobody in this room has thought of yet."* (M8, `agents-building-agents.md`). **Against commercial interest**, and it is the closing line of the training.
6. **Using the loop erodes the person operating it.** *"Every clean week is real evidence the loop is working, and real erosion of your ability to tell when it stops working. Those are the same weeks."* (M6, `lectures/new-human-role-in-the-loop.md`) — the training naming the cost of the thing it just sold, with a forcing move attached (*"when did you last read one of these yourself, start to finish"*).
7. **Reading about this is a different category of activity.** *"Reading a McKinsey report on the agentic enterprise is not the same category of activity as what you just did."* (M1, `lectures/what-just-happened.md`).

Deduction: two of the seven (plain text beats databases; empirical beats authority) are cheap in front of this audience — true, argued, but not positions anyone in the room would fight.

## The pair

**Stance + self-doubt, both, and interleaved rather than alternated.** The training doubts its own instruments by name, repeatedly, and always at the moment it has just taught them: *"Claude is reading its own work in the chat where it just wrote it... the LLM tends to be lovely about its own prior output"* (M1, `exercises/personal-site-with-guardrails.md`); *"Diplomatic is the failure mode at a handoff seam"* (M3, `multi-agent-systems.md`); *"Two runs is a demo, not a measurement"* and *"The arithmetic is an illustration, not a measurement"* (M5, `lectures/grounded.md`); *"The judge has been scoring your work all the way through the loop. Nothing has been scoring the judge"* (M6, `lectures/when-the-score-stops-moving.md`); *"This is Claude auditing a tactic it helped sharpen. Convenient, not neutral"* (M6/M8 debriefs); *"If the fabrication your judge was built for mostly stops arriving, what is left for it to check?"* (M6).

**One line:** it reads as someone who has been there — the doubt lands on the instruments the training itself sells, is given a mechanism each time (post-training warmth, self-grading, sample size), and the stances are held where holding them costs the seller money; a pitch would have let the judge stand unexamined and a hedge would not have refused the Friday demo.

## Scores

Frame 94 · Narrative 95 · Point of view 80 · Stance 96

## Smallest moves

1. Give the M5 Mata-check beat an owner and an incident shape — who ran the four detectors on our own pre-read, what they had already written and believed, and what came back — so one narrator failure exists as an incident rather than a passive clause.
2. Port the `story-of-module-6` device (first-person, dated, "what drifted when we built this") into the A101 M6 flat-score lecture, the one place the training already admits nothing was scoring the judge, and cut it to the shortest incident that still names a decision the narrator got wrong.
3. Move the frame sentence — *"generic AI becomes your AI when you shape the context that surrounds it"* — into the M1 close so the student carries the words from the first module instead of meeting the mechanism twice before it is named.
