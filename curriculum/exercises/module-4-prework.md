# Exercise: Prework — Before Module 4

**What you do:**

Two reads. Together, 25–35 minutes. Neither asks you to build anything. Module 4 runs two pre-made skills against the system you built in Modules 2–3 — these reads calibrate your eyes for what the skills are and why the risk question is different than you might expect.

**Reading 1 — Skills, in plain language.**

You've spent three modules shaping agents with prompts, files, and rules. Skills are the next layer: a small, named bundle of expertise the agent loads when it's relevant. Not magic. A folder.

*What a skill is.* A folder under `skills/` with a `SKILL.md` inside and any supporting files the skill needs. The `SKILL.md` declares what the skill is for, when to use it, and how. Supporting files hold the content — policy text, reference lists, templates, whatever the skill reads from. When a task matches a skill's purpose, the agent loads it and behaves differently.

*What it is not.* Not a separate model. Not a plugin store. Not something you install per-seat. A skill lives next to your agent files — same working directory, same filesystem. If you can write a markdown file, you can write a skill.

*Why skills matter for Module 4.* Until now, you've added expertise by writing prompts or dropping material into `sources/` or `memory/`. That works, but everything lives in one pile. Skills scope expertise. Two skills are about to arrive in your training directory — one carries your company's policies, one carries agent-security thinking. You won't need to be a policy expert or a threat modeller; the skills will be. That's the move: **the skill is the expert.**

*What you'll see.* A `skills/` folder in your training directory. Inside: `company-ai-policy/SKILL.md` and `agent-security/SKILL.md`. You'll invoke them tomorrow in plain language — *"apply the company-ai-policy skill to my module-3 system"* — and Claude Code loads the skill, reads its rules, and runs.

One thing to think about before class: *what's one expertise you'd want your agent to borrow, if you could point at a folder and say "be that kind of expert"?* Not a lecture topic — a concrete move. Retention rules. Brand voice. Your CFO's favourite metric framing. Three words in a note.

**Reading 2 — Agent security is different from software security.**

If you have a security background, half of this will sound wrong. That's the point.

*Classical software security* is a mature discipline. Perimeters, access controls, authentication, authorisation, known-bad patterns, audit trails. The code is deterministic: given an input, it produces the same output. You can test for specific failures, patch them, and verify the patch holds. STRIDE, OWASP, NIS2, CIS benchmarks — the body of knowledge assumes deterministic behaviour and well-enumerated attack surfaces.

*Agent security* breaks those assumptions in three places.

- **The behaviour is non-deterministic.** The same prompt, the same files, the same tools can produce different outputs on different runs. A security test that passed yesterday says nothing about today. "Secure / not secure" becomes "safe enough, most of the time, within named limits."
- **The attack surface is the instruction set.** In classical software, you defend against code executing on your system. In agent systems, the most powerful attack is getting the agent to *decide* to do something harmful with tools it legitimately has access to. Prompt injection, data exfiltration via the agent's own retrieval, tool misuse — the attacker talks to your agent, not to your OS. The firewall doesn't see the attack because the attack is well-formed English.
- **Capability is emergent.** Classical software does what it was coded to do. An agent with tool access does what the combination of its instructions, context, and the user's prompt *implies* it should do. Capability emerges from composition. You can't fully predict it; you can only bound it.

*What follows.* The threat model has to adapt. STRIDE still works, but the categories mean different things. "Tampering" now includes tampering with the agent's instructions through context. "Information disclosure" includes the agent summarising something confidential in a response the user was allowed to see. "Elevation of privilege" includes the agent using a tool on behalf of a user who shouldn't have triggered that tool. Module 4's `agent-security` skill runs this adapted STRIDE for you.

*What matters for mitigations.* Classical security favours perimeter and access control — firewalls, role-based access, patching. Agent mitigations are shaped differently. You scope (give the agent less). You split (break one agent into two with different trust levels). You filter (post-process outputs before they leave the system). You gate (a human checks before a sensitive action). You review (another agent judges the first's output). None of these are firewalls; all of them are agent-shaped.

*And one honest note.* Absolute certainty is not available. You don't get proofs; you get well-designed loops. Classical security gave you the feeling of certainty — patched, audited, signed off. Agent security gives you a practice: assess, mitigate, reassess residual, decide. If that feels uncomfortable, it should. The practice *is* the work.

**What to bring to class:** nothing on paper. Come knowing (a) what shape a skill has, and (b) that agent security is not the same discipline as software security. Tomorrow's lecture picks up both.

**Time:** 25–35 minutes total. 10 on skills, 15–20 on the security shift, 5 on the "borrowed expertise" note.

<!-- maintainer -->

**Frameworks riffed on:**
- **STRIDE** (Microsoft SDL) — introduced as familiar ground for security-literate students, reframed in agent terms.
- **Principle of least privilege** — foreshadowed in the "scope" mitigation, fully named in the lecture.
- **Residual risk** (ISO 31000 / NIST) — named plainly, no bureaucratic overhead.
- **Non-determinism as a design property, not a bug** — the practitioner framing of LLM behaviour that M5 and M6 carry forward.

**Prerequisites:**
- Modules 1–3 completed; training directory populated with memory/, sources/, agents/, module-1..3/.
- `module-4-skills.zip` downloaded from the training site (or available at session start).
- No connector changes since Module 3.

**Capability notes (confirmed, no check owed):**
- Skills are a current Claude Code primitive; a folder with `SKILL.md` at `skills/<name>/` is picked up without configuration. Drop-in flow identical to Module 2's sources pattern.
- Skill invocation via plain-language prompting ("apply the X skill to Y") is the standard pattern — no slash command required.

**Capability checks owed (before first delivery):**
- Verify (via `claude-code-guide`) whether current Claude Code surfaces a visible indicator when a skill loads (e.g., a "Skill: company-ai-policy" marker in the transcript). If yes, add one line to the exercise about what the student will see. If no, skip; the skill still runs, just invisibly.
- Verify the current Anthropic skills doc URL and link it in one place (or instruct the student where to search). Avoid copying doc content — link and let docs stay current.

**Watch-fors:**
- A security-literate student reads Section 2 and pushes back ("STRIDE still works"). They're right — the point isn't that STRIDE is obsolete, it's that the categories have to be re-interpreted. Coach in Module 4 Connections: *"What about agent systems makes your existing discipline partially apply, and where does it break?"*
- A non-technical student reads Section 2 and retreats to "this is someone else's job." Coach: *"The skill is about to do the threat modelling for you. Your job is to read its report with judgment — and judgment is business judgment, not technical."*
- A student asks to see the `SKILL.md` content for the two Module 4 skills before class. Fine to share — reading the skill's rules is different from running the skill against their system. Won't spoil the exercise.

**Why two prework reads, not one:**
- The *skills* piece is mechanism. The *security* piece is mental model. Combined into one read, the mental-model shift gets lost under the mechanism. Separated, each lands.
- Both are short — 25–35 min total is under Module 3's 30–40 min prework, honouring the "no prework cliff" rule. Module 4 is a high-content day; prework should leave the student rested, not depleted.

**Deferred per student-facing-first rule:**
- Facilitator notes: Module 4 opening Connections can start with *"What's one expertise you'd want your agent to borrow?"* as a warm entry into the skills frame.
- Variant note: for the Mid-Management training, replace Section 2's STRIDE-adaptation detail with a higher-level framing on "why your CISO can't answer this for you" — the mental-model shift is what matters, not the category mapping.
