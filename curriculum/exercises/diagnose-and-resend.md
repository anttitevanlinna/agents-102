# Diagnose and *package*

**Time:** 60 minutes.

**Session** *(new, "Module 5 worktree session")*

In the worktree at `../<repo>-m5` (set up at module open).

```
/rename m5-diagnose-resend
```

**HOX** You should be in the worktree now. Make sure you are not continuing in the original repo or on its branch.

**What you do:** read the failed run through three failure-mode lenses, then build a verifier against your worst one.

**What you build:** a verifier, a reference, and a plan.md, each built against a failure you actually read.

**The point:** packaging you built against your own failure beats packaging you guessed at.

---

## Phase 1: Read what the failed run did

*10 min*

- You're diagnosing, not fixing. The un-packaged run was supposed to underdeliver. What came back is data, not blame.
- Two places hold the story. The repo's git history (commits on the `m4/<slug>` branch, files modified, branch state, all visible from the worktree) tells you *what* the agent did. That run's session transcript, at the path recorded in `task.md`, tells you *how* it got there, drift and dead-ends included.
- You hold the three lenses. You are not holding the codebase. The agent reads that for you.

Ask Claude to read the recorded transcript path from `task.md`.

{{prompt:diagnose-and-resend-1}}


Confirm the path is right. Then ask Claude to read the repo state on the previous-run branch and the transcript, and walk the work through three failure-mode lenses with quoted moments.

{{prompt:diagnose-and-resend-2}}


## Make Claude show its work, make it dig

- Push back where Claude generalises. If a lens comes back without a quote from the run, send it back for one. The same moment may carry more than one lens.
- This is an agent's account of an agent's work, on a run you weren't watching. Same prior as the repo read in Module 1: assume about 10% of the account misrepresents the run, and you can't spot which tenth by eye. Ask Claude to show you where two or three of its quotes appear in the transcript. If it can't show you, don't trust that quote.

## Phase 2: Match each failure to the check that catches it

*10 min*

- For each named failure, ask: *what validation would have caught this in minutes, not hours?*
- Match the verifier shape to the failure. Drift and context rot fire mid-run, on every spec re-read or window fill, so minute cadence is real there. Plausible-but-wrong fires on output: the work compiles, passes lint, looks right, and is wrong.

Ask Claude to walk each diagnosed failure backwards into the validation that would have caught it.

{{prompt:diagnose-and-resend-3}}


Claude gives the full three-way mapping. Your decision is narrower: which failure cost most, and why the other two pieces belong. Once two or three quoted moments make that clear, leave the rest at summary depth. Phase 3 builds the verifier against the dominant failure; Phase 4 assembles the reference and plan.md.

## Phase 3: Build the verifier for your worst failure

*20 min*

- Pick the verifier shape that matches the failure that cost you most.

- **Background-agent verifier.** Separate Claude session reads the produced work and judges it. Right when the failure was qualitative (style, fit, "did the answer the question").
- **Deterministic shell-hook.** Tests, lint, type-check, compile, custom invariant. Right when the failure has a true-false answer (broke the build, touched the wrong directory). The shell-hook shape IS a Claude Code stop-hook; you will meet the word again if you extend the verifier to fire automatically between runs.
- **Ralph re-feed.** Loop the prompt with a check baked in; the agent re-runs on top of the previous round's output until the check passes. Right when drift was the dominant failure and re-anchoring catches it.

Ask Claude to build the verifier shape that matches your dominant failure, scoped to the task we ran un-packaged. Drop the shape name after the colon, one of: background-agent, shell-hook, Ralph re-feed.

{{prompt:diagnose-and-resend-4}}


Read what Claude proposes. Push back if the verifier covers the wrong shape (a generic test suite when you needed a judge, or the reverse). The fit between failure shape and verifier shape is what you are after. When the shape fits the failure, say *save it.*

## Prove the verifier actually fires

- A built-but-untested verifier is no verifier. The wiring (hook config, file paths, slash-command registration, loop trigger) is fragile, and silent failures cost the next phase. Fire it once before Phase 4.

{{prompt:diagnose-and-resend-5}}

## The reference and plan.md

