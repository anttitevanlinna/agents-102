# APT101 full-training storytelling bench, r1, judge 3

Paired read: A = AE101 (agentic-engineering-101), B = APT101 (agentic-product-teams-101), via `scripts/read-training.js`. Student view, prompt bodies unexpanded.

## Running notes

### A · M1 getting-going
- Frame seeds: "The LLM mirrors your stance ... Your stance is the ceiling" (lectures/painting-the-picture-with-the-llm.md); "A check from outside the session resets the chain" (lectures/the-machine-you-just-met.md). Engineering-as-feedback-control already load-bearing.
- Earned-not-announced: lecture "You just ran the same loop" comes AFTER the four exercises; names compound engineering after the move.
- Stance: "Assume about 10% of what it says or does is made up" (exercises/orient-and-introspect.md); "The agent yields if you push hard enough, so its agreement settles nothing" (exercises/fix-tests-first.md).
- POV: second person instruction; no narrator scars yet.

### A · M2 plan-mode-done-right
- Frame: "Push reach past what you can check and you have not delegated more. You are checking less." (lectures/when-a-plan-is-good.md). Calibration = engineering lens.
- Stance: "Structure is persuasive... often just a draft formatted like a decision"; "Your instinct is not a check on it" (when-a-plan-is-good.md). "Don't execute the plan. The work of making it good is the exercise." (exercises/push-back-on-the-plan.md).
- Self-challenge: prompt that may nuke CLAUDE.local.md flagged: "Precise prompting is harder than it looks" (exercises/extract-the-task-shaping-rule.md). "This training stops short of the full system" (lectures/how-instructions-grow.md).

### A · M3 earn-the-trust
- Narrative/self-doubt: ADR landing in worktree, "The agent reasoned forward from the conversation, not from the filesystem" (exercises/threat-model-with-stride.md).
- Stance: "Don't make general what you don't practice yourself" (lectures/skills-from-the-frontier.md); "STRIDE's value is rejection, not enumeration" (threat-model-with-stride.md); "Authoring without invocation is theatre" / "same-window self-charity" (exercises/author-test-strategy-skill.md).
- Frame named at close: "The agent loop is a closed-loop controller... a flaky test is a closed loop that still drifts" (lectures/the-loop-half-filled.md). Earned: "M1 stepped into the territory without the map, on purpose."

### A · M4 run-the-first-experiment
- Narrative setup of the turn: "Session one goes now, un-packaged... Session two goes packaged, after you've read the return" (lectures/test-and-learn.md); "send it off plainly and you find out what you can't steer yet" (exercises/set-the-markers-send-it-off.md). Exercise produces the failure.
- Frame: "Control is exercised at the merge" / "The far half goes quiet... how do you trust work you didn't watch?" (lectures/the-loop-half-filled.md). Bainbridge "a formerly experienced operator ... may now be an inexperienced one" (lectures/ironies-of-automation.md) — the frame names its own cost.
- Stance: "The nudge reads as encouragement and lands as a taunt." "Past ten or so interventions, you have become the agent" (set-the-markers-send-it-off.md). Mollick pre-read: "Mollick does not call the winner. Neither does this training... claims like that expire." (M4 module) — a stance against its own permanence.

### A · M5 learn-from-the-test (first half)
- Turn lived: "The un-packaged run was supposed to underdeliver. What came back is data, not blame." (exercises/diagnose-and-resend.md). "The machine would rather produce something than admit nothing" (lectures/reading-the-return.md).
- Frame at full strength: sea passage "A check is a position fix... The success report comes from the wrong harbor" (lectures/what-packaging-is.md); "Green is a claim about the check, not a fact about the work" and Goodhart "Gates decay" (lectures/the-gate-is-a-claim.md) — frame names where its own instrument breaks.
- Stance: "Ask for best practice ... what it holds about your next run is a forecast... A prediction is not a measurement" (what-packaging-is.md); Sutton "Retire what the next model outgrows" (the-gate-is-a-claim.md).
- "The wall" introduced late but seeded since M2 map: "A rule promoted before it works on you is a rule your team has to live with" (M5 module).

### A · M6 spot-gaps-build-the-loop
- POV peaks: lectures/story-of-module-6.md, first person, Antti: "I drifted in every one of the ways this story just walked. I fixed what I caught. The loop caught what I missed." "The agent I was working with had just finished writing those three modules. It still opened with the un-packaged shape." — the training's own failure on the page (narrative 100-anchor, POV 100-anchor).
- Stance: "A rule in context is not a rule in the output"; "A rule in memory that does not force is worse than no rule" (story-of-module-6.md).
- Close open: "There is no last turn... The kit compounds; the model rotates. The training closes." (lectures/agents-that-build-agents.md). "nobody has that part figured out yet."
- A summary: frame strong + self-breaking (Goodhart/Bainbridge on own gates); narrative turn lived (M4 un-packaged -> M5 packaged) and doubled by M6 story of the training failing itself; POV mostly second-person until a decisive first-person M6 passage; stance defended with mechanisms throughout.

