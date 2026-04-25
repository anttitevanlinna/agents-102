<!-- todo: full plugin-authoring exercise reshape (per-runtime install paths: Cowork Save-plugin button, Desktop plugin loader, CLI ~/.claude/skills/<name>/SKILL.md) — separate /content-creation session -->

# Exercise: *Audit* your agent

**What you do:**

Author one security plugin. Two reports. One mitigation. The goal isn't a clean bill of health. The goal is to run the loop — assess, mitigate, reassess residual — on the system you actually built, and to ship a plugin you'll re-use on every agent you build from here.

Three phases. Forty-five minutes. Bring your Module 3 system; that's the target.

**Phase 0 — Author the plugin.**

A **plugin** packages an expertise — rules, checklists, the moves an agent runs — into something the agent can plug in and use. M4 is where you author one yourself. The reference material lives in `module-4/policies/` (Antti's distillation of your company's actual policies, or the Nordic-baseline reference for self-study). It is **input you read while authoring**, not a pre-built plugin.

Read the policy reference (5 min). Then describe the plugin you want to Claude. Claude builds the manifest and skill files; you steer.

Open `module-4/policies/` and skim the four files. Then start a new session in your training directory and paste:

**Prompt** *(Claude Code)*

```
I'm authoring one security plugin with two lenses for the agent system I built in modules 2-3. Read the four files in module-4/policies/ for the policy material. The plugin needs:

- A POLICY lens — rules drawn from those four files (data-usage, security, AI-use, sector). For each rule, the lens produces a row in a report: compliant / violating / "I can't tell" + one line of evidence from my files.
- An AGENT-SECURITY lens — agent-STRIDE + access-control analysis with agentic mitigation suggestions (scope, split, filter, gate, review). Generic; applies to any agent system.

Build the plugin: a manifest, one SKILL.md per lens, supporting reference files where useful. Keep each SKILL.md tight — invocation criteria, the rules it applies, the report shape it produces. Don't run it yet; we'll install it next. Show me the files before saving so I can push back on rule wording or report shape.
```


Push back where the wording doesn't match how your company actually talks (a rule about "personal data" should sound like your company's policy, not generic GDPR). When the plugin is right, save and install:

- **Cowork:** click *Save plugin* in the chat — it registers in your library.
- **Code Desktop:** use the plugin loader to install the package.
- **Code CLI:** Claude can write the `SKILL.md` directly into `~/.claude/skills/<name>/SKILL.md` and you're done.

Start a new session — plugins load at session start, not into the current one.

**Phase 1 — Policy audit.**

Start a new session in your training directory.

**Prompt** *(Claude Code)*

```
Apply the policy lens of the security plugin I authored to the agent system I built in module-2 and module-3. The system is: the memory in memory/, the sources in sources/, the agent files in agents/, the root CLAUDE.md, and the multi-agent runs in module-3/retrievals/ and module-3/stances/.

For each rule the plugin carries, produce one row in a report: rule name, one-line description, verdict (compliant / violating / "I can't tell"), and one line of evidence from my actual files for that verdict. If you can't tell, say what evidence you'd need to decide.

Write the report to module-4/policy-report.md. Be specific. Be plain. An "I can't tell" is a better answer than a confident guess.

Read the memory and agent files properly — don't skim. Quote the specific lines or files that support each verdict.
```


While this runs, stay with it. The report is more useful when you read it cold. Expect the plugin to find things you didn't think about — and to leave things "I can't tell" you thought were settled.

**Phase 1.5 — Ask Claude what's in the report.**

Two full reports read row-by-row by eye is Module 2's trap all over again. Let the agent do the first pass. When the policy report lands, stay in the same session —

**Prompt** *(Claude Code)*

```
Read module-4/policy-report.md. Tell me:
1. The top three surprises — rows where the verdict is not what a careful reader would have predicted from my files alone.
2. The three rows where "I can't tell" is most likely hiding a real compliance gap — rows where the missing evidence would probably come back as violating, not compliant, if it surfaced.
3. One row that looks compliant on the surface but where you'd still push back.

Keep each point to one or two sentences. Quote the specific rule name so I can find the row.
```


Read Claude's three lists. THEN open `module-4/policy-report.md` and find the rows Claude flagged — you're reading with a hypothesis, not row-by-row from scratch. Notice which of Claude's surprises match yours and which don't. That mismatch is data.

**Phase 2 — Security audit with STRIDE.**

