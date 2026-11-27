# Exercise: *Audit* your agent

**Time:** 35 minutes. Phase 1 ~3, Phase 2 ~12, Phase 3 ~10, Phase 4 ~10.

**Session** *(new, "Module 4 - Security audit")*

Start a new session at your training-directory root. Your Exercise 1 skill is available in this project.

Name it `m4-agent-audit` if supported.

**What you do:**

Run the security skill from Exercise 1 on the system you built in Modules 2-3. Apply one mitigation, then decide what to do about the residual risk: the risk that remains after the mitigation. The goal is to go through the loop once (assess, mitigate, reassess the residual), not to get a clean result.

You need the first policy report from Exercise 1, the skill, and your Module 3 system.

## Phase 1: Load the reusable check

*3 min*

Start the fresh session only after the Exercise 1 skill is saved, so the session can find the skill.

Ask the agent to confirm it can load the `agent-audit` skill. The prompts in the next phases tell the skill which of its two lenses to apply.

<div class="rt-cowork">

If `/agent-audit` doesn't appear, go back to Exercise 1, save the skill, then open a new session.

</div>

## Phase 2: Run the policy audit

*12 min*

Ask the agent to apply the skill's policy lens to your whole Module 3 system and write one report. The first report came straight from the policy files. This one comes through the skill you shaped.

<div class="rt-cowork">

If the audit doesn't fire, expand `/agent-audit` from the autocomplete in the prompt dialog.

</div>

{{prompt:audit-your-agent-1}}

Expect the skill to find things you did not think about, and to answer "I can't tell" on things you thought were settled.

Read the agent's three lists. Then open `outputs/policy-report.md` and find the rows it flagged.

## Phase 3: Run the agent-risk audit

*10 min*

In the same session, ask the agent to apply the agent-security lens and write the ranked risk report.

{{prompt:audit-your-agent-2}}

Have the agent list the risks and explain each one: what it means in this system, why it ranks where it does, and what the failure would look like. Then pick one. There is no prompt for this step. You lead.

The two lenses overlap on some risks and not on others. That is expected.

## Phase 4: Mitigate one risk, reassess the residual

*10 min*

Pick one risk from the two reports: the one that still bothers you on a second look.

Tell the agent the risk in one sentence, then paste the prompt. The agent picks and applies the mitigation.

{{prompt:audit-your-agent-3}}

If the mitigation does not fit, tell the agent and try again. Run the check again, then ask the agent to show you the residual section of `outputs/security-report.md`.

Some risk remains. That is expected. Name it, accept it on record, and stop there.

## Escalate to a person when judgment runs out

**Still not sure? Ask a person.**

Sometimes the right next step is not another prompt. If the policy report still has a serious "I can't tell", or the security report names a risk you do not know how to accept, show the evidence to someone who owns that area: legal, security, IT, compliance, or the business owner. Bring the report, the files it quotes, the mitigation you applied, and the residual that remains.

The narrow question the expert can answer is sitting in the report. Walk in with that.

## Separate prototype from production

**Prototype vs production.**

You did this for one risk. A production agent needs a check or a closed door wherever an action cannot be undone, and only a light check where redoing is cheap. You must do the work.

## Take stock of the loop you ran

**What happened:**

Your Module 3 system now has three reports: the first policy report and one from each lens of the skill. You applied one mitigation and recorded one decision on the residual risk. Where your own judgment runs out, show the evidence to a human expert.

**The point:**

You will not get certainty. You run the loop: assess, mitigate, reassess the residual, decide. The reusable check is the expert in the room, and it carries to the next agent. The report holds the evidence and the decisions.

This was **Recipe 4**: the two-lens audit, four agent-risk patterns, five mitigations (scope, split, filter, gate, review), and "I can't tell" as a verdict. For the next agent, the [Cookbook for Agent System Design](../trainings/agents-101/supplementary/cookbook-for-agent-system-design.md) names the moves and components.

<!-- maintainer -->

**Quality:** compendium-audited 2026-11-26 (behavior@78d17fc9 pedagogy@78d17fc9 strategy@78d17fc9 slides@78d17fc9)
- judges @78d17fc9: writing grandfathered, story grandfathered, technical grandfathered, behavior PASS, pedagogy PASS (verify-refuted, 1 finding see instances/agents-101--exercise--audit-your-agent.pedagogy.json), strategy PASS, slides PASS

**TODO (Claude Code Desktop edition review 2026-04-29):**
- Desktop skill-install step is body-only, not a prompt block, so `scripts/extract-training-prompts.js --training agents-101 --flavor desktop` under-represents the Desktop load path. Decide whether to label the Desktop install as a prompt or teach the extractor to capture install-instruction blocks.
- Desktop install to `~/.claude/skills/agent-audit/` is probably the highest-friction moment for chat-oriented business people on Desktop. Before first delivery, dry-run this with a non-terminal user and decide whether the body needs more Desktop-native scaffolding. Prompt edits remain gated.

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

**View summary:** You load the security check you authored and run it against the system you built: two lens reports, one mitigation, one residual-risk decision written down. Not a clean bill of health, but the loop. The artifact is a report that carries the evidence.
