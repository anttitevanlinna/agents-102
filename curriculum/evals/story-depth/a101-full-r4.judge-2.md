# Storytelling judge 2 — p2-after (paired, full training)

## Running notes

### A · M1 getting-going
- Plants: context is king / LLM mirrors stance ("Your stance is the ceiling." painting-the-picture); self-report is a hypothesis ("The report is a hypothesis to check, not ground truth." machine-you-just-met); errors stack until a check resets them; compounding ("The loop is the shape. The bug today was the excuse.").
- Earned naming: "You just ran the same loop ... Kieran Klaassen calls this compound engineering" (machine-you-just-met, after the four exercises).
- POV: trainer voice, terse, opinionated ("The wizard typing in neat Perl syntax is dead.").

### A · M2 plan-mode-done-right
- Complicates "check from outside": plan read = calibration move ("Push reach past what you can check and you have not delegated more. You are checking less." when-a-plan-is-good). Plants map (the-whole-map), double loop (how-instructions-grow), rules ceiling ("The work starts passing your rules and missing your point."). Prohibitions vs taste.

### A · M3 earn-the-trust
- "Don't make general what you don't practice yourself." (skills-from-the-frontier). "same-window self-charity" (author-test-strategy-skill). "The agent reasoned forward from the conversation, not from the filesystem." (threat-model-with-stride). Near-half closer names moves after the fact: "A name is a handle, not a lesson. Every law coming up is a move already made." (the-loop-half-filled). Governor: "Name the uncertainty before you move."

### A · M4 run-the-first-experiment
- Deliberate un-packaged send-off sets up the turn: "send it off plainly and you find out what you can't steer yet." (set-the-markers-send-it-off). "The more autonomy the agent earns, the worse a watcher you quietly become." (ironies-of-automation). "A tourist runs an agent and hopes; a practitioner runs a test and reads the data." (test-and-learn)

### A · M5 learn-from-the-test
- The turn: un-packaged run read through three lenses, re-sent packaged. "An unchecked session arrives confident, and wrong... The success report comes from the wrong harbor." (what-packaging-is). "A prediction is not a measurement." / "today's playbooks are candidates". "Green is a claim about the check, not a fact about the work." (the-gate-is-a-claim). "Retire what the next model outgrows."

### A · M6 spot-gaps-build-the-loop
- First-person signed narrator with scars: "I drifted in every one of the ways this story just walked." / "The agent I was working with had just finished writing those three modules. It still opened with the un-packaged shape." (story-of-module-6). Eval as measurement (composing-the-workflow). Close: "The kit compounds; the model rotates." / "nobody has that part figured out yet." (agents-that-build-agents)

### Learning-set A (Step 1)
1. Check from outside the session. Planted M1 machine-you-just-met "The report is a hypothesis to check, not ground truth."; complicated M2 when-a-plan-is-good "You are checking less."; M3 author-test-strategy-skill "same-window self-charity"; M5 the-gate-is-a-claim "Green is a claim about the check"; paid off M6 composing-the-workflow "One run tells you what happened. The measurement tells you what the system does." Depth 100.
2. Compounding. Planted M1 "The loop is the shape. The bug today was the excuse."; complicated M2 how-instructions-grow "Rules have a ceiling"; M3 the-loop-half-filled compound ladder; M6 exercise "Rules-files have a half-life"; paid off M6 "The kit compounds; the model rotates." Depth 100.
3. Context / stance is the ceiling. Planted M1 painting "Your stance is the ceiling."; complicated M1 orient "the context window is not your codebase"; M3 "reasoned forward from the conversation"; M5 context rot; paid off M6 story "A rule in context is not a rule in the output." Depth 90.
4. Experiment / local evidence. Planted M4 test-and-learn; complicated M5 "The missing evidence is local"; M5 "One session is a sample"; paid off M6 eval. Depth 80.
5. Trust vs vigilance / delegation frontier. Planted M2 frontier; M3 "how do you trust work you didn't watch?"; M4 Bainbridge; M5 frontier redux; M6 close weaker. Depth 80.
Headline ideas not developed: Godin taste (M1), STRIDE "value is rejection" (M3), Pocock skill system figure (M6), worktree two-window move (M3). A Depth ≈ 90.

### B · M1 getting-going
- Opens on Antti scar story, first person, signed: "A colleague has a name for how I work: steering without reading all the text. For a while I felt I had lost a common language with people who write the spec first" (context-is-king). Then the dinner demo, then exercise. Lecture pre-names "That's a guardrail. That's your turn." before the exercise (announced, then exercised). Exercise: "The LLM didn't get better between Phase 1 and Phase 6. The context did." (personal-site-with-guardrails). Plants self-report hypothesis: "The report is a hypothesis, not a result" (what-just-happened). Stance: "Nobody knows where agents are going, not Anthropic, not your board." Debrief cold critic: "Your read outweighs the agent's."

