# Judge report — Bootstrap M1 personal-site-with-guardrails verbatim — 2026-04-24

**Summary:** PASS 34 / FAIL 0 (V1–V6 + A1–A28 + H1–H5). One informational note on A28.

## Inputs

- Transcript: `/Users/anttitevanlinna/.claude/projects/-Users-anttitevanlinna-Projects-agents-102/e0dddd13-9477-4dd6-9370-972610cc4c15/subagents/agent-a2e8b9e8d08944417.jsonl` (116,667 bytes)
- Scratch: `curriculum/evals/mechanical/scratch/bootstrap-m1/` — `site.html`, `site.html.v1-baseline`, `site.html.v2-storybrand`, `site.html.v3-drucker`, `site.html.v4-antibrand`, `personal-brand-generation.md`
- Actor scrollback: `instances/bootstrap-m1-verbatim-2026-04-24-actor-scrollback.md` (276 lines)

## Verbatim round-trip (via `bin/verbatim-check.sh`)

- **V1** prompt-001 → PASS. Prefix: `Build me a personal HTML one-pager site`
- **V2** prompt-002 → PASS. Prefix: `Hey Claude — apply Donald Miller's Sto`
- **V3** prompt-003 → PASS. Prefix: `Hey Claude — apply Peter Drucker's fee`
- **V4** prompt-004 → PASS. Prefix: `Look at the very first site you generated`
- **V5** prompt-005 → PASS. Prefix: `Hey Claude — apply anti-branding (Adam`
- **V6** prompt-006 → PASS. Prefix: `Write a generation rules file at persona`

## A-assertions

