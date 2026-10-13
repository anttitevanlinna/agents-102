# Header style, distilled

Source: AE101 lecture `##` headers in student order (`print-outline.js agentic-engineering-101`), Agents 101 as second reference, essay titles (`practitioner-essays-year-one.md`) for voice. Applied to the APT101 squint (`apt101-squint.md`, Day 1–3). Delta only: squint + truth (`check_lectures §4`), claims-not-commands in lectures (`check_slides §15`), mechanism over metaphor and keep-the-author's-verb (`taste-notes.md`), literal truth (`check_writing §18`), load-bearing numerals (`§20`) are already in force and not restated.

Pool: lecture `##` only. Excluded: templated module headers (Big Idea, Next, Pre-reads), exercise phase/imperative labels (imperative by design).

## Our header style

1. **Law in four words.** Concrete noun subject, plain present-tense verb, no qualifier. Reads like physics, not advice. → *Gates decay* · *Hooks always fire* · *Rules have a ceiling*
2. **Demote the trusted artifact.** Take the thing the reader relies on and reclassify it one rung down: *X is not Y*, *X is a Y too*. → *Passing is not proof*
3. **Repeat the noun to split it.** Same word both sides of *is not*; the gap between the two uses is the lesson. → *A rule in context is not a rule in the output* (A101: *A yardstick you rewrite is not a yardstick*)
4. **Semicolon diptych, labour divided.** Two short clauses, parallel verbs, usually tool vs you or thing vs thing. No connective; the reader makes the join. → *Prohibitions stop; taste steers* · *The tool flags; you make the call* · *The file is steady; the agent moves*
5. **Relocate the control.** Name what actually does the job against what everyone assumes does it. Often past tense or *never*. → *Reading was never the control* · *The branch is the permission*
6. **Two curves, opposite directions.** The trade-off itself is the claim; no villain. → *Trust and vigilance move in opposite directions* (A101: *The better it gets, the less you watch*)
7. **Borrow a working image from a neighbouring trade, use it literally.** Gym, governor, ceiling and floor, half a map, a preference round. The image carries a mechanism, not decoration. → *Monitoring and takeover run on the same reps* · *Agreeable answers won the preference round*
8. **Physical verbs, not software verbs.** stack, decay, fire, move, outlive, go quiet. Never *enable, support, leverage, improve*. → *Errors stack until a check resets them* · *A skill outlives the thread it came from*
9. **"There is…" for a condition that never ends.** Rationed to the generalising beat or the closer; it is how a file stops instructing and names a law. → *There is always a next plausible answer* · *There is no last turn*
10. **Header carries the turn, body carries the citation.** The source (Deming, Bainbridge, Goodhart) sits in the body; the header states what it means now, with agents in it. → *Change on recurrence, not on noise* (Deming in body)
11. **You as the actor when a human is in the claim.** Second person holds the verb that matters; the agent gets the lesser verb. → *You prime, the LLM scales* · *The agent stops where your judgement begins*
12. **Question only when the reader is the answer.** → *What would have caught this earlier?* (A101: *When did you last read one yourself?*)

**Rhythm.** 3–8 words typical; ≥10 only for a two-clause claim. Comma or semicolon joins, never a colon list. Numerals rare and load-bearing.
**Stance.** Mildly against common sense, never against the reader. Calm certainty, no hype, no hedge.
**What the weak ones do.** Count-teasers (*Three X*, promise a list, state nothing), noun lists without a verb, topic labels (*How X*, *The X and the Y*), single-word slots, repeated headers, transitions (*From X to Y*).

## Best 15

