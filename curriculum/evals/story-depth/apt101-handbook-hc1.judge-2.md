# APT101 handbook hc1 — storytelling judge 2 (paired: AE101 = A, APT101 = B)

## Running notes

### A · M1 (painting-the-picture, the-wizard-move, orient-and-introspect, fix-tests-first, compound-and-close, the-machine-you-just-met)
- Frame seeded: "The LLM mirrors your stance" / "Your stance is the ceiling" (painting-the-picture). Two frontiers named: "can that setup learn faster than you can write things down?" / "does it learn the right things".
- Engineering lens: "Errors stack until a check resets them", "A check from outside the session resets the chain" (the-machine-you-just-met) — feedback control as engineering. Compound engineering named via Klaassen.
- Stance: "The wizard typing in neat Perl syntax is dead." "The report is a hypothesis to check, not ground truth." "Assume about 10% of what it says or does is made up." "its agreement settles nothing".
- POV: second person instruction; narrator in asides ("Everyone sees how this will bloat almost immediately"). No first-person scar yet.
- Narrative: student ships a bug fix, rules file; "This file is a starter... bloat" plants the next obstacle.

### A · M2 (the-whole-map, when-a-plan-is-good, push-back-on-the-plan, extract-the-task-shaping-rule, where-the-rule-could-live, how-instructions-grow)
- Frame load-bearing: the six-phase map ("The phases are places, not a pipeline"); "What you can test and check sets your complexity ceiling"; "Push reach past what you can check and you have not delegated more. You are checking less." — control/verification lens.
- Stance defended by mechanism: "A plan without assumptions isn't assumption-free; it's just assumption-silent." "Structure is persuasive." "*Run the tests* is cosmetic". "Prohibitions stop; taste steers".
- Self-limit: "This training stops short of the full system" (how-instructions-grow). "Rules have a ceiling... The cure is not better rules".
- POV still second person; asides ("Precise prompting is harder than it looks"). Argyris double-loop as cited voice.
- Narrative: rules file grows → ceiling obstacle planted.

### A · M3 (open-the-side-quest, skills-from-the-frontier, map-the-access-surface, threat-model-with-stride, author-test-strategy-skill, the-loop-half-filled)
- Frame explicit: "The agent loop is a **closed-loop controller**... Cut the feedback signal... and it drifts" (the-loop-half-filled). "Control is interrogation." "The branch is the permission".
- Narrative turn planted: "The far half goes quiet... how do you trust work you didn't watch?" — stakes rise.
- Stance: "STRIDE without an access-surface map is pub-quiz threat modeling." "Authoring without invocation is theatre." "Don't make general what you don't practice yourself." "Your codebase is not a pyramid." "same-window self-charity".
- POV: still instructional second person; "A name is a handle, not a lesson" — guide in lines. Agent-misplaces-ADR anecdote is about the agent, not narrator.

### A · M4 (the-far-half, the-agent-loop, test-and-learn, walk-and-send-off, what-keeps-..., ironies-of-automation, reading-the-return)
- Narrative turn engineered: "Session one goes now, un-packaged... Session two goes packaged, after you've read the return" (test-and-learn). Failure is the student's own, designed in. "You're new to this country. A tourist runs an agent and hopes".
- Frame: Bainbridge 1983 "This is a 1983 argument, not an AI take"; backpressure; "Trust and vigilance move in opposite directions" — engineering lens from other fields.
- Stance: "The closing summary is not the artefact. The machine would rather produce something than admit nothing". "When your agent stops for missing information... Usually there was."
- POV: still guide-in-lines; no first-person scar yet.

### A · M5 (hooks-always-fire, diagnose-and-resend, what-packaging-is, the-gate-is-a-claim)
- Turn lived: "The un-packaged run was supposed to underdeliver. What came back is data, not blame." / "The task is the same, packaged this time, and the prompt shrank." Sea passage: "An unchecked session arrives confident, and wrong... The success report comes from the wrong harbor."
- Frame names where it breaks / self-applied: "The gate is a claim too... A gate nobody has verified is a gate trusted on vibes." Goodhart; Deming tampering; Sutton bitter lesson "Today's right procedure... is superseded too. Retire what the next model outgrows" — frame turned on its own tools.
- Stance against field/vendor: "The model has read the field... what it holds about your next run is a forecast." "**A prediction is not a measurement.**" "today's playbooks are **candidates**" — includes the training's own playbook implicitly.
- POV: still no first-person narrator in M1–M5.

