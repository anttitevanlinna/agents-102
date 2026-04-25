# Security-literate skeptic — Cowork-mode audit

Reading as senior security engineer turned director. STRIDE in my bones, OWASP fluency, suspicious of agent-security framing because most of it is repackaged discipline I've owned for fifteen years. Cowork filter applied — `.rt-code` / `.rt-cli` / `.rt-desktop` content skipped.

---

## 1. `trainings/bootstrap/security.md` (M4 module)

**Sentences I'd argue with:**

> *"Mitigations are agent-shaped. Scope, split, filter, review, gate. Not firewalls. An agentic system earns its safety through loop design, not perimeter."*

This is the rhetorical foil I was watching for. "Not firewalls" is a strawman. A real production agent in a Nordic bank sits behind a WAF, inside a VPC, with egress controls, mTLS to the LLM API, and an IAM-scoped service principal — *and* it has scope/split/filter/gate/review on top. The Key Concept implies perimeter is yesterday's idea. It isn't; it's the floor the agent stands on. Loop design is additive, not substitutive. A CTO who reads this and concludes "I don't need to threat-model the network because we have agentic mitigations" will ship a breach. Reframe as **layered** — agent mitigations are *new* surfaces above classical controls, not a replacement for them.

> *"Certainty is a fantasy; the practice is the answer. Classical software security sells you secure / not secure."*

Classical security has never sold *secure / not secure*. CVSS, residual risk, accepted-risk registers, pen-test reports with findings rated High/Medium/Low — the entire ISO 27001 / NIST CSF apparatus is built on probabilistic, residual-aware reasoning. The line flatters the agent-security framing by inventing a naive opposite. The actual difference (non-deterministic outputs, unbounded inputs, emergent tool use) is real and worth naming — but don't reach it via a caricature of the discipline that owns the residual-risk vocabulary you're borrowing two bullets later.

**Threat-model gaps a CTO would be embarrassed to ship without:**
- **Prompt injection** — not named once in the body. STRIDE-T (tampering) and STRIDE-S (spoofing) both touch it, but a 2026 agent threat model that doesn't name indirect prompt injection by name is incomplete. The plugin the student authors will likely miss it because the prompt won't tell it to look.
- **Secrets in scrollback / context window** — credentials, API keys, customer data persisting in transcripts. Classical DLP territory; agent-shaped variant unaddressed.
- **Supply-chain on the plugin itself** — the student installs a plugin authored by Claude. No mention of who vetted Claude's output, no signing, no review gate before installation.

**Verdict: REVISE.** The TODO at top is honest about Phase 0 timing being broken. Agreed — three minutes for first-time plugin authoring against four fresh policy reads is a fantasy that contradicts the module's own thesis. But the substantive gap is bigger: the threat model the plugin produces will be shallow because the module never names what a competent threat model includes. Owed: prompt-injection callout in Key Concepts; layered-controls reframe of the firewalls bullet; named acknowledgment that classical controls remain the floor.

---

## 2. `exercises/audit-your-agent.md` (M4 exercise)

**Sentences I'd argue with:**

> *"For agent-STRIDE: run the six categories (spoofing, tampering, repudiation, information disclosure, denial of service, elevation of privilege) in their agent-adapted meanings from the skill."*

The skill is the one the student just authored ten minutes ago. The prompt asks Claude to map STRIDE to agent shapes "from the skill" — but the skill's STRIDE content was itself written by Claude in Phase 0 from a generic AGENT-SECURITY lens spec. This is a closed loop: Claude generates the threat-model rubric, then Claude grades against the rubric Claude wrote. The output will look credible — six categories, two risks each, ranked — and a security engineer will recognise it as a checklist masquerading as a threat model. Real threat modelling needs an adversary's imagination; closed-loop self-grading produces taxonomy, not threats.

> *"Claude picks the mitigation shape and walks the diff."*

Letting the agent pick its own mitigation shape against a risk it surfaced and ranked itself is three layers of self-grading stacked. The student's only forcing function is *"steer if a different one fits"* — a student who doesn't know the shapes well enough to push back will accept whatever Claude proposes. The mitigation will land; the residual paragraph will be written; the loop will feel complete. None of it has been pressure-tested by anything that disagrees with Claude.

**Phase 0 prompt audit (paste-test):**

I pasted it mentally. AGENT-SECURITY lens is the one most likely to ship a plausible-but-shallow artifact. Why: POLICY lens is grounded — it has four real files to extract rules from, and a CTO can verify rule-by-rule against the source policy. AGENT-SECURITY is "generic; applies to any agent system" — meaning Claude generates it from its own training data, with no grounding artifact. The output will be six STRIDE categories with confident-sounding agent-adapted descriptions; it will read well; it will miss prompt injection, persistent-context leakage, plugin supply-chain, and tool-confusion attacks because nothing in the prompt forces those onto the surface. The lens will produce the *vocabulary* of threat modelling without its *adversarial pressure*.

**Cowork-filter coherence:** Save-plugin install affordance is in body prose at line 33 (*"Cowork: click Save plugin in the chat"*) — survives the filter. Session-mechanics ("start a new session — plugins load at session start") also survives. No orphaning detected.

**TODO viability:** With surgical fixes only, no. The TODO at line 1 admits Phase 0 timing is broken; the body still says *"Phase 0 ~3"* in the time budget at line 138. A first-cohort student who follows the time budget will skip reading the policy files, accept Claude's first plugin draft, and the rest of the exercise runs on a foundation that wasn't earned. The entire teach depends on Phase 0 being real authoring, not a rubber-stamp.

