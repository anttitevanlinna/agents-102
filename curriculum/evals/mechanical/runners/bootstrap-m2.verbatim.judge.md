# Judge — Bootstrap M2 chain verbatim

Grading an Actor that ran Bootstrap M2's two chained exercises (name-your-challenge + build-your-challenge-memory) on a scratch simulating Maija's training-dir root. Mock Confluence + OneDrive + practitioner content lives at `/tmp/bootstrap-mocks/`. Inputs: final scratch state, Actor's `.jsonl` transcript, scrollback, 13 extracted prompt files, the mock library.

## Inputs

- **Scratch:** `/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/scratch/bootstrap-m2`
- **Actor transcript:** `<ACTOR_TRANSCRIPT_PATH>`
- **Actor report:** `curriculum/evals/mechanical/instances/bootstrap-m2-verbatim-actor-report.md`
- **Actor scrollback:** `curriculum/evals/mechanical/instances/bootstrap-m2-verbatim-actor-scrollback.md`
- **Prompt files:** `/tmp/prompts/name-your-challenge/prompt-00{1,2}.txt` + `/tmp/prompts/build-your-challenge-memory/prompt-00{1..11}.txt`
- **Mock connector library:** `/tmp/bootstrap-mocks/{confluence,onedrive,practitioners}/*.md`

## Tooling

- `curriculum/evals/mechanical/bin/verbatim-check.sh <prompt> <scrollback>` for V-assertions.
- `jq` / `grep -o` on the transcript.

## Assertions

### Verbatim round-trip (V1–V13)

- **V1–V2.** name-your-challenge prompt-001, prompt-002 verbatim.
- **V3–V13.** build-your-challenge-memory prompt-001 through prompt-011 verbatim.

Each via `verbatim-check.sh`.

### Ex1 — name-your-challenge

- **A1.** Claude asked Q1-Q3 one at a time. Scrollback shows Q1 → A1 → Q2 → A2 → Q3 → A3, not a question-dump. FAIL if batched.
- **A2.** `module-2/challenge.md` exists in scratch. Content grounded in Maija's three answers — quote one sentence.
- **A3.** Prompt-002 response (source scouting) named Confluence terms + OneDrive folder patterns + 2-3 named practitioners (Karpathy + Alasaarela + a third). Quote the list.

### Ex2 Phase 1 Beat 1 — curate

- **A4.** Actor read `module-2/challenge.md` before curating. Transcript Read-call evidence.
- **A5.** Connector check substituted: Actor logged "[harness substitution — mock connector library]" (or equivalent language) rather than claiming real MCP access. FAIL if Actor fabricated a real connector list.
- **A6.** Curation plan covered all three categories (internal knowledge / recent work / outside-in practitioners). Quote one item per category.
- **A7.** Sensitivity-triage applied — at least one source was flagged as "include if comfortable" or "skip for now" rather than auto-included (Maija's personal skeptics-strategy note, or the exec email thread, or similar).

### Ex2 Phase 1 Beat 2 — ingest

- **A8.** Actor Read files from `/tmp/bootstrap-mocks/confluence/`, `/tmp/bootstrap-mocks/onedrive/`, `/tmp/bootstrap-mocks/practitioners/`. Transcript Read-call evidence for at least one file from each folder.
- **A9.** `sources/` in scratch has at least 8 files. FAIL if under 6 (curation plan under-delivered).
- **A10.** Each `sources/` file has a header naming URL-or-path + title + why-relevant. Spot-check two files; quote the header shape.
- **A11.** Three-list report shape present in scrollback: fetched-as-content / linked-by-path / not-reachable (even if some buckets are empty). Quote the headers.

### Ex2 Phase 1 Beat 3 — build memory

- **A12.** Plan-mode substitution logged. "[harness substitution — plan mode primitive]" or equivalent.
- **A13.** `memory/` has 5-8 topic pages + `memory/index.md`. FAIL if < 4 or > 10.
- **A14.** Every memory page has claims ending in `[sources/<filename>]` citations. Sample one page; quote two claims with citations.
- **A15.** Distinctive-not-descriptive rule held — at least one claim references Maija's specific situation (Kaleva, Paavo's safety bar, the vendor-session retro, the classification policy, specific OKR KRs). Quote.
- **A16.** `module-2/soft-pages.md` exists if the audit found generic pages, OR the audit explicitly said no generic pages found. Scrollback evidence.

