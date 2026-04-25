# AE101 multi-week context-decay audit — findings

## TL;DR

AE101 is built on the explicit theory that "if you can't reconstruct the prior module from `git log` + the repo's current `CLAUDE.md`, the module didn't land" (strategy doc § Delivery architecture). The pedagogy is right; the modules don't honor it. **None of M2–M6 opens with a state-restoration beat, an artifact-locator move, or a "last week you built X" recap script for the trainer.** Connections questions assume warm context (M2 asks "when was the last time Claude wrote a plan you approved without really reading?" — fine for Tuesday after Monday, cold for week-two of a six-week format). Cross-module artifact references are precise on the page (paths, filenames) but the student arrives without a way to *verify* those artifacts still exist on their laptop. Cold-open readiness is roughly: M1 PASS (it's prework-fresh by design), M2–M6 GAP-to-MISSING across the board. Headline fix: a canonical "session-open re-anchor" beat — three lines of student-side state-check + one trainer-side recap script — replicated into every M2+ opener. Cheap. Ships in a day.

## Module-by-module table

| Module | Re-anchor (last-session reminder) | State-check prompt (verify tools/files intact) | Lost-thread recovery (60s back-to-context) | Connections mood matches cold-open | Cross-module artifact refs (locatable cold) | Trainer-side recap script |
|---|---|---|---|---|---|---|
| **M1** Getting going | PASS — prework is the anchor; arrives fresh | PASS — prework Step 5 ends with "confirm the repo is ready for Module 1" | PASS — there's nothing prior to recover | PASS — Connections asks for a Claude Code trick they brought, neutral | N/A — no prior module | GAP — maintainer block has mood + push-backs but no "open the room with this" recap script |
| **M2** Plan mode | MISSING — no reminder of the M1 loop, no mention `CLAUDE.local.md` exists | MISSING — no check that `/add-dir` content folder is still pinned, no check that `CLAUDE.local.md` exists, no check curated skills installed cleanly | MISSING — no pointer to scrollback (`~/.claude/projects/`) or M1 Debrief artifact | GAP — Connections assumes the student remembers their last "approved-without-reading" moment; week-old memory is thin | GAP — bridge from M1 mentions `CLAUDE.local.md` "sits at the top of the next session, waiting to be read" but doesn't tell student how to verify it loaded | MISSING — maintainer block opens with Bloom level + runtime, never tells trainer "spend 3 min reminding the room of M1's loop" |
| **M3** Earn the trust | MISSING — no reference back to M2's plan-mode pattern or `CLAUDE.local.md` | GAP — Materials section says skills "ship in content folder" and "prework installs them" — but M3 is week 3, and prework was 2+ weeks ago. No re-verify step. | MISSING — student walks in cold; no instruction to ask Claude to summarise M2 session | GAP — Connections is "bring a small feature you're working on right now" — neutral mood-wise, but assumes student remembers M1+M2 calibration ("you've watched Claude work for two modules. Pick the size that fits the rhythm you've seen") which a cold student hasn't internalised | PARTIAL — references the two curated skills (`access-control-analysis`, `stride`) by name without a "verify they're installed" step. Body assumes invocation by name works | MISSING |
| **M4** First experiment | GAP — Connections opener does say "you've watched Claude work for three modules on short loops: a bug fix, a plan read, a feature ship with Q+S" — closest thing to a recap any module has — but it's framing prose, not a state-check | MISSING — biggest gap of any module: M4 *depends on* the M3-authored `test-strategy` skill, the M2 plan-mode pattern in `CLAUDE.local.md`, the connector wired in M1, the content folder via `/add-dir`. Zero verification step. | MISSING | PARTIAL — opener does the work of priming "today is the long one"; week-cold student can read the framing prose and orient. Best of M2-M6 by accident. | PARTIAL — body references "`CLAUDE.md` + `CLAUDE.local.md` + memory + ADRs + M3-authored skill + connectors" without telling student how to confirm each is still in place. The audit prompt presumably surfaces missing pieces, but only after the student starts | MISSING — maintainer mentions Phase 1 task-pick, never tells trainer how to lead a "where we left off" beat |
| **M5** Learn from the test | GAP — Connections says "You sent off an un-packaged run at the close of M4 and read the pre-read. You walk in with the artefact in front of you" — assumes the artefact is found, accessible, and remembered. In a 6-week format, this is fragile | GAP — Bridge from M4 *does* tell student "Claude Code stores every session transcript under `~/.claude/projects/` in a folder matching this repo, so the new session can find and read your M4 session directly" — best cross-module continuity prose in the training. But it's a Bridge (read at M4 close), not a state-check (run at M5 open). | PARTIAL — the M4 Bridge text plus M5 Push-back move "Connections blocker" (*"the artefact is whatever's there. Repo commits since M4. Files modified. Scrollback at `~/.claude/projects/<project>/`..."*) gives the trainer something to fall back on. But it's in the maintainer block, not a student-visible session-open prompt | GAP — opener mood assumes the artefact is right there. Add 7 days, a long weekend, a laptop crash, the M4 send-off may be lost. The opener doesn't acknowledge the possibility | GAP — references "`CLAUDE.md` (team), `CLAUDE.local.md` (personal, mine), the memory files, the ADRs, the verifier I just built, the reference and plan I just assembled" inside the Debrief prompt. By Debrief time student is back in the saddle; by Phase 1 they may not be | PARTIAL — push-back moves cover the artefact-not-accessible case, but the trainer has to find them in the block. No surfaced "first 3 minutes" script |
| **M6** Spot gaps | GAP — Connections says "You walk in holding two runs of the same task" — same artefact-assumption pattern as M5, doubled. Two runs to lose, not one | GAP — same pattern as M5 (push-back move "Connections blocker" exists for missing artefacts) but no state-check up front | PARTIAL — same as M5: maintainer block has it; student-visible content doesn't | GAP — "two runs ago" + "one run ago" is more memory load than M5; same opener pattern doesn't scale | GAP — ditto M5, doubled. The arc-retrospective exercise compounds it — "root rules file, memory, ADRs if you have them, both authored skills, the two run artefacts" — without a verify step | MISSING |

