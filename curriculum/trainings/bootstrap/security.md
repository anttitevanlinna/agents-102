# Security

## Big Idea
You can't tell if your agent is safe by looking at its output. You need a way to check. The discipline is running the check, not waiting for certainty.

## Prework

[Before Module 4](exercises/module-4-prework.md). Two reads: (1) plugins as the package format that carries an expertise into your agent, (2) agent security layered on top of classical software security (the threat model adds non-deterministic instruction-set surfaces; classical perimeter, IAM, and audit remain the floor).

## What You'll Learn
After this module, you will be able to:
- **Author** a small security plugin with two lenses (a policy lens drawn from your company's rules, and an agent-security lens covering named attack classes) and install it in your runtime
- **Apply** named agent attack classes (prompt injection direct and indirect, secrets-in-context, tool-confusion, plugin supply-chain) to a working agent system, alongside classical access-control analysis
- **Distinguish** compliant / violating / "I can't tell" for each rule (and recognise that "I can't tell" is a real answer, not a failure)
- **Apply** an agentic mitigation (scope, split, filter, gate, review) layered on top of classical controls, and observe the residual risk shift
- **Evaluate** residual risk plainly. What's left after mitigation, and whether the best move is to not open the door in the first place

## Start here
You've had three agents search your company and three more decide. What doesn't sit right about that, from a risk angle? Name the thing you'd want to check before letting this near a real stakeholder.

[Lecture: The discipline of risk](lectures/practice-of-risk.md)

[Exercise: Author a security plugin](exercises/author-security-plugin.md)

[Exercise: Audit your agent](exercises/audit-your-agent.md)

## Key Concepts
- **Certainty is a fantasy; the discipline is the answer.** Classical software security gives you residual-risk vocabulary, CVSS, accepted-risk registers: probabilistic reasoning under bounded inputs. Agent security inherits all of that and adds non-determinism, unbounded text inputs, and emergent tool use on top. You never get a proof; you get a loop. Run the loop, not the anxiety.
- **Two lenses, one plugin you authored.** One lens carries what your company has already decided is off-limits. The other carries named attack classes and access-control analysis. You did not have to become a policy expert or a threat modeller; you had to know what mattered and dictate it.
- **Prompt injection is a class, not a footnote.** Direct prompt injection arrives in the user's input. Indirect prompt injection arrives in a source the agent retrieves and reads. Both turn well-formed English into the attack surface. Classical perimeter does not see the attack because the attack is not malformed.
- **"I can't tell" is a real answer.** Most rows in the policy report land here. They are not failures; they are the plain state of a system whose behaviour is non-deterministic. Closing an "I can't tell" requires evidence, not confidence.
- **Agent mitigations are layered, not replacements.** Scope, split, filter, gate, review sit on top of the controls a real production agent already lives behind: WAF, VPC egress, mTLS, IAM-scoped service principals, audit. Loop design is additive. A CTO who concludes "I don't need to threat-model the network because we have agentic mitigations" ships a breach. The floor stays; the loop adds new surfaces above it.
- **Residual risk is a first-class artifact.** After mitigation, something remains. You name it, accept it on record, or close the door. The best mitigation is the one you didn't need. Avoidance beats reduction.
- **Plugins as expertise injection.** A plugin is how an agent borrows capability it doesn't natively have. It scopes DOWN (what the agent can't do) and scopes UP (what expertise it brings). Module 4 is where you author your first one.

## Debrief

Five minutes. Claude reviews the audit session and sharpens the plugin you authored. The evidence is what the audit produced: the two reports, the "I can't tell" rows, the mitigation you applied, the residual that's still true. Claude reviews, rewrites the plugin in place, reports what changed. You push back on anything that's off.

**Prompt** *(Claude Code)*