### A · M6 (the-2-frontiers, spot-gaps-build-the-loop, composing-the-workflow, read-your-stack, the-handoff-prompt, story-of-module-6, agents-that-build-agents)
- POV peaks: story-of-module-6 first person, signed "Antti": "I drifted in every one of the ways this story just walked. I fixed what I caught. The loop caught what I missed." Guide's own failure on page ("The paraphrase I shipped as a quote", "The three-phrase closer I didn't catch").
- Stance + scar: "A rule in context is not a rule in the output." "A rule in memory that does not force is worse than no rule." The training's own rules leaked — position held against own interest (the method's author fails the method).
- Turn closes: "You drew a control loop" (composing-the-workflow); diff of two sessions ("two sessions are enough to place every lesson"). "Rules-files have a half-life."
- Open ending: "There is no last turn... The kit compounds; the model rotates. The training closes." "nobody has that part figured out yet."
- Composing: "The field wires kits more ways than one; no way has won." Some M6 slides figure-only (Dino, Pocock) — thin as prose.

=== AE101 read complete. Starting APT101. ===

### B · M1 (building-rationed-it, building-is-cheap, work-backwards, only-what-you-tell-it, write-the-bet, your-material-is-the-moat, it-runs-overnight)
- Frame stated early and strongly: "You knew the craft; building rationed it" / "The post-it was the craft on a budget" / "Building got cheap, deciding didn't" / "the outcome craft finally gets the experiments it always asked for." One lens: outcome craft vindicated now that the slice is cheap. Five-step loop Outcome→Opportunities→Bet→Slice→Signal as the map.
- Stance: "A signal that can only say yes is not a test." "Generic AI is everyone's; your material is yours." "One agent per recurring job, not one company brain." "The best mitigation is the door you don't open... It will cost you a source somebody wanted in." Mostly asserted with citation (Cutler, Seiden, Cagan, Bland, Torres) — borrowed authority, few mechanisms of its own.
- POV: one first-person scar: "We built a tool that worked. It was used just a bit... (Lucky it did not take that long to build it.)" signed Antti Tevanlinna 2025-12-05 — guide's own failure on page, but small and quoted as a citation block, not a narrated passage.
- Narrative: setup = Friday tree / Monday roadmap (the pre-agent wound, student-recognisable); stance question planted ("what is your insight?"); overnight digest sent off with "Some of those lines will be wrong" — obstacle planted.
- Heavy citation density; each slide a definitional card. Reads more like an excellent briefing than a story so far.

### B · M2 (digest-is-back, why-it-agreed, go-back-to-your-customers, widen-before-you-choose, safe-to-say-its-wrong, fluent-is-not-true, each-of-you-makes-something, write-it-down-or-lose-it)
- Turn exists and is designed: "The digest agrees with your favourite hypothesis... It feels like good news. It is also the moment you are least likely to check" → "It found what you asked it to look for" → "So the agreement may come from your question, not from your customers." That is the student's own failure (their brief), lived. Strong.
- Frame reinforced: "It analysed everything and still had no insight"; "A faster feature factory is still a feature factory. Agents amplify the way a team already works. They do not transform it." Loops back to M1 Cutler.
- POV: second first-person passage, "I used to think of being wrong as failure... My creations are not me" (Antti, 2025-05-09) — a confession of a disposition, not a scarred incident on this training's work. Bridge line ties it to the digest.
- Stance: "The most dangerous thing an agent writes in product work is not a wrong number. It is a quote". "'Are you sure?' is another fluent answer." "This isn't a bug that gets patched... Later models will fabricate less; they won't stop." "Agents get checked, people don't get watched."
- Citation load still heavy (Torres, Fitzpatrick, Design Council, Liberating Structures, Edmondson, Houde&Hill, Osterwalder, Bland, Marquet, Klein, Deming) — several slides are method-summaries with an agent clause bolted on (1-2-4-All, pre-mortem has no agent tie at all).
- AE101 reuse visible: "The agent stops where you stop writing" ≈ AE101 agents-that-build-agents; "A list of don'ts" ≈ "Prohibitions stop; taste steers"; Deming tampering verbatim structure.

### B · M3 (slice-by-learning, what-good-means, bet-meets-five-users, three-jobs-rewritten, from-us-to-the-team, where-you-go-from-here)
- Resolution of the turn: "Hold the overnight digest that agreed with your favourite hypothesis against those lines" (what-good-means); "What your five users did that the digest never said"; "A slice that comes back no has done its job."
- Frame names where it breaks: "This is where 'building got cheap, deciding didn't' stops being an edge on its own... What would change this training's mind: agents that start deciding well" (where-you-go-from-here). "A team that writes for its own criteria has rebuilt the feature factory with a dashboard."
- POV: two more Antti blocks: "We built good things. We failed to share them well." and "I still make mistakes. I make them faster now." — guide's failure on page, but as essay-epigraphs with bylines, generic, not an incident in the training's own subject.
- Stance: "An agent's instructions are not the agent" (against share-the-agent); "Access is easy; absorption is scarce"; "Cheap building helps your rivals too"; open ending on the stance question, "put it to the test on Monday" — forward-pointing, not a hedge.
- AE101 transplants: Goodhart, Husain 90%, overreliance "when did you last do this kind of work by hand?" verbatim.

