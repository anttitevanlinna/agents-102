# RESUME — Agents 101 tmux-runner build (handoff across compaction)

**Date:** 2026-06-06. **Goal:** a tmux runner that drives a Claude Code session
through the **Agents 101** student experience on a SYNTHETIC persona, to surface
prompt/progression problems (NOT just pass/fail). **Current goal = M1–M6 tested +
fixed** (M7 + M8 deferred). Build chains run LIVE end-to-end (no entry-state
seeding) so cross-module handoff seams are exercised. M4–M6 build specs distilled
in `SPECS-m4-m6.md`.

**Module map (authoritative = prompt `origin:`):** M1 getting-going · M2
building-agent-systems · M3 multi-agent-systems · M4 security · M5 output-quality
· M6 evaluations · M7 personal-to-team · M8 agents-building-agents. (personal-to-
team is M7 NOT M3 — module-doc in-body grep is noisy.)

**STATUS 2026-06-06:** prework+M1+M2 green live (clean chain). **H1 CLOSED** live.
**M3 DONE + AUDITED** — 9/9 PASS (`out/a101-m3-20260606-103404-12304`), and the
audit-beyond-green confirms the synthesis seam fired for real (retriever opened
Halvorsen, synthesizer named the contradiction both-sides-raw, Answer adjudicated,
debrief named 2 real handoff seams, memory-health dropped soft-pages). Findings
logged: **H4** (runner net-answer misdirection → FIXED, test-first invariant C in
`tests/test-a101-m3-seam.sh`) + **C9** (content: three-minds pre-converges 2 of 3
stances, debrief blames the student → PROPOSED in `pre-cohort-todos.md §13`).
**M4 DONE + AUDITED** — full clean chain prework→m1→m2→m3→m4a→m4b exit 0
(`bxh3rlp1d`, `out/last-chain-m4.log`). The 3 plants (PII / injection-in-docs /
over-broad-reach) did NOT break the M2/M3 seams (both fired again), and M4 caught
all three beyond green with exemplary reasoning (incl. refusing a no-op PII "fix").
Built: `scenarios/a101-m4{a,b}.txt`, `answers/m4-*.txt`, 3 plants +
`tests/test-a101-m4-plants.sh`, run-a101.sh wiring (m4a|m4b), chain extended.
Runner fix H5 (m4b:2 WARN false-positive → tightened regex). ~/.claude skill leaf
cleaned up post-run. **M5 DONE + audited** (gold-standard). **M6 DONE + audited**
(`bsvnqfa5p` first run surfaced H6+C10+C11; re-run `bjv0zsf08` green). **M1–M6
COMPLETE.** Build specs: `SPECS-m4-m6.md`. See STATUS block below.

## What exists (all under curriculum/evals/mechanical/tmux-runner/)

- **Persona kit** `fixtures/agents-101-synthetic/` — Ingrid Solberg, VP Product
  Ops @ fictional Nordveil; challenge = per-seat → usage-based pricing, SMB
  bill-shock churn risk. `linkedin-profile.md`, `m1-inputs.md`, `challenge-seed.md`,
  `meetings-week.md`, `answers/*.txt` (scripted interview replies), and the
  **5-file source corpus** `sources/{wiki,docs,web}/` with a DELIBERATE
  contradiction (web playbook = usage-based lifts NRR; web churn-warning =
  churns volatile SMB). README.md explains it all.
- **`run-a101.sh`** — parameterized `--module {prework|m1|m2}`; token subst from
  the kit; per-turn artifact assertions (file-exists + grep + mtime, not git);
  AUQ + plan-mode suppression via scenario tails.
- **`arrange-agents-101.sh`** — wipes/backs up training dir `~/Documents/agents-101-runner/`,
  builds+stages starter tarball, installs Stop hook, stages material to
  `~/Documents/agents-101-runner-material/` (wiki/docs/web for ingest;
  `new/usage-pricing-churn-warning.md` HELD BACK for compound).
- **`chain-agents-101.sh`** — arrange → prework → m1 → m2, `--from/--to/--no-arrange`.
- **`scenarios/a101-{prework,m1,m2}.txt`**.
- **`a101-runner-findings.md`** — THE DELIVERABLE. All findings logged.
- **Tests:** `tests/test-assert-or-warn-usage.sh`, `tests/test-a101-held-back-source.sh` (both PASS).

## Run status (2026-06-06)

- prework 3/3 PASS, M1 9/9 PASS, M2 12/12 PASS — first slice, single-shot.
- Runs in `out/a101-{prework,m1,m2}-20260606-*`. Training dir at
  `~/Documents/agents-101-runner/` (post-M2 state, with the H1 bug present).

## Harness fixes done

- **H3 FIXED** assert_or_warn arg-order no-op (test added).
- **H1 FIXED (test-first), NOT re-run live yet** — held-back counter-case was
  swept into ingest, so the compound turn was a no-op and the synthesis seam
  never fired despite all-green. Scoped curate/ingest to wiki/docs/web + added
  runtime guards (sentinel `survivorship` absent until compound, present after).
- **H2 mitigated** non-gating WARN detector at m2:12 for operator-global ~/.claude
  bleed; real fix = run under isolated $HOME/.claude (documented, not done).

## STATUS: M1–M6 COMPLETE ✅ (2026-06-06) → NOW IN FIX PHASE

**NEXT PHASE (Antti driving): fix the findings one by one. DRIVER = `FIX-PLAN.md`**
(prioritized worklist + the per-fix process gate). Content detail in
`pre-cohort-todos.md §13`; runner detail in `a101-runner-findings.md`. The
propose-only gate is lifted (maintainer present); the check_prompts.md + BEFORE/AFTER
quality gate still applies to every prompt edit.