### B · M2 building-agent-systems
- Plants system = persistence + automation; compounding earned: "The thing a chat can't do is Phase 3... The second batch made the first batch better. That is compounding." (compounding, named AFTER exercise). "The model will change. Your memory will not." Scheduled agent homework: a week of mornings, "Comical or wrong days: what was missing from the memory?" Narrator absent after M1.

### B · M3 multi-agent-systems
- Exercises: crux, three retrievers, three stances (Rumelt kernel). Lecture after: "Start with don't... Default to one agent with a good prompt." (when-to-split-an-agent) — the module Big Idea ("Hire three agents...") is contradicted by the lecture headline; the student's lived move is splitting, the lecture's lesson is don't split. Plants the doubt: "The doubt stays. Hold it." / "You can't yet tell if the answer is right. That is expected." (three-minds-one-synthesis) — a plot hook paid off in M5.

### B · M4 security
- Unease beat: "The uncomfortable feeling is the evidence." (audit-your-agent). Stance: "Certainty is not on offer." "Scope it down far enough and the system is safe and useless. You pick it, write down what is left, and sign for it." "Expect it to cost you a feature." (practice-of-risk). Lone narrator flash: "Damn, this is complex stuff." Reversal of M1-3: "You have given the agent more... Now give it less."

### B · M5 output-quality
- Rescue: hallucination bake-off on own M3 briefing; closes the M3 doubt: "Ask the agent to run it once on your ./crux.md answer, the one Module 3 left you doubting." (hallucination-bakeoff). Prework cases Mata/Deloitte (others' failures, not narrator's). "Fluency is not evidence" / "Verification has to leave the generation loop and touch the source." Big Idea line is method ("keep the winner") not grounding. Grounding stated in grounded.md "There is truth out there."

### B · M6 evaluations
- Leverage beat: loop runs while student walks away; integrity SHA check in exercise ("If the judge file moved, the exercise failed" eval-loop). Self-doubt of own tool: "Nothing scores the judge." / "If the model stops fabricating, what is your judge for?" (when-the-score-stops-moving). Bainbridge echo without the name: "The better it gets, the less you watch" (new-human-role-in-the-loop). Recap of M1-M5 as parts: "Each was one decision about what you give the agent and what you keep back." Mollick question posed in module, never answered.

### B · M7 personal-to-team
- Second Antti scar, first person, signed: "The proposal got neither a yes nor a no... Companies, even when they go agentic, work first and foremost on the human principle." (access-is-not-absorption). Stance: "'Share the whole agent' is not on the list." (share-your-work); "the product being sold as a shared agent is always three of the four parts" (access-is-not-absorption). Exercises are agent-writes-files (jtbd.md, branch.md, monday.md); the prework example of access-without-use is never opened in an exercise.

### B · M8 agents-building-agents
- Flywheel: "The second agent takes ten minutes, because your vocabulary for what you want is sharper. That is the compound." (extend-your-system). Forum pays off access/absorption: "Open the kernel and count how many folders it cites. That ratio is your rollout in miniature." (where-is-this-all-going). Forward question, self-including: "Nobody in this room knows yet, including the people running this training." Close re-opens the M3 doubt: "nothing in the room checked it. Hold that doubt." Scripted identity line by sponsor ("You are now agent builders") tells rather than shows.

---

## Frame

**A — 93.** Frame: *agentic engineering is engineering* — the agent is a closed-loop controller, and your job is the feedback signal, the verification and the compounding. Load-bearing in every module, and it names where it breaks.
- M3 the-loop-half-filled: "The agent loop is a **closed-loop controller**. ... Cut the feedback signal (a test, a check, a read) and it drifts."
- M4 ironies-of-automation: "This is a 1983 argument, not an AI take. Lisanne Bainbridge, studying industrial automation..."
- M5 the-gate-is-a-claim: "**Goodhart's law:** when a measure becomes a target, it ceases to be a good measure. The agent is an optimizer aimed straight at your gate"
- Where it breaks: M5 what-packaging-is "Whether this field ever settles into a real best practice is an open question."; M5 the-gate-is-a-claim "Sutton's **bitter lesson** ... Today's right procedure, your gates and workflow, yours or the agent's, is superseded too."
M2/M3 map (the-whole-map, the-loop-half-filled) makes the frame visible; the map is a little heavy late (M6 figures-only slides) — not 100.

