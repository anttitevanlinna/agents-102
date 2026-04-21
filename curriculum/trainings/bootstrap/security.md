# Security

## Big Idea
You can't tell if your agent is safe by looking at its output. You need a way to check — and the practice is running the check, not waiting for certainty.

## Meta
- **Prework:** [Before Module 4](exercises/module-4-prework.md) — two reads: (1) skills as expertise the agent plugs in, (2) agent security vs. classical software security (why the threat model shifts and why mitigations are agent-shaped)
- **Homework:** extract one micro-skill from your own reading of a company policy rule; agent-sprawl reading (shadow agents, the 82%-think-protected / 24%-have-visibility pattern)

## What You'll Learn
After this module, you will be able to:
- **Analyze** a working agent system against company policy rules and agent-specific risks using two pre-made skills
- **Distinguish** compliant / violating / "I can't tell" for each rule — and recognise that "I can't tell" is a real answer, not a failure
- **Apply** an agentic mitigation (scope, split, filter, review, gate) to a specific risk and observe the residual shift
- **Evaluate** residual risk honestly — what's left after mitigation, and whether the best move is to not open the door in the first place

## Connections
You've had three agents search your company and three more decide. The output looked reasonable. Think of a time you shipped something to a real stakeholder — a deck, a memo, a number — and found out later something was off. What did you wish someone had checked before it went out?

## Lectures

[Lecture: The practice of risk](lectures/practice-of-risk.md)

## Exercises

[Exercise: Audit your agent](exercises/audit-your-agent.md)

## Key Concepts (Emergent)
- **Certainty is a fantasy; the practice is the answer.** Classical software security sells you *secure / not secure*. Agent security can't — non-deterministic system, unbounded input, emergent tool use. You never get a proof; you get a loop. Run the loop, not the anxiety.
- **Two lenses, two skills.** The `company-ai-policy` skill carries what your company has already decided is off-limits. The `agent-security` skill carries agent-STRIDE and access-control analysis. You didn't have to become a policy expert or a threat modeller — the skill IS the expert.
- **"I can't tell" is a real answer.** Most rows in the policy report land here. They're not failures; they're the honest state of a system whose behaviour is non-deterministic. Closing an "I can't tell" requires evidence, not confidence.
- **Mitigations are agent-shaped.** Scope, split, filter, review, gate. Not firewalls. An agentic system earns its safety through loop design, not perimeter.
- **Residual risk is a first-class artifact.** After mitigation, something remains. You name it, accept it on record, or close the door. The best mitigation is the one you didn't need — avoidance beats reduction.
- **Skills as expertise injection** (named late). Skills are how an agent borrows capability it doesn't natively have. They scope DOWN (what it can't do) and scope UP (what expertise it brings). Module 7 comes back for sharing them.

## Debrief

Five minutes. Claude reviews the audit session and sharpens the skill files you used. The evidence is what the audit produced: the two reports, the "I can't tell" rows, the mitigation you applied, the residual that's still true. Claude reviews, rewrites the skill in place, reports what changed. You push back on anything that's off.

**Prompt** *(copy → Claude Code)*

```
Review this session and sharpen the skills. Read skills/company-ai-policy/ and skills/agent-security/ (every file). Scan the audit output in module-4/ — both reports, the mitigation, the residual. Look back over the session: which rows did the skill mark "I can't tell" because the rule itself was ambiguous, where did the skill flag a non-issue, what specific failure class did it miss that you only caught by eye, where did the mitigation reduce one risk but shift another?

Then rewrite whichever skill file needs it most. Integrate, don't append. Sharpen rules that wobbled, add the failure class the skill didn't catch, tighten the "I can't tell" criteria so the column stays honest rather than avoidant. Do NOT add verification steps that pretend to resolve residual risk — the honest "can't tell" is the discipline. Don't add a "retro notes" section; rewrite the file as the better version.

When you're done, tell me in 3–5 lines: which skill you edited, what you added, what you sharpened, what you removed, and why — grounded in specific rows from the audit. Name at least one door the rules now say to keep closed.
```

*(end of prompt)*

Read Claude's summary. Push back where it's wrong — *"that rule wasn't ambiguous, I just didn't have the evidence"* / *"you loosened 'I can't tell' — put it back."* The artifact: `module-4/residual.md` — the student's named residuals and one scoping rule that avoids opening a door they'd rather leave closed. The unease stays. Nothing today resolves it. That's the curriculum.

## Bridge
The agent is scoped, the residual risk is named. But the output *inside* the scope — can you trust what it actually says?

<!-- maintainer -->

