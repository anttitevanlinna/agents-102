# Cut sweep — standing report

Sentence-level `check_writing.md` §27 sweep of the shared lecture library. Standing report, one per scope, **overwritten on rerun** (same contract as `arc-read.ae101.md`, `voice-hunt.ae101.md`).

**Last run:** 2026-08-29 · 19 lectures · ~45k words · 5 read-only subagents (Sonnet), orchestrator applied.
**Method:** each agent loaded §27 in full, `_index/writing.leads.md`, and `curriculum/taste-notes.md` **including the counterweights**; opened the registry file for any adjacent `{{prompt:}}` block before judging; reported anchor cost per candidate; flagged factual errors separately from redundancy. Body only, never maintainer or backing blocks.

**Result:** 9 high-confidence, 2 claim-costing, 10 judgement calls, **0 factual flags**. Four files clean: `what-packaging-is` (3,847 words), `why-mostly-right-fails`, `what-keeps-a-long-running-session-going`, `story-of-module-6`.

---

## Applied 2026-08-29

| File · slide | Cut | Commit |
|---|---|---|
| `the-gate-is-a-claim` · Gates decay | *"Passing while missing the intent is a signature, not bad luck."* | see git log |
| `the-gate-is-a-claim` · judge calibration | *"A gate built from the armchair catches the failures you pictured and misses the ones you have."* | " |
| `the-loop-half-filled` · The branch is the permission | *"The ranked findings, the delta against what you know, the weak spot named:"* | " |
| `compounding` · One more compounding turn | lead-in trimmed to *"Spot what's still generic and sharpen it."* | " |

## Open — high confidence, no anchor cost

Maintainer has not ruled on these. All four verified free of claim anchors by the sweep.

1. **`ironies-of-automation`** · `## Trust and vigilance move in opposite directions` — *"The more autonomy the agent earns, the worse a watcher you quietly become."* Third statement of one idea inside a single bullet.
2. **`the-machine-you-just-met`** · `## The machine is steerable` — *"Tell the LLM what you want."* Restates the previous slide's closer with the ranked-list example stripped out; also duplicates its own bullet's first clause.
3. **`new-human-role-in-the-loop`** (agents-101) · `## Two evals, two different jobs` — *"One protects truth. One pushes excellence."* Restates *"Groundedness protects the floor. Steering raises the ceiling"* two sentences up.
4. **`agents-that-build-agents`** · `## The agent stops where your judgement begins` — *"The plan it generates is grounded in the evidence on disk; the decision about which proposals to act on is grounded in evidence the agent does not have."* The paragraph already lands it concretely; the next paragraph lands it a third time, and that one at least pivots into an instruction.
5. **`how-instructions-grow`** · `## Rules have a ceiling` — the clause *", in a way that fits your team workflow"*. Circular after *"for your team to automate right"*.

## Open — costs a claim

6. **`the-loop-has-a-name`** · `## The eval primitive scales unchanged` — *"The shape doesn't change when the org gets big. Only the number of evals, the number of places they sit, and the number of engineers contributing to the kit."* Header says *scales unchanged*; the Intercom bullet above already says it concretely. Retires or re-anchors `shape-survives-org-size`.
7. **`where-the-rule-could-live`** · `## The file is steady; the agent moves` — *"The file is the steady part; the agent is the moving part."* Header says it verbatim, reordered. Retires `file-is-steady-agent-moves`. **Sweep flagged its own doubt:** may be the sanctioned concrete-instances-then-generalisation shape, with the header as topic tag rather than restated claim.

## Open — judgement, medium confidence

`the-map-filled-in` ×2 (both closing abstractions) · `ironies-of-automation` ×2 (*"Both ride on the reps…"*, costs a re-anchor; and bullet 3's opening clause) · `evals-as-steering` (*"It is about the human role changing."*) · `compounding` ×3 · `composing-the-workflow` (*"Its footprint is set by the job, not by the phase line."*, retires `moves-are-not-phase-bound`) · `how-do-you-make-your-system-learn` (forever-file pair) · `the-data-question` (low).

## Surfaced, not carded

`story-of-module-6` — *"The model is good. It is still not 100% deterministic."* The sweep could not decide whether this is one refrain too many or the intended final beat before the hand-off, and declined to rule. Correct instinct on a named-voice piece; needs the maintainer.

---

## What the counterweights refused

~20 defensible cuts declined, citing maintainer blocks and `taste-notes.md`. Recorded because a rerun that proposes them again has lost the counterweights:

- `why-mostly-right-fails` opener (*"Fluency is not evidence. Confidence is not correctness."*) — opener repetition, deliberate.
- `the-loop-has-a-name` · the recognition-before-naming eval beat — no understudy in the corpus.
- `compounding` · the *"Fundamentals outlast tools"* philosophy callout — maintainer-named.
- `what-packaging-is` · tier-3 theory passages — Antti-blessed 2026-08-14/15 with per-line guards.
- `agents-that-build-agents` · *"The kit compounds; the model rotates."* — training's terminal beat.
- `the-gate-is-a-claim` · the independence unifier bullet — restates three items *under a new lens*, which is why it restates them.
- `story-of-module-6` · the whole anaphoric structure — the restatement is the payoff.

## Scope note

Two swept files belong to **agents-101**, not AE101: `compounding` and `new-human-role-in-the-loop`. The file list was built by grepping AE101 module files and ownership was not verified before dispatch. §27 is an all-prose rule so the findings hold, but the audience differs (builder leaders, not engineers) and the *"they use this tool daily"* reasoning behind the tool-explainer class does not transfer. **Next rerun: resolve ownership per file first.**

## Not yet swept

Exercises (40 files), module bodies, supplementaries, references, and the agents-101 library proper.