1. **Passing is not proof**: rule 2 at its shortest. Demotes the green tick everyone trusts; three words, no qualifier needed because *proof* is the exact category.
2. **Gates decay**: rule 1. Two words, a physical verb applied to a process artefact. Squints perfectly; impossible to misread.
3. **Reading was never the control**: rule 5. Overturns the reviewer's self-image; *never* is scoped to the mechanism and the body backs it.
4. **Prohibitions stop; taste steers**: rule 4. Perfect parallel: noun, verb; noun, verb. Two kinds of instruction sorted by what they do.
5. **Hooks always fire**: rule 1. The *always* is literally true of the mechanism, which is the whole point of the slide; a universal that earns its place.
6. **Agreeable answers won the preference round**: rule 7. Sports/election image for RLHF without one word of jargon; explains sycophancy as a result, not a flaw.
7. **There is always a next plausible answer**: rule 9. The exercise stops instructing and names a law; *plausible* is the precise sting.
8. **A rule in context is not a rule in the output**: rule 3. Same noun twice, two places; the gap is the bug the whole M6 story is about.
9. **Errors stack until a check resets them**: rule 8. Mechanism in one line: subject, physical verb, the thing that breaks the chain.
10. **Trust and vigilance move in opposite directions**: rule 6. Bainbridge's irony without the citation; no villain, just two curves.
11. **The branch is the permission**: rule 5. Relocates safety from a policy to a git object; short, concrete, slightly shocking.
12. **The file is steady; the agent moves**: rule 4. Steady/moves is the whole claim about rules files; nouns a reader can point at.
13. **Monitoring and takeover run on the same reps**: rule 7. Gym image carries the mechanism: you lose the skill you stop practising.
14. **The optimum is local, and it moves**: rules 1+8. Two short claims stacked; the second clause is the counterintuitive one.
15. **There is no last turn**: rule 9. Closer of the course; recognition line that still asserts, open and forward.

## Blandest 10

1. **Eval**: one word, names a slot. Squint returns nothing.
2. **The second loop**: orphan label, and used twice (M2 `how-instructions-grow`, M6 `composing-the-workflow`). Two slides, one header, zero claim.
3. **What compounds**: empty container; promises an answer, states none.
4. **The agent, the harness, the loop**: noun list, no verb. A glossary heading.
5. **Reference and plan**: label pair; names the topic, not what the student holds.
6. **Long-running work adds three new concerns**: count-teaser; the three are the payload and the header hides them.
7. **Three modules on the near half: Intent, Context, Work**: agenda, colon list. Position, not concept.
8. **The loop and the model it runs on**: topic label (*the X and the Y*); no claim about either.
9. **How the loop compounds**: *How X*: a table-of-contents entry. The body's answer belongs up here.
10. **Two curated, one authored**: inventory code; parses only to someone who already did the exercise.

## APT101 rewrites

Status column: **file** = current header of a slide file, body checked · **retitle** = squint title over a slide with a different file header (file header in brackets) · **no body** = ✱ new, nothing to check against, proposal held at the squint's own claim strength. Retitles were made in r5 for story order and the trio-as-hero lens; where the file header is stronger, the restore is offered for the maintainer to weigh against sequence.

Leave alone, deliberately: narrator lines ("We built…", "I used to…", "I still make…", "We built good things…"); *Future leadership is about strategy, outcomes and customers* (maintainer-adopted); named practices where the name is the takeaway (*Imagine it already failed*, *Test with five users, fix, then test five more*); the three *"…'s piece:"* titles as a parallel set.

