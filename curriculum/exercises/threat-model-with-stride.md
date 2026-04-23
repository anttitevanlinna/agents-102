# Exercise: Threat-model with STRIDE

**What you do:** Invoke the curated STRIDE skill on the access-surface map you built in the previous exercise. The skill will walk the six STRIDE categories against every surface on your map and produce a threat list. You pick one threat worth hardening against, write the decision as an ADR in your repo's convention, and move on.

**What happens:** STRIDE does the breadth — Spoofing, Tampering, Repudiation, Information disclosure, Denial of service, Elevation of privilege, across every surface. That's a lot of threat entries. You're not going to harden against all of them in 20 minutes and shouldn't try. You make one call, write the ADR, and the decision ships to the repo.

**The point:** Threat modeling is only useful if it produces a decision. STRIDE's value is that it gives you a structured surface to reject most threats against (acceptable risk, out of scope, already mitigated) so the one you decide to harden is defensible. The ADR is the artifact your CISO would actually read.

**Time:** 20 minutes.

---

## Phase 1 — invoke the skill on the mapped surface (~7 min)

**Prompt** *(copy → Claude Code)*

```
Use the stride skill at content/skills/stride/ to threat-model the feature. Read the access surface map I built in the previous exercise at content/m3-working/access-surface.md — that's your input. Run STRIDE against the surfaces on the map (the skill will tell you how it structures the pass).

Produce a threat list in the skill's output format. Save it at content/m3-working/stride-threats.md. Flag which threats the skill thinks are high-severity for this feature; don't decide yet — I'll decide next.
```

*(end of prompt)*

Let it run. The output will have more entries than you want to deal with. That's expected.

## Phase 2 — pick the one (~8 min)

You're going to pick one threat worth hardening against. Not five. One. The move is: name the worst realistic case, then the hardening decision is usually obvious.

**Prompt** *(copy → Claude Code)*

```
I want to pick one threat from the STRIDE list to harden against in this PR. Help me narrow:

Ask me: if this feature caused a security incident next Tuesday, what's the most plausible story? Wait for my answer.

Then: of the threats on the list, which one most closely matches that story? If my answer points at a threat the skill didn't surface, tell me — that's a gap in the map, not a reason to ignore the threat. Name it.

Then: is the hardening decision obvious once we've named the threat, or do I need to see alternatives? If alternatives, name 2–3 and recommend one, with the reason.

One question at a time. Don't assemble into a plan — I want to walk through the reasoning.
```

*(end of prompt)*

Answer each. Don't rush the first question — the "most plausible incident story" is the move that makes STRIDE useful rather than performative.

## Phase 3 — write the ADR (~5 min)

**Prompt** *(copy → Claude Code)*

```
Write an ADR for the hardening decision we just made. Use my repo's ADR convention — check for an existing docs/adr/ folder or whatever the repo uses; if there isn't one, use docs/adr/NNNN-slug.md with a minimal template (Context / Decision / Consequences / Alternatives considered).

Ground each section in what we discussed: the plausible incident story is the Context; the threat we picked and the hardening we chose is the Decision; the Consequences section names what this costs (latency, complexity, operational burden) and what it protects; Alternatives considered names the 2–3 options we didn't pick and one line on why.

Show me the ADR before saving. I'll push back once.
```

*(end of prompt)*

Read it. If the Decision section reads like it was written for a compliance reviewer rather than a future engineer, push back — the ADR should read like one engineer explaining a call to another. Ship.

---

## What this sets up

The next exercise authors a test-strategy skill and invokes it on this feature — which is now security-tested. The hardening decision you just made becomes a test case in the test strategy. The ADR is in the repo. The threats you rejected are documented. Your CISO has something to read.

<!-- maintainer -->

**Meta (trainer):**
- **Time:** 20 minutes (7 / 8 / 5)
- **Primary Bloom's level:** Apply + Evaluate
- **Mood target:** earned trust, deepening. Student leaves with a real call made under named pressure. Watch for: compliance-feeling. Diagnostic: ADR reads like a checklist item. Fix: Nerd makes student name the specific future engineer they'd want this ADR to be useful for.

**Agentic Nerd logic:**
- **P1 skill invocation ambiguity.** Student points the skill at the feature rather than the access-surface map. Nerd: *"the map is the input — STRIDE runs against surfaces the map identified, not raw code."*
- **P2 menu-shopping.** Student picks the easiest-to-harden threat rather than the real one. Nerd: *"name the worst realistic incident first. If your pick doesn't match that story, you're optimising for effort, not for risk."*
- **P2 everything-is-high.** Student wants to harden against three. Nerd: *"which one keeps you awake — or keeps your staff engineer awake on your behalf? That's the one. The others get rejected explicitly in the ADR, which is better than hardening against all of them half-heartedly."*
- **P3 ADR drift toward compliance voice.** Nerd: *"write it for the engineer who takes over this feature in six months. What would they want to know?"*
- **P3 ADR missing Alternatives considered.** Nerd: *"the alternatives ARE the reasoning. Without them, the ADR is an assertion, not a decision."*

**Watch-fors:**
- STRIDE output overwhelms the student. Normal on first pass. The teaching is *reject most*, not *address all*.
- Student argues with a threat the skill surfaced because they'd already thought about it. Good — that IS the team-kit feed. Nerd: *"note it in the ADR's Alternatives considered — 'threat X considered, mitigated by Y which already exists.'"*
- Student says *"STRIDE doesn't really fit this feature."* Might be right (low-risk internal service) or might be avoidance. Nerd: *"name one surface and one STRIDE category — if neither category applies, you're right; if one does, let's pick."*
- ADR home not resolved — sponsor's pre-engagement contract hadn't named one. Default to `docs/adr/` and flag at Debrief.

**Plug points:**
- Student's access surface map (from Ex1) — Phase 1 input
- Sponsor-stated ADR home (from pre-engagement contract) — Phase 3 output path
- Curated STRIDE skill (`content/skills/stride/`) — see Pass 3 skill authorship TODO

**TODO (Pass 3):**
- Write `content/skills/stride/SKILL.md` — Bosser-curated from Kohnfelder & Garg's original memo, sharpened against Shostack's *Threat Modeling: Designing for Security*. Check for forkable practitioner versions in the Claude Code community before authoring from scratch.
- Minimal ADR template if the repo has no convention (`docs/adr/0001-feature-hardening.md` with Context / Decision / Consequences / Alternatives considered).
- Three-persona simulation — mid-competent / opinionated senior (the senior will likely argue STRIDE is dated; good; exercise survives the argument because the authoring move stands) / fast operator.
- Decide `content/m3-working/` scratch convention (shared with Ex1; see Ex1 TODO).
