# Storytelling judge 3 — paired full-training read (AE101 = A, A101 = B), r2

## Running notes

### A · M1 Getting going + context
- Planted: "The LLM mirrors your stance… Your stance is the ceiling" (lec painting-the-picture); "Two frontiers: how fast, and the right things"; context is king (lec the-wizard-move).
- Exercises before naming: orient-and-introspect ("the context window is not your codebase"; "Assume about 10% of what it says or does is made up"), fix-tests-first ("pushing back is core work"; "its agreement settles nothing"), close-the-ticket, compound-and-close.
- Naming after: lec the-machine-you-just-met — sycophancy as mechanism ("matching you is what scored well in training"), error cascade ("That is why the failing test came before the fix"), "You just ran the same loop", Klaassen compound engineering. Recognition-before-naming in the closer.
- Narrator: mostly impersonal declarative; voice in lines ("The wizard typing in neat Perl syntax is dead"). Stance: "The report is a hypothesis to check, not ground truth."

### A · M2 Plan mode, done right (in progress)
- Six-phase map (lec the-whole-map); five things a good plan has; three pressures; reach vs calibration ("Push reach past what you can check and you have not delegated more. You are checking less."). Lecture precedes exercise here (announce-then-exercise).
- M2 exercises: push-back-on-the-plan ("the first pass is plausible, and usually not good enough"; human read + agent walk-down; approval inflation), extract-the-task-shaping-rule (ticket conventions reprise from M1; where rules live). Lec how-instructions-grow: double loop; "Rules have a ceiling… The work starts passing your rules and missing your point"; "Prohibitions stop; taste steers"; "This training stops short of the full system" (frame names its edge).

### A · M3 Earn the trust
- Two windows; curated STRIDE/access skills + one authored test skill. Stance: "Don't make general what you don't practice yourself"; "Authoring without invocation is theatre"; "The grade is biased by design… same-window self-charity" (training doubts its own check).
- Agent reasoned into worktree: "The agent reasoned forward from the conversation, not from the filesystem."
- Lec the-loop-half-filled: names laws AFTER moves ("Every law coming up is a move already made"); closed-loop controller; local success/global drift; compound ladder; governor "Name the uncertainty before you move." "Reading was never the control."
- "The branch is the permission"; "The far half goes quiet… how do you trust work you didn't watch?" (cliffhanger into M4).

### A · M4 Run the first experiment
- Un-packaged send-off as designed failure: "send it off plainly and you find out what you can't steer yet" (ex set-the-markers). "A tourist runs an agent and hopes; a practitioner runs a test and reads the data" (lec test-and-learn). Bainbridge after the send-off (lec ironies-of-automation): "The trust is deserved. The watching still has to be engineered… when did you last do this kind of work by hand?" Mollick pre-read: "Neither does this training… claims like that expire" (forward-looking question seeded).

### A · M5 Learn from the test (in progress)
- Reading the return: "The machine would rather produce something than admit nothing"; three lenses; "Diagnose first, fix later" — test → learn → encode. 10% prior re-fires on agent account of agent work (ex diagnose-and-resend). Hooks: "Must happen goes in a hook".
- Lec what-packaging-is: sea passage ("A check is a position fix"; "Fence the reef, not the open water"); "The model has read the field… what it holds about your next run is a forecast"; "A prediction is not a measurement"; "The optimum is local, and it moves".
- Lec the-gate-is-a-claim: "Green is a claim about the check, not a fact about the work"; Goodhart; Deming tampering; delegation frontier reprise; Sutton bitter lesson "Retire what the next model outgrows".

### A · M6 Spot gaps, build the loop
- Two frontiers return (from M1 lec painting-the-picture): "Your frontier is what you have expressed. It moves when you write, and only then."
- Ex spot-gaps: diff two sessions; "Rules-files have a half-life"; cut one rule. Lec composing-the-workflow: eval = measurement; "You drew a control loop".
- Lec story-of-module-6: first-person narrator, own failure on the page: "The agent I was working with had just finished writing those three modules. It still opened with the un-packaged shape."; "A rule in context is not a rule in the output"; "I drifted in every one of the ways this story just walked." Signed "Antti".
- Close lec agents-that-build-agents: "There is no last turn… The kit compounds; the model rotates." "nobody has that part figured out yet".

