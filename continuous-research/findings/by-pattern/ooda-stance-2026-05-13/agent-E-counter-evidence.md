# OODA stance-axis test — Counter-evidence + Husain — 2026-05-13

Agent E. Confirmation-bias guard active: the job here is to find the convergence breaking, not to prove it.

## Hamel Husain — stance probe

Hamel Husain, independent ML consultant (ex-Airbnb, ex-GitHub), co-creator of the AI Evals course with Shreya Shankar. Recent surface scanned: hamel.dev (5 posts since Oct 2025), substack, X.com profile.

### Sources

- "The Revenge of the Data Scientist" — hamel.dev, 2026-03-26. https://hamel.dev/blog/posts/revenge/ — [practitioner direct]
- "Evals Skills for Coding Agents" — hamel.dev, 2026-03-02. https://hamel.dev/blog/posts/evals-skills/ — [practitioner direct]
- "Why I Stopped Using nbdev" — hamel.dev, 2026-01-18. https://hamel.dev/blog/posts/ai-stack/ — [practitioner direct]
- "LLM Evals: Everything You Need to Know" — hamel.dev, 2026-01-15. https://hamel.dev/blog/posts/evals-faq/ — [practitioner direct]
- "Amp" notes — hamel.dev/notes/coding-agents/amp.html — [practitioner direct]
- "The best public example of AI Evals I've ever seen" — Substack — [practitioner direct]

All within freshness window. Bylines confirmed direct (own blog, own substack).

### Per-axis verdict

**Axis 1 — Scientist-not-engineer disposition: HELD (strong).** "Revenge of the Data Scientist" is essentially a manifesto for this axis. Direct quote: *"Data scientists don't trust the data. They don't trust the labels. They don't trust anything. They are skeptical by training."* Contrasts engineers building on "vibes" against the data-scientist instinct to interrogate. Also reverses on his own tool: *"Because I have invested thousands of hours into nbdev, it's difficult to admit there are better tools for the outcomes I want. But I must check my ego at the door."* (ai-stack post). Public reversal on evidence is on-record.

**Axis 2 — Writing-down IS the work: HELD (strong, but the artefact is different).** Husain's primary artefact is the eval / annotation tool / trace viewer, not CLAUDE.md. From Revenge: *"Code your own custom trace viewer so you can remove friction."* From Evals Skills: he shipped an open-source eval-skills plugin so coding agents inherit eval discipline by reading skill files. He treats Skills as the leverage point for compounding agent capability. This is a stronger form of the axis: not just write rules down but build the instrumentation that makes the rules executable.

**Axis 3 — Ship cheaper than argue: HELD.** From Revenge: *"I recently gave a talk... to make that case with examples rather than assertion alone."* Repeatedly favours showing over arguing. From evals-faq: *"Start with error analysis, not infrastructure—spend 30 minutes manually reviewing 20-50 LLM outputs whenever making significant changes."* The bias is toward fast empirical loops over architectural debate.

**Axis 4 — Taste as the irreducible asset: HELD (strongest of the five).** Husain's entire eval thesis is that taste — encoded as a domain expert's verdicts, error analysis rubrics, custom annotation tools — is the only durable asset. From evals-faq: *"Use one domain expert who understands your users as your quality decision maker (a 'benevolent dictator')."* Effort goes into the brief / verifier / rubric, not into the model or the prompt. This is the most aligned axis in the entire sample.

**Axis 5 — Reagents-not-opex cost frame: PARTIAL.** Closest quote (Amp note): *"You pay per token and it's not cheap. However, I like it enough to where I think it's worth it because it saves me time."* He acknowledges cost, accepts the trade-off, but doesn't explicitly reframe tokens as research-budget reagents. The framing is leverage-on-time, not experimentation-budget. Score this PARTIAL — the disposition is compatible but not articulated in those terms.

### Beyond the five — Husain-specific axes

Two stance-axes Husain adds that the original sample under-weighted:
- **Domain-expert-as-bottleneck:** the constraint is not the agent, the model, or the eval — it's whether you have a human who can decide what "good" looks like. The benevolent dictator construct.
- **Error-analysis-first ordering:** infrastructure debt is invisible until you've looked at 20 outputs. He inverts the standard "set up the pipeline first" instinct.

