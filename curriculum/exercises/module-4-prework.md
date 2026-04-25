# Exercise: Prework. Before Module 4

**What you do:**

Two reads. Together, 25–35 minutes. Neither asks you to build anything. Module 4 has you author one security plugin, install it, then run it against the system you built in Modules 2–3. These reads calibrate your eyes for what a plugin is and why the agent threat model is layered, not a replacement for the discipline you may already know.

**Reading 1. Plugins and skills, in plain language.**

You have spent three modules shaping agents with prompts, files, and rules. Plugins are the next layer: a small, named bundle of expertise the agent loads when it is relevant. Not magic. A folder of files, packaged once.

*What a skill is.* A `SKILL.md` plus any supporting files the skill needs. The `SKILL.md` declares what the skill is for, when to use it, and how. Supporting files hold the content (policy text, reference lists, templates, whatever the skill reads from). When a task matches a skill's purpose, the agent loads it and behaves differently.

*What a plugin is.* A small bundle that ships one or more skills together. You author plugins by chatting with Claude. Describe what you want, and Claude builds the manifest and the skill files. The plugin is then installed in your runtime so the skills become invocable by name in any new session.

*What it is not.* Not a separate model. Not magic. Not something you install per-seat. A plugin you author lives in your runtime: same machine, same filesystem.

