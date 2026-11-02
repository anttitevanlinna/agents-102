# Storytelling judge 1 — p2-after (paired, full-training)

## Running notes

### A · M1 getting-going
- Plants: stance mirrored ("The LLM mirrors your stance... Your stance is the ceiling." painting-the-picture), context ≠ codebase (orient-and-introspect "the context window is not your codebase"), compounding (compound-and-close; the-machine-you-just-met "work produces evidence; evidence improves the system").
- Mechanism explains the lived move after the fact: "That is why the failing test came before the fix." (the-machine-you-just-met#errors-stack). Named after move: "Orient, fix, close, compound. You just ran that loop."
- Narrator mostly second person; trainer voice "The wizard typing in neat Perl syntax is dead." Stance: "The tool is not the thing; the taste behind the tool is the thing."

### A · M2 plan-mode-done-right
- Plants map (the-whole-map), reach × calibration (when-a-plan-is-good: "Push reach past what you can check and you have not delegated more. You are checking less."). "Structure is persuasive." Double-loop (how-instructions-grow). "The cure is not better rules; it is where the rules live." "Prohibitions stop; taste steers."

### A · M3 earn-the-trust
- "Don't make general what you don't practice yourself." (skills-from-the-frontier). Self-doubt of own tool: "The grade is biased by design... same-window self-charity." (author-test-strategy-skill). ADR misplaced: "The agent reasoned forward from the conversation, not from the filesystem." Closer names after moves: "A name is a handle, not a lesson. Every law coming up is a move already made." Governor: "Name the uncertainty before you move." Hinge question: "how do you trust work you didn't watch?"

### A · M4 run-the-first-experiment
- Set-up of the turn: un-packaged send-off ("send it off plainly and you find out what you can't steer yet"). "A tourist runs an agent and hopes; a practitioner runs a test and reads the data." Bainbridge: "Trust and vigilance move in opposite directions."

### A · M5 learn-from-the-test
- Turn lived: diagnose own run → package → re-send. "The closing summary is not the artefact." Sea passage: "An unchecked session arrives confident, and wrong." "A prediction is not a measurement." Counter-voice on own tools: "Green is a claim about the check, not a fact about the work." (the-gate-is-a-claim). Goodhart, Deming, bitter lesson "Retire what the next model outgrows".

### A · M6 spot-gaps-build-the-loop
- story-of-module-6, first person, signed: "I drifted in every one of the ways this story just walked." Training's own failure: "The training teaches this pattern across three modules. The agent I was working with had just finished writing those three modules. It still opened with the un-packaged shape." Close: "There is no last turn." "The kit compounds; the model rotates." Two frontiers (M1 painting) paid off in the-2-frontiers + agents-that-build-agents.

### B · M1 getting-going
- Opens first person, signed: "Ten iterations is fine." / "For a while I felt I had lost a common language with people who write the spec first" (context-is-king). Exercise-first lived turn: LinkedIn baseline → StoryBrand → strengths → anti-branding → "yes, this is me." Naming after: "The LLM didn't get better between Phase 1 and Phase 6. The context did." Stance: "Nobody knows where agents are going, not Anthropic, not your board." (what-just-happened). Self-grade kindness: "Why the look-back was kind to you."

### B · M2 building-agent-systems
- Challenge memory, custom agent, compounding named after Phase 3: "The thing a chat can't do is Phase 3: new sources made the existing topic pages sharper instead of longer." "Could a competitor claim this?" Future: "The model will change. Your memory will not." Narrator absent; lecture voice impersonal.
- Homework: scheduled morning agent, "For the first three days, don't retune." "Comical or wrong days: what was missing from the memory?"

### B · M3 multi-agent-systems
- Exercises run before the lecture: crux → three retrievers → three stances → kernel synthesis. Lecture names after: "Start with don't... Default to one agent with a good prompt." Tension: the module Big Idea "Hire three agents..." vs lecture "Three agents is not three times as good." Doubt planted: "The doubt stays. Hold it." / "You can't yet tell if the answer is right. That is expected." (three-minds-one-synthesis). No narrator.

### B · M4 security
- Demo agent-loop-raw: "A tool call is text crossing a boundary into action." Exercise loop: raw policies → skill → audit → mitigate → residual. "The uncomfortable feeling is the evidence." "Certainty is not on offer." (audit-your-agent). Pays off M3 doubt partly (can't tell from output).
- practice-of-risk: "safe enough, under these conditions, within these limits, for now." "More context makes a good answer likelier. Less access makes a bad answer smaller." (reverses M1-M3 "give it more"). "Damn, this is complex stuff." — only narrator flash.

### B · M5 output-quality
- Prework cases Mata/Deloitte (others' scars, not narrator's). Big Idea on page is "Run several quality checks... keep the winner" — method, not grounding. grounded.md: "There is truth out there." "'Are you sure?' is another fluent answer." Bakeoff: blind briefing, 4 detectors, scorer. Rescue payoff: "run it once on your ./crux.md answer, the one Module 3 left you doubting." — best braid in B.
- Debrief: "The agent's report describes what it intended, not what is in the file."

### B · M6 evaluations
- eval-loop with fixed judge: "If the judge moved, the score means nothing." Self-doubt on own tool: "Nothing scores the judge." (when-the-score-stops-moving). Future question: "If the model stops fabricating, what is your judge for?... No release so far has told anyone what good means in your company." Bainbridge-in-leader-clothes: "The better it gets, the less you watch" / "When did you last read one yourself?" New role: "you design the loop and own the yardstick." Recap list ties M1-M5 (new-human-role-in-the-loop).

### B · M7 personal-to-team
- Exercises: JTBD interview → four strategies → absorption bottleneck → technical + people plan → switch assumptions → monday.md. Mostly agent-writes-file chain; teammate is imagined until Monday. Lecture carries the turn: scar story signed "The analysis was ready. The decision never came." / "Companies, even when they go agentic, work first and foremost on the human principle." Frame breaks: "Three parts copy, one does not... Accountability is the part with a name on it."

### B · M8 agents-building-agents
- extend-your-system: "The second agent takes ten minutes, because your vocabulary for what you want is sharper. That is the compound." Room forum (filesystem as meeting room, pays off M3 Big Idea). Lived absorption: "Open the kernel and count how many folders it cites. That ratio is your rollout in miniature." Self-doubt at close: "nothing in the room checked it. Hold that doubt." Future question: "Nobody in this room knows yet, including the people running this training." "What would have to show up for us to drop this?" Told identity: sponsor line "You are now agent builders."

---

## Frame

**A — 94.** Frame: *agentic engineering is engineering — a closed feedback loop you instrument, verify and compound.* Load-bearing everywhere:
- M1 the-machine-you-just-met: "A check from outside the session resets the chain... That is why the failing test came before the fix."
- M3 the-loop-half-filled: "The agent loop is a **closed-loop controller**... Cut the feedback signal (a test, a check, a read) and it drifts."
- M5 what-packaging-is: "**A check is a position fix**. At a fix the wedge of possible states collapses to a point."
- Where it breaks, on the page: M5 what-packaging-is "Whether this field ever settles into a real best practice is an open question"; M5 the-gate-is-a-claim "Today's right procedure, your gates and workflow... is superseded too." Not 100 because the break is stated about the field, not the frame itself.

**B — 83.** Frame: *an agent is a set of parts you assemble and decide on, context first — what you give it and what you keep back.*
- M1 context-is-king: "Context is the first piece of the agent. Tools, goals, checks, boundaries, and loops come later and depend on it."
- M4 practice-of-risk: "You have given the agent more: context, memory, more stances. Now give it less." (the frame turns on itself — strong)
- M6 new-human-role-in-the-loop: "The full picture: model, context, tools, goal, loop, checks, boundary, interface. Each was one decision about what you give the agent and what you keep back."
- Frame names its break: M7 access-is-not-absorption "An agent is context, a boundary, a set of checks and somebody who answers for what it does. The first three copy in an afternoon. The fourth does not copy at all." M8 where-is-this-all-going "The parts hold; the model rotates."
- Load-bearing weakness: M3 reads through "when to split" (coordination economics), not the parts frame; M3's lecture "Start with don't" argues with its own Big Idea "Hire three agents to search. Three more to decide." M5 module file Big Idea ("Run several quality checks... keep the winner") is a method, not a part.

## Narrative

**A — 93.** Story: an engineer runs short loops and learns the agent's account is not the repo; plan reads raise the ceiling; then they send a long task off un-packaged and it comes back confident and partly wrong; they read the wreck through three lenses, build checks against their own failure and re-send packaged; at the close the narrator shows the training's own author failing the same way. Turn, lived: M4 set-the-markers-send-it-off "send it off plainly and you find out what you can't steer yet" → M5 reading-the-return "The closing summary is not the artefact." → M5 diagnose-and-resend "packaging you built against your own failure beats packaging you guessed at." Training's own failure: M6 story-of-module-6 "The training teaches this pattern across three modules. The agent I was working with had just finished writing those three modules. It still opened with the un-packaged shape."

**B — 84.** Story: a leader turns a LinkedIn page into something theirs by changing context; builds a memory and a morning agent around their real challenge; splits work across agents and ends M3 holding a briefing they can't verify; M4 makes them give the agent less and accept residual risk; M5 builds a judge and turns it on the doubted crux answer; M6 puts the judge in a loop and moves them up a level; M7 learns sharing is absorption, not access; M8 counts the folders the room's kernel actually cited. Turn (lived): M3 three-minds-one-synthesis "You can't yet tell if the answer is right. That is expected. Name the doubt; don't fix it here." → M3 debrief "The doubt stays. Hold it." → M5 hallucination-bakeoff "Ask the agent to run it once on your `./crux.md` answer, the one Module 3 left you doubting." Training's own limit at the close: M8 where-is-this-all-going "The kernel came out of the same move as your first briefing: agents read, agents argued, something chose, and nothing in the room checked it. Hold that doubt." Below A: M7's turn is told in a lecture, not lived (exercise chain is agent-writes-file), and the M4→M5 transition is carried by a prework reading of other people's failures.

## Point of view

**A — 95.** Antti, a practitioner who builds this course with agents and drifts as he does. Narrator shows in M1 painting-the-picture ("The wizard typing in neat Perl syntax is dead."), M6 story-of-module-6 ("Five taste reversals from me on Claude's confident recommendations."), and own failure: "I drifted in every one of the ways this story just walked. I fixed what I caught. The loop caught what I missed." Also M6 agents-that-build-agents: "the first Agentics Helsinki meetup, fall 2025, had two of them." Own failure on page = 100 anchor; held at 95 because the narrator appears in two passages only.

**B — 72.** Antti, a leader who works ahead of his peers with agents and whose analysis did not move his organisation. Shows in M1 context-is-king ("For a while I felt I had lost a common language with people who write the spec first and meet to agree on it."), M4 practice-of-risk ("Damn, this is complex stuff."), M7 access-is-not-absorption ("We left with a plausible proposal and the analysis to decide on it... The proposal got neither a yes nor a no."), M8 where-is-this-all-going ("Nobody in this room knows yet, including the people running this training."). Own failure is on the page in M7, but framed as the organisation's non-decision rather than the narrator's mistake. M2, M3, M5, M6 have no narrator: impersonal second person ("A memory is *files you keep*, not a thread you close."). Stated experience ≈80; long silent stretch pulls it to the low 70s.

## Stance

**A — 91.**
- "Ask for best practice and that is what answers: a well-read average... A prediction is not a measurement." (M5 what-packaging-is) — defended by mechanism (weights hold the record, frozen at cutoff).
- "Green is a claim about the check, not a fact about the work." (M5 the-gate-is-a-claim) — defended with Goodhart and the three failure modes.
- "A rule in context is not a rule in the output." (M6 story-of-module-6) — defended with a scar (four banned-word leaks).
- "Prohibitions stop; taste steers." (M2 how-instructions-grow) — defended with mechanism.
- Against own interest, partly: "This training stops short of the full system" (M2 how-instructions-grow); "Retire what the next model outgrows" (M5).

**B — 86.**
- "*'Share the whole agent'* is not on the list." (M7 share-your-work) — defended by mechanism: "Accountability is the part with a name on it, and a name does not travel inside a folder." (access-is-not-absorption)
- "Nobody knows where agents are going, not Anthropic, not your board." (M1 what-just-happened) — asserted in M1, defended later by M8 "Which half of this is obsolete next year?"
- "More agents is not more rigour." / "Start with don't." (M3 when-to-split-an-agent) — defended with coordination cost; "Seams are where it fails."
- "Certainty is not on offer." (M4 audit-your-agent); "Expect it to cost you a feature." (M4 practice-of-risk) — defended with non-determinism mechanism.
- "A candidate picked because it fits the infrastructure is shopping." (M7 test-the-sharing-plan); "Know it before you promise a board a percentage." (M8)
- Against own interest: "Nobody in this room knows yet, including the people running this training." (M8); scar of an agentic analysis that changed nothing (M7). Many positions in M2/M5 are asserted rather than defended ("Keep the rules small and boring.").

## The pair

**A:** someone who has been there. Stance ("A prediction is not a measurement") and self-challenge ("The grade is biased by design... same-window self-charity", M3 author-test-strategy-skill; "A gate nobody has verified is a gate trusted on vibes", M5) sit in the same modules.

**B:** someone who has been there, from M4 on. Doubt: "Nothing scores the judge." (M6 when-the-score-stops-moving); "Hold that doubt." (M8). Stance: "Share the whole agent is not on the list." M1-M3 lean more toward pitch: "Generic AI becomes your AI when you build the memory it reads." (M2 compounding) is stated without a counter-voice.

## Room

The exercises carry the B story from M1 to M6. M7 tells its turn more than it lives it. M8 lives it again through the folder count.

**Strongest beats**
1. M5 hallucination-bakeoff, Phase 5: "Ask the agent to run it once on your `./crux.md` answer, the one Module 3 left you doubting. Write one line in `./crux.md`: what the judge caught, or what it could not check." The student's own M3 doubt is rescued by a tool they built. The turn is lived.
2. M1 personal-site-with-guardrails, Phase 1 → Phase 6: "Iterate until you say *'yes, this is me.'*" and then "The LLM didn't get better between Phase 1 and Phase 6. The context did." The move comes first, the name after, on the student's own material.
- Close third: M4 audit-your-agent: "The risk remains. That is expected. Name it, accept it on record, and stop there." / "The uncomfortable feeling is the evidence."

**Weakest beats**
1. M3 three-retrievers-one-curator: four prompt relays, ending "Done when `memory/_synthesis-m3.md` names what changed." Nothing asks the student to judge a seam. The lecture that follows then says "Inside a workflow, start with don't," so the student learns afterwards that the exercise they just did was the exception.
2. M7 share-your-work → design-the-sharing-plan: "The agent compares the technical, social, political, habitual, governance, and trust obstacles and writes the load-bearing one." The teammate is hypothetical and the agent does the diagnosing. The absorption turn arrives in the lecture's scar story ("The analysis was ready. The decision never came."), not in anything the student did. The prework example of an unused tool is never picked up in the exercise.
- Also told rather than lived: M8 joint-double-diamond "the sponsor says...: *'You are now agent builders.'*" This scripts the identity change instead of letting it be recognised.

## Depth

### A — learnings
1. **The agent's account of its work is a hypothesis.** Planted M1 orient-and-introspect "The account is a reconstruction, not ground truth." Complicated M3 author-test-strategy-skill "same-window self-charity"; M5 reading-the-return "The closing summary is not the artefact."; M5 the-gate-is-a-claim "The check you built is itself a claim that wants verifying." Paid off M6 story-of-module-6 "I pushed back several times on Claude saying it was 'done' before it actually was." Governor: show me where it says that. **100**
2. **Checks reset the chain, and calibration sets your reach.** Planted M1 the-machine-you-just-met "Errors stack until a check resets them." Complicated M2 when-a-plan-is-good "Push reach past what you can check and you have not delegated more"; M4 ironies-of-automation "Trust and vigilance move in opposite directions"; M5 what-packaging-is "A check is a position fix"; M5 the-gate-is-a-claim "Gates decay." Paid off M6 composing-the-workflow "An **eval** is a measurement." **100**
3. **Every session should leave something durable (compounding).** Planted M1 compound-and-close "every push-back is a hint toward your own rules." Complicated M2 how-instructions-grow "Rules have a ceiling"; M3 the-loop-half-filled "fix → memory → skill → system"; M6 spot-gaps-build-the-loop "Rules-files have a half-life." Paid off M6 agents-that-build-agents "The kit compounds; the model rotates." **100**
4. **Your stance and expression set the frontier.** Planted M1 painting-the-picture "Your stance is the ceiling." / "Two frontiers: how fast, and the right things." Complicated M5 what-packaging-is "The missing evidence is local." Paid off M6 the-2-frontiers "Your frontier is what you have expressed. It moves when you write, and only then."; agents-that-build-agents "It stops exactly where the writing stops." **80**
5. **Personal before team (the wall).** Planted M1 compound-and-close "it parks the bigger question: where a team's rules... should live." Complicated M3 author-test-strategy-skill "The team PR starts with a conversation, not a commit." Paid off M5 "The wall is your biggest challenge from here."; M6 "Cross personal → team." **80**
- Headline ideas, not developed: Bainbridge ironies (M4 only; echoed faintly); reverse-engineer anything (M1 close-the-ticket); Prohibitions stop; taste steers (M2 only); the branch is the permission (M3).
- **A Depth = 92.**

### B — learnings
1. **You can't tell from the output; leave the generation loop.** Planted M1 what-just-happened "The report is a hypothesis, not a result." Complicated M3 three-minds-one-synthesis "You can't yet tell if the answer is right."; M4 (module Big Idea) "You can't tell if your agent is safe from its output." + practice-of-risk "'I can't tell' is a real answer."; M5 grounded "'Are you sure?' is another fluent answer"; M6 when-the-score-stops-moving "Nothing scores the judge." Paid off M8 where-is-this-all-going "nothing in the room checked it. Hold that doubt." **100** (braided with 3 and paid off at the close).
   - Progression (after M1–M3 / M4–M6 / M7–M8): 60 / 100 / 100
2. **Context makes it yours, and the same lever governs risk.** Planted M1 context-is-king "You steer your agent with context." Complicated M2 compounding "Context shapes output, at system scale."; M4 practice-of-risk "More context makes a good answer likelier. Less access makes a bad answer smaller."; M7 access-is-not-absorption "The first three copy in an afternoon. The fourth does not." Paid off M8 "The parts hold; the model rotates." **90**
   - Progression: 60 / 80 / 90
3. **A system compounds; a chat does not.** Planted M2 compounding "new sources made the existing topic pages *sharper instead of longer*." Complicated M2 personal-agent-homework "A memory an agent reads on a schedule... is the start of a loop."; M6 eval-loop "the tactic on disk is rewritten until the generator passes it." Paid off M8 extend-your-system "The second agent takes ten minutes, because your vocabulary for what you want is sharper. That is the compound." **90**
   - Progression: 40 / 60 / 90
4. **Nobody knows where this goes; act to find out.** Planted M1 what-just-happened "Nobody knows where agents are going, not Anthropic, not your board." Complicated M2 "The model will change. Your memory will not."; M4 "*safe enough... for now.*"; M6 "If the model stops fabricating, what is your judge for?" Paid off M8 "Which half of this is obsolete next year?... Nobody in this room knows yet." / "What would have to show up for us to drop this?" **90**
   - Progression: 60 / 80 / 90
5. **Access is not absorption.** Planted M7 access-is-not-absorption "Access is a switch somebody flips." Complicated M7 scar "The leadership had not done the analysis. People they trusted had." Paid off M8 "Open the kernel and count how many folders it cites. That ratio is your rollout in miniature." Planted late, with one meaning-changing beat. **60**
   - Progression: 0 / 0 / 60
6. **The human moves up: design the loop, own the yardstick.** Planted M6 evals-as-steering "Evals write down what good means so the system keeps applying it when you are not in the chair." Complicated M6 new-human-role-in-the-loop "The better it gets, the less you watch." Paid off M8 "specifying well is the harder half." **60**
   - Progression: 0 / 40 / 60
- Headline ideas, not developed: M3 "Hire three agents... filesystem is the meeting room". The room forum in M8 echoes it, but M3's own lecture says "start with don't", so the idea contradicts itself instead of developing. Also: M4 "A tool call is text crossing a boundary into action" (M4 only); M5 "Mostly right, ten times over, is mostly wrong" (M5 only; A develops this into its frame); M6 "Steering raises the ceiling" (M6 only); M5 autonomy ladder (a pointer only); M1 StoryBrand / via negativa (M1 only).
- **B Depth = 82** (mean of 100, 90, 90, 90, 60, 60 = 81.7).

## Scores

| factor | A | B |
|---|---|---|
| Frame | 94 | 83 |
| Narrative | 93 | 84 |
| Point of view | 95 | 72 |
| Stance | 91 | 86 |
| Depth | 92 | 82 |

## Smallest moves for B

1. In `exercises/three-retrievers-one-curator.md` (M3), add one step where the student finds one seam (a number or a piece of shorthand lost between a retrieval file and `memory/`). The lecture's "Seams are where it fails" then names something they just saw, and the M3 exercise stops contradicting "start with don't".
2. In `exercises/design-the-sharing-plan.md` (M7), have the student state the absorption bottleneck of their own prework example (the tool people got and didn't use) before the agent clusters obstacles. The M7 turn is then lived before the scar story names it.
3. Bring the on-page M5 Big Idea in `output-quality` back to grounding ("there is truth out there; stay connected to it"). The method line then serves the idea instead of standing in for it. This is a strategy-level change and waits on the maintainer.
4. Place one signed sprawl/overreach line from the maintainer in M3 (`lectures/when-to-split-an-agent.md`, "Start with don't") so the narrator is not absent from M2 to M6. The story has to be dictated by the maintainer, not drafted.
5. In `joint-double-diamond.md` (M8), replace the scripted sponsor line "You are now agent builders" with the student counting what their own agent built since M1, so the identity turn is recognised rather than announced.
