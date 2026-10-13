# Storytelling judge 3 — apt101-full-r3 (AE101 = A, APT101 = B), 2026-10-07

## Running notes

### A · M1 getting-going
- Plants: context window ≠ codebase ("the context window is not your codebase", orient-and-introspect); mirror/stance ("Your stance is the ceiling", painting-the-picture); self-report = hypothesis ("The report is a hypothesis to check, not ground truth", the-machine-you-just-met); errors stack, check resets; compounding ("work produces evidence; evidence improves the system that does the next work").
- Earned-after: the-machine-you-just-met lecture follows the exercises ("You just ran that loop. The agent's first read was partly wrong.").
- Counter-voice: "Assume about 10% of what it says or does is made up. Could be more or less than this heuristic suggests." "This file is a starter. Everyone sees how this will bloat almost immediately."

### A · M2 plan-mode-done-right
- Complicates self-report → plan: "Structure is persuasive. A 7-item plan with section headers and bold text looks like a decision." (when-a-plan-is-good). "You already agree with it... your instinct is not a check on it."
- Complicates compounding: rules have a ceiling ("The cure is not better rules; it is where the rules live", how-instructions-grow); double-loop (Argyris).
- Plants reach × calibration: "Push reach past what you can check and you have not delegated more. You are checking less."
- Self-doubting prompt: "This prompt is fair to read as replacing the file with only this rule, which would nuke the old rules... Precise prompting is harder than it looks." (extract-the-task-shaping-rule)
- Stops short honestly: "This training stops short of the full system".

### A · M3 earn-the-trust
- Agreement ≠ check, applied to skills: "Agreement is not the job; the delta is." (skills-from-the-frontier); "The grade is biased by design... same-window self-charity." (author-test-strategy-skill)
- Chat-abstraction pays off live: ADR in wrong worktree — "The agent reasoned forward from the conversation, not from the filesystem." (threat-model-with-stride)
- Stance: "Don't make general what you don't practice yourself."; "STRIDE without an access-surface map is pub-quiz threat modeling."
- Naming-after closer: the-loop-half-filled — "A name is a handle, not a lesson. Every law coming up is a move already made." Governor: "Name the uncertainty before you move."
- Branch-as-permission plants control-at-merge: "An un-merged branch is not unfinished work. Holding the merge until control is earned is the control working." "Control is interrogation... You can always read more; you can never read all."

### A · M4 run-the-first-experiment
- Turn setup: un-packaged send-off designed to underdeliver ("send it off plainly and you find out what you can't steer yet", set-the-markers). "Every send-off is an experiment" (test-and-learn).
- Bainbridge lands after the send-off: "The more autonomy the agent earns, the worse a watcher you quietly become." (ironies-of-automation) — complicates calibrated trust from M2.
- Forward question: Mollick pre-read "Mollick does not call the winner. Neither does this training... claims like that expire."
- Backpressure named after the run starts ("Every unread diff joins a queue downstream of the agent").

### A · M5 learn-from-the-test (partial)
- Turn lived: "The closing summary is not the artefact. The machine would rather produce something than admit nothing" (reading-the-return). Lenses: drift / rot / plausible-but-wrong.
- 10% prior re-fires on agent's account of agent's run (diagnose-and-resend) — braid from M1.
- Packaging named after diagnosis ("What you assembled to get there has names", what-packaging-is). Sea passage: "An unchecked session arrives confident, and wrong."
- Gate doubts itself: "Green is a claim about the check, not a fact about the work." "A gate nobody has verified is a gate trusted on vibes." (the-gate-is-a-claim). Bitter lesson: "Retire what the next model outgrows."
- Stance: "Ask for best practice and that is what answers... what it holds about your next run is a forecast." "A prediction is not a measurement."

### A · M6 spot-gaps-build-the-loop
- Diff two sessions; cut a rule ("Rules-files have a half-life").
- Narrator with scars, story-of-module-6: "It still opened with the un-packaged shape." "I drifted in every one of the ways this story just walked." "The loop caught what I missed... You will catch what I missed."
- Close: "There is no last turn... The kit compounds; the model rotates." Open-ish but resolved; forward question "nobody has that part figured out yet".

