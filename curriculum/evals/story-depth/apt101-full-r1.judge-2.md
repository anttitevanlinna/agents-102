# Storytelling judge 2 — AE101 (A) vs APT101 (B), full-training paired read, r1

## Running notes

### A · M1 getting-going
- Frame seeds: "The LLM mirrors your stance" / "Your stance is the ceiling" (painting-the-picture); "That is the machine. The rest is steering." (the-machine-you-just-met). Feedback control seeded: "A check from outside the session resets the chain" (errors-stack).
- Exercises produce the failure, lecture names it after: "You just ran the same loop... The agent's first read was partly wrong" (the-machine-you-just-met).
- Stance: "Assume about 10% of what it says or does is made up" (orient-and-introspect); "The agent yields if you push hard enough, so its agreement settles nothing" (fix-tests-first).
- POV: mostly second-person instruction; narrator shows in lines, not passages yet.

### A · M2 plan-mode-done-right
- Frame: verification-as-control continues: "What you can test and check sets your complexity ceiling" / "Push reach past what you can check and you have not delegated more. You are checking less." (when-a-plan-is-good). Six-phase map (the-whole-map).
- Stance: "Structure is persuasive... often just a draft formatted like a decision"; "Read it assuming something in there is wrong; there usually is" (when-a-plan-is-good). "The cure is not better rules; it is where the rules live" (how-instructions-grow).
- Frame names its limit: "This training stops short of the full system" (how-instructions-grow).
- Self-doubt: "This prompt is fair to read as replacing the file... Precise prompting is harder than it looks" (extract-the-task-shaping-rule) — the training admits its own prompt is ambiguous.

### A · M3 earn-the-trust
- Frame lands as engineering laws: "The agent loop is a **closed-loop controller**... Cut the feedback signal... and it drifts" (the-loop-half-filled); "Control is interrogation" / "The branch is the permission" (same). Map device: near half / far half — "Different country, different rules. M4 opens it."
- Stance: "Don't make general what you don't practice yourself" (skills-from-the-frontier); "STRIDE without an access-surface map is pub-quiz threat modeling" (map-the-access-surface); "Authoring without invocation is theatre" (author-test-strategy-skill).
- Training doubts its own tools: "The grade is biased by design... same-window self-charity" (author-test-strategy-skill); "> Might be slightly leaky" (module file, clear session); ADR-in-worktree failure "The agent reasoned forward from the conversation, not from the filesystem" (threat-model-with-stride) — a failure the training's own prompt wording produces.

### A · M4 run-the-first-experiment
- Narrative turn engineered: send-off un-packaged on purpose — "Session one goes now, un-packaged... Session two goes packaged, after you've read the return" (test-and-learn); "send it off plainly and you find out what you can't steer yet" (set-the-markers).
- Frame: Bainbridge 1983 — "The better the automation, the less you do the task by hand, and the worse you are at the moment you are needed most" (ironies-of-automation) — frame naming its own breaking point. Backpressure (what-keeps-a-long-running-session-going).
- Stance: "When your agent stops for missing information, check whether there was a way for it to uncover that. Usually there was."; Mollick pre-read: "Mollick does not call the winner. Neither does this training... claims like that expire" (module file) — doubt about its own checks.
- Voice: "The nudge reads as encouragement and lands as a taunt."

### A · M5 learn-from-the-test (part)
- Turn lived: "The un-packaged run was supposed to underdeliver. What came back is data, not blame" (diagnose-and-resend).
- Mechanism-defended stance: "The LLM produces the next likely word, not the next true one" (reading-the-return); "Hooks exist because the LLM is forgetful" (hooks-always-fire); sea passage "The success report comes from the wrong harbor" (what-packaging-is).
- Stance strongest here: "The model has read the field... what it holds about your next run is a forecast" / "A prediction is not a measurement" (what-packaging-is); "Green is a claim about the check, not a fact about the work"; Goodhart, Deming tampering, Sutton bitter lesson — "Today's right procedure, your gates and workflow... is superseded too" (the-gate-is-a-claim). Frame names where it breaks (bitter lesson against its own kit).
- The wall: "A rule promoted before it works on you is a rule your team has to live with" (module file, The whole map?).

