# Map the gaps, cut the rule

**Time:** 20 minutes.

**Session** *(new, "Module 6 worktree session")*

Open a new Claude Code session in the existing M5 worktree (`../<repo-name>-m5`), no fork. M5's session may still be running the re-send. Before this module edits files or cuts rules, decide whether it is done enough, should be stopped, or counts as the partial artefact.

**What you do:** diff two sessions of the same task.

**What you build:** a ranked gap map and one stale rule cut.

**The point:** two sessions are enough to place every lesson.

---

## Diff the two sessions, rank the gaps

- You hold two sessions of the same task. The un-packaged session sits on the `m4/<slug>` branch recorded in `task.md`; the packaged re-send sits on the `m5/<slug>` branch recorded in `plan.md`.
- Read from the recorded coordinates, not a branch or transcript search. Both sessions recorded their transcript paths: M4 in `task.md`, M5 in the protected `Run coordinates` block at the top of `plan.md`.

Ask Claude to read both sessions and walk the diff between them.

{{prompt:spot-gaps-build-the-loop-1}}

## Read the contrast, push back where it generalises

- Skim past the opening plan. The agent will likely open with a four-dimension plan summary (*"I'll start with repo state across the m4/ branch, then..."*) before any quoted evidence lands. The contrast moments are what you're reading for.
- Push back where the agent generalises. If the agent writes *"the agent drifted on goal"* without naming which commit, which file, which scrollback line, re-run the prompt with the quote rule re-asserted.
- Expect over-credit on the packaging. A fair push-back is *"name one thing the verifier missed, concretely."*

## Cut one stale rule the diagnosis killed

- Two sessions of the same task were the first real stress-test of `./CLAUDE.local.md`. Diagnosis surfaced rules that turned out wrong, never fired when they should have, or fired and made the session worse.
- Rules-files have a half-life. Adding rules is only half of it; subtracting the dead ones is the other half.

Ask Claude to cut the one rule the diagnosis killed.

{{prompt:spot-gaps-build-the-loop-2}}

## Approve, unless the cut spreads past the one rule

- The agent may pause before editing `./CLAUDE.local.md`. A named config file looks risky to modify. If it asks, approve.
- Push back if the diff touches more than the one rule you flagged. *"In place"* is loose wording, and the agent may rewrite more than the one stale rule. One rule cut, no more.

<!-- maintainer -->

**Atomic — no phase markers.** One read of two sessions, then one cut; the second move is a consequence of the first, not a phase.

**Session verb is *new* in the same cwd, on purpose (`check_platform_and_boundaries.md` §7c):** the module reads M5's session from outside, so resuming would put the diagnosis inside the self-report it diagnoses. Contamination is the reason, not convention.

**Lean pass (2026-08-25, Antti-directed M3/M6 shorten, free hands):** the session widget is two sentences (open in the M5 worktree; the wait / stop / accept-partial decision), and the module's rescue callout carries the fuller triage. Cut, do not restore: *"Both are visible via git refs, since the worktree shares `.git`…"*; *"You are not tracing git refs by hand."*; *"Two sessions means two bodies of evidence, and the teaching is in the contrast."*; *"Cleaning is the compound move that keeps the loop fast."*; *"This is your stack."*; *"How far you take this is yours."*; *"The recognition is the point."*

**View summary:** You compare the un-packaged and packaged runs side by side, quote where the packaging caught and where it missed, rank what the second attempt still left open, and cut one stale rule from your rules-file that the two-session diagnosis killed.

**Emphasis pass (2026-07-09, Antti-directed "go very lightly on the bold"):** bullet leads plain; bold only on widget / label chrome, per `theory-plan.md § Slide format — emphasis budget` + `check_slides.md §9`.

**Declined at the 2026-09-03 polish pass (list shown to Antti, no veto):** *The point* line stays as written; it is scoped to the exercise's own two sessions, a corpus we control, so `check_writing.md` §21's world-claim test does not fire. The Plug-points entry follows the training-wide convention of naming the in-training artefacts an exercise consumes; whether that convention should be renamed is a corpus question (`check_pedagogy.md` §44), not this file's. The two lead-ins (*Ask Claude to read both sessions…*, *Ask Claude to cut the one rule…*) were carded and approved the same pass; `check_prompts.md` §38 does not re-file on them. *A named config file looks risky to modify.* stays: it tells the student why the pause is reasonable, so *approve* is a judged call (`check_student_facing.md` §26). Judges should not re-file any of these.

**Quality:** compendium-audited 2026-09-04 (writing@4589f1d5 story@54577f39 technical@4589f1d5 behavior@289b45a3 pedagogy@54577f39 strategy@4e0370bc slides@4589f1d5)
- judges @4589f1d5: writing PASS (2 todos see instances/ae101--exercise--spot-gaps-build-the-loop.writing.json), story PASS, technical PASS, behavior PASS, pedagogy PASS, strategy PASS, slides PASS

