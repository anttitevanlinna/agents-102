# a101-full-r6 — storytelling judge 1

Paired, full-training read. A = AE101 (read first), B = Agents 101. Source: `scripts/read-training.js` student view.

## Running notes

### A · M1 getting-going
- Plants: context steers the answer ("Context is King", the-wizard-move); "The LLM mirrors your stance ... Your stance is the ceiling" (painting-the-picture); self-report is a reconstruction ("Assume about 10% ... made up", orient-and-introspect); compounding ("every push-back is a hint toward your own rules", compound-and-close).
- Naming after move: the-machine-you-just-met "You just ran the same loop ... Kieran Klaassen calls this **compound engineering**"; "That is why the failing test came before the fix." Earned.
- Frame seeds: errors stack until a check resets them (error cascade) = feedback-control lens. "That is the machine. The rest is steering."
- Narrator: impersonal, declarative; no "I". Self-challenge: escape-hatch prompt, "its agreement settles nothing".

### A · M2 plan-mode-done-right
- Complicates check-lens: plan read as calibration move; "Push reach past what you can check and you have not delegated more. You are checking less." (when-a-plan-is-good). Three pressures.
- Complicates compounding: rules have a ceiling ("The cure is not better rules; it is where the rules live", how-instructions-grow); double loop (Argyris); "Prohibitions stop; taste steers"; "A rule that doesn't load doesn't exist".
- Self-challenge: "This prompt is fair to read as replacing the file ... Precise prompting is harder than it looks." Agents build agents seeded (where-the-rule-could-live).

### A · M3 earn-the-trust
- Big Idea: "Trust isn't watching harder. It's verification you can run without being there."
- Stance: "STRIDE without an access-surface map is pub-quiz threat modeling"; "Don't make general what you don't practice yourself"; "Authoring without invocation is theatre."
- Self-doubt on own tools: "The grade is biased by design ... same-window self-charity"; ADR landing in worktree: "The agent reasoned forward from the conversation, not from the filesystem." (pays off M1 chat-is-an-abstraction).
- M3 close (the-loop-half-filled): naming after moves: "A name is a handle, not a lesson. Every law coming up is a move already made." Laws: closed-loop controller, local success/global drift, compound ladder, double loop. Governor: "Name the uncertainty before you move." "Control is interrogation." "The branch is the permission." Turn seeded: "how do you trust work you didn't watch?"

### A · M4 run-the-first-experiment
- Turn set up: un-packaged send-off, "send it off plainly and you find out what you can't steer yet"; "A tourist runs an agent and hopes; a practitioner runs a test and reads the data." (test-and-learn)
- Bainbridge: "The more autonomy the agent earns, the worse a watcher you quietly become" (ironies-of-automation), a counter-voice against the training's own direction. Mollick pre-read: "Mollick does not call the winner. Neither does this training ... claims like that expire."

### A · M5 learn-from-the-test
- Turn lived: read own failed run through three lenses; "Diagnose first ... each failure you find earns the check that would have caught it" (reading-the-return). Sea passage: "An unchecked session arrives confident, and wrong ... The success report comes from the wrong harbor." (what-packaging-is)
- Stance: "Steer it as hard as you like: what it holds about your next run is a forecast." "A prediction is not a measurement." "today's playbooks are **candidates**."
- Self-challenge on own tools: "The gate is a claim too ... Green is a claim about the check, not a fact about the work"; Goodhart; Deming tampering; bitter lesson: "Today's right procedure, your gates and workflow ... is superseded too." Frame names where it breaks.
- Wall named: "prove it on yourself, then promote."

### A · M6 spot-gaps-build-the-loop
- Payoff: cut a rule ("Rules-files have a half-life"); eval = pass rate; workflow of skills; handoff prompt (agents build agents).
- POV peak: story-of-module-6, first person, Antti signs. "I drifted in every one of the ways this story just walked." "The loop caught what I missed. A senior-persona sim caught what the loop missed." "A rule in context is not a rule in the output." Training's own failure (M5 move skipped by the agent that wrote M5) is on the page.
- Close: "There is no last turn ... The kit compounds; the model rotates." "nobody has that part figured out yet."

