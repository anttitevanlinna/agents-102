# Exercise: *Audit* your agent

**What you do:**

Load the reusable security check you authored in the previous exercise, then run it against the system you built in modules 2-3. Two packaged-lens reports. One mitigation. One residual decision added to the report. The goal is not a clean bill of health. The goal is to run the loop (assess, mitigate, reassess residual) on the system you actually built.

Four phases. Thirty-five minutes. Bring the policy raw report from the previous exercise; that is the baseline. Bring the reusable check you just authored; that is the expert. Bring your Module 3 system; that is the target.

**Phase 1. Load the reusable check.**

The reusable check is authored, but it is not useful until your runtime loads it. Skills load at session start, not into the current session.

Cowork users should already have saved the personal skill at the end of Exercise 1. Desktop and CLI users take a small install step. Same lens content, different load surface. Everyone syncs at a fresh session in the same training directory.

<div class="rt-cli">

The CLI auto-loads standalone skills under `~/.claude/skills/<name>/SKILL.md`. So the CLI install is a one-step copy from the authored source into the personal skills directory. The source folder stays in `module-4/skills/security-audit/` as the canonical source of truth.

**Prompt** *(Claude Code)*

```
The reusable security check I authored lives at module-4/skills/security-audit/. Install it as a standalone CLI skill by copying:

- module-4/skills/security-audit/SKILL.md  ->  ~/.claude/skills/security-audit/SKILL.md
- any supporting reference files it requires  ->  ~/.claude/skills/security-audit/

The module-4 source folder stays where it is as the source of truth for the next time we revise the skill. Confirm the installed skill path back so I can verify with ls.
```

Run `ls ~/.claude/skills/security-audit/` to confirm the skill landed. Open a new session in your training directory.

</div>

<div class="rt-desktop">

Install the authored source as a personal skill by copying `module-4/skills/security-audit/SKILL.md` and any supporting reference files to `~/.claude/skills/security-audit/`. Open a new session in the same training directory.

</div>

<div class="rt-cowork">

The personal skill was created and saved at the end of Exercise 1. Open a new Cowork session connected to the same training folder. The skill is stored locally on your machine and tied to your Claude Desktop install. It loads automatically in any new Cowork session on the same laptop.

If the skill does not appear, go back to Exercise 1's Cowork personal-skill creation step. Do not create it mid-audit.

</div>

In the new session, type `/` in the prompt and look for `/security-audit` in the autocomplete list. That means the skill loaded. The two lenses live inside the same skill; the audit prompts below tell the skill which lens to apply.

Do not run a toy verification on one file. The first loaded use is the real audit.

**Phase 2. Policy audit.**

Ask Claude to apply the packaged policy lens to your full module-3 system and produce one report. This is not the same as the raw run. The raw report came straight from `module-4/policies/`; this report comes through the reusable lens you shaped.

**Prompt** *(Claude Code)*

```
Apply the policy lens of the reusable security check I authored to the agent system: the memory in memory/, the sources in sources/, the agent files in agents/, the root CLAUDE.md, and the multi-agent runs in module-3/stances/.

For each rule the reusable check carries, produce one row in a report: rule name, one-line description, verdict (compliant / violating / "I can't tell"), and one line of evidence from my actual files for that verdict. If you can't tell, say what evidence you'd need to decide.

Write the packaged-lens report to outputs/policy-report.md. If outputs/policy-report-raw.md exists, briefly note one way the packaged report is sharper, narrower, or more specific than the raw run. Be specific. Be plain. An "I can't tell" is a better answer than a confident guess.

Read the memory and agent files properly - don't skim. Quote the specific lines or files that support each verdict.

After writing the report, read outputs/policy-report.md back to yourself and tell me:
1. The top three surprises - rows where the verdict is not what a careful reader would have predicted.
2. The three rows where "I can't tell" is most likely hiding a real compliance gap.
3. One row that looks compliant on the surface but where you would still push back.

Keep each point to one or two sentences. Quote the specific rule name so I can find the row.
```

While the report runs, stay with it. The report is more useful when you read it cold. Expect the reusable check to find things you did not think about, and to leave things "I can't tell" you thought were settled.