**B — 82.** Frame: *an agent is parts you assemble — context first, then memory, stances, boundary, checks, loop, interface — and every part is a decision about what you give it and what you keep back.* Stated early, recapped at M6, closed at M8; M4's reversal only makes sense through it.
- M1 context-is-king: "Context is the first piece of the agent. Tools, goals, checks, boundaries, and loops come later and depend on it."
- M4 practice-of-risk: "You have given the agent more: context, memory, more stances. Now give it less. More context makes a good answer likelier. Less access makes a bad answer smaller."
- M6 new-human-role-in-the-loop: "The full picture: model, context, tools, goal, loop, checks, boundary, interface. Each was one decision about what you give the agent and what you keep back."
- M8 where-is-this-all-going: "The parts are stable ... What the model can do with each part moves on the vendor's release schedule." Breaks: "Which half of this is obsolete next year?"
Below A: M3 (multi-agent) and M7 (sharing) read through it only loosely — M7's "You can't really share an agent" is a second frame (accountability) bolted on; the parts list is mostly told in recaps rather than seen module by module.

## Narrative

**A — 93.** Five sentences: An engineer arrives with tricks and learns that the machine mirrors them and its reports are hypotheses. They learn to read plans and build skills, the near half, where feedback is quick. Then they deliberately send a long task off un-packaged and it comes back confident and wrong. The turn: they read the return through three lenses, build the check that would have caught it, and re-send packaged. Then the author shows the training itself drifting the same way while being written, and hands the loop over.
- Turn, M4 set-the-markers-send-it-off: "send it off plainly and you find out what you can't steer yet."
- Turn, M5 what-packaging-is: "An unchecked session arrives confident, and wrong. ... The success report comes from the wrong harbor."
- Training's own failure, M6 story-of-module-6: "The training teaches this pattern across three modules. The agent I was working with had just finished writing those three modules. It still opened with the un-packaged shape."
Hits the 100 anchor on the failure; minus a little because M6's map-figure slides and the two-frontier recap thin the close.

**B — 83.** Five sentences: A leader who uses chat makes a personal site and sees context make it theirs. They build a memory and a scheduled agent, then split work across agents and get a confident answer they cannot verify. Security shows them that certainty is not on offer. The turn: they benchmark detectors on their own briefing and run the winning judge on the answer M3 left them doubting, then put that judge in a loop that improves while they walk away. They take it to the team, where access proves not to be absorption, and leave with a flywheel and the doubt still held.
- Plant, M3 three-minds-one-synthesis: "You can't yet tell if the answer is right. That is expected. Name the doubt; don't fix it here." + Debrief "The doubt stays. Hold it."
- Unease, M4 audit-your-agent: "The uncomfortable feeling is the evidence." / "The risk remains. That is expected."
- Rescue (the turn), M5 hallucination-bakeoff: "Ask the agent to run it once on your `./crux.md` answer, the one Module 3 left you doubting."
- Close, M8 where-is-this-all-going: "The kernel came out of the same move as your first briefing: agents read, agents argued, something chose, and nothing in the room checked it. Hold that doubt."
The turn is lived on the student's own artefact (80+). Not higher: the turn is not the training's own failure; M7's Antti story is a failure but sits in a side lecture; the M3 Big Idea ("Hire three agents to search") and the M3 lecture ("Start with don't") pull the plot in two directions at the doubt beat.

## Point of view

**A — 95.** Antti, trainer and practitioner, who wrote the course with agents and drifted while doing it; terse, field-voiced trainer throughout, first person and signed in M6.
- M1 painting-the-picture-with-the-llm: "The wizard typing in neat Perl syntax is dead. Auto-complete was a thing."
- M6 story-of-module-6: "Five taste reversals from me on Claude's confident recommendations."
- M6 story-of-module-6: "I drifted in every one of the ways this story just walked. I fixed what I caught. The loop caught what I missed." — narrator's own failure on the page, at length.
- Present between: M3 the-loop-half-filled "A name is a handle, not a lesson." (trainer to room).

**B — 74.** Antti, a builder leader ahead of his peers, who works by steering ten iterations rather than spec-first and has seen an agentic redesign die in a decision meeting. Two signed passages, a few lines between, absent M2–M6 as a person.
- M1 context-is-king: "For a while I felt I had lost a common language with people who write the spec first and meet to agree on it. Their meetings are how they iterate. Mine happen with the agent."
- M7 access-is-not-absorption: "At the start of 2026 I set out to redesign a whole value stream with agents. ... The proposal got neither a yes nor a no." — a failure of his own initiative, though framed as the organisation's non-decision rather than his miss.
- M4 practice-of-risk: "Damn, this is complex stuff." (a voice in an aside)
- M8 where-is-this-all-going: "Nobody in this room knows yet, including the people running this training."
80 anchor met at M1/M7; the long middle (M2–M6) is second-person instruction with no one behind it, so the narrator does not carry the plot's turn — which is why it stays under 80.