## Learning-set: A (AE101) — written before opening B
1. The agent's account is a hypothesis; a check from outside resets the chain. Planted M1 the-machine-you-just-met ("The report is a hypothesis to check, not ground truth"); complicated M2 ("Structure is persuasive"), M3 ("same-window self-charity"; ADR in worktree), M5 ("The closing summary is not the artefact"), M5 the-gate-is-a-claim ("Green is a claim about the check"); paid off M6 story ("A rule in context is not a rule in the output"). Depth 100.
2. Compounding: work leaves evidence that improves the next work — and rules have a ceiling/half-life. Planted M1 ("work produces evidence; evidence improves the system"); complicated M2 ("Rules have a ceiling"), M3 compound ladder, M5 "The wall"; paid off M6 "Rules-files have a half-life", "The kit compounds; the model rotates." Depth 100.
3. Calibrated reach: delegate only as far as you can check. Planted M2 ("Push reach past what you can check... You are checking less"); complicated M3 ("The branch is the permission"), M4 Bainbridge ("the worse a watcher you quietly become"), M5 frontier redraw + bitter lesson; paid off M6 "It stops exactly where the writing stops and your judgement takes over." Depth 90.
4. Local evidence beats the field's best practice (experiment). Planted M4 ("Every send-off is an experiment"); complicated M5 ("A prediction is not a measurement"; "One session is a sample"; tampering); paid off M6 diff of two sessions + eval as pass rate. Depth 80.
5. Context is what you load (stance/mirror). Planted M1 ("Your stance is the ceiling"; wizard move); complicated M1 machine (sycophancy), M3 context engineering, M5 goal drift/context rot; paid off M6 "What is written down, it can act on." Depth 80.
Mean depth ≈ 90. Headline not developed: "Two windows / long prompt is dead time only if you have one window" (M3); "Prohibitions stop; taste steers" (M2) returns only as "Taste closes the gap"; reverse-engineer anything (M1).

### B · Day 1 our-product-our-system
- Opener question plants the hero's flaw: "what is the last thing your team built that nobody asked for?... what were you sure of at the time?" (module)
- Frame planted: "Building got cheap, deciding didn't" (apt101-building-is-cheap); "The post-it was not naive. It was what the craft shrank to when building was expensive." (apt101-building-rationed-it).
- Guide appears early: "One of the first things we tried building was a local installer... 'Just because you can build it does not mean you should build it.'" (building-is-cheap) — guide with a scar, light.
- Pre-plants the turn question before living it: "When agents analyse wider, deeper and faster, what is your insight?... Keep your own answer to that question." (building-is-cheap). Not the answer, but the question is on the page before the exercise.
- Box exercise: live demonstration of context steering ("You told Claude different things between the two, and nothing else changed.") — lived before only-what-you-tell-it lecture names it. Cold read doubts the agent's self-read ("it reads its own work kindly in the chat where it made it").
- Bet: "Write a signal that could embarrass you" (lecture); exercise "Users like it can only say yes." Disagreement preserved ("That disagreement is worth more than a tidy map").
- Door: "It will cost a source somebody wanted in. That is the door working." Planted as the governor; restated in it-runs-overnight lecture (restatement).
- The trap is set: look-for line + expect line kept outside the brief (send-it-off Phase 4) — "outside the brief so the run never reads it". The student does not know why. Good setup.
- Phase 6 "does it sound sure of itself?" — seeds doubt.

