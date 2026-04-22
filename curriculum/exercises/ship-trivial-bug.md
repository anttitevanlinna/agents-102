# Ship a trivial bug

**What you do:** run one trivial bug from your repo through Plan → Work → Review end-to-end in Claude Code, with plan mode used deliberately. Log the trade-off as a decision-journal entry where your team's durable knowledge lives — the home your sponsor named (or one you can argue is better). Name the shape of what you just did — after you've done it.

**What happens:** a real PR ships in about an hour. You read the diff carefully, push back on a line Claude wrote that isn't quite right, write one decision record, and recognize the four-step loop after you ran it.

**The point:** the substrate every module after this one rides on is the loop. M1 lands it on a 60-minute bug so M2 can run it on memory scope, M3 on multi-hour work, M5 on a room full of agents. Teach the loop abstractly and engineers nod. Run the loop head-on and the shape lives in muscle memory.

**Time:** 55–70 minutes.

## Phase 1 — Confirm the bug (5 min)

You picked a bug in prework — Claude surfaced three candidates, you chose one. Confirm it's still the right one. If something shifted (a teammate filed a PR, the bug got worse, a better candidate surfaced), pick again in conversation with Claude now. Don't let a stale prework choice drive the exercise.

Don't pick a good bug. Pick a trivial one. The point isn't the bug.

## Phase 2 — Plan (10 min)

Shift+Tab into plan mode, then paste:

**Prompt** *(copy → Claude Code)*

```
Fix the bug we just confirmed. Work in plan mode. Read the files you need to understand the change. Before you propose an edit, show me the plan — files you'll touch, the shape of the change in each, what you'll check before declaring it done. I'll push back before you approve anything.
```

*(end of prompt)*

Claude returns a plan. Read it for what it's *not* showing you — the file it doesn't touch but maybe should, the step that assumes without checking, the dependency it hasn't surveyed. If the plan looks tight, the easiest missed thing is usually the blast radius: what else in the repo depends on what you're about to change?

If you honestly find nothing after reading carefully, ask Claude to explain the riskiest step. The goal isn't to perform skepticism; it's to read plans closely. Approve when you've seen what the plan missed — or when you're satisfied it didn't miss anything.

Plan mode on a trivial bug feels like overkill. Run it anyway. The habit is what we're training, not the efficiency.

## Phase 3 — Work (25 min)

Claude ships the edit. If the repo has tests on this path, they run. If not, log *"no verifier on this path"* in the scrollback and keep moving — M3 and M4 pick that thread up. Watch Claude work; this is the part the plan buys you.

