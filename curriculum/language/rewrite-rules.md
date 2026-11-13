# Whole-slide rewrite rules (Agents 101)

Prompt input for `scripts/slide-rewrite.js`. Sources: maintainer's calls-page answers 2026-11-01 (verbatim steers quoted), `curriculum/evals/mechanical/persona-student/taste-rules.md` v2, AE101 point-of-view frames, writing + student_facing rule leads. The maintainer rates current text 3/5; target 4+.

## Glance budget
The handbook is a map the student glances at between Claude Code sessions; the main training happens in Claude Code and the prompts. Maintainer 2026-11-01: "the information / word count is quite wordy still. ae101 has been compacted, compacted. This is quite important as training slides need to be able to be glanced." Density over polish. Each unit gets a word budget (prompt states it); meet it by cutting whole sentences and merging, never by dropping an instruction the student needs to run the step. A slide carries one idea.

## The test for every sentence
Does this sentence help the student execute the learning on their own? (maintainer: "Good test: does the paragraph / sentence help student execute the learning on their own?") No → cut. Most fixes are cuts, not rewrites.

## Cut
- Narration of what the student did, has, felt or now holds ("You just ran", "Eight modules of compounding sit on disk", "The unease you feel"). Maintainer: "cut narration", "B has just non-value-add narration".
- Forward narration about later modules or later beats ("Module 6 turns this into...", "Sets up the Extend exercise"). Maintainer: "cut forward narration unless there is absolute need in current module." Keep one only when the current step needs it as its reason.
- The training describing itself: modules, exercises, the arc, "this module is the rescue". Modules do not "add" or "do" anything (maintainer: "Modules don't 'add'. Come on.").
- "No/not" sentences that restate the previous sentence's point in negative form ("A plan with no wall in it was written about a laptop."). Maintainer: "these 'no' sentences usually add no value."
- A follow-up sentence weaker than the one before it (maintainer: "Added sentence is less powerful than previous", "just fluff").
- LLM-clever lines: witty one-liners, rhetorical questions, abstract decoration, aphorisms that mean nothing on inspection ("toy", "Unglamorous, isn't it?"). Maintainer: "Tries be clever but not at all helpful", "Lots of abstract decoration that does not move the real understanding."
- Threat-of-next-module or gap motivation. Describe the possible future, never the student's deficit.
- Teaching mechanics a professional already has (how to type, how to open a file). Maintainer: "WHY are we teaching people how to type?"

- A closing sentence that adds little once the point is made.

## Rewrite
- No human verbs for what people grant agents (agents do not "earn" autonomy or trust; people grant access).
- Keep a concrete action, but say it in the fewest words.
- Split a long sentence at its comma when the halves are separate claims.
- No "ship" framing for the student's work: the work gets better on main all the time.
- A metaphor must fit its noun: a map is a map, not a "container" or a "place to hang moves".
- Name the thing instead of "it"/"this"/"that" when the referent is not in the same sentence. Maintainer: "I have been removing the use of 'it' quite a lot."
- Short paragraphs a reader can take in at a glance: 1-3 sentences. Maintainer: "A has too long a paragraph to easily glance", "Both way too long paragraphs."
- Slide openers state the point plainly. Maintainer: "A has unclear first sentence."
- Explain how the machine works instead of gesturing at it: what a tool is, what context is, what the agent reads. Maintainer: "Training needs to explain what are tools and how they work."
- The student steers the agent with context; the agent does the work. Never frame the student's job as writing text for the agent ("what you wrote down" is wrong: "Sounds like writing a lot of text for the agent. Wrong."). Maintainer: "You steer your agent with context."
- Never assume the student would skip work they chose ("actually read it", "on Monday"). Tell them how to spot the right result instead.
- Neutral register. No put-downs of current work or past practice ("explain the future, don't put down the current"). Classic security is a risk-based approach; describe it that way.

## From the maintainer's own AE101 cut sessions (taste-notes.md, 2026-11-01)
- Coined words become plain words ("governor", "boundary fires", "rails").
- The aphorism after the point goes.
- Duty framing ("you owe", "you must") becomes permission.
- A count becomes a frame the student controls.
- Hyperbole goes. Slides about the course itself go. The third example goes.
- A clause is added only when it makes a claim true. Name the actor ("It" becomes "The LLM").
- Orientation lines and numerals get no blanket protection; each earns its place.

## Words
- Banned: "lands" (as metaphor), "muscle", "shape" (say "option"), "prove" (software proves little), "honest", "crucial", "delve", "leverage", "substrate", "landscape" as verb, "importantly". No em-dashes.
- No invented concepts ("agent file", "the wall"). Use Claude Code's real primitives: session, context, CLAUDE.md, memory files, skills, subagents, hooks, tools, MCP.
- "you", never "the student". Plain business English; earn any tech word on first use.

## Keep
- Every instruction the student needs to do the task, every number they must remember, every reason for a step.
- The trainer speaking to the room about pace and choice ("Your call.", "That's fine.", "That is expected.").
- First-person scar stories and the maintainer's own lines, verbatim.
- A metaphor the training builds and returns to (e.g. painting with an agent).
- Point of view frames that work: where this is going; it is your work; how the machine works; the theory; the trainer to the room.
