# Lemmings M1–M6 chain — runbook

How to run the **full AE101 M1→M6 tmux-runner chain** on the lemmings SUT,
repeatably, from a clean baseline. This is the procedure that used to live only
as tribal knowledge between the `run-mN.sh` calls. Two scripts encode it:

- **`arrange-lemmings.sh`** — resets `~/Projects/lemmings` to the M1 baseline.
- **`chain-lemmings.sh`** — arranges, then drives M1→M6, positioning each
  module's branch/worktree from the prior module's `state.json` hand-off.

This is the **tmux runner** (`run-mN.sh` → real Claude Code session in a tmux
pane, synced on the Stop-hook sentinel). Not the actor/judge `runners/*.md`
harness.

## TL;DR

```bash
cd curriculum/evals/mechanical/tmux-runner

# full chain, medium effort (multi-hour — background it):
./chain-lemmings.sh                       # arrange + m1..m6

# one module / a sub-range (validate transitions, or resume):
./chain-lemmings.sh --to m1               # arrange + M1 only
./chain-lemmings.sh --from m2             # resume at M2 (reads newest m1-state.json)
./chain-lemmings.sh --from m3 --to m4

# cohort-faithful (slower, ~1h/turn cap):
./chain-lemmings.sh --effort high
```

Background it and watch `out/_chain-<m>.log`; per-run artefacts land in
`out/<run-id>/` as usual.

## The M1 baseline (decided 2026-05-25)

`run-m1.sh` snapshots whatever HEAD it finds — it does **not** reset. A clean
M1 start is:

| Thing | Baseline | Why |
|---|---|---|
| code tree | `bdd0919` (Initial commit) on `m1/fix-hud-tally` | the HUD `Out` bug is unfixed here; `bdd0919` is the bare game — no `package.json`, no `tests/`. M1's fix-tests-first turn is where the student *introduces* the runner + first test (the prior dry-run's M1 commit `102241b` added exactly `package.json` + `tests/main.test.js` + the fix). |
| `CLAUDE.local.md` | **absent** (fresh) | the canonical M1-start file this once referenced — `.residue-archive/CLAUDE.local.md.preserved-2026-05-24` — was **deleted**. Rather than reconstruct it, we take the fresh first-student baseline: M1's compound-and-close recreates it. The compounded copy is backed up by arrange. **Watch:** downstream tails (M4/M6) reference "the bug I named in CLAUDE.local.md M1 rules" — on a fresh chain those refs resolve only if the chain's own compound turns reproduce the rule. Flagged; verify on the first full fresh run. |
| `~/.claude/skills/*-lemmings` | **absent** | M3 authors `test-strategy-lemmings`, M6 authors `session-shaper-lemmings` (deterministic per-SUT names, pinned in the scenario tails 2026-05-25). Arrange removes prior versions so the writes land clean instead of suffix-renaming on collision. |
| worktrees | `lemmings-m3-quality`, `lemmings-m5` removed | they block the M3 fork + M5 worktree-setup (`git worktree add` refuses a populated path). `lemmings-m5-prior` is left alone. |
| stale `runner-*` tmux | killed | orphaned claude procs from abandoned runs; contend on the shared default socket (per-runner sockets not wired yet). |

Arrange is **reversible** — everything removed lands under
`~/Projects/lemmings-chain-backup/<ts>/` and the tail prints restore commands.

## Module topology

Slugs follow the existing branch convention. M4/M5/M6 share one slug.

| Mod | Runner | cwd / worktree | Branch | Starting SHA from | Authors |
|---|---|---|---|---|---|
| M1 | `run-m1.sh --cwd SUT --task-slug fix-hud-tally` | SUT | `m1/fix-hud-tally` | `bdd0919` (arrange) | — |
| M2 | `run-m2.sh --cwd SUT --task-slug add-levels-2-3` | SUT | `m2/add-levels-2-3` | `m1-state.json:m1_ending_sha` | plan in `~/.claude/plans/` |
| M3 | `run-m3.sh --main-cwd SUT --quality-cwd lemmings-m3-quality` | SUT + worktree | `m3/threat-model-share` + `m3/quality` (fork) | `m2-state.json:m2_ending_sha` | ADR `docs/adr/0001-*`, **`test-strategy-lemmings`** skill |
| M4 | `run-m4.sh --cwd SUT --task-slug blocker-deadlock-terminal` | SUT | `m4/blocker-deadlock-terminal` | M3 main HEAD (ADR commit; M3 writes no state.json) | `task.md` + "M4 starting point" commit |
| M5 | `run-m5.sh --main-cwd SUT --worktree-cwd lemmings-m5` | SUT + worktree | `m5/blocker-deadlock-terminal` (fork) | "M4 starting point" SHA — **scenario reads it from `task.md` Run coordinates**, not from state.json | `reference.md`, `plan.md`, verifier, RUN-NOTES |
| M6 | `run-m6.sh --cwd lemmings-m5 --task-slug blocker-deadlock-terminal` | M5 worktree | (no new branch; ships in place) | — | **`session-shaper-lemmings`** skill, arc note |

