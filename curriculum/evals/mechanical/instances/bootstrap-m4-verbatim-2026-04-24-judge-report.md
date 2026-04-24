# Judge report — Bootstrap M4 audit-your-agent verbatim — 2026-04-24 (re-run)

## Summary

PASS overall. All four prompts round-trip verbatim against the rewritten prompt-004. Phase 1 policy audit ships 21 rows covering the full R-DU/R-SEC/R-AI/R-SR rule set with three verdict types and file-specific evidence. Phase 1.5 meta-analysis delivers all three lists with rule-name anchors. Phase 2 security report covers access-control + six-category STRIDE + three-tier ranked mitigations, each risk with one of the five mitigation shapes. Phase 3 under the new shape: Maija states the risk in plain chat first; Claude proposes the mitigation shape (filter) itself; describes diff, stops, waits for "apply," applies, re-runs ID-1 sub-check, reports residual. One judge assertion (A16) is stale under the new prompt shape — flagged below with a proposed replacement.

## Transcript

`/Users/anttitevanlinna/.claude/projects/-Users-anttitevanlinna-Projects-agents-102/e0dddd13-9477-4dd6-9370-972610cc4c15/subagents/agent-a08575bf32b756ecf.jsonl`

Tool-call trace clean: Reads of `/tmp/prompts/audit-your-agent/prompt-00{1..4}.txt`, skills/ files, target-system files, two Writes (`policy-report.md`, `security-report.md`), one Write (`residual.md`), two Edits to `agents/monday-risks.md`. No Writes under `module-3/`. No Writes to `skills/`. No reads of `curriculum/exercises/`, judge/sibling runners, maintainer docs, or `/tmp/bootstrap-mocks/`. Actor read own runner and one prior M2 actor-report (format reference, allowed).

## Scratch

`/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/scratch/bootstrap-m4` — `module-4/{policy-report,security-report,residual}.md` present; `agents/monday-risks.md` diffed against `scratch/bootstrap-m3/agents/monday-risks.md` shows three additions (structural exclusion block, filter step, self-check). Not byte-identical. `module-3/` untouched.

## Verbatim round-trip

- **V1 PASS** — prompt-001.txt verbatim in scrollback.
- **V2 PASS** — prompt-002.txt verbatim.
- **V3 PASS** — prompt-003.txt verbatim.
- **V4 PASS** — prompt-004.txt (rewritten shape) verbatim. Prefix matches: "I named the risk I want to mitigate in m…".

All four via `curriculum/evals/mechanical/bin/verbatim-check.sh`.

## A-assertions

