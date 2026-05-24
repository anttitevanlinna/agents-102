# Pre-cohort punchlist, AE101 M1–M6

> **CLOSED = DELETE THE BULLET. Not "annotate done." Not "rewrite as smaller follow-up." Not "update with what landed." DELETE.**
>
> Git log is the history. This file is current state. A closed bullet rewritten as adjacent work is a NEW bullet pretending to be progress, surface the new work cleanly under a real section, or don't add it. If the new work isn't pre-cohort scope (M1–M6 done-done), it doesn't belong in this file at all.

Open decisions before the first paying cohort. Module files carry zero TODOs; this is the single tracking surface.

**Item types.** Bullets are open decisions or tactical fixes by default, something has to happen before cohort. Prefix a bullet with **`[watch]`** to mark *currently accepted, no pre-cohort action*, the behaviour may bite us, but we've decided to ship as-is and see. Watch items convert to action items if the cohort run surfaces the failure; otherwise they get deleted like any other closed bullet. Don't let watches accumulate as a dustbin: a watch with no named firing condition is procrastination dressed up.

Sim sweeps and platform-capability checks are not tracked here. The `curriculum-pre-ship-audit` skill auto-fires on touched files; `check_platform_and_boundaries.md` fires on platform claims at content-time. **Per-class verdicts (PASS / REVISE / grandfathered) live in each module's own `**Quality:**` block**, `update-quality.sh` stamps both PASS and REVISE with the instance-JSON path so a successor can grep Quality blocks for state without consulting this file.

## Per-file specific concerns (not caught by auto-fire)

