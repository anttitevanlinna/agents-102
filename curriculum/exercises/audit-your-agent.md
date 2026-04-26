# Exercise: *Audit* your agent

**What you do:**

Run the security plugin you authored in the previous exercise against the system you built in modules 2–3. Two reports. One mitigation. One named door. The goal is not a clean bill of health. The goal is to run the loop (assess, mitigate, reassess residual) on the system you actually built.

Three phases plus a close. Forty-five minutes. Bring the plugin you just authored; that is the expert. Bring your Module 3 system; that is the target.

**Phase 1. Policy audit.**

Start a new session in your training directory. The plugin loads at session start.

Ask Claude to apply the policy lens to your full module-3 system and produce one report.

**Prompt** *(Claude Code)*

```
Apply the policy lens of the security plugin I authored to the agent system I built in module-2 and module-3. The system is: the memory in memory/, the sources in sources/, the agent files in agents/, the root CLAUDE.md, and the multi-agent runs in module-3/retrievals/ and module-3/stances/.

For each rule the plugin carries, produce one row in a report: rule name, one-line description, verdict (compliant / violating / "I can't tell"), and one line of evidence from my actual files for that verdict. If you can't tell, say what evidence you'd need to decide.

Write the report to module-4/policy-report.md. Be specific. Be plain. An "I can't tell" is a better answer than a confident guess.

Read the memory and agent files properly - don't skim. Quote the specific lines or files that support each verdict.
```

While the report runs, stay with it. The report is more useful when you read it cold. Expect the plugin to find things you did not think about, and to leave things "I can't tell" you thought were settled.

**Phase 1.5. Ask Claude what is in the report.**

Two full reports read row-by-row by eye is Module 2's trap all over again. Let the agent do the first pass. When the policy report lands, stay in the same session.

**Prompt** *(Claude Code)*

```
Read module-4/policy-report.md. Tell me:
1. The top three surprises - rows where the verdict is not what a careful reader would have predicted from my files alone.
2. The three rows where "I can't tell" is most likely hiding a real compliance gap - rows where the missing evidence would probably come back as violating, not compliant, if it surfaced.
3. One row that looks compliant on the surface but where you would still push back.

Keep each point to one or two sentences. Quote the specific rule name so I can find the row.
```

Read Claude's three lists. Then open `module-4/policy-report.md` and find the rows Claude flagged. You are reading with a hypothesis, not row-by-row from scratch. Notice which of Claude's surprises match yours and which do not. That mismatch is data.

**Phase 2. Agent-security audit.**

In the same session.

**Prompt** *(Claude Code)*

```
Apply the agent-security lens of the plugin to the same system. Run both the access-control analysis and the named-attack-class pass.

For access control: list every external system the agent can reach (connectors, retrievals, file writes beyond the training directory, anything in tools/). For each: is the access necessary for what the system actually does? Flag anything the system has access to but doesn't need.

For the named attack classes (prompt injection direct and indirect, secrets-in-context-and-scrollback, tool-confusion, plugin supply-chain): for each class, name the top one or two specific risks in my system, not generic class descriptions. Quote the file or behaviour that creates the risk.

For each risk flagged (access or named-class), suggest one agentic mitigation - scope, split, filter, gate, or review - matched to the specific risk. Layered on top of the classical controls already in place (network, IAM, mTLS, perimeter), not replacing them. Rank the risks by severity x likelihood, three-tier (high / medium / low).

Write the report to module-4/security-report.md. Include the ranked mitigation suggestions.
```

Read `module-4/security-report.md` alongside the policy report. Two different lenses; some risks will overlap, some will not. That is correct.

You now have the assessment half of the loop. The uncomfortable feeling is the evidence.

**Phase 3. Mitigate one risk. Reassess the residual.**

Look at the two reports. Pick one risk to mitigate. Not the easiest, not the scariest. The one that bugs you on the second skim. Your gut is data here. This is about running the loop once, not solving the worst problem on your list.

Tell Claude the risk in one sentence, then paste the prompt. You are steering, not answering questions about technical detail. Claude picks the mitigation shape and walks the diff.

**Prompt** *(Claude Code)*

```
I named the risk I want to mitigate in my last message. Walk me through applying a mitigation to my system for that risk: what file changes, what agent instructions change, what new skill or rule might need to land. You pick the mitigation shape from the five (scope, split, filter, gate, review); I'll steer if a different one fits.

DO NOT make any changes yet. Describe the diff in plain English first and stop. Wait for me to type "apply" before you touch a file. If I want something different, I'll tell you.

After I confirm and the change lands, re-run the check the plugin performed for this specific risk (re-apply the relevant lens, not the whole audit). Report the new verdict. Is the risk reduced, eliminated, or shifted somewhere else?

Then write one paragraph to module-4/residual.md naming what's still true after the mitigation. Not what we fixed. What's left. Be specific.
```

Claude describes the diff. You steer if the shape does not fit. Confirm. Watch the change land. Re-run the check. Read the residual.

The risk did not go away. That is expected. A mitigation reduces, it does not eliminate. The residual paragraph is the artifact. Name it, accept it on record, keep going.