```
Review this session and sharpen the security plugin I authored. Read every file in the plugin I built this module. Scan the audit output in module-4/ (both reports, the mitigation, the residual). Look back over the session: which rows did the plugin mark "I can't tell" because the rule itself was ambiguous, where did it flag a non-issue, which named attack class did it under-cover, what specific failure did I only catch by eye, where did the mitigation reduce one risk but shift another?

Then rewrite whichever plugin file needs it most. Integrate, don't append. Sharpen rules that wobbled, strengthen coverage of the attack class that under-fired, tighten the "I can't tell" criteria so the column stays plain rather than avoidant. Do NOT add verification steps that pretend to resolve residual risk. The plain "can't tell" is the discipline. Don't add a "retro notes" section; rewrite the file as the better version.

When you're done, tell me in 3-5 lines: which file you edited, what you added, what you sharpened, what you removed, and why, grounded in specific rows from the audit. Name at least one door the rules now say to keep closed.
```

Read Claude's summary. Push back where it's wrong. *"That rule wasn't ambiguous, I just didn't have the evidence"* / *"you loosened 'I can't tell', put it back."* The artifact is the plugin (now sharpened) and the residual file in `module-4/`: your named residuals and one scoping rule that avoids opening a door you'd rather leave closed. The unease stays. Nothing today resolves it. That's the curriculum.

One thing does travel: the plugin lives on disk now, sharper than it started. Point it at the other agents you've built. You'll find different "I can't tell" rows everywhere you look. The next agent you build will have a stricter starting line because of this one.

## Next
The agent is scoped, the residual risk is named. But the output *inside* the scope. Can you trust what it actually says?

## Homework after Module 4 — between-module reading

Extract one rule from your company's policy and author it as a small plugin yourself. Plus agent-sprawl reading (shadow agents, the 82%-think-protected / 24%-have-visibility pattern).

<!-- maintainer -->

**Quality:** draft 2026-04-25
- compendium-audited 2026-04-25 (check_writing, check_student_facing, check_strategy_tie_in, check_pedagogy)
- sim-passed 2026-04-25 (mid-competent + opinionated-senior + fast-operator + security-skeptic + cohort-facilitator personas; APPROVE-WITH-TODOs)

**Cohort-facilitator audit (2026-04-25, fixes applied 2026-04-26):**
- ~~Time math owed verification~~ — DONE. Lecture trimmed from 8–10 to a hard 8 (`lectures/practice-of-risk.md` time field plus a one-line budget note). Module budget: lecture 8 + author 25 + audit 45 + Connections 5 + Debrief 5 + transitions ≈ 96 min. Fits 1h45 with a 9-min slack buffer.
- ~~Repetition trim~~ — DONE. Key Concept #2 rewritten to drop the *"carries the expertise you fed it"* closer; the exercises and prework still earn the line.
- 90-min facilitator dry-run before first cohort. Specifically: Phase 3 install moment with one Cowork colleague + one CLI colleague; one colleague playing the freezing-SVP for Phase 1.

**Meta (trainer):**
- **Primary Bloom's level:** Create → Analyze → Evaluate (authoring + applying + evaluating residual)
- **Materials (trainer):** `module-4-starter.zip` — policy reference `.md` files drop into `module-4/policies/` (Nordic-baseline for self-study; customer-distilled for in-company deliveries — both as input the student reads while authoring, NOT as a pre-built plugin). The student authors one security plugin during the *Author a security plugin* exercise carrying two lenses (policy + agent-security with named attack classes). Per Antti 2026-04-25 strict rule: no pre-shipped plugins anywhere in Bootstrap; M4 is the canonical plugin-authoring module — the move is split into two exercises so plugin-authoring gets real time.
- **Plug points:** the customer's data-usage policy, security policy, AI-use policy, and sector-specific compliance rules (pre-distilled into `module-4/policies/` reference `.md` by Antti — separately billable); the student's chosen risk to mitigate; the student's own one-rule plugin from homework

**Plug Points (trainer):**

