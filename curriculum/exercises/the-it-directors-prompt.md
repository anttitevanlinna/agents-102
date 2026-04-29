# Exercise: The IT Director's prompt

**Time:** 27 minutes. Five phases. Plus a 15-minute break after the module that runs the same verification on a different task.

In Module 1 you built a system on a task where you knew the answer. The truth was in your head; the catches landed. Now the task is different. The IT Director sits at a Cowork session in front of the room and does the work live. Two pages of output land on screen. Nobody in the room already knows the answer. Some claims check out. Some don't. Some won't be verifiable on the spot. The third bucket is where custodianship lives.

## Phase 1. The IT Director generates two pages, live (7 minutes)

The IT Director and the trainer aligned on the prompt shape one day before the cohort. The IT Director drives Cowork on screen: prompt, send, output streams, two pages land. The IT Director narrates as it runs. Save destination: `cohort-shared/verification.md`, readable from every participant's session.

The room's job in Phase 1 is to watch and pre-mark. Open your own Cowork session in parallel and use it as a scratch notepad: as the output streams on screen, type one short line per claim that smells off. Claude doesn't need to act on it; you're using your own input as a place to park suspicions. Phase 2's table will pick those up.

## Phase 2. Build your verification table (7 minutes)

Each participant runs this in their own Cowork session, against the shared output the IT Director just generated. The table you build is yours; the input is the room's.

Ask Claude to read the shared output, propose a 6-row verification table in chat, push back on the source column, then save the final table.

**Prompt** *(Claude Code)*

```
Read cohort-shared/verification.md (the file the IT Director just generated on screen). Extract the most consequential factual claims into a markdown table. Three columns:

| Claim | Where I'd check | Verdict |

Cap the table at 6 rows. If the file has more than 6 distinct claims, pick the 6 that would matter most if a real user acted on them. Leave the Verdict column empty. I'll fill it as I check.

For "Where I'd check" suggest the most direct source: which admin panel, which document, which person. If a claim has no obvious ground-truth source, write "no obvious source."

Show me the table in chat first. Don't save yet. I want to push back on the "Where I'd check" column where you named the wrong source. After I push back, save it as verification-table.md in my folder.
```

Read the table in chat. Push back on rows where Claude named the wrong panel or missed an obvious source. You know your tools better than the agent does. When the column reads as yours, ask Claude to save.

## Phase 3. Verify backward (7 minutes)

Now the work. The verification happens in the admin panel (SharePoint admin, Teams admin, Entra ID, whichever fits the task), but the bookkeeping stays with Claude. Ask Claude to read your table back row by row in chat. For each row, check the panel and report the verdict. Claude updates the file.

Three verdicts:

- **checked-true.** The panel confirms the claim
- **checked-wrong.** The panel says something else
- **I can't tell.** You can't verify this from the panel right now (no permission, no obvious place to look, the claim is about something the panel doesn't show)

Saying *"I can't tell"* to Claude carries more weight than ticking a box. That's the point. Say it anyway.

Ask Claude to walk the table with you, row by row, and update the file as you report verdicts.

**Prompt** *(Claude Code)*

```
Walk verification-table.md with me row by row. For each row: print the claim and the "Where I'd check" source, then wait. I'll check the panel and tell you the verdict — checked-true, checked-wrong, or I-can't-tell. Update the Verdict column in verification-table.md as I report each one. Don't move to the next row until I've answered for the current one.

Also: don't suggest fixes for I-can't-tell rows. Mark them and keep going.
```

Some rows clear in seconds. Some take a minute. Some are *"I can't tell"* and that's fine. The third bucket is the custodial one.

## Phase 4. Compare verdicts across the room (3 minutes)

Same input, twelve different verdict tables. Petra got *checked-true* on row 3 because Entra ID is part of her role; Marja got *I-can't-tell* because she doesn't have that access. Same claim, two honest answers, both right.

The trainer leads this beat. The variance across the room is the lesson. *"I can't tell"* isn't a personal failure of verification; it's a function of access and role. Each participant carries different verification authority for the same claim. The team's combined coverage is the actual verification capability.

No prompt this phase. Open question to the room from the trainer; two or three voices respond by design. That's enough to make the variance visible. The rest hear two specific access-difference examples and add them to their own table's understanding. The trainer does not synthesize the responses; the variance stands as it is.

## Phase 5. Harden the CLAUDE.md (3 minutes)

Pick one row Claude got wrong. Translate it into a verification rule the agent reads from CLAUDE.md before answering. The *"I can't tell"* rows stay where they are. Phase 3 marked them on purpose; the Debrief addresses them directly. This phase is for the rows that came back demonstrably wrong against the panel.

Ask Claude to add one verification rule based on the wrong row you pick. Type the row's claim and what would have caught it after the colon.

**Prompt** *(Claude Code)*

```
Add ONE rule to CLAUDE.md that would have caught a specific row from my verification-table.md. The rule should fire on similar future claims, not on every claim. Format the rule as: "Before claiming X, do Y."

If no row came back demonstrably wrong, pick the row I trust least, even if I can't fully say why. Soft-uncertainty is also a verification signal.

After adding the rule, re-read cohort-shared/verification.md and tell me whether the new version of the prompt would have produced the same wrong claim, or whether the rule would have intercepted it. The row I picked:
```

Read what Claude wrote. The rule is yours; edit it until the *"Before X, do Y"* shape names something specific you'd actually do.

Your Module 1 system just gained a verification rule. The rule lives in your folder past the cohort.

<!-- maintainer -->

**Meta (trainer):**
- **Length:** 27 minutes. 7 + 7 + 7 + 3 + 3 = 27 phase budget. Module budget 45 min: 3 Connections + 5 concept + 27 exercise + 7 lecture + 3 Debrief
- **Phase 1 — IT Director drives Cowork live.** The biggest delivery risk in the module. The IT Director is doing real work in front of the team for ~7 minutes. Pre-cohort rehearsal one day before is non-negotiable: trainer + IT Director run the chosen prompt together against a fresh Cowork session, confirm the output produces 6+ distinct factual claims with at least one un-verifiable-on-the-spot, and the IT Director runs through the narration once. Stage fright still possible on the day; trainer sits beside them and can co-narrate if needed
- **The shared output location.** The cohort SharePoint workspace needs a `cohort-shared/` folder with read access for all participants AND write access for the IT Director's session. Set up two days pre-cohort. Without it, Phase 2 can't read the file
- **Pre-cohort smoke-test the cohort-shared write/read race.** Trainer writes a test file from the IT Director's session, opens a participant's Cowork session, asks Claude to read it. About 30 seconds. Catches OneDrive sync lag and permission gaps before the cohort. Without this smoke-test, Phase 2's first read on cohort day is the smoke-test, and the failure mode is a paid cohort stalling at minute 8
- **The chosen task must be plausibly-un-clearable.** Dry-run criterion: pose the prompt to a fresh Claude session, ask whether every claim can be verified from admin panels someone in the room has access to. If yes, the task is too easy. Push the IT Director to a task where at least one claim sits outside any panel anyone in the room could check on the spot
- **Phase 3's three buckets are the teaching moment.** Trainer's silent-presence stance through Phase 3. If a participant flags *"I don't know how to check this row,"* the trainer says *"mark it 'I can't tell' and move on."* The participants discover the third bucket as they go
- **Phase 4 — variance is the lesson.** The trainer asks: *"Who got 'I can't tell' on row 3? Who got 'checked-true'? What did you have access to that they didn't?"* Two or three responses, no synthesizing. The variance shows that the team's combined coverage is the verification capability — no single person owns it
- **Phase 5 stall pattern.** A participant with no checked-wrong rows has either picked a too-easy task or skipped Phase 3 verification. Trainer pivot: *"name one row you can't fully trust, even if you couldn't say why exactly."*
- **The 15-minute break.** Trainer briefs the IT Director as Phase 5 closes: *"While the room takes the break, run the same verification on a different real admin task. Come back with one specific thing right, one specific thing wrong, one I-can't-tell."* The IT Director's verdict opens Module 3. If they come back with *"yeah it was mostly fine,"* Module 3's opening collapses

**Quality:** sim-passed 2026-04-28 (post Option-B redesign + 5 sim TODOs applied)
- compendium-audited 2026-04-28 (check_writing v2026-04-27, check_student_facing v2026-04-28 incl. hard-grep phrase list + rule #3 + § 2(b) never-abbreviate-modules, check_prompts v2026-04-27, check_pedagogy v2026-04-27 incl. rule 35 audience-tier)
- sim-passed 2026-04-28 (IT-admin-medium-light-chat persona post-Option-B sim returned APPROVE WITH TODOs; mood 9/8/9/9/7/8/8/9 across 8 beats; 5 contributory TODOs all applied: Phase 1 student artifact, Phase 4 design-not-compromise framing, Phase 5 fallback for no-wrong-row, lecture freshness-resistant phrasing, smoke-test in maintainer)
- mechanical-tested: STALE — Option B phase restructure: prompt count 4 → 3, Phase 4 trainer-led with no prompt, new architectural element (`cohort-shared/verification.md`); mechanical-test runner needs update before re-running
- eval-instance: STALE — needs leap-test refresh (4 outcomes incl. recognise-combined-coverage), per-phase mood signals re-mapping, prompt-design-judge updated to 3-prompt count; rewrite pending before LLM-judge can dispatch

**Plug points (trainer):**
- The IT Director's chosen task — real, dry-run two days pre-cohort, plausibly-un-clearable
- The shared output location — cohort-shared/verification.md, pre-staged
- The admin panel each participant opens — depends on task; trainer's pre-cohort note names the expected panels
- The verification rule each participant adds in Phase 5 — participant's own; not seeded

**Strategy reference:** `bosser-strategy:content-strategy-claude-basics.md` § *Can you be trusted to run this?*

**Eval instance:** `curriculum/evals/instances/claude-basics--the-it-directors-prompt.md`