### B · Day 1 our-product-our-system
- Frame candidate: "Building got cheap, deciding didn't" (lectures/apt101-building-is-cheap.md); "The post-it was what the craft shrank to when building was expensive" (lectures/apt101-building-rationed-it.md). Strong, vindication-of-the-craft frame; addressed to the trio's own history.
- Guide shows once: installer story "Just because you can build it does not mean you should build it. (Lucky it did not take that long to build it.)" (apt101-building-is-cheap.md) — guide, not hero. Good.
- Hero = trio: "what is the last thing your team built that nobody asked for?" (Day 1 module Start here); "Each of you can point at the line on the final box that came from you" (exercises/apt101-paint-the-product-box.md).
- Exercise carries the story: five-pass box "Same model, five boxes" — a lived turn in miniature (paint-the-product-box). Door: "It will cost a source somebody wanted in. That is the door working." (exercises/apt101-what-goes-in.md).
- Pre-announcement leak: "It works overnight; some of what it writes will be wrong ... Nothing in the digest marks which lines those are" (lectures/apt101-it-runs-overnight.md) — tells the Day 2 failure before it is lived. Also the overnight brief in send-off Phase 4 does not visibly plant the confirmation-seeking instruction; the failure depends on the student writing "what your material says about the bet".
- Lots of borrowed authority (Cutler, Seiden, Christensen, Torres, O'Reilly, Bland); stance mostly held via citation.

### B · Day 2 whats-actually-true (first half)
- Turn designed: read-the-digest exercise first, then lectures/apt101-the-digest-is-back.md + apt101-why-it-agreed.md name it: "It found what you asked it to look for... the agreement may come from your question, not from your customers." Order correct (exercise produces, lecture names).
- But the-digest-is-back slide "The digest agrees with your favourite hypothesis" asserts the failure for every team, whether or not theirs did.
- Guide passage: "For most of my working life I wanted to be right... About the future, all was blurry... Being wrong does not diminish you. Lack of effort to understand does." (apt101-why-it-agreed.md) — narrator with stated experience, a scar (anxiety, insufficiency).
- Stance against own commercial interest: "a team that does not talk with its customers every week should start there, before agents... That sells less of this training. It is still where to start." (lectures/apt101-go-back-to-your-customers.md) — 100-anchor stance line.
- "Agents amplify the way a team already works. They do not transform it." (apt101-why-it-agreed.md).
- Exercises: grow-the-tree keeps names on branches; "Push back on a merge that reads like the average of the three of you."

### B · Day 2 (second half)
- Strongest room beat: catch-it-making-things-up bake-off — four checks compete, scorer measures, winner kept with "a *Known limit:* line", then run on a real summary: "It found something in a summary nobody planted anything in." (exercises/apt101-catch-it-making-things-up.md). Doubts own tool (judge's Known limit) = self-challenge 80.
- Stance: "This isn't a bug that gets patched in the next release. It's the shape of the technology. Later models will fabricate less; they won't stop." (lectures/apt101-fluent-is-not-true.md). "A faster feature factory is still a feature factory" (apt101-why-it-agreed.md).
- Pre-mortem as exercise is strong and self-challenging: "If the bet does not survive, that is good work. Go back to the tree and choose again before you leave." (Day 2 module, Talk it through).
- The fix of the turn is lived: tonight's brief now asks "what argues against it" (exercises/apt101-keep-and-run-tonight.md): "tonight's brief asks the question the first digest never did". But the pre-mortem lecture ("Imagine it already failed", apt101-each-of-you-makes-something.md) sits before the exercise and announces the move.
- Note: lecture placement mixes — safe-to-say and fluent-is-not-true sit around the bake-off; "fluent-is-not-true" after the exercise (good), "each-of-you-makes-something" before make-your-piece (lecture-then-do).
- Psych safety line: "'The agent got this wrong' costs nobody face" (lectures/apt101-safe-to-say-its-wrong.md) — distinctive to the trio.

### B · Day 3 learn-faster-than-the-market
- Lived payoff: five-users exercise lays bet + Day 1 digests + what users did side by side: "for each moment, say whether the digest said it, could have said it, or could not have" (exercises/apt101-five-users.md); "The confusion is the finding."
- Floor/ceiling judge with self-doubt: "A yardstick you rewrite mid-run is not a yardstick"; "the judge passed work you would have sent back" (exercises/apt101-write-what-good-means.md). Goodhart: "A team that writes for its own criteria has rebuilt the feature factory with a dashboard" (lectures/apt101-what-good-means.md) — frame turned on its own instrument.
- Frame names where it breaks: "This is where 'building got cheap, deciding didn't' stops being an edge on its own... What would change this training's mind: agents that start deciding well" (lectures/apt101-where-you-go-from-here.md). 100-anchor content for frame.
- Guide scars: "We built good things. We failed to share them well." (lectures/apt101-from-us-to-the-team.md); "I still make mistakes... I make them faster now." (apt101-where-you-go-from-here.md). Delivered as attributed essay quotes, not a narrating passage.
- Open ending as designed: "The bet is still open... You answer that on your own product, with your team, one bet at a time." (Day 3 module Next). Hero = trio; proposal "The team that lives with it decides."
- Seams: take-it-to-the-team: "Where Claude says *teammate*, read *your wider team*. Where it says *candidate*, read *the way of working*." — reused prompt vocabulary leaks; story thread thins in the 55-min plan-drafting beat.

## Frame

**A (AE101).** One sentence: agentic engineering is engineering, a closed feedback-control loop where trust comes from checks outside the session, not from the agent's account. The frame carries the training: M1 "A check from outside the session resets the chain... That is why the failing test came before the fix." (getting-going, lectures/the-machine-you-just-met.md); M2 "Push reach past what you can check and you have not delegated more. You are checking less." (plan-mode-done-right, lectures/when-a-plan-is-good.md); M3 "The agent loop is a **closed-loop controller**... a flaky test is a closed loop that still drifts." (earn-the-trust, lectures/the-loop-half-filled.md); M5 "**A check is a position fix**... The success report comes from the wrong harbor." (learn-from-the-test, lectures/what-packaging-is.md). It also names where it breaks: "Green is a claim about the check, not a fact about the work" and "Gates decay" (learn-from-the-test, lectures/the-gate-is-a-claim.md), Bainbridge's "may now be an inexperienced one" (run-the-first-experiment, lectures/ironies-of-automation.md), and "each one is a claim that this is a place the model still needs you, and claims like that expire" (run-the-first-experiment, module pre-reads). → 94.

**B (APT101).** One sentence: building got cheap, deciding didn't, so the trio's craft (outcome, bet, signal, the customer's real words) is what the agents can't do and what they must now do faster. Load-bearing on all three days: Day 1 "Every other step is a decision... None of those got cheaper." (our-product-our-system, lectures/apt101-building-is-cheap.md) and "The post-it was what the craft shrank to when building was expensive" (lectures/apt101-building-rationed-it.md); Day 2 "Agents amplify the way a team already works. They do not transform it." (whats-actually-true, lectures/apt101-why-it-agreed.md); Day 3 "Your insight is the choice it leaves you with... it does not get cheaper when building does." (learn-faster-than-the-market, lectures/apt101-three-jobs-rewritten.md). It names where it breaks, explicitly: "This is where 'building got cheap, deciding didn't' stops being an edge on its own... What would change this training's mind: agents that start deciding well" (learn-faster-than-the-market, lectures/apt101-where-you-go-from-here.md). The deduction: Day 2's middle (the bake-off, groundedness, the judge) runs more through AE101's verification lens than through "deciding didn't". The link ("a faster feature factory") is made, but the frame goes quiet for about two hours. → 89.

## Narrative

**A.** Five sentences: an engineer runs a loop on a trivial bug and learns the agent's account is not the repo. They learn to read plans, then borrow and author skills. They send a real task off un-packaged and it comes back drifted, confidently wrong or stalled. They read that return through three lenses, build the verifier, reference and plan against the failure they actually saw, and send the same task again. Then the trainer shows the training's own making failing the same way: "The agent I was working with had just finished writing those three modules. It still opened with the un-packaged shape." (spot-gaps-build-the-loop, lectures/story-of-module-6.md). The turn is lived: "The un-packaged run was supposed to underdeliver. What came back is data, not blame." (learn-from-the-test, exercises/diagnose-and-resend.md). It is set up as an experiment: "send it off plainly and you find out what you can't steer yet" (run-the-first-experiment, exercises/set-the-markers-send-it-off.md). The turn being the training's own failure reaches the 100 anchor. → 95.

**B.** Five sentences: a trio paints its box, writes a bet that can lose, and sends an overnight digest agent through a door they agreed together. On Day 2 the digest comes back fluent and agreeing, and the trio learns why: "It found what you asked it to look for... the agreement may come from your question, not from your customers." (whats-actually-true, lectures/apt101-why-it-agreed.md). They build a judge that won on their own evidence, choose a bet and pre-mortem it, then rewrite tonight's brief so it "asks the question the first digest never did: what argues against the bet" (whats-actually-true, exercises/apt101-keep-and-run-tonight.md). On Day 3 five real people use a slice and do "things the digest could not have said" (learn-faster-than-the-market, module Key Concepts). The bet ends open and goes to the wider team as a proposal. The turn is lived: the exercise comes before the lecture, which is the intended order. Two things keep it below A. First, it is pre-told: "It will read well... Some of those lines will be wrong" (our-product-our-system, lectures/apt101-it-runs-overnight.md) lands the night before the read, and "The digest agrees with your favourite hypothesis" (whats-actually-true, lectures/apt101-the-digest-is-back.md) asserts the failure whether or not a team's digest showed it. Second, the Day 1 brief ("what your material says about the bet", exercises/apt101-send-it-off.md) does not reliably produce the confirmation failure the turn rests on. The failure is the student's agent's. The training does not fail itself here. → 84.

## Point of view

**A.** Mostly second-person instruction from someone who has run these sessions: "Past ten or so interventions, you have become the agent" (run-the-first-experiment, exercises/set-the-markers-send-it-off.md) and "The nudge reads as encouragement and lands as a taunt." (same file). Then one first-person narrator with scars and numbers: "Five taste reversals from me on Claude's confident recommendations... I pushed back several times on Claude saying it was 'done' before it actually was." and "I drifted in every one of the ways this story just walked. I fixed what I caught. The loop caught what I missed." (spot-gaps-build-the-loop, lectures/story-of-module-6.md). The narrator's own failure is on the page, but in one passage, late. Elsewhere the voice is in the asides. → 92.

**B.** Built as intended: the trio is the hero ("what is the last thing your team built that nobody asked for?", our-product-our-system Start here; "Each of you can point at the line on the final box that came from you", exercises/apt101-paint-the-product-box.md). The guide appears a few times, always as guide: the installer, "Just because you can build it does not mean you should build it. (Lucky it did not take that long to build it.)" (our-product-our-system, lectures/apt101-building-is-cheap.md); the scar passage "For most of my working life I wanted to be right... About the future, all was blurry. It gave me anxiety, and a feeling of insufficiency." (whats-actually-true, lectures/apt101-why-it-agreed.md); and "We built good things. We failed to share them well." (learn-faster-than-the-market, lectures/apt101-from-us-to-the-team.md) and "I still make mistakes... I make them faster now." (lectures/apt101-where-you-go-from-here.md). The narrator's failure is on the page (an unused tool, failed sharing). But three of the four appearances are essay quotes with a byline under them, so they read as one more cited source beside Torres and Cutler, not a voice speaking in the room. Between them the voice is a neutral handbook. Only the "I wanted to be right" run is a narrating passage. → 85.

## Stance

**A.** Positions it could lose a customer over, each defended by a mechanism or a scar: "Assume about 10% of what it says or does is made up" (getting-going, exercises/orient-and-introspect.md), defended by the sycophancy mechanism ("matching you is what scored well in training", lectures/the-machine-you-just-met.md). "Ask for best practice and that is what answers... what it holds about your next run is a forecast... **A prediction is not a measurement.**" (learn-from-the-test, lectures/what-packaging-is.md). "A rule in context is not a rule in the output" and "A rule in memory that does not force is worse than no rule" (spot-gaps-build-the-loop, lectures/story-of-module-6.md), defended by the banned-word scar. "Don't make general what you don't practice yourself" (earn-the-trust, lectures/skills-from-the-frontier.md). Against its own interest: "Mollick does not call the winner. Neither does this training." (run-the-first-experiment pre-reads) and "This training stops short of the full system" (plan-mode-done-right, lectures/how-instructions-grow.md). That is honest scoping, not quite a commercial self-own. → 92.

**B.** Against its own commercial interest, on the page: "a team that does not talk with its customers every week should start there, before agents... That sells less of this training. It is still where to start." (whats-actually-true, lectures/apt101-go-back-to-your-customers.md). This reaches the 100 anchor's specific requirement. Further positions: "A faster feature factory is still a feature factory" (whats-actually-true, lectures/apt101-why-it-agreed.md); "This isn't a bug that gets patched in the next release. It's the shape of the technology. Later models will fabricate less; they won't stop." (whats-actually-true, lectures/apt101-fluent-is-not-true.md); "An agent's instructions are not the agent... So a proposal to the wider team cannot promise 'everyone gets our agent'." (learn-faster-than-the-market, lectures/apt101-from-us-to-the-team.md), the A101 anti-vendor position recast for the trio; and "A team that writes for its own criteria has rebuilt the feature factory with a dashboard" (learn-faster-than-the-market, lectures/apt101-what-good-means.md). The deduction: much of the rest is held by citation (Cutler, Seiden, Torres, Fitzpatrick, Bland, Klein, Kniberg) rather than by mechanism or scar. "Discovery belongs to the team that builds" is Torres's position, quoted, not the training's, defended. → 88.

## The pair

**A:** reads as someone who has been there. It doubts its own gates ("A gate nobody has verified is a gate trusted on vibes", lectures/the-gate-is-a-claim.md) and puts its own making on trial (story-of-module-6), while holding positions with mechanisms.

**B:** also been there, with less weight on the scar side. It doubts its own instrument in the room: the judge ships with a "*Known limit:* line" (exercises/apt101-catch-it-making-things-up.md), "A pass is a claim about a check nobody has tested" (lectures/apt101-what-good-means.md), and the pre-mortem says "If the bet does not survive, that is good work." It also holds ground against its own sales ("That sells less of this training"). The risk leans toward hedge-by-citation, not pitch: where A says "I drifted", B often says "Torres says".

## Room

Do B's exercises carry the story? Mostly yes. The Day 2 turn and the Day 3 payoff are both exercise-produced and named afterwards. Day 1 builds the setup, and the one weak link is the beat that seeds the turn.

**Strongest beats**
1. **Catch it making things up** (whats-actually-true, exercises/apt101-catch-it-making-things-up.md): planted claims, four checks, a scorer, the winner kept "with a *Known limit:* line at the bottom", then turned on a real summary: "It found something in a summary nobody planted anything in." Then "'The agent got this wrong' is the sentence. Nobody's work is on trial; the agent's is." The trio lives the doubt and then lives the tool's limit.
2. **Put it in front of five users** (learn-faster-than-the-market, exercises/apt101-five-users.md): "One pattern to watch: after the second session, someone wants to explain the slice to the next user before they start. Don't. The confusion is the finding." Phase 3 puts Day 1 digests beside what users did: "say whether the digest said it, could have said it, or could not have". The payoff of the Day 2 turn happens in the room, not in a slide.

**Weakest beats**
1. **Send it off, Phase 4** (our-product-our-system, exercises/apt101-send-it-off.md): "Pick the one closest to a digest and tell it what you want: what your material says about the bet, with the line it came from." This is the beat the Day 2 turn depends on, and it neither has the student ask for confirmation in their own words nor makes the agreement likely. The next day's lecture then has to assert "The digest agrees with your favourite hypothesis". The turn is told where it should be produced.
2. **Take it to the team** (learn-faster-than-the-market, exercises/apt101-take-it-to-the-team.md): "Where Claude says *teammate*, read *your wider team*. Where it says *candidate*, read *the way of working*." and "Read `module-7/jtbd.md`". Reused-prompt seams and 55 minutes of plan drafting. The five users' call and the open bet only get one line in Phase 1 ("add what the five users showed you"), so the story's last act runs on scaffolding, not on the trio's own discovery.

## Scores

| factor | A | B |
|---|---|---|
| Frame | 94 | 89 |
| Narrative | 95 | 84 |
| Point of view | 92 | 85 |
| Stance | 92 | 88 |

## Smallest moves for B

1. In `exercises/apt101-send-it-off.md` Phase 4, have each person write the digest's look-for line from their own hypothesis in their own words ("find what in my material supports: <my hypothesis>"), so Day 2's agreement comes from a sentence they can find and quote back.
2. In `lectures/apt101-it-runs-overnight.md`, cut "Some of those lines will be wrong... Nothing in the digest marks which lines those are" so the night before the read doesn't give away Day 2's turn.
3. Retitle `lectures/apt101-the-digest-is-back.md`'s "The digest agrees with your favourite hypothesis" as a question ("Does the digest agree with your bet?") so a team whose digest didn't agree is not told it did.
4. In `exercises/apt101-five-users.md` Phase 4, have each person name the one line of their own Day 1 hypothesis the five users proved wrong, so the trio's own earlier certainty is the failure the story turns on.
5. In `exercises/apt101-take-it-to-the-team.md`, replace the teammate/candidate translation note with this training's own wording and open Phase 1 from the five-users call in `team/five-users.md`, so the last act carries the bet's story rather than the reused prompts' vocabulary.
