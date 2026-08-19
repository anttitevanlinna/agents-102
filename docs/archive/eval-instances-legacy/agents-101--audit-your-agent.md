# Eval Instance — Agents 101 / Audit your agent exercise

Filled-in instance of `curriculum/evals/exercise.md` for the Module 4 (Security) exercise.

**Target exercise file:** `curriculum/exercises/audit-your-agent.md`

**Eval runs:**
- 2026-04-19 (pass 1) — **APPROVE WITH TODOs.** 15/16 judges pass; Length fails softly (~1,050 words vs. 400–700 target — three inline prompts drive it; same shape and verdict as Module 2 and Module 3 exercises). No auto-fail red flags. Pass-1 patch applied: Phase 3 risk-selection coaching sharpened — added *"If you're tempted by the smallest one on the list, pick the one above it"* — to lift the "student picks easiest risk" failure mode from known-watch-for to structural nudge.
- Judge's overall: *"Strong exercise — three forced artifacts, plain residual, the skill-as-expert teaching moment is engineered into the structure rather than asserted; length and the unverified skill-invocation behaviour are the only loose ends, and both are knowable in advance."*

**Open before first delivery (blocking):**
- **Capability check — skill drop-in + invocation phrasing.** The exercise depends on `module-4-skills.zip` dropping skills that auto-invoke via *"Apply the X skill to Y."* If invocation phrasing is unreliable in current Claude Code, the room dies in Phase 1. Run `claude-code-guide` before first delivery and pre-bake a `/skill use ...` fallback into the prompts if plain-language invocation is not reliable. This is a pre-flight blocker, not a post-hoc polish.

**Simulations:**
- 2026-04-19 (pass 1) — SVP-Marketing persona (Anneli Rantanen, Nordic observability-SaaS, challenge: Datadog/Grafana late-stage deal loss). **"This is me" rating: 8/10** on the combined artifacts (policy-report + security-report + residual). **Mood landed on target** — epistemic humility, not shame or complacency; the PII-discovery → mitigation → residual arc felt like the "practice beats proof" move from the lecture, lived. The Close's "doors I'd rather not open" line reads as authority, not exercise compliance. Arc flow: strong — Phase 2 confirms Phase 1 from a different lens (PII appears in both reports), overlap is the teaching; Phase 3 reveals mitigation reduces but doesn't eliminate; Close converts unease into kept rule.

**Simulation-surfaced patches applied (pass 1):**
- **Phase 3 diff-and-apply compression.** Original prompt said *"show me the diff in plain English before you make any changes. I'll confirm"* — simulation predicted Claude often previews AND applies in one turn. Patched: *"DO NOT make any changes yet. Describe the diff in plain English first and stop. Wait for me to type 'apply' before you touch a file."* Harder stop language.
- **Phase 3 "re-run the specific check" precision claim.** Skills don't expose individually-addressable checks; Claude will either re-run the whole audit or improvise a sub-check. Patched: *"re-run the check the skill performed for this specific risk (re-apply the relevant part of the skill, not the whole audit)"* — acknowledges the granularity Claude actually has.

**Simulation-surfaced TODOs — still open after pass 1:**
- **Phase 1 report depth variance.** Students with thin Module 3 systems (or customers using the Nordic-baseline default skill instead of a custom `company-ai-policy`) will get 3–4 rows of mostly "I can't tell" and read it as the exercise being broken. Watch-for already named in facilitator notes; accept as a coaching-layer fix rather than body-copy fix. Thin report = thin system; that IS data.
- **"Read the memory and agent files properly — don't skim" is aspirational.** Directed at the LLM's politeness; no way for the student to verify Claude complied. Accept — the alternative (asking the student to audit Claude's file reads) violates the "no manual error-catching" rule.
- **STRIDE rankings feel arbitrary to non-security students.** Skill ranks for them; "skill as oracle" watch-for seeds the doubt in debrief. Structural fix would be asking the skill to show its ranking reasoning, but that moves the exercise from 45 min toward 60 min. Accept; debrief handles it.

