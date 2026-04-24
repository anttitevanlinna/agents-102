# Judge report — Bootstrap M1 personal-site-with-guardrails verbatim — 2026-04-24

## Summary

**PASS 34 / FAIL 0 / N/A 0** across V1–V5+V4a, A1–A28 (A28 informational), H1–H5. Actor executed the full Bootstrap M1 personal-site exercise cleanly: six prompts pasted verbatim, four HTML snapshots evolving through StoryBrand → Drucker → anti-brand while preserving prior gains, Phase-4 look-back without regeneration, and a `personal-brand-generation.md` grounded in session-specific flips rather than generic advice.

- **Actor transcript:** `/Users/anttitevanlinna/.claude/projects/-Users-anttitevanlinna-Projects-agents-102/e0dddd13-9477-4dd6-9370-972610cc4c15/subagents/agent-ada416c16d67b85fc.jsonl`
- **Scratch:** `curriculum/evals/mechanical/scratch/bootstrap-m1/` — 4 snapshots + live site + rules file + `.keep` only

## Verbatim round-trip

- **V1** PASS — prompt-001 verbatim. Prefix: `Build me a personal HTML one-pager site`
- **V2** PASS — prompt-002 verbatim. Prefix: `Hey Claude — apply Donald Miller's Sto`
- **V3** PASS — prompt-003 verbatim. Prefix: `Hey Claude — apply Peter Drucker's fee`
- **V4** PASS — prompt-004 verbatim (Phase 5 anti-brand). Prefix: `Hey Claude — apply anti-branding (Adam`
- **V4a** PASS — prompt-004a verbatim (Phase 4 look-back, manually extracted). Prefix: `Look at the very first site you generate`
- **V5** PASS — prompt-005 verbatim. Prefix: `Write a generation rules file at persona`

## Phase 1 — baseline

- **A1** PASS — LinkedIn paste verbatim before Prompt 1 (scrollback L11–46).
- **A2** PASS — `site.html.v1-baseline` exists, 65 lines, valid HTML (`<html`, `<body` present).
- **A3** PASS — résumé-shaped with About / Experience / Skills / Education in order. No StoryBrand help beats. Opener is the banned default: *"Experienced platform engineering leader with a proven track record of driving results and delivering value at scale."* Exactly the statistical default the exercise needs.

## Phase 2 — StoryBrand

- **A4** PASS — five distinct beat-asks in scrollback (Character L80, Problem L88, Guide L96, Plan L104, Success L112), each followed by the student answer before regeneration. No batch ask.
- **A5** PASS — `site.html.v2-storybrand` leads with `<h1>Maija Lehtinen</h1>`, not a service-pitch question.
- **A6** PASS — colleague-help section shapes the colleague as hero-of-the-help. Quote: *"You're probably a senior engineer or eng manager at a 40–200-person tech org, working on something that looks technical from where you're standing but is actually organisational."*
- **A7** PASS — grep for "book a call", "discovery call", "risk of" returned nothing in v2.

## Phase 3 — Drucker

- **A8** PASS — Read call on `/tmp/bootstrap-m1-substitutes/project-story.txt` in transcript; story appears verbatim in scrollback L142–157.
- **A9** PASS — three strengths named before regeneration (scrollback L161–163): *Protecting the team from unnecessary complexity / Translating between business stakeholders and engineers / Holding strategic positions under pressure*.
- **A10** PASS — "leadership" and "communication" absent as strength labels.
- **A11** PASS — Actor reshaped per pushback. #3 kept verbatim ("Holding a strategic position under sustained pushback"), #1 sharpened from "protecting the team" to *"Protecting the problem from the wrong-shaped solution,"* #2 reshaped from "translating between stakeholders and engineers" to *"Insisting expertise exists outside the engineering team"* (L179–181).
- **A12** PASS — v3 hero: *"I hold strategic positions under pressure and protect the problem from the wrong-shaped solution."* New "What I'm actually good at" section carries all three reshaped strengths.
- **A13** PASS — diff v2→v3 shows hero rewrite + one new section insertion; help section preserved (two minor voice-tightening edits only). No section deletions.

## Phase 4 — look back

- **A14** PASS — Read call on `site.html.v1-baseline` recorded in transcript before prompt-004a answer.
- **A15** PASS — three generic claims named + quoted from v1 + reason per claim (scrollback L201–205). Each quotes verbatim from v1 ("driving results," "Partner cross-functionally... align," "Feel free to reach out... fellow engineering leaders").
- **A16** PASS — scrollback L207: *"No regeneration for this phase — observation only."* No Write on `site.html` between prompt-004a and prompt-004. v3-drucker mtime preserved.

## Phase 5 — anti-brand

- **A17** PASS — hate-list verbatim after Prompt 4 (scrollback L227–236).
- **A18** PASS — Actor walked all four anti-brand steps for each of ten hate items: hate → offering/type → positive-opposite → outcome (scrollback L240–249).
- **A19** PASS — v4 headline/hero sharpened: *"I ship the smaller thing that fits, and I say no in writing when the room wants the bigger thing."* "Right now" section adds *"Decisions get made in the meeting, not taken offline."*
- **A20** PASS — no "What I'm against" heading; grep for "against" in v4 returned nothing.
- **A21** PASS — v4 preserves Maija as protagonist, StoryBrand help section, and all three Drucker strengths. Voice sharpened only.

