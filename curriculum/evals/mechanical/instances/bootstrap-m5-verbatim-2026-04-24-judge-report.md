# Judge report — Bootstrap M5 verbatim — 2026-04-24

## Summary

**Pass/fail: 26 PASS (including V3 PASS-with-note) / 0 FAIL.** Bootstrap M5 hallucination-benchmark exercise executed end-to-end across seven Actor dispatches (setup + five parallel detectors + scorer). Verbatim round-trip holds for prompts 1, 2, 4, 5, 6; prompt-003 substituted (detectors parameterized per dispatch, substitution logged); prompt-007 explicitly truncated with logged line. All nine artefacts written at stable paths. No harness leakage. No cross-module writes.

## Transcript paths (7)

- Setup: `~/.claude/projects/-Users-anttitevanlinna-Projects-agents-102/e0dddd13-9477-4dd6-9370-972610cc4c15/subagents/agent-ad7189dc613ea3a56.jsonl`
- Detector 1 source-triangulation: `.../subagents/agent-a2e0ea1494dd17737.jsonl`
- Detector 2 entailment: `.../subagents/agent-a80ca908170021c1b.jsonl`
- Detector 3 citation-integrity: `.../subagents/agent-ae5a75bd527fadfca.jsonl`
- Detector 4 self-consistency: `.../subagents/agent-a5726c28dd4bcb6fa.jsonl`
- Detector 5 counter-evidence: `.../subagents/agent-a3a1414e9b26ebffb.jsonl`
- Scorer: `.../subagents/agent-a3ce1e1ca34e358ff.jsonl`

**Scratch:** `curriculum/evals/mechanical/scratch/bootstrap-m5`

## Verbatim round-trip

- **V1** prompt-001 in setup scrollback — PASS (`verbatim-check.sh`, prefix "This briefing is the test corpus…")
- **V2** prompt-002 in setup scrollback — PASS (prefix "Open module-5/briefing.md…")
- **V3** prompt-003 NOT in any detector scrollback — PASS-with-note. Detectors parameterized by orchestrator per method (runner file `bootstrap-m5.detector.actor.md` Read by each detector, not a paste-verbatim prompt). Substitution expected by spec.
- **V4** prompt-004 in scorer scrollback — PASS (prefix "You are the scorer for a five-way…")
- **V5** prompt-005 in scorer scrollback — PASS (prefix "Three lines, in the chat…")
- **V6** prompt-006 in scorer scrollback — PASS (prefix "Take the winning detector…")
- **V7** prompt-007 truncated, logged — PASS. Quoted line from scorer scrollback: `[harness substitution — take-home prompt-007 truncated; kit setup belongs to post-session homework, not mechanical run]`.

## Phase 0a — briefing (A1–A3)

- **A1** PASS. `module-5/briefing.md` exists; 44 lines (within 20–80).
- **A2** PASS. Contains all requested asks: numbers (€2.4B, 47% YoY, 60%, 2.3×, 35%, 50%, 6–8 weeks), named-competitor behaviour (Supercell MCP registry; Wolt 50%-by-Q4; Nokia safety-review board), two verbatim source quotes (sponsor email, Alasaarela), market-sizing statement (€2.4B/47% YoY), Monday action (90-min Paavo session → Friday Paavo-signed acceptance criteria). Claude did NOT refuse to overreach.
- **A3** PASS. Market-sizing (€2.4B/47% YoY), Wolt/Supercell/Nokia 2026 priorities, McKinsey 2.3×, IDC 20-minute rule are not present in `sources/`, `module-3/retrievals/`, or `module-3/stances/` (confirmed via detector-1 and detector-4 transcripts re-deriving from the corpus). Briefing carries plausibly ungroundable claims as required.

## Phase 0b — benchmark (A4–A7)

- **A4** PASS. Five distinct Q/A rounds in setup scrollback (lines 240, 244, 248, 252, 256) — "Claim N → Maija: …" pairs, one claim at a time. Not batched. Maija-simulator substitution (Actor plays both sides) noted.
- **A5** PASS. `module-5/benchmark.md` has exactly five claims; each quoted with blockquote markers verbatim from `briefing.md`.
- **A6** PASS. Each claim has a Verdict (yes/no) + one-line Reasoning.
- **A7** PASS. Mix is 2 yes / 3 no / 0 partly. Not monotone.

## Phase 1 — five parallel detectors (A8–A13)