=== Both reads complete. Scores below written after both. ===

## Frame

**A (AE101): agentic engineering is engineering — a closed control loop whose quality is set by the checks you build and the context you write, compounding across sessions.**
- M1 the-machine-you-just-met: "Errors stack until a check resets them" · "A check from outside the session resets the chain."
- M3 the-loop-half-filled: "The agent loop is a **closed-loop controller**... Cut the feedback signal... and it drifts. Signal quality is part of the law: a flaky test is a closed loop that still drifts."
- M5 what-packaging-is: "**A check is a position fix**. At a fix the wedge of possible states collapses to a point."
- Where it breaks, M5 the-gate-is-a-claim: "Green is a claim about the check, not a fact about the work." · "Sutton's **bitter lesson**... Today's right procedure, your gates and workflow... is superseded too." M6 agents-that-build-agents: "nobody has that part figured out yet."
M2's plan read ("Push reach past what you can check and you have not delegated more. You are checking less.") and M4's Bainbridge ("This is a 1983 argument, not an AI take") only make sense through the lens. Every module reads through it; the frame turns its own instruments into suspects. Score 93.

**B (APT101): the outcome craft was always right, building rationed it; now building is cheap and deciding is the whole job — and agents amplify whichever team you already are.**
- M1 apt101-building-rationed-it: "The post-it was not naive. It was what the craft shrank to when building was expensive."
- M1 apt101-building-is-cheap: "For years the slice was the slow step. Now an agent can build it... None of those got cheaper."
- M2 apt101-why-it-agreed: "A faster feature factory is still a feature factory... Agents amplify the way a team already works. They do not transform it."
- M3 apt101-three-jobs-rewritten: "When building took most of a team's weeks, leading meant rationing that capacity... When building is cheap, that rationing matters less."
- Where it breaks, M3 apt101-where-you-go-from-here: "This is where 'building got cheap, deciding didn't' stops being an edge on its own... What would change this training's mind: agents that start deciding well."
A genuine, ownable frame, and it reaches the 100-anchor clause (names where it breaks). Pulled down by slides that are method cards the frame never touches: M2 "Imagine it already failed" (Klein pre-mortem, no agent or cheap-build link at all), "Hear every idea before anything gets averaged" (1-2-4-All mechanics), M3 "Test with five users" (Nielsen), "Clear outcomes, free hands" (Kniberg). Not every module-slide reads through it. Score 85.

## Narrative

**A.** An engineer meets a mirror that agrees with them; they learn to aim it (plan read, rules file, skills) and the rules file starts to bloat. Then the work goes long and quiet: they send a task off un-packaged and it comes back confident and wrong. The turn: they diagnose their own failed run and re-send it packaged — "The un-packaged run was supposed to underdeliver. What came back is data, not blame" (M5 diagnose-and-resend); "The task is the same, packaged this time, and the prompt shrank." Then the check itself becomes suspect ("The gate is a claim too", M5) and the training's own making is shown failing: "Turn one. Claude opened the session with a plan... It still opened with the un-packaged shape" (M6 story-of-module-6). It closes open: "There is no last turn" (M6 agents-that-build-agents). A turn the student lives, plus the training's own failure as coda. Score 92.

**B.** A product trio who always knew the craft watched building ration it — "An opportunity tree on Friday, a feature roadmap on Monday" (M1 apt101-building-rationed-it). Building gets cheap; they write a bet and send an overnight digest off. The turn: "The overnight digest is back, and its headline is the hunch your team liked most... It is also the moment you are least likely to check" (M2 apt101-the-digest-is-back) → "So the agreement may come from your question, not from your customers" (M2 apt101-why-it-agreed). They write what good means, put the bet in front of five users, accept "A slice that comes back no has done its job" (M3 apt101-bet-meets-five-users), and take a proposal, not a decision, to the team on Monday. A real plot with a turn that is the students' own doing (their brief caused the agreement). But in the handbook the turn is narrated as a scenario ("Say one hesitates at a step...") rather than lived, and the training's own failure never carries it. Between plot points the citation cards (Design Council, 1-2-4-All, Edmondson, Houde & Hill, Test Card, Marquet, Klein) stall the movement. Score 80.

## Point of view

**A.** A guide in second person through M1–M5, showing in lines: "Everyone sees how this will bloat almost immediately" (M1 compound-and-close); "Precise prompting is harder than it looks" (M2 extract-the-task-shaping-rule); "You're new to this country. A tourist runs an agent and hopes" (M4 test-and-learn). In M6 the guide steps out by name and with scars: "Five taste reversals from me on Claude's confident recommendations" · "The paraphrase I shipped as a quote" · "I drifted in every one of the ways this story just walked. I fixed what I caught. The loop caught what I missed." (story-of-module-6, signed Antti). The guide's own failure is on the page, at length, on the training's own subject. Score 95.