### B · Day 2 whats-actually-true (partial, through grow-the-tree)
- The turn is lived: read-the-digest four lines side by side; "Did your line ask for support, a test, or a frame?"; asks it "the other way round" — then the lecture names it AFTER: "It found what you asked it to look for... The headline came from your question as much as from your customers." (apt101-why-it-agreed). Earned.
- Guide's scar: "For most of my working life I wanted to be right... I used to think of being wrong as failure." "About the future, all was blurry... It gave me anxiety, and a feeling of insufficiency." (why-it-agreed). Guide, not hero; failure on page (emotional, less operational than AE101's).
- Stance against own commercial interest: "So a team that does not talk with its customers every week should start there, before agents... That sells less of this training. It is still where to start." (apt101-go-back-to-your-customers) — anchor-100 stance move.
- "A faster feature factory is still a feature factory... Agents amplify the way a team already works." (why-it-agreed) pays off Day 1 feature-factory lecture.
- Retrievers carry the doubt + AGAINST finding (gather-the-evidence) — governor "ask what argues against it" re-fires in exercise.
- Possible dissonance: "it found what you asked for" asserted as universal ("whatever the line asked"); if a student's line asked for a test, the lecture's "A line that asked for support got support" still lands since it covers each case.

### B · Day 2 (rest)
- Widen-before-choose lecture after the tree merge: "an agent asked for a summary gives you the middle, smoothly." Names merge-averaging after the student lived it (grow-the-tree push back "a merge that reads like the average"). Earned-ish (same block).
- Strongest exercise beat: catch-it-making-things-up — benchmark with planted claims, judge with "Known limit:" line, then "Your real summary was not [built to be caught]" + bet on an unsupported claim before the judge exists. Training doubts its own check on the page ("It should describe one kind of claim this judge will let through").
- Fluent-is-not-true lecture: "'Are you sure?' is another fluent answer"; "Later models will fabricate less; they won't stop." — a prediction (scores against forward-looking).
- Safe-to-say-it's-wrong lecture AFTER the bake-off and before choose-the-bet — fine placement; "The agent got this wrong" sentence is asked for in Phase 5 before the lecture names it.
- Pre-mortem exercise precedes lecture (fixed order). "If the bet does not survive, that is good work. Go back to the tree and choose again." Stance: the training's own exercise output may be thrown away.
- Write-it-down lecture borrows AE101 lines near-verbatim ("The agent stops where you stop writing"; prohibitions; Deming tampering) — imported, though re-fitted to digests. Recurrence rule then used in keep-and-run-tonight ("proposes rule changes only for mistakes that showed up in at least two places") — governor used in exercise.
- Tonight's run reverses Day 1: "asks the question the first digest never did: what argues against the bet." Payoff of the look-for turn.
- Close questions: "What did you make that you could not have made on Day 1?"

### B · Day 3 learn-faster-than-the-market (start)
- Big Idea asked as a question: "What is each of us for... when building gets cheap?" — echoes Day 1 "what is your insight?".
- Inconsistency: map-the-story says "Five people from other teams will use that slice next" while Day 2 Bring says "five people who do the job your product serves... nobody from another trio stands in."

### B · Day 3 (rest)
- Write-what-good-means: floor vs ceiling; "The judge stays as it is. A yardstick you rewrite mid-run is not a yardstick." Lecture after: "A pass is a claim about a check nobody has tested"; "A team that writes for its own criteria has rebuilt the feature factory with a dashboard." (apt101-what-good-means) — braids feature factory (D1) into checks.
- Five users: "The confusion is the finding." Phase 4: "each of you reads your own Day 1 hypothesis... says out loud the line in it the five users touched, and whether it held or broke. If none of your lines broke, say what result would have broken it." — Day 1 → Day 3 payoff per seat.
- Lecture after: "A slice that comes back no has done its job." "Decide on what you agreed, not on how the result feels."
- Three-jobs lecture: "Your insight is the strategy: which customer, which bet, which no" — answers the Day 1 question with a choice, not an analysis. "The more you trust it, the less you notice" — Bainbridge imported from AE101, not exercised in B.
- Take-it-to-the-team Phase 2: run another trio's agent file as written — lived before the lecture "An agent's instructions are not the agent... They run it, get a generic answer, and quietly stop." Earned.
- Guide: "We built good things. We failed to share them well." "I still make mistakes. More than I'd like. The difference is I make them faster now."
- Frame breaks on page: "This is where 'building got cheap, deciding didn't' stops being an edge on its own... What would change this training's mind: agents that start deciding well".
- Close: Day 1 question re-asked of monday.md: "is anything in team/monday.md the next thing your team builds that nobody asked for?" Open ending: "The bet is still open, and the next slice is yours to place."

