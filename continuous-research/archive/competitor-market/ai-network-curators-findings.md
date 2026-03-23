# AI Network/Curator Models in the AI Agents Space — Findings

**Track**: Stress-test — Is anyone building a peer network + curated practices model for AI agent deployment?

---

## OBSERVE

Searched for any organization combining (a) a peer network of companies, (b) curated/distilled deployment practices from member experience, (c) training or community as entry point, specifically in the AI agents or AI deployment space. Found six categories of partial matches. Detailed in ai-network-curators-resources.md.

**Summary of what exists:**

| Organization | Peer Network? | Practice Curation? | Training Entry? | Agent-Specific? | Match Level |
|---|---|---|---|---|---|
| AAIF (Linux Foundation) | No (standards body) | Protocols only | No | Yes (protocols) | LOW |
| LangChain | No (developer community) | Survey reports only | No | Yes (tooling) | LOW-MEDIUM |
| Partnership on AI | Loose (100+ members) | Ethics guidelines only | No | Broadly AI | LOW |
| AI Alliance | Loose (100+ members) | Open-source advocacy | No | Broadly AI | LOW |
| Consultancies (KPMG etc.) | Client roundtables | Yes, but proprietary | No | Broadly AI | LOW-MEDIUM |
| Gartner/Forrester | Forum, not collaborative | Analyst-driven | No | Broadly AI | LOW-MEDIUM |

No organization scores above LOW-MEDIUM on proximity to the Agents 102 model.

---

## ORIENT

### Is anyone doing this? Honest assessment.

**No. Nobody is doing this combination in the AI/agents space.**

Here is why that conclusion is robust, not just a search gap:

1. **The standards layer is occupied; the practice layer is empty.** AAIF, AI Alliance, and Partnership on AI all exist, but they operate at the protocol/policy/ethics layer. None of them curate *how companies actually deploy agents* — the organizational, operational, and change management practices. The distinction matters: knowing that MCP exists as a protocol tells you nothing about how to reorganize your customer service team to work with an AI agent. That operational layer — the "how" of deployment — has no curator.

2. **The developer community is rich; the practitioner network is absent.** LangChain has hundreds of thousands of developers sharing code patterns. But there is no equivalent network where business leaders, product managers, and operations teams share deployment patterns (team structures, change management approaches, measurement frameworks, failure modes, organizational resistance strategies). The developer community solves the technical "how to build" question. Nobody is curating answers to "how to deploy, adopt, and scale within an organization."

3. **Consultancies capture the intelligence but do not share it.** KPMG, Accenture, McKinsey all synthesize deployment practices from client engagements. But that intelligence stays inside the consultancy and is resold as advisory. There is no reciprocal network where member companies both contribute and receive. The consultancy model extracts collective intelligence from clients but does not create collective intelligence among clients. This is the Gartner model (analyst synthesizes from practitioners) — not the IHI model (practitioners co-create with each other, curator facilitates and packages).

4. **The market context explains the gap.** Agent deployment is still early — Gartner predicts 40% of enterprise apps will have agents by end of 2026, up from under 5% in 2025. The "pilot-to-production" gap is described as 2026's central business challenge (fewer than 1 in 4 organizations have scaled agents to production). This means:
   - Most companies are still figuring this out independently
   - There is no established corpus of "what works" to curate yet
   - The companies that HAVE deployed successfully are not yet sharing systematically
   - The market is ripe for someone to create the forum where this sharing happens

5. **The 46% integration challenge is a practice problem, not a technology problem.** 46% of organizations cite integration with existing systems as their primary deployment challenge. 75% prioritize security, compliance, and auditability. These are organizational and process challenges, not code challenges. They are exactly the kind of challenges that benefit from peer learning and curated practices — and exactly the kind of challenges that no one is curating solutions for.

### What about blind spots?

Three places we might be missing something:

1. **Private, invite-only communities.** There could be small, invitation-only groups of AI leaders sharing practices (similar to how early cloud computing had informal CTO networks). These would not appear in web searches. However, even if they exist, they would be informal networks without structured curation — a Vistage-like peer group, not an IHI-like collaborative with practice packs.

2. **Vendor customer communities.** Salesforce Agentforce, Microsoft Copilot Studio, and similar platforms likely have customer communities where deploying organizations share experiences. These are vendor-locked (practices are platform-specific) and vendor-controlled (the intelligence serves the vendor's roadmap). They are not vendor-agnostic practice networks.

3. **Stealth-mode startups.** A venture-backed startup could be building this right now. The AI agents space is heavily funded. However, the specific model — peer network + practice curation + training entry point — is unusual enough that it would not be an obvious VC pitch. Most AI startups build tools, not networks.

### Is the gap genuine?

**Yes, with high confidence.** The gap is genuine for three structural reasons:

1. The market is too early — there is not yet enough deployment experience to curate at scale. Agents 102 would be building the network while the practices are still being discovered. This is actually an advantage: the first mover defines the format.

2. The natural builders of this network (consultancies, analyst firms, standards bodies) are structurally misaligned. Consultancies hoard intelligence. Analyst firms are top-down, not collaborative. Standards bodies work on protocols, not practices. None of them have the incentive or the structure to build a true peer network with curated practices.

3. The IHI/CNCF model has never been applied to AI deployment. Those models exist in healthcare, manufacturing, cloud infrastructure — but not in AI agent deployment. The playbook exists; the application does not.

---

## DECIDE

### Do we need another round?

**One more targeted round would increase confidence, but is not strictly necessary.**

The gap is clear enough to proceed with strategic and operational planning. However, one more round could look at:

1. **Vendor customer communities** — Are Salesforce Trailblazer groups for Agentforce, Microsoft Copilot Studio community forums, or similar vendor communities functioning as de facto practice networks? If so, how good are they, and does vendor lock-in limit their usefulness? This would clarify whether vendor communities are a real competitor or a complementary (and limited) alternative.

2. **AI-focused executive peer networks** — Is there a "Vistage for AI" that did not appear in our search? Search specifically for AI executive peer advisory groups, AI CXO roundtables, or similar intimate networks. This would close the blind spot on private/invite-only communities.

### Confidence level

**8/10 that the gap is genuine.** The 2/10 uncertainty is about private communities and vendor customer networks that would not appear in web search. Even if those exist, they would be partial matches (missing structured curation, missing practice packs, missing the collaborative model mechanics).

---

## ACT

### Strategic implications for Agents 102

1. **The space is genuinely empty.** No one is building a peer network + curated practices model for AI agent deployment. The closest things that exist (AAIF, LangChain, consultancies) operate at different layers and with different structures. Agents 102 would not be competing with an incumbent — it would be creating a new category.

2. **Timing is right but narrow.** The market is at the inflection point: enough companies are deploying agents that peer learning has value, but not so many that the practices are codified and commoditized. In 12-18 months, this window may close as consultancies or platform vendors formalize their own practice frameworks.

3. **First-mover advantage is real here.** In a network model, the first credible network captures the early adopters. Those early adopters generate the practices. The practices attract the next wave. This is a classic network effect — and being first matters more than being best.

4. **The positioning is validated.** Agents 102 is not "yet another AI training program" (many exist) and not "yet another AI standards body" (several exist). It occupies a distinct position: the practice layer between protocol standards (AAIF) and individual training (bootcamps). This position is genuinely unoccupied.

5. **The risk is execution, not competition.** The question is not "will someone else do this" — it is "can we build a credible network fast enough to capture the window." The IHI operational blueprint from the practice-curators research gives us the mechanics. The challenge is recruitment, facilitation quality, and practice pack curation quality.