### A · learning-set (draft)
1. Checks, not reading, are control (errors stack M1 → plan read as calibration M2 → control is interrogation M3 → un-watched session M4 → gate is a claim / Goodhart M5 → eval pass rate M6). Depth 100.
2. Compounding: session → disk (CLAUDE.local M1 → rules ceiling + double loop M2 → skill rung M3 → observations M4 → done-done in CLAUDE.md M5 → cut a rule, handoff prompt M6). Depth 100.
3. The agent's account is a hypothesis (10% M1 → plan structure persuasive M2 → self-grade biased M3 → report from wrong harbor M5 → story-of-M6). Depth 90.
4. Local evidence beats the field's best practice (prediction vs measurement M5 → bitter lesson → two frontiers M6). Depth 70: planted late.
5. Personal → team wall (CLAUDE.local "parks the bigger question" M1 → skill team PR M3 → wall M5 → "Cross personal → team" M6). Depth 70: closer states, no team move exercised.

### B · M1 getting-going
- Narrator opens in first person, signed: "I approach almost all my work with agents now ... A colleague has a name for how I work: steering without reading all the text. For a while I felt I had lost a common language" (context-is-king). Scar = social, not a failure.
- Exercise-first is partial: the context lecture runs BEFORE the site exercise; "That's a guardrail. That's your turn." Then what-just-happened names it after: "The LLM didn't get better between Phase 1 and Phase 6. The context did." Good earned beat.
- Plants: context; self-report is a hypothesis ("Grading its own work is another chance to be helpful"); stance "Nobody knows where agents are going, not Anthropic, not your board. The people who figure it out first run the experiment."; "Mental models only come from doing." Student as hero: own LinkedIn, "Iterate until you say 'yes, this is me.'"
- Debrief cold critic: "Your read outweighs the agent's." Rules-file loop "do the work → capture → reflect → sharpen".

### B · M2 building-agent-systems
- Frame lands: chat vs system. "Stop chatting. Build a system." "Your performance is about the next hundred sessions, not this one." Narrator scar-ish anecdote: agent factory "They said: we have a few problems to solve." (repeated from M1 cover; second use pays it off: "problem four costs what problem one did").
- Lived beat: Phase 5 side-by-side bare vs built agent → close.md; compounding named after Phase 3 ("The thing a chat can't do is **Phase 3**"). Earned.
- "The model will change. Your memory will not." Forward claim, asserted (prediction-shaped). Scheduled agent homework: a week of observation; "Comical or wrong days: what was missing from the memory?"

### B · M3 multi-agent-systems
- Crux (Rumelt), retrievers, three stances, kernel. Lecture names after: "Six agents worked on one question in this module ... None of them talked to each other." Earned.
- Strongest planted doubt: "You can't yet tell if the answer is right. Nothing checks it yet. Pick the line of `## Answer` you trust least and freeze ... Module 5 checks this exact file, doubted line included." + "The doubt stays. Hold it." = mood arc unease, carried forward explicitly.
- Handoff error "stacks through the steps after it" (echo of error-stacking but unexplained). "Split for a reason ... Could one prompt produce the same quality? Then write that one prompt." Self-challenge on own move.

### B · M4 security
- Big Idea: "You can't tell if your agent is safe from its output." Guess-first beat: student writes a guess, report sets it beside the check: lived unease. "The uncomfortable feeling is the evidence." "The risk remains. That is expected. Name it, accept it on record, and stop there." "Certainty is not on offer." Stance via mechanism: "A tool call is text crossing a boundary into action" (agent-loop-raw).
- Escalate to a person: honest limit of the tool.
- practice-of-risk: strongest stance in B so far, against own commercial interest: "It costs whoever sells you agents too, this training included: an agent that reaches less is a smaller thing to sell, and it is still the right call." "Damn, this is complex stuff." (narrator voice). "safe enough, under these conditions, within these limits, for now."
- M4→M5 pre-read: Mata v. Avianca, Deloitte: "It verifies inside the same fiction."