## Close — rules file

- **A22** PASS — `personal-brand-generation.md` exists in scratch root, 83 lines.
- **A23** PASS — structure matches prompt request (what-this-is-for / core rule / never / always / framework moves / voice rules / distinctive-test). Core rule quote: *"Distinctive, not descriptive. A sentence passes if it could only have been written about this specific person."*
- **A24** PASS — grounded in session. Quotes the actual hate-list translation: *"Decisions get made in the meeting, not taken offline"* beats *"I don't take things offline."* Cites the concrete Drucker flips and the "Insisting expertise exists outside the engineering team" language.
- **A25** PASS — `grep -n '\[[A-Z]'` returned no bracket placeholders.
- **A26** PASS — framework-moves section names all four with subheadings: StoryBrand-tuned (help), Drucker's feedback analysis (strengths), Anti-branding (voice), Visual-steal (chrome).

## Prompt-chain integrity

- **A27** PASS — no question-dump. Phase 2 beats asked one at a time. Phase 5 steps walked per hate-list item.

## Harness leakage

- **H1** PASS — no Read on `curriculum/exercises/personal-site-with-guardrails.md`. All prompts via `/tmp/prompts/`.
- **H2** PASS — no judge-file or sibling-runner reads. Own actor file (`bootstrap-m1.verbatim.actor.md`) is the only runner read, allowed.
- **H3** PASS — no `maintainer.md` reads.
- **H4** PASS — no harness-internal files inside scratch.
- **H5** PASS — scratch contains only expected artifacts: `.keep`, `site.html`, four snapshots, `personal-brand-generation.md`.

## Substitutions (A28 — informational)

- LinkedIn paste (Phase 1 wall-of-text) → `/tmp/bootstrap-m1-substitutes/linkedin-paste.txt`
- Project story (Phase 3 "tell me a story") → `project-story.txt`
- Strengths pushback (Phase 3 reshape) → `strengths-pushback.txt`
- Hate list (Phase 5 anti-brand) → `hate-list.txt`
- Phase 4 prompt — curriculum source has no `**Prompt**` marker; manually extracted to `prompt-004a.txt`. **Curriculum parser-gap flagged.**
- Phase 6 free iteration — truncated (harness budget); not graded.

## Findings for exercise

- Phase 4 look-back prompt lacks a `**Prompt**` marker in the exercise source — parser fell through and required manual extraction. Curriculum-side fix: add marker or inline the prompt as a fenced block with the same shape as Phases 1–3/5/close. Logged as parser-gap, not a content defect.
- The exercise delivers its promise cleanly: the v1 → v4 evolution is legible on the page (résumé → protagonist+help → strengths-shaped voice → spine), and the rules file reads like *this* session, not generic advice. The distinctive-not-descriptive core rule earns its place because the session produced flips (translation → source; team-protection → problem-protection) it can cite.

## Findings for harness

- Transcript-round-trip + scrollback-diff approach ported cleanly from AE101.
- Document-artifact fidelity (HTML snapshots + rules file grounding) substitutes for AE101's commit/test/skill checks without loss of rigor — the v2→v3 diff IS the "preserved prior gains" check, and the rules-file grounding check is the Bootstrap analogue of AE101's "skill cites session evidence, not generic advice."
- Four substituted student inputs all resolve via Read; Actor didn't try to fabricate plausible pastes. Substitution boundary held.

## Portability notes

**Carried from AE101 harness:**
- `bin/verbatim-check.sh` — ran unchanged against six prompts.
- Three-role separation (Actor / Judge / Auditor) with scrollback + transcript + report artifacts.
- Substitution pattern (`/tmp/<exercise>-substitutes/`) for student-typed inputs.
- Harness-leakage checks (H1–H5) — direct reuse with the Bootstrap file set swapped in.
- Scratch-contents grep for unexpected files.

**Extended for Bootstrap:**
- **Document-artifact assertions** replace commit/test/skill assertions. v1→v4 HTML snapshot diffing and grep-based feature presence (hero line, help section, strength labels, forbidden phrases) cover what AE101 covers with `git log --grep` and skill-file presence.
- **Preservation-across-phases check** (A13, A21) — Bootstrap-specific idiom. Each regeneration must *extend* not *replace* prior gains; the diff check is the mechanism.
- **Grounded-in-session check** (A24) — for the rules file. AE101's equivalent is skill-cites-session-evidence; Bootstrap's is rules-file-quotes-actual-flips.
- **Parser-gap handling** — Phase 4's missing `**Prompt**` marker required manual extraction to `prompt-004a.txt` and a curriculum-fix finding. AE101 didn't need this because its exercises are marker-consistent. Portability rule: when the parser falls through, extract manually, flag in the actor report, grade verbatim anyway.

One-line summary: **34 PASS / 0 FAIL** across V1–V5+V4a, A1–A27, H1–H5 (A28 informational).
