# Story-depth judge 1 — hill-climb round 3 (paired: AE101 vs APT101 theory handbooks)

## Running notes

### A · AE101 M1
- Frame seeded: "The LLM mirrors your stance" / "Your stance is the ceiling" (painting-the-picture); two frontiers (learn fast / learn right). Sycophancy as mechanism ("matching you is what scored well in training", the-machine-you-just-met). Errors stack until a check resets them — engineering control frame.
- Narrative: orient → fix tests-first → compound; "You just ran the same loop" closes M1 with a lived beat.
- POV: second-person mostly; first-person absent so far. Opinionated lines: "The wizard typing in neat Perl syntax is dead." "The agent yields if you push hard enough, so its agreement settles nothing."
- Stance: "Assume about 10% of what it says or does is made up"; "The report is a hypothesis to check, not ground truth."

### A · AE101 M2
- Frame deepens into control engineering: six-phase map (intent→context→work→verification→absorption→outcome); "What you can test and check sets your complexity ceiling"; "Push reach past what you can check and you have not delegated more. You are checking less." (when-a-plan-is-good)
- Argyris double loop as lens; "Rules have a ceiling" — "This training stops short of the full system" (how-instructions-grow): frame names its own limit.
- Stance: "Prohibitions stop; taste steers"; "A plan without assumptions isn't assumption-free; it's just assumption-silent"; "your instinct is not a check on it".
- POV: still second-person, guide in asides ("Precise prompting is harder than it looks"). No narrator scar yet.

### A · AE101 M3
- Frame is fully load-bearing: "The agent loop is a **closed-loop controller**"; "Local success, global drift"; "Control is interrogation... You can always read more; you can never read all." (the-loop-half-filled). Map near half / far half — a structural spine.
- Narrative: "The far half goes quiet... how do you trust work you didn't watch?" — explicit act-break and rising stakes.
- Stance: "STRIDE's value is rejection, not enumeration"; "Don't make general what you don't practice yourself"; "Your codebase is not a pyramid"; "Authoring without invocation is theatre." Guide owns a seam: ADR-in-worktree drift explained by "The fork prompt called the worktree 'the side-quest'" — the training's own prompt caused the agent's error.
- POV: second person; guide visible in asides; no first-person yet.

### A · AE101 M4
- Narrative turn engineered: "Session one goes now, un-packaged... Session two goes packaged, after you've read the return." (test-and-learn). The student lives the failure. "You're new to this country. A tourist runs an agent and hopes; a practitioner runs a test and reads the data."
- Frame: "how do you trust work you didn't watch?"; Bainbridge 1983 — "the better the automation... the worse you are at the moment you are needed most"; "Trust and vigilance move in opposite directions" (ironies-of-automation) — the frame naming where agentic engineering's own success breaks the operator.
- Stance: "The closing summary is not the artefact. The machine would rather produce something than admit nothing" (reading-the-return); "When your agent stops for missing information... Usually there was."

### A · AE101 M5
- Turn paid off: "The task is the same, packaged this time, and the prompt shrank." (diagnose-and-resend). Sea passage: "An unchecked session arrives confident, and wrong... The success report comes from the wrong harbor." (what-packaging-is)
- Frame names its own break: "The gate is a claim too" — "A gate nobody has verified is a gate trusted on vibes"; Goodhart "The agent is an optimizer aimed straight at your gate"; Sutton: "Today's right procedure, your gates and workflow... is superseded too." Frame turns on its own tooling.
- Stance: "what it holds about your next run is a forecast"; "**A prediction is not a measurement.**"; "today's playbooks are **candidates**"; Deming tampering.
- POV: still second-person + named practitioners (Husain, Ronacher, Huntley); no I yet.

### A · AE101 M6
- POV top rung: story-of-module-6 first person, Antti signs. "Five taste reversals from me on Claude's confident recommendations"; "Claude opened the session with a plan... It still opened with the un-packaged shape" — the training's own build failing in the way the training teaches; "I drifted in every one of the ways this story just walked." Guide's own failure + training's own failure (narrative 100-anchor).
- Stance: "A rule in context is not a rule in the output"; "A rule in memory that does not force is worse than no rule"; "Nobody has that part figured out yet".
- Ending: "There is no last turn... The kit compounds; the model rotates. The training closes." Open, forward-pointing; "Your turn."
- Frame closes: "You drew a control loop"; eval = measurement; two frontiers bookend M1.
- Volume tally A (my count of `##` slides): M1 ~28, M2 ~32, M3 ~40, M4 ~22, M5 ~30, M6 ~30 → ~180.

