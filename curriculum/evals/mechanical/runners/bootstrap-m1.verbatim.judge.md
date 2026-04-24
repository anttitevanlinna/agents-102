# Judge — Bootstrap M1 personal-site-with-guardrails verbatim

Grading an Actor that ran Bootstrap M1's personal-site-with-guardrails exercise on an empty scratch folder simulating a business-user (Maija) in Claude Code. Inputs: final scratch state (HTML snapshots + `personal-brand-generation.md`), Actor's `.jsonl` transcript, scrollback, 6 extracted prompt files (5 parsed + 1 manual for Phase 4), 4 substituted student inputs.

Bootstrap differs from AE101 structurally — no codebase, no git, no tests. Assertions target document-artifact fidelity (HTML evolution, rules-file grounding) rather than commits/tests/skills.

## Inputs

- **Scratch:** `/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/scratch/bootstrap-m1`
- **Actor transcript:** `<ACTOR_TRANSCRIPT_PATH>`
- **Actor report:** `curriculum/evals/mechanical/instances/bootstrap-m1-verbatim-2026-04-24-actor-report.md`
- **Actor scrollback:** `curriculum/evals/mechanical/instances/bootstrap-m1-verbatim-2026-04-24-actor-scrollback.md`
- **Prompt files:** `/tmp/prompts/personal-site-with-guardrails/prompt-00{1,2,3,4,5,6}.txt`
- **Student input substitutes:** `/tmp/bootstrap-m1-substitutes/{linkedin-paste,project-story,strengths-pushback,hate-list}.txt`

## Tooling

- `curriculum/evals/mechanical/bin/verbatim-check.sh <prompt> <scrollback>` for V-assertions.

## Assertions

### Verbatim round-trip

- **V1.** prompt-001 verbatim in scrollback (Phase 1 baseline).
- **V2.** prompt-002 verbatim (Phase 2 StoryBrand).
- **V3.** prompt-003 verbatim (Phase 3 Drucker).
- **V4.** prompt-004 verbatim (Phase 4 look-back).
- **V5.** prompt-005 verbatim (Phase 5 anti-brand).
- **V6.** prompt-006 verbatim (Close rules file).

### Phase 1 — baseline

- **A1.** LinkedIn paste appears verbatim in scrollback before Prompt 1. Strip `> ` and compare.
- **A2.** `site.html.v1-baseline` exists in scratch. Valid HTML (`<html`, `<body` present).
- **A3.** v1 baseline reads generic / résumé-shaped — has headline, about, experience, education sections in order. FAIL if the baseline already includes StoryBrand help-section beats (Actor pre-enriched, defeating the exercise).

### Phase 2 — StoryBrand

- **A4.** Actor walked the five beats one at a time (Character → Problem → Guide → Plan → Success). Scrollback shows five distinct beat-asks, each followed by the substituted answer, NOT one batched ask. FAIL if question-dump.
- **A5.** `site.html.v2-storybrand` exists. Contains Maija's name as headline protagonist (not a service-pitch question to the visitor).
- **A6.** v2 has a colleague-help section whose shape matches the tuned StoryBrand beats (the colleague is hero-of-the-help, not hero-of-the-site). Quote one sentence from the section.
- **A7.** v2 did NOT import Stakes / CTA beats (no "book a call," no fear-framing). Grep HTML for "book a call", "discovery call", "risk of" — FAIL if present.

### Phase 3 — Drucker