All six modules built, run live on the synthetic persona, audited beyond green.
M6 re-run `bjv0zsf08` exit 0, 4/4 PASS (m6:2 → C10 WARN+pass, m6:4 → C11 WARN+pass,
judge byte-identical). Full test suite 11/11 green. `~/.claude` clean. Nothing
committed — awaiting Antti's review. Findings: `a101-runner-findings.md` (run log +
C1–C11 + H1–H6 + the STATUS block). Routed to `pre-cohort-todos.md §13`: C1–C11, P1.

**Remaining (all non-blocking, optional):**
- One full clean-chain `./chain-agents-101.sh --to m6` for a single end-to-end pass
  (each module already validated; the chain default --to is still `m2` — bump if
  desired). ~90 min.
- Cross-cutting opens: H2 (run under isolated $HOME so m4a's skill install + debriefs
  don't touch/absorb operator ~/.claude) ; P1 (per-training tarball subset).
- Antti to review, then commit (new files under tmux-runner/ + fixtures + tests).

## (prior) IN FLIGHT — now closed
- **M6 FIRST RUN DONE + AUDITED** (`bsvnqfa5p`, `out/last-m6.log`): the most
  valuable result of the battery. m6:2 false-FAILed on round-1=0; investigation
  showed it's NOT theater (the loop did real work in the uncounted overreach
  dimension — M5's source-triangulation judge is overreach-blind by its own Known
  limit, meeting the grounded M6 corpus). Three findings, all logged:
  - **H6 (runner, FIXED test-first):** m6:2 "round-1=0 ⟹ theater" false inference →
    pure classifier `eval_trajectory_verdict` (lib/assertions.sh) +
    `tests/test-a101-m6-trajectory.sh` (6 unit + 1 integration on the real run).
  - **C10 (content, §13):** M5→M6 judge-mode coupling (narrow judge → flat
    countable trajectory on grounded corpus).
  - **C11 (content, §13):** generation-prompt.md vs generation-tactic.md naming seam.
  Judge stayed byte-identical (both checks). All in `a101-runner-findings.md` + §13.
- **AFTER M6 re-run green:** M1–M6 all built + validated. Remaining (none blocking):
  optional full clean-chain `--to m6` for one end-to-end pass; cross-cutting opens
  H2 (isolated $HOME) + P1 (tarball subset). Nothing committed — Antti reviews.
- **M5 DONE + AUDITED** (`b77c1cgns`): gold-standard — detectors EARNED all 3 plant
  catches with the right category each. No curriculum defects.

## DONE (2026-06-06, survives compaction)

- **M4 DONE + AUDITED** (chain `bxh3rlp1d`): 3 plants caught beyond green; M2/M3
  seams survived; runner fix H5; ~/.claude leaf cleaned up. Details above + findings.
- **M3 DONE + AUDITED** (was `bebn1nqzg`): all 5 beyond-green checks passed; seam
  fired for real. Runner bug H4 fixed (test-first), content C9 logged.
- **H1 CLOSED LIVE** (revalidation `b5wde3aj3`, exit 0).
- **Open cross-cutting:** H2 (isolated $HOME so m4a's skill install + the debriefs
  don't touch / absorb operator `~/.claude`) — detect-only WARNs today, real fix
  deferred. P1 (per-training starter tarball subset) — `pre-cohort-todos.md §13`.

## NEXT ACTIONS (in order)

1. **(running — see IN FLIGHT) Re-run M2 live to confirm the synthesis seam now fires** (H1 validation):
   `cd .../tmux-runner && ./arrange-agents-101.sh && CLAUDE_RUNNER_TIMEOUT=1200 ./run-a101.sh --module prework && ./run-a101.sh --module m1 && ./run-a101.sh --module m2`
   (or `./chain-agents-101.sh`). Watch for "PASS m2 T9 compound: synthesis seam fired".
   Then re-audit turn-9/11 transcripts: does the contradiction now get genuinely
   adjudicated (both sides) rather than papered over?
2. **Content proposals (PROPOSE, do NOT apply — per Antti).** Read
   `memory/check_prompts.md` + `check_student_facing.md` FIRST (content-rules).
   Draft before/after for: C1 (bycm-2 local-file contradiction), C2 (curate→ingest
   named-scope vs glob-sweep + privacy), C3 (three-list theater when all-local),
   C4 (bycm-8 2-2-2 quota → "up to six, real only" + index-coverage check),
   C5 (bycm-4 "assume one generic" leading), C6 (bycm-6 vs bycm-9 redundancy),
   C7 (M1 retro names but doesn't remove generic line), C8 (prework extract
   surprise dirs). Plus **P1** (starter tarball ships ~150 prompts incl AE101/
   security — ship per-training subset; edit `scripts/build-agents-101-starter-tarball.sh`).
   Plus content half of H2 (debrief prompt could scope "this session" to exclude
   ambient globals).
3. Decide whether to extend the slice to M3+ (build was scoped to prework–M2).
4. Nothing committed yet — Antti to review before any commit. New files are under
   tmux-runner/ (proprietary fence) + scripts/. `agents-101-starter.tar.gz` at repo
   root is a build artifact (check .gitignore).

## Key conventions learned

- A101 = ONE growing training dir, fresh claude session per module (NOT per-module
  worktrees like AE101/lemmings). Assertions = file/grep/mtime.
- `--permission-mode auto`; never bypassPermissions. Interview + plan-mode turns
  need suppression tails. AUQ hangs the headless runner.
- assert_or_warn signature: `assert_or_warn <cmd> <args...>` (cmd first, no label).
