# Reading: Before Module 4

**Reading 1. Personal skills.** A skill is a `SKILL.md` plus supporting files (policy text, templates). The `SKILL.md` says what the skill is for, when to use it, and how. The agent loads it when a task matches. In Module 4 you run your policy files raw, package the check with a policy lens and an agent-risk lens, then run it on your Module 2-3 system.

**Reading 2. Agent risk sits on top of normal security.** Network controls, access rights and audit logs still apply. Agents add non-deterministic behaviour, prompt injection (direct, or inside retrieved text) and emergent capability you can only bound. Also watch secrets in context, tool confusion and skill supply-chain.

**Before class:** jot three to five lines on what matters about your company's data, e.g. "Sales never lets unredacted CRM exports leave the building."

<!-- maintainer -->

**Quality:** compendium-audited 2026-08-25 (writing@d3ff749e story@5755beb6 technical@725101ec behavior@725101ec pedagogy@725101ec strategy@725101ec slides@4d9c4af2)
- judges @4d9c4af2: writing PASS, story PASS, technical PASS, behavior PASS, pedagogy PASS, strategy PASS, slides PASS

**Time:** 40 minutes total. 10 on personal skills, 20 on the security shift, 5 on the five-lines prep, 5 on the "borrowed expertise" note.

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

**Source verification:**
- `[checked:2026-08-23 result:OK due:cohort]` https://code.claude.com/docs/en/skills — [vendor docs, capability] personal skill path, supporting-file shape, automatic discovery, and direct invocation. fallback: use the documentation index at https://code.claude.com/docs/llms.txt to locate the current Skills page.
- `[checked:2026-08-23 result:OK due:none]` https://genai.owasp.org/llmrisk/llm01-prompt-injection/ — [technical standard] durable (§2a framework identity): the LLM01 taxonomy's definitions and mitigation families, not a currency claim; entry re-opened 2026-08-23. direct and indirect prompt injection definitions plus scope/filter/gate/review mitigation families. fallback: use the current OWASP GenAI prompt-injection entry.
- `[checked:2026-08-23 result:OK due:none]` https://genai.owasp.org/2025/12/09/owasp-top-10-for-agentic-applications-the-benchmark-for-agentic-security-in-the-age-of-autonomous-ai/ — [technical standard] durable (§2a document identity): the 9 Dec 2025 Top-10's named risk categories, not a currency claim; page re-opened 2026-08-23. agent-specific risk layering, including goal hijack, tool misuse, identity/privilege abuse, and supply-chain vulnerabilities. fallback: use OWASP's current Agentic Applications Top 10 index.

**Runtime rehearsal:** per-runtime authoring/install and loaded-skill cues remain a pre-delivery dry-run owned by the Agents 101 punchlist and M4 run sheet. Do not infer a Cowork click-path from the Claude Code docs.

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
