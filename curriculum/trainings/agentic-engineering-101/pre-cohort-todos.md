# Pre-cohort punchlist, AE101 M1–M6

> **CLOSED = DELETE THE BULLET. Not "annotate done." Not "rewrite as smaller follow-up." Not "update with what landed." DELETE.**
>
> Git log is the history. This file is current state. A closed bullet rewritten as adjacent work is a NEW bullet pretending to be progress, surface the new work cleanly under a real section, or don't add it. If the new work isn't pre-cohort scope (M1–M6 done-done), it doesn't belong in this file at all.

Open decisions before the first paying cohort. Module files carry zero TODOs; this is the single tracking surface.

**Item types.** Bullets are open decisions or tactical fixes by default, something has to happen before cohort. Prefix a bullet with **`[watch]`** to mark *currently accepted, no pre-cohort action*, the behaviour may bite us, but we've decided to ship as-is and see. Watch items convert to action items if the cohort run surfaces the failure; otherwise they get deleted like any other closed bullet. Don't let watches accumulate as a dustbin: a watch with no named firing condition is procrastination dressed up.

Sim sweeps and platform-capability checks are not tracked here. The `curriculum-pre-ship-audit` skill auto-fires on touched files; `check_platform_and_boundaries.md` fires on platform claims at content-time. **Per-class verdicts (PASS / REVISE / grandfathered) live in each module's own `**Quality:**` block**, `update-quality.sh` stamps both PASS and REVISE with the instance-JSON path so a successor can grep Quality blocks for state without consulting this file.

**Source-freshness is not narrated here either, it is stamped per-source and generated.** Each source carries a checked / result / due freshness stamp in its file's `Source verification` block (format: `curriculum/source-freshness-format.md`); `curriculum/evals/scripts/source-freshness.sh --target <cohort-date>` produces the punch list. The 2026-05-25 full-sweep findings (BLOCK fixes + per-group paste-ready stamps): `curriculum/evals/scratch/source-sweep-2026-05-25/FINDINGS.md`. **Any source item below is superseded by that sweep**, do not add new hand-narrated source-verification prose; stamp and run the script instead.

## Per-file specific concerns (not caught by auto-fire)

