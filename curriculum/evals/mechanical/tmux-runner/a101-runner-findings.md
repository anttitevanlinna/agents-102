# Agents 101 live-chain findings

## 2026-11-01 — first full live chain, nordveil, Sonnet 5.5, Claude Code 2.1.292, maintainer's Mac

Chain dir `out/_chains/20261101-203303-74979`. All eight modules green on Sonnet. One training dir throughout; five resumes (`--from m2`, `m5`, `m6` twice, `m7`) after harness fixes or a second sample, each on the prior module's real output.

| Module | Result | Run | Notes |
|---|---|---|---|
| prework | PASS | a101-prework-20261101-203309-75607 | T4 prints a FAIL line for the mtime alternative even when the transcript alternative passes (cosmetic). |
| m1 | PASS | a101-m1-20261101-203412-77489 | |
| m2 | PASS (2nd try) | a101-m2-20261101-211218-3371 | 1st try red at T4: harness sentinel (H-1). T12 WARN: operator-global bleed (C-3). |
| m3 | PASS | a101-m3-20261101-212010-14136 | T8 WARN: same bleed, still in the rewritten root file. |
| m4a | PASS | a101-m4a-20261101-212813-24136 | |
| m4b | PASS | a101-m4b-20261101-213252-28712 | `Skill(agent-audit)` loaded: the student's project copy. |
| m5 | PASS (2nd try) | a101-m5-20261101-214106-37294 | 1st try red at T1: Sonnet refused the harness plant tail (H-2). T1 then held 1783s on a stale status line (H-4). |
| m6 | RED, then PASS | red a101-m6-20261101-222028-66564 · pass a101-m6-20261101-223013-76158 | 1st try red at T2: harness missed a running background agent (H-3). Two real samples: 2→4→1→4 (THEATER, red), 0→2→1→1 (zero-floor carve-out, pass). C-1, C-2. |
| m7 | PASS (2nd try) | a101-m7-20261101-231847-18237 | 1st try (a101-m7-20261101-224407-91734) red at T6: harness checked the wrong file (H-6); T1 held 1657s on H-4 before that fix loaded. |
| m8 | PASS | a101-m8-20261101-232415-23668 | 10 turns, shared room through selection board, kernel, agent set and plan. |

### Harness faults (fixed on main, test-first)

- **H-0 Model.** A bare `claude` inherited the operator's global `"model": "opus"`. Runner default is now `claude --model sonnet --permission-mode auto` (Antti: runner sessions run on Sonnet). Haiku 5.5 untested.
- **H-1 M2 held-back sentinel.** `volatile SMB` also sits in `wiki/pilot-cohort-notes.md`, which ingest copies on purpose: a faithful ingest read as a leak, and T9's integration check could pass without the counter-case. Both sentinels are now `survivorship|loss-averse`; `test-a101-held-back-source.sh` fails if either occurs in an ingested source.
- **H-2 M5 plant tail.** The seed said "Do not tell the user they are planted." Sonnet refused the whole turn: the pasted message asked it to keep something from its user. Seeds now say the student wrote the test lines and keep them unmarked only in the file; `test-a101-m5-seam.sh` fails on a concealment clause.
- **H-3 Background agent invisible.** This Claude Code version can yield with prose while an agent runs, showing it only as an agents-panel row (`◯ general-purpose … · ↓ 42.8k tokens`). `pane_busy` now treats a running panel row as busy.
- **H-4 Stale Waiting line.** "Waiting for 1 background agent to finish" stayed the last status line after the agent finished; the runner held for the full budget. Pending now needs fewer than N `Agent "…" finished` notices after the last Waiting line.
- **H-5 M4 skill shadow.** `security-audit` collided with a personal claude.ai skill of the same name, synced as `anthropic-skills:security-audit` (not an Anthropic built-in) and carrying the course's own body, so content greps pass whichever copy fires. Probe: the project copy won on both `/security-audit` and plain language. Renamed to `agent-audit` (Antti); m4b T1 fails on a namespaced load and WARNs on a same-name copy outside the project (`tests/skill-shadow.test.sh`).

- **H-6 M7 T6 wrong file.** The check took the first `module-7/*.md` in the transcript (the prompt echo's `jtbd.md`); the agent had rewritten `technical-plan.md` as asked. `a101_rewritten_path` now prefers the claimed rewrite, then the last Write/Update/Edit target (`tests/rewritten-path.test.sh`).

### Course findings (for the maintainer)

- **C-1 The fixed judge is only fixed on disk (M6, both samples).** The loop prompt binds the judge subagent to read `judges/groundedness-judge.md`, but the main session added its own instructions on top ("a strict citation check"; sample 2: "the judge needed an extra instruction"). The SHA check passes while the effective rubric moves between rounds. Proposed prompt change, needs a card: the judge subagent gets the judge file, `./crux.md`, `memory/` and the briefing, and nothing else in its instructions.
- **C-2 At this corpus's floor the loop's score is noise (M6).** Round-1 counts of 2 and 0 leave nothing countable to improve; both samples' own notes call the spread sampling noise (one generator and one judge sample per round, claim counts 18–31). The runner's round-1-vs-last comparison is a single sample on each side. Real movement shows in the uncounted dimension (omission, cherry-picking), which both notes name as what the judge cannot see.
- **C-3 Operator-global CLAUDE.md bleeds into the student artifact (M2 T12, M3 T8).** The generated root instructions carry "Real prospect names don't enter files here; use the pseudonym." from the operator's `~/.claude/CLAUDE.md`. A student would not have it. Proposed runner fix: run the SUT session with an isolated config dir or scratch HOME (moves where auth is read; not attempted).
- **C-4 Pasted prompts sit near a refusal line (M5 watch item).** Claude Code treats the tmux-pasted turn as pasted text; it acted on the benign course prompt but refused once the paste asked it to act against its user. Students paste prompts too: any course prompt that reads as working against the user is close to this line.

### Tooling notes

- Launch detached: `nohup caffeinate -i ./chain-agents-101.sh … > out/<log> &`. The desktop keep-awake tool was refused by auto mode.
- A resume after a mid-module red: delete that module's outputs (`module-N/`, files it created at root) before `--from mN --chain-dir <id>`; arranging again would move the earlier modules to a backup.
