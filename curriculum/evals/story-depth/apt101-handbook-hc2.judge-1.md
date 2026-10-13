# APT101 handbook hc2 — storytelling judge 1

Paired read: A = AE101 (engineers), B = APT101 (product trio). Read via `node scripts/read-curriculum.js`, maintainer tails and backing blocks skipped.

## Running notes

### A · M1
- Opens with stance: "The LLM mirrors your stance... Your stance is the ceiling." (painting-the-picture). Frame seed: two frontiers, "how fast, and the right things".
- Student = hero: brings own bug, ships PR, writes CLAUDE.local.md. Guide voice mostly second person; narrator appears in lines ("Assume about 10% of what it says or does is made up. Could be more or less than this heuristic suggests.").
- Mechanism-backed stance: sycophancy as preference tuning (the-machine-you-just-met: "matching you is what scored well in training"); error cascade, "The numbers are an illustration, not a measurement".
- Recognition before naming: "You just ran the same loop" then Klaassen names compound engineering.

### A · M2
- Map (six phases) + plan review as calibration: "Push reach past what you can check and you have not delegated more. You are checking less." (when-a-plan-is-good). Engineering-as-control frame strong.
- Self-challenge on own prompt: "This prompt is fair to read as replacing the file... Precise prompting is harder than it looks." (extract-the-task-shaping-rule).
- Training names its limits: "This training stops short of the full system" (how-instructions-grow). Stance: "The cure is not better rules; it is where the rules live." "Prohibitions are weak instructions".

### A · M3
- Frame made explicit at close: "The agent loop is a **closed-loop controller**... a flaky test is a closed loop that still drifts." (the-loop-half-filled). "Control is interrogation." "The branch is the permission."
- Stance with mechanism: "Don't make general what you don't practice yourself." (skills-from-the-frontier); "STRIDE's value is rejection, not enumeration."
- Self-doubt on own check: "The grade is biased by design... same-window self-charity." (author-test-strategy-skill). Agent wrong-dir story: "The agent reasoned forward from the conversation, not from the filesystem." (threat-model-with-stride).
- Plot seed: "how do you trust work you didn't watch?" — near half → far half turn set up.

### A · M4
- The turn is set: "Session one goes now, un-packaged... Session two goes packaged, after you've read the return." (test-and-learn). Failure is designed in: the student's send-off is meant to come back wrong.
- Bainbridge as frame instance, not decoration: "the better the automation... the worse you are at the moment you are needed most" (ironies-of-automation); "The trust is deserved. The watching still has to be engineered."
- Stance: "The closing summary is not the artefact. The machine would rather produce something than admit nothing" (reading-the-return). "A tourist runs an agent and hopes; a practitioner runs a test and reads the data."

### A · M5
- Turn lands: "The un-packaged run was supposed to underdeliver. What came back is data, not blame." (diagnose-and-resend) → "The task is the same, packaged this time, and the prompt shrank."
- Sea passage: "An unchecked session arrives confident, and wrong... The success report comes from the wrong harbor." (what-packaging-is). Frame holds: "A check is a position fix".
- Stance defended: "The model has read the field... what it holds about your next run is a forecast." "A prediction is not a measurement." Training doubts its own tool: "The gate is a claim too... A gate nobody has verified is a gate trusted on vibes." Goodhart. Deming tampering. Bitter lesson: "Today's right procedure... is superseded too" — frame naming where it breaks.

