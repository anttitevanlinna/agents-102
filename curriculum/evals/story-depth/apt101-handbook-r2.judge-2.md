# APT101 handbook r2 — storytelling judge 2 (paired, AE101 read first)

## Running notes

### A · M1
- Frame seeded: "The LLM mirrors your stance" / "Your stance is the ceiling" (painting-the-picture). Two frontiers named up front ("can that setup learn faster than you can write things down?").
- the-machine-you-just-met grounds frame in mechanism: preference tuning → sycophancy → "The report is a hypothesis to check, not ground truth"; errors-stack + "A check from outside the session resets the chain"; "That is why the failing test came before the fix." Recognition-after-move.
- Stance: "Assume about 10% of what it says or does is made up" (orient-and-introspect); "The agent yields if you push hard enough, so its agreement settles nothing" (fix-tests-first).
- Narrator: mostly second-person instruction; Klaassen quoted. Exercises self-doubting ("The escape hatch is deliberate").

### A · M2
- Frame extends: six-phase map; plan = check before implementation; "Push reach past what you can check and you have not delegated more. You are checking less." (when-a-plan-is-good). Three pressures ("Structure is persuasive").
- Self-challenge on own prompt: "This prompt is fair to read as replacing the file ... Precise prompting is harder than it looks." (extract-the-task-shaping-rule).
- "Rules have a ceiling" — training stops short of full system, says so (how-instructions-grow). Argyris double-loop. "Prohibitions stop; taste steers."

### A · M3
- Two-window side quest; borrowed vs own judgement ("Don't make general what you don't practice yourself", skills-from-the-frontier). "STRIDE's value is rejection, not enumeration."
- Self-doubt of own check: "The grade is biased by design ... same-window self-charity" (author-test-strategy-skill). "Authoring without invocation is theatre."
- Agent fails on page: ADR lands in worktree — "The agent reasoned forward from the conversation, not from the filesystem" (threat-model-with-stride).
- the-loop-half-filled: frame named as engineering — "closed-loop controller", "Local success, global drift", compound ladder, governor "Name the uncertainty before you move", "Control is interrogation", "The branch is the permission". Question seeded: "how do you trust work you didn't watch?" Recognition-before-naming: "A name is a handle, not a lesson. Every law coming up is a move already made."

### A · M4
- Turn set up: un-packaged send-off as deliberate experiment ("Session one goes now, un-packaged"; test-and-learn). "A tourist runs an agent and hopes; a practitioner runs a test and reads the data."
- Bainbridge 1983 + Parasuraman: "The more autonomy the agent earns, the worse a watcher you quietly become" (ironies-of-automation) — frame lens shows doubt about the training's own direction.
- reading-the-return: "The machine would rather produce something than admit nothing"; three failure modes; "test → learn → encode".

### A · M5
- Turn lived: "The un-packaged run was supposed to underdeliver. What came back is data, not blame." (diagnose-and-resend); re-send packaged. Sea passage: "A check is a position fix"; "An unchecked session arrives confident, and wrong ... The success report comes from the wrong harbor." (what-packaging-is).
- Stance: "what it holds about your next run is a forecast"; "A prediction is not a measurement"; "today's playbooks are **candidates**" — against best-practice vendors incl. itself.
- the-gate-is-a-claim: frame doubts its own instrument — "Green is a claim about the check, not a fact about the work"; Goodhart; Deming tampering; Sutton bitter lesson "Today's right procedure, your gates and workflow ... is superseded too" = frame names where it breaks.

### A · M6
- story-of-module-6: first-person narrator, dated session, own failures: "I had to reframe the whole session ... It still opened with the un-packaged shape"; "Claude had written a paraphrase and presented it as attribution"; "I drifted in every one of the ways this story just walked." Signed "Antti". Turn = training's own failure (the agent that wrote the modules didn't follow them).
- "A rule in context is not a rule in the output"; "A rule in memory that does not force is worse than no rule."
- Close: "There is no last turn ... The kit compounds; the model rotates." "nobody has that part figured out yet."
- A volume: ~181 `##` lines in the handbook text.

