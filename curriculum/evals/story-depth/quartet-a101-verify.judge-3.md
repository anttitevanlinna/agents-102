# A101 story-depth verification — judge 3

Branch `a101-story`, judged on disk, student order.

## Running notes

### Modules (all nine read, body only, maintainer/backing skipped)
- Prework: frame not yet named; snake game justified by falsifiability ("you can tell if it works"), a small aesthetic aside about uselessness.
- M1 Getting Going — Big Idea "With the right guardrails, you create output that's genuinely yours, not generic." Debrief = two passes on a rules file; explicit warning that the LLM grades its own rules file charitably, and that praise carries forward into the generic-line call.
- M2 Building Agent Systems — "A system remembers, grows, and compounds. Chat doesn't." Names the turn from rehearsal to real work. "The model will change under this. The memory will not."
- M3 Multi-Agent — "Nothing here checks any of it" section; "The doubt stays. Hold it."
- M4 Security — "Certainty is a fantasy; the discipline is the answer." "I can't tell" as a real answer. "The unease stays. Nothing today resolves it. That's the curriculum."
- M5 Grounded Output — "This module is the rescue. Not full closure." Judge narrow on purpose, names its own limit.
- M6 Evaluations — fixed judge, generator sharpens; self-audit caveat with a harsher follow-up prompt.
- M7 Personal to Team — "You can't really share an agent." Access vs absorption.
- M8 Flywheel — "We could have spent today building you one impressive agent to show on Friday... it would have been the wrong thing to sell you." "You leave with a flywheel, not a graduation."

### Lectures + exercises (opened at link point)
- M1 `context-is-king.md`: three-window demo; "Context is whatever you tell it." Names itself as "the first piece" of a running parts list.
- M1 `what-just-happened.md`: "Why the look-back was kind to you"; "You were the only check in the room"; "Nobody knows where agents are going. Not Anthropic, not your board, not the people running this training."
- M1 `personal-site-with-guardrails.md`: warm-session self-audit warned inline.
- M2 `compounding.md`: "generic AI becomes your AI when you shape the context that surrounds it"; "Module 2 adds shelf life"; closes on "It can only use what someone wrote down."
- M3 `when-to-split-an-agent.md`: "Start with don't"; "other agents are part of the tool surface"; "A whole module just showed you multi-agent works... Don't."
- M3 `three-minds-one-synthesis.md` close: the turn. Quoted below.
- M4 `practice-of-risk.md`: "this is the boundary piece"; the give-it-less reversal; the against-interest line.
- M5 `grounded.md`: detectors run against the training's own Mata pre-read and find its own defects; "this is the check."
- M6 `evals-as-steering.md` / `when-the-score-stops-moving.md` / `new-human-role-in-the-loop.md`: "evals turn checks into a loop"; "You haven't checked the judge yet"; "The better it gets, the less you watch."
- M7 `access-is-not-absorption.md`: "this is the interface piece"; three parts copy, accountability doesn't.
- M8 `where-is-this-all-going.md`: "The parts hold; the model rotates"; "Which half of this is obsolete next year?"; "nothing in the room checked it."
- Supplementary `what-is-an-agent.md` (two pointed sections only): LLM vs chat, autonomy ladder.

## Frame

**The frame, one sentence:** generic AI becomes yours only to the degree you write down the world around it, and every module adds one more nameable part to the same picture — context, memory, other agents, boundary, checks, loop, interface — each one a decision about what you give the agent and what you keep back.

It is stated outright, not inferred. `lectures/compounding.md` (M2): *"That's the point the whole training turns on: generic AI becomes your AI when you shape the context that surrounds it. Guardrails did this at the prompt level in Module 1. A memory does it at the knowledge level now. The mechanism is the same; only the shelf life changed."*

Three modules that only make sense through it:

- **M3.** Splitting is taught as a context decision, not a capability one. `lectures/when-to-split-an-agent.md`: *"In the full agent picture, other agents are part of the tool surface. They let one agent call a different stance, a different source zone, or a different working style without stuffing every job into one prompt."* Without the frame, "hire three agents" is a feature demo; with it, the whole lecture's "start with don't" is coherent.
- **M4.** `lectures/practice-of-risk.md`: *"In the full agent picture, this is the boundary piece. What may the agent read? What may it change? What must come back to a human? More capability without boundaries is not progress. It is just more blast radius."*
- **M7.** `lectures/access-is-not-absorption.md`: *"In the full agent picture, this is the interface piece. It is the first one that has another person on the other side of it. Context you chose. Boundaries you set. Checks you wrote. Each of those was a decision you could make and remake on your own."*

