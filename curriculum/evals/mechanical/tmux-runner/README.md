# runner/ — tmux-driven agent session runner

Drives a real Claude Code or Codex CLI session in a tmux pane through a sequence of prompts and captures the transcript. This preserves the interactive, multi-turn TTY surface while testing the real prompt chain and its compounding artifacts.

## Shape

```
runner/
  run.sh                 # entry: walks a scenario, drives the pane
  install-sut.sh         # one-time: registers Stop hook in a SUT cwd
  hooks/
    stop-sentinel.sh     # Claude: writes turn-N.done after each response
  lib/
    resolve-prompt.sh    # key -> body from agents-102/curriculum/prompts/
    tmux.sh              # send-keys / capture-pane / kill
    sync.sh              # wait_for_turn — block until sentinel appears
  scenarios/
    smoke.txt            # one prompt key per line
  out/<run-id>/          # transcript, per-turn captures, sentinels
```

## Design notes

- **Scenarios reference prompt keys, never copy prompt bodies.** Source of truth for prompts is `~/Projects/agents-102/curriculum/prompts/<key>.md`. Override the registry path with `PROMPT_REGISTRY`.
- **Runtime-neutral artifact identities.** Shared controls refer to identities such as `root-instructions` and `project-skills`. The runtime profile resolves those to real paths (`CLAUDE.md`/`.claude/skills` or `AGENTS.md`/`.agents/skills`). Scenarios and downstream prompts do not fork by runtime.
- **Runtime-specific completion detection behind one transport.** Claude uses its Stop-hook sentinel. Codex uses its stable interactive prompt state. The scenario driver does not duplicate prompt bodies or assertions.
- **One tmux session per run.** Pane 0 holds the selected CLI. Detached, so the runner can drive multiple sessions in parallel later.

## Agents 101 cases and runtimes

`run-a101.sh`, `arrange-agents-101.sh`, and `chain-agents-101.sh` share one case loader. `nordveil` remains the default eight-module regression case. `finnish-psychologist` is an M1–M6 stress case: a fictional Finnish solo practitioner uses Claude for books, website, newsletter, marketing, and social content, with client and clinical material explicitly out of scope. It exercises AI Act readiness without asserting that the profession alone makes those content workflows high-risk.

Case kits own only facts, source fixtures, canned student answers, semantic assertion patterns, and their maximum module. The canonical prompt-key scenarios remain shared. Four scenario tails that require domain-specific answers resolve case-owned tokens; the prompt registry is unchanged.

```bash
# Full Finnish psychologist simulation with real Codex CLI in tmux
./arrange-agents-101.sh \
  --case finnish-psychologist \
  --cwd /tmp/a101-psych/work \
  --material /tmp/a101-psych/material

./chain-agents-101.sh \
  --case finnish-psychologist \
  --runtime codex-cli \
  --to m6 \
  --no-arrange \
  --cwd /tmp/a101-psych/work \
  --material /tmp/a101-psych/material
```

Useful inspection and recovery controls:

```bash
./run-a101.sh --case finnish-psychologist --print-case
./run-a101.sh --case finnish-psychologist --print-case-dir
./run-a101.sh --case finnish-psychologist --module m6 --runtime codex-cli \
  --from-turn 3 --cwd /tmp/a101-psych/work --material /tmp/a101-psych/material
```

`--from-turn` is for resuming the same module after diagnosing a harness failure; it does not seed or reconstruct missing earlier state. A case module cap is enforced by both the single-module runner and the chain.

## First run

```bash
# 1. one-time: register the Stop hook in the SUT cwd
runner/install-sut.sh ~/Projects/lemmings

# 2. drive the smoke scenario
runner/run.sh runner/scenarios/smoke.txt --cwd ~/Projects/lemmings

# 3. inspect output
ls runner/out/<run-id>/
#   transcript.txt           full scrollback
#   turn-1.prompt.txt        what we sent
#   turn-1.transcript.txt    scrollback at turn end
#   sentinels/turn-1.done    sentinel that unblocked the runner
```

## Env knobs

- `PROMPT_REGISTRY` — path to prompts/ (default: `~/Projects/agents-102/curriculum/prompts`)
- `CLAUDE_CMD` — launch command (default: `claude`). Use `CLAUDE_CMD="claude --permission-mode auto"` for headless runs (the auto-mode classifier allows tool calls without prompts). **Do NOT use `--permission-mode bypassPermissions`** — it shows a "Yes/No, exit" confirmation dialog at startup that hangs the runner forever (no Stop hook fires for the dialog).
- `CLAUDE_RUNNER_TIMEOUT` — explicit per-turn timeout in seconds. General Agents 101 turns default to 1800s; its reusable M6 fixed-judge loop defaults to 3600s because it performs three generator/judge rounds. An explicit value always wins. Other runners retain their own defaults.
- `CLAUDE_RUNNER_SLASH_SLEEP` — render-wait for slash-only turns (default: 3s).

## Per-turn artifact assertions