- **`reading-the-return.md` + `learning-through-contrast.md`**, custom-persona sim: dual-mode reader (pre-read + in-room handout) at the M5 openers. Standard Maija/Greg/Jin trio doesn't simulate the dual-mode use.
- **`learning-through-contrast.md`**, cross-file framing alignment with its pre-read (no contradictions, no different vocabulary). Watch-for at L82 of the file already logs this; sim not fired.
- **`the-loop-has-a-name.md`**, custom-persona sim: CTO (vendor-plug risk on Ramp/Intercom anchoring), senior engineer (recognition vs remedial), engineer who never went past M1–M6 (does the long-running-shapes callout grow a need-to-try-now itch).
- **`the-loop-has-a-name.md`**, `/schedule` and `/loop` capability recheck via `claude-code-guide` within two weeks of any cohort date. Delivery-time exercise, not a content-time check.
- **`arc-retrospective.md`**, confirm Agent-tool sub-task read of training-arc artefacts is reliable enough to ground the note. If flaky, route through main conversation with the same quote rule.- **`[watch]` `extract-the-task-shaping-rule-2` save-path ambiguity (M2).** Prompt asks Claude to "propose two-three plausible paths" for the rules file and pick one. Codesearch M2 dry-run (2026-05-24) had the agent integrate the new rules INTO the existing `CLAUDE.local.md` (created at M1's compound), a legit "integrate, don't append" reading, but it means `m2_rules_file` and `m2_claude_local_md` in run-m2.sh's state.json point at the same path. Lemmings runs typically save to a distinct file. **Accepted as-is for first cohort.** Fires if any downstream module prompt (M3 sharpen-skill, M4 walk-and-send-off, M5 diagnose-and-resend, M6 spot-gaps) loads "the rules file" and `CLAUDE.local.md` as separate inputs and silently de-dupes or overwrites, observe whether any module behaves differently when the two paths collapse to one.
- **`[watch]` `ae101-m4-commit-starting-point` run-coordinates land at bottom of task.md (M4).** Prompt says "*append* a protected block" → coordinates go to end-of-file. The frontmatter `note` names the purpose as "later session can recover this run without searching", but a reader doing `cat task.md | head` scrolls past the entire task body before finding the coordinates. Codesearch M4 dry-run (2026-05-24) confirmed the agent appends faithfully. **Accepted as-is for first cohort.** Fires if any downstream M5/M6 prompt (worktree-setup, diagnose-and-resend-1/2, spot-gaps-1, arc-retrospective-1, agents-that-build-agents-1) silently fails to locate the coordinates, OR if a cohort student takes more than a few seconds to find them. Fix would change "append" → "prepend" / "insert at top".
- **`[watch]` `ae101-m4-commit-starting-point` literal `"M4 starting point"` commit message is load-bearing for M5 fork (M4→M5).** Two prompts key on the exact commit-message string to locate the fork-point on the named branch: `ae101-m5-worktree-setup` (*"find the 'M4 starting point' commit on that named branch"*) and `diagnose-and-resend-2` (*"commits since the 'M4 starting point' commit"*). The SHA can't be self-recorded in task.md (it's the hash of the commit that includes task.md), so the message stays the addressing primitive. Codesearch M4/M5 dry-run (2026-05-24/25) confirmed the agent uses the message faithfully. **Accepted as-is for first cohort.** Fires if a cohort student renames the commit at M4 (curriculum label leak per sessions-don't-know-module-names rule) and the rename propagates to M5 worktree-setup failing to find the fork point. Sister of the run-coordinates-at-bottom watch above; both surface the same M4→M5 hand-off design tension.
- **`[watch]` parallel tmux runners share the default socket (harness, M5).** Multiple `run-m*.sh` invocations across users / sessions all bind to `/tmp/tmux-501/default`. A `tmux kill-server` from one runner nukes every other runner's session. Codesearch M5 PC (2026-05-24) lost its session this way mid-autonomous-run, ~18 minutes into the packaged re-send, the work landed on disk (web.go +123 lines, README +25, web_test.go new, verifier in `.claude/hooks/`), but the sentinel never fired and the runner hung until I killed it. **Accepted as-is** (manual recovery: read what landed on disk, accept as M5 output). Fires if cohort delivery happens on a shared box with other Claude Code instances, OR if any other tooling does `tmux kill-server`. Fix: switch the runners to per-runner sockets (`tmux -L runner-$run_id …`) so kill-server from elsewhere can't reach them.
- **`[watch]` arc-note destination scan in `run-m6.sh` state.json is shallow (harness, M6).** Best-effort scan checks `.claude/memory/`, `docs/adr/`, `docs/adrs/`, worktree root for the arc retrospective output. Codesearch M6 dry-run (2026-05-25) had the agent pick `docs/practice/2026-05-25-from-doing-to-grading.md`, a novel destination, and state.json's `m6_arc_note_paths` came back empty. Lemmings M6 dry-run (2026-05-25) reproduced the same shape: agent picked `docs/notes/2026-05-25-rules-to-guards.md`, also empty in state.json. **Cross-SUT confirmation that the whitelist is wrong shape.** Accepted as-is because state.json is convenience cache, not authoritative. Fires if any downstream reader trusts `m6_arc_note_paths` as canonical rather than scanning the worktree itself; fix when that cost lands. Candidate fix: replace whitelist with `find $sut_cwd -type f -name '*.md' -newermt "@$run_start_epoch"` with excludes for `node_modules`, `.git`, `.residue-archive`.

- **`[watch]` pre-existing target worktree path silently passes PA assertion (harness, M5).** `run-m5.sh` PA post-check is `[[ ! -d "$worktree_cwd" ]]`, passes trivially even if the prompt's `git worktree add` errored on a populated path. Lemmings M5 dry-run (2026-05-25) hit this state from a prior unrelated dry-run that left `~/Projects/lemmings-m5` populated at branch `m5/ten-level-campaign`; workaround was `git worktree move lemmings-m5 lemmings-m5-prior` before launch. **Accepted as-is** for first cohort because first-time students don't have a stale worktree. Fires if any returning student replays M5, OR if multi-SUT runs share a `<repo>-m5` namespace. Fix: PA pre-flight should refuse to launch when `worktree_cwd` exists; PA post-assertion should verify the worktree's HEAD matches the M4 starting-point SHA, not just dir existence.

- **`[watch]` M5 verifier path heuristic captures code-fence fragment (harness, M5 state.json).** `run-m5.sh:545` greps PB transcripts to populate `m5_verifier` and lands on a backtick fragment (e.g. `.claude/hooks/`,`) instead of the real saved path (lemmings 2026-05-25: actual `tests/blocker-terminal-no-scan.test.js`). Run-m6.sh does not read this field so the garbage doesn't propagate. **Accepted as-is.** Fires if any future runner depends on `m5_verifier` for path resolution. Cheap fix: `git status -s` snapshot before/after the save-gate literal in PB, surface the new path; OR include the verifier path in the canned-reply literal so no inference is needed.
- **`[watch]` stale `test-strategy` skill at `~/.claude/skills/test-strategy/` (multi-SUT artefact).** During codesearch M3 the agent rewrote the per-codebase test-strategy skill in place, globally, and proactively backed up the lemmings version as `SKILL.tiny-lemmings.bak.md`. During codesearch M5 a subsequent agent split them properly into `test-strategy-codesearch` and `test-strategy-lemmings` (per-codebase namespaced). The original `test-strategy/` directory now holds the M3-era codesearch rewrite and is unreferenced by either lemmings or codesearch curriculum. **Accepted as-is** (no harm beyond the visual noise in `/skills` output). Fires if any future M3 codebase variant assumes a single `test-strategy` skill exists in its un-namespaced form, OR if `~/.claude/skills/test-strategy/` content drifts to contradict the namespaced versions. Cleanup: delete `~/.claude/skills/test-strategy/` once both lemmings + codesearch M3 reference the namespaced forms.
### From M5+M6 pre-ship audit 2026-05-15

- **`story-of-module-6.md` Geoff Charles quote.** Source-verification maintainer section added 2026-05-22 (URL + fallback framing + freshness re-check). Pre-cohort: actually open `x.com/geoffintech/status/2042002590758572377` (or paywall-fallback) and stamp.
- **`agents-that-build-agents.md` Ralph→/goal sim re-fire.** Ralph→/goal section added 2026-05-15; three-persona sim (senior engineer / mid-training / CTO) deferred. Before first cohort, fire sim against the new section to verify the platform-arc beat lands without authority-transfer or vendor-plug risk.
## From 2026-05-19 cohort run, AE101 / arcticrex (routed 2026-05-20)

Source: [run summary](https://github.com/ArcticRexOrg/ai-training-internal/blob/main/runs/2026-05-19-agentic-engineering-101-arcticrex/summary.md) (synthesized) + [per-module raw files](https://github.com/ArcticRexOrg/ai-training-internal/tree/main/runs/2026-05-19-agentic-engineering-101-arcticrex/modules), prefer the raw files; the aggregator hallucinated several claims (evals "never named", atomic primitives "never taught", M2-plan→M3 "handoff broken"). Comment-back verdict walk-through at `tmp/comment-back-2026-05-19-ae101-arcticrex.md` (local working ref).

Landed in-session 2026-05-20: M2→M3 task-continuity trap (sentence at `plan-mode-done-right.md:71` + bolded sentence at `earn-the-trust.md:8`); M6 atomic-primitives recognition pass at `exercises/spot-gaps-build-the-loop.md:43-53` + new `prompts/spot-gaps-build-the-loop-primitives.md`; prework bundle (what-to-bring section + clickable download link + write-it-down handoff + `<CONTENT_URL>` in download prompt body + effort-rec for prework and M1).

Landed 2026-05-22: M5 plan.md disambiguation (`diagnose-and-resend.md:79` *"not the plan-mode plan; this is the agent's mutable working document"*); M6 eval-as-transferable extension (`the-loop-has-a-name.md:21` *"the same shape fires on any workflow with a quality bar"*); what-packaging-is.md inline dating + freshness stamps.

### Tactical fixes ready for an agent pass

- **M5, `plan.md` disambiguation in Phase 4.** Landed 2026-05-22 as a one-sentence parenthetical at `exercises/diagnose-and-resend.md:79`. Pre-cohort: confirm the disambiguation reads clean on a live walk-through.
### Structural design conversations (separate sessions, not patches)

- **Three-layer context architecture (company / team / personal, all git-tracked).** Learner's verbatim (M6 10:39Z): *"No professional copies `CLAUDE.local.md` files. The real move: push to repo (git-tracked); for skills, symlink personal `~/.claude/skills` to the repo's `/skills` folder so always-on rules load automatically wherever you work. Local-only files are not a real option for professionals, always git, always."* Current architecture (`training-architecture.md:53-69`) carries team `CLAUDE.md` + personal `CLAUDE.local.md` (gitignored) + user-global `~/.claude/CLAUDE.md`, no company layer, personal layer is gitignored. Open question for the design conversation: is "company" a third layer for AE101's audience, or is the team layer doing both jobs already? The "memory" → "context" rename rides along with this decision. **Scheduled as a separate design session, not a punchlist item to fix inline.** Sources: [M6 raw, 10:39Z](https://github.com/ArcticRexOrg/ai-training-internal/blob/main/runs/2026-05-19-agentic-engineering-101-arcticrex/modules/M6.md) + [M4 raw, 12:39Z](https://github.com/ArcticRexOrg/ai-training-internal/blob/main/runs/2026-05-19-agentic-engineering-101-arcticrex/modules/M4.md) + [summary, "headline disagreements" section](https://github.com/ArcticRexOrg/ai-training-internal/blob/main/runs/2026-05-19-agentic-engineering-101-arcticrex/summary.md).
### From 2026-05-21 fact-check on quality-arc + composition build

Built today in response to the now-closed cohort-run items on quality depth-balance and workflow-from-skills composition. Replaced by: `lectures/quality-is-grounding.md` (names the quality arc threaded across the whole training) and `lectures/composing-the-workflow.md` + `supplementary/workflow-composition-lineages.md` (five composition approaches surveyed from named practitioners + Ronacher counter-position; explicit scope note that the curation is partial). New maintainer-block debt below.

- **`/research-review` owed on five OODA findings files before merge to main.** Files: `continuous-research/findings/by-pattern/workflow-composition-{1a,1b,2a,2b,3-confirmation}.md`. Four-persona pass (source-type-auditor, zombie-stat-detector, freshness-checker, evidence-ladder-classifier). The source-type-auditor is the persona that should have caught fan-digest source-laundering on Cycle 1A; firing the review now surfaces any other source-type slippage missed by the 2026-05-21 direct-source verification pass. Pre-cohort, not blocking.

## From 2026-05-24 tmux-runner mechanical dry-runs, M1–M4

Source: M1 + M2 + M3 + M4 driven end-to-end via tmux-runner (`curriculum/evals/mechanical/tmux-runner/`) against the lemmings SUT. M1 ran on `bdd0919` (initial commit, tally bug); M2 ran on `f771484` (M1 endpoint, with M1's CLAUDE.local.md in place). M3 ran twice (security-only + full main+quality parallel). M4 ran once with the blocker-deadlock task. M5+M6 entries below are scout-derived from an Explore-agent survey, not from actual runs; flagged as hypotheses to verify when those modules are mechanically run.

**M1 + M2 closed via per-turn assertions in `918b90d` (`run-m1.sh` / `run-m2.sh` `assert_turn()` T1–T9 covers save-gates, file-existence, SAVED-PATH location). M3 runs surfaced no curriculum-side issues against the literal-line scenarios. Save-gate / register-by-design / unconstrained-save-location items from the original dry-run notes accepted as pedagogy and closed.**

### Confirmed from M4 run

- **`.claude/memory/` gitignore step is a forcing function mechanical runs can skip silently.** Exercise body line 56: *"If `.claude/memory/` is new to your repo, ask Claude to add it to `.gitignore` before any writes."* The mechanical run's lazy-student tail for `-3` told Claude to persist directly without the AskUserQuestion loop; Claude ended up writing one fill to `CLAUDE.local.md` (already gitignored), so the gitignore question never arose. The trap is real for any flow that does write to `.claude/memory/`, `ae101-m4-commit-starting-point` runs `git add -A` and would track the writes. Pre-cohort: confirm interactive flow consistently triggers the gitignore step before any memory write.

### Confirmed from M3 + M4 reruns 2026-05-24 evening (runs `20260524-202108-80107` + `20260524-210132-96482`)

- **`[watch]` skill-name collision breaks the hardcoded-literal chain on replays (M3 `test-strategy`, M6 `session-shaper`).** Both skills save to fixed names and ~6 consumer prompts cite the literal path (`~/.claude/skills/test-strategy/`, `session-shaper`). First-cohort clean `~/.claude/skills/` hits no collision. **Accepted as-is for first cohort.** Fires if a returning/replay student or an agents-101 alum already has either name, Claude suffix-renames (`test-strategy-<project>`), and a consumer prompt citing the literal misses. Fix when it fires: warn in the exercise body to check where Claude saved, OR have the creation prompt overwrite-on-conflict.

### Hypotheses from M5/M6 scout (not from running)

- **`[watch]` `diagnose-and-resend-6` *"lock it in"* save-gate** is the same family as `threat-model-with-stride-3`. Scout-derived prediction: will silently drop `reference.md` + `plan.md` writes in mechanical runs unless an approval literal-text line follows. **Accepted as-is.** Fires on first M5 mechanical run if the writes drop without an approval-literal tail.

- **`[watch]` `spot-gaps-build-the-loop-3` uses `AskUserQuestion`** for the second-skill authoring conversation, same shape as `author-test-strategy-skill-1` (which M3 quality side handled via lazy-dump tail). Scout-derived prediction: same workaround applies. **Accepted as-is.** Fires on first M6 mechanical run if the runner hangs on the AUQ without a lazy-dump tail.

- **`[watch]` `diagnose-and-resend-4` verifier-shape pick is a real judgment moment** (background-agent / shell-hook / Ralph re-feed). Mechanical battery needs to pin one shape deliberately rather than lazy-dump. **Accepted as-is** (the cohort student makes a real pick; only the *mechanical battery* needs a pinned default). Fires when M5 is first mechanically run, pin the dry-run's shape and document it then.

### Cross-module / meta

- **M3 + M4 orchestrators still report sentinel-PASS without per-turn artifact assertions.** M1 + M2 closed in `918b90d` via `assert_turn()` T1–T9 in `run-m1.sh` / `run-m2.sh`. `run-m3.sh` and `run-m4.sh` are still parallel race-loop / sentinel-completion gated, no per-turn assertions. The M4 Huryn-additions silent-drop class is uncaught at the runner layer; M3 ADR drops would be too if they recurred. Engineering item for `curriculum/evals/mechanical/tmux-runner/`, port the M1/M2 assertion shape into M3 + M4.

### From 2026-05-24 task.md/plan.md coordinate refactor (M4-M6 run-finding)

The run-finding refactor landed and shipped (M4 records a protected `Run coordinates` block in `task.md` before the starting-point commit; M5 packaged re-run records the same in `plan.md`; M5/M6 readers read the coordinates; every `git branch -a | grep` + transcript-search deleted from the registry. Committed `608704e`, acme AE101 rebuilt + deployed). Open follow-ups:

- **`[watch]` plan.md clobber check, verify on first M5 mechanical run.** `ae101-m5-rerun-packaged` writes the protected `Run coordinates` block into `plan.md` at run start, then mutates the rest of plan.md as it runs. The `(do not rewrite or remove)` heading is the only thing protecting the block from being clobbered mid-run. **Accepted as-is.** Fires on first M5 mechanical run if the block doesn't survive the agent's own plan edits. (`task.md` is frozen in the worktree fork, no clobber risk there.)
- **Reader block-naming symmetry (optional polish).** M6 readers reference the `Run coordinates` block by name for `plan.md` but not for `task.md`, though both now carry it (`spot-gaps-build-the-loop-1`, `arc-retrospective-1`). Cosmetic, Claude finds the coordinates either way. Make phrasing uniform if those prompts are touched for another reason; not worth a dedicated pass.

- **`curriculum-pre-ship-audit` not run on the refactored prompts.** The 9 prompt-body edits were card-reviewed live (card-by-card with the maintainer); a full six-class audit was judged low-yield and skipped. If a formal behavior/technical-class verdict stamp is wanted before first cohort, it's still owed.

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