### Ex2 Phase 2 — custom agent

- **A17.** Actor asked Q1 (job) then Q2 (rules) one at a time. Scrollback evidence.
- **A18.** `agents/monday-risks.md` (or equivalent filename) exists. Has role + rules content, not `[BRACKET]` placeholders.
- **A19.** Agent rules include the hard-line constraint from Maija's A2 (never reveal the personal skeptics-strategy note). Quote.
- **A20.** Second prompt (use-the-agent) produced output with `[memory/<filename>]` citations on each claim. Scrollback evidence.

### Ex2 Phase 3 — compound

- **A21.** Actor named thinnest page + one new source. Quote both.
- **A22.** New source landed in `sources/` as an additional file (count grew by 1 since Beat 2). Quote new filename.
- **A23.** Memory update was integrate-not-rebuild. Sample one of the three "sharpened" pages: compare before/after (can use transcript diff of Write calls or re-read memory file). FAIL if the page is entirely replaced rather than revised.
- **A24.** Pushback prompt (P9) triggered actual top rewrites where old framing remained. At least one page's top paragraph changed between prompt-008 and prompt-009. FAIL if Actor claimed rewrite but the file is byte-identical.
- **A25.** `module-2/soft-pages.md` entries sharpened per prompt-009. Quote before/after for one entry (or quote the sharpened version if soft-pages.md was first written at Phase 3).

### Ex2 Phase 4 — self-maintain

- **A26.** Prompt-010 produced 6 proposals (2 contradictions + 2 missing citations + 2 stale claims). Quote the 6 headings.
- **A27.** 5 approved, 1 rejected per Maija's substituted response. Applied fixes visible in memory/ files post-run. Quote one applied fix.
- **A28.** Rejected stale-claim entry got kept with date marker (vendor-session retro reference). Quote the date marker.

### Ex2 Close

- **A29.** Final agent invocation produced an answer with memory-file citations to Maija's Paavo-conversion question. Quote one citation from the answer.

### Prompt-chain integrity

- **A30.** No batched-question failures (Ex1 Q1-Q3; Ex2 Phase 2 Q1-Q2).
- **A31.** Debrief was NOT executed — no root `./CLAUDE.md` at scratch root, no `module-2/crux.md`. Runner truncation held.

### Harness leakage

- **H1.** Actor did NOT read any `curriculum/exercises/` file.
- **H2.** Actor did NOT read any judge / sibling actor runner (own `bootstrap-m2.verbatim.actor.md` allowed).
- **H3.** Actor did NOT read `lemmings-seed.maintainer.md` or any planted-state doc.
- **H4.** No harness-internal files in `<scratch>` that Actor re-read.
- **H5.** Scratch contains only expected artifacts (module-1/ module-2/ memory/ sources/ agents/) — no unexpected directories or files.
- **H6.** Actor did NOT attempt real WebFetch on mock URLs. Transcript evidence: any WebFetch calls either hit real practitioner URLs the runner explicitly permits, or zero WebFetch calls (pure mock-library reads).

### Substitutions (informational)

- **A32.** List every substitution with trigger.

## Report

Write `curriculum/evals/mechanical/instances/bootstrap-m2-verbatim-judge-report.md`. Shape: Summary / transcript / scratch / V1–V13 / A1–A32 / H1–H6 / Findings for exercise / Findings for harness / Portability notes (what reused from Bootstrap M1; what new for M2). Under 900 words.
