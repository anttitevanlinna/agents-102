# Content Style Guide — Deploying Agents Articles

## Byline

Every article opens with:

> **Written by Claude Opus. Steered by Antti Tevanlinna.**

This is the identity. Not ghostwritten. Not "AI-assisted." The AI wrote it, a human directed it. Transparent and novel — the medium IS the message (an agent wrote your article about agents).

## Structure (1.5 pages + links)

```
[Byline]

[Title — sharp, specific, 6 months ahead of mainstream]

[Body — 1 page, written by Opus]

[Sources — inline citations + collected at end, scientific-style]

---

[Commentary — 3-5 paragraphs by Antti, signed]
```

### Body (Opus writes — ~600-800 words)

- **One clear thesis.** Not a survey. Not "here are 5 things." One argument, driven to conclusion.
- **Specific > general.** Named companies, numbers, outcomes. Never "many companies are adopting agents."
- **6 months ahead.** We write about what's becoming possible NOW that will hit mainstream in 6 months. Not what already happened. Not what might happen in 3 years.
- **Evidence-grounded.** Every major claim has a citation. Distinguish between convergence (10-20 signals) and single experiments. Vendor claims labeled as such.
- **Practitioner voice, not analyst voice.** Write like a senior architect explaining what they've seen, not like a consultancy selling a framework. No buzzword density. No "leverage" or "synergize" or "paradigm shift."
- **Contrarian when the evidence supports it.** "SAP Joule is vaporware" when the data shows 60% skip it. "85% of autonomous AI SDRs failed" when the evidence converges. Don't hedge when the signal is clear.
- **Short paragraphs.** 2-4 sentences max. LinkedIn and newsletter readers scan.
- **One insight per paragraph.** Don't stack. Let each point breathe.

### Sources (scientific-style)

- **Inline citations** as numbered references: "Agents fail 70% of the time on real-world tasks [1]."
- **Collected at end** in a Sources section with full URLs.
- **Every claim must be clickable.** A CTO who doubts a claim can verify it in 10 seconds.
- **Source quality visible.** Practitioner evidence, vendor claims, analyst predictions — the reader can see what level each source is.

### Source verification gate (before drafting)

**No article goes to draft with unverified sources.** Before writing:
1. Open/fetch every URL that will be cited
2. Classify each using source types from CLAUDE.md
3. **Only sources that understand agents can support findings:** practitioner direct, practitioner analysis, domain trade publications, academic research.
4. **General press (CNBC, Bloomberg, TechCrunch) can only confirm bare facts** ("Goldman announced X") — never "how it works" or "is it real." Journalists don't understand agents.
5. **Level 0 sources (vendor PR, republished PR, vendor case studies, analyst predictions) cannot appear as evidence.** Drop the claim or find a practitioner source.
6. The test: does the author understand the difference between a chatbot and an agent? If not, the source can't evaluate what it's reporting.
7. This is the orchestrator's job, not delegated to the drafting agent.

### Commentary (Antti writes — ~200-300 words)

- **Signed:** "— Antti Tevanlinna" at end
- **Practitioner authority.** Antti is the author of Agents 101 (7 modules: including multi-agent workflows, evals, agents building agents). He has trained 200+ people at F-Secure, Neste, Posti. He is a member of Agentics Helsinki. He is not a journalist who needs interviews — he is a practitioner who builds the thing he writes about.
- **Personal perspective.** Not "the research says" — "In my experience building multi-agent workflows..." or "When I teach evals to non-coders, the first thing that breaks is..."
- **The "so what" for Nordic enterprises.** What does the Opus piece mean for a CTO at a 5,000-person Nordic company?
- **Direct about uncertainty.** "I don't know if X, but here's what I'd bet on."
- **Call to action.** Not salesy. Invite curiosity: "If this resonates, reply to this email" or "Take the readiness check."

## How Articles Get Made

```
Antti builds (Agents 101, training delivery, Agentics Helsinki)
    ↓
Opus curates sources (person-first research, primary evidence)
    ↓
Antti reads the linked sources (stays informed, forms views)
    ↓
Opus drafts body (research-grounded, evidence-cited)
    ↓
Antti writes commentary (practitioner view only he can provide)
```

The research serves double duty: evidence for articles AND curated reading that keeps Antti at the frontier. The linked sources are not just citations — they're Antti's reading list.

## Tone

| Do | Don't |
|----|-------|
| "SAP Joule is vaporware. 60% of customers skip it." | "SAP Joule presents challenges in enterprise adoption." |
| "Gjensidige runs 3 autonomous agents in production." | "Many Nordic companies are exploring AI agents." |
| "We found 15 independent signals confirming this." | "Industry experts agree that..." |
| "Nobody is actually doing this yet." | "This space is still maturing." |
| "Here's what breaks." | "There are some considerations to keep in mind." |

## What "6 months ahead" means

We write at the **chasm-crossing moment** — when something moves from "only innovators can do this" to "your organization can do this." Our reader is early majority. They don't need to know about the innovators' experiments. They need to know: **what just became viable for a real organization, and what's still not ready.**

The timing test: If a mainstream tech publication could write this article today, we're too late. If only a PhD researcher could write it, we're too early. We write what a smart practitioner sees but nobody has synthesized yet.

## Length

- **Body:** ~1000-1200 words (2 pages)
- **Commentary:** ~200-300 words
- **Sources:** 5-15 references
- **Total:** ~2.5 pages + links
- **Reading time:** 5-7 minutes