---

## The judges

### Primary — the leap test

After completing this exercise, the participant can:
- **Produce a policy-compliance report and a security report on their own agent system** — two files in their working directory, each grounded in the student's actual memory/sources/agents content, with plain "I can't tell" rows where evidence is thin.
- **Apply one agentic mitigation and articulate the residual** — the student picks a risk, watches a mitigation land (scope / split / filter / gate / review), re-runs the check, and writes a paragraph naming what's still true after the fix.
- **Name one door they'd rather not open** — a scoping rule written from their own judgment, not prescribed by the skill. They can explain why avoidance beats reduction for that specific risk.

If a builder leader walks out with `module-4/policy-report.md`, `module-4/security-report.md`, and `module-4/residual.md` (with both a residual paragraph and a "doors I'd rather not open" rule), and can say *"this is the practice, and I'd run it again on Monday"* — it's good enough.

### Framing fidelity

Leads with the module's Big Idea: **You can't tell if your agent is safe by looking at its output. You need a way to check — and the practice is running the check, not waiting for certainty.**

Avoids:
- **Framing the audit as a "test you pass or fail"** — explicitly reframed in the body ("the goal isn't a clean bill of health").
- **Framing the skills as oracles** — the student reads reports with judgment; watch-for in maintainer notes calls out the oracle risk.
- **Framing "I can't tell" as an error** — explicitly named as "a better answer than a confident guess."
- **Framing the residual as a failure** — explicitly named as the artifact, not the shame.

### Learning goal fit

Enables these LGs from `trainings/agents-101/security.md`:
- **Analyze** a working agent system against company policy rules and agent-specific risks using two pre-made skills — Phase 1 and Phase 2.
- **Distinguish** compliant / violating / "I can't tell" — Phase 1 output requires this classification explicitly.
- **Apply** an agentic mitigation (scope, split, filter, review, gate) — Phase 3.
- **Evaluate** residual risk plainly — Phase 3's residual paragraph + Close's scoping rule.

### Module-to-module arc

Picks up from **Module 3's "Three retrievers, three minds"** — the student's Module 3 system is the target. The memory, sources, agents, and `module-3/retrievals/` and `module-3/stances/` are all inputs to the audit. The system the student built by hand is now being read back to them by two experts.

Hands off to **Module 5 (Output Quality and Hallucination Control)** — the agent is scoped, the residual is named. The next question (the one M5 carries): can you trust what the agent says *inside* the scope? The homework micro-skill extraction also seeds M5's prework.

### The teaching moment lands

The exercise is designed to reliably produce these ahas:
- **"The skill found things I didn't think of."** The `agent-security` skill running agent-STRIDE surfaces risk categories the student hasn't encountered. Expertise injection as an experience, not a claim.
- **"'I can't tell' is most of the rows."** Plain variance in the policy report. Matches the mood contract (epistemic humility).
- **"The mitigation reduced, didn't eliminate."** Phase 3 re-check shows a shifted residual, not a clean pass. Earned, not told.
- **"I'd rather just not open that door."** The Close makes this concrete; the student writes a scoping rule from their own judgment.
- **"The loop is portable."** Stated at the end; the student's recognition that this move works on every agent they build.

