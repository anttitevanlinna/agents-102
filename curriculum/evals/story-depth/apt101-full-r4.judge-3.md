# APT101 full-training storytelling bench — run r4, judge 3

Paired read: A = AE101 (agentic-engineering-101), B = APT101 (agentic-product-teams-101). Student view via `scripts/read-training.js`.

## Running notes

### A · M1 getting-going
- Plants: stance mirrored ("The LLM mirrors your stance… Your stance is the ceiling", painting-the-picture); context is king; self-report is hypothesis ("Assume about 10% of what it says or does is made up", orient-and-introspect); errors stack until a check resets them (the-machine-you-just-met); compound engineering named AFTER the loop ("You just ran that loop… Klaassen calls this compound engineering").
- Earned-after-move pattern visible: exercises then lecture names sycophancy, error cascade, compounding.

### A · M2 plan-mode-done-right
- Complicates the hypothesis/check idea: plan as check before implementation; "Structure is persuasive"; delegation frontier introduced ("Push reach past what you can check and you have not delegated more. You are checking less." when-a-plan-is-good). Compound ladder extends: rules placement, double-loop (how-instructions-grow), "Rules have a ceiling" — frame names its own limit.

### A · M3 earn-the-trust
- Skills: "Don't make general what you don't practice yourself." Self-charity named: "The grade is biased by design… same-window self-charity" (author-test-strategy-skill). ADR-in-worktree beat: "The agent reasoned forward from the conversation, not from the filesystem" (threat-model-with-stride) — pays off M1 "chat is an abstraction". Near-half lecture names laws after the moves: "A name is a handle, not a lesson. Every law coming up is a move already made." Governor: "Name the uncertainty before you move."

### A · M4 run-the-first-experiment
- Un-packaged send-off, deliberately set up to underdeliver. Bainbridge: "Trust and vigilance move in opposite directions." Backpressure named. Turn being set: "send it off plainly and you find out what you can't steer yet."

### A · M5 learn-from-the-test
- The turn: diagnose own failed run, package, re-send. Sea passage: "A check is a position fix". Stance: "what it holds about your next run is a forecast… A prediction is not a measurement." Self-doubt of own tools: "The gate is a claim too… Green is a claim about the check, not a fact about the work." Goodhart, Deming tampering, bitter lesson ("Retire what the next model outgrows").

### A · M6 spot-gaps-build-the-loop
- Narrator with scars, first person (story-of-module-6): "I drifted in every one of the ways this story just walked." "A rule in context is not a rule in the output." Close: "There is no last turn… The kit compounds; the model rotates." Open forward: "nobody has that part figured out yet."

### A · learning-set (Step 1, before opening B)
1. **The agent's account is a hypothesis; a check from outside resets it.** Planted M1 orient-and-introspect "Assume about 10% … is made up"; complicated M1 the-machine-you-just-met (sycophancy machinery), M2 when-a-plan-is-good (plan read as calibration), M3 author-test-strategy-skill (same-window self-charity), M5 the-gate-is-a-claim ("The check you built is itself a claim that wants verifying"); paid off M6 story-of-module-6 ("The loop caught what I missed"). Governor: verify by a check outside the session. Counter-voice: gate decays (Goodhart). Depth 100.
2. **Compounding: each session leaves something the next one uses — and the kit must also shrink.** Planted M1 Big Idea; complicated M2 how-instructions-grow ("Rules have a ceiling"), M3 compound ladder, M6 spot-gaps ("Rules-files have a half-life"); paid off M6 agents-that-build-agents "The kit compounds; the model rotates." Depth 100.
3. **Reach vs calibration (delegation frontier).** Planted M2 when-a-plan-is-good; complicated M3 "The branch is the permission", M4 Bainbridge, M5 the-gate-is-a-claim (frontier redrawn, bitter lesson); paid off M6 "What you can express is how far the agent runs." Depth 80.
4. **Playbooks are candidates; the optimum is local and moves (test → learn → encode).** Planted M4 test-and-learn "Every send-off is an experiment"; complicated M5 what-packaging-is "A prediction is not a measurement", M5 "One session is a sample"; paid off M6 story + close. Depth 80. Forward question explicit (Mollick pre-read: "Mollick does not call the winner. Neither does this training.").
5. **Context is what you load; the window is not the codebase.** Planted M1 the-wizard-move; complicated M1 chat-is-an-abstraction, M3 ADR-in-worktree, M5 context rot, M6 "A rule in context is not a rule in the output". Paid off M6. Depth 100.
- Headline ideas not developed: STRIDE "value is rejection" (M3 only); "Prohibitions stop; taste steers" (M2, once); Dino/Pocock skill-stack figures (M6, unshaped).
- A depth mean ≈ 92.