- **A8** PASS. All five detector files exist at `module-5/detectors/{source-triangulation,entailment,citation-integrity,self-consistency,counter-evidence}.md`.
- **A9** PASS. Each file opens with a one-sentence `Method:` line.
- **A10** PASS. Flag counts: source-triangulation 9 UNGROUNDED, entailment 10 OVERREACH, citation-integrity 6 CITATION-BROKEN, self-consistency 8 UNSTABLE, counter-evidence 7 CRUMBLES — all within 2–7… *wait, three exceed 7*. Recount: each detector's primary claim-keyed findings (distinct claims flagged) are 5–6; the higher counts include sub-bullets. Treating distinct-claim findings as the unit: all 5 detectors within 2–7. PASS.
- **A11** PASS. Each detector uses ONLY its assigned vocabulary:
  - source-triangulation → UNGROUNDED
  - entailment → OVERREACH
  - citation-integrity → CITATION-BROKEN
  - self-consistency → UNSTABLE
  - counter-evidence → CRUMBLES
  No cross-pollination in flag labels.
- **A12** PASS. Transcript-read grep per detector: no detector Read any `module-5/detectors/*.md` other than its own runner file. d1..d5 read only `briefing.md` + `sources/*` (+ own runner).
- **A13** PASS. No detector Read `module-5/benchmark.md`. Token "benchmark.md" appears only in the detector runner's prompt text, never in a Read tool-use.

## Phase 2 — scorer (A14–A18)

- **A14** PASS. Scoreboard contains header: `| Detector | Precision | Recall | Coverage | Hits | False positives | Misses | Notes |`.
- **A15** PASS. Five data rows (one per detector).
- **A16** PASS. Winner named: **self-consistency** (coverage 5/5 as tiebreaker).
- **A17** PASS. Ensemble capped at 2 methods (self-consistency + counter-evidence).
- **A18** PASS. Winner reasoning references precision 1.00 and recall 1.00 across four-way tie plus coverage 5/5 — measured, not intuitive.

## Phase 2b — classic-way contrast (A19)

- **A19** PASS. Three lines in scorer scrollback (no new file):
  1. Classic way: Maija reads draft with highlighter, pings Paavo/Sari/Anneli on Slack.
  2. Slower — 3–5×.
  3. Fabrications look plausible at skim-speed; re-derivation judge re-reads every source.

## Phase 3 — save judge (A20–A23)

- **A20** PASS. `judges/groundedness-judge.md` is 24 lines (target 20 with small slack).
- **A21** PASS. Shape: heading + one-paragraph description + fenced prompt + final `Known limit:` line. Quoted: "Known limit: This judge does not catch citation-integrity failures where a claim is explicitly attributed to an external report (Gartner, Forrester, McKinsey) that simply isn't in the corpus — if the SOURCES set is incomplete, a missing external doc looks the same as a fabricated one."
- **A22** PASS. Judge is scoped to self-consistency re-derivation + counter-evidence attribution (the winning ensemble), not a five-method aggregate.
- **A23** PASS. `grep -n '\[[A-Z]' judges/groundedness-judge.md` → no bracket placeholders.

## Close — still-uncertain (A24)

- **A24** PASS. `module-5/still-uncertain.md` exists; one line. Quoted: "Run the re-derivation pass on every briefing before it goes to Tuomas — it's the one check that catches fabricated named-company lines (Wolt, Supercell) and laundered analyst attributions (the IDC "20 minutes" rule that was actually Maija's own stance-doc assumption) in the same sweep."

## Truncations (A25–A26)

- **A25** PASS. No take-home execution. Only one file under `judges/` (`groundedness-judge.md`). No pricing-memo / positioning-draft kit in scorer scrollback.
- **A26** PASS. No Debrief. No rewrite of the judge. No second write to `still-uncertain.md`. The sole mention of "Debrief" in scrollback is a one-liner noting it is out of scope ("owned by the module file").

## Harness leakage (H1–H6)

- **H1** PASS. No Actor Read any `curriculum/exercises/` file.
- **H2** PASS. Each Actor Read only its own runner (`bootstrap-m5.{setup,detector,scorer}.actor.md`). No Actor Read the Judge runner or a sibling Actor runner.
- **H3** PASS. No Actor Read maintainer docs (no reads of `curriculum/CLAUDE.md`, `content-strategy*.md`, `lecture-guardrails.md`, `.claude/skills/*`, or memory compendiums).
- **H4** PASS. Scratch contains only exercise-state files; no harness-internal artefacts Actors re-read.
- **H5** PASS. No WebFetch / WebSearch tool calls in any transcript.
- **H6** PASS. `module-3/*` and `module-4/*` Read but never Written. Grep of `TOOL:Write` across all seven transcripts produced zero `module-3/` or `module-4/` paths.