If it stalls or drifts (picks up unrelated refactors, starts "improving" files you didn't ask about), stop it, point at the plan, have it resume from the last clean step. This is what plan mode buys you on a trivial bug: a plan to return to.

## Phase 4 — Review (10 min)

Read the diff. Not skim. Read it. Find one line you would have written differently — not wrong, just different.

**Prompt** *(copy → Claude Code)*

```
I want to push back on one line in your diff. Let's talk it through, then write a decision-journal entry where this company keeps durable engineering knowledge. My sponsor's default for this cohort is [SPONSOR-STATED HOME — e.g., docs/adr/NNNN-slug.md, team Notion + linkback file, repo wiki]. If I know a better home for this team's knowledge, I'll say so and we'll go there with a one-line reason. Not picking a home is not on the table.
```

*(end of prompt)*

Talk it through. Whoever has the better argument wins. Claude writes the entry either way. Now the team has one decision record — seeded where this company's decisions actually belong. Ship the PR (merge or draft). The PR is the visible artifact; the decision record is the one that compounds.

**Sponsor-stated default?** The buyer took a position before the training began — *"in this company, engineering knowledge lives here."* That's the first path. **Reasoned override?** You know your repo better than anyone picking top-down; a reasoned move to a better home is a legitimate second path (and feeds back to the sponsor as a signal). **"None of these"** isn't a path — the compounding loop needs somewhere durable to read next time.

## Phase 5 — Why it worked (5 min)

**Prompt** *(copy → Claude Code)*

```
Look back at what we just did. Don't summarize. Name the shape. If someone asked "what's the pattern for shipping the next bug like this?", how would you describe it in 3–5 beats?
```

*(end of prompt)*

Claude names the shape in its own words. Read it before reading the next paragraph.

That's **compound engineering** — Kieran Klaassen at Every Inc. wrote it up, same shape. The ADR move is the decision-journal block from **Paweł Huryn's three-block memory**. Both links in the content folder's `lectures/` if you want to read them after the Debrief.

On to the Compound step — the Debrief writes your repo's `CLAUDE.md` from the session's evidence.

<!-- maintainer -->

**Meta (trainer):**
- **Primary Bloom's level:** Apply + Analyze
- **Exercise time band:** 55–70 min inside a 1h45 module (Connections 10 / Lecture 10 / Exercise 55–70 / Debrief 15 / Bridge 5). Buffer to 70 on first cohort delivery — engineers overshoot P3 on real code.
- **Artifact locations — governed by the pre-engagement contract** (see content-strategy-agentic-engineering-101.md § "Pre-engagement contract" and § "Delivery architecture"):
  - Decision-journal entry → **sponsor-stated home** (ADR convention, team wiki + linkback, Notion + pointer file, etc.); `docs/adr/NNNN-slug.md` is a reasonable default if the sponsor punted.
  - Rules file (written at Debrief) → **sponsor-stated home** for agent-rules; root `CLAUDE.md` / `.claude/CLAUDE.md` / `AGENTS.md` are the common shapes.
  - Three-block memory (M2+) → **sponsor-stated memory home**; `.claude/memory/` is the common shape.
  - **Student override is legitimate, not rebellion.** If the student proposes a better home with a reason, Claude goes there and the override feeds back to the sponsor.
  - **Opting out is not a path.** The exercise doesn't complete without a durable home for the decision record.
  - No `module-1/` folder, no `prework/bug.md`, no training-dir state.
- **Frameworks riffed on:**
  - **Compound engineering** — Kieran Klaassen (Every Inc.). Plan → Work → Review → Compound. Convergence Level 3. Source: `continuous-research/platform-watch/coding-agents/runs/2026-04-21-klaasen-compounding-engineering.md`. URL: `every.to/source-code/compound-engineering-the-definitive-guide` `[practitioner direct]`.
  - **Three-block memory** — Paweł Huryn (productcompass.pm). Knowledge Architecture / Decision Journal / Quality Gate. Level 2 single-experiment. Source: `continuous-research/insights.md` lines 1051–1065. URL: `productcompass.pm/p/claude-md-snippets` `[practitioner direct]`.
- **Attribution at P5** is one line each — not a lecture. Let Claude name the shape first; the practitioners get credit, the student gets recognition.

**Watch-fors:**
- **P2 rubber-stamp.** Student accepts first plan without push-back. Diagnostic: "quote one step you'd remove." If they can't, they haven't read the plan. Push-back move.
- **P3 drift.** Agent picks up unrelated refactors. Common on real codebases. Diagnostic: diff touches files not in plan. Fix: stop, point at plan, resume from last clean step.
- **P4 skim-not-read.** Student says "looks fine" in under 30 seconds. Diagnostic: they can't quote a single line. Push-back: *"find me one line you'd have written differently — not wrong, just different."*
- **P5 over-teach temptation.** Facilitator wants to explain Klaassen and Huryn. Don't. Let Claude name the shape. Attribution is one line each.

**Decision points:**
- **P3 runs over 35 min:** the bug wasn't trivial. Let it complete, compress P4 to 5 min. Note for M2 — this student benefits more from memory than average.
- **Student finishes P1–P5 in under 35 min:** they picked something too small. Offer the "run it again on a second bug" extension, or pair them with a neighbor whose P3 stalled.
- **Student's repo has no tests and no sensible path to write one:** P3 ends without test verification. Log "no verifier" as the first entry in the quality-gate block seeded at Debrief — that's Block 3. Real finding, not a failure of the exercise.
- **Student wants to switch repos mid-exercise:** rare but supported. Note the bug-picking and plan work as replay-input for the new repo; finish M1 on the new substrate.

**Plug points:**
- Student's own repo (chosen in prework)
- Student's own bug (surfaced by Claude in prework, confirmed at P1)
- Agentic Nerd push-back moves at P2 / P4

**Agentic Nerd logic (TODO — skill not yet created; the Nerd reads this file + `lectures/the-wizard-move.md` from the content folder):**
- **P1:** if a student has drifted from prework choice, run a fresh bug-surfacing conversation. Criteria unchanged.
- **P2:** if student approves first plan, invoke plan-mode approval inflation guard (*"quote one step you'd remove"*).
- **P4:** if diff review under 30 seconds, invoke diff-skim push-back (*"one line you'd have written differently"*).
- **P5:** stay silent. Student's recognition of the loop IS the teaching moment. Don't steal it.

**Arc:**
- Picks up from: Connections ("the trick you brought") + the-wizard-move lecture (framing that the loop is the shared trick the room gets on top of each student's own).
- Hands off to: M1 Debrief (Compound step) — ADR entry + P5 shape-naming feed the Debrief prompt that writes the repo's `CLAUDE.md`.
- M2 picks up: the rules-file-from-retro pattern, scaled across repos + business context.