### B · Day 1 our-product-our-system
- Opens on the student's own failure: "what is the last thing your team built that nobody asked for?" (module Start here). Frame stated in lecture BEFORE any exercise: "Building got cheap, deciding didn't" (apt101-building-is-cheap). Guide's scar #1: installer "used just a bit" (apt101-building-is-cheap). Box passes: "You told Claude different things between the two, and nothing else changed" (apt101-paint-the-product-box). Bet that can lose (apt101-write-the-bet). Door (apt101-what-goes-in). Look-for line + expect line written in own words, expect kept "outside the brief so the run never reads it" (apt101-send-it-off) — the trap for Day 2 is set without being announced.
- "Keep your own answer to that question" (insight) planted, not collected.

### B · Day 2 whats-actually-true
- Turn lived: four lines side by side, then "Ask it the other way round" (apt101-read-the-digest). Named after: "It found what you asked it to look for… The headline came from your question as much as from your customers." (apt101-why-it-agreed). Guide passage: "I wanted to be right… Being wrong does not diminish you." Stance: "That sells less of this training. It is still where to start." (apt101-go-back-to-your-customers). Judge bake-off with "Known limit" (apt101-catch-it-making-things-up). Pre-mortem exercise before lecture. Rules on recurrence, examples of good.
- Weak spot: bake-off seats two people on the side for phases 1–2.

### B · Day 3 learn-faster-than-the-market
- Floor/ceiling, "A pass is a claim about a check nobody has tested", Goodhart → "rebuilt the feature factory with a dashboard" (apt101-what-good-means). Five users: own Day 1 line "held or broke" said aloud (apt101-five-users). Hand over one file → "An agent's instructions are not the agent" (apt101-take-it-to-the-team, apt101-from-us-to-the-team). Frame breaks named: "Cheap building helps your rivals too… What would change this training's mind" (apt101-where-you-go-from-here). Close re-asks Day 1 question of monday.md; "The bet is still open, and the next slice is yours to place."
- "Would you let an agent post your weekly update?" arrives once, in a lecture, no exercise.

## Frame

**A — Agentic engineering is engineering: closed-loop control, verification, compounding.** M2 only makes sense as a check before the build: "A plan is a check before implementation. One correction can redirect every step that follows" (M2, lectures/when-a-plan-is-good). M5 makes the session a navigation problem: "A check is a position fix. At a fix the wedge of possible states collapses to a point" (M5, lectures/what-packaging-is). M3 names the lens outright: "The agent loop is a closed-loop controller… Cut the feedback signal… and it drifts" (M3, lectures/the-loop-half-filled). Where it breaks: "Rules have a ceiling… This training stops short of the full system" (M2, lectures/how-instructions-grow); "Sutton's bitter lesson… Retire what the next model outgrows" (M5, lectures/the-gate-is-a-claim). **94.**

**B — Building got cheap, deciding didn't. With the build no longer rationed, the trio's craft is choosing the outcome, the bet and the no.** Day 1: "Every other step is a decision… None of those got cheaper" (D1, lectures/apt101-building-is-cheap). Day 2 reads the digest through it: "None of it is a choice… Its headline is your own look-for line handed back, not an insight" (D2, lectures/apt101-why-it-agreed). Day 3 turns it into roles: "Your insight is the choice it leaves you with… Which good idea you say no to, out loud" (D3, lectures/apt101-three-jobs-rewritten). The frame names where it breaks, on the page: "This is where 'building got cheap, deciding didn't' stops being an edge on its own… What would change this training's mind: agents that start deciding well" (D3, lectures/apt101-where-you-go-from-here). The cost is that it is announced in two lectures before the first exercise, so Day 1 opens with a thesis rather than a discovery. **92.**

## Narrative

**A.** You fix a trivial bug and learn the agent's account is a hypothesis. You learn to read a plan before trusting it. You send a real task off un-packaged ("send it off plainly and you find out what you can't steer yet", M4, exercises/set-the-markers-send-it-off). Turn: you read your own failed run through three lenses and re-send it packaged ("The un-packaged run was supposed to underdeliver. What came back is data, not blame", M5, exercises/diagnose-and-resend). Then the narrator shows the same loop failing on the training's own making: "The training teaches this pattern across three modules. The agent I was working with had just finished writing those three modules. It still opened with the un-packaged shape" (M6, lectures/story-of-module-6). The turn is the training's own failure. **94.**

