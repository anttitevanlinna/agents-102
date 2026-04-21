# Static Checks — Prework + Module 1 — 2026-04-20

Run before Antti's manual run. Output from path-consistency, time-budget, jargon-ban lints plus opportunistic pre-flight inspection on static sources.

## Summary

| Lint | Verdict | Notable |
|---|---|---|
| Path consistency (include-links) | PASS | all lecture/exercise/supplementary/reference links resolve |
| Path consistency (literal file paths in prompts) | **BREAK** | prework relative-path ambiguity vs. self-study Workbench scope |
| Path consistency (renderer query params) | PASS | `?file=reference/...` and `?file=supplementary/...` supported by renderer |
| Time budget (prework) | FRAY | claims 45 min; sub-tasks explicitly sum to 35 — 10 min unaccounted |
| Time budget (M1) | MISSING-TIMES | lectures + Connections + Debrief + Bridge have no explicit time lines; exercise states 45 |
| Jargon ban | PASS | no unearned banned terms |

Two **BREAK**-grade findings to fix before the manual run. Three **FRAY** items to note for pickup during or after.

---

## BREAK #1 — Prework path / scope mismatch

**Files:** `curriculum/trainings/bootstrap/prework.md`, `.claude/skills/self-study/SKILL.md`

**What breaks:**
`prework.md` line 20 instructs student to save `snake.html` *"in the prework/ folder"* — a relative path `prework/snake.html`. Line 23 refers to the same relative path. Line 38 / 46: `prework/meetings.txt`.

But `SKILL.md` line 51 + 97 + 156 opens the Workbench at `<training-dir>/prework/` for the prework phase. A relative `prework/` from inside `<training-dir>/prework/` resolves to `<training-dir>/prework/prework/` — a nested folder that gets created unintentionally.

**Self-study delivery will produce wrong file paths on Task 1.**

**Fix options:**
- **(A)** Change prework prompts to use bare filenames (`snake.html`, `meetings.txt`) — matches the "in the current folder" pattern used elsewhere. Minimal edit.
- **(B)** Change SKILL.md to open the Workbench at the training-dir root for prework (not inside `prework/`). Larger edit, affects the "three seams" model.

Recommend **(A)** — cleaner, tighter diff, no ripple.

**Also at line 23:** *"Open `prework/snake.html` in your browser"* → *"Open `snake.html` in your browser"*.

---

## BREAK #2 — `localhost:8000` assumption for lecture reading

**File:** `curriculum/trainings/bootstrap/prework.md` line 10 and `SKILL.md` line 127

**What breaks:**
Prework line 10: *"The lecture server runs on your machine at `localhost:8000`, so read lectures on the same machine Claude Code is running on."* SKILL.md line 127 directs students to `http://localhost:8000/site/curriculum.html?...` for lectures.

Neither file tells the student how to start the server. `python3 -m http.server 8000` is assumed prior knowledge — a developer-environment assumption for a non-developer audience.

**First real self-study student will hit connection-refused on their first lecture.**

**Fix options:**
- **(A)** Host the curriculum at a password-protected URL (per `curriculum/CLAUDE.md` § Material Distribution direction) and swap every `localhost:8000` reference. Right long-term fix; requires hosting setup.
- **(B)** Add an explicit setup step in prework: how to start the server (cd + one command), how to know it's running, and how to stop it. Short-term patch.

Already logged in `delivery-incidents.md` as a "known incident before first real cohort — fix before any self-study pilot." Flagging here for visibility.

---

## FRAY — Prework time claim vs. sub-totals

**File:** `curriculum/trainings/bootstrap/prework.md`

**What:** Line 3: *"Three tasks and one read. About 45 minutes."* Task headings: 10 + 10 + 10 = 30. Plus "5 min setup check" = 35. Gap of 10.

**Fix:** Either extend sub-task time estimates (more plain — prework always takes longer) or drop total to 35-40. Recommend 40-50 as stated range.

---

## FRAY — M1 missing explicit time-per-phase

**Files:** `curriculum/trainings/bootstrap/getting-going.md`, `curriculum/lectures/context-is-king.md`, `curriculum/lectures/what-just-happened.md`

**What:** Per SKILL.md module runtime targets (Connections 8-12 / Lectures 10-15 each / Exercise 55-70 / Debrief 12-18 / Bridge 3-5 = 1h45), M1 should have **Time:** lines on every phase artifact. Currently:
- Exercise: "Time: 45 minutes. Banter expected." ← *shorter than 55-70 target for Bootstrap*
- Both lectures: no **Time:** line
- Connections, Debrief, Bridge: no stated time in module file

**Rough sum:** Exercise 45 + 2 lectures ~20-30 + Connections ~10-15 + Debrief ~5-12 + Bridge ~3-5 = **~83-107 min**. Upper end fits 1h45 budget; lower end runs thin.

**Fix:** Add **Time:** lines to `context-is-king.md` (~10-12 min — it's a demo with priming), `what-just-happened.md` (~8-10 min — closing reflection). Revisit exercise target: 45 min with banter might stretch to 55-65 in real rooms — call that target.

---

## FRAY — CLI vs. "no terminal" contradiction

**Files:** `prework.md` line 10, `getting-going.md` line 10 (Meta)

**What:** prework says *"CLI (terminal) is the smoothest for self-study; the desktop app works too"*. M1 Meta says *"Install Claude Code (desktop or web — no terminal)"*.

**Fix:** Pick one. For a business audience, "no terminal required" is the stronger affordance (see delivery-incidents.md install-cliff entry). Update prework to match.

---

## FRAY — Connector capability unverified for Claude Code

**File:** `prework.md` Task 2 Path A

**What:** Prework assumes Microsoft 365 / Google Workspace calendar connectors are reachable from Claude Code. `curriculum/CLAUDE.md` explicitly states *"Claude.ai-only features (e.g., the chat-app connector panel)"* — implying connectors might be Claude.ai-side. Whether Claude Code desktop supports these connectors currently is uncertain.

**Fix:** Before manual run, invoke `claude-code-guide` agent to confirm current Claude Code connector story. If connectors are Claude.ai-only, the prework Path A instruction needs rewording (or Path B promoted to default).

---

## MINOR — Dangling homework reference

**File:** `getting-going.md` line 12

**What:** *"Homework: Antti's LLM brain post; selected sections from 'What is an Agent' reference"*. No URL for the blog post, no list of which "What is an Agent" sections.

**Fix:** add URL and section list, or drop until both exist.

---

## MINOR — Module-rename TODO active

**File:** `getting-going.md` line 1

**What:** Top-of-file TODO: consider renaming module to "Context is King" to align with Big Idea. Collides with existing lecture "Context is King" — would need a second rename.

**Not a bug** — deliberate open decision. Flagged so the manual run doesn't get blocked on it.

---

## Recommended actions before manual run

1. **Fix BREAK #1** — edit prework.md prompts to use bare filenames (not `prework/...`). ~5 min edit.
2. **Patch BREAK #2 short-term** — add explicit `python3 -m http.server 8000` startup step to prework, with a `Note: the trainer normally starts this for you; in self-study you start it yourself` caveat. Also bookmark the issue for hosted-URL fix.
3. **Decide the CLI vs. desktop-only line** — pick one in prework.
4. **Run the connector-capability check** — `claude-code-guide` agent, under 5 min.

After these, the manual run will be testing curriculum quality rather than testing fixable setup bugs.