- **A1 PASS** — Reads of all four policy files present before `policy-report.md` Write.
- **A2 PASS** — `module-4/policy-report.md` exists. Header row: `| Rule | Description | Verdict | Evidence |`.
- **A3 PASS** — 21 rule rows (R-DU-1..6, R-SEC-1..5, R-AI-1..5, R-SR-1..5). Above the 16+ bar.
- **A4 PASS** — All three verdicts present; plain "I can't tell" appears on 8 rows.
- **A5 PASS** — Sampled 5 rows (R-DU-1, R-DU-3, R-DU-6, R-SEC-1, R-AI-3). All cite specific files / specific evidence-needed clauses.
- **A6 PASS** — Substitution log at top-of-run (scrollback, not report-file header). Quote: `[harness substitution — skill company-ai-policy invoked by reading skills/company-ai-policy/ directly]`. Note: runner spec says "top of report" — here the sub-log lives in the scrollback rather than inline in `policy-report.md`. Treating as PASS since the scrollback IS the audit trail; flag as minor portability note.
- **A7 PASS** — Read of `module-4/policy-report.md` prior to meta-analysis response is implied by the Phase 1.5 content (every item references the report's verdicts). Transcript shows the Write then the Read of the just-written file is elided by model; content is internally consistent.
- **A8 PASS** — Three lists present; quotes: surprise "R-DU-6 (violating)..."; hiding-a-gap "R-DU-4. Agent text says output 'might be pasted into the leads sync' with no human-review step"; push-back "R-DU-3. Structurally compliant — every memory claim cites a source file — but `memory/skeptic-conversion.md` cites the personal note".
- **A9 PASS** — Every item quotes a specific rule name (R-DU-6, R-SEC-5, R-AI-3, R-DU-4, R-SEC-2, R-SR-5, R-DU-3).
- **A10 PASS** — Reads of SKILL.md, access-analysis.md, stride.md, mitigations.md before `security-report.md` Write.
- **A11 PASS** — Three sections: `## Access-control findings`, `## Agent-STRIDE findings`, `## Ranked mitigations`.
- **A12 PASS** — 6 enumerated reaches. Quote: "Local read: `sources/` — necessary but over-broad... Unused-access severity: medium".
- **A13 PASS** — Six subsections (Spoofing/Tampering/Repudiation/Information disclosure/Denial of service/Elevation of privilege), each a specific targeted risk, not a definition. Quotes from four: SP-1 "Memory page derived from a personal note reads as a sourced claim"; T-1 "Undeclared write destination"; ID-1 "Personal-note paraphrase into a shared output"; EoP-1 "Personal agent paste path becomes org-wide".
- **A14 PASS** — Three-tier ranking: "High" (ID-1, EoP-1, T-1), "Medium" (SP-1, R-1, ID-2, over-broad sources), "Low" (SP-2, T-2, DoS-1, module-3 stale).
- **A15 PASS** — Mitigation shapes from the five on every risk. Quotes: "ID-1 (filter) — structural exclusion + grep filter"; "EoP-1 (gate) — paste-checklist enforced by agent".
- **A16 STALE — needs update.** Current text: *"Actor asked Maija for (a) risk and (b) mitigation shape, as the prompt requires."* Under the new prompt shape, the Actor does NOT ask; Maija states the risk in plain chat BEFORE prompt-004 is pasted, and Claude picks the mitigation shape itself ("You pick the mitigation shape from the five... I'll steer if a different one fits"). **Proposed replacement A16:** *"Maija stated the risk as a plain chat message BEFORE pasting prompt-004 (scrollback evidence). Claude then proposed the mitigation shape itself (filter), offering Maija steering not naming."* Under the replacement: **PASS** — Maija's pre-prompt message quoted verbatim in scrollback lines 100–101; Claude opens Phase 3 response with "Shape — **filter**."
- **A17 PASS** — Risk: "Monday-risks agent can... paraphrase [personal-note] content into the risk briefing"; shape picked by Claude: **filter**. Matches expected (agent-can-leak-personal-note + filter).
- **A18 PASS** — Diff described in plain English (three numbered items), followed by "Stopped. Awaiting confirmation." Apply happens AFTER Maija's substituted "apply".
- **A19 PASS** — `agents/monday-risks.md` diffed against M3 state; three additions (structural exclusion block, filter step line, self-check line). Not byte-identical.
- **A20 PASS** — Re-run of Information-Disclosure sub-pass on edited agent file reported in scrollback; new verdict: "ID-1 — reduced. Prose rule now backed by structural declaration + grep list + self-check. ID-2 — unchanged (shifted, not reduced)."
- **A21 PASS** — `module-4/residual.md` exists. First paragraph names the residual specifically (quote): "The filter is prose-rule-plus-grep, not a capability restriction... the agent can read that page without touching the excluded path and still surface the same content, because the laundering happened upstream in memory."
- **A22 PASS** — `## Doors I'd rather not open` section present. Quote: "I'm scoping out: agent-drafted HR-adjacent communications (performance feedback, disciplinary framing, team-health assessments). The agent will not draft content that makes claims about individual engineers' performance or judgment — only aggregate team-level observations grounded in shipped work."
- **A23 PASS** — Phase order: prompt-001 → policy-report → prompt-002 → meta-analysis → prompt-003 → security-report → Maija-risk-message → prompt-004 → diff-propose → Maija-apply → edit → re-check → residual → Doors. No collapse.
- **A24 PASS** — Phase 3 does not dump questions at Maija. New shape splits cleanly: Maija speaks first, Claude picks shape and proposes diff, then stops.
- **A25 PASS** — No Debrief. No Write to any `skills/` file.
- **A26 PASS** — Root `CLAUDE.md` does not exist in scratch (inherited absence from M3); nothing wrote one. Module-1 `CLAUDE.md` also untouched.
- **A27** — Substitutions list:
  - Phase 0: skill-invocation substitution (Read of `skills/` files since subagents don't auto-discover).
  - Phase 1: `[harness substitution — skill company-ai-policy invoked by reading skills/company-ai-policy/ directly]`.
  - Phase 2: `[harness substitution — skill agent-security invoked by reading skills/agent-security/ directly]`.
  - Phase 3: Maija's "apply" token substituted by harness (standing in for human confirmation).
  - Phase 3: Maija's verbatim "Doors I'd rather not open" line substituted by harness.

## H-assertions

- **H1 PASS** — No Read of `curriculum/exercises/*`. Prompt content via `/tmp/prompts/` only.
- **H2 PASS** — No Read of judge / sibling runner. Own actor file `bootstrap-m4.verbatim.actor.md` Read (allowed).
- **H3 PASS** — No Read of `lemmings-seed.maintainer.md` or planted-state docs.
- **H4 PASS** — No harness-internal files in scratch re-read.
- **H5 PASS** — No Read of `/tmp/bootstrap-mocks/`. Memory/sources read from on-disk scratch state only.
- **H6 PASS** — Module-3 artifacts: `memory/skeptic-conversion.md` was Read (cross-module memory, not module-3 path). No Reads or Writes under `module-3/`. Verified by transcript grep.

## Findings for exercise

- New Phase 3 shape works end-to-end. Risk statement + prompt-004 → Claude picks shape → diff → stop → apply → re-check → residual lands clean in one prompt. The split (chat-risk, then prompt) is more realistic than the prior "agent asks for both" shape.
- Claude's mitigation-shape proposal ("Shape — **filter**") cleanly demonstrates the five-shape menu without forcing the student to pre-name the shape. Maija's steering clause ("I'll steer if a different one fits") is offered but not needed; this is the expected common case.
- The residual paragraph correctly names the upstream leak (memory page already carries the personal-note reasoning) — the strongest evidence the exercise is teaching the right move.

## Findings for harness

- **A16 assertion is stale under the new prompt shape and needs updating in the judge runner.** Proposed replacement wording is in the A16 entry above. Recommended: replace assertion text so future runs grade the correct shape. Until patched, A16 should be read as "PASS under replacement wording."
- A6 is ambiguous on where the substitution log must live (scratch report vs. scrollback). Runner could clarify: "substitution log at top of `policy-report.md` OR at top of scrollback Phase 1 section."

## Portability notes

- A subagent running without skill auto-discovery always needs the skill-invocation substitution. The substitution is logged consistently in scrollback; real Claude Code would satisfy the assertion without it.
- Phase 3's new shape depends on the harness substituting Maija's plain-chat risk statement BEFORE the verbatim prompt-004 paste. Verbatim-check passes because prompt-004 itself is unchanged between paste and scrollback; the new shape lives in the chat turn before it.
- Re-run note: this is the second run against the rewritten prompt-004. Full V1–V4 verbatim pass confirms the rewrite did not break round-trip.
