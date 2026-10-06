# APT101 handbook r1 — storytelling judge 1 (paired: A = AE101, B = APT101)

Read via `node scripts/read-curriculum.js`, maintainer tails + backing stripped, student order per THEORY_HANDBOOK_MANIFEST.

## Running notes

### A · M1
- Frame seeded: "The LLM mirrors your stance" / "It was trained to match you. Your stance is the ceiling." (painting-the-picture). Two frontiers named up front ("can that setup learn faster than you can write things down?").
- Machinery explained, not asserted: sycophancy from preference tuning (the-machine-you-just-met · agreeable-answers); error cascade "below a coin flip" (errors-stack) — "That is why the failing test came before the fix." Exercise retro-justified by lecture: engineering lens (checks outside the session).
- Stance: "The wizard typing in neat Perl syntax is dead."; "Assume about 10% of what it says or does is made up." (orient-and-introspect); "its agreement settles nothing" (fix-tests-first).
- POV: second-person instructor, terse, some personality ("`/context` is oldskool"). No narrator scar yet.
- Narrative: orient → fix → compound loop; "The loop is the shape. The bug today was the excuse." Bloat foreshadowed: "Everyone sees how this will bloat almost immediately." (compound-and-close).

### A · M2
- Frame: map with Verification + Absorption phases (the-whole-map); "Push reach past what you can check and you have not delegated more. You are checking less." (when-a-plan-is-good) — control/verification lens, load-bearing. Double-loop (Argyris) under how-instructions-grow.
- Stance: "'Run the tests' is cosmetic"; "your instinct is not a check on it. Read it assuming something in there is wrong; there usually is."; "Prohibitions are weak instructions" (how-instructions-grow). "The cure is not better rules; it is where the rules live."
- Self-limit: "This training stops short of the full system" (how-instructions-grow) — honest boundary.
- Self-doubt on page: "Precise prompting is harder than it looks." (extract-the-task-shaping-rule) — the training's own prompt may nuke the file. A small own-failure moment.
- Narrative: rules file grows → ceiling ("Rules have a ceiling") — setting up the turn. Still mostly topic sequence; the turn is foreshadowed.

### A · M3
- Frame becomes explicit and load-bearing: "The agent loop is a **closed-loop controller**... Cut the feedback signal... and it drifts. Signal quality is part of the law: a flaky test is a closed loop that still drifts." (the-loop-half-filled). "Control is interrogation." "The branch is the permission... Control is exercised at the merge." Engineering-is-engineering lens: STRIDE, ADRs, Saltzer & Schroeder.
- Stance: "STRIDE without an access-surface map is pub-quiz threat modeling." (map-the-access-surface); "STRIDE's value is rejection, not enumeration."; "Authoring without invocation is theatre." / "Your codebase is not a pyramid." (author-test-strategy-skill); "Don't make general what you don't practice yourself." (skills-from-the-frontier). Self-charity named: "The grade is biased by design... same-window self-charity."
- Agent failure shown concretely: ADR landing in worktree — "The agent reasoned forward from the conversation, not from the filesystem." (threat-model-with-stride).
- Narrative: explicit act break — "The far half goes quiet... how do you trust work you didn't watch?" (the-loop-half-filled). A designed turn into M4. Map as plot device (M1 "stepped into the territory without the map, on purpose").

### A · M4
- THE TURN, designed as the student's own failure: "Session one goes now, un-packaged... Session two goes packaged, after you've read the return." (test-and-learn). "Cancel is legitimate; traces are data." Reading-the-return: "The closing summary is not the artefact. The machine would rather produce something than admit nothing."
- Frame where it breaks / costs: Bainbridge — "a formerly experienced operator... 'may now be an inexperienced one.'"; "The more autonomy the agent earns, the worse a watcher you quietly become... The trust is deserved. The watching still has to be engineered." (ironies-of-automation). Frame naming its own cost.
- Backpressure from flow engineering (what-keeps-a-long-running-session-going) — engineering lens again.
- Stance: "You're new to this country. A tourist runs an agent and hopes; a practitioner runs a test and reads the data." (test-and-learn). "Not *should I have spec'd it tighter*." (reading-the-return). "When your agent stops for missing information... Usually there was."
- POV still instructor second person; the narrator not yet personal.

