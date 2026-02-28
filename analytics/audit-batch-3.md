# Research Audit -- Batch 3 (Cross-cuts: Nordic Enterprise, Vertical SaaS, Chasm Patterns)

**Audit date:** 2026-02-21
**Auditor:** Claude Opus 4.6
**Criteria:** (1) Source traceability, (2) Copyright risk

---

## Source Traceability Issues

### File 1: cross-cut-nordic-enterprise-ai.md

This file profiles 17 Nordic companies. Each profile includes a "Sources" field with URLs. Traceability is generally good but several issues exist.

| Company / Finding | Issue | Severity |
|-------------------|-------|----------|
| **Equinor** -- "$130M saved in 2025" | URLs provided (equinor.com, rigzone.com). Verifiable. | OK |
| **Equinor** -- "2 million km2 seismic data interpreted" | No separate source for this specific figure beyond the general Equinor URL. May be from same press release. | Low |
| **Novo Nordisk** -- "20,000+ employees using Copilot" | Source is klover.ai (third-party analysis site, not primary). Microsoft story link is primary. | Low |
| **Novo Nordisk** -- "Valo Health collaboration" | Not cited to a specific URL. Implied from web search synthesis. | Medium -- no direct URL |
| **Maersk** -- "$300M+ annual savings" | Sources are enkiai.com and debales.ai -- these are third-party AI analysis blogs, not Maersk primary sources. | Medium -- third-party only |
| **Maersk** -- "2 billion+ data points daily from 700+ vessels" | No primary Maersk source. All metrics attributed to third-party blog analysis sites. | Medium |
| **Maersk** -- "85% accuracy predicting equipment failures 3 weeks in advance" | Same third-party source concern. | Medium |
| **IKEA/Ingka** -- "EUR 100M expected annual savings from Locus" | Ingka.com newsroom link provided. Verifiable as primary. | OK |
| **IKEA/Ingka** -- "USD 200M investment in Waabi" | No URL provided for this claim. | Medium -- unlinked claim |
| **Nordea** -- "91% resolution rate (private banking), 95% (corporate)" | boost.ai case study URL provided. Case studies are primary vendor references. | OK |
| **Klarna** -- "AI = 850 agents, 2/3 of all inquiries" | Multiple strong sources (investors.klarna.com, Time, Yahoo Finance). | OK |
| **Scania** -- "300km route (Sodertalje-Jonkoping)" | Scania.com URLs provided but specific route detail may not be at those URLs. | Low |
| **Scania** -- "Knowledge Graph for supply chain AI" | No specific source URL for this claim. | Medium |
| **Ericsson** -- "20%+ reduction in downtime" | Stated as "expected" -- forward-looking claim. Sources are corporate. | Low |
| **Volvo Group** -- "2.5 million eligible Volvos" | Computer Weekly URL provided. Verifiable. | OK |
| **H&M** -- "270-person AI unit" | Sources are ctomagazine.com, digitaldefynd.com, reruption.com -- all third-party analysis blogs. No H&M primary source. | Medium |
| **H&M** -- "30% profit uplift from AI-driven inventory optimization" | Same third-party sources. The 30% figure is a strong claim without primary attribution. | Medium-High |
| **H&M** -- "Q3 2025 operating profit up 40% (SEK 4.91B)" | This should be verifiable from H&M quarterly earnings, but no earnings URL is cited. | Medium -- missing primary |
| **Danske Bank** -- "90% of employees completed GenAI training" | danskebank.com URL provided. Verifiable as primary. | OK |
| **DNB** -- "3,400+ topics across 7 business units" | boost.ai case study URL provided. | OK |
| **DNB** -- "15 full-time AI Trainers for virtual agents" | No specific URL for this figure. | Low-Medium |
| **Telia** -- "SEK 1.2M annual savings" | Sources provided (Telia ACE, Telia-Google Cloud). Not clear which source contains this figure. | Low |
| **Wartsila** -- "400+ business processes automated via RPA" | UiPath case study URL is primary vendor reference. | OK |
| **Wartsila** -- "800-1,000 work hours saved" | Corporate wartsila.com URLs provided. | OK |
| **LKAB** -- "SEK 80M invested in sustainable mining research" | Source is discoveryalert.com.au (Australian third-party mining site). Not primary. | Medium |
| **Neste** -- "EUR 20.6B revenue (2024)" | No URL for this financial figure. Standard public data but uncited. | Low |
| **Kone** -- "54,000 contracts/year processed by AI workflow" | Microsoft case study URL provided. Primary. | OK |
| **Kone** -- "Technician Assistant built on Anthropic Claude (Amazon Bedrock)" | KONE corporate URL provided. | OK |
| **Pattern Analysis section** (lines 435-502) | No additional sources cited. All claims are the researcher's synthesis of the profiles above. | Low -- synthesis is fine, but patterns like "Operations is the universal gateway" are interpretive |