### A · M6 spot-gaps-build-the-loop
- POV peak: story-of-module-6 first person, own failure: "I drifted in every one of the ways this story just walked"; "The agent I was working with had just finished writing those three modules. It still opened with the un-packaged shape"; "Four LLM instances wrote and verified that closer. None caught the contradiction". Signed "Antti".
- Narrative 100-ish: the turn is the training's own failure (story-of-module-6 — the M6 build session fails the M5 lesson).
- Ending: "There is no last turn... The kit compounds; the model rotates. The training closes." (agents-that-build-agents). "nobody has that part figured out yet" — doubt + stance.
- Weak spots: composing-the-workflow is figure-only slides (Dino, Pocock) — the story thins to a catalogue there; M6 exercise "two sessions are enough to place every lesson" is lived.

=== A read complete. ===

### B · Day 1 our-product-our-system (part 1)
- Hero = trio with own product: Start here "what is the last thing your team built that nobody asked for?... what were you sure of at the time?" (module file). Strong opener that sets the protagonist's want/obstacle.
- Frame seeded: "Building got cheap, deciding didn't" (apt101-building-is-cheap); "The post-it was not naive. It was what the craft shrank to when building was expensive" (apt101-building-rationed-it) — vindication frame: the outcome craft finally gets its experiments.
- Guide appears: "We built a tool that worked. It was used just a bit... Antti Tevanlinna, *Failing and Succeeding at the Same Time*" (apt101-building-is-cheap) — the guide's own failure, short, in a lecture before exercises.
- Exercise produces the lesson: product box, five passes, "You told Claude different things between the two, and nothing else changed" (apt101-paint-the-product-box) — then lecture names it after ("The agent knows only what you tell it"). Good order.
- Stance: "His own caveat, three years later: a prescriptive 'build this' bet may be the right approach" (Cutler) — fair, but borrowed. "A signal that can only say yes is not a test" (apt101-write-the-bet lecture). Mostly cited, little defended by own scar.
- Lecture apt101-only-what-you-tell-it reuses AE101's dinner demo near-verbatim.
- Bet exercise: "That disagreement is worth more than a tidy map" — room lived.