### A · M5
- Turn paid off: "The un-packaged run was supposed to underdeliver. What came back is data, not blame." (diagnose-and-resend). "packaging you built against your own failure beats packaging you guessed at."
- Sea passage: "An unchecked session arrives confident, and wrong... The success report comes from the wrong harbor." "Fence the reef, not the open water." (what-packaging-is). Strong image, frame as navigation/control.
- Frame names where it breaks, explicitly: "The gate is a claim too... Green is a claim about the check, not a fact about the work." Goodhart; "Sutton's **bitter lesson**... Today's right procedure, your gates and workflow... is superseded too." (the-gate-is-a-claim). The training's own tools doubted.
- Stance defended by mechanism: "Ask for best practice and that is what answers: a well-read average... what it holds about your next run is a forecast." "**A prediction is not a measurement.**" (what-packaging-is). "Whether this field ever settles into a real best practice is an open question... today's playbooks are **candidates**." — against selling a playbook (commercial-interest-adjacent).
- "Expect partial failures framed as partial successes... RLHF is a big part of why" (diagnose-and-resend) — M1 mechanism returns.

### A · M6
- POV peaks: story-of-module-6 first person, dated, with numbers and named narrator ("Antti"). Own failure on page: "I drifted in every one of the ways this story just walked." / "The three-phrase closer I didn't catch." / "The paraphrase I shipped as a quote." — the training's own making fails, i.e. narrative turn = the training's own failure ("The agent I was working with had just finished writing those three modules. It still opened with the un-packaged shape.").
- Stance: "A rule in context is not a rule in the output." "A rule in memory that does not force is worse than no rule." "Our read: much is caused by post-training preferring warmth over directness." (story-of-module-6). "Nobody reviews 500K lines by hand." / "nobody has that part figured out yet" (agents-that-build-agents).
- Frame closure: "You drew a control loop" (composing-the-workflow); eval = measurement against fixed yardstick; "The field wires kits more ways than one; no way has won." (non-pitch). "The kit compounds; the model rotates."
- Two frontiers bookend M1 ↔ M6 (the-2-frontiers). Some M6 slides are figure-only (Dino Repo, Pocock) — thin in text.
- Overall A: frame is explicit, load-bearing, names its own break (gate is a claim, bitter lesson, ironies). Narrative: un-packaged→packaged turn lived by student + training's own failure in M6. POV: instructor second person until M6 narrator with scars. Stance: defended by mechanism + scar.

### B · M1
- Frame candidate stated in slide 1: "Building got cheap, deciding didn't... Agents make the slice cheap... the hard part moves to the decisions" (apt101-work-backwards · the-outcome-loop). Outcome→Opportunities→Bet→Slice→Signal loop. Plausible frame: *agentic product work is product discovery; the agent makes the slice cheap, the trio owns the decisions.* Seeded clearly.
- Heavy borrowed authority: Torres, Seiden, Cutler, Amazon, Hohmann, Christensen, O'Reilly, Cagan, Bland — a citation parade, each slide one author. Reads as a well-sourced reader, not a narrator.
- Stance lines: "The risk now is that agents make the factory faster: more features shipped, the same nothing learned." (work-backwards · feature-factory); "A signal that can only come back yes is not a test. Write one that could embarrass you" (apt101-write-the-bet); "Agents ... do not settle the other three. Customers still choose, users still get stuck, and the business can still say no." Against commercial interest, on page: "It costs whoever sells you agents too, this training included: an agent that reaches less is a smaller thing to sell, and it is still the right call." (apt101-before-anything-goes-in · door-you-dont-open) — strong.
- Mechanism: "fills the gaps with what sounds likely... Those lines read as well as the true ones." (apt101-you-are-the-check). No sycophancy/preference-tuning mechanism yet.
- POV: second person, neutral explainer; narrator surfaces once ("the one that sounds too much like common sense to charge for"; "Unglamorous, isn't it?"). No experience stated.
- Narrative: setup only — overnight agent built at end of M1 ("It works overnight... leaves the digest ready by morning") — sets up a night-passage the way AE101 M4 sets up send-off.