### B · M5 output-quality
- Payoff of M3 doubt: "In Module 3 you marked one line of the briefing you doubted. The judge now reads the whole briefing ... You decide whether the doubt was right and whether the judge caught it." Rescue lived in exercise.
- Student marks five claims before the scorer (independence move). Bakeoff = "Don't pick a method. Run the candidates. ... Advice won't tell you what it misses on your material." (parallels AE101 "prediction is not a measurement").
- Narrator: "I stopped reading full documents at work some time ago ... A line on my CV is a claim." Ties back to M1 cover ("steering without reading all the text"): POV braided.
- Error-stack numbers stated here (85% ×10 ≈ 20%), after M3 handoff mention: complication of M3 "error stacks". Judge "names its own limit" = self-challenge built into artefact.

### B · M6 evaluations
- Loop: judge fixed, tactic rewritten, score rises "with nobody editing"; remarks.md lets student taste ride in. Spot-check judge vs own marks (from M5). Counter-voices: "When the score stops moving ... your judgment comes back in"; "If the model stops fabricating, what is your judge for? ... No release so far has told anyone what good means in your company." (forward question, good).
- Narrator failure on page: "## I drifted too ... five reversals ... four leaks of a banned word ... A check loop caught what the helpers missed. I caught what the loop missed." Compressed port of AE101 story-of-M6, ~60 words, in a lecture, not a passage.
- Bainbridge port: "The better it gets, the less you watch ... When did you last read one yourself?" Governor with a date.
- "The human moves one level up ... design the loop and own the yardstick." Frame payoff. new-human-role recap list Module 1..5 = recap more than braid.
- Order check: M5 (grounded before bakeoff) and M6 (evals-as-steering before eval-loop: "the score rises with nobody editing") name the result before the student does it. Against intended shape.

### B · M7 personal-to-team
- Exercise first, lecture after: good. Lived failure: "You gave them your agent, and it did not work for them. The skill did." (share-your-work). Stance: "*'Share the whole agent'* is not on the list." "A candidate picked because it fits the infrastructure is shopping."
- Narrator passages, signed, two scars: value-stream redesign "The proposal got neither a yes nor a no." and the quota loop "It started about 33,000 sessions of its own ... That someone was me, and I was away." Narrator's own failure on the page, as a passage. Mechanism: "Accountability is the part with a name on it, and a name does not travel inside a folder."

### B · M8 agents-building-agents
- Pays off M7 failure: "In Module 7 your neighbour could not use your agent. Describe an agent for what they needed." Forum = room-scale. Close question "What is going to be the next hard part about agents?" + "Will your organisation learn faster than the model changes underneath it?"
- Stance against own commercial interest: "We could have spent today building you one impressive agent. It would have demoed well and been the wrong thing to sell you."
- Weak: "Each agent you describe is built faster than the last" and "a hundred agents is a matter of describing them" asserted, never measured on page (pitch register). Dangling referent: "The SHA check in Module 6 was that rule": no SHA check appears on M6's student surface (grep of the student view: one hit, this line; if it lives in a prompt body, the page still never names it).

---

## Frame

**A (AE101) — 95.** One sentence: *agentic engineering is engineering: a closed feedback loop whose quality is set by the checks outside the session, compounding into durable files.*
- M1 `the-machine-you-just-met`: "A check from outside the session resets the chain. A failing test does not care how confident the answer sounded." The tests-first exercise only makes sense through it ("That is why the failing test came before the fix.").
- M3 `the-loop-half-filled`: "The agent loop is a **closed-loop controller**. (Work) It acts, observes the result, and corrects. Cut the feedback signal ... and it drifts." The two-window side quest and the delta note only make sense as control moves ("**Control is interrogation.**").
- M5 `what-packaging-is`: "**A check is a position fix**. At a fix the wedge of possible states collapses to a point." Packaging is the frame turned into kit.
- Where it breaks, on the page: M5 `the-gate-is-a-claim`: "Green is a claim about the check, not a fact about the work"; "Sutton's **bitter lesson** ... Today's right procedure, your gates and workflow, yours or the agent's, is superseded too." The frame names its own expiry. Not 100 only because the near-half/far-half map is sometimes carried by figure keys the student reads as captions.