---

## Frame

**A (AE101): agentic engineering is engineering — feedback control, verification, compounding.** Every module is a loop that needs an outside check and leaves evidence behind.
- M1 the-machine-you-just-met: "A check from outside the session resets the chain. A failing test does not care how confident the answer sounded."
- M3 the-loop-half-filled: "The agent loop is a **closed-loop controller**... Cut the feedback signal (a test, a check, a read) and it drifts."
- M5 what-packaging-is: "**A check is a position fix**. At a fix the wedge of possible states collapses to a point."
- Breaks named, M5 the-gate-is-a-claim: "Sutton's **bitter lesson**: built-in human knowledge wins today and loses to the next model. Today's right procedure... is superseded too."
Score **95**. Every module reads through it, and the training says where it breaks.

**B (APT101): building got cheap, deciding didn't. Agents amplify whichever way the team already works.** Each day is a decision the agent can't make: the promise, the bet, the door, the doubt, the choice, the signal, the hand-over.
- Day 1 apt101-building-is-cheap: "For years the slice was the slow step. Now an agent can build it. Every other step is a decision... None of those got cheaper."
- Day 2 apt101-why-it-agreed: "Agents amplify the way a team already works. They do not transform it."
- Day 3 apt101-three-jobs-rewritten: "Your insight is the choice it leaves you with. Which outcome the team works toward. Which customer you serve first, and so which one waits."
- Breaks named, Day 3 apt101-where-you-go-from-here: "This is where 'building got cheap, deciding didn't' stops being an edge on its own. When rivals build as cheaply, speed is the entry price... What would change this training's mind: agents that start deciding well."
Score **92**. The frame holds across all three days and names its own break, and it is easier to state than AE101's. It loses points because a few Day 3 slides read as appended doctrine rather than cases of the frame: aligned autonomy, "one level up" and the automation slide imported from AE101.

## Narrative

**A.** An engineer sets out to trust work they did not watch. Short loops teach that the agent's account is a hypothesis. Then the first long session goes out un-packaged and comes back confident and partly wrong. That is the turn: the student reads it through three lenses and re-sends it packaged. Then the narrator shows the method failing on the module itself, and the loop never closes.
- Turn set up, M4 set-the-markers-send-it-off: "send it off plainly and you find out what you can't steer yet."
- Turn read, M5 reading-the-return: "The closing summary is not the artefact. The machine would rather produce something than admit nothing."
- M6 story-of-module-6: "The training teaches this pattern across three modules. The agent I was working with had just finished writing those three modules. It still opened with the un-packaged shape."
Score **93**. The turn is lived across two modules, and the training's own failure is on the page.

**B.** A trio arrives sure of something: "what is the last thing your team built that nobody asked for?... what were you sure of at the time?" (Day 1 module). Each person writes a look-for line into their overnight brief, plus an expectation kept outside it. On Day 2 the digest comes back agreeing. The trio puts four lines side by side, runs the brief "the other way round", and only then hears the name: "Your look-for line told the agent what counted as a finding, and it found it... The headline came from your question as much as from your customers." (Day 2 apt101-why-it-agreed). They build a judge, choose with evidence and pre-mortem it. On Day 3 five users do things no digest could have said, and each person reads aloud which line of their own Day 1 hypothesis held or broke. The Day 1 question is then turned on their own Monday plan.
- Day 2 apt101-read-the-digest: "Did your line ask for support, a test, or a frame?" (the move, before the name)
- Day 3 apt101-five-users: "each of you reads your own Day 1 hypothesis... says out loud the line in it the five users touched, and whether it held or broke."
- Day 3 close: "is anything in `team/monday.md` the next thing your team builds that nobody asked for? Who decided it, and what are you sure of?"
Score **89**. The turn now lands on every seat and is named afterwards. The ending opens forward on purpose ("The bet is still open, and the next slice is yours to place"). Two things hold it short of A. The turn is the student's failure, not the training's. And the question behind the turn is posed on Day 1 before it is lived ("When agents analyse wider, deeper and faster, what is your insight?... Keep your own answer", apt101-building-is-cheap). It is a question, not the answer, but it lowers the surprise.

