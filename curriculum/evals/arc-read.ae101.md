# AE101 sequential arc read: latest report

One-context cold read in student order (prework → M1…M6, every linked lecture, exercise and pre-read at its point of encounter). Finds arc-level problems per-file audits are structurally blind to. Sibling of `voice-hunt.ae101.md` (per-file voice).

**Latest run 2026-09-06.** Two chained readers in student order: prework → M3, then M4 → M6 with the first reader's running notes as its memory. Every finding went to three adversarial refuters (text · precedent · design); a finding survived only if at most one refuted it. Module moods: one reader per half, unrefuted. Tics and practitioner dose: tallied across the whole arc.

## Findings: open (2026-09-06)

Card-shaped = student-facing body, or a prompt students copy, still carrying a decision Antti has not made. Maintainer-side = apply directly and report as landed: maintainer blocks, canon, and supplementary or reference pages under the §26 standing exemption.

### A1 · seam · severity 3 · card-shaped

Files: `curriculum/exercises/threat-model-with-stride.md:89`; `curriculum/trainings/agentic-engineering-101/earn-the-trust.md:26` (LO); `curriculum/prompts/ae101-m3-sharpen-skill.md:33`; `curriculum/exercises/author-test-strategy-skill.md:34,42` with `curriculum/prompts/author-test-strategy-skill-2.md:15`.

Quote (threat-model, line 89): *"The hardening decision becomes a test case in the test strategy."*

Claim: three M3 surfaces promise a feature-scoped invocation (threat-model's set-up line; the module LO *"invoke it on the security-tested feature"*; the sharpen prompt's *"the moment the skill was invoked on the security-tested feature"*), but author-test-strategy-skill invokes the skill *"on this codebase"*, *"on the code as it stands in this worktree"*, and never mentions the feature or the ADR. The strategy doc carries both versions (the M3 table row, line 245: feature; M3 in detail, line 340: whole codebase, *"rather than on the security-tested feature"*). M2's plan was approved, not executed, so the feature exists as plan + map + ADR, not code; the whole-codebase version is the coherent one, and the three promise lines overstate what the next exercise does.

Fix direction: pick the whole-codebase version and retune the three promise lines (threat-model set-up, module LO, sharpen prompt) to what the authoring exercise does; or, if the feature-scoped invocation is wanted, add one clause to the invoke prompt naming the feature and the ADR's threat as a test case. Reconcile the strategy table row in the same pass (that half is maintainer-side).

### A3 + B3 · vocabulary · severity 3 · card-shaped (one card, two copies)

Files: `curriculum/lectures/the-whole-map.md:12` (M2 opener); `curriculum/lectures/the-far-half.md:12` (M4 opener, derived from the same canvas); figure sub-label in `curriculum/figures/map-engine*.md:65`.

Quote (both lectures, line 12): *"Tests, checks, reads, judges: everything that pushes back on the work before you accept it."*

Claim: the registry (`curriculum/vocabulary.md:37`, Antti 2026-09-05) embargoes *judge* in the agent-evaluates-output sense, noun and verb, before the M5 closer, and names an M2-era bullet as the shape to fix. The Verification bullet lists *judges* as a check type on the first map the student sees, and again verbatim at the M4 opener, which is the copy the student holds when the-gate-is-a-claim earns the word two beats later. The figure's checking-loop sub-label reads *"read · judge · gate what ships"*. The same sentence appearing verbatim two modules apart is also a re-teach of the shape the recap-bullet cut (2026-08-25) removed elsewhere. Absorption's *"read, judged, and merged"* is the human verb and stays.

Fix direction: treat the sentence as one source and re-derive both copies in one pass; swap the noun list to check types that need no earning (tests, checks, reads, hooks, review, or a second read / a critique); leave the figure label under the registry's map-labels carve-out or swap it the same way. The direction is the registry's; the replacement noun is the open call.

