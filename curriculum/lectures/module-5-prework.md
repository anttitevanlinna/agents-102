# The Missing Check

**What you do:**

Two cases. Both in public court/government records. Together they take about 25 minutes and do more than a list of ten fail-tweets ever could.

Everyone knows agents are failing left and right. What's harder to find is failures where the **organisational decisions that led to the failure** are on the record too, not just the symptom. These two are that rare thing: a judge and a government auditor have both documented what the LLM produced AND what the people around it did and didn't do.

Read them with one question in mind: *what was the organisation's missing check?*

**Case 1, Mata v. Avianca (S.D.N.Y., 2023).**

A passenger sued Avianca for a personal-injury claim. His attorneys were Peter LoDuca and Steven Schwartz of the New York firm Levidow, Levidow & Oberman. LoDuca filed an affirmation in opposition that Schwartz had researched and written. It cited six cases to support their legal position.

None of them existed.

Schwartz had used ChatGPT to find supporting precedent. It produced cases with specific names, docket numbers, and paragraphs of plausible reasoning: *Varghese v. China Southern Airlines*, *Martinez v. Delta Airlines*, *Shaboon v. EgyptAir*, and three others. Schwartz later asked ChatGPT directly, *"is varghese a real case?"* ChatGPT said yes, and that it could be found on Westlaw and LexisNexis. He did not verify the cited cases in a real legal research database before relying on them.

Opposing counsel couldn't find the cases because they weren't there. Judge P. Kevin Castel issued a sanctions order on **June 22, 2023**: a $5,000 sanction imposed jointly on both attorneys and the firm. The order is blunt about what went wrong - not the existence of ChatGPT, but the absence of verification. It says technological assistance is not inherently improper, but lawyers still have a gatekeeping duty to check filings for accuracy.

The missing check: **one human opening the cited cases on a real legal database before the brief was filed.**