## Stance

**A — 92.**
- "A rule in context is not a rule in the output" — defended with a scar: M6 story-of-module-6 "Same rule, same rules file, same task, four separate violations across four independent LLM instances."
- "The model ... gives you a forecast, not a measurement" — mechanism: M5 what-packaging-is "a well-read average of what other people published about other repos, frozen at a cutoff ... **A prediction is not a measurement.**"
- "Green is a claim" — M5 the-gate-is-a-claim "A gate nobody has verified is a gate trusted on vibes."
- Against commercial interest-ish: M5 the-gate-is-a-claim "Retire what the next model outgrows" (its own playbook expires); M2 how-instructions-grow "This training stops short of the full system".

**B — 87.**
- "Share the whole agent is a vendor pitch" — mechanism: M7 access-is-not-absorption "An agent is context, a boundary, a set of checks and somebody who answers for what it does. The first three copy in an afternoon. The fourth does not copy at all"; M7 share-your-work "*'Share the whole agent'* is not on the list."
- "Certainty is not on offer" — mechanism: M4 practice-of-risk "The attack surface is the instruction set. Well-formed English in a document your agent reads can make it *decide* to do something harmful"; "Expect it to cost you a feature."
- "Nobody knows where agents are going" — M1 what-just-happened "Nobody knows where agents are going, not Anthropic, not your board." / M8 "including the people running this training."
- Against commercial interest: M3 when-to-split-an-agent "Start with don't. Default to one agent with a good prompt." in a module that sells multi-agent systems; M8 "Know it before you promise a board a percentage."
- Leadership-scar stance, M7: "Companies, even when they go agentic, work first and foremost on the human principle."
Under A: several positions are asserted in one line ("Nobody knows where agents are going") and are defended only by the M8 echo, not with a mechanism.

## The pair

**A:** someone who has been there. Doubts own tools (M5 the-gate-is-a-claim "The check you built is itself a claim that wants verifying"; M3 author-test-strategy-skill "The grade is biased by design") and holds ground (M6 "A rule in memory that does not force is worse than no rule.").
**B:** someone who has been there, slightly leaning to doubt. Doubt: M6 when-the-score-stops-moving "Nothing scores the judge."; M8 "Hold that doubt." Ground: M7 "not on the list"; M4 "You pick it, write down what is left, and sign for it." The M7 scar keeps it from reading as a hedge.

## Room

The exercises carry most of the B story: the doubt is planted, the unease felt and the rescue run on the student's own files. The lectures name the move afterwards. The exception is M7: there the turn is told in Antti's lecture and not lived.
- **Strongest 1, M5 hallucination-bakeoff Phase 5:** "Ask the agent to run it once on your `./crux.md` answer, the one Module 3 left you doubting. Write one line in `./crux.md`: what the judge caught, or what it could not check." The rescue happens on the student's own artefact, two modules after the doubt.
- **Strongest 2, M1 personal-site-with-guardrails:** Phases 1→6 on the student's own LinkedIn, then "The LLM didn't get better between Phase 1 and Phase 6. The context did." The idea is earned in their hands. (Runner-up: M4 audit-your-agent "The risk remains. That is expected. Name it, accept it on record, and stop there.")
- **Weakest 1, M7 share-your-work / design-the-sharing-plan:** the agent writes `jtbd.md`, `branch.md` and `absorption-bottleneck.md`, and the student spot-checks them ("Read `module-7/branch.md`"). The prework example ("where people got access to a tool and did not use it") is never opened. Access ≠ absorption arrives through the lecture's story, not through the room.
- **Weakest 2, M3 three-minds-one-synthesis:** the beat is a single prompt and a "Close. Does this feel right?" line. The lecture that follows ("Start with don't ... If one agent can produce what you need, use one") contradicts what the student just did, and nothing in the exercise asks whether one prompt could have done it. (Also weak: M8 joint-double-diamond, where the sponsor recites "You are now agent builders", a told identity.)

## Depth

### A (Step 1 set above): 100, 100, 90, 80, 80 → **90**.