**Meta (trainer):**
- **Primary Bloom's level:** Analyze → Evaluate
- **Materials (trainer):** `module-4-skills.zip` — two skill files drop into `skills/`: `company-ai-policy/` (pre-built per customer from their data-usage, security, AI-use, and sector-specific rules) and `agent-security/` (generic, ships with the training — access-control analysis + agent-STRIDE + agentic-mitigation suggestions)
- **Plug points:** the customer's data-usage policy, security policy, AI-use policy, and sector-specific compliance rules (pre-converted into the `company-ai-policy` skill by Antti — separately billable); the student's chosen risk to mitigate; the student's own micro-skill from homework

**Plug Points (trainer):**

> PLUG POINT: The `company-ai-policy` skill content.
> Default: Antti pre-builds this from the customer's data-usage policy, security policy, AI-use policy (if one exists), and any sector-specific rules (GDPR, NIS2, DORA, MIFID II, industry codes). This is separately billable prep work. If policies are thin or absent, the skill defaults to a Nordic-baseline bundle (GDPR + general data-classification + a conservative AI-use policy template) and the gaps become a finding rather than a blocker.

> PLUG POINT: The student's chosen risk.
> Default: pick the top-ranked risk from the `agent-security` report. Students can override if a specific "I can't tell" row from the policy report bothers them more. The point isn't to fix the biggest risk; it's to run the full loop on one real risk.

> PLUG POINT: The micro-skill the student writes for homework.
> Default: one policy rule that's specific to the student's organisation — customer-data classification, retention window, the one rule legal cares most about. The student extracts it into a short skill file that sits alongside their agent rules from here onward — reused whenever the agent touches data that rule applies to.

**TODO:** Pass 3 polish on lecture (currently draft from pass 1); facilitator notes pass after student-facing content stabilises. The homework micro-skill is new — needs a short template in Module 5 prework so students actually bring the file.

**Frameworks riffed on:**
- **STRIDE** (Microsoft SDL threat model) — adapted to agent shapes for the `agent-security` skill. Participants with security backgrounds recognise it; others meet it fresh, scoped to agents.
- **Principle of least privilege** — named in the lecture, operationalised in the "don't open the door" framing.
- **Residual risk** (ISO 31000 / NIST risk management) — every SVP in a regulated Nordic company has met this concept; we adopt the vocabulary, not the bureaucracy.
- **Assumption-test** (Roger Martin) — the "what would have to be true for this to be safe?" move is carried from Module 3's synthesizer into the `company-ai-policy` skill's "I can't tell" column.

**Philosophy callout (sparing):**
- Belief #8 — name what you don't know — lands implicitly in the "I can't tell" column. Not announced; earned by the student writing one themselves.
- Belief #14 — practice beats proof — anchors the lecture's core message. Named in maintainer-space, experienced in body.

**Capability check owed:**
- **Skills drop-in behaviour.** Verify via `claude-code-guide` how a skill folder (`skills/<skill-name>/SKILL.md` + supporting files) is picked up by Claude Code in the training directory. Confirm: no restart needed, skill invocable by plain-language request, no global install step. Two pre-built skills ship in `module-4-skills.zip`; if the drop-in path differs from Module 2's conventions, the exercise needs a setup line.
- **Skill invocation phrasing.** Verify "apply the company-ai-policy skill to my module-3 system" dispatches the skill reliably. If Claude Code prefers `/skill` syntax or `use skill:` phrasing in the current build, update exercise body to match.

**Customer prep (sold separately):**
- `company-ai-policy` skill build — 0.5–1 day of Antti's time per customer. Inputs: data-usage policy, security policy, AI-use policy (optional), sector rules. Output: a `SKILL.md` + `policies/` directory the agent reads when invoked. Deliverable is also reusable by the customer outside training — the skill is theirs to keep.

**Watch-fors (deferred to facilitator notes pass):**
- Shame spiral. A student whose agent violates outright will treat it as personal failure. The lecture's frame ("certainty is a fantasy") lands this, but coach in room: *"The variance across the room is the teaching moment. No one got a clean report."*
- "I can't tell" avoidance. Students will try to push ambiguous rows into clear buckets. Coach: *"'I can't tell' is the correct answer when the evidence isn't there. Leaving it honest is the discipline."*
- Over-mitigation. A student picks one risk and tries to mitigate three. Coach back: *"Run the full loop on one. We're practising the loop, not clearing the backlog."*
- Skill as magic. Students may treat the skill's report as ground truth. The skill is an expert, not an oracle — it can miss things. Plant the doubt in debrief: *"Where would this skill's report itself be wrong?"*

**Homework micro-skill template (owed, Module 5 prework integration):**
- One-page template: skill name, one rule it enforces, one example of how an agent should behave under it, one example of how it shouldn't. Format matches the `company-ai-policy` sub-skill shape. Students bring this file to Module 5.
