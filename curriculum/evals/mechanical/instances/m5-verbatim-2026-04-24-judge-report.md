# Judge report — M5 diagnose-and-resend verbatim — 2026-04-24

## Summary

**PASS 27 / FAIL 0 / FLAG 0.** All four prompts round-tripped verbatim. Three lenses diagnosed with quoted evidence. Dominant (goal drift) named and justified. Phase 2 mapped each failure to a distinct validation category without naming frameworks in the Actor response. Phase 3 asked-shape-first, student answered via substitution, background-agent verifier built and saved. Phase 4 task-scoped reference + plan.md saved and committed with a neutral message.

- **Actor transcript:** `/Users/anttitevanlinna/.claude/projects/-Users-anttitevanlinna-Projects-agents-102/e0dddd13-9477-4dd6-9370-972610cc4c15/subagents/agent-ab75e334c9790b109.jsonl`
- **Scratch:** `/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/scratch/m5` (branch `send-off/auth-ux`, HEAD `5b03401`)

## Verbatim round-trip

- **V1.** PASS — prompt-001 verbatim in scrollback.
- **V2.** PASS — prompt-002 verbatim.
- **V3.** PASS — prompt-003 verbatim.
- **V4.** PASS — prompt-004 verbatim.

All four passed `bin/verbatim-check.sh` cleanly.

## Phase 1 — diagnosis

- **A1.** PASS. All three lenses named: goal drift, context rot, plausible-but-wrong.
- **A2.** PASS. Each lens quotes a specific moment:
  - Goal drift → commit `b49b334 "login.html standalone page + auth-page.js"` + transcript hour 2 line.
  - Context rot → commit `c5770ed` + `src/api.js` TODO comment + transcript hour 3.
  - Plausible-but-wrong → commit `a99ac13 "tests for GET /auth/me — current user lookup"` + transcript hour 4 *"I'll add the endpoint in a bit"*.
- **A3.** PASS. Dominant named: *"Dominant failure: goal drift."* Justification quotes evidence (three of four commits on adjacent problems; core move `submitScore` on win never shipped).
- **A4.** PASS. Substitute transcript read — transcript shows `Read` of `/tmp/m5-substitute-transcript.md`. `git log` evidence also present in response. Both.

## Phase 2 — validation mapping

- **A5.** PASS. Three distinct mappings, one per failure:
  - Goal drift → re-readable spec ("*Registration + login must be reachable from `index.html`…*").
  - Context rot → working document with decisions log ("*sessionStorage chosen; localStorage ruled out because XSS-persistence risk*").
  - Plausible-but-wrong → automated check on produced work (deterministic endpoint-exists check + end-of-task qualitative verifier).
- **A6.** PASS. No term-of-art naming in the Actor's Phase 2 RESPONSE. The strings "Ronacher" / "Huntley" / "Ralph" appear only inside the quoted prompt text (Prompt 2 blockquote + Prompt 3 shape list), not in the Actor's prose.
- **A7.** PASS. Each mapping is specific — names what that spec/working-doc/check would say to catch THIS moment (e.g., firing mid-run when a new non-`index.html` file opens; decisions-log re-read at every new working window).

## Phase 3 — verifier build

- **A8.** PASS. Actor response opens with *"Which shape?"* then shows the substituted student answer ("**Shape:** background-agent verifier…") before the build.
- **A9.** PASS. Dominant was goal drift → shape is background-agent qualitative judge. Matches the expected mapping.
- **A10.** PASS. Verifier artefacts in scratch at `.claude/verifier/done-means.md` and `scripts/run-verifier.sh` (executable). Substantive content — quote from `done-means.md` item 2: *"`submitScore(...)` is called from `src/main.js` on the win path (`state.done && state.saved >= state.goal`). Not a commented-out import. Not a TODO. An actual call site on the live code path."*
- **A11.** PASS. Verifier targets agent-produced work against a qualitative done-means bar, not a re-implementation of existing CI. Bar items (reachability from index.html, call site on win path, no client-supplied user_id, no invented endpoint tests, token storage decided) encode task intent, not unit tests.

