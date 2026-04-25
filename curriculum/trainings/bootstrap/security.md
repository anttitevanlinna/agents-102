<!-- todo: M4 plugin-authoring reshape (separate /content-creation session). Audit 2026-04-25 (3-persona sim) flagged: (1) Phase 0 timing — three minutes can't carry first-time plugin authoring against fresh policy reads; either give plugin-authoring its own 25–30-min phase or move it upstream into a dedicated exercise; (2) "the plugin IS the expert" repetition; (3) close needs a non-rhetorical landing. Surgical fixes applied to (2) and (3); (1) is the real reshape. -->

# Security

## Big Idea
You can't tell if your agent is safe by looking at its output. You need a way to check. The practice is running the check, not waiting for certainty.

## Meta
- **Prework:** [Before Module 4](exercises/module-4-prework.md). Two reads: (1) plugins as the package format that carries an expertise into your agent, (2) agent security vs. classical software security (why the threat model shifts and why mitigations are agent-shaped)
- **Homework:** extract one rule from your company's policy and author it as a small plugin yourself; agent-sprawl reading (shadow agents, the 82%-think-protected / 24%-have-visibility pattern)

## What You'll Learn
After this module, you will be able to:
- **Analyze** a working agent system against company policy rules and agent-specific risks using a security plugin you author during the exercise
- **Distinguish** compliant / violating / "I can't tell" for each rule (and recognise that "I can't tell" is a real answer, not a failure)
- **Apply** an agentic mitigation (scope, split, filter, review, gate) to a specific risk and observe the residual shift
- **Evaluate** residual risk plainly. What's left after mitigation, and whether the best move is to not open the door in the first place

## Connections
You've had three agents search your company and three more decide. What doesn't sit right about that, from a risk angle? Name the thing you'd want to check before letting this near a real stakeholder.

[Lecture: The practice of risk](lectures/practice-of-risk.md)

[Exercise: Audit your agent](exercises/audit-your-agent.md)

## Key Concepts (Emergent)
- **Certainty is a fantasy; the practice is the answer.** Classical software security sells you *secure / not secure*. Agent security can't (non-deterministic system, unbounded input, emergent tool use). You never get a proof; you get a loop. Run the loop, not the anxiety.
- **Two lenses, one plugin you authored.** One lens carries what your company has already decided is off-limits. The other carries agent-STRIDE and access-control analysis. You didn't have to become a policy expert or a threat modeller. The plugin carries the expertise you fed it.
- **"I can't tell" is a real answer.** Most rows in the policy report land here. They're not failures; they're the plain state of a system whose behaviour is non-deterministic. Closing an "I can't tell" requires evidence, not confidence.
- **Mitigations are agent-shaped.** Scope, split, filter, review, gate. Not firewalls. An agentic system earns its safety through loop design, not perimeter.
- **Residual risk is a first-class artifact.** After mitigation, something remains. You name it, accept it on record, or close the door. The best mitigation is the one you didn't need. Avoidance beats reduction.
- **Plugins as expertise injection.** A plugin is how an agent borrows capability it doesn't natively have. It scopes DOWN (what the agent can't do) and scopes UP (what expertise it brings). M4 is where you author your first one.

## Debrief

Five minutes. Claude reviews the audit session and sharpens the plugin you authored. The evidence is what the audit produced: the two reports, the "I can't tell" rows, the mitigation you applied, the residual that's still true. Claude reviews, rewrites the plugin in place, reports what changed. You push back on anything that's off.

**Prompt** *(Claude Code)*

```
Review this session and sharpen the security plugin I authored. Read every file in the plugin I built this module. Scan the audit output in module-4/ (both reports, the mitigation, the residual). Look back over the session: which rows did the plugin mark "I can't tell" because the rule itself was ambiguous, where did it flag a non-issue, what specific failure class did it miss that I only caught by eye, where did the mitigation reduce one risk but shift another?

Then rewrite whichever plugin file needs it most. Integrate, don't append. Sharpen rules that wobbled, add the failure class the plugin didn't catch, tighten the "I can't tell" criteria so the column stays plain rather than avoidant. Do NOT add verification steps that pretend to resolve residual risk. The plain "can't tell" is the discipline. Don't add a "retro notes" section; rewrite the file as the better version.

When you're done, tell me in 3–5 lines: which file you edited, what you added, what you sharpened, what you removed, and why, grounded in specific rows from the audit. Name at least one door the rules now say to keep closed.
```


Read Claude's summary. Push back where it's wrong. *"That rule wasn't ambiguous, I just didn't have the evidence"* / *"you loosened 'I can't tell', put it back."* The artifact is the residual file in `module-4/`: your named residuals and one scoping rule that avoids opening a door you'd rather leave closed. The unease stays. Nothing today resolves it. That's the curriculum.

One thing does travel: the plugin lives on disk now. Point it at the other agents you've built. You'll find different "I can't tell" rows everywhere you look. The next agent you build will have a stricter starting line because of this one.

## Bridge
The agent is scoped, the residual risk is named. But the output *inside* the scope. Can you trust what it actually says?

<!-- maintainer -->