### B · M1
- Frame stated on slide one: "Building got cheap, deciding didn't" (apt101-work-backwards). Narrator-as-source: Antti quoted in third person on the installer "used just a bit" — "(Lucky it did not take that long to build it.)"
- Canon-heavy: Torres, Seiden, Cutler, Amazon, Christensen, O'Reilly, Cagan, Bland — each tied back to the frame in a closing line ("The risk now is that agents make the factory faster"; "Agents make much of the building cheap, which shrinks the feasibility work. They do not settle the other three.").
- Stance against own interest: "It costs whoever sells you agents too, this training included" (apt101-before-anything-goes-in).
- Overnight digest seeded: "Some of what it writes will be wrong, and finding which part is the team's job" (apt101-it-runs-overnight).

### B · M2
- Digest thread carried: what-came-in-overnight, when-the-run-went-wrong, "A digest that came back wrong is the discovery" (Antti quote "Ship the ideas — Discover the wrongs"). Turn is predicted ("Expect an agent's first digest ... to be wrong in places"), not shown happening on the page.
- Strong product-specific stance lines: "A customer need nobody said ... A week later someone builds for it" (fluent-is-not-true); "Scope it down far enough and the system is safe and useless ... you sign for it" (what-the-agents-may-keep); "Later models will fabricate less; they won't stop."
- Many slides ported from AE101 (tampering, prohibitions vs taste, agent stops where you stop writing, are-you-sure). Frame echoed: "Making got cheap. Knowing what good looks like did not." (your-taste-is-the-ceiling).
- Some slides float outside the frame (start-with-dont / split tests, 1-2-4-All, double diamond, pre-mortem) — product craft, not cases of the lens.

### B · M3
- Check-is-a-claim block mirrors AE101 M5, re-voiced for product: "A team that writes for its own criteria has rebuilt the feature factory with a dashboard" — pays off M1 Cutler.
- Antti's own failure: "I never pushed enough to put it really on paper and share" (from-us-to-the-team), quoted, third-person attribution.
- Frame breaks named: "Cheap building helps your rivals too ... This is where 'building got cheap, deciding didn't' stops being an edge on its own"; "What would change this training's mind: agents that start deciding well" (what-each-of-us-is-for).
- Close is a question, not a climax: "Will your organisation learn faster than the model changes underneath it? ... nothing today answers it."
- B volume: ~87 `##` slides.

## Frame

**A — Agentic engineering is engineering: a closed feedback loop you steer with checks and compound to disk.**
- M3 the-loop-half-filled: "The agent loop is a **closed-loop controller**. ... Cut the feedback signal (a test, a check, a read) and it drifts."
- M5 what-packaging-is: "**A check is a position fix**. At a fix the wedge of possible states collapses to a point."
- M1 the-machine-you-just-met: "A check from outside the session resets the chain. ... That is why the failing test came before the fix."
- Where it breaks, M5 the-gate-is-a-claim: "Green is a claim about the check, not a fact about the work." and "Sutton's **bitter lesson** ... Today's right procedure, your gates and workflow, yours or the agent's, is superseded too."
Every module (plan read as check, STRIDE delta, verifier, eval) only reads through the lens, and the lens is turned on itself. Top band.

**B — Building got cheap, deciding didn't: agents collapse the slice, so the trio's work moves to choosing outcome, bet and signal.**
- M1 apt101-work-backwards: "Agents make the slice cheap. The loop can now turn in days, and the hard part moves to the decisions."
- M2 apt101-your-taste-is-the-ceiling: "Making got cheap. Knowing what good looks like did not."
- M3 apt101-slice-by-learning: "Specifying well is the harder half: which customer, which step of their journey ... and which signal would tell you the idea was wrong."
- Where it breaks, M3 apt101-what-each-of-us-is-for: "This is where 'building got cheap, deciding didn't' stops being an edge on its own. When rivals build as cheaply, speed is the entry price." + "What would change this training's mind: agents that start deciding well."
The frame is stated, returns in each module, and names its own break — that is the 100 rung's extra. It falls short of "every module reads through it": a run of slides (double diamond, 1-2-4-All, start-with-don't / split tests, pre-mortem, Nielsen five users, Krug morning-a-month, Kniberg) are sound craft that would sit in any product handbook; the frame is bolted on in a last sentence or absent. A second lens (grounding/checks, ported from AE101) competes rather than nests.

