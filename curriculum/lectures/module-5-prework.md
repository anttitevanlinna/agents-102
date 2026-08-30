# The Missing Check

**What you do:**

Two cases. Both in public court/government records. They do more than a list of ten fail-tweets ever could.

Everyone knows agents are failing left and right. What's harder to find is failures where the **organisational decisions that led to the failure** are on the record too, not just the symptom. These two are that rare thing: a judge and a government auditor have both documented what the LLM produced AND what the people around it did and didn't do.

Read them with one question in mind: *what was the organisation's missing check?*

**Case 1, Mata v. Avianca (S.D.N.Y., 2023).**

A passenger sued Avianca for a personal-injury claim. His attorneys were Peter LoDuca and Steven Schwartz of the New York firm Levidow, Levidow & Oberman. LoDuca filed an affirmation in opposition that Schwartz had researched and written. It cited cases to support their legal position.

Six of them did not exist.

Schwartz had used ChatGPT to find supporting precedent. It produced cases with specific names, docket numbers, and paragraphs of plausible reasoning: *Varghese v. China Southern Airlines*, *Martinez v. Delta Airlines*, *Shaboon v. EgyptAir*, and three others. Schwartz later asked ChatGPT directly, *"Is Varghese a real case"*. ChatGPT said yes, and that it could be found on Westlaw and LexisNexis. He did not verify the cited cases in a real legal research database before relying on them.

Opposing counsel couldn't find the cases because they weren't there. Judge P. Kevin Castel issued a sanctions order on **June 22, 2023**: a $5,000 sanction imposed jointly on both attorneys and the firm. The order is blunt about what went wrong - not the existence of ChatGPT, but the absence of verification. It says technological assistance is not inherently improper, but lawyers still have a gatekeeping duty to check filings for accuracy.