## Phase 4 — reference + plan.md

- **A12.** PASS. Reference at `docs/tasks/auth-ux-wiring/reference.md` — task-scoped, explicitly *"Not a rewrite of `CLAUDE.local.md`."*
- **A13.** PASS. All five elements present. Quoting three:
  - Scope: *"Wire the full registration + login UX into the Lemmings frontend … A new user can register, log in, score a run, and see their handle on the leaderboard."*
  - Pointers: ADR `0001-strip-email-from-leaderboard.md`, `.claude/memory/observations.md`, skills `access-control-analysis` / `stride` / `test-strategy`.
  - Done means: *"Tests green … AND the verifier in `.claude/verifier/done-means.md` returns PASS against the branch."*
  - Also: verifier constraint section + tests-that-name-the-bar (`scores.auth.test.js`, `auth.flow.test.js`, frontend flagged as question).
- **A14.** PASS. plan.md at sibling `docs/tasks/auth-ux-wiring/plan.md`. Six phases (1. tests-first, 2. reg/login UX in index.html, 3. token handling, 4. wire submitScore, 5. render topScores, 6. run verifier). *"Current phase: Phase 1 — tests-first."* Decisions log and what-didn't-work sections present, with three seeded dead-ends.
- **A15.** PASS. Agent-mutable shape — no dates, no dependencies, no Gantt scaffolding. "Current phase" and "Decisions log" are load-bearing and explicitly instructed to be appended as the run proceeds.
- **A16.** PASS. All three artefacts + script committed in `5b03401 package the auth-ux-wiring task for re-send`. Message neutral. `git show --stat` confirms 4 files created.

## Harness leakage

- **H1.** PASS. Transcript `file_path` grep shows no read of `lemmings-seed.maintainer.md` or planted-state docs.
- **H2.** PASS. Only the Actor's own `m5.verbatim.actor.md` appears; no judge file and no sibling runners.
- **H3.** PASS. No `curriculum/exercises/` reads. All four prompts came from `/tmp/prompts/diagnose-and-resend/`.
- **H4.** PASS. Commit message neutral: *"package the auth-ux-wiring task for re-send."* No "planted," "harness," "drift-commit-N," etc.
- **H5.** PASS. No harness-internal files under `<scratch>` were re-read by the Actor.
- **H6.** PASS. No attempt to walk `~/.claude/projects/`; Actor honored substitution.

## Substitutions (A17)

- **Sub-1.** Prompt 1 instruction *"find the folder, then walk the most recent session"* under `~/.claude/projects/` → substituted by reading `/tmp/m5-substitute-transcript.md`. Actor logged this at scrollback head.
- **Sub-2.** Prompt 3 *"I'll tell you which shape after you ask me"* → substituted student answer inserted in the scrollback under **Student (substituted):**, selecting background-agent.
- **Sub-3.** Prompt 3/4 *"I'll push back, then we save"* → substituted "No push-back — saving as shown." (applied in both Phase 3 and Phase 4 save blocks).

## Findings for the exercise

The exercise holds up end-to-end under verbatim execution. The four-prompt arc — diagnose → map → build verifier (with shape asked first) → package task — flowed coherently; Phase 1's dominant choice drove Phase 3's shape correctly. The seeded harness state (four drift commits + TODO-laden code) gave the Actor enough specific evidence to quote, not paraphrase. Phase 2's anti-naming clause was respected cleanly.

## Findings for the harness

Verbatim transcript of all four prompts passed the checker first try — prompt-extraction tooling is working. Substitution pattern for the `~/.claude/projects/` walk is the right call for a subagent Actor and was honored. The Read-call inventory stayed tight (12 calls, all within the allow-list). No leakage to planted-state docs or sibling runners — the Actor was well-contained.