**B.** An impersonal second-person instructor, plus a first-person guide in four bylined blocks:
- "One of the first things we tried building was a local installer... it was used just a bit... (Lucky it did not take that long to build it.)" (M1 apt101-building-is-cheap)
- "I used to think of being wrong as failure... My creations are not me" (M2 apt101-why-it-agreed)
- "We built good things. We failed to share them well." (M3 apt101-from-us-to-the-team)
- "I still make mistakes. More than I'd like. The difference is I make them faster now" (M3 apt101-where-you-go-from-here)
The guide's own failure is on the page (top-rung trigger), and each block gets a bridge line back to the student. But the blocks are epigraphs, not a narrator: dated essay quotes set apart like the Torres and Cutler citations around them, and their failures are generic (a low-use tool, sharing is hard) rather than a scar from deciding with agents on a product. The dominant voices on the page are the borrowed authorities. Score 84.

## Stance

**A.**
- "The model has read the field and gives you a forecast" — defended by mechanism: "a well-read average of what other people published about other repos, frozen at a cutoff... **A prediction is not a measurement.**" (M5 what-packaging-is)
- "A rule in context is not a rule in the output" — defended by scar: "Same rule, same rules file, same task, four separate violations across four independent LLM instances." (M6 story-of-module-6)
- "STRIDE without an access-surface map is pub-quiz threat modeling" / "Your codebase is not a pyramid" (M3 map-the-access-surface, author-test-strategy-skill), defended by the delta move.
- Against own interest: "today's playbooks are **candidates**" (M5), which includes the training's own kit; "A rule in memory that does not force is worse than no rule" (M6); "This training stops short of the full system" (M2 how-instructions-grow).
Score 92.

**B.**
- "A faster feature factory is still a feature factory... Agents amplify the way a team already works. They do not transform it." (M2 apt101-why-it-agreed) — anti-transformation-pitch; defended by mechanism ("still never finds out").
- "'Are you sure?' is another fluent answer... Later models will fabricate less; they won't stop." (M2 apt101-fluent-is-not-true) — defended by mechanism ("the next likely word. Not the next true word").
- "An agent's instructions are not the agent" (M3 apt101-from-us-to-the-team) — against the share-the-agent pitch; defended by mechanism ("The work lives in the memory you built up... still on your laptop and in your head").
- "One agent per recurring job, not one company brain" and "The best mitigation is the door you don't open... It will cost you a source somebody wanted in" (M1 apt101-it-runs-overnight) — asserted, not defended.
- Against own interest: "What would change this training's mind: agents that start deciding well" and "Cheap building helps your rivals too" (M3 apt101-where-you-go-from-here) — the thesis carries its own expiry date.
Several positions are carried by citation rather than by the training's own mechanism or scar (Torres, Cagan, Seiden doing the arguing). Score 82.

## The pair

**A.** Doubt and ground together: "Green is a claim about the check" and "Retire what the next model outgrows" sit beside "A rule in context is not a rule in the output" and "Push reach past what you can check... You are checking less." Reads as someone who has been there.

**B.** Both are present. Doubt: "What would change this training's mind", "I still make mistakes"; ground: "A faster feature factory is still a feature factory", "An agent's instructions are not the agent". Reads as someone who has been there, but the been-there is told through epigraphs and authorities rather than through incidents. Closer to a well-read guide than a scarred one; neither hedge nor pitch.

## Scores

| factor | A (AE101) | B (APT101) |
|---|---|---|
| Frame | 93 | 85 |
| Narrative | 92 | 80 |
| Point of view | 95 | 84 |
| Stance | 92 | 82 |

## Smallest moves for B

1. Rewrite "The digest agrees with your favourite hypothesis" as the guide's own first-person incident (a real digest or summary that confirmed our hunch, what we built on it, what it cost), so the turn becomes the training's own failure and the narrator gets a scar on this training's subject.
2. Cut the method cards the frame never touches (pre-mortem, 1-2-4-All mechanics, Nielsen's five, Kniberg's quadrant), or give each one sentence on what cheap building or agents change about it, so every slide reads through "building got cheap, deciding didn't".
3. Defend "one agent per recurring job, not one company brain" and "the door you don't open" with a mechanism or scar of the training's own (what broke when it was tried the other way) instead of leaving them as assertions.

## Volume

- A (AE101): about 181 `##` sections across the 36 handbook files; about 89 of those in the lectures and the rest in exercise phase headings.
- B (APT101): about 78 `##` slides across 21 lectures (the handbook is lectures only).