### B · M2
- Narrative: the overnight run comes back ("What came in overnight"; "When the overnight work went wrong") — a structural echo of AE101's un-packaged send-off, but told in the abstract third person ("An agent working through the night can stop before the job is done"), not as the student's failure. The turn is described, not lived/quoted. No "you sent X and it did Y".
- Frame: discovery loop + "Making got cheap. Knowing what good looks like did not." (apt101-your-taste-is-the-ceiling). Grounding lens: "There is truth out there... only a model of what usually comes next" (apt101-fluent-is-not-true). Frame competes with a second lens (risk loop: "safe enough, under these conditions, for now") and a third (team psych safety). Several frames, loosely tied by "the trio decides".
- Stance, defended with mechanism: "'Are you sure?' is another fluent answer... This isn't a bug that gets patched in the next release. It's the shape of the technology." (fluent-is-not-true); "The most dangerous thing an agent writes in product work is not a wrong number. It is a quote." (a-customer-need-nobody-said) — product-specific, sharp. "An agent asked for a summary gives you the middle, smoothly." (opportunities-before-solutions · the-branch-one-of-you-found). "Scope it down far enough and the system is safe and useless. Nobody hands you the number... you sign for it." (what-the-agents-may-keep · give-it-less). "Start with don't... Most of the time, it can." "Checking the agent's work is not watching the person who ran it." (the-check-that-found-them).
- Self-doubt: "You do not know in advance which method catches what... Nobody does." (run-more-than-one-check). "'I can't tell.' Most rows land there."
- Register wobble: start-with-dont / split-when / why-the-llm-fabricates are borrowed Agents 101 voice (Confluence retriever, Mata v. Avianca legal brief) — not product-trio-shaped. Mata v. Avianca sits oddly next to customer interviews.
- POV: still faceless. Citation per slide (Torres again, Fitzpatrick, Design Council, Liberating Structures, Edmondson, Houde & Hill, Osterwalder, Bland, Marquet, Klein, Deming). No narrator experience, no "we/I".

### B · M3
- Frame returns and turns on itself: "A team that writes for its own criteria has rebuilt the feature factory with a dashboard. Keep one question the criteria cannot answer, asked by a person: did this change anything for the customer?" (apt101-a-check-is-a-claim · your-rubric-becomes-a-target) — M1 feature-factory pays off. "With agents building, slices are cheap, so the first slice tests the assumption you are least sure of." (apt101-slice-by-learning). "Specifying what to build is now the harder half."
- Closing question: "Will your organisation learn faster than the model changes underneath it? That is the question to carry out of here, and nothing today answers it." (apt101-what-each-of-us-is-for) — matches AE101 two-frontiers, but arrives at the end rather than bookending.
- Stance: "A proposal with no wall in it was written about a laptop." (apt101-from-us-to-the-team · three-walls); "The page was never where the work lived." (you-cannot-hand-over-an-agent); "A slice that came back no did its job." (apt101-read-the-signal); "Asking the same agent twice in the same conversation is not a second opinion."
- Narrative close: no return to the overnight digest as the protagonist's arc; M3 is a sequence of topics (checks, slicing, Nielsen, Krug, Ries, Scrum, Sy, Kniberg, Marquet, trust/vigilance) ending on habits. The "trio wants X, agent did Y, trio changed Z" plot is implicit at best.
- POV: no narrator through to the end. Ironies-of-automation ported ("The trust is deserved. The noticing still has to be designed.") without Bainbridge's name or scar.

## Frame

**A (AE101): agentic engineering is engineering — a closed-loop controller whose quality is bounded by the checks you build outside it.** M1 sets the mechanism ("If each step were right nine times in ten, the odds that a seven-step chain is still right by the end would fall below a coin flip... That is why the failing test came before the fix." — M1 the-machine-you-just-met). M3 names it ("The agent loop is a **closed-loop controller**... a flaky test is a closed loop that still drifts." — M3 the-loop-half-filled). M5 shows it as navigation ("**A check is a position fix**... The success report comes from the wrong harbor." — M5 what-packaging-is). It also names where it breaks: "Green is a claim about the check, not a fact about the work." and "Sutton's **bitter lesson**... Today's right procedure, your gates and workflow... is superseded too." (M5 the-gate-is-a-claim); and Bainbridge, where the frame costs you: "The more autonomy the agent earns, the worse a watcher you quietly become." (M4 ironies-of-automation). Every module reads through it, and it names its own limit → **94**.