### B · APT101 M1
- Frame seeded strongly and early: "You knew the craft; building rationed it" — "The post-it was not naive. It was what the craft shrank to when building was expensive." Then "Building got cheap, deciding didn't" (building-is-cheap): five-step outcome loop, "Every other step is a decision... None of those got cheaper." That is a clear one-sentence frame: the outcome craft, finally affordable; agents cheapen the slice, never the decision.
- Stance thread: "When agents analyse wider, deeper and faster, what is your insight?" — question, not position; sharp but not defended yet.
- POV: one first-person guide moment — "We built a tool that worked. It was used just a bit." (Antti, *Failing and Succeeding at the Same Time*) — a guide's own failure on the page, but quoted as an external citation slide, with a parenthetical hedge "(Lucky it did not take that long to build it.)". Otherwise impersonal third/second person, heavy citation (Cutler, Seiden, Christensen, Torres, Hohmann, O'Reilly, Cagan, Bland).
- Positions: "One agent per recurring job, not one company brain" — defended with mechanism ("a fix for one job shifts the answers for the others"); "The best mitigation is the door you don't open... It will cost you a source somebody wanted in. Leaving it out is still the right call."; "Sharpen the insights, never the sources".
- Narrative: setup + inciting incident "It works overnight; some of what it writes will be wrong" — a cliffhanger into M2.

### B · APT101 M2
- Turn is real and lived by the trio: "The digest agrees with your favourite hypothesis... It is also the moment you are least likely to check" → "It found what you asked it to look for... So the agreement may come from your question, not from your customers." (why-it-agreed). The student's own brief caused the failure — this is the AE101 un-packaged-send-off move, transposed. Good.
- Stance strengthening: "Agents amplify the way a team already works. They do not transform it." / "A faster feature factory is still a feature factory"; "So a team that does not talk with its customers every week should start there, before agents... That sells less of this training. It is still where to start." (go-back-to-your-customers) — a position held against the training's own commercial interest, explicitly on the page. Defended with a mechanism ("Agents build them in days, and the team ships them before any customer can say a guess was wrong").
- "This isn't a bug that gets patched in the next release... Later models will fabricate less; they won't stop." (fluent-is-not-true) — vendor-contrary.
- POV: second first-person guide slide — "I used to think of being wrong as failure" (quote from Antti essay, 2025-05-09). Personal, vulnerable, but generic about design, not a scar from *this* territory (agents in product work). Narrator still lives in quoted slides, not in passages.
- Frame holds: "Making got cheap. Knowing what good looks like did not."; "With agents, the finished look got cheap. Picking the one question a prototype should answer did not."; "The build got cheap. Dropping a bet the team has grown fond of is still a hard call." Every slide closes on the frame — risks reading as a refrain/tic.
- Borrowed AE101 machinery (Deming tampering, prohibitions vs taste, "agent stops where you stop writing") transposed cleanly.

### B · APT101 M3
- Frame names its own break, on a slide titled for it: "Cheap building helps your rivals too" — "This is where 'building got cheap, deciding didn't' stops being an edge on its own... What would change this training's mind: agents that start deciding well" (where-you-go-from-here). The 100-anchor move, made explicitly. Brief though: one slide, then the training moves on.
- Turn paid off: "Your Day 1 bet meets five users" — "Which of them would you have found by reading the digest alone?"; "A slice that comes back no has done its job."
- Borrowed AE101 machinery transposed: pass is a claim (Husain), Goodhart ("A team that writes for its own criteria has rebuilt the feature factory with a dashboard"), Bainbridge/overreliance ("The more you trust it, the less you notice") — the last is near-verbatim AE101, including the closing question.
- POV: two more Antti epigraphs — "We built good things. We failed to share them well." and "I still make mistakes. I make them faster now." Guide failures on the page, four in all across the handbook, but each is a citation slide (quote + byline + one bridging line). None is a passage told as a session.
- Ending open, forward: "Write it where your team will see it, and put it to the test on Monday." Stance thread question recurs four times (M1, M2, M3 ×2) as the spine.

## Frame