**B (Agents 101) — 86.** One sentence: *stop chatting, build a system: context on disk, read by agents, checked, looped, and shared, so you and your organisation learn faster than the model changes.*
- M2 `compounding`: "Stop chatting. Build a system. ... Your performance is about the next hundred sessions, not this one." The memory build and the bare-vs-built side-by-side in `build-your-challenge-memory` Phase 5 only make sense through it.
- M3 `when-to-split-an-agent`: "Each agent writes what it found to a file. The next agent reads the file, not the other agent's mind." Multi-agent work is the system frame at team scale.
- M6 `new-human-role-in-the-loop`: "The destination is not 'the human disappears.' You move one level up: you design the loop and own the yardstick."
- M8 `where-is-this-all-going`: "Will your organisation learn faster than the model changes underneath it?" The frame lands at org scale.
- Where it breaks: M7 `access-is-not-absorption`: "Companies, even when they go agentic, work first and foremost on the human principle. Today, at least." and M4 `practice-of-risk`: "Scope it down far enough and the system is safe and useless." Present, but M4 and M5 read more as adjacent topics (security, hallucination) than as cases of "system"; the frame is re-stated at M6 by recap ("Sounds like it came from your world (Module 1) ... (Module 5)") rather than carried through those modules.

## Narrative

**A — 93.** Story: An engineer meets a steerable machine and learns to leave something behind each session (M1). They learn the first plan is plausible, not good, and that rules need a home (M2–M3). Then they send a long task off un-packaged and step away (M4). **Turn:** it comes back confident and wrong; they read their own failed run through three lenses and build the checks that would have caught it (M5). They diff the two runs, cut a dead rule, and hear the author admit the same drift happened while writing this module (M6).
- M4 `set-the-markers-send-it-off`: "**The point:** send it off plainly and you find out what you can't steer yet."
- M5 `diagnose-and-resend`: "The un-packaged run was supposed to underdeliver. What came back is data, not blame."
- M5 `what-packaging-is`: "An unchecked session arrives confident, and wrong. ... The success report comes from the wrong harbor."
- M6 `story-of-module-6`: "The training teaches this pattern across three modules. The agent I was working with had just finished writing those three modules. It still opened with the un-packaged shape." The turn is the training's own failure, on the page; held from 100 by the M1–M3 stretch being topic-shaped.

