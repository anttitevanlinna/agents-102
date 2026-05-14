# Mechanical-test framework — next-session state

**Last updated:** 2026-05-14 (AE101 prework + M1 landed; both PASS first-fire post-registry).

## Agents 101 battery — current verdict

| Module | Verdict | Judge script | Notes |
|---|---|---|---|
| M1 | **PASS 23/23** | `bin/judge-m1.sh` | personal-site-with-guardrails; 5 substitutes; A14/A16 INHERITED |
| M2 | **PASS 34/34** | `bin/judge-m2.sh` | name-your-challenge + build-your-challenge-memory chain (11 prompts); V1-V11 + H1-H4 INHERITED |
| M3 | **PASS 24/24** | `bin/judge-m3.sh` | 4 actors (wiki/docs/internet/synthesizer); V1-V4 + A5-A8 + A11 + H1-H4 INHERITED |
| M4 author | **PASS 28/28** | `bin/judge-m4-author.sh` | new runner: author-security-skill (3 prompts, single SKILL.md) |
| M4 audit | **PASS 36/36** | `bin/judge-m4-audit.sh` | 4-prompt chain: install → policy → agent-security → mitigate-residual |
| M5 | **PASS 30/30** | `bin/judge-m5.sh` | setup + 5 detectors (parallel) + scorer |
| M6 | **PASS 35/35** | `bin/judge-m6.sh` | setup + run; J1 shasum confirms judges/groundedness-judge.md byte-identical |

**Total: 210 assertions pass across all 7 Agents 101 runner-pairs.** Last fired 2026-05-02 — pre-prompts-registry SHAs; the parse layer is marker-aware (76b70a7), so the assertions should still hold, but the SHA pins are stale. Re-fire as a regression check when convenient.

## AE101 battery — current verdict (NEW 2026-05-14)

| Module | Verdict | Judge script | Notes |
|---|---|---|---|
| prework | **PASS 19/19** | `bin/judge-ae101-prework.sh` | 3 prompts (download / extract+install / one-at-a-time fallback). Substitutions: prompt-001 `URL:` open-hook → pre-staged tarball path, `~/Downloads/` → `Downloads-stub/`, `~/Documents/` → `Documents-stub/`, `~/.claude/skills/` → `.claude-user-stub/skills/`. Mock student inputs at `/tmp/ae101-mocks/student-inputs.md`. |
| M1 chain | **PASS 37/37** | `bin/judge-ae101-m1.sh` | 9 prompts across 3 exercises (orient-and-introspect, fix-tests-first, compound-and-close). Substitutions: `/rename`, `/context`, `gh pr create`, MCP connector → path-3 manual paste. Real `npm test` green-check at end. Branch `fix/totals-negative-summation` ships the fix; `CLAUDE.local.md` born from session; `docs/tickets/AE-42.md` Resolution section appended. |
| M2 push-back | **PASS 20/20** | `bin/judge-ae101-m2-pushback.sh` | 4 prompts (push-back-on-the-plan). Plan-mode substitution → write plan to `<scratch>/repo/.claude-plans/groupbyreason-helper.md`. Stop discipline enforced. |
| M2 extract | **READY (LLM-Judge era)** | `runners/ae101-m2-extract.{actor,judge}.md` | 4 prompts (extract-the-task-shaping-rule). Pre-registry LLM-orchestrated. TODO: lift to script-only. |
| M3 chain | **PASS 41/41** | `bin/judge-ae101-m3.sh` | 11 prompts × 3 exercises (map+stride+author). Skill-as-subagent → inline; authored test-strategy skill with YAML frontmatter + TODO; ADR + surface map + threat list with HIGH-flagged entry. |
| M4 chain | **PASS 29/29** | `bin/judge-ae101-m4.sh` | 7 prompts (walk-and-send-off + module body). Substitutions: `/rename`, audit-as-subagent → inline, walk-away simulated. Deliberate M4 partial-shipping (no README update, no bin entry, no RFC 4180 escaping) preserved for M5 to diagnose. m4/ branch carries the work commit. |
| M5 chain | **PASS 29/29** | `bin/judge-ae101-m5.sh` | 8 prompts (worktree + diagnose-and-resend + re-run). Substitutions: worktree → in-place branch, `~/.claude/projects/...` transcript path → `.claude-projects-stub/`. Verifier hook + plan.md + reference.md ship; M4 gaps closed (escaping + README + bin entry). |
| M6 chain | **PASS 26/26** | `bin/judge-ae101-m6.sh` | 6 prompts (spot-gaps + arc-retrospective). Reads BOTH m4 + m5 transcript stubs; cuts a stale rule from CLAUDE.local.md; authors second skill (YAML + TODO); writes arc-retrospective with quoted artefacts. |

