# Map the gaps, read your stack

**Time:** 35 minutes.

**Session** *(new, "Module 6 worktree session")*

Open a new Claude Code session in the existing M5 worktree (`../<repo>-m5`), no fork. M5's session may still be running the re-send. Leave it if that is the right call; M6 starts by reading both sessions from disk. Before M6 edits files or cuts rules, decide whether the M5 session is done enough, should be stopped, or should be treated as the partial artefact.

**What you do:** diff two sessions of the same task, then read your history for the work you repeat.

**What you build:** a ranked gap map, one stale rule cut, and a diagram of the work that recurs across your stack.

**The point:** two runs are enough to place every lesson.

---

## Phase 1: Diff the two sessions, rank the gaps

*20 min*

- You hold two sessions of the same task. The un-packaged session sits on the `m4/<slug>` branch recorded in `task.md`; the packaged re-send sits on the `m5/<slug>` branch recorded in `plan.md`. Both are visible via git refs, since the worktree shares `.git` with the original repo.
- Read from the recorded coordinates, not a branch or transcript search. Both sessions recorded their transcript paths: M4 in `task.md`, M5 in the protected `Run coordinates` block at the top of `plan.md`.
- You hold the contrast; the agent reads both sessions off disk. You are not tracing git refs by hand. Point it at the coordinates and let it pull both sessions side by side.

Ask Claude to read both sessions side by side and name where packaging caught, where it missed, and what new shapes of drift it introduced.

{{prompt:spot-gaps-build-the-loop-1}}

## Read the contrast, push back where it generalises

- Skim past the opening plan. Claude will likely open with a four-dimension plan summary (*"I'll start with repo state across the m4/ branch, then..."*) before any quoted evidence lands. The contrast moments are what you're reading for.
- Push back where Claude generalises. Two sessions means two bodies of evidence, and the teaching is in the contrast. If Claude writes *"the agent drifted on goal"* without naming which commit, which file, which scrollback line, re-run the prompt with the quote rule re-asserted.
- Expect over-credit on the packaging. A fair push-back is *"name one thing the verifier missed, concretely."* Close with a ranked gap list of three to five items and a dominant gap that shapes the rest of this phase.

## Cut one stale rule the diagnosis killed

- Two sessions of the same task were the first real stress-test of `./CLAUDE.local.md`. Diagnosis surfaced rules that turned out wrong, never fired when they should have, or fired and made the session worse.
- Cleaning is the compound move that keeps the loop fast. Rules-files have a half-life. Adding rules is only half of it; subtracting the dead ones is the other half.

Ask Claude to cut one rule the two-session diagnosis killed, or to say so and stop if all rules held.

{{prompt:spot-gaps-build-the-loop-2}}

## Say go, unless the cut spreads past the one rule

- Claude may pause before editing `./CLAUDE.local.md`. A named config file looks risky to modify. If it asks, just say go.
- Push back if the diff touches more than the one rule you flagged. *"In place"* is loose wording, and Claude may rewrite more than the one stale rule. One rule cut, no more.

## Phase 2: Find the work you repeat across your stack

*15 min*

- Look wider than the two sessions. The dominant gap came from one task. The kinds of work you repeat run across everything you do, and most of them never get looked at directly. This is your stack. How wide you look, and what you choose to map, is yours.
- Read your own history first. Your Claude Code sessions from every project are sitting on disk, and few engineers ever read them back.

## Scan your history for the work that recurs

> **Fast operator?** Lump the next two prompts into one go. Paste them one after another in the same conversation, study the shapes, and let the answers land together. The two moves don't change.

> **Cut the scan when the top patterns are clear enough to use.** The prompt keeps looking because that is its job. Narrow it whenever you like, or say *tell me what you've found so far*. Once two or three recurring kinds of work are clear enough to draw and compare, move on. You do not need a complete inventory.

Ask Claude to scan your sessions across every project and group the kinds of work that recur.