**B.** A trio arrives with a product and a feature nobody asked for. On Day 1 it paints a box, writes a bet and, in each person's own words, says what the overnight digest should look for and what they expect it to say. On Day 2 the digest agrees with them, and the turn comes when each person runs it "the other way round" (D2, exercises/apt101-read-the-digest), which leads to "It found what you asked it to look for… The headline came from your question as much as from your customers" (D2, lectures/apt101-why-it-agreed). The pre-mortem and the judge make the trio doubt its own chosen bet. On Day 3, five outsiders break or hold each person's own Day 1 line: "says out loud the line in it the five users touched, and whether it held or broke" (D3, exercises/apt101-five-users). The close re-asks the opening question about the trio's own Monday proposal: "is anything in `team/monday.md` the next thing your team builds that nobody asked for?" (D3, module close). The turn is lived on every seat, and the ending is open as designed. It is the student's failure rather than the training's, though, and the turn lecture hedges its own landing: "If your line already asked for a test, what came back came from the questions your material asked" (D2, apt101-why-it-agreed). **88.**

## Point of view

**A.** A practitioner-narrator speaks in asides throughout, with one full first-person passage carrying the scars. The asides: "Assume about 10% of what it says or does is made up" (M1, exercises/orient-and-introspect) and "Precise prompting is harder than it looks" (M2, exercises/extract-the-task-shaping-rule). The full passage: "Five taste reversals from me on Claude's confident recommendations… I pushed back several times on Claude saying it was 'done'" (M6, story-of-module-6), and "I drifted in every one of the ways this story just walked. I fixed what I caught" (M6, same). The narrator's own failure is on the page. **95.**

**B.** Second-person instruction carries the training, and the maintainer appears as a guide in short, signed slides, never as the hero. The slides:
- "One of the first things we tried building was a local installer… It got working and it was used just a bit" (D1, apt101-building-is-cheap)
- "For most of my working life I wanted to be right… It gave me anxiety, and a feeling of insufficiency" (D2, apt101-why-it-agreed)
- "We built good things. We failed to share them well" (D3, apt101-from-us-to-the-team)
- "I still make mistakes… I make them faster now" (D3, apt101-where-you-go-from-here)

Failure is on the page in three of them. Each is a slide, not a passage, and the Day 2 one stays abstract ("About the future, all was blurry"), with no named bet and no named person who showed him the wrong. The guide's scars are real but thin next to AE101's session log. **86.**

## Stance

**A.** Positions defended by mechanism or scar:
- "what it holds about your next run is a forecast… A prediction is not a measurement" (M5, what-packaging-is), defended by the A/B the student is running.
- "Green is a claim about the check, not a fact about the work" (M5, the-gate-is-a-claim), defended by Goodhart and the three countermoves.
- "A rule in context is not a rule in the output" (M6, story-of-module-6), defended by four banned-word leaks.
- "Three authored skills, and you'd be reinventing STRIDE on a Tuesday" (M3, skills-from-the-frontier).
- "Mollick does not call the winner. Neither does this training" (M4 pre-reads).

A position against its own interest is implicit at most: "This training stops short of the full system" (M2). **92.**

**B.** Positions it could lose a customer over:
- "So a team that does not talk with its customers every week should start there, before agents… That sells less of this training. It is still where to start" (D2, apt101-go-back-to-your-customers). This is explicitly against the training's commercial interest.
- "Agents amplify the way a team already works. They do not transform it" (D2, apt101-why-it-agreed), defended by the digest the student just watched agree with them.
- "'Are you sure?' is another fluent answer" (D2, apt101-fluent-is-not-true), with the next-likely-word mechanism.
- "A team that writes for its own criteria has rebuilt the feature factory with a dashboard" (D3, apt101-what-good-means).
- "An agent's instructions are not the agent" (D3, apt101-from-us-to-the-team), defended by the hand-over-one-file run the trio just did.

"Access is easy; absorption is scarce" (D3) is asserted, not defended. **90.**

## The pair

**A.** Strong stance and strong self-doubt. It doubts its own tools ("The check you built is itself a claim that wants verifying", M5) and its own author ("I caught what the loop missed. You will catch what I missed", M6). It reads as someone who has been there.

**B.** Also both. It doubts its own tools: the judge ships with "a *Known limit:* line… It should describe one kind of claim this judge will let through" (D2, catch-it-making-things-up), and the training asks "If a model stopped making things up on your sources, what would your judge show?" (D2, fluent-is-not-true). It doubts its own frame: "What would change this training's mind" (D3). It holds ground against its own sale ("sells less of this training"). It reads as someone who has been there. The doubt is slightly the louder side, because the guide's scars are short.