**Summary for File 1:** 17 company profiles, each with 1-3 URLs. Most URLs point to verifiable sources (corporate sites, case studies, tech press). The primary traceability weakness is reliance on third-party AI analysis blogs (enkiai.com, debales.ai, digitaldefynd.com, ctomagazine.com, reruption.com, discoveryalert.com.au) as sole sources for specific metrics, rather than primary company disclosures. Several specific quantitative claims (Maersk $300M, H&M 30% profit uplift, IKEA Waabi $200M investment) lack primary source URLs.

---

### File 2: cross-cut-vertical-saas-agents.md

This file profiles 10 enterprise software platforms. Each profile includes a "Sources" field with URLs.

| Platform / Finding | Issue | Severity |
|--------------------|-------|----------|
| **Salesforce Agentforce** -- "18,500 deals (9,500 paid)" | diginomica.com URL provided. Tech press, verifiable. | OK |
| **Salesforce** -- "~$540M ARR from Agentforce alone" | venturebeat.com URL provided. Verifiable. | OK |
| **Salesforce** -- "Norway Post is a notable enterprise customer (500+ agents)" | No specific URL for Norway Post claim. | Medium |
| **HubSpot Breeze** -- "~228K customers globally" | Not sourced to a URL. Appears in summary table without citation. | Medium |
| **HubSpot** -- "GPT-5 migration underway" | onthefuze.com (third-party blog). | Low |
| **Zendesk** -- "100K+ Zendesk customers" | Not sourced to a URL. Appears in summary table. | Low -- widely known |
| **Zendesk** -- "automate up to 80% of support requests using GPT-5" | zendesk.com newsroom URL provided. | OK |
| **SAP Joule** -- "400,000+ SAP customers globally" | Not cited to a specific URL. Commonly known but uncited. | Low |
| **SAP** -- "~800 employees in Nordic & Baltic unit" | No source URL for this employment figure. | Medium |
| **SAP** -- "Active Norwegian SAP User Group (SBN)" | No source URL. | Low |
| **Microsoft Dynamics 365** -- "24% global ERP share" | No source URL for market share figure. | Medium |
| **Microsoft** -- "400M+ Microsoft 365 users" | No source URL. Commonly cited but uncited here. | Low |
| **Microsoft** -- "Nordomatic (Scandinavia-wide) is a customer story" | No URL provided for this reference. | Low-Medium |
| **Oracle Fusion Cloud** -- "40+ agents in Release 26A" | siliconangle.com URL provided. Tech press. | OK |
| **Oracle** -- "10K+ Fusion Cloud customers" | No source URL. | Low-Medium |
| **Oracle** -- "all pre-built agents at no extra cost" | Oracle official sources provided. | OK |
| **Workday** -- "10,500+ customers globally" | No source URL. | Low-Medium |
| **Workday** -- "55+ Nordic clients via partners" | No source URL. | Medium -- specific claim, no citation |
| **Workday** -- "Planning Agent: 30% reduction in data exploration, ~100 hours/month saved" | prnewswire.com URL provided. Press release is primary. | OK |
| **Workday** -- "Financial Audit Agent saves up to 900 hours/year" | Same press release source. | OK |
| **Workday** -- "Peakon for $700M" | No source URL for acquisition price. Widely reported but uncited. | Low |
| **ServiceNow** -- "8,100+ customers globally" | No source URL. | Low-Medium |
| **ServiceNow** -- "$2.85B Moveworks acquisition" | moveworks.com URL provided. Primary. | OK |
| **ServiceNow** -- "90% autonomous IT resolution, 89% autonomous customer support resolution" | kellton.com (third-party blog) and moveworks.com. The 90%/89% figures appear to be vendor claims. | Low -- vendor claim, attributed |
| **ServiceNow** -- "Sofigate... 250+ clients, 800 employees, EUR 145M revenue" | No source URL for Sofigate figures. | Medium |
| **Thomson Reuters CoCounsel** -- profile | prnewswire.com and legalreader.com URLs. Verifiable. | OK |
| **Relativity aiR** -- "Review up to 85% faster" | relativity.com and prnewswire.com URLs. Primary. | OK |
| **Summary table customer base figures** | Multiple customer base numbers in the table (228K HubSpot, 100K Zendesk, 400K SAP, 10K Oracle, 10,500 Workday, 8,100 ServiceNow, 400M Microsoft) are not individually cited. | Medium -- pattern issue |
| **Nordic Implications section** (lines 312-343) | No additional sources. Synthesis of above profiles. | Low |

