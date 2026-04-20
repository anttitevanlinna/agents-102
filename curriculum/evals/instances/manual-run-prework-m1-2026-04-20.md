# Manual Run — Prework + Module 1 — 2026-04-20

**Status as of 2026-04-20 session close: PREPARED, NOT YET EXECUTED.** Deferred pending Antti's choice of when to run. See `curriculum/evals/README.md` § "Current state of the acceptance layer — DEFERRED" for rationale.

Antti running self-study delivery mode for prework + M1 end-to-end. First manual run after the testing pyramid scaffold. Goal: validate the setup + surface what static checks didn't catch.

## Pre-run decisions

Before starting, confirm:

- [ ] **Fix or live-patch BREAK #1** (`prework/` relative-path bug). Either edit prework.md prompts now, or note as a known issue and live-patch when you hit it.
- [ ] **Decide on localhost:8000 setup** — will you start the server before prework, or edit prework to include the startup step? Recommend: start server manually, note it as BREAK #2 for post-run pickup.
- [ ] **Connector capability** — do you know the current Claude Code connector story for your tenant? If not, start with Task 2 Path B (screenshot fallback) as a known-working path.
- [ ] **Throwaway training dir** — use `~/Documents/agents-102-sim/` (or similar) not your real `agents-102-bootstrap/`. You may run it twice.

## Setup

1. **Teacher Claude** — fresh Claude Code at repo root (`/Users/anttitevanlinna/Projects/agents-102`). Invoke `/self-study` to start as first-time user.
2. **Workbench Claude** — second Claude Code. Teacher tells you when and where to open it (per SKILL.md, should be at `<training-dir>/prework/` for prework, `<training-dir>/module-1/` for M1).
3. **Transcripts auto-capture.** Record both session IDs:
   - Teacher session: `~/.claude/projects/-Users-anttitevanlinna-Projects-agents-102/<session-id>.jsonl`
   - Workbench prework: `~/.claude/projects/-Users-anttitevanlinna-Documents-<training-dir-slug>-prework/<session-id>.jsonl`
   - Workbench M1: `~/.claude/projects/-Users-anttitevanlinna-Documents-<training-dir-slug>-module-1/<session-id>.jsonl`
4. **Keep this file open.** Fill as you run.

## Persona

You're Antti running this as yourself — but pretend you're an SVP Marketing at a 400-person Nordic software company. Used ChatGPT weekly for copy drafts. Never built an agent, never used Claude Code before today. No deep technical background, no developer reflexes.

**When your developer reflex kicks in** (quickly running `python3 -m http.server` without thinking, opening VS Code, editing files directly instead of asking Claude), pause and note it — that's a moment the persona would have been stuck.

## Watch-fors (specific to prework + M1)

### Prework

- [ ] **Setup check** (prework lines 7-11): Does the "before you start" line up with what Teacher Claude actually set up? Any cliff you hit that the prework text doesn't mention?
- [ ] **Task 1 — snake.** Does the path resolve as expected, or does BREAK #1 bite? Where does `snake.html` actually land?
- [ ] **Open snake.html.** Double-click in Finder works? Does it open in Safari/Chrome without surprises?
- [ ] **Task 2 Path A or B.** If Path A: did the connector work, or did admin-consent block? If Path B: screenshot find-and-read moment — does Claude handle it cleanly?
- [ ] **Task 3 — What is an Agent section 1.** Click the link `curriculum.html?file=supplementary/what-is-an-agent` — does it open? Does the first section actually read as 2 pages? Does it feel priming or demanding?
- [ ] **Time reality** — total prework took __ minutes (claim: 45).
- [ ] **Mood at close** — do you arrive at M1 curious, annoyed, or depleted?

### Module 1