Hand-off source of truth is **SUT-side** (`task.md`/`plan.md` Run-coordinates
blocks, the artefacts themselves) per `check_platform_and_boundaries.md §31` —
`state.json` is a convenience cache the chain uses only for the next branch's
starting SHA.

## Env knobs

- `CLAUDE_CMD` — chain sets `claude --effort <effort> --permission-mode auto`.
  Auto-perm is required: install-heavy, no human to approve tool calls.
  **Never** `--permission-mode bypassPermissions` (startup confirm dialog hangs
  the runner forever).
- `--effort` — `medium` (default; fast pass, shakes out mechanics) vs `high`
  (cohort-faithful, ~1h/turn).
- `CLAUDE_RUNNER_TIMEOUT` — per-turn sentinel timeout; chain default `1800`s.
  **M5 is the long pole** — its packaged send-off turn can run long; if it gets
  clipped, raise this (`CLAUDE_RUNNER_TIMEOUT=3600 ./chain-lemmings.sh --from m5`).
- `CLAUDE_RUNNER_SOFT_CAP` — **M6 `-study` turn only (run-m6.sh):** soft cap,
  default `300`s. `-study` scans the whole `~/.claude/projects/` tree; if it runs
  past this it gets ESC-interrupted and nudged (`CLAUDE_RUNNER_NUDGE_TEXT`,
  default *"Just give me the results. We continue."*), then the walk continues.
  Every other turn — M6's diff (T1) and arc-retro (T9) included — keeps the plain
  `CLAUDE_RUNNER_TIMEOUT` hard ceiling, so deep high-effort turns aren't clipped.
  Set `CLAUDE_RUNNER_SOFT_CAP=0` to disable. The other run-mN.sh legs are
  unchanged (plain `wait_for_turn`).

## Validation status

Validated live, medium effort, one module at a time through the wrapper:

- **arrange + M1** — 2026-05-25. PASS 8/8.
- **M2** — 2026-05-26. PASS 8/8 (plan-mode, no repo commit — expected).
- **M3** — 2026-05-26. PASS all phases; `test-strategy-lemmings` authored accurately.
- **M4** — 2026-05-26. Work PASS (fix + 9/9 tests); two bugs surfaced + fixed —
  run-m4 `find` crash on absent in-repo memory dir, and the **M4→M5 branch-slug
  coupling** (the agent names its branch from the task in `task.md`, so the
  wrapper now reconciles the actual m4 branch to that name before M5).
- **M5** — 2026-05-26. PASS all phases (PA fork + PB diagnose + PC re-send).
- **M6** — 2026-05-26. PASS 9/9; `session-shaper-lemmings` authored (the per-SUT
  suffix pin validated — `m6_new_skills: ["session-shaper-lemmings"]`), arc note saved.
  **2026-05-31 — scenario grew, re-validation owed:** the exercise's Phase-2
  `-study` + `-shapes` prompts (added upstream) were missing from the walk; inserted
  into all three scenarios between `-2` and `-primitives`. Scenario is now 11 turns
  (9 prompt-key + 2 literal); `assert_turn` renumbered to 9 cases (study=3, shapes=4,
  primitives=5 … arc=9), two new soft scrollback checks (recurring-work inventory,
  mermaid diagrams). `bash -n` + a parse dry-run pass; a live M6 re-run has NOT been
  done since — the 9/9 above predates the two new turns.

**Full M1→M6 validated through the wrapper at medium effort, 2026-05-26.** The
deterministic per-SUT skill suffix (the improvement this run was built around) is
confirmed: M3 authored `test-strategy-lemmings`, M6 authored `session-shaper-lemmings`,
neither colliding with the codesearch/picoshare versions.

Friction surfaced + handled while validating (all rooted in the fresh baseline —
no in-repo memory dir ever gets created, which prior runs masked):
- M3-fork + M5-worktree-setup are declarative-but-AUQ-risk (README §42): the
  absent memory-copy source made the agent stop and ask → PA hang. Suppression
  tails added to the lemmings scenarios.
- Canned answers calibrated to the prior run's emergent layout drift on a fresh
  chain (`test/` vs `tests/`, the in-repo memory dir). Re-grounded M3-quality +
  M4/M5 test-path references against ground truth.

Runner-side context (owned by the runner maintainer, not this wrapper):
- The in-repo memory convention was renamed `.claude/memory/` → `observations/`
  across runner + prompts (sidesteps the auto-memory conflation).
- Per-runner tmux sockets are now wired in `lib/tmux.sh` (`-L $RUNNER_TMUX_SOCKET`).
  **Caveat for `arrange-lemmings.sh`:** its stale-`runner-*`-session cleanup scans
  the default socket, where runners no longer live — that step is now a no-op and
  should be updated to enumerate per-runner sockets (`/tmp/tmux-$UID/runner-*`).

## Resuming

`run-mN.sh` and `chain-lemmings.sh` are stateless across invocations except via
`out/*/mN-state.json`. To resume after a pause/failure: `--from mN` reads the
newest `out/*/m{N-1}-state.json` for the starting SHA and skips arrange. M1 run
standalone (not via the wrapper) still leaves a usable `m1-state.json`, so
`--from m2` works regardless of how M1 was launched.