**Summary for File 2:** 10 platform profiles, each with 2-4 URLs. Most URLs are verifiable (vendor sites, tech press, press releases). The primary traceability weakness is uncited customer base / market share figures in the summary table and profiles. Several Nordic-specific claims (SAP 800 employees, Sofigate 250+ clients, Workday 55+ Nordic clients, Norway Post 500+ agents) lack source URLs.

---

### File 3: cross-cut-chasm-crossing-patterns.md

This file documents 7 patterns, 5 anti-patterns, a trust gradient framework, and Nordic-specific analysis. It is the most analytically dense of the three files.

| Finding / Claim | Issue | Severity |
|-----------------|-------|----------|
| **Orientation** -- "Gartner predicts over 40% of agentic AI projects will be canceled by end of 2027" | Gartner URL provided in Anti-Pattern 5 evidence. Cross-referenced later. | OK |
| **Orientation** -- "MIT's 2025 review found only 5% of enterprise AI solutions reach production" | Source is c5insight.com (third-party referencing MIT). No direct MIT URL. | Medium |
| **Orientation** -- "Finland becoming the first EU member state with full enforcement powers on January 1, 2026" | tem.fi URL provided in Pattern 4. | OK |
| **Pattern 1** -- "75% of enterprise leaders cite security, compliance, and auditability" | Source attributed to KPMG AI Pulse Survey with URL. | OK |
| **Pattern 1** -- "Only 1 in 5 companies currently has a mature governance model" | Attributed to KPMG/Presidio. URLs provided. | OK |
| **Pattern 2** -- "60% of enterprises restrict agent access to sensitive data without human oversight" | KPMG AI Pulse Survey URL. | OK |
| **Pattern 2** -- "Nearly half employ human-in-the-loop controls for high-risk workflows" | KPMG AI Pulse Survey URL. | OK |
| **Pattern 2** -- "Anthropic's empirical finding that users grant agents more autonomy... from ~20% full auto-approve... to 40%+ after 750 sessions" | Anthropic research URL provided. Primary source. | OK |
| **Pattern 2** -- "Goldman Sachs uses agents for document review and entity extraction" | No specific Goldman Sachs URL. Mentioned as example without citation. | Medium |
| **Pattern 2** -- "Nordic AI Union Summit (March 2026, Oslo)" | No URL for this event. | Medium -- specific event claim, unverifiable |
| **Pattern 3** -- "Framework developed by Feng, McDonald & Zhang (2025), published through Knight First Amendment Institute" | arxiv.org URL provided. Primary academic source. | OK |
| **Pattern 3** -- Bessemer Venture Partners autonomy scale | bvp.com URL provided. Primary. | OK |
| **Pattern 4** -- "Finland's Ministry of Economic Affairs issued guidance (February 2025)" | tem.fi URL provided. | OK |
| **Pattern 4** -- "European Commission proposed a Digital Omnibus package" | No specific URL for Digital Omnibus proposal. | Low-Medium |
| **Pattern 4** -- "Over half of organizations lack systematic inventories of AI systems" | No specific source URL for this claim. | Medium |
| **Pattern 4** -- "EY's Nordic survey: 74% of Nordic CxOs believe AI controls are moderate to strong... 3 out of 9 responsible AI facets" | EY URL provided (ey.com/en_fi). | OK |
| **Pattern 5** -- "KPMG became the first Big Four international entity to achieve ISO 42001 certification (December 2025)" | kpmg.com URL provided. Primary. | OK |
| **Pattern 5** -- "Microsoft now requires ISO 42001 for AI vendors under DPR v10" | No specific URL for this Microsoft requirement. | Medium |
| **Pattern 5** -- "Air Canada chatbot case (February 2024)" | americanbar.org URL provided in Anti-Pattern 4. | OK |
| **Pattern 6** -- "Gartner reported a 1,445% surge in multi-agent system inquiries" | Gartner URL provided. | OK |
| **Pattern 6** -- "KPMG Workbench (audit), Deloitte Zora AI (finance), HPE Alfred" | No specific URLs for these individual product claims. | Medium |
| **Pattern 7** -- "Gartner predicts 40% of enterprise apps" | Gartner URL provided. | OK |
| **Anti-Pattern 1 (Klarna Trap)** -- CEO Sebastian Siemiatkowski quote: "cost unfortunately seems to have been a too predominant evaluation factor" | fortune.com URL provided. Verifiable. | OK -- see copyright section |
| **Anti-Pattern 1** -- "Goldman Sachs deliberately frames... 'efficiency gains' not 'job cuts'" | No specific Goldman Sachs URL. | Medium |
| **Anti-Pattern 1** -- "HPE positions Alfred as freeing finance teams" | No specific HPE URL. | Medium |
| **Anti-Pattern 2** -- "Half of executives plan to allocate $10-50 million to secure agentic architectures" | Attributed to Presidio/KPMG URLs. | OK |
| **Anti-Pattern 3** -- "70-85% of all AI project failures stem from data architecture" | Attributed to Gartner but no specific URL for this range. General Gartner URL provided. | Low-Medium |
| **Anti-Pattern 3** -- "48% searchability, 47% reusability" | No specific source URL for these percentages. | Medium |
| **Anti-Pattern 4 (McDonald's)** -- "added 260 chicken nuggets, put bacon on ice cream" | museumoffailure.com URL provided. | OK -- see copyright section |
| **Anti-Pattern 4** -- "program was shut down in July 2024" | Implied from Museum of Failure source. | OK |
| **Anti-Pattern 5** -- "42% of companies abandoned most AI initiatives in 2024, up from 17%" | Attributed to "S&P Global research" but no URL provided. | Medium-High -- specific stat, no link |
| **Anti-Pattern 5** -- "Three-quarters of C-suite executives named AI a top priority while the same proportion said they had yet to see ROI" | No source URL. | Medium |
| **Trust Gradient section** (Part 3) -- "73% of tool calls involve human-in-the-loop" and "Only 0.8% of tool calls are irreversible" | Anthropic research URL provided earlier. | OK |
| **Trust Gradient** -- "HighRadius claims 90% touchless" | No URL for HighRadius claim. | Low-Medium |
| **Nordic section** -- "Only 26% of Nordic CEOs are involved in emerging technology strategy (vs. 49% globally)" | EY URL provided earlier. | OK |
| **Summary Statistics table** (lines 274-290) | Most entries cite a source name but not all have corresponding URLs in the text. "S&P Global" for the 42% figure has no URL anywhere in the document. "Gartner" for "70-85% data architecture" has a general URL but not a specific one for this figure. | Medium |

**Summary for File 3:** This is the most analytically sophisticated file. It has 23 distinct URLs across patterns, anti-patterns, and evidence fields. Most major claims are cited. The primary traceability weaknesses are: (1) Goldman Sachs, HPE, and Deloitte Zora claims used as examples without specific URLs; (2) the S&P Global "42% abandoned" statistic has no URL; (3) some secondary statistics (48% searchability, 47% reusability, "over half lack inventories") are attributed to general sources but lack specific URLs; (4) the Nordic AI Union Summit (March 2026, Oslo) is cited without a verifiable link.

---

## Copyright Risks

### File 1: cross-cut-nordic-enterprise-ai.md

**Direct quotes:** None found. All content is paraphrased factual summary.

**Verbatim passages:** No passages appear to be copied verbatim from source articles. The writing style is consistent throughout (researcher's voice), not patched together from different sources.

**Metrics/statistics:** Properly attributed to companies or sources. Specific numbers (e.g., "$130M", "91% resolution rate", "270-person AI unit") are factual data points, which are not copyrightable.

**Overall assessment:** **Low copyright risk.** The file is structured as an original analytical framework (company profiles + pattern analysis) using publicly available factual data. The pattern analysis section (lines 435-502) is entirely original synthesis. No substantial reproduction of source material detected.

---

### File 2: cross-cut-vertical-saas-agents.md

**Direct quotes:** None found. All content is paraphrased.

**Near-verbatim concern (1):**
- Line 133: The phrase "conversation became the agent-making interface" appears in quotes, suggesting it may be a direct quote from a Microsoft source. **Flag: potential unattributed quote.**

**Verbatim passages:** No passages appear copied from vendor documentation. Feature descriptions are summarized, not reproduced. However, the detailed feature lists for each platform (e.g., Salesforce lines 37-41, SAP lines 104-108) closely track vendor announcement language. This is factual feature reporting and low risk, but worth noting.

**Metrics/statistics:** Customer counts, ARR figures, and market share percentages are factual data, not copyrightable.

**Overall assessment:** **Low copyright risk.** The file is structured as an original comparative analysis. Feature descriptions summarize vendor announcements without reproducing them. The Key Insights section (lines 257-308) and Nordic Implications section (lines 312-343) are entirely original analysis. One near-quote flagged.

---

### File 3: cross-cut-chasm-crossing-patterns.md

**Direct quotes (flagged):**

1. **Line 101 -- Klarna CEO Sebastian Siemiatkowski:** "cost unfortunately seems to have been a too predominant evaluation factor"
   - Attributed to Fortune article. This is a direct quote from a named individual.
   - **Risk: Low.** Short quote, properly attributed, used for factual reporting/analysis. Fair use.

**Near-verbatim concerns:**

2. **Line 129 -- Air Canada chatbot case:** "companies are liable for agent outputs, period. The tribunal rejected Air Canada's argument that the chatbot was a 'separate entity.'"
   - The phrase "separate entity" appears to be a near-quote from the tribunal ruling or ABA article.
   - **Risk: Low.** Legal reporting, factual, short excerpt.

3. **Line 127 -- McDonald's failures:** "added 260 chicken nuggets, put bacon on ice cream"
   - Specific anecdotes likely drawn directly from the Museum of Failure or press coverage.
   - **Risk: Low.** Factual reporting of widely reported incidents.

**Verbatim passages:** No extended passages appear copied from any single source. The pattern descriptions, anti-patterns, and trust gradient framework are original analytical constructs that synthesize multiple sources.

**Metrics/statistics:** Multiple statistics are used throughout (40%, 5%, 42%, 75%, 60%, 70-85%, 74%, etc.). All are attributed to named research organizations (Gartner, KPMG, MIT, EY, S&P Global, Anthropic). These are factual data points.

**Structural concern:** The "Trust Gradient" framework (Part 3, lines 143-196) and "Autonomy Ladder" (Pattern 3) both describe level-based frameworks. The Autonomy Ladder explicitly credits Feng, McDonald & Zhang (2025) and Bessemer. The Trust Gradient appears to be the researcher's own synthesis combining multiple sources into an original framework. **This is good practice -- original framework built from cited inputs.**

**Overall assessment:** **Low copyright risk.** One properly attributed direct quote (Siemiatkowski). Two near-quotes from legal/factual reporting contexts. The analytical frameworks (patterns, anti-patterns, trust gradient, Nordic analysis) are original constructs. No substantial reproduction of source material detected.

---

## Summary Stats per File

| File | Total findings | With URL | Vague source | Direct quotes | Copyright concern |
|------|---------------|----------|--------------|---------------|-------------------|
| **cross-cut-nordic-enterprise-ai.md** | 17 company profiles + 5 pattern analyses | 36 URLs across 17 profiles (2.1 avg/profile) | 0 "web search synthesis" labels; ~8 specific claims without direct URLs (Maersk metrics, H&M profit uplift, IKEA Waabi, etc.) | 0 | None |
| **cross-cut-vertical-saas-agents.md** | 10 platform profiles + 4 key insights + Nordic implications | 27 URLs across 10 profiles (2.7 avg/profile) | 0 "web search synthesis" labels; ~10 claims without URLs (customer base figures, Nordic-specific partner data) | 1 near-quote ("conversation became the agent-making interface") | Low (1 near-quote) |
| **cross-cut-chasm-crossing-patterns.md** | 7 patterns + 5 anti-patterns + trust gradient + Nordic section + stats table | 23 distinct URLs across evidence fields | 0 "web search synthesis" labels; ~12 claims without specific URLs (Goldman Sachs examples, S&P Global stat, HPE/Deloitte product claims, Nordic AI Union Summit) | 1 direct quote (Siemiatkowski), 2 near-quotes (Air Canada "separate entity", McDonald's anecdotes) | Low (1 direct quote, properly attributed) |

---

## Overall Assessment

**Source traceability:** Moderate-to-good across all three files. None use "web search synthesis" or similarly vague attributions -- every finding attempts to point to a named source. The main weakness is a pattern of uncited specific quantitative claims where the researcher appears to have drawn from search results without recording the specific URL. Approximately 30 individual claims across the three files lack direct URLs. The most concerning are:

1. **S&P Global "42% abandoned AI initiatives"** (File 3) -- specific statistic, no URL anywhere
2. **Maersk $300M+ savings** (File 1) -- sourced only to third-party AI analysis blogs, no Maersk primary
3. **H&M "30% profit uplift"** (File 1) -- sourced only to third-party blogs, no H&M primary
4. **Nordic AI Union Summit, March 2026, Oslo** (File 3) -- specific event, no verifiable link
5. **Multiple customer base figures** (File 2) -- used in summary table without individual citations

**Copyright risk:** Low across all three files. Content is primarily original analytical frameworks populated with factual data points. One properly attributed direct quote. No evidence of substantial reproduction of source material. Feature descriptions track vendor announcements but are summarized, not copied. All three files demonstrate the project's guideline of original synthesis rather than content reproduction.

**Recommendation:** Address the ~30 uncited claims in a future pass, prioritizing the 5 highest-severity items listed above. Consider adding primary source URLs for major quantitative claims (corporate earnings, press releases) rather than relying on third-party analysis blogs.