**A (AE101).** One sentence: agentic engineering is control engineering. The agent is a closed loop, checks are the feedback signal, and what you can verify is how far you can delegate.
- M3 the-loop-half-filled: "The agent loop is a **closed-loop controller**... Cut the feedback signal (a test, a check, a read) and it drifts."
- M2 when-a-plan-is-good: "Push reach past what you can check and you have not delegated more. You are checking less."
- M5 what-packaging-is: "**A check is a position fix**. At a fix the wedge of possible states collapses to a point."
- Where the frame breaks: M5 the-gate-is-a-claim, "A gate nobody has verified is a gate trusted on vibes"; Goodhart, "The agent is an optimizer aimed straight at your gate"; Sutton, "Today's right procedure, your gates and workflow... is superseded too"; M4 ironies-of-automation, "The better the automation... the worse you are at the moment you are needed most." The frame is turned against its own instruments. M1, M4 and M5 only make sense through it.

**B (APT101).** One sentence: agents make building cheap and leave deciding where it was, so the outcome craft that building once rationed finally gets its experiments, and the scarce thing becomes the trio's insight.
- M1 apt101-building-rationed-it: "The post-it was not naive. It was what the craft shrank to when building was expensive."
- M1 apt101-building-is-cheap: "For years the slice was the slow step. Now an agent can build it. Every other step is a decision... None of those got cheaper."
- M2 apt101-why-it-agreed: "A faster feature factory is still a feature factory... Agents amplify the way a team already works. They do not transform it."
- M3 apt101-where-you-go-from-here: "This is where 'building got cheap, deciding didn't' stops being an edge on its own... What would change this training's mind: agents that start deciding well."
The frame is load-bearing in every module, and it names its break, which is the 100 anchor on the letter. Two things hold it below A. The break gets one slide and no consequence (A spends a lecture on its break). And the frame surfaces as a refrain more than as a lens: "Making got cheap. Knowing what good looks like did not." / "With agents, the finished look got cheap. Picking the one question... did not." / "The build got cheap. Dropping a bet... is still a hard call." / "Agents made the how cheap. Deciding the why... did not get cheaper." By M2 it reads as a closing tic, not a lens doing new work.

## Narrative

**A.** You arrive as a wizard whose craft the LLM has absorbed, and you learn the machine mirrors you. You build rules and a near-half loop you can watch. Then the far half goes quiet: you send a task off un-packaged and it comes back confident and wrong. You diagnose, package and re-send, and you discover the gate itself is a claim. The turn: the author shows that the training's own M6 drifted in every way it teaches, and hands the loop to you. Quotes: M4 test-and-learn, "Session one goes now, un-packaged... Session two goes packaged, after you've read the return."; M5 diagnose-and-resend, "The task is the same, packaged this time, and the prompt shrank."; M6 story-of-module-6, "The agent I was working with had just finished writing those three modules. It still opened with the un-packaged shape." The turn is the training's own failure.

**B.** The trio knew the outcome craft, but building rationed it. Agents make building cheap, so the trio writes a bet and sends a digest agent off overnight. The digest comes back agreeing with their favourite hypothesis. The turn is that it agreed because their own brief asked it to. They go back to customers, widen and choose, and test with five users, where a no counts as success. Then they carry what they learned to the team on Monday. Quotes: M1 apt101-it-runs-overnight, "Some of those lines will be wrong... Nothing in the digest marks which lines those are."; M2 apt101-why-it-agreed, "So the agreement may come from your question, not from your customers."; M3 apt101-bet-meets-five-users, "Which of them would you have found by reading the digest alone?" The student lives the turn, which clears the 80 anchor. The training's own failure is not the turn. The installer story is a failure, but it is the author's, it sits in M1 before any stakes exist, and the plot never returns to it.

## Point of view

**A.** In M1–M5 a second-person guide speaks in asides ("Precise prompting is harder than it looks", M2 extract-the-task-shaping-rule). In M6 Antti speaks in first person about a dated session, with numbers. Quotes: M6 story-of-module-6, "Five taste reversals from me on Claude's confident recommendations."; "The paraphrase I shipped as a quote."; "I drifted in every one of the ways this story just walked. I fixed what I caught. The loop caught what I missed." The narrator's own failure is on the page as a full passage, in the training's own territory.

**B.** The guide is Antti, and he speaks only in quoted essay slides. M1 apt101-building-is-cheap: "One of the first things we tried building was a local installer... it was used just a bit. Bad idea, as the need wasn't a daily one." M2 apt101-why-it-agreed: "I used to think of being wrong as failure." M3 apt101-from-us-to-the-team: "We built good things. We failed to share them well." M3 apt101-where-you-go-from-here: "I still make mistakes. I make them faster now." The guide's failures are on the page four times, so the top rung is reached on the letter. Each one, though, is an epigraph with a byline, a few lines long, and only the installer slide is about product work with agents. None is told as a session with a before, a miss and a turn, the way story-of-module-6 is. Everywhere else the voice is an impersonal second person stitched from cited authorities (Cutler, Seiden, Torres, Cagan, Bland, Fitzpatrick, Edmondson, Klein, Kniberg). It is a guide you can quote, not one you sit beside.