**Word count:** ~420 words body.

**Primary Bloom's level:** Analyze (the two-session diff) + Evaluate (the rule cut).

**Placement:** Beat 1 of the three-beat M6 (2026-09-02): the two-session diff and the rule cut, directly after the opener. The stack scan is its own exercise, `read-your-stack.md`, in beat 2.

**Mood target:** practitioner fluency — *"I know how to test, I know how to learn."* Watch-for: compliance-feel (student treats the diff as paperwork) or credibility-performance. Both steal the mood.

**Leap test (Monday):** three observable verbs the engineer exhibits on their own codebase next working day:
- cuts a stale rule from their own `CLAUDE.local.md` once a run's evidence shows it never fired or fired wrong, instead of letting the rules-file rot
- reads a run's gaps as a ranked list with the dominant one named, instead of treating every miss as equally worth fixing
- reads a packaged run against the un-packaged one before crediting the packaging, and names what the verifier missed in quotes, not summaries

**Failure modes + diagnostics:**
- **Generalised diff** — student says *"M5 was better"* without quoted moments. Diagnostic: prompt requires quoted moments from BOTH runs. If Claude returns only summaries, re-run with explicit quote enforcement. Echoes M5's Phase 1 diagnostic.
- **Packaging over-credit** — student treats the packaged run as fully solved and skips the *"what packaging missed"* beat. Diagnostic: the M5 run did drift somewhere; if the diff outputs zero misses, Claude is over-crediting. Trainer push: *"name one thing the verifier missed, concretely. Quote the scrollback."*
- **Rule-cut dodge** — student accepts *"every rule still holds"* without testing it against the diagnosis. Diagnostic: did any gap in the ranked list trace to a rule that fired wrong or never fired? If yes, the cut was available and got skipped. Trainer push: *"take the top gap on your list: which rule should have caught it, and did it fire?"*

**Plug points:**
- Student's M4 un-packaged artefact + M5 packaged re-run artefact (the diff's source material; both already in the repo + session transcripts).

**Decision points (pacing):**
- **Diff >20 min** — over-diffing. The diff is data for the rule cut, not an essay. Force a rank and move on.
- **Diff <10 min** — under-engagement; same diagnostic as the generalised diff.
- **Whole-room mood below 7** — practitioner fluency isn't landing. Check the diff's specificity: did the diagnosis name gaps with quoted moments from BOTH runs? If it stayed generic, the read didn't close.

<!-- backing -->

Claims
- `diff-two-runs-of-one-task` · vision · "diff two sessions of the same task." ← none-owed
- `read-from-recorded-coordinates` · vision · "Read from the recorded coordinates, not a branch or transcript search." ← none-owed
- `push-back-where-claude-generalises` · vision · "If Claude writes *\"the agent drifted on goal\"* without naming which commit, which file, which scrollback line, re-run the prompt with the quote rule re-asserted." ← none-owed
- `expect-over-credit-on-packaging` · vision · "A fair push-back is *\"name one thing the verifier missed, concretely.\"*" ← none-owed
- `rules-files-have-a-half-life` · vision · "Adding rules is only half of it; subtracting the dead ones is the other half." ← none-owed
- `review-and-compound-across-two-runs` · borrowed · "two sessions are enough to place every lesson" ← klaassen-how-every-codes — borrowed cadence with the house noun; deliberately not verbatim Klaassen (`student_facing` §21b).

Sources
- klaassen-how-every-codes `[checked:2026-07-30 result:CAVEAT due:none]` https://every.to/source-code/compound-engineering-how-every-codes-with-agents — [practitioner direct, vendor venue] Shipper & Klaassen (Dec 2025). The Review and Compound step definitions live on **this** page, not on the Definitive Guide, and in the source Plan and Work belong to the agents while Review and Compound belong to the engineer — which is exactly the split this exercise runs. Dec 2025, outside the 6-month window: framework origin, not fresh evidence — `due:none` on the dated-origin variant, since a step definition's publication does not expire and the body never claims it as current practice. fallback: teach the two-run review without the name; the move stands on the student's own artefacts.

Frameworks
- Compound engineering, Review and Compound · [borrow:none] · law:the-compound-ladder · ← klaassen-how-every-codes
- Diff across two runs · [borrow:none] · law:double-loop-learning · ← cultural-vocab — the M4-to-M5 contrast extended; the second loop is cutting the rule, not fixing the run

Stance `[stance:2026-09-02 level:L1]`
- holds: that two runs of one task are enough to place every lesson, and that a rules file needs subtraction as much as addition. House positions, carried as positions; the student's own artefacts are the evidence.
- contested: nothing external. The borrowed cadence (Review and Compound) is attributed to its source and deliberately not verbatim.
- would-move-it: a cohort whose two-run diffs come back generic — that would be a prompt defect, not a stance defect.

OODA
- question: none standing. The exercise asserts nothing about the field.
- roster: none.
- last-run: 2026-09-02

<!-- /backing -->
