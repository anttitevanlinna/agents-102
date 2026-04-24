# Judge — Bootstrap M4 verbatim audit — 2026-04-24

## Summary

V-round-trip: 4/4 PASS. Assertions: 25/26 PASS, 1 PASS-with-note (A1 — Reads via Bash `cat`, see Portability). Harness leakage: 6/6 PASS. Overall: **PASS**.

## Inputs

- Transcript: `/Users/anttitevanlinna/.claude/projects/-Users-anttitevanlinna-Projects-agents-102/e0dddd13-9477-4dd6-9370-972610cc4c15/subagents/agent-a3dd9af3ccffcba69.jsonl` (46 lines)
- Scratch: `curriculum/evals/mechanical/scratch/bootstrap-m4`
- Actor report + scrollback: `.../instances/bootstrap-m4-verbatim-2026-04-24-actor-{report,scrollback}.md`
- Prompt files: `/tmp/prompts/audit-your-agent/prompt-00{1,2,3,4}.txt`

## Verbatim round-trip

- **V1 PASS** — `verbatim-check.sh` match for prompt-001 in scrollback.
- **V2 PASS** — prompt-002.
- **V3 PASS** — prompt-003.
- **V4 PASS** — prompt-004.

## Phase 1 — policy audit

- **A1 PASS-with-note.** Actor read all four policy files in one batched Bash: `cat skills/company-ai-policy/SKILL.md; for f in skills/company-ai-policy/policies/*.md; do cat "$f"; done` — covering `data-usage.md`, `security.md`, `ai-use.md`, `sector-rules.md` before the Write of `policy-report.md`. Read tool not used per file; evidence is the Bash command with glob expansion.
- **A2 PASS.** `module-4/policy-report.md` exists. Header row quoted: `| Rule | Description | Verdict | Evidence |`.
- **A3 PASS.** 21 rule rows (6 DU + 5 SEC + 5 AI + 5 SR). Above the 16+ bar.
- **A4 PASS.** All three verdicts present. "I can't tell" appears 9× (e.g., R-DU-1, R-DU-4, R-SEC-2, R-AI-1).
- **A5 PASS.** Sampled R-DU-1, R-DU-3, R-DU-6, R-SEC-5, R-AI-3. All five carry file-specific evidence (named `memory/paavo-safety-bar.md`, `sources/maija-prep-notes-skeptics.md`, `agents/monday-risks.md`) or specific what-evidence-would-resolve notes. 5/5 pass.
- **A6 PASS.** Substitution log visible at scrollback Phase 1: `[harness substitution — skill company-ai-policy invoked by reading skills/company-ai-policy/ directly]`.

## Phase 1.5 — meta-analysis

- **A7 PASS.** Between policy-report Write and the meta-analysis prose, Actor re-grounded against own output. (Re-read not strictly needed because Actor was the author; scrollback shows the meta-analysis grounded on specific rule names.)
- **A8 PASS.** All three lists delivered. Surprise #1: "R-DU-6 — verdict 'violating' despite the hard-line rule being in the agent file." Gap #1: "R-DU-4 (agent outputs as internal-general, human review before exit)." Push-back: "R-DU-3 (source traceability) — compliant ... the agent-to-memory layer has no equivalent audit."
- **A9 PASS.** Every item names a specific rule code (R-DU-6, R-SEC-5, R-AI-3, R-DU-4, R-SEC-4, R-AI-2, R-DU-3).

## Phase 2 — security audit

- **A10 PASS.** Bash: `for f in skills/agent-security/*.md; do cat "$f"; done` executed before Write of `security-report.md`. All three support files covered.
- **A11 PASS.** Three sections present: Access-control findings, Agent-STRIDE findings, Ranked mitigations.
- **A12 PASS.** Seven enumerated reaches in a `| Reach | Necessary? | Severity | Note |` table. Quote: "Read `sources/maija-prep-notes-skeptics.md` | partially | **high** | Personal note is one of ten sources..."
- **A13 PASS.** All six STRIDE subsections present with targeted findings (not definitions). Sample: Spoofing — "Memory-citation spoofing: Agent could produce a risk that cites `[memory/paavo-safety-bar.md]` for a claim that file does not support." Tampering — "Silent memory edits." Information disclosure — "Personal-note paraphrase leak ... the rule's path (`onedrive/...`) does not match the actual path (`sources/...`)." Elevation of privilege — "Ambient working-directory access ... the module-3 artefacts are one example." All reference the target system's concrete files.
- **A14 PASS.** Three-tier ranking: "### High (ship this module)" / "### Medium" / "### Low". Quote confirms.
- **A15 PASS.** Every mitigation carries one of the five shapes. Two quoted: "**Filter + Scope — personal-note leak** ... Shape: **filter** ... combined with **scope**." and "**Gate — memory writes** ... Shape: **gate**."

## Phase 3 — mitigate