The other five land the same way (M1 *"In the full agent picture, this is the first piece: context"*; M5 *"In the full agent picture, this is the check"*; M6 *"evals turn checks into a loop"*; M8 *"The parts did not change... What changed is who assembles them"*). Eight for eight.

Where the frame breaks, said by the training:

- The frame inverts at M4. `lectures/practice-of-risk.md`: *"Everything you have built so far gave the agent more. More context. A memory that survives the session. More stances at the table. Now the move is to give it less. Both moves are right, and the difference is what happens when the agent is wrong."*
- The frame runs out at the edge of what is written. `lectures/compounding.md`: *"The agent can only work from what somebody wrote down. Most of what you know about your own company, nobody has. It sits in heads, in corridors, in the judgement of the person who has been there long enough to stop noticing they have it."*
- And at the edge of another person. `lectures/access-is-not-absorption.md`: *"The thing you would most like to hand over is the one thing that will not go. You cannot hand over what you learned getting here."*

Small deduction: prework sits outside the frame (reasonably — it is setup), and the "context" statement and the "parts list" statement are two sentences the student has to fuse rather than one the training fuses for them.

## Narrative

**Five sentences.** A manager walks in carrying one live, unsolved challenge and wants a system that will actually move it. They build the context, then the memory, then hire six agents to search and decide — and the machine works exactly as taught. Then the turn: the properly-run method hands back an answer they cannot vouch for, and the training refuses to fix it in the module. The next four modules are the repair — a boundary, a measured judge, a loop that runs without them — each one closing a little and naming what it did not close. They leave with a flywheel that is still, on its own last page, unchecked in the places nobody has looked.

**The turn**, `exercises/three-minds-one-synthesis.md`, M3 close:

> *"You can't tell yet. Three retrievers read plainly, three stances pushed, a framework held the synthesis together, and still, the answer sits at that uneasy distance where you'd stake your reputation on some of it and not all of it, and you can't yet say which is which. That feeling is correct. Everything you just did is the move this training teaches, run properly. It still handed you something you cannot vouch for. Hold the doubt. Name it to yourself. Don't fix it here."*

This is the training's own method failing under the student's hands, not a failure imported as a case study. It is held open rather than resolved — `security.md` (M4 Debrief): *"The unease stays. Nothing today resolves it. That's the curriculum."* — partially repaid — `output-quality.md` (M5 Start here): *"This module is the rescue. Not full closure: your Module 3 doubt and your Module 4 residuals stay where they are."* — and echoed at the close, `lectures/where-is-this-all-going.md`: *"The kernel came out of the same move as your first briefing: agents read, agents argued, something chose, and nothing in the room checked it. Hold that doubt the way you held it then."*

A smaller first turn seeds it in M1, `lectures/what-just-happened.md`: *"Nothing in the last hour verified anything. Claude generated, you looked, you decided."*

Held off 100 only because the turn's meaning is narrated to the student (*"That feeling is correct"*) at the same moment they are meant to feel it; the line does some of the work the exercise had already done.

## Point of view

**Who is telling this:** a practitioner who builds these systems and sells this training, and who keeps saying so out loud — including when saying so costs them.

Three places the narrator shows:

1. `lectures/what-just-happened.md` (M1): *"Nobody knows where agents are going. Not Anthropic, not your board, not the people running this training. What's known: the people who'll figure it out first are the ones running the experiment."*
2. `lectures/practice-of-risk.md` (M4): *"Expect it to cost you a feature somebody in your company wanted. It costs whoever sells you agents too, this training included: an agent that reaches less is a smaller thing to sell, and it is still the right call."*
3. `agents-building-agents.md` (M8 close): *"We could have spent today building you one impressive agent to show on Friday. It would have demoed well and it would have been the wrong thing to sell you."*
4. And `lectures/where-is-this-all-going.md`: *"Nobody in this room knows yet, and the people running this training do not know either."*

**Is the narrator's own failure on the page?** Once, obliquely. `lectures/grounded.md` runs the training's four detectors against the training's own M4 pre-read and reports what they found: *"Against the Mata v. Avianca pre-read, source triangulation caught an unsourced 'small firm' descriptor and an unsupported 'ten minutes' estimate. Entailment caught the story making Schwartz's timeline too clean. Citation integrity caught a direct quote that did not appear in the linked sanctions order."* That has the three parts of an incident — what was built (the case study the student read last week), what went wrong (an invented quote in it), how it was found (running the instrument on it). But it is told in the passive clinical register, with no one owning it: *"Even a careful teaching case benefits from the check."* The student must infer whose page it was.