**Verdict: REVISE.** Ship-blocker is Phase 0 timing per the TODO. Substantive gap: the AGENT-SECURITY lens needs at least one external grounding — a short list of named attack classes the plugin MUST cover (prompt injection, secrets-in-context, tool-confusion, plugin supply-chain) — otherwise the closed-loop self-grading produces a credible-looking artifact a real adversary would walk through.

---

## 3. `trainings/bootstrap/evaluations.md` (M6 module)

**Sentences I'd argue with:**

> *"The judge stays fixed; that's the integrity of the loop. The generator sharpens against feedback the same judge keeps applying."*

> *"What if the judge kept getting better, not because you edited it, but because it watched itself miss things?"*

The Big Idea (judge stays fixed) and the Connections paragraph two sections later (judge keeps getting better) are still in tension. The fix attempted was to make M6 about the *generator* sharpening under a fixed judge — but Connections, Key Concept #4 (*"the eval gets smarter by watching what slipped past… proposing rule changes the meta-agent applies"*), and the Debrief prompt (*"sharpen the judge beyond what the meta-agent reached"*, *"which rule change did the meta-agent get right, which one made the judge worse"*) all describe a judge whose rules are mutating across rounds. Both can't be true. Either the judge is fixed (and the meta-agent edits something else — the generator's prompt, the rubric the meta-agent writes for itself) or the judge mutates and there's no fixed yardstick.

This is the compounded learning #2026-04-25 *eval is a fixed yardstick* applied to the file that teaches evals. If the judge moves, score trajectory across rounds carries no signal — round 5's "better" output is graded against a different ruler than round 1's. A security skeptic reads this and concludes the loop produces the appearance of improvement without the substance.

**Verdict: REVISE.** The Big Idea fix didn't propagate. Either rewrite Connections + Key Concept #4 + Debrief prompt to make the meta-agent edit the *generator-side rubric* (not the judge), or accept that the judge moves and stop claiming integrity from a fixed yardstick. Pick one and propagate it through every paragraph.

---

## 4. `exercises/joint-double-diamond.md` (M8 exercise)

**Sentences I'd argue with:**

> *"Twenty agents (or in self-study, one student's M1–M7 stack plus persona-stand-ins) are about to read each other's memory folders."*

Twenty agents reading twenty other agents' `memory/`, `sources/`, `agents/`, and `module-1/` through `module-7/` outputs is a non-trivial access surface that the exercise treats as ambient infrastructure. In a real Nordic-bank cohort, twenty senior-leader memory folders contain customer names, board-deck excerpts, salary discussions, M&A speculation, partner-NDA material. The exercise's only governance is the citation rule (*"every claim cites the file it came from"*) — which is an integrity control, not a confidentiality control. There is no consent step, no redaction beat, no "what should NOT cross to another participant's agent" rule. M4 spent forty-five minutes teaching residual risk and "doors I'd rather not open"; M8 opens twenty doors at once and doesn't name it.

> *"Cowork-native variant is the future shape; either is acceptable."*

Maintainer-block, but worth flagging: the in-room shape assumes a shared filesystem twenty agents can read each other's folders on. In Cowork there is no shared filesystem — each participant has their own connected folder. The "shared `module-8/`" the prompts repeatedly cite (*"if other participants' context-manifest.md files are reachable in the shared module-8/ folder"*) has no current implementation in the Cowork runtime. The exercise reads as ready; the infrastructure isn't.

**Cowork-filter coherence:** Five-line shape outline (lines 13-19) survives the filter. Phase headers and prompts survive. The in-room/self-study split via blockquote callouts survives. The orphan risk is structural, not surface: the entire in-room flow assumes a shared filesystem the Cowork edition does not provide.

**Verdict: APPROVE-WITH-TODOs.** Two TODOs: (a) cross-participant data-handling rule in the grounding step — at minimum a "before publishing your context-manifest, redact what shouldn't leave your boundary" sentence; (b) Cowork-runtime answer for the shared `module-8/` folder before first cohort, or a clear "in-room runs require Code CLI / Desktop with shared filesystem" caveat in the maintainer block. Self-study path is genuinely fine and ships.

---

## Overall verdict

**Two of four genuinely need deeper reshape before going live.**

- **security.md + audit-your-agent.md (M4):** REVISE. The Phase-0 timing TODO is real and not the only problem. The threat model the plugin produces is closed-loop self-graded; named attack classes (prompt injection at minimum) need to be a forcing function in Phase 0; the *not firewalls* rhetorical foil flattens classical controls in a way an SVP-of-security in the room will catch and lose trust over. Surgical fixes alone will not carry first cohort — needs the dedicated reshape session the maintainer TODO already names, plus a substantive pass on the threat-model substance, not just timing.
- **evaluations.md (M6):** REVISE. The Big Idea fix did not propagate to Connections, Key Concept #4, or the Debrief prompt. The judge-fixed vs. judge-mutating contradiction is still in the file in three places. One more pass to pick a side and propagate it.
- **joint-double-diamond.md (M8):** APPROVE-WITH-TODOs. Cross-participant data-handling rule and Cowork shared-filesystem story owed; self-study path ships as-is.

The four files are not collectively ship-ready for first cohort. M4's reshape is acknowledged. M6's contradiction is the surprise — a Big-Idea rewrite that didn't carry through is exactly the kind of thing the practitioner cringe-scan compendium learning was meant to catch.

WROTE: /Users/anttitevanlinna/Projects/agents-102/analytics/bootstrap-cowork-audit/sim-security-skeptic.md