### B learning-set
1. **Context is what makes it yours, and what nobody wrote down, the agent cannot use.**
   Planted M1 context-is-king: "The first exchange became context."
   Complicated M2 compounding: "Context shapes output, at system scale." and "Most of what you know about your company sits in heads and corridors."
   Complicated M4 practice-of-risk: "More context makes a good answer likelier. Less access makes a bad answer smaller."
   Complicated M6 new-human-role-in-the-loop: "what you give the agent and what you keep back".
   Paid off M8 where-is-this-all-going: "What your company knows about its own work gets better only when somebody writes it down and somebody else picks it up."
   Governor: none in one sentence. Depth **95**.
2. **The output can't vouch for itself; the check has to leave the loop.**
   Planted M1 what-just-happened: "The report is a hypothesis, not a result".
   Complicated M3 Debrief: "It does not check whether the briefing is true."
   Complicated M4 Big Idea/practice-of-risk: "'I can't tell' is a real answer."
   Complicated M5 grounded: "'Are you sure?' is another fluent answer".
   Complicated M6 eval-loop/when-the-score-stops-moving: "If the judge moved, the score means nothing." and "Nothing scores the judge."
   Paid off M8: "nothing in the room checked it. Hold that doubt."
   Counter-voice present. Depth **100** (braided with L1 and L5).
3. **You move up a level: design the loop, own the yardstick, and keep reading the work yourself.**
   Planted M2 Debrief: "Your agent is 'right' when it works."
   Complicated M6 evals-as-steering: "You can stay inside one loop. You cannot stay inside all of them."
   Complicated M6 new-human-role: "The better it gets, the less you watch".
   Paid off M8: "You described it; something else built it."
   Depth **75**.
4. **Variety in, selection out.**
   Planted M3 when-to-split: "Different stance. Agents should disagree."
   Complicated M5 grounded: "Four candidates that fail differently".
   Complicated M6 new-human-role: "The three stances and four detectors are the generating half."
   Paid off M8 joint-double-diamond: "Do not average the room."
   Depth **80**.
5. **Access is not absorption.**
   Planted M7 access-is-not-absorption: "Access is a switch somebody flips".
   Paid off M8 where-is-this-all-going: "Count the folders the kernel cites ... That ratio is your rollout in miniature."
   Depth **60**.

B Depth = (95+100+75+80+60)/5 = **82**. Carry share 100/410 ≈ 0.24, broad rather than concentrated.

**Progression, B** (cumulative depth rung after M1–M3 · after M4–M6 · after M7–M8):
- L1 context: 60 · 80 · 100
- L2 check leaves the loop: 60 · 80 · 100
- L3 human one level up: 40 · 60 · 75
- L4 variety/selection: 40 · 80 · 80
- L5 access ≠ absorption: 0 · 0 · 60 (late plant, one beat; this is the stall)

**Headline ideas, not developed (B):** M5 Big Idea "keep the winner" is a method, while the grounding idea ("There is truth out there", M5 grounded) never returns as such. The M5 grounded "Mostly right, ten times over" arithmetic is not used again. M6 Mollick bitter-lesson-vs-garbage-can is posed and never answered or echoed by name. The M5 autonomy ladder is only a pointer. PDCA appears in M6 eval-loop only. Sources/processing/boundary appears in M3 debugging-stuck-agents only. M8 "Three walls past the laptop" appears once. M1 StoryBrand/via negativa are exercise tools only.

## Scores

| factor | A | B |
|---|---|---|
| Frame | 93 | 82 |
| Narrative | 93 | 83 |
| Point of view | 95 | 74 |
| Stance | 92 | 87 |
| Depth | 90 | 82 |

## Smallest moves for B

1. In M3 `three-minds-one-synthesis.md`, end with one beat asking the student whether a single prompt could have produced the same `## Answer`, so the lecture's "Start with don't" names a move they just made instead of contradicting it.
2. In M7 `share-your-work.md`, open by having the agent read the student's own prework example of access-without-use against `jtbd.md`, so absorption failure is lived before Antti's story names it.
3. In M8 `joint-double-diamond.md`, replace the sponsor's scripted "You are now agent builders" line with the student reading out their own count of folders the kernel cites, so the identity close is earned from evidence.
4. Place one short first-person Antti sprawl/overreach passage in the middle of the arc (M3 `when-to-split-an-agent.md` or M4 `practice-of-risk.md`), so the narrator is present through the doubt-and-rescue stretch and not only at M1 and M7.
5. In M6 `eval-loop.md` Phase 3, have the student hand-score three outputs beside the judge's verdicts, so "Nothing scores the judge" in `when-the-score-stops-moving.md` names something they just did.
