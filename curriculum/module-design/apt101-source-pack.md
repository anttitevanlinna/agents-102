# APT101 source pack: product-craft frameworks in the authors' own words

Purpose: lecture slides on these ten frameworks must say what the original authors said. Every quote below was read on the page named beside it on 2026-10-06; nothing is quoted from memory. A source that could not be opened carries `result:CAVEAT` with the reason. Foundational frameworks: the freshness clock does not apply (`due:none`); fidelity to the original wording does.

Where the popular telling and the original differ, the section says so under **Drift**.

---

## 1. Teresa Torres: opportunity solution tree

**Primary:** https://www.producttalk.org/opportunity-solution-trees/ [practitioner direct]. Teresa Torres, "Opportunity Solution Trees: Visualize Your Discovery to Stay Aligned and Drive Outcomes", Product Talk, 06 Dec 2023. Opened 2026-10-06.

Quotes (all from that page):

- "The root of the tree is your desired outcome—the business need that reflects how your team can create business value. Next is the opportunity space. These are the customer needs, pain points, and desires that, if addressed, will drive your desired outcome. Below the opportunity space is the solution space."
- "In this context, an opportunity is an unmet customer need, pain point, or desire."
- "A solution is a product, a service, or a feature that we offer to address an opportunity. The opportunity represents the underlying need, pain point, or desire."
- "Decision-making research tells us when we compare and contrast our options, we make better decisions. As a general rule, I recommend that teams consider more than one solution for their target opportunity."
- On the root: "As a general rule, I like to see a product outcome at the top of an opportunity solution tree." (She separates business outcomes, product outcomes, and traction metrics; traction metrics "aren't good discovery outcomes because their scope is often too narrow.")

**Summary.** The tree has an outcome at the root, then customer opportunities (needs, pains, desires heard in interviews), then solutions, then assumption tests. Each solution hangs under the opportunity it addresses. The team picks one target opportunity and sets several solutions against each other, because comparing options is what improves the decision.

**Misreading to avoid.** A branch that is a solution dressed as an opportunity. Torres's own test: "The best way to test if an opportunity is really a solution in disguise is to ask, 'Is there more than one way to address this opportunity?'" Her example: "I want to go out to eat" "sounds like an opportunity, but it's really a solution."

**Drift.** The popular telling often puts a business metric (revenue, churn) at the root. Torres prefers a *product* outcome there, one the team can move directly.

**Backing line:**
- torres-ost `[checked:2026-10-06 result:OK due:none]` https://www.producttalk.org/opportunity-solution-trees/ — [practitioner direct] OST structure (outcome → opportunities → solutions → assumption tests), opportunity = unmet customer need/pain/desire, compare-and-contrast across multiple solutions, solution-in-disguise test, product outcome at the root.

---

## 2. Barry O'Reilly: hypothesis-driven development

**Primary:** https://barryoreilly.com/explore/blog/how-to-implement-hypothesis-driven-development/ [practitioner direct]. Barry O'Reilly, "How to Implement Hypothesis-Driven Development", 21 Oct 2013. Opened 2026-10-06.