- **Reference**, what the task is and what done looks like: success criteria, plus pointers to the memory, skills and connectors that matter.
- Written once, before the run, and it stays put while the agent works.
- **plan.md**, the agent's working document: the steps, and where it has got to.
- The agent rewrites it as it goes and re-reads it when the context window fills. Not the plan-mode plan.

## Phase 4: Write the reference and plan.md

*17 min*

Ask Claude to assemble both, scoped to the same task, in conversation.

{{prompt:diagnose-and-resend-6}}

> **Cut the grill when the package is good enough to re-send.** The prompt keeps looking because that is its job. Your threshold is practical: scope, success criteria, constraints, tests, and done are clear enough for the second session. Then say *lock it in.* Until then, neither file should change; push back if the agent rewrites between turns.

## Approve

Say *lock it in.* The agent writes both files.

## Phase 5: Re-send it, packaged

*3 min*

Now the re-send. Same task, packaged this time, and notice the prompt: it shrank while the task stayed the same. The difference is your system, measured in words the prompt no longer needs. The packaging does the explaining; the prompt invokes it.

**Session** *(new, "M5 long-run")*

In the worktree at `../<repo>-m5`. The packaging files live on disk; the worktree's auto-loaded rules (`CLAUDE.md`, `CLAUDE.local.md`) load fresh into the new session. The exercise session can stay open if you want to glance back at the assembly conversation.

```
/rename m5-long-run
```

Fresh context matters here. The exercise session built heavy scrollback (verifier scaffolding, hooks, plan.md drafts); every re-send turn would otherwise pay cache-read on that prefix. A fresh session avoids repeatedly carrying the heaviest context, and the field has a name for this move (Ralph's fresh-sessions camp, Amp's manual-handoff camp; see [What packaging is](lectures/what-packaging-is.md)).

Prefer to stay in the exercise session? Paste this to drop scrollback in-place:

{{prompt:ae101-m5-clear-before-rerun}}

## Send it off

Either way, the re-send prompt below stands alone: Claude finds the packaging in the worktree and reads it cold.

Ask Claude to re-run the same task using the reference, plan.md, and verifier you just built.

{{prompt:ae101-m5-rerun-packaged}}

<!--flag:module:spot-gaps-build-the-loop-->The walk-away report at the close is what Module 6 opens on.<!--/flag:module:spot-gaps-build-the-loop--><!--flag:no-module:spot-gaps-build-the-loop-->The walk-away report at the close is the evidence this session leaves behind.<!--/flag:no-module:spot-gaps-build-the-loop--> Expect partial failures framed as partial successes, *"shipped most of it, hit a snag on X."* RLHF is a big part of why: agreeable answers won the preference round. The contrast with the un-packaged session depends on this report being candid evidence, not encouragement. If the summary reads polished, ask the agent to list the artifacts that didn't ship and quote the verifier output verbatim where it fired. You decide whether to push.

The laptop stays awake and plugged in while it runs (power settings → prevent sleep on power). Same cancel-is-legit rule as the un-packaged session: stopping when the trace is enough is the result. Manual nudges are part of the session; when nudging turns into typing every step, the agent isn't the agent any more, that's a result worth reading.

<!--flag:no-module:spot-gaps-build-the-loop-->
## Bring the worktree's work home

Your `CLAUDE.local.md` and `observations/` have been building in the worktree since the fork; the copies in the original repo stopped there. Ask Claude to copy the worktree's versions back into the original repo and report what changed, so the repo you actually work in holds this sitting's work. Nothing needs deleting.
<!--/flag:no-module:spot-gaps-build-the-loop-->

<!-- maintainer -->

**View summary:** You read the un-packaged run through three failure lenses, build the checks and durable task artifacts that would have caught its misses, then re-send the same work. The contrast makes packaging visible on your own code rather than as advice.