Already in our style, keep: *The post-it was the craft on a budget* · *An opportunity tree on Friday, a feature roadmap on Monday* · *Your customers hire the product to make progress* · *Building got cheap, deciding didn't* · *Discovery belongs to the team that builds* · *On your own product, you are the check* · *Generic AI is everyone's; your material is yours* · *A file the team writes once steers every answer* · *The best mitigation is the door you don't open* · *The digest agrees with your favourite hypothesis* · *It found what you asked it to look for* · *A faster feature factory is still a feature factory* · *What customers did beats what they say they will do* · *The outcome at the root makes the merge choose* · *Agents get checked, people don't get watched* · *"The agent got this wrong" costs nobody face* · *Safe enough, under these conditions, for now* · *A customer quote no customer said* · *"Are you sure?" is another fluent answer* · *Your taste is the ceiling* · *The agent stops where you stop writing* · *A list of don'ts does not teach good work* · *Change the rules on recurrence, not one miss* · *A check is what good means, written down* · *Criteria keep a floor and can raise a ceiling* · *A pass is a claim about the check* · *Your criteria become a target* · *Clear outcomes, free hands, for agents too* · *Would you let an agent post your weekly update?* · *The more you trust it, the less you notice* · *An agent's instructions are not the agent* · *Access is easy; absorption is scarce* · *What would have to be true for your team to switch?* · *Cheap building helps your rivals too* · *The six parts hold; the model keeps changing* · *Will your organisation learn faster than the model changes underneath it?*

### Day 1

| Current | Proposed | Rule | Why |
|---|---|---|---|
| Work backwards from your customer (file) | Would a customer pick up the box? | 12 | Imperative names Amazon's method; the body's own test is the question: "The test: would a customer pick it up?" Reader is the answer. |
| Ask for the plan before the agent writes (file) | Leave it out of the plan and the agent decides | 5 | Advice → mechanism. Body: "What the plan leaves open, the agent decides halfway through, inside work already moving." Relocates who decides. |
| A bet names the signal that would prove it wrong (retitle) [Write the bet so it can lose] | A signal that can only say yes is not a test | 2 | Body's own closing line: "A signal that can only come back yes is not a test." Demotes the comfortable signal. Restoring the file header is the softer option. |
| Test the important, unproven assumption first (file) | Test first what matters most and is proven least | 8 / rhythm | Same advice, most/least gives it a beat a room can repeat. Body: "important and unproven". Kept plain-ish on purpose. |
| Outcome, insights, sources: three layers in one folder (retitle) [Three layers, one folder] | Sharpen the insights, never the sources | 1 | Colon list → the law. Body: "Sharpen the memory, never the sources, or you lose the evidence." Uses the squint's own layer name. |
| New interviews sharpen the old insight pages (file) | New interviews make the insight pages sharper, not longer | 2 | Adds the contrast the body ends on: "That is how the pages get sharper instead of longer." |
| One agent for each job that recurs in your week (file) | One agent per recurring job, not one company brain | 4 | Label → choice against the tempting alternative. Body: "One company brain drifts in scope, and nobody can say what it is responsible for." |
| Six parts make an agent: context, tools, goal, checks, boundary, loop (retitle) [A chat runs on context; an agent needs six parts] | A chat runs on one part; an agent needs six | 4 | Colon list is a glossary; the file header is a diptych. Body: "A chat runs on one part: context… An agent… needs six parts." The list stays on the slide. |
| It keeps working while the team is away, fluently (no body) | It works overnight; some of what it writes will be wrong | 4 | *Fluently* is a mystery word that pays off only on Day 2. Line already exists in "One agent for each job": "Some of what it writes will be wrong, and finding which part is the team's job." Sets up "The digest is back". |

Leave plain: *A feature factory ships without asking if it worked* · *An outcome is what your customers do differently* · *A hypothesis can meet a working slice the same day* · *The product box keeps the agents on course* · *Same question, two answers* · *You steer with what you bring, what you set and what you ask* · *Agents shrink the feasibility work; three risks remain*.

**Day 1 voice carriers:** *Building got cheap, deciding didn't* · *Leave it out of the plan and the agent decides* · *A signal that can only say yes is not a test* · *Generic AI is everyone's; your material is yours* · *The best mitigation is the door you don't open*.

### Day 2

