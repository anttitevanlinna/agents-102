# APT101 slide reuse map, v2: the full deck

**Status:** design input, 2026-10-06, not student-facing. Builds on `apt101-slide-reuse-map.md` and keeps its Maintainer calls: AE101 slides are rewritten for this audience, never borrowed; Agents 101 slides may be borrowed as is via `#id`; product-craft gaps are written faithful to their authors from `apt101-source-pack.md`. Reads `trainings/agentic-product-teams-101/theory-plan.md`, `apt101-day-2-beats.md` (v9), `group-work-plan.md` § Three-day sketch, the `lectures/apt101-*.md` drafts and the files under `slides/`. Target: about 90 lecture slides, roughly 30 / 35 / 25.

**Verdicts.** **B** borrow as is (stands alone in a new deck, referents resolve, product register). **R** rewrite: the idea belongs here, the wording is bound to its home. **S** skip. Day = the APT101 day the slide serves. `R:` names are working names for new slide files under `curriculum/slides/`.

**Swept, no `##` slides:** `module-4-prework` (two readings, no slide headers), and the three live demos `first-scheduled-agent`, `agent-that-takes-action`, `agent-loop-raw`.

## 1. Agents 101, every lecture slide

| Home § header | Verdict | Day | Note / idea |
|---|---|---|---|
| `context-is-king` § Same question, two answers | B | 1 | in use |
| `context-is-king` § It reads the whole conversation every time | B | 1 | "every useful thing in this training" reads true here |
| `context-is-king` § Context is whatever you tell it | B | 1 | in use |
| `context-is-king` § The first piece of the picture | R:parts-of-an-agent | 1 | "the full agent picture" is A101's figure. Idea: an agent is context, tools, a goal, checks, a boundary, a loop; a chat has only the first. Seeds D3 `parts-hold-model-rotates` |
| `context-is-king` § A file it reads every time | R:a-file-it-reads-every-time | 1 | first map x ("That's your turn"). Idea: a file the agent reads at the start of every run, written once by the team |
| `what-just-happened` § The report is a hypothesis, not a result + § You were the only check in the room | R:you-are-the-check | 1 | "you were in the room", "the site". Idea: nobody but you can catch a wrong line about your product; where the agent's account differs from what you know, yours counts. Fits D1's press-release catch, not D2's overnight run |
| `what-just-happened` § You felt context move · § Why the look-back was kind to you · § You act on the future | S | | exercise referents; preference tuning lives in `you-cannot-read-it-all`, "do the reps" in `three-habits-that-carry` |
| `module-2-prework` § Learn plan mode | R:look-before-it-writes | 1 | Idea: ask for the plan before it writes several files; one correction there redirects every later step. Also draws on AE101 `when-a-plan-is-good` § Plan review is a high-leverage gate |
| `module-2-prework` § Bring one live challenge · § Check what Claude can read · § Start the Module 2 handoff · § Read the memory frame | S | | setup steps, not theory |
| `compounding` § Two words, held together | R:it-remembers-and-it-runs | 1 | first map x ("Module 2 adds shelf life"). Idea: persistence plus automation; either alone is a toy. The overnight run is the pair |
| `compounding` § Why the sharpening happens | R:new-sources-sharpen-old | 1 | "Phase 3", "Module 1". Idea: the agent reads the old pages before the new sources; claims that can't survive the meeting get cut |
| `compounding` § It gets better by being edited | B | 2 | b11. Header pronoun "It" is never named in a new deck (slides §6); a home card naming "the memory" fixes it for both |
| `compounding` § A folder of text, and that is the point | R:a-folder-of-text | 1 | "`agents/`", "Module 1". Idea: the memory is text the whole team can read, edit and carry to any tool |
| `compounding` § Three layers, one folder | B | 1 | in use |
| `compounding` § What this unlocks | R:generic-becomes-yours | 1 | "Module 8", "Module 1". Idea: generic AI becomes your AI when you shape the context around it. Pairs with AE101 § The missing evidence is local |
| `compounding` § Could a competitor claim this? | R:could-a-competitor-claim-it | 1 | first map: Phase 1/3 callback + prompt. The question becomes the box test |
| `compounding` § It can only use what someone wrote down | B | 1 | in use |
| `when-to-split-an-agent` § The unit is the recurring workflow | R:one-agent-per-recurring-job | 1 | "this lecture answers", `.md`. Idea: one agent per piece of work that recurs in your week; the overnight digest is the first |
| `when-to-split-an-agent` § Start with don't | B | 2 | b3; stands alone |
| `when-to-split-an-agent` § Split when they can't be one | B | 2 | b3; access, dialect, stance map onto interviews, tickets, analytics. Glosses "retriever" itself |
| `when-to-split-an-agent` § The test that catches the bluff | B, spare | 2 | "Business people who have just seen multi-agent work" fits; overlaps Start with don't |
| `when-to-split-an-agent` § Seams are where it fails | B | 2 | first map condition holds: "curator", "synthesizer" need naming in the b3 demo first |
| `when-to-split-an-agent` § A framework makes it pick | R:the-outcome-makes-it-pick | 2 | "the strategy kernel you just handed it". Idea: four sketches give a spread, not an answer; the outcome at the root makes the merge choose |
| `when-to-split-an-agent` § More agents is not more rigour · § Two shapes · § Other agents are part of the tool surface · § Three agents is not three times as good | S | | "the beige answer", Phase 1/2 moves, "the full agent picture", "a whole module"; ideas held by the B rows above |
| `debugging-stuck-agents` § Diagnose before repair + § Sources, processing, boundary | R:sources-instructions-reach | 2 | prompt in body, `./CLAUDE.md`. Idea: when the overnight run is wrong, ask which it was: the material, the instructions, or what it could reach; fix that one, rerun the smallest step |
| `practice-of-risk` § Certainty is a fantasy you inherited + § Three ways agents break the old story | R:safe-enough-for-now | 2 | security register; "the prework gave this its field name". Idea: same input, different answer; a customer ticket can carry instructions; capability emerges. Result: safe enough, under these conditions, for now |
| `practice-of-risk` § Assess, then mitigate | R:assess-then-mitigate | 2 | first map x (lens + policy files). Idea: the five mitigation shapes in product terms: give it less, split, filter, a person approves, a second read. Must sit directly before `reassess-the-residual`, which opens as step three |
| `practice-of-risk` § Reassess the residual, then decide | B | 2 | in use; needs R:assess-then-mitigate in front |
| `practice-of-risk` § Now the move is to give it less | B | 2 | "More stances at the table" is true only after b3, so it stays on D2 |
| `practice-of-risk` § The best mitigation is the door you don't open | B | 1 | moves to Day 1, where the team decides what may go in before anything goes in. "Policy lens" is one clause |
| `practice-of-risk` § The discipline is what carries | S | | "today the loop runs once … policy files raw" |
| `module-5-prework` § Why the LLM fabricates | B | 2 | in use; Mata v. Avianca named without the preamble, still reads |
| `module-5-prework` § Why grounding fails even when the facts are in context | B | 2 | b3; "one customer complained", conflict gets smoothed |
| `grounded` § There is truth out there | B | 2 | in use |
| `grounded` § Mostly right, ten times over, is mostly wrong | B | 3 | why a check has to sit inside the loop; customer-service example |
| `grounded` § A test-and-fix loop collapses the error rate | R:check-and-fix-rounds, spare | 3 | "your briefing", "a benchmark". Idea: three rounds of check and fix reach where no single better pass can |
| `grounded` § "Are you sure?" is another fluent answer | B | 2 | in use |
| `grounded` § Don't pick a method. Run the candidates. | R:run-more-than-one-check | 2 | first map x. Idea: you don't know which check catches what on your material; run several and see which found the planted claims |
| `grounded` § Four candidates that fail differently | B | 2 | "the briefing" twice and "scoreboard" read as generic nouns; a home card to "the output" makes it clean |
| `grounded` § The judge names its own limit | B after home card | 2 | first map card: "The winner (or an ensemble of the top two)". `grounded.md` is dirty in the shared tree; same-file collision procedure first |
| `grounded` § You have done this before · § In the full agent picture, this is the check · § A drift signal, never proof | S | | "three stances, one framework", agent picture, "the check you are about to build"; drift-is-not-proof is held by `a-pass-is-a-claim` |
| `evals-as-steering` § Module 5 turned judgment into a judge | R:write-down-what-good-means | 3 | Module 5 referents. Idea (with the lecture preamble): an eval is how you write down what good means, so it still applies when nobody is in the chair |
| `evals-as-steering` § Groundedness protects the floor | B | 3 | in use |
| `evals-as-steering` § Steering raises the ceiling | B | 3 | in use |
| `evals-as-steering` § A yardstick you rewrite is not a yardstick | R:hold-the-yardstick-still | 3 | "One exercise … the judge from Module 5". Idea: if the criteria change mid-run, the score means nothing |
| `evals-as-steering` § The answer is never "the eval passed" | R:what-it-must-never-miss, spare | 3 | "Module 6 is not about". Idea: you decide which details the system must never miss |
| `when-the-score-stops-moving` § A flat score is information about the judge | R:a-flat-score, spare | 3 | "built it in Module 5". Idea: a flat score means the check ran out of what it can see |
| `when-the-score-stops-moving` § You haven't checked the judge yet · § If the model stops fabricating | S | | held by `check-the-checker-against-your-calls` and `steering-raises-the-ceiling`; closes on "the next lecture" |
| `new-human-role-in-the-loop` § Would you let it send the mail? + § The human moves one level up | R:one-level-up | 3 | "That was Module 1 … 5", "goal-nudger", "That works for one mail". Idea: would you let the agent post the team's weekly update? You stop inspecting every pass and design the loop: what it reaches, what stays fixed, where a person still belongs |
| `new-human-role-in-the-loop` § Variety in, selection out, memory keeps | R:make-many-keep-few, spare | 3 | "three stances and four detectors". Idea: rough solutions in quantity, a check that discards most, memory keeps what survived. The three days in one line |
| `new-human-role-in-the-loop` § Two evals · § Make the goal-nudger · § The better it gets, the less you watch · § When did you last read one yourself? · § The full picture | S | | floor/ceiling duplicate; goal-nudger; `trust-grows-attention-fades` already closes on "when did you last do this kind of work by hand?"; agent-picture figure |
| `access-is-not-absorption` § The job comes first, the candidate second | R:the-teammates-job-first, spare | 3 | exercise referents. Idea: start the team proposal from the colleague's job, not from your agent |
| `access-is-not-absorption` § You cannot share an agent | R:you-cannot-hand-over-an-agent | 3 | "Four shapes are on the list". Idea: the agent file is a shell; the work lives in the memory and the corrections |
| `access-is-not-absorption` § Three parts copy, one does not | B | 2 | b5: accountability has a name |
| `access-is-not-absorption` § Access is easy; absorption is scarce | B | 3 | stands alone |
| `access-is-not-absorption` § People absorb what they already half know | B, spare | 3 | Polanyi; stands alone |
| `access-is-not-absorption` § What would have to be true for them to switch? | B | 3 | in use |
| `access-is-not-absorption` § The one piece you don't decide | B | 3 | lists the four things itself; "Every piece so far" leans on R:parts-of-an-agent from D1 |
| `access-is-not-absorption` § This is the interface piece | S | | agent picture |
| `access-is-not-absorption` § The people plan stalls on names | R:a-missing-name-is-a-finding | 3 | first map x ("an hour ago"). Idea: a proposal with no named owner marks the part not built yet |
| `where-is-this-all-going` § You described it; something else built it | R:you-specify-it-builds | 3 | "the room ran on its own". Idea: specifying the slice well is the harder half, and it is the product owner's craft. Draws on AE101 § The right information grounds and makes quality |
| `where-is-this-all-going` § Agents reading agents must cite | R:agents-reading-agents-cite, spare | 2 | forum, kernel. Idea: when one agent reads another's output, every claim names its file, or they invent each other's memory |
| `where-is-this-all-going` § Three walls past the laptop | R:three-walls | 3 | "The plan names". Idea: data access, where it runs, whether anyone finds it; which wall your company hits first |
| `where-is-this-all-going` § The parts hold; the model rotates | B | 3 | needs the parts named on D1 (R:parts-of-an-agent) |
| `where-is-this-all-going` § Which half of this is obsolete next year? | B, spare | 3 | stands alone |
| `where-is-this-all-going` § Will your organisation learn faster than the model changes underneath it? | B | 3 | in use |
| `where-is-this-all-going` § Count the folders · § What would change our mind? · § A flywheel, not a graduation | S | | forum and kernel referents; the bet's kill signal is in `write-the-bet-so-it-can-lose` |