**Total: 201 assertions pass across seven script-only AE101 runner-pairs** (prework + M1 + M2-pushback + M3 + M4 + M5 + M6). The `ae101-m2-extract` runner is the one remaining LLM-orchestrated piece of the AE101 battery.

**Stage script flag (`--module`):** `bin/stage-ae101-m1.sh <scratch> --module <m4|m5|m6>` pre-stages simulated prior-run state (M3 artefacts → M4; +m4 branch + transcript stub → M5; +m5 worktree + both transcripts → M6).

**Known pre-existing curriculum-source Sev-1s** (surfaced by `prompt-source-audit.sh`, treated as informational by M4-M6 Judges; targets for the suspicion sweep):

- `walk-and-send-off-2` and `walk-and-send-off-4`: P4 curriculum-vocab leak ("M3", "the send-off"). Real prompt-source issue, NOT a runner/Judge bug.
- `run-the-first-experiment` module body: P4 leak similarly. To be cleaned in the suspicion sweep.

### AE101 playground

- **Seed repo:** `playgrounds/ae101-m1-seed/` — tiny Node library (`daily-totals`) with `node --test`. Planted bug: `if (n < 0) continue;` in `src/totals.js` skips negative line items. Existing tests cover happy paths only; the bug fails silently until a negative-input test fires.
- **Content stub:** `playgrounds/ae101-content-stub/` — minimal shape (lectures/exercises/reference/supplementary/content/skills/) with two stub SKILL.md files. Tarballed by `stage-ae101-m1.sh` into the scratch's `Downloads-stub/`.
- **Mocks:** `playgrounds/ae101-mocks/student-inputs.md` — substituted student answers (3 candidate bugs, the pick, the bug description, the diff push-back, the root-cause push, the close-out path choice). Stage script copies it to `/tmp/ae101-mocks/`.
- **Stage:** `bin/stage-ae101-m1.sh` builds `scratch/ae101-m1/{repo,Downloads-stub,Documents-stub,.claude-user-stub}` from scratch. Idempotent — re-runnable any time.

### AE101 — what's left

| Surface | Status |
|---|---|
| prework | PASS |
| M1 (getting-going) | PASS — chain runner covers orient/fix/compound |
| M2 (plan-mode-done-right) | PASS — `ae101-m2-pushback` covers push-back-on-the-plan; `ae101-m2-extract` covers extract-the-task-shaping-rule (LLM-Judge era, lift to script-only later) |
| M3 (earn-the-trust) | PASS — `ae101-m3` chain covers map+stride+author |
| M4 (run-the-first-experiment) | PASS — chain runner covers walk-and-send-off + send-off |
| M5 (learn-from-the-test) | PASS — chain runner covers worktree + diagnose-and-resend + re-run |
| M6 (spot-gaps-build-the-loop) | PASS — chain runner covers spot-gaps + arc-retrospective |

## How prompt-rot is detected (four layers)

A judge can return PASS only if all four layers green-light:

