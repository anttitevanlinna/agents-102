# Story-depth judge 3 — APT101 handbook hc3 (paired, AE101 = A, APT101 = B)

## Running notes

### A · M1
- Frame seeded: "The LLM mirrors your stance... Your stance is the ceiling." (painting-the-picture); "Two frontiers: how fast, and the right things."
- Mechanism under the mirror: "Agreeable answers won the second round... matching you is what scored well in training." (the-machine-you-just-met)
- Errors stack until a check resets them: control framing, "A failing test does not care how confident the answer sounded."
- Self-doubt: "Assume about 10% of what it says or does is made up." (orient-and-introspect); "The agent yields if you push hard enough, so its agreement settles nothing." (fix-tests-first)
- Narrator: mostly second-person instruction; aside "Everyone sees how this will bloat almost immediately." (compound-and-close). No first-person scar yet.
- Recognition-before-naming: "You just ran that loop... Kieran Klaassen calls this compound engineering."

### A · M2
- Map as frame scaffold (six phases); verification + calibration: "Push reach past what you can check and you have not delegated more. You are checking less." (when-a-plan-is-good)
- Stance: "You already agree with it... your instinct is not a check on it." "A plan without assumptions isn't assumption-free; it's just assumption-silent."
- Self-doubt on own prompt: "This prompt is fair to read as replacing the file... Precise prompting is harder than it looks." (extract-the-task-shaping-rule)
- Frame names its limit: "This training stops short of the full system..." (how-instructions-grow); "Rules have a ceiling."
- Narrator: still instructional; "Anyone who has told a child 'don't do that' knows the result."

### A · M3
- Frame load-bearing: "The agent loop is a closed-loop controller... a flaky test is a closed loop that still drifts." "Control is interrogation." (the-loop-half-filled)
- Stance: "Don't make general what you don't practice yourself." "STRIDE's value is rejection, not enumeration." "Your codebase is not a pyramid." (skills-from-the-frontier, threat-model, author-test-strategy)
- Training doubts its own tool: "The grade is biased by design... same-window self-charity." (author-test-strategy-skill); "the agent reasoned itself there... `pwd` would have answered differently" (threat-model-with-stride)
- Narrative setup: "The far half goes quiet... how do you trust work you didn't watch?" — question seeded for M4.
- Narrator: instructional "you"; no first-person yet.

### A · M4
- Narrative turn engineered: "Session one goes now, un-packaged... Session two goes packaged, after you've read the return." (test-and-learn); "You're new to this country. A tourist runs an agent and hopes."
- Frame through engineering literature: Bainbridge 1983 "Monitoring and takeover run on the same reps"; "Trust and vigilance move in opposite directions... The watching still has to be engineered." (ironies-of-automation); backpressure (what-keeps...)
- Stance: "The machine would rather produce something than admit nothing" (reading-the-return); "When your agent stops for missing information... Usually there was."
- Narrator still second person; no first-person scar.

### A · M5
- Turn lived: "The task is the same, packaged this time, and the prompt shrank." (diagnose-and-resend); sea passage "An unchecked session arrives confident, and wrong... The success report comes from the wrong harbor." (what-packaging-is)
- Stance defended by mechanism: "Steer it as hard as you like: what it holds about your next run is a forecast." "A prediction is not a measurement." (what-packaging-is)
- Training doubts its own check: "Green is a claim about the check, not a fact about the work... A gate nobody has verified is a gate trusted on vibes." Goodhart, Deming tampering (the-gate-is-a-claim).
- Frame names where it breaks: "Sutton's bitter lesson... Today's right procedure, your gates and workflow... is superseded too." "Whether this field ever settles into a real best practice is an open question."

### A · M6
- Top-rung POV: story-of-module-6, first person, named ("Antti"), numbers ("Five taste reversals... Four banned-word leaks"), own failure on page: "I drifted in every one of the ways this story just walked." "The paraphrase I shipped as a quote." Training's own failure = the turn: "The agent I was working with had just finished writing those three modules. It still opened with the un-packaged shape."
- Stance thesis: "A rule in context is not a rule in the output." "A rule in memory that does not force is worse than no rule."
- Frame closes and names its breakpoint: "The kit compounds; the model rotates." "nobody has that part figured out yet." (agents-that-build-agents)
- Open ending: "There is no last turn." "You will catch what I missed."
- AE101 overall: frame = agentic engineering is engineering (control loop, verification, compounding), load-bearing every module; narrative = un-packaged → packaged, training's own failure in M6; narrator = Antti in M6 with scars, elsewhere instructional; stance defended by mechanism (RLHF, Goodhart, Bainbridge). Slides ≈ 150 `##`.

