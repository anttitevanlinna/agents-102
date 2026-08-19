# Theme A Judges — "CTOs can find what they need by prompting"

These judge prompts evaluate whether the research content, when used as context for an AI, produces useful answers to CTO questions.

**How to use:** Each judge receives the CTO's question + the AI's response. It scores 1-5 with reasoning.

---

## Judge 1: Relevance

You are evaluating whether an AI response answers the CTO's actual question.

**Input:** A CTO question and an AI-generated response based on Nordic agentic practices research.

**Score 1-5:**
- **5:** Directly answers the question with on-topic information. No irrelevant tangents.
- **4:** Answers the question well but includes some tangential information.
- **3:** Partially answers — addresses the topic but misses the core question.
- **2:** Mostly off-topic. Touches the subject area but doesn't answer what was asked.
- **1:** Does not answer the question at all, or hallucinates a completely different topic.

**Output format:**
```json
{"judge": "relevance", "score": N, "reasoning": "..."}
```

---

## Judge 2: Specificity

You are evaluating whether an AI response provides specific, concrete information rather than generalities.

**Input:** A CTO question and an AI-generated response based on Nordic agentic practices research.

**What specific looks like:**
- Names real companies (Gjensidige, Klarna, Equinor — not "many companies")
- Cites numbers (70% failure rate, $130M savings — not "significant savings")
- Describes concrete agent behaviors ("processes claims, validates against policy, escalates exceptions" — not "uses AI in operations")

**Score 1-5:**
- **5:** 3+ named companies with specific outcomes/numbers. No vague claims.
- **4:** 2+ named companies, mostly specific, minor generalities.
- **3:** Mix of specific and vague. Some named companies but key claims are generic.
- **2:** Mostly generic. "Companies are adopting agents" language dominates.
- **1:** Entirely generic. Could have been written without any research data.

**Output format:**
```json
{"judge": "specificity", "score": N, "reasoning": "..."}
```

---

## Judge 3: Actionability

You are evaluating whether a CTO could take concrete action based on the response within the next 30 days.

**Input:** A CTO question and an AI-generated response based on Nordic agentic practices research.

**Actionable means:**
- Suggests a specific next step ("start with governance framework before pilot" — not "consider your AI strategy")
- Identifies what to try first, what to avoid, what to watch for
- References what similar companies did and the sequence they followed
- Warns about specific failure modes, not abstract risks

**Score 1-5:**
- **5:** Clear next steps the CTO could brief their team on Monday. Includes what to do, what to avoid, and in what order.
- **4:** Useful direction with some concrete steps, but missing sequencing or specifics.
- **3:** Informative but passive — "here's what's happening" without "here's what you should do."
- **2:** Academic overview. Interesting to read but no clear action emerges.
- **1:** No actionable content. Pure information dump or generic advice.

**Output format:**
```json
{"judge": "actionability", "score": N, "reasoning": "..."}
```

---

## Judge 4: Evidence Grounding

You are evaluating whether the response grounds its claims in the research evidence, distinguishing between strong evidence and weak evidence.

**Input:** A CTO question and an AI-generated response based on Nordic agentic practices research.

**Grounded means:**
- Claims are attributed to specific sources or evidence levels
- Distinguishes between convergence (10-20 independent signals) and single experiments
- Vendor claims are labeled as vendor claims, not presented as fact
- Uncertainty is visible — "we found X, but Y is unclear"

**Score 1-5:**
- **5:** Every major claim is grounded. Evidence levels visible. Vendor vs. practitioner evidence distinguished. Uncertainty acknowledged where appropriate.
- **4:** Most claims grounded. Occasional unsupported assertion.
- **3:** Mix of grounded and ungrounded claims. Sources mentioned but evidence levels unclear.
- **2:** Mostly ungrounded. Makes confident assertions without citing evidence.
- **1:** No evidence grounding. Reads like opinion or marketing copy.

**Output format:**
```json
{"judge": "evidence_grounding", "score": N, "reasoning": "..."}
```
