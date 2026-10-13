# APT101 handbook hc2 — storytelling judge 2 (paired: AE101 = A, APT101 = B)

## Running notes

### A · M1
- Frame seeded: "The LLM mirrors your stance… Your stance is the ceiling" (painting-the-picture); "That is the machine. The rest is steering." (the-machine-you-just-met). Mechanism, not assertion: sycophancy from preference tuning; error cascade arithmetic.
- Two frontiers named up front ("can that setup learn faster than you can write things down?") = plot question opened.
- Narrator: thin first-person; mostly second-person instruction. "The wizard typing in neat Perl syntax is dead." Voice through aphorism.
- Stance: "Assume about 10% of what it says or does is made up." "The report is a hypothesis to check, not ground truth." "its agreement settles nothing."
- Self-doubt of own tool: compound-and-close "Ask only what it added, and the agent finds something to have added" — escape hatch. Doubts its own compounding step.

### A · M2
- Frame deepens into control vocabulary: "What you can test and check sets your complexity ceiling… Push reach past what you can check and you have not delegated more. You are checking less." (when-a-plan-is-good). Six phases map (the-whole-map) = structural lens.
- Stance defended by mechanism: "A plan without assumptions isn't assumption-free; it's just assumption-silent." "Structure is persuasive… a draft formatted like a decision." "Prohibitions are weak instructions… puts nothing in its place" (how-instructions-grow).
- Self-doubt on own prompts: "This prompt is fair to read as replacing the file… would nuke the old rules… Precise prompting is harder than it looks." Frame limit named: "This training stops short of the full system".
- Narrator still mostly absent; voice in aphorisms ("Anyone who has told a child 'don't do that' knows the result").

### A · M3
- Frame becomes explicit control theory: "The agent loop is a **closed-loop controller**… Cut the feedback signal… and it drifts. Signal quality is part of the law: a flaky test is a closed loop that still drifts." (the-loop-half-filled). Recognition-before-naming stated: "Every law coming up is a move already made."
- Plot hinge planted: "The far half goes quiet… how do you trust work you didn't watch?" — the near half/far half turn.
- Stance with mechanism: "Don't make general what you don't practice yourself"; "Control is interrogation… You can always read more; you can never read all."; "Your codebase is not a pyramid."
- Self-doubt on own check: "The grade is biased by design… same-window self-charity." ADR-in-worktree = training's own prompt framing misled the agent ("The fork prompt called the worktree 'the side-quest'… The agent reasoned forward from the conversation, not from the filesystem.") — training failing, owned.
- Narrator: still no "I". Voice = confident practitioner aphorisms.

### A · M4
- The turn is engineered: "Session one goes now, un-packaged… Session two goes packaged, after you've read the return." (test-and-learn). Student lives the failure. "You're new to this country. A tourist runs an agent and hopes; a practitioner runs a test and reads the data."
- Frame names its own cost (Bainbridge): "The better the automation… the worse you are at the moment you are needed most." "The trust is deserved. The watching still has to be engineered." = frame naming where engineering control breaks.
- Stance/mechanism: "The machine would rather produce something than admit nothing"; "When your agent stops for missing information… Usually there was."

### A · M5
- Turn pays off: "The task is the same, packaged this time, and the prompt shrank." (diagnose-and-resend). Sea passage: "A check is a position fix… An unchecked session arrives confident, and wrong… The success report comes from the wrong harbor." (what-packaging-is).
- Frame turns on itself: "The gate is a claim too… Green is a claim about the check, not a fact about the work." Goodhart: "The agent is an optimizer aimed straight at your gate." Sutton: "Today's right procedure, your gates and workflow… is superseded too." = frame names where it breaks/decays.
- Stance against own commercial interest-ish: "Ask for best practice… a well-read average… what it holds about your next run is a forecast." "today's playbooks are **candidates**" — includes the training's own playbook. "nothing published can run that local test for you" — a training is published.
- Narrator still second person; no scars yet.

### A · M6
- Narrator arrives, scarred, first person: "I am going to tell you how this module got made… What I tried, what drifted" (story-of-module-6). Guide's own failure on the page, specific: "The paraphrase I shipped as a quote"; "The three-phrase closer I didn't catch"; "I drifted in every one of the ways this story just walked." Signed "Antti". Training's own failure = the turn at 100 rung (the agent that wrote M4–M5 "still opened with the un-packaged shape").
- Stance: "A rule in context is not a rule in the output." "A rule in memory that does not force is worse than no rule." "The loop caught what I missed… You will catch what I missed."
- Open ending, forward: "There is no last turn… The kit compounds; the model rotates. The training closes." Frame-closing: "nobody has that part figured out yet" (agents-that-build-agents).
- Narrator otherwise absent M1–M5: POV is a one-passage reveal, not a thread. Frame bookended by two frontiers (M1 painting, M6 the-2-frontiers).