Read:
- The sanctions opinion itself (readable, and it quotes Schwartz's affidavit directly): [law.justia.com, Mata v. Avianca, Opinion and Order of June 22, 2023](https://law.justia.com/cases/federal/district-courts/new-york/nysdce/1:2022cv01461/575368/54/)
- CNBC's contemporaneous coverage for the shape of it: [CNBC, Judge sanctions lawyers whose AI-written filing contained fake citations](https://www.cnbc.com/2023/06/22/judge-sanctions-lawyers-whose-ai-written-filing-contained-fake-citations.html)

**Case 2, Deloitte Australia / DEWR welfare-compliance report (2025).**

The Australian government's Department of Employment and Workplace Relations commissioned Deloitte for A$439,000 to review the department's welfare-compliance automation system, an independent assurance review of systems that already use automated decision-making on real Australian citizens.

The final report was dated 4 July 2025. By August, Dr. Christopher Rudge, a health-and-welfare-law academic at the University of Sydney, had raised concerns about references that did not exist and a quote attributed to a federal court judge who had never said it. Subsequent reporting counted up to 20 fabricated references.

On **3 October 2025**, the department published Deloitte's revised version. It disclosed use of **Azure OpenAI GPT-4o** in the review. Freedom-of-information records add an important distinction: a department-hosted toolchain supported code analysis, while Deloitte also used generative-AI tools to complete and format citations. Three days after publication, the government announced Deloitte would refund the final contract installment.

The second-order detail is the one that lands hardest: Rudge reviewed the revised version too and reported that some false references had been replaced with new false references. The department then replaced that September version again on **3 February 2026** to address further identified corrections. Whatever the first fix was, the same failure shape survived inside the corrective response.

The fact that the revision repeated the failure tells you the verification step still wasn't built in. What that step would have been is the sentence you bring to class.

Read:
- The department's current report page and correction history: [DEWR, Targeted Compliance Framework Assurance Review – Final Report](https://www.dewr.gov.au/assuring-integrity-targeted-compliance-framework/resources/targeted-compliance-framework-assurance-review-final-report)
- The released correspondence describing the approved toolchain, publishing uses, review, and missed errors: [Department of Finance, FOI 25-26-084 Document 1](https://www.finance.gov.au/sites/default/files/foi-25-26-084-document-1.pdf)
- The Guardian's account, including Rudge's findings and the refund: [Guardian, Deloitte to pay money back to Albanese government after using AI in A$440,000 report](https://www.theguardian.com/australia-news/2025/oct/06/deloitte-to-pay-money-back-to-albanese-government-after-using-ai-in-440000-report)
- The Register's technical summary, including the GPT-4o disclosure and the "new fake refs in the revision" detail: [The Register, Deloitte to refund part of A$440k Australian report after AI snafu](https://www.theregister.com/2025/10/06/deloitte_ai_report_australia/)

## Why the LLM fabricates

- **It completes the shape.** An LLM continues text in the pattern that looks right. If the pattern is "legal brief with supporting cases" or "consulting report with academic references," the next likely thing is a case name, a citation, a careful paragraph. The form arrives whether or not the world contains the fact. Fluency is cheap; existence is separate.
- **It fills gaps instead of stopping.** When the sources don't hold the missing piece, the model supplies what would make the answer feel complete. The invented part sits next to true parts and borrows their credibility, which is why partial grounding is treacherous. Specific names, docket numbers, dates: more convincing, not more true.
- **It can verify inside the same fiction.** Asking the same model "are you sure?" is not a check on the world; it is another fluent answer. In Mata v. Avianca, asking ChatGPT whether Varghese was real produced exactly that. Verification has to leave the generation loop and touch the source.
- **It inherits organisational shortcuts.** The model didn't file the brief or deliver the report; a workflow did. If the workflow rewards speed and has no step where someone opens the cited source, the fabrication survives. The missing check is organisational, not only technical.

## Why grounding fails even when the facts are in context

- **The fact is present but not load-bearing.** Putting a source in the context window does not force the model to use it. Buried under drafts, notes and instructions, the model may answer from the broader pattern the topic evokes; the citation sits beside the claim without supporting it.
- **The source says less than the answer wants.** A file says one customer complained; the answer says customers are unhappy. The model used the source and stretched it past what it can bear.
- **Conflict gets smoothed.** When two sources disagree, the model often produces a clean synthesis instead of preserving the tension. The synthesis sounds more useful than the messy evidence and hides the thing a human needed to see: this is not settled. Grounded work keeps the conflict visible.

**What to bring to class.**

One thing.

One sentence per case, on paper or in a note you'll open Monday: *"The organisational check that would have caught this was X."*

That's it. No reading list. No ten-bullet rundown of every headline agent failure of 2024–25. Two cases, close-read, with the missing check named in your own words.

<!-- maintainer -->

**Time:** 40 minutes. 10 per case, 15 for the mechanisms, 5 for the two sentences.

**No answer reveals in body:** the missing check stays unnamed in both case sections by design — naming it is the take-home, and the question at the top of the file arms the read. Both cases converge on *verification before submission*; that answer lives here for the trainer, never in body. Do not restore the bold "The missing check:" reveals.

**Mechanism dosage:** the two mechanism sections stay at arming depth — four fabrication lenses, three grounding-failure lenses, each slide under the 210-word cap. The deeper causal taxonomy lives in the M5 lecture (grounded.md, "Why this happens"). The prework arms the two-case read; the lecture owns the why. Do not re-expand.

**Two, not ten — editorial reasoning:**
- The prework's job is to calibrate the eye, not stoke anxiety. Everybody in a Agents 101 room has seen the headline "another AI lawyer fiasco." What they haven't seen is a case where BOTH the LLM output AND the organisational root cause are on the public record.
- Mata v. Avianca and the Deloitte/DEWR case are the rare pair with real public-record root-cause visibility. Other famous cases (Air Canada/Moffatt, Cursor "Sam", NYC MyCity, Klarna reversal) have public SYMPTOMS but not public architectural / organisational gaps — we'd be inferring, not reading.
- Asking the student to name the missing check in their own words (both cases converge on *verification before submission*) seeds Module 5's Phase 2 (classification) and Phase 3 (grounding rules), and connects to the lecture's Technique 1 (citation re-verification).

**Why these two specifically (and not e.g. Air Canada):**
- **Mata v. Avianca**: court sanctions order contains the affidavit quoting Schwartz asking ChatGPT "Is Varghese a real case" — this is the single most pedagogically useful quote in any LLM-failure case, because it IS citation cargo-cult in one line. The missing check is trivially identifiable: open the cited cases in a real legal database before relying on them.
- **Deloitte Australia**: the revision-repeated-the-failure detail is irreplaceable. It proves that acknowledging the issue isn't the fix; BUILDING THE VERIFICATION STEP is. Connects directly to why a discipline and a loop beat a one-time acknowledgement.
- **Rejected — Moffatt v. Air Canada**: outcome on record, architecture not. Tribunal didn't dig into whether the chatbot lacked grounding rules or whether Air Canada had a verification process. Speculative for teaching.
- **Rejected — Cursor "Sam"**: practitioner-documented but informal (X threads, founder apology) rather than court/government record. Shorter half-life as a shared reference.
- **Rejected — NYC MyCity, Klarna, DPD**: symptom-documented, root cause not settled.

**Factual precision owed:**
- Mata sanction is **$5,000 jointly** on both attorneys and the firm — NOT $5,000 per attorney. Verified from the sanctions order itself (docket 54).
- The student-facing Mata story carries no "small"-firm descriptor, no "ten minutes" estimate, and no direct Castel quote — none is supported by the linked Justia order (detector pass 2026-04-30). Do not restore them.
- The Schwartz timeline stays soft ("later asked"): the order's fn.3 records ambiguity about when Schwartz knew Varghese could not be found (the affidavit is internally consistent that the ask-ChatGPT-if-real exchange came after the First OSC); the pedagogical point stays on verification.
- Detector re-run 2026-08-03, all four techniques against docket 54's full text (via CourtListener): triangulation caught the story counting citations as fabrications ("It cited six cases … None of them existed" — the affirmation also cited real authorities; six is the sanction list's count of fabrications), fixed same day to "Six of them did not exist." Quote casing aligned to the order's printed rendering ("Is Varghese a real case", no question mark; the underlying Appendix B screenshot is an image and was not text-verifiable). "short" dropped from the opinion descriptor (the order runs 43 pages). Entailment and citation integrity otherwise clean. Counter-evidence: CNBC's each-pay-$5,000 rendering vs the order's joint $5,000 stands; the story follows the order. Intra-order tension noted, no body change owed: ¶26 "superficially consistent" vs ¶27 "gibberish" — the story's "paragraphs of plausible reasoning" follows ¶26 and Schwartz's own account.
- Deloitte case is **2025**, not 2024. Contract signed late 2024; report published July 2025; Rudge's critique and the refund both October 2025.
- Model used by Deloitte is **Azure OpenAI GPT-4o** — disclosed in the revised report's own appendix. Named directly; don't hedge.
- Firm AI policy at Levidow, Levidow & Oberman: **unverified**. The sanctions order doesn't document whether an AI-use policy existed or didn't. Keep the pedagogical frame on "the missing check" (verification) rather than on the absence of a policy. Policy-vs-discipline is a Module 7 discussion; here we're naming the specific unperformed verification step.
- Rudge's finding of "up to 20" fabricated references + fabricated judicial quote is from his own published analysis and Guardian coverage — stable.

**URL verification:**
- `[checked:2026-08-23 result:OK due:none]` https://law.justia.com/cases/federal/district-courts/new-york/nysdce/1:2022cv01461/575368/54/ — [primary court record, historical] full sanctions opinion resolves and supports the six fabricated opinions, joint $5,000 sanction, and gatekeeping duty. fallback: CourtListener carries docket 54.
- `[checked:2026-08-23 result:OK due:none]` https://www.courtlistener.com/docket/63107798/54/mata-v-avianca-inc/ — [primary court-record mirror, historical] full text of docket 54. fallback: Justia link above.
- `[checked:2026-08-23 result:OK due:none]` https://www.cnbc.com/2023/06/22/judge-sanctions-lawyers-whose-ai-written-filing-contained-fake-citations.html — [contemporaneous secondary, historical] case chronology and reaction; the body follows the order where the headline's sanction rendering differs.
- `[checked:2026-08-23 result:OK due:none]` https://www.dewr.gov.au/assuring-integrity-targeted-compliance-framework/resources/targeted-compliance-framework-assurance-review-final-report — [primary government record, historical correction trail] review dates and the 3 February 2026 replacement of the September report. fallback: use the page's downloadable final report.
- `[checked:2026-08-23 result:OK due:none]` https://www.finance.gov.au/sites/default/files/foi-25-26-084-document-1.pdf — [primary FOI record, historical] engagement, approved Azure-hosted toolchain, publishing uses, review process, and errors missed. fallback: DEWR's related correspondence release.
- `[checked:2026-08-23 result:OK due:none]` https://www.dewr.gov.au/download/17410/correspondence-relating-targeted-compliance-framework-assurance-review-final-report/41820/correspondence-relating-targeted-compliance-framework-assurance-review-final-report/pdf — [primary FOI record, historical] correction correspondence and the Azure OpenAI GPT-4o terminology. fallback: Department of Finance FOI record above.
- `[checked:2026-08-23 result:OK due:none]` https://www.theguardian.com/australia-news/2025/oct/06/deloitte-to-pay-money-back-to-albanese-government-after-using-ai-in-440000-report — [contemporaneous secondary, historical] Rudge's findings and refund. fallback: primary government correction trail above.
- `[checked:2026-08-23 result:OK due:none]` https://www.theregister.com/2025/10/06/deloitte_ai_report_australia/ — [contemporaneous secondary, historical] technical summary and Rudge's repeated-reference finding. fallback: primary government correction trail above.

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

**Quality:** compendium-audited 2026-08-25 (writing@d3ff749e story@5755beb6 technical@725101ec behavior@5fc7188 pedagogy@ab36a5e6 strategy@5fc7188 slides@4d9c4af2)
- judges @4d9c4af2: writing PASS, story PASS, technical PASS, behavior PASS, pedagogy PASS, strategy PASS, slides PASS