## 2. AE101, ideas only

Already rewritten into an existing slide file: agreeable answers + ranked list → `you-cannot-read-it-all`; stops where your judgement begins → `the-agent-stops-where-you-stop-writing`; mirrors your stance → `your-taste-is-the-ceiling`; passing is not proof → `a-pass-is-a-claim`; judge needs calibrating → `check-the-checker-against-your-calls`; gates decay → `your-rubric-becomes-a-target`; trust and vigilance → `trust-grows-attention-fades`; you make agentic happen → `three-habits-that-carry`.

| Home § header | Verdict | Day | Idea for product people |
|---|---|---|---|
| `the-machine-you-just-met` § The machine is steerable | R:three-ways-to-steer | 1 | steered by what you bring (a stated doubt, a standard), what you set around it (a check, a second read), what you ask for (the shape of the answer) |
| `when-a-plan-is-good` § Three pressures that make bad plans look good | R:structure-is-persuasive, spare | 2 | a tidy tree or plan looks decided; reasonable steps can add up wrong |
| `how-instructions-grow` § Prohibitions stop; taste steers | R:show-what-good-looks-like | 2 | b11: a rules file built only from corrections becomes a list of don'ts; write examples of good |
| `how-instructions-grow` § Some rules grow into skills + `skills-from-the-frontier` § Borrowed judgement, or your own | R:a-rule-grows-into-a-skill, spare | 2 | a rule that grows into a way of doing a job becomes a skill; borrow the craft where someone codified it (a hypothesis checker), author where nobody could |
| `how-instructions-grow` § The second loop | R:question-the-rule, spare | 3 | Argyris: the first loop fixes the action, the second questions the assumption behind it |
| `what-keeps-a-long-running-session-going` § What stops a long-running session before done-done | R:what-stopped-the-run | 2 | b1: an overnight run stops on a question nobody answered or a source it could not open; whether it was really out of reach is your call |
| `reading-the-return` § Three failure modes you'll use to read | R:how-a-long-run-drifts, spare | 2 | describe the drift, the crowding and the plausible-but-wrong without claiming field names (its backing: only *context rot* is shared vocabulary) |
| `the-gate-is-a-claim` § Change on recurrence, not on noise | R:change-on-recurrence | 2 | b11: one miss is not a rule; Deming's tampering |
| `hooks-always-fire` § Hooks for must-happen, prompts for taste | R:must-happen-needs-a-check | 2 | b11: the agent reads a rule and still breaks it; what must happen every time needs a check that runs every time |
| `what-packaging-is` § Reference and plan | R:the-box-is-the-reference | 1 | the box and press release are a reference the agents re-read, which keeps a long run on goal |