Sentinel completion proves a turn finished, not that the prompt's contract held. Each `run-mN.sh` carries an `assert_turn <seq>` case statement that names the contract for every turn (file exists / mtime advanced / git dirty / new commit / scrollback grep). FAIL on miss stops the run. Helpers live in `lib/assertions.sh`. Canonical rule: `check_platform_and_boundaries.md § 16a`.

## Prework runner — `run-prework.sh`

Drives the AE101 prework arc (download → extract + install → screen + ready) in a lemmings session. Unlike `run-m{1..4}`, prework writes **nothing to the repo** — its only durable writes land outside it (`~/Downloads/ae101-content.tar.gz`, `~/Documents/ae101-content/`, the three curated skills under `~/.claude/skills/`). That makes it re-runnable: the runner resets those out-of-repo writes before each run, so the scenario replays from a clean slate.

```bash
# one-time: register the Stop hook in the SUT
install-sut.sh ~/Projects/lemmings

# run (defaults to --cwd ~/Projects/lemmings)
run-prework.sh
```

What the runner does before each run:
- **Deletes the three installed personal skills** (`access-control-analysis`, `stride`, `security-tools`) — T2 re-installs them from the tarball, so the install itself is what's under test.
- **Clears** `~/Downloads/ae101-content.tar.gz` and `~/Documents/ae101-content/` so the download + extract are genuinely fresh.
- **Builds** the content tarball (`scripts/build-ae101-content-tarball.sh`) and **serves it on `127.0.0.1`**, rewriting the prompt's `<CONTENT_URL>` placeholder to that local URL — the harness standing in for `build-workbook.js`'s deploy-time substitution. Set `PREWORK_CONTENT_URL` to point at a real cohort URL instead (skips the local build + server).

End-of-run gate: the repo's **tracked-file state must be unchanged** vs. the pre-launch baseline. That's the assertion behind "re-runnable" — if prework wrote into the repo, the gate fails. New untracked paths (e.g. `node_modules/` from a test-readiness check) are a soft WARN, not a failure.

Env knobs: `CLAUDE_CMD` (defaults to `claude --permission-mode auto` here — prework is install-heavy and has no human to approve curl/tar/cp), `PREWORK_HTTP_PORT` (default `8099`), `PREWORK_CONTENT_URL`, plus the shared `CLAUDE_RUNNER_*` knobs.

Scoped out: `ae101-prework-one-at-a-time` mandates the `AskUserQuestion` tool, which hangs the headless runner. The screen-and-ready turn carries the lazy-student guard tail with three candidate bugs inline instead.

## Save-gate scenarios

Some prompts end with implicit approval gates: *"Show me the diff before you commit"* (M1 `fix-tests-first-3`), *"Don't touch the plan file until I say 'lock it in.'"* (M2 `push-back-on-the-plan-2`), *"Want me to make X or hold for your read?"* (M3 `threat-model-with-stride-3`, M4 `walk-and-send-off-3`). Without a literal-text approval line on the next scenario line, the artifact silently drops and the next prompt rolls forward without the prior turn's contract met. Convention: `* yep just save it` or `* lock it in` on the next scenario line.

## Slash-command turns

Pure slash commands (`/context`, `/clear`, `/memory`) render client-side — no LLM call, no Stop hook, no sentinel. The runner's `is_slash_only` helper (in `lib/sync.sh`) detects this shape and bridges with `fake_sentinel_after_render` (sleep + touch). Slash commands with arguments (`/security-audit — load the skill`) DO fire the model and the Stop hook; they don't need special handling.

## Scenario-design discipline

Authoring a scenario file or an SUT-flavored variant? Read this section first — the rules surfaced from the codesearch sweep (M1–M6, 2026-05-24/25) and the canonical home is right here, next to the runner you're driving.

**AUQ suppression must be on EVERY prompt, not just the structurally interactive ones.** Any `AskUserQuestion` tool call hangs the headless runner forever — the UI waits for an arrow-key + Enter that never come. But the AUQ trigger isn't just prompts whose body says "Use AskUserQuestion." The agent can trigger AUQ on its own ambiguity-driven reasoning even when the prompt body is purely declarative — `--permission-mode auto` does NOT suppress AUQ (auto-mode classifies it as safe-to-call, lets it through). M3 codesearch run 1 (2026-05-24): `ae101-m3-fork-quality-side` is declarative (create worktree, copy files); the agent noticed the body's `cp -r ./.claude/memory/` instruction was wrong and asked the user about it. Runner hung. Tail every prompt with explicit *"Don't call AskUserQuestion — use your judgment / state your assumption and proceed"*; for the structurally interactive ones, pair with an ask-and-wait tail and a literal canned reply turn.