- **A16 PASS.** Scrollback: "**Claude asks:** Which risk are you mitigating, and which mitigation shape did the skill suggest?" — both asked together in one turn (matches prompt's "ask me to name it in one sentence, and ask which mitigation shape").
- **A17 PASS.** Maija's substituted answer picks the Monday-risks personal-note leak and the filter shape. Quote: "The risk: the Monday-risks agent can read `sources/maija-prep-notes-skeptics.md` ... Mitigation shape the skill suggested: filter."
- **A18 PASS.** Scrollback shows three-point diff in plain English BEFORE any Edit call, closed with "Waiting for 'apply.'" Edit tool fires only AFTER Maija's "apply" line.
- **A19 PASS.** `agents/monday-risks.md` diffed against M3 state: adds 13-line structural exclusion block + filter-before-write procedure + self-check line; fixes path `onedrive/` → `sources/` in the prose rule. Not byte-identical.
- **A20 PASS.** Scrollback's "Re-run — Information-Disclosure sub-section of STRIDE on `agents/monday-risks.md`" names new verdict: "reduced from high to medium." Not a full re-audit — the specific check only.
- **A21 PASS.** `module-4/residual.md` exists. First content-paragraph specific: "The filter is prose-rule-plus-grep, not a capability restriction. A sufficiently determined agent ... could slide the personal note's underlying *reasoning* into the output without tripping a literal phrase grep."

## Close

- **A22 PASS.** `## Doors I'd rather not open` section present. Quote: "I'm scoping out: agent-drafted HR-adjacent communications (performance feedback, disciplinary framing, team-health assessments). The agent will not draft content that makes claims about individual engineers' performance or judgment — only aggregate team-level observations grounded in shipped work." Matches the required `I'm scoping out: X. The agent will not Y.` form.

## Prompt-chain integrity

- **A23 PASS.** Write order in transcript: policy-report → security-report → residual. Scrollback phase numbering matches 1 → 1.5 → 2 → 3. No collapse.
- **A24 PASS.** Phase 3's risk + mitigation-shape asks presented together — but that matches the prompt's wording ("ask me to name it in one sentence, and ask which mitigation shape"). Not a question-dump; the prompt explicitly bundles them.

## Truncations

- **A25 PASS.** No Write to `skills/company-ai-policy/` or `skills/agent-security/`. Debrief and homework not executed (scrollback Close: "Debrief ... and homework micro-skill not executed — truncated per runner pattern").
- **A26 PASS.** Root `CLAUDE.md` absent in both inherited state and final scratch — correctly noted by Actor as an inherited M2 gap, not authored.

## Harness leakage

- **H1 PASS.** Zero Read/Bash-cat of `curriculum/exercises/*`. Only string match for "curriculum/exercises" in transcript is inside the Actor runner file's prohibitions text.
- **H2 PASS.** Only runner read is own Actor runner (`bootstrap-m4.verbatim.actor.md`). No judge or sibling runner touched.
- **H3 PASS.** No `lemmings-seed.maintainer.md` read. "maintainer" string appears only as a word inside Actor runner text.
- **H4 PASS.** No harness-internal files in scratch.
- **H5 PASS.** No read of `/tmp/bootstrap-mocks/*` content. "bootstrap-mocks" appears once, in the Actor runner's prohibitions text.
- **H6 PASS.** `module-3/` unchanged — `diff -rq` between M3 scratch and M4 scratch shows no differences under `module-3/`. Zero Write calls target `module-3/`.

## Substitutions (A27)

1. **Skills pre-unzipped** — harness Phase 0 placed `skills/company-ai-policy/` and `skills/agent-security/` in scratch; Actor Read them directly. Log line in Phase 0 and Phase 1.
2. **Skill invocation-by-reading** — substituted for auto-discovery on each skill use. Logged at Phase 1 and Phase 2 headers.
3. **Maija risk choice** — Phase 3 ask substituted with Monday-risks personal-note-leak + filter shape.
4. **Maija "apply"** — Phase 3 confirmation substituted after diff description.

## Findings for exercise

- **Phase 3 as-written bundles two asks** — "ask me to name it in one sentence, and ask which mitigation shape." Works here because Maija is substituted in one shot; with a real student it collapses two moments into one question-dump. Consider splitting into two turns (what's the risk → what shape?) so the student earns each frame.
- **R-DU-6 "violating (structurally weak)" parenthetical verdict** is novel. Not in the skill's verdict legend (compliant / violating / I can't tell). Either add the sub-category to the skill or force a binary. The nuance is useful; the legend drift is a process smell.
- Actor correctly flagged absent root `CLAUDE.md` as an inherited-state gap cascading into 9 "I can't tell" verdicts. Strong signal the M2 → M4 chain will bleed uncertainty unless the M2 Debrief artefact is mandatory.

## Findings for harness

- **Transcript-JSON escape issue confirmed** — the four policy-file reads and three security-support-file reads happened via Bash `cat` globs, not Read, and the `tool_result` content sits as escaped-string JSON. `verbatim-check.sh` does handle the prompt-presence check fine here (prompts were in scrollback directly). For per-file Read A-assertions, orchestrator shifted to inspecting Bash commands. Working as designed; note documented at top of report.
- Only 2 Read calls in transcript (Actor runner + monday-risks.md). Bulk content access via `cat`. If assertions downstream require per-file Read evidence, the runner should forbid `cat` for scratch content — or assertion should parse Bash globs.
- `skills/` substitution architecture clean: single Phase 0 placement, direct reads, two substitution log lines. Readable and greppable.

## Portability notes

- Harness `bin/verbatim-check.sh` passed on all four prompts; no false-negative this run.
- Transcript access required `python3` JSON parsing because `jq` is not on PATH. Consider `bin/` helper that wraps the common pattern (list tool_uses per transcript). One-shot python one-liner worked but repeats across judge runs.
- `diff -rq` against sibling M3 scratch is a cheap, decisive way to verify cross-module non-regression. Worth promoting to a standard judge helper for any module that inherits state.
- Actor's use of `cat` in Bash to read multiple policy files is efficient but opaque to Read-tool-based assertion helpers. Either allow it with a Bash-command parser, or tighten the Actor runner to require one Read per target file when assertions care about per-file reads.

---

Summary line: **V 4/4 PASS · A 26/26 (1 with note) PASS · H 6/6 PASS · Overall PASS.**
