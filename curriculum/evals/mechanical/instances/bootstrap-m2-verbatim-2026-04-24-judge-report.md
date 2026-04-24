# Judge report — Bootstrap M2 verbatim chain — 2026-04-24

## Summary

**PASS 51 / FAIL 0 / NOTES 1** across V1–V13 + A1–A32 + H1–H6. Exercise chain (name-your-challenge + build-your-challenge-memory) ran clean on a mock-connector harness: 13 prompts pasted verbatim, three-question pinning held, curation respected sensitivity triage, 6 distinctive memory pages cited to `sources/`, Phase 3 compound step genuinely rewrote tops rather than appending, Phase 4 maintenance proposed 6 / approved 5 / rejected 1 with date-marker kept, and Debrief truncation held (no root `CLAUDE.md`, no `module-2/crux.md`). No harness leakage.

## Inputs

- **Transcript:** `~/.claude/projects/-Users-anttitevanlinna-Projects-agents-102/e0dddd13-…/subagents/agent-a4c14a97261d71b34.jsonl` (96 lines).
- **Scratch:** `curriculum/evals/mechanical/scratch/bootstrap-m2` — `module-1/CLAUDE.md`, `module-2/{challenge,soft-pages}.md`, `memory/` 7 files (index + 6 topics), `sources/` 10 files, `agents/monday-risks.md`. No root `CLAUDE.md`, no `module-2/crux.md`.

## V1–V13 verbatim (via `bin/verbatim-check.sh`)

V1 name-your-challenge/prompt-001 PASS. V2 prompt-002 PASS. V3–V13 build-your-challenge-memory/prompt-001..011 all PASS. 13 / 13.

## A-assertions

- **A1 PASS.** Scrollback shows Q1 → A1 → Q2 → A2 → Q3 → A3, not a question-dump.
- **A2 PASS.** `module-2/challenge.md` exists, grounded in Maija's three answers. Quote: *"the sub-team leads are split roughly half-and-half between running experiments and wanting to wait six months."*
- **A3 PASS.** Prompt-002 response lists 5 Confluence terms (*"AI enablement," "platform OKRs 2026," "classification policy," "sub-team structure," "agentic rollout"*), 3 OneDrive folders (`weekly-sync/`, `Maija/personal/`, `Maija/email/`), 3 practitioners (Karpathy + Alasaarela + Klaassen).
- **A4 PASS.** Transcript contains 6 reads of `module-2/challenge.md`; first is inside Beat 1 before curation plan.
- **A5 PASS.** Scrollback logs `[harness substitution — no live MCP connectors in this session; substituting … from /tmp/bootstrap-mocks/]`. No fabricated real connector.
- **A6 PASS.** Curation covered all three categories. Internal: *ENG space: "platform OKRs 2026," "sub-team structure," "AI enablement"*. Recent: `/Kaleva/Platform/Leads/weekly-sync/` — Monday sync. Outside-in: Karpathy / Alasaarela / Klaassen.
- **A7 PASS.** `maija-prep-notes-skeptics.md` and `sponsor-email-thread-tuomas-aug-2026.md` both flagged *"Borderline sensitive … Include only if you're comfortable; otherwise skip-for-now."*
- **A8 PASS.** Transcript Read hits on `confluence/2026-platform-okrs.md`, `onedrive/platform-leads-sync-notes-2026-07-08.md`, `practitioners/karpathy-llm-wiki.md` (plus six more across the three folders).
- **A9 PASS.** `sources/` has 10 files (≥ 8).
- **A10 PASS.** Spot-check `sources/karpathy-llm-wiki.md` and `sources/kaleva-platform-okrs-2026-h2.md` both carry URL/path + title + why-relevant header.
- **A11 PASS.** Three-list report in scrollback: "Fetched and saved as content (9)", "Linked by local path (0)", "Not reachable — waiting for attach (0)".
- **A12 PASS.** `[harness substitution — plan mode primitive not available]` logged before Beat 3.
- **A13 PASS.** `memory/` = `index.md` + 6 topic pages (within 5–8).
- **A14 PASS.** Sample `memory/skeptic-conversion.md`: *"Principled skeptics (Paavo at Kaleva) convert when agentic work compounds visibly in their own context over a short window … [sources/klaassen-compound-engineering.md] [sources/maija-prep-notes-skeptics.md]"* and *"Paavo's bar is already a written spec … [sources/platform-leads-sync-notes-2026-07-08.md]"*.
- **A15 PASS.** Distinctive-not-descriptive held: Paavo's written bar, KR2.2, Week 6 Q3 offsite, Anneli's carve-out, Sari's two Backstage plugins — all Kaleva-specific.
- **A16 PASS.** `module-2/soft-pages.md` exists with `personal-first-architecture.md` flagged at Phase 1.
- **A17 PASS.** Phase 2 Q1 (job) asked before Q2 (rules); scrollback shows sequential Q/A, not batched.
- **A18 PASS.** `agents/monday-risks.md` has Role / Job / Rules / Shape; no `[BRACKET]` placeholders.
- **A19 PASS.** Hard-line rule present verbatim: *"never reveal the content of `onedrive/maija-prep-notes-skeptics.md` in anything that might be shared."*
- **A20 PASS.** Prompt-006 output carries inline citations — *"Paavo the multi-agent safety spec … [memory/paavo-safety-bar.md]"* etc. on every risk.
- **A21 PASS.** Thinnest page = `personal-first-architecture.md`; new source = *"Kieran Klaassen on compound engineering."*
- **A22 PASS.** `sources/klaassen-compound-engineering.md` is the +1 file (count grew 9 → 10).
- **A23 PASS.** Integrate-not-rebuild: scrollback names three "sharper not longer" pages; Edit calls on memory pages (not full Write-replace) confirm in-place revision on `forcing-functions.md`, `personal-first-architecture.md`, `rollout-antipatterns.md`, `skeptic-conversion.md`.
- **A24 PASS.** P9 verification pass confirms tops rewritten on all three named pages; soft-pages.md entry re-sharpened.
- **A25 PASS.** `module-2/soft-pages.md` carries the Phase 3 sharpened entries naming the compounding-frame pattern.
- **A26 PASS.** Six proposals present under headings "Contradictions (2)" C1–C2, "Missing citations (2)" M1–M2, "Stale claims (2)" S1–S2.
- **A27 PASS.** 5 approved / 1 rejected per Maija's verbatim decision. Applied fix visible: `rollout-antipatterns.md` carries the date-marker annotation in the Q1 numbers line.
- **A28 PASS.** S2 (vendor-session retro) kept with date-marker — S1's `(Q1 2026, per 2026-02-14 retro; kept as reference point, not as current practice)` does double duty as declared in scrollback.
- **A29 PASS.** Close answer on Paavo-conversion question carries memory citations on every claim — *"[memory/skeptic-conversion.md]," "[memory/paavo-safety-bar.md]," "[memory/forcing-functions.md]," "[memory/personal-first-architecture.md]," "[memory/security-classification-blocker.md]"*.
- **A30 PASS.** No batched-question failures in either opener.
- **A31 PASS.** Debrief not executed — no root `CLAUDE.md` at scratch root, no `module-2/crux.md`. Runner truncation held.
- **A32 NOTE.** Substitutions logged: (1) mock Confluence/OneDrive/practitioner connector library; (2) Maija's three challenge answers from `challenge-inputs.md`; (3) plan-mode primitive unavailable; (4) Klaassen posts absent from mock library — written as paraphrased summary with harness-substitution note (in a real session would be WebFetch).

