# Mechanical-test framework — next-session state

**Last updated:** 2026-05-02 (Bootstrap M1-M6 all PASS; script-only judges across the battery)

## Bootstrap battery — current verdict

| Module | Verdict | Judge script | Notes |
|---|---|---|---|
| M1 | **PASS 23/23** | `bin/judge-m1.sh` | personal-site-with-guardrails; 5 substitutes; A14/A16 INHERITED |
| M2 | **PASS 34/34** | `bin/judge-m2.sh` | name-your-challenge + build-your-challenge-memory chain (11 prompts); V1-V11 + H1-H4 INHERITED |
| M3 | **PASS 24/24** | `bin/judge-m3.sh` | 4 actors (wiki/docs/internet/synthesizer); V1-V4 + A5-A8 + A11 + H1-H4 INHERITED |
| M4 author | **PASS 28/28** | `bin/judge-m4-author.sh` | new runner: author-security-skill (3 prompts, single SKILL.md) |
| M4 audit | **PASS 36/36** | `bin/judge-m4-audit.sh` | 4-prompt chain: install → policy → agent-security → mitigate-residual |
| M5 | **PASS 30/30** | `bin/judge-m5.sh` | setup + 5 detectors (parallel) + scorer |
| M6 | **PASS 35/35** | `bin/judge-m6.sh` | setup + run; J1 shasum confirms judges/groundedness-judge.md byte-identical |

**Total: 210 assertions pass across all 7 runner-pairs. No LLM Judge dispatch in the pipeline.**

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

Slugs: `bootstrap-m1` | `bootstrap-m2` | `bootstrap-m3` | `bootstrap-m4-author <tr>` | `bootstrap-m4-audit <tr>` | `bootstrap-m5 <setup_tr> <det1..5_tr> <scorer_tr>` | `bootstrap-m6 <setup_tr> <run_tr> [<judge-baseline-sha>]`.

## Universal discipline (codified across this session)

- Slugs in chain-runner `### Phase N — slug` headings must contain words that uniquely appear in the referenced prompt's content (pre-flight catches collisions). All M4-M6 PASS pre-flight; M1-M2 PASS, M3's actor pattern is not phase-keyed (single-prompt actors).
- V-checks via `bin/prompt-read-check.sh <prompt> <transcript>` — transcript Reads are unforgeable. Forcing-function instruction in the runner prelude makes Haiku reliably Read.
- Tracked mock fixtures under `playgrounds/bootstrap-mocks/`; staged via `bin/stage-bootstrap-mocks.sh`.
- Word caps in Judge: 1.5× the spec to allow Haiku stub overshoot.
- Heading-depth regex: `^#{2,3} Phase` (Actor may use `##` or `###`).
- Per memory rule #20: `PASS on exit 0; FAIL on any non-zero` — Judge does NOT re-derive from scrollback when a script returns non-zero.
- Per memory rule #17: every Judge run leaves a script behind; the LLM Judge is a transitional orchestrator, not an assertion-grader. **The Bootstrap battery has reached this endpoint.**

## Subagent-dispatch lessons (newly compounded this session)

- **Producer/consumer subagents serialize, not parallel.** Audit reads SKILL.md authored by author. Memory: `feedback_subagent_dependencies_serialize.md`. Haiku will not poll; it returns "I'm waiting" and exits.
- **Re-staging a module's scratch is destructive.** `rm -rf scratch/bootstrap-m<N>/ && cp -R scratch/bootstrap-m<N-1>/ scratch/bootstrap-m<N>/`.
- **No git stash in trunk-based work.** Memory: `feedback_no_git_stash_trunk_based.md`. Either commit a slice or `fetch --merge --ff-only`.
- **Trust artefacts, not Actor narrative.** Reports occasionally hallucinate via stale templates (saw this twice on M4 author). The on-disk state and transcript are authoritative.
- **Subagent dispatcher needs explicit forcing-functions for Haiku.** "Three Reads, three pastes" stated in the prompt makes the difference between V-PASS and silent inlining.

## Pre-staged state at end of session

- `/tmp/bootstrap-mocks/` — re-stageable via `bin/stage-bootstrap-mocks.sh` (12 files).
- `/tmp/prompts/{personal-site-with-guardrails,name-your-challenge,build-your-challenge-memory,three-retrievers-one-curator,audit-your-agent,author-security-skill,hallucination-bakeoff,eval-loop}/` — all extracted via `parse-prompts.sh`.
- `scratch/bootstrap-m{1..6}/` — all PASSed in this session. Each one inherits from the prior.

## What's next (post-session)

The script ratchet has reached the aspirational endpoint for Bootstrap. Next moves, in priority order:

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
├── stage-bootstrap-mocks.sh
└── verbatim-check.sh              substitute-paste check (scrollback-based)
```

**Aspirational endpoint reached for Bootstrap.** AE101 is the next surface.