### A · Step 1 learning-set (written before opening B)
1. **Your trust in the agent's output must be earned by an outside check, and the check itself is a claim.** Planted M1 lec the-machine-you-just-met "The report is a hypothesis to check, not ground truth." Complicated M2 lec when-a-plan-is-good "Push reach past what you can check… You are checking less."; M3 ex author-test-strategy-skill "The grade is biased by design… same-window self-charity"; M4 lec ironies-of-automation "The trust is deserved. The watching still has to be engineered."; M5 lec the-gate-is-a-claim "Green is a claim about the check, not a fact about the work." Paid off M6 lec story-of-module-6 "The loop caught what the subagents missed. I caught what the loop missed. You will catch what I missed." Governor: name the uncertainty / ask what the gate saw. Counter-voice: Bainbridge. Depth 100.
2. **Compounding: each session should make the next easier — but rules bloat, leak and need cutting.** Planted M1 Big Idea "Your first session should leave something behind that the next one can use." Complicated M2 lec how-instructions-grow "Rules have a ceiling… The work starts passing your rules and missing your point."; M3 lec the-loop-half-filled "compound ladder: fix → memory → skill → system"; M5 lec reading-the-return Horthy "treat individual sections as optional"; M6 ex spot-gaps "Rules-files have a half-life." Paid off M6 story "A rule in memory that does not force is worse than no rule." / close "The kit compounds; the model rotates." Depth 100.
3. **The model's account is a forecast/reflection; local evidence from a run is what you lack.** Planted M1 ex orient-and-introspect "the context window is not your codebase"; M1 lec "The scrollback is the machine's reflection". Complicated M3 ex threat-model "The agent reasoned forward from the conversation, not from the filesystem."; M5 ex diagnose-and-resend "an agent's account of an agent's work… assume about 10%"; M5 lec what-packaging-is "A prediction is not a measurement." Paid off M5 "The optimum is local, and it moves" / M6 close "nobody has that part figured out yet." Depth 80 (pays off at M5, braided with #1, not at close).
4. **Long, unwatched work: un-packaged fails, packaging (reference/plan/verifier) is built against your own failure.** Planted M3 lec the-loop-half-filled "how do you trust work you didn't watch?" Complicated M4 ex set-the-markers "you find out what you can't steer yet"; M4 lec what-keeps "It declares done on the part it managed"; M5 ex diagnose "packaging you built against your own failure beats packaging you guessed at"; M5 lec what-packaging-is sea passage. Paid off M6 story turn one: the author's own agent "still opened with the un-packaged shape." Depth 100.
5. **Your frontier is what you've expressed (two frontiers).** Planted M1 lec painting-the-picture "can that setup learn faster than you can write things down?" Returns M6 lec the-2-frontiers, M6 close "What you can express is how far the agent runs." One meaning-changing beat (from setup speed to judgement→expression). Depth 60.
Headline ideas not developed: M1 "context is king" dinner demo (absorbed into #3, not re-staged); M2 six-phase map's Absorption phase (named, little lived beat); M3 two-window parallelism (does not return beyond M3); M6 "Loop it" scheduling (one mention); "The branch is the permission" (M3 only).

### B · M1 Getting Going
- Lecture context-is-king comes BEFORE the exercise (dinner demo + "That's a guardrail. That's your turn.") — the intended exercise-first shape is broken at the very first beat, though the lecture is short and demo-shaped.
- Ex personal-site-with-guardrails: student is protagonist ("you stay the protagonist of the page"); boring baseline → StoryBrand tuned → strengths → anti-branding → look back → free iteration → rules file. "The LLM didn't get better between Phase 1 and Phase 6. You did." Exercise names its own point at the close ("That's the whole of Module 1's big idea") — announced and named in same beat.
- Lec what-just-happened (after): "You felt context move… That's a small thing. It's also the whole thing."; sycophancy as mechanism "Agreeable answers won the round"; "The report is a hypothesis, not a result"; "You were the only check in the room"; stance: "Nobody knows where agents are going. Not Anthropic, not your board, not the people running this training."
- Debrief: cold critic beat (doubts warm self-audit).

### B · M2 Building Agent Systems (in progress)
- "Module 1 was the rehearsal… Now the training turns to work." Challenge-scoped memory: "A memory about 'our company' is a landfill. A memory about this decision, this month is a weapon." Ex build-your-challenge-memory: "A chat forgets. A memory remembers."; plan-first; first custom agent; compound ("Second batch made the first batch better. Chat literally cannot do this."). Some pitchy assertion ("Chat literally cannot do this").
- Lec compounding (after the exercise, names it): "You just did something a chat can't do… That's compounding. And you can't picture it from a description, you had to see it." Recognition-before-naming works here. "It can only use what someone wrote down… Most of what you know about your own company, nobody has." "The model will change under this. The memory will not." Stance on plain text: "Every fancier setup that promised to 'fix' this added a layer that the model had to work around."
- Homework personal-agent-homework: scheduled agent, a week of observation (lived, real-work beat). Prework M3: practitioner reads.

### B · M3 Multi-Agent Systems
- Demo agent-that-takes-action: "the difference between an output and an action" (boundary motif: context → guardrail → schedule → action).
- Ex name-your-crux (Rumelt) → three-retrievers ("The feeling is the lesson") → three-minds-one-synthesis. THE TURN BEGINS: "Everything you just did is the move this training teaches, run properly. It still handed you something you cannot vouch for. Hold the doubt… let it stew." Lived unease, deferred to M5.
- Lec when-to-split (after): "Start with don't"; "Three agents is not three times as good… Next Monday, you will be tempted to apply it to everything. Don't." — stance against the module's own wow.
- Debrief: "Nothing in it reads the briefing and tells you whether it is true." "The doubt stays. Hold it."

### B · M4 (prework read) — "Running the loop is the work"; residual risk re-assessed per loop iteration.

### B · M4 Security
- Lecture practice-of-risk BEFORE the exercises (thesis pre-announced: "Certainty is a fantasy you inherited"; assess → mitigate → reassess → decide). Strong stance: "It costs whoever sells you agents too, this training included: an agent that reaches less is a smaller thing to sell, and it is still the right call." (stance against own commercial interest, on page). "Now the move is to give it less… More context makes a good answer likelier. Less access makes a bad answer smaller." (reverses M1–M3's "more" — meaning-changing beat.)
- Ex author-security-skill / audit-your-agent: student runs raw policies, dictates 3–5 lines, authors two-lens skill, audits own M3 system, mitigates one risk ("Not the easiest, not the scariest. The one that bugs you on the second skim. Your gut is data here."). "The uncomfortable feeling is the evidence." Escalate-to-a-person beat. Exercise closer "The unease that remains is what the loop is supposed to produce."
- Debrief: "The unease stays. Nothing today resolves it. That's the curriculum."
- M5 prework: Mata v. Avianca + Deloitte — real public scars (others', not narrator's). "Verification has to leave the generation loop and touch the source."

### B · M5 Grounded Output (in progress)
- Start here explicitly calls itself "the rescue" (mood arc labelled on surface — announced). Lecture grounded BEFORE exercise: compounding error 85%^10, test-and-fix 10%→1%→0.1%, "Are you sure? is another fluent answer", four detectors, "You have done this before" (callback to M3 three stances — braiding). "The judge names its own limit."
- Ex hallucination-bakeoff: generate a ~10%-fabricated briefing blind, 30-claim pool, four detectors, scorer. Student role mostly "watch the scoreboard fill in" — weaker agency.
- Bakeoff close "name the rescue"; judge "names the thing you measured and decided not to chase". Debrief: "the report the agent writes describes what it intended, not what landed"; propose → double-check → apply; autonomy ladder ("which rung this action has earned").

### B · M6 Evaluations
- Mollick framed as open question: "We are about to find out." Lecture evals-as-steering BEFORE exercise: "Evals are how you write down what good means so the system can keep applying it when you are not in the chair"; "Groundedness protects the floor. Steering raises the ceiling."; "A yardstick you rewrite is not a yardstick."
- Ex eval-loop: walk-away loop ("And you weren't there."). 
- Lec when-the-score-stops-moving (after): "A flat score is information about the judge"; "Nothing has been scoring the judge" (doubts own tool — 80-rung self-challenge); forward question "If the model stops fabricating, what is your judge for?"
- Lec new-human-role: recap callback across M1–M5 ("That was Module 1… That was Module 2…"); "Variety in, selection out, memory keeps" ("You have run this twice now without calling it anything" — recognition-before-naming, braiding M3+M5); "The better it gets, the less you watch" (Bainbridge-like counter-voice, uncredited); "When did you last read one yourself?"

### B · M7 From Personal to Team
- Exercise-first (share-your-work → design → test) then lec access-is-not-absorption names what was felt: "You felt this an hour ago. The technical plan filled quickly. The people plan stalled on names." Strong recognition-before-naming.
- Stance: "'Share the whole agent' is a vendor pitch and is NOT on the list." Defended by mechanism: "Accountability is the part with a name on it, and a name does not travel inside a folder." Polanyi: "we know more than we can tell" — braids back to M2 "It can only use what someone wrote down".
- "The thing you would most like to hand over is the one thing that will not go."

### B · M8 Agents Building Agents
- Ex extend-your-system: describe → generate → judge; "Module 8's first move is watching the builder disappear."
- Ex joint-double-diamond: room-scale forum; scripted identity close "You are now agent builders" (told, by sponsor).
- Lec where-is-this-all-going (after): "Count the folders the kernel cites… That ratio is your rollout, in miniature" (lived payoff of absorption); "Which half of this is obsolete next year?… the people running this training do not know either"; "Will your organisation learn faster than the model changes underneath it?"; "What would change our mind?"; "The kernel came out of the same move as your first briefing… nothing in the room checked it. Hold that doubt the way you held it then." Close: "We could have spent today building you one impressive agent… it would have been the wrong thing to sell you."

---

## Frame

**A (AE101): 92.** Frame in one sentence: *agentic engineering is engineering — a closed-loop control problem where trust is earned by outside checks and the system compounds or drifts.* Three modules that only make sense through it:
- M1 lec the-machine-you-just-met: "A check from outside the session resets the chain… That is why the failing test came before the fix."
- M3 lec the-loop-half-filled: "The agent loop is a **closed-loop controller**… Cut the feedback signal (a test, a check, a read) and it drifts."
- M5 lec what-packaging-is: "**A check is a position fix**. At a fix the wedge of possible states collapses to a point."
- M5 lec the-gate-is-a-claim: "Green is a claim about the check, not a fact about the work."
Where it breaks, named: M2 lec how-instructions-grow "This training stops short of the full system"; M5 lec what-packaging-is "Whether this field ever settles into a real best practice is an open question." Short of 100 because the breaking point is stated as an edge of scope more than a failure of the lens itself.

**B (A101): 78.** Frame in one sentence: *generic AI becomes your AI when you shape what surrounds the model — and each module adds one piece of that surround (context, memory, other agents, boundary, check, loop, interface).* It is stated and re-stated as a structural refrain:
- M2 lec compounding: "*generic AI becomes your AI when you shape the context that surrounds it.* Guardrails did this at the prompt level in Module 1. A memory does it at the knowledge level now."
- M4 lec practice-of-risk: "In the full agent picture, this is the boundary piece."
- M7 lec access-is-not-absorption: "In the full agent picture, this is the interface piece. It is the first one that has another person on the other side of it."
- M8 lec where-is-this-all-going: "The parts hold; the model rotates."
Every module reads through it, but the "full agent picture" refrain is more a parts inventory than a lens that makes modules mean something they otherwise wouldn't. Where it breaks is on the page: M2 "The agent can only work from what somebody wrote down. Most of what you know about your own company, nobody has." and M4 "Now the move is to give it less", which turns the frame against itself. 78, not 80+, because the frame is announced ("In the full agent picture, this is…") more than discovered.

## Narrative

**A: 93.** Five sentences: An engineer learns the agent mirrors them and its reports are hypotheses (M1). They learn to read plans and author skills under their own scrutiny (M2–M3). Then they send a long task off un-packaged, and it comes back drifted, confidently wrong, or stalled (M4). They diagnose the return through three lenses and re-send it packaged against their own failure (M5). The turn: the author shows his own agent, which had just written those modules, failing in exactly the same ways (M6).
- M4 ex set-the-markers-send-it-off: "send it off plainly and you find out what you can't steer yet."
- M5 lec reading-the-return: "The machine would rather produce something than admit nothing."
- M6 lec story-of-module-6: "The training teaches this pattern across three modules. The agent I was working with had just finished writing those three modules. It still opened with the un-packaged shape."
The turn is the training's own failure, so it touches 100. Held at 93 because M2–M3 run as a stretch of station-to-station work with little plot.

**B: 82.** Five sentences: A leader makes a site that sounds like them and feels context move (M1). They build a memory and agents on a real challenge, and it compounds (M2–M3). The turn: the multi-agent answer, built "properly", is one they cannot vouch for, and the security audit deepens the unease (M3–M4). A benchmark and a fixed judge rescue one kind of output, and the loop runs without them (M5–M6). They find out that access is not absorption, and they leave with a flywheel rather than a graduation (M7–M8).
- M3 ex three-minds-one-synthesis: "Everything you just did is the move this training teaches, run properly. It still handed you something you cannot vouch for. Hold the doubt."
- M4 debrief: "The unease stays. Nothing today resolves it. That's the curriculum."
- M5 module Start here: "This module is the rescue."
- M8 lec where-is-this-all-going: "The kernel came out of the same move as your first briefing… nothing in the room checked it. Hold that doubt the way you held it then."
The student lives the turn, which is a real 80. It is capped because the arc is labelled on the surface ("the rescue"), and the failure is the student's system, never the training's.

## Point of view

**A: 93.** The narrator is Antti, a practitioner who builds the course with agents and was burned by them while doing it.
- M6 lec story-of-module-6: "I am going to tell you how this module got made… What I tried, what drifted, what the rules caught, what the rules missed."
- Same: "I drifted in every one of the ways this story just walked. I fixed what I caught." (signed "Antti")
- M1 lec painting-the-picture: "The wizard typing in neat Perl syntax is dead." (voice in an aside)
The narrator's own failure is on the page (100 anchor), but only in one passage. M1–M5 are impersonal declarative.

**B: 55.** Who tells this: an unnamed trainer voice in second person, opinionated, with no stated experience of its own. It surfaces only in asides:
- M1 lec what-just-happened: "Nobody knows where agents are going. Not Anthropic, not your board, not the people running this training."
- M4 lec practice-of-risk: "Damn, this is complex stuff. It will still be complex when the next agent gets built."
- M8 Next: "We could have spent today building you one impressive agent to show on Friday… it would have been the wrong thing to sell you."
The scars on the page are other people's (M4 module-5-prework: Mata v. Avianca, Deloitte/DEWR), not the narrator's. That puts B between "a voice in asides" (40) and "a narrator with a stated experience" (80).

## Stance

**A: 90.** These are positions A would lose a customer over, each defended rather than asserted:
- "A rule in context is not a rule in the output" (M6 lec story-of-module-6), defended by the scar of the banned word: "four separate violations across four independent LLM instances. The grep pass caught each one. The LLM self-check did not."
- "what it holds about your next run is a forecast… **A prediction is not a measurement**" (M5 lec what-packaging-is), defended by mechanism: "a well-read average of what other people published about other repos, frozen at a cutoff."
- "Don't make general what you don't practice yourself" (M3 lec skills-from-the-frontier), defended by the curated/authored split.
- "Mollick does not call the winner. Neither does this training… claims like that expire" (M4 pre-reads). This comes close to holding a position against its own interest, but stops short.

**B: 88.** Positions defended rather than asserted:
- "*'Share the whole agent'* is a vendor pitch" (M7 ex share-your-work), defended in M7 lec access-is-not-absorption: "Accountability is the part with a name on it, and a name does not travel inside a folder."
- "Certainty is a fantasy you inherited" (M4 lec practice-of-risk), defended by three mechanisms: non-determinism, instructions as the attack surface, emergent capability.
- "Start with don't… Three agents is not three times as good… Next Monday, you will be tempted to apply it to everything. Don't." (M3 lec when-to-split-an-agent). The training argues against the module's own wow.
- Against its own commercial interest, on the page: "It costs whoever sells you agents too, this training included: an agent that reaches less is a smaller thing to sell, and it is still the right call." (M4 lec practice-of-risk). This touches 100. Held at 88 because a few lines are pitch-flat assertion: "Chat literally cannot do this." (M2 ex build-your-challenge-memory).

## The pair

**A: someone who has been there.** It doubts its own tools: M3 ex author-test-strategy-skill "The grade is biased by design… same-window self-charity"; M5 "The check you built is itself a claim that wants verifying". It also holds ground (forecast versus measurement, rule versus output). The doubt is backed by the author's own transcript.

**B: someone who has been there, though the scars are borrowed.** It doubts its own checks: M6 lec when-the-score-stops-moving "Nothing has been scoring the judge"; M8 "The judge is still yours, and still unchecked in the places you have not looked". It holds ground against vendors and against its own sales. It never reads as a hedge, and only in M2 and M8's "You are now agent builders" does it tip toward a pitch. The authority comes from court records, not from the narrator.

## Room (B only)

The turn is mostly lived. The unease of M3–M4 arrives inside exercises; the rescue in M5 arrives mostly as watching.

**Strongest beats**
1. **M3 ex three-minds-one-synthesis, Close.** "You can't tell yet… the answer sits at that uneasy distance where you'd stake your reputation on some of it and not all of it, and you can't yet say which is which. That feeling is correct." The turn happens to the student, on their own challenge, at the end of an exercise and not in a lecture.
2. **M7 exercises → lec access-is-not-absorption.** In the exercise, "Missing names remain visible as `UNASSIGNED — Monday's question`". The lecture then says: "You felt this an hour ago. The technical plan filled quickly. The people plan stalled on names. That was not the exercise being hard. That was the exercise being accurate." This is recognition before naming, done exactly as intended. Close runner-up: M1 ex personal-site-with-guardrails, "The LLM didn't get better between Phase 1 and Phase 6. You did."

**Weakest beats**
1. **M5 ex hallucination-bakeoff.** The rescue is spectated: "Your job is to set the benchmark up, start the run, and watch the scoreboard fill in." "Twenty minutes of that was watching agents work." It also runs on a synthetic target ("The 10% is a slight joke"), not on the M3 answer the student could not vouch for. The rescue does not touch the doubt it was promised to rescue.
2. **M8 ex joint-double-diamond, identity close.** The leverage is told by a third party: the sponsor reads "*You are now agent builders… That's what you carry out of this room.*" Combined with M8 ex extend-your-system ("Module 8's first move is watching the builder disappear"), the climax is narrated to the hero rather than performed by them.

Shape note: exercise-first holds in M2, M3, M7 and M8. It breaks in M1 (lecture context-is-king first, though short and demo-shaped), M4 (practice-of-risk announces "Certainty is a fantasy" before the audit), M5 ("This module is the rescue" plus the grounded lecture before the bakeoff) and M6 (evals-as-steering before the loop).

## Depth

### A — learning-set (from the running notes; scored on the Depth anchors)
| # | Learning | Planted | Complicated | Paid off | Depth |
|---|---|---|---|---|---|
| A1 | Trust is earned by an outside check, and the check is itself a claim | M1 lec the-machine-you-just-met "The report is a hypothesis to check, not ground truth." | M2 lec when-a-plan-is-good "You are checking less."; M3 ex author-test-strategy-skill "same-window self-charity"; M4 lec ironies-of-automation "The trust is deserved. The watching still has to be engineered."; M5 lec the-gate-is-a-claim "Green is a claim about the check" | M6 lec story-of-module-6 "The loop caught what the subagents missed. I caught what the loop missed. You will catch what I missed." | 100 |
| A2 | Compound each session, but rules bloat, leak and must be cut | M1 Big Idea "leave something behind that the next one can use" | M2 lec how-instructions-grow "Rules have a ceiling"; M3 lec the-loop-half-filled "compound ladder"; M5 lec reading-the-return Horthy "treat individual sections as optional"; M6 ex spot-gaps "Rules-files have a half-life" | M6 story "A rule in memory that does not force is worse than no rule"; close "The kit compounds; the model rotates." | 100 |
| A3 | The agent's account is a reflection or forecast; the missing evidence is local | M1 ex orient-and-introspect "the context window is not your codebase" | M3 ex threat-model-with-stride "reasoned forward from the conversation, not from the filesystem"; M5 ex diagnose-and-resend "an agent's account of an agent's work"; M5 lec what-packaging-is "A prediction is not a measurement." | M5 "The optimum is local, and it moves" (not at close) | 80 |
| A4 | Unwatched work: package against the failure you actually saw | M3 lec the-loop-half-filled "how do you trust work you didn't watch?" | M4 ex set-the-markers "what you can't steer yet"; M4 lec what-keeps "declares done on the part it managed"; M5 ex diagnose "beats packaging you guessed at"; M5 sea passage | M6 story "It still opened with the un-packaged shape." | 100 |
| A5 | Your frontier is what you have expressed | M1 lec painting-the-picture "can that setup learn faster than you can write things down?" | M6 lec the-2-frontiers "It moves when you write, and only then." | M6 close "What you can express is how far the agent runs." | 60 |

**A Depth = (100+100+80+100+60)/5 = 88.**
Headline ideas not developed in A: "The branch is the permission" (M3 only); two-window parallelism (M3); the Absorption phase of the six-phase map (named in M2 and M4, never lived as its own beat); "Loop it" scheduling (M6, one mention); "Prohibitions stop; taste steers" (M2 only).

### B — learning-set
| # | Learning | Planted | Complicated | Paid off | Depth |
|---|---|---|---|---|---|
| B1 | What surrounds the model makes it yours, and you choose what to give and what to keep back | M1 lec context-is-king "Context is whatever you tell it." | M2 lec compounding "same mechanism… only the shelf life changed"; M2 "It can only use what someone wrote down"; M4 lec practice-of-risk "Now the move is to give it less"; M6 lec evals-as-steering "Write it down. That is a steering eval."; M7 Polanyi "we know more than we can tell" | M8 lec where-is-this-all-going "You moved from writing the assembly to specifying it, and specifying it well is the harder half." | 90 |
| B2 | The output and its report are hypotheses; checking has to leave the generation loop, and the check needs checking too | M1 lec what-just-happened "The report is a hypothesis, not a result" / "You were the only check in the room" | M3 ex three-minds "something you cannot vouch for"; M4 lec practice-of-risk "'I can't tell.' Most rows land there."; M5 prework "Verification has to leave the generation loop and touch the source"; M5 lec grounded "The judge names its own limit"; M6 lec when-the-score-stops-moving "Nothing has been scoring the judge" | M8 "nothing in the room checked it. Hold that doubt the way you held it then." | 100 |
| B3 | A system compounds; chat doesn't | M1 debrief "Compound interest on a rule file." | M2 lec compounding "sharper instead of longer"; M6 ex eval-loop "the generation tactic learns what the yardstick punishes"; M6 lec new-human-role "Variety in, selection out, memory keeps"; M8 debrief "Precision compounds. So does blur." | M8 "You leave with a flywheel, not a graduation." | 90 |
| B4 | Access is not absorption; you can't share an agent | M4 debrief "the simplest sharing move… does not make it a deployed service or solve ownership" | M7 ex design-the-sharing-plan "A polished technical file beside a people file full of unnamed roles is the finding"; M7 lec "a name does not travel inside a folder" | M8 lec "Count the folders the kernel cites… That ratio is your rollout, in miniature" | 70 |
| B5 | The human moves one level up, and the better the loop gets, the less you watch | M1 lec what-just-happened "You were the only check in the room" | M5 debrief "which rung this action has earned"; M6 lec evals-as-steering "You become the person who decides which details the system must never miss"; M6 lec new-human-role "The better it gets, the less you watch" | M8 lec "You described it; something else built it." | 80 |
| B6 | Nobody knows where this goes; will your org learn faster than the model moves? | M1 lec what-just-happened "Nobody knows where agents are going." | M2 debrief "The model will change under this. The memory will not."; M6 lec evals-as-steering Mollick "We are about to find out"; M6 lec when-the-score-stops-moving "If the model stops fabricating, what is your judge for?" | M8 lec "Which half of this is obsolete next year?" / "What would change our mind?" | 90 |

**B Depth = (90+100+90+70+80+90)/6 = 86.7 → 87.**

**B progression** (cumulative depth rung after M1–M3 · M4–M6 · M7–M8)
| Learning | after ⅓ (M1–3) | after ⅔ (M4–6) | end (M7–8) |
|---|---|---|---|
| B1 surround makes it yours | 60 | 80 | 90 |
| B2 hypothesis → check → check the check | 60 | 80 | 100 |
| B3 compounding | 60 | 80 | 90 |
| B4 access ≠ absorption | 0 | 20 | 70 |
| B5 human moves up | 20 | 60 | 80 |
| B6 open future | 40 | 60 | 90 |
B4 is the visible stall: planted late and developed in one module, though the M8 folder count is a real payoff, not a recap. The other rows climb steadily.

Headline ideas not developed in B: "name the framework, tune it, ask the agent to run it" (M1; returns as Rumelt, JTBD and Martin without changing meaning); "plain text beats a database" (M2 only); "Seams are where it fails" (M3 only); "diagnose before repair: sources / processing / boundary" (M3 only); "drift signal, never proof" (M5 only); "Three walls past the laptop" (M8 only); "text crossing a boundary into action" (M3 demo, M4 demo, M6 aside; returns without changing meaning).

## Scores

| factor | A | B |
|---|---|---|
| Frame | 92 | 78 |
| Narrative | 93 | 82 |
| Point of view | 93 | 55 |
| Stance | 90 | 88 |
| Depth | 88 | 87 |

## Smallest moves for B

1. In `exercises/hallucination-bakeoff.md` Phase 1, point the detectors at the student's own M3 `crux.md` answer, the one they "cannot vouch for", instead of a freshly fabricated 10% briefing, so the rescue lands on the lived doubt.
2. In `exercises/hallucination-bakeoff.md` Phase 3, before the scorer runs, have the student mark five claims by hand as their prediction, so they act before the scoreboard instead of "watch the scoreboard fill in".
3. In the output-quality module file's `Start here`, cut "This module is the rescue" and let the bakeoff's Phase 5 closer name the rescue after the student has felt it.
4. In the security module file, move `lectures/practice-of-risk.md` after `exercises/audit-your-agent.md`, so "Certainty is a fantasy you inherited" names the unease the audit just produced instead of announcing it.
5. Add one first-person passage to `lectures/where-is-this-all-going.md` (or practice-of-risk) where the author recounts a moment their own agent system failed them and how they caught it, lifting B's narrator from asides to someone with scars.
