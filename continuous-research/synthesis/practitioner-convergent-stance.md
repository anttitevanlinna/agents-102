---
type: synthesis
domain: coding-engineering
evidence_level: 3-candidate
practitioners: [Cherny, Klaassen, Shipper, Curran, Charles, Karpathy, Willison, Ronacher, Hashimoto, Ball, Huntley, Yegge, Husain, Larson, Böckeler]
nordic: false
updated: 2026-05-13
answers:
  - "what do practitioners who got agentic coding working actually believe?"
  - "what's the stance behind the technique?"
  - "does the stance transfer to consultancy practitioners?"
  - "is there counter-evidence?"
sources_ooda: continuous-research/findings/by-pattern/ooda-stance-2026-05-13/
---

# Practitioner Convergent Stance — Agentic Coding

**Evidence level:** L3 candidate on the *composite stance*; per-axis varies — Axes 1–4 hold across 10–12 practitioners each; Axis 5 has 6 clear HOLDs (L2-approaching-L3). **Sample:** 13 table-evidenced practitioners + 2 narrative-role (Shipper, Willison). One contradicting case (Böckeler) on Axes 3 + 5; one L2 academic disconfirmation on Axis 2. | **Last updated:** 2026-05-14 (OODA cycle 1)

## Bottom line

The practitioners who got agentic coding working **diverge sharply on technique** (vanilla Claude Code vs. built harness vs. plugin vs. fleet orchestrator vs. essays only) and **converge on stance.** Four axes hold robustly across 10–12 named practitioners inside the 6-month freshness window; Axis 5 (reagents-not-opex cost frame) holds for 6 — a weaker convergence signal worth flagging at first reference. Three caveats matter for how this gets used:

1. **The convergence is structurally product-company-shaped.** Böckeler (Thoughtworks) contradicts axes 3 and 5 from a consultancy seat — velocity and reagent-cost-frame don't transfer to advisory practice. Artefact discipline (axis 2) and taste-as-irreducible (axis 4) do.
2. **Axis 3 (ship cheaper than argue) has an inside-the-convergence tension.** Ronacher and Willison — both convergence members — independently flag *review-bandwidth* as the era's emerging structural bottleneck. "Throttle the inflow" sits in tension with "ship cheaper than argue." Worth promoting to its own axis or refining Axis 3's scope.
3. **One L2 academic study disconfirms Axis 2 at the benchmark level.** ETH Zurich (Feb 2026, N=300 SWE-bench Lite + N=138 AgentBench): LLM-generated context files reduce success by 0.5% (SWE-bench Lite) and 2% (AgentBench); cost +20–23%. **[UNVERIFIED STAT — pulled via Medium summary citation chain; verify against [arXiv:2602.11988](https://arxiv.org/abs/2602.11988) PDF directly before any downstream use.]** Practitioner CLAUDE.md success may live in long-horizon multi-session work that benchmarks don't capture, but the result deserves a footnote, not a dismissal.

**Preliminary negative finding (L1 — methodology-thin):** Within the 6-month freshness window and across the searched practitioner-blog set (hamel.dev, simonwillison.net, lethain.com, X.com, Hacker News April–May, the vibe-coding-failure cluster, Pragmatic Engineer), no named practitioner was found who (a) publicly held the 5-axis stance for 3+ months, (b) ran agentic coding seriously, then (c) reversed and named the stance as cause. Two competing explanations: stance genuinely stabilises holders; or the deploy→fail→blog cycle exceeds the 6-month window. **Treat as preliminary** until cycle 2 expands the search to a 12-month window and systematises the feed scan.

## The five stance-axes

### Axis 1 — Scientist-not-engineer disposition

Codebase as lab. PR as experiment. Replication as verifier-runs-N-times. Public reversal on evidence treated as virtue, not weakness. Failures published, not buried.

| Practitioner | Verdict | Anchor quote / URL | Source type |
|---|---|---|---|
| Cherny | HELD | "give Claude a way to verify its work" — [bcherny X](https://x.com/bcherny/status/2017742741636321619) | [practitioner direct] |
| Klaassen | HELD | run the verifier 10 times before trusting it — [Every / *Definitive Guide*](https://every.to/source-code/compound-engineering-the-definitive-guide) | [practitioner direct] |
| Karpathy | HELD | public reversal Dec 2025 — [Karpathy X.com](https://x.com/karpathy/status/2015883857489522876) | [practitioner direct] |
| Ronacher | HELD (canonical) | "I've fully come around and now vastly prefer explicit cache management" — [*Agent Design Is Still Hard*](https://lucumr.pocoo.org/2025/11/21/agents-are-hard/) | [practitioner direct] |
| Hashimoto | HELD | "anytime you find an agent makes a mistake, you take the time to engineer a solution such that the agent never makes that mistake again" — [*My AI Adoption Journey*](https://mitchellh.com/writing/my-ai-adoption-journey) | [practitioner direct] |
| Ball | HELD | "I'm sure I'll look back at this post very quickly and laugh at my naivete" — [*J&C #73*](https://registerspill.thorstenball.com/p/joy-and-curiosity-73) | [practitioner direct] |
| Huntley | HELD | Ralph loop = controlled experiment in production — [*Loop*](https://ghuntley.com/loop/) | [practitioner direct] |
| Yegge | HELD | "Gas Town is my fourth complete, functioning orchestrator of 2025" — three failures published — [*Welcome to Gas Town*](https://steve-yegge.medium.com/welcome-to-gas-town-4f25ee16dd04) | [practitioner direct] |
| Husain | HELD (strong) | "data scientists don't trust the data. They don't trust the labels. They don't trust anything." — [*Revenge of the Data Scientist*](https://hamel.dev/blog/posts/revenge/) | [practitioner direct] |
| Larson | HELD (partial) | reverses on Skills publicly — [*Adding support for Agent Skills*](https://lethain.com/agents-skills/). Weakens by keeping transcripts internal-only behind SSO — [*sharing-claude-transcripts*](https://lethain.com/sharing-claude-transcripts/) | [practitioner direct] |
| Böckeler | HELD (partial) | "thinking in probabilities is necessary" — [*Context Engineering*](https://martinfowler.com/articles/exploring-gen-ai/context-engineering-coding-agents.html). Doesn't publish personal reversals in corpus seen. | [practitioner direct] |

### Axis 2 — Writing-down IS the work

The act of capturing a rule into CLAUDE.md / AGENTS.md / skill / playbook is the work, not afterthought. Each correction promoted to durable artefact. Compounding only happens through the writing-down step.

| Practitioner | Verdict | Anchor quote / URL | Source type |
|---|---|---|---|
| Cherny | HELD | "after every correction, ask Claude to update CLAUDE.md" — [bcherny X](https://x.com/bcherny/status/2017742741636321619) | [practitioner direct] |
| Klaassen | HELD | plan-as-artefact; the *Compound* step — [*Definitive Guide*](https://every.to/source-code/compound-engineering-the-definitive-guide) | [practitioner direct] |
| Curran (Intercom) | HELD | 267 skills, 31% of R&D contributing — [*2x – nine months later*](https://ideas.fin.ai/p/2x-nine-months-later) | [practitioner direct] |
| Charles (Ramp) | HELD | 350+ skills in Dojo — [*How to get your company AI pilled*](https://x.com/geoffintech/status/2042002590758572377) | [practitioner direct] |
| Hashimoto | HELD | harness engineering as the writing-down — [*My AI Adoption Journey*](https://mitchellh.com/writing/my-ai-adoption-journey) | [practitioner direct] |
| Huntley | HELD (strongly) | specs-with-citations as the artefact, not the code — [*Porting*](https://ghuntley.com/porting/) | [practitioner direct] |
| Yegge | HELD | GUPP rules embedded in agent prompts; Beads as data-plane writing-down — [*Welcome to Gas Town*](https://steve-yegge.medium.com/welcome-to-gas-town-4f25ee16dd04) | [practitioner direct] |
| Husain | HELD | eval/skills-as-instrumentation is a stronger form — [*Evals Skills for Coding Agents*](https://hamel.dev/blog/posts/evals-skills/) | [practitioner direct] |
| Larson | HELD | centralized prompt DB in Notion; AGENTS.md — [*Facilitating AI adoption at Imprint*](https://lethain.com/company-ai-adoption/) | [practitioner direct] |
| Böckeler | HELD (strongly) | coined "harness engineering" as the name for the discipline — [*Harness engineering*](https://martinfowler.com/articles/harness-engineering.html) | [practitioner direct] |
| Ronacher | HELD (sharper) | skills are *local* and *disposable*: "I throw skills away if I don't need them" — [*Pi*](https://lucumr.pocoo.org/2026/1/31/pi/) | [practitioner direct] |
| Ball | PARTIAL | operates AGENTS.md at Amp, light on byline-direct theorising in-window | [practitioner direct] |

**Disconfirming evidence to flag, not dismiss [L2 — single academic study, single benchmark pair]:** ETH Zurich, Gloaguen et al., 2026-02-13 — [arXiv:2602.11988](https://arxiv.org/abs/2602.11988) [academic/research]. Four agents (Claude Code, Codex variants, Qwen Code), N=300 SWE-bench Lite + N=138 AgentBench. LLM-generated context files **reduce success rate by 0.5% (SWE-bench Lite) and 2% (AgentBench)**; developer-written context files yield +4%. **Costs +20–23% per task.** **[UNVERIFIED STAT — figures pulled via Medium summary citation chain; verify against arXiv PDF directly before downstream use.]** Benchmarks may not capture long-horizon multi-session value where the convergence cohort uses CLAUDE.md/skills — but the result is real and the headline ("CLAUDE.md helps") is not the universal truth the convergence narrative implies.

### Axis 3 — Ship cheaper than argue

More experiments than meetings. Suspicious of strategy debate. Twenty small experiments before a study would scope. Karpathy: 700 experiments in 2 days.

| Practitioner | Verdict | Anchor quote / URL | Source type |
|---|---|---|---|
| Cherny | HELD | 3–10 parallel worktrees as the unlock — [Cherny X.com](https://x.com/bcherny/status/2017742743125299476) | [practitioner direct] |
| Karpathy | HELD | 700 experiments in 2 days — [AutoResearch GitHub](https://github.com/karpathy/autoresearch) | [practitioner direct] |
| Charles (Ramp) | HELD | "Most companies are still debating their AI strategy. They are overthinking it." — [Charles X.com](https://x.com/geoffintech/status/2042002590758572377) | [practitioner direct] |
| Curran | HELD | "be at peace with potentially imperfect measures" — [*2x – nine months later*](https://ideas.fin.ai/p/2x-nine-months-later) | [practitioner direct, vendor venue — metrics vendor-self-reported; see maintainer block] |
| Ball | HELD | "if you don't even need to learn how the software works… let the agent rip" — [*J&C #76*](https://registerspill.thorstenball.com/p/joy-and-curiosity-76) | [practitioner direct] |
| Huntley | HELD | 10+ in-window posts, each shipping an artefact | [practitioner direct] |
| Yegge | HELD (strongly) | four orchestrators in one calendar year — [*Welcome to Gas Town*](https://steve-yegge.medium.com/welcome-to-gas-town-4f25ee16dd04) | [practitioner direct] |
| Husain | HELD | "make the case with examples rather than assertion alone" — [*Revenge*](https://hamel.dev/blog/posts/revenge/) | [practitioner direct] |
| Larson | HELD | "if they aren't adopting tooling, we predominantly focus on making it easier rather than spending time being skeptical" | [practitioner direct] |
| Hashimoto | HELD (in-window thin) | strongest evidence is [*Non-Trivial Vibing*](https://mitchellh.com/writing/non-trivial-vibing), Oct 2025 — **out-of-window historical context only**; in-window behaviour consistent | [practitioner direct, historical] |
| Ronacher | HELD (with caveat) | MiniJinja port IS the argument — [*MiniJinja port*](https://lucumr.pocoo.org/2026/1/14/minijinja-go-port/); but he also publishes essays continuously; the caveat is the review-bandwidth tension (below) | [practitioner direct] |
| Böckeler | **CONTRADICTED** | "build context gradually" — [*Context Engineering*](https://martinfowler.com/articles/exploring-gen-ai/context-engineering-coding-agents.html); "honeymoon is definitely also over" — [QCon *State of Play*](https://www.infoq.com/presentations/ai-coding-assistants/) | [practitioner direct — Böckeler on martinfowler.com / her QCon talk] |

**Inside-the-convergence tension on Axis 3:** Ronacher and Willison independently flag review-bandwidth as the era's emerging structural bottleneck:
- Ronacher, [*The Final Bottleneck*](https://lucumr.pocoo.org/2026/2/13/the-final-bottleneck/), 2026-02-13: *"PRs are auto closed unless people are trusted... you just throttle the inflow."*
- Willison, [*Vibe coding and agentic engineering*](https://simonwillison.net/2026/May/6/vibe-coding-and-agentic-engineering/), 2026-05-06 [practitioner direct]: review discipline erosion as "normalization of deviance."

Hashimoto's codebase-lifetime carve-out (Ghostty gets line-by-line review; throwaways get none) is the same idea operationalised differently. Worth promoting to its own axis: **"review-bandwidth is the era's load-bearing constraint."** Or refining Axis 3 to scope-by-codebase-lifetime.

### Axis 4 — Taste as the irreducible asset

Effort goes into the brief, the verifier, the rule — never into the implementation. Agents can't pick which of three correct solutions matches the vision in your head.

| Practitioner | Verdict | Anchor quote / URL | Source type |
|---|---|---|---|
| Klaassen | HELD | "you're the bread in the AI sandwich" — via AI & I podcast appearance, Entis write-up [*You're the Bread in the AI Sandwich*](https://every.to/context-window/you-re-the-bread-in-the-ai-sandwich) | [practitioner analysis — Entis on Klaassen] |
| Karpathy | HELD | "the researcher's new job is writing the spec" — [AutoResearch GitHub](https://github.com/karpathy/autoresearch) | [practitioner direct] |
| Cherny | HELD | "code is not the bottleneck" — [@boris_cherny Threads](https://www.threads.com/@boris_cherny/post/DSxC5JZCKFs/) | [practitioner direct] |
| Hashimoto | HELD | "AI is *really good* at gluing together high quality, well documented, and proven components" — [*Building Block Economy*](https://mitchellh.com/writing/building-block-economy) | [practitioner direct] |
| Ball | HELD | learning carve-out — "get your hands dirty" where building something new — [*J&C #76*](https://registerspill.thorstenball.com/p/joy-and-curiosity-76) | [practitioner direct] |
| Yegge | HELD | "roughly 25% of PRs need human evaluation because there's still a thing called taste" — [*Vibe Maintainer*](https://steve-yegge.medium.com/vibe-maintainer-a2273a841040) | [practitioner direct] |
| Huntley | HELD | "skilled operators who shape it through prompts from their expertise" — [*Cursed*](https://ghuntley.com/cursed/), **Sept 2025 — out-of-window historical context**; in-window restatement via *Teleport* (Feb 2026, [URL](https://ghuntley.com/teleport/)) | [practitioner direct, historical + in-window] |
| Husain | HELD (strongest in sample) | benevolent-dictator construct — [*evals-faq*](https://hamel.dev/blog/posts/evals-faq/) | [practitioner direct] |
| Larson | HELD (strongly) | "productivity today is most constrained on judgment" — [*Judgment is all you need*](https://lethain.com/judgment-is-all-you-need/) | [practitioner direct] |
| Böckeler | HELD | "no social accountability, no aesthetic disgust at a 300-line function" — [*Harness engineering*](https://martinfowler.com/articles/harness-engineering.html) | [practitioner direct — Böckeler on martinfowler.com] |
| Ronacher | HELD (sharper, darker) | "if the machine writes the code, the machine better review the code at the same time" — taste under siege via review-asymmetry — [*Final Bottleneck*](https://lucumr.pocoo.org/2026/2/13/the-final-bottleneck/) | [practitioner direct] |

### Axis 5 — Reagents-not-opex cost frame

Token spend treated as research budget, not operational line. Curran, Charles, Cherny converge: cost is the wrong frame at the experiment stage. Ration once you know what to scale. **L2-approaching-L3:** 6 clear HOLDs out of 11 entries (2 INSUFFICIENT-SIGNAL, 1 PARTIAL, 1 weak/implicit, 1 CONTRADICTED). Weaker convergence signal than Axes 1–4; treat as preliminary until cycle 2 expands the sample.

| Practitioner | Verdict | Anchor quote / URL | Source type |
|---|---|---|---|
| Curran | HELD | "way more expensive in the long run to hold back spend" — [*2x – nine months later*](https://ideas.fin.ai/p/2x-nine-months-later) | [practitioner direct, vendor venue — see maintainer block] |
| Charles | HELD | "if someone is 2x more productive with AI, you should be willing to spend their entire salary again in tokens" — [Charles X.com](https://x.com/geoffintech/status/2042002590758572377) | [practitioner direct] |
| Cherny | HELD | "ROI question, not a cost question" — via AI & I podcast transcript [Shipper on Cherny + Wu](https://every.to/podcast/transcript-how-to-use-claude-code-like-the-people-who-built-it) | [practitioner analysis — Shipper on Cherny + Wu] |
| Huntley | HELD (strongly) | "the cost of software development is $10.42 an hour" — [*Real*](https://ghuntley.com/real/), Feb 27 2026. (The $4,400/month figure removed — was cited via Yegge's *Birthday Blog* but not located in *Real*; pending citation-chain verification.) | [practitioner direct] |
| Yegge | HELD | "if you ever have to think about where money comes from, you won't like Gas Town" — [*Welcome to Gas Town*](https://steve-yegge.medium.com/welcome-to-gas-town-4f25ee16dd04). (The "$50k/year per developer" framing originates from a Mar 2025 essay — **out-of-window historical context** — and was not located in *Gas Town*; removed pending correct-source verification.) | [practitioner direct] |
| Ronacher | HELD (explicit receipts) | "$60. 2.2 million tokens. Claude Opus 4.5 and GPT-5.2 Codex" — [*MiniJinja port*](https://lucumr.pocoo.org/2026/1/14/minijinja-go-port/) **[L2 single-case: one project, one session]** | [practitioner direct] |
| Larson | HELD (weak/implicit) | "learn for a few dollars of tokens" framing — [*Coding at work*](https://lethain.com/coding-at-work/) | [practitioner direct] |
| Hashimoto | INSUFFICIENT-SIGNAL in-window | asserted Oct 2025 (out-of-window), behaves it now without restating | [practitioner direct] |
| Ball | INSUFFICIENT-SIGNAL | works at Amp; cost framing would be commercial, likely avoided | [practitioner direct] |
| Husain | PARTIAL | accepts the trade-off without articulating the reagents frame | [practitioner direct] |
| Böckeler | **CONTRADICTED** | tokens framed as opex rivalling developer salaries ($91,200+); explicit cost-line alarm — [QCon *State of Play*](https://www.infoq.com/presentations/ai-coding-assistants/) | [practitioner direct — Böckeler's recorded talk] |

## The product-vs-consultancy seam

Böckeler is the single contradicting case, and the contradiction is structural, not idiosyncratic. She works at Thoughtworks — a consultancy advising many clients. Her incentive shape is fundamentally different from the product-company practitioner cluster:
- A product-company practitioner spends tokens on their own codebase and counts the value in shipped throughput.
- A consultancy practitioner advises clients whose token spend will be approved by CFOs who DON'T hold the stance — so the consultancy's job is to make the cost defensible, not to reframe it.

**The seam runs through Bosser specifically.** Bosser is a training consultancy. The stance Antti needs the training to produce in CTO students is the *product-company stance* — but the seller of that training is the *consultancy-practitioner stance*. The training has to teach a disposition the trainer's commercial form doesn't fully embody. Worth being honest about.

**What survives the seam:**
- Axis 2 (writing-down IS the work) — Böckeler coined "harness engineering" as the discipline name
- Axis 4 (taste as irreducible) — Böckeler holds this strongly

**What doesn't:**
- Axis 3 (ship cheaper than argue) — Böckeler counsels gradualism
- Axis 5 (reagents-not-opex) — Böckeler raises the cost-line alarm

## Sixth-axis candidates — triage

This OODA surfaced nine candidate beyond-the-five additions. Three deserve promotion to candidate axes; the rest are sub-faces of the existing five.

**Promotion candidates (worth carrying into OODA cycle 2):**

1. **Substrate-is-mutable.** Practitioners treat MCP / language design / completion APIs / OSS economics as things they shape, not constraints they design around. Held by Ronacher (sharpest), Huntley (local-model sovereignty), Yegge (orchestrator-as-substrate). The convergence narrative is workflow-shaped; this axis pushes the frame down a layer.

2. **Review-bandwidth as load-bearing constraint.** Held by Ronacher, Willison (in-convergence flagging it as risk-of-decay), Hashimoto (codebase-lifetime discipline), Ball (learning-surface protection). Sits in tension with Axis 3 and resolves the tension by scoping: ship cheaper *when the codebase tolerates it*; throttle the inflow *when review is the load-bearing input*.

3. **Scaffolding-then-graduation.** Larson: use agents for ambiguous probes, refactor to deterministic code once the path stabilises. Distinct from Axis 2 because it's about *retiring* the agent loop, not building the artefact for it. Worth one more practitioner-pair check before promoting.

**Sub-faces of the existing five (don't promote):**
- Codebase-lifetime-driven review discipline (Hashimoto) → refinement of Axis 3 + Axis 4
- Preserve the learning surface (Ball) → refinement of Axis 4
- Fleet-as-unit (Yegge) → refinement of Axis 2 (just larger-scale writing-down)
- Local-model sovereignty (Huntley) → folds into substrate-is-mutable
- Sensors-in-harness (Böckeler) → refinement of Axis 2
- Domain-expert-as-bottleneck (Husain) → refinement of Axis 4
- Error-analysis-first ordering (Husain) → refinement of Axis 3 (shape of the cheap experiment)

## What this means for Agents 102 / Bosser

1. **The CTO conversation gets concrete.** "Platform is downstream of stance" is now an argument with 15 named practitioners and a 5-axis evidence matrix. The training is one of the prosthetics that produces this stance; the next OODA cycle should test which prosthetics produce which axes.

2. **The consultancy seam is a feature, not a bug.** Bosser sells competence — meaning the *student* arrives at the product-company stance even though Bosser-the-vendor operates from the consultancy stance. The training is the bridge. Be clear-eyed: F-Secure cohort post-training behaviour is the live test.

3. **The review-bandwidth tension is the next stance-axis to teach.** "Ship cheaper than argue" alone produces the PR-overflow / normalization-of-deviance failure mode Willison flagged inside the convergence. Pair it with explicit "throttle the inflow" discipline.

4. **The ETH Zurich result deserves an honest footnote, not a dismissal.** CLAUDE.md is benchmark-neutral, practitioner-load-bearing. Useful nuance for the technical-class judge to carry.

5. **Ronacher is not a sceptic. Reframe.** He's a fellow traveller in a minor key, with two load-bearing additions the convergence narrative needs (review-asymmetry, substrate-is-mutable). The dedicated `observations/armin-ronacher.md` is now overdue — Agent D produced the raw material.

## Open questions for OODA cycle 2

1. **Test substrate-is-mutable as candidate Axis 6.** Sample: practitioners building MCP servers / agent frameworks / coding-agent harnesses. Candidates: David Tolnay (Rust toolchain agents?), Mitchell Hashimoto (Ghostty harness), David Crawshaw (Tailscale + agents), the LangGraph / Mastra / Pydantic-AI authors.
2. **Test review-bandwidth-as-constraint as candidate Axis 7.** Sample: maintainers running busy OSS projects with agent-assisted contributors. Ronacher and Yegge already cover this; need 3 more.
3. **The Nordic / non-SV question.** Every named convergence case is SV-culture-adjacent. Spotify's Honk team should be probed next — does the technical practice carry the stance signature?
4. **Prosthetic → stance-axis mapping (the original OODA-prompt question).** This OODA tested the convergence; the prosthetic mapping is a separate cycle. Pre-engagement contract surface candidate.
5. **Hunt for failure cases more aggressively.** The 6-month window may be too tight. Try: 12-month window for pre-existing-stance reversals, accepting freshness label as "historical context."
6. **Resolve the ETH Zurich result.** Either replicate against the convergence-cohort use case (long-horizon multi-session) or find a practitioner who's tested CLAUDE.md A/B inside production work.

---

<!-- maintainer -->

**Source files (OODA cycle 1, 2026-05-13):**

- `findings/by-pattern/ooda-stance-2026-05-13/agent-A-hashimoto-ball.md`
- `findings/by-pattern/ooda-stance-2026-05-13/agent-B-huntley-yegge.md`
- `findings/by-pattern/ooda-stance-2026-05-13/agent-C-larson-bockeler.md`
- `findings/by-pattern/ooda-stance-2026-05-13/agent-D-ronacher.md`
- `findings/by-pattern/ooda-stance-2026-05-13/agent-E-counter-evidence.md`

**OODA cycle 1 review (2026-05-14) — gate findings applied:**

Applied via `/research-review` (four personas):
- ETH Zurich numbers split (0.5% SWE-bench Lite / 2% AgentBench) and labelled L2 + `[UNVERIFIED STAT]` pending arXiv PDF check
- "Headline negative finding" reframed as preliminary L1 with explicit methodology + 6-month window caveat
- Axis 5 framed as L2-approaching-L3, separate from Axes 1–4
- Practitioner count corrected: 13 table-evidenced + 2 narrative-role (Shipper, Willison), not 15
- 14 missing URLs backfilled from per-agent files
- Broken `$4,400/month` Huntley citation removed (URL didn't contain the claim)
- Yegge `$50k/year` claim removed (citation didn't match cited source; original Mar 2025 essay is out-of-window)
- Hashimoto Oct 2025 + Huntley *Cursed* Sept 2025 marked as **out-of-window historical context**
- Willison line URL labelled `[practitioner direct]`
- Ronacher MiniJinja receipts marked `[L2 single-case]`
- Cherny "ROI question" attributed `[practitioner analysis — Shipper on Cherny + Wu]` (AI&I transcript)
- Klaassen "bread" attributed `[practitioner analysis — Entis on Klaassen]`

**Convention calls (documented for future audits):**
- `ideas.fin.ai`/Curran kept as `[practitioner direct, vendor venue]` — Curran's own byline on Intercom's product blog. Same convention as Spotify engineering blog. **Treat operational/structural facts as evidence; treat specific metrics (267 skills, 31% R&D contributing, 93.6% AI PRs, 19.2% auto-approved) as vendor-self-reported, not independently verified.**
- `martinfowler.com`/Böckeler kept as `[practitioner direct]` with attribution "Böckeler on martinfowler.com". Guest-author on another practitioner's editorial venue; closer to practitioner-direct than journalist-write-up.
- `every.to`/Klaassen kept as `[practitioner direct]` per `kieran-klaassen.md` maintainer-block convention — Every is Klaassen's employer and canonical publishing channel.

**Remaining unresolved gate items (cycle 2 must close):**
- ETH Zurich figures still need arXiv PDF verification (UNVERIFIED tag in place)
- Curran metrics still need independent corroboration (vendor-self-report caveat in place)
- `$4,400/month` Huntley figure needs Yegge *Birthday Blog* trace if still wanted
- Yegge `$50k/year` framing needs correct source URL or stay removed

**Hold-loose reminders for the next reader:**

- 15 named practitioners is at the L3 threshold (10–20), not above it. One more contradicting case shifts the read.
- Böckeler is one consultancy-practitioner. The seam read needs at least 2 more (Thoughtworks colleagues; another consultancy practitioner publishing in-window).
- The "no public reversals" finding is contingent on 6-month freshness. Expand the window in cycle 2 before treating as durable.
- ETH Zurich is one academic study. Need either a replication or a practitioner A/B before treating as load-bearing counter-evidence to Axis 2.

**Source-verification asks before any student-facing or buyer-facing use:**

1. Re-open every URL in the per-axis tables against the original byline. Spot-checked but not systematically verified at synthesis time.
2. Triple-check the ETH Zurich numbers (3% reduction, 20–23% cost) against the arXiv PDF directly — currently pulled from a Medium summary citation chain.
3. Confirm Ronacher's "$60, 2.2M tokens, 10 hours, 45 minutes human" figures against the [*MiniJinja port*](https://lucumr.pocoo.org/2026/1/14/minijinja-go-port/) original — verbatim quote not re-opened at synthesis time.
4. Huntley's "$4,400/month" figure traces through Yegge's *Stevey's Birthday Blog* citation — open the original Huntley source if used.
5. The Yegge meme-coin / $290k profit detail is per-agent-noise, not load-bearing for the stance read. If cited, flag explicitly as adjacent.

**Byline-check audit:**

- All practitioner-direct citations are own-blog or own-substack except where noted [practitioner analysis] in the per-axis cells.
- *Latent Space* podcast page citing Yegge is [domain trade publication] (swyx + Alessio on Yegge), not [practitioner direct].
- Pragmatic Engineer page on Yegge is [domain trade publication] (Orosz on Yegge).

**Freshness window:** Nov 2025 – May 2026. Out-of-window sources used as historical context only and explicitly dated in agent files.

**Provenance — source-type labels:** All inline citations carry their labels; see per-agent source-list files for the full provenance audit.

**OODA cycle status:** Cycle 1 complete 2026-05-13. Cycle 2 priorities listed under *Open questions* above. Cycle 2 should NOT re-test the five axes against new practitioners — diminishing returns; instead test the candidate Axes 6 + 7 and the prosthetic→axis mapping.
