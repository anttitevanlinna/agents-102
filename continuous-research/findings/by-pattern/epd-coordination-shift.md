---
type: finding
domain: cross-domain
evidence_level: 2-3
platforms: [claude-code, cursor, codex, figma-mcp, lovable, v0, bolt]
practitioners: [Harrison Chase, Simon Willison, Katherine Yeh, Keren Koshman, Addy Osmani, Gui Seiz, Alex Kern, Jackie Bavaro, Marie-Claire Dean, Anu Joseph, Nikhil Sachdeva, Justin McCarthy, Bryce York, Saeed Khan, Francesca Tabor]
nordic: false
updated: 2026-04-02
answers:
  - "how is PM/Design/Eng coordination changing with coding agents?"
  - "what new patterns are emerging in product team workflows?"
  - "are PM and design roles merging or dissolving?"
  - "what happens to team structure when implementation gets cheap?"
  - "how are design systems becoming agent-consumable?"
---

# EPD Coordination Shift — Emerging Patterns (March-April 2026)

**Evidence level:** Mixed Level 2-3 | **Last updated:** 2026-04-02

How product management, design, and engineering coordinate is being restructured by coding agents. This is NOT the well-documented "Product Engineer" role dissolution or "spec is the moat" convergence. These are the NEXT patterns emerging in March-April 2026, most at Level 2 (single experiments or early convergence) with a few approaching Level 3.

**Already established (not repeated here):** Product Engineer role dissolution (L3), Spec is the moat (L3), Ritual elimination / daily shipping (L3), Absorption bottleneck / amplification paradox (L4), Intent bottleneck (L3), Active monitoring essential (L3), Compound engineering (L2).

---

## EMERGING PATTERN 1: The Bidirectional Design Loop
**Evidence level:** Level 2 (Figma team + monday.com + early practitioners)

The traditional linear handoff (Design -> Spec -> Code) is collapsing into a bidirectional loop where code generates design and design generates code, running simultaneously.

**Key evidence:**