> PLUG POINT: The customer-policy reference content under `module-4/policies/`.
> Default: Antti pre-distils this from the customer's data-usage policy, security policy, AI-use policy (if one exists), and any sector-specific rules (GDPR, NIS2, DORA, MIFID II, industry codes) into reference `.md` files the student reads while authoring their plugin. This is separately billable prep work. If policies are thin or absent, the reference defaults to the Nordic-baseline (GDPR + general data-classification + a conservative AI-use policy template) and the gaps become a finding rather than a blocker. **No pre-built plugin ships either way** — the student authors one in the exercise.

> PLUG POINT: The student's chosen risk.
> Default: pick the top-ranked risk from the security report. Students can override if a specific "I can't tell" row from the policy report bothers them more. The point isn't to fix the biggest risk; it's to run the full loop on one real risk.

> PLUG POINT: The micro-skill the student writes for homework.
> Default: one policy rule that's specific to the student's organisation — customer-data classification, retention window, the one rule legal cares most about. The student extracts it into a short skill file that sits alongside their agent rules from here onward — reused whenever the agent touches data that rule applies to.

**Frameworks riffed on:**
- **STRIDE** (Microsoft SDL threat model) — adapted to agent shapes; appears in the lecture as historical context, NOT as the structuring rubric of the audit prompt. The audit names attack classes directly so the lens cannot collapse into closed-loop self-grading.
- **Principle of least privilege** — named in the lecture, operationalised in the "don't open the door" framing.
- **Residual risk** (ISO 31000 / NIST risk management) — every SVP in a regulated Nordic company has met this concept; we adopt the vocabulary, not the bureaucracy.
- **Assumption-test** (Roger Martin) — the "what would have to be true for this to be safe?" move is carried from Module 3's synthesizer into the policy lens of the plugin the student authors (the "I can't tell" column).

**Philosophy callout (sparing):**
- Belief #21 — name what you don't know — lands implicitly in the "I can't tell" column. Not announced; earned by the student writing one themselves.
- Belief #14 — practice beats external proof — anchors the lecture's core message. Named in maintainer-space, experienced in body.

**Capability check owed (per-runtime plugin authoring + install):** see *Author a security plugin* exercise maintainer block — Cowork *Save plugin* button, Desktop plugin loader, CLI `~/.claude/plugins/<name>/`, plain-language invocation reliability across all three runtimes, plugin-loaded visibility on session start. Run `claude-code-guide` before first delivery.

**Customer prep (sold separately):**
- Customer-policy reference distillation — 0.5–1 day of Antti's time per customer. Inputs: data-usage policy, security policy, AI-use policy (optional), sector rules. Output: `module-4/policies/*.md` reference files the student reads while authoring their plugin. The plugin the student authors during M4 is also theirs to keep — it travels with them after training.

**Watch-fors (deferred to facilitator notes pass):**
- Shame spiral. A student whose agent violates outright will treat it as personal failure. The lecture's frame ("certainty is a fantasy") lands this, but coach in room: *"The variance across the room is the teaching moment. No one got a clean report."*
- "I can't tell" avoidance. Students will try to push ambiguous rows into clear buckets. Coach: *"'I can't tell' is the correct answer when the evidence isn't there. Leaving it plain is the discipline."*
- Over-mitigation. A student picks one risk and tries to mitigate three. Coach back: *"Run the full loop on one. We're practising the loop, not clearing the backlog."*
- Plugin as magic. Students may treat the report as ground truth. The plugin is an expert, not an oracle — it can miss things, especially on the attack class the student under-specified. Plant the doubt in debrief: *"Where would this plugin's report itself be wrong?"*
- Generic GDPR plugin. The Phase 1 dictation in *Author a security plugin* was too thin and the plugin reads like a generic policy template. Catch this before the audit runs — the audit on a generic plugin produces generic findings.

**Time budget:** total ~75–85 min. *Author a security plugin* ~25, *Audit your agent* ~45, Connections + Debrief ~10–15. Fits 1h45 with classroom-pace concurrency.