### B · Day 1 (part 2) — door, memory, send-off
- Exercise-first holds: what-goes-in exercise then the lecture "The best mitigation is the door you don't open" (apt101-it-runs-overnight). Door stance: "It will cost a source somebody wanted in. That is the door working. Anyone may say no to a source, and a no needs no defending" (apt101-what-goes-in) — a position held against convenience.
- Plant for the turn: "It will read well. Every line will sound as sure as the next. Some of those lines will be wrong" (apt101-it-runs-overnight) — NB: lecture TELLS the failure before the student lives it (pre-empts Day 2's discovery). Phase 6 "does it sound sure of itself?" (apt101-send-it-off) is a good lived plant.
- Stance: "One agent per recurring job, not one company brain" — defended with mechanism ("nobody can say which job's instructions did it").
- Weak: the debrief's "Write down how you worked" reuses A101 prompt; team rules beat "Agree on nothing yet" — good room tension held open.

### B · Day 2 whats-actually-true (part 1)
- Turn lived: read-the-digest → "Mark the line you trust least... If your doubt lands on a typo, look again" (apt101-read-the-digest); then lecture names it: "The digest agrees with your favourite hypothesis... the moment you are least likely to check" (apt101-the-digest-is-back). Start-here: "When did your team last build something because the research agreed with what you already thought?" — the confirmation-bias spine.
- Mechanism: "agreeable answers did well. An agent's account of its own work reads well partly because reading well was rewarded" (apt101-the-digest-is-back).
- Weak: the digest's flattery only "lands" if the overnight run actually flatters; exercise does not explicitly put bet beside digest — the lecture does.

### B · Day 2 (part 2) — evidence, why it agreed, tree, bake-off, choose
- THE TURN named after it's lived: "It found what you asked it to look for... So the agreement may come from your question, not from your customers" (apt101-why-it-agreed). Diagnosis-first: "The instructions are one suspect; your question is another". Frame climax: "A faster feature factory is still a feature factory... Agents amplify the way a team already works. They do not transform it."
- Guide at full strength: "For most of my working life I wanted to be right... It gave me anxiety, and a feeling of insufficiency... Being wrong does not diminish you. Lack of effort to understand does. — Antti Tevanlinna" (apt101-why-it-agreed). Narrator's own failure on the page, as guide, then handed back: "When the digest agrees with you, that is the moment to go looking for your wrong."
- Stance AGAINST COMMERCIAL INTEREST: "So a team that does not talk with its customers every week should start there, before agents... That sells less of this training. It is still where to start." (apt101-go-back-to-your-customers). 100-anchor evidence.
- Stance with mechanism: "Large language models generate the next likely word. Not the next true word... This isn't a bug that gets patched in the next release. It's the shape of the technology" (apt101-fluent-is-not-true). "'Are you sure?' is another fluent answer".
- Room: catch-it-making-things-up = strong lived beat (plant, four checks, scorer, then "Run it on something real... 'The agent got this wrong' is the sentence"); grow-the-tree "Put down the opportunity only you would think of" + merge-keeps-names = the anti-averaging stance lived.
- Weakness: heavy citation density in Day 2 lectures (Torres, Fitzpatrick, Edmondson, Double Diamond, Liberating Structures, Houde & Hill, Osterwalder, Marquet, Klein) — reads as a well-sourced handbook between the guide's scenes; stance borrowed more than defended. apt101-each-of-you-makes-something sits after the choose exercise but BEFORE the making — lecture leads there.

### B · Day 2 (close) — make, pre-mortem, rules, tonight
- Room: make-your-piece "Does the working agreement give the agents a job that would have produced today's made-up quote?" — pieces cross-checked against the day's failure. Sceptical-colleague rehearsal: "Push back on a colleague who folds after one answer. The real one won't."
- Pre-mortem: "If the bet does not survive, that is good work. Go back to the tree and choose again before you leave" (module file, Talk it through) — the training allows its own build to be thrown away; stance lived.
- Second leg of the turn: tonight's brief now asks "what argues against the bet" — "the question the first digest never did" (apt101-keep-and-run-tonight). Packaged re-send analogue to AE101's M4→M5.
- Lectures write-it-down-or-lose-it lift AE101's "agent stops where you stop writing" + Deming tampering — shared spine, adapted.

### B · Day 3 learn-faster-than-the-market (part 1)
- Big Idea is a question: "What is each of us for... when building gets cheap?" — frame as open identity question, answered by the student.
- Story map/slice: "Push back on a first slice chosen because it is easy to build. The question is which slice teaches you the most if it comes back no." (apt101-map-the-story).
- What good means: "A team that writes for its own criteria has rebuilt the feature factory with a dashboard" (apt101-what-good-means) — frame turned on the training's own instrument (the frame naming where it breaks). "A yardstick you rewrite mid-run is not a yardstick" (apt101-write-what-good-means). caught.md holds Day 1 digests against the ceiling — Day 1 failure re-read on Day 3.
- Weak: write-what-good-means lecture comes AFTER the exercise (good), but the exercise opening already explains floor/ceiling at length — tells before lived.

### B · Day 3 (part 2) — five users, three jobs, team, ending
- Room peak: five-users "The confusion is the finding"; "for each moment, say whether the digest said it, could have said it, or could not have" (apt101-five-users) — Day 1 digest re-read against live users: the turn's third leg.
- "A slice that comes back no has done its job" (apt101-bet-meets-five-users).
- Guide: "We built good things. We failed to share them well." (apt101-from-us-to-the-team); "I still make mistakes. More than I'd like. The difference is I make them faster now" (apt101-where-you-go-from-here).
- Frame names where it breaks: "Cheap building helps your rivals too... This is where 'building got cheap, deciding didn't' stops being an edge on its own... What would change this training's mind: agents that start deciding well" (apt101-where-you-go-from-here). 100-anchor property for Frame.
- Stance vs vendor pitch: "An agent's instructions are not the agent... a proposal to the wider team cannot promise 'everyone gets our agent'"; "Access is easy; absorption is scarce" (apt101-from-us-to-the-team).
- Open ending, on purpose: "The bet is still open... what will your insight be? You answer that on your own product, with your team, one bet at a time" (module Next).
- Weak: take-it-to-the-team glosses reused prompts ("Where Claude says *teammate*, read *your wider team*. Where it says *candidate*, read *the way of working*") — seam where the story becomes plan paperwork. three-jobs-rewritten restates AE101's Bainbridge in plain words — fine but unowned ("Automation researchers named it in the 1990s").

=== B read complete. ===

---

## Frame

**A — AE101.** One sentence: *agentic engineering is engineering: a closed control loop whose quality is set by the checks you can run, compounding into durable state.* Three modules that only make sense through it:
- M1 the-machine-you-just-met: "A check from outside the session resets the chain. A failing test does not care how confident the answer sounded." The failing-test-first exercise is a control move, not a TDD ritual.
- M3 the-loop-half-filled: "The agent loop is a **closed-loop controller**... Cut the feedback signal (a test, a check, a read) and it drifts. Signal quality is part of the law: a flaky test is a closed loop that still drifts."
- M5 what-packaging-is: "**A check is a position fix**. At a fix the wedge of possible states collapses to a point." The un-packaged/packaged pair is an A/B on the controller.
Where it breaks, on the page: M4 ironies-of-automation, "The better the automation, the less you do the task by hand, and the worse you are at the moment you are needed most"; M5 the-gate-is-a-claim, "Sutton's **bitter lesson**... Today's right procedure, your gates and workflow, yours or the agent's, is superseded too." The lens turns on its own instruments ("Green is a claim about the check, not a fact about the work"). **Score 94.**

**B — APT101.** One sentence: *building got cheap, deciding didn't; agents finally give the outcome craft its experiments, and amplify whatever way the team already works.* Three modules through it:
- Day 1 apt101-building-is-cheap: "Agents make the slow step cheap. The hard steps stay where they were... None of those got cheaper." The post-it vindication ("The post-it was not naive. It was what the craft shrank to when building was expensive", apt101-building-rationed-it) is the frame's opening move.
- Day 2 apt101-why-it-agreed: "It analysed everything and still had no insight" / "A faster feature factory is still a feature factory... Agents amplify the way a team already works. They do not transform it."
- Day 3 apt101-three-jobs-rewritten: "When building took most of a team's weeks, leading meant rationing that capacity... When building is cheap, that rationing matters less."
Where it breaks, on the page: Day 3 apt101-where-you-go-from-here, "This is where 'building got cheap, deciding didn't' stops being an edge on its own... What would change this training's mind: agents that start deciding well." That is the 100-anchor property, stated and dated. Docked because the lens is a product-strategy thesis rather than a mechanism; it carries every module's *why* but not, as AE101's does, the *how* of each move (the door, the judge, the story map read through "deciding didn't" by assertion more than by derivation). Second strand (amplification) sits beside the first rather than under it. **Score 89.**

## Narrative

**A — five sentences.** An engineer learns the machine mirrors them and that checks reset the chain (M1–M2). They earn trust with curated skills and a skill of their own, and the map's near half fills (M3). They send a real task off un-packaged on purpose — "send it off plainly and you find out what you can't steer yet" (M4 set-the-markers-send-it-off) — and it comes back wrong. Turn: "The un-packaged run was supposed to underdeliver. What came back is data, not blame" (M5 diagnose-and-resend); each failure earns its check and the task goes again, packaged. Then the author shows the training's own build failing the training's lesson: "The agent I was working with had just finished writing those three modules. It still opened with the un-packaged shape" (M6 story-of-module-6), and closes "There is no last turn" (M6 agents-that-build-agents). The failure is designed by instruction and the turn is the training's own failure. Dock: M6 composing-the-workflow thins to a catalogue between the loop and the story. **Score 93.**

**B — five sentences.** A trio arrives with a product and a buried question — "what is the last thing your team built that nobody asked for?... what were you sure of at the time?" (Day 1 module Start here). They paint the box, write a bet that can lose, agree the door, build memories, and send an agent overnight. Day 2 the digest comes back sounding sure; they mark the line they trust least, and the lecture names it: "It found what you asked it to look for... So the agreement may come from your question, not from your customers" (Day 2 apt101-why-it-agreed). They catch the agent inventing claims, choose a bet, pre-mortem it, and re-brief tonight's run to ask "the question the first digest never did: what argues against the bet" (Day 2 apt101-keep-and-run-tonight). Day 3 five users do "things the digest could not have said" (apt101-five-users: "say whether the digest said it, could have said it, or could not have"), and the ending is left open on purpose: "The bet is still open" (Day 3 module Next).
The intended-shape test, checked against the page: **the confirmation turn is contingent, not designed.** The Day 1 brief asks neutrally — "tell it what you want: what your material says about the bet, with the line it came from" (apt101-send-it-off Phase 4) — and the Day 2 lecture hedges on it: "If it does, the agent did as asked" (apt101-why-it-agreed). AE101 instructs its failure; B hopes for one. What the student reliably lives is the weaker beat ("does it sound sure of itself?", "mark the line you trust least"). Three ordering violations against "exercises produce, lectures name": apt101-it-runs-overnight tells the turn on Day 1 before it happens ("Some of those lines will be wrong: a pattern stretched past its evidence, a quote smoothed into something nobody said"); apt101-each-of-you-makes-something lectures each role's piece before Make your piece; apt101-write-what-good-means explains floor/ceiling at the opening of the exercise before the loop runs. The arc (digest → re-brief → five users) is a real three-leg turn, and the room lives the second and third legs. The first leg is only a hope. **Score 84.**

## Point of view

**A.** Second-person instruction for five modules, with the narrator surfacing in lines: "The nudge reads as encouragement and lands as a taunt" (M4 set-the-markers-send-it-off); "> Might be slightly leaky. Here, the simple ask is good enough" (M3 module file); "Precise prompting is harder than it looks" (M2 extract-the-task-shaping-rule). Then one first-person passage by a narrator with scars, signed "Antti": "Five taste reversals from me on Claude's confident recommendations... I drifted in every one of the ways this story just walked. I fixed what I caught. The loop caught what I missed" (M6 story-of-module-6). The narrator's own failure is on the page, in detail and with dates. **Score 95.**

**B.** The guide is Antti, in short first-person slides, never the hero, as intended:
- "One of the first things we tried building was a local installer... It got working and it was used just a bit. Bad idea" (Day 1 apt101-building-is-cheap).
- "For most of my working life I wanted to be right... It gave me anxiety, and a feeling of insufficiency... Being wrong does not diminish you. Lack of effort to understand does" (Day 2 apt101-why-it-agreed). This is the guide's own failure, handed straight back to the student: "When the digest agrees with you, that is the moment to go looking for your wrong."
- "We built good things. We failed to share them well" (Day 3 apt101-from-us-to-the-team); "I still make mistakes. More than I'd like. The difference is I make them faster now" (Day 3 apt101-where-you-go-from-here).
Against B's intended shape this is met: the guide is placed at the training's three hinges (build is cheap, why it agreed, sharing), and the scars are real. The cap comes from what lies between: the voice in between is neutral second person, much of it carried by cited authorities (Torres, Seiden, Cutler, Fitzpatrick, Edmondson, Klein, Houde & Hill, Nielsen, Kniberg, Marquet). The narrator is visible in five places out of roughly twenty lectures. Every guide line is an essay quote. None of them is a scene from this product work told in the room's terms. **Score 87.**

## Stance

**A.** Positions it could lose a customer over, each defended:
- "Assume about 10% of what it says or does is made up" (M1 orient-and-introspect). Defended by mechanism in M1 the-machine-you-just-met: "Agreeable answers won the second round... matching you is what scored well in training."
- "The model has read the field... what it holds about your next run is a forecast" / "**A prediction is not a measurement**" (M5 what-packaging-is). Defended by the local A/B the student is running.
- "A rule in context is not a rule in the output" (M6 story-of-module-6). Defended by scar: four leaks across four instances of the same rule.
- "Mollick does not call the winner. Neither does this training... each one is a claim that this is a place the model still needs you, and claims like that expire" (M4 module file), together with the bitter lesson in M5 the-gate-is-a-claim. This holds against its own commercial interest: the kit the training sells is a candidate that will expire.
**Score 92.**

**B.** Positions defended on the page, not by proxy:
- Against its own commercial interest: "So a team that does not talk with its customers every week should start there, before agents... That sells less of this training. It is still where to start" (Day 2 apt101-go-back-to-your-customers). This is the 100-anchor property, in plain words.
- "Large language models generate the next likely word. Not the next true word... This isn't a bug that gets patched in the next release. It's the shape of the technology" (Day 2 apt101-fluent-is-not-true). Defended by mechanism, then lived in the bake-off.
- "One agent per recurring job, not one company brain... when something goes wrong nobody can say which job's instructions did it" (Day 1 apt101-it-runs-overnight). Defended by mechanism.
- "An agent's instructions are not the agent... a proposal to the wider team cannot promise 'everyone gets our agent'" (Day 3 apt101-from-us-to-the-team). This is an anti-vendor position, defended by the memory-and-corrections mechanism.
- "A team that writes for its own criteria has rebuilt the feature factory with a dashboard" (Day 3 apt101-what-good-means). The frame turned on the training's own instrument.
Handbook share: most Day 1–3 lecture positions are borrowed authority (Cutler's feature factory, Seiden's outcome, Torres's weekly touch, Fitzpatrick's fluff, Klein's thirty percent, Nielsen's five). They are correct, sourced and asserted by proxy, and none is defended by the guide's own scar. The guide's scars back the *mood* ("I wanted to be right") more than a contested *position*. **Score 87.**

## The pair

- **A — someone who has been there.** It doubts its own tools ("Might be slightly leaky", same-window self-charity, "the gate is a claim too", its own build failing its own lesson) and still holds ground ("A prediction is not a measurement", "Control is interrogation").
- **B — someone who has been there, leaning handbook in the middle.** It doubts itself ("What would change this training's mind", "That sells less of this training", "Later models will fabricate less; they won't stop") and holds ground ("A faster feature factory is still a feature factory", "Anyone may say no to a source, and a no needs no defending"). In Day 2's lecture run the ground is held by cited authorities more than by the guide. Neither a hedge nor a pitch.

## Room

B only. Do the exercises carry the story, so the turn is lived and not just told? **Mostly yes for the second and third legs; the first leg is contingent.** A student who briefed neutrally on Day 1 may open a digest that does not agree with the favourite hypothesis. The "why it agreed" turn is then told to a room that never lived it, and the lived beat shrinks to "mark the line you trust least" (Day 2 apt101-read-the-digest).

**Strongest beats**
1. **Catch it making things up** (Day 2 apt101-catch-it-making-things-up). The failure is manufactured on purpose: "Claude writes a briefing on your outcome from your own evidence, with made-up claims planted in it... **Don't open the briefing.**" A scorer then picks the check. The beat closes on a real artifact and the room's sentence: "Now pick a summary nobody built to be caught... 'The agent got this wrong' is the sentence. Nobody's work is on trial; the agent's is." This is B's equivalent of AE101's designed un-packaged send-off.
2. **Put it in front of five users** (Day 3 apt101-five-users). The Day 1 digest is put on trial by live behaviour: "for each moment, say whether the digest said it, could have said it, or could not have". The stance is lived in the room: "someone wants to explain the slice to the next user before they start. Don't. The confusion is the finding." The ending is decided against a pre-agreed signal: "Read the result against the signal you agreed before building, not against what would feel better now."
(Honourable mention: grow-the-tree's "Put down the opportunity only you would think of" and the merge that keeps every name, where the anti-averaging stance is lived before apt101-widen-before-you-choose names it.)

**Weakest beats.** Criterion: the point where the student stops being the hero and is handed another training's prompt.
1. **Take it to the team** (Day 3 apt101-take-it-to-the-team). The close of the arc runs through a translation gloss: "Where Claude says *teammate*, read *your wider team*. Where it says *candidate*, read *the way of working*." It works in `module-7/jtbd.md`, `module-7/technical-plan.md` and `module-7/people-plan.md`. The trio's bet and the five users recede behind plan paperwork, and the opening want ("the feature nobody asked for") is never re-lived.
2. **Pick the outcome / What goes in** (Day 2 apt101-pick-the-outcome; Day 1 apt101-what-goes-in). The same seam appears: "Claude's prompt treats `challenge.md` as your challenge; yours points at the bet" and "Claude's prompt calls it your challenge. Here the challenge is the bet you just wrote". The scouting step concedes "Claude asks about a wiki and shared drives. Answer for your own world". The student spends the beat adapting a generic prompt to their product instead of acting on it.
(Also told-before-lived: apt101-write-what-good-means opens with two paragraphs of floor/ceiling exposition before the loop runs.)

## Scores

| factor | A | B |
|---|---|---|
| Frame | 94 | 89 |
| Narrative | 93 | 84 |
| Point of view | 95 | 87 |
| Stance | 92 | 87 |

## Smallest moves for B

1. In `exercises/apt101-send-it-off.md` Phase 4, have the overnight brief ask for "evidence that supports the bet", so Day 2's agreeing digest is produced by instruction the way AE101's un-packaged send-off is, rather than hoped for.
2. Cut or move the slide "It works overnight; some of what it writes will be wrong" from `lectures/apt101-it-runs-overnight.md` to after Read the digest, so Day 1 stops telling the turn the room is about to live.
3. In `exercises/apt101-read-the-digest.md` Phase 2, put `team/bet.md` beside the digest and ask "does the headline say what your bet says?", so the confirmation moment happens at the table before `apt101-the-digest-is-back` names it.
4. Give one contested position a guide scar instead of a citation: one line in `apt101-go-back-to-your-customers.md` or `apt101-why-it-agreed.md` naming a bet the guide's own research agreed with and that customers then ignored.
5. Open `exercises/apt101-take-it-to-the-team.md` by re-asking the Day 1 Start-here question (the feature nobody asked for) against `team/monday.md`, and replace the "where Claude says teammate, read…" gloss with APT101-named prompts, so the closing beat re-lives the opening want instead of translating another training.