**The 10% recall in `## Make Claude show its work, make it dig` is the prior's third and last statement, by design.** `orient-and-introspect.md` § *Read the self-report, then spot-check it* sets it on the agent's read of a repo (maintainer-attested there), `plan-mode-done-right.md` § Key Concepts applies it to a plan, and this bullet applies it to a run transcript the student did not watch. Three instances, roughly two modules apart, a different artefact each time, each carrying its own action: progression-with-variation, not the refrain `check_pedagogy.md` §9b bans. This is the beat that earns it. In M1 and M2 the student can read the whole artefact by eye, so the prior costs nothing there; here it is the only affordable check, and asking the agent to locate its own quotes is the only one available when the agent holds the codebase and the student holds the lenses. The imperative *assume* and the *about* hedge travel from M1 and are load-bearing: the prior is an instruction to the reader, and a floor form would be a claim about the world. Do not harden it, and do not restate it as a general claim about agents. M1's double-hedge (*"could be more or less"*) stays M1's, so `check_slides.md` §7's number-plus-retraction sub-item does not fire here.

**`## Check both files are for the agent, not you` is cut (2026-08-25, Antti: little value add).** The slide told an engineer how to glance at two files — the check-stuff teaching his 2026-08-25 cut pass removes on sight — and its push-back tells (generic-advice reference, project-plan-shaped plan.md) duplicate judgement the grill-note above already exercises. The flow runs prompt → grill-note → Approve. Do not restore; if a cohort ships agent-facing files written for humans, the tell belongs in the Phase-4 prompt, not a body slide.

**Emphasis:** Bold is limited to title-page labels, widget chrome, the Phase 3 verifier-shape menu handles (**Background-agent verifier** / **Deterministic shell-hook** / **Ralph re-feed**), the Phase 4 stop-gate handle, and the two definitional handles on *The reference and plan.md* (**Reference** / **plan.md**). All other body prose stays unbolded.

**Quality:** compendium-audited 2026-08-24 (writing@1abb84c6 story@1abb84c6 technical@1abb84c6 behavior@ca5e5c5 pedagogy@1abb84c6 strategy@1c765f2 slides@1abb84c6)
- judges @1abb84c6: writing PASS (drift-recheck), story PASS (drift-recheck), technical PASS (drift-recheck), behavior PASS, pedagogy PASS (drift-recheck), strategy PASS, slides PASS (drift-recheck)

**Word count:** ~760 words body.

**Leap test (Monday):** three observable verbs the engineer exhibits on their own codebase next working day:
- builds a verifier scoped to one diagnosed failure mode before trusting a delegated run's output, instead of re-reading the whole return
- writes a task-scoped reference + plan.md before any multi-hour delegated run, pointing at the codebase rules rather than restating them
- fires the verifier once as a smoke test before relying on it, so the check is checked before it gates anything

**Placement:** the re-send is Phase 5 of this exercise, not a module-level beat; the module file must not carry a second one. The closing lecture follows this exercise. This file owns only its own `**Time:**` line; the module total is computed — `node scripts/calculate-time.js learn-from-the-test`.

<!-- backing -->

Claims
- `artefact-is-data-not-blame` · vision · "The un-packaged run was supposed to underdeliver. What came back is data, not blame." ← none-owed
- `two-places-hold-the-story` · vision · "The repo's git history … tells you *what* the agent did. That run's session transcript … tells you *how* it got there" ← none-owed
- `you-hold-the-lenses-not-the-codebase` · vision · "You hold the three lenses. You are not holding the codebase." ← none-owed
- `quote-beats-summary` · vision · "If a lens comes back without a quote from the run, send it back for one." ← none-owed
- `ask-what-would-have-caught-it` · vision · "*what validation would have caught this in minutes, not hours?*" ← none-owed
- `three-verifier-shapes` · detail · "**Background-agent verifier** … **Deterministic shell-hook** … **Ralph re-feed**" ← kim-on-cherny
- `shell-hook-is-a-stop-hook` · detail · "The shell-hook shape IS a Claude Code stop-hook" ← cc-hooks-docs
- `untested-verifier-is-no-verifier` · vision · "A built-but-untested verifier is no verifier." ← none-owed
- `reference-pins-the-task` · vision · "what the task is and what done looks like" ← none-owed
- `plan-md-is-mutable-not-plan-mode` · vision · "The agent rewrites it as it goes and re-reads it when the context window fills. Not the plan-mode plan." ← none-owed
- `built-beats-guessed` · vision · "packaging you built against your own failure beats packaging you guessed at" ← none-owed