**Meta (trainer):**
- **Primary Bloom's level:** Analyze → Evaluate
- **Materials (trainer):** `module-4-starter.zip` — policy reference `.md` files drop into `module-4/policies/` (Nordic-baseline for self-study; customer-distilled for in-company deliveries — both as input the student reads while authoring, NOT as a pre-built plugin). The student authors one security plugin during Phase 2 of the exercise carrying two lenses (policy + agent-security: access-control analysis + agent-STRIDE + agentic mitigations). Per Antti 2026-04-25 strict rule: no pre-shipped plugins anywhere in Bootstrap; M4 is the canonical plugin-authoring module.
- **Plug points:** the customer's data-usage policy, security policy, AI-use policy, and sector-specific compliance rules (pre-distilled into `module-4/policies/` reference `.md` by Antti — separately billable); the student's chosen risk to mitigate; the student's own one-rule plugin from homework

**Plug Points (trainer):**

> PLUG POINT: The customer-policy reference content under `module-4/policies/`.
> Default: Antti pre-distils this from the customer's data-usage policy, security policy, AI-use policy (if one exists), and any sector-specific rules (GDPR, NIS2, DORA, MIFID II, industry codes) into reference `.md` files the student reads while authoring their plugin. This is separately billable prep work. If policies are thin or absent, the reference defaults to the Nordic-baseline (GDPR + general data-classification + a conservative AI-use policy template) and the gaps become a finding rather than a blocker. **No pre-built plugin ships either way** — the student authors one in the exercise.

> PLUG POINT: The student's chosen risk.
> Default: pick the top-ranked risk from the `agent-security` report. Students can override if a specific "I can't tell" row from the policy report bothers them more. The point isn't to fix the biggest risk; it's to run the full loop on one real risk.

> PLUG POINT: The micro-skill the student writes for homework.
> Default: one policy rule that's specific to the student's organisation — customer-data classification, retention window, the one rule legal cares most about. The student extracts it into a short skill file that sits alongside their agent rules from here onward — reused whenever the agent touches data that rule applies to.

**TODO:** Pass 3 polish on lecture (currently draft from pass 1); facilitator notes pass after student-facing content stabilises. The homework micro-skill is new — needs a short template in Module 5 prework so students actually bring the file.

**Frameworks riffed on:**
- **STRIDE** (Microsoft SDL threat model) — adapted to agent shapes for the `agent-security` skill. Participants with security backgrounds recognise it; others meet it fresh, scoped to agents.
- **Principle of least privilege** — named in the lecture, operationalised in the "don't open the door" framing.
- **Residual risk** (ISO 31000 / NIST risk management) — every SVP in a regulated Nordic company has met this concept; we adopt the vocabulary, not the bureaucracy.
- **Assumption-test** (Roger Martin) — the "what would have to be true for this to be safe?" move is carried from Module 3's synthesizer into the policy lens of the plugin the student authors (the "I can't tell" column).

**Philosophy callout (sparing):**
- Belief #8 — name what you don't know — lands implicitly in the "I can't tell" column. Not announced; earned by the student writing one themselves.
- Belief #14 — practice beats proof — anchors the lecture's core message. Named in maintainer-space, experienced in body.

**Capability check owed (per-runtime plugin authoring + install):**
- **Cowork:** verify the *Save plugin* affordance after the student authors the plugin file inline. Confirm the saved plugin is invocable by plain-language request from the same Cowork session.
- **Claude Code Desktop:** verify the plugin loader picks up the student-authored plugin without restart.
- **Claude Code CLI:** verify a plugin authored at `~/.claude/skills/<plugin-name>/SKILL.md` is invocable by plain-language request from the next session, no further config.
- **Plain-language invocation reliability** across all three runtimes: *"apply the security plugin I authored to my module-3 system"* should dispatch reliably. If a runtime prefers `/skill` or `use skill:` phrasing, update the exercise body for that runtime. Run `claude-code-guide` before first delivery.

**Customer prep (sold separately):**
- Customer-policy reference distillation — 0.5–1 day of Antti's time per customer. Inputs: data-usage policy, security policy, AI-use policy (optional), sector rules. Output: `module-4/policies/*.md` reference files the student reads while authoring their plugin. The plugin the student authors during M4 is also theirs to keep — it travels with them after training.

**Watch-fors (deferred to facilitator notes pass):**
- Shame spiral. A student whose agent violates outright will treat it as personal failure. The lecture's frame ("certainty is a fantasy") lands this, but coach in room: *"The variance across the room is the teaching moment. No one got a clean report."*
- "I can't tell" avoidance. Students will try to push ambiguous rows into clear buckets. Coach: *"'I can't tell' is the correct answer when the evidence isn't there. Leaving it plain is the discipline."*
- Over-mitigation. A student picks one risk and tries to mitigate three. Coach back: *"Run the full loop on one. We're practising the loop, not clearing the backlog."*
- Skill as magic. Students may treat the skill's report as ground truth. The skill is an expert, not an oracle — it can miss things. Plant the doubt in debrief: *"Where would this skill's report itself be wrong?"*

**Homework one-rule plugin template (owed, Module 5 prework integration):**
- One-page template: plugin name, one rule it enforces, one example of how an agent should behave under it, one example of how it shouldn't. Format matches the policy-lens shape of the M4 plugin. Students bring this file to Module 5.