SKIP, one line per lecture: `painting-the-picture` (Perl-wizard identity; taste done), `the-wizard-move`, `the-whole-map`, `where-the-rule-could-live`, `the-far-half`, `the-agent-loop`, `composing-the-workflow`, `the-handoff-prompt`, `the-2-frontiers` (held by `learn-faster-than-the-model`): engineering mechanics; `the-machine-you-just-met` § chat is an abstraction · errors stack · you just ran the loop · what compounds (held by `you-cannot-read-it-all`, `mostly-right-ten-times`, R:new-sources-sharpen-old); `when-a-plan-is-good` other four (code plans, delegation figure); `how-instructions-grow` § Rules have a ceiling · § Keep your context where it loads; `skills-from-the-frontier` other four (STRIDE, ADR, repo homes); `the-loop-half-filled` all seven (near-half map, branch, governor; reading-was-never-the-control is in `you-cannot-read-it-all`); `test-and-learn` all three; `what-keeps-a-long-running-session-going` other three; `ironies-of-automation` § same reps (held by `trust-grows-attention-fades`); `reading-the-return` other two; `hooks-always-fire` § Hooks always fire; `what-packaging-is` other six; `the-gate-is-a-claim` § One session is a sample (in `a-pass-is-a-claim`) · § The delegation frontier; `story-of-module-6` all five (the maintainer's own scar, and APT101 needs its own); `agents-that-build-agents` § There is no last turn; § The right information grounds and makes quality is folded into R:you-specify-it-builds.

## 3. Gaps: product craft and roles

Pack = in `apt101-source-pack.md` today. **Pack first** = the source pack must grow before the slide is written.

| G: name | Day | What the slide must carry | Source |
|---|---|---|---|
| G:the-product-trio | 1 | Torres's trio: product, design and engineering lead decide discovery together; this room is that trio, with agents joining | pack (Torres) |
| G:outcomes-over-outputs | 1 | an outcome is a change in what customers do; an output is what we ship; the box names an outcome | pack first (Seiden) |
| G:the-feature-factory | 1 | measuring shipped features instead of learning; agents make the factory faster, which is the risk the training is built against | pack first (Cutler) |
| G:the-job-they-hire-it-for | 1 | customers hire a product for a job in a circumstance; the box answers the job, not the feature list | pack (Christensen) |
| G:four-product-risks | 1 | value, usability, feasibility, viability; agents shrink feasibility, the other three stay | pack first (Cagan) |
| G:riskiest-assumption-first | 1 | sort the bet's assumptions by how much rests on them and how little evidence you have; test the top one first | pack first (Bland and Osterwalder) |
| G:talk-to-customers-every-week | 2 | continuous interviewing: small, weekly, story-based ("tell me about the last time"), so evidence arrives before decisions | pack first (Torres, *Continuous Discovery Habits*) |
| G:what-they-did-not-what-they-say | 2 | past behaviour is evidence, opinions about the future are not; grade your evidence before the tree | pack first (Fitzpatrick, *The Mom Test*) |
| G:diverge-then-converge | 2 | the morning widens, the afternoon chooses; mixing them kills both | pack first (Design Council double diamond) |
| G:prototype-to-learn | 2 | the designer's piece: fidelity matches the question; a rough prototype tests value, polish tests nothing yet | pack first (Houde and Hill) |
| G:the-test-that-could-kill-it | 2 | the product owner's piece: fake door, smoke test, concierge; the cheapest test of the riskiest assumption, threshold agreed before | pack first (Bland, *Testing Business Ideas*) |
| G:working-agreements-with-agents | 2 | the team lead's piece: what agents do, what stays with people, decided with the team; Nordic co-determination as a question, no law asserted | pack first; research-claims sourcing |
| G:watch-them-use-it | 3 | test the slice: watch a handful of real users, ask them to think aloud, don't defend the design | pack first (Nielsen, Krug) |
| G:read-the-signal | 3 | the "we will know when" line comes back: persevere, pivot or stop, decided on the pre-agreed signal, especially when it says no | pack (O'Reilly) + pack first (Ries) |
| G:discovery-beside-delivery | 3 | Scrum's small share: it runs delivery; discovery runs beside it, and the proposal names where the agents' weekly rhythm sits | pack first (Sy dual-track; Scrum Guide) |

Spares: G:who-makes-the-call (b7 decision rights), G:roadmap-as-bets (D3 proposal), G:product-vision-vs-strategy (D1).

## 4. Lecture plan

`S:` existing slide file · `B:` Agents 101 borrow `lectures/<home>.md#<id>` · `R:` rewrite · `G:` gap. Lectures §1/§2: arming slides go before a beat, naming slides after it, so a lecture that does both is split into a/b files.

**Day 1, Our product, our system**

| # | Lecture (slot) | Ordered slides | S/B/R/G |
|---|---|---|---|
| 1 | `apt101-work-backwards` (after box + pitch) | S:the-outcome-loop · G:the-product-trio · G:outcomes-over-outputs · G:the-feature-factory · S:work-backwards-from-the-customer · G:the-job-they-hire-it-for · R:could-a-competitor-claim-it | 2/0/1/4 |
| 2 | `apt101-context-is-king` (before the press-release move) | B:context-is-king#same-question-two-answers,reads-whole-conversation,context-is-whatever-you-tell-it · R:three-ways-to-steer | 0/3/1/0 |
| 3 | `apt101-you-are-the-check` (after catching the invented facts) | R:you-are-the-check · R:generic-becomes-yours · R:the-box-is-the-reference | 0/0/3/0 |
| 4 | `apt101-write-the-bet` (hypotheses) | S:write-the-bet-so-it-can-lose · G:four-product-risks · G:riskiest-assumption-first | 1/0/0/2 |
| 5 | `apt101-a-memory-that-compounds` (insight memory) | B:compounding#only-what-someone-wrote-down,three-layers-one-folder · R:a-file-it-reads-every-time · R:a-folder-of-text · R:new-sources-sharpen-old | 0/2/3/0 |
| 6 | `apt101-before-anything-goes-in` (what may go in) | B:practice-of-risk#door-you-dont-open · R:look-before-it-writes | 0/1/1/0 |
| 7 | `apt101-it-runs-overnight` (out the door) | R:it-remembers-and-it-runs · R:one-agent-per-recurring-job · R:parts-of-an-agent | 0/0/3/0 |

**Day 2, What's actually true?**

| # | Lecture (beat) | Ordered slides | S/B/R/G |
|---|---|---|---|
| 1a | `apt101-what-came-in-overnight` (before b1) | S:you-cannot-read-it-all | 1/0/0/0 |
| 1b | `apt101-when-the-run-went-wrong` (after b1) | R:what-stopped-the-run · R:sources-instructions-reach | 0/0/2/0 |
| 2 | `apt101-gather-the-evidence` (b3 short demo) | G:talk-to-customers-every-week · G:what-they-did-not-what-they-say · B:when-to-split-an-agent#start-with-dont,split-when-they-cant-be-one,seams-are-where-it-fails · B:module-5-prework#grounding-fails-in-context | 0/4/0/2 |
| 3 | `apt101-opportunities-before-solutions` (b4) | G:diverge-then-converge · S:opportunities-before-solutions · S:the-branch-one-of-you-found · R:the-outcome-makes-it-pick | 2/0/1/1 |
| 4 | `apt101-what-the-agents-may-keep` (b5) | S:the-questions-legal-will-ask · R:safe-enough-for-now · R:assess-then-mitigate · B:practice-of-risk#give-it-less,reassess-the-residual · B:access-is-not-absorption#three-parts-copy | 1/3/2/0 |
| 5a | `apt101-fluent-is-not-true` (before b6) | B:grounded#there-is-truth-out-there · S:a-customer-need-nobody-said · B:grounded#are-you-sure | 1/2/0/0 |
| 5b | `apt101-the-check-that-found-them` (after b6) | B:module-5-prework#why-the-llm-fabricates · R:run-more-than-one-check · B:grounded#four-candidates,judge-names-its-own-limit · S:agents-checked-people-not-watched | 1/3/1/0 |
| 6 | `apt101-your-taste-is-the-ceiling` (before b8) | S:your-taste-is-the-ceiling · G:prototype-to-learn · G:the-test-that-could-kill-it · G:working-agreements-with-agents | 1/0/0/3 |
| 7 | `apt101-how-it-could-fail` (b9) | S:it-already-failed | 1/0/0/0 |
| 8 | `apt101-what-we-keep` (b11, new) | S:the-agent-stops-where-you-stop-writing · B:compounding#better-by-being-edited · R:show-what-good-looks-like · R:change-on-recurrence · R:must-happen-needs-a-check | 1/1/3/0 |

**Day 3, Learn faster than the market**

| # | Lecture (slot) | Ordered slides | S/B/R/G |
|---|---|---|---|
| 1 | `apt101-a-check-is-a-claim` (before evals) | R:write-down-what-good-means · B:evals-as-steering#groundedness-protects-the-floor,steering-raises-the-ceiling · B:grounded#mostly-right-ten-times · S:a-pass-is-a-claim · S:check-the-checker-against-your-calls · R:hold-the-yardstick-still · S:your-rubric-becomes-a-target | 3/3/2/0 |
| 2a | `apt101-slice-by-learning` (before story map) | S:slice-by-what-you-learn · R:you-specify-it-builds | 1/0/1/0 |
| 2b | `apt101-read-the-signal` (before and after testing the slice) | G:watch-them-use-it · G:read-the-signal | 0/0/0/2 |
| 3 | `apt101-from-us-to-the-team` (personal to team) | R:you-cannot-hand-over-an-agent · B:access-is-not-absorption#one-piece-you-dont-decide,access-is-easy,what-would-have-to-be-true · G:discovery-beside-delivery · R:three-walls · R:a-missing-name-is-a-finding | 0/3/3/1 |
| 4 | `apt101-what-each-of-us-is-for` (close) | R:one-level-up · S:what-each-of-us-is-for · S:aligned-autonomy-with-agents · S:trust-grows-attention-fades · B:where-is-this-all-going#parts-hold-model-rotates,learn-faster-than-the-model · S:three-habits-that-carry | 4/2/1/0 |

**Totals**

| | Existing S | Borrowed B | Rewrite R | Gap G | Slides |
|---|---|---|---|---|---|
| Day 1 | 3 | 6 | 12 | 6 | 27 |
| Day 2 | 9 | 13 | 9 | 6 | 37 |
| Day 3 | 8 | 8 | 7 | 3 | 26 |
| All | 20 | 27 | 28 | 15 | 90 |

Borrowed share 30%; with the existing slides (each already a rewrite or a gap), 52% of the deck exists today. New writing owed: the R and G columns; every gap marked **pack first** waits on `apt101-source-pack.md` growing. Spares, outside the totals: B `test-that-catches-bluff`, `half-know`, `which-half-is-obsolete`; R `check-and-fix-rounds`, `what-it-must-never-miss`, `a-flat-score`, `make-many-keep-few`, `the-teammates-job-first`, `agents-reading-agents-cite`, `structure-is-persuasive`, `a-rule-grows-into-a-skill`, `question-the-rule`, `how-a-long-run-drifts`.

## 5. Changes to the existing 34

- **`door-you-dont-open` moves to Day 1.** The include `practice-of-risk#door-you-dont-open,give-it-less,reassess-the-residual` in `apt101-what-the-agents-may-keep` splits: door on D1 lecture 6, the other two stay on D2 behind R:assess-then-mitigate.
- **`the-agent-stops-where-you-stop-writing` moves to D2 b11.** On D1 it says what `only-what-someone-wrote-down` says one slide away; its "every 'not like that' is a sentence to write down" is b11's move.
- **Preference tuning is explained twice on D2:** `you-cannot-read-it-all` ¶4 and `your-taste-is-the-ceiling` ¶2. Keep it at b1; cut the sentence from the taste slide.
- **`a-pass-is-a-claim` ¶2 opens with what `check-the-checker-against-your-calls` is about,** two slides later in the same lecture. Cut the first sentence of ¶2.
- **`it-already-failed`:** stray space in "actually fear ."
- **`apt101-write-the-bet`** loses its compounding borrows to D1 lecture 5; `apt101-work-backwards` loses the context-is-king borrow to D1 lecture 2 and `the-agent-stops-where-you-stop-writing` to D2.
- Nothing dropped. `new-human-role#when-did-you-last-read-one` repeats the question `trust-grows-attention-fades` closes on; `new-human-role#human-moves-one-level-up` carries "goal-nudger". Neither is borrowed.

## 6. Follow-on, not done here

- Ids to add at home (marker under the `##`, above any `<!--tier:N-->`): `when-to-split-an-agent` start-with-dont, split-when-they-cant-be-one, seams-are-where-it-fails; `module-5-prework` grounding-fails-in-context; `grounded` mostly-right-ten-times, four-candidates, judge-names-its-own-limit; `compounding` better-by-being-edited; `access-is-not-absorption` three-parts-copy, access-is-easy, one-piece-you-dont-decide; `where-is-this-all-going` parts-hold-model-rotates.
- Home cards: `grounded` § The judge names its own limit (first map); `grounded` § Four candidates ("the briefing" → "the output"); `compounding` § It gets better by being edited (header names the memory).
- `THEORY_HANDBOOK_MANIFEST` gains `apt101-context-is-king`, `apt101-you-are-the-check`, `apt101-a-memory-that-compounds`, `apt101-before-anything-goes-in`, `apt101-it-runs-overnight`, `apt101-when-the-run-went-wrong`, `apt101-gather-the-evidence`, `apt101-the-check-that-found-them`, `apt101-what-we-keep`, `apt101-read-the-signal`, `apt101-from-us-to-the-team`.
- Before each borrow: `node scripts/slide-card.js lectures/<home>.md#<id>` and a `- **Charge:**` line in the borrowing file's maintainer block.
- D2 minutes: v9 gives lecture time only at b3, b5, b6. Lectures 1a, 1b, 3, 6, 7 and 8 each take minutes from their own beat or the float; the beat sheet owes that reshape.
