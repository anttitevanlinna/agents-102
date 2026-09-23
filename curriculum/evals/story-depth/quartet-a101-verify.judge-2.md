# Story-depth verification — Agents 101 (branch `a101-story`), judge 2

## Running notes

### Prework + M1 Getting Going
- Prework is set-up prose, but it already carries voice: "a working snake game is a small, permanent, perfectly useless thing to own, which makes it more interesting than most of what you produce at work" (prework.md).
- M1 Big Idea: "With the right guardrails, you create output that's genuinely yours, not generic." Frame candidate = context is the control surface.
- `lectures/context-is-king.md`: "Same words. Different answer." / "That's context. Unglamorous, isn't it? And yet every useful thing in this training is built on this one idea." — frame stated as load-bearing for the whole training.
- `lectures/what-just-happened.md` carries the self-doubt seed early: "Why the look-back was kind to you" / "The report is a hypothesis, not a result" / "You were the only check in the room." Narrator speaks as someone who has watched the model round corners.
- Stance seed: "Reading a McKinsey report on the agentic enterprise is not the same category of activity as what you just did."
- Narrator plural/institutional: "not the people running this training" — admitted ignorance, not yet an incident.

### M2 Building Agent Systems
- Frame restated at system scale, `lectures/compounding.md`: "This is the same mechanism from Module 1: context shapes output, run at system scale." and "generic AI becomes your AI when you shape the context that surrounds it."
- Stance with a mechanism: "the simplest possible setup beats the fancy ones… Every fancier setup that promised to 'fix' this added a layer that the model had to work *around*."
- Commercial-interest stance: "The model will change under this. The memory will not." / "A better model reads it better. It doesn't write it for you, and it doesn't leave with it."
- Limit named on the page: "The agent can only work from what somebody wrote down. Most of what you know about your own company, nobody has."
- Self-doubt: "What Claude leaves out is often the signal. A clean summary that names three rules and skips the messy fourth… is the tell."

### M3 Multi-Agent Systems
- THE TURN. `exercises/three-minds-one-synthesis.md`: "Everything you just did is the move this training teaches, run properly. It still handed you something you cannot vouch for." Preceded by: "you'd stake your reputation on some of it and not all of it, and you can't yet say which is which. That feeling is correct."
- Module reinforces: "The doubt stays. Hold it." (multi-agent-systems.md) and "Nothing in it reads the briefing and tells you whether it is true."
- Stance against the field, defended: `lectures/when-to-split-an-agent.md` "Inside a workflow, start with don't." / "can I write one prompt that produces the same quality of output? If yes, you didn't need to split." / "A whole module just showed you multi-agent works. Next Monday, you will be tempted to apply it to everything. Don't."
- "More agents is not more rigour… The beige answer was not short of context."

### M4 Security
- Frame inverted deliberately, `lectures/practice-of-risk.md`: "Everything you have built so far gave the agent more… Now the move is to give it less." / "More context makes a good answer likelier. Less access makes a bad answer smaller." — the frame naming where it breaks.
- Commercial-interest stance, explicit: "It costs whoever sells you agents too, this training included: an agent that reaches less is a smaller thing to sell, and it is still the right call."
- Stance defended by mechanism: three ways agents break determinism; "Your firewall doesn't see it because your firewall has never had to worry about persuasion."
- Narrator voice with experience: "Damn, this is complex stuff." / "Some of your agents are going to be wrong, in ways you won't catch, and ship output you won't love."
- "'I can't tell' is a real answer." Refusal of the clean bill of health: "The goal is not a clean bill of health."

### M5 Grounded Output
- The rescue framed against M3's turn: "This module is the rescue. Not full closure: your Module 3 doubt and your Module 4 residuals stay where they are."
- Training's own artefact fails its own check — `lectures/grounded.md`: "Against the Mata v. Avianca pre-read, source triangulation caught an unsourced 'small firm' descriptor and an unsupported 'ten minutes' estimate… Citation integrity caught a direct quote that did not appear in the linked sanctions order. … Even a careful teaching case benefits from the check."
- Stance vs the field: "You don't pick a detector because the docs or a paper said so." / "Nobody does. Not the framework authors, not the blog posts, not the deck on someone's slide."
- Honest about its own numbers: "The arithmetic is an illustration, not a measurement" / "treat it as a working prior, not a measurement."
- Limit on its own instrument: "yours was 30 claims. A real production judge wants hundreds."