### B · reading next

### B · M1
- Frame stated early and cleanly: "Building got cheap, deciding didn't… Every other step is a decision… None of those got cheaper." (apt101-building-is-cheap). Opening is a vindication reframe for the trio: "The post-it was not naive. It was what the craft shrank to when building was expensive." (apt101-building-rationed-it). Outcome loop (outcome/opportunity/bet/slice/signal) = the spine.
- Stance thread as question, not position: "When agents analyse wider, deeper and faster, what is your insight?… Keep your own answer to that question." Positions defended: "The best mitigation is the door you don't open… It will cost you a source somebody wanted in. Leaving it out is still the right call" (cost named). "One agent per recurring job, not one company brain" (mechanism: "a fix for one job shifts the answers for the others").
- Narrator: one first-person failure, quoted from an essay: "We built a tool that worked. It was used just a bit… Bad idea, as the need wasn't a daily one." attributed as citation "Antti Tevanlinna, *Failing and Succeeding at the Same Time*". Guide failure on page but framed as a cited source, one slide, light stakes ("Lucky it did not take that long").
- Heavy citation scaffolding (Cutler, Seiden, Christensen, Torres, Hohmann, O'Reilly, Cagan, Bland) — reads as curated canon; the voice recedes behind authorities.
- Narrative seed: "It will read well… Some of those lines will be wrong… Nothing in the digest marks which lines those are." = sets up Day 2 obstacle.

### B · M2
- Turn lived by the student: "The digest agrees with your favourite hypothesis… It is also the moment you are least likely to check" (apt101-the-digest-is-back) → "It found what you asked it to look for… the agreement may come from your question, not from your customers." (apt101-why-it-agreed). Student's own brief caused the failure = real turn, owned by the student, set up on Day 1 ("It looks for what your brief tells it to look for").
- Frame payoff: "A faster feature factory is still a feature factory… Agents amplify the way a team already works. They do not transform it." Ties Day 1 Cutler slide → Day 2.
- Narrator: second first-person essay slide: "I used to think of being wrong as failure… My creations are not me" (attributed "Antti Tevanlinna, *Expect to Be Wrong…*"). About temperament, not a failure with agents; quoted-essay register, no session evidence.
- Stance with mechanism: "'Are you sure?' is another fluent answer… This isn't a bug that gets patched… Later models will fabricate less; they won't stop." "Treat a branch with one name as a question to answer, not a vote to lose." "'The agent got this wrong' costs nobody face."
- Self-doubt of own tool: the digest agent the team built is the thing that misleads; "The instructions are one suspect; your question is another." Training's own method not doubted (no "this check we gave you may fail").
- Some AE101 text ported near-verbatim (agent stops where you stop writing, prohibitions, Deming) — fits audience.

### B · M3
- Frame paid off and broken on the page: "Cheap building helps your rivals too… This is where 'building got cheap, deciding didn't' stops being an edge on its own… What would change this training's mind: agents that start deciding well" (apt101-where-you-go-from-here, slide `where-the-frame-breaks`). 100-rung behaviour for frame.
- Narrative closes the Day 1 bet: "Your Day 1 bet meets five users… For each moment, ask whether your digest said it. Often it could not have." "A slice that comes back no has done its job." Turn = student's own bet and digest, read against five users. Strong, but the turn is the student's, not the training's.
- Narrator: two more essay quotes, both failure-shaped: "We built good things. We failed to share them well." and "I still make mistakes. More than I'd like. The difference is I make them faster now." Guide failure present but always as a short citation block with a byline, never a scene.
- Stance: "A team that writes for its own criteria has rebuilt the feature factory with a dashboard." "An agent's instructions are not the agent… cannot promise 'everyone gets our agent'" (anti-vendor). "Access is easy; absorption is scarce." Doubt on own tool: "A pass is a claim about a check nobody has tested"; "The trust is deserved. The noticing still has to be designed."
- Open ending: "So the question stays open, and it is yours to answer on your own product… put it to the test on Monday." Intended, not a hedge.

## Frame

**A, AE101: 95.** The frame is *agentic engineering is control engineering*: the loop is a controller, checks are position fixes, and trust is earned by measurement. Every module is a case of it, and the training names where the frame decays.
- M3 `lectures/the-loop-half-filled`: "The agent loop is a **closed-loop controller**… Cut the feedback signal (a test, a check, a read) and it drifts. Signal quality is part of the law: a flaky test is a closed loop that still drifts."
- M5 `lectures/what-packaging-is`: "**A check is a position fix**. At a fix the wedge of possible states collapses to a point."
- M2 `lectures/when-a-plan-is-good`: "Push reach past what you can check and you have not delegated more. You are checking less."
- Where it breaks: M4 `lectures/ironies-of-automation`: "The better the automation… the worse you are at the moment you are needed most." M5 `lectures/the-gate-is-a-claim`: "Green is a claim about the check, not a fact about the work." And "Today's right procedure, your gates and workflow… is superseded too."

**B, APT101: 88.** The frame is *building got cheap, deciding didn't*: the outcome craft that budgets rationed now gets its experiments, and the decisions are what stays human. It is stated on Day 1, it carries Day 2 and Day 3, and it is broken on the page. It loses points because a band of canon slides (Mom Test, 1-2-4-All, Houde & Hill, Kniberg, Marquet) read as a product reading list, not as cases of the frame.
- M1 `apt101-building-is-cheap`: "Building got cheap, deciding didn't… Every other step is a decision… None of those got cheaper."
- M2 `apt101-why-it-agreed`: "A faster feature factory is still a feature factory… Agents amplify the way a team already works. They do not transform it."
- M3 `apt101-three-jobs-rewritten`: "Your insight is the choice it leaves you with… That is real strategy work, and it does not get cheaper when building does."
- Where it breaks: M3 `apt101-where-you-go-from-here`: "This is where 'building got cheap, deciding didn't' stops being an edge on its own… What would change this training's mind: agents that start deciding well."

## Narrative

**A: 93.** The engineer meets a steerable machine and runs one loop. They learn to sharpen plans and to compound rules. Then they send a task off un-packaged and it comes back drifted and confidently wrong. They diagnose the failure and re-send the same task, packaged. Then the guide shows that his own session, the one that built this module, failed in the same ways, and the student is handed a loop with no last turn. The turn is lived (M4→M5), and the training's own failure is on the page (M6). M1–M3 still run partly as a sequence of topics.
- M4 `lectures/test-and-learn`: "Session one goes now, un-packaged… Session two goes packaged, after you've read the return."
- M5 `exercises/diagnose-and-resend`: "The task is the same, packaged this time, and the prompt shrank."
- M6 `lectures/story-of-module-6`: "The training teaches this pattern across three modules. The agent I was working with had just finished writing those three modules. It still opened with the un-packaged shape."

**B: 84.** The trio arrives vindicated: the post-it was the craft on a budget. They write a bet that can lose and send a digest agent off overnight. On Day 2 the digest agrees with their favourite hypothesis, and it does so because their own brief asked it to. They rewrite the question, widen the options, and each makes a piece. On Day 3 five real users do things the digest could never have said, and the team carries a proposal to Monday. The turn is real, seeded on Day 1 and lived by the student. It is the student's own failure, though, not the training's, and Day 3 runs flatter after the five-users beat.
- M1 `apt101-it-runs-overnight`: "It looks for what your brief tells it to look for… Some of those lines will be wrong."
- M2 `apt101-the-digest-is-back`: "If it does, it feels like good news. It is also the moment you are least likely to check."
- M2 `apt101-why-it-agreed`: "So the agreement may come from your question, not from your customers."
- M3 `apt101-bet-meets-five-users`: "For each moment, ask whether your digest said it. Often it could not have."

## Point of view

**A: 95.** The guide is Antti, a practitioner who built this module with Claude and logged every drift. He is silent through M1–M5, where the voice lives in aphorisms ("The wizard typing in neat Perl syntax is dead."). Then he arrives in M6 with a full first-person passage of his own failures, dated and counted.
- M6 `lectures/story-of-module-6`: "I am going to tell you how this module got made… What I tried, what drifted, what the rules caught, what the rules missed."
- Same file: "The paraphrase I shipped as a quote… Claude had written a paraphrase and presented it as attribution."
- Same file: "I drifted in every one of the ways this story just walked. I fixed what I caught. The loop caught what I missed." (signed "Antti")
- One cost: the guide shows up in one passage, not as a thread.

**B: 85.** The guide is Antti again, threaded through all three days as dated essay quotes. Four of them are failures or admissions of failure, so the guide's own failure is on the page, which puts B on the top rung in kind. In depth it falls short: each appears as a short citation block with a byline and no scene, no session, no evidence. That is the same register as the Cutler and Torres quotes, so the guide reads as one more source and not as the narrator. The body voice is a clean second person and the "we" is light.
- M1 `apt101-building-is-cheap`: "One of the first things we tried building was a local installer… It got working and it was used just a bit. Bad idea, as the need wasn't a daily one."
- M2 `apt101-why-it-agreed`: "I used to think of being wrong as failure. But being wrong does not diminish you as a person."
- M3 `apt101-from-us-to-the-team`: "We built good things. We failed to share them well."
- M3 `apt101-where-you-go-from-here`: "I still make mistakes. More than I'd like. The difference is I make them faster now."

## Stance

**A: 93.** These are positions a vendor-friendly training would lose a customer over, and each is defended by a mechanism or a scar:
- "Assume about 10% of what it says or does is made up." (M1 `exercises/orient-and-introspect`), backed by the sycophancy mechanism in M1 `the-machine-you-just-met`: "matching you is what scored well in training."
- "A rule in context is not a rule in the output." (M6 `story-of-module-6`), defended by the scar: "four separate violations across four independent LLM instances. The grep pass caught each one."
- "Ask for best practice and that is what answers: a well-read average… today's playbooks are **candidates**… nothing published can run that local test for you." (M5 `what-packaging-is`). This one runs against the training's own interest, because the training is itself a published playbook.
- "The grade is biased by design… same-window self-charity." (M3 `author-test-strategy-skill`). Here the training doubts its own prompt.

**B: 87.** The positions are defended by mechanism, and several cut against the AI-adoption pitch:
- "'Are you sure?' is another fluent answer… This isn't a bug that gets patched in the next release… Later models will fabricate less; they won't stop." (M2 `apt101-fluent-is-not-true`)
- "An agent's instructions are not the agent… a proposal to the wider team cannot promise 'everyone gets our agent'." (M3 `apt101-from-us-to-the-team`). Mechanism: "The work lives in the memory you built up… in every correction you made."
- "The best mitigation is the door you don't open… It will cost you a source somebody wanted in. Leaving it out is still the right call." (M1 `apt101-it-runs-overnight`). The cost is named.
- "A team that writes for its own criteria has rebuilt the feature factory with a dashboard." (M3 `apt101-what-good-means`)
- Against its own interest: "Cheap building helps your rivals too… speed is the entry price." (M3 `apt101-where-you-go-from-here`). This undercuts the training's headline promise.
- What holds B below A: no position is defended by a scar from the guide's own work with agents. The scars are essay quotes about temperament and sharing.

## The pair

**A:** Reads as someone who has been there. It holds ground ("A rule in memory that does not force is worse than no rule") and doubts its own tools ("The gate is a claim too"; the ADR-in-worktree slip that the training's own prompt framing caused).

**B:** Also reads as someone who has been there, more lightly. It holds ground (no company brain, the door you don't open, instructions are not the agent) and doubts its own tools ("A pass is a claim about a check nobody has tested"; "The trust is deserved. The noticing still has to be designed"; Red Queen). The doubt is aimed at the student's agents and at the frame. It is never aimed at a check this training handed them, so it tilts slightly toward a confident guide rather than a scarred one.

## Scores

| factor | A (AE101) | B (APT101) |
|---|---|---|
| Frame | 95 | 88 |
| Narrative | 93 | 84 |
| Point of view | 95 | 85 |
| Stance | 93 | 87 |

## Smallest moves for B

1. Replace one essay-quote slide with a first-person scene in the guide's own voice: a digest or summary agent of his that agreed with his favourite hypothesis, what it cost, and how he caught it. That turns the bylined citation into a narrator with a scar.
2. Let the training's own tool fail on the page: show the M3 criteria check (or the M1 digest brief the training supplied) passing work the authors would have sent back. Then the Day 2 turn is the training's failure as well as the student's.
3. Close each canon slide (Mom Test, 1-2-4-All, Houde & Hill, Kniberg, Marquet) on the frame sentence, by naming what got cheap and which decision did not, so each reads as a case of *building got cheap, deciding didn't* rather than as a reading list.

## Volume

- A (AE101) handbook: about 181 `##` slides (M1 26 · M2 34 · M3 42 · M4 24 · M5 26 · M6 29). Exercises are included, and their phase headings render as slides.
- B (APT101) handbook: about 78 `##` slides (M1 27 · M2 27 · M3 24). All lectures.
