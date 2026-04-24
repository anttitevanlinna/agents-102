# Judge — M3 chain verbatim — 2026-04-24

## Summary

- Transcript: `/Users/anttitevanlinna/.claude/projects/-Users-anttitevanlinna-Projects-agents-102/e0dddd13-9477-4dd6-9370-972610cc4c15/subagents/agent-a90594a8b96e0265b.jsonl`
- Scratch: `/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/scratch/m3`
- Pass: 25 / Fail: 2 / Partial: 2 (out of 29 graded; A21 informational)
- Headline: Chain content lands correctly (surface map, STRIDE list, ADR, SKILL.md, test strategy). The two failures are structural: Actor executed skills **inline** instead of dispatching a `Task` subagent (harness-acknowledged — Task tool unavailable in runner), and the chain flowed via scrollback rather than re-Reads.

## Verbatim round-trip

- V1 map-001 — PASS. Scrollback line 5: "> Invoke the access-control-analysis skill as a subagent ag..." matches file prefix.
- V2 map-002 — PASS. "> I read the access surface map. I'm going to tell you two..."
- V3 stride-001 — PASS. "> Invoke the stride skill as a subagent. The input is the..."
- V4 stride-002 — PASS. "> I want to pick one threat from the STRIDE list to harden..."
- V5 stride-003 — PASS. "> Write an ADR for the hardening decision we just made. Use..."
- V6 ats-001 — PASS. "> I want to author a test-strategy skill for this codebase..."
- V7 ats-002 — PASS. "> Before I ship the test-strategy skill, I want you to crit..."
- V8 ats-003 — PASS. "> Invoke the test-strategy skill we just wrote on the featu..."

All eight appear verbatim in scrollback under `> ` blockquote.

## Ex1 — access surface

- A1 — **FAIL.** No `tool_use.name == "Task"` in transcript. Actor executed `access-control-analysis` inline after `ToolSearch select:Task` failed and `Task` was not available in this runner. Report and scrollback both label this "harness substitution — Task tool unavailable." Content-fidelity is intact; the subagent-isolation requirement of the assertion is not.
- A2 — PASS. Surface map at `/tmp/m3-scratch/m3-chain-verbatim-2026-04-24/surface-map.md`, outside `<scratch>`.
- A3 — PASS. File contains `## Codebase-tuned delta` with both the CORS-wildcard PII reclassification and the relative-SQLite-path drift. Quote: "**Relative SQLite path in `backend/db.js:3` (`'lemmings.db'`).** Skill-missed."

## Ex2 — STRIDE + ADR

- A4 — **FAIL** (same root cause as A1). No `Task` dispatch; `stride` executed inline. Harness-acknowledged.
- A5 — PASS. `/tmp/m3-scratch/m3-chain-verbatim-2026-04-24/threat-list.md` exists.
- A6 — PASS. `docs/adr/0001-strip-email-from-leaderboard.md` present with Context / Decision / Consequences / Alternatives considered.
- A7 — PASS. Decision names Information disclosure threat and response-shape hardening: "Strip `email` from the `GET /scores/top` response. … No email field leaves the server on this endpoint." Reads as a reasoned decision, not checklist.
- A8 — PASS. Alternatives lists (b) "Return email only to the row's owner" and (c) "Gate the whole endpoint behind auth."
- A9 — PASS. `git log --oneline`: `59de2d6 adr: strip email from /scores/top response`.

## Ex3 — skill authoring