Plan mode protection: the exercise forces artifact production (three files), forces plain classification (the "I can't tell" scaffold), and forces residual naming (Phase 3 prompt explicitly asks for what's still true). A student can't run the exercise without producing the teaching artifacts.

### Failure modes named

- **Skill doesn't invoke.** Facilitator pre-runs reports on the facilitator's own system; if Phase 0 fails, students read the facilitator's reports as worked examples and run Phase 3 against them. Pedagogy survives.
- **Student reclassifies "I can't tell" as clear.** Coach: *"push back on Claude — 'what evidence would you need to decide?' — and accept the plain state."*
- **Shame spiral on a violating row.** Coach the room: *"The variance across the room is the teaching. No one got a clean report."*
- **Over-mitigation.** Student tries to mitigate three risks in one go. Coach: *"one loop, one risk. The rest is homework."*
- **Thin Module 3 system.** Some students' memorys/sources are thin; their reports will be thin. Finding, not fail.
- **Student picks easiest risk.** The exercise nudges toward "the one that teaches you the most" but doesn't enforce. Facilitator coaches if the pick is trivially easy.

### Time-boxed

**Target: 45 minutes.** Phase 0 ~3, Phase 1 ~12, Phase 2 ~12, Phase 3 ~12, Close ~6. Above the standard 20–30 min target because two pre-built skills run sequentially and each report needs real reading. Compression risk: Phase 3 under 8 min = student ran the mitigation without reading the residual; Close under 3 min = skipped the "doors I'd rather not open" artifact. Expansion risk: over 55 = stuck on a specific risk; facilitator redirects.

### Facilitator briefing complete

**Deferred per student-facing-first principle.** Trailing metadata in the exercise file lists watch-fors, decision points, customer-prep scope, and three capability checks owed before delivery. Facilitator-notes pass will promote these to a real briefing artifact.

### Riffs on a recognized framework

- **STRIDE** (Microsoft SDL) — embedded in the `agent-security` skill; agent-adapted. Named in Phase 2.
- **Principle of least privilege** — operationalised in Phase 3 (access-control analysis) and in the Close's "doors I'd rather not open."
- **Residual risk** (ISO 31000 / NIST) — central artifact.
- **Assess → mitigate → reassess → decide** — classical risk loop, mapped to the three phases.
- **Roger Martin's *what would have to be true*** — surfaces in the "I can't tell" column's "what evidence would you need?" pushback.

Integrated, not decorative. Five frameworks, three named in student-facing body (STRIDE, residual risk, the loop itself).

### Scaffold / worked example provided

Participants have not run a policy audit or an agent-STRIDE analysis before. The exercise provides:
- **Two pre-built skills** in `module-4-skills.zip` — the `company-ai-policy` skill (per-customer, built by Antti) and the `agent-security` skill (generic, ships with training). Student unzips and invokes; doesn't build from scratch.
- **Three complete copy-paste prompts** — one per phase. No mid-prompt placeholders; the student names the risk in Phase 3 in the prompt itself.
- **File-path shapes embedded in prompts** — `module-4/policy-report.md`, `module-4/security-report.md`, `module-4/residual.md`. No path invention.
- **Report structure specified** — each phase's prompt spells out the expected report shape (rule / verdict / evidence / etc.).
- **Mitigation menu named** — scope, split, filter, gate, review. Student picks; doesn't invent.
- **The Module 3 state is the starting scaffold** — nothing fresh-out-of-zip other than the two skills.

### Prompt design

Every prompt is a complete copy-paste block:
- **Phase 1 (policy audit):** direct prompt with clear output structure. ~150 words. No placeholders.
- **Phase 2 (security audit):** direct prompt specifying two passes and ranking criteria. ~180 words. No placeholders.
- **Phase 3 (mitigation):** direct prompt that includes a participant-authored sentence inside the prompt — *"I'm picking this risk to mitigate: [one sentence, in your own words]."* This is a legitimate participant-edit (writing their own risk in their voice), NOT a find-and-replace placeholder. The rest of the prompt is static.

All three paragraph-structured. Longest (Phase 2) ~180 words, well under ~1-page ceiling. No wall-of-text.

**Note on the Phase 3 participant-edit:** the "[one sentence, in your own words]" is not a bracketed placeholder in the banned sense. The prompt explicitly asks the participant to write in their own words — the bracket is an instruction to write freshly, not a find-and-replace token. Pattern matches Module 3's acceptable participant-edit (Phase 0 question written freshly).

### Plug points real

- **The `company-ai-policy` skill** — per-customer, pre-built from actual policies. Nordic-baseline default for demo/thin cases.
- **The student's Module 3 system** — memory, sources, agents, module-3 artifacts. Their actual work.
- **The student's chosen risk** — Phase 3, participant-picked.
- **The student's residual paragraph** — Phase 3, participant-written.
- **The student's "door I'd rather not open"** — Close, participant-authored scoping rule.

Nothing pre-built for any specific participant beyond the customer-level `company-ai-policy` skill (which is designed per-customer, not per-participant).

### Business-audience language

Student-facing body audit:
- `skills` — earned in prework + Phase 0 ("a folder with SKILL.md inside").
- `policy audit` — plain English.
- `STRIDE` — named in Phase 2; the skill runs it, student reads the report. Not required to understand the acronym.
- `agent-STRIDE` — named as extension. Explicit callback to prework's Section 2.
- `access-control analysis` — plain English, explained inline.
- `agentic mitigation` — five shapes named plainly.
- `residual` — earned in Phase 3 ("what's still true after the fix").
- Banned words check: `embeddings`, `vector`, `RAG`, `retrieval` (tech sense), `pipeline` (tech sense), `orchestration`, `schema`, `architecture`, `subagent` (appears in maintainer notes only, not body), `frontmatter`, `prompt engineering`, `inference`, `fine-tuning` — none appear in student-facing body.

### Voice

Second person, builder, Seth × Rory × Risto. Opening: *"Two skills. Two reports. One mitigation. The goal isn't a clean bill of health."* Rory-reframe in Close: *"The best mitigation is the one you didn't need."* Risto-honesty in Phase 3: *"The risk didn't go away. That's expected."* No consultant-speak. No LLM-tell words in body.

### Length

**Target: 400–700 words.** Current student-facing body: ~1050 words. Above target — three inline prompts drive it, same shape as M2 and M3 exercises (both ran ~900 and shipped APPROVE WITH TODOs on length). Expect APPROVE WITH TODOs verdict here. Prompts earn their keep (each phase has a full copy-paste block). Contributory-judge TODO; not a block.

### Specificity

- Named mitigation shapes (scope / split / filter / gate / review).
- Named file paths (`module-4/policy-report.md`, `module-4/security-report.md`, `module-4/residual.md`, `skills/company-ai-policy/SKILL.md`, `skills/agent-security/SKILL.md`).
- Named zip file (`module-4-skills.zip`) with specific internal structure shown.
- Named Module 3 artifacts as inputs (`memory/`, `sources/`, `agents/`, `CLAUDE.md`, `module-3/retrievals/`, `module-3/stances/`).
- Named classification values ("compliant / violating / 'I can't tell'").
- Named risk-ranking method (severity × likelihood, three-tier).
- Named agentic mitigation types (five specific options).

---

## Auto-fail red flags check

- Framed as "test" or "validation check" — NO; explicitly reframed ("the goal isn't a clean bill of health").
- Participant's artifact pre-built — NO (other than the pre-built skills, which are the explicit design per module meta).
- No time estimate — 45 min named.
- LLM-tell word — audit: `honest` (as adjective, fine), `honestly` (no), `delve` (no), `landscape` verb (no), `importantly` (no), `crucial` (no). Clean.
- Toy data instead of own initiative — NO; student's Module 3 system is the target.
- Could run without teaching moment — NO; three artifacts forced (policy report, security report, residual with scoping rule).
- Unfamiliar artifact from thin air — NO; two pre-built skills + three complete prompts + named file paths + named mitigation menu.
- Mid-prompt `[BRACKET]` placeholder — NO (Phase 3's "[one sentence, in your own words]" is a legitimate participant-edit prompt, same pattern as M3's Phase 0 question authoring).
- More than one H1 — NO.
- `---` YAML frontmatter — NO.
- Unearned tech jargon — NO.

---

## LLM-as-judge prompt

See the prompt at the bottom of `curriculum/evals/exercise.md`. Paste this instance's `## The judges` section + the target exercise file into the `[PASTE]` blocks.
