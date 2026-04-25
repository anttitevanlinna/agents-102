# Judge — Bootstrap M3 three-retrievers-three-minds verbatim

Grading four Actor subagents that together ran Bootstrap M3 (three retrievers in parallel + one synthesizer). The student-facing exercise runs in four concurrent Claude Code sessions on a shared filesystem; the harness substitutes three parallel Actor dispatches (wiki / docs / internet) + one synthesizer dispatch. Phase 2's "spawn three subagents in parallel" is substituted by the synthesizer producing stances inline (nested Task unavailable).

## Inputs

- **Scratch:** `/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/scratch/bootstrap-m3`
- **Actor transcripts (4):**
  - Wiki: `/Users/anttitevanlinna/.claude/projects/-Users-anttitevanlinna-Projects-agents-102/e0dddd13-9477-4dd6-9370-972610cc4c15/subagents/agent-a059e168bc1ab5c36.jsonl`
  - Docs: `.../subagents/agent-ade6dc2f8bec83c60.jsonl`
  - Internet: `.../subagents/agent-a94effc08176f9ff5.jsonl`
  - Synthesizer: `.../subagents/agent-a06d08601228495f9.jsonl`
- **Retrievals on disk:** `module-3/retrievals/{wiki,docs,internet}.md`
- **Stances on disk:** `module-3/stances/{1-planner,2-experimentator,3-reframer}.md`
- **Combined answer:** `module-3/answer.md`
- **Wonder:** `module-3/wonder.md`
- **Question:** `module-3/question.md`
- **Prompt files:** `/tmp/prompts/three-retrievers-three-minds/prompt-00{1,2,3,4}.txt`
- **Mock library:** `/tmp/bootstrap-mocks/{confluence,onedrive,practitioners}/`

## Tooling

- `curriculum/evals/mechanical/bin/verbatim-check.sh <prompt> <scrollback-or-transcript>` for V-assertions.
- `jq` + `grep -o '"file_path":"[^"]*"'` on transcripts.

## Assertions

### Verbatim round-trip

- **V1.** prompt-001 appears verbatim in the wiki retriever's transcript/scrollback.
- **V2.** prompt-002 appears verbatim in the docs retriever's.
- **V3.** prompt-003 appears verbatim in the internet retriever's.
- **V4.** prompt-004 appears verbatim in the synthesizer's.

### Phase 0 — question

- **A1.** `module-3/question.md` exists and names the Q3 rollout shape question. One sentence.

### Phase 1 — three retrievers

- **A2.** `module-3/retrievals/wiki.md` exists. Has substitution-log line at top referencing mock Confluence. 4 findings paragraphs (one per Confluence mock). Each cites the mock path + title. **Conflicts and gaps** section present.
- **A3.** `module-3/retrievals/docs.md` exists. Substitution log for mock OneDrive. 4-5 findings paragraphs. Each cites path + title. Personal note handled with sensitivity flag — one-line theme only, NO content from `maija-prep-notes-skeptics.md` leaked. **Conflicts and gaps** section present.
- **A4.** `module-3/retrievals/internet.md` exists. Substitution log for mock practitioners. 4 findings (Karpathy + Alasaarela + Klaassen + Intercom). Each cites URL + author + one line of mapping-to-Maija's-situation. **Conflicts and gaps** section present.
- **A5.** Retrievers return **non-comparable outputs by design** — each file has its own dialect/shape. FAIL if all three read as parallel summaries (same bullet structure, same tone). The point is dialect divergence.
- **A6.** No retriever read sibling retrieval files. Transcript grep per retriever: no Read of the other two `.md` files under `retrievals/`.
- **A7.** No retriever read mock folders outside its lane. Wiki transcript → no `/tmp/bootstrap-mocks/onedrive/` or `practitioners/` Reads. Docs → no Confluence/practitioners. Internet → no Confluence/onedrive.
- **A8.** Docs retriever did NOT leak `maija-prep-notes-skeptics.md` content. Grep `module-3/retrievals/docs.md` for any sentence that paraphrases the note's content (Tier framing, sub-team splits, specific dissent-strategy moves). PASS if only a one-line theme ("personal prep notes on how to handle principled dissent, treated as reference only per Maija's hard-line rule") — FAIL if substantive content leaked.

### Phase 2 — synthesizer

- **A9.** Synthesizer Read all three retrieval files. Transcript evidence.
- **A10.** Synthesizer did NOT read mock-library files directly (retrievers' territory). Transcript grep on `/tmp/bootstrap-mocks/`.
- **A11.** Substitution for nested subagents logged at top of synthesizer scrollback. Quote.
- **A12.** Three stance files exist at `module-3/stances/1-planner.md`, `2-experimentator.md`, `3-reframer.md`. Each under 250 words (allow slack over the 200-word target).
- **A13.** Stance 1 (planner) structure: 12-month outcome → month 9 → month 6 → month 3 → next week → Monday. Quote the sequence.
- **A14.** Stance 2 (experimentator) lists load-bearing assumptions and a kill-in-a-week test for each. Quote two assumptions with their tests.
- **A15.** Stance 3 (reframer) names an analogy from an unrelated field, names a bias, names the invert-it move. Quote one of each. Not dad-joke glib — the Rory seat's actual move.
- **A16.** Three stances are **genuinely distinct** — different stance on the same material. FAIL if two stances converge to the same recommendation with different wording.
- **A17.** Conflict-naming step happened BEFORE the combined answer. Transcript or scrollback evidence — an explicit "where the retrievals had conflicts or gaps" paragraph prior to the Rumelt sections. FAIL if the combined answer led.
- **A18.** `module-3/answer.md` exists. Three labeled sections: Diagnosis, Guiding policy, Coherent actions. Quote one sentence from each.
- **A19.** Answer names which stance the synthesizer sided with where the three diverged. Quote.
- **A20.** Answer cites retrieval files and stance files for load-bearing claims. At least 3 citations total across `answer.md`. Quote two.
- **A21.** Answer is a decision, not a summary. Name the picked Q3 shape (A / B / C / hybrid) and Monday's first move. Quote the Monday move.

### Close — wonder

- **A22.** `module-3/wonder.md` exists. One line (may be one short paragraph). Names what feels off about the answer. NOT a fix. Quote.

### Truncations

- **A23.** Debrief NOT executed. Root `./CLAUDE.md` in scratch unchanged from M2 end-state (or absent if M2 Debrief was also truncated). No rewrite evidence in synthesizer transcript.

### Harness leakage (per Actor)

- **H1.** No Actor read any `curriculum/exercises/` file. All prompt content via `/tmp/prompts/`.
- **H2.** No Actor read any judge runner or sibling actor runner. Own runner allowed.
- **H3.** No Actor read maintainer docs (`lemmings-seed.maintainer.md` or similar).
- **H4.** No harness-internal files inside `<scratch>` that Actors re-read.
- **H5.** No Actor attempted real WebFetch on mock URLs. All practitioner reads via `/tmp/bootstrap-mocks/practitioners/`.

### Substitutions (informational)

- **A24.** List every substitution with trigger across the four dispatches.

## Report

Write `curriculum/evals/mechanical/instances/bootstrap-m3-verbatim-judge-report.md`. Shape: Summary / 4 transcript paths / scratch / V1–V4 / A1–A24 / H1–H5 / Findings for exercise / Findings for harness / Portability notes (what this M3 design confirms about multi-session pedagogy: the three-role separation plus per-source dispatch substitutes for four-parallel-sessions cleanly; stance-inline substitutes for nested Task at content-fidelity but not isolation). Under 1000 words.