## Point of view

**A.** The narrator is the maintainer, an engineer who built the training with the same agent and caught it drifting. He appears in second-person craft voice throughout and in one first-person passage with numbers.
- M6 story-of-module-6: "Twenty-odd planning turns. Five taste reversals from me on Claude's confident recommendations."
- M6 story-of-module-6: "I drifted in every one of the ways this story just walked. I fixed what I caught. The loop caught what I missed."
- M4 walk-and-send-off / M1 orient-and-introspect: "Assume about 10% of what it says or does is made up. Could be more or less than this heuristic suggests."
Score **95**. The narrator's own operational failure is on the page, in detail.

**B.** The guide is the maintainer, someone who went through a year inside an AI transformation. He appears as a guide in short dated quotes and one three-slide passage, never as the hero.
- Day 1 apt101-building-is-cheap: "One of the first things we tried building was a local installer for developer tooling. It got working and it was used just a bit."
- Day 2 apt101-why-it-agreed: "For most of my working life I wanted to be right... It gave me anxiety, and a feeling of insufficiency." / "Being wrong does not diminish you. Lack of effort to understand does."
- Day 3 apt101-from-us-to-the-team: "We built good things. We failed to share them well."
- Day 3 apt101-where-you-go-from-here: "I still make mistakes. More than I'd like. The difference is I make them faster now."
Score **87**. The guide's failures are on the page: an unused build, a sharing failure, fear of being wrong. They are mostly emotional or summary-level. None is a concrete moment in the trio's own territory, the way AE101 shows a banned word leaking four times. The essays fit the intended shape (guide, not hero), but they stay scars in quotes rather than a scene.

## Stance

**A.** Positions it could lose a customer over:
- "Ask for best practice and that is what answers: a well-read average... what it holds about your next run is a forecast." (M5 what-packaging-is), defended by the A/B on your own repo.
- "A rule in context is not a rule in the output." (M6 story-of-module-6), defended by the scar: four leaks across four instances.
- "Don't make general what you don't practice yourself." (M3 skills-from-the-frontier), defended by the proportion of two curated skills to one authored.
- "Green is a claim about the check, not a fact about the work." (M5 the-gate-is-a-claim), defended with Goodhart and the hold-out mechanism.
- Against its own interest: "Mollick does not call the winner. Neither does this training." (M4 pre-reads). It is a refusal to sell certainty, but not commercial self-harm.
Score **92**.

**B.** Positions:
- Against its own commercial interest: "So a team that does not talk with its customers every week should start there, before agents... That sells less of this training. It is still where to start." (Day 2 apt101-go-back-to-your-customers). This hits the 100 anchor.
- "An agent's instructions are not the agent." (Day 3 apt101-from-us-to-the-team). It is defended by a lived mechanism: Phase 2 of take-it-to-the-team runs another trio's file "exactly as written" before the slide names the result. This is the "share the whole agent is a vendor pitch" position, earned.
- "A faster feature factory is still a feature factory." (Day 2 apt101-why-it-agreed), defended by the trio's own agreeing digest.
- "One agent per recurring job, not one company brain" (Day 1 apt101-it-runs-overnight). Argued by mechanism ("a fix for one job shifts the answers for the others") but never exercised against its alternative.
- "A team that writes for its own criteria has rebuilt the feature factory with a dashboard." (Day 3 apt101-what-good-means)
Score **91**. It holds ground, with one explicit position against its own commercial interest. The one soft spot is a bare prediction offered as stance: "Later models will fabricate less; they won't stop." (Day 2 apt101-fluent-is-not-true).