- **`reading-the-return.md` + `learning-through-contrast.md`**, custom-persona sim: dual-mode reader (pre-read + in-room handout) at the M5 openers. Standard Maija/Greg/Jin trio doesn't simulate the dual-mode use.
- **`learning-through-contrast.md`**, cross-file framing alignment with its pre-read (no contradictions, no different vocabulary). Watch-for at L82 of the file already logs this; sim not fired.
- **`the-loop-has-a-name.md`**, custom-persona sim: CTO (vendor-plug risk on Ramp/Intercom anchoring), senior engineer (recognition vs remedial), engineer who never went past M1–M6 (does the long-running-shapes callout grow a need-to-try-now itch).
- **`the-loop-has-a-name.md`**, `/schedule` and `/loop` capability recheck via `claude-code-guide` within two weeks of any cohort date. Delivery-time exercise, not a content-time check.
- **`arc-retrospective.md`**, confirm Agent-tool sub-task read of training-arc artefacts is reliable enough to ground the note. If flaky, route through main conversation with the same quote rule.
- **Worked-example skill triplet** (sharpened-verifier / LLM-judge / gap-finder) for M6 reference library, by engineer archetype. First cohort outputs may seed these; track explicitly so it doesn't fall through.
- **`[watch]` `extract-the-task-shaping-rule-2` save-path ambiguity (M2).** Prompt asks Claude to "propose two-three plausible paths" for the rules file and pick one. Codesearch M2 dry-run (2026-05-24) had the agent integrate the new rules INTO the existing `CLAUDE.local.md` (created at M1's compound), a legit "integrate, don't append" reading, but it means `m2_rules_file` and `m2_claude_local_md` in run-m2.sh's state.json point at the same path. Lemmings runs typically save to a distinct file. **Accepted as-is for first cohort.** Fires if any downstream module prompt (M3 sharpen-skill, M4 walk-and-send-off, M5 diagnose-and-resend, M6 spot-gaps) loads "the rules file" and `CLAUDE.local.md` as separate inputs and silently de-dupes or overwrites, observe whether any module behaves differently when the two paths collapse to one.

### From M5+M6 pre-ship audit 2026-05-15

- **`learn-from-the-test.md` prompt-registry prose, residual `M4 starting point` reference.** `ae101-m5-worktree-setup` L24 still references *the "M4 starting point" commit* as a literal commit message. Borderline per sessions-don't-know-module-names rule. Decide: rename M4 send-off's commit message away from "M4 starting point" so the prompt body can drop the curriculum label entirely, OR leave as-is on the grounds that it's the literal commit message the student set. The `M5/M6 compounding has M1/M3 evidence` leak at L26 closed 2026-05-22.
- **Prompt-body audit, branch/transcript selection.** `diagnose-and-resend-2`, `spot-gaps-build-the-loop-1`, and `arc-retrospective-1` still rely on broad branch greps (`git branch -a | grep 'm4/'` / `m5/`) with no local-vs-remote disambiguation. Current-session exclusion landed on `spot-gaps-1` and `arc-retrospective-1` but not on `diagnose-and-resend-2`. Rewrite prompt bodies under rule-22 approval: disambiguate local vs remote branches, prefer marker-based transcript selection (commit message / send-off prompt / branch slug), exclude the current session for symmetry, and recompile `site/prompts.json`.
- **`what-packaging-is.md` source freshness past the 6-month window.** Klaassen *My AI Had Already Fixed* (2025-08-18) and Sourcegraph Amp `handoff` (2025-10-23) now inline-dated in body 2026-05-22; maintainer block carries explicit re-verify-at-delivery stamps. Pre-cohort: either swap to fresher Klaassen / handoff-camp sources if they have surfaced, OR confirm the dated-as-historical-context framing is acceptable for first cohort.
- **`spot-gaps-build-the-loop.md` (M6 module) source-verification maintainer block.** Source-verification section added 2026-05-22 with URLs for Ronacher / Cherny / Ramp Dojo / Klaassen + verification stamps. Pre-cohort: live re-verify each URL within 6-month window of cohort date.
- **`story-of-module-6.md` Geoff Charles quote.** Source-verification maintainer section added 2026-05-22 (URL + fallback framing + freshness re-check). Pre-cohort: actually open `x.com/geoffintech/status/2042002590758572377` (or paywall-fallback) and stamp.
- **`agents-that-build-agents.md` Ralph→/goal sim re-fire.** Ralph→/goal section added 2026-05-15; three-persona sim (senior engineer / mid-training / CTO) deferred. Before first cohort, fire sim against the new section to verify the platform-arc beat lands without authority-transfer or vendor-plug risk.
- **`agents-that-build-agents.md` skill back-reference name + preamble-suppressor.** Prompt 1 references "the SKILL.md of the skill you authored at Module 6, in `~/.claude/skills/`" without concrete skill name; same sessions-don't-know rule as the m5-worktree-setup leak. Also: punchlist proposed relocating "No preamble" from tail to before the question list. **Sub-decision: live-test once before either edit.** Sister prompt (prework 2) declined the same relocation in commit `87f3b63`; if agents-that-build-agents-1 shows the same non-bloat in live test, decline both edits per precedent.

## From 2026-05-19 cohort run, AE101 / arcticrex (routed 2026-05-20)

Source: [run summary](https://github.com/ArcticRexOrg/ai-training-internal/blob/main/runs/2026-05-19-agentic-engineering-101-arcticrex/summary.md) (synthesized) + [per-module raw files](https://github.com/ArcticRexOrg/ai-training-internal/tree/main/runs/2026-05-19-agentic-engineering-101-arcticrex/modules), prefer the raw files; the aggregator hallucinated several claims (evals "never named", atomic primitives "never taught", M2-plan→M3 "handoff broken"). Comment-back verdict walk-through at `tmp/comment-back-2026-05-19-ae101-arcticrex.md` (local working ref).

Landed in-session 2026-05-20: M2→M3 task-continuity trap (sentence at `plan-mode-done-right.md:71` + bolded sentence at `earn-the-trust.md:8`); M6 atomic-primitives recognition pass at `exercises/spot-gaps-build-the-loop.md:43-53` + new `prompts/spot-gaps-build-the-loop-primitives.md`; prework bundle (what-to-bring section + clickable download link + write-it-down handoff + `<CONTENT_URL>` in download prompt body + effort-rec for prework and M1).

Landed 2026-05-22: M5 plan.md disambiguation (`diagnose-and-resend.md:79` *"not the plan-mode plan; this is the agent's mutable working document"*); M6 eval-as-transferable extension (`the-loop-has-a-name.md:21` *"the same shape fires on any workflow with a quality bar"*); what-packaging-is.md inline dating + freshness stamps.

### Tactical fixes ready for an agent pass

- **Branch hygiene across course renames (M4-surfaced, applies broadly).** Learner reported (M4 12:21Z) that when a course renames a project mid-flow, existing branches carry stale framing. Open question: do we want a `git checkout -b m<N>-<slug>` reset step at module-start to immunize against rename drift? Or accept that branch names carry historical residue and that's fine? Decision item, not auto-applicable. Source: [M4 raw, 12:21Z](https://github.com/ArcticRexOrg/ai-training-internal/blob/main/runs/2026-05-19-agentic-engineering-101-arcticrex/modules/M4.md).

- **M5, `plan.md` disambiguation in Phase 4.** Landed 2026-05-22 as a one-sentence parenthetical at `exercises/diagnose-and-resend.md:79`. Pre-cohort: confirm the disambiguation reads clean on a live walk-through.

- **M6, Phase 2 pacing.** Learner noted (M6 10:28Z) *"Phase 2 takes quite long."* No body change made, per the steer-don't-pre-empt rule (compounded 2026-05-22), a pre-emption-shaped "you'll be here a while" callout would rot the moment the underlying mechanics change. Decision: wait for first-cohort delivery; if pacing pressure still surfaces, add a *steering* callout (notice → ask Claude what's slow → relax the constraint) rather than the expectation-setting line. Source: [M6 raw, 10:28Z](https://github.com/ArcticRexOrg/ai-training-internal/blob/main/runs/2026-05-19-agentic-engineering-101-arcticrex/modules/M6.md).

### Site / renderer (not curriculum body)

- **M6, italic font readability.** Learner reported (M6 10:05Z) *"italic font is hard to read at the moment. Needs size bump or other treatment."* CSS change in `site/layouts/curriculum.css`, bump italic size or restyle (heavier weight, different colour, underline). Touches all italic prose, not just M6. Source: [M6 raw, 10:05Z](https://github.com/ArcticRexOrg/ai-training-internal/blob/main/runs/2026-05-19-agentic-engineering-101-arcticrex/modules/M6.md).

### Structural design conversations (separate sessions, not patches)

- **Three-layer context architecture (company / team / personal, all git-tracked).** Learner's verbatim (M6 10:39Z): *"No professional copies `CLAUDE.local.md` files. The real move: push to repo (git-tracked); for skills, symlink personal `~/.claude/skills` to the repo's `/skills` folder so always-on rules load automatically wherever you work. Local-only files are not a real option for professionals, always git, always."* Current architecture (`training-architecture.md:53-69`) carries team `CLAUDE.md` + personal `CLAUDE.local.md` (gitignored) + user-global `~/.claude/CLAUDE.md`, no company layer, personal layer is gitignored. Open question for the design conversation: is "company" a third layer for AE101's audience, or is the team layer doing both jobs already? The "memory" → "context" rename rides along with this decision. **Scheduled as a separate design session, not a punchlist item to fix inline.** Sources: [M6 raw, 10:39Z](https://github.com/ArcticRexOrg/ai-training-internal/blob/main/runs/2026-05-19-agentic-engineering-101-arcticrex/modules/M6.md) + [M4 raw, 12:39Z](https://github.com/ArcticRexOrg/ai-training-internal/blob/main/runs/2026-05-19-agentic-engineering-101-arcticrex/modules/M4.md) + [summary, "headline disagreements" section](https://github.com/ArcticRexOrg/ai-training-internal/blob/main/runs/2026-05-19-agentic-engineering-101-arcticrex/summary.md).

- **M6 Monday-close reframe vs as-is.** Learner critique (M6 10:47Z): the *"Monday, pick a task your team is sitting on, send it off packaged"* close at `spot-gaps-build-the-loop.md:62` is wrong-shape; should lead with verification primitives. The atomic-primitives recognition pass landed in-session partially addresses the "verification primitives" gap. First-cohort observation item: after the atomic-primitives change runs through one cohort, re-evaluate whether the Monday close still reads wrong-shape. Source: [M6 raw, 10:47Z](https://github.com/ArcticRexOrg/ai-training-internal/blob/main/runs/2026-05-19-agentic-engineering-101-arcticrex/modules/M6.md).

### From 2026-05-21 fact-check on quality-arc + composition build

Built today in response to the now-closed cohort-run items on quality depth-balance and workflow-from-skills composition. Replaced by: `lectures/quality-is-grounding.md` (names the quality arc threaded across the whole training) and `lectures/composing-the-workflow.md` + `supplementary/workflow-composition-lineages.md` (five composition approaches surveyed from named practitioners + Ronacher counter-position; explicit scope note that the curation is partial). New maintainer-block debt below.

- **`/research-review` owed on five OODA findings files before merge to main.** Files: `continuous-research/findings/by-pattern/workflow-composition-{1a,1b,2a,2b,3-confirmation}.md`. Four-persona pass (source-type-auditor, zombie-stat-detector, freshness-checker, evidence-ladder-classifier). The source-type-auditor is the persona that should have caught fan-digest source-laundering on Cycle 1A; firing the review now surfaces any other source-type slippage missed by the 2026-05-21 direct-source verification pass. Pre-cohort, not blocking.

- **First-cohort delivery check on lecture + supplementary URLs.** Every URL in `lectures/composing-the-workflow.md` + `supplementary/workflow-composition-lineages.md` verified live and bylines confirmed 2026-05-21 (Cherny X thread, Pocock README, Yan/Cognition post, Metcalf/Amp post, Amp handoff anonymous-team, Ronacher Final Bottleneck + Pi + Agent Psychosis). Re-verify at delivery date; vendor blogs and X posts move quarterly. Klaassen own-byline freshness is the most likely to drift.

- **Quality is grounding lecture: pin the demoing practitioner.** Body cites the first Agentics Helsinki meetup (fall 2025, Sep 2 at Sitra) as the historical anchor for the 500K-lines-in-weeks demos. Currently sourced from internal practitioner observation, no public URL. Pre-cohort: ping Mikko Alasaarela or the demoing practitioner if a public reference can be added; if not, the maintainer block remains the only verification trail and the body sentence stays as is.

- **Methodology lesson landed at compendium + memory layer.** `check_research_claims.md §1` carries a new sub-clause "Fan-digest source-laundering, open the page before labelling" (added 2026-05-21). Matching compounded entry at `memory/compounded/2026-05-21-research_claims-fan-digest-source-laundering.md`. Not a pre-cohort item; a research-system-process item, captured here for traceability.

## From 2026-05-24 tmux-runner mechanical dry-runs, M1–M4

Source: M1 + M2 + M3 + M4 driven end-to-end via tmux-runner (`curriculum/evals/mechanical/tmux-runner/`) against the lemmings SUT. M1 ran on `bdd0919` (initial commit, tally bug); M2 ran on `f771484` (M1 endpoint, with M1's CLAUDE.local.md in place). M3 ran twice (security-only + full main+quality parallel). M4 ran once with the blocker-deadlock task. M5+M6 entries below are scout-derived from an Explore-agent survey, not from actual runs; flagged as hypotheses to verify when those modules are mechanically run.

**M1 + M2 closed via per-turn assertions in `918b90d` (`run-m1.sh` / `run-m2.sh` `assert_turn()` T1–T9 covers save-gates, file-existence, SAVED-PATH location). M3 runs surfaced no curriculum-side issues against the literal-line scenarios. Save-gate / register-by-design / unconstrained-save-location items from the original dry-run notes accepted as pedagogy and closed.**

### Confirmed from M4 run

- **`walk-and-send-off-4` verb mismatch with the rest of the phase sequence.** `-1` ends with `save the scope as./task.md`, `-3` ends with `persist it:.claude/memory/ for…./CLAUDE.local.md for…`. `-4` ends with `If you propose file moves or renames, cap the proposal at one or two`, verb is *propose*, not *save/persist*. Exercise body line 89 reinforces (*"let Claude propose the actual rearrangement"*) while the same line also says *"the tree settled before [the send-off] does"*, contradictory framing. In the 2026-05-24 mechanical run, Claude proposed two specific one-line additions (ADR pointer in CLAUDE.local.md m3 block; `task-shaping.md` to MEMORY.md), asked *"Want me to make the two additions, or hold for your read?"*; runner sent the next turn instead of approving, both additions never landed. Fix candidate: tighten the prompt's last move to imperative (*"Make the one or two file moves or renames you propose; show me the diff after"*) matching `-1`'s shape. ~1-line change; closes the silent-drop gap in mechanical runs and likely tightens the interactive moment too.

- **`walk-and-send-off-1` candidate format inconsistency.** Exercise body line 27: *"Drop the candidates after the colon, one per line."* Prompt body ends with bare `Candidates:`, no format hint. Mechanical run passed two candidates as a `(1)… (2)…` paragraph; Claude handled it fine but the body's *one per line* constraint wasn't followed. Either drop the body line (Claude does not need the format) or hint at it in the prompt. Minor.

- **`.claude/memory/` gitignore step is a forcing function mechanical runs can skip silently.** Exercise body line 56: *"If `.claude/memory/` is new to your repo, ask Claude to add it to `.gitignore` before any writes."* The mechanical run's lazy-student tail for `-3` told Claude to persist directly without the AskUserQuestion loop; Claude ended up writing one fill to `CLAUDE.local.md` (already gitignored), so the gitignore question never arose. The trap is real for any flow that does write to `.claude/memory/`, `ae101-m4-commit-starting-point` runs `git add -A` and would track the writes. Pre-cohort: confirm interactive flow consistently triggers the gitignore step before any memory write.

### Hypotheses from M5/M6 scout (not from running)

- **`diagnose-and-resend-6` *"lock it in"* save-gate** is the same family as `threat-model-with-stride-3`. Scout-derived prediction: will silently drop `reference.md` + `plan.md` writes in mechanical runs unless an approval literal-text line follows. Verify on first M5 mechanical run.

- **`spot-gaps-build-the-loop-3` uses `AskUserQuestion`** for the second-skill authoring conversation, same shape as `author-test-strategy-skill-1` (which M3 quality side handled via lazy-dump tail). Scout-derived prediction: same workaround applies; verify on first M6 mechanical run.

- **`diagnose-and-resend-4` verifier-shape pick is a real judgment moment** (background-agent / shell-hook / Ralph re-feed). Mechanical battery needs to pin one shape deliberately rather than lazy-dump. Decide which shape the dry-run picks before M5 is run; document the choice.

### Cross-module / meta

- **M3 + M4 orchestrators still report sentinel-PASS without per-turn artifact assertions.** M1 + M2 closed in `918b90d` via `assert_turn()` T1–T9 in `run-m1.sh` / `run-m2.sh`. `run-m3.sh` and `run-m4.sh` are still parallel race-loop / sentinel-completion gated, no per-turn assertions. The M4 Huryn-additions silent-drop class is uncaught at the runner layer; M3 ADR drops would be too if they recurred. Engineering item for `curriculum/evals/mechanical/tmux-runner/`, port the M1/M2 assertion shape into M3 + M4.

## Cross-cutting ops

- **Architecture integrity reference**, write `reference/architecture-under-agentic-velocity.md`: how teams preserve architectural intent while agents make local changes quickly. Survey practitioner patterns (Klaassen / Curran on review structure, Cherny on stop-hooks as architectural enforcement, Ramp's skill marketplace as crystallized convention). Candid about being a survey, not a settled answer. Source: Uncle Bob (Robert C. Martin) on architecture + agentic coding. Separate session.

## Memory / compendium hygiene (out-of-AE101-scope; parked here for visibility)

Surfaced by `/refresh` audit 2026-05-14 (compendiums + compounded scopes). Decisions in this section are gated by an axis decision; until that fires, the cluster stays parked.

**Decision-first cluster (interlocked, pick the axis before doing the splits):**

- **Re-group axis: surface-only or two-layer surface+failure-mode?** Today's compendiums are a hybrid, `check_writing` / `check_student_facing` / `check_sales_copy` are surfaces; `check_platform_and_boundaries` / `check_research_claims` / `check_pedagogy` are really failure-mode buckets. Pick: stay surface-only and let pedagogy/platform compendiums grow unbounded, OR commit to two-layer (surface for hook-loading, failure-mode for rule content).
- **New eval categories: add classes or sharpen existing four?** Pick: add `pedagogy`, `platform-claim`, and possibly `strategy-tie-in` as first-class judges, OR redefine the existing four with explicit domain fences in `curriculum/CLAUDE.md` § Quality-state tagging. Presupposes the axis decision above.

**Schema decision (entrenches with every `/compound` invocation):**

- **Canonicalise wrapped vs flat compounded-entry shape.** 13 of 23 today-entries use a wrapped `name:` + `metadata:` shape `_schema.yaml` doesn't define; 10 use the documented flat shape. One entry uses `type: feedback`, outside the enum `[correction, pattern, decision, taste]`. Pick: (a) update `_schema.yaml` to make the wrapped shape canonical + add `feedback` to enum, OR (b) flatten the 13 wrapped files back.

**Compendium hygiene (does not block the decisions above, but each unlocks the next):**

- **12-claim platform back-audit under new §4b.** Re-verify or strip specificity on the dozen platform claims still in `check_platform_and_boundaries.md §6` + `reference_claude_code_capabilities.md` that predate 2026-04-28 with no re-verification stamp. Live-test each in ≤5 min or strip to "see canonical docs." Cobbler's-children fix.
- **`check_pedagogy.md` rule-count pruning to under 45.** Currently 62 rules (up from 58 at last refresh), over the firing-reliability ceiling. Three consolidation candidates already named in `/tmp/refresh-compendiums.md`: body-callout family (#48 / #50 / `check_prompts.md` §15), maintainer-block contracts (#45 / #46 / #47), forcing-function-location family (#16 / #34). Depends on re-group axis.
- **`check_platform_and_boundaries.md` §4–§7 sub-letter accretion.** 10 sub-clauses with letter suffixes (4a, 5a, 6b/c/d/e, 7a/b). Defer until re-group decision.
- **11 specific compendium Update items from 2026-05-14 audit** (full list in `/tmp/refresh-compendiums.md`).

**Compounded cleanup (low-priority):**

- **Older MEMORY.md bullets also bloated** (audit flagged pre-2026-05-14 entries). Fold into the bigger re-group pass; touching them piecemeal is churn.

**Canonical sources:** `/tmp/refresh-compendiums.md` + `/tmp/refresh-compounded.md` (2026-05-14 audit punch lists) + `memory/compounded/2026-05-14-content_creation-todo-surface-open-decisions-only.md`.

---

**Canonical home:** this file. Module files carry zero TODOs, all pre-cohort open items route here.

**When an item closes:** delete the bullet. Git log carries the history. Don't annotate "done", closed = gone.

**When a new item surfaces mid-session:** add it here, not in the module file.