### A · M6
- Diff of two sessions closes the plot: "Expect over-credit on the packaging. A fair push-back is 'name one thing the verifier missed, concretely.'" (spot-gaps-build-the-loop). "Rules-files have a half-life."
- POV top rung: story-of-module-6, first-person Antti, the training's own making fails: "It still opened with the un-packaged shape." "I drifted in every one of the ways this story just walked." Narrator failure on the page, plus training-against-itself ("The agent I was working with had just finished writing those three modules").
- Stance: "A rule in context is not a rule in the output." "A rule in memory that does not force is worse than no rule."
- Open ending forward: "There is no last turn... The kit compounds; the model rotates." "nobody has that part figured out yet." Weaker spot: agents-that-build-agents bullets ("Competence sets the ceiling... Share and learn together") are slogan-register.
- AE101 slide count (## in dump): M1 26 · M2 34 · M3 42 · M4 24 · M5 26 · M6 29 ≈ 181.

### B · M1
- Frame stated early and cleanly: "Building got cheap, deciding didn't" (apt101-building-is-cheap); craft vindicated: "The post-it was not naive. It was what the craft shrank to when building was expensive." (apt101-building-rationed-it). Frame = outcome craft finally gets its experiments; agents make the slice cheap, every decision stays human.
- Stance thread named: "When agents analyse wider, deeper and faster, what is your insight?... It decides what the three of you are for." Positions: "Generic AI is everyone's; your material is yours"; "One agent per recurring job, not one company brain"; "The best mitigation is the door you don't open... It will cost you a source somebody wanted in."
- First-person guide surfaces once: "One of the first things we tried building was a local installer... It got working and it was used just a bit." (apt101-building-is-cheap) — a real scar, small, quoted from an essay with byline, not narrated in the room voice.
- Heavy on cited authorities (Cutler, Seiden, Christensen, Torres, Hohmann, O'Reilly, Cagan, Bland) — reads partly as a well-curated product-craft reader; student-as-hero via "your customers", "the three of you".
- Narrative seed: overnight digest "Some of those lines will be wrong... Finding them is the team's job" (apt101-it-runs-overnight) — set-up of the failure to come.

### B · M2
- The turn: the digest agrees with the team's own bet, and the cause is the team's own brief: "Does it name your hypothesis, as something to find evidence for? If it does, the agent did as asked... the agreement may come from your question, not from your customers." (apt101-why-it-agreed). Lived by the student's own artefact; strongest storytelling beat in B.
- Stance with mechanism: "Agents amplify the way a team already works. They do not transform it... A faster feature factory is still a feature factory." "'Are you sure?' is another fluent answer... Later models will fabricate less; they won't stop." (apt101-fluent-is-not-true). "The most dangerous thing an agent writes in product work is not a wrong number. It is a quote".
- Guide voice second time, first person, quoted essay: "I used to think of being wrong as failure... My creations are not me" (apt101-why-it-agreed) — vulnerability, but about design generally, not an agentic failure in this work.
- Frame re-fires: "Making got cheap. Knowing what good looks like did not." (apt101-each-of-you-makes-something). Three trio pieces map roles — student-as-hero per seat.
- Some carried-over AE101 lines (the-agent-stops-where-you-stop-writing, prohibitions, Deming tampering) translated well to product register.
- Still citation-dense: Torres, Fitzpatrick, Design Council, Liberating Structures, Edmondson, Houde & Hill, Osterwalder, Bland, Marquet, Klein, Deming.

### B · M3
- Turn pays off: "Put three things side by side: your bet... your digest; and what each of your five users did" (apt101-bet-meets-five-users); "A slice that comes back no has done its job."
- Self-challenge on own checks: "A pass is a claim about a check nobody has tested"; "A team that writes for its own criteria has rebuilt the feature factory with a dashboard." (apt101-what-good-means). Bainbridge carried over: "The trust is deserved. The noticing still has to be designed." (apt101-three-jobs-rewritten).
- Frame names where it breaks, explicitly: "Cheap building helps your rivals too... This is where 'building got cheap, deciding didn't' stops being an edge on its own... What would change this training's mind: agents that start deciding well" (apt101-where-you-go-from-here).
- Guide scars: "We built good things. We failed to share them well." (apt101-from-us-to-the-team); "I still make mistakes... I make them faster now." Anti-pitch stance: "An agent's instructions are not the agent... a proposal to the wider team cannot promise 'everyone gets our agent'."
- Open ending forward and handed to the student: "Which insight do the three of you hold that no analysis gave you? Write it where your team will see it, and put it to the test on Monday."
- APT101 slide count: M1 27 · M2 27 · M3 24 = 78.

## Frame

**A · AE101.** Frame in one sentence: *agentic engineering is engineering, where the agent is a closed-loop controller and you engineer the feedback signal, the checks and what compounds.* It is load-bearing in every module, and the training names where it breaks.
- M3 · the-loop-half-filled: "The agent loop is a **closed-loop controller**... Cut the feedback signal (a test, a check, a read) and it drifts. Signal quality is part of the law: a flaky test is a closed loop that still drifts."
- M4 · ironies-of-automation: "This is a 1983 argument, not an AI take... The trust is deserved. The watching still has to be engineered." Bainbridge here is the lens doing its work, not decoration.
- M5 · what-packaging-is: "**A check is a position fix**. At a fix the wedge of possible states collapses to a point."
- Where it breaks, M5 · the-gate-is-a-claim: "Sutton's **bitter lesson**... Today's right procedure, your gates and workflow, yours or the agent's, is superseded too." M6 · agents-that-build-agents: "The goal is giving the system the right information, and nobody has that part figured out yet."
Every module reads through the frame, and the frame names its own limits. The one soft spot: M2 · the-whole-map, which is a taxonomy before it becomes a lens. **95.**

**B · APT101.** Frame in one sentence: *building got cheap and deciding didn't, so the outcome craft finally gets its experiments, and the trio's insight becomes the scarce part.* It is stated early, re-fired in every module, and broken on purpose at the close.
- M1 · apt101-building-is-cheap: "Agents make the slow step cheap. The hard steps stay where they were... None of those got cheaper."
- M1 · apt101-building-rationed-it: "The post-it was not naive. It was what the craft shrank to when building was expensive."
- M2 · apt101-why-it-agreed: "When agents analyse wider, deeper and faster than you can, analysis stops being the scarce part." M2 · apt101-each-of-you-makes-something: "Making got cheap. Knowing what good looks like did not."
- Where it breaks, M3 · apt101-where-you-go-from-here: "This is where 'building got cheap, deciding didn't' stops being an edge on its own. When rivals build as cheaply, speed is the entry price... What would change this training's mind: agents that start deciding well."
The 100-rung move, naming the break, is present and explicit. What holds the score below A is that a fair share of slides are product-craft method cards that sit beside the frame without needing it: 1-2-4-All (M2), The Mom Test (M2), Nielsen's five users (M3, though its first line ties back), Kniberg (M3). These read like a well-curated craft reader rather than cases of the lens. **88.**

## Narrative

**A.** In five sentences: an engineer learns the machine mirrors them and that checks reset a chain of errors. They learn to shape plans and rules, and to control big outputs by interrogation rather than reading. Then they send off a long task un-packaged, and it comes back wrong, by design. They diagnose it through three lenses, package it, and re-send. The diff of the two runs places every lesson, and the guide shows the training's own making failing the same way.
- The turn, M4 · test-and-learn: "Session one goes now, un-packaged: no plan.md, no verifier, no reference artifact... Session two goes packaged, after you've read the return."
- The turn lived, M5 · diagnose-and-resend: "The un-packaged run was supposed to underdeliver. What came back is data, not blame." Then: "The task is the same, packaged this time, and the prompt shrank."
- The training's own failure, M6 · story-of-module-6: "The agent I was working with had just finished writing those three modules. It still opened with the un-packaged shape."
- Sea passage, M5 · what-packaging-is: "An unchecked session arrives confident, and wrong... The success report comes from the wrong harbor."
The student lives through the turn, and the training's own failure arrives as a coda to it rather than as the turn itself. **93.**

**B.** In five sentences: a trio learns that building rationed their craft, and that agents make the slice cheap but not the deciding. They write a bet that can lose, gather their own material, and send off an overnight digest agent. The digest comes back agreeing with their favourite hypothesis, and the reason is their own brief. They widen, ground every quote, and take the bet to five users. What the users did, which the digest never said, decides pivot or persevere, and the trio carries a proposal, not a decision, to its team on Monday.
- The set-up, M1 · apt101-it-runs-overnight: "It will read well. Every line will sound as sure as the next. Some of those lines will be wrong."
- The turn, M2 · apt101-why-it-agreed: "Open the brief you wrote for the digest agent... Does it name your hypothesis, as something to find evidence for? If it does, the agent did as asked... the agreement may come from your question, not from your customers."
- Payoff, M3 · apt101-bet-meets-five-users: "For each moment, ask whether your digest said it. Often it could not have." And: "A slice that comes back no has done its job."
- Close handed forward, M3 · apt101-from-us-to-the-team: "Bring it to the team on Monday and expect them to change it. Their changes are how it becomes theirs."
A real turn: it lives in the student's own artefact (their brief, their bet), and the wrongness is theirs, not the tool's. That is the 80 rung, clearly earned. It is not the training's own failure. The guide's failures sit beside the plot as essay quotes, not inside it. The turn also lands within a few slides of being set up, with the "faster feature factory" slide explaining it straight away, so the student gets less time sitting in the wrongness than AE101's two-module arc gives. **84.**

## Point of view

**A.** The voice is a guide who has done this on real repos: second person throughout, surfacing in heuristics, and then in one full first-person passage with scars.
- M1 · orient-and-introspect: "Assume about 10% of what it says or does is made up. Could be more or less than this heuristic suggests."
- M3 · threat-model-with-stride: "If it landed in the worktree, the agent reasoned itself there... The agent reasoned forward from the conversation, not from the filesystem." This is someone who watched that happen.
- M6 · story-of-module-6: "Five taste reversals from me on Claude's confident recommendations... I drifted in every one of the ways this story just walked. I fixed what I caught. The loop caught what I missed." Signed "Antti".
- M2 · extract-the-task-shaping-rule: "This prompt is fair to read as replacing the file... Precise prompting is harder than it looks." The guide doubts his own prompt.
The narrator's own failure is on the page, as a passage, about making this very training. The student stays the hero ("Your turn."). **96.**

**B.** The guide is a first-person product builder (Antti), who appears in dated essay excerpts and in "we". Otherwise the voice is second person ("the three of you").
- M1 · apt101-building-is-cheap: "One of the first things we tried building was a local installer for developer tooling. It got working and it was used just a bit. Bad idea, as the need wasn't a daily one."
- M2 · apt101-why-it-agreed: "I used to think of being wrong as failure. But being wrong does not diminish you as a person. Lack of effort to understand does."
- M3 · apt101-from-us-to-the-team: "Sharing is harder than building. We built good things. We failed to share them well."
- M3 · apt101-where-you-go-from-here: "I still make mistakes. More than I'd like. The difference is I make them faster now."
The guide's own failure is on the page, three times, so the top-rung condition is met. But each scar is a bylined citation set off like Cutler or Torres. None of them is a narrated moment from the work this training teaches: no "my digest agreed with my bet." So the narrator reads as one authority among many, not as the one who walked this road ahead of the trio. The scars are real and short, and they sit beside the turns rather than on them. **85.**

## Stance

**A.** Positions it could lose a customer over, each defended:
- *The model's advice is a forecast, not a measurement.* M5 · what-packaging-is: "Ask for best practice and that is what answers: a well-read average of what other people published about other repos, frozen at a cutoff... **A prediction is not a measurement.**" The mechanism is training data and its cutoff.
- *A rule in context is not a rule in the output.* M6 · story-of-module-6, defended with a scar: "Same rule, same rules file, same task, four separate violations across four independent LLM instances. The grep pass caught each one. The LLM self-check did not."
- *Your gate is a claim too.* M5 · the-gate-is-a-claim: "Green is a claim about the check, not a fact about the work... The agent is an optimizer aimed straight at your gate." The mechanism is Goodhart.
- *Rules have a ceiling, and better rules are not the cure.* M2 · how-instructions-grow: "The cure is not better rules; it is where the rules live."
- Against its own interest. M2 · how-instructions-grow: "This training stops short of the full system." M5 · what-packaging-is: "today's playbooks are **candidates**", which includes the training's own. These are partial: they are honesty about scope more than a position that costs the sale. **92.**

**B.** Positions it could lose a customer over:
- *Agents amplify the team; they do not transform it.* M2 · apt101-why-it-agreed: "A faster feature factory is still a feature factory... That check is product craft, and agents do not bring it with them." The mechanism is amplification, tied to the student's own digest.
- *Fluency is not evidence, and models won't stop fabricating.* M2 · apt101-fluent-is-not-true: "This isn't a bug that gets patched in the next release. It's the shape of the technology. Later models will fabricate less; they won't stop." The mechanism is next-likely-word.
- *Sharing the agent is not sharing the work.* M3 · apt101-from-us-to-the-team: "The page was never where the work lived... a proposal to the wider team cannot promise 'everyone gets our agent'." This runs against the vendor pitch.
- *One agent per job, not a company brain.* M1 · apt101-it-runs-overnight: "a fix for one job shifts the answers for the others, and when something goes wrong nobody can say which job's instructions did it."
- *Close the door, even at a cost.* M1 · apt101-it-runs-overnight: "It will cost you a source somebody wanted in. Leaving it out is still the right call."
- Against its own interest. M3 · apt101-where-you-go-from-here: "speed is the entry price" and "What would change this training's mind: agents that start deciding well." The training names the condition under which its thesis expires. It does not go as far as telling a buyer not to buy.
The positions are defended by mechanism, and several land on the student's own artefacts. One drag: many slides hand the position to an authority (Torres, Fitzpatrick, Cagan) rather than holding it in the training's own voice. **85.**

## The pair

**A.** Strong stance and strong self-challenge together. It doubts its own prompt (M2), its own grader ("same-window self-charity", M3) and its own gates (M5), and it shows its own making failing (M6), while it holds its ground on forecast-versus-measurement. It reads as **someone who has been there**.

**B.** Both are present. Self-challenge: "A pass is a claim about a check nobody has tested" and "rebuilt the feature factory with a dashboard" (M3 · apt101-what-good-means), plus "The more you trust it, the less you notice" (M3). Stance: the feature factory, fluency, and "instructions are not the agent". It reads as **someone who has been there**, though thinner than A. The doubt is aimed at agents and at checks, and rarely at the training's own method. The guide's experience comes through borrowed authorities and essay quotes more than through lived scenes, which leans it slightly toward a well-sourced curator.

## Scores

| factor | A (AE101) | B (APT101) |
|---|---|---|
| Frame | 95 | 88 |
| Narrative | 93 | 84 |
| Point of view | 96 | 85 |
| Stance | 92 | 85 |

## Smallest moves for B

1. Put the guide's own scar on the M2 turn: replace the general "I used to think of being wrong" essay slide with a short first-person moment where the guide's own digest or brief agreed with his favourite bet and he caught it, or didn't.
2. Fold two method-card slides that sit beside the frame (e.g. 1-2-4-All and The Mom Test in M2) into one slide that reads them through "building got cheap, deciding didn't", so every slide is a case of the lens.
3. Hold one position in the training's own voice against its own sale, for example that a trio without weekly customer contact should not start with agents at all, and defend it with the faster-feature-factory mechanism.

## Volume

- A (AE101): about 181 `##` slides across the handbook (M1 26 · M2 34 · M3 42 · M4 24 · M5 26 · M6 29). Exercise phase headings are counted, because the handbook shows them.
- B (APT101): about 78 `##` slides (M1 27 · M2 27 · M3 24), all lecture slides.
