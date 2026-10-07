# Exercise: Keep the rules, set *tonight's* run

**Time:** 15 minutes.

**What you do:**

Keep what today taught as rules your agents follow, yours and the team's. Then set tonight's run so the digest you open on Day 3 looks both ways at the chosen bet.

## Phase 1: Sharpen your own rules

*6 min*

Each of you, on your own laptop. Ask Claude to review today and update your `./CLAUDE.md`, the rules file in your training folder, with when and how to check a summary before anyone relies on it.

{{prompt:a101-m5-debrief-groundedness-rules}}

It reads the benchmark files from `module-5/` and your judge. Push back where a rule is too vague to act on: "check important claims" tells a future agent nothing; "run the groundedness judge on any customer quote before it goes on the tree" does. When it is right, copy the Groundedness checks section to `team/<your-name>/rules.md`.

## Phase 2: Keep the team's rules

*5 min*

The team lead drives at the shared screen. Ask Claude to propose changes to the team's rules from what came back more than once today.

**Prompt** · `apt101-d2-team-rules`, reads `team/team-rules.md`, the three `team/<name>/rules.md` files, `team/doubts.md`, `team/tree.md`, each `team/<name>/judge-run.md` and `team/premortem.md`; proposes rule changes only for mistakes that showed up in at least two places, each with where it showed up; adds at least one example of good the agents should copy (a line that kept two sources' disagreement visible, a quote with its interview and minute); shows the proposed `team/team-rules.md` before saving

Each of you has a say on the proposal before it saves. Push back on a rule written from a single miss. One wrong line in one digest is worth a note, not yet a rule. And push back on a file that is all don'ts.

## Phase 3: Set tonight's run

*4 min*

Each of you, on your own laptop. Tonight's digest should read the chosen bet and look as hard for what argues against it as for what supports it. Ask Claude to change your agent's brief for tonight.

**Prompt** · `apt101-d2-tonights-question`, edits `module-2/morning-agent/morning.md` so tonight's run reads `chosen-bet.md` and `premortem.md` by the team folder's full path, the one the trainer posted (a scheduled run starts fresh and cannot resolve a bare `team/`), reports evidence for and against the bet with how many customers said each, watches for the early warning signs from the pre-mortem, and runs `judges/groundedness-judge.md` on its own digest before writing it; shows me the diff before saving

Then ask Claude to run it once now, so you see it read the chosen bet before you leave.

{{prompt:personal-agent-homework-3}}

If the test run comes back agreeing with everything, read the brief again for the sentence that asks only for evidence for the bet.

## Take stock

Your own rules now say when a summary gets checked. The team's rules carry an example of good beside the don'ts. And tonight's brief asks the question the first digest never did: what argues against the bet.

<!-- maintainer -->

**Role in Day 2:** beat 11, last exercise. Compounds the day into personal and team rules, and turns the overnight digest from Day 1's agreeable reader into tomorrow's check on the chosen bet. Placed after the lecture *Write it down or lose it* (corrections become rules on recurrence; examples of good beside the don'ts).

**Reuse:** keys `a101-m5-debrief-groundedness-rules` (Agents 101 M5 debrief) and `personal-agent-homework-3`, unchanged. New: `apt101-d2-team-rules`, `apt101-d2-tonights-question`.

**Frameworks:** Deming's tampering, change-on-recurrence (in the lecture before); positive examples over prohibitions (lecture).

**Artefacts:**
- Consumes: `./CLAUDE.md` (Day 1 close, `a101-m2-debrief-claude-md`); `module-5/` and `judges/groundedness-judge.md` (catch it making things up; benchmark run on the team lead's laptop and copied into every folder at its phase 4); `team/team-rules.md` (Day 1 close); today's `team/` files; `team/chosen-bet.md`; `team/premortem.md`; `module-2/morning-agent/morning.md` (Day 1, send it off).
- Produces: `./CLAUDE.md` Groundedness checks section (each person) and its copy in `team/<name>/rules.md`; `team/team-rules.md` sharpened (team lead drives); `module-2/morning-agent/morning.md` updated, naming team files by the team folder's full path; a test `module-2/morning-agent/latest.html`. Tonight's run is what Day 3 beat 1 reads.

**Room:** phases 1 and 3 solo; phase 2 team lead drives, each person approves before save.

**Failure modes:** rules from one miss (push back, recurrence); the brief edit leaves "find evidence for" in place (the test run shows it; read the brief again); a laptop that will sleep tonight (Day 1 owes the scheduled-task setup; the trainer's fallback digest covers a run that did not fire).

**View summary:** You keep today's lessons as rules your agents follow, your own and the team's, and change tonight's run so the Day 3 digest checks the chosen bet instead of agreeing with it.