- **A1** PASS. LinkedIn paste present verbatim (lines 11–50 scrollback), quoted with `> ` prefix, strip-and-compare matches `/tmp/bootstrap-m1-substitutes/linkedin-paste.txt`.
- **A2** PASS. `site.html.v1-baseline` exists; 55 lines; `<html lang="en">` and `<body>` present.
- **A3** PASS. v1 has generic About / Experience / Education / Skills / Let's Connect sections in order. No StoryBrand help-beat shape. "Passionate platform engineering leader... driving technical excellence... Strong believer in empowering engineers" — canonical résumé boilerplate.
- **A4** PASS. Five distinct beat-asks, each followed by the substituted answer. Scrollback lines 84, 89, 94, 99, 104 — Character, Problem, Guide, Plan, Success — individually asked. No question-dump.
- **A5** PASS. `site.html.v2-storybrand` exists. `<h1>Maija Lehtinen</h1>` — protagonist as headline, not a visitor-question.
- **A6** PASS. Help section in prose. Quote: *"I've spent ten years saying 'the smaller thing that fits' and getting it shipped through people who'd rather build the bigger thing. I know when that instinct is right and when it's cowardice."*
- **A7** PASS. `grep -c` on v2 for "book a call" / "discovery call" / "risk of" → 0 / 0 / 0.
- **A8** PASS. Transcript shows `Read` on `/tmp/bootstrap-m1-substitutes/project-story.txt`; story appears verbatim in scrollback lines 130–145.
- **A9** PASS. Three strengths named before regeneration (scrollback 149–151): *"Protecting the team from unnecessary complexity"*, *"Translating between business stakeholders and engineers"*, *"Holding strategic positions under sustained pushback."*
- **A10** PASS. Neither "leadership" nor "communication" appears as a strength label.
- **A11** PASS. Pushback applied correctly. #1 reshaped to *"Protecting the problem from the wrong-shaped solution"* (problem not team); #2 dropped as statistical default and replaced with *"Insisting expertise exists outside the engineering team"*; #3 *"Holding a strategic position under sustained pushback"* kept (scrollback 166–168).
- **A12** PASS. `site.html.v3-drucker` exists. Quote: *"Spending two weeks with three store managers before anyone writes code... Treating that as primary research, not stakeholder management."* Plus *"Conviction that survives the meeting"* and *"The smaller tool that fits is almost always harder to champion than the bigger one."*
- **A13** PASS. Diff hint confirmed: v3 keeps hero `.now` block, Before, "Working with me" StoryBrand help section, Contact. Help section expanded inline with three bolded strength leads — no section deletions.
- **A14** PASS. Transcript shows `Read` on `/Users/.../scratch/bootstrap-m1/site.html.v1-baseline` before the Phase 4 response.
- **A15** PASS. Three v1 claims quoted verbatim with reasons: (1) *"Passionate platform engineering leader with over 15 years of experience in driving technical excellence"* — template filler; (2) *"Strong believer in empowering engineers to do their best work"* — actively wrong (the story's center of gravity is outside engineering); (3) *"Collaborated with cross-functional stakeholders to drive platform adoption"* — bureaucratic filler dissolving the specific three-managers / two-weeks shape.
- **A16** PASS. Scrollback ends Phase 4 with *"No regeneration."* `v4-antibrand` only appears after Phase 5. No Write on `site.html` in Phase 4 block.
- **A17** PASS. Hate-list appears verbatim in scrollback lines 215–224 (ten bullets, matches substitute).
- **A18** PASS. Four anti-brand steps walked as four grouped inversions (scrollback 228–234): status-meeting cluster → decisions-in-the-room; deck-theatre cluster → one-page notes; stickies cluster → authority in conversation; paved-paths cluster → rails where asked. Each item: hate → offerings/types → positive opposite → outcome.
- **A19** PASS. `site.html.v4-antibrand` exists (53 lines). Hero line: *"I run platforms where the decisions get made in the room they're made in, not taken offline. I ship the smaller tool that fits. I say no in writing."* Tagline: *"Decisions over alignment."* Contact line: *"A short note with the actual problem beats a calendar invite with an agenda bullet."*
- **A20** PASS. `grep -ci "what i'm against"` on v4 → 0. No "against" section.
- **A21** PASS. v4 keeps Maija as h1 protagonist, StoryBrand-tuned help (Working with me), three Drucker-reshaped strengths in voice. Voice-level diffs from v3 (sharper headline, hero line, contact line, paved-paths inflection) — not a rewrite.
- **A22** PASS. `personal-brand-generation.md` exists at scratch root; 81 lines.
- **A23** PASS. Structure present: *What this is for / Core rule — distinctive, not descriptive / What to never generate / What to always do / Framework moves / Voice rules / The one-page structure.* Distinctive-not-descriptive rule: *"If a sentence could appear on ten thousand LinkedIn bios for the same job title, cut it or rewrite it until only this person could have said it."*
- **A24** PASS. Grounded in session. Cites the central-ML refusal (*"Saying no to the central-ML plan, twice, in writing"*), the verbatim Maija phrases (*"the smaller thing that fits," "conviction that survives the meeting," "decisions get made in the room they're made in"*), the bakery three-store-managers / two-weeks moment, the `Decisions over alignment` line.
- **A25** PASS. `grep -n '\[[A-Z]' personal-brand-generation.md` → no matches.
- **A26** PASS. Four framework moves named under "## Framework moves to apply": *StoryBrand — tuned for the help section only; Drucker's feedback analysis — for strengths; Anti-branding — for voice; Visual steal — for chrome.*
- **A27** PASS. Phase 2 walked one beat at a time (five distinct exchanges). Phase 5 walked four steps (as four grouped inversions, each covering the four sub-steps per item). No question-dump in either.
- **A28** Substitutions (informational):
  - `linkedin-paste.txt` → Prompt 1 LinkedIn paste trigger.
  - `project-story.txt` → Prompt 3 "tell me the project" trigger.
  - `strengths-pushback.txt` → Prompt 3 post-inference "which is most / least true" trigger.
  - `hate-list.txt` → Prompt 5 "hate list" trigger.

## H-assertions (harness leakage)

- **H1** PASS. Transcript Read calls show no read of `curriculum/exercises/personal-site-with-guardrails.md`. Prompt content flows via `/tmp/prompts/personal-site-with-guardrails/prompt-00{1..6}.txt` only.
- **H2** PASS. No read of any judge or sibling runner. Actor read its own `bootstrap-m1.verbatim.actor.md` (allowed).
- **H3** PASS. No `*maintainer.md` read in transcript.
- **H4** PASS. No harness-internal files inside scratch. Actor re-read its own scratch outputs (v1-baseline for Phase 4) which is the intended flow.
- **H5** PASS. Scratch contents = `site.html` + four snapshots + `personal-brand-generation.md` + `.keep`. No `.harness/`, no judge notes, no stray files.

## Findings for the exercise

- The StoryBrand walk held one-at-a-time discipline even with the compressed scrollback style. The "protagonist of the SITE is me; help section is where the colleague is hero" distinction landed — v2 headline is `Maija Lehtinen`, not a service-pitch question.
- Drucker pushback correctly dropped the "translation" statistical-default strength and kept the edge on "holding a strategic position." This is exactly the move the exercise wants; the rule against "leadership/communication" labels did its job.
- Phase 4 look-back quoted v1 verbatim with three sharp readings — the one that flags "Strong believer in empowering engineers" as *actively wrong* (not merely generic) is the strongest observation, because it uses the bakery story's center-of-gravity to reveal the default's falseness.
- The rules file is grounded: every framework move references an actual decision from the run. Verbatim-phrase preservation ("conviction that survives the meeting") is the signature that distinguishes this file from generic personal-brand advice.

## Findings for the harness

- No judge-side issues. The six-prompt chain (no V4a — exercise fix upstream confirmed) parsed cleanly; `bin/verbatim-check.sh` matched all six prefixes.
- Bootstrap-shaped assertions (HTML evolution across snapshots, rules-file grounding in session decisions) work — these were the right substitute for AE101's commits/tests/skills.
- Scratch hygiene clean: only student-authored artifacts, no harness leakage.

## Portability notes

What carried from AE101 verbatim judges:

- **V1–VN verbatim round-trip via `bin/verbatim-check.sh`**: identical shape, identical tool.
- **H1–H5 harness-leakage block**: same skeleton (exercise-md read, sibling/judge read, maintainer read, scratch pollution, scratch stray files). Just swap the exercise filename and the maintainer-doc name.
- **Substitute-file pattern** (A8, A17, A28): `/tmp/<exercise>-substitutes/*.txt` Read by transcript + verbatim echo in scrollback. Identical shape to AE101 student-input substitutes.
- **A27 "prompt-chain integrity / no question-dump"**: transferable whenever a prompt says "one at a time."
- **Phase-by-phase A-assertion blocks**: same rhythm as AE101 multi-phase judges.

What needed extending:

- **Document-artifact snapshots as assertion targets** (A2, A5, A12, A19, A22). AE101 judges target commits / tests / skills; Bootstrap targets `site.html.vN-<phase>` snapshots on disk and a rules file. `wc -l` + `grep` on HTML bodies replaces `git log` / test runs / skill-registry checks.
- **"No regeneration" negative assertion** (A16): new shape. Looks at scratch mtimes / absence of a Write call in the phase's scrollback block. AE101 has nothing equivalent — every phase typically produces a commit.
- **"Kept from previous phase, not wholesale rewrite" assertion** (A13, A21): a diff-hint rather than a strict diff. Useful for iterative-document exercises; unnecessary in codebase exercises where git diff already answers the question.
- **Rules-file grounded-in-session assertion** (A24): qualitative — needs the judge to quote at least one verbatim session phrase surviving in the output file. Transfers to any exercise that ends with an authored guardrail / skill / rules artifact.

No new tooling required; `verbatim-check.sh` + `grep` / `diff` / `wc` cover it. Bootstrap slotted into the existing harness at near-zero extension cost.

---

**One-line summary:** PASS 34 / FAIL 0 — V1–V6 verbatim, A1–A28, H1–H5 all pass; Bootstrap M1 personal-site-with-guardrails ran clean on the AE101-derived harness with document-artifact assertions.
