# Exercise: Build your system

**Time:** 28 minutes. Five phases.

Chat level in. Out: a working system on a task that matters to the team, rules written for that team's voice, in a folder that lives on after the cohort. The shape: build it boring, then build it yours.

Open Cowork with two working folders: your own participant folder and the `shared/` folder. You will save your own files in your participant folder. The task itself lives in the `shared` working folder as `m1-task.md`, prepared by your organisers before the workshop.

**The task** is the one your organisers picked before the cohort. A one-page IT-team response to a common Claude question internal users ask. Defaults: *is it safe to paste customer email content into Claude?* / *what's the difference between Claude and ChatGPT for our work?* / *which connectors should I enable?*

## Phase 1. The boring baseline (5 minutes)

Pose the task to Claude with no rules, no context, no setup. Plain Cowork session, plain prompt. The output will be plausibly fine and quietly generic. That gap is the point of Phase 1.

Ask Claude to read the shared task, draft the response, and save it in your personal folder.

**Prompt** *(Cowork)*

```
Read `m1-task.md` from the `shared` working folder. Draft a one-page IT-team response we can send to an internal user.

Save the draft as `response.md` in my participant working folder. If you cannot see both my participant working folder and the `shared` working folder, stop and ask me to add them.
```

Read what Claude wrote. Note three things. What's generic. What's off. What's plain wrong about how your team actually works.

## Phase 2. Write your CLAUDE.md (7 minutes)

CLAUDE.md is a plain markdown file that carries the rules for your participant folder. In this workshop, each prompt explicitly reads it. When you later open that folder directly, it becomes the folder rules file. You and Claude write it together in chat. You don't open the file yourself.

Ask Claude to propose 3 to 5 rules in chat first, push back on whatever's too generic, then have Claude save the final list.

**Prompt** *(Cowork)*

```
Read `response.md` from my participant working folder. Propose 3 to 5 rules for a folder CLAUDE.md that would catch the most generic and the most off claims you made. Show me the rules in chat first, one sentence each. Don't save yet.

After I push back, save the final list as `CLAUDE.md` in my participant working folder. Open the file with this line as rule 1, exactly:
"You are working in a OneDrive-synced folder. Assume eventual consistency on cross-folder reads."
```

Push back in chat. *"That rule is too generic. Give me one specific to my team's tone."* *"Strike rule 3, it would fire on every output."* Claude rewrites. When the list reads as yours, ask Claude to save. A rule that catches everything catches nothing.

## Phase 3. Re-run on the same task (4 minutes)

Same question. New rules. Watch the diff.

Ask Claude to redraft from scratch using the rules you just wrote.

**Prompt** *(Cowork)*

```
Re-read `response.md` and `CLAUDE.md` from my participant working folder. Now redraft `response.md` from scratch in that same folder, applying the rules in CLAUDE.md to the same user question. Before you save, show me in 3 lines what you're changing and why.
```

Claude's three-line diff summary at the top of this phase tells you what changed. The new version saved over the old one in `response.md`. Trust the summary and move on.

## Phase 4. Catch the thing you knew was wrong (7 minutes)

Phase 1 produced at least one claim you knew was wrong. A tool your team doesn't use, a policy your org doesn't have, a vendor-pitch tone where your team writes plain. Add a rule that catches that specific shape.

Ask Claude to add a guardrail for the specific wrong claim. Type the wrong claim after the colon.

**Prompt** *(Cowork)*

```
Add ONE rule to `CLAUDE.md` in my participant working folder that would have caught a specific wrong claim from the Phase 1 response.md. The rule should fire on similar future claims, not on everything. After adding the rule, re-read `response.md` in the same folder, regenerate it, and tell me whether the new version still contains the wrong shape. The wrong claim from Phase 1:
```

Read what changed. The rule's job is one specific shape of wrongness. Specific is the point.

## Phase 5. Iterate until it's yours (5 minutes)

Last pass. The bar isn't *"does Claude think this is good."* That bar is too low. Use a concrete one: name three things in the output that are unmistakably yours, not generic. A tool name your team actually uses. A phrase the team writes by default. A tone choice that isn't LLM-default.

Ask Claude to iterate response.md and then name three specifics.

**Prompt** *(Cowork)*

```
Final pass. Re-read `response.md` and `CLAUDE.md` from my participant working folder. Iterate the response until three specific things in it are unmistakably about MY team and not generic. After you regenerate, name those three things in chat. I will confirm or push back on each one.
```

Confirm or push back on each of the three. If Claude can't name three things that are specifically yours, your CLAUDE.md doesn't yet hold enough of your team's voice. Add one more rule and run Phase 5 again.

When three specifics survive push-back, the response is yours. Save it. The folder carries the system forward.

<!-- maintainer -->

**Meta:**
- **Length:** 28 minutes. 5 + 7 + 4 + 7 + 5 = 28 phase budget

**Quality:** draft 2026-04-29
- compendium-audited 2026-04-28 (check_writing v2026-04-27, check_student_facing v2026-04-28 incl. rule #3 + § 2(b) never-abbreviate-modules, check_prompts v2026-04-27)
- sim-passed 2026-04-27 — STALE since rule-#3 sweep touched body prose at exercise opener and Phase 5 close; re-sim recommended before next cohort
- mechanical-tested 2026-04-28 (`curriculum/evals/mechanical/instances/claude-basics-m1-verbatim-judge-report.md` @ 18affa1) PASS 13/13 — STALE after the 2026-04-29 prompt/path redesign
- draft 2026-04-29 (remote-resilient architecture edit: Phase 1 task now comes from the `shared` working folder; prompt-chain tests not rerun)

**Strategy reference:** `bosser-strategy:content-strategy-claude-basics.md` § *Stop chatting — build a system*

**Eval instance:** `curriculum/evals/instances/claude-basics--build-your-system.md`