**Close. One door you would rather not open.**

Look at the two reports one more time. Somewhere in them is a door you would rather close than mitigate. An access your agent has but does not need. A category of output your system produces that really should not leave the building. A tool connection that is convenient but risky.

Add one more line to `module-4/residual.md`, under a heading `## Doors I would rather not open`: *"I am scoping out [X]. The agent will not [Y]."* Write it as a rule. You will not implement it now. Module 5 revisits output trust, Module 7 covers sharing. The rule goes on record. You decided.

The best mitigation is the one you did not need. You just named one.

**What happens:**

You ran the plugin you authored against your Module 3 system and produced two reports you could not have produced by hand: one in policy language, one in agent-security language with named attack classes. You picked one risk, applied one agentic mitigation, observed the residual, and named one door you will not open. You ran the loop once. The plugin and the loop are portable to every agent you build from here.

**The point:**

Absolute certainty is not on offer. The practice is. Two lenses, two reports, one mitigation, one named residual, one closed door. That is what risk management looks like on agent systems. The plugin you wrote, not you eyeballing it, is the expert. You brought the judgment.

**Time:** 45 minutes. Phase 1 ~12, Phase 1.5 ~5, Phase 2 ~12, Phase 3 ~12, Close ~4.

<!-- maintainer -->

**Quality:** draft 2026-04-25
- compendium-audited 2026-04-25 (check_writing, check_student_facing, check_prompts rules 1–11, check_pedagogy, check_strategy_tie_in)
- sim-passed 2026-04-25 (cohort-facilitator persona, APPROVE — workhorse exercise; long agent waits ARE the designed conversation pauses)

**Cohort-facilitator audit (2026-04-25):** APPROVE without TODOs. The exercise is cohort-ready. One stylistic note for next pass: *"The uncomfortable feeling is the evidence."* (Phase 2 close) reads as a slogan when projected silently to 12 SVPs; consider moving to lecture closer or cutting on next polish.

**Pairs with:** [Author a security plugin](author-security-plugin.md) — Module 4's first exercise, produces the plugin this exercise runs.

**Frameworks riffed on:**
- **Named attack classes** (prompt injection direct/indirect, secrets-in-context, tool-confusion, plugin supply-chain) — external grounding the AGENT-SECURITY lens covers. Re-named in Phase 2 so the audit prompt cannot collapse them into generic STRIDE categories.
- **Principle of least privilege** — operationalised in Phase 2's access-control analysis and in the Close's "doors I would rather not open" framing.
- **Residual risk** (ISO 31000 / NIST) — central artifact; `module-4/residual.md` is the keepable output. Layered on top of classical residual-risk discipline, not replacing it.
- **Assess → mitigate → reassess → decide** — classical risk loop, mapped to the three phases.
- **Roger Martin's *what would have to be true*** — surfaces in the policy lens's "I can't tell" column as "what evidence would I need to decide?"

**Philosophy callout (sparing):**
- Belief #8 — name what you don't know — lands in the "I can't tell" column and in the residual paragraph. Student writes both; the belief is earned, not announced.
- Belief #14 — practice beats proof — the whole exercise enacts it. Named in the lecture, lived in the exercise.

**Plug points:**
- The student's chosen risk — participant-picked in Phase 3 from the two reports. Never prescribed.
- The student's "door I would rather not open" — participant-written in the Close. Specific to their system and their judgment.

**Watch-fors:**
- **Shame spiral.** Student reads a violation row and takes it personally. Coach: *"The variance across the room is the teaching. No one got a clean report. The variance is data, not judgment on you."*
- **"I can't tell" avoidance.** Student reclassifies an "I can't tell" as compliant or violating just to have a clear answer. Coach: *"'I can't tell' is the correct answer when evidence isn't there. Push Claude back — 'what evidence would you need to decide?' — and accept the plain state."*
- **Over-mitigation.** Student picks one risk, then can't stop at one. Coach: *"Run the full loop on one. We're practising the loop, not clearing the backlog. The rest is homework — not today's."*
- **Plugin as oracle.** Student treats the report as ground truth. Seed doubt in debrief: *"Where would this plugin's report itself be wrong? What's missing?"* Plugins are experts, not oracles.
- **Plugin not picked up.** If Phase 1 fails (plugin doesn't invoke), don't debug in front of the room — switch to the facilitator's pre-run reports as a worked example and let students run the exercise on them. Pedagogy survives; capability check failure is the fix afterwards.
- **Report depth varies.** Some students' Module 3 systems are thin (short memory, light sources); their reports will be thin. That's a finding, not a fail — coach: *"A thin system has fewer risks AND less evidence. Both are true."*

**Why 45 minutes, not 30:**
- Two lenses running sequentially, each takes real time. Students need to *read* both reports, not skim. Phase 3's diff-and-apply is the heart of the loop and can't be compressed.
- Banter is designed in — students will look at their neighbour's policy report and compare. Variance across the room IS the teaching moment; conversation is the vehicle.
- Under 35 = skipped reading, ran the mitigation on autopilot. Over 55 = stuck on a specific risk; facilitator should intervene with "pick another, run the loop."
