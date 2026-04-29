# Reading: Before Module 4

**What you do:**

Two reads. Together, 25-35 minutes. Neither asks you to build anything. Module 4 has you run policy files directly, package the useful check as reusable expertise, then run it against the system you built in Modules 2-3. These reads calibrate your eyes for what personal skills are and why agent risk is layered on top of the company controls you already rely on.

**Reading 1. Personal skills, in plain language.**

You have spent three modules shaping agents with prompts, files, and rules. Personal skills are the next layer: a small, named bundle of expertise the agent loads when it is relevant. Not magic. A reusable "how" you can bring into future work.

*What a skill is.* A `SKILL.md` plus any supporting files the skill needs. The `SKILL.md` declares what the skill is for, when to use it, and how. Supporting files hold the content (policy text, reference lists, templates, whatever the skill reads from). When a task matches a skill's purpose, the agent loads it and behaves differently.

*What a personal skill is.* Your own reusable skill, saved in your Claude environment. In Cowork, you create one by going to *Customize* → *Skills* → *New* → *Create with Claude*. In Claude Code, the same shape is a `SKILL.md` under `~/.claude/skills/<name>/`. Different surface, same idea: reusable expertise the agent can load again.

*What it is not.* Not a separate model. Not magic. Not something you install per-seat. A personal skill you author lives in your runtime and can be reused when the same kind of work appears again.

*Why skills matter for Module 4.* Until now, you have added expertise by writing prompts or dropping material into `sources/` or `memory/`. That works, but everything lives in one pile. Skills scope expertise. In Module 4 you will first run your company's policy files raw, then package the useful check with two lenses: a policy lens (your company's rules) and an agent-risk lens (what the agent can reach, what it might leak, and how ordinary text can mislead it). You will not need to be a policy expert or a security specialist; the reusable check will be. **The check carries the expertise you fed it, and you author it.**

*The Module 4 shape.* Two exercises. The first runs the policy files raw and packages the useful check. The second loads the package in your runtime, runs the packaged lenses against the agent system you built in Modules 2-3, and mitigates one risk. Splitting the move into two exercises means authoring gets real time. First-time packaging is not a three-minute warmup.

One thing to think about before class: *what is one expertise you would want your agent to borrow, if you could point at a skill and say "use that way of working"?* Not a lecture topic. A concrete move. Retention rules. Brand voice. Your CFO's favourite metric framing. Three words in a note.

**Reading 2. Agent risk is layered on normal security, not a replacement for it.**

Classical software security is a mature discipline. It has network controls, access rights, audit trails, vendor review, accepted-risk decisions, and named owners. Agent security inherits this. Everything below is what agent systems add ON TOP, not what they replace.

*What agent systems add to the risk picture.*

- **Non-deterministic behaviour.** The same prompt, the same files, the same tools can produce different outputs on different runs. A test that passed yesterday says nothing about today. Classical residual-risk reasoning still applies, but the residual fluctuates rather than settling. *"Safe enough, most of the time, within named limits"* is the new shape.
- **Ordinary text can become the risk.** In classical software, you defend against code executing on your system. In agent systems, the most powerful attack is getting the agent to *decide* to do something harmful with access it legitimately has. The payload is well-formed English, not malformed input, so normal technical filters may not see it. **Prompt injection** is the name for this surface. Direct prompt injection arrives in the user's input. Indirect prompt injection arrives in a source the agent retrieves and reads: a customer ticket, a scraped page, a partner's PDF. Both turn ordinary text into instructions the agent might follow.
- **Capability is emergent.** Classical software does what it was coded to do. An agent with tool access does what the combination of its instructions, context, and the user's prompt *implies* it should do. Capability emerges from composition. You cannot fully predict it. You can only bound it.

*What normal security still owns and you still need.* Network boundaries. Access rights. Audit logging. Secrets management. Vendor review. Patch hygiene on the systems the agent runs on. The parts of your system that are ordinary software still need ordinary software security. The leader who concludes *"agent mitigations replace network controls"* ships a breach. The floor stays.

*What agent security adds on top.* New named risk patterns the lens has to cover by name: prompt injection (direct + indirect), secrets in context and scrollback (credentials, customer data, partner-NDA material persisting in transcripts and the agent's working memory), tool confusion (the agent calling the wrong tool, or the right tool with the wrong scope, because the prompt or context misframes the work), skill supply-chain (who authored the skill the agent loads, who reviewed it, what it can do). And new mitigation shapes layered above the normal controls: scope (give the agent less), split (break one agent into two with different trust levels), filter (post-process outputs before they leave the system), gate (a human checks before a sensitive action), review (another agent judges the first's output).