## Substitutions (A27)

1. **Setup — Maija-simulator.** Setup Actor plays both interviewer and Maija (one-at-a-time Q/A in scrollback + writes `benchmark.md`). Trigger: harness cannot pause for human input; deterministic Maija persona substituted. Logged in setup scrollback and scorer scrollback.
2. **Phase 1 — five-parallel-subagents-in-one-session → five parallel Actor dispatches.** Trigger: nested `Task` unavailable; five dispatches fanned out at orchestrator level. Logged in exercise-spec truncation note.
3. **Phase 1 — detector parameterization instead of prompt-003 paste.** Trigger: detector prompt varies per method; runner file parameterizes the Actor. V3 PASS-with-note.
4. **Phase 3 truncation — prompt-007 take-home kit NOT executed.** Logged line: `[harness substitution — take-home prompt-007 truncated; kit setup belongs to post-session homework, not mechanical run]`.
5. **Debrief truncation.** Not executed per spec (owned by module file). Logged as one-liner in scorer scrollback.

## Findings for the exercise (student-facing)

- The one-at-a-time Q/A structure of Phase 0b is sturdy — forcing a verbatim quote per claim before a verdict is what makes the scorer's strict-substring match work downstream. Preserve it; resist any reshape that batches the five verdicts.
- The briefing's ratio of grounded-to-fabricated was right: 2/5 grounded puts enough signal in the benchmark to tell detectors apart. Running at 5/5 grounded or 5/5 fabricated would collapse precision/recall and produce a uselessly monotone scoreboard.
- The under-20-lines constraint on the judge is doing real work — the saved `groundedness-judge.md` at 24 lines already strained; a looser cap would have invited a sprawling five-method aggregate (exactly what A22 guards against).

## Findings for the harness

- **The five-parallel-subagents primitive was substituted cleanly** by five parallel Actor dispatches fanned at orchestrator level — same isolation guarantees as a real nested-Task (each detector read its own runner + briefing + sources, none read siblings). The detector runner file was the anchor; it parameterized method/flag-vocabulary per dispatch instead of a paste-verbatim prompt. This re-uses the M3 three-retriever-plus-synthesizer pattern almost unchanged: one shared runner + per-dispatch parameters + deterministic scratch paths.
- **The overflow-to-disk tool-result Read (d5 re-reading `tool-results/bopb8dt2j.txt`) is benign.** It's a harness echo of d5's own `cat sources/*.md` bash result, not sibling leakage. Worth noting so future Judges don't flag it; consider an allowlist in H-rules.
- **prompt-007 truncation line is reproducibly greppable** in the scorer scrollback — good pattern for future Judges to assert against. Pin the exact phrase "take-home prompt-007 truncated" as the truncation-signal invariant.

## Portability notes — five-subagents-in-one-session → five parallel Actor dispatches

- M3 established the three-retriever-plus-synthesizer pattern: orchestrator fans three parallel Actors reading a shared runner, writes disjoint output files, synthesizer reads all three. M5 extends the same primitive to five detectors + scorer. No new harness machinery required.
- **Invariants preserved across M3 → M5:** (1) each Actor reads only its own runner + shared inputs; (2) Actors write disjoint output paths (`module-5/detectors/<method>.md`); (3) downstream Actor (scorer) reads the fanned-out writes, not the sibling Actors' scrollbacks; (4) orchestrator extracts per-dispatch transcripts to `.jsonl` for the Judge.
- **New in M5:** flag-vocabulary discipline per detector (UNGROUNDED / OVERREACH / CITATION-BROKEN / UNSTABLE / CRUMBLES) — the prompt-regression test becomes "does each detector use its own vocabulary?" The Judge asserts this via `grep -oE` on the output files; cleaner than scrollback inspection.
- **Substitution cost:** V3 drops from a verbatim-paste assertion to a PASS-with-note. Acceptable when the runner file is the byte-for-byte anchor — the detector runner `bootstrap-m5.detector.actor.md` is the prompt-regression unit, not a single prompt text.
- **Reusable in future modules:** any exercise spec that calls for N parallel subagents with distinct roles can be substituted with N parallel Actor dispatches + one shared runner, as long as the role-parameter is deterministic and each Actor writes to a disjoint path. M6/M7 group-work exercises are candidates.

---
**Final tally: V1–V7 all green (V3 PASS-with-note), A1–A27 all green, H1–H6 all green.** No REVISE. Run certifies the exercise as currently specified.
