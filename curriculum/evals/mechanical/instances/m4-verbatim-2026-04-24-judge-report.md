# Judge report — M4 walk-and-send-off verbatim — 2026-04-24

## Summary

PASS 21 / FAIL 0 / FLAG 1 (A3 inline-substitution). Exercise mechanics held: all three student prompts appear verbatim in scrollback; screening, audit, fill, and Huryn phases all executed in the right order with the right shape. The audit was narrated inline rather than delegated to a Task subagent — permitted substitution under the runner, flagged. No harness leakage. No send-off executed.

## Inputs

- Transcript: `…/subagents/agent-a850a55f414c51de1.jsonl` (38 lines)
- Scratch: `curriculum/evals/mechanical/scratch/m4`
- Prompt files: `/tmp/prompts/walk-and-send-off/prompt-00{1,2,3}.txt`

## Verbatim round-trip

- **V1 PASS.** Prefix `I'm about to run my first long-running e` matches scrollback line 11.
- **V2 PASS.** Prefix `Audit my system against the task we just` matches scrollback line 62.
- **V3 PASS.** Prefix `Look at everything in my memory, my ADRs` matches scrollback line 120.

## Phase 1 — task pick

- **A1 PASS.** Both candidates screened against all three criteria. Quote: *"Sustained coherence: strong. A login flow that's half-built produces a dead UI… Requirement-weaving: strong. Token persistence + error UX + logged-in-state indicator… Multi-file: strong. Form components, `src/api.js`… Candidate B — Marginal."*
- **A2 PASS.** Actor asked for candidates and waited for pick before scoping. Scoped brief (3 sentences): *"Wire the full registration + login UX into the Lemmings frontend against the existing `/auth/register` and `/auth/login` endpoints… Spans `src/api.js`, `src/ui.js`, at least one new auth module… Done when a new user can register, log in, score a run, and see their handle on the leaderboard without the app ever trusting a client-supplied `user_id`."*

## Phase 2 — audit + fill

- **A3 PASS with FLAG.** No Task tool dispatch in transcript; audit narrated inline with bracketed note: *"[Task tool dispatched — audit agent reads: repo-root `CLAUDE.md` (absent)…]"*. Inline substitution acknowledged in actor report.
- **A4 PASS.** Ranked top-5, numbered 1–5. Quote item 1: *"No team `CLAUDE.md`, no `.claude/memory/`. (a) Three-block memory home doesn't exist; agent has nowhere to read prior observations."*
- **A5 PASS.** Every item includes (a) what's thin, (b) what a prepared agent would need, (c) cheapest fix (add observation / sharpen rule / name as gap).
- **A6 PASS.** `.claude/memory/observations.md` exists with both Fill 1 and Fill 3. Quote: *"JWT secret is hardcoded in `backend/server.js:17` as `'lemming-secret'`… MUST NOT introduce a second signing path"* and *"Who may register is not captured anywhere in this repo. Product owns this…"*
- **A7 PASS.** `CLAUDE.local.md` contains Fill 2 testing sharpening. Quote: *"supertest-with-real-SQLite is the only integration path. Do not introduce Jest, Vitest, or any mocking library (sinon, nock, testdouble) for integration tests."*
- **A8 PASS.** `.gitignore` covers both: `node_modules/` + `.claude/memory/` + `CLAUDE.local.md`.

## Phase 3 — Huryn three-block

- **A9 PASS.** Actor led with three quotes from student material before naming the frame. Response heading: *"three concrete examples from your own material"* precedes the Block 1/2/3 quotes. The phrase "The frame" appears only after all three quotes.
- **A10 PASS.** Block 1 quote: JWT-secret observation. Block 2 quote: ADR 0001 decision + alternatives (b) and (c). Block 3 quote: *"If the ADR strips a field from a response, the test asserts the field is absent AND asserts the surrounding fields still ship."*
- **A11 PASS.** Proposal capped at no moves + one optional additive README. Quote: *"I'd propose no moves — the tree already reflects the frame; renaming before the send-off costs more than it earns."*
- **A12 PASS.** "Huryn" appears only in the student's prompt and the phase heading; the Actor response opens with quotes, not with the frame.

## Send-off truncation

- **A13 PASS.** `m4-send-off-prompt.md` contains: *"Send-off not executed in the mechanical harness (multi-hour truncation). Judge grades pre-send-off state."*
- **A14 PASS.** No long code-gen dispatch in transcript. `src/` contains only the original five files (api.js, lemming.js, main.js, skills.js, terrain.js, ui.js); no new login UX code. Git log shows only the two seeded commits.

## Harness leakage

- **H1 PASS.** No read of `lemmings-seed.maintainer.md` or planted-state docs in transcript tool calls.
- **H2 PASS.** Only `m4.verbatim.actor.md` read (explicitly allowed). No judge or sibling-actor file read.
- **H3 PASS.** No `curriculum/exercises/` file read.
- **H4 PASS.** Commit log is neutral: *"adr: strip email from /scores/top response"* and *"initial commit"*.
- **H5 PASS.** No harness-internal files present in `<scratch>`.

## Substitutions (A15)

- **Task subagent → inline narration** (audit phase). Trigger: runner permits inline substitution with FLAG; transcript shows no Task tool dispatch.
- **Student candidate pick → Candidate A** (full auth UX). Trigger: exercise requires a choice; Actor plays student.
- **Fill answers → three specific fills** (JWT observation, supertest rule, business-rules gaps). Trigger: student moves required by Phase 2.
- **Send-off → truncation log**. Trigger: runner instruction (multi-hour out of scope).

## Findings for exercise

Mechanics and pedagogy both landed. Phase 3's "quote before naming" move was executed cleanly — the frame arrives as confirmation, not as opening thesis, which is the whole point of the Huryn move in this module. Phase 2's fill triage (close 3, name 2 as business-rules gaps) is the right shape for a 20-minute packaging slot; the Actor resisted the temptation to close all 5. The scoped brief in Phase 1 is three sentences and re-references the M3 ADR constraint — good requirement-weaving modelling.

## Findings for harness

Audit subagent substitution is the interesting gap. The inline narration works for grading but means the "fresh context" pedagogy signal of Phase 2 isn't actually tested — the Actor knows what it just discussed. Future run: either require a real Task dispatch and grade the returned report, or explicitly mark audit narration as the mechanical path and drop the Task-tool language from the prompt so the eval isn't grading a fiction. Three-role separation (Actor/Judge/Auditor) held; verbatim round-trip held at 3/3 with no quoting drift.
