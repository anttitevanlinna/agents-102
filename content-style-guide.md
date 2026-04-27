# Content style guide — "Deploying Agents" articles

Article-surface conventions (byline, structure, length, chasm-crossing rule). Compendium-routed rules apply: research claims → `.claude/rules/research-rules.md` + `memory/check_research_claims.md`; voice + banned words → `memory/check_writing.md` + `memory/check_sales_copy.md`; article-as-CTO-targeted-copy → `memory/check_sales_copy.md`. See `.claude/rules/content-rules.md` for the full surface-to-compendium router.

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
- **6 months ahead.** Write about what's becoming possible NOW that will hit mainstream in 6 months. Not what already happened. Not what might happen in 3 years.
- **Evidence-grounded.** Every major claim has a citation. Distinguish between convergence (10-20 signals) and single experiments. Vendor claims labeled as such.
- **Contrarian when the evidence supports it.** "SAP Joule is vaporware" when the data shows 60% skip it. "85% of autonomous AI SDRs failed" when the evidence converges. Don't hedge when the signal is clear.
- **Short paragraphs.** 2-4 sentences max. LinkedIn and newsletter readers scan.
- **One insight per paragraph.** Don't stack. Let each point breathe.

### Sources (scientific-style)

- **Inline citations** as numbered references: "Agents fail 70% of the time on real-world tasks [1]."
- **Collected at end** in a Sources section with full URLs.
- **Every claim must be clickable.** A CTO who doubts a claim can verify it in 10 seconds.
- **Source quality visible.** Practitioner evidence, vendor claims, analyst predictions — the reader can see what level each source is.

## Source verification

Evidence ladder + source-type labels + freshness rules: see `.claude/rules/research-rules.md` (canonical). For article-specific research-claim checks at ship-time: `memory/check_research_claims.md`.

## Voice and banned words

Voice rules + banned-word list: see `memory/check_writing.md` (writing surface) and `memory/check_sales_copy.md` (CTO-repeatable test). The article voice is practitioner-direct — no analyst register.

### Commentary (Antti writes — ~200-300 words)

- **Signed:** "— Antti Tevanlinna" at end
- **Practitioner authority.** Antti is the author of Agents 101, has trained 200+ people at F-Secure, Neste, Posti, and is a member of Agentics Helsinki. He is not a journalist who needs interviews — he is a practitioner who builds the thing he writes about.
- **Personal perspective.** Not "the research says" — "In my experience building multi-agent workflows..." or "When I teach evals to non-coders, the first thing that breaks is..."
- **The "so what" for Nordic enterprises.** What does the Opus piece mean for a CTO at a 5,000-person Nordic company?
- **Direct about uncertainty.** "I don't know if X, but here's what I'd bet on."
- **Call to action.** Not salesy. Invite curiosity: "If this resonates, reply to this email" or "Take the readiness check."

## How articles get made

Antti builds → Opus curates sources → Antti reads the linked sources → Opus drafts body → Antti writes commentary. The research serves double duty: evidence for articles AND curated reading that keeps Antti at the frontier.

## What "6 months ahead" means

Write at the **chasm-crossing moment** — when something moves from "only innovators can do this" to "your organization can do this." The reader is early majority. They don't need to know about the innovators' experiments. They need to know: **what just became viable for a real organization, and what's still not ready.**

The timing test: If a mainstream tech publication could write this article today, we're too late. If only a PhD researcher could write it, we're too early. Write what a smart practitioner sees but nobody has synthesized yet.

## Length

- **Body:** ~1000-1200 words (2 pages)
- **Commentary:** ~200-300 words
- **Sources:** 5-15 references
- **Total:** ~2.5 pages + links
- **Reading time:** 5-7 minutes