{{prompt:spot-gaps-build-the-loop-study}}

## Draw your top work-shapes as diagrams

- What comes back is the work you do over and over, grouped and ranked. Read for the few at the top you actually repeat. How far you take this is yours.
- A recurring kind of work has a shape. Steps in order, a branch, a loop back. Drawn, the shape is easier to recognise than described.

Ask Claude to draw your top few work-shapes as simple diagrams.

{{prompt:spot-gaps-build-the-loop-shapes}}

> **Want to see the shapes, not read them?** Mermaid comes back as text. Say *give me this in HTML* to open them in a browser.

## Sidestep: check your menu against the field's

Optional. Your shapes are drawn and the gaps are ranked. This one widens the menu you pick checks from.

- Where a primitive lines up with a shape you repeat, that pairing is a skill candidate for the kit you grow later.

Ask Claude to name the checking primitives the field already runs and rank the ones that fit your gap.

{{prompt:spot-gaps-build-the-loop-primitives}}

Expect the list to look familiar: test-writing, browser-testing, PR-building, lint and typecheck gates, compile and build, smoke-test on a real path, code-review, git-diff inspection, schema validation, eval suites for agent outputs. Your list won't be exact. The recognition is the point. The primitives Claude names are the ones your codebase already runs.

**What happened:** A one-screen gap map across memory / verifier / skill, one stale rule cut in place, and a diagrammed map of the work that recurs across your stack. The shapes stay in this session's scrollback; you build the handoff prompt from them.

## Decide what crosses back to your main repo

**Note** The M5 worktree holds this module's work: `./CLAUDE.local.md` with the rule you cut, `observations/`, and M5's packaging. Your main repo's copies stopped at the fork, stale rule and all. What crosses back is yours: copy the worktree's versions over, take the parts you want, or leave them where they are.

<!-- maintainer -->

**View summary:** You compare the un-packaged and packaged runs, rank what the second attempt still missed, cut one stale rule from your rules-file, and draw the work that recurs across your stack. The stack-map feeds the closing handoff move.

**Emphasis pass (2026-07-09, Antti-directed "go very lightly on the bold"):** bullet leads de-bolded to plain; widget/label chrome and blockquote callouts untouched, per `theory-plan.md § Slide format — emphasis budget` + `check_slides.md §9`. (The three bolded shape handles that survived that pass left with the 2026-08-01 authoring-sequence cut.)

**Fast-operator batch path (accepted):** *"Fast operator?"* labels the opt-in path for someone who wants both scan prompts in one conversation; it does not set the room's pace or the exercise's completion bar. The separate scan callout is the working-memory stop gate. Preserve both callouts and the label.

**Quality:** compendium-audited 2026-08-19 (writing@ef34a71 story@ba5ccf5 technical@1c765f2 behavior@ba5ccf5 pedagogy@ba5ccf5 strategy@1c765f2 slides@0dea491e)
- judges @0dea491e: writing PASS, story PASS, technical PASS, behavior PASS, pedagogy PASS, strategy PASS (verify-refuted), slides PASS
- re-audit @796293b 2026-05-31: writing PASS, pedagogy PASS — steer-callout gained a premature-completion recovery line (§48/§62) + a render-as-HTML affordance callout after the shapes prompt (§50/§53/§62 hold)

**Word count:** ~740 words body.

**Primary Bloom's level:** Analyze (Phase 1 diff + Phase 2 stack scan) + Evaluate (the rule cut).

**Placement:** Phase 1 carries the two-session diff and the rule cut. Phase 2 is the stack scan, depth the student's, closing on an optional primitives sidestep that nothing downstream depends on.

**Mood target:** practitioner fluency — *"I know how to test, I know how to learn, I know what my stack repeats."* Watch-for: compliance-feel (student treats the scan as paperwork) or credibility-performance (*"we map our stack like the pros do"*). Both steal the mood.

