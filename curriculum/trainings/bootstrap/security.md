# Security

## Big Idea
You can't tell if your agent is safe by looking at its output. You need a way to check. The discipline is running the check, not waiting for certainty.

## Prework

**Setup:** Start this module at the training-directory root. Module 4 reads the Module 3 system, the root `./CLAUDE.md`, and the policy reference files under `module-4/policies/`. It writes reports under `outputs/` and compounds security operating rules back into `./CLAUDE.md`.

[Before Module 4](lectures/module-4-prework.md). Two reads: (1) personal skills as the package format that carries expertise into your agent, (2) agent risk layered on top of normal security work (company controls stay in place; agents add new ways for access, context, and instructions to go wrong).

## What You'll Learn
After this module, you will be able to:
- **Run** distilled policy files directly, then package the useful check as reusable expertise in your runtime
- **Author** a small security check with two lenses (a policy lens drawn from your company's rules, and an agent-risk lens covering named risk patterns), then load it in your runtime
- **Apply** named agent risk patterns (prompt injection direct and indirect, secrets-in-context, tool-confusion, skill supply-chain) to a working agent system, alongside a plain access review
- **Distinguish** compliant / violating / "I can't tell" for each rule (and recognise that "I can't tell" is a real answer, not a failure)
- **Apply** an agent mitigation (scope, split, filter, gate, review) layered on top of normal company controls, and observe the residual risk shift
- **Evaluate** residual risk plainly: what's left after mitigation, and what future sessions should remember before they touch the system again

## Start here
You've had three agents search your company and three more decide. What doesn't sit right about that, from a risk angle? Name the thing you'd want to check before letting this near a real stakeholder.

[Lecture: The discipline of risk](lectures/practice-of-risk.md)

[Exercise: Run and package a security skill](exercises/author-security-skill.md)

[Exercise: Audit your agent](exercises/audit-your-agent.md)

## Key Concepts
- **Certainty is a fantasy; the discipline is the answer.** Normal security work already has residual-risk vocabulary, accepted-risk registers, and named owners. Agent security inherits all of that and adds non-determinism, unbounded text inputs, and emergent tool use on top. You never get a proof; you get a loop. Run the loop, not the anxiety.
- **Policy files first, reusable expertise second.** The files in `module-4/policies/` are source material. You run them raw once, then package the useful check so it travels as a personal skill.
- **Two lenses, one check you authored.** One lens carries what your company has already decided is off-limits. The other carries named risk patterns and a plain access review. You did not have to become a policy expert or a security specialist; you had to know what mattered and dictate it.
- **Prompt injection is a class, not a footnote.** Direct prompt injection arrives in the user's input. Indirect prompt injection arrives in a source the agent retrieves and reads. Both turn well-formed English into the attack surface. Classical perimeter does not see the attack because the attack is not malformed.
- **"I can't tell" is a real answer.** Most rows in the policy report land here. They are not failures; they are the plain state of a system whose behaviour is non-deterministic. Closing an "I can't tell" requires evidence, not confidence.
- **Agent mitigations are layered, not replacements.** Scope, split, filter, gate, review sit on top of the controls a real production agent already lives behind: network controls, identity and access management, logging, supplier review, and security review. Loop design is additive. A leader who concludes "the agent check replaces security" ships a breach. The floor stays; the loop adds new surfaces above it.
- **Residual risk is a first-class artifact.** After mitigation, something remains. You name it and accept it on record. The report should not pretend that a narrower instruction erased the risk; it should show what changed and what stayed true.
- **Skills as expertise injection.** A skill is how an agent borrows capability it doesn't natively have. It scopes DOWN (what the agent can't do) and scopes UP (what expertise it brings). Module 4 is where you author your first reusable security check.

## Debrief

Five minutes. Claude reviews the audit session and compounds one to five rules into the root `CLAUDE.md` for future sessions. The evidence is what the audit produced: the raw policy report, the packaged policy report, the security report with its residual decision, the "I can't tell" rows, and the mitigation you applied. Claude updates `CLAUDE.md` and reports what changed. You push back on anything that's off.

**Prompt** *(Claude Code)*

```
Review this session and compound 1-5 security operating rules into the agent system. Read the root ./CLAUDE.md if it exists. Read outputs/policy-report-raw.md if it exists, outputs/policy-report.md, and outputs/security-report.md. Look back over the session: which rows should future sessions remember, which "I can't tell" rows need standing evidence checks, where did the mitigation reduce one risk but shift another, and what residuals should future sessions not forget?

Then update ./CLAUDE.md as the durable operating memory for this agent system. Add or sharpen 1-5 short security rules that future sessions should load before working with this system: what to check, what not to touch, when to run the reusable security check, or which residuals from outputs/security-report.md must stay visible. Integrate them into the right section if one exists; otherwise create a short section named "Security operating rules". Do not edit the skill files. Do not paste an audit summary. Do not add a retro section. Each rule should be usable by a future agent that never saw this session.

When you're done, tell me in 1-5 lines: what changed in ./CLAUDE.md, which report row or residual drove it, what future agents must do differently, and what risk remains even after the mitigation.
```

Read Claude's summary. Push back where it's wrong. *"That rule wasn't ambiguous, I just didn't have the evidence"* / *"that residual is too vague, name the file or behaviour."* The artifacts are the security report and the operating rules in `./CLAUDE.md`: evidence plus future behaviour. The unease stays. Nothing today resolves it. That's the curriculum.

Two things travel: the reusable check exists, and `./CLAUDE.md` now tells future sessions how to behave around the risk you found. Point the check at the other agents you've built. You'll find different "I can't tell" rows everywhere you look. The next agent you build will have a stricter starting line because of this one.