### A4 + B7 · vocabulary · severity 2 · maintainer-side (supplementary and reference pages; apply directly)

Files: `curriculum/trainings/agentic-engineering-101/supplementary/agentic-engineering-progression.md:37`; `curriculum/trainings/agentic-engineering-101/reference/claude-code-for-engineers.md:652` (module index) and `:341` (§22); `curriculum/trainings/agentic-engineering-101/supplementary/the-context-ceiling.md:99` (closing aside); `curriculum/trainings/agentic-engineering-101/supplementary/verification-asymmetry.md:7`.

Quote (progression, line 37): *"the gate that judges the result is part of it, and a session can run it end to end."*

Claim: embargoed words leak on pages linked from M1, M2 and the M4→M5 gap. The progression supplementary (M1 pre-read) has *"the gate that judges the result"*; the reference (M2 Prework link) has *"§§ 13–15 (verifier as eval)"* in its module index and *"The skill is the thing that catches the gap, judges the output"* in §22; the context-ceiling's closing aside says *"write the evals"*; verification-asymmetry's Wei paragraph says *"the feedback signal training and eval loops run on"*. *eval* is embargoed until `composing-the-workflow` § Eval (registry line 65, *don't pre-plant*), *judge* until the M5 closer (line 37). Three pre-M6 *eval* leaks in total, all on supplementary or reference pages.

Fix direction, one sweep: progression *"the gate that checks the result"*; reference *"verifier"* alone in the M5 index row and *"checks the output"* in §22; context ceiling *"write the checks"* or drop the clause from the aside; verification-asymmetry *"training and checking loops"*.

### A7 · vocabulary · severity 2 · maintainer-side after the dissent (card-shaped only if the prompt moves)

Files: `curriculum/prompts/extract-the-task-shaping-rule-3.md:11`; `curriculum/exercises/close-the-ticket.md:120` (backing block).

Quote (prompt, line 11): *"Suppose I wanted these rules to drive automated ticket refinement in the future"*

Claim: *refinement* sits outside AE101 body vocabulary, with one sanctioned survivor, the simulated `backlog-refinement-rules.md` filename in where-the-rule-could-live's lede. This M2 prompt body says *"automated ticket refinement"*, and close-the-ticket's backing block asserts that this very prompt *"describes backlog work in plain words"*, a justification that does not match the text it defends. One of the two must move.

Dissent (precedent, one of three): commit 7f1b192c (Antti, 2026-08-14) rewrote prompt -3 to *"automated ticket refinement"* on purpose, in the same pass that made the lede simulate a named `backlog-refinement-rules.md` (where-the-rule-could-live's maintainer block stamps that lede Antti-worded). The close-the-ticket note itself licenses a later pass earning the term at M2, and that pass happened. On this reading the prompt stays and the stale string is the *"plain words"* clause in close-the-ticket's backing block.

Fix direction: amend the backing note to register the prompt as the second deliberate survivor (maintainer-side, apply directly). Rewording the prompt instead (*"drive automated backlog splitting"*) re-opens Antti's own wording and would be a card.

### A9 · re-teach · severity 1 · card-shaped

Files: `curriculum/trainings/agentic-engineering-101/getting-going.md:58` (Key Concepts); `curriculum/exercises/orient-and-introspect.md:53`.

Quote (getting-going, line 58): *"(`/context` is oldskool; ccstatusline, or ask Claude to set up the built-in status line.)"*

Claim: the same status-line aside, joke included, appears in orient-and-introspect and again in the module's Key Concepts recap twenty minutes later. A KC recap restates claims; restating a tool-tip parenthetical makes it read as a line the training is fond of.

Fix direction: keep the aside in the exercise where the beat is taught; the KC bullet drops the parenthetical and keeps *"Context is what you put in it."*

### A10 · vocabulary · severity 1 · card-shaped

File: `curriculum/exercises/close-the-ticket.md:52`.

Quote: *"The loop that started with a failing test closed."*

Claim: M1's *loop* is orient → fix → close → compound (Key Concepts, closer). Exercise 3 declares the loop closed one step early, before compound runs; Exercise 4 then closes it and the M1 closer lands *"You just ran the same loop"*. In the module whose one job is installing the loop, the word should not name a different loop.

Fix direction: say what closed, the ticket or the fix landing where the team reads, not *"the loop"*.

### B5 · contradiction · severity 1 · maintainer-side (canon; apply directly)

Files: `bosser-strategy:content-strategy-agentic-engineering-101.md:142` (Woven rule 3) and `:266` (Mood arc); `curriculum/trainings/agentic-engineering-101/learn-from-the-test.md:138` (maintainer block, the body's stance).

Quote (strategy, line 142): *"the nag writes the verifier"*, glossed there as the feeling of what's missing being the verifier's spec.

Claim: both strategy sentences say M5 converts the residue with the nag writing the verifier; the body's stance (Antti, 2026-08-14) is that the nag does not write the spec on its own, the worry is tested against the return, and the artefact adjudicates. Canon lags the body, and the strategy line is the one a future judge will cite against it.

Fix direction: amend both strategy sentences to the body's stance: the worry is tested against the return, the artefact adjudicates, and the check that would have decided it is the one to build.

### B13 · contradiction · severity 1 · maintainer-side (maintainer block; apply directly)

Files: `curriculum/trainings/agentic-engineering-101/getting-going.md:96` (accept-note); `curriculum/exercises/walk-and-send-off.md`; `curriculum/trainings/agentic-engineering-101/spot-gaps-build-the-loop.md`.

Quote (getting-going, line 96): *"M4's subtraction work lands on an expectation this bullet is there to break."*

Claim: M4 performs no subtraction: walk-and-send-off fills gaps and its optional tidy-up reorganises `observations/`; nothing is cut. The subtraction lands at M6 (*"Cut one stale rule the diagnosis killed"* + *"Rules-files have a half-life"*). The M1 note's justification names the wrong module; the arc itself is fine.

Fix direction: re-point the accept-note from M4 to M6's rule cut.

## Refuted 2026-09-06: do not re-file

- **A2, promise (M2 walk-down callback missing from `skills-from-the-frontier`).** Precedent + design: Antti's commit 54577f39 (2026-09-03) cut the slide-1 callback as factually wrong (no skill reached the room; the prompt asks three questions), and the Pocock credit lands student-facing at `push-back-on-the-plan.md:83`. Residue is maintainer-side bookkeeping: `curriculum/vocabulary.md:39` still reads *"named in `skills-from-the-frontier`"* and the strategy's §306 / §554 lag the cut; tidy directly.
- **A5, tic (*earns its keep / itself*, ten instances).** Precedent + design: the 2026-07-09 thinning holds; ten is a counting-method delta (prompt bodies and a frontmatter `context:` label now counted). The prompt-body hatches are `check_prompts.md §36`'s canonical null-case example and `reference/prompt-anatomy.md` quotes them verbatim; the house threshold word at M2's *save-if-earned* face and M3's *Earned trust* mood is the design.
- **A6, callout density (`compound-and-close-1` practitioner roster).** Precedent + design: the roster line is Antti's (9999018e, re-touched deliberately at 2f0c8a26), covered by the 2026-07-09 Klaassen ruling, and is the mechanism that puts the credit inside Claude's compound summary rather than in prose; prompt text is agent-read (`check_student_facing.md §2b`), not a body mention.
- **A8, re-teach (*cage of no-statements* in the-context-ceiling).** All three lenses: both lines landed in one Antti-directed commit (70e56df9) as slide plus supplement echo; the supplementary's § More rules, worse edits already carries the attention-tax mechanism the fix asked for; the phrase appears in two student-facing files total.
- **B1, reveal-early (the-2-frontiers bullet 2 pre-answers the closer).** All three lenses: bullet 2 is 6cb6c6e3 (Antti, 2026-09-02), authored with the closer as one pair (*"the closer now answers the question the opener asks"*); the strategy withholds the frame from the module-head Big Idea only, and the opener's watch-for guards bullet 3's two questions, which bullet 2 does not answer.
- **B2, reveal-early (verification-asymmetry slide 3 pre-empts M5's verifier).** Precedent + design: the page is the canon's M4→M5 gap read arguing *check more* against Mollick (strategy § Pre-reads before M5; `theory-plan.md:437`); *verifier* is not embargoed (M4's own body says *"no verifier"* twice), the page never names the three-pattern, and the strategy judge PASSed the M4 line against the same sentence.
- **B9, seam (personal-first-then-PR link owed at M5 / M6).** Precedent + design: the M6 soil slide is the strip's only spoken home (Antti 2026-08-15, *do not add siblings*); M5's done-done close (`learn-from-the-test.md:35`) and M6's optional challenge already carry the crossing; the strategy row cited is design-side, not a student promise.
- **B6, vocabulary (*workflow skills* in `walk-and-send-off-2`; *agentic workflow* in clean-code-is-steering).** All three lenses: `check_student_facing.md §2`, ordinary engineer vocabulary, registry presence is not evidence a term is unearned; prompt bodies are agent-read; the M6 row earns the composed-skills sense only, and the same loose register already stands in M2 body.
- **B10, callout density (*no plan.md, no verifier, no reference artifact* three times in M4).** Text + design: LO4 is the first appearance of *un-packaged* in the training and the enumeration is the definition that makes the LO cold-readable (`check_slides`); test-and-learn's maintainer block marks the enumeration deliberate.
- **B8, tic (*shape* density in diagnose-and-resend).** Precedent + design: the *"useful drift"* ruling below stands; *verifier shapes* is a registry house coinage and the M5 menu's own noun; line 69 and prompt 5 call back to the `Shape:` field, and M6's *work-shape* is a different compound.
- **B11, re-teach (skill definition on composing-the-workflow's footprint slide).** All three lenses: the maintainer block rules bold **skill** as one of three permitted handles (Antti, emphasis pass) and the bullet as the once-earned move = skill bridge; the registry's wording is lifted from the slide, not the reverse.
- **B12, promise (the reach × calibration payoff twin owed an M6 home).** All three lenses: the promise chain below records the miss as canon-side and why the closer's expression frontier does not discharge it; `theory-plan.md:65` rules the twin design-side; the-gate-is-a-claim's accept-note keeps it deliberately withheld.

## Refuted in earlier runs: do not re-file

- **Closer pays the frame with additive examples only (2026-09-03).** Subtraction lives in the rule cut and the second-loop figure's *add a rule · cut a rule* by Antti's 2026-09-02 ruling; the canon assigns the frame to the closer's first slide and the mechanisms elsewhere.
- **Story's cut benediction sits directly before the closer's imperatives (2026-09-03).** The module places the Human close between them, a deliberate ten-to-fifteen-minute human round; and the cut benediction was second-person credentialing, which the closer's imperatives are not.
- **Klaassen dose + duplicated pre-read list (2026-07-09).** Maintainer decision, kept. Covers the `compound-and-close-1` roster line (A6 above).
- **Self-charity recipe re-teach (2026-07-09).** The self-critique move (ask the skill for its weakest part, push back) lives at M3, in the earn-the-trust LO and `author-test-strategy-skill.md`; M6 carries none.

## Promise chain

Promises made about M6 earlier in the arc or in the canon, traced to M6 (checked 2026-09-03; the 2026-09-06 refuters re-tested the personal-first-then-PR link and the payoff twin against this list, B9 and B12 above). Landing: M5's *"Module 6 reads the packaged session: subtler misses, subtler drift"*; fork-the-worktree's *"After Module 6 you decide what to merge back"* (→ `read-your-stack.md` § Decide what crosses back); the bring-or-scramble *"Your call"* (→ the module's two rescue callouts); M5's test → learn → encode; the Sutton close (→ the-2-frontiers' *"The model's frontier moves without you"*); LO3's *pass rate, not a pass* (→ the Eval slide, even with the deck's rate bullet cut); M1's two questions (→ opener and closer); M2's dashed checking loop (→ *The checking loop, drawn solid*); how-instructions-grow's *take it out* (→ *Cut one stale rule the diagnosis killed*); where-the-rule-could-live's *Agents build agents* (→ the handoff lecture's title); the M2 double loop and M3 control loop (→ figures, recognition by picture, canon-designed).

Canon-side misses with no student tease, standing as written: the reach × calibration *frontier moves outward* payoff the M5 accept-note says is owed a new M6 home (M6's frontier is the expression frontier, a different claim; `theory-plan.md:65` rules it design-side); the Intercom anchor at the eval naming (the Eval slide carries no anchor, and the strategy doc agrees); the worktrees callout at the scheduled-agents slide.

Chain findings inside the arc, both in the open ledger: M3's feature-scoped invocation promise against the whole-codebase invoke (A1); the M1 accept-note crediting M4 with the subtraction that lands at M6 (B13).

## Tics

Counts are the 2026-09-06 whole-arc tally, student path, prompt bodies and frontmatter included where the label says so.

| Phrase | Count | Standing |
|---|---|---|
| *Your call.* (sentence) | 5 | the designed bring-or-scramble closers; M6 has none, right for the terminal module. Never vary. |
| *your call* (lowercase, in-sentence) | 2 | ordinary use |
| *You decide.* | 1 | diagnose-and-resend's report line; leave |
| *earns its keep / itself* | 10 | holds at the 2026-07-09 thinning (earn-the-trust is title owner); prompt-body threshold and null-case clauses are `check_prompts.md §36`'s canonical shape (A5 refuted) |
| *…is the move* | 2 | the closer's *"Acting is the move from possibly to I have something"* is Antti's wording; leave |
| *frontier* | 15 | four senses (M1 learning speed and direction, M2/M5 reach × calibration, M3 leading practice, M6 expression); not a tic, watch that a fifth sense does not arrive |
| *shapes* | 57 | a loose keyword across three modules that converges at M6 into the drawn work-shapes; useful drift (B8 refuted against this ruling) |
| *judge* (embargoed check sense) | 3 | open: A3 + B3 |
| *eval* pre-M6 | 3 (2 on prework → M3, 1 on M4 → M5) | open: A4 + B7, all on supplementary / reference pages |
| *eval* M6, earned | 8 | the earned home |
| *workflow* pre-M6 | 5 | ordinary engineer sense (B6 refuted) |
| *workflow* M6, earned | 6 | the earned home |
| *cage of no-statements* | 2 | slide + supplement echo, one Antti-directed commit (A8 refuted) |
| *Assume about 10%* | 3 | tallied; no finding |
| *Let's go.* / *Go.* kickers | 2 | tallied; no finding |
| one-word / aphorism kickers (*Go.* / *Your turn.* / *The training closes.*) | 3 | 2026-07-09 aphorism-closer density ruling stands |
| *traces are data* / *trace is the artefact, evidence, result* / *is data* | 6 | tallied; no finding |
| *kit* | 15 | registry term; tallied, no finding |
| *practice* (noun) | 5 | tallied; no finding |
| *candidate* | 12 | tallied; no finding |
| *X is a claim, not Y* | 4 | tallied; no finding |

The 2026-07-09 rulings on *"Authoring without invocation is theatre"*, *"chew on"*, and traveler / tourist stand.

## Practitioner dose (2026-09-06 tally, names per file on the student path)

`run-the-first-experiment.md` 8 · `compound-and-close.md` 6 · `plan-mode-done-right.md` 5 · `skills-from-the-frontier.md` 5 · `the-context-ceiling.md` 5 · `learn-from-the-test.md` 5 · `the-gate-is-a-claim.md` 4 · `getting-going.md` 3 · `ironies-of-automation.md` 3 · `what-packaging-is.md` 3 · `composing-the-workflow.md` 3 · `agentic-engineering-progression.md` 2 · `claude-code-for-engineers.md` 2 · `earn-the-trust.md` 2 · `clean-code-is-steering.md` 2 · one each in `prework.md`, `painting-the-picture-with-the-llm.md`, `the-machine-you-just-met.md`, `when-a-plan-is-good.md`, `push-back-on-the-plan.md`, `how-instructions-grow.md`, `verification-asymmetry.md`, `reading-the-return.md`, `spot-gaps-build-the-loop.md` (module), `story-of-module-6.md`. Every other file on the path carries none.

The two heaviest are the M4 module's pre-read block and the M1 compound exercise's roster line, both maintainer-ruled (2026-07-09 Klaassen ruling; A6 refuted). No dose finding survived this run.

## Verdicts that HOLD (positive findings; do not churn)

- **Artefact chain end to end:** `task.md` + SHA (M4) → *Run coordinates* in `plan.md` (M5) → the M6 exercise reads both from the recorded coordinates; the `./CLAUDE.local.md` rule cut in the m5 worktree → *Decide what crosses back*. No broken links.
- **Beat-to-beat earning inside M6 is real, not asserted:** the rule cut → *Add a rule, cut a rule, sharpen a check, and the number moves or it does not*; *The dominant gap came from one task* names beat 1 back; the shapes stay in scrollback and the handoff prompt starts from them.
- **Eval named after the evidence, measurement-first,** consolidating M5's verifier / judge / gate without a fresh reveal (the 2026-07-09 model).
- **M2 plants pay at M6 without re-teaching:** *take it out* → *Rules-files have a half-life*; the dashed loop → drawn solid; *Agents build agents* → the handoff lecture.
- **The two-frontiers recurrence:** M1's two questions → M6 opener → closer's *"The kit compounds; the model rotates."*, with M5's Sutton close between. The opener's bullet 2 and the closer's answer are one authored pair (6cb6c6e3); cut neither.
- **Story of Module 6 as the permission beat after the work:** numbers → sideways → *Everyone struggles. Surprises happen.* → compounded → *Your turn.* Lands the canon shape.
- **The handoff prompt is the module's runnable move and the shortest lecture in M6.** Keep it this short.
- **Mood curve:** every module lands its canonical target; the M4 → M5 cliff remains the training's best beat; the-gate-is-a-claim's doubt re-opening after the green run stays the arc's most sophisticated mood move.
  - *Mood, one reader's read 2026-09-06 (8 is the bar):* prework 4 against brisk readiness, *"Small steer, small trick. A minute here, another there."*; M1 5 against joyful creation, *"The loop is the shape. The bug today was the excuse."*; M2 5 against grounded competence, *"Approve when the plan reads like your plan."*; M3 4 against earned trust, *"Your staff engineer sees a test-strategy skill tuned to this codebase, your CISO sees a STRIDE decision with an ADR."*; M4 8 against curious readiness, *"You're new to this country. A tourist runs an agent and hopes; a practitioner runs a test and reads the data."*; M5 9 against learning through contrast, *"The diagnose-and-re-send you just ran was exactly this move: measure where the session actually is, then aim the next leg from there."*; M6 8 against practitioner fluency, *"There is no last turn. Each session surfaces the next gap. Each gap proposes the next move. Each move makes the next session cheaper. The kit compounds; the model rotates."* One reader, no refuter, no persona. The story judge's persona traces (the `story@<sha>` pin on each module's Quality row, mood scored per phase and at close, 8 or above) are the record until a story judge re-scores; the four sub-8 numbers do not move the curve.
- **Metaphor systems:** hierarchical, no cargo-class valence collisions.
