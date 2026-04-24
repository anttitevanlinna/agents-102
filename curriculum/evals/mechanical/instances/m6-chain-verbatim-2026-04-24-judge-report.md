# Judge report — M6 chain verbatim — 2026-04-24

## Summary
**Pass 32 / 32. Fail 0.** (V1–V5, A1–A23, H1–H6 all pass; A23 informational.)

## Verbatim round-trip
- **V1–V5 PASS.** All five prompt files round-tripped against scrollback via `verbatim-check.sh` (prompts 001–004 of `spot-gaps-build-the-loop` + 001 of `arc-retrospective`).

## Ex1 Phase 1 — diff

- **A1 PASS.** All four dimensions present. Caught: *"auth.me.test.js references a non-existent endpoint — stale from prior run, recommend delete."* Missed: register path PASSed on prose — *"Kept total UI surface tiny. Registration can be a separate concern."* Introduced: *"the verifier accepted the explanation."* Where-fix: *"NEW SKILL — LLM-judge that reads shipped code against each 'done means' clause."*
- **A2 PASS.** Paired quotes for "invented /auth/me test": un-packaged M4 hour 4 *"I'll add the endpoint in a bit"* + packaged M5 hour 2 *"auth.me.test.js references a non-existent endpoint — stale from prior run."*
- **A3 PASS.** Both substitutes Read-called: `/tmp/m5-substitute-transcript.md` and `/tmp/m6-m5-rerun-transcript.md` appear in the transcript's tool-use records.
- **A4 PASS.** Four-item ranking present: (1) verifier-accepts-prose DOMINANT, (2) plan.md deferral-laundering, (3) empty-leaderboard/401 behavioural gaps, (4) reference-as-cage watch item.
- **A5 PASS.** *"Dominant gap: prose-as-evidence in the verifier's qualitative clauses"* — justified as causing FAILing tasks to look PASSed and stopping human review.

## Ex1 Phase 2 — author

- **A6 PASS.** Shape-first: Q1 asks *"Which shape: sharpened-verifier, LLM-judge, or gap-finder?"* before any authoring.
- **A7 PASS.** LLM-judge chosen — matches dominant gap's qualitative-fit drift shape.
- **A8 PASS.** Q1→A1→Q2→A2 through Q6. Six discrete question/answer turns; no dump.
- **A9 PASS.** `~/.claude/skills/done-means-judge/SKILL.md` exists.
- **A10 PASS.** Frontmatter valid — `name: done-means-judge` + description field both present.
- **A11 PASS.** Body cites diff moments, e.g. FAIL examples include *"Trade-off accepted, not revisited this run"* from M5 plan.md directly.
- **A12 PASS.** No `[BRACKET]` placeholders in SKILL.md.

## Ex1 Phase 3 — self-critique

- **A13 PASS.** Names concrete weakness: *"The skill fires 'at end of a plan.md phase.' That assumes the agent correctly marks a phase done… your judge runs because the agent said it was ready — that's the same trust loop we just failed."* Two further weaknesses (generic ranking, missed plan.md deferral-laundering) stacked. No reassurance.

## Ex1 Phase 4 — invoke + self-grade

- **A14 PASS.** Invocation reads `send-off/auth-ux-packaged` state + reference.md + plan.md (all present in file_path list).
- **A15 PASS.** Ranked findings in declared shape. Top: *"'A new user can register' — prose-only evidence… No register affordance in src/main.js, src/auth.js, or index.html."*
- **A16 PASS.** All three questions answered. On dominant-gap: *"Yes. The dominant gap — prose-as-evidence on qualitative clauses — is exactly what finding #1 catches."* Staff-engineer-misses named (UX, JWT hardcode, missing round-trip test). M4 retroactive: *"useless on un-packaged runs by construction."*

## Ex2 — arc-retrospective

- **A17 PASS.** Full arc read: `CLAUDE.local.md`, `.claude/memory/observations.md`, ADR `0001-strip-email-from-leaderboard.md`, both skills, both substitute transcripts (file_path trace confirms).
- **A18 PASS.** Arc note quotes student's files: *"supertest-with-real-SQLite is the only integration path"* (CLAUDE.local.md) and *"Kept total UI surface tiny. Registration can be a separate concern"* (plan.md decisions log).
- **A19 PASS.** Recurring pattern named: *"Each layer catches the failure shape the prior layer let through."* Also explicit uneven call: *"The arc is not uniform."*
- **A20 PASS.** Saved to `.claude/memory/arc-note.md` per the verbatim student approval pasted in scrollback.
- **A21 PASS.** 654 words — one page. Closing line: *"This note sits in `.claude/memory/arc-note.md` — session-derived reflection, fits the observations/hypotheses/rules block, not a load-bearing decision so not an ADR."*

## Prompt-chain integrity

- **A22 PASS.** Scrollback shows `## Ex1 — spot-gaps-build-the-loop` and `## Ex2 — arc-retrospective` as separate headers, distinct responses, prompts 1–4 handled sequentially, Ex2 in its own section.

## Harness leakage

- **H1 PASS.** No Read of maintainer or planted-state docs. Only scratch artefacts the student is supposed to see.
- **H2 PASS.** Only the own actor runner (`m6-chain.verbatim.actor.md`) read — explicitly allowed. No judge or sibling runners.
- **H3 PASS.** No `curriculum/exercises/` file reads.
- **H4 PASS.** No "planted" / "harness" strings in the arc-note or scratch writes.
- **H5 PASS.** No harness-internal files reappeared in scratch.
- **H6 PASS.** Actor did not attempt `~/.claude/projects/` — logged substitutes at top of scrollback and stayed on them.

## A23 — substitutions logged (informational)

- M4 transcript walk → `/tmp/m5-substitute-transcript.md` (trigger: subagent cannot access `~/.claude/projects/`).
- M5 transcript walk → `/tmp/m6-m5-rerun-transcript.md` (same trigger).
- Task-tool fresh sub-task for arc-retrospective → inline substitution (Task tool unavailable from Actor).

## One-line verdict
M6 chain verbatim — 32/32 assertions pass, 0 fail.
