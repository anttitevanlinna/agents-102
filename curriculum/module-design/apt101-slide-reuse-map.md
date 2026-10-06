# APT101 slide reuse map

**Status:** design input, 2026-10-06, not student-facing. Reads `trainings/agentic-product-teams-101/theory-plan.md`, `module-design/apt101-day-2-beats.md` (v9), `group-work-plan.md`. Candidates = `##` slides above `<!-- maintainer -->` in `curriculum/lectures/*.md`, apt101-* drafts excluded. Home training from module includes: A101 = agents-101, AE101 = agentic-engineering-101, CB = claude-basics.

**Fit test.** Product register beats engineering register. A slide whose referents live in its home deck ("this module", "the exercise", a prior slide) is weak unless noted. **Stance departure:** theory-plan says AE101 slides stay home. Every AE101 row marked B passed a register check (no tests, merges, repos, assertions on the slide); each one still departs from that stance and is the maintainer's call.

**Mechanism.** Includes resolve inside a lecture file: `build-workbook.js inlineIncludes` recurses into included bodies, and `apt101-work-backwards.md` already borrows `context-is-king#same-question-two-answers`. One include line per run of consecutive slides from one home: `[T](lectures/<home>.md#id1,id2)` alone on a line. Each borrowed run renders as its own nested lecture section; check the Slides chunking once on the first build. Forks are banned (`curriculum/CLAUDE.md` § Slide reuse: wording that doesn't fit is fixed at home, by card, and every borrower gets it). Before each borrow: `node scripts/slide-card.js lectures/<home>.md#<id>`, and a `- **Charge:**` line in the borrowing file's maintainer block.

## 1. Candidates per need

Verdicts: **B** borrow as is · **A** wording must change: either a home fix (card; only when the change keeps the home deck true) or it falls to a gap slide; each row says which · **x** looked, no fit.

| Need (law / beat) | Slide: `lectures/<home>.md` § header | id | Home | Verdict |
|---|---|---|---|---|
| D1 agent knows only the world you give it | `context-is-king` § Same question, two answers | same-question-two-answers | A101, CB | B |
| D1 same | `context-is-king` § Context is whatever you tell it | context-is-whatever-you-tell-it | A101, CB | B |
| D1 same | `context-is-king` § It reads the whole conversation every time | reads-whole-conversation | A101, CB | B (optional; "every useful thing in this training" reads fine here) |
| D1 same | `context-is-king` § A file it reads every time | a-file-it-reads-every-time | A101, CB | x: closes on "That's your turn", the CB exercise |
| D1 transfer (your knowledge into the agents' work) | `compounding` § It can only use what someone wrote down | *only-what-someone-wrote-down* | A101 | B |
| D1 transfer | `agents-that-build-agents` § The agent stops where your judgement begins | *stops-where-judgement-begins* | AE101 | B (spec, rules, checks, plan; no code) |
| D1 work backwards, the box | `compounding` § Could a competitor claim this? | (not borrowed) | A101 | A → gap: home needs its Phase 1/3 callback and `{{prompt:compounding-1}}`. Steal the question for G1, the box test in one line |
| D1 insight memory (A101 M2 move) | `compounding` § Three layers, one folder | *three-layers-one-folder* | A101 | B (sources untouched, memory sharpened) |
| D1 insight memory | `compounding` § Two words, held together | | A101 | x: "Module 2 adds shelf life" |
| D1 what may go in before anything goes in | `practice-of-risk` § The best mitigation is the door you don't open | *door-you-dont-open* | A101 | B (mailbox, customer-facing drafts; "policy lens" is one clause) |
| D1 same | `practice-of-risk` § Now the move is to give it less | *give-it-less* | A101 | B ("more stances" opener reads as general) |
| D1 hypothesis = bet allowed to lose | `where-is-this-all-going` § What would change our mind? | (not borrowed) | A101 | A → gap: forum/kernel referents are the home's point. Steal the question for G3 |
| D1 same | `test-and-learn` § Every send-off is an experiment | | AE101 | x: agent sessions as experiments, not product bets |
| D1 same | `what-just-happened` § You act on the future to know what's real | | A101 | x: rests on "what you just did" |
| D2 b1 control on the overnight digest | `the-machine-you-just-met` § Agreeable answers won the preference round | agreeable-answers | AE101 | A → gap: "Fixed, and the tests pass" is AE101's own example, and "the mirror" points at an AE101 slide. Sycophancy as the why under "mark the line you trust least" goes into G4 |
| D2 b1 same | `the-loop-half-filled` § Reading was never the control | | AE101 | x as is (delta note, STRIDE); its last paragraph seeds gap G4 |
| D2 b1 same | `the-machine-you-just-met` § Ask for a ranked list, not an essay | ranked-list-not-essay | AE101 | x: "the bug was trivial" |
| D2 b1 same | `what-just-happened` § The report is a hypothesis, not a result | | A101 | x: "you were in the room", false for an overnight run |
| D2 b3 sources disagree | `module-5-prework` § Why grounding fails even when the facts are in context | *grounding-fails-in-context* | A101 (prework) | B ("one customer complained"; conflict gets smoothed) |
| D2 b3 retrievers into one view | `when-to-split-an-agent` § Seams are where it fails | *seams-are-where-it-fails* | A101 | B only if b3's demo names retrievers and a curator first; otherwise jargon planted early |
| D2 b4 opportunity tree | (none) | | | gap G5, G6 |
| D2 b5 what the agents keep | `practice-of-risk` § Reassess the residual, then decide | *reassess-the-residual* | A101 | B ("Most rows" = the proposal's unclear cases; opens as step 3 of a loop, one spoken line names assess and mitigate) |
| D2 b5 who decides | `access-is-not-absorption` § Three parts copy, one does not | *three-parts-copy* | A101 | B (accountability has a name) |
| D2 b5 same | `practice-of-risk` § Assess, then mitigate | | A101 | x: lens + policy-files exercise referents |
| D2 b5 same | `practice-of-risk` § Three ways agents break the old story | | A101 | x: prework callback, security register |
| D2 b6 fluent is not true | `grounded` § There is truth out there | there-is-truth-out-there | A101 | B |
| D2 b6 same | `grounded` § "Are you sure?" is another fluent answer | are-you-sure | A101 | B |
| D2 b6 same | `module-5-prework` § Why the LLM fabricates | *why-the-llm-fabricates* | A101 (prework) | B with one caveat: names Mata v. Avianca, told only in the preamble above the first `##`, which does not travel; the slide still reads |
| D2 b6 same | `grounded` § Mostly right, ten times over, is mostly wrong | *mostly-right-ten-times* | A101 | B (customer-service loop), spare |
| D2 b6 same | `the-machine-you-just-met` § Errors stack until a check resets them | errors-stack | AE101 | x: failing test before the fix |
| D2 b6 the check that found them | `grounded` § Four candidates that fail differently | *four-candidates* | A101 | B (invention, overreach, citation, counter-evidence; "scoreboard" is one clause) |
| D2 b6 keep the check, note what it can't see | `grounded` § The judge names its own limit | *judge-names-its-own-limit* | A101 | A → home fix (card): "The winner (or an ensemble of the top two)" → "The check that won" stays true in A101. Worth carding: it is beat 6's ending verbatim. "Judge file" remains a mild jargon cost |
| D2 b6 same | `grounded` § Don't pick a method / You have done this before / A drift signal | | A101 | x: benchmark referents |
| D2 b8 each makes something in own craft | `agents-that-build-agents` § You make agentic happen | *you-make-agentic-happen* | AE101 | B |
| D2 b8 same | `painting-the-picture-with-the-llm` § The LLM mirrors your stance | (not borrowed) | AE101 | A → gap: the Perl-wizard opener is AE101's identity. "The taste behind the tool" (Godin) seeds a new creativity slide |
| D2 b8 same | `the-machine-you-just-met` § The machine is steerable | machine-is-steerable | AE101 | x: "a test, a type check" bullet |
| D2 b11 keep lessons as rules | `how-instructions-grow` § Prohibitions stop; taste steers | *prohibitions-stop-taste-steers* | AE101 | B, spare (no lecture slot at b11) |
| D2 b11 same | `compounding` § It gets better by being edited | | A101 | B, spare |
| D3 a check is a claim | `evals-as-steering` § Groundedness protects the floor | *groundedness-protects-the-floor* | A101, AE101 | B |
| D3 same | `evals-as-steering` § Steering raises the ceiling | *steering-raises-the-ceiling* | A101, AE101 | B (two internal mails, team taste) |
| D3 same | `the-gate-is-a-claim` § Passing is not proof | *passing-is-not-proof* | AE101 | B (gate/judge/session, no code) |
| D3 same | `the-gate-is-a-claim` § The judge needs calibrating against your own judgement | *judge-needs-calibrating* | AE101 | B |
| D3 Goodhart | `the-gate-is-a-claim` § Gates decay | (not borrowed) | AE101 | A → gap: "special-case tests… edit assertions" is the AE101 point and the panel's failure mode. Goodhart on a product rubric needs its own slide |
| D3 same | `when-the-score-stops-moving` § You haven't checked the judge yet | | A101 | x: duplicates judge-needs-calibrating; opens on the loop |
| D3 same | `the-gate-is-a-claim` § The delegation frontier | | AE101 | x: `{{figure:delegation-frontier}}` + bitter lesson, too dense here |
| D3 slice by learning | (none) | | | gap G11 |
| D3 aligned autonomy, what each of us is for | `new-human-role-in-the-loop` § The human moves one level up | *human-moves-one-level-up* | A101 | B ("That works for one mail" leans on the prior slide; one spoken line bridges) |
| D3 same | `ironies-of-automation` § Trust and vigilance move in opposite directions | *trust-and-vigilance* | AE101 | B (1983 industrial automation, no code) |
| D3 same | `ironies-of-automation` § Monitoring and takeover run on the same reps | *same-reps* | AE101 | B, spare: the designer's and PO's own reps |
| D3 same | `new-human-role-in-the-loop` § When did you last read one yourself? | *when-did-you-last-read-one* | A101 | B |
| D3 same | `new-human-role-in-the-loop` § The better it gets, the less you watch | | A101 | x: overlaps trust-and-vigilance |
| D3 proposal to the team | `access-is-not-absorption` § What would have to be true for them to switch? | *what-would-have-to-be-true* | A101 | B (current solution, jobs; product register) |
| D3 same | `access-is-not-absorption` § The one piece you don't decide | *one-piece-you-dont-decide* | A101 | B |
| D3 same | `access-is-not-absorption` § Access is easy; absorption is scarce | *access-is-easy* | A101 | B, spare |
| D3 same | `access-is-not-absorption` § The people plan stalls on names | | A101 | x: "an hour ago" |
| D3 close | `where-is-this-all-going` § Will your organisation learn faster than the model changes underneath it? | *learn-faster-than-the-model* | A101 | B |
| D3 close | `where-is-this-all-going` § The parts hold; the model rotates | *parts-hold-model-rotates* | A101 | B, spare |
| D3 close | `agents-that-build-agents` § There is no last turn | | AE101 | x: "The kit compounds… The training closes" is AE101's own ending |

Swept, nothing usable: `agent-loop-raw`, `agent-that-takes-action`, `first-scheduled-agent`, `agentic-systems-demo-script`, `what-just-happened-cb` (no `##` slides); `composing-the-workflow`, `debugging-stuck-agents`, `hooks-always-fire`, `module-2-prework`, `reading-the-return`, `skills-from-the-frontier`, `story-of-module-6`, `the-2-frontiers`, `the-agent-loop`, `the-far-half`, `the-handoff-prompt`, `the-whole-map`, `the-wizard-move`, `what-keeps-a-long-running-session-going`, `what-packaging-is`, `when-a-plan-is-good`, `where-the-rule-could-live` (engineering register or home-deck referents).

## 2. Gaps

- **G1 Work backwards** (D1): the press release before the product; the box is that move. Carries `compounding`'s question as the box test: could a competitor claim this? `apt101-work-backwards` draft holds the rest.
- **G2 Building got cheap, deciding didn't / the outcome loop** (D1): outcome → opportunities → bet → slice → signal; the craft decides where the loop turns. Draft holds it.
- **G3 Hypothesis statement** (D1): O'Reilly's *we believe… will result in… we will know when…*, the signal written so it can come back negative, and `where-is-this-all-going`'s question asked of the bet: what would have to show up for us to drop this?
- **G4 Control is interrogation** (D2 b1): you cannot read everything the overnight run wrote; ask for a ranked list, probe where you know most, mark the line you trust least. The why: agreeable answers won the preference round, so the digest's own summary of itself is a claim.
- **G5 Opportunities before solutions** (D2 b4): Torres's tree, outcome → opportunity → solution; a solution with no opportunity above it is a pet.
- **G6 The branch one of you found** (D2 b4): consensus buries the minority find by default; the tree shows spread and who found each branch.
- **G7 A customer need nobody said** (D2 b6): the agent writes in your users' voice; a fluent invented quote in your own research is the product-team version of fabrication.
- **G8 Agents get checked, people don't get watched** (D2 b6/b12): Edmondson; saying "the agent got this wrong" is a contribution, and checking the agent is not checking the colleague who ran it.
- **G9 Legal and employee-rep questions** (D2 b5): the first questions a data protection contact and an employee representative ask about agents on customer and staff material (GDPR, EU AI Act, change negotiations), as questions with room for your company's answers. No law asserted on the slide; content needs research-claims sourcing.
- **G10 How it could fail** (D2 b9): Klein's pre-mortem, permission to doubt without being the pessimist, placed where confidence peaks.
- **G11 Slice by what you learn** (D3): Patton sliced by effort because building was expensive; when building is cheap, slice by what the riskiest hypothesis needs to learn.
- **G12 Aligned autonomy, agents in the team** (D3): Kniberg; alignment on the outcome lets each person and each agent act without asking.
- **G13 What each of us is for** (D3 close): product owner, designer, team lead, one line each, read off the three pieces laid side by side.
- **G14 Your taste is the ceiling** (D2 before b8): the agent mirrors the stance you bring (Godin, taste behind the tool); the clickable prototype got cheap, the designer's eye didn't.
- **G15 Goodhart on your own rubric** (D3): the criteria your group writes become a target; some group will write for the score, which is the feature factory with a dashboard.

## 3. Proposed lecture list

Reshapes vs theory-plan: a 1-slide Day 2 opener (b1), an optional creativity pair before b8, a 1-slide pre-mortem before b9, and a new Day 3 lecture for *a check is a claim* (the law had no lecture). `+` = new consecutive include line.

| Day / slot | Lecture | Ordered slides | Borrowed / total |
|---|---|---|---|
| D1 after box + pitch | `apt101-work-backwards` | G1 · `context-is-king#same-question-two-answers,context-is-whatever-you-tell-it` · + `compounding#only-what-someone-wrote-down` · + `agents-that-build-agents#stops-where-judgement-begins` · G2 | 4 / 6 |
| D1 before overnight run | `apt101-hypotheses-are-bets` | G3 · `compounding#three-layers-one-folder` · + `practice-of-risk#door-you-dont-open,give-it-less` | 3 / 4 |
| D2 b1 (reshape) | `apt101-what-came-in-overnight` | G4 | 0 / 1 |
| D2 b3-b4 | `apt101-opportunities-before-solutions` | `module-5-prework#grounding-fails-in-context` · + `when-to-split-an-agent#seams-are-where-it-fails` · G5 · G6 | 2 / 4 |
| D2 b5 | `apt101-what-the-agents-may-keep` | G9 · `practice-of-risk#reassess-the-residual` · + `access-is-not-absorption#three-parts-copy` | 2 / 3 |
| D2 b6 | `apt101-fluent-is-not-true` | `grounded#there-is-truth-out-there` · G7 · + `grounded#are-you-sure` · + `module-5-prework#why-the-llm-fabricates` · + `grounded#four-candidates,judge-names-its-own-limit` (second id after its home card) · G8 | 4 + 1 after card / 7 |
| D2 before b8 (reshape, optional) | `apt101-your-craft-is-the-ceiling` | G14 · `agents-that-build-agents#you-make-agentic-happen` | 1 / 2 |
| D2 before b9 (reshape) | `apt101-how-it-could-fail` | G10 | 0 / 1 |
| D3 before evals (new) | `apt101-a-check-is-a-claim` | `evals-as-steering#groundedness-protects-the-floor,steering-raises-the-ceiling` · + `the-gate-is-a-claim#passing-is-not-proof,judge-needs-calibrating` · G15 | 4 / 5 |
| D3 before story map | `apt101-slice-by-learning` | G11 · callback to the D2 pre-mortem's top cause as the first slice's question | 0 / 1 |
| D3 close | `apt101-what-each-of-us-is-for` | `new-human-role-in-the-loop#human-moves-one-level-up` · G13 · G12 · + `ironies-of-automation#trust-and-vigilance` · + `new-human-role-in-the-loop#when-did-you-last-read-one` · + `access-is-not-absorption#what-would-have-to-be-true,one-piece-you-dont-decide` · + `where-is-this-all-going#learn-faster-than-the-model` | 6 / 8 |

**Share:** 42 slides; 26 borrowed as is (62%), 1 more after a home card (64%), 15 new. Five borrowed slides are AE101-only-home, each a stance call for the maintainer; refusing them all drops the share to 50%.

**Notes.** `apt101-work-backwards` draft already carries G1/G2 and the same-question borrow; merge, don't duplicate. Pre-mortem as a one-slide lecture could instead live in the voting page's intro. b11 spares (`prohibitions-stop-taste-steers`, `compounding` § It gets better by being edited) wait for a slot.

## 4. Ids to add in home files

Marker goes directly under the `##`, **above** any `<!--tier:N-->` line (convention in `the-machine-you-just-met.md`). Adding an id stales no eval (`curriculum/CLAUDE.md` § Slide reuse).

| Home | `##` header | Proposed id |
|---|---|---|
| `lectures/compounding.md` | It can only use what someone wrote down | only-what-someone-wrote-down |
| `lectures/compounding.md` | Three layers, one folder | three-layers-one-folder |
| `lectures/agents-that-build-agents.md` | The agent stops where your judgement begins | stops-where-judgement-begins |
| `lectures/agents-that-build-agents.md` | You make agentic happen | you-make-agentic-happen |
| `lectures/practice-of-risk.md` | The best mitigation is the door you don't open | door-you-dont-open |
| `lectures/practice-of-risk.md` | Now the move is to give it less | give-it-less |
| `lectures/practice-of-risk.md` | Reassess the residual, then decide | reassess-the-residual |
| `lectures/where-is-this-all-going.md` | Will your organisation learn faster than the model changes underneath it? | learn-faster-than-the-model |
| `lectures/module-5-prework.md` | Why the LLM fabricates | why-the-llm-fabricates |
| `lectures/module-5-prework.md` | Why grounding fails even when the facts are in context | grounding-fails-in-context |
| `lectures/when-to-split-an-agent.md` | Seams are where it fails | seams-are-where-it-fails |
| `lectures/grounded.md` | Four candidates that fail differently | four-candidates |
| `lectures/grounded.md` | The judge names its own limit (after the home card) | judge-names-its-own-limit |
| `lectures/access-is-not-absorption.md` | Three parts copy, one does not | three-parts-copy |
| `lectures/access-is-not-absorption.md` | What would have to be true for them to switch? | what-would-have-to-be-true |
| `lectures/access-is-not-absorption.md` | The one piece you don't decide | one-piece-you-dont-decide |
| `lectures/evals-as-steering.md` | Groundedness protects the floor | groundedness-protects-the-floor |
| `lectures/evals-as-steering.md` | Steering raises the ceiling | steering-raises-the-ceiling |
| `lectures/the-gate-is-a-claim.md` | Passing is not proof | passing-is-not-proof |
| `lectures/the-gate-is-a-claim.md` | The judge needs calibrating against your own judgement | judge-needs-calibrating |
| `lectures/new-human-role-in-the-loop.md` | The human moves one level up | human-moves-one-level-up |
| `lectures/new-human-role-in-the-loop.md` | When did you last read one yourself? | when-did-you-last-read-one |
| `lectures/ironies-of-automation.md` | Trust and vigilance move in opposite directions | trust-and-vigilance |

Already marked: `context-is-king` (all), `grounded#there-is-truth-out-there,are-you-sure`, `the-machine-you-just-met` (all).

**Before touching `lectures/grounded.md`:** it is modified in the shared working tree. `git diff -- curriculum/lectures/grounded.md`, read whose hunks they are, then follow the same-file collision procedure.

## Maintainer calls

- **AE101 slides (2026-10-06): rewrite for the audience, don't reuse.** The five AE101-only borrows become APT101 slides written for product people, with the AE101 slide as the idea to start from, not as an include. Borrowed share = Agents 101 slides only.
- **Product-craft gaps (2026-10-06): write them,** faithful to what the original authors say. Source pack: `apt101-source-pack.md`.
