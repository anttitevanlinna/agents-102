# Fredrik Wollsén (Helsinki) — one operator, many sessions

**Type:** individual practitioner inside a transitioning org · **Team:** 4 engineers ·
**Company:** F-Secure Oyj (Helsinki, Finland; Nasdaq Helsinki; 616 FTE as of 2026-08-01, [stockanalysis.com](https://stockanalysis.com/quote/hel/FSECURE/company/) `[general press]`, bare fact only) ·
**Documentation depth:** Signal (the `observations/README.md` tier, not an evidence level) ·
**Evidence levels, mixed and tagged per claim below:** L1 for his opinions and his framework, L2 for the one self-measured month. Nothing here is L3. ·
**Nordic label:** Nordic-origin deployment; the pattern itself is Nordic-relevant, not Nordic-specific ·
**Filed:** 2026-08-09

## Three disclosures before anything below is used

**Employer naming.** Wollsén anonymises his employer in both cited posts ("a European cybersecurity company"). He names F-Secure himself on his own commercial sites — [augmentedmind.io/course](https://augmentedmind.io/course/) `[practitioner direct]` (*"a 4-engineer team at F-Secure that ships 400+ PRs/month"*) and [agentherder.com/course](https://agentherder.com/course/) `[practitioner direct]` (*"the 4-engineer team I lead at F-Secure"*). Both are his own signed commercial pages, cited here only for the bare employer-identity fact. We name it because he named it first. It is not our deduction.

**Independence: the maintainer's assessment, with an acquaintance declared.** F-Secure is also this corpus maintainer's own delivered commercial engagement, excluded from every signal and convergence count in `findings/by-domain/coding-engineering.md`. **The maintainer's assessment is that Wollsén's practice is independent of that engagement** — this is not our own intervention reporting back. The method behind that assessment is not recorded here, so it is his judgement rather than a documented verification, and it should be read as such. The two are also personally acquainted. Following `observations/ramp.md`, that is disclosed rather than buried: *independent* is a weaker claim than *blind to each other*.

**Commercial interest.** He sells two free-tier courses and a paid bootcamp with an outcome-bound refund built on this method, plus a forthcoming Claude Code skill. The 490 figure is the product's proof-point. Every performance citation below therefore carries `[practitioner direct, commercial interest]`; identity and method citations carry the plain label.

## What he reports

**490 merged PRs personally in June 2026**; four-person team merged **844**. Median PR **122 lines across three files**, offered specifically to pre-empt the micro-commit objection. Self-audit method: every June PR classified in context, siblings grouped, rework tagged, giving ~739 traditionally-sized pieces of work and **~620 after removing rework (~155/engineer)**. The overwork hypothesis was explicitly tested and rejected. His own career-best months previously: **20–40 merged PRs**. Context is a production platform with continuous releases, live enterprise partners and paying customers; PRs are peer-reviewed and merged by colleagues. **L2 — a single self-measured case.** Not a benchmark, not a rate. As a first-hand, dated, specific completed month it stays citable indefinitely *as an account* (§2a durable-account carve-out); the moment it is used to say what is typical now it is back on the clock. [This is getting ridiculous](https://positivelyfred.substack.com/p/this-is-getting-ridiculous-i-shipped) `[practitioner direct, commercial interest]`, 2026-08-06.

**Working state:** *"30 to 40 sessions open, of which I actively manage 10 to 15 through a working day."* This is the whole of what he publishes about the mechanics. **L1.**

**Bottlenecks are organisational, not technical.** *"We are blocked a lot of the time… Almost none of the bottlenecks are technical. It's nearly always that somebody at some point decided a process has to work a certain way."* On adoption: *"most people go quiet. They don't tell us something is broken, they just stop using the thing and quietly find another way."* And *"the development speed moved by an order of magnitude and the expectations around it barely moved at all."* **L1.** This is **thematically consistent with, but adds no evidence to,** the L3 convergence at `synthesis/patterns.md` Pattern 47 and Pattern 50 — a single unaudited practitioner statement resonating with a pattern does not increment that pattern's count. What is genuinely new is the vantage point: **as far as this corpus currently shows**, every Nordic leg feeding those patterns is a survey house or an executive, and this is the first from inside the engineering function, first-hand. That composition claim is checkable against `synthesis/nordic-landscape.md`; it has not been re-counted this pass.

**Two coinages worth keeping.** *"AI bending"* — *"organizing and redirecting a flow of energy, except the energy is LLM tokens and what comes out the other end is working software."* And **"flying in a greenhouse"** — extreme velocity inside organisational constraints. The second names something this corpus tracks and has had no practitioner word for.

**The Crawl precondition**, the most transferable claim in either post: *"Your team needs to be able to ship software before AI can make them faster at it. Working CI/CD, understood testing environments, confident deploys and rollbacks."* [The AI-Native Engineering Playbook](https://positivelyfred.substack.com/p/the-ai-native-engineering-playbook) `[practitioner direct, commercial interest]`, 2026-03-04. **L1.**

**The Walk failure mode**, unusually crisply put: *"Coding agents have a bias toward declaring victory. Claude will create 15 files and some unit tests and announce everything is production-ready. Nothing has been tested manually. Nothing has been deployed. No edge cases explored."* **L1.** Worth cross-referencing into `coding-engineering.md` § *What We Did Not Find* #9 as the first named in-window practitioner instance of agentic-context premature-completion behaviour. An instance, not a measurement; it does not close that item.

**Provenance of the four-stage model.** Crawl / Walk / Run / Fly is co-authored with **Jesse McCrosky** (Thoughtworks), credited in the March post's footer: *"This post grew out of a conversation with Jesse McCrosky, who asked me what an AI-maximalist consulting engagement looks like."* The ladder was generated in a conversation about what a consulting engagement looks like, which is worth knowing before treating it as distilled practice.

## Numbers that must not be carried

**Per-stage PR bands (Crawl 5–10 · Walk 10–20 · Run 30–80 · Fly 100–200+) — `[UNVERIFIED STAT]`, do not cite.** Verified by targeted fetch: these **do not appear in the March article**. They were attached five months later by the same author with no derivation, no population, no sample, no method. Four round bands, each roughly doubling, terminating in an open-ended "200+", with his own 490 landing above his own top rung. A zombie stat being born rather than inherited.

**"Median developer 5–6 merged PRs/month, elite 9–11" — `[UNVERIFIED STAT]`, do not cite.** Stated as "published benchmarks" with no citation. Two searches plus two fetches found no original.

**On the comparators, and read this before using them.** Two public figures were found, and **both are Level 0 with a direct commercial interest in how "median" and "elite" engineering throughput get defined** — they sell engineering-metrics tooling. They are used here only to establish that the un-sourced baseline is *not corroborated by anything public*, never as true values:

- [LinearB 2026 benchmarks](https://linearb.io/blog/engineering-metrics-benchmarks-what-makes-elite-teams) `[survey, commercial venue]` — median **12.4** merged PRs/month, elite **>20**/month, over a stated 8.1M PRs / 4,813 teams / 163,820 contributors / 42 countries. Publication month not recorded; **`[checked:2026-08-08 result:CAVEAT due:asap]` — confirm it sits inside the window before reuse.**
- [Graphite](https://graphite.com/research/commit-frequency) `[vendor press release]` — *"the median active developer merges a median of 2 PRs a week"* (~8–9/month). **Sample size undisclosed, and its dataset reportedly spans 1/2023 onward.** A multi-year blended window is **not a valid current comparator for a 2026 agentic-era baseline**; retained as long-run historical context only, and it should not be cited as a present-day figure.

**Do not compute a multiplier from any of this.** Per §12, comparing throughput numbers requires the same axis and a named population, and here the populations are incommensurable: one self-selected individual reporting his own best month against a cross-company median engineer. The qualitative finding survives and is the only importable part — **the un-sourced baseline Wollsén cites sits below every public comparator found, which inflates whatever multiple it is used to compute.**

**Also `[UNVERIFIED STAT]`:** *"80% of cross-team sync meetings become unnecessary"* (round number, no baseline, no method); *"three months → one week to staging"* (n=1, no named integration, no counterfactual); *"3–4× the value of an average team"* (self-estimate, no axis).

**Citation mismatch, correctable in place.** He attributes Anthropic's 8× to [anthropic.com/research/how-ai-is-transforming-work-at-anthropic](https://www.anthropic.com/research/how-ai-is-transforming-work-at-anthropic) `[vendor case study]`, Level 0. This corpus's own trace (`findings/by-pattern/productivity-gains-2026-06-25/`) puts the 8× in *When AI builds itself* (2026-06-04), and the post he links carries the cleaner **67% increase in merged PRs per engineer per day**. Anthropic itself calls 8× *"almost certainly an overstatement of the true productivity gain."* **`[checked:never result:NEEDED due:asap]`** — not re-fetched this pass; this is the KB's prior, not fresh verification.

## Counter-evidence from practitioners

**Addy Osmani, [*Your parallel Agent limit*](https://addyosmani.com/blog/cognitive-parallel-agents/)**, 2026-04-07 `[practitioner direct]`. *"Your cognitive bandwidth doesn't parallelize. The agent does the generating. You still do all the evaluating, deciding, trusting, and integrating."* His own ceiling: *"somewhere around three to four threads depending on complexity,"* and *"three focused, well-reviewed threads produce more usable output than six threads I'm half-supervising."* **Against Wollsén's 10–15 actively managed: two named practitioners, an order of magnitude apart on the same axis, four months apart, neither instrumented.**

**Kieran Klaassen**, [every.to](https://every.to/source-code/the-folder-is-the-agent), 2026-04-13 `[practitioner direct, vendor venue]` — *"more agents didn't make me faster."* **L1.** Date and URL inherited from the `coding-engineering.md` citation, not re-verified this pass.

**Matt Asay**, [InfoWorld](https://www.infoworld.com/article/4135492/ai-agents-and-bad-productivity-metrics.html), 2026-02-23 `[tech press]` — *"If your organization starts celebrating 'commit velocity' in the agent era, you are not measuring productivity."* Cites no data; **L1 framing only.** At the window edge — this exits the 6-month window on **2026-08-23**.

## Corroborating pattern from vendor data — weaker, and not peer to the above

**Faros AI: +98% PRs merged per developer with org DORA flat**, [faros.ai](https://www.faros.ai/blog/ai-software-engineering) `[survey, commercial venue]`, Level 0, **`[UNVERIFIED STAT]`** — round number, no sample size, no named organisation, no methodology surfaced. Already logged in `findings/by-pattern/productivity-gains-2026-06-25/SYNTHESIS.md` and `findings/by-pattern/absorption-bottleneck.md`. It is the exact shape of the trap this file is about — PR count doubles, outcome does not move — which is why it is kept, and it is deliberately **not** filed with Osmani, Klaassen and Asay above: a vendor reporting on its own customers is not counter-evidence of the same standing as a named practitioner writing on his own venue.

**This corpus's own honest curve** is the stronger version of the same point. `findings/by-pattern/productivity-gains-2026-06-25/SYNTHESIS.md`: credible independent throughput measurements converge at **~1.5–2×**, org-level outcome at **~10%**, and every 4–8× figure traces to code-volume share, modeled ROI, or testimonial. Wollsén sits an order of magnitude beyond the top of that range. He half-concedes the unit is different: *"the inward turn is a workaround, not the goal."*

**No critique of Wollsén specifically exists.** Searched 2026-08-08, HN and open web: nothing. The post was two days old. Read the absence as *too new*, never as *unchallenged*.

## His own admissions, worth as much as the claims

*"Some of what we ship, especially internal tooling, is rougher than people are used to, because it was built in an hour instead of over a couple of days."*

*"The inward turn is a workaround, not the goal"* — he states that the PR volume currently reflects internal optimisation rather than external delivery value.

*"This is the first post I've finished without quite knowing what it means."*

## What the articles do not contain

**No mechanics for the 30–40 sessions.** No tooling, no tmux or screen setup, no naming convention, no queueing discipline, no worktree layout, no rule for deciding what to attend to next. The single concrete statement is the count. This is the largest hole relative to the articles' own thesis: the parallelism is the claim, and the parallelism is undocumented. Per §13, the only claim licensed here is *he has not published the mechanics* — not that they exist in some undocumented form, and not why.

**No review or verification process at volume.** Who reviews 490 PRs, how quality is verified, what broke, what fraction was sibling-fix rework. Rework is named as a category during his self-audit and never quantified.

**One internal tension worth watching.** His product page says the team *"ships 400+ PRs/month"* while the blog's headline month is **844**. Not a contradiction, but a different anchor, and it suggests **June may be atypical rather than steady-state**.

## Contrast with Spotify — our reading, not a documented finding

**Everything in this section is analyst synthesis over two case files, and it is flagged before the table rather than after it.** Spotify's entry is a Moderate case; this one fails admission gate 2. The structural attributes below — including *assimilation* as Wollsén's binding constraint — are **our inference from the two accounts, not claims either party makes.** Neither Wollsén nor Spotify offers this taxonomy.

| | Spotify / Honk | Wollsén / F-Secure |
|---|---|---|
| Locus | Org-owned background fleet, Slack-triggered | One operator's interactive sessions |
| Owns the throughput | The system | The human |
| Work class | Known-shape, routinisable (migrations) | Novel product work |
| Scaling mechanism | **Fan-out** of a fleet | **Fan-in** of one operator's attention |
| Prerequisite | Years of infrastructure capital | Months of one person's practice |
| Transfer shape | Install the platform | Coach the human |
| Binding constraint *(inferred)* | **Verification** | **Assimilation by the surrounding org** |
| Survives the person leaving | Yes | Unknown, untested |

**Our reading:** Spotify industrialises the supply of a known change-shape; Wollsén raises the span of control of one operator over novel work. Capital substitution versus human-capital accumulation. On that reading a CTO takes *build the verification substrate* from Spotify and *your intake is the problem, not your substrate* from Wollsén. Both can be true in one company, and a single label for both would destroy exactly that distinction.

**A station the absorption sequence does not have.** `findings/by-pattern/absorption-bottleneck.md` runs generation → verification → absorption, where absorption is the review queue. Wollsén's review queue clears — colleagues merge his PRs. What fails is downstream of review: the organisation cannot change its expectations fast enough to *use* what was already merged. Proposed name: **assimilation**. He offers only the symptom, plus his own word for it, *flying in a greenhouse*. The naming is ours.

## Open questions he poses — take these as research prompts

1. Why does "using AI" read to almost everyone as one-to-three sessions rather than parallelism — *"the parallelism part, which is where the economics actually change, somehow doesn't land"*?
2. Why do non-engineers with full Claude Code access barely open it?
3. Why isn't access the bottleneck — *"a Claude Code subscription costs a company about as much as a phone plan"*?
4. *"Whether existing teams can generally be coached into it, or whether you need to rebuild teams around people who already work this way."* **This is the transition-playbook question `patterns.md` Pattern 50 says does not exist. He is inside it and does not know the answer.**

## Admission gates

| Gate | Verdict | Why |
|---|---|---|
| 1. Truly agentic? | **PASS** | Multi-step autonomous sessions with real tool use: `gh` CLI, worktrees, servers, browsers. Not a chatbot, not a copilot. |
| 2. Independent evidence? | **FAIL** | Every throughput number originates with the author. Colleague review and merge is an internal check, not an independent source. Employer identity is independently corroborated; throughput is not. |
| 3. Specific outcome? | **PARTIAL** | Named practitioner, named employer, specific practice, URLs — but the measurable result is an **output count, not an outcome**, and he says so himself. |

**Net: fails admission as a Production Agentic Deployment finding.** Filed as an observation, and at L1 in `coding-engineering.md`, not as a domain finding.

## Source verification

Stamps, not prose checkboxes — `source-freshness.sh` reads these; a bullet list of intentions reads to nobody.

- `[checked:2026-08-08 result:OK due:2026-09-04]` https://positivelyfred.substack.com/p/the-ai-native-engineering-playbook — `[practitioner direct, commercial interest]` Crawl/Walk/Run/Fly and the Crawl precondition. Published 2026-03-04, so it **leaves the 6-month window on 2026-09-04**; the model and the precondition are moving-world claims, not a completed event, so they need re-dating or replacing then. fallback: keep the Crawl precondition as a dated 2026 practitioner statement and drop the stage ladder, which is the weaker half anyway.
- `[checked:2026-08-08 result:OK due:none]` https://positivelyfred.substack.com/p/this-is-getting-ridiculous-i-shipped — `[practitioner direct, commercial interest]` the June 2026 count. Durable-account carve-out: first-hand, specific completed month, dated in body. `due:none` scopes **only** to *what he counted in June 2026*. Any use of it to describe current or typical velocity is a currency claim and owes its own dated stamp.
- `[checked:2026-08-08 result:OK due:2026-08-23]` https://www.infoworld.com/article/4135492/ai-agents-and-bad-productivity-metrics.html — `[tech press]` framing only. Exits the window 2026-08-23. fallback: drop it; the corpus's own 1.5–2× curve makes the same point with better evidence.
- `[checked:2026-08-08 result:OK due:2026-10-07]` https://addyosmani.com/blog/cognitive-parallel-agents/ — `[practitioner direct]` the three-to-four-thread ceiling, the load-bearing counter-evidence.
- `[checked:never result:NEEDED due:asap]` https://every.to/source-code/the-folder-is-the-agent — `[practitioner direct, vendor venue]` Klaassen's "more agents didn't make me faster". Date and URL inherited from `coding-engineering.md`, never opened by this file.
- `[checked:never result:NEEDED due:asap]` https://linearb.io/blog/engineering-metrics-benchmarks-what-makes-elite-teams — `[survey, commercial venue]` publication month unrecorded, so window membership is unconfirmed while it is used as a comparator.
- `[checked:never result:NEEDED due:asap]` https://graphite.com/research/commit-frequency — `[vendor press release]` confirm the 1/2023-onward data window first-hand; if it holds, this stays historical context and never a current comparator.
- `[checked:never result:NEEDED due:asap]` https://www.faros.ai/blog/ai-software-engineering — `[survey, commercial venue]` the +98% figure needs its sample size and methodology traced or it stays `[UNVERIFIED STAT]` permanently.
- `[checked:never result:NEEDED due:asap]` https://www.anthropic.com/research/how-ai-is-transforming-work-at-anthropic — `[vendor case study]` the 8×-versus-67× correction is the KB's prior, not re-verified here.
- `[checked:2026-08-08 result:OK due:none]` https://stockanalysis.com/quote/hel/FSECURE/company/ — `[general press]` headcount, bare fact, point-in-time.
- `[checked:never result:NEEDED due:2026-09-08]` — critique or replication of the June-2026 count. Nothing existed on 2026-08-08 because the post was two days old; absence then carries no information.
- `[checked:never result:NEEDED due:asap]` — `synthesis/patterns.md` Pattern 47 / Pattern 50 and `findings/by-pattern/absorption-bottleneck.md` are cited here without their own dates, so their freshness is currently inherited silently.

## Watch

- Does he ever publish the mechanics — session topology, queueing discipline, what he attends to next? That is the piece the field is missing, and its absence is the strongest reason to hold the claim loosely.
- Does any independent party audit the 490, or does a second practitioner report the same order of magnitude? Until then Osmani's three-to-four stands unrefuted on the same axis.
- Does the team's throughput hold outside June?
