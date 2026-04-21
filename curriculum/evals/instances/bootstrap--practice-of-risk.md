# Eval Instance — Bootstrap / Practice of risk lecture

Filled-in instance of `curriculum/evals/lecture.md` for the Module 4 (Security) in-room lecture.

**Target lecture file:** `curriculum/lectures/practice-of-risk.md`

**Eval runs:**
- 2026-04-19 (pass 1) — **APPROVE.** All 9 judges pass; no auto-fail red flags. Word count ~770 (within prework-reading band, above demo-script band — acceptable for an 8–10 min in-room delivery with conceptual density). Three contributory sharpenings noted but none required: (a) the "three places the story breaks" enumeration could compress by ~80 words in a future pass if space is needed; (b) UK spelling "apologise" used once — confirm curriculum convention; (c) the closing imperative stack could forward-reference M5 explicitly rather than leaving that entirely to the Bridge.
- Judge's overall: *"This is the lecture doing exactly what the mood contract demands — it deepens the unease rather than rescuing it, hands the student a loop and a vocabulary instead of false certainty, and slips the Rory reframe ('don't open the door') in where every other security training would have sold a tool."*

---

## The judges

### Primary — the leap test

After reading (hearing) this lecture, a builder leader can:

- **Explain in one sentence why agent security is not the same discipline as software security** — naming at least two of: non-determinism, instruction-set attacks, emergent capability. Without reaching for jargon.
- **Name the four-step loop** — assess, mitigate, reassess residual, decide — and point at one agent in their own work where they'd run it on Monday.
- **Choose an agentic mitigation (scope / split / filter / gate / review) over a firewall-shaped mitigation** for a specific risk in their own system, and articulate why.

If an SVP walks out able to do these three things and says *"I know what the practice is now, even though I still don't have certainty"*, it's good enough.

### Framing fidelity

Leads with the module's Big Idea: **You can't tell if your agent is safe by looking at its output. You need a way to check — and the practice is running the check, not waiting for certainty.**

Avoids:
- **"Security is solved by technology"** — the firewall-shaped mental model that doesn't survive non-determinism.
- **"Agents are fine if you just follow prompt-injection best practices"** — narrow technical framing that misses the business-risk shape.
- **"There's a right answer to how much risk to accept"** — this is a business decision; the lecture names the distinction.
- **"Certainty is achievable with enough rigor"** — the central anti-framing; the whole lecture contradicts it.

### Learning goal fit

The lecture enables these Bloom-tagged LGs from `trainings/bootstrap/security.md`:
- **Analyze** a working agent system against company policy rules and agent-specific risks using two pre-made skills
- **Distinguish** compliant / violating / "I can't tell" for each rule — and recognise that "I can't tell" is a real answer, not a failure
- **Apply** an agentic mitigation (scope, split, filter, review, gate) to a specific risk and observe the residual shift
- **Evaluate** residual risk plainly — what's left after mitigation, and whether the best move is to not open the door in the first place

Enables, does not achieve. The lecture gives the mental model and the loop vocabulary; the exercise runs the loop.

### Module-to-module arc

Picks up from **Module 3 (Multi-Agent Systems)** — *"you just built something that works across three systems. Which means it just gained access to three systems. What's the worst thing it could do with that?"* The lecture opens with the feeling that question left behind ("would you bet your job on it being safe?") and reframes it as the plain condition of the work.

Hands off to **Module 5 (Output Quality)** via the Bridge — the agent is scoped, the residual is named, but the output *inside* the scope has its own trust problem. M5 picks up fabrication and hallucination as the next layer.

### Exercise setup

Primes **Audit your agent** (the in-room exercise) without giving away discoveries:
- The lecture names the loop but does NOT run it. The student runs it in the exercise.
- The lecture names the two skills as concepts (expertise-injection) but does NOT reveal what the reports look like.
- The lecture names agentic mitigation shapes (scope, split, filter, gate, review) — the student picks one in the exercise.
- The "don't open the door" beat primes the Close's scoping-rule artifact without pre-writing it.

The student arrives primed for the loop but has not yet seen their own policy report or security report. The discovery happens in the exercise.

### Voice

Second person throughout. Builder, direct. Seth-warmth in the opening ("that specific, uncomfortable feeling is the most honest thing in the room"). Rory-reframe in the "best mitigation is the one you don't need" beat. Risto-honesty in the "some of your agents will be wrong, and that's true everywhere" paragraph. No consultant-speak. No LLM-tell words (no "honestly", "delve", "landscape" as verb, "importantly", "crucial").

### Business-audience language

Student-facing body audit:
- `non-determinism` — earned inline ("same prompt, same files, same tools — different run, different answer").
- `STRIDE` — named but not required to understand the lecture. The skill runs it; the student reads the report.
- `agent-STRIDE` — named as an extension, not a prerequisite.
- `residual risk` — earned inline ("after the mitigation, the risk isn't gone. Something remains").
- `agentic mitigation` — five shapes named plainly (scope, split, filter, gate, review).
- Banned words check: `embeddings`, `vector`, `RAG`, `retrieval` (tech sense), `pipeline` (tech sense), `orchestration`, `schema`, `architecture`, `subagent`, `frontmatter`, `prompt engineering`, `inference` (tech sense), `fine-tuning` — none appear in student-facing body.
- `capability emerges from composition` — technical-sounding but plain; earned by three sentences of example.

### Length

Target: **350–600 words (demo-script)** or **800–1200 words (prework-reading)**. Current: ~850 words. Above demo-script target; within prework-reading target. Delivered in-room (8–10 min), so it sits between the two formats. Acceptable because (a) the "three places the story breaks" enumeration is load-bearing for security-literate students, (b) the reframe beats ("don't open the door", "some agents will be wrong") need space to land. Flagged as contributory-judge TODO; could tighten to ~600 by compressing the "three places" section but risks losing the security-literate audience.

### Specificity

- Named frameworks: STRIDE, ISO 31000 / NIST residual-risk, principle of least privilege (implicit in "don't open the door").
- Named mitigation shapes: scope, split, filter, gate, review — five specific options, not abstract categories.
- Named artifact-to-come: `company-ai-policy` skill, `agent-security` skill — student recognises them by name in the exercise.
- Named module linkage: *"tomorrow you'll recognise the shape when it shows up in the next agent you build"* — puts the loop in the student's future work, not in abstract principle.
- Avoided: no "organisations often…" / "many teams…" / "in practice, you might…" — all framing is direct.

---

## Auto-fail red flags check

- **Violates framing fidelity** — NO; the lecture's main frame IS the opposite of "certainty is achievable."
- **Any LLM-tell word** — audit: `honest` appears (but as an adjective meaning truthful, not the LLM-tell pattern "honestly, I think…"); `honestly` does not appear; `delve` — no; `landscape` verb — no; `importantly` — no; `crucial` — no.
- **Pre-empts an exercise** — NO; the loop is named as a practice the student will run, not modelled through their own system.
- **Arc break** — NO; explicit pickup from M3 ("you built something that works") and handoff to M5 (Bridge in the module file).
- **Over 1500 words** — NO (~850).
- **First person / third person** — NO (second person throughout).
- **`---` YAML frontmatter** — NO.
- **More than one H1** — NO.
- **Unearned tech jargon** — NO; all technical terms are either earned inline or in prework.

---

## LLM-as-judge prompt

See the prompt at the bottom of `curriculum/evals/lecture.md`. Paste this instance's `## The judges` section + the target lecture file into the `[PASTE]` blocks.