Examples of structurally interactive prompts (need ask-and-wait): M2 `push-back-on-the-plan-1/2`, M2 `extract-the-task-shaping-rule-1/2`, M3 `author-test-strategy-skill-1`, M4 `walk-and-send-off-3`, M5 `diagnose-and-resend-4/6`, M6 `spot-gaps-build-the-loop-3`. Examples of declarative-but-still-AUQ-risk: M3 `ae101-m3-fork-quality-side`, M5 `ae101-m5-worktree-setup`. **Default is suppress.** Canonical: `check_prompts.md` §42.

**Artifact-vs-STOP tail ordering — last imperative wins.** When an ask-and-wait tail is grafted onto a prompt that produces a load-bearing artifact (plan file, commit, written skill, ADR), the artifact instruction must be the LAST imperative in the tail. Claude weights the most-recent directive; a STOP that follows the write-X command will block the write. Codesearch M2 retrofit run 1 (2026-05-24): tail read *"Write the plan to <path>. ... If you have questions, ask and STOP — don't proceed yet."* Agent obeyed STOP literally, skipped the plan write, T1 assertion failed. Fix: *"Write the plan to <path>. The plan file landing is the load-bearing artifact — write it first. If you have refinement questions, list them at the END of your reply"* — no STOP, questions become end-of-response additions. Canonical: `check_prompts.md` §41.

**Headless artifact-drop = runner gap, not prompt defect.** When a propose-and-pause / ask-and-wait turn drops its artifact in a headless run, fix the SCENARIO — add a canned-reply literal on the next line (plus a no-AUQ guard so the turn completes in chat) — never the prompt body. The prompt's propose/pause framing is correct for the cohort student; the headless runner is what must answer. Editing the prompt to satisfy the test rig corrupts the cohort experience to serve the harness. M4 `walk-and-send-off-4` (2026-05-25): proposed file moves dropped; the fix was `* OK for these. continue` + a turn-level no-AUQ guard, NOT changing the prompt's "propose" to an imperative. Canonical: `memory/compounded/2026-05-25-platform-headless-drop-is-runner-gap-not-prompt-defect.md`. **`walk-and-send-off-4` itself retired 2026-07-10** (Phase 3's three-block/Huryn frame cut from the exercise; settle step folded into prose, no scripted prompt) — the `* OK for these. continue` literal went with it in all four M4 scenarios. The runner-gap-not-prompt-defect *principle* still holds; this specific example is history.

**Canned-reply factual claims must be ground truth, not approximation.** The ask-and-wait pattern inserts a literal student-voice reply turn (`*`-prefixed) after an interview-shaped prompt. The voice is supposed to be short / casual / decisional, but the FACTS the reply carries (file paths, test names, framework versions, code shapes) must match the SUT's actual state. Approximating from memory produces either (a) lies the downstream agent propagates into the artefact, or (b) lies the agent fact-checks and overrides, burning cycles fighting your text. Codesearch M3 quality-lane (2026-05-24): the canned reply named `regexp/match.go` as load-bearing; the agent ran `git ls-files '*_test.go'` first and found no such file, overrode the canned text. Before pasting, run the equivalent commands against the SUT and quote what's actually there. Use *"anything else, use your judgment"* at the end of the reply for things you don't have at hand — better than wrong specifics. Canonical: `memory/compounded/2026-05-25-content_creation-canned-reply-needs-ground-truth.md`.

**Voice constraints for canned student-voice replies:** short, decisional, defers where it doesn't matter (*"your call on CORS, skip it"*), gives a steer where it does (*"yes both 127.0.0.1 and 0.0.0.0 for bind"*). First-person, casual. Not encyclopedic. Real students answer plan-mode interrogation while doing other things, not via essays.

**Hand-off contract is SUT-side, not runner-side.** `state.json` files in `out/<run-id>/` are convenience caches that drift in observable ways (M4 captured session UUID prefix as commit SHA; M6's arc-note path scan missed the agent's `docs/practice/` destination). Downstream module readers (M5 worktree-setup, diagnose-and-resend-2, spot-gaps-1, etc.) MUST read hand-off coordinates from the SUT-side canonical: `task.md`'s protected `Run coordinates` block (committed at M4), `plan.md`'s coordinates block (written at M5 PC), the artefacts themselves. Canonical: `check_platform_and_boundaries.md` §31.

**Skills authored by curriculum prompts must namespace by SUT.** Skills at `~/.claude/skills/<name>/` live at user-global scope but their content (test-strategy, deploy-conventions, etc.) is often per-codebase. Two SUTs cycling through the same skill-authoring module (M3 author-test-strategy → lemmings + codesearch) collide on the same `SKILL.md`. Always-name `<skill>-<sut>` at write-time (e.g. `test-strategy-codesearch`, not `test-strategy`). Canonical: `check_platform_and_boundaries.md` §30.

## v0 limits — known and deliberate

- One pane, one SUT for single-session runners (`run.sh`, `run-prework.sh`, `run-m1.sh`, `run-m2.sh`, `run-m4.sh`). `run-m3.sh` orchestrates two parallel sessions for the worktree fork.
- Hook is per-cwd. `install-sut.sh` writes to `.claude/settings.local.json` (gitignored by default in Claude Code projects).
