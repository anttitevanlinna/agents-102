# Mechanical-test framework — next-session state

**Last updated:** 2026-05-02 (Bootstrap M1-M6 all PASS)

## Bootstrap battery — current verdict

| Module | Verdict | Judge | Notes |
|---|---|---|---|
| M1 | **PASS (all)** | inline | scratch/bootstrap-m1 fresh |
| M2 | **PASS 24/24** | inline | scratch/bootstrap-m2 |
| M3 | **PASS 18/18** | inline | 4 actors (wiki/docs/internet/synthesizer) |
| M4 author | **PASS 28/28** | `bin/judge-m4-author.sh` | new runner: author-security-skill (3 prompts, single SKILL.md) |
| M4 audit | **PASS 36/36** | `bin/judge-m4-audit.sh` | 4-prompt chain: install → policy → agent-security → mitigate-residual |
| M5 | **PASS 30/30** | `bin/judge-m5.sh` | setup + 5 detectors (parallel) + scorer |
| M6 | **PASS 35/35** | `bin/judge-m6.sh` | setup + run; judge file byte-identical (J1 PASS) |

## What this session shipped

### Runner rewrites (M4)
- `bootstrap-m4-author.verbatim.{actor,judge}.md` — rewrote for live exercise. Single `module-4/skills/security-audit/SKILL.md` (no plugin manifest, no two-lens-files split). Three prompts, no install/verify (those moved to audit). Attack class is `skill supply-chain`, not `plugin supply-chain`.
- `bootstrap-m4-audit.verbatim.{actor,judge}.md` — re-mapped to 4 prompts (install → policy + meta-read → agent-security → mitigate-residual). Install destination substituted to `<scratch>/skill-install/.claude/skills/security-audit/`.

### Read-tool forcing-function on every actor runner (M4-M6)
Haiku silently inlined prompt-003 in the M4 author dry-run, failing V3. Patched all M4-M6 actor runners with: *"invoke the **Read tool** on each prompt-NNN.txt BEFORE blockquote-pasting; the Judge greps the transcript for Read tool_use of every prompt file."* Subsequent runs all V-PASS.

### Script-only Judges (rule #17 ratchet)
Replaced LLM Judge dispatches for M4-M6 with bash scripts that run every assertion as a `grep`/`jq`/`diff`/`shasum` one-liner:

- `bin/judge-m4-author.sh` (28 assertions)
- `bin/judge-m4-audit.sh` (36 assertions)
- `bin/judge-m5.sh` (30 assertions, 7 transcripts: setup + 5 detectors + scorer)
- `bin/judge-m6.sh` (35 assertions, 2 transcripts; J1 = `shasum` baseline check)

All four are deterministic, run on Bash, take `<scratch_dir>` + transcript path(s), write `instances/<runner>-judge-report.md`, exit 0 on PASS / 1 on FAIL. **No LLM Judge dispatch in the new pipeline.** M1-M3 still use inline Judge but their assertion lists are simpler.

The aspirational endpoint per memory rule #17 — `bin/judge.sh <runner-slug>` with no LLM at all — is now ~80% there. Remaining: M1-M3 inline Judges to retire, plus a registry mapping slug → script.

### Universal Judge fixes (carried preemptively into M4-M6)
- Heading-depth regex `^#{2,3} ` (Actor may use `##` or `###`).
- English heading greps use `grep -i*`.
- Word caps at 1.5× spec (Haiku stub overshoot).
- Verdict per rule #20: PASS on exit 0; FAIL on any non-zero. No LLM re-derivation.
- `H2` (sibling-runner Read forbid) tightened to `runners/.*(judge|author|audit)\.` so the actor can read its own runner without false-positive.

## Subagent-dispatch lessons from this session

