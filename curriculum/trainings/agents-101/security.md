# Security

## Big Idea
You can't tell if your agent is safe from its output. Run a check; don't wait for certainty.

## Prework

Read the [Agent Trigger List, After Module 3](trainings/agents-101/supplementary/agent-trigger-list.md#after-module-3-notice-when-one-agent-is-not-enough), the multi-agent sections of [What is an Agent](../../trainings/agents-101/supplementary/what-is-an-agent.md), and [Before Module 4](lectures/module-4-prework.md).

## What You'll Learn
After this module, you will be able to:
- **Run** distilled policy files directly, then package the useful check as a skill
- **Author** a security check with two lenses: policy and agent risk
- **Apply** named agent risk patterns (direct and indirect prompt injection, secrets in context, tool confusion, skill supply chain) and a plain access review
- **Distinguish** compliant, violating and "I can't tell" for each rule
- **Apply** a mitigation (scope, split, filter, gate, review) on top of company controls
- **Evaluate** residual risk: what is left, and what future sessions need before touching the system

## Start here

Start a fresh session or task at `~/Documents/agents-101/`.

The agent reads the Module 3 system, the root instructions file, and the policy files under `module-4/policies/`. Reports go to `outputs/`.

Name what you'd want to check before letting this near a real stakeholder.

[Demo: Agent loop, raw](lectures/agent-loop-raw.md)

[Exercise: Run and package a security skill](exercises/author-security-skill.md)

[Exercise: Audit your agent](exercises/audit-your-agent.md)

[Lecture: The discipline of risk](lectures/practice-of-risk.md)

## Debrief

Five minutes. The agent adds one to five rules to the root instructions file. Its evidence: the raw and packaged policy reports, the security report with its residual decision, the "I can't tell" rows, and your mitigation.

{{prompt:a101-m4-debrief-security-rules}}

Push back where the summary is wrong: *"That rule wasn't ambiguous, I just didn't have the evidence"* / *"that residual is too vague, name the file or behaviour."*

Point the check at the other agents you've built.

## Build More Skills For Recurring How

A skill packages the *how* of a recurring judgment or workflow, so the agent repeats the method without you rebuilding it. Other examples: reviewing customer data use, preparing a weekly briefing, triaging a queue.

A skill works across projects and agents. Sharpen it where the method proves thin.

To share, install the skill in a teammate's runtime. Their agent loads the same method by name, without your prompt history. A skill is not a deployed service and does not settle ownership.

## Key Concepts
- No certainty: assess, mitigate, reassess the residual, decide.
- Well-formed English is the attack surface, even via sources.
- "I can't tell" is a real answer.
- Mitigations add to security controls, never replace them.

## Bring to Module 5

**Write one sentence per case: "the missing organisational check was X."** Both cases are in the pre-reads below.

## Pre-reads before Module 5

Read Mata v. Avianca (2023) and the Deloitte Australia / DEWR report (2025) in the lecture.

[The Missing Check](lectures/module-5-prework.md)

Once the files are saved to disk, end this session. Module 5 starts fresh at `~/Documents/agents-101/`.

## Next
Can you trust what the agent says inside its scope?

<!-- maintainer -->

**Red thread (2026-11-13, Antti).** "It is not to add sentences. It is to align on common theme. Say it in different ways without adding more content." Added openers, four-ideas slides and own-agent callouts were tried and removed the same evening. Align existing lines; add none.

**Quality:** compendium-audited 2026-08-25 (writing@d3ff749e story@5755beb6 technical@725101ec behavior@725101ec pedagogy@194c81b0 strategy@725101ec slides@4d9c4af2)
- judges @4d9c4af2: writing PASS, story PASS, technical PASS, behavior PASS, pedagogy PASS, strategy PASS, slides PASS
- cross_module @12bf0d81: PASS — set=[prework,getting-going,building-agent-systems,multi-agent-systems,security,output-quality,evaluations,personal-to-team,agents-building-agents]

**Key Concepts minimal (2026-09-24, Antti-directed).** A glance list of handles, nothing born here: every law on it is earned in the lecture that follows the exercise, `practice-of-risk.md` and the pre-read.

**§ Next (2026-09-23, blend § Titles M4):** The section hands over one question, whether the output inside the scope can be trusted. The *agent actions start as text* paragraph belongs to M3, where the idea first arrives as the boundary shift that earns the demo (`multi-agent-systems.md` § Start here). Do not restate it here; three statements of one idea is the corpus's largest duplication and none of the three changes its meaning.

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
| Root security rules | security operating rules in the active runtime's root instructions file | M4 Debrief | M5-M8 fresh sessions as risk memory |

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

**Runtime verification:** Claude Code and GitHub Copilot skill paths and invocation are documentation-backed below. The [M4 run sheet](trainer-modules.md#m4-glance) owns the remaining pre-delivery runtime rehearsal and the fallback if packaging fails.

**Sources:**
- `[checked:2026-08-23 result:OK due:cohort]` https://code.claude.com/docs/en/skills — [vendor docs, capability] personal skills live at `~/.claude/skills/<skill-name>/SKILL.md`; Claude can invoke a matching skill automatically or the user can invoke it directly. fallback: follow the documentation index at https://code.claude.com/docs/llms.txt to the current Skills page.
- `[checked:2026-10-08 result:OK due:cohort]` https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/add-skills — [vendor docs, capability] project skills can live at `.agents/skills/<skill-name>/SKILL.md`; GitHub Copilot can load a matching skill automatically or invoke it with `/skill-name`. fallback: open the current GitHub Copilot customization documentation and locate Agent skills.

**Customer prep (sold separately):**
- Customer-policy reference distillation — 0.5–1 day of Antti's time per customer. Inputs: data-usage policy, security policy, AI-use policy (optional), sector rules. Output: `module-4/policies/*.md` reference files the student runs raw and then packages. The reusable check the student authors during Module 4 is also theirs to keep; it travels with them after training.

**Customer-policy prep checklist:**
1. Inventory the supplied data-use, security, AI-use, retention, access, and sector-rule documents; record owner, version date, and source for each.
2. Mark every document as included, superseded, out of scope, or missing. Conflicts and missing decisions become explicit gaps; do not resolve them by inventing policy.
3. Distill only rules the source supports into `module-4/policies/*.md`, preserving the source pointer and the evidence needed to classify compliant / violating / `I can't tell`.
4. Remove customer secrets and personal data that the exercise does not need. Confirm the cohort runtime and connector permissions can read the remaining files.
5. Peer-review the distilled set against the originals, then run the raw-policy prompt once before delivery. Keep the report as trainer evidence, not as a student-shipped answer.
6. Replace the Nordic baseline files for the in-company build; never ship a pre-authored `agent-audit` skill. Students still author the reusable check themselves.