**B (APT101): building got cheap, deciding didn't. Agents turn the outcome loop fast, and the trio owns every decision in it.** It's stated on slide one ("For years the slow step was the slice... Agents make the slice cheap... the hard part moves to the decisions" — M1 apt101-work-backwards · the-outcome-loop). It comes back as a refrain ("Making got cheap. Knowing what good looks like did not." — M2 apt101-your-taste-is-the-ceiling; "An agent widens in minutes. The choosing stays with the team." — M2 apt101-opportunities-before-solutions · diverge-then-converge; "With agents building, slices are cheap, so the first slice tests the assumption you are least sure of." — M3 apt101-slice-by-learning). In one place it turns on itself: "A team that writes for its own criteria has rebuilt the feature factory with a dashboard." (M3 apt101-a-check-is-a-claim). It is load-bearing in M1 and M3. M2 runs on two other lenses, though: grounding ("There is truth out there" — M2 apt101-fluent-is-not-true) and risk ("safe enough, under these conditions, for now" — M2 apt101-what-the-agents-may-keep), and the frame only touches them. Many slides are one cited author each and would read the same without the lens (Nielsen, Krug, Sy, Kniberg). The handbook never names where the frame breaks, e.g. when deciding gets cheap too. → **66**

## Narrative

**A.** An engineer meets a machine that mirrors them and learns to steer it with checks. Then they send a real task off un-packaged ("Session one goes now, un-packaged: no plan.md, no verifier, no reference artifact" — M4 test-and-learn). It comes back confident and partly wrong ("The un-packaged run was supposed to underdeliver. What came back is data, not blame." — M5 diagnose-and-resend). They package it against their own failure and send it again, then diff the two sessions. Finally the training shows its own making failing in exactly those ways: "The agent I was working with had just finished writing those three modules. It still opened with the un-packaged shape." (M6 story-of-module-6). The student lives the turn, and the training's own failure is the second turn. The map is the plot device ("M1 stepped into the territory without the map, on purpose" — M3 the-loop-half-filled; "The far half goes quiet... how do you trust work you didn't watch?"). → **92**

**B.** A trio that wants a customer outcome builds an overnight digest agent ("It works overnight... leaves the digest ready by morning" — M1 apt101-it-runs-overnight). It comes back having stopped short or smoothed ("An agent working through the night can stop before the job is done, and its digest may not say so" — M2 apt101-when-the-run-went-wrong). The trio learns to ground claims, keep the lone branch, and write checks. Then it slices a bet, reads the signal and takes the setup to the team ("A slice that came back no did its job." — M3 apt101-read-the-signal). The shape is designed: build, night, return, repair, hand over. But the turn is told in the general third person, an inventory of what agents do. It is never *your* digest, quoted. The two arcs are never tied together either: the digest that went wrong never comes back in M3 as the thing the checks fixed, and M3 reads as a sequence of topics (Nielsen → Krug → Ries → Scrum → Sy → Kniberg → Marquet). No failure belongs to the training. → **54**

## Point of view

**A.** For five modules the voice is a terse second-person instructor with personality ("`/context` is oldskool" — M1 orient-and-introspect; "The wizard typing in neat Perl syntax is dead." — M1 painting-the-picture; "You're new to this country. A tourist runs an agent and hopes" — M4 test-and-learn). In M6 the narrator steps out, named and dated, with scars: "One session. 2026-04-24. One model... Five taste reversals from me"; "The paraphrase I shipped as a quote."; "I drifted in every one of the ways this story just walked. I fixed what I caught. The loop caught what I missed." (M6 story-of-module-6, signed "Antti"). The narrator's own failure is on the page → **95**

**B.** No one is telling this. It's a well-read, faceless explainer that hands each slide to a cited authority (Torres, Seiden, Cutler, Christensen, O'Reilly, Cagan, Bland, Fitzpatrick, Klein, Edmondson, Marquet, Kniberg...). A voice surfaces only in asides: "That's context. Unglamorous, isn't it?" (M1 apt101-context-is-king); "Here's the oldest move in the security book, the one that sounds too much like common sense to charge for." (M1 apt101-before-anything-goes-in); "If an agent were 85% correct... You'd forgive that in an intern." (M3 apt101-a-check-is-a-claim · mostly-right-ten-times). It never says what the narrator has been through with a product team and agents. Even ironies-of-automation arrives anonymised ("Automation researchers named it in the 1990s" — M3 apt101-what-each-of-us-is-for). A couple of slides borrowed from A101 change register (Confluence retriever, Mata v. Avianca legal brief — M2 apt101-gather-the-evidence, apt101-the-check-that-found-them). → **36**

## Stance