Read Claude's three lists. Then open `outputs/policy-report.md` and find the rows Claude flagged. You are reading with a hypothesis, not row-by-row from scratch. Notice which of Claude's surprises match yours and which do not. That mismatch is data.

**Phase 3. Agent-risk audit.**

In the same session.

**Prompt** *(Claude Code)*

```
Apply the agent-security lens of the reusable security check to the same system. Run both checks: what the agent can reach, and the named risk patterns the lens carries.

For access control: list every outside system or sensitive place the agent can reach (connectors, retrievals, file writes beyond the training directory, anything in tools/). For each: is the access necessary for what the system actually does? Flag anything the system has access to but doesn't need.

For the named risk patterns (prompt injection direct and indirect, secrets-in-context-and-scrollback, tool-confusion, skill supply-chain): for each pattern, name the top one or two specific risks in my system, not generic definitions. Quote the file or behaviour that creates the risk.

For each risk flagged, suggest one mitigation for how the agent works - scope, split, filter, gate, or review - matched to the specific risk. These sit on top of the normal company controls already in place (network controls, identity and access management, logging, vendor/security review), not replacing them. Rank the risks by severity x likelihood, three-tier (high / medium / low).

Write the report to outputs/security-report.md. Include the ranked mitigation suggestions.
```

Read `outputs/security-report.md` alongside the policy report. Two different lenses; some risks will overlap, some will not. That is correct.

You now have the assessment half of the loop. The uncomfortable feeling is the evidence.

**Phase 4. Mitigate one risk. Reassess the residual.**

Look at the two reports. Pick one risk to mitigate. Not the easiest, not the scariest. The one that bugs you on the second skim. Your gut is data here. This is about running the loop once, not solving the worst problem on your list.

Tell Claude the risk in one sentence, then paste the prompt. You are steering by judgment, not by technical detail. Claude picks the mitigation shape, applies the change, and walks you through what landed and why.

**Prompt** *(Claude Code)*

```
Apply a mitigation to my system for the risk I'm about to name. Pick the shape from the five (scope, split, filter, gate, review), make the file or instruction changes, and walk me through what you did and why. If the shape doesn't fit, I'll tell you and we'll iterate.

Then re-run the check the reusable lens performed for this specific risk (re-apply the relevant lens, not the whole audit). Report the new verdict. Is the risk reduced, eliminated, or shifted somewhere else?

Then append a short section to outputs/security-report.md named "Mitigation applied and residual". Name what changed, what the new verdict is, and what's still true after the mitigation. Do not rewrite the earlier report. Not what we fixed. What's left. Be specific.

The risk:
```

Claude applies the mitigation and walks you through what changed. If the shape does not fit, tell Claude and iterate. Re-run the check. Read the residual section in `outputs/security-report.md`.

The risk did not go away. That is expected. A mitigation reduces, it does not eliminate. The residual section is part of the report. Name it, accept it on record, and stop there.

**Still not sure? Ask a person.**

Sometimes the correct next step is not another prompt. If the policy report still has a serious "I can't tell", or the security report names a risk you do not know how to accept, show the evidence to someone who owns that area: legal, security, IT, compliance, or the business owner. Bring the report, the files it quotes, the mitigation you applied, and the residual that remains.

Better safe than sorry is a professional answer. The useful move is not pretending the agent resolved the judgment call. The useful move is arriving with the work already done, so the expert can answer a narrower question.

**What happens:**

The Module 3 system has two packaged-lens reports against it now, plus the raw policy report that came before packaging. One policy lens. One agent-risk lens with four named patterns. One mitigation applied; one residual decision recorded in the security report. If judgment is still unclear, you know what to show a human expert. The loop ran once. The reusable check and the loop carry to the next agent.

**The point:**

Absolute certainty is not on offer. The discipline is. Raw policy files first, packaged lenses second, one mitigation, one named residual. The reusable check is the expert in the room. The report carries the evidence and the decisions. The unease that remains is what the loop is supposed to produce, not what it failed to remove.

**Time:** 35 minutes. Phase 1 ~3, Phase 2 ~12, Phase 3 ~10, Phase 4 ~10.

<!-- maintainer -->