- **A8.** Actor received the project story from the substitute. Transcript Read-call on `/tmp/bootstrap-m1-substitutes/project-story.txt` OR the story appears verbatim in scrollback.
- **A9.** Actor inferred three strengths (named before any regeneration). Quote them.
- **A10.** Strengths are specific, not "leadership" / "communication" (the exercise explicitly bans those). FAIL if either string appears as a strength label.
- **A11.** Actor received the strengths-pushback and reshaped the three per the pushback (drops #2 "translation" as statistical default, keeps #3 "holding strategic positions," sharpens #1 to problem-not-team).
- **A12.** `site.html.v3-drucker` exists. Contains voice-shaping from the reshaped strengths (e.g., references to "smaller thing that fits," "holding the line," or "expertise outside the engineering team"). Quote.
- **A13.** v3 keeps the StoryBrand-tuned help section from v2 — not a wholesale rewrite. Diff hint: `diff site.html.v2-storybrand site.html.v3-drucker` should show voice shifts, not section deletions.

### Phase 4 — look back

- **A14.** Actor read `site.html.v1-baseline` before answering Prompt 4a. Transcript Read-call evidence.
- **A15.** Actor named three specific claims from v1 that were generic. Each claim is quoted from v1 + reason it was a statistical default. FAIL if claims are abstract ("the About section was generic") without quoting v1.
- **A16.** No regeneration in Phase 4. v3 file unchanged on disk after Phase 4; v4 doesn't exist yet at this point. (Checked against scratch mtimes or against scrollback — Phase 4 response does not contain a Write tool call on `site.html`.)

### Phase 5 — anti-brand

- **A17.** Hate-list appears verbatim in scrollback after Prompt 4.
- **A18.** Actor walked the four anti-brand steps (hate → offerings/types → positive opposite → blockers-to-outcomes). Scrollback evidence per step.
- **A19.** `site.html.v4-antibrand` exists. Voice sharpened — quote a line from headline / hero / section framing that reflects anti-brand inversion (e.g., positive opposites of hate-list items).
- **A20.** v4 did NOT add a "What I'm against" section. Grep for such heading — FAIL if present.
- **A21.** v4 kept Maija as protagonist, StoryBrand-tuned help, Drucker-derived strengths. No wholesale rewrite.

### Close — rules file

- **A22.** `personal-brand-generation.md` exists in scratch root.
- **A23.** Contains the structure the prompt asks for: what-this-is-for, core rule (distinctive not descriptive), what-never-to-generate, what-always-to-do, framework moves, voice rules. Quote the distinctive-not-descriptive rule.
- **A24.** Grounded in session decisions — cites at least one actual moment from the run (e.g., a specific strength, a specific anti-brand inversion, a specific StoryBrand beat answer). Quote. FAIL if the file reads like generic personal-brand advice.
- **A25.** No `[BRACKET]` placeholders. `grep -n '\[[A-Z]' <path>`.
- **A26.** Framework moves section names all four: StoryBrand-tuned (help), Drucker (strengths), anti-branding (voice), visual-steal (chrome). Quote the list.

### Prompt-chain integrity

- **A27.** No question-dump where prompts say "one at a time" (Phase 2's beats; Phase 5's four steps).

### Harness leakage

- **H1.** Actor did NOT read `curriculum/exercises/personal-site-with-guardrails.md`. All prompt content via `/tmp/prompts/`.
- **H2.** Actor did NOT read any judge or sibling runner. Own actor file allowed.
- **H3.** Actor did NOT read any maintainer doc (`lemmings-seed.maintainer.md` — irrelevant here but check for any `maintainer.md` Reads).
- **H4.** No harness-internal files inside `<scratch>` that Actor re-read.
- **H5.** Scratch contains only the expected artifacts (site.html + snapshots + personal-brand-generation.md + .keep). Grep `ls <scratch>` — FAIL on unexpected file (e.g., a `.harness/` dir or judge notes).

### Substitutions (informational)

- **A28.** List substitutions with trigger.

## Report

Write `curriculum/evals/mechanical/instances/bootstrap-m1-verbatim-2026-04-24-judge-report.md`. Same shape as AE101 verbatim judge reports: Summary / transcript / scratch / V1–V6 / A1–A28 / H1–H5 / Findings for exercise / Findings for harness / Portability notes (what carried from AE101 harness; what needed extending). Under 800 words.