**B — 86.** Story: A leader paints a personal site by context and feels the joy of it (M1), then builds a memory and a system around a real challenge (M2). Six agents produce a briefing, and the student freezes the line they trust least: "Nothing checks it yet" (M3). Unease deepens: they guess their system is safe and the check disagrees; two public cases show what an unchecked LLM costs (M4). **Turn:** a benchmark they ran themselves rescues the doubted line, and the judge, put in a loop, improves the work without them (M5–M6). Then their agent fails in a neighbour's hands; they learn sharing is a strategy, and an agent builds the agent the neighbour needed (M7–M8).
- M3 `three-minds-one-synthesis`: "You can't yet tell if the answer is right. Nothing checks it yet. Pick the line of `## Answer` you trust least and freeze the briefing with that line beside it. Don't fix it."
- M5 `hallucination-bakeoff`: "In Module 3 you marked one line of the briefing you doubted. The judge now reads the whole briefing, and you see its verdict on that line beside the evidence."
- M7 `share-your-work`: "You gave them your agent, and it did not work for them. The skill did."
- M8 `extend-your-system`: "In Module 7 your neighbour could not use your agent. Describe an agent for what they needed."
- Two lived turns, both in exercises: strong. Not 90+: the turn is the student's, not the training's own (the narrator's failures in M6/M7 are side stories, not the plot), and M6/M8 announce the rescue before it is lived ("the score rises with nobody editing", `evals-as-steering`).

## Point of view

**A — 93.** Narrator: the author-practitioner, Antti, who built this module with the method and drifted anyway. Impersonal and declarative for M1–M5, then a first-person passage at M6.
- M1 `orient-and-introspect`: "Assume about 10% of what it says or does is made up. Could be more or less than this heuristic suggests." (voice in asides)
- M5 `the-gate-is-a-claim`: "In 2024, on one product's judge, Hamel Husain reported better than 90% agreement" (named voices carry the scars before the narrator does).
- M6 `story-of-module-6`: "I drifted in every one of the ways this story just walked. I fixed what I caught. The loop caught what I missed. A senior-persona sim caught what the loop missed." Signed "Antti".
- M6 `story-of-module-6`: "The paraphrase I shipped as a quote." The narrator's own failure, detailed, as a whole lecture. Held below 95 because the narrator is absent for five modules.

**B — 80.** Narrator: Antti, a leader who steers agents without reading all the text and has paid for it. First person surfaces in short signed passages across the arc, and fails on the page at M6–M7.
- M1 `context-is-king`: "A colleague has a name for how I work: steering without reading all the text. For a while I felt I had lost a common language with people who write the spec first". Signed.
- M5 `grounded`: "I stopped reading full documents at work some time ago. I read to steer on a high level. ... A line on my CV is a claim." Braids back to M1.
- M6 `new-human-role-in-the-loop`: "## I drifted too ... five reversals from me on the agent's confident recommendations, four leaks of a banned word ... I caught what the loop missed."
- M7 `access-is-not-absorption`: "It started about 33,000 sessions of its own. Nothing capped it. Nothing warned me. ... That someone was me, and I was away." and "The proposal got neither a yes nor a no."
- Own failure is on the page, twice, which is new versus earlier runs. Not 90: the M6 drift story is a ~60-word compression of AE101's whole lecture, the narrator is nearly silent across M3–M4 (one line: "Damn, this is complex stuff."), and the M7 failures teach adjacent lessons (spend, sponsor urgency) rather than the module's own move.

## Stance

**A — 92.** Positions it could lose a customer over:
- "Steer it as hard as you like: what it holds about your next run is a forecast." / "**A prediction is not a measurement.**" (M5 `what-packaging-is`). Defended by mechanism: weights frozen at a cutoff, "a well-read average of what other people published about other repos".
- "A rule in context is not a rule in the output" (M6 `story-of-module-6`). Defended by scar: "four separate violations across four independent LLM instances. The grep pass caught each one. The LLM self-check did not."
- "STRIDE without an access-surface map is pub-quiz threat modeling" (M3 `map-the-access-surface`); "Don't make general what you don't practice yourself" (M3 `skills-from-the-frontier`). Defended against the curated-kit market by the Fin example and the authored skill.
- "Push reach past what you can check and you have not delegated more. You are checking less." (M2 `when-a-plan-is-good`, again M5 `the-gate-is-a-claim`).
- Against commercial interest: Bitter lesson applied to its own kit ("Retire what the next model outgrows"); not quite an explicit "we lose a sale" line, so 92.

**B — 90.** Positions it could lose a customer over:
- "*'Share the whole agent'* is not on the list." (M7 `share-your-work`). Defended by scar lived in the room, "You gave them your agent, and it did not work for them", and by mechanism, "Accountability is the part with a name on it, and a name does not travel inside a folder." (M7 `access-is-not-absorption`).
- "Certainty is not on offer." (M4 `audit-your-agent`) with "safe enough, under these conditions, within these limits, for now" (M4 `practice-of-risk`). Defended by mechanism: "The attack surface is the instruction set."
- "Nobody knows where agents are going, not Anthropic, not your board." (M1 `what-just-happened`). Asserted at M1, defended late by the M7 stories.
- Against own commercial interest, twice: "It costs whoever sells you agents too, this training included: an agent that reaches less is a smaller thing to sell, and it is still the right call." (M4 `practice-of-risk`); "We could have spent today building you one impressive agent. It would have demoed well and been the wrong thing to sell you." (M8 Next).
- Held from 95 by pitch lines it does not defend: "Each agent you describe is built faster than the last." (M8 `extend-your-system`), "from here a hundred agents is a matter of describing them" (M8 Big Idea), "The model will change. Your memory will not." (M2 debrief).

## The pair

**A:** someone who has been there. Stance ("a prediction is not a measurement") sits beside a training that doubts its own checks ("The gate is a claim too", "same-window self-charity", Bainbridge's "The more autonomy the agent earns, the worse a watcher you quietly become"). Both, in balance.

**B:** someone who has been there, tilting to pitch at the close. Doubt is strong through M3–M6 ("The judge names its own limit", "A flat score is information about the judge or the work", "The better it gets, the less you watch") and the stance holds against its own sale. M8 then drops the counter-voice: the flywheel claims ("built faster than the last") arrive with no check, in the module whose own rule is "as far as a check measures it" (`where-is-this-all-going`).

## Room (B only)

Do the exercises carry the story? Mostly yes from M3 on: the unease and the rescue are things the student does to their own files. M1 and M2 carry joy and capability; M5 and M6 are lived but told first.

**Strongest beats**
1. **M3 freeze → M5 rescue.** `three-minds-one-synthesis`: "Pick the line of `## Answer` you trust least ... Don't fix it. Module 5 checks this exact file, doubted line included." Paid in `hallucination-bakeoff` Phase 5: "You decide whether the doubt was right and whether the judge caught it." The unease is the student's own line, carried across two modules; the debrief holds it: "The doubt stays. Hold it."
2. **M7 handover failure → M8 build for the neighbour.** `share-your-work`: "Your agent goes generic or fails, because it reads a memory your neighbour does not have. You gave them your agent, and it did not work for them." Paid in `extend-your-system`: "Open `module-7/handover.md`. It says what your neighbour needed and what broke without your files." The stance ("share the whole agent is not on the list") is lived before it is argued.
- (Runner-up: M4 `author-security-skill` "Guess first": "decide whether your system is safe, judged from what it has produced ... the first report sets it beside what the check finds.")

**Weakest beats**
1. **M6 `eval-loop`.** The exercise opens on the result: "Watch your Module 3 briefing get better round after round, with nobody editing it." The walk-away fills with lecture-by-prompt ("Then ask about parallel search", "Then the model-training analogy, in small pieces"). The student watches a promised outcome rather than discovering one; only `remarks.md` and the spot-check put their judgement in the loop.
2. **M8 `extend-your-system` Phase 3–4.** "Don't edit the new agent yourself." then "Send the built agent to your neighbour. Their agent runs it on their system." and straight to "**The point:** Each agent you describe is built faster than the last." There is no read-back of whether the neighbour's gap closed and no second build to show "faster", so the module's headline claim is told, not lived.

## Depth

### Learning-set A (AE101)

1. **Control comes from checks outside the session, not from reading or watching.**
   - Planted M1 `the-machine-you-just-met`: "A check from outside the session resets the chain."
   - Complicated M2 `when-a-plan-is-good`: "The plan read is a calibration move ... Push reach past what you can check and you have not delegated more." (checks before code). M3 `the-loop-half-filled`: "**Control is interrogation.** ... You can always read more; you can never read all." M4 `ironies-of-automation`: "Trust and vigilance move in opposite directions." M5 `the-gate-is-a-claim`: "The check you built is itself a claim that wants verifying."
   - Paid off M6 `composing-the-workflow`: "One run tells you what happened. The measurement tells you what the system does." Governor: "Name the uncertainty before you move." Counter-voice: Goodhart. Depth **100**.
2. **A session should leave something on disk the next one can use, and the store needs pruning.**
   - Planted M1 `compound-and-close`: "every push-back is a hint toward your own rules."
   - Complicated M2 `how-instructions-grow`: "The cure is not better rules; it is where the rules live." / "Prohibitions stop; taste steers." M3: skill rung ("fix → memory → skill → system"). M5: done-done "in `./CLAUDE.md` once".
   - Paid off M6 `spot-gaps-build-the-loop`: "Rules-files have a half-life. Adding rules is only half of it" and `story-of-module-6`: "A rule in memory that does not force is worse than no rule." Depth **100**.
3. **The agent's account is a hypothesis.**
   - Planted M1 `orient-and-introspect`: "The account is a reconstruction, not ground truth."
   - Complicated M2: "Structure is persuasive." M3 `author-test-strategy-skill`: "The grade is biased by design." M5 `reading-the-return`: "The closing summary is not the artefact."
   - Paid off M6 `story-of-module-6`: "Claude had written a paraphrase and presented it as attribution." Depth **90** (braided with 1, paid in story rather than the closer).
4. **The field gives you candidates; only a local run gives you evidence, and the answer moves.**
   - Planted M4 pre-reads: "Mollick does not call the winner. Neither does this training ... claims like that expire."
   - Complicated M5 `what-packaging-is`: "today's playbooks are **candidates**" / "The optimum is local, and it moves." M5 `the-gate-is-a-claim`: bitter lesson.
   - Paid off M6 `agents-that-build-agents`: "nobody has that part figured out yet ... The kit compounds; the model rotates." Forward question present. Depth **90**.
5. **Personal first, then the wall to the team.**
   - Planted M1 `compound-and-close`: "it parks the bigger question: where a team's rules and guardrails should live."
   - Complicated M3 `author-test-strategy-skill`: "The team PR starts with a conversation, not a commit." M5 `The whole map?`: "A rule promoted before it works on you is a rule your team has to live with."
   - Paid off M6 `agents-that-build-agents`: "**Cross personal → team.** Personal mastery is nice. But it will never be enough." Stated at close, never exercised. Depth **80**.

A Depth = (100+100+90+90+80)/5 = **92**.

### Learning-set B (Agents 101)

1. **What you give the agent is what you get; at system scale, files are the context.**
   - Planted M1 `context-is-king`: "Context is whatever you tell it: a fact, a role, a preference."
   - Complicated M2 `compounding`: "Old and new claims met, and the ones that couldn't survive got cut. Context shapes output, at system scale." M4 `practice-of-risk`: "Well-formed English in a document your agent reads can make it *decide* to do something harmful" / "Now give it less." M5 `module-5-prework`: "The source is present but does no work." M7 `share-your-work`: the agent "reads a memory your neighbour does not have."
   - Paid off M8 `where-is-this-all-going`: "What your company knows about its own work gets better only when somebody writes it down and an agent builds on it." Depth **95**.
2. **The agent's account is a claim; a check has to leave the session.**
   - Planted M1 `what-just-happened`: "The report is a hypothesis, not a result."
   - Complicated M3 `three-minds-one-synthesis`: "Nothing checks it yet." M4 Big Idea: "You can't tell if your agent is safe from its output." M5 `grounded`: "'Are you sure?' is another fluent answer" and "The judge names its own limit". M6 `when-the-score-stops-moving`: "You haven't checked the judge yet."
   - Paid off M8 debrief: "The agent is auditing its own work. If the summary sounds too clean, ask..." and "as far as a check measures it". Governor: "Check the proposal before it becomes the action." Depth **95** (braided with 3; the close's own flywheel claim escapes the check, which costs it 100).
3. **A loop improves the work; the human moves up to design the loop.**
   - Planted M1 debrief: "do the work → capture → reflect → sharpen."
   - Complicated M2 debrief: "Watching where it bends is continuous improvement, done by hand." M6 `eval-loop`: "The judge is fixed and separate, which is why the rise can be believed." M6 `new-human-role-in-the-loop`: "The better it gets, the less you watch." M7: the quota loop "Nothing capped it."
   - Paid off M8 `where-is-this-all-going`: "Your agent can improve your agent ... as long as the judge stays out of its reach." Depth **90**.
4. **Act under uncertainty: plans, evals and safety are hypotheses you test.**
   - Planted M1 `what-just-happened`: "You act on the future to know what's real."
   - Complicated M4 `practice-of-risk`: "'I can't tell' is a real answer." M6 `evals-as-steering`: "What would have to be true for this eval to be the right one?" M7 `test-the-sharing-plan`: "The technical and people plans are hypotheses."
   - Paid off M8 Next: "Your plan is a set of assumptions: label them ... test the uncertain ones on your own work before the team's." Forward question: "What is going to be the next hard part about agents?" Depth **85**.
5. **Sharing is a strategy; access is not absorption.**
   - Planted M2 `personal-agent-homework`: "Who else would read this output, and what would make them open it?"
   - Complicated M4 debrief: "A skill is not a deployed service and does not settle ownership." M7 `share-your-work` (handover fail), `access-is-not-absorption`: "Access is a switch somebody flips ... Absorption happens in other people's weeks."
   - Paid off M8 `extend-your-system`: "When agents build agents for each other's gaps, the organisation learns faster." Depth **75** (one light plant, then a jump at M7).

B Depth = (95+95+90+85+75)/5 = **88**.

**B progression** (cumulative depth rung after each third: M1–M3 · M4–M6 · M7–M8)

| Learning | M1–M3 | M4–M6 | M7–M8 |
|---|---|---|---|
| 1 Context / files | 60 | 80 | 95 |
| 2 Account is a claim | 60 | 80 | 95 |
| 3 Loop, human moves up | 40 | 80 | 90 |
| 4 Act under uncertainty | 40 | 80 | 85 |
| 5 Sharing ≠ absorption | 20 | 40 | 75 |

Learning 5 stalls through M4–M6 and jumps at M7; the rest develop evenly.

**B headline ideas, not developed:** StoryBrand / via negativa (M1 `personal-site-with-guardrails`); `style.md` company look (M2 `personal-agent-homework`); "Three layers, one folder ... Sharpen the memory, never the sources" (M2 `compounding`); "Split for a reason" (M3 `when-to-split-an-agent`); "Groundedness protects the floor. Steering raises the ceiling." and the goal-nudger (M6, never returns); PDCA at the eval layer (M6 `eval-loop`); "Variety in, selection out, memory keeps" (M6, faint echo in M8 forum); "The tool that builds tools compounds" (M8, stated only); the Cookbook recipe numbering (Recipe 1, 2, 4, 5, 8) as structure the arc never uses.

## Scores

| factor | A | B |
|---|---|---|
| Frame | 95 | 86 |
| Narrative | 93 | 86 |
| Point of view | 93 | 80 |
| Stance | 92 | 90 |
| Depth | 92 | 88 |

## Smallest moves for B

1. In the M6 `eval-loop` exercise, replace the opening "Watch your Module 3 briefing get better round after round, with nobody editing it" with the task alone, and drop "the score rises with nobody editing" from `evals-as-steering`, so the student reads the rise in their own round notes before anyone names it.
2. In M8 `extend-your-system`, add a closing step where the neighbour runs the built agent against the gap in `module-7/handover.md` and writes one line on whether it closed, so "built faster than the last" becomes something the room measured.
3. In the M5 module, place `grounded`'s "Four candidates that fail differently" and "You have done this before" after `hallucination-bakeoff`, so the scoreboard surprise lands before the method names do.
4. In M8 `where-is-this-all-going`, replace "The SHA check in Module 6 was that rule" with the move the student actually made in M6 (the judge file stayed untouched by the loop), because no SHA check appears on the M6 page.
5. In M2 `compounding`, give the agent-factory story the narrator's own miss (what Antti did that produced "a few problems", not only what colleagues said), so the narrator's failure starts in the first third instead of arriving at M6–M7.