**Quality:** draft 2026-04-29 (body touched after prior mechanical test; re-audit needed)
- compendium-audited 2026-04-25 (check_writing, check_student_facing, check_prompts rules 1–11, check_pedagogy, check_strategy_tie_in)
- sim-passed 2026-04-25 (cohort-facilitator persona, APPROVE — workhorse exercise; long agent waits ARE the designed conversation pauses)
- mechanical-tested 2026-04-26 (instances/bootstrap-m4-audit-judge-report.md @ 7644347 PASS 35/37 + 2 soft-pass)

**Cohort-facilitator audit (2026-04-25):** APPROVE without TODOs. The exercise is cohort-ready. One stylistic note for next pass: *"The uncomfortable feeling is the evidence."* (Phase 2 close) reads as a slogan when projected silently to 12 SVPs; consider moving to lecture closer or cutting on next polish.

**Mechanical-test findings 2026-04-26 (stale after 2026-04-29 reshape):** Previous run covered all four named-attack-classes with file-specific risks (no STRIDE-collapse), all five mitigation-shape names, the classical-controls floor, and the mitigate→re-check→residual chain. The exercise now includes the load step, depends on `outputs/policy-report-raw.md` from the prior exercise, and needs a fresh mechanical run against the new order.

**Pairs with:** [Run and package a security skill](author-security-skill.md) — Module 4's first exercise, produces the reusable check this exercise runs.

**Frameworks riffed on:**
- **Named attack classes** (prompt injection direct/indirect, secrets-in-context, tool-confusion, skill supply-chain) — external grounding the AGENT-SECURITY lens covers. Re-named in Phase 3 so the audit prompt cannot collapse them into generic STRIDE categories.
- **Principle of least privilege** — operationalised in Phase 3's access-control analysis and in the mitigation choice.
- **Residual risk** (ISO 31000 / NIST) — central artifact; the residual decision lives in `outputs/security-report.md` with the evidence that produced it. Layered on top of classical residual-risk discipline, not replacing it.
- **Assess → mitigate → reassess → decide** — classical risk loop, mapped to the four phases.
- **Roger Martin's *what would have to be true*** — surfaces in the policy lens's "I can't tell" column as "what evidence would I need to decide?"

**Philosophy callout (sparing):**
- Belief #21 — name what you don't know — lands in the "I can't tell" column and in the residual paragraph. Student writes both; the belief is earned, not announced.
- Belief #14 — practice beats external proof — the whole exercise enacts it. Named in the lecture, lived in the exercise.

**Plug points:**
- The student's chosen risk — participant-picked in Phase 4 from the two reports. Never prescribed.

**Watch-fors:**
- **Shame spiral.** Student reads a violation row and takes it personally. Coach: *"The variance across the room is the teaching. No one got a clean report. The variance is data, not judgment on you."*
- **"I can't tell" avoidance.** Student reclassifies an "I can't tell" as compliant or violating just to have a clear answer. Coach: *"'I can't tell' is the correct answer when evidence isn't there. Push Claude back — 'what evidence would you need to decide?' — and accept the plain state."*
- **Over-mitigation.** Student picks one risk, then can't stop at one. Coach: *"Run the full loop on one. We're practising the loop, not clearing the backlog. The rest is homework — not today's."*
- **Reusable check as oracle.** Student treats the report as ground truth. Seed doubt in debrief: *"Where would this check's report itself be wrong? What's missing?"* Skills are experts, not oracles.
- **Reusable check not picked up.** If Phase 1 fails (the skill doesn't invoke), don't debug in front of the room — switch to the facilitator's pre-run reports as a worked example and let students run the exercise on them. Pedagogy survives; capability check failure is the fix afterwards.
- **Report depth varies.** Some students' Module 3 systems are thin (short memory, light sources); their reports will be thin. That's a finding, not a fail — coach: *"A thin system has fewer risks AND less evidence. Both are true."*

**Why 35 minutes, not 30:**
- Two lenses running sequentially, each takes real time. Students need to *read* both reports, not skim. Phase 4's diff-and-apply is the heart of the loop and can't be compressed.
- Banter is designed in — students will look at their neighbour's policy report and compare. Variance across the room IS the teaching moment; conversation is the vehicle.
- Under 35 = skipped reading, ran the mitigation on autopilot. Over 55 = stuck on a specific risk; facilitator should intervene with "pick another, run the loop."
