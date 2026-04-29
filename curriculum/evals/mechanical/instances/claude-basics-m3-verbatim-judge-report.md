# Judge report — Claude Basics M3 verbatim

## Verdict
PASS

## Per-assertion results

### A. File-state (A1-A6)

**A1 — PASS.** Three Actor-written artifacts present at scratch:
- `group-1/divergence-antti.md` (mtime 09:49:20)
- `group-1/group-crux-1.md` (09:49:30)
- `rollout-strategy.md` at scratch root (09:49:29).

**A2 — PASS.** Pre-staged files untouched. Mtime evidence: marja=09:45:15, juhani=09:45:25, petra=09:45:36, group-2=09:45:46, group-3=09:45:55, group-4=09:46:04 — all clustered at staging window, ~3-4 minutes before any Actor write (09:49:xx). No write back-touched a pre-staged file. Scratch dir is gitignored so `git status` is clean (expected).

**A3 — PASS.** `divergence-antti.md` has three numbered Difficulty headings each with a `Push-back:` line. Difficulty 1 (measurement/team-level signal), Difficulty 2 (compliance escalation, "took 3 days... 'yes, with redaction'"), Difficulty 3 (prompts stay in individual heads). Voice is participant register, not Claude summary — first person and concrete (e.g. *"We have user counts. We don't have 'this team is shipping Claude-aided work...'"*).

**A4 — PASS.** `group-crux-1.md` names ONE crux — *"the team doesn't have a shared mechanism for what individuals already know"* — followed by four attributed quotes (Marja, Juhani, Petra, Antti). Crux body explicitly reflects the substituted push-back's framing: *"Four different surfaces, one shape: individual signal exists, but no team-level mechanism turns it into shared capability."*

**A5 — PASS.** `rollout-strategy.md` has all three sections and integrates the IT-Director push-back as voice-shaping, not appended verbatim:
- Training refresh moved up: *"Refresh the user-facing training material... This was on the deferral list in the first draft; it isn't a deferral. It's the same priority as the kit..."* (Priority 3, not deferral).
- IT Director ownership named on escalation priority: *"Fast, documented escalation path for data-class questions — owned by me, IT Director, in the next 30 days."*
- Single question reframed to public-commitment, not budget: *"Am I willing to make a public commitment that the IT team can run this rollout — or am I going to keep deferring to compliance and security on every hard call?"*

**A6 — PASS.** Grep for `[BRACKETS]`, `<my-`, `<group-`, `<antti>` across all three artifacts: zero hits.

### B. Transcript (B1-B6)

**B1 — PASS.** `bin/verbatim-check.sh` returned exit 0 for all three: prompt-001 ("Interview me about the top three difficu..."), prompt-002 ("Read every file in this group folder tha..."), prompt-003 ("Read all four group-crux files: group-1/...").

**B2 — PASS.** Prompt-001 ends with `The group folder: group-1/` (line 15). Claude's first response (line 17) immediately echoes `group-1/divergence-antti.md`. Open-hook landed within 2 lines.

**B3 — PASS.** Phase 1 shows three distinct interview cycles, one question at a time:
- Cycle 1: Q (*"What's the first difficulty you see?"*) → answer (measurement) → push-back (*"is the actual difficulty 'we lack a metric' or is it something deeper..."*) → A2 (team-level signal).
- Cycle 2: Q (*"Second difficulty?"*) → answer (compliance) → push-back (*"Can you give me a specific recent case..."*) → A2 (phone numbers, 3 days).
- Cycle 3 follows same shape (prompts/CLAUDE.md). No Q1+Q2+Q3 dump.

**B4 — PASS.** Phase 2 turn order: (1) Claude proposes *"knowledge isn't centralized"* candidate in chat with explicit *"Want to push back before I save?"* — not saved. (2) Synthesizer push-back lands reframing to "shared mechanism." (3) Claude: *"Agreed... Saving with the rewrite."* then `(File written: group-1/group-crux-1.md.)`.

**B5 — PASS.** Phase 3: Claude posts first-draft with budget question and training-refresh as deferral (lines 90-100). Push-back lands with three explicit changes. Claude rewrites — *"Rewriting in your voice — escalation owned by you in 30 days, training refresh promoted to priority 3... the final question reframed as the public-commitment call."* Saved file confirms all three integrations (see A5 quotes).

**B6 — PASS.** Line 86: *"Read all four crux files. Convergence: groups 1, 3, 4 are facets of the same problem... Group 2's escalation crux is upstream..."* — synthesis names all four groups with distinct claims per group, not group-1 reworded. Prompt-003 itself enumerates the four files (verbatim-checked).

### C. Banned-shape (C1)

**C1 — PASS.** Grep for `tell the person|sitting next to you|share with your neighbor|tell the room|sit with|take a moment|let it land` across the three saved artifacts: zero hits.

## Top issues to fix

None blocking. Minor observation only:
1. The first-draft strategy proposed three priorities (escalation, kit, metric); the saved version reflects the push-back integration but the metric priority effectively dropped while training-refresh became Priority 3 — coherent with push-back, but unstated trade-off worth flagging if a future cohort runs differently.

## One-sentence overall

Heaviest-substitution run in the M-series cleared every assertion — verbatim prompts intact, push-backs integrated as voice-shaping (not appended), pre-staged files untouched, no placeholder or banned-shape leaks in saved artifacts.