## H-assertions (harness leakage)

- **H1 PASS.** Zero reads of `curriculum/exercises/*`. (The string appears only in the runner's own "must NOT do" block echoed through the orchestrator prompt.)
- **H2 PASS.** Only runner read = own `bootstrap-m2.verbatim.actor.md` (allowed).
- **H3 PASS.** No reads of `lemmings-seed.maintainer.md` or planted-state docs.
- **H4 PASS.** Scratch contains only expected artefacts.
- **H5 PASS.** Tree = `module-1/ module-2/ memory/ sources/ agents/` — no extras.
- **H6 PASS.** Zero real WebFetch calls (no `"url":…` entries in transcript). All fetches resolved to mock-library Read calls.

## Findings for the exercise

Chain worked end-to-end. The three-beat structure of build-your-challenge-memory (curate → ingest → build) held under mock substitution — students running against real MCP should see the same shape. Distinctive-not-descriptive is genuinely enforced by P4 self-audit + P9 pushback; without both, soft tops would ship. The Phase 3 compound step demonstrates *integrate-not-rebuild* cleanly: one new source, three sharpened tops, one dropped claim. Phase 4's approve/reject split (Maija rejecting "stale" on the vendor retro and keeping the date-marker) models the maintenance-by-pushback move the training teaches.

## Findings for the harness

Mock connector library served all nine Beat-2 fetches without strain. The plan-mode substitution line is a cheap but honest cover for a primitive the sandbox can't exercise. One small wart: Klaassen wasn't in `practitioners/` — the Actor wrote a paraphrased summary and logged the substitution, which is correct behavior but means A21–A24 are evidenced by paraphrase not fetched content. Adding a `klaassen-compound-engineering.md` to the mock library would close this for the next run.

## Portability notes

**Reused from Bootstrap M1:** runner conventions (verbatim blockquoting, `[harness substitution — …]` logging idiom, scrollback/report shape, `verbatim-check.sh` V-assertions, scratch-tree H-assertions), truncated-Debrief convention.

**New for M2:** (a) three-folder mock connector library (`confluence/`, `onedrive/`, `practitioners/`) with frontmatter mimicking each tool's export shape — reusable for any future multi-connector exercise; (b) pre-staged student inputs at `challenge-inputs.md` for multi-answer prompts where the Actor persona needs deterministic replies; (c) three-list report shape (fetched-as-content / linked-by-path / not-reachable); (d) distinctive-not-descriptive audit file (`module-2/soft-pages.md`) as a first-class artefact; (e) integrate-not-rebuild verification via Edit-call evidence rather than full-file Write comparison; (f) approve/reject with retained date-marker as a pattern for Phase-4-style maintenance exercises elsewhere.