## The pair

**A.** Both. It doubts its own tools on the student surface: "This prompt is fair to read as replacing the file with only this rule, which would nuke the old rules... Precise prompting is harder than it looks." (M2 extract-the-task-shaping-rule). "The grade is biased by design... same-window self-charity." (M3 author-test-strategy-skill). It also holds its ground: "A prediction is not a measurement." It reads as someone who has been there.

**B.** Both. The doubt is built into the instruments: the kept judge must carry a "*Known limit:* line... It should describe one kind of claim this judge will let through." (Day 2 apt101-catch-it-making-things-up). "A pass is a claim about a check nobody has tested" (Day 3 apt101-what-good-means). "If the bet does not survive, that is good work. Go back to the tree and choose again" (Day 2 module, after the pre-mortem). The ground it holds: "That sells less of this training." It reads as someone who has been there. The doubt is engineered into exercises more than confessed by the guide, which is the right balance for a trio audience.

## Room (B only)

Do the exercises carry the story? Mostly yes. The Day 2 turn and the Day 3 payoff are both produced by exercise beats before any lecture names them.

**Strongest two**
1. **Day 2 apt101-read-the-digest, Phases 1, 3 and 4.** Four lines side by side, quoted exactly ("the digest's headline, my expectation, my look-for line, and the hypothesis"), then the question "Did your line ask for support, a test, or a frame?", then "with only my `## Look for` line replaced by 'find what in my material argues against:'". Every seat lives the turn on its own material. The lecture names it only afterwards: "It found what you asked it to look for".
2. **Day 3 apt101-five-users, Phases 2 and 4.** "One pattern to watch: after the second session, someone wants to explain the slice to the next user before they start. Don't. The confusion is the finding." Then each person speaks their own Day 1 line: "Your own line, not someone else's." This is the arc's payoff, carried by the room rather than a slide. (Close runner-up: take-it-to-the-team Phase 2, "run the agent file I was sent, exactly as written".)

**Weakest two**
1. **Day 1 apt101-what-goes-in, Phase 3.** The door is agreed in the abstract and never fails in front of the student: "It will cost a source somebody wanted in. That is the door working. Anyone may say no to a source, and a no needs no defending." After that it is only obeyed: retrievers "open nothing... that it keeps out", and monday.md "opening with what goes in". The governor is told and re-applied, never tested by a run that crossed it. The Day 2 Phase 1 report does list files "it read that sit outside what your team agreed", but nothing is done with that line.
2. **Day 3 apt101-write-what-good-means, Phase 2.** The eval loop runs while the trio waits: "Then ask Claude to run the loop... Now step away from the screen." The Goodhart lesson ("Within days, the work starts to score well") arrives in the lecture after. The student never sees a digest score better while getting worse; they are told to check "If the score dropped and the digest still reads thin". The floor and ceiling lines are strong. The loop is machinery watched, not a failure lived.

## Depth

### Learning-set: A (AE101)
1. **The agent's account is a hypothesis; only an outside check resets the chain.**
   - Planted: M1 the-machine-you-just-met, "The report is a hypothesis to check, not ground truth."
   - Complicated: M2 when-a-plan-is-good, "Structure is persuasive"; M3 author-test-strategy-skill, "same-window self-charity"; M3 threat-model-with-stride, "The agent reasoned forward from the conversation, not from the filesystem"; M5 the-gate-is-a-claim, "Green is a claim about the check, not a fact about the work."
   - Paid off: M6 story-of-module-6, "A rule in context is not a rule in the output."
   - Governor: quote it back, ask where it read that. Counter-voice: the 10% prior "could be more or less".
   - Depth **100**.