In the same session —

**Prompt** *(Claude Code)*

```
Apply the agent-security lens of the plugin to the same system. Run both the access-control analysis and the agent-STRIDE pass.

For access control: list every external system the agent can reach (connectors, retrievals, file writes beyond the training directory, anything in tools/). For each: is the access necessary for what the system actually does? Flag anything the system has access to but doesn't need.

For agent-STRIDE: run the six categories (spoofing, tampering, repudiation, information disclosure, denial of service, elevation of privilege) in their agent-adapted meanings from the skill. For each category, name the top one or two specific risks in my system, not generic category descriptions.

For each risk flagged (access or STRIDE), suggest one agentic mitigation — scope, split, filter, gate, or review — matched to the specific risk. Rank the risks by severity × likelihood, three-tier (high / medium / low).

Write the report to module-4/security-report.md. Include the ranked mitigation suggestions.
```


Read `module-4/security-report.md` alongside the policy report. Two different lenses; some risks will overlap, some won't. That's correct.

You now have the assessment half of the loop. The uncomfortable feeling is the evidence.

**Phase 3 — Mitigate one risk. Reassess the residual.**

Look at the two reports. Pick one risk to mitigate. Not the easiest, not the scariest. The one that bugs you when you sit with the reports for thirty seconds. Feeling is fine here. This is about running the loop once, not solving the worst problem on your list.

Tell Claude the risk in one sentence, then paste the prompt. You're steering, not answering questions about technical detail. Claude picks the mitigation shape and walks the diff.

**Prompt** *(Claude Code)*

```
I named the risk I want to mitigate in my last message. Walk me through applying a mitigation to my system for that risk: what file changes, what agent instructions change, what new skill or rule might need to land. You pick the mitigation shape from the five (scope, split, filter, gate, review); I'll steer if a different one fits.

DO NOT make any changes yet. Describe the diff in plain English first and stop. Wait for me to type "apply" before you touch a file. If I want something different, I'll tell you.

After I confirm and the change lands, re-run the check the plugin performed for this specific risk (re-apply the relevant lens, not the whole audit). Report the new verdict. Is the risk reduced, eliminated, or shifted somewhere else?

Then write one paragraph to module-4/residual.md naming what's still true after the mitigation. Not what we fixed. What's left. Be specific.
```


Claude describes the diff. You steer if the shape doesn't fit. Confirm. Watch the change land. Re-run the check. Read the residual.

*The risk didn't go away.* That's expected. A mitigation reduces, it doesn't eliminate. The residual paragraph is the artifact. Name it, accept it on record, keep going.

**Close — one door you'd rather not open.**

Look at the two reports one more time. Somewhere in them is a door you'd rather close than mitigate. An access your agent has but doesn't need. A category of output your system produces that really shouldn't leave the building. A tool connection that's convenient but risky.

Add one more line to `module-4/residual.md`, under a heading `## Doors I'd rather not open`: *"I'm scoping out [X]. The agent will not [Y]."* Write it as a rule. You won't implement it now — Module 5 revisits output trust, Module 7 covers sharing. The rule goes on record. You decided.

The best mitigation is the one you didn't need. You just named one.

**What happens:**

You authored a plugin with two lenses, ran it against your Module 3 system, and produced reports you couldn't have produced by hand — one in policy language, one in threat-model language. You pick one risk, apply one agentic mitigation, observe the residual, and name one door you won't open. You ran the loop once. The plugin and the loop are portable to every agent you build from here.

**The point:**

Absolute certainty is not on offer. The practice is. Two lenses, two reports, one mitigation, one named residual, one closed door — that's what risk management looks like on agent systems. And the plugin you wrote, not you eyeballing it, is the expert. You brought the judgment.

**Time:** 45 minutes. Phase 0 ~3, Phase 1 ~12, Phase 2 ~12, Phase 3 ~12, Close ~6.

<!-- maintainer -->

**Frameworks riffed on:**
- **STRIDE** (Microsoft SDL) — embedded in the `agent-security` skill; agent-adapted. Named in Phase 2.
- **Principle of least privilege** — operationalised in Phase 3's access-control analysis and in the Close's "doors I'd rather not open" framing.
- **Residual risk** (ISO 31000 / NIST) — central artifact; `module-4/residual.md` is the keepable output.
- **Assess → mitigate → reassess → decide** — classical risk loop, mapped to the three phases.
- **Roger Martin's *what would have to be true*** — surfaces in the skill's "I can't tell" column as "what evidence would I need to decide?"