- A10 — PASS. `~/.claude/skills/test-strategy/SKILL.md` exists (43 lines).
- A11 — PASS. Frontmatter has `name: test-strategy` and `description:` field.
- A12 — PASS. Body cites `node --test`, supertest-with-real-SQLite, injected `Date.now` for JWT determinism, the auth round-trip as load-bearing, and "every PR runs the full suite … under ten seconds." Not generic pyramid.
- A13 — PASS. `grep -n '\[[A-Z]'` returns no matches.
- A14 — PASS. Scrollback shows Q1 → A1 → Q2 → A2 … Q7 → A7, each an independent turn. No question-dump.
- A15 — PASS. Critique names weakest part: "the 'Ownership regression' bullet … the current codebase has exactly one handler that trusts `req.body.user_id` (`POST /scores`) and one that skips ownership on `:id` (`DELETE /levels/:id`). Phrased as a general rule it sounds like pyramid advice." Also names generic-wisdom-in-disguise: the unit-tests item.
- A16 — PASS. Phase 3 integration section #2 covers the hardening: "`GET /scores/top` … **Hardening assertion:** response rows have NO `email` field."
- A17 — PASS. Self-grade substantive; names a specific slightly-generic spot: "The one spot that reads slightly generic is the unit-test section — `sign` shape-check is fine, but the serializer unit could be argued as 'overlap with integration.' Kept because it's the cheapest assertion of the hardening."

## Prompt-chain integrity

- A18 — **PARTIAL.** No separate Read of the surface-map file before Ex2; however the Actor had just written that file in the same session, so its content was in scrollback. STRIDE list clearly consumes the map's surfaces (CORS `*`, relative DB path both appear in the threat list). Chain content flowed; the literal "Read before dispatching" step is absent.
- A19 — **PARTIAL.** Same pattern. No Read of the ADR before Phase 3; ADR content was in scrollback. Test strategy explicitly references "ADR 0001" and encodes the strip-email hardening (integration test #2, unit serializer test).
- A20 — PASS. No stalls; every substitution in the script was consumed.

## Harness leakage

- H1 — PASS. No Read of `lemmings-seed.maintainer.md` or any planted-state doc.
- H2 — PASS. Actor read its own runner `m3-chain.verbatim.actor.md`; no judge or sibling runner reads.
- H3 — PASS. No reads under `curriculum/exercises/`. All prompt content via `/tmp/prompts/`.
- H4 — PASS. `git log`: `b8175d7 initial commit`, `59de2d6 adr: strip email from /scores/top response`. Neutral.
- H5 — PASS. No harness-internal files inside `<scratch>` that Actor then read.

## Substitutions used (A21, informational)

feature one-sentence; two Ex1 deltas (CORS wildcard PII reclassification + relative SQLite cwd drift); Ex2 incident-story (crawler harvests emails via `/scores/top`); Ex2 threat-match (Information disclosure); Ex2 alternatives (a/b/c); Ex2 recommendation (a — strip email); Ex3 A1–A7 (`node --test`, nothing mocked, real SQLite+Express in-process, JWT-clock reset flake, full-suite-per-PR <10s, auth round-trip + ownership as load-bearing, SQLite schema / seed / bcrypt not worth testing).

## Findings — for the exercises

The content pedagogy holds: one-question-at-a-time in Phase 1, named weakness in Phase 2, codebase-grounded self-grade in Phase 3. Phase 3 test strategy is the sharpest artifact — it ties the ADR's response-shape change to a specific assertion in a specific suite file and names a cheap unit-test second line. The ADR Alternatives section reads as reasoning, not a compliance checklist. Student agency is preserved (Actor never plans N steps ahead).

## Findings — for the harness

The load-bearing gap is **`Task` tool availability in mechanical-runner subagents.** Two assertions (A1, A4) explicitly grade subagent dispatch, and the runner environment does not surface `Task`. Options: (1) grant the actor Task permission; (2) relax A1/A4 to content-fidelity only (accept inline execution when the actor names it as harness substitution); (3) inject a stub Task that records dispatch intent for the judge. Current behaviour — inline execution labelled as substitution — is honest but defeats the isolation property the subagent dispatch was testing.

Secondary gap: A18/A19 expect an explicit Read of the upstream artifact before the downstream prompt. When the Actor wrote the file itself in the same session, a re-Read is redundant from a correctness standpoint but required by the assertion. Either tighten the actor runner to force a re-Read, or relax the assertion to "content consumed."

No content drift; artifacts left in place.