2. **Compounding, and its ceiling.**
   - Planted: M1, "work produces evidence; evidence improves the system that does the next work."
   - Complicated: M2 how-instructions-grow, "Rules have a ceiling"; M3, the compound ladder; M5, "The wall."
   - Paid off: M6, "Rules-files have a half-life"; "The kit compounds; the model rotates."
   - Depth **100**.
3. **Calibrated reach.**
   - Planted: M2 when-a-plan-is-good, "Push reach past what you can check and you have not delegated more. You are checking less."
   - Complicated: M3, "The branch is the permission"; M4 ironies-of-automation, "the worse a watcher you quietly become"; M5, the frontier redrawn with the bitter lesson.
   - Paid off: M6 agents-that-build-agents, "It stops exactly where the writing stops and your judgement takes over."
   - Depth **90**.
4. **Local evidence beats the field.**
   - Planted: M4 test-and-learn, "Every send-off is an experiment."
   - Complicated: M5, "A prediction is not a measurement"; "One session is a sample"; tampering.
   - Paid off: M6, the two-session diff and "a pass rate, not a pass."
   - Depth **85**.
5. **You steer by what you load.**
   - Planted: M1 painting-the-picture, "Your stance is the ceiling."
   - Complicated: M1 the-machine-you-just-met (sycophancy); M3, context engineering; M5, goal drift and context rot.
   - Paid off: M6, "What is written down, it can act on."
   - Depth **80**.

**A Depth = 91.** Carry share: 100/455 ≈ 0.22, evenly spread.
Headline ideas, not developed: two windows / dead time (M3 open-the-side-quest); reverse-engineer anything (M1 close-the-ticket); "Prohibitions stop; taste steers" (M2), which returns only as "Taste closes the gap".

### Learning-set: B (APT101)
1. **Building got cheap, deciding didn't. What is your insight?**
   - Planted: Day 1 apt101-building-is-cheap, "Building got cheap, deciding didn't."
   - Complicated:
     - Day 1 paint-the-product-box: "a box your nearest competitor could print with their logo on it", which shows a cheap build is generic.
     - Day 2 why-it-agreed: "It analysed everything and still had no insight... Its headline is your own look-for line handed back."
     - Day 2: "A faster feature factory is still a feature factory."
     - Day 3 three-jobs-rewritten: "Your insight is the choice it leaves you with."
     - Day 3 where-you-go-from-here: the frame breaks ("speed is the entry price").
   - Paid off: Day 3, "The models will analyse wider, deeper and faster. What will your insight be?" plus the close re-asking Day 1's question.
   - Braided with 2 and 4. Forward-looking: a question, with what would change the training's mind.
   - Depth **92**. Progression after Day 1 / Day 2 / Day 3: 40 / 80 / 92.
2. **The agent finds what you asked it to look for.**
   - Planted: Day 1 paint-the-product-box, "You told Claude different things between the two, and nothing else changed"; apt101-only-what-you-tell-it, "Same words. Different answer."
   - Complicated:
     - Day 2 read-the-digest: four lines and the reversal.
     - Day 2 why-it-agreed: "The headline came from your question as much as from your customers."
     - Day 2 keep-and-run-tonight: "asks the question the first digest never did: what argues against the bet."
     - Day 3 what-good-means: "Your criteria become a target."
   - Paid off: Day 3 bet-meets-five-users, "What your five users did that the digest never said."
   - Governor: "A look-for line finds what it asks for. Ask what argues against it too." It re-fires in gather-the-evidence ("at least one finding that argues against the bet, marked AGAINST") and in tonight's brief.
   - Depth **90**. Progression: 40 / 80 / 90.
3. **Fluent is not true, and the check is a claim too.**
   - Planted: Day 1 apt101-only-what-you-tell-it, "read the draft as a claim about your product, not a verdict"; the box cold read, "it reads its own work kindly."
   - Complicated:
     - Day 2 read-the-digest: the line you trust least.
     - Day 2 catch-it-making-things-up: the judge wins on your evidence and carries a "Known limit".
     - Day 2 fluent-is-not-true: "'Are you sure?' is another fluent answer."
     - Day 3 write-what-good-means: floor vs ceiling, "A yardstick you rewrite mid-run is not a yardstick."
     - Day 3 what-good-means: "A pass is a claim about a check nobody has tested."
   - Paid off: Day 3 what-it-missed, "list where my call and the judge's verdict differ."
   - Counter-voice: the "Known limit" line.
   - Depth **88**. Progression: 40 / 70 / 88.