### M6 Evaluations
- Self-doubt about the instrument: `lectures/when-the-score-stops-moving.md` "The judge has been scoring your work all the way through the loop. Nothing has been scoring the judge." / "A flat score is real information, but only about the frame the judge can see."
- Against its own product: "If the model stops fabricating, what is your judge for?" and "Every model release makes the floor cheaper to hold."
- Erosion warning: `lectures/new-human-role-in-the-loop.md` "Every clean week is real evidence the loop is working, and real erosion of your ability to tell when it stops working. Those are the same weeks."
- Frame restated at the top zoom: "Variety in, selection out, memory keeps."

### M7 From Personal to Team
- Frame's limit, stated as the module's own subject: `lectures/access-is-not-absorption.md` "The thing you would most like to hand over is the one thing that will not go. You cannot hand over what you learned getting here."
- Stance against the category: "*Share the whole agent* is not on the list" / "the product being sold as a shared agent is always three of the four parts, with the fourth still sitting with whoever built it."
- Second turn, lived: "You felt this an hour ago. The technical plan filled quickly. The people plan stalled on names. That was not the exercise being hard. That was the exercise being accurate."

### M8 Agents Building Agents
- Closing echo of the M3 turn, `lectures/where-is-this-all-going.md`: "The kernel came out of the same move as your first briefing: agents read, agents argued, something chose, and nothing in the room checked it. Hold that doubt the way you held it then."
- Commercial-interest stance, named as a sales decision: agents-building-agents.md "We could have spent today building you one impressive agent to show on Friday. It would have demoed well and it would have been the wrong thing to sell you."
- Narrator admits own ignorance: "Nobody in this room knows yet, and the people running this training do not know either."
- Frame at the top zoom: "the assembly is the durable half" / "Will your organisation learn faster than the model changes underneath it?"

---

## Frame

**The training's frame, in one sentence:** an agent produces whatever the context around it lets it produce, so the whole job is arranging that context — and every increase in context has to be paid for with a boundary and a check, because nothing inside the system can tell you whether what it produced is true.

Stated, and stated as load-bearing, not decorative:

> "That's context. Unglamorous, isn't it? And yet every useful thing in this training is built on this one idea." — M1, `lectures/context-is-king.md`

Three modules that only make sense through it:

- **M2** is the frame with a shelf life. `lectures/compounding.md`: "This is the same mechanism from Module 1: context shapes output, run at system scale. The context for this work is what the previous work produced." Without the frame, M2 is a folder-organising exercise; with it, the memory *is* the context surface. Same lecture names why the plain-text choice follows from the frame rather than from taste: "Every fancier setup that promised to 'fix' this added a layer that the model had to work *around*."
- **M5** is the frame turned against itself. `lectures/grounded.md`: "Your agent, left to itself, has no model of truth, only a model of what usually comes next in language that looks like yours." The detector bake-off is only coherent if you already accept that context, not the model, is what makes output true — hence "You don't pick a detector because the docs or a paper said so."
- **M7** is the frame meeting the one surface it cannot reach. `lectures/access-is-not-absorption.md`: "Your agent runs on the part of your work you could never have written down." The module's whole design (job-to-be-done first, people plan weighted equal to technical plan) follows from context being the thing that doesn't copy.

**Where the training says the frame breaks** — and it says so four separate times, in the body, to students:

- M4, `lectures/practice-of-risk.md`: "Everything you have built so far gave the agent more. More context. A memory that survives the session. More stances at the table. **Now the move is to give it less.**" Then the reconciliation rather than a dodge: "More context makes a good answer likelier. Less access makes a bad answer smaller."
- M2, `lectures/compounding.md`: "The agent can only work from what somebody wrote down. Most of what you know about your own company, nobody has."
- M3, `lectures/when-to-split-an-agent.md`: "And more input is not the fix either. The beige answer was not short of context. It had three stances in front of it and could not choose between them."
- M6, `lectures/new-human-role-in-the-loop.md`: "Every clean week is real evidence the loop is working, and real erosion of your ability to tell when it stops working."

Every module reads through it and the breaks are named on the page, in student-facing body prose, not in a maintainer note. What holds it back from a clean 100 is that the frame is never handed to the student as one sentence they could repeat; it is assembled from "Context is King" plus the M4 inversion, and a student who skipped M4 would carry only the first half.

