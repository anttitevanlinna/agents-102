# Theme B Judges — "Articles are editorially sound"

These judge prompts evaluate whether individual research findings meet the project's editorial standards.

**How to use:** Each judge receives a single finding (or section of a findings file). It scores 1-5 with reasoning. Apply each judge independently.

---

## Judge 1: Source Verifiability

You are evaluating whether every claim in this finding has a traceable, verifiable source.

**Input:** A research finding about an agentic business practice.

**Check for:**
- Does every factual claim have a specific URL?
- Are statistics attributed to a named source WITH a link (not just "Gartner says")?
- Are any claims sourced as "Web search synthesis" or similar vague attribution?
- Could a skeptical reader click through and verify each claim?

**Score 1-5:**
- **5:** Every claim has a specific URL. Primary sources used (company announcements, conference talks, earnings calls).
- **4:** Most claims sourced. 1-2 minor statistics without URLs but attributed to named orgs.
- **3:** Key claims sourced, but multiple supporting statistics lack URLs.
- **2:** The main claim has a source, but most supporting detail is unsourced.
- **1:** No verifiable sources. "Web search synthesis" or no attribution at all.

**Output format:**
```json
{"judge": "source_verifiability", "score": N, "reasoning": "...", "unsourced_claims": ["..."]}
```

---

## Judge 2: Agentic Gate

You are evaluating whether this finding describes a truly agentic system — multi-step autonomous work — or something simpler (chatbot, copilot, dashboard, single LLM prompt).

**Input:** A research finding about an agentic business practice.

**Truly agentic means:**
- The system performs MULTIPLE steps autonomously (not just one LLM call)
- It makes decisions, takes actions, or escalates — not just answers questions
- It integrates with multiple systems or data sources
- A chatbot that answers FAQs is NOT agentic. An AI that processes claims end-to-end (pulls data, validates, decides, escalates) IS agentic.

**Score 1-5:**
- **5:** Clearly multi-step autonomous. Multiple systems involved. Decision-making evident.
- **4:** Likely agentic but description is vague on the autonomy/multi-step nature.
- **3:** Borderline. Could be a sophisticated chatbot or a simple agent.
- **2:** Described as "AI agent" but behavior is really a chatbot or copilot.
- **1:** This is a chatbot, dashboard, or single LLM prompt. Not agentic at all.

**Output format:**
```json
{"judge": "agentic_gate", "score": N, "reasoning": "...", "classification": "agentic|borderline|not_agentic"}
```

---

## Judge 3: Vendor Bias

You are evaluating whether vendor marketing is being presented as evidence, or whether vendor claims are properly labeled and distinguished from practitioner evidence.

**Input:** A research finding about an agentic business practice.

**Vendor bias looks like:**
- "SAP's Joule agent delivers 70% time savings" presented as fact (it's a vendor claim)
- Case study from vendor's website treated as independent evidence
- Platform announcement treated as deployment evidence
- Vendor-curated metrics without independent verification

**Score 1-5:**
- **5:** Clear separation between vendor claims and practitioner evidence. Vendor claims explicitly labeled. Gap between announcement and deployment noted.
- **4:** Mostly clean. Vendor source noted but not prominently labeled.
- **3:** Mix. Some vendor claims blended with practitioner evidence without clear distinction.
- **2:** Vendor marketing language dominates. Claims presented as findings without vendor label.
- **1:** This reads like a vendor press release. No independent evidence at all.

**Output format:**
```json
{"judge": "vendor_bias", "score": N, "reasoning": "...", "vendor_claims_found": ["..."]}
```

---

## Judge 4: Specificity Gate

You are evaluating whether this finding has the required specificity: named company + specific agent practice + measurable outcome.

**Input:** A research finding about an agentic business practice.

**Score 1-5:**
- **5:** Named company + specific agent behavior described in detail + measurable outcome (number, percentage, time saved).
- **4:** Named company + specific behavior, but outcome is qualitative not quantitative.
- **3:** Named company, but agent behavior described vaguely. Outcome unclear.
- **2:** Company named but everything else is generic. "Uses AI agents in operations."
- **1:** No named company, or so vague it could describe any company.

**Output format:**
```json
{"judge": "specificity_gate", "score": N, "reasoning": "..."}
```

---

## Judge 5: Nordic Label Accuracy

You are evaluating whether the Nordic/Global tagging on this finding is precise and honest.

**Input:** A research finding about an agentic business practice, including its origin and Nordic applicability tags.

**Three distinct labels (these are NOT the same thing):**
1. **Nordic-origin deployment** — A Nordic company deploying agents in a Nordic context
2. **Nordic-available platform** — A global platform that Nordic companies CAN use (not the same as a Nordic deployment)
3. **Nordic-relevant pattern** — A global practice whose pattern is transferable to Nordic conditions

**Score 1-5:**
- **5:** Label precisely matches the evidence. A global platform is tagged as "Nordic-available," not "Nordic deployment." Clear about what is and isn't Nordic.
- **4:** Mostly accurate. Minor imprecision in label but the content makes the distinction clear.
- **3:** Label is technically defensible but misleading. A global SaaS platform called "Nordic" because it's available there.
- **2:** Label inflates Nordic-ness. Global company/practice presented as Nordic without justification.
- **1:** Clearly mislabeled. No Nordic connection but tagged as Nordic.

**Output format:**
```json
{"judge": "nordic_label_accuracy", "score": N, "reasoning": "..."}
```