Sources
- three-failure-modes `[checked:2026-08-01 result:CAVEAT due:cohort]` (no URL — house vocabulary) — [house canonical] goal drift / context rot / plausible-but-wrong. **Not convergent practitioner vocabulary** (corrected 2026-08-01): only *context rot* is a term the field actually uses, with a study behind it and unprompted use by Ronacher and Osmani. *Goal drift* and *plausible-but-wrong* return zero named practitioners. The phenomena are well attested; the names are largely ours, which is all this exercise needs — it applies the lenses, the pre-read carries the colour. fallback: none needed; the corrected framing is the fallback.
- kim-on-cherny `[checked:2026-07-02 result:OK due:2026-08-21]` https://getpushtoprod.substack.com/p/how-the-creator-of-claude-code-actually — [practitioner analysis] Kim on Cherny (2026-02-21): Cherny reaching for background-agent / agent-stop hook / Ralph re-feed. **The three-shape taxonomy is Kim's synthesis, not Cherny's own**, and is absent from the Orosz interview. The exercise offers them as a menu the student picks from, which is the form the evidence supports. **Due within the month.** fallback: keep the menu, drop the attribution — the shapes stand as options without a name behind them.
- cc-hooks-docs `[checked:2026-05-15 result:OK due:cohort]` https://code.claude.com/docs/en/hooks — [capability] Stop hooks fire on the named event with no model discretion; live-tested against this repo's `.claude/settings.json` on Claude Code 2.1.142. fallback: describe the shape without naming the hook event.
- ronacher-align-then-run `[checked:2026-08-01 result:CAVEAT due:none]` https://lucumr.pocoo.org/2026/1/14/minijinja-go-port/ — [practitioner direct] Ronacher's align-then-run move — ask the agent how it would validate, then negotiate the validation loop — which Phase 2 inverts by asking backwards from a failure to the validation that would have caught it. **Scoped to the practice, never the vocabulary:** he does not use *reference*, *plan* or *verifier* as names for any of it (full-text and 14-post archive check, 2026-08-01). Durable account, `due:none`. fallback: teach the inversion without the attribution; the move stands on the student's own artefact.

Frameworks
- Three failure modes · [borrow:none] · law:three-failure-modes · ← three-failure-modes
- Align-then-run, inverted · [borrow:none] · law:none · ← ronacher-align-then-run
- Three verifier shapes · [borrow:none] · law:eval-judge-verifier-gate · ← kim-on-cherny
- Reference + plan.md · [borrow:none] · law:none · ← none — two of the three pieces; **the triad is our synthesis, and the closing lecture says so.** Do not restore "Ronacher's three-pattern" here

Stance `[stance:2026-08-01 level:L1]`
- holds: that the three pieces work, on the evidence of the room building them against failures they diagnosed themselves. That is the only warrant this exercise needs and the strongest one available to it — a student's own artefact outranks a citation for the purpose of earning a name.
- contested: the vocabulary, on every side. Two of the three failure-mode names are ours; the three-shape verifier menu is Kim's synthesis rather than Cherny's taxonomy; the triad is our combination. **None of that weakens the exercise, and all of it would weaken a lecture** — which is exactly why the naming happens in the closer and the building happens here.
- would-move-it: a verifier shape becoming standard practice that this menu omits, or the field settling on names for goal drift and plausible-but-wrong. Either edits Phase 3's menu or the pre-read's vocabulary, not the exercise's spine.

OODA
- question: has a fourth verifier shape entered practice, and have the two house failure-mode names been coined by anyone outside this curriculum?
- roster: Boris Cherny, Hamel Husain, Geoffrey Huntley, Armin Ronacher, Addy Osmani, the Claude Code hooks changelog
- last-run: 2026-08-01

<!-- /backing -->