Read:
- The sanctions opinion itself (short, readable, quotes Schwartz's affidavit directly): [law.justia.com, Mata v. Avianca, Opinion and Order of June 22, 2023](https://law.justia.com/cases/federal/district-courts/new-york/nysdce/1:2022cv01461/575368/54/)
- CNBC's contemporaneous coverage for the shape of it: [CNBC, Judge sanctions lawyers whose AI-written filing contained fake citations](https://www.cnbc.com/2023/06/22/judge-sanctions-lawyers-whose-ai-written-filing-contained-fake-citations.html)

**Case 2, Deloitte Australia / DEWR welfare-compliance report (2025).**

The Australian government's Department of Employment and Workplace Relations commissioned Deloitte for A$439,000 to review the department's welfare-compliance automation system, an independent assurance review of systems that already use automated decision-making on real Australian citizens.

The report was published in July 2025. In early October, Dr. Christopher Rudge, a health-and-welfare-law academic at the University of Sydney, read it carefully and found something odd. The report cited academic sources that didn't exist. It attributed a quote to a federal court judge that the judge had never said. All told, up to 20 fabricated references.

On **3 October 2025**, Deloitte published a revised version. An appendix disclosed, for the first time, that the report had been produced with assistance from **Azure OpenAI's GPT-4o**, hosted inside the department's own Azure tenancy. Three days later, the government announced Deloitte would refund the final contract installment.

The second-order detail is the one that lands hardest: Rudge reviewed the revised version too. Some of the fabricated citations had been replaced, with new fabricated citations. Deloitte's fix didn't include a "now actually open every source and check it says what we claim" step. The same failure mode recurred inside the corrective response.

The missing check at Deloitte was not exotic: **a reviewer opening each cited source before the report went to a client.** The fact that the revision repeated the failure tells you the verification step still wasn't built in.

Read:
- The Guardian's account, including Rudge's findings and the refund: [Guardian, Deloitte to pay money back to Albanese government after using AI in A$440,000 report](https://www.theguardian.com/australia-news/2025/oct/06/deloitte-to-pay-money-back-to-albanese-government-after-using-ai-in-440000-report)
- The Register's technical summary, including the GPT-4o disclosure and the "new fake refs in the revision" detail: [The Register, Deloitte to refund part of A$440k Australian report after AI snafu](https://www.theregister.com/2025/10/06/deloitte_ai_report_australia/)

## Why the LLM fabricates

### It completes the shape
An LLM is trained to continue text in a pattern that looks right. If the pattern is "legal brief with supporting cases" or "consulting report with academic references," the next likely thing is a case name, a citation, a quoted authority, a careful paragraph. The model can produce the form even when the world does not contain the fact. Fluency is cheap. Existence is separate.

### It fills gaps instead of stopping
When the sources do not contain the missing piece, the model often supplies what would make the answer feel complete. A user asks for precedent, so the answer supplies precedent. A report needs literature support, so the answer supplies literature. The dangerous moment is not only ignorance; it is the system smoothing over ignorance so the document does not show a hole.

### It treats nearby truth as permission
A real airline, a real court, a real department, a real policy area, a real academic style: all of that gives the output enough scaffolding to sound grounded. The invented part can sit next to true parts and borrow their credibility. That is why partial grounding is treacherous. The sentence before the false citation may be true, and the sentence after it may be true, which makes the false middle harder to feel.

### It obeys pressure for specificity
Specific names, dates, numbers, and citations make writing useful. They also make fabrication more convincing. If you ask for a concrete answer and do not give the model a way to say "not enough evidence," it may produce concrete detail anyway. Specificity is not proof. A docket number can be made up just as confidently as an adjective.

### It can verify inside the same fiction
Asking the same model "are you sure?" is not the same as checking the world. The model may continue the same invented pattern with a second layer of reassurance. In Mata v. Avianca, asking ChatGPT whether Varghese was real did not create an external check. It created another fluent answer. Verification has to leave the generation loop and touch the source.

### It inherits organisational shortcuts
The model did not file the brief or deliver the client report by itself. People wrapped it in a workflow. If the workflow rewards speed, accepts polished prose, and has no step where someone opens the cited source, the fabrication survives. The missing check is organisational, not only technical.

## Why grounding fails even when the facts are in context

### The fact is present but not load-bearing
Putting a source in the context window does not force the model to use it. The model may read a paragraph, absorb its topic, and then answer from the broader pattern the topic evokes. The fact is nearby, but it is not carrying the sentence. This is why a citation can sit beside a claim without supporting it.

### The context is crowded
Long context is not the same as equal attention. A source can be present but buried under meeting notes, prior drafts, instructions, summaries, and user pressure. The model may anchor on the most recent, most repeated, or most rhetorically obvious material rather than the quiet sentence that actually settles the claim.

### The source says less than the answer wants
Ground facts often support a narrower statement than the output makes. A file says one customer complained; the answer says customers are unhappy. A policy says one workflow needs approval; the answer says the company forbids the whole category. The model did use the source, but stretched it past what the source can bear.

### The model resolves conflict by smoothing
When two sources disagree, or when a source partly supports and partly weakens a claim, the model often produces a clean synthesis instead of preserving the tension. That synthesis may sound more useful than the messy evidence, but it hides the thing a human needed to see: this is not settled. Grounded work keeps the conflict visible.

**What to bring to class.**

One thing.

One sentence per case, on paper or in a note you'll open Monday: *"The organisational check that would have caught this was X."*

That's it. No reading list. No ten-bullet rundown of every headline agent failure of 2024–25. Two cases, close-read, with the missing check named in your own words.

**Time:** 35-40 minutes. 10 per case, 10-15 for the mechanisms, 5 for the two sentences.

<!-- maintainer -->

**Two, not ten — editorial reasoning:**
- The prework's job is to calibrate the eye, not stoke anxiety. Everybody in a Agents 101 room has seen the headline "another AI lawyer fiasco." What they haven't seen is a case where BOTH the LLM output AND the organisational root cause are on the public record.
- Mata v. Avianca and the Deloitte/DEWR case are the rare pair with real public-record root-cause visibility. Other famous cases (Air Canada/Moffatt, Cursor "Sam", NYC MyCity, Klarna reversal) have public SYMPTOMS but not public architectural / organisational gaps — we'd be inferring, not reading.
- Asking the student to name the missing check in their own words (both cases converge on *verification before submission*) seeds Module 5's Phase 2 (classification) and Phase 3 (grounding rules), and connects to the lecture's Technique 1 (citation re-verification).

**Why these two specifically (and not e.g. Air Canada):**
- **Mata v. Avianca**: court sanctions order contains the affidavit quoting Schwartz asking ChatGPT "is varghese a real case?" — this is the single most pedagogically useful quote in any LLM-failure case, because it IS citation cargo-cult in one line. The missing check is trivially identifiable: open the cited cases in a real legal database before relying on them.
- **Deloitte Australia**: the revision-repeated-the-failure detail is irreplaceable. It proves that acknowledging the issue isn't the fix; BUILDING THE VERIFICATION STEP is. Connects directly to why a discipline and a loop beat a one-time acknowledgement.
- **Rejected — Moffatt v. Air Canada**: outcome on record, architecture not. Tribunal didn't dig into whether the chatbot lacked grounding rules or whether Air Canada had a verification process. Speculative for teaching.
- **Rejected — Cursor "Sam"**: practitioner-documented but informal (X threads, founder apology) rather than court/government record. Shorter half-life as a shared reference.
- **Rejected — NYC MyCity, Klarna, DPD**: symptom-documented, root cause not settled.

**Factual precision owed:**
- Mata sanction is **$5,000 jointly** on both attorneys and the firm — NOT $5,000 per attorney. Earlier drafts had this wrong; verified from the sanctions order itself (docket 54).
- Detector pass 2026-04-30 removed three unsupported/over-clean details from the student-facing Mata story: "small" firm, the "ten minutes" estimate, and a direct Castel quote that did not appear in the linked Justia order.
- Detector pass 2026-04-30 softened the Schwartz timeline: the order records conflicting accounts about when he asked ChatGPT whether Varghese was real, so the story now says "later asked" and keeps the pedagogical point on verification.
- Deloitte case is **2025**, not 2024. Contract signed late 2024; report published July 2025; Rudge's critique and the refund both October 2025.
- Model used by Deloitte is **Azure OpenAI GPT-4o** — disclosed in the revised report's own appendix. Named directly; don't hedge.
- Firm AI policy at Levidow, Levidow & Oberman: **unverified**. The sanctions order doesn't document whether an AI-use policy existed or didn't. Keep the pedagogical frame on "the missing check" (verification) rather than on the absence of a policy. Policy-vs-discipline is a Module 7 discussion; here we're naming the specific unperformed verification step.
- Rudge's finding of "up to 20" fabricated references + fabricated judicial quote is from his own published analysis and Guardian coverage — stable.

**URL verification:**
- Law.Justia URL for the sanctions order is stable (case docket 54).
- CourtListener alternative if Justia goes down: https://www.courtlistener.com/docket/63107798/mata-v-avianca-inc/
- Guardian and The Register links on Deloitte case verified in research pass.
- Re-verify all four URLs before first delivery per capability-check protocol; case-law aggregators occasionally reshuffle URLs.

**Frameworks riffed on:**
- **Citation re-verification** — the lecture's Technique 1. Mata v. Avianca is its clearest real-world case; the prework lands the student with the frame before the lecture formalises the technique.
- **The missing check** — implicit in ISO 31000 / NIST risk-management vocabulary and in classical audit discipline. Recognisable for Nordic regulated-industry audiences.
- **"Revision repeated the failure"** — the Deloitte detail illustrates why the DISCIPLINE beats the ONE-TIME ACKNOWLEDGEMENT, reinforcing M4's "practice beats proof" carryover.

**Philosophy callout (sparing):**
- Belief #14 — practice beats external proof — lives in the Deloitte revision-failure detail. Student reads it; belief is earned without naming.

**Watch-fors for the room (deferred to facilitator notes):**
- **"But these are old cases."** Mata is 2023. Deloitte is 2025. The pattern holds. Coach: *"The lessons aren't dated. The root-cause visibility is what's rare, and these have it."*
- **"Our work isn't legal briefs / government reports, so this doesn't apply."** Coach: *"The failure mode — citing something the model invented, without opening the source — is the same shape in a sales deck, a pricing memo, a customer-facing explainer. The stakes vary; the missing check doesn't."*
- **"Isn't the real fix just to use a better model?"** (Lecture answers this directly.) Coach in opening Connections to flag that this is the wrong lesson and the lecture settles it.

**Capability / freshness notes:**
- Mata case is 2023 — older than the project's 6-month freshness rule. But: it is used as a HISTORICAL CASE STUDY of a specific incident, not as current-state evidence about AI capability. The research-quality freshness rule targets claims about what AI can/can't do; incident studies don't decay the same way. Keep.
- Deloitte case is October 2025 — well inside freshness window.
- No Claude-Code capability dependencies in this prework — reading only.

**Deferred per student-facing-first rule:**
- Variant note: Mid-Management variant can add a closing paragraph — "if your organisation has AI policy but no verification discipline, which one actually catches the failure?" — pushing the ownership question. Skipped for Agents 101.
- Facilitator briefing deferred.
