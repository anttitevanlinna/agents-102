# Exercise: Build your system

**Time:** 28 minutes. Five phases.

Chat level in. Out: a working system on a task that matters to the team, rules written for that team's voice, in a folder that lives on after the cohort. The shape: build it boring, then build it yours.

Open Cowork on your personal SharePoint folder. Everything saves here.

**The task** is the one your IT Director picked before the cohort. A one-page IT-team response to a common Claude question internal users ask. Defaults: *is it safe to paste customer email content into Claude?* / *what's the difference between Claude and ChatGPT for our work?* / *which connectors should I enable?* The IT Director will name the chosen one in the room.

## Phase 1. The boring baseline (5 minutes)

Pose the task to Claude with no rules, no context, no setup. Plain Cowork session, plain prompt. The output will be plausibly fine and quietly generic. That gap is the point of Phase 1.

Ask Claude to draft the response and save it. Type the question your IT Director picked after the colon.

**Prompt** *(Claude Code)*

```
Draft a one-page IT-team response we can send to an internal user. Save it as response.md in this folder. The user's question:
```

Read what Claude wrote. Note three things. What's generic. What's off. What's plain wrong about how your team actually works.

## Phase 2. Write your CLAUDE.md (7 minutes)

CLAUDE.md is a plain markdown file Claude reads at the start of every session in this folder. The contract between you and the agent. You and Claude write it together in chat. You don't open the file yourself.

Ask Claude to propose 3 to 5 rules in chat first, push back on whatever's too generic, then have Claude save the final list.

**Prompt** *(Claude Code)*

```
Read response.md. Propose 3 to 5 rules for a folder CLAUDE.md that would catch the most generic and the most off claims you made. Show me the rules in chat first, one sentence each. Don't save yet.

After I push back, save the final list to CLAUDE.md in this folder. Open the file with this line as rule 1, exactly:
"You are working in a OneDrive-synced folder. Assume eventual consistency on cross-folder reads."
```

Push back in chat. *"That rule is too generic. Give me one specific to my team's tone."* *"Strike rule 3, it would fire on every output."* Claude rewrites. When the list reads as yours, ask Claude to save. A rule that catches everything catches nothing.

## Phase 3. Re-run on the same task (4 minutes)

Same question. New rules. Watch the diff.

Ask Claude to redraft from scratch using the rules you just wrote.

**Prompt** *(Claude Code)*

```
Re-read response.md and CLAUDE.md. Now redraft response.md from scratch, applying the rules in CLAUDE.md to the same user question. Before you save, show me in 3 lines what you're changing and why.
```

Claude's three-line diff summary at the top of this phase tells you what changed. The new version saved over the old one in `response.md`. Trust the summary and move on.

## Phase 4. Catch the thing you knew was wrong (7 minutes)

Phase 1 produced at least one claim you knew was wrong. A tool your team doesn't use, a policy your org doesn't have, a vendor-pitch tone where your team writes plain. Add a rule that catches that specific shape.

Ask Claude to add a guardrail for the specific wrong claim. Type the wrong claim after the colon.

**Prompt** *(Claude Code)*

```
Add ONE rule to CLAUDE.md that would have caught a specific wrong claim from the Phase 1 response.md. The rule should fire on similar future claims, not on everything. After adding the rule, re-read response.md, regenerate it, and tell me whether the new version still contains the wrong shape. The wrong claim from Phase 1:
```

Read what changed. The rule's job is one specific shape of wrongness. Specific is the point.

## Phase 5. Iterate until it's yours (5 minutes)

Last pass. The bar isn't *"does Claude think this is good."* That bar is too low. Use a concrete one: name three things in the output that are unmistakably yours, not generic. A tool name your team actually uses. A phrase the team writes by default. A tone choice that isn't LLM-default.

Ask Claude to iterate response.md and then name three specifics.

**Prompt** *(Claude Code)*

```
Final pass. Re-read response.md and CLAUDE.md. Iterate the response until three specific things in it are unmistakably about MY team and not generic. After you regenerate, name those three things in chat. I will confirm or push back on each one.
```

Confirm or push back on each of the three. If Claude can't name three things that are specifically yours, your CLAUDE.md doesn't yet hold enough of your team's voice. Add one more rule and run Phase 5 again.

When three specifics survive push-back, the response is yours. Save it. The folder carries the system forward.

<!-- maintainer -->

**Meta (trainer):**
- **Length:** 28 minutes. 5 + 7 + 4 + 7 + 5 = 28 phase budget
- **Phase boundaries are conversation-pause beats.** Phase 2 ends with the participant reading their own rule list back and striking any rule that's too generic — the strike is the pause. Phase 4 ends with the participant reading the diff between pre-rule and post-rule output. Both pauses are individual, not room-share. Trainer may organically prompt banter (*"anyone strike a rule? what was it?"*) when room energy invites it; the curriculum doesn't mandate the share
- **Default task fallback.** If the IT Director hasn't picked the task two days before the cohort, the trainer's default is *"draft a one-page IT-team response to: is it safe to paste customer email content into Claude?"* — produces predictably catchable claims about Anthropic data handling that will diverge from the customer's specific licensing tier
- **Pre-cohort dry-run.** The trainer runs Phase 1 against the chosen task once before the cohort, on a fresh Cowork session with no folder context, and confirms the output produces at least three catchable items the team will recognise. If Phase 1 reads as *"fine"* even on a fresh session, the task is too generic — push the IT Director to a more team-specific question
- **What watches the room:** participants who pasted the question and got a response that *"looks fine"* and can't name three generic things. Diagnostic = task too abstract OR participant taking it surface. Trainer prompt: *"What would your team write differently? Even one tone word."*
- **What stalls past minute 5 of any phase:** the participant is editing CLAUDE.md by hand instead of asking Claude to edit it. Redirect: ask Claude to make the edit; you read the proposal and push back

**Quality:** compendium-audited 2026-04-28 (post rule-#3 + post never-abbreviate-modules sweeps)
- compendium-audited 2026-04-28 (check_writing v2026-04-27, check_student_facing v2026-04-28 incl. rule #3 + § 2(b) never-abbreviate-modules, check_prompts v2026-04-27)
- sim-passed 2026-04-27 — STALE since rule-#3 sweep touched body prose at exercise opener and Phase 5 close; re-sim recommended before next cohort
- mechanical-tested 2026-04-28 (`curriculum/evals/mechanical/instances/claude-basics-m1-verbatim-judge-report.md` @ 18affa1) PASS 13/13 — VALID for prompt-chain mechanics; rule-#3 sweep edited prose only, no prompt-block changes

**Plug points (trainer):**
- The Phase 1 task confirmed with the IT Director two days pre-cohort
- The OneDrive runtime line in Phase 2 (pre-shipped, not authored)
- The wrong claim in Phase 4 is the participant's own. Don't seed it; let them name it from Phase 1's output

**Strategy reference:** `bosser-strategy:content-strategy-claude-basics.md` § *Stop chatting — build a system*

**Eval instance:** `curriculum/evals/instances/claude-basics--build-your-system.md`