## Build More Skills For Recurring How

A skill is close to the *how* of doing something. You can think of it as a process: everything the agent needs to do X repeatedly, without you rebuilding the method from scratch each time. The security check was one example. The same shape works for any recurring judgment or workflow: reviewing customer data use, preparing a weekly briefing, checking source quality, drafting in a house style, triaging a queue.

That is why skills travel. A good skill is not tied to one chat, one project, or one agent. It packages the repeatable method so you can apply it across projects and agents, then sharpen it when reality shows where the method was thin.

## Next
The agent is scoped, the residual risk is named. But the output *inside* the scope. Can you trust what it actually says?

Remember also: agent actions start as text. A tool call, an email draft, a CRM update, a database change, a ticket comment — before any of those touch another system, they are words the agent produced and another system obeys. If the output is wrong, the action built from it will be wrong too. Module 5 starts there.

## Homework after Module 4: between-module reading

Agent-sprawl reading: shadow agents, and the 82%-think-protected / 24%-have-visibility pattern. Then read [Before Module 5](lectures/module-5-prework.md): Mata v. Avianca (S.D.N.Y. 2023) and Deloitte Australia / DEWR welfare-compliance report (2025). Bring one sentence per case: "the missing organisational check was X."

<!-- maintainer -->

**Quality:** draft 2026-04-29 (body touched after prior audit; re-audit needed)
- compendium-audited 2026-04-25 (check_writing, check_student_facing, check_strategy_tie_in, check_pedagogy)
- sim-passed 2026-04-25 (mid-competent + opinionated-senior + fast-operator + security-skeptic + cohort-facilitator personas; APPROVE-WITH-TODOs)

**Cohort-facilitator audit (2026-04-25, fixes applied 2026-04-26):**
- **Time math owed re-verification.** The first exercise now includes a raw policy run before packaging and the Cowork personal-skill creation step; the second exercise now carries load/apply/mitigate. Current rough budget: lecture 8 + run/package 40 + audit 35 + Connections 5 + Debrief 5 + transitions ~= 98-103 min. Fits 1h45 with tight transitions; needs facilitator pass.
- ~~Repetition trim~~ — DONE. Key Concept #2 rewritten to drop the *"carries the expertise you fed it"* closer; the exercises and prework still earn the line.
- 90-min facilitator dry-run before first cohort. Specifically: Exercise 1 Cowork personal-skill creation moment, Exercise 2 load moment with one Cowork colleague + one CLI colleague, and one colleague playing the freezing-SVP for Exercise 1 Phase 1.

**Meta (trainer):**
- **Primary Bloom's level:** Create → Analyze → Evaluate (authoring + applying + evaluating residual)
- **Module 4 sequencing decision:** policy reference files are source material first, not a prebuilt skill. Students run everything in `module-4/policies/` raw once, see what that produces, then package the useful check as reusable expertise. Exercise 1 ends at the personal skill; for Cowork, creating and saving the skill is part of that package step. Exercise 2 loads the skill, applies both lenses, and mitigates one risk.
- **Materials (trainer):** policy reference `.md` files are installed by the Bootstrap prework starter at `module-4/policies/` (Nordic-baseline for self-study; customer-distilled for in-company deliveries). The student runs those files raw, then authors reusable security expertise carrying two lenses (policy + agent-security with named attack classes). Per Antti 2026-04-29: no pre-shipped security skill; students author their own personal skill in Module 4.
- **Plug points:** the customer's data-usage policy, security policy, AI-use policy, and sector-specific compliance rules (pre-distilled into `module-4/policies/` reference `.md` by Antti — separately billable); the student's chosen risk to mitigate

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

**Capability check owed (per-runtime package + load):** see *Run and package a security skill* exercise maintainer block — Cowork personal-skill creation through *Customize → Skills → New → Create with Claude*, Desktop/CLI standalone-skill install into `~/.claude/skills/security-audit/`, plain-language invocation reliability across all three runtimes, loaded-skill visibility on session start. Run `claude-code-guide` before first delivery.

**Customer prep (sold separately):**
- Customer-policy reference distillation — 0.5–1 day of Antti's time per customer. Inputs: data-usage policy, security policy, AI-use policy (optional), sector rules. Output: `module-4/policies/*.md` reference files the student runs raw and then packages. The reusable check the student authors during Module 4 is also theirs to keep; it travels with them after training.

**Watch-fors (deferred to facilitator notes pass):**
- Shame spiral. A student whose agent violates outright will treat it as personal failure. The lecture's frame ("certainty is a fantasy") lands this, but coach in room: *"The variance across the room is the teaching moment. No one got a clean report."*
- "I can't tell" avoidance. Students will try to push ambiguous rows into clear buckets. Coach: *"'I can't tell' is the correct answer when the evidence isn't there. Leaving it plain is the discipline."*
- Over-mitigation. A student picks one risk and tries to mitigate three. Coach back: *"Run the full loop on one. We're practising the loop, not clearing the backlog."*
- Skill as magic. Students may treat the report as ground truth. The reusable check is an expert, not an oracle — it can miss things, especially on the attack class the student under-specified. Plant the doubt in debrief: *"Where would this check's report itself be wrong?"*
- Generic GDPR check. The Phase 2 dictation in *Run and package a security skill* was too thin and the policy lens reads like a generic policy template. Catch this before the audit runs; the audit on a generic lens produces generic findings.

**Time budget:** total currently ~98-103 min. *Run and package a security skill* ~40, *Audit your agent* ~35, Connections + Debrief ~10-15. Fits 1h45 with tight transitions; facilitator time-boxing still matters.
