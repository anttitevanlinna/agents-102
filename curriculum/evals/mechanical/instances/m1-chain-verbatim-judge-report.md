# Judge report — M1 chain verbatim

## Summary
All six V-checks PASS via `bin/verbatim-check.sh` — the prior run's V3/V4/V5 false-failures were a tooling artefact (raw `grep -F` against blockquoted scrollback), not Actor drift. Chain state is clean: 3 commits, tests green (3/3), CLAUDE.local.md grounded in session moments, .gitignore covers it. Surprise: the Actor truthfully flagged a harness-blocked `.claude/settings.local.json` write rather than fabricating a no-op success.

## Actor transcript
/Users/anttitevanlinna/.claude/projects/-Users-anttitevanlinna-Projects-agents-102/7ce5f4a2-6826-4348-ad19-bf7855c63dda/subagents/agent-ad2760e9345e01e1a.jsonl

## Scratch
/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/scratch/m1-chain-verbatim

## Assertions

V1. PASS — `verbatim-check.sh` exit 0. Prefix: `Read enough of this repo to tell me what`
V2. PASS — exit 0. Prefix: `What did you read, and why those files?`
V3. PASS — exit 0. Prefix: `Find the root cause of this bug by writi`
V4. PASS — exit 0. Prefix: `Review this session end-to-end: the orie`
V5. PASS — exit 0. Prefix: `Read the ticket for the bug we just fixe`
V6. PASS — exit 0. Prefix: `Update the ticket: short close-out note`

A1. PASS — `.git/` exists; `git log --oneline` = 3 (a971c46 / 6f4907e / 24242af).
A2. PASS — `src/__tests__/terrain.test.mjs` present.
A3. PASS — fix is a single-character flip on terrain.js:43. Bug-commit hunk shows `+  return solid[y * W + x] === 0;`; fix-commit hunk shows `-  ... === 0;` / `+  ... === 1;`. One production-code line.
A4. PASS — `npm test` errors *"Missing script"* (seed gap, not Actor regression). Ran `node --test src/__tests__/terrain.test.mjs` directly: `tests 3 / pass 3 / fail 0`. See harness finding below.
A5. PASS — `<scratch>/CLAUDE.local.md` exists.
A6. PASS — non-empty, session-grounded. Quote: *"The session bug was a single-character inversion (`=== 0` → `=== 1`). The temptation to patch every caller is real and wrong."* Names Kent Beck and the red-green loop run in Ex2.
A7. PASS — `grep -nE '\[A-Z]'` rc=1, no bracket placeholders.
A8. PASS — `.gitignore` lists `CLAUDE.local.md`; `git check-ignore CLAUDE.local.md` rc=0. The tightened-prompt fix (9f575c8) drove a local edit, not a global excludes fallback.
A9. PASS — `.claude/settings.local.json` is `{}` (valid JSON; harness-blocked write recorded as no-op per spec).
A11. PASS — Ex3 compound summary is 3 paragraphs, each <60 words.
A12. PASS — cites specific moments: *"Prompt 1: read by load-bearing-ness…"* and *"Prompt 2 forced that discipline."* Both reference exact prompts/files.
A13. PASS — no generic filler; every rule references the session ("write the failing test before the fix," "stub browser globals at test-load time," "node --test as the canonical runner").
A14. PASS — every prompt paste was followed by an action; no stalls.
A15. PASS — no question-dump.
A16. PASS — CLAUDE.local.md is integrated under thematic headings (Orientation / TDD with an agent / Working directory / Team-worthy candidates), no "session log" or "retro" boilerplate.
A17. PASS — Ex2 response cites Ex1: *"`git diff a971c46 6f4907e -- src/terrain.js`"* and *"the wip commit introduced the inversion"* — uses the orientation map from Ex1.
A18. PASS — Ex3 cites both Ex1 (*"read by load-bearing-ness… Prompt 2 forced that discipline"*) and Ex2 (*"the red-green-with-an-agent loop we ran on the `isSolid` bug"*).
A19. Substitutions used: (1) `/context` → Read-list vs tree-listing; (2) `gh pr create` → commit on main (24242af); (3) MCP tracker connector → path-3 file write to `instances/m1-chain-verbatim-close-out-draft.md`; (4) `.claude/settings.local.json` Edit → harness-blocked, recorded no-op.

