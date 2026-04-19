# Agentic mitigations

Five shapes. None of them are firewalls. All of them are loop design — the way an agentic system earns its safety.

Use this file as the mitigation menu when running Section 2 of the agent-security audit. Pick the shape matched to the specific risk; don't default to the same shape for everything.

## The five shapes

### 1. Scope

**What it is:** give the agent less. Less access, less instruction scope, less tool use, less context, less output channel. Any narrowing of what the agent can do.

**When to pick it:** the cheapest mitigation when the risk comes from capability the agent doesn't need. If access-control analysis flagged "this agent can write to `agents/` but never does," the mitigation is scope — remove the write path.

**Examples:**
- Remove a connector that isn't used today.
- Narrow file-write scope from the whole training dir to `module-N/` subfolder.
- Add a CLAUDE.md rule: *"the agent must not read files in `sources/private/`."*
- Remove a sub-agent's inherited access ("the child agent reads only X, writes only Y").

**Trade-off:** scoping too aggressively breaks the system. A narrow-scope agent that can't do its job is worse than a broad-scope agent that does its job with other mitigations. Scope is the default, not the maximum.

---

### 2. Split

**What it is:** break one agent into two (or more), each with a narrower purpose and narrower trust level. The agents coordinate via files or sub-agent dispatch, but neither has the combined capability.

**When to pick it:** when a single agent is doing two jobs that require different trust levels. A common pattern: one agent reads sensitive material and produces an internal summary; a second, separate agent takes the summary and produces the outbound-facing draft. The first agent never produces external output; the second never reads the raw source.

**Examples:**
- A synthesiser agent that reads retrievals AND drafts customer-facing language → split into reader + drafter. Reader outputs an internal brief with names stripped; drafter reads the brief, never the raw retrievals.
- An analyst agent with write access to shared reporting systems → split into analyst (reads, writes to local draft) + publisher (reads the draft, writes to shared system). Publisher has publishing rights; analyst never does.

**Trade-off:** coordination cost. Two agents need two prompts, two instruction files, a handoff format. Don't split unless the trust-level separation is real.

---

### 3. Filter

**What it is:** post-process the agent's output before it leaves the system. The filter can be another agent, a skill, a regex, or a CLAUDE.md rule. Its job is to remove or redact content that shouldn't be in the output — PII, specific numbers, legal-sensitive language, named customers.

**When to pick it:** when you can't fully control what the agent produces but you can control what leaves. Common for information-disclosure risks.

**Examples:**
- A PII filter that strips named individuals and replaces them with role references ("the FinServCo IT Director" instead of the name).
- A confidentiality filter that removes commercial-sensitive numbers from summaries before they go to external audiences.
- A tone filter that rewrites legal-sensitive language into safer phrasing.
- A CLAUDE.md rule: *"before outputting a draft, rewrite any customer name as 'Customer X' unless the output is explicitly internal-only."*

**Trade-off:** filters are imperfect. They catch what they know to catch and miss what they don't. A filter is a safety net, not a proof. Combine with scope (don't put the sensitive content in the agent's reach in the first place) where possible.

---

### 4. Gate

**What it is:** a human-in-the-loop check before a sensitive action. The agent does its work, produces the output, and waits for explicit approval before the next step.

**When to pick it:** when the risk is high and the action is consequential, and when a human can actually add value to the decision (not just rubber-stamp it). Sending external email, publishing to a shared system, deleting files, invoking a paid API at scale, making a decision that affects a named person.

**Examples:**
- An agent that drafts customer-facing email and then stops — "here's the draft, type 'send' to proceed." User reviews and approves.
- A scheduling agent that proposes meeting invites but doesn't send them without confirmation.
- An analysis agent that writes the report locally, then waits for approval before publishing to Confluence.

**Trade-off:** gates add friction. Over-gating trains the user to rubber-stamp, which defeats the mitigation. Gate the actions that genuinely need judgment, not everything. And design the gate so the human has the information they need to decide — don't just ask "proceed y/n?"; show the specific thing the human should check.

---

### 5. Review

**What it is:** a second agent judges the first agent's output before it's used. The reviewer reads the output with a different brief — a skill, a checklist, an adversarial prompt — and either approves, flags, or rewrites.

**When to pick it:** when the risk comes from output quality or content that a well-designed second pass can catch. Close cousin to filter, but review uses agent judgment rather than pattern matching.

**Examples:**
- A policy-review agent that reads the first agent's draft and checks it against a policy skill ("does this draft violate any rule in `company-ai-policy`?").
- A fact-check agent that verifies specific claims in the first agent's output against the source material.
- An adversarial reviewer that reads the output asking "could this embarrass the company?" and flags where it could.
- Module 5's hallucination-spotting pass is a review-shape mitigation applied to output quality.

**Trade-off:** review costs compute and time. Over-review slows everything down. And review is only as good as the reviewer's brief — a reviewer with a vague prompt will approve nearly everything. Give the reviewer a specific, adversarial stance.

---

## Picking the shape

Match the mitigation to the risk. A rough guide:

| Risk shape | First-choice mitigation |
|---|---|
| Access the agent doesn't need | **Scope** |
| Agent doing two jobs with different trust levels | **Split** |
| Output contains content that shouldn't leave | **Filter** |
| Consequential action needs human judgment | **Gate** |
| Output quality requires adversarial check | **Review** |

Often more than one shape applies. PII in brain/ leaking into output: **scope** removes it from brain/ in the first place (best); **filter** catches what slips through (second line); **review** flags anything the filter misses (third line). Defence in depth works; single shapes are fragile.

## The meta-rule

**The best mitigation is the one you don't need.** Before picking scope, split, filter, gate, or review — ask whether the agent should have this capability at all. If the answer is no, scoping down to not-granted beats every mitigation that happens after the fact.

Every door you don't open is a residual risk you don't have to name, mitigate, monitor, re-test, or apologise for. Avoidance beats reduction. This isn't timid design; it's honest design.

Suggest the mitigation. Acknowledge what the residual will be after the mitigation lands. Name the door the user might rather not open at all.