## Room

Do B's exercises carry the story? Mostly yes. The turn is produced in exercises and named afterwards.

**Strongest beats**
1. **Read the digest, Phases 1–4** (D2, exercises/apt101-read-the-digest). It sets four lines side by side ("the digest's headline, my expectation, my look-for line, and the hypothesis") and then runs the digest "with only your look-for line turned round". Every seat lives the agreement before apt101-why-it-agreed names it.
2. **Five users, Phase 4** (D3, exercises/apt101-five-users): "each of you reads your own Day 1 hypothesis where Claude quoted it, and says out loud the line in it the five users touched, and whether it held or broke. If none of your lines broke, say what result would have broken it." Each person's own Day 1 doubt is paid off by people outside the room. Runner-up: Hand over one file (D3, take-it-to-the-team Phase 2): "The designer points at the line in the output that went generic". The stance is lived before the lecture states it.

**Weakest beats**
1. **Catch it making things up, Phases 1–2** (D2, exercises/apt101-catch-it-making-things-up). "The team lead runs the benchmark on their laptop"; the other two "ready your real summary… Then join the team lead's screen when the scoreboard lands in phase 3." For two seats, the turn (your intuitive check loses to a measured one) is watched, not lived. The scoreboard is a technical reveal with no prediction staked against it.
2. **Write what good means, Phase 2** (D3, exercises/apt101-write-what-good-means): "Then ask Claude to run the loop… The main session rewrites `./generation-tactic.md` between rounds. The judge never moves." The Goodhart turn ("Your criteria become a target") is told in the lecture that follows. The exercise holds the judge fixed by design, so the student never sees a score rise while the work stays thin. Instead they read a summary of whether it did ("If the score dropped and the digest still reads thin…"). Runner-up: the Day 1 "Capture the look" phase (apt101-send-it-off Phase 3) is styling work with no story job.

## Depth

### A (learning-set written before opening B; see running notes)
| Learning | Planted | Complicated | Paid off | Depth |
|---|---|---|---|---|
| The account is a hypothesis; an outside check resets it | M1 orient-and-introspect "Assume about 10%… is made up" | M1 the-machine-you-just-met (sycophancy); M2 when-a-plan-is-good; M3 author-test-strategy-skill "same-window self-charity"; M5 the-gate-is-a-claim "The check you built is itself a claim" | M6 story-of-module-6 "The loop caught what I missed" | 100 |
| Compounding, and the kit must also shrink | M1 Big Idea "leave something behind that the next one can use" | M2 how-instructions-grow "Rules have a ceiling"; M3 compound ladder; M6 spot-gaps "Rules-files have a half-life" | M6 agents-that-build-agents "The kit compounds; the model rotates" | 100 |
| Context is what you load; the window is not the codebase | M1 the-wizard-move | M1 chat-is-an-abstraction; M3 threat-model-with-stride "reasoned forward from the conversation, not from the filesystem"; M5 context rot | M6 "A rule in context is not a rule in the output" | 100 |
| Reach vs calibration | M2 when-a-plan-is-good "You are checking less" | M3 "The branch is the permission"; M4 ironies-of-automation; M5 the-gate-is-a-claim delegation frontier | M6 "What you can express is how far the agent runs" | 80 |
| Playbooks are candidates; the optimum is local and moves | M4 test-and-learn "Every send-off is an experiment" | M5 what-packaging-is "A prediction is not a measurement"; M5 "One session is a sample" | M6 "nobody has that part figured out yet" | 80 |

Mean **92**. Not developed: "Prohibitions stop; taste steers" (M2); "STRIDE's value is rejection" (M3); Dino and Pocock skill-stack figures (M6).