## Narrative

**Five sentences.** A manager walks in with a snake game and a vague word, *context*, and wants work that is genuinely theirs instead of generic. They learn to shape it — a site that sounds like them, a memory that sharpens instead of bloating, six agents fanning out across their company — and each round the system gets more reach and they get more confident. Then, at the end of Module 3, having run the training's own method perfectly, they are handed a strategic briefing they cannot vouch for, and the training refuses to fix it. The next three modules are the long climb back: give the agent less, measure what it says against a benchmark, hold a judge still while the work learns to pass it — and each instrument arrives with its own limit stamped on it. They leave able to build the agent nobody has thought of yet, still holding the same doubt, now with somewhere to put it.

**The turn, quoted** — `exercises/three-minds-one-synthesis.md`, M3 Close:

> "You can't tell yet. Three retrievers read plainly, three stances pushed, a framework held the synthesis together, and still, the answer sits at that uneasy distance where you'd stake your reputation on some of it and not all of it, and you can't yet say which is which. That feeling is correct.
>
> **Everything you just did is the move this training teaches, run properly. It still handed you something you cannot vouch for.**
>
> Hold the doubt. Name it to yourself. Don't fix it here."

This is the training's own failure, and the student lives it rather than reads about it — they built the briefing, in four sessions, on their own live challenge. The module reinforces rather than resolves: "**The doubt stays. Hold it.**" and "Nothing in it reads the briefing and tells you whether it is true" (`multi-agent-systems.md`). M5 explicitly refuses to close it: "This module is the rescue. Not full closure: your Module 3 doubt and your Module 4 residuals stay where they are." And M8 closes the arc on the same beat: "The kernel came out of the same move as your first briefing: agents read, agents argued, something chose, and nothing in the room checked it. Hold that doubt the way you held it then."

Marked down from 100 only because the turn's stakes are borrowed rather than the narrator's: the failure is the method's, lived by the student, but no one on the page has been burned by it themselves — the two burn victims (Schwartz, Deloitte) are third parties in a pre-read.

## Point of view

**Who is telling this:** a practitioner-trainer who sells this training, speaking mostly as "we"/"the people running this training," who has run these loops on real work, watched the model round corners, and is visibly uncomfortable selling certainty.

Three places the narrator shows:

1. M1, `lectures/what-just-happened.md`: "Nobody knows where agents are going. Not Anthropic, not your board, **not the people running this training.**" — the narrator puts himself inside the ignorance he is describing, in the first module.
2. M4, `lectures/practice-of-risk.md`: "Expect it to cost you a feature somebody in your company wanted. **It costs whoever sells you agents too, this training included:** an agent that reaches less is a smaller thing to sell, and it is still the right call." Plus the unguarded aside three paragraphs on: "**Damn, this is complex stuff.** It will still be complex when the next agent gets built."
3. M8, `agents-building-agents.md`: "**We could have spent today building you one impressive agent to show on Friday.** It would have demoed well and it would have been the wrong thing to sell you, because the agent that matters in six months is one nobody in this room has thought of yet, built by somebody who is not you." — a stated design decision with the alternative named, and an admitted temptation.

**Is the narrator's own failure on the page?** The closest thing to it, and the only candidate that reaches the shape of an incident, is in M5 `lectures/grounded.md`, where the training runs its own detectors against its own Module 5 pre-read:

> "Against the Mata v. Avianca pre-read, source triangulation caught an unsourced 'small firm' descriptor and an unsupported 'ten minutes' estimate. Entailment caught the story making Schwartz's timeline too clean. **Citation integrity caught a direct quote that did not appear in the linked sanctions order.** Counter-evidence found a source conflict where CNBC blurred the $5,000 sanction and the court order was more precise. Even a careful teaching case benefits from the check."

That is the training's own artifact, containing a fabricated quotation, found by the training's own instrument. It is the right species of thing. It falls short of the 100 rung on the telling: the narrator never takes grammatical ownership (no "we wrote that," no "I found it," no moment of discovery), the paragraph is framed as a demonstration of what four detectors do rather than as a scar, and the reader can finish it without registering that the defective page was one they were assigned three days earlier.

