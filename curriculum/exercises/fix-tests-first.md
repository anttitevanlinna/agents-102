# Prove the bug, then ship the fix

**Time:** 25 minutes.

**What you do:** fix the bug you brought from prework, tests-first. Ship the PR.

**What you build:** a failing test that proves the bug, the smallest fix that passes it, and a shipped PR.

**The point:** pushing back is core work.

---

## Write the failing test and fix the root cause

- **Tests-first, root-cause-driven.** The failing test is what makes the fix checkable. Without it, the fix is a guess that happens to compile. Write the test first, watch it fail, then fix the cause, not the symptom.
- No plan mode here. On a trivial bug, plan mode is overhead.

> **Small fix, small test.** A trivial bug wants one failing test and a tight fix, not a suite and a refactor. If Claude starts spinning up plenty of tests, or the change creeps past the bug, that's sprawl. Steer it back to one test that proves the bug and the smallest fix that passes it.

Drop your bug after the colon.

{{prompt:fix-tests-first-1}}

## Read the diff and push back on a line

- The agent runs the loop; you read the result. The agent writes the failing test, watches it fail, fixes the code, watches it pass. Read the diff. If a line isn't what you'd have written, push back. Quote the line and say why. The agent yields if you push hard enough, so its agreement settles nothing. Whether your argument was actually better is your call.
- Your own wording matters. No pre-made prompt for the pushback. The compound step reads this session's scrollback, so your push-back is what becomes a rule.

## Interrogate the fix for a deeper layer

- When the agent says done, ask whether the change is the root cause or a layer above it. The first cut usually fixes what makes the test pass; the deeper cut asks whether the test was pointing at the right thing. Name what a deeper edit would touch and see what Claude defends. The exchange is where root-cause discipline shows up, not in the fix itself.

**Optional.** Skip if your test already pins the right behaviour and the fix does exactly that, nothing deeper to interrogate. Otherwise, ask Claude to interrogate the fix and name what's still surface.

{{prompt:fix-tests-first-2}}

**Optional.** Send only if the interrogation surfaced a deeper layer worth a second TDD pass.

{{prompt:fix-tests-first-3}}

**Optional.** Once the fix is in, dig into Claude's view of code quality and structure. Ask Claude: *did you make it better? Why yes. Why no.* You steer; might take a few nudges.

## There is always a next plausible answer

- You can always dig deeper on the root cause with the LLM. There will be a next plausible answer, because the LLM will always try to find what you asked for. A passing test you trust is what makes a layer real; when to stop digging is your call.

## Ship the PR

- How far you let Claude drive Git is your choice. Ask Claude to commit, push a branch, and open the PR.

**What happened:** A real PR shipped. A failing test landed in the codebase before the fix did. The diff got read, at least one line got pushback, and the root-cause interrogation ran before the second TDD pass.

Hand off to the ticket close.

*For those finishing early: chatter about making sure the LLM doesn't fake tests or write tests that just pass. How do you catch that efficiently?*

<!-- maintainer -->

**View summary:** You bring a real bug through a tests-first repair: prove it with a failing test, fix the root cause, interrogate the diff, and ship the PR. The artifact is working code whose evidence you have read and challenged.

**Emphasis pass (2026-07-09, Antti-directed "go very lightly on the bold"):** One handle kept bold: **Tests-first, root-cause-driven** at its naming moment; all other bullet leads de-bolded. Widget chrome (`**Time:**`, `**What you do:**`, `**What you build:**`, `**The point:**`, `**What happened:**`, `**Optional.**` labels) and the blockquote callout untouched, per `theory-plan.md § Slide format — emphasis budget` + `check_slides.md §9`. Wording near-verbatim; no claims added or cut.

**Declaration slide (2026-08-07, Antti-directed):** *There is always a next plausible answer* is a deliberate claim-shaped heading — the one non-imperative heading in this file, and that is the point: a claim among phase labels is what makes a declaration land inside an exercise. Do not flatten to a command verb; `check_student_facing.md` §17's verb rule covers do-sections, and this section names the machine-nature the interrogation just exhibited rather than asking for an action. Header truth guard: the body says *try to find*, never *finds* — do not strengthen. No bold; the file keeps its single handle. Second face of the produce-something prior in this file, and the pair is deliberate: the diff bullet says the agent *yields* under push (so its agreement settles nothing), this section says it always *produces* another plausible answer under digging. Same machine-nature, two different student moves, neither a restatement of the other — do not collapse them. Far-half naming is `reading-the-return.md` slide 1 (*The closing summary is not the artefact*), which reuses the *plausible* vocabulary planted here. Frame is the maintainer's own, near-verbatim.

**Quality:** compendium-audited 2026-08-12 (writing@bc8e9e6 story@bc8e9e6 technical@1c765f2 behavior@bc8e9e6 pedagogy@bc8e9e6 strategy@1c765f2 slides@bc8e9e6)
- judges @bc8e9e6: writing PASS, story PASS, technical PASS, behavior PASS, pedagogy PASS, strategy PASS, slides PASS
- maintainer-reviewed 2026-04-28 (Antti, full AE101 pass)
**Meta (trainer):**
- **Primary Bloom's level:** Apply (tests-first fix) + Analyze (read the diff against what you'd write).
- **Atomic — no phase markers.** One TDD loop, start to PR; splitting it would name beats the student does not experience as separate. Line 3 is authored, not generated.
- **Placement:** second of four exercises on the same bug / same repo. The band assumes prework's trivial-bug spec: under 50 lines, wrong error message / off-by-one / wrong total.
- **Prompt progression note:** the commit / push / PR move is intentionally prose-led, not a fenced prompt block. At this point the Builder is already in the repo with the fixed diff in context; the student can ask in their own words. Do not add a paste-ready commit prompt unless the exercise design changes.