### B
| Learning | Planted | Complicated | Paid off | Depth |
|---|---|---|---|---|
| 1. Building got cheap, deciding (insight) didn't | D1 apt101-building-is-cheap "what is your insight?… Keep your own answer" | D2 apt101-why-it-agreed "It analysed everything and still had no insight"; D2 "A faster feature factory is still a feature factory"; D3 apt101-three-jobs-rewritten "Your insight is the strategy"; D3 "Cheap building helps your rivals too" | D3 where-you-go-from-here "What will your insight be?" + close re-asks the Day 1 nobody-asked-for question | 100 |
| 2. The agent finds what you asked it to look for | D1 apt101-paint-the-product-box "You told Claude different things… nothing else changed"; D1 send-it-off look-for + expect lines | D2 read-the-digest reversed rerun; D2 why-it-agreed "your question is another [suspect]"; D2 keep-and-run-tonight "look as hard for what argues against it" | D3 five-users "whether the digest said it, could have said it, or could not have"; close reads `team/caught.md` | 90 |
| 3. A bet is only a test if its signal can say no | D1 apt101-write-the-bet "A signal that can only say yes is not a test" | D2 why-it-agreed "Being wrong does not diminish you"; D2 imagine-it-failed "Confidence peaks just after the team chooses"; D3 slice-by-learning "first slice tests what you are least sure of" | D3 bet-meets-five-users "A slice that comes back no has done its job"; close "The bet is still open" | 100 |
| 4. Fluent is not true, and the check is a claim too | D1 apt101-only-what-you-tell-it "On your own product, you are the check" | D2 catch-it-making-things-up "Known limit"; D2 fluent-is-not-true "'Are you sure?' is another fluent answer"; D3 what-good-means "A pass is a claim"; Goodhart | D3 three-jobs-rewritten "The more you trust it, the less you notice"; close "one piece of work you would let an agent do on its own, and one you would not" | 90 |
| 5. The door: what goes in is decided before material, and by whoever lives with it | D1 apt101-what-goes-in "The door comes before the material" | D2 read-the-digest "which files it read (and any… outside what your team agreed)"; D2 gather-the-evidence skipped list "whether it would have changed the outcome" | D3 take-it-to-the-team Phase 6 "On Monday it is the first thing your wider team decides for itself" | 80 |
| 6. What only you hold: generic vs yours, and why an agent can't be handed over | D1 paint-the-product-box cold read "the line a competitor could paste"; D1 your-material-is-the-moat | D2 widen-before-you-choose "The branch one of you found is often worth most"; D3 take-it-to-the-team hand-over "the line in the output that went generic" | D3 from-us-to-the-team "An agent's instructions are not the agent… a name on every part" | 80 |

Mean **90**. Carry share: 100 / 540 ≈ 0.19. The training spreads its weight evenly; it does not lean on one spine.

**Progression (cumulative depth rung after D1 · D2 · D3)**
| Learning | D1 | D2 | D3 |
|---|---|---|---|
| 1. Deciding didn't get cheap | 20 | 60 | 100 |
| 2. Finds what you asked for | 40 | 80 | 90 |
| 3. Signal that can say no | 40 | 80 | 100 |
| 4. Fluent ≠ true / check is a claim | 20 | 60 | 90 |
| 5. The door | 40 | 60 | 80 |
| 6. Only-yours / can't hand over | 40 | 60 | 80 |

No learning jumps only at the close. Day 2 carries most of the development.

**Headline ideas, not developed (B):**
- "Would you let an agent post your weekly update?" / one level up (D3, three-jobs-rewritten): appears once, no exercise.
- "Access is easy; absorption is scarce" (D3, from-us-to-the-team).
- 1-2-4-All (D2, widen-before-you-choose).
- Houde & Hill's three prototype questions (D2, each-of-you-makes-something): used once in make-your-piece, then gone.
- Marquet's "push it down to the people with the information" (D2).
- "Sharpen the insights, never the sources" (D1, your-material-is-the-moat).
- "Keep your own answer to that question" (D1) is planted but never collected from the student.

## Scores

| factor | A | B |
|---|---|---|
| Frame | 94 | 92 |
| Narrative | 94 | 88 |
| Point of view | 95 | 86 |
| Stance | 92 | 90 |
| Depth | 92 | 90 |

## Smallest moves for B

1. In the `our-product-our-system` module file, move the two framing lectures (apt101-building-rationed-it, apt101-building-is-cheap) to after Paint the product box, so "Building got cheap, deciding didn't" names the five boxes the trio just painted instead of announcing the thesis before any move.
2. In apt101-catch-it-making-things-up, have each of the three write which of the four checks they expect to win, and why, before the scorer runs, and read it beside the scoreboard. The two seats waiting then lose a bet of their own instead of watching the team lead's.
3. In apt101-write-what-good-means Phase 2, have each person mark the round where the judge's score rose but their own ceiling line still fails, so the Goodhart turn is seen on screen before the "Your criteria become a target" slide names it.
4. Collect Day 1's "Keep your own answer to that question" as a one-line `team/<name>/insight.md`, and read it back in Day 3's "Say it to each other" next to that person's answer to "which customer, which bet, which no".
5. Give the guide one concrete scar where the frame breaks (apt101-where-you-go-from-here): a first-person line on this training's own trial, where the designed turn landed on one seat of three. That puts the training's own failure on the page, as AE101's story-of-module-6 does.