*Why plugins matter for Module 4.* Until now, you have added expertise by writing prompts or dropping material into `sources/` or `memory/`. That works, but everything lives in one pile. Plugins scope expertise. In Module 4 you will author one security plugin with two lenses: a policy lens (your company's rules) and an agent-security lens (named attack classes plus access-control analysis). You will not need to be a policy expert or a threat modeller; the plugin will be. **The plugin carries the expertise you fed it, and you author it.**

*The Module 4 shape.* Two exercises. The first authors the plugin and installs it in your runtime. The second runs it against the agent system you built in Modules 2–3. Splitting the move into two exercises means plugin-authoring gets real time. First-time authoring is not a three-minute warmup.

One thing to think about before class: *what is one expertise you would want your agent to borrow, if you could point at a plugin and say "be that kind of expert"?* Not a lecture topic. A concrete move. Retention rules. Brand voice. Your CFO's favourite metric framing. Three words in a note.

**Reading 2. Agent security is layered on classical security, not a replacement for it.**

Classical software security is a mature discipline. CVSS scores, residual-risk registers, accepted-risk reasoning, perimeter controls, IAM, mTLS, audit trails, NIST CSF, ISO 27001. The whole apparatus is built on probabilistic, residual-aware reasoning under bounded inputs. Agent security inherits this. Everything below is what agent systems add ON TOP, not what they replace.

*What agent systems add to the threat model.*

- **Non-deterministic behaviour.** The same prompt, the same files, the same tools can produce different outputs on different runs. A test that passed yesterday says nothing about today. Classical residual-risk reasoning still applies, but the residual fluctuates rather than settling. *"Safe enough, most of the time, within named limits"* is the new shape.
- **The instruction set is the new attack surface.** In classical software, you defend against code executing on your system. In agent systems, the most powerful attack is getting the agent to *decide* to do something harmful with tools it legitimately has access to. The attacker's payload is well-formed English, not malformed input, so the WAF and the input validators do not see it. **Prompt injection** is the discipline that names this surface, and it has no native classical analogue. Direct prompt injection arrives in the user's input. Indirect prompt injection arrives in a source the agent retrieves and reads: a customer ticket, a scraped page, a partner's PDF. Both turn ordinary text into instructions the agent might follow.
- **Capability is emergent.** Classical software does what it was coded to do. An agent with tool access does what the combination of its instructions, context, and the user's prompt *implies* it should do. Capability emerges from composition. You cannot fully predict it. You can only bound it.

*What classical security still owns and we still need.* The network perimeter. The WAF in front of the LLM API. Egress controls. mTLS to the model provider. The IAM-scoped service principal the agent runs under. Audit logging. Secrets management. Patch hygiene on the agent's host. Threat modelling for the parts of your system that are still deterministic code. The CTO who concludes *"agent mitigations replace network controls"* ships a breach. The floor stays.

*What agent security adds on top.* New named attack classes the lens has to cover by name: prompt injection (direct + indirect), secrets in context and scrollback (credentials, customer data, partner-NDA material persisting in transcripts and the agent's working memory), tool confusion (the agent calling the wrong tool, or the right tool with the wrong scope, because the prompt or context misframes the work), plugin supply-chain (who authored the plugin the agent loads, who reviewed it, what it can do). And new mitigation shapes layered above the classical controls: scope (give the agent less), split (break one agent into two with different trust levels), filter (post-process outputs before they leave the system), gate (a human checks before a sensitive action), review (another agent judges the first's output).

*And one plain note.* Absolute certainty was never available in classical security either; what is new is that the residual moves while you watch. Classical security gave you a residual you signed off on quarterly. Agent security gives you a residual you re-assess per loop iteration. The discipline is the same; the cadence is faster. If that feels uncomfortable, it should. The practice *is* the work.

**What to bring to class:** nothing on paper. Come knowing (a) what shape a plugin has, and (b) that agent security is layered on top of classical security: same residual-risk vocabulary, faster cadence, four new attack classes by name. The Module 4 lecture picks up both.

**Time:** 25–35 minutes total. 10 on plugins, 15–20 on the security shift, 5 on the "borrowed expertise" note.

<!-- maintainer -->

**Quality:** draft 2026-04-25
- compendium-audited 2026-04-25 (check_writing, check_student_facing)

**Frameworks riffed on:**
- **STRIDE** (Microsoft SDL) — historical reference; the M4 audit uses named attack classes directly rather than STRIDE categories so the lens cannot collapse into closed-loop self-grading.
- **Principle of least privilege** — foreshadowed in the "scope" mitigation, fully named in the lecture.
- **Residual risk** (ISO 31000 / NIST) — named plainly, no bureaucratic overhead. The point is the cadence shift, not the vocabulary swap.
- **Layered controls** — agent mitigations sit above classical controls (perimeter, IAM, mTLS, audit). The Cowork-mode security-skeptic sim 2026-04-25 surfaced this as the substantive reframe.
- **Non-determinism as a design property, not a bug** — the practitioner framing of LLM behaviour that M5 and M6 carry forward.

**Prerequisites:**
- Modules 1–3 completed; training directory populated with memory/, sources/, agents/, module-1..3/.
- `module-4-starter/policies/` reference material available (downloaded from the training site or available at session start) — input the student reads while authoring the security plugin in M4. Per the no-pre-shipped-plugins rule, no plugin / skill files ship in M4; the student authors them.
- No connector changes since Module 3.

**Capability notes (confirmed, no check owed):**
- Plugins are a current Claude Code primitive; a folder with a manifest plus `skills/<name>/SKILL.md` is picked up at session start without further configuration.
- Skill invocation via plain-language prompting ("apply the X lens of the security plugin to Y") is the standard pattern — no slash command required.

**Capability checks owed (before first delivery):**
- Per-runtime plugin authoring + install paths — see *Author a security plugin* maintainer block.
- Verify (via `claude-code-guide`) whether current Claude Code surfaces a visible indicator when a plugin loads (e.g., a "Plugin: company-security" marker in the transcript). If yes, add one cue line to the *Author a security plugin* verify step. If no, skip; the verify prompt itself confirms load.
- Verify the current Anthropic plugins doc URL and link it in one place (or instruct the student where to search). Avoid copying doc content — link and let docs stay current.

**Watch-fors:**
- A security-literate student reads Reading 2 and pushes back ("classical security already does residual risk"). They are right — the point is not that classical security is obsolete, it is that the cadence shifts and four new attack classes are added by name. Coach in Module 4 Connections: *"What about agent systems makes your existing discipline still apply, and which four classes do you need to add to your threat model?"*
- A non-technical student reads Reading 2 and retreats to "this is someone else's job." Coach: *"The plugin is about to do the threat modelling for you. Your job is to read its report with judgment — and judgment is business judgment, not technical."*
- A student asks to see a sample plugin before class. Don't ship one — the no-pre-shipped-plugins rule is load-bearing, and reading a sample blunts the authoring move. Point them at the prework reading instead.

**Why two prework reads, not one:**
- The *plugins* piece is mechanism. The *security* piece is mental model. Combined into one read, the mental-model shift gets lost under the mechanism. Separated, each lands.
- Both are short — 25–35 min total is under Module 3's 30–40 min prework, honouring the "no prework cliff" rule. Module 4 is a high-content day with two exercises; prework should leave the student rested, not depleted.

**Deferred per student-facing-first rule:**
- Facilitator notes: Module 4 opening Connections can start with *"What is one expertise you would want your agent to borrow?"* as a warm entry into the plugins frame.
- Variant note: for the Mid-Management training, Reading 2 leans harder on the layered framing and lighter on the named attack classes — the mental-model shift is what matters, not the class-by-class enumeration.