*And one plain note.* Absolute certainty was never available in classical security either; what is new is that the residual moves while you watch. Classical security gave you a residual you signed off on quarterly. Agent security gives you a residual you re-assess per loop iteration. The discipline is the same; the cadence is faster. If that feels uncomfortable, it should. Running the loop *is* the work.

**Before you arrive: five lines, in your own voice.**

Module 4's first exercise asks you to type three to five lines about what matters about your company's data and your agent system after the raw policy run. Not a quiz; raw judgment. Have a few specifics warm in your head when class starts, or jot them somewhere you can paste from. Examples of the shape:

- *"We process customer call recordings; voice data has to stay in-region."*
- *"Sales never lets unredacted CRM exports leave the building."*
- *"Our sharper rule beyond GDPR is the export-control list: these named jurisdictions cannot see model output."*
- *"The data my Module 3 system retrieves includes one partner-NDA source I have not pre-scoped."*

Three to five lines, plain language, the things you would not want a generic policy template to gloss. Five minutes of thinking now is what makes packaging feel like authoring rather than answering questions.

**What to bring to class:** the five lines above plus knowing (a) what shape a personal skill has, and (b) that agent security is layered on top of normal company controls: same residual-risk vocabulary, faster cadence, four new risk patterns by name. The Module 4 lecture picks up both.

**Time:** 30-40 minutes total. 10 on personal skills, 15-20 on the security shift, 5 on the five-lines prep, 5 on the "borrowed expertise" note.

<!-- maintainer -->

**Quality:** draft 2026-04-29
- compendium-audited 2026-04-25 (check_writing, check_student_facing)

**Frameworks riffed on:**
- **STRIDE** (Microsoft SDL) — historical reference; the M4 audit uses named attack classes directly rather than STRIDE categories so the lens cannot collapse into closed-loop self-grading.
- **Principle of least privilege** — foreshadowed in the "scope" mitigation, fully named in the lecture.
- **Residual risk** (ISO 31000 / NIST) — named plainly, no bureaucratic overhead. The point is the cadence shift, not the vocabulary swap.
- **Layered controls** — agent mitigations sit above classical controls (perimeter, IAM, mTLS, audit). The Cowork-mode security-skeptic sim 2026-04-25 surfaced this as the substantive reframe.
- **Non-determinism as a design property, not a bug** — the practitioner framing of LLM behaviour that M5 and M6 carry forward.

**Prerequisites:**
- Modules 1–3 completed; training directory populated with memory/, sources/, agents/, module-1..3/.
- `module-4/policies/` reference material available from the prework starter — input the student runs raw, then packages into reusable security expertise in Module 4. Per the no-pre-shipped-skill rule, no security skill files ship in Module 4; the student authors them.
- No connector changes since Module 3.

**Capability notes (confirmed, no check owed):**
- CLI standalone skills under `~/.claude/skills/<name>/SKILL.md` auto-load in a fresh session.
- Skill invocation via plain-language prompting ("apply the X lens of the reusable security check to Y") is the standard pattern; slash commands are used only when exact dispatch matters.

**Capability checks owed (before first delivery):**
- Per-runtime authoring + install paths — see *Run and package a security skill* and *Audit your agent* maintainer blocks.
- Verify (via `claude-code-guide`) whether current Claude Code surfaces a visible indicator when a skill loads. If yes, add one cue line to *Audit your agent* Phase 1. If no, skip; autocomplete remains the load cue.

**Watch-fors:**
- A security-literate student reads Reading 2 and pushes back ("classical security already does residual risk"). They are right — the point is not that classical security is obsolete, it is that the cadence shifts and four new attack classes are added by name. Coach in Module 4 Connections: *"What about agent systems makes your existing discipline still apply, and which four classes do you need to add to your threat model?"*
- A non-technical student reads Reading 2 and retreats to "this is someone else's job." Coach: *"The skill is about to do the threat modelling for you. Your job is to read its report with judgment — and judgment is business judgment, not technical."*
- A student asks to see a sample skill before class. Don't ship one — the no-pre-shipped-skill rule is load-bearing, and reading a sample blunts the authoring move. Point them at the prework reading instead.

**Why two prework reads, not one:**
- The *personal skills* piece is mechanism. The *security* piece is mental model. Combined into one read, the mental-model shift gets lost under the mechanism. Separated, each lands.
- Both are short — 25–35 min total is under Module 3's 30–40 min prework, honouring the "no prework cliff" rule. Module 4 is a high-content day with two exercises; prework should leave the student rested, not depleted.

**Deferred per student-facing-first rule:**
- Facilitator notes: Module 4 opening Connections can start with *"What is one expertise you would want your agent to borrow?"* as a warm entry into the personal-skills frame.
- Variant note: for the Mid-Management training, Reading 2 leans harder on the layered framing and lighter on the named attack classes — the mental-model shift is what matters, not the class-by-class enumeration.
