# M6 done-done, live status & handoff

_Updated 2026-05-31 (session "m6 full done-done"). For pickup on another terminal or post-compaction. Delete once the §Remaining items close._

## TL;DR

M6 content is **done at `sim-passed`**, all six per-class judges PASS across exercise + module + lecture (0 open REVISE). Under the done-done definition set in `curriculum/CLAUDE.md` (done-done = quality at `mechanical-tested`, six SHAs current, maintainer-reviewed, trainer-guide present, no open audit TODOs), exactly **one ladder rung remains: `mechanical-tested`**, the §5 live battery, which is a watched-session job, not headless. The prompt-edit-gate is **fully fixed** (real cause was parser non-determinism, not the earlier "interrupt-blindness" theory, see §Gate); suite 9/9; the gated loop-3 edit landed end-to-end as proof. What's left for done-done: the §5 mechanical harness + live battery (watched), maintainer re-review, and one optional prompt-polish edit (loop-5).

No commits this session (commit is the maintainer's call, §"Before ship"); HEAD `606a5ce`. The gate fix (`.claude/hooks/prompt-edit-gate.sh` + its test) is **GITIGNORED, local-only by design**, not committable and won't propagate to other clones via git. Tracked working-tree changes this session: the loop-3 prompt (modified) + `site/prompts.json` (recompiled, but ENTANGLED across ~11 keys, see §"Before ship"). `-study` + `-shapes` prompts + this status file are UNTRACKED.

## Post-compact progress (2026-05-31, "continue M6 until done-done")

1. **Gated prompt-polish edits**: `spot-gaps-build-the-loop-3` ✅ **LANDED** (technical rule-4, fence now names the `test-strategy` skill by reference, not path; propagated to `site/prompts.json`; graph ✓). `spot-gaps-build-the-loop-5` (behavior-8, low, optional) still open, needs its own card + a genuine `APPROVED: spot-gaps-build-the-loop-5` user turn.
2. **Commit the M6 work** by pathspec, STILL OPEN, the maintainer's call (§"Before ship").
3. **Compound the gate learnings**, ✅ DONE + **RECONCILED**. Two durable entries: `2026-05-31-platform-gate-detector-deterministic-parse` (the real bug + fix, and the disproof of interrupt-blindness) and `2026-05-31-verify-guard-end-to-end-not-unit-green`. Both amendments applied: `check_platform_and_boundaries.md §6g` (deterministic-parse rule) + the self-review "Calibrate the claim to the inspection" guard-end-to-end clause. (The earlier `interrupt-blind-approval` compound was rewritten + renamed once direct transcript inspection disproved its mechanism.)

**§5 / done-done note (UPDATED for the `mechanical-tested` definition):** the earlier "accept the ceiling" call was made under the old `cohort-tested` done-done bar. With done-done now = `mechanical-tested`, §5 is **the binding finish line, not a ceiling to accept**, it is reachable, just not headless. Do it as a deliberate watched session pre-cohort (the harness has documented hang modes; writing it un-run would repeat the premature-success failure, §Gate). The module `- mechanical` row stays REVISE until that run lands, candid under-claim, by design.

## Landed this session (verified on disk)

- ✅ **Study cap**, `curriculum/prompts/spot-gaps-build-the-loop-study.md` final sentence ends "...top six or so, the ones I actually repeat, not the ones that look impressive." Resolves behavior-3.
- ✅ **Rule-2 lead-ins** before study/shapes/primitives markers (exercise L49/L55/L63), standalone, mirror prompt openings. Resolves technical rule-2.
- ✅ **Klaassen cite** in exercise maintainer-block Frameworks carries URL + label (`every.to/source-code/compound-engineering-the-definitive-guide`, `[practitioner direct, vendor venue]`). Resolves technical research-rule-1.
- ✅ **Six-class audit** (curriculum-pre-ship-audit): exercise writing/story/technical/behavior/pedagogy ALL PASS, 0 blocking; module **strategy re-fired → PASS**.
- ✅ **Lecture pedagogy REVISE CLEARED**, `curriculum/lectures/agents-that-build-agents.md`, 3-persona sim + handoff-generator live-test; fixed one mood line anthropomorphising the runtime (L47); six-class PASS + `sim-passed` row.
- ✅ **Module stale mechanical pin degraded**, `spot-gaps-build-the-loop.md` `- mechanical @e840433: PASS` → `REVISE` (battery predates the Phase-2 redesign).
- ✅ **loop-3 prompt edit LANDED** (gated, approved idle), proves the gate fix end-to-end.
- ✅ **Gate fully fixed**, `.claude/hooks/prompt-edit-gate.sh` approval detector is now one deterministic python3 pass; suite **9/9**.

## Gate (prompt-edit-gate.sh), FULLY FIXED. Compounded + reconciled 2026-05-31.

The cap, then loop-3, were denied before landing. Two real causes, both now fixed:

1. **case-4 self-approval (FIXED).** Path-1 read the whole user content array incl. `tool_result`; the gate's own deny carries literal `APPROVED: <key>`, so a settled transcript self-approved. Detector now reads `text` blocks only.
2. **parser non-determinism (FIXED, this was the real blocker).** The old detector piped `jq` (streaming + `--slurp`) → `awk`/`grep` under `set -o pipefail`. The hook fires WHILE the harness appends the triggering turn, so the final JSONL line is reliably partial; `jq` exits non-zero, `pipefail` turns a real `grep` match into a silent false, `--slurp` fails Path-2 outright. Same real transcript → DENY as-is / ALLOW + partial line / DENY + trailing newline (pure timing noise). **Fix:** one python3 pass, line-by-line, per-line `try/except`, a partial/garbled line is skipped, never poisons the verdict. Suite 9/9; loop-3 landed.

**Interrupt-blindness was a misdiagnosis, DISPROVEN.** The prior handoff blamed interrupt-delivered approvals landing as `queue-operation`/`attachment`, invisible to a `type=="user"` selector. Direct transcript inspection settles it: a genuine interrupt (`FIX PROPERLY THE HOOK`) and the landed approval (`APPROVED: spot-gaps-build-the-loop-3`) are BOTH plain `type:"user"`/`str` turns. Interrupts and idle approvals are indistinguishable in the transcript; the "idle worked, interrupt didn't" observation was spurious correlation with the partial-line race. The detector was NOT widened to scan `queue-operation` (only task-notifications + echoed denies live there, re-joining would re-open a case-4 leak).

Process learning (compounded): declaring the gate fixed on the case-4 unit-green, AND reaching for interrupt-blindness, were both premature calls in one session. Verify a guard END-TO-END (land the real edit) before declaring it fixed; a "shape of the data" claim is directly checkable in ~2 min, inspect before compounding. Durable: `memory/compounded/2026-05-31-platform-gate-detector-deterministic-parse.md` + `…-verify-guard-end-to-end-not-unit-green.md`.

## Remaining for done-done

1. **§5 mechanical harness + live battery → `mechanical-tested`** (THE binding rung). Watched session, not unattended. Scoped in `tmux-runner/IMPROVEMENTS.md § M6 Phase-2`: scenarios already run `-primitives`; add only `-study` + `-shapes` (two turns), renumber assert_turn cases `+2` from case 3, seed/scope the cross-project `-study` scan. Then a LIVE battery run (needs the M5-end-state worktree → full M1→M5 chain first). NOT blind-writable, the harness is tuned against live runs.
2. **Maintainer re-review** of exercise + module + lecture after this session's edits (the `maintainer-reviewed` axis, inherently the maintainer's end-to-end read + manual prompt runs).
3. ✅ **loop-5 prompt-polish edit LANDED** 2026-05-31 (maintainer-approved). Appended "Don't reassure me about the skill. If it isn't earning its place, say so." (mirrors -4); propagated to `site/prompts.json`, graph ✓; behavior instance niceness-tax todo closed (verdict TODO→PASS, re-sim owed at next audit). Both gated prompt-polish edits (loop-3 + loop-5) now done.
4. **Cohort run → logged on the `- cohorts:` row.** A delivery fact recorded in the log, not a ladder rung to reach (the `cohort-tested` rung was removed 2026-05-31). Not a ceiling on done-done.