- **Author/audit are NOT truly parallel.** Audit reads SKILL.md authored by author; sequence them. Memory: `feedback_subagent_dependencies_serialize.md`. Haiku will not poll for missing prereqs; it returns "I'm waiting" and exits.
- **Re-staging from prior module is destructive.** `rm -rf scratch/bootstrap-m4 && cp -R scratch/bootstrap-m3 scratch/bootstrap-m4` is the only safe shape. Re-using a half-mutated scratch leaks state.
- **Stale Actor reports lie.** Two M4 author runs produced a "report" copy-pasted from a prior runner's template (mentioning `plugin-install/`). The disk state was correct; the *narrative* in the report was hallucinated. Trust file artefacts + transcripts; treat report prose as suggestive.
- **No git stash in trunk-based work.** `feedback_no_git_stash_trunk_based.md`. Either commit a slice or `fetch --merge --ff-only`.

## Pre-staged state at end of session

- `/tmp/bootstrap-mocks/` — re-stageable via `bin/stage-bootstrap-mocks.sh` (12 files).
- `/tmp/prompts/{audit-your-agent,author-security-skill,hallucination-bakeoff,eval-loop}/` — extracted via `parse-prompts.sh`.
- `scratch/bootstrap-m{1..6}/` — all final-state, all PASSed in this session. Each one inherits from the prior.

## What's next

The next big move is **retire the inline LLM Judges from M1-M3** so the entire battery runs without any LLM Judge dispatch:

1. Write `bin/judge-m1.sh`, `bin/judge-m2.sh`, `bin/judge-m3.sh` — same shape as M4-M6.
2. Add `bin/judge.sh <runner-slug>` that dispatches to the right per-module script.
3. Update `README.md` to reflect that the script ratchet has reached its endpoint.

Cross-cutting brittleness to watch:
- The `jq` extraction of tool_use timestamps assumes a `.message.content[].type == "tool_use"` shape. If the transcript schema changes, every script breaks. A single `bin/extract-tool-uses.sh` helper would isolate that.
- The `prompt-source-audit.sh <slug>` PSA call is duplicated across all six judge scripts. Could move to a shared verdict-collection helper.

## Universal discipline (codified this session)

- Slugs in chain-runner `### Phase N — slug` headings must contain words that uniquely appear in the referenced prompt's content (pre-flight catches collisions). M4-M6 all PASS pre-flight.
- V-checks via `bin/prompt-read-check.sh <prompt> <transcript>` — transcript Reads are unforgeable.
- Tracked mock fixtures under `playgrounds/bootstrap-mocks/`; staged via `bin/stage-bootstrap-mocks.sh`.
- Word caps in Judge: 1.5× the spec to allow Haiku stub overshoot.
- Heading-depth regex: `^#{2,3} Phase`.
- Per rule #20: `PASS on exit 0; FAIL on any non-zero` — Judge does NOT re-derive from scrollback when a script returns non-zero.

## Script ratchet — what `bin/` now contains

```
bin/
├── continuation-diff.sh           HTML-aware v-N → v-N+1 continuity
├── judge-m4-author.sh             [NEW] script-only Judge (28 assertions)
├── judge-m4-audit.sh              [NEW] script-only Judge (36 assertions)
├── judge-m5.sh                    [NEW] script-only Judge (30 assertions, 7 transcripts)
├── judge-m6.sh                    [NEW] script-only Judge (35 assertions, J1 shasum)
├── migrate-judges-to-prompt-read.sh  bulk migration scaffold (M2 only)
├── no-write-between-reads.sh      A16-style assertion
├── preflight-all.sh               survey every actor runner's verdict at once
├── prompt-read-check.sh           V-checks via transcript jq
├── prompt-source-audit.sh         P/E lint on curriculum source
├── run-mechanical.sh              one-shot orchestrator
├── runner-mapping-check.sh        chain-runner aware pre-flight
├── stage-bootstrap-mocks.sh       playground → /tmp fixture stage
└── verbatim-check.sh              substitute-paste check (scrollback-based)
```

Aspirational endpoint: `bin/judge.sh <runner-slug>` with no LLM Judge dispatch at all. M4-M6 done; M1-M3 next session.