## Harness leakage
H1. PASS — no Read of `lemmings-seed.maintainer.md` or any seed doc in the transcript.
H2. PASS — no Read of any `runners/*.judge.md` or other actor runner. Only own runner read: `runners/m1-chain.verbatim.actor.md` (allowed).
H3. PASS — no Read under `curriculum/exercises/`. All prompt content sourced from `/tmp/prompts/`.
H4. PASS — arrange commit messages neutral: `initial commit`, `wip`. Neither names the planted state.
H5. PASS — no harness-internal files written inside scratch. Files written by Actor inside scratch: `CLAUDE.local.md`, `.gitignore`, `src/__tests__/terrain.test.mjs`, edit on `src/terrain.js`. The close-out draft was written outside scratch (per path-3 substitution).

## Findings for the exercises
- None blocking. The chain executes cleanly end-to-end on a fresh seed.

## Findings for the harness
- **Seed `package.json` has no `test` script.** `npm test` exits with `Missing script: "test"`; Judge fell back to `node --test ...` directly to satisfy A4. Add `"test": "node --test src/__tests__/**/*.mjs"` to the seed so future runs don't need the substitution.
- **`bin/verbatim-check.sh` is the right primitive.** This run's clean PASS contrasts with the prior run's three false-fails — keep V-checks routed through the helper, do not regress to raw substring tests.

### Prompt-source audit

Inputs swept:
- Fenced prompts: `/tmp/prompts/orient-and-introspect/prompt-00{1,2}.txt`, `/tmp/prompts/fix-tests-first/prompt-001.txt`, `/tmp/prompts/compound-and-close/prompt-00{1,2,3}.txt`
- Exercise body: `curriculum/exercises/{orient-and-introspect,fix-tests-first,compound-and-close}.md` (ex-maintainer)

P1 (placeholders in fences): PASS — no `[A-Za-z]` bracket hits in M1 fenced prompts.
P2 (skill path-leak): PASS — no `.claude/skills/` references in M1 fenced prompts.
P3 (markdown shout): PASS — no `**bold**` inside M1 fenced prompts.
P4 (curriculum-vocab leak): PASS — no `M1`/`compounding`/`the kit`/`the send-off`/angle-bracket placeholders in M1 fenced prompts.
P5 (open-hook justification): PASS-with-justification on two colon-ended prompts. (a) `fix-tests-first/prompt-001.txt` ends `Let's work on this bug:` — student owns the bug from prework; Claude could not write it cold. PASS. (b) `compound-and-close/prompt-002.txt` ends `Ticket:` — student owns the tracker URL/ID. PASS. Other four prompts don't colon-end.

E1 (value-prop leak): PASS — no `vendor` / `not aspirational` / `the real practitioners` in any M1 body.
E2 (pacing-theatre): PASS — no `take a deep breath` / `close the laptop` / `pause and breathe` in M1 bodies.
E3 (tease-the-payoff headers): FLAG-clear — only `compound-and-close.md` carries `##` headers; all three name the artefact/move (`Compound`, `MCP: why your agent needs to reach outside the repo`, `Close the ticket`). No teases.
E4 (cross-module receiving): PASS — M1 has no upstream module; no receiving-side references appear, as required by the M1 carve-out.
E5 (session-mechanics naming): N/A — no session-open boundary phrases in M1 bodies (chain runs in one session).
E6 (banned words, M1 `practice`-noun carve-out): PASS — no hits on banned set in M1 bodies. Note: `practised` (verb) appears in `fix-tests-first.md` body (*"Both get practised here"*); the regex `\bpractice\b` is word-bounded and doesn't match `practised`. The M1–M3 carve-out targets the noun. **FLAG** for human review whether the carve-out is intended to cover the verb form too.
E7 (defensive value-prop): PASS — overlap-clean.

Sev-1 count: 0
Sev-2 count: 0
FLAG count: 1 (E6 verb-form `practised` interpretation)

Producer-side companion checks (manual): none — M1 has no upstream.

## Verdict

**READY-WITH-FLAGS** — all V/A/H/P/E pass; one FLAG (E6 verb-form interpretation), two harness notes (missing `npm test` script in seed; verbatim-check.sh confirmed correct primitive). The tooling fix correctly cleared the prior run's V3/V4/V5 false-fails — the regression was in the Judge, not in the Actor.