4. **A bet that can lose: agree the signal before you build.**
   - Planted: Day 1 apt101-write-the-bet, "A signal that can only say yes is not a test."
   - Complicated:
     - Day 2 choose-the-bet: the evidence prune.
     - Day 2 imagine-it-failed: "If the bet does not survive, that is good work."
     - Day 3 slice-by-learning: "The first slice tests what you are least sure of."
     - Day 3 bet-meets-five-users: "A slice that comes back no has done its job."
   - Paid off: Day 3 five-users Phase 4, own Day 1 line "held or broke"; close: "the bet, as you would now say it to your team."
   - Depth **88**. Progression: 40 / 65 / 88.
5. **What goes in and what goes across: the door, then the team.**
   - Planted: Day 1 apt101-what-goes-in, "The door sits inside it, and it is yours."
   - Complicated: Day 2 gather-the-evidence, where retrievers list sources skipped. This is a use, not a change of meaning.
   - Further complicated:
     - Day 3 take-it-to-the-team Phase 2, running another trio's file.
     - Day 3 from-us-to-the-team: "The page was never where the work lived."
     - Day 3 team-monday: "On Monday it is the first thing your wider team decides for itself."
   - Paid off: Day 3 monday.md.
   - Depth **82**. Progression: 40 / 45 / 82 (the flat Day 2 stretch is the stall).

**B Depth = 88.** Carry share: 92/440 ≈ 0.21.
Headline ideas, not developed:
- "One agent per recurring job, not one company brain" (Day 1 apt101-it-runs-overnight)
- "Your taste is the ceiling" (Day 2 apt101-each-of-you-makes-something)
- "Widen before you choose" / double diamond (Day 2)
- "Clear outcomes, free hands" / aligned autonomy (Day 3)
- "Would you let an agent post your weekly update?" (Day 3)
- "The more you trust it, the less you notice", imported from AE101 and never exercised (Day 3 apt101-three-jobs-rewritten)
- "The six parts hold": restated, and it shifts meaning only slightly at the close
- Psychological safety: "Safe to say it's wrong" (Day 2) is restated once in three-jobs, without development.

Trade B appears to have made: depth spent on the turn and its payoff (learnings 1 and 2), and on applicable governors fired in exercises. Breadth (Day 3 doctrine slides) dilutes rather than develops.

## Scores

| factor | A | B |
|---|---|---|
| Frame | 95 | 92 |
| Narrative | 93 | 89 |
| Point of view | 95 | 87 |
| Stance | 92 | 91 |
| Depth | 91 | 88 |

## Smallest moves for B

1. In `apt101-read-the-digest` Phase 1, have each person read aloud any file the run touched outside the door, and say whether the door or the brief let it through. This way the Day 1 door is tested by a run rather than only obeyed.
2. In `apt101-map-the-story`, change "Five people from other teams will use that slice next" to match Day 2's "five people who do the job your product serves... nobody from another trio stands in". Right now the student surface contradicts itself on the payoff beat.
3. In `apt101-write-what-good-means` Phase 2, replace "Now step away from the screen" with each person writing which ceiling line they predict the looped digest will fail. The Goodhart slide then names a miss they predicted, not one they are told about.
4. In `apt101-why-it-agreed`, give the guide one concrete product-work scene, a summary that agreed with him and was wrong, in place of the general "all was blurry" slide. That puts an operational failure on the page beside the emotional one.
5. In `apt101-fluent-is-not-true`, turn "Later models will fabricate less; they won't stop" into the question the training would change its mind on: what would your judge show if a model stopped fabricating on your sources? A prediction scores against forward-looking.
