# Security

## Big Idea
You can't tell if your agent is safe by looking at its output. You need a way to check. The discipline is running the check, not waiting for certainty.

## Prework

Read [Agent Trigger List, After Module 3](trainings/agents-101/supplementary/agent-trigger-list.md#after-module-3-notice-when-one-agent-is-not-enough), selected sections from [What is an Agent](../../trainings/agents-101/supplementary/what-is-an-agent.md) on multi-agent coordination, and [Before Module 4](lectures/module-4-prework.md). The Module 4 prework adds two reads: (1) personal skills as the package format that carries expertise into your agent, (2) agent risk layered on top of normal security work.

## What You'll Learn
After this module, you will be able to:
- **Run** distilled policy files directly, then package the useful check into your runtime
- **Author** a small security check with two lenses (policy + agent-risk) and load it in your runtime
- **Apply** named agent risk patterns (prompt injection direct and indirect, secrets-in-context, tool-confusion, skill supply-chain) to a working agent system, plus a plain access review
- **Distinguish** compliant / violating / "I can't tell" for each rule
- **Apply** an agent mitigation (scope, split, filter, gate, review) on top of normal company controls and see how residual risk shifts
- **Evaluate** residual risk: what's left after mitigation, and what future sessions need before they touch the system

## Start here

Start a fresh session or task at `~/Documents/agents-101/`.

Module 4 reads the Module 3 system, the root instructions file, and the policy reference files under `module-4/policies/`. It writes reports under `outputs/` and compounds security operating rules back into the root instructions file.

You've had three agents search your company and three more decide. What doesn't sit right about that, from a risk angle? Name the thing you'd want to check before letting this near a real stakeholder.

[Demo: Agent loop, raw](lectures/agent-loop-raw.md)

[Lecture: The discipline of risk](lectures/practice-of-risk.md)

[Exercise: Run and package a security skill](exercises/author-security-skill.md)

[Exercise: Audit your agent](exercises/audit-your-agent.md)

## Debrief

Five minutes. The agent reviews the audit session and compounds one to five rules into the root instructions file for future sessions. The evidence is what the audit produced: the raw policy report, the packaged policy report, the security report with its residual decision, the "I can't tell" rows, and the mitigation you applied. The agent updates the instructions and reports what changed. You push back on anything that's off.

{{prompt:a101-m4-debrief-security-rules}}

Read the agent's summary. Push back where it's wrong. *"That rule wasn't ambiguous, I just didn't have the evidence"* / *"that residual is too vague, name the file or behaviour."* The artifacts are the security report and the operating rules in the root instructions file: evidence plus future behaviour. The unease stays. Nothing today resolves it. That's the curriculum.

Two things travel: the reusable check exists, and the root instructions file now tells future sessions how to behave around the risk you found. Point the check at the other agents you've built. You'll find different "I can't tell" rows everywhere you look. The next agent you build will have a stricter starting line because of this one.

## Build More Skills For Recurring How

A skill is close to the *how* of doing something. You can think of it as a process: everything the agent needs to do X repeatedly, without you rebuilding the method from scratch each time. The security check was one example. The same shape works for any recurring judgment or workflow: reviewing customer data use, preparing a weekly briefing, checking source quality, drafting in a house style, triaging a queue.

That is why skills travel. A good skill is not tied to one chat, one project, or one agent. It packages the repeatable method so you can apply it across projects and agents, then sharpen it when reality shows where the method was thin.

It is also the simplest sharing move you have built so far. Give a teammate the skill, install it in their runtime, and they can call the same method without reconstructing your prompt history. That does not make it a deployed service or solve ownership. Module 7 compares this skill-shaped handoff with three other sharing shapes: shared context, shared output, and an interface.

## Key Concepts
- **Certainty is a fantasy; the discipline is the answer.** Agents add non-determinism, unbounded inputs, and emergent tool use on top of security work. You never get a proof, you get a loop, and what remains after it you name and accept on record.
- **Policy files first, reusable expertise second, two lenses in one check you authored.** The files in `module-4/policies/` are source material: run them raw once, then package the useful check as a personal skill, which is how an agent borrows expertise. One lens carries what your company decided is off-limits, the other named risk patterns and an access review. You did not have to become a security specialist; you had to know what mattered and dictate it.
- **Prompt injection is a class, not a footnote.** Direct injection arrives in the user's input, indirect in a source the agent retrieves. Both turn well-formed English into the attack surface, which classical perimeter misses.
- **"I can't tell" is a real answer.** Most rows land here: not failures, the plain state of a non-deterministic system. Closing one takes evidence.
- **Mitigations are layered, not replacements.** Scope, split, filter, gate, review sit on top of network controls, access management, logging. Concluding that the agent check replaces security ships a breach.

## Bring to Module 5

**One sentence per case: "the missing organisational check was X."** Both cases are named in the pre-reads that follow. Module 5 opens on what a check would have caught, and the sentence is what you check it against.

Come to Module 5 without the two missing-check sentences and you'll be reconstructing them while the benchmark is already comparing detectors. Your call.

## Pre-reads before Module 5

Read Mata v. Avianca (S.D.N.Y. 2023) and the Deloitte Australia / DEWR welfare-compliance report (2025), both in the lecture that follows. Carry the risk discipline from this module into both cases: what check was missing around the agent's output?

[The Missing Check](lectures/module-5-prework.md)

Once the two sentences are saved, end this module's session or task. Module 5 starts fresh at `~/Documents/agents-101/`.

## Next
The agent is scoped, the residual risk is named. But the output *inside* the scope. Can you trust what it actually says?

Remember also: agent actions start as text. A tool call, an email draft, a CRM update, a database change, a ticket comment, before any of those touch another system, they are words the agent produced and another system obeys. If the output is wrong, the action built from it will be wrong too. Module 5 starts there.

<!-- maintainer -->

**Quality:** compendium-audited 2026-08-25 (writing@d3ff749e story@5755beb6 technical@725101ec behavior@725101ec pedagogy@194c81b0 strategy@725101ec slides@4d9c4af2)
- judges @4d9c4af2: writing PASS, story PASS, technical PASS, behavior PASS, pedagogy PASS, strategy PASS, slides PASS
- cross_module @12bf0d81: PASS — set=[prework,getting-going,building-agent-systems,multi-agent-systems,security,output-quality,evaluations,personal-to-team,agents-building-agents]

**Mood target:** Deepened unease without blame — the student has a practice for risk, not a promise of certainty.

**Push-back moves / Watch-fors / Decision points:** [M4 run sheet](trainer-modules.md#m4-glance) owns the live cues, recovery paths, protected beats, and cut order.

**Meta (trainer):**
- **Transitions:** connections 5 @start "Connections" · debrief 5 @end "Debrief" · more skills 3 @end "Build more skills for recurring how" · bridge 3 @end "Bridge"
- **Where these numbers come from:** debrief comes from the body ("Five minutes."); connections and more-skills are authored room estimates. Every beat here has no file of its own, so nothing else prices it.
- **Charge:** module-5-prework 0 — same: inlined for findability, read between sittings.
- **Primary Bloom's level:** Create → Analyze → Evaluate (authoring + applying + evaluating residual)
- **Module 4 sequencing decision:** policy reference files are source material first, not a prebuilt skill. Students run everything in `module-4/policies/` raw once, see what that produces, then package the useful check as reusable expertise. Exercise 1 ends at the personal skill; for Cowork, creating and saving the skill is part of that package step. Exercise 2 loads the skill, applies both lenses, and mitigates one risk.
- **Materials (trainer):** policy reference `.md` files are installed by the Agents 101 prework starter at `module-4/policies/` (Nordic-baseline for self-study; customer-distilled for in-company deliveries). The student runs those files raw, then authors reusable security expertise carrying two lenses (policy + agent-security with named attack classes). Per Antti 2026-04-29: no pre-shipped security skill; students author their own personal skill in Module 4.
- **Plug points:** the customer's data-usage policy, security policy, AI-use policy, and sector-specific compliance rules (pre-distilled into `module-4/policies/` reference `.md` by Antti — separately billable); the student's chosen risk to mitigate

**Artefact contracts**
| Artefact | Stable identifier | Produced by | Consumed by |
|---|---|---|---|
| Module 4 policy references | `module-4/policies/*.md` | Prework starter; customer prep | M4 raw policy run and reusable security check |
| Reusable security check | personal security skill in the active runtime | M4 author-security-skill exercise | M4 audit; M7 skill-sharing preview; post-training reuse |
| Module 4 security outputs | `outputs/policy-report-raw.md`, `outputs/policy-report.md`, `outputs/security-report.md` | M4 policy run and agent audit | M4 Debrief; M5-M8 operating-rule context |
| Root security rules | `./CLAUDE.md` security operating rules | M4 Debrief | M5-M8 fresh sessions as risk memory |

**Plug Points (trainer):**

> PLUG POINT: The customer-policy reference content under `module-4/policies/`.
> Default: Antti pre-distils this from the customer's data-usage policy, security policy, AI-use policy (if one exists), and any sector-specific rules (GDPR, NIS2, DORA, MIFID II, industry codes) into reference `.md` files the student runs raw and then packages into reusable expertise. This is separately billable prep work. If policies are thin or absent, the reference defaults to the Nordic-baseline (GDPR + general data-classification + a conservative AI-use policy template) and the gaps become a finding rather than a blocker. **No pre-built skill ships either way** — the student authors the reusable check in the exercise.

> PLUG POINT: The student's chosen risk.
> Default: pick the top-ranked risk from the security report. Students can override if a specific "I can't tell" row from the policy report bothers them more. The point isn't to fix the biggest risk; it's to run the full loop on one real risk.

**Frameworks riffed on:**
- **STRIDE** (Microsoft SDL threat model) — adapted to agent shapes; appears in the lecture as historical context, NOT as the structuring rubric of the audit prompt. The audit names attack classes directly so the lens cannot collapse into closed-loop self-grading.
- **Principle of least privilege** — named in the lecture, operationalised in access review and mitigation choice.
- **Residual risk** (ISO 31000 / NIST risk management) — every SVP in a regulated Nordic company has met this concept; we adopt the vocabulary, not the bureaucracy.
- **Assumption-test** (Roger Martin) — the "what would have to be true for this to be safe?" move is carried from Module 3's synthesizer into the policy lens of the reusable check the student authors (the "I can't tell" column).

**Philosophy callout (sparing):**
- Belief — name what you don't know — lands implicitly in the "I can't tell" column. Not announced; earned by the student writing one themselves.
- Belief — practice beats external proof — anchors the lecture's core message. Named in maintainer-space, experienced in body.

**Runtime verification:** Claude Code's personal-skill path and automatic or direct invocation are documentation-backed below. The [M4 run sheet](trainer-modules.md#m4-glance) owns the remaining pre-delivery Cowork authoring/load rehearsal and the fallback if packaging fails.

**Sources:**
- `[checked:2026-08-23 result:OK due:cohort]` https://code.claude.com/docs/en/skills — [vendor docs, capability] personal skills live at `~/.claude/skills/<skill-name>/SKILL.md`; Claude can invoke a matching skill automatically or the user can invoke it directly. fallback: follow the documentation index at https://code.claude.com/docs/llms.txt to the current Skills page.

**Customer prep (sold separately):**
- Customer-policy reference distillation — 0.5–1 day of Antti's time per customer. Inputs: data-usage policy, security policy, AI-use policy (optional), sector rules. Output: `module-4/policies/*.md` reference files the student runs raw and then packages. The reusable check the student authors during Module 4 is also theirs to keep; it travels with them after training.

**Customer-policy prep checklist:**
1. Inventory the supplied data-use, security, AI-use, retention, access, and sector-rule documents; record owner, version date, and source for each.
2. Mark every document as included, superseded, out of scope, or missing. Conflicts and missing decisions become explicit gaps; do not resolve them by inventing policy.
3. Distill only rules the source supports into `module-4/policies/*.md`, preserving the source pointer and the evidence needed to classify compliant / violating / `I can't tell`.
4. Remove customer secrets and personal data that the exercise does not need. Confirm the cohort runtime and connector permissions can read the remaining files.
5. Peer-review the distilled set against the originals, then run the raw-policy prompt once before delivery. Keep the report as trainer evidence, not as a student-shipped answer.
6. Replace the Nordic baseline files for the in-company build; never ship a pre-authored `security-audit` skill. Students still author the reusable check themselves.