- [ ] **Sponsor-speaks opener** — self-study has no sponsor; how does Teacher Claude handle this? Skip? Surrogate framing? Flag the gap.
- [ ] **Connections question** — how does Teacher Claude pose the "when have you used ChatGPT for your own work where it felt generic?" question? Does the 1:1 framing work?
- [ ] **Lecture 1 — Context is King.** Teacher directs you to read on the site. Does the demo (two-Italy / Finland windows) land as written? Does "take a guess before the second window runs" produce a real reflective moment in self-study?
- [ ] **Exercise — Personal site with guardrails.** Six phases. Track mood at each:
  - Phase 1 baseline: does it feel usefully boring?
  - Phase 2 five-question ask: does Claude ask one at a time, or dump all five? (Known Claude-behavior pattern — flag if it dumps.)
  - Phase 3 strengths-as-voice: does Claude rewrite the site voice or just append a "How I help" section? (Known append-vs-integrate pattern — flag if it appends.)
  - Phase 4 comparison: does Claude find three specific generic claims, or three vague ones?
  - Phase 5 mirror: does Claude keep the edge per the prompt's instruction, or soften?
  - Phase 6 free iteration: how long? Do you actually reach "yes, this is me"?
  - Close (Claude as cold critic): does `/clear` + fresh-read produce a sharp contrast or a bland one?
- [ ] **Lecture 2 — What just happened.** Landing? Or does it feel like filler after the exercise?
- [ ] **Debrief** — three retro questions, Claude writes `module-1/CLAUDE.md`. Does Claude follow the prompt (one question at a time, write at end)? Does the resulting CLAUDE.md feel reusable?
- [ ] **Bridge** — single sentence: *"what if it could remember, grow, and compound?"* Does it land hunger for M2, or does M1 feel already-complete?

### Mood landing (M1 target: joyful creation, *"I made this"*)

- M1 felt like: __________ (compare to target)
- What stole the mood (if anything): __________
- The moment the mood peaked: __________

## Breakage log (during run)

Append as things happen. One line each.

- [timestamp] [module/phase] [what broke]

## Teacher Claude facilitation notes

Write down specific Teacher moves that worked, and moves that missed. Specifically:
- Any Teacher nudge that felt patronizing or over-explaining
- Any moment Teacher should have nudged but didn't
- Any moment Teacher dropped into curriculum-author voice instead of facilitator voice
- Did Teacher catch rubber-stamping / over-acceptance?

## After the run

### Immediate

1. **Save this sheet** with all notes filled in.
2. **Copy both session-ID paths** to the Post-Run Judge invocation below.
3. **Run the Post-Run Judge** (prompt below) in a fresh Claude Code session.

### Post-Run Judge invocation

Fresh Claude Code at repo root. Paste:

```
You are the Post-Run Judge for an Agents 102 Bootstrap manual run covering prework + Module 1 only (partial-arc run — mood expectations adjusted accordingly).

INPUTS:
- Teacher session transcript: [path]
- Workbench prework transcript: [path]
- Workbench M1 transcript: [path]
- Observation sheet (filled during run): curriculum/evals/instances/manual-run-prework-m1-2026-04-20.md
- Arc contract: curriculum/content-strategy.md (focus M1 section)
- Instructions: curriculum/evals/post-run-judge.md

Scope this to prework + M1 only. Jobs 1-4 as specified in post-run-judge.md, narrowed to:

JOB 1 — Mood landing for M1 (target: joyful creation). Score 1-10 with transcript quotes. Did prework leave the student primed or depleted?

JOB 2 — Gaps between observation sheet and transcripts. Where did I (Antti) self-report "fine" but the transcript shows friction? What did the transcript catch that I didn't mention?

JOB 3 — Curriculum change proposals, grouped by file.

JOB 4 — System upgrades: new Claude-behavior patterns? Missing pre-flight checks? New observation-sheet items?

Also special focus: did Teacher Claude (/self-study) facilitate well? Specific turns where it nudged well or missed.

Output formatted per post-run-judge.md § OUTPUT. Be specific; quote transcripts.
```

### Signal extraction

After the Judge runs, triage:
- **High-confidence findings with transcript evidence** → open as work items, fix before any real-student pilot.
- **Facilitator observations Antti caught but Judge didn't** → upgrade `manual-run-observation.md` with new watch-fors.
- **New Claude-behavior patterns** → add to SKILL.md § "Known Claude-behavior patterns."
- **New delivery friction incidents** → add entries to `delivery-incidents.md` + pre-flight-checklist.md.

## Success criteria for this run

- [ ] Run completes end-to-end (prework + M1) without a hard block
- [ ] At least 10 specific findings identified (mix of curriculum, facilitation, delivery)
- [ ] 0-2 new Claude-behavior patterns surfaced
- [ ] Mood at M1 close: ≥8/10 on joyful creation (if <8, that's the biggest finding)
- [ ] Teacher Claude facilitation rated: does it feel like a competent facilitator or like it's reading from a script?