Everything else at this altitude is self-doubt and stance rather than incident: "the people running this training do not know either" (M8), "the judge is still yours, and still unchecked in the places you have not looked" (M8), the refused sale in M4 and M8. Per the anchor clarification for this run, those are credited under Stance and the pair, not here. So: a narrator with a stated experience, one near-miss at an incident, capped just above the 80 rung.

## Stance

Positions the training could lose a customer over, each with where it is defended rather than asserted:

1. **Don't build multi-agent systems.** `lectures/when-to-split-an-agent.md`: "Inside a workflow, start with don't." Defended with a falsifiable test, not an opinion: "*can I write one prompt that produces the same quality of output?* If yes, you didn't need to split. Write the one prompt. Keep your life small." And a direct swipe at the reader's own enthusiasm: "A whole module just showed you multi-agent works. Next Monday, you will be tempted to apply it to everything. Don't." This is a module arguing against its own subject matter, one page after teaching it.
2. **Plain text beats every platform that promises to fix it.** `lectures/compounding.md`, with the mechanism: "Language models are strongest at reading and writing text… Nothing sits between the model and what it's best at. Every fancier setup that promised to 'fix' this added a layer that the model had to work *around*."
3. **Scoping down beats mitigating — and it costs us.** `lectures/practice-of-risk.md`: "Avoidance beats reduction. Scope beats patch. Don't-open beats mitigate." Then the payment: "It costs whoever sells you agents too, this training included: an agent that reaches less is a smaller thing to sell, and it is still the right call."
4. **You cannot share an agent, and anyone selling you one is selling three quarters of it.** `lectures/access-is-not-absorption.md`: "*Share the whole agent* is not on the list" / "the product being sold as a shared agent is always three of the four parts, with the fourth still sitting with whoever built it. Accountability is the part with a name on it, and a name does not travel inside a folder."
5. **No authority counts, including ours.** `lectures/grounded.md`: "Nobody does. Not the framework authors, not the blog posts, not the deck on someone's slide." Backed by making the student run four candidates and keep the measured winner.
6. **The model is the vendor's asset; the memory is yours.** `building-agent-systems.md`: "The model will change under this. The memory will not… A better model reads it better. It doesn't write it for you, **and it doesn't leave with it.**"
7. **We refused to build you the demo.** `agents-building-agents.md`, quoted above: the Friday-demo agent named as the wrong thing to sell, on the last page of the training.

**Held against its own commercial interest:** (3), (6) and (7) explicitly, and (1) structurally — a training that sells eight modules of agent-building spends a lecture telling the room not to build. (7) is the strongest: it names the more saleable product, says it would have demoed well, and says it would have been wrong to sell. That is the 100 rung, on the page, in student-facing prose.

## The pair

The training doubts its own instruments consistently and in the body: "Nothing has been scoring the judge" and "A flat score is real information, but only about the frame the judge can see" (`lectures/when-the-score-stops-moving.md`); "If the model stops fabricating, what is your judge for?" in the same lecture; "The arithmetic is an illustration, not a measurement" (`lectures/grounded.md`); "yours was 30 claims. A real production judge wants hundreds" (`exercises/hallucination-bakeoff.md`); "'I can't tell' is a real answer" (M4); and the sharpest one, aimed at the loop it just sold: "Every clean week is real evidence the loop is working, and real erosion of your ability to tell when it stops working. Those are the same weeks."

Stance and doubt are both present, and they are load-bearing for each other rather than adjacent: the doubt is what licenses the stance ("certainty is a fantasy, the discipline is the answer") and the stance is what keeps the doubt from being a hedge ("Run the loop. You never finish."). **It reads as someone who has been there.** The one thing it does not do is say *when* he was there — the scars are the method's, not the narrator's, which is exactly the gap the Point of view score is marking.

## Scores

Frame 94 · Narrative 92 · Point of view 88 · Stance 96

## Smallest moves

1. In `lectures/grounded.md`, rewrite the Mata-pre-read paragraph in the first person — who wrote that page, which line was invented, and the moment the citation-integrity detector came back with a quote that was not in the order — turning the training's best incident from a detector demo into the narrator's own scar.
2. Add one sentence to `lectures/context-is-king.md` or the M1 close that states the whole frame in one line, including its second half (more context, less access), so the student carries the frame rather than assembling it from M1 and M4.
3. In `exercises/three-minds-one-synthesis.md`, attach one clause to the turn naming a time the trainer shipped something off the back of exactly that un-vouchable briefing, so the training's own failure has a person inside it.
