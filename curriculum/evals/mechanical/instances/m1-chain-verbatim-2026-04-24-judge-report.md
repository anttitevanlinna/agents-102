# Judge report — M1 chain verbatim — 2026-04-24

## Summary
30 of 32 binary assertions PASS. One hard FAIL: `.claude/settings.local.json` never received the `additionalDirectories` edit (Actor reported sandbox denial — harness gap, not a curriculum bug). One informational FLAG: verbatim match on multi-paragraph prompts requires blockquote-prefix normalization, because the scrollback wraps pasted prompts in `> ` lines.

## Actor transcript
/Users/anttitevanlinna/.claude/projects/-Users-anttitevanlinna-Projects-agents-102/e0dddd13-9477-4dd6-9370-972610cc4c15/subagents/agent-ac6a0f51a727c51df.jsonl

## Scratch
/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/scratch/m1-chain-verbatim

## Assertions

V1. PASS — prefix `Read enough of this repo to tell me what's here: the shape,` present verbatim.
V2. PASS — prefix `What did you read, and why those files? What didn't you read` present verbatim.
V3. PASS — prefix `Find the root cause of this bug by writing the tests that wo` present verbatim.
V4. PASS (with note) — `compound-and-close/prompt-001.txt` is pasted as a markdown blockquote (each line `> `-prefixed), so a raw substring check fails at paragraph breaks; normalized blockquote form matches exactly. Tightened gitignore line present verbatim: ``Ensure `.claude/settings.local.json` is gitignored — if this repo's local `.gitignore` doesn't cover it, add it.``
V5. PASS — prefix `Read the ticket for the bug we just fixed.` present verbatim.
V6. PASS — prefix `Update the ticket: short close-out note` present verbatim.

A1. PASS — `.git/` present; `git log --oneline` = 3 commits (`9529145 initial commit`, `5aaaa59 wip`, `8206897 fix(terrain): isSolid returned inverted value`).
A2. PASS — `tests/terrain.test.mjs` exists.
A3. PASS — fix is 1-character. Bug commit (5aaaa59): `- return solid[y * W + x] === 1;` → `+ return solid[y * W + x] === 0;`. Fix commit (8206897) reverses it back to `=== 1`. One production line, same `isSolid` signature.
A4. PASS — `node tests/terrain.test.mjs` → `terrain.test.mjs: OK`, exit 0. No `npm test` (no package.json in scratch — test runner is plain node; harness fidelity note, not a fail).
A5. PASS — `CLAUDE.local.md` exists.
A6. PASS — non-empty; rules cite concrete session moments. Quote: *"When a bug report lands, write the failing test before touching the code... This is the 'red → green → refactor' discipline Kent Beck has been writing up for twenty years."* Ties directly to the Ex2 `isSolid` TDD loop.
A7. PASS — `grep -n '\[[A-Z]' CLAUDE.local.md` → no matches.
A8. PASS — `.gitignore` contains `CLAUDE.local.md` and `.claude/settings.local.json` as literal lines; `git check-ignore CLAUDE.local.md` exits 0. Local gitignore drove this, not a global excludesFile. Tightened prompt (9f575c8) worked as intended.
A9. PASS — `.claude/settings.local.json` is valid JSON (`{}`).
A10. **FAIL** — `additionalDirectories` array is absent; file remains `{}`. Actor scrollback quotes sandbox denial: *"attempted to edit `.claude/settings.local.json` to add `additionalDirectories: [\"/Users/anttitevanlinna/Projects/agents-102/content\"]`. Sandbox denied the write ('additional directory access self-modification')."* Harness-level block on subagent write; not a curriculum defect.
A11. PASS — Ex3 summary after first Ex3 paste is 4 short bullets ≤ 60 words each, culminating in one-line loop-shape naming.
A12. PASS — cites specific moments: *"from Ex1 where I read 11 files, skipped `node_modules/`"*; *"the `isSolid` fix followed exactly that shape"*.
A13. PASS — no "always verify output" / "follow best practices" / motivational filler detected in the summary or in `CLAUDE.local.md`.
A14. PASS — every prompt paste was followed by an acting response; no stuck questions.
A15. PASS — prompts that imply "one at a time" (Ex1 P1, Ex1 P2) got distinct sequential responses, not question-dumps.
A16. PASS — `CLAUDE.local.md` is integrated prose under thematic H2s (Orient before touching / TDD for bugs / Show the diff / Match the user's concision), plus a `Team-worthy flags` block. No "retro notes" heading or append-style suffix.
A17. PASS — Ex2 response references files read in Ex1 (the `terrain.js` / `isSolid` predicate flagged in Ex1 orientation is exactly where the bug lands; test coordinates reason about the geometry mapped in Ex1).
A18. PASS — Ex3 summary references Ex1 (*"read 11 files, skipped `node_modules/`"*) AND Ex2 (*"the `isSolid` fix followed exactly that shape"*, *"Ex2's diff block"*).

A19. Harness substitutions logged:
- `/context` → enumerated list of Read vs. not-Read files (scrollback § "Ex1 — /context (substituted)").
- `gh` unavailable → local branch + commit stand in for the PR (scrollback § "Ex2 — commit + PR").
- No ticket connector → manual file write of close-out to `instances/m1-chain-verbatim-2026-04-24-close-out-draft.md` (scrollback § Ex3 P5 + P6).
- `.claude/settings.local.json` `additionalDirectories` edit → denied by sandbox, documented as intended config.

## Harness leakage
H1. PASS — no Read of `lemmings-seed.maintainer.md` or any planted-state file. Transcript file_paths list does not include it.
H2. PASS — only `runners/m1-chain.verbatim.actor.md` was read (allowed). No other `*.judge.md` or sibling actor runners.
H3. PASS — no Read under `curriculum/exercises/`. Prompt content came from `/tmp/prompts/`.
H4. PASS — commit messages: `initial commit`, `wip`, `fix(terrain): isSolid returned inverted value`. None name the planted bug or harness internals.
H5. PASS — no harness-internal files written inside `<scratch>` that the Actor later re-read. Files written in scratch: `.gitignore`, `CLAUDE.local.md`, `src/terrain.js`, `tests/terrain.test.mjs`, `.claude/settings.local.json` — all legitimate exercise artifacts.

## Findings for the exercises
- Strong run end-to-end: bug reproduced, root-caused, minimally fixed, cited a practitioner by name (Kent Beck), and the compounded rules quote actual session moves rather than generic wisdom.
- `CLAUDE.local.md` team-worthy flag is surfaced, not auto-PR'd — matches the prompt's instruction.

## Findings for the harness
- **A10 is a harness-fidelity gap.** Subagent sandbox denied `.claude/settings.local.json` write ("additional directory access self-modification"). Either relax the sandbox for this specific file during the Actor run, or replace the "pin content folder" move with a variant the sandbox allows (e.g., write to a sibling `settings.proposed.json` and eval that).
- **V4 verbatim check is brittle.** Scrollback wraps multi-paragraph prompts as blockquotes (`> ` per line). A literal `in`-substring check fails on any prompt with blank-line-separated paragraphs. Either (a) tell the Actor to paste prompts in fenced code blocks, or (b) normalize by stripping `^> ?` per line before comparison in future judges.
- `npm test` not applicable — scratch ships no `package.json`; tests run via `node tests/terrain.test.mjs`. Runner wording ("`npm test` exits 0 OR equivalent") already accommodates; worth tightening in a future revision to name the node invocation directly so downstream judges don't waste an `npm install` attempt.
