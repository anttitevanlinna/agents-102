# Exercise: Keep the rules, set *tonight's* run

**Time:** 15 minutes.

**What you do:**

Keep what today taught as rules your agents follow, yours and the team's. Then set tonight's run so the digest you open on Day 3 looks both ways at the chosen bet.

## Phase 1: Sharpen your own rules

*6 min*

Each of you, on your own laptop. Ask Claude to review today and update your `./CLAUDE.md`, the rules file in your training folder, with when and how to check a summary before anyone relies on it.

{{prompt:a101-m5-debrief-groundedness-rules}}

It reads the benchmark files from `module-5/` and your judge. Push back where a rule is too vague to act on: "check important claims" tells a future agent nothing; "run the groundedness judge on any customer quote before it goes on the tree" does. When it is right, ask Claude to copy the Groundedness checks section to `team/<your-name>/rules.md`.

## Phase 2: Keep the team's rules

*5 min*

The team lead drives at the shared screen. Ask Claude to propose changes to the team's rules from what came back more than once today.

{{prompt:apt101-d2-team-rules}}

Each of you has a say on the proposal before it saves. Push back on a rule written from a single miss. One wrong line in one digest is worth a note, not yet a rule. And push back on a file that is all don'ts.

## Phase 3: Set tonight's run

*4 min*

Each of you, on your own laptop. Tonight's digest should read the chosen bet and look as hard for what argues against it as for what supports it. Ask Claude to change your agent's brief for tonight.

{{prompt:apt101-d2-tonights-question}}

Then ask Claude to run it once now, so you see it read the chosen bet before you leave.

{{prompt:personal-agent-homework-3}}

If the test run comes back agreeing with everything, read the brief again for the sentence that asks only for evidence for the bet.

## Take stock

Your own rules now say when a summary gets checked. The team's rules carry an example of good beside the don'ts. And tonight's brief asks the question the first digest never did: what argues against the bet.

<!-- maintainer -->

**Quality:** compendium-audited 2026-10-08 (writing@9d3527f2 story@6a268245 technical@d747a00d behavior@6a268245 pedagogy@d49f18bf strategy@2a492ac7 slides@ccbff4e7)
- judges @6a268245: writing PASS, story PASS, technical PASS, behavior PASS, pedagogy PASS, strategy PASS, slides PASS

**Role in Day 2:** beat 11, last exercise. Compounds the day into personal and team rules, and turns the overnight digest from Day 1's agreeable reader into tomorrow's check on the chosen bet. Placed after the lecture *Write it down or lose it* (corrections become rules on recurrence; examples of good beside the don'ts).

**Reuse:** keys `a101-m5-debrief-groundedness-rules` (Agents 101 M5 debrief) and `personal-agent-homework-3`, unchanged. New: `apt101-d2-team-rules`, `apt101-d2-tonights-question`.

**Frameworks:** Deming's tampering, change-on-recurrence (in the lecture before); positive examples over prohibitions (lecture).

**Artefacts:**
- Consumes: `./CLAUDE.md` (Day 1 close, `a101-m2-debrief-claude-md`); `module-5/` and `judges/groundedness-judge.md` (catch it making things up; benchmark run on the team lead's laptop and copied into every folder at its phase 4); `team/team-rules.md` (Day 1 close); today's `team/` files; `team/chosen-bet.md`; `team/premortem.md`; `module-2/morning-agent/morning.md` (Day 1, send it off).
- Produces: `./CLAUDE.md` Groundedness checks section (each person) and its copy in `team/<name>/rules.md`; `team/team-rules.md` sharpened (team lead drives); `module-2/morning-agent/morning.md` updated, naming team files by the team folder's full path; a test `module-2/morning-agent/latest.html`. Tonight's run is what Day 3 beat 1 reads.

**Room:** phases 1 and 3 solo; phase 2 team lead drives, each person approves before save.

**Failure modes:** phase 1, rules too vague to act on or edits beyond the Groundedness checks section (push back to a named check and claim shape; ask Claude which sections changed); phase 2, rules from one miss (push back, recurrence); phase 3, the brief edit leaves "find evidence for" in place (the test run shows it; read the brief again) and a laptop that will sleep tonight (Day 1 owes the scheduled-task setup; a run that did not fire is rerun from the person's own brief).

**Leap test:** on Monday each person (1) has a Groundedness checks section in `./CLAUDE.md` whose rules each name a check and the claim shape it covers; (2) can point to one team rule that came from two misses and the example of good beside the don'ts; (3) opens `module-2/morning-agent/morning.md` and finds the line that asks for evidence against the bet.

**View summary:** You keep today's lessons as rules your agents follow, your own and the team's, and change tonight's run so the Day 3 digest checks the chosen bet instead of agreeing with it.