**Failure modes + diagnostics:**
- **Phase 1 generalised diagnosis** — student says "the agent drifted" without quoting moments. Diagnostic: prompt requires quoted artefact moments; if Claude returns only summaries, re-run with explicit *"quote a specific commit / file change / scrollback line"*.
- **Phase 1 dominant-failure dodge** — student picks the failure mode they already know how to fix, not the one that cost the most. Diagnostic: ranking is by impact, not familiarity. Trainer push: *"which one cost the run the most? Build the verifier for that one."*
- **Phase 2 prescription-jumping** — student rushes past the question to start building. Diagnostic: Phase 2 produces three named validations; if the conversation moved to "let me build" before all three, redo.
- **Phase 2 full-map overload** — student tries to inspect all three mappings at equal depth. Diagnostic: no dominant choice after two or three grounded moments. Trainer push: *"Which failure cost most? Leave the rest at summary depth."*
- **Phase 3 verifier-shape mismatch** — student picks the shape they're most comfortable building (usually shell-hook), regardless of failure. Diagnostic: does the verifier actually fire on the failure mode it targets? If not, re-scope.
- **Phase 3 verifier as test suite** — student rebuilds the existing test suite as their verifier. Diagnostic: the verifier targets agent-produced work, with a quality bar that ISN'T already in CI. Trainer push: *"if the existing tests caught it, the run wouldn't have failed. What's missing from the existing tests?"*
- **Phase 4 reference-as-codebase-rules** — student rewrites `CLAUDE.local.md` content into the reference. Diagnostic: the reference is task-local, lives in a task-scoped folder, references the codebase rules instead of restating them.
- **Phase 4 plan.md-as-project-plan** — student writes a Gantt-shaped plan instead of an agent-mutable document. Diagnostic: the plan.md has a "current phase" line the agent updates and a "decisions log" the agent appends to. If neither, redo.
- **Phase 4 grill overrun** — student keeps answering after the package is ready for the second session. Diagnostic: the latest question changes only wording or implementation detail, not scope, success criteria, constraints, tests, or done. Trainer push: *"What would the next answer change? If nothing material, lock it in."*
- **Phase 5 polished-report acceptance** — the packaged run reports back well and the student takes the report for the result. Diagnostic: the student can summarise what the agent said and not what the verifier returned. Trainer push: *"run the verifier yourself. What does it say?"* Body already names the risk; this is the trainer's version of it.
- **Phase 5 re-send from the wrong place** — student pastes the re-send into the exercise session, or into the original repo rather than the M5 worktree. Diagnostic: the fresh session's rules or paths don't match what Phase 4 wrote. Fix: check `pwd` before the paste; the worktree is the whole point of the split test.

**Plug points:**
- Student's own M4 artefact (Phase 1 source material)
- Repo's existing CI / hook / pre-commit conventions (Phase 3 shell-hook integration)
- Task-scoped folder convention (Phase 4 file paths)

**Decision points (pacing):**
- **Phase 1 >20 min** — over-diagnosis; force ranking and a single dominant.
- **Phase 1 <10 min** — under-engagement; diagnostic is whether quoted moments appear. If summary-only, redo with quote-enforcement.
- **Phase 3 verifier doesn't fire** — re-scope. The verifier is the load-bearing artefact for the re-send; spend extra time here over Phase 4 if needed.
- **Phase 4 >25 min** — reference becoming a manifesto. Cap at half-page reference + half-page plan.md.
- **Whole-room mood below 7** — learning through contrast isn't landing. Check Phase 1 specificity. If diagnoses stayed generic, the contrast in Phase 2 has nothing to bite into.

**Watch-fors (cross-phase):**
- Failure-mode collapse — student treats two failure modes as synonyms without explaining what each reveals. Phase 1 asks for that distinction; a shared quoted moment is fine.
- Verifier gold-plating — student tries to build a 5-shape verifier covering everything. M5's verifier is shaped against ONE failure; M6 expands the kit.
- Three-pattern naming pre-empted — if Phase 2 or Phase 3 names "Ronacher's three-pattern," the closing lecture has nothing to add. Watch for the term-of-art leaking into trainer push-backs.
- Reference vs. rules drift — students familiar with `CLAUDE.local.md` may try to rewrite it as the reference. The reference is task-local; rules are repo-local.

**Send-off mechanism (Phase 5, owned by this file):**
- Fresh Claude Code session in the existing M5 worktree. The exercise session may stay open for reference.
- Reference artefact + plan.md + verifier live on disk. The re-send prompt finds the reference and plan.md in the task-scoped folder Phase 4 proposed, reads the verifier's invocation off plan.md's verifier line, and the fresh session auto-loads the worktree's rules.
- Same close-the-laptop or stop-when-you've-seen-enough rule as M4.

Pre-cohort open items: see `curriculum/trainings/agentic-engineering-101/pre-cohort-todos.md`.