1. **Pre-flight `runner-mapping-check.sh`** — for each `### Phase N — slug`, scores keyword overlap of slug vs. referenced `prompt-NNN.txt` content vs. every other extracted prompt. If the slug matches a different prompt better → `BLOCK / phase-swap`. Catches rename, reorder, or coverage-gap drift.
2. **`prompt-source-audit.sh`** — static lint of curriculum source. `[BRACKET]` placeholder leak in fenced code, missing `**Prompt**` label, fenced block with no action lead-in.
3. **`prompt-read-check.sh`** (V-checks) — greps Actor transcript for `Read` tool_use of every `prompt-NNN.txt`. Inlining a prompt without Read = no PASS. M4-M6 enforce this via the runner's "Hard rule (forcing-function): invoke the Read tool BEFORE blockquote-pasting" prelude.
4. **Per-phase shape assertions** — file-existence, scrollback content, structure markers (≥3 Q-markers, ≥4 StoryBrand beats, 4 named attack classes, 5 mitigation shapes verbatim, etc.). If a prompt's spec changed (e.g., 5 beats → 4), the assertion fails against fresh scratch.

**Plus cross-exercise contracts** in chained runners: M4 audit ERRORs out at Arrange if `module-4/skills/security-audit/SKILL.md` doesn't exist; M5/M6 inherit the same shape.

**Gap to know about:** rows marked `INHERITED` in M1-M3 reports reference the prior LLM-Judge PASS verdict — those are transcript-only assertions (e.g., `jq` checking the actor Read sibling-runner files). They do *not* re-fire against current prompts. The non-inherited assertions (file shape, scrollback content) still validate the live state. To re-validate transcript-level claims after a prompt edit, dispatch the actor fresh.

## Top-level dispatcher

```
bin/judge.sh <runner-slug> [extra-args]
bin/judge.sh all              # fires M1-M3 in sequence (M4-M6 need transcript paths)
```

Slugs: `agents-101-m1` | `agents-101-m2` | `agents-101-m3` | `agents-101-m4-author <tr>` | `agents-101-m4-audit <tr>` | `agents-101-m5 <setup_tr> <det1..5_tr> <scorer_tr>` | `agents-101-m6 <setup_tr> <run_tr> [<judge-baseline-sha>]`.

## Universal discipline (codified across this session)

- Slugs in chain-runner `### Phase N — slug` headings must contain words that uniquely appear in the referenced prompt's content (pre-flight catches collisions). All M4-M6 PASS pre-flight; M1-M2 PASS, M3's actor pattern is not phase-keyed (single-prompt actors).
- V-checks via `bin/prompt-read-check.sh <prompt> <transcript>` — transcript Reads are unforgeable. Forcing-function instruction in the runner prelude makes Haiku reliably Read.
- Tracked mock fixtures under `playgrounds/agents-101-mocks/`; staged via `bin/stage-agents-101-mocks.sh`.
- Word caps in Judge: 1.5× the spec to allow Haiku stub overshoot.
- Heading-depth regex: `^#{2,3} Phase` (Actor may use `##` or `###`).
- Per memory rule #20: `PASS on exit 0; FAIL on any non-zero` — Judge does NOT re-derive from scrollback when a script returns non-zero.
- Per memory rule #17: every Judge run leaves a script behind; the LLM Judge is a transitional orchestrator, not an assertion-grader. **The Agents 101 battery has reached this endpoint.**

## Subagent-dispatch lessons (newly compounded this session)

- **Producer/consumer subagents serialize, not parallel.** Audit reads SKILL.md authored by author. Memory: `feedback_subagent_dependencies_serialize.md`. Haiku will not poll; it returns "I'm waiting" and exits.
- **Re-staging a module's scratch is destructive.** `rm -rf scratch/agents-101-m<N>/ && cp -R scratch/agents-101-m<N-1>/ scratch/agents-101-m<N>/`.
- **No git stash in trunk-based work.** Memory: `feedback_no_git_stash_trunk_based.md`. Either commit a slice or `fetch --merge --ff-only`.
- **Trust artefacts, not Actor narrative.** Reports occasionally hallucinate via stale templates (saw this twice on M4 author). The on-disk state and transcript are authoritative.
- **Subagent dispatcher needs explicit forcing-functions for Haiku.** "Three Reads, three pastes" stated in the prompt makes the difference between V-PASS and silent inlining.

## Pre-staged state at end of session

- `/tmp/agents-101-mocks/` — re-stageable via `bin/stage-agents-101-mocks.sh` (12 files).
- `/tmp/prompts/{personal-site-with-guardrails,name-your-challenge,build-your-challenge-memory,three-retrievers-one-curator,audit-your-agent,author-security-skill,hallucination-bakeoff,eval-loop}/` — all extracted via `parse-prompts.sh`.
- `scratch/agents-101-m{1..6}/` — all PASSed in this session. Each one inherits from the prior.

