# Pre-cohort punchlist, AE101 M1–M6

> **CLOSED = DELETE THE BULLET. Not "annotate done." Not "rewrite as smaller follow-up." Not "update with what landed." DELETE.**
>
> Git log is the history. This file is current state. A closed bullet rewritten as adjacent work is a NEW bullet pretending to be progress, surface the new work cleanly under a real section, or don't add it. If the new work isn't pre-cohort scope (M1–M6 done-done), it doesn't belong in this file at all.

Open decisions before the first paying cohort. Module files carry zero TODOs; this is the single tracking surface.

**Item types.** Bullets are open decisions or tactical fixes by default, something has to happen before cohort. Prefix a bullet with **`[watch]`** to mark *currently accepted, no pre-cohort action*, the behaviour may bite us, but we've decided to ship as-is and see. Watch items convert to action items if the cohort run surfaces the failure; otherwise they get deleted like any other closed bullet. Don't let watches accumulate as a dustbin: a watch with no named firing condition is procrastination dressed up.

Sim sweeps and platform-capability checks are not tracked here. The `curriculum-pre-ship-audit` skill auto-fires on touched files; `check_platform_and_boundaries.md` fires on platform claims at content-time. **Per-class verdicts (PASS / REVISE / grandfathered) live in each module's own `**Quality:**` block**, `update-quality.sh` stamps both PASS and REVISE with the instance-JSON path so a successor can grep Quality blocks for state without consulting this file.

**Harness / tmux-runner engineering is not tracked here either.** Runner bugs, scenario hardening, per-turn assertions, socket isolation, and state.json shape live in `curriculum/evals/mechanical/tmux-runner/IMPROVEMENTS.md`. This file tracks cohort-blocking *curriculum* decisions only; a finding that's fixed in runner code or a scenario file belongs there, not here.

**Source-freshness is not narrated here either, it is stamped per-source and generated.** Each source carries a checked / result / due freshness stamp in its file's `Source verification` block (format: `curriculum/source-freshness-format.md`); `curriculum/evals/scripts/source-freshness.sh --target <cohort-date>` produces the punch list. The 2026-05-25 full sweep cleared all source BLOCKs; per-source stamps now live in each file's `Source verification` block. **Any source item below is superseded by that sweep**, do not add new hand-narrated source-verification prose; stamp and run the script instead.

## Per-file specific concerns (not caught by auto-fire)

