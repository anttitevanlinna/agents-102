# M5 defect sweep — 2026-08-12

Scope: student-facing body only (above `<!-- maintainer -->`) in the five named M5 files, checked against the 11-item defect catalogue surfaced from today's M4 read. Report only — no edits made.

Total hits: **learn-from-the-test.md 3 · learning-through-contrast.md 0 (clean) · diagnose-and-resend.md 7 · what-packaging-is.md 1 · the-gate-is-a-claim.md 0 (clean)**

---

## curriculum/exercises/diagnose-and-resend.md (7 hits — worst file)

1. **`diagnose-and-resend.md:71`** — *"Ask Claude to build the verifier shape that matches your dominant failure, scoped to the task we ran un-packaged. Drop the shape name after the colon, one of: background-agent, shell-hook, Ralph re-feed."*
   Catalogue #11 (32 words, ≫12) + #8b (duplication — recites "scoped to the task we ran un-packaged" verbatim from the prompt body and re-lists all three shape names the prompt already branches on).
   Fix: *"Ask Claude to build the verifier for your dominant failure."* (10 words) — the shape-name mechanic already lives in the prompt's own `If shell-hook:/If background-agent:/If Ralph re-feed:` branches.

2. **`diagnose-and-resend.md:65`** — *"The comfortable shape is rarely the right one."*
   Catalogue #2 (unfounded diagnosis) — asserts a frequency about which verifier shape students will wrongly reach for, with nothing behind it; same shape as the flagged M4 line *"too big is the common miss."*
   Fix: cut. *"Match the shape to your dominant failure, not your familiarity"* (already the next sentence) carries the whole instruction alone.

3. **`diagnose-and-resend.md:36`** — *"Confirm the path is right. Then ask Claude to read the repo state on the previous-run branch and the transcript, and walk the work through three failure-mode lenses with quoted moments."*
   Catalogue #11 (31 words in the instruction clause) + #8b (recites the prompt's own structure: repo-state read, transcript read, three lenses, quoted moments — all spelled out again in prompt-2's body).
   Fix: *"Confirm the path, then ask Claude to walk the run through the three lenses."* (14 words; still over-target but strips the recited structure — tighter still: *"Confirm the path, then ask Claude for the three-lens read."*)

4. **`diagnose-and-resend.md:5-7`** — `**Session** *(new, "Module 5 worktree session")*` followed by *"Open a new Claude Code session in the worktree at `../<repo>-m5` (set up at module open)."*
   Catalogue #8a (duplication) — near-exact match to today's catalogued M4 hit: widget already signals "new" session; the prose repeats "Open a new Claude Code session" before adding the one new fact (the path).
   Fix: cut the redundant verb clause, keep only the new information — *"In the worktree at `../<repo>-m5` (set up at module open)."*

5. **`diagnose-and-resend.md:54`** — *"Ask Claude to walk each diagnosed failure backwards into the validation that would have caught it."*
   Catalogue #11 (16 words) + #8b (recites prompt-3's own "walk it backwards... validation... would have caught it" near-verbatim).
   Fix: *"Ask Claude to map each failure to the validation that would have caught it."* (13 words — trim to *"Ask Claude to map each failure to its catching validation."* for 10).

6. **`diagnose-and-resend.md:59`** — *"Claude gives the full three-way mapping. Your decision is narrower: which failure cost most, and why the other two pieces belong."*
   Catalogue #10 (recap slide after a prompt) — first sentence previews/restates prompt-3's output before the student has read it.
   Fix: cut the first sentence; open directly on *"Your decision is narrower: which failure cost most..."*

7. **`diagnose-and-resend.md:108`** — *"The personal rules from M1 (and M3 if completed) carry forward via the worktree fork; M6 will cut one stale rule once the contrast lands."*
   Catalogue #10 (forward-pointer describing the next module's content, at the close of an exercise rather than in a canonical `## Next`/`## Bridge` section).
   Fix: cut the M6 clause — *"The personal rules from M1 (and M3 if completed) carry forward via the worktree fork."* The module file's own `## Next` already owns the M6 preview.

---

## curriculum/trainings/agentic-engineering-101/learn-from-the-test.md (3 hits)

1. **`learn-from-the-test.md:78-80`** — `**Session** *(new, "M5 long-run")*` followed by *"Open a new Claude Code session in the worktree at `../<repo>-m5`. The packaging files live on disk..."*
   Catalogue #8a (duplication) — same shape as the diagnose-and-resend.md hit above; widget already carries "new," prose repeats the open-a-session verb before the genuinely new content (the path, the rules-loading fact).
   Fix: *"In the worktree at `../<repo>-m5`, the packaging files live on disk; the worktree's auto-loaded rules (`CLAUDE.md`, `CLAUDE.local.md`) load fresh into the new session."*

2. **`learn-from-the-test.md:96`** — *"Ask Claude to re-run the same task using the reference, plan.md, and verifier you just built."*
   Catalogue #11 (16 words) + #8b (recites the prompt's own "using the packaging in this worktree: reference, plan.md, and verifier" almost word for word).
   Fix: *"Ask Claude to re-run the task with the packaging you built."* (11 words).

3. **`learn-from-the-test.md:71-72`** — *"No benchmark told you what went wrong; the artefact did. The artefact rules, self-reports don't."*
   Catalogue #3 (compressed aphorism, minor) — "rules" is used as a verb ("wins/settles it") right after a Key Concepts bullet using "rules" nowhere else; ambiguous on a cold parse (governing rules vs. "wins out").
   Fix: *"No benchmark told you what went wrong; the artefact did. The artefact settled it — self-reports didn't."*

---

## curriculum/lectures/what-packaging-is.md (1 hit)

1. **`what-packaging-is.md:235`** — *"Ask Claude to propose five hooks tied to this repo, beyond formatting and linting."*
   Catalogue #11 (14 words, minor overage) + #8b (recites the prompt's own opening line, *"Propose five hooks for this repo and the work we just did, beyond formatting and linting,"* almost verbatim).
   Fix: *"Ask Claude to propose five hooks for this repo."* (9 words) — the "beyond formatting and linting" scoping is already the prompt's own second line.

---

## curriculum/lectures/learning-through-contrast.md — clean

No hits against the 11-item catalogue. Read in full above the fence; all instructional lines name actor + mechanism, no unfounded diagnoses, no orphan slides, no over-long lead-ins (file carries no prompts).

## curriculum/lectures/the-gate-is-a-claim.md — clean

No hits. No prompts in this file (pure lecture), so #11 doesn't apply; scanned all five law slides + the delegation-frontier slide for #1-#10 and found none.
