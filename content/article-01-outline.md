# Article Outline: When Will Agentic Coding Spill to Other Functions?

## Editorial framing

**Angle:** Comparative. Use agentic coding as the reference case — the one domain where we watched the chasm cross in real time. Then measure every other domain against the same structural ingredients. The article TEACHES readers to recognize chasm-crossing signals in their own domain.

**Not:** "We searched and didn't find much evidence for other domains." That's a research limitation, not a finding.

**Instead:** "Here's what it looks like when a domain is ready for agents. Here's how to tell where yours is."

**Length:** ~1000-1200 words body + ~200-300 words commentary. 2 pages + sources.

## Narrative arc (hero's journey — felt, never labeled)

The reader is the hero. The article takes them through a transformation in how they see agents.

| Beat | What the reader experiences | Article section |
|------|---------------------------|-----------------|
| **Ordinary world** | "I've heard about coding agents. My devs use Copilot. Cool." | Opening — coding agents work, everyone knows this |
| **Call to adventure** | "But what about MY domain? Will this come to finance/legal/ops?" | The question posed |
| **Crossing the threshold** | "Let me look at what actually made coding work." | The five ingredients — structural, not magical |
| **Tests and revelation** | "Wait — most domains DON'T have these ingredients." The practitioner signal density metric hits. The table shows the emptiness. | The comparison + the metric |
| **The ordeal** | "So... agents might NOT come to my domain automatically?" The vendor narrative collapses. | Where verification doesn't exist, neither do agents |
| **The reward / new knowledge** | "But I can LEARN to see the signals. Here's the pattern." The four adoption stages. | Teaching section — recognize the crossing |
| **Return with the elixir** | "The question isn't 'can we use agents?' It's 'what's our test suite?'" They leave with a tool, not just information. | Closing line + commentary |

**Subtle means:** No Campbell references. No "journey" language. The reader simply feels: recognition → curiosity → tension → insight → empowerment. The structure does the work.

## The metric: Practitioner Signal Density

When we research agentic practices across domains, the density of usable practitioner evidence varies dramatically. This IS the signal.

**Practitioner Signal Density** = independent practitioners publicly writing about deploying agents in this domain, whose work passes source quality gates (not vendor PR, not press releases, not analyst predictions — actual practitioners describing what they built and what happened).

| Domain | Practitioners writing | Vendor noise | Ratio |
|--------|-----------------------|-------------|-------|
| **Coding** | Hundreds | Low (tools sell themselves) | 50:1 |
| **Finance** | A handful | High (every fintech claims "agentic") | 1:10 |
| **Legal** | 1-2 substantive | High | 1:20 |
| **Customer service** | Sparse but growing | Very high (chatbots relabeled) | 1:15 |
| **Compliance** | Zero found | Maximum | 0:∞ |
| **HR** | Zero found | Low | 0:0 |

**The article-ready version:** "When we searched for practitioners publicly describing agent deployments across 8 business domains, we found a 50:1 practitioner-to-vendor signal ratio in coding. In finance, it inverted to 1:10. In compliance and HR, it was zero practitioners — only vendor announcements. The ratio is the readiness signal."

**Why this works:** It's transparent about our research. It's measurable. It's visual. And it tells the story without needing a single vendor-sourced claim.

## Article structure (~1000-1200 words)

### Opening — the ordinary world (~150 words)

Coding agents work. Everyone sees this. Claude Code, Cursor, Codex — genuine autonomous systems. Not autocomplete. Systems that reason, backtrack, self-correct. A year ago this was novel. Now it's infrastructure.

The question everyone asks next: when does this come to MY function?

### The five ingredients — why coding worked (~200 words)

Not magic. Structure. Five things coding has that made agents possible:

1. **Fast verification** — tests pass/fail in seconds. Errors are specific.
2. **Rich tools** — files, terminal, git, test runners. The agent can act, not just think.
3. **Safe iteration** — git means every experiment is reversible.
4. **Clear success** — it compiles, tests pass, it ships. Not subjective.
5. **Practitioner ecosystem** — hundreds writing about what works. The knowledge compounds publicly.

These aren't AI capabilities. They're *domain infrastructure*. The AI was ready years ago. The domain was ready too.

### The comparison — tension builds (~250 words)

Now score every other domain against those five ingredients. This is where the ordinary world cracks.

The comparison table (in prose, not rendered as a table — tables don't work on LinkedIn/newsletter). Walk through finance (has verification, lacks tools), legal (partial verification, needs judgment), customer service (measurable but subjective), compliance (rules exist but no practitioner ecosystem), HR (nothing).

**The metric drops here.** "We researched agent deployments across 8 domains using the same methodology. In coding, for every vendor claim we found 50 practitioner accounts of real deployments. In finance, the ratio inverted — 10 vendor claims for every practitioner. In compliance and HR, we found zero practitioners. Only vendor announcements."

### The ordeal — vendor narrative collapses (~150 words)

This is where most "agents are coming to enterprise" articles stop. They list the vendor announcements and call it progress. But announcements without practitioners are billboards without roads.

Narayanan's framing: "domain-specific verifiers like compilers." Without them, compound errors kill autonomy. 95% per-step reliability → 36% over 20 steps.

The gap isn't AI capability. It's that most business domains haven't built their test suite yet.

### The reward — learning to see the signals (~250 words)

Here's what the chasm crossing looked like for coding — in real time:

Walk through the four stages. Solo builders → convergence → enterprise credibility → tooling democratizes. Date each for coding. Then: "Now you know the pattern. Where is YOUR domain?"

Brief assessment per domain — which stage, based on practitioner signal density.

The teaching moment: you can now recognize this in real time. When solo practitioners in your domain start shipping and writing about it — pay attention. When 10-20 of them say the same thing independently — that's your signal.

### Closing — the elixir (~50 words)

The question for every business function is not "can we use AI agents?" It's: **"What's our test suite?"**

The domain that figures this out first will have agents. Everyone else will have chatbots.

---

### Commentary (Antti, ~250 words)

"I watched this crossing happen inside an organization."

F-Secure: 200+ people, non-coders, building with Claude Code. Week 2 is when it shifts. The developers get verification instantly — "it's like writing tests." The business people struggle until they find their own equivalent. The finance person realizes reconciliation IS the test suite. The HR person realizes they don't have one.

That moment — recognizing your own verification loop — that's the real transformation. Not the technology. Not a vendor. The person doing the work seeing how to check the output.

The organizations that build their test suite first will have agents. The rest will wait for vendors to do it for them. And vendors don't understand your domain.

*— Antti Tevanlinna*

## Sources needed

- [pending] Agentic coding Nordic research (agent running)
- Narayanan — verification framework [practitioner/academic — PASSES]
- Karpathy trajectory — "agents don't work" → "coding agents work" [practitioner direct — PASSES]
- Willison on Claude Code/agent tooling [practitioner direct — PASSES]
- Osika/Lovable trajectory [practitioner direct — PASSES]
- Junestrand/Artificial Lawyer interview [domain trade — PASSES]
- Klarna reversal via Bloomberg [general press — bare fact only: confirms reversal happened]
- Need: 2-3 practitioner sources for Nordic coding adoption (from research agent)
- Practitioner signal density numbers from our own research (internal — labeled as such)

## What this outline replaces

The previous draft cited 3 vendor press releases as evidence (Vic.ai, Legora BusinessWire, Spektr FFNews). The comparative framing is structurally stronger AND requires fewer domain-specific examples — the coding reference case carries the argument, and the practitioner signal density metric replaces individual domain claims.
