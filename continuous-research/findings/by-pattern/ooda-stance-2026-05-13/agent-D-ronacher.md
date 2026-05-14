# OODA stance-axis test — Armin Ronacher deep-dive — 2026-05-13

Armin Ronacher (creator of Flask, Jinja; Sentry's first CTO) is the closest the field has to a sceptical insider on agentic coding. He posts essays at `lucumr.pocoo.org` as his canonical channel — 36 posts in 2025 alone, ~18% of his lifetime blog output, mostly on agents. This deep-dive tests him against the 5-axis convergence hypothesis and isolates his distinctive positions.

## Sources (byline-checked, freshness-checked)

All within the 6-month freshness window (Nov 2025 – May 2026). All authored by Ronacher on his own blog → [practitioner direct].

- https://lucumr.pocoo.org/2025/11/21/agents-are-hard/ — [practitioner direct] — 2025-11-21 — "Agent Design Is Still Hard." Field report on building agents; admits evals still unsolved; public reversal on Anthropic explicit cache management.
- https://lucumr.pocoo.org/2025/11/22/llm-apis/ — [practitioner direct] — 2025-11-22 — "LLM APIs are a Synchronization Problem." Teardown of hidden state in completion APIs; quadratic cost growth.
- https://lucumr.pocoo.org/2025/12/13/skills-vs-mcp/ — [practitioner direct] — 2025-12-13 — "Skills vs Dynamic MCP Loadouts." Reports migrating off MCPs (Playwright, Linear, Sentry) toward self-maintained skills.
- https://lucumr.pocoo.org/2025/12/17/what-is-plan-mode/ — [practitioner direct] — 2025-12-17 — "What Actually Is Claude Code's Plan Mode?" Reverse-engineers the mechanism; reveals it's "just a rather short predefined prompt."
- https://lucumr.pocoo.org/2025/12/22/a-year-of-vibes/ — [practitioner direct] — 2025-12-22 — "A Year Of Vibes." Year-end retrospective; explicitly self-aware that his preferences are vibes-not-evidence.
- https://lucumr.pocoo.org/2026/1/14/minijinja-go-port/ — [practitioner direct] — 2026-01-14 — "Porting MiniJinja to Go With an Agent." Single-experiment write-up: $60, 2.2M tokens, 10 hours agent / 45 min human.
- https://lucumr.pocoo.org/2026/1/18/agent-psychosis/ — [practitioner direct] — 2026-01-18 — "Agent Psychosis: Are We Going Insane?" Slop critique; "amazing AND massive slop machines."
- https://lucumr.pocoo.org/2026/1/31/pi/ — [practitioner direct] — 2026-01-31 — "Pi: The Minimal Agent Within OpenClaw." Endorses Mario Zechner's 4-tool minimal agent + self-modification.
- https://lucumr.pocoo.org/2026/2/9/a-language-for-agents/ — [practitioner direct] — 2026-02-09 — "A Language For Agents." Argues for greppability, explicit syntax, local reasoning as language design criteria.
- https://lucumr.pocoo.org/2026/2/13/the-final-bottleneck/ — [practitioner direct] — 2026-02-13 — "The Final Bottleneck." Argues human accountability/review is the irreducible bottleneck.
- https://lucumr.pocoo.org/2026/3/5/theseus/ — [practitioner direct] — 2026-03-05 — "AI And The Ship of Theseus." Slopforks; legal/economic dislocation from cheap re-implementation.

Out of freshness window (historical context only, explicitly dated):
- https://lucumr.pocoo.org/2025/6/12/agentic-coding/ — [practitioner direct] — 2025-06-12 — already in our KB. Not used as primary current evidence.

X.com (`@mitsuhiko`) returned HTTP 402 to WebFetch — `[UNVERIFIED]` for X-only claims; this deep-dive relies on blog only, which is fine since his blog is the canonical channel.

## Per-axis verdict

### Axis 1 — Scientist-not-engineer disposition: **HELD (strongly)**

Ronacher's posting cadence and tone are textbook lab-notebook. He publishes failures, names them, and reverses publicly.

- **Publishes failures explicitly:** "We find testing and evals to be the hardest problem here...unfortunately, I have to report that at the moment we haven't found something that really makes us happy." — *Agent Design Is Still Hard*, 2025-11-21.
- **Public reversal on evidence:** "I initially found the manual management pretty dumb...I've fully come around and now vastly prefer explicit cache management." — *Agent Design Is Still Hard*, 2025-11-21. Same essay also requests reader feedback: "Someone else might have figured it out...please drop me a mail. I want to learn."
- **Self-aware about evidence quality:** "I have nothing beyond vibes to back up my preference for Claude" and "it's hard to say which [opinions] will stand the test of time." — *A Year Of Vibes*, 2025-12-22.
- **Reverse-engineers tools rather than trusting docs:** entire *What Actually Is Claude Code's Plan Mode?* is a teardown — "It is in fact just a rather short predefined prompt that enters plan mode." 2025-12-17.

**Verdict:** Strongly HELD. If anything Ronacher is the canonical example. The hypothesis writes itself off his post pattern.

### Axis 2 — Writing-down IS the work: **HELD (with a sharper, named version)**

Ronacher both practices and theorises this — but his version is more specific than the generic CLAUDE.md framing.

- **Skills as primary artefact, not afterthought:** "Skills are really just short summaries of which skills exist and in which file the agent can learn more about them." "The biggest benefit is that the tool is largely under my control. Whenever it breaks or needs some other functionality, I ask the agent to adjust it." — *Skills vs MCP*, 2025-12-13.
- **Migrating off external tools toward internal written artefacts:** documents replacing Playwright, Linear, Sentry MCPs with self-maintained skills (same post).
- **Writing as the agent's interface to the codebase:** "agents really like local reasoning. They want it to work in parts because they often work with just a few loaded files in context." — *A Language For Agents*, 2026-02-09. Implication: code structure is the playbook.
- **Markdown-file workflow over plan-mode UX:** "getting the agent to ask me clarifying questions, taking these questions into an editor, answering them, and then doing a bunch of iterations until I'm decently happy." — *What Actually Is Claude Code's Plan Mode?*, 2025-12-17.
- **Counter-signal:** Pi-style skills are *dynamic* — "I throw skills away if I don't need them" (*Pi*, 2026-01-31). Not a contradiction of the axis, but a sharper version: written-down but disposable. Ronacher would refine "writing-down IS the work" to "writing-down-and-throwing-away IS the work."

**Verdict:** HELD, and his version is more pointed than the generic axis. He'd say: not a fixed CLAUDE.md, but a *live* skill registry that the agent itself edits.

### Axis 3 — Ship cheaper than argue: **HELD (with a caveat)**

- **Validates by use, not debate:** "I'm trialing Amp more...It's also a good way for me to validate how different agent designs work." — *Agent Design Is Still Hard*, 2025-11-21.
- **The MiniJinja port IS the argument:** rather than write an essay claiming agents can port libraries, he ports MiniJinja to Go in 10 hours for $60 and publishes the receipt. — *Porting MiniJinja to Go With an Agent*, 2026-01-14.
- **Caveat — he ALSO argues a lot:** Ronacher posts essays continuously. The axis isn't "no essays" but "more experiments than meetings"; his essays are post-experiment write-ups, not pre-experiment strategy debates. That's the right shape.

**Verdict:** HELD. Caveat: he is publicly arguing more than most because the writing-down IS the work — but the arguments are downstream of shipped experiments.

### Axis 4 — Taste as the irreducible asset: **HELD (and he names it harder than the convergence does)**

- **Taste shows up as accountability:** "If the machine writes the code, the machine better review the code at the same time." "For as long as I carry responsibilities and am accountable, this will remain true...how that would happen is not clear." — *The Final Bottleneck*, 2026-02-13.
- **Human steering ratio:** 45 minutes human on 10 hours of agent run during the MiniJinja port; "I barely did anything beyond giving some high-level guidance" — but that guidance was load-bearing: he prevented behavioral regressions, steered away from divergent designs, decided when to let the agent run unsupervised. — *MiniJinja port*, 2026-01-14.
- **Evals as the unsolved problem:** "We find testing and evals to be the hardest problem here." — *Agent Design Is Still Hard*, 2025-11-21. This is the convergence's "taste = brief + verifier" frame stated as an admission rather than a solution.
- **Slop critique:** "AI agents are amazing...They are also massive slop machines if you turn off your brain." — *Agent Psychosis*, 2026-01-18.

**Verdict:** HELD, sharply. His version is darker than the convergence framing: taste isn't just irreducible, it's *under siege* — the asymmetry "generating poor code takes minutes but reviewing it requires hours" is the central failure mode of the era.

### Axis 5 — Reagents-not-opex cost frame: **HELD (with explicit numbers)**

- **Publishes receipts:** "$60. 2.2 million tokens. Claude Opus 4.5 and GPT-5.2 Codex." — *MiniJinja port*, 2026-01-14. Treats the spend as the cost of the experiment, not as an operational line.
- **Reframes "cheaper" against effectiveness:** "a better tool caller will do the job in fewer tokens...not necessarily cheaper in a loop." — *Agent Design Is Still Hard*, 2025-11-21. Classic reagents thinking: yield matters more than unit cost.
- **But also warns on cost shape:** "This is one of the reasons long chat sessions feel increasingly expensive" — quadratic completion-API growth. — *LLM APIs as Synchronization*, 2025-11-22. Treats this as a structural API problem, not a budget problem.

**Verdict:** HELD. Explicit and quantified.

## Ronacher's distinctive positions (NOT in the 5-axis convergence)

These are where Ronacher diverges from or adds to the convergence narrative.

### 1. The review-asymmetry is the era's central crisis, not a solved problem

> "Generating poor code takes minutes but reviewing it requires hours." — *Agent Psychosis*, 2026-01-18 (paraphrased from Ronacher).
>
> "what I see taking place in some Open Source projects, in some companies and teams feels deeply wrong and unsustainable...PRs are auto closed unless people are trusted. It takes OSS vacations. That's one option: you just throttle the inflow." — *The Final Bottleneck*, 2026-02-13.

The convergence narrative tends to treat verifier-design as a tractable engineering problem. Ronacher says the human-review channel is overflowing and there is no clean fix; the only known coping mechanism is to throttle the inflow.

### 2. MCP is a wrong turn for agent-tool integration

> "Skills vs Dynamic MCP Loadouts" — documents *moving off* Playwright, Linear, Sentry MCPs toward self-maintained skills. "MCP servers have no desire to maintain API stability...for the skill pattern it's not what you want." — 2025-12-13.

This is a structural disagreement with a major chunk of the platform-vendor narrative. He'd say: agents shouldn't talk to external tools through a protocol; they should write their own thin wrappers locally.

### 3. Minimal-tool, self-extending agents beat pre-built agent platforms

> Pi has 4 tools (Read, Write, Edit, Bash). "The agent maintains its own functionality." "I throw skills away if I don't need them." — *Pi*, 2026-01-31.

The convergence stance "coding agents are the meta-platform" is consistent with this, but Ronacher's version is sharper: even within Claude Code, *fewer* built-in capabilities is better than more, because the agent should build its own.

### 4. Language design itself must change for the agent era

> "A language that doesn't split into two separate experiences (with-LSP and without-LSP) will be beneficial to agents." "whitespace-based indentation is a problem." "agents really like local reasoning." — *A Language For Agents*, 2026-02-09.

The convergence narrative is mostly platform-and-workflow shaped. Ronacher pushes the frame down a layer: greppability, explicit syntax, local reasoning, and explicit effect markers are language-design requirements now.

### 5. The economics of code are being rewritten, not just the workflow

> "When the cost of generating code goes down that much, and we can re-implement it from test suites alone, what does that mean for the future of software?" — *AI and the Ship of Theseus*, 2026-03-05.

Slopforks — chardet relicensed LGPL→MIT by AI re-implementation — are a category of disruption the convergence narrative doesn't have a frame for. Open-source copyright as a moat is over.

### 6. LLM APIs themselves are structurally wrong

> "the Responses API get stuck in ways where I couldn't recover it" — state corruption, quadratic growth, hidden tokens. — *LLM APIs as Synchronization*, 2025-11-22.

Convergence treats the API layer as a black box. Ronacher treats it as the next thing to be fixed: completion APIs hide state, and the right model is explicit synchronization.

### Named failure modes for agentic coding

Consolidated from across the corpus:

1. **Slop loops.** "Token-wasteful slop loops" and projects becoming incomprehensibly complex (e.g. Gas Town). — *Agent Psychosis*, 2026-01-18.
2. **Review asymmetry / PR overflow.** Contributors mean well, maintainers drown. — *The Final Bottleneck*, 2026-02-13.
3. **Eval/test design is unsolved.** Honest admission, not bragging. — *Agent Design Is Still Hard*, 2025-11-21.
4. **Behavioral regressions during tests-pass loops.** "It completely gave up on all the 'must fail' tests." — *MiniJinja port*, 2026-01-14.
5. **SDK abstractions break under real tool use.** Cache invalidation; output tool reliability; format unification doesn't hold. — *Agent Design Is Still Hard*.
6. **MCP API instability** breaks the skill pattern. — *Skills vs MCP*.
7. **Macros, barrel files, aliases, multiple-failure-mode languages** trip agents up. — *A Language For Agents*.
8. **Plan-mode UX overhead** that doesn't match the underlying simplicity. — *What is Plan Mode?*.
9. **Parasocial agent relationships** — using the agent to reinforce your own ideas without external validation. — *Agent Psychosis*.
10. **Long-session quadratic cost** from completion-API design. — *LLM APIs as Synchronization*.

### What Ronacher would argue the convergence narrative is missing

In one line each:
- **Inflow-throttling is a first-class workflow primitive, not a temporary kludge.** The PR-overflow problem isn't a bug to be fixed by better tools.
- **Skills should be local and disposable**, not a stable library of permanent CLAUDE.md rules.
- **Language design is part of the agent platform**, not orthogonal to it.
- **Slopforks are coming for OSS copyright.** The legal/economic frame matters as much as the developer-experience frame.
- **"Evals are unsolved" should be on the front page**, not buried as a future-work item.

## Load-bearing vs. stylistic divergence

Ronacher's divergence from the 5-axis convergence is **mostly stylistic, with two load-bearing additions**.

Stylistic: He passes all five axes. He's a scientist (Axis 1), he writes down skills as primary artefact (Axis 2), he ships experiments and posts receipts (Axis 3, 5), and he treats taste/review as irreducible (Axis 4). The framing differences — darker tone, more failure-mode catalogue, more "we haven't figured it out" admissions — are register, not structure. A convergence-stance practitioner who also reads Ronacher would say "yes, this person is one of us, but in a minor key."

Load-bearing: Two of his positions don't fit cleanly inside the 5-axis frame and would require it to grow. **First**, the review-asymmetry-as-central-crisis. The convergence treats verifier-design as a craft problem; Ronacher treats human-review bandwidth as the era's structural bottleneck, and the only known mitigation is to throttle the inflow — which is anti-correlated with "ship cheaper than argue." This is a genuine tension the convergence narrative under-reports. **Second**, the platform-layer claims: MCP is a wrong turn, language design matters, completion APIs are structurally broken, slopforks rewrite OSS economics. The convergence narrative is workflow-shaped; Ronacher insists the substrate underneath the workflow is also up for grabs. If we updated the 5-axis frame to include him, we'd add a sixth axis along the lines of "substrate-is-mutable: language, tool protocol, API shape, and license regime are all in the design space, not constraints to design around." That's a load-bearing add, not a stylistic one.

## Material for `observations/armin-ronacher.md` (raw — for later editing)

**Pseudonym / handle:** Armin Ronacher (`@mitsuhiko`); blog `lucumr.pocoo.org`.

**Why he matters:** Creator of Flask, Jinja; Sentry's first CTO. Now an agentic-coding practitioner with high posting cadence (36 posts in 2025). The closest the field has to a sceptical insider — he is *not* a vendor, *not* a hype amplifier, *is* shipping real work with agents (MiniJinja port, Pi, internal skills), and *does* publish failures.

**Stance one-liner:** "Agents are amazing AND massive slop machines if you turn off your brain." Practitioner who holds the convergence stance but in a minor key, with extra load-bearing claims about substrate (language, MCP, API, OSS economics).

**5-axis test:** All five HELD. Axis 1 (scientist) is canonical; Axis 4 (taste) sharper than the convergence frame; Axis 5 (reagents) explicit with published receipts.

**Distinctive contribution:**
1. Review-asymmetry framing — the bottleneck is human bandwidth on accountability, throttle the inflow.
2. Skills > MCP — self-maintained, local, disposable.
3. Minimal-tool agents — Pi (4 tools), agent self-extends.
4. Language-design-for-agents — greppability, no significant whitespace, explicit effects.
5. Slopforks — OSS copyright as moat is over.
6. LLM API critique — completion APIs are a synchronisation problem; state should be explicit.

**Reversal log (Axis 1 evidence):**
- Reversed on Anthropic explicit cache management (initially "pretty dumb" → "vastly prefer"). *Agent Design Is Still Hard*, 2025-11-21.
- Reversed off MCP toward skills (was using Playwright/Linear/Sentry MCPs → now self-maintained skills). *Skills vs MCP*, 2025-12-13.
- Avoided plan mode initially → still avoids it, but documented the mechanism rather than dismissing. *What is Plan Mode?*, 2025-12-17.

**Receipts:**
- MiniJinja Go port: $60, 2.2M tokens, 10 hours agent run, 45 minutes human, Claude Opus 4.5 + GPT-5.2 Codex. 2026-01-14.

**Quotes to anchor an observation file:**
- "AI agents are amazing...They are also massive slop machines if you turn off your brain." (slop)
- "If the machine writes the code, the machine better review the code at the same time." (review)
- "We find testing and evals to be the hardest problem here." (humility)
- "I have nothing beyond vibes to back up my preference for Claude." (epistemic humility)
- "Skills are really just short summaries of which skills exist." (skills)
- "I throw skills away if I don't need them." (disposable skills)
- "agents really like local reasoning." (language design)

**Counter-evidence already in our KB:** the Tailwind-across-many-files frontend regression line — origin is *Agentic Coding*, 2025-06-12, outside the current freshness window. Should be re-anchored to a fresher source or explicitly dated as historical.

**Suggested observation-file shape:** mirror `observations/kieran-klaassen.md` and `observations/boris-cherny.md`. Sections: who, stance, 5-axis verdict, distinctive positions, reversal log, receipts, quotes, links.

## Summary (<200 words)

Armin Ronacher passes all five convergence axes — strongly on scientist-disposition and taste-as-irreducible, with published receipts on cost framing ($60, 2.2M tokens for the MiniJinja Go port). He's the canonical example of writing-down-as-work, except his version is sharper: skills are local, self-maintained, and disposable, not stable CLAUDE.md rules. His divergence from the convergence is mostly register — darker, more failure-catalogue, more "we haven't figured it out" — but two of his positions are load-bearing additions: (1) human-review bandwidth is the era's structural bottleneck, and "throttle the inflow" is a first-class workflow primitive in tension with "ship cheaper than argue"; (2) the substrate is mutable — MCP is a wrong turn, language design is part of the agent platform, completion APIs are structurally broken, and slopforks are rewriting OSS economics. He'd say the convergence narrative is workflow-shaped and under-prices the platform layer underneath. Framing him as a sceptic is wrong; he's a fellow traveller in a minor key.