Everything else in this register is admitted uncertainty and refused sale — real, and credited under Stance and The pair, but not an incident. No first-person "here is the thing I built and how it went wrong" appears anywhere in the nine modules or their linked pages. So: a narrator with stated experience, plus one under-owned scar. Above the 80 rung, short of 100.

## Stance

Positions this could lose a customer over, each with where it is defended rather than asserted:

1. **You cannot sell or share an agent.** `exercises/share-your-work.md`: *"'Share the whole agent' is a vendor pitch and is NOT on the list."* Mechanism in `lectures/access-is-not-absorption.md`: *"An agent is context, a boundary, a set of checks and somebody who answers for what it does. The first three copy in an afternoon. The fourth does not copy at all, which is why the product being sold as a shared agent is always three of the four parts, with the fourth still sitting with whoever built it."*
2. **Don't use the thing we just taught you.** `lectures/when-to-split-an-agent.md`: *"Inside a workflow, start with don't... The test is unkind on purpose. Business people who have just seen multi-agent work want to split everything. Resist it."* And the closing: *"A whole module just showed you multi-agent works. Next Monday, you will be tempted to apply it to everything. Don't."* Defended by the coordination-cost mechanism and the bluff test (*"can I write one prompt that produces the same quality of output?"*).
3. **Against its own commercial interest, on the page (i).** `lectures/practice-of-risk.md`: *"It costs whoever sells you agents too, this training included: an agent that reaches less is a smaller thing to sell, and it is still the right call."* The training argues for scoping down the thing it is selling access to.
4. **Against its own commercial interest, on the page (ii).** `agents-building-agents.md`: *"We could have spent today building you one impressive agent to show on Friday. It would have demoed well and it would have been the wrong thing to sell you, because the agent that matters in six months is one nobody in this room has thought of yet, built by somebody who is not you."* Refusing the demoable deliverable the buyer would have paid for; the mechanism is named in the same breath.
5. **Plain text beats every fancier setup.** `lectures/compounding.md`: *"Every fancier setup that promised to 'fix' this added a layer that the model had to work around."* Mechanism: the model's strength is reading and writing text.
6. **Certainty is not on offer.** `security.md`: *"Certainty is a fantasy; the discipline is the answer."* Defended by three named mechanisms in `lectures/practice-of-risk.md` (non-determinism, instruction-set attack surface, emergent capability).
7. **A yardstick you rewrite is not a yardstick.** `lectures/evals-as-steering.md`, enforced mechanically in `exercises/eval-loop.md`: *"A SHA match in `module-6/eval-notes.md` is the run's proof claim. If the judge file moved, the exercise failed."*
8. **Nobody's model release saves you.** `lectures/grounded.md`: *"This isn't a bug that gets patched in the next release... Later models will fabricate less; they won't stop."*
9. **Field swipe.** `lectures/what-just-happened.md`: *"Reading a McKinsey report on the agentic enterprise is not the same category of activity as what you just did."*
10. **No graduation.** `exercises/joint-double-diamond.md`: *"You do not graduate. You have a flywheel."*

Two distinct positions held against the seller's own interest, both with the mechanism stated beside them. Top rung, reached twice.

## The pair

The training doubts its own instruments repeatedly and by name. `lectures/when-the-score-stops-moving.md`: *"The judge has been scoring your work all the way through the loop. Nothing has been scoring the judge... Where it passed something you would have sent back, you have found what a flat line cannot show you."* And, on the judge's own obsolescence: *"If the fabrication your judge was built for mostly stops arriving, what is left for it to check?"* And on the student's own erosion, `lectures/new-human-role-in-the-loop.md`: *"Every clean week is real evidence the loop is working, and real erosion of your ability to tell when it stops working. Those are the same weeks."* The last page keeps it open: *"The judge is still yours, and still unchecked in the places you have not looked."*

**Reads as:** someone who has been there. Strong stance and strong self-doubt, pointed at the same instruments — the doubt lands on the tools the training itself sold, not on the field in general, which is the hard version. What it still lacks is the biographical half: the scars are structural, not anecdotal.

## Scores

Frame 94 · Narrative 93 · Point of view 86 · Stance 95

## Smallest moves

1. In `lectures/grounded.md`, own the Mata pre-read defect in the first person — one clause saying this training wrote that page, shipped it, and found the invented quote by running its own detector on it.
2. Add one dated incident from the trainer's own build to M4 or M7: what they scoped or handed over, what went wrong, and how they found out — told as an event, not a principle.
3. In `lectures/access-is-not-absorption.md`, put a named failed handoff of the narrator's own behind "people absorb what they already half know," so the module's hardest claim rests on a scar rather than on Polanyi.
