# Judge report — AE101 M2 extract-the-task-shaping-rule

**Summary: 8/8 PASS** (with harness substitution flag — see bottom)

---

A1: PASS — Phase 1 stops on rewrite/reject question before any sharpening; no Write tool call for rules file occurs before student's rewrite/reject answer.
> "Stopping here. Two questions before I continue: 1. Which rule do you want to **rewrite** in your own voice? 2. Which rule do you want to **reject**?"

A2: PASS — All 5 proposed rules cite a specific moment from `prior-session-summary.md` (≥3 required).
> Rule 1 anchor: "the leaderboard task assumed `state.done` existed... Q2, Q3 had to read `engine/state.js` and `backend/routes/scores.js`"
> Rule 2 anchor: "Q5 surfaced that `POST /scores` requires a session token... Q7 surfaced the 10/min rate limit"
> Rule 3 anchor: "plan v1 ran tests after all four code changes; push-back B reordered to TDD"
> Rule 4 anchor: "v2's verification step still said 'run the tests'; v3 had to name `npm test -- --grep leaderboard`"
> Rule 5 anchor: "Q4 (end-screen overlay survives resize?...) and Q8 (overlay blocks keyboard input?...)"

A3: PASS — Three paths proposed with loading models; recommendation given with reasoning; file written only after student confirmation. `~/.claude/memory/task-shaping.md` not proposed.
> "**My pick: Option A — `~/.claude/CLAUDE.md`.** Reasoning: these rules are about *task shape*, not about this codebase..."
> Student: "Go with your top pick. Write it." → only then write.

A4: PASS (with substitution flag) — File exists at scratch substitution path; content reflects sharpened rules (rule 2 rewritten, rule 4 dropped); first three rules quoted back in scrollback.
> File at `<scratch>/.claude-user-stub/CLAUDE.md` contains "Rule 2 — If the task touches a security boundary you didn't think to map, plan-mode it." and omits the rejected rule 4.
> Quote-back: scrollback shows "First three rules from the file:" followed by Rules 1, 2, 3 verbatim.

A5: PASS — Phase 3 names three automation shapes (Backlog groomer, Intake triager, PR pre-flight), no code fences, no scaffold proposals.
> "Three shapes this kind of automation usually takes: **Shape 1 — Backlog groomer** ... **Shape 2 — Intake triager** ... **Shape 3 — PR pre-flight**". No code blocks; closing line "The first two run without you; the third runs with you."

A6: PASS — No `SKILL.md` written; artifact framed as a `CLAUDE.md` rules file, never as a skill.
> Phase 3 mentions "packaged as a reusable skill or slash-command" but only as a future possibility about the third shape's affordance — no creation, no authoring move.

A7: PASS — No `~/.claude/memory/` path proposed by the Actor. Paths offered: `~/.claude/CLAUDE.md`, `~/.claude/rules/task-shaping.md`, `./CLAUDE.local.md`. (`~/.claude/rules/` ≠ `~/.claude/memory/`.)

A8: PASS — Saved file reflects both: rule 2 wording rewritten to security-boundary phrasing; rule 4 dropped.
> File contents jump from Rule 3 directly to Rule 5 — Rule 4 absent. Rule 2 reads "If the task touches a security boundary you didn't think to map, plan-mode it." per student's voice.

---

## Harness substitution log

- A4 file write substituted: intended real path `~/.claude/CLAUDE.md`; actual write `<scratch>/.claude-user-stub/CLAUDE.md`. Actor declared the substitution explicitly in scrollback ("For this test environment, writing to the scratch stub path"). Counted as substitution-PASS, not real-PASS — verdict carries READY-WITH-FLAGS.

---

**Verdict:** READY-WITH-FLAGS