## What's next (post-session)

The script ratchet has reached the aspirational endpoint for Agents 101. Next moves, in priority order:

0. **P0 — Is the battery actually testing anything sensible?** (logged 2026-05-14, AE101 M5/M6 grep bug investigation). A copy-paste bug in three AE101 prompts — `git branch -a | grep '/m4/'` (matches remote-only; misses the local-only m4 branch a real student would have) — was missed by all seven AE101 script-only runners despite touching the M5 and M6 chains they nominally cover. Mechanism: the runner pre-seeds the scratch with `m4/dailytotalsbycategory` and `m5/dailytotalsbycategory` branches via `stage-ae101-m1.sh`, the actor reads the prompt as text and produces a *narrative* response (four-dimension diff, quoted moments, ranked gaps), and the judge confirms artefact existence in scratch — but the actor never tool_uses `Bash` to run the prompt's grep. So the battery is testing "can an LLM produce coherent prose given a pre-seeded fixture and a prose-shaped prompt?" — not "do the prompt's executable instructions work for a student copy-pasting into a terminal?" Two different surfaces, only the first is covered. The same shape masks `cp -r .../<dir>/ .../<dir>/` missing a preceding `mkdir -p` in `ae101-m5-worktree-setup.md:11` (would fail on a fresh worktree without `.claude/` tracked in git). **Decide before further AE101 ratchet investment whether (a) to add a shell-execution lint pass to `prompt-source-audit.sh` covering the suspect patterns (cheapest move, catches the class; 3 regex rules cover the known cases), (b) to extend the runner to actually `Bash` the prompt's executable snippets against a scratch *without* the answer pre-seeded, or (c) to scope the battery's claim more honestly (it's a prose-coherence regression test, not an executable-prompt verification). Status quo is a green-board that doesn't catch student-blocking shell bugs.**
1. **AE101 mechanical battery.** AE101 has `m2-extract` runner already; rest of the modules are open. Same shape: per-module judge script, top-level dispatcher.
2. **Retire M1-M3 INHERITED rows.** Re-run M1-M3 actors fresh in a single session; replace INHERITED with live transcript-jq checks. Cost ~25 min Haiku.
3. **Generalize `bin/extract-tool-uses.sh`.** Every judge script duplicates the same `jq` shape that extracts tool_use stream from a transcript. One helper would isolate that.
4. **Add `bin/runner-mapping-check.sh` to single-prompt runners.** M3's retrievers don't use phase-keyed slugs; the check skips them. A single-actor variant would catch slug-prompt drift on those too.

## Script ratchet — what `bin/` contains

```
bin/
├── continuation-diff.sh           HTML-aware v-N → v-N+1 continuity
├── judge.sh                       [NEW] top-level dispatcher (slug → per-module script)
├── judge-m1.sh                    [NEW] script-only Judge (23 assertions)
├── judge-m2.sh                    [NEW] script-only Judge (34 assertions)
├── judge-m3.sh                    [NEW] script-only Judge (24 assertions)
├── judge-m4-author.sh             [SESSION] script-only Judge (28 assertions)
├── judge-m4-audit.sh              [SESSION] script-only Judge (36 assertions)
├── judge-m5.sh                    [SESSION] script-only Judge (30 assertions, 7 transcripts)
├── judge-m6.sh                    [SESSION] script-only Judge (35 assertions, J1 shasum)
├── migrate-judges-to-prompt-read.sh
├── no-write-between-reads.sh
├── preflight-all.sh
├── prompt-read-check.sh           V-checks via transcript jq
├── prompt-source-audit.sh         P/E lint on curriculum source
├── run-mechanical.sh
├── runner-mapping-check.sh        chain-runner-aware pre-flight (prompt-rot sentinel)
├── stage-agents-101-mocks.sh
└── verbatim-check.sh              substitute-paste check (scrollback-based)
```

**Aspirational endpoint reached for Agents 101.** AE101 is the next surface.