### Contradictions

None found. Husain is the cleanest single-practitioner expression of axes 1, 2, 4 in the sample, and the others are at-worst-neutral.

---

## Failure cases — named practitioners who reversed

Substantive search across multiple query angles. Findings below, with the honest negative result at the end.

**Dragos Nedelcu (theSeniorDev)** — https://www.theseniordev.com/blog/why-i-stopped-using-ai-as-a-senior-developer-after-150-000-lines-of-ai-generated-code — [practitioner direct]. Founder/Senior Developer. Reports: "150,000 lines of AI-generated code," accumulated technical debt, `git reset` and start over, 60% refactor required. *"I slowly watched my technical skills get worse."* **But:** this is copilot/chat-style AI coding (ChatGPT, Copilot, Windsurf back-and-forth prompting), not autonomous agentic coding (Claude Code, Cursor agents). Nedelcu **did not hold the stance first.** He rejected the productivity-over-fundamentals premise from the outset. Useful as a "made it not work without the stance" case, not as a stance-failure.

**Simon Willison** — https://simonwillison.net/2026/May/6/vibe-coding-and-agentic-engineering/ — [practitioner direct], 2026-05-06. Simon is in the original convergence sample. He has NOT reversed, but has **flagged a refinement**: *"those things have started to blur for me already, which is quite upsetting."* He's uncomfortable that his own code-review discipline has eroded as agents proved reliable — calls it "normalization of deviance." Important nuance: a convergence member surfacing risk-of-decay in his own practice. The stance still holds; the warning is that the stance is hard to keep stable.

**Vibe-coding production failures cluster** (Moltbook, Lovable, Base44, Replit-agent-wipes-DB, Escape.tech 5,600-app scan finding 2,000+ vulnerabilities) — https://earezki.com/ai-news/2026-04-26-vibe-coding-just-failed-its-first-real-audit/, https://getautonoma.com/blog/vibe-coding-failures — [practitioner analysis]. Real reversals exist at the **product** layer but the operators are anonymous or vendor-tier, not named practitioners with documented prior stance.

**James Gosling** (Java creator) quoted via context-studios — https://www.contextstudios.ai/blog/the-vibe-coding-hangover-why-developers-are-returning-to-engineering-rigor — [practitioner analysis], 2026-01-30. *"As soon as your vibe coding project gets even slightly complicated, they pretty much always blow their brains out. Not ready for the enterprise."* Gosling is a named, high-credibility critic — but he never held the stance to reverse from. He's a stance-rejecter, not a stance-failure.

**Negative finding (most important):** After substantive search across hamel.dev, simonwillison.net, X.com, Hacker News April–May 2026, vibe-coding-failure cluster, and broader practitioner blogs, **I found zero named practitioners who (a) publicly held the 5-axis stance for 3+ months, (b) ran agentic coding seriously, then (c) reversed and named the stance as the reason it failed.** The closest analog — Simon Willison — is articulating a *risk* his own success introduces (review erosion), not a reversal. The "Klarna of agentic coding" doesn't exist on the public record as of 2026-05-13.

Search paths attempted (negative): "practitioner reversed agentic coding 2026", "Claude Code abandoned 2026", "vibe coding regret named engineer 2026", "compound engineering critique pushback 2026", failure-mode posts on hamel.dev / simonwillison.net / pragmaticengineer.

The non-result is itself a signal: either the stance is genuinely stabilising and the practitioners holding it don't reverse, OR the failure cases are not public yet (six-month freshness window may be too tight for a full deploy → fail → blog cycle).

---

## Pushback voices — practitioners critiquing the convergence

Counter-evidence is concentrated in three clusters.

**1. Empirical CLAUDE.md / context-file critique (strongest counter-evidence).**