- **`reading-the-return.md` + `learning-through-contrast.md`**, custom-persona sim: dual-mode reader (pre-read + in-room handout) at the M5 openers. Standard Maija/Greg/Jin trio doesn't simulate the dual-mode use.
- **`learning-through-contrast.md`**, cross-file framing alignment with its pre-read (no contradictions, no different vocabulary). Watch-for at L82 of the file already logs this; sim not fired.
- **`the-loop-has-a-name.md`**, custom-persona sim: CTO (vendor-plug risk on Ramp/Intercom anchoring), senior engineer (recognition vs remedial), engineer who never went past M1–M6 (does the long-running-shapes callout grow a need-to-try-now itch).
- **`the-loop-has-a-name.md`**, `/schedule` and `/loop` capability recheck via `claude-code-guide` within two weeks of any cohort date. Delivery-time exercise, not a content-time check.
- **`arc-retrospective.md`**, confirm Agent-tool sub-task read of training-arc artefacts is reliable enough to ground the note. If flaky, route through main conversation with the same quote rule.
- **`[watch]` `extract-the-task-shaping-rule-2` save-path ambiguity (M2).** Prompt asks Claude to "propose two-three plausible paths" for the rules file and pick one. Codesearch M2 dry-run (2026-05-24) had the agent integrate the new rules INTO the existing `CLAUDE.local.md` (created at M1's compound), a legit "integrate, don't append" reading, but it means a downstream prompt that loads "the rules file" and `CLAUDE.local.md` as separate inputs sees one path, not two. Lemmings runs typically save to a distinct file. **Accepted as-is for first cohort.** Fires if any downstream module prompt (M3 sharpen-skill, M4 walk-and-send-off, M5 diagnose-and-resend, M6 spot-gaps) loads "the rules file" and `CLAUDE.local.md` as separate inputs and silently de-dupes or overwrites, observe whether any module behaves differently when the two paths collapse to one.
- **`[watch]` `ae101-m4-commit-starting-point` run-coordinates land at bottom of task.md (M4).** Prompt says "*append* a protected block" → coordinates go to end-of-file. The frontmatter `note` names the purpose as "later session can recover this run without searching", but a reader doing `cat task.md | head` scrolls past the entire task body before finding the coordinates. Codesearch M4 dry-run (2026-05-24) confirmed the agent appends faithfully. **Accepted as-is for first cohort.** Fires if any downstream M5/M6 prompt (worktree-setup, diagnose-and-resend-1/2, spot-gaps-1, arc-retrospective-1, agents-that-build-agents-1) silently fails to locate the coordinates, OR if a cohort student takes more than a few seconds to find them. Fix would change "append" → "prepend" / "insert at top".
- **`[watch]` `ae101-m4-commit-starting-point` literal `"M4 starting point"` commit message is load-bearing for M5 fork (M4→M5).** Two prompts key on the exact commit-message string to locate the fork-point on the named branch: `ae101-m5-worktree-setup` (*"find the 'M4 starting point' commit on that named branch"*) and `diagnose-and-resend-2` (*"commits since the 'M4 starting point' commit"*). The SHA can't be self-recorded in task.md (it's the hash of the commit that includes task.md), so the message stays the addressing primitive. Codesearch M4/M5 dry-run (2026-05-24/25) confirmed the agent uses the message faithfully. **Accepted as-is for first cohort.** Fires if a cohort student renames the commit at M4 (curriculum label leak per sessions-don't-know-module-names rule) and the rename propagates to M5 worktree-setup failing to find the fork point. Sister of the run-coordinates-at-bottom watch above; both surface the same M4→M5 hand-off design tension.
- **`[watch]` skill-name collision breaks the hardcoded-literal chain on replays (M3 `test-strategy`, M6 `session-shaper`).** Both skills save to fixed names and ~6 consumer prompts cite the literal path (`~/.claude/skills/test-strategy/`, `session-shaper`). First-cohort clean `~/.claude/skills/` hits no collision. **Accepted as-is for first cohort.** Fires if a returning/replay student or an agents-101 alum already has either name, Claude suffix-renames (`test-strategy-<project>`), and a consumer prompt citing the literal misses. Fix when it fires: warn in the exercise body to check where Claude saved, OR have the creation prompt overwrite-on-conflict.

### From M5+M6 pre-ship audit 2026-05-15

- **`story-of-module-6.md` Geoff Charles quote.** Source-verification maintainer section added 2026-05-22 (URL + fallback framing + freshness re-check). Pre-cohort: actually open `x.com/geoffintech/status/2042002590758572377` (or paywall-fallback) and stamp.
- **`agents-that-build-agents.md` Ralph→/goal sim re-fire.** Ralph→/goal section added 2026-05-15; three-persona sim (senior engineer / mid-training / CTO) deferred. Before first cohort, fire sim against the new section to verify the platform-arc beat lands without authority-transfer or vendor-plug risk.

### From 2026-05-21 fact-check on quality-arc + composition build

Built in response to the now-closed cohort-run items on quality depth-balance and workflow-from-skills composition. Replaced by: `lectures/quality-is-grounding.md` (names the quality arc threaded across the whole training) and `lectures/composing-the-workflow.md` + `supplementary/workflow-composition-lineages.md` (five composition approaches surveyed from named practitioners + Ronacher counter-position; explicit scope note that the curation is partial). New maintainer-block debt below.

- **`/research-review` owed on five OODA findings files before merge to main.** Files: `continuous-research/findings/by-pattern/workflow-composition-{1a-practitioners,1b-failure-modes,2a-wiring-mechanics,2b-failure-recovery,3-confirmation}.md`. Four-persona pass (source-type-auditor, zombie-stat-detector, freshness-checker, evidence-ladder-classifier). The source-type-auditor is the persona that should have caught fan-digest source-laundering on Cycle 1A; firing the review now surfaces any other source-type slippage missed by the 2026-05-21 direct-source verification pass. Pre-cohort, not blocking.

---

**Canonical home:** this file. Module files carry zero TODOs, all pre-cohort open items route here.

**When an item closes:** delete the bullet. Git log carries the history. Don't annotate "done", closed = gone.

**When a new item surfaces mid-session:** add it here, not in the module file.
</content>
</invoke>