<!-- backing -->

Claims
- `tests-first-root-cause-driven-is-one-discipline` · vision · "**Tests-first, root-cause-driven.** The failing test is what makes the fix checkable." ← none-owed
- `without-a-test-the-fix-is-a-guess` · vision · "Without it, the fix is a guess that happens to compile." ← none-owed
- `no-plan-mode-on-a-trivial-bug` · vision · "On a trivial bug, plan mode is overhead." ← none-owed
- `agent-runs-the-loop-you-read-the-result` · vision · "The agent runs the loop; you read the result." ← none-owed
- `your-own-wording-matters` · vision · "No pre-made prompt for the pushback." ← none-owed
- `ask-whether-its-the-root-cause` · vision · "When the agent says done, ask whether the change is the root cause or a layer above it." ← none-owed
- `first-cut-fixes-what-makes-the-test-pass` · vision · "The first cut usually fixes what makes the test pass; the deeper cut asks whether the test was pointing at the right thing." ← none-owed
- `always-a-next-plausible-answer` · vision · "There will be a next plausible answer, because the LLM will always try to find what you asked for." ← none-owed — machine-nature observation, maintainer frame near-verbatim; observation-grade by design, no training-cause claim.

Sources
(none. TDD is named implicitly and owes attribution by name only; every other claim is the exercise's own design stance.)

Frameworks
- Test-driven development · [borrow:software engineering] · law:none · ← cultural-vocab — named implicitly in body as *tests-first*, never as a branded method; the rule the student seeds into `./CLAUDE.local.md` is their own preference, not ours
- Five whys · [borrow:manufacturing] · law:none · ← cultural-vocab — the root-cause-versus-a-layer-above beat, unnamed in body on purpose
- The compound ladder · [borrow:none] · law:the-compound-ladder · ← none — the push-back the student writes here becomes the rule at the compound step

Stance `[stance:2026-08-01 level:L1]`
- holds: TDD, which needs no defending, and one thing that does — that running the discipline *with an agent* is a second discipline. That second claim is the exercise's own and rests on nothing but the room's experience of it, which is the right warrant for a first-module exercise.
- contested: nothing evidential. **The interesting tension is pedagogical and already resolved in the body:** the student writes their own push-back with no prompt supplied, which is slower and worse-scaffolded on purpose, because the words have to be theirs when the compound step reuses them.
- would-move-it: nothing in the field. Agents becoming reliable enough that reading the diff stops paying would move it, and that is the training's own bet in reverse. Note the bet is on reading a small diff and arguing ONE line, not on exhaustive review: line-by-line as the unit of trust does not scale with agent output and is not what this exercise asks for (2026-08-12). Anything restoring *"read it line by line"* is describing a different, worse exercise.

OODA
- question: none standing on the field. Watch instead whether rooms actually write their own push-back or wait for a prompt that is deliberately absent.
- roster: none external — cohort debrief notes.
- last-run: 2026-08-01

<!-- /backing -->
**Themes planted** (content-strategy § "Recurring themes"):
- **Theme 4 (self-aware, grain of salt)** — the diff push-back; Claude explains what it wrote and the student verifies. Compounding theme lands in Ex4 (`compound-and-close`).

**Watch-fors:**
- **Tests-skipped.** Student pastes the bug and Claude jumps straight to a fix. Common failure mode. Trainer push: *"back up — what's the failing test that would prove this bug exists?"* If the repo has no test infrastructure on this path, log *"no verifier here"* and name it as the first Quality-Gate entry (landing in M4).
- **Diff rubber-stamp.** Student says *"looks fine"* under 30 seconds. Trainer push: *"find me one line you'd have written differently — not wrong, just different."*

**Decision points:**
- **Runs over 35 min.** Bug wasn't trivial. Let it complete; trim the compound exercise, flag for follow-up. Note for M2 — student benefits more from plan-mode-at-depth than average.
- **Finishes under 15 min.** Picked something too small. Offer second bug, or use saved time to revisit the introspection move.
- **Repo has no test infrastructure.** Exercise ends without test verification. Log *"no verifier on this path"* in the `./CLAUDE.local.md` rule — real finding, not exercise failure. M4 picks it up.

**Plug points:**
- Student's own bug (surfaced by Claude in prework).

**Arc:**
- Picks up from: `orient-and-introspect` — fix happens in the window the student just mapped.
- Hands off to: `close-the-ticket` — the shipped PR is what the close-out note links to, and the ticket read there feeds the compound sweep that follows it.

**Leap test** (per `check_pedagogy.md` rule 45 — three observable Monday-morning outcomes the engineer exhibits on their own codebase by the next working day):
1. **Writes a failing test that proves the bug exists before touching the fix** on a real backlog bug. Falsifiable: commit history shows a test commit before or with the fix commit, with the test demonstrably reflecting the bug.
2. **Pushes back on at least one line in a diff** before merging. Falsifiable: session scrollback or commit body shows a line-level objection or "I'd have done X" before the merge.
3. **Runs root-cause interrogation before accepting Claude's first fix** when the first answer feels surface-level. Falsifiable: scrollback shows a *"what's the root cause?"* or *"are you sure?"* turn before any commit.