| Current | Proposed | Rule | Why |
|---|---|---|---|
| Find which part went wrong before fixing anything (file) | The instructions are only one suspect | 5 | Advice → relocated blame. Body: "the urge is to rewrite its instructions", then three suspects: material, instructions, what it could reach. |
| Talk to your customers every week, toward an outcome (file) | Great research can still miss the outcome | 2 | Imperative restates Torres; the turn is in the body: "teams that are great at research and still miss their outcomes: the research served none." |
| Widen first, then choose, and expect to loop back (file) | An agent widens in minutes; the choosing stays with you | 4 / 11 | Three imperatives → divided labour. Body: "An agent widens in minutes. The choosing stays with the team." Loop-back stays in the body. |
| Hear every idea before anything gets merged (file) | Hear every idea before anything gets averaged | 8 | One-word swap. *Averaged* is the physical verb and the body's: "before anything gets averaged". |
| Agents jump to solutions; the tree holds the opportunities (retitle) [Opportunities before solutions] | A solution can wear an opportunity's clothes | 7 | **Truth wobble on current:** body never says agents jump to solutions. Proposed borrows the body's image: "it is a solution wearing an opportunity's clothes" ("I want to go out to eat… is already a choice"). |
| The branch only one of you found (file) | The branch one of you found is often worth most | 2 | Orphan noun phrase → claim. Body: "The branch one of you found is often the one worth the most." *Often* kept. |
| The questions legal and your employee representative will ask (file) | Answer legal's questions before legal asks them | 3 | Label → the move, noun repeated. Body: "Better that your team has asked them first… Draft an answer to each." Do-move slide, so the imperative is licensed. Employee rep stays in the body. |
| It quoted the source, then added what wasn't there (retitle) [The agent read the source and still said more] | The summary reads better than the evidence | 2 | *Better* is the alarm, counter to common sense. Body: "It reads better than the evidence, and it hides what you most needed to see." Covers both stretch and smooth. |

Leave plain: *You cannot read it all, so read where you know most* · *One agent first; split only when it can't be one* · *The designer's piece…* · *The product owner's piece…* · *The team lead's piece…* · *Imagine it already failed*.

**Day 2 voice carriers:** *A faster feature factory is still a feature factory* · *The instructions are only one suspect* · *A solution can wear an opportunity's clothes* · *The summary reads better than the evidence* · *"Are you sure?" is another fluent answer*.

### Day 3

| Current | Proposed | Rule | Why |
|---|---|---|---|
| The first slice is the Day 1 assumption, tested (retitle) [Slice by what you need to learn] | The first slice tests what you are least sure of | 1 | Positional (callback to Day 1) → claim that stands alone. Body: "the first slice tests the assumption you are least sure of." |
| Compare the scoring agent with your own calls (file) | A scoring agent is one more thing nobody has tested | 2 | Imperative → demotion of the judge. Body's opening line, verbatim minus "second… with a different brief". |
| The signal you agreed decides your next bet, especially when it says no (retitle) [The agreed signal decides, especially when it says no] | A slice that came back no did its job | 5 | 13 words → 8. Relocates failure. Body: "A slice that came back no did its job." Echoes the narrator's "I used to think of being wrong as failure." |
| Monday: a proposal your team decides on (no body) | On Monday the team decides, not the three of you | 4 | Agenda label → who decides. Held at squint strength; matches "Sharing what you built…": "stays with three people until someone… asks the team to decide." Check against the body when written. |

Leave plain: *Specifying what to build is now the harder half* · *What each of us is for when building gets cheap* (restored in r5b on purpose) · *Future leadership is about strategy, outcomes and customers* (maintainer line).

**Day 3 voice carriers:** *A slice that came back no did its job* · *Access is easy; absorption is scarce* · *An agent's instructions are not the agent* · *The more you trust it, the less you notice* · *Will your organisation learn faster than the model changes underneath it?*

### Section titles (optional, same lens)

| Current | Proposed | Why |
|---|---|---|
| The digest is back | The digest is back, and it agrees with you | Orphan; the next slide's claim is the tension. |
| Keep what you learned | Write it down or lose it | Arc label → claim; matches "The agent stops where you stop writing". |
| Where you go from here | Leave as is | Closer; the last slide's question carries it. |