### B · M1
- Frame stated: "Building got cheap, deciding didn't... Every other step is a decision... None of those got cheaper." (building-is-cheap); origin: "The post-it was not naive. It was what the craft shrank to when building was expensive." (building-rationed-it) — vindication frame: "the outcome craft finally gets the experiments it always asked for."
- Stance thread question: "When agents analyse wider, deeper and faster, what is your insight?" — asked, left to student.
- POV: first-person scar arrives early, quoted: "We built a tool that worked. It was used just a bit... Bad idea, as the need wasn't a daily one." (building-is-cheap) — a guide failure, but small and borrowed from an essay, not this training's own failure.
- Lots of cited authorities (Cutler, Seiden, Christensen, Torres, O'Reilly, Cagan, Bland, Hohmann) — handbook risks reading as a curated canon rather than voice.
- Stance: "The best mitigation is the door you don't open... It will cost you a source somebody wanted in. Leaving it out is still the right call." "One agent per recurring job, not one company brain." "Some of those lines will be wrong" (it-runs-overnight) — sets M2 stakes.

### B · M2
- Turn: digest agrees with favourite hypothesis → "It found what you asked it to look for... the agreement may come from your question, not from your customers." (why-it-agreed) — a turn the student lives through via their own brief (prompt to open "the brief you wrote").
- Stance against own sale: "a team that does not talk with its customers every week should start there, before agents... That sells less of this training. It is still where to start." (go-back-to-your-customers) — asserted with mechanism ("Agents build them in days... before any customer can say a guess was wrong"). Also "Agents amplify the way a team already works. They do not transform it." (why-it-agreed)
- POV: guide shows in a quoted essay: "I used to think of being wrong as failure... My creations are not me" (why-it-agreed, Antti 2025-05-09) — vulnerability, not a scar from this training's making.
- Mechanism stance: "Not the next true word; the next likely one... Later models will fabricate less; they won't stop." (fluent-is-not-true)
- Frame through "insight" thread: "When agents analyse wider... analysis stops being the scarce part. So what is the insight only your team can bring?" (why-it-agreed). Thread reprises AE101 machinery (mirror, taste ceiling, Deming, "agent stops where you stop writing") — many lines transplanted near-verbatim.
- Heavy authority parade again (Torres, Fitzpatrick, Design Council, Liberating Structures, Edmondson, Houde & Hill, Osterwalder, Bland, Marquet, Klein, Deming).

### B · M3
- Frame names where it breaks: "Cheap building helps your rivals too... This is where 'building got cheap, deciding didn't' stops being an edge on its own... What would change this training's mind: agents that start deciding well" (where-you-go-from-here) — top-rung frame move.
- Narrative payoff: "What your five users did that the digest never said... Which of them would you have found by reading the digest alone?" (bet-meets-five-users); "A slice that comes back no has done its job."
- Guide failures as essay epigraphs: "We built good things. We failed to share them well." (from-us-to-the-team); "I still make mistakes. More than I'd like... I make them faster now" (where-you-go-from-here).
- Stance: "A team that writes for its own criteria has rebuilt the feature factory with a dashboard." (what-good-means); "An agent's instructions are not the agent... cannot promise 'everyone gets our agent'" (from-us-to-the-team).
- Mid-module drift into topic list: three-jobs-rewritten runs six slides (jobs, strategy, leadership, aligned autonomy, one level up, trust fades) — plot pauses; trust-fades transplants AE101's Bainbridge line verbatim ("when did you last do this kind of work by hand?").
- Open ending: "So the question stays open, and it is yours to answer on your own product."

---

## Frame

**A — AE101.** One sentence: agentic engineering is engineering — a closed control loop whose quality is set by the checks you build, compounding into a system. Three modules that only make sense through it:
- M3 the-loop-half-filled: "The agent loop is a **closed-loop controller**... Cut the feedback signal (a test, a check, a read) and it drifts. Signal quality is part of the law: a flaky test is a closed loop that still drifts."
- M5 what-packaging-is: "**A check is a position fix**. At a fix the wedge of possible states collapses to a point, and the next leg starts from a known position instead of an assumption."
- M4 ironies-of-automation: "This is a 1983 argument, not an AI take... The trust is deserved. The watching still has to be engineered."
Where it breaks, on the page: M5 the-gate-is-a-claim "Sutton's **bitter lesson**... Today's right procedure, your gates and workflow, yours or the agent's, is superseded too."; M2 how-instructions-grow "This training stops short of the full system"; M6 agents-that-build-agents "The goal is giving the system the right information, and nobody has that part figured out yet." Every module reads through the lens and the lens names its own limit. **95.**

**B — APT101.** One sentence: building got cheap, deciding didn't — so the outcome craft that rationing shrank to post-its finally gets its experiments, and the trio is for the decisions. Load-bearing across modules:
- M1 building-is-cheap: "For years the slice was the slow step. Now an agent can build it. Every other step is a decision... None of those got cheaper."
- M1 building-rationed-it: "The post-it was not naive. It was what the craft shrank to when building was expensive."
- M2 widen-before-you-choose: "Merging the pile now takes an agent seconds. Choosing which idea survives it takes the same people it always did."
- M3 three-jobs-rewritten: "When building took most of a team's weeks, leading meant rationing that capacity... When building is cheap, that rationing matters less."
Where it breaks: M3 where-you-go-from-here "This is where 'building got cheap, deciding didn't' stops being an edge on its own. When rivals build as cheaply, speed is the entry price... What would change this training's mind: agents that start deciding well." That is the 100-rung move. Held back from AE101's level because the frame is restated more than it is used: the "X got cheap; Y did not" closer ends a large share of slides (M2 each-of-you-makes-something "With agents, the finished look got cheap. Picking the one question a prototype should answer did not."; "The build got cheap. Dropping a bet... is still a hard call."; M3 "Agents made the how cheap. Deciding the why... did not get cheaper."), so several slides (Nielsen's five users, Patton's story map, Fitzpatrick) would read the same without it — the frame is appended rather than generative there. **88.**

## Narrative

**A — AE101.** Five sentences: An engineer meets a steerable machine that mirrors their stance and learns to steer it with checks. They plan, codify rules and author skills on the near half of the map where feedback is quick. Then the feedback goes quiet: they send a task off un-packaged and it comes back drifting, confident and wrong. They diagnose the run through three failure lenses, build a verifier, reference and plan.md, and re-send it packaged — "The task is the same, packaged this time, and the prompt shrank." (M5 diagnose-and-resend). Then the guide reveals the training itself failed the same way while being made: "The agent I was working with had just finished writing those three modules. It still opened with the un-packaged shape." (M6 story-of-module-6). Stakes are set up in M3 ("how do you trust work you didn't watch?", the-loop-half-filled), lived in M4–M5 ("An unchecked session arrives confident, and wrong... The success report comes from the wrong harbor.", what-packaging-is), and turned on the training in M6. The turn is the training's own failure. **94.**

**B — APT101.** Five sentences: A trio that knew the outcome craft but could only afford post-its learns building got cheap and writes a bet with a signal that could say no. They send off a digest agent overnight, warned that "Some of those lines will be wrong" (M1 it-runs-overnight). The digest comes back agreeing with their favourite hypothesis — and the turn: "If it does, the agent did as asked... So the agreement may come from your question, not from your customers." (M2 why-it-agreed). They widen, make the cheapest test, and put the bet in front of five users: "What your five users did that the digest never said... Which of them would you have found by reading the digest alone?" (M3 bet-meets-five-users). The trio ends with "A slice that comes back no has done its job" and a proposal the team will change on Monday. A turn the student lives through, on their own brief and bet, with a payoff in Day 3. It is not the training's own failure, and M3's middle (three-jobs-rewritten: jobs, strategy, leadership, aligned autonomy, one level up, trust fades) pauses the plot for a topic run. **83.**

## Point of view

**A — AE101.** Who: Antti, a practitioner who built this module with Claude and logged the session — named, signed, numbered. Mostly second-person instruction elsewhere (M1 compound-and-close aside "Everyone sees how this will bloat almost immediately."). Three places he shows, M6 story-of-module-6: "Five taste reversals from me on Claude's confident recommendations."; "The paraphrase I shipped as a quote... Claude had written a paraphrase and presented it as attribution."; "I drifted in every one of the ways this story just walked. I fixed what I caught. The loop caught what I missed." His own failure is on the page, in a passage, about this training. **95.**

**B — APT101.** Who: Antti, surfacing as dated essay excerpts with a byline, otherwise a neutral instructional voice that leans on cited authorities. Three places: M1 building-is-cheap "We built a tool that worked. It was used just a bit... Bad idea, as the need wasn't a daily one... (Lucky it did not take that long to build it.)"; M2 why-it-agreed "I used to think of being wrong as failure... My creations are not me and not everything has to be perfect."; M3 from-us-to-the-team "We built good things. We failed to share them well."; M3 where-you-go-from-here "I still make mistakes. More than I'd like. The difference is I make them faster now." The guide's own failure is on the page (installer, sharing), so the top-rung marker is present, but as epigraphs: short, quoted, general ("I still make mistakes"), never a passage where the guide tells a product decision he got wrong with agents and what he missed. Between epigraphs the voice belongs to Torres, Cagan, Bland, Fitzpatrick, Nielsen. The guide is a quoted authority more than a narrator with a stated experience. **84.**

## Stance

**A — AE101.** Positions it could lose a customer over, each defended:
- "Steer it as hard as you like: what it holds about your next run is a forecast... **A prediction is not a measurement.**" (M5 what-packaging-is) — mechanism: no document holds the local run.
- "A rule in context is not a rule in the output." (M6 story-of-module-6) — defended by the scar: four banned-word leaks with the rule loaded.
- "Green is a claim about the check, not a fact about the work... A gate nobody has verified is a gate trusted on vibes." (M5 the-gate-is-a-claim) — mechanism: Goodhart, optimizer aimed at the gate.
- "Agreeable answers won the second round... matching you is what scored well in training." (M1 the-machine-you-just-met)
- "Don't make general what you don't practice yourself." (M3 skills-from-the-frontier)
Against its own interest: weakest point — "This training stops short of the full system" and the bitter lesson retiring its own procedures are close, but nothing says "don't buy this". **92.**

**B — APT101.** Positions, each defended:
- Against its own sale: "a team that does not talk with its customers every week should start there, before agents... That sells less of this training. It is still where to start." (M2 go-back-to-your-customers) — mechanism: "Agents build them in days, and the team ships them before any customer can say a guess was wrong."
- "Agents amplify the way a team already works. They do not transform it... A faster feature factory is still a feature factory." (M2 why-it-agreed)
- "One agent per recurring job, not one company brain" (M1 it-runs-overnight) — mechanism: "a fix for one job shifts the answers for the others".
- "It will cost you a source somebody wanted in. Leaving it out is still the right call." (M1 it-runs-overnight)
- "'Are you sure?' is another fluent answer... This isn't a bug that gets patched in the next release... Later models will fabricate less; they won't stop." (M2 fluent-is-not-true)
- "So a proposal to the wider team cannot promise 'everyone gets our agent'." (M3 from-us-to-the-team) and "A team that writes for its own criteria has rebuilt the feature factory with a dashboard." (M3 what-good-means)
A position held against its own commercial interest is on the page and defended — the 100 rung marker. Kept below 90 because the defence is two sentences and the edgiest lines are often borrowed (Cutler, Fitzpatrick, Strathern) rather than the training's own; several stances are AE101's transplanted (mirror, Goodhart, Deming, Bainbridge) rather than product-craft positions the trio would argue with. **88.**

## The pair

**A — AE101.** Stance and self-challenge together: the training doubts its own tools ("The grade is biased by design... same-window self-charity", M3 author-test-strategy-skill; "This prompt is fair to read as replacing the file... Precise prompting is harder than it looks", M2 extract-the-task-shaping-rule) and holds ground ("A rule in memory that does not force is worse than no rule"). Reads as someone who has been there.

**B — APT101.** Doubt: "What would change this training's mind: agents that start deciding well" (M3 where-you-go-from-here); "A pass is a claim about a check nobody has tested" (M3 what-good-means). Ground: "That sells less of this training. It is still where to start." Both present — reads as someone who has been there, though the "someone" is thinner: the been-there evidence is in epigraphs and borrowed authorities, so at moments it tilts toward a well-curated canon rather than a scarred guide. Not a pitch, not a hedge.

## Scores

| factor | A (AE101) | B (APT101) |
|---|---|---|
| Frame | 95 | 88 |
| Narrative | 94 | 83 |
| Point of view | 95 | 84 |
| Stance | 92 | 88 |

## Smallest moves for B

1. Turn one Antti epigraph into a passage of the guide's own: a digest or research summary that agreed with his favourite hypothesis, what he built on it, and what a customer later showed him, placed beside M2 why-it-agreed.
2. Collapse M3 three-jobs-rewritten (future-leadership, aligned-autonomy, one-level-up) into one slide that hands the trio back to their own five-users result, so Day 3 stays in the plot instead of pausing for a leadership topic list.
3. Drop the "X got cheap; Y did not" closing line from most slides and keep it at the frame statement and at where-the-frame-breaks, so the frame works through the cases instead of being restated after them.

## Volume

Rough count of `##` headings the student sees, from read-curriculum output:
- A (AE101): ~181 `##` sections across lectures and exercises; ~89 in lectures alone.
- B (APT101): ~79 `##` slides, all lectures (APT101's handbook carries no exercises).