**Philosophy callout (sparing):**
- Belief #8 — name what you don't know — lands in the "I can't tell" column and in the residual paragraph. Student writes both; the belief is earned, not announced.
- Belief #14 — practice beats proof — the whole exercise enacts it. Named in the lecture, lived in the exercise.

**Plug points:**
- The customer-policy reference content under `module-4/policies/` — per-customer, pre-distilled by Antti from their policies as input the student reads while authoring their plugin. Separately billable. Default fallback: Nordic-baseline reference (GDPR + conservative AI-use template + general data-classification). **No pre-built plugin ships either way** — per Antti 2026-04-25, M4 is the canonical plugin-authoring module.
- The student's chosen risk — participant-picked in Phase 3 from the two reports. Never prescribed.
- The student's "door I'd rather not open" — participant-written in the Close. Specific to their system and their judgment.

**Capability checks owed (before first delivery):**
1. **Per-runtime plugin authoring + install.** Cowork: *Save plugin* button after authoring works in current build. Desktop: plugin loader picks up student-authored plugin without restart. CLI: plugin authored at `~/.claude/skills/<plugin-name>/SKILL.md` is invocable from next session. Run `claude-code-guide` per runtime.
2. **Plain-language invocation phrasing.** *"Apply the security plugin I authored to Y"* dispatches reliably across all three runtimes. Fallback to `/skill use <name>` or `use skill:<name>` per-runtime if plain-language is not reliable.
3. **Plugin-loaded visibility in transcript.** Check whether each runtime surfaces a visible "Plugin loaded" marker when invoked. If yes, one-line cue in Phase 1. If no, skip.

**Customer prep (sold separately):**
- Customer-policy reference distillation is ~0.5–1 day of Antti's time per customer. Inputs: data-usage policy, security policy, AI-use policy (optional), sector-specific rules. Output: `module-4/policies/*.md` reference files the student reads while authoring. Reference is the customer's to keep, and so is the plugin the student authors from it.
- Default Nordic-baseline reference (for customers without policies, or for demo runs) ships with the training. Variance in the report is similar; specific rules differ.

**Watch-fors (deferred to facilitator notes pass):**
- **Shame spiral.** Student reads a violation row and takes it personally. Coach: *"The variance across the room is the teaching. No one got a clean report. The variance is data, not judgment on you."*
- **"I can't tell" avoidance.** Student reclassifies an plain "I can't tell" as compliant or violating just to have a clear answer. Coach: *"'I can't tell' is the correct answer when evidence isn't there. Push Claude back — 'what evidence would you need to decide?' — and accept the plain state."*
- **Over-mitigation.** Student picks one risk, then can't stop at one. Coach: *"Run the full loop on one. We're practising the loop, not clearing the backlog. The rest is homework — not today's."*
- **Skill as oracle.** Student treats the report as ground truth. Seed doubt in debrief: *"Where would this skill's report itself be wrong? What's missing?"* Skills are experts, not oracles.
- **Skill not picked up.** If Phase 0 fails (skill doesn't invoke), don't debug in front of the room — switch to the facilitator's pre-run reports as a worked example and let students run the exercise on them. Pedagogy survives; capability check failure is the fix afterwards.
- **Report depth varies.** Some students' Module 3 systems are thin (short memory, light sources); their reports will be thin. That's a finding, not a fail — coach: *"A thin system has fewer risks AND less evidence. Both are true."*

**Why 45 minutes, not 30:**
- Two skills running sequentially, each takes real time. Students need to *read* both reports, not skim. Phase 3's diff-and-apply is the heart of the loop and can't be compressed.
- Banter is designed in — students will look at their neighbour's policy report and compare. Variance across the room IS the teaching moment; conversation is the vehicle.
- Under 35 = skipped reading, ran the mitigation on autopilot. Over 55 = stuck on a specific risk; facilitator should intervene with "pick another, run the loop."

**Deferred per student-facing-first rule:**
- Facilitator watch-fors (moved above but also belong in the delivery pack).
- Decision point: cohort with universally violating reports → spend extra time on the variance ("how is everyone violating the same rule, and what does that tell you about the rule vs. the system?").
- Variant note: Mid-Management version keeps the same three phases but adds a Phase 4 (5 min) — "who owns the residual you named?" — making the residual an ownership artifact, not just a technical one.