## Narrative

**A.** An engineer meets a mirror that flatters, learns to reset its chains with tests, and plans and packages a near half they can watch. Then the far half goes quiet: they send a task off un-packaged and it comes back wrong. They read the failure through three lenses, build a verifier against their worst one, and re-send packaged. The turn comes in M6, where the narrator confesses that the agent which wrote these modules opened with the un-packaged shape, and that the trainer drifted the same ways. The training ends with no last turn.
- M4 test-and-learn: "Session one goes now, un-packaged: no plan.md, no verifier, no reference artifact."
- M5 diagnose-and-resend: "The un-packaged run was supposed to underdeliver. What came back is data, not blame."
- M6 story-of-module-6: "The training teaches this pattern across three modules. The agent I was working with had just finished writing those three modules. It still opened with the un-packaged shape."
The turn is the training's own failure. Top band.

**B.** A trio learns that building got cheap and deciding didn't, writes a bet that could lose, and sets an agent to digest the week overnight. The digest comes back wrong. The Day 2 lectures treat that as the discovery and work it into grounding, checks and a list of what not to let the agents keep. Day 3 writes the criteria and reads the signal, and "a slice that came back no did its job". The close turns on the frame itself: rivals build cheap too, and the question is whether the organisation learns faster than the model.
- M1 apt101-it-runs-overnight: "Some of what it writes will be wrong, and finding which part is the team's job."
- M2 apt101-when-the-run-went-wrong: "A digest that came back wrong is the discovery" / "Expect an agent's first digest of your customer material to be wrong in places."
- M3 apt101-read-the-signal: "A slice that came back no did its job. The team writes down what it now believes instead, and places the next bet on that."
There is a thread now, the overnight digest, and it has a turn. In the handbook, though, the turn is foretold ("Expect ... to be wrong") and filed under headings. It is never a scene: no specific wrong line, no quoted digest, no "here is what ours said". The student's own lived turn happens in the exercises, outside this surface. Between 40 (a shape asserted in headings) and 80 (a turn the student lives through), nearer the middle.

## Point of view

**A.** The narrator is Antti, a practitioner who built this training with the same tools and kept a dated log of the drift. He shows in an aside in M1 ("Assume about 10% of what it says or does is made up", orient-and-introspect). He shows in his self-doubt about his own prompt ("This prompt is fair to read as replacing the file ... Precise prompting is harder than it looks", extract-the-task-shaping-rule). Then he takes the whole of M6 story-of-module-6: "Five taste reversals from me on Claude's confident recommendations", "I drifted in every one of the ways this story just walked. I fixed what I caught." The narrator's own failure is on the page, in first person, and signed.

**B.** The narrator is Antti again, but quoted as a source rather than speaking. The handbook is a second-person curator that cites "Antti Tevanlinna, writing from inside an AI transformation".
- M1 apt101-work-backwards: "It got working and it was used just a bit. Bad idea, as the need wasn't a daily one. … (Lucky it did not take that long to build it.)"
- M3 apt101-from-us-to-the-team: "We made an 80% ready vision, but I never pushed enough to put it really on paper and share. … it still feels so bad sometimes."
- M2 apt101-when-the-run-went-wrong: "I used to think of being wrong as failure."
- Voice in an aside, M1 apt101-before-anything-goes-in: "Here's the oldest move in the security book, the one that sounds too much like common sense to charge for."
The narrator's failures are on the page, which A101-style instruction never managed. They are presented as block quotes with a byline, though, so the reader meets a cited author and not a guide speaking. The rest is an even, impersonal handbook voice over a long roll of named authorities. That is above 40 (a voice in asides) and below 80 (a narrator with a stated experience, telling it).