**A.** Positions it could lose a customer over, each defended:
- "**A prediction is not a measurement.**... today's playbooks are **candidates**" (M5 what-packaging-is). Defended by mechanism: "a well-read average of what other people published about other repos, frozen at a cutoff". It refuses to sell a playbook, which works against its own commercial interest.
- "A rule in context is not a rule in the output." / "A rule in memory that does not force is worse than no rule." (M6 story-of-module-6). Defended by scar: four leaks across four LLM instances.
- "Assume about 10% of what it says or does is made up." (M1 orient-and-introspect); "its agreement settles nothing" (M1 fix-tests-first). Defended by the sycophancy mechanism (M1 the-machine-you-just-met · agreeable-answers).
- "'Run the tests' is cosmetic" (M2 when-a-plan-is-good); "STRIDE without an access-surface map is pub-quiz threat modeling." (M3 map-the-access-surface); "Authoring without invocation is theatre." (M3 author-test-strategy-skill).
- "The field wires kits more ways than one; no way has won." (M6 composing-the-workflow).
Positions are defended with mechanism and scar, plus one against interest → **93**

**B.** Positions:
- "It costs whoever sells you agents too, this training included: an agent that reaches less is a smaller thing to sell, and it is still the right call." (M1 apt101-before-anything-goes-in · door-you-dont-open). Held against its own commercial interest, on the page, which is B's strongest line.
- "'Are you sure?' is another fluent answer... This isn't a bug that gets patched in the next release. It's the shape of the technology. Later models will fabricate less; they won't stop." (M2 apt101-fluent-is-not-true). Defended by mechanism (next likely word).
- "The most dangerous thing an agent writes in product work is not a wrong number. It is a quote." (M2 apt101-fluent-is-not-true · a-customer-need-nobody-said). Product-specific and defended ("It is dangerous because it fits").
- "An agent asked for a summary gives you the middle, smoothly." (M2 apt101-opportunities-before-solutions · the-branch-one-of-you-found)
- "A proposal with no wall in it was written about a laptop." / "The page was never where the work lived." (M3 apt101-from-us-to-the-team)
- "Scope it down far enough and the system is safe and useless. Nobody hands you the number... you sign for it." (M2 apt101-what-the-agents-may-keep · give-it-less)
- "A team that writes for its own criteria has rebuilt the feature factory with a dashboard." (M3)
These are defended by mechanism, never by scar. Many of the sharpest positions are borrowed and attributed (Cutler, Fitzpatrick, Goodhart, Deming), so the training referees more than it stands. → **74**

## The pair

**A** doubts its own tools: "The gate is a claim too", "a gate trusted on vibes", "Whether this field ever settles into a real best practice is an open question", "the training's own prompt may nuke the file" ("Precise prompting is harder than it looks" — M2). It also holds its ground (forecast, not measurement; a rule in context is not a rule in the output). Both are present, so it reads as **someone who has been there**.

**B** also has both. The doubt: "You do not know in advance which method catches what... Nobody does." (M2 run-more-than-one-check); "'I can't tell.' Most rows land there." (M2 reassess-the-residual); "nothing today answers it" (M3 learn-faster-than-the-model). The ground it holds: "this training included"; "shape of the technology". With no narrator and no scar, the pairing reads as a **well-read referee**. It isn't a pitch and it isn't a hedge, but it isn't someone who has been there either. It is closest to "both", minus the being-there.

## Scores

| factor | A (AE101) | B (APT101) |
|---|---|---|
| Frame | 94 | 66 |
| Narrative | 92 | 54 |
| Point of view | 95 | 36 |
| Stance | 93 | 74 |

## Smallest moves for B

1. Add one first-person "story of this training" lecture at the end of M2: the maintainer's own APT101 build, where the agent invented a customer quote or smoothed a disagreement and the check caught it, signed and dated.
2. Make M2's "When the overnight work went wrong" quote the trio's own digest back at them (the line it stretched, the source it never opened), and have M3's first check slide name that same failure as the one it now catches.
3. Close each module with one line naming which decision it just handed back to the trio, and add one slide naming where "building got cheap, deciding didn't" breaks: when the agent's judgement beats the trio's.

## Volume

Counted the `##` headings in the read-curriculum output, maintainer tails stripped:
- **A (AE101):** about 181 `##` slides (M1 26 · M2 34 · M3 42 · M4 24 · M5 26 · M6 29), lectures and exercises together. Exercise phase headers make up a large share.
- **B (APT101):** about 84 `##` slides (M1 25 · M2 33 · M3 26), all lectures. That is less than half of A's volume over half as many modules, so per module the volume is roughly comparable.