<!-- backing -->

Claims
- `diff-two-runs-of-one-task` · vision · "diff two sessions of the same task, then read your history for the work you repeat" ← none-owed
- `read-from-recorded-coordinates` · vision · "Read from the recorded coordinates, not a branch or transcript search." ← none-owed
- `you-hold-the-contrast` · vision · "You hold the contrast; the agent reads both sessions off disk." ← none-owed
- `push-back-where-claude-generalises` · vision · "If Claude writes *\"the agent drifted on goal\"* without naming which commit, which file, which scrollback line, re-run the prompt with the quote rule re-asserted." ← none-owed
- `expect-over-credit-on-packaging` · vision · "A fair push-back is *\"name one thing the verifier missed, concretely.\"*" ← none-owed
- `rules-files-have-a-half-life` · vision · "Adding rules is only half of it; subtracting the dead ones is the other half." ← none-owed
- `sessions-are-on-disk-and-unread` · vision · "Your Claude Code sessions from every project are sitting on disk, and few engineers ever read them back." ← none-owed
- `recurring-work-has-a-shape` · vision · "Steps in order, a branch, a loop back. Drawn, the shape is easier to recognise than described." ← none-owed
- `primitives-will-look-familiar` · vision · "The primitives Claude names are the ones your codebase already runs." ← none-owed
- `review-and-compound-across-two-runs` · borrowed · "two runs are enough to place every lesson" ← klaassen-how-every-codes

Sources
- klaassen-how-every-codes `[checked:2026-07-30 result:CAVEAT due:2027-01-30]` https://every.to/source-code/compound-engineering-how-every-codes-with-agents — [practitioner direct, vendor venue] Shipper & Klaassen (Dec 2025). The Review and Compound step definitions live on **this** page, not on the Definitive Guide, and in the source Plan and Work belong to the agents while Review and Compound belong to the engineer — which is exactly the split this exercise runs. Dec 2025, outside the 6-month window: framework origin, not fresh evidence. fallback: teach the two-run review without the name; the move stands on the student's own artefacts.
- curran-2x `[checked:2026-05-25 result:OK due:2026-10-16]` https://ideas.fin.ai/p/2x-nine-months-later — [practitioner direct, vendor venue] Curran (2026-04-16), Intercom's tiered review with auto-approval at the lowest tier. Metrics vendor-self-reported. Backs the checking-primitives menu as something orgs actually run, not a list we invented. fallback: keep the menu, drop the org names.
- geoffintech-charles `[checked:2026-05-25 result:OK due:2026-11-25]` https://x.com/geoffintech/status/2042002590758572377 — [practitioner direct] Geoff Charles (Ramp), 2026-04-09; the Dojo skill marketplace. Verified via `observations/ramp.md` plus the X oEmbed workaround. kb:observations/ramp.md **Scoped narrowly:** this backs that a large org runs a shared checking kit, not any specific count. The 350-skill figure is not asserted in this exercise's body and should not be reintroduced from the register. fallback: drop the name; "solo builders and large orgs run the same primitives" survives without it.

Frameworks
- Compound engineering, Review and Compound · [borrow:none] · law:the-compound-ladder · ← klaassen-how-every-codes
- Diff across two runs · [borrow:none] · law:double-loop-learning · ← cultural-vocab — the M4-to-M5 contrast extended; the second loop is cutting the rule, not fixing the run
- Checking-primitives menu · [borrow:none] · law:eval-judge-verifier-gate · ← curran-2x, geoffintech-charles