## Stance

**A.**
- "What it holds about your next run is a forecast ... **A prediction is not a measurement**" (M5 what-packaging-is). This is against best-practice sellers, and it is defended with the local-A/B mechanism.
- "A rule in context is not a rule in the output" (M6 story-of-module-6). It is defended with scars: four banned-word leaks.
- "Push reach past your calibration and you are not delegating more. You are checking less" (M5 the-gate-is-a-claim).
- "The more autonomy the agent earns, the worse a watcher you quietly become" (M4 ironies-of-automation). This runs against the pro-autonomy pitch.
- "Whether this field ever settles into a real best practice is an open question. Either way, today's playbooks are **candidates**" (M5). That includes the training's own playbook.
Each position is defended by a mechanism or a scar.

**B.**
- "Don't-open beats mitigate. ... It costs whoever sells you agents too, this training included: an agent that reaches less is a smaller thing to sell, and it is still the right call" (M1 apt101-before-anything-goes-in). This is explicitly against the training's own commercial interest, with a mechanism.
- "An agent's instructions are not the agent ... a proposal to the wider team cannot promise 'everyone gets our agent'" (M3 apt101-from-us-to-the-team). It is defended by where the work lives (the memory and the corrections).
- "'Are you sure?' is another fluent answer ... Later models will fabricate less; they won't stop" (M2 apt101-fluent-is-not-true). The mechanism is next-likely-word, and the Mata v. Avianca case backs it.
- "A team that writes for its own criteria has rebuilt the feature factory with a dashboard" (M3 apt101-a-check-is-a-claim). This is Goodhart turned on the buyer's own metrics culture.
- "Scope it down far enough and the system is safe and useless. Nobody hands you the number. You pick it ... and you sign for it" (M2 apt101-what-the-agents-may-keep).
- "Access is easy; absorption is scarce" (M3). This runs against rollout-as-adoption.
These are real positions with mechanisms, and one is held against the training's commercial interest, on the page. The deductions: many of the edgiest lines are AE101 ports, re-voiced (tampering, the gate as a claim, ironies of automation). Much else is borrowed authority (Cutler, Seiden, Torres) carrying the opinion instead of the training. The anti-vendor line also sits once, in M1, and is never returned to.

## The pair

**A** holds ground and doubts its own tools in the same breath ("The check you built is itself a claim that wants verifying"; "Today's right procedure ... is superseded too"). It reads as someone who has been there, on both counts.

**B** has both halves on the page. On stance: "this training included"; "rebuilt the feature factory with a dashboard". On doubt: "The trust is deserved. The noticing still has to be designed"; "What would change this training's mind". Much of the doubt is ported from AE101, and the scars are quoted rather than told, so it reads as someone who has been there, speaking through citations. It does not read as a hedge or a pitch, but as a well-read curator more than a practitioner.

## Scores

| factor | A (AE101) | B (APT101) |
|---|---|---|
| Frame | 95 | 80 |
| Narrative | 93 | 58 |
| Point of view | 95 | 60 |
| Stance | 92 | 80 |

## Smallest moves for B

1. Rewrite the four Antti block quotes as one first-person passage at the M2 turn ("our first digest said X; it was wrong because Y; here is what I did"), so the narrator tells his failure instead of being cited for it.
2. Make the Day 2 turn a scene: quote one concrete wrong line from a sample overnight digest in apt101-what-came-in-overnight, and pay that exact line off in M3 when the criteria catch it.
3. Give each frame-orphan slide (double diamond, 1-2-4-All, split tests, Nielsen, Krug, Kniberg) one clause on what deciding-not-building it protects, or cut it.

## Volume

- A (AE101): about 181 `##` slides on the student surface, including exercise phase headings.
- B (APT101): about 87 `##` slides, all lecture slides with no exercises in the manifest.