**Not opened:** *Lean Enterprise* (Humble, Molesky, O'Reilly, 2015). The book's own wording of the template was not checked; cite the blog post.

Quotes (from the blog post):

- The template: "We believe < this capability >" / "Will result in < this outcome >" / "We will have confidence to proceed when < we see a measurable signal >"
- On the signal: "What signals will indicate that the capability we have built is effective? What key metrics (qualitative or quantitative) we will measure to provide evidence that our experiment has succeeded and give us enough confidence to move to the next stage."
- "We then need to state the specific indicators (or signals) we expect to observe that provide evidence that our hypothesis is valid. These need to be stated before conducting the test to reduce the bias of interpretation of results."
- "Not every company has the user sample size of Amazon or Google to run statistically significant experiments in a short period of time. Limits and controls need to be defined by your organization to determine acceptable evidence thresholds that will allow the team to advance to the next step."

**Summary.** O'Reilly offers this as a replacement for the "As a… I want… So that…" user story when the work is an experiment. The third line carries the weight. The team writes down, before building, which signal will count as evidence, and sets the threshold to fit its own risk and sample size.

**Misreading to avoid.** Writing the "measurable signal" line after the results are in, or leaving it vague ("improved engagement"). O'Reilly's point is that signals are stated *before* the test "to reduce the bias of interpretation of results." His own worked example names a number and a window: "a 5% increase in customers who review hotel images who then proceed to book in 48 hours."

**Backing line:**
- oreilly-hdd `[checked:2026-10-06 result:OK due:none]` https://barryoreilly.com/explore/blog/how-to-implement-hypothesis-driven-development/ — [practitioner direct] HDD template wording (We believe / Will result in / We will have confidence to proceed when), signal stated before the test, organisation-set evidence thresholds.

---

## 3. Jeff Patton: user story mapping

**Primary (a):** https://jpattonassociates.com/the-new-backlog/ [practitioner direct]. Jeff Patton, "The New User Story Backlog is a Map", 8 Oct 2008 (updated 12 Apr 2023). Live page returns 403 to curl; quotes verified 2026-10-06 against raw text in the Wayback snapshot https://web.archive.org/web/2024id_/https://jpattonassociates.com/the-new-backlog/.
**Primary (b):** https://www.jpattonassociates.com/wp-content/uploads/2015/03/story_mapping.pdf [practitioner direct]. "Story Map Concepts" / "Story Map Process" quick reference, ©2013 Comakers LLC (Patton's firm), hosted on jpattonassociates.com. Opened 2026-10-06.
**Not opened:** the book *User Story Mapping* (O'Reilly, 2014).

Quotes:

- (a) "Those big things on the top are often the essential capabilities the system needs to have. I refer to them as the "backbone" of the software. I stole this term from Dr. Dan Rawsthorne who might use the term slightly differently than I do."
- (a) "…all the stories placed high on the story map describe the smallest possible system you could build that would give you end to end functionality. This is what Alistair Cockburn refers to as the 'walking skeleton'."
- (a) "We're slowly building up the system not a feature at a time, but rather by building up all major features a little at a time."
- (b) "Slice your map into holistic product releases that span the users and use of the product." … "For each release name the target outcomes and Impact." … "For each release, identify product success metrics. Answer the question: 'what would we measure to determine if this product was successful?'"
- (b) "Slice the first release of your map into three or more delivery phases that allow you and your team to learn fast and avoid risk." Opening Game "builds a 'functional walking skeleton' – the simplest possible functional version of the product."

**Summary.** The backbone is the left-to-right row of user activities, told as a narrative. Details hang beneath it. Horizontal slices cut across the whole backbone. Each slice is named by the outcome it is meant to produce and checked with a success metric. Inside the first release, further slices are ordered by what the team needs to learn first.

**Misreading to avoid.** Slicing by size or by feature ("ship the search feature, then the checkout feature"). Patton slices across every backbone activity, building "all major features a little at a time. That way we never release a car without brakes", and names each slice by its target outcome, not its scope. Neither term is his coinage, and he says so: "walking skeleton" is credited to Alistair Cockburn, "backbone" to Dan Rawsthorne.

**Backing lines:**
- patton-new-backlog `[checked:2026-10-06 result:OK due:none]` https://jpattonassociates.com/the-new-backlog/ — [practitioner direct] backbone (credited to Rawsthorne), walking skeleton (credited to Cockburn), build all major features a little at a time. Live page 403s to curl; verified in Wayback.
- patton-story-map-concepts `[checked:2026-10-06 result:OK due:none]` https://www.jpattonassociates.com/wp-content/uploads/2015/03/story_mapping.pdf — [practitioner direct] release slices named by target outcomes and success metrics; first-release delivery phases sliced to "learn fast and avoid risk".

---

## 4. Gary Klein: the premortem

**Primary:** Gary Klein, "Performing a Project Premortem", *Harvard Business Review*, September 2007. https://hbr.org/2007/09/performing-a-project-premortem [practitioner direct]. hbr.org shows only the summary (paywall). The full text was read on 2026-10-06 in a course-hosted reprint: https://comprobo25.github.io/assignments/performing_a_project_premortem.pdf.
**Underlying study:** Mitchell, Russo & Pennington (1989), "Back to the future: Temporal perspective in the explanation of events", *Journal of Behavioral Decision Making* 2(1), 25–38. https://onlinelibrary.wiley.com/doi/abs/10.1002/bdm.3960020103 [academic/research]. Returned **403**; not opened.
**Secondary check:** Jason Collins, "The premortem", *Course notes on behavioural economics and corporate decision making*, ch. 30. https://corporate.jcx.au/premortem [practitioner analysis]. Opened 2026-10-06.

Quotes (Klein, from the reprint):

- "Research conducted in 1989 by Deborah J. Mitchell, of the Wharton School; Jay Russo, of Cornell; and Nancy Pennington, of the University of Colorado, found that prospective hindsight—imagining that an event has already occurred—increases the ability to correctly identify reasons for future outcomes by 30%."
- "Unlike a typical critiquing session, in which project team members are asked what might go wrong, the premortem operates on the assumption that the 'patient' has died, and so asks what did go wrong."
- "The leader starts the exercise by informing everyone that the project has failed spectacularly. Over the next few minutes those in the room independently write down every reason they can think of for the failure—especially the kinds of things they ordinarily wouldn't mention as potential problems, for fear of being impolitic."
- "Next the leader asks each team member, starting with the project manager, to read one reason from his or her list; everyone states a different reason until all have been recorded. After the session is over, the project manager reviews the list, looking for ways to strengthen the plan."

Quote (Collins, on the 30%):

- "…imagining that an event has already occurred with certainty, rather than considering that it may occur, increases the number of reasons generated for the potential future outcome by approximately 30%. Mitchell, Russo, and Pennington (1989) did not assess the quality of the reasons."

**Summary.** The procedure runs: brief the plan, declare that it has failed, have each person write reasons silently and alone, go round the table one reason at a time until the lists are exhausted, then the project manager strengthens the plan. Klein's claimed benefits are social as much as analytical. Dissent becomes safe, overconfidence drops, and the team becomes alert to early warning signs.

**Misreading to avoid.** Running it as a risk register ("what might go wrong, probability × impact"). Klein sets it against exactly that kind of session: it asks what *did* go wrong, and the value lies in the reasons people would otherwise hold back. Klein's procedure starts with each person writing reasons "independently". Running it as open group brainstorming skips that step.

**Drift (finding).** Klein's "increases the ability to *correctly identify* reasons… by 30%" overstates the study. Per Collins, the 1989 work measured the *number* of reasons generated, not whether they were correct. Klein's article is the source of the popular "30% more accurate" line. On a slide, say "about 30% more reasons", or drop the number. The study page itself was not opened (403), so this rests on Collins's reading. Open the paper before any slide puts weight on the figure.

**Backing lines:**
- klein-premortem-2007 `[checked:2026-10-06 result:CAVEAT due:none]` https://hbr.org/2007/09/performing-a-project-premortem — [practitioner direct] premortem procedure and contrast with critiquing sessions. CAVEAT: hbr.org paywalled; full text read in reprint https://comprobo25.github.io/assignments/performing_a_project_premortem.pdf.
- collins-premortem-30pct `[checked:2026-10-06 result:OK due:none]` https://corporate.jcx.au/premortem — [practitioner analysis] Mitchell/Russo/Pennington 1989 measured the number of reasons (~30% more), not their correctness; Klein's "correctly identify" overstates it.
- mitchell-russo-pennington-1989 `[checked:2026-10-06 result:CAVEAT due:none]` https://onlinelibrary.wiley.com/doi/abs/10.1002/bdm.3960020103 — [academic/research] original prospective-hindsight study. CAVEAT: 403, not opened; what it measured is taken from Collins.

---

## 5. Amazon Working Backwards: the PR/FAQ

**Primary (a):** https://www.workingbackwards.com/concepts/working-backwards-pr-faq-process [practitioner direct]. Colin Bryar & Bill Carr's own site ("we used it as the title for our book"), "The Amazon Working Backwards PR/FAQ Process". Opened 2026-10-06. The site also sells their course; the excerpts below are the explanatory article, not the course pitch.
**Primary (b):** Werner Vogels, "Working Backwards", All Things Distributed, Nov 2006. https://www.allthingsdistributed.com/2006/11/working_backwards.html [practitioner direct]. Opened 2026-10-06.
**Ian McAllister Quora answer (2012):** https://www.quora.com/What-is-Amazons-approach-to-product-development-and-product-management. Returned **403**; not opened. An excerpt is reproduced by Brendan Sterne: https://brendansterne.com/2013/11/21/amazon-product-management-working-backwards/ [practitioner analysis]. Opened 2026-10-06; wording verified against raw page text.
**Not opened:** the book *Working Backwards* (2021).

Quotes:

- (a) "Writing a press release is a forcing function to ensure that the creator of the new product idea is focused on the customer."
- (a) "…the External FAQ is a dialogue with your customer addressing their most important issues using language they can understand (that is, no corporate jargon)." … "A well-written internal FAQ section anticipates the most important questions that senior leaders and stakeholders in the company will ask after reading the PR."
- (a) "The first draft of a PR/FAQ should take only a few hours, not a few days." … "A great product development process should be a funnel, not a tunnel."
- (b) "Writing a press release up front clarifies how the world will see the product - not just how we think about it internally."
- McAllister, as reproduced by Sterne: "For new initiatives a product manager typically starts by writing an internal press release announcing the finished product. The target audience for the press release is the new/updated product's customers, which can be retail customers or internal users of a tool or technology."

**Summary.** The PR/FAQ is an internal decision document written before anything is built. The press release is written *as if for the customer*, in their language. The external FAQ answers the customer's questions; the internal FAQ answers leadership's (cost, feasibility, risks). It is cheap to draft so that many ideas enter and most are killed.

**Misreading to avoid.** Treating it as a marketing deliverable or a launch announcement. Its reader is internal (the decision-makers); the customer is the voice it is written in. Its internal FAQ includes "What are the top three reasons this product will not succeed?" (workingbackwards.com), which is not the polished pitch the popular telling imagines.

**Backing lines:**
- bryar-carr-prfaq `[checked:2026-10-06 result:OK due:none]` https://www.workingbackwards.com/concepts/working-backwards-pr-faq-process — [practitioner direct] PR/FAQ = press release + external FAQ (customer) + internal FAQ (leaders/stakeholders); forcing function on customer focus; first draft in hours; funnel not tunnel.
- vogels-working-backwards-2006 `[checked:2026-10-06 result:OK due:none]` https://www.allthingsdistributed.com/2006/11/working_backwards.html — [practitioner direct] Amazon CTO's 2006 description: press release first, then FAQ, working back toward implementation.
- mcallister-quora-2012 `[checked:2026-10-06 result:CAVEAT due:none]` https://www.quora.com/What-is-Amazons-approach-to-product-development-and-product-management — [practitioner direct] internal press release, target audience = the product's customers. CAVEAT: Quora 403; wording read in Sterne's reproduction https://brendansterne.com/2013/11/21/amazon-product-management-working-backwards/.

---

## 6. Luke Hohmann: Product Box

**Primary:** https://www.lukehohmann.com/innovation-games/product-box [practitioner direct]. Luke Hohmann's own site, Product Box page (from *Innovation Games*, 2006). Opened 2026-10-06.
**Not opened:** the book itself.

Quotes:

- "Product Box lets you leverage your customers' collective retail consumer experiences by asking them to design a box for your product. Not just any box, but a box that represents the product that they want to buy."
- "Ask your customers to imagine that they're selling your product at a trade show, retail outlet, or public market. Give them a few cardboard boxes and ask them to design the product box that they would buy." … "When finished, ask your customer to use their box to sell your product to you and the other customers in the room."
- "Watching the interaction among customers is often where you can identify the most important and useful information."
- "The reactions of other customers in the room help overcome one of the more common challenges faced by product teams: focusing on benefits instead of features. The advantage of selling the box is that, even if your customers have written a feature on their box, chances are good that they will sell it by promoting the benefits."

**Summary.** Customers build a box for the product they would want to buy and then sell it to the team and to each other. What comes out is which benefits customers believe matter most, in their own words. Much of the signal lies in how the other customers react to each pitch.

**Misreading to avoid.** Running it internally as a team visioning exercise. In Hohmann's version the box-makers are *customers*, and the team sits and listens ("make certain that your customers are standing up and that you're sitting down"). A team designing its own box is a different exercise and should not borrow his claim about what the game reveals.

**Backing line:**
- hohmann-product-box `[checked:2026-10-06 result:OK due:none]` https://www.lukehohmann.com/innovation-games/product-box — [practitioner direct] Product Box: customers design and sell a box; reveals the features and benefits they rate most important; customer-to-customer reactions are the richest signal.

---

## 7. Henrik Kniberg: aligned autonomy

**Primary (a):** Henrik Kniberg, "Alignment at Scale — or How to Not get Totally Unagile with Lots of Teams", FlowCon France 2016, raw talk transcript on the conference archive page. https://www.flowcon.fr/archives/2016/henrik-kniberg-alignment-at-scale-or-how-to-not-get-totally-unagile-with-lots-of-teams/ [practitioner direct]. Opened 2026-10-06. The page labels it "Raw Transcript"; treat the wording as spoken, lightly unedited.
**Primary (b):** Henrik Kniberg, "Spotify Engineering Culture (part 1)", blog.crisp.se, 27 Mar 2014. https://blog.crisp.se/2014/03/27/henrikkniberg/spotify-engineering-culture-part-1 [practitioner direct]. Opened 2026-10-06. The post is a video plus drawing. Its linked "full transcript" (Google Doc) returned 404, and the Spotify engineering blog copy carries no text. The 2014 wording was therefore **not** verified.

Quotes (a):

- "And it's the notion that alignment and autonomy are like at odds with each other. … I find it more useful to think of it as a two-dimensional kind of scale. And I have to be honest, I did not make this up, but I don't remember who I stole it from."
- "Low alignment, low autonomy, micromanagement. … Up top left, … High alignment, but still low autonomy. … But the nice quadrant is the top right, right? We need to cross the river. Managers, leaders are good at describing the why, why we're here, the context. And then they're letting the teams figure out the how."
- "Bottom right, high autonomy, low alignment. Well, that's when you got all these teams that are just doing whatever they want…"
- "The better you are at doing that, the more autonomy you can give out, and teams will use that autonomy in a good way. … So alignment enables autonomy. It's not either or. I call that aligned autonomy."

**Summary.** Alignment and autonomy are two separate axes, not two ends of one slider. Leaders supply the problem and the why (alignment); teams choose the how (autonomy). The more clarity leaders create, the more autonomy they can safely hand out.

**Misreading to avoid.** Treating "autonomy" as the goal and alignment as its cost, or alignment as telling teams the solution. In Kniberg's top-left quadrant ("build a bridge") the team is aligned but still not autonomous, because the how was handed down too.

**Drift (finding).** Kniberg says of the 2×2 itself: "I did not make this up, but I don't remember who I stole it from." Attribute "aligned autonomy" (the phrase) to him. Do not attribute the matrix as his invention.

**Backing lines:**
- kniberg-flowcon-2016 `[checked:2026-10-06 result:OK due:none]` https://www.flowcon.fr/archives/2016/henrik-kniberg-alignment-at-scale-or-how-to-not-get-totally-unagile-with-lots-of-teams/ — [practitioner direct] alignment/autonomy as two dimensions, quadrant descriptions, "alignment enables autonomy… I call that aligned autonomy"; Kniberg disclaims inventing the 2×2. Raw talk transcript.
- kniberg-spotify-culture-2014 `[checked:2026-10-06 result:CAVEAT due:none]` https://blog.crisp.se/2014/03/27/henrikkniberg/spotify-engineering-culture-part-1 — [practitioner direct] 2014 Spotify engineering culture video. CAVEAT: video only; linked transcript 404, so no 2014 wording verified.

---

## 8. Amy Edmondson: psychological safety (and Google's Project Aristotle)

**Primary:** Amy Edmondson, "Psychological Safety and Learning Behavior in Work Teams", *Administrative Science Quarterly* 44(2), June 1999, 350–383. Read on 2026-10-06 as a full-text PDF hosted by MIT: https://web.mit.edu/curhan/www/docs/Articles/15341_Readings/Group_Performance/Edmondson%20Psychological%20safety.pdf [academic/research].
**Project Aristotle:** Google re:Work, "Understand team effectiveness". https://rework.withgoogle.com/intl/en/guides/understand-team-effectiveness [practitioner direct: Google describing its own internal study, not peer-reviewed]. Opened 2026-10-06.

Quotes (Edmondson 1999):

- Abstract: "It introduces the construct of team psychological safety—a shared belief held by members of a team that the team is safe for interpersonal risk taking…"
- "Team psychological safety is defined as a shared belief that the team is safe for interpersonal risk taking. For the most part, this belief tends to be tacit—taken for granted and not given direct attention either by individuals or by the team as a whole."
- "The term is meant to suggest neither a careless sense of permissiveness, nor an unrelentingly positive affect but, rather, a sense of confidence that the team will not embarrass, reject, or punish someone for speaking up."
- "…psychological safety is not the same as group cohesiveness, as research has shown that cohesiveness can reduce willingness to disagree and challenge others' views, such as in the phenomenon of groupthink…"

Quotes (re:Work):

- "The researchers found that what really mattered was less about who is on the team, and more about how the team worked together. In order of importance: Psychological safety: …" (followed by dependability, structure & clarity, meaning, impact)
- Study size: "the research team identified 180 teams to study (115 project teams in engineering and 65 pods in sales)…"
- It cites Edmondson's definition verbatim: "a shared belief held by members of a team that the team is safe for interpersonal risk taking."

**Summary.** Psychological safety is a *team-level* shared belief that people can take interpersonal risks (asking, admitting a mistake, disagreeing) without being embarrassed, rejected, or punished. In the 1999 paper (51 teams at a manufacturer) it predicts learning behaviour, and learning behaviour mediates team performance. Google's internal study of 180 teams ranked it first of five dynamics.

**Misreading to avoid.** Psychological safety as niceness, comfort, or low standards. Edmondson rules out "a careless sense of permissiveness" and "unrelentingly positive affect", and separates it from cohesiveness, which can *suppress* disagreement.

**Drift.** The popular telling has Google finding psychological safety "far and away" the most important dynamic. The re:Work page as opened says "In order of importance", listing it first; it does not contain the "far and away" phrasing. Project Aristotle is Google's self-report, not a peer-reviewed study.

**Backing lines:**
- edmondson-1999-asq `[checked:2026-10-06 result:OK due:none]` https://web.mit.edu/curhan/www/docs/Articles/15341_Readings/Group_Performance/Edmondson%20Psychological%20safety.pdf — [academic/research] definition of team psychological safety; not permissiveness, not cohesiveness; learning behaviour mediates performance (ASQ 44(2), 1999).
- google-rework-aristotle `[checked:2026-10-06 result:OK due:none]` https://rework.withgoogle.com/intl/en/guides/understand-team-effectiveness — [practitioner direct] Project Aristotle: 180 Google teams; how the team works together mattered more than who was on it; psychological safety first of five dynamics. Google's self-report, not peer-reviewed.

---

## 9. Clayton Christensen: jobs to be done

**Primary (a):** Christensen, Hall, Dillon & Duncan, "Know Your Customers' 'Jobs to Be Done'", *HBR*, Sept 2016, pp. 54–62. https://hbr.org/2016/09/know-your-customers-jobs-to-be-done [practitioner direct]. The live page is paywalled; the full text was read on 2026-10-06 in the Wayback snapshot https://web.archive.org/web/20161222172057/https://hbr.org/2016/09/know-your-customers-jobs-to-be-done.
**Primary (b), the milkshake:** Christensen, Cook & Hall, "Marketing Malpractice: The Cause and the Cure", *HBR*, Dec 2005. Read on 2026-10-06 in the Wayback snapshot https://web.archive.org/web/20170830083251/https://hbr.org/2005/12/marketing-malpractice-the-cause-and-the-cure [practitioner direct].
**Supporting:** Christensen Institute, https://www.christenseninstitute.org/theory/jobs-to-be-done/ [practitioner direct]. Opened 2026-10-06.

Quotes:

- (a) "What they really need to home in on is the progress that the customer is trying to make in a given circumstance—what the customer hopes to accomplish. This is what we've come to call the job to be done."
- (a) "'Job' is shorthand for what an individual really seeks to accomplish in a given circumstance."
- (a) "When we buy a product, we essentially 'hire' it to help us do a job. If it does the job well, the next time we're confronted with the same job, we tend to hire that product again. And if it does a crummy job, we 'fire' it and look for an alternative."
- (a) "Jobs aren't just about function—they have powerful social and emotional dimensions."
- (b) "He was surprised to find that 40% of all milk shakes were purchased in the early morning." … "Most bought it to do a similar job: They faced a long, boring commute and needed something to make the drive more interesting."

**Summary.** A job is the progress a person is trying to make in a specific circumstance. People "hire" a product to make that progress and "fire" it when it does badly. The circumstance explains more than the customer's demographics or the product's attributes. In the milkshake case, improving the shake against a demographic profile did not lift sales. Learning that morning buyers were hiring it for a dull commute changed what the shake was competing with.

**Misreading to avoid.** Treating a job as a task or a feature request ("export to CSV"), or as a persona. Christensen et al. warn that "'Job to be done' is not an all-purpose catchphrase". The circumstance is the unit of analysis, and jobs carry social and emotional dimensions as well as functional ones.

**Drift (finding).** (1) The often-quoted "the progress that a person is trying to make in a particular circumstance" is **not** the 2016 HBR article's wording. The article says "the progress that the customer is trying to make in a given circumstance". Where the popular line originates was not traced here. It is not in the 2016 HBR article, so don't cite it there. (2) The milkshake story is **not in** the 2016 HBR article; a full-text search found no "milk". It appears in the 2005 "Marketing Malpractice" article, with the company "disguised".

**Backing lines:**
- christensen-jtbd-hbr-2016 `[checked:2026-10-06 result:OK due:none]` https://web.archive.org/web/20161222172057/https://hbr.org/2016/09/know-your-customers-jobs-to-be-done — [practitioner direct] job = progress the customer is trying to make in a given circumstance; hire/fire; social and emotional dimensions. Read in Wayback (live hbr.org paywalled).
- christensen-milkshake-hbr-2005 `[checked:2026-10-06 result:OK due:none]` https://web.archive.org/web/20170830083251/https://hbr.org/2005/12/marketing-malpractice-the-cause-and-the-cure — [practitioner direct] milkshake case: 40% bought early morning, hired for a long boring commute. Source of the story (not the 2016 article).
- christensen-institute-jtbd `[checked:2026-10-06 result:OK due:none]` https://www.christenseninstitute.org/theory/jobs-to-be-done/ — [practitioner direct] institute definition and functional/social/emotional forces.

---

## 10. Goodhart's law (and Strathern's phrasing)

**Goodhart original:** C.A.E. Goodhart, "Problems of Monetary Management: The U.K. Experience", in *Papers in Monetary Economics*, Vol. I, Reserve Bank of Australia, 1975; republished as a chapter in *Monetary Theory and Practice* (Macmillan, 1984). https://link.springer.com/chapter/10.1007/978-1-349-17295-5_4 [academic/research]. **Not opened**: Springer paywall, no text retrieved.
**Strathern:** Marilyn Strathern, "'Improving ratings': audit in the British University system", *European Review* 5(3), 1997, 305–321. https://www.cambridge.org/core/journals/european-review/article/improving-ratings-audit-in-the-british-university-system/FC2EE640C0C44E3DB87C29FB666E9AAB [academic/research]. Only the abstract and reference list were opened (paywall); body text not read.
**Secondary (opened):** Mattson, Bushardt & Artino, "'When a Measure Becomes a Target, It Ceases to be a Good Measure'", *J Grad Med Educ* 13(1), 2021, 2–5 (editorial). https://pmc.ncbi.nlm.nih.gov/articles/PMC7901608/ [academic/research]. Opened 2026-10-06.

Quotes:

- Mattson et al. 2021: "What is now known as Goodhart's law is most often generalized in a quote from anthropologist Marilyn Strathern, 'When a measure becomes a target, it ceases to be a good measure.' In its original form, Goodhart's law stated, 'Any observed statistical regularity will tend to collapse once pressure is placed upon it for control purposes.'"
- Strathern 1997 abstract: "…audit does more than monitor—it has a life of its own that jeopardizes the life it audits."
- Strathern's reference list cites Hoskin (1996), "The 'awful idea of accountability': inscribing people into the measurement of objects". The popular phrasing is commonly traced through Hoskin; the body text that would show the exact attribution was not read.

**Summary.** Goodhart, a monetary economist, observed that a statistical relationship a central bank relied on stopped holding once the bank began targeting it. Strathern, an anthropologist writing on university audit, generalised the idea into the line everyone quotes. The two claims differ in scope. Goodhart's is about statistical regularities breaking under control pressure; Strathern's is about any measure degrading once people are rewarded for hitting it.

**Misreading to avoid.** Quoting "When a measure becomes a target, it ceases to be a good measure" as Goodhart's words. It is Strathern's 1997 generalisation (Goodhart's is the "statistical regularity… control purposes" line). Also avoid reading it as "don't measure": both versions concern what happens when the measure *becomes the target*.

**Drift (finding).** The popular line is attributed to Goodhart but is Strathern's (1997). Neither primary text was opened, so both wordings rest on the 2021 JGME editorial.

**Backing lines:**
- goodhart-1975 `[checked:2026-10-06 result:CAVEAT due:none]` https://link.springer.com/chapter/10.1007/978-1-349-17295-5_4 — [academic/research] original wording "Any observed statistical regularity will tend to collapse once pressure is placed upon it for control purposes." CAVEAT: paywalled, primary not opened; wording via Mattson et al. 2021.
- strathern-1997 `[checked:2026-10-06 result:CAVEAT due:none]` https://www.cambridge.org/core/journals/european-review/article/improving-ratings-audit-in-the-british-university-system/FC2EE640C0C44E3DB87C29FB666E9AAB — [academic/research] source of the "When a measure becomes a target…" generalisation. CAVEAT: only abstract and references opened; quoted line via Mattson et al. 2021.
- mattson-2021-goodhart `[checked:2026-10-06 result:OK due:none]` https://pmc.ncbi.nlm.nih.gov/articles/PMC7901608/ — [academic/research] Goodhart's original wording vs Strathern's popular generalisation, side by side.