## Non-blocking judge todos (live in instance JSONs, NOT in pre-cohort-todos.md)
- behavior: loop-3 preamble (med; exercise L85 callout partially mitigates), still open; loop-3 fence reword + loop-5 niceness both RESOLVED 2026-05-31.
- story: align the two pacing-callout registers ("Fast operator?" vs "Solo or fluent?"); "few engineers ever read them back" (L45) mildly over-general for senior (judge: keep).
- Files: `curriculum/evals/instances/ae101--spot-gaps-build-the-loop.{behavior,story,technical}.json`.

## Before ship (not done-done blockers)
- Rebuild workbook + trainer pages: `node scripts/build-workbook.js` (refreshes lead-in/cap edits into trainer-guide.html + trainer-modules.html).
- Commit is **the maintainer's call.** Multi-agent repo: commit only M6 files by pathspec. Precise picture as of this session:
 - **Cleanly M6, safe by pathspec:** `curriculum/prompts/spot-gaps-build-the-loop-3.md` (modified) + `…-study.md` + `…-shapes.md` (UNTRACKED, `git add` explicitly). This status file is UNTRACKED too (commit or leave as a working note).
 - **DO NOT sweep in `site/prompts.json`**, its working-tree diff spans ~11 prompt keys, most non-M6 (agents-that-build-agents, m3-clear-session, m4 ×2, threat-model, push-back ×2, walk-and-send-off). It's a recompiled build artifact entangled with other in-flight work; committing M6 prompt sources without it is fine (regenerable via compile-prompts). Handle it holistically when all its inputs are ready, not inside an M6 commit.
 - **Gate fix is GITIGNORED** (`.claude/hooks/`), can't be committed; the ultra-reliable rewrite is local-only. If it should survive on other clones, that's a separate maintainer decision (un-ignore, or replicate manually). Flagged, not assumed.
 - NO `git add -A` (acme deploy + others' WIP in tree). No stash. No checkout/restore on dirty paths.

## Guardrails (carry across terminals)
- Prompt-body edits gated; approval = a genuine `APPROVED: <key>` user turn (interrupt OR idle both work now, interrupt-blindness disproven), or a card + short approval phrase, or SKIP_PROMPT_GATE=1 at harness launch (SKIP-via-Bash gets auto-classifier-blocked as a gate-bypass; needs fresh explicit authorization).
- `cat`/`sed` does NOT satisfy the Edit Read-first gate; use Read.
- Verify each edit landed (grep/Read) before reporting done.
- Pseudonyms only for prospects.
