# Eval instance — Agentic Engineering 101 · M2 Extract the task-shaping rule

Target artifacts:
- `curriculum/exercises/extract-the-task-shaping-rule.md` (exercise — primary)
- `curriculum/lectures/where-the-rule-could-live.md` (mini-lecture closer — paired)

**Eval runs:**
- **2026-04-28 (initial draft, pre-audit):** APPROVE WITH TODOs pending pre-ship audit. Open items: source-verify the three lecture practitioner attributions; first-cohort sim against P3 to check for building-instinct deflection; `[SOURCE NEEDED]` on the issue-webhook shape if no practitioner-direct citation surfaces.

---

## Primary — the leap test  *(Antti steers)*

After completing this exercise, the participant can:
- **Extract** three to five task-shaping rules from their own M2 plan-mode session, anchored to specific moments (the task picked, what the second-pass read surfaced, what their push-backs caught) — not generic rubric phrases
- **Save** the rules to a `.md` file at a location they chose deliberately (auto-load tier vs. repo-personal tier vs. somewhere else) — not a path the curriculum prescribed
- **Recognize** three real-world shapes (Slack triage / issue webhook / scheduled read) for turning a rules file into automation, and **defer** building one today as the discipline

If an engineer walks out with the file written, at least one rule rewritten in their own voice, and a clear sense of "I'm not building the bot today and that's the move" — the exercise lands.

## Framing fidelity *(universal)*

The exercise leads with the module's Big Idea extended one layer up: **the rule is the artifact. Capture how you factored *this* task; don't build the bot today.**

It avoids these anti-framings:
- **Build-the-splitter-now.** Phase 3 must refuse the "let's prototype the Slack bot" pull. The discipline is capture-not-apply, mirroring M2's "approve, don't execute."
- **Curriculum-prescribed location.** Phase 2 must offer plausible homes without picking one for the student. Free-choice is the *capture-your-world* beat made concrete.
- **Skill-by-name authoring.** Phase 2 names a `.md` file, never a SKILL.md. M3 Ex3 owns first skill-by-name authoring.
- **Generic rules accepted as-is.** Phase 1's force-engagement (rewrite or reject at least one) defeats the default-acceptance pattern.

## Learning goal fit *(universal)*

Enables these Bloom-tagged learning goals from the module file:
- **Extract** three to five task-shaping rules from your own session into a `.md` file at a location you choose, sharpening at least one before saving
- **Recognize** three shapes for turning a rules file into automation (Slack triage, issue webhook, scheduled read), without building one today

Phase mapping:
- P1 (surface, sharpen, reject) → *Extract* + force-engagement
- P2 (save to chosen location) → *Extract* second clause + free-choice agency
- P3 (ask Claude where this could go) → setup for *Recognize*; the lecture grounds the recognition

## Mood contract

Extension of grounded competence into capture-and-name. Mini-lecture closes forward-looking on the leverage horizon (Risto-tilt) without forcing application. Honors M2's mood by NOT resolving into "I built the splitter."

## Strategic beat

*Capture-your-world* (theme #5) made concrete via free-choice location; *non-agentic-default* (theme #6) made concrete via deferred application. The M2 discipline ("approve, don't execute") applied one layer up ("save, don't automate").

## Open for first eval pass

- Three-persona sim (mid-competent / opinionated senior / fast operator) on both files
- Source-verification of the three lecture shapes (Klaassen / issue-webhook `[SOURCE NEEDED]` / Ronacher)
- Capability-check on the loading-model claim in P2 (`~/.claude/memory/` auto-load behavior, `CLAUDE.local.md` gitignore default)
- Cross-module-artefact-contract check: does any later AE101 module assume this `.md` exists at a stable path? If yes, the location-free-choice is a contract violation; if no, free-choice is correct.