## Stance

**A.** Positions it could lose a customer over:
- "A rule in context is not a rule in the output" (M6 story-of-module-6). Defended by a scar: "four separate violations across four independent LLM instances. The grep pass caught each one."
- "what it holds about your next run is a forecast... **A prediction is not a measurement.**" (M5 what-packaging-is). Defended by a mechanism: "No document holds it because, until the run, there is nothing to document."
- "A gate nobody has verified is a gate trusted on vibes" (M5 the-gate-is-a-claim). Defended with Goodhart's mechanism.
- "The wizard typing in neat Perl syntax is dead." (M1 painting-the-picture). Asserted.
- "Assume about 10% of what it says or does is made up" (M1 orient-and-introspect). Hedged as a heuristic.
Against its own commercial interest: "This training stops short of the full system" (M2 how-instructions-grow), and the training's own build drifting (M6). Mostly defended, with a scar at the top. Partly hedged.

**B.** Positions it could lose a customer over:
- "So a team that does not talk with its customers every week should start there, before agents... That sells less of this training. It is still where to start." (M2 apt101-go-back-to-your-customers). Held against its own sale, on the page, and defended by a mechanism: "Agents build them in days, and the team ships them before any customer can say a guess was wrong."
- "A faster feature factory is still a feature factory" / "Agents amplify the way a team already works. They do not transform it." (M2 apt101-why-it-agreed). Defended: "A team that ships without asking whether it worked now ships more of it, faster, and still never finds out."
- "This isn't a bug that gets patched in the next release... Later models will fabricate less; they won't stop." (M2 apt101-fluent-is-not-true). Vendor-contrary, defended by the next-likely-word mechanism.
- "One agent per recurring job, not one company brain" (M1 apt101-it-runs-overnight). Defended: "a fix for one job shifts the answers for the others."
- "It will cost you a source somebody wanted in. Leaving it out is still the right call" (M1 apt101-it-runs-overnight). Names its own cost.
- "Your insight is the strategy" / "What would change this training's mind" (M3). Falsifiable and held.
These positions are defended by mechanism, with one explicitly against the training's own sale. The defences are argued rather than scarred. No B position rests on a dated failure the way "a rule in context" does. On positions alone, B's are sharper and riskier than A's.

## The pair

**A.** The doubt is deep: the gate is a claim, the model is a forecast, the author drifted. The stance is firm: a rule in context is not a rule in the output, and packaging beats guessing. Both are present, so it reads as someone who has been there, and the scar is what earns the doubt.

**B.** The doubt is there: the frame breaks against rivals, a pass is a claim, the more you trust it the less you notice, "I still make mistakes". The stance is firm: customers before agents against its own sale, a faster feature factory, models won't stop fabricating. Both are present, and it reads as someone who has been there, though at one remove. The doubt arrives through cited researchers and short epigraphs, so B's pair is argued more than it is lived. Neither a hedge nor a pitch.

## Scores

| factor | A | B |
|---|---|---|
| Frame | 95 | 88 |
| Narrative | 94 | 84 |
| Point of view | 95 | 84 |
| Stance | 92 | 89 |

## Smallest moves for B

1. Point of view: turn the installer epigraph (M1 apt101-building-is-cheap) into a short first-person passage told as the session it was: the bet nobody wrote, the signal that never came, when the team noticed. The guide's failure would then sit as a scene in this training's territory, not as a byline.
2. Narrative: let the M2 turn ("it found what you asked it to look for") land on a guide's own digest-agent brief that agreed with his hypothesis, provided the maintainer supplies a real instance. The turn then becomes the guide's failure, not only the student's.
3. Frame: cut the "X got cheap, Y did not" closer from the slides where it is only a refrain (prototype, pre-mortem, aligned autonomy, taste). It should land at the load-bearing beats and at the "where the frame breaks" slide, and that slide should get one consequence the trio acts on.

## Volume

Count of `##` slides from the inlined student read (maintainer and backing stripped):
- A (AE101): M1 26 · M2 34 · M3 42 · M4 24 · M5 26 · M6 29 → about 181, including exercise phase headings.
- B (APT101): M1 27 · M2 28 · M3 24 → about 79, all lecture slides.