- **ETH Zurich research team (Gloaguen et al., 2026-02-13)** — arXiv:2602.11988 — [academic/research]. **N=300 (SWE-bench Lite) + N=138 (AgentBench, novel).** Four agents tested (Claude Code, Codex variants, Qwen Code). LLM-generated context files **reduced success rate by 3%** on average; developer-written files only +4%. **Costs +20-23% per task.** Conclusion: agents follow context too literally, redundant noise, comprehensive overviews underperform. This is the single most rigorous counter-claim to Axis 2 (writing-down IS the work). Convergence cohort treats CLAUDE.md as load-bearing; ETH says it slightly hurts on standard benchmarks. Caveat: benchmarks may not capture the long-horizon, multi-session value where the convergence cohort uses it.
- **Jason Gorman (Codemanship), 2026-03-03** — https://codemanship.wordpress.com/2026/03/03/yeah-about-your-claude-md-file/ — [practitioner direct]. Three years LLM experimentation, measures via acceptance tests. Position: *"attention dilution"* from comprehensive context, prefers minimal task-specific contexts, advocates **static analysis** as superior to LLM-generated summaries. Direct attack on Axis 2 as universal practice.

**2. Productivity-paradox / cognitive-cost critique.**

- **Hacker News thread "Claude Code and the Great Productivity Panic of 2026"** — https://news.ycombinator.com/item?id=47467922 — [practitioner direct], April–May 2026. Quoted skeptics (HN handles, treat as anonymous practitioner voices): *"After a 3 hour frantic agentic coding stint, you are just mentally exhausted from the sheer speed and volume of actions"* (PeterStuer); cognitive fragmentation from multi-agent management (scuff3d); productivity-treadmill ("everyone has to do more to keep up", master_crab); quality-not-improving despite output increase (iainctduncan). Attacks Axis 3 (ship cheaper than argue) — claims the shipping is cheap but the cognitive toll is not.

**3. Vibe-coding-hangover / engineering-rigor cluster.**

- **Michael Kerkhoff (Context Studios), 2026-01-30** — https://www.contextstudios.ai/blog/the-vibe-coding-hangover-why-developers-are-returning-to-engineering-rigor — [practitioner direct]. Argues for "Structured Vibes": rapid prototyping with AI for low-stakes, human-led architecture for production. Cites Veracode 2025 (45% AI-generated code has security vulns) and CodeRabbit (1.7x more issues). Caveat: Veracode is vendor-adjacent; verify before citing the stat. Attacks Axis 4 indirectly — argues taste alone is insufficient without classical disciplines.
- **James Gosling** (quoted) — same article, [practitioner analysis]. *"Not ready for the enterprise because in the enterprise, software has to work every fucking time."*
- **Dragos Nedelcu** — see failure-cases section. Practitioner argument against productivity-stance entirely.

**Not finding strong critique of:**

- **Axis 1 (scientist disposition)** — no practitioner argues for being less empirical / less reversible. Even critics share the disposition.
- **Axis 5 (reagents-not-opex frame)** — closest is the Anthropic Pro-plan-Claude-Code economics episode (April 2026), where the cost frame became a vendor-side problem, not a practitioner-stance critique.

---

## Summary

**Verdict: PARTIAL with named risks.**

Husain holds 4/5 axes cleanly (1, 2, 3, 4) and is the cleanest single expression of Axis 4 (taste-as-irreducible-asset) in the entire sample. Axis 5 is partial — he accepts the cost trade-off but doesn't articulate the reagents frame. Husain adds two stance-axes the original sample under-weighted: domain-expert-as-bottleneck and error-analysis-first ordering.

Counter-evidence sweep found **zero named practitioners who held the stance and reversed.** That non-result is the headline finding — either the stance genuinely stabilises practitioners, or the failure cycle is longer than the 6-month freshness window.

Real counter-evidence sits in three clusters: (a) ETH Zurich academic study showing CLAUDE.md slightly hurts on standard benchmarks (Axis 2 attacked at the artefact level — strongest piece of disconfirming evidence in the sweep), (b) productivity-paradox voices flagging cognitive toll (Axis 3 attacked at the human-cost level), (c) vibe-coding-hangover cluster arguing classical disciplines must remain (Axes 3 + 4 attacked at the discipline-mix level). Simon Willison — in the convergence sample — flagged self-erosion of review discipline as a stance-internal risk.

Recommend the convergence finding ship with the ETH Zurich result foot-noted and the "no public reversals yet" non-result called out explicitly.
