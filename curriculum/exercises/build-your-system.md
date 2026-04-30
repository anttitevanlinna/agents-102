# Exercise: Build your system

**Time:** 28 minutes. Five phases.

Chat level in. Out: a working system on a task that matters to your work, rules written in your voice, in a folder that lives on after the homework. The shape: build it boring, then build it yours.

Open Cowork on a folder you can safely use. Documents is fine. OneDrive is fine. A work folder is fine if the task and files are safe to use there. Everything in this exercise saves in that folder.

**The task** is one small thing you could actually use. Good defaults: a one-page response to a common Claude question internal users ask; a short explanation of the difference between Claude and ChatGPT for your work; a short guide to which connectors your team should enable.

## Phase 1. The boring baseline (5 minutes)

Pose the task to Claude with no rules, no context, no setup. Plain Cowork session, plain prompt. The output will be plausibly fine and quietly generic. That gap is the point of Phase 1.

Tell Claude the task, ask for a draft, and save it in this folder.

**Prompt** *(Cowork)*

```
Draft a one-page IT-team response we can send to an internal user.

The task is: I need a useful answer to a common Claude question internal users ask. Pick one of these if I have not already given you a better task:
- is it safe to paste customer email content into Claude?
- what's the difference between Claude and ChatGPT for our work?
- which connectors should I enable?

Save the draft as `response.md` in this folder.
```

Read what Claude wrote. Note three things. What's generic. What's off. What's plain wrong about how your team actually works.

## Phase 2. Write your CLAUDE.md (7 minutes)

CLAUDE.md is a plain markdown file that carries the rules for this folder. You and Claude write it together in chat. You don't open the file yourself.

Ask Claude to propose 3 to 5 rules in chat first, push back on whatever's too generic, then have Claude save the final list.

**Prompt** *(Cowork)*

```
Read `response.md` from this folder. Propose 3 to 5 rules for a folder CLAUDE.md that would catch the most generic and the most off claims you made. Show me the rules in chat first, one sentence each. Don't save yet.

After I push back, save the final list as `CLAUDE.md` in this folder. If this folder is synced through OneDrive, SharePoint, Google Drive, Dropbox, or another sync service, open the file with a first rule that names that runtime and says to assume eventual consistency on file reads.
```

Push back in chat. *"That rule is too generic. Give me one specific to my team's tone."* *"Strike rule 3, it would fire on every output."* Claude rewrites. When the list reads as yours, ask Claude to save. A rule that catches everything catches nothing.

## Phase 3. Re-run on the same task (4 minutes)

Same question. New rules. Watch the diff.

Ask Claude to redraft from scratch using the rules you just wrote.

**Prompt** *(Cowork)*

```
Re-read `response.md` and `CLAUDE.md` from this folder. Now redraft `response.md` from scratch in this same folder, applying the rules in CLAUDE.md to the same user question. Before you save, show me in 3 lines what you're changing and why.
```

Claude's three-line diff summary at the top of this phase tells you what changed. The new version saved over the old one in `response.md`. Trust the summary and move on.

## Phase 4. Catch the thing you knew was wrong (7 minutes)

Phase 1 produced at least one claim you knew was wrong. A tool your team doesn't use, a policy your org doesn't have, a salesy tone where your team writes plain. Add a rule that catches that specific shape.

Ask Claude to add a guardrail for the specific wrong claim. Type the wrong claim after the colon.

**Prompt** *(Cowork)*

```
Add ONE rule to `CLAUDE.md` in this folder that would have caught a specific wrong claim from the Phase 1 response.md. The rule should fire on similar future claims, not on everything. After adding the rule, re-read `response.md` in the same folder, regenerate it, and tell me whether the new version still contains the wrong shape. The wrong claim from Phase 1:
```

Read what changed. The rule's job is one specific shape of wrongness. Specific is the point.

## Phase 5. Iterate until it's yours (5 minutes)

Last pass. The bar isn't *"does Claude think this is good."* That bar is too low. Use a concrete one: name three things in the output that are unmistakably yours, not generic. A tool name your team actually uses. A phrase the team writes by default. A tone choice that isn't LLM-default.

Ask Claude to iterate response.md and then name three specifics.

**Prompt** *(Cowork)*

```
Final pass. Re-read `response.md` and `CLAUDE.md` from this folder. Iterate the response until three specific things in it are unmistakably about MY team and not generic. After you regenerate, name those three things in chat. I will confirm or push back on each one.
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
- draft 2026-04-30 (self-study architecture edit: exercise now runs in any safe personal folder; prompt-chain tests not rerun)

**Strategy reference:** `bosser-strategy:content-strategy-claude-basics.md` § *Stop chatting — build a system*

**Eval instance:** `curriculum/evals/instances/claude-basics--build-your-system.md`