Stance `[stance:2026-08-01 level:L2]`
- holds: that orgs and solo builders converge on a recognisable set of checking primitives — tests, lint, type-check, review, diff inspection, eval suites. This is the safest convergence claim in the corpus because the primitives predate agents entirely; the exercise is asking the student to recognise their own toolchain, not to accept a finding.
- contested: **the menu is not convergent practitioner vocabulary.** Two named orgs plus an unnamed category does not clear the L3 bar. The body makes no such claim — it says the primitives are the ones the student's own codebase already runs, which is weaker and true.
- decided: **no convergence verb attaches to this menu.** The recognition framing carries the whole warrant. Do not reintroduce *"convergent practitioner vocabulary"* from any register. The beat ships as an optional sidestep, so nothing downstream may load-bear on the menu existing.
- would-move-it: a primitive entering common practice that the menu omits. The list is deliberately unranked and open, so an addition edits one line rather than the phase.

OODA
- question: what checking primitives have entered common practice since this menu was written, and does the recognition beat still land for a room whose toolchain has moved?
- roster: Darragh Curran and the Intercom engineering blog, Geoff Charles and Ramp, Hamel Husain, Simon Willison, Kieran Klaassen
- last-run: 2026-08-01

<!-- /backing -->
**Leap test (Monday):** three observable verbs the engineer exhibits on their own codebase next working day:
- holds a diagrammed map of the work they repeat across their stack, and reads a new task against it before sending the task off
- cuts a stale rule from their own `CLAUDE.local.md` once a run's evidence shows it never fired or fired wrong, instead of letting the rules-file rot
- reads a run's gaps as a ranked list with the dominant one named, instead of treating every miss as equally worth fixing

**Failure modes + diagnostics:**
- **Phase 1 generalised diff** — student says *"M5 was better"* without quoted moments. Diagnostic: prompt requires quoted moments from BOTH runs. If Claude returns only summaries, re-run with explicit quote enforcement. Echoes M5's Phase 1 diagnostic.
- **Phase 1 packaging-over-credit** — student treats the packaged run as fully solved and skips the *"what packaging missed"* beat. Diagnostic: the M5 run did drift somewhere; if Phase 1 outputs zero misses, Claude is over-crediting. Trainer push: *"name one thing the verifier missed, concretely. Quote the scrollback."*
- **Phase 2 wider-look sprawl** — the study scan reads the whole stack and can throw back a wall. The body stop gate is two or three recurring kinds of work clear enough to draw and compare. Depth is the student's, not a mandate to catalogue. If a student drowns in the scan, point at the ranked head and move on.
- **Rule-cut dodge** — student accepts *"every rule still holds"* without testing it against the diagnosis. Diagnostic: did any gap in the ranked list trace to a rule that fired wrong or never fired? If yes, the cut was available and got skipped.

**Plug points:**
- Student's M4 un-packaged artefact + M5 packaged re-run artefact (Phase 1 source material; both already in the repo + session transcripts).
- Repo's skill home convention if any (install paths + team-kit route → `training-architecture.md` § Skills).
- Sponsor-stated or team-stated code-review conventions (feeds Phase 2 judge's quality bar, if the shape picked is LLM-judge).

**Decision points (pacing):**
- **Phase 1 >20 min** — over-diffing. The diff is data for the rule cut, not an essay. Force a rank and move on.
- **Phase 1 <10 min** — under-engagement. Check if Claude returned only summaries; re-run the prompt with quote enforcement if so.
- **Phase 2 study + shapes run long (>15 min)** — the wider look is a light pass, not a full inventory. Study reads the ranked head; shapes draws two or three. If it eats the clock the student is cataloguing; use the body stop gate and skip the sidestep.
- **Whole-room mood below 7** — practitioner fluency isn't landing. Check Phase 1 specificity: did the diagnosis name gaps with quoted moments from BOTH runs? If it stayed generic, the read didn't close.

**Watch-fors (cross-phase):**
- **Verifier-as-eval terminology leaking** — the closing lecture names evals with full weight (verifier = judge = gate = eval). Phase 2 can use the plain words (verifier, judge); save the explicit naming for the closer.

**Pre-cohort open items:** `curriculum/trainings/agentic-engineering-101/pre-cohort-todos.md`.