- **Figma's own team** (Gui Seiz, designer + Alex Kern, engineer) demonstrated the workflow live on Lenny's Podcast: pull a running web app into Figma using Figma MCP, edit collaboratively, push back to code. On Feb 17, 2026, Figma shipped `generate_figma_design` -- a Claude Code-exclusive tool that captures live browser UI and converts it into editable Figma layers. Source: [Lenny's Podcast](https://www.lennysnewsletter.com/p/from-figma-to-claude-code-and-back) [practitioner direct], [Figma Blog](https://www.figma.com/blog/introducing-claude-code-to-figma/) [vendor -- but describing own engineering practice]

- **monday.com engineering** built an 11-node LangGraph agent that converts Figma designs to production code using two MCP servers (Figma MCP + custom design-system MCP). The agent handles translation detection, layout analysis, token resolution, and component identification in parallel. They then exposed the entire agent as an MCP tool inside Cursor. Result: "code that looks like it was written by someone who deeply understands the system." Source: [monday.com engineering blog](https://engineering.monday.com/how-we-use-ai-to-turn-figma-designs-into-production-code/) [practitioner direct]

- **Francesca Tabor** documented a full "Figma-driven MCP production pipeline" showing how creative engineers and AI engineers are converging into a single role. Published March 31, 2026. Source: [francescatabor.com](https://www.francescatabor.com/articles/2026/3/31/building-a-figma-driven-mcp-production-pipeline) [practitioner direct]

**What's new here:** The handoff is dead -- not because one side absorbed the other, but because a machine-readable bridge (MCP) makes the boundary fluid. Designers edit production code through Figma. Engineers generate Figma designs through Claude Code. The artifact flows both ways. This is structurally different from "designers learn to code" or "engineers learn design."

**Counter-evidence:** monday.com's engineering team explicitly noted that naive Figma-to-code (just pasting a link into Cursor) produced garbage -- hard-coded colors, manual CSS, no design system compliance. The 11-node agent was necessary to make it work. This is NOT a simple "just connect Figma MCP" story. The infrastructure investment is substantial.

---

## EMERGING PATTERN 2: Design Systems as Agent Infrastructure
**Evidence level:** Level 2-3 (Figma official + multiple practitioners + monday.com)

Design systems are transforming from human documentation into machine-readable agent infrastructure. The components, tokens, and rules that used to exist for human designers now serve as the context layer that makes coding agents produce design-compliant output.

**Key evidence:**

- **Figma official position** (March 2026): "Design systems and AI: why MCP servers are the unlock." MCP servers surface props, states, token bindings, and accessibility attributes in ways AI tools can discover. A consistent schema means AI tools can get available components, choose the correct variant, map tokens, and generate aligned code. Source: [Figma Blog](https://www.figma.com/blog/design-systems-ai-mcp/) [vendor -- but describing technical architecture]

- **monday.com** built a dedicated design-system MCP representing their entire system as structured, machine-readable knowledge -- not just for humans to read, but for agents to query at code-generation time. Source: [monday.com engineering](https://engineering.monday.com/how-we-use-ai-to-turn-figma-designs-into-production-code/) [practitioner direct]

- **Katherine Yeh** (designer, March 2026): "A designer who hadn't opened a terminal since school, but now has an AI design partner that knows my design system better than most humans on my team." Her guide describes treating skills like a design system -- with layers, clear responsibilities, and explicit dependencies. Source: [Medium/Design Bootcamp](https://medium.com/design-bootcamp/a-designers-guide-to-organizing-ai-skills-and-tools-in-claude-code-f87477c35b82) [practitioner direct]

- **Marie-Claire Dean** built 63 open-source design skills for Claude Code (8 plugins: research, systems, strategy, UI, interaction design, prototyping, testing, design ops). Published March 9, 2026. Source: [Substack](https://marieclairedean.substack.com/p/i-built-63-design-skills-for-claude) [practitioner direct]

**What's new here:** Design systems were always valuable for consistency. Now they're valuable for a second reason: they're the context that prevents agents from producing generic garbage. A team with a well-structured design system gets dramatically better AI output than a team without one. The design system becomes competitive infrastructure, not just consistency tooling.

---

## EMERGING PATTERN 3: The "Implementation Is Cheap" Restructuring
**Evidence level:** Level 2-3 (Harrison Chase + multiple practitioners)

When implementation cost drops to near-zero, the entire EPD value chain restructures. The scarce resource shifts from "who can build this" to "what should we build and why."

**Key evidence:**

- **Harrison Chase** (LangChain co-founder, March 2026): "Coding agents have made implementation cheap, which changes everything about how Engineering, Product, and Design work and what they are even for." The piece went viral because "everyone who read it thought it was about them." Key claim: since creating an initial version is so cheap, many more prototypes are created, which become focal points for cross-functional review. Source: [LangChain Blog](https://blog.langchain.com/how-coding-agents-are-reshaping-engineering-product-and-design/) [practitioner direct]

- **Reforge** (pre-acquisition by Miro, March 2026): "In current product development, the pressure to ship often forces teams into premature convergence. Most teams can only afford to seriously explore one or two solution paths before committing. AI-native teams can explore many more paths simultaneously." Source: [Reforge Blog](https://www.reforge.com/blog/ai-native-product-teams) [practitioner analysis]

- **OpenAI Codex team** (Sora Android): 4 engineers + Codex shipped the Sora Android app in 28 days, prototype to global launch. 85% of code generated by GPT-5.1-Codex. 99.9% crash-free rate. The humans spent more time "directing and reviewing code than writing it." Source: [OpenAI blog](https://openai.com/index/shipping-sora-for-android-with-codex/) [vendor -- but describing own engineering practice]

**What's new here:** This is the supply-side consequence of the absorption bottleneck (L4 pattern). When implementation supply is effectively unlimited, the demand side (what to build, why, for whom) becomes the only constraint that matters. Product strategy and design judgment appreciate in value. Raw coding skill depreciates. The team restructures around the new scarcity.

---

## EMERGING PATTERN 4: The PM Coding Trap (Counter-Pattern)
**Evidence level:** Level 2-3 (multiple independent critics converging)

As PMs gain coding ability through AI tools, a counter-pattern is emerging: PMs who spend their time building prototypes instead of doing product management. Multiple independent voices are converging on this warning.

**Key evidence:**

- **Saeed Khan** (Feb 2026): "Vibe Coding is NOT a Product Management Superpower." Argues that if PMs do other people's work, who does the PM work? Calls the "future of PM is vibe coding" narrative "absolute nonsense." Source: [Medium](https://swkhan.medium.com/vibe-coding-is-not-a-product-management-superpower-but-heres-what-is-f03dd2ffb442) [practitioner direct]

- **Bryce York** (Tatari, 2026): "If Your PMs Are Vibe-Coding Prototypes, Who's Doing the Product Management?" Notes PMs spending half their week in Cursor, Lovable, Replit, or Bolt -- time not spent on customer interviews, strategy, or cross-functional alignment. Source: [bryceyork.com](https://bryceyork.com/vibe-coding-prototypes/) [practitioner direct]

- **Nicole H.** (PostMVP newsletter, 2026): "The 2026 version of overlooking customer research is PMs who obsess over their AI tool stack -- spending more time tweaking Claude workflows than talking to users." Source: [PostMVP](https://www.postmvp.com/p/common-pm-pitfalls-in-the-age-of) [practitioner direct]

- **Survey data** (cited by York): PMs overwhelmingly did NOT say vibe coding is where they want more time -- they want more time on core PM tasks: cross-functional work with Marketing, Sales, Finance.

**What's new here:** This is the flipside of "PMs can code now." The tool enables it, but the organizational value is often negative. PMs who prototype are not doing discovery, strategy, or stakeholder alignment. Three independent voices in different contexts converging on the same warning suggests this is a real, widespread failure mode -- not theoretical concern.

**Relationship to existing patterns:** This is the PM-specific manifestation of the absorption bottleneck. The human absorbs agent output (prototypes) at the cost of their actual job. The bottleneck moves from "can we build it" to "should we build it, and for whom?"

---

## EMERGING PATTERN 5: The Cognitive Overload Ceiling
**Evidence level:** Level 2 (Willison + supporting signals, very fresh)

Running multiple parallel agents creates a new ceiling: human cognitive capacity for oversight. This is distinct from the absorption bottleneck (which is about processing output). This is about the mental exhaustion of steering multiple autonomous processes simultaneously.

**Key evidence:**

- **Simon Willison** (Lenny's Podcast, April 3, 2026): "I can fire up four agents in parallel and have them work on four different problems... I feel the effects before noon." Willison explicitly warns about "AI-pilled" engineers losing sleep because "my agents could be doing work for me." Source: [Lenny's Podcast](https://www.lennysnewsletter.com/p/an-ai-state-of-the-union) [practitioner direct], also covered by [Yahoo Tech](https://tech.yahoo.com/ai/articles/ai-pilled-engineers-working-harder-081601452.html) [general press]

- **Research synthesis** (WebProNews, March 2026): "Managing an AI agent requires about 3 to 4 hours per week, essentially identical to managing a human direct report. The difference is that 4 hours managing a human yields roughly 40 hours of work. Four hours managing an AI agent yields 168 hours of output." Source: [WebProNews](https://www.webpronews.com/the-treadmill-that-never-stops-why-ais-fastest-engineers-are-running-on-empty/) [general press -- but synthesizing multiple practitioner accounts]

- **LinearB research** (2026): Recommended limiting the number of simultaneous AI agents any single role manages, and creating norms where AI capability does not automatically translate to expanded output expectations. Source: [LinearB Blog](https://linearb.io/blog/ai-strategy-to-prevent-engineering-burnout) [practitioner analysis]

**What's new here:** The absorption bottleneck is about output volume. This is about steering load. Even if you could magically review all the output, the act of directing 4 parallel agents is cognitively exhausting. This creates a natural team-size limit: not "how many humans" but "how many agent-streams can one human steer before noon?" The emerging answer seems to be 3-4 before cognitive degradation.

**Implication for team design:** Teams will need to design around human cognitive limits, not just output capacity. "1 human + 10 agents" may be technically possible but practically unsustainable.

---

## EMERGING PATTERN 6: The Dark Factory Extreme (Spec-Only Engineering)
**Evidence level:** Level 2 (single experiment -- StrongDM)

The most radical experiment in agent-driven development: humans write specifications and scenarios, agents write all code, no human reviews code. This is the logical endpoint of "spec is the moat."

**Key evidence:**

- **StrongDM** (Justin McCarthy, Jay Taylor, Navan Chauhan): Three people, started July 2025. Guiding principles: "Code must not be written by humans" and "Code must not be reviewed by humans." Humans design specifications, curate test scenarios, and watch scores. Output: 16,000 lines of Rust, 9,500 lines of Go, 700 lines of TypeScript in production. They built a "Digital Twin Universe" -- behavioral clones of Okta, Jira, Slack, Google services -- to test at scale. "Scenarios" (end-to-end user stories evaluated by LLM) replace traditional tests. Source: [Simon Willison](https://simonwillison.net/2026/Feb/7/software-factory/) [practitioner analysis], [StrongDM blog](https://www.strongdm.com/blog/the-strongdm-software-factory-building-software-with-ai) [vendor -- but describing own engineering practice]

- **Stanford CodeX** (Feb 8, 2026) published analysis questioning trust implications: "Built by Agents, Tested by Agents, Trusted by Whom?" Source: [Stanford Law](https://law.stanford.edu/2026/02/08/built-by-agents-tested-by-agents-trusted-by-whom/) [academic]

**What's new here:** This is the first known production implementation of fully agent-generated code with no human code review. The humans are pure specification + scenario authors. If this model scales, the PM/Design role becomes the ONLY role -- they write the spec (the what), define scenarios (the acceptance criteria), and watch scores. Engineering in the traditional sense disappears.

**Counter-evidence:** Only one team, three people, specific domain (security infrastructure). Stanford raised trust concerns. No evidence this works at larger scale or in domains without clear verification criteria. Simon Willison calls it "the most ambitious form of AI-assisted software development I've seen yet" -- endorsement of ambition, not necessarily of generalizability.

**Relationship to existing patterns:** This is the L4 rules-verification-scarcity pattern applied to the development process itself. Security infrastructure has codified rules and verifiable outputs -- exactly where autonomous agents converge first.

---

## EMERGING PATTERN 7: The Spec Toolchain (Spec-Driven Development Infrastructure)
**Evidence level:** Level 2-3 (GitHub official + Addy Osmani + multiple practitioners)

Not just "specs matter" (already established) but a concrete toolchain and methodology forming around specification-driven development.

**Key evidence:**

- **GitHub spec-kit** (open source, 2026): "Spec-driven development with AI: get started with a new open-source toolkit." Specs become "living, executable artifacts that evolve with the project." Source: [GitHub Blog](https://github.blog/ai-and-ml/generative-ai/spec-driven-development-with-ai-get-started-with-a-new-open-source-toolkit/) [vendor -- but open source tooling]

- **Addy Osmani** (O'Reilly Radar, Feb 2026): "How to Write a Good Spec for AI Agents." Core finding: AI coding quality fails at the specification layer, not the model layer. Backed by GitHub's analysis of 2,500+ agent configuration files. Six areas effective specs cover: commands, testing, project structure, code style, git workflow, boundaries. Source: [O'Reilly Radar](https://www.oreilly.com/radar/how-to-write-a-good-spec-for-ai-agents/) [practitioner analysis]

- **BMAD-METHOD** (open source): Multi-agent framework with named personas for spec-driven development: Mary (Business Analyst), Preston (Product Manager), Winston (Architect), Sally (Product Owner), Simon (Scrum Master), Devon (Developer). Each persona owns a stage of the SDLC. Source: referenced in multiple search results [practitioner direct]

- **Dean Peters** published an open-source Product Manager Skills framework for Claude Code with skills covering discovery, PRD development, roadmap planning, and product strategy -- all designed to feed agent-consumable specifications. Source: [GitHub](https://github.com/deanpeters/Product-Manager-Skills) [practitioner direct]

**What's new here:** "Spec is the moat" was the insight. This is the infrastructure response. Concrete tools, frameworks, and skill libraries are solidifying around spec-driven development. The spec is becoming a first-class engineering artifact with its own toolchain -- not a document, but executable infrastructure.

---

## EMERGING PATTERN 8: The 3-5 Person Pod as Default Unit
**Evidence level:** Level 2-3 (multiple independent signals converging)

Multiple independent sources are converging on 3-5 people as the natural team size for AI-native product development.

**Key evidence:**

- **OpenAI Codex team**: 4 engineers shipped Sora Android in 28 days. Source: [OpenAI](https://openai.com/index/shipping-sora-for-android-with-codex/) [vendor]
- **StrongDM Software Factory**: 3 people, 26,000+ lines of production code. Source: [Willison](https://simonwillison.net/2026/Feb/7/software-factory/) [practitioner analysis]
- **Anu Joseph** (March 2026): "Small teams of 3-5 with strong collaboration can outperform much larger groups -- because coordination overhead is the silent killer of speed." Source: [Medium](https://medium.com/@josephanu/ai-native-engineering-the-operating-model-behind-small-teams-doing-big-things-c6d01b944875) [practitioner analysis]
- **Series C startup anecdote** (cited in multiple sources): 12-person team restructured to 3 people using Cursor and Claude, 40% velocity increase.
- **Carta data**: Solo-founded startups rose from 23.7% (2019) to 36.3% (mid-2025). Source: [multiple press reports] [general press]

**What's new here:** The number is converging. Not "smaller teams" (vague). Specifically 3-5. Below that you lose coverage across product/design/engineering domains. Above that, coordination overhead eats the gains from agent acceleration. The AI-native pod appears to be: 1 product strategist + 1-2 engineers/orchestrators + 1 QA/verification lead, each running multiple agent streams.

**Relationship to cognitive overload ceiling:** If each person can steer 3-4 agent streams before degradation, a 4-person pod manages 12-16 parallel agent streams. That may be the natural unit of AI-native production capacity.

---

## WHAT WE DID NOT FIND

1. **No named company reporting a PM/Design/Eng reorg driven by AI agents.** Lots of discussion about role changes, zero cases of "we restructured our EPD organization because of coding agents and here's what happened." The reorg is happening bottom-up through practice changes, not top-down through org design.

2. **No designer-to-PM role merger.** Despite both roles gaining coding ability, we found zero cases of formal PM+Design role mergers. The roles are changing what they do, not merging into each other.

3. **No Nordic signal.** Zero Nordic practitioners surfaced in any of these emerging patterns. Spotify's Honk is the closest, but that's engineering-internal, not EPD coordination.

4. **No failure data from bidirectional design loops.** monday.com's engineering blog is the only production account. We know naive approaches fail (their explicit counter-evidence), but no one is publishing "we tried bidirectional design-code and here's why it didn't work."

5. **No evidence on how these patterns affect product quality or user outcomes.** All the evidence is about team velocity and coordination. Nobody is measuring whether products built this way are actually better for users.

---

## SYNTHESIS: The Emerging EPD Model

The patterns above, taken together, suggest a structural shift in how product teams coordinate:

**Old model (linear):** PM writes PRD -> Designer creates mockups -> Engineer builds it -> QA tests it
**Current transition (converging):** PM writes spec -> Agent generates prototype -> Team reviews together -> Agent iterates
**Emerging model (early signals):** Spec + Design System + Scenarios = Complete agent context -> Agent produces code + design simultaneously -> Human team validates against outcomes, not implementation

The scarce resources in the emerging model:
1. **Specification quality** (what to build, why, for whom)
2. **Design system maturity** (agent-consumable rules and components)
3. **Scenario/eval quality** (how to verify the output is right)
4. **Human cognitive bandwidth** (how many agent streams one person can steer)

The abundant resource: implementation capacity.

This is the EPD-specific manifestation of the L4 absorption bottleneck. The team structure follows the scarcity.