## Severity-ordered findings

### Severity 1 (BLOCKING — first 5 minutes of session is broken)

#### S1-1. M2 has zero state-restoration; cold student burns Connections + Lecture troubleshooting
**File:** `curriculum/trainings/agentic-engineering-101/plan-mode-done-right.md`, `## Connections` and prework-line in `## Meta`.
**Gap:** M2 prework is a single line ("about 10 min. Surface one multi-file backlog task in conversation with Claude"). It does not check: (a) `/add-dir ~/Documents/ae101-content` is pinned in `.claude/settings.local.json` (M1 Ex3 supposedly did this — but did the student actually run that step? was it saved? has the path moved?), (b) `CLAUDE.local.md` exists at the repo root (M1 supposedly created it; in a week-old setup, student may have rebased, switched repos, or `gitignore` may have hidden it from sight), (c) the curated skills installed in prework are still under `~/.claude/skills/` (any `.claude` reset, machine swap, or accidental `rm -rf` and they're gone), (d) the repo is the same one M1 used.
**What breaks for the cold student:** they paste the M2 prework prompt to surface a multi-file task; Claude can't read the `the-wizard-move.md` framing because content folder isn't loaded; or worse, Claude proceeds without the framing and the Connections lecture lands on someone with no `CLAUDE.local.md` to write into. Trainer spends first 10 min troubleshooting individual laptops while the room watches.
**Fix spec:** add a `## Session open` block before `## Connections` containing one student-side prompt that reads:
- run `/context` and tell me whether `~/Documents/ae101-content/` is in additionalDirectories
- check `~/.claude/skills/` for `access-control-analysis` and `stride`
- check repo root for `CLAUDE.local.md`
- if any of those is missing, walk the student through the fix (re-run `/add-dir`, re-run prework Step 5, re-create `CLAUDE.local.md` from M1's compound prompt)
- summarise the M1 loop ("orient → fix tests-first → compound to `CLAUDE.local.md` → close ticket via connector") in one sentence so the student re-anchors.

#### S1-2. M3 assumes installed skills work; no verify step before the first invocation
**File:** `curriculum/trainings/agentic-engineering-101/earn-the-trust.md`, `## Meta` Materials line + `## Exercises` first link.
**Gap:** Materials section says "Prework installs them as personal skills at `~/.claude/skills/<name>/SKILL.md`". By M3 the prework is 2+ weeks in the past. The first exercise (`map-the-access-surface.md`) presumably invokes `access-control-analysis` by name. If the skill isn't there, Claude returns a generic access-control read instead of the curated one — and the student may not notice (the output looks plausible). Silent failure mode that violates `check_pedagogy.md` #19.
**What breaks:** student spends Ex1 reading a generic LLM output, names "access-control mapping" as the M3 move based on an output that's missing the curated skill's specific surfaces, then carries that flawed mental model into Ex2 + Ex3. Walk-away test fails silently.
**Fix spec:** add a `## Session open` block with a state-check prompt that asks Claude to (a) confirm `~/.claude/skills/access-control-analysis/SKILL.md` and `~/.claude/skills/stride/SKILL.md` both exist and are non-empty, (b) report the first line of each SKILL.md back to the student so the student knows the right files are in place, (c) re-run prework Step 5's install copy if missing.

#### S1-3. M4 stacks five cross-module dependencies into one exercise with no verify step
**File:** `curriculum/trainings/agentic-engineering-101/run-the-first-experiment.md`, `## What You'll Learn` second bullet + `## Exercises`.
**Gap:** the walk-and-fill exercise depends on `CLAUDE.md` + `CLAUDE.local.md` + memory + ADRs + M3-authored skill + connectors all being loaded and intact. That's five artifacts spanning three previous modules. The exercise's gap-analysis subagent will surface "these things are missing" — but by then the student is already inside Phase 2, and the Phase 2 mood ("audit busywork — Claude returns 15 items; student drowns") will be amplified by genuine missing-artifact noise. Trainer cannot tell whether a missing item is a real codebase gap (the pedagogy) or a state-decay artifact (the bug).
**What breaks:** the failure mode this exercise is designed to surface (boring failure vs. interesting failure, Phase 2 push-back move "gap deferred as architectural, not contextual") gets contaminated by state-decay false positives. M5's diagnosis can't separate "the agent failed because the system was thin" from "the agent failed because `CLAUDE.local.md` was empty for unrelated reasons."
**Fix spec:** add a `## Session open` block listing every artifact M4 expects to find on disk (`CLAUDE.local.md` at repo root, `.claude/memory/` directory present even if empty, `~/.claude/skills/test-strategy/SKILL.md` from M3, content folder still pinned, ticket-tracker connector still authenticated). One prompt: "Claude, walk this list and tell me what's present, what's missing, and what would block the audit. Don't fix anything yet; just report." Trainer covers fixes in the first 5 min.

### Severity 2 (cohort works but starts slow)

#### S2-1. M2 Connections question is week-stale by design
**File:** `plan-mode-done-right.md`, `## Connections`.
**Gap:** "when was the last time Claude wrote a plan you approved without really reading?" is a great Tuesday-after-Monday question. After 7 days of normal work, the student's most-recent plan-approval moment may be from M1 prework or from non-training work. Mood-warming hits weaker than designed.
**Fix spec:** soften with "since you wrote your `CLAUDE.local.md` last week" anchor — pulls memory back to the M1 loop and re-anchors the rules-file artifact in the same beat. Keeps the question's shape; adds a temporal cue that primes the cold room.

#### S2-2. M5 + M6 assume the prior run's artefact is "right there"
**Files:** `learn-from-the-test.md` (`## Connections`), `spot-gaps-build-the-loop.md` (`## Connections`).
**Gap:** opener prose says "you walk in with the artefact in front of you" / "you walk in holding two runs of the same task." In a 6-week format, the M4 send-off ran a week ago, the M5 packaged re-run ran a week before that. The artefact lives somewhere — `~/.claude/projects/<repo-hash>/`, recent commits, a branch the student forgot they made. Push-back moves in the maintainer block cover this case but it's the trainer's job to find the right move under pressure.
**Fix spec:** promote the maintainer-block "Connections blocker" push-back into a student-visible `## Find your artefact` block at the top of M5 and M6. Three bullets: (1) check `git log --since="2 weeks ago"` for the send-off commit, (2) check `~/.claude/projects/<repo>/` for the M4 / M5 session JSONL, (3) if both gone, ask Claude to read recent diffs and reconstruct what shipped. Two-minute beat; un-blocks the diagnosis exercise.

#### S2-3. No trainer-side recap script anywhere
**Files:** all six maintainer blocks.
**Gap:** every maintainer block has Mood target, Push-back moves, Watch-fors, Decision points. None has a "Recap script — read aloud at session open" beat. Trainer is a non-Antti named person who can't improvise the recap from cold (per the audit brief). Currently they read the Bridge from the prior module out loud, or ad-lib.
**Fix spec:** add a `**Recap script (3-5 min, read at session open)**` beat to every M2+ maintainer block. Three lines max: (1) what the room built last session in one sentence (artifact + move), (2) the bridge from the prior module's mood to today's, (3) the state-check the room runs in the first 60 seconds (mirrors the student-side `## Session open` prompt from S1). Same content, two surfaces — student runs the verify; trainer narrates the why.

#### S2-4. M5 Bridge text (the best continuity prose in the training) lives only at the M4 close, not at M5 open
**File:** `run-the-first-experiment.md`, `## Bridge`.
**Quote:** "Claude Code stores every session transcript under `~/.claude/projects/` in a folder matching this repo, so the new session can find and read your M4 session directly."
**Gap:** this is the right sentence. It's at the wrong end of the gap. Student reads it at M4 close (mood: send-off anxiety, walking out of the session). They will not remember it 7 days later when M5 opens. The sentence belongs *both* at M4 close (current) AND at M5 open (missing).
**Fix spec:** mirror the sentence at the top of M5's `## Session open` block: "Last week you sent off an un-packaged run. Claude Code stored the session at `~/.claude/projects/<repo>/`. Open a fresh Claude Code session in the repo and ask Claude to find and read it before we start." This is the cheapest single fix — copy a sentence, change tense.

#### S2-5. M3 references "the small feature you're working on right now" without acknowledging the feature may have shipped or scope-changed in the past week
**File:** `earn-the-trust.md`, `## Connections`.
**Gap:** a feature small enough to ship in a few hours is, by definition, prone to shipping in a few days when the cohort spans weeks. Student arrives at M3 expecting to bring "the feature I was nervous about a teammate missing" and that feature is now live with no controversy left.
**Fix spec:** soften with "or, if it shipped already, the next one in the same shape." Acknowledges the time gap without restructuring the exercise.

### Severity 3 (defer)

#### S3-1. M1 Connections question (the trick they figured out) is timeless and works on any cohort calendar
No fix needed; recording for completeness.

#### S3-2. M6's arc-retrospective exercise reads cold-friendly because it explicitly walks the artefact tree
The Phase 1 prompt of `arc-retrospective.md` (not read here, inferred from the maintainer block) presumably tells Claude to read the rules file, memory, ADRs, both skills, both runs. That walk *is* a state-restoration move by side effect. Worth confirming in the exercise file, but the module's opening doesn't depend on it.

#### S3-3. The strategy doc says "If you can't reconstruct the prior module from `git log` + the repo's current `CLAUDE.md`, the module didn't land"
This is the right design intent. The audit's findings are a forcing-function gap: the modules don't operationalise it. Adding the `## Session open` blocks per S1-1 / S1-2 / S1-3 *is* the operationalisation. Defer the strategy doc edit until the modules carry the move.

## Cross-cutting patterns

1. **No module file has a `## Session open` (or equivalent) heading.** The shape goes Big Idea → Meta → What You'll Learn → Connections → Lectures → Exercises. Connections does the social warming; nothing does the technical re-anchoring. The two are different jobs and the curriculum collapses them into one heading the student/trainer reads.

2. **State-check is buried in maintainer push-back moves, not surfaced as a student step.** M5 + M6 maintainer blocks both have the right content ("scrollback at `~/.claude/projects/<project>/`...") but it fires *only when the trainer notices the student is stuck*. By that time, 5–10 min is gone. The check belongs at session open as a one-prompt run, not as a recovery move.

3. **Cross-module artifact references are precise on the page, untestable by the student.** The body says "`CLAUDE.local.md` + `.claude/memory/` + the M3-authored skill" — accurate paths, real filenames. There is no prompt that asks Claude to verify each. Reference precision without verification is decoration; cold student can't act on it.

4. **Connections questions assume warm context that 7 days erases.** "When was the last time you approved a plan without reading?" / "What's the feature you're nervous about?" are warm-room questions. They work in a 2-day format (next morning). They're week-stale in the 6-week format the strategy doc names as canonical. The strategy doc *knows* about both formats; the modules are written for one of them.

5. **The M4 → M5 Bridge is the only place that names cold-open mechanics, and it's at the wrong end of the gap.** The "open `~/.claude/projects/`" sentence is the model the rest of the training should follow. Currently it's a one-off.

6. **Trainer-side recap is universally absent.** Every maintainer block has Mood, Push-backs, Watch-fors, Decision points. None has Recap script. The trainer is named explicitly as a non-Antti delegate in `curriculum/CLAUDE.md` § Classroom delivery, and per `check_pedagogy.md` #27 the maintainer block "is a script, not a footnote." The recap is the missing first 3 minutes of that script.

## Recommended additions

### A. Canonical "session-open" beat shape (every M2+ module)

Insert a `## Session open` heading between `## Connections` (which becomes the second beat) and `## Meta`, OR after `## Connections` if the human warming should land first. Recommend *before* Connections for cold-open weeks; warming a stranger to last-week's work doesn't land until they know last-week's work is still on disk.

```
## Session open

Three things to verify before we start. ~3 minutes.

1. Run `/context` in your Claude Code session and confirm the content
   folder (`~/Documents/ae101-content/`) is in additionalDirectories.
   If not, run `/add-dir ~/Documents/ae101-content`.

2. Confirm the artifacts from prior modules are where you left them:
   <module-specific list — see per-module spec>

3. Re-anchor in one sentence: ask Claude to summarise <prior-module
   artifact> in two lines so you walk in remembering the move, not
   the marketing.

If anything's missing, see <link to recovery>. Don't start the exercise
until the verify is clean.
```

Per-module fill for item 2:
- **M2**: `CLAUDE.local.md` at repo root + curated skills (`access-control-analysis`, `stride`) at `~/.claude/skills/`
- **M3**: same as M2
- **M4**: M2/M3 list + `~/.claude/skills/test-strategy/SKILL.md` (M3 authored) + `.claude/memory/` directory + ticket-tracker connector authenticated
- **M5**: M4 list + the M4 send-off artefact (locate via `git log --since` or `~/.claude/projects/<repo>/`)
- **M6**: M5 list + the M5 packaged re-run artefact

Per-module fill for item 3:
- **M2**: ask Claude to read `CLAUDE.local.md` and summarise the rules in two lines
- **M3**: ask Claude to summarise the M2 plan-mode pattern from `CLAUDE.local.md`
- **M4**: ask Claude to read `CLAUDE.local.md` + the M3 test-strategy skill and tell you in two lines what your system currently knows
- **M5**: ask Claude to find and read the M4 session transcript and summarise what the un-packaged run did (the move the M4 → M5 Bridge already names — promote here verbatim)
- **M6**: ask Claude to find both run transcripts and summarise the contrast in two lines

### B. Canonical "state-check" prompt spec

One prompt the student pastes at the top of every M2+ session. Same shape, module-specific list. Spec:

- **One prompt, not five.** Reduces ceremony; the student copies once, Claude walks the list.
- **Reports state, doesn't fix.** Avoids accidental fixes that paper over a real "your machine has changed" event the trainer needs to know about.
- **Names the recovery prompt for each missing item by reference**, so a student who finds something missing has a deterministic next move (no improvising "how do I re-create `CLAUDE.local.md`?").
- **Ends with a one-sentence "what we built up to last session" recap** — not a marketing summary, a state summary ("you have a `CLAUDE.local.md` with N rules; your three-block memory holds X observations; your test-strategy skill enforces Y").

Reference shape for M4 (most artifact-dense):

```
Walk this list and report what's present, missing, or different than expected.
Don't fix anything; report.

1. /add-dir — is `~/Documents/ae101-content/` in additionalDirectories?
2. Repo root — is there a `CLAUDE.local.md`? How many rules?
3. ~/.claude/skills/ — are `access-control-analysis`, `stride`,
   `test-strategy` all present with non-empty SKILL.md?
4. .claude/memory/ — does this directory exist? What's in it?
5. ADRs — are there decision records under docs/adr/ or the
   sponsor-stated home?
6. Connectors — is the ticket-tracker MCP authenticated?

Then, in 2 lines: what does my agent system currently know about
this codebase? Read from the files, not from your training data.
```

### C. Canonical maintainer-block "recap script" template

Add as a new beat to every M2+ maintainer block, before Push-back moves:

```
**Recap script (3-5 min, read at session open):**

1. **Where we left off.** "Last [session/week], you [one-sentence summary
   of the artifact + move]. The thing on your laptop that proves it is
   [filename + path]."

2. **Why we're picking it up here.** "Today's move builds on [specific
   element of the prior artifact]. The bridge is [one sentence — uses the
   prior module's Bridge text verbatim if possible]."

3. **State-check, in the room.** "Before we start: everyone open Claude
   Code in your repo, paste the prompt under `## Session open`. Hands up
   when you've got a clean report. We start when the room's clean."

4. **Mood reset.** "[One sentence on today's mood from the maintainer
   block — what the room is supposed to feel by 5 min in.]"
```

Per-module fill for item 1 (cribbed from prior module's Bridge / authored artifact):
- **M2**: "Last week you ran the orient → fix → compound → close loop on a trivial bug. The artifact is `CLAUDE.local.md` at your repo root, gitignored, with rules born from how you actually worked."
- **M3**: "Last week you read a multi-file plan, pushed back twice, ran a second-pass walk-down, and approved a sharpened plan without executing. The artifact is one named pattern in `CLAUDE.local.md`."
- **M4**: "Last week you earned the first two signatures. The artifact is `~/.claude/skills/test-strategy/SKILL.md`, authored from your codebase's conventions, plus an ADR for one STRIDE-named hardening decision."
- **M5**: "Last week you sent a multi-hour task off un-packaged. The artifact is whatever ran overnight — commits, files modified, the session transcript at `~/.claude/projects/<repo>/`."
- **M6**: "Last week you diagnosed the un-packaged run, built a verifier, assembled a reference + plan.md, and re-sent the same task packaged. The artifact is the second send-off plus your verifier."

---

**Single highest-leverage fix:** ship the `## Session open` beat (Recommendation A) on M2, M4, and M5 first. Those three are where the state-decay risk is highest (M2 is the first cold open in the format, M4 has the densest artifact stack, M5 is the diagnose-from-old-artefact module). M3 and M6 inherit the pattern. The fix is one heading + one prompt block + one trainer recap script per module — half a day's work, ships before the first cohort.
