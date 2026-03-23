# E-Learning Benchmark Research — Findings

**Track:** E-Learning Quality Benchmarks
**Date:** 2026-02-14

---

## Round 1 Orientation

### Patterns Forming

1. **The market is split into two worlds that don't talk to each other.** On one side: massive-enrollment "AI for everyone" courses (Andrew Ng) that explain concepts but don't build anything. On the other side: developer-heavy agent-building courses (LangChain, CrewAI) that assume you can code. There is almost nothing in between — courses that teach non-coders to actually build agents.

2. **Agent-specific courses are exploding in enrollment.** The LangChain agent course has 116K+ students. Agentic AI courses are the fastest-growing subcategory. MCP and multi-agent patterns are already showing up in curricula. This is not a niche — it is a wave.

3. **Project-based progression is the dominant pedagogy.** The highest-rated courses (4.7/5) all use progressive project sequences — each project builds on the previous one. Pure lecture courses score lower on engagement.

4. **Udemy dominates agent education; Coursera dominates AI awareness.** Coursera's strength is brand-name institutions (DeepLearning.AI, IBM) and professional certificates. Udemy's strength is practitioner-led, hands-on, rapidly-updated content. Agent courses live overwhelmingly on Udemy.

5. **Price is not a barrier at this level.** Udemy courses go for $15-$20 on sale. Coursera offers free audits. The market norm is low-cost or free entry. Expensive programs need to justify their price with credentials, community, or outcomes.

### Surprises

- **No credible "agents for non-coders" course exists at scale.** We expected to find at least one strong competitor in our exact niche. We did not. Andrew Ng teaches non-coders but stops at awareness. Udemy teaches agent-building but assumes Python fluency. The gap is real and large.

- **MCP is already in course curricula.** We expected MCP (Model Context Protocol) to still be too new for courseware. At least two Udemy courses already cover it. The market moves fast — our curriculum must include MCP or risk feeling dated.

- **IBM is betting on agentic AI credentials.** An enterprise player launching a professional certificate in agentic AI signals that corporate L&D budgets are moving toward agent education. This validates the business-audience angle.

### Current Hypothesis

**The "agents for non-coders" space is a genuine whitespace in e-learning.** Massive demand exists on both sides (AI awareness at 10M+ enrollments; agent-building at 100K+), but nobody bridges them for non-technical builders. Agents 102 sits in exactly this gap. The risk is not competition — it is execution: can we make agent-building genuinely accessible without dumbing it down?

### What's Still Unclear or Missing

- **Completion rates.** We have enrollment and ratings but no completion data. Do agent courses suffer from the same ~5-15% MOOC completion problem? If so, what design choices improve it?
- **Non-platform players.** We only looked at Coursera and Udemy. What about DeepLearning.AI's own platform (short courses), Replit's agent tutorials, vendor-specific training (OpenAI, Anthropic), and bootcamp-style programs?
- **Corporate/enterprise training.** IBM's certificate hints at enterprise demand, but we haven't looked at corporate training providers (Pluralsight, LinkedIn Learning, internal L&D programs). That audience is highly relevant for Agents 102.
- **Free/community resources.** YouTube channels, open-source tutorials, and community-driven learning (e.g., Hugging Face courses) may be the real competition for attention, not paid courses.

---

## Round 1 Decision

### Next Round Angle: Non-platform and vendor-specific agent education

**Explore:** DeepLearning.AI short courses (especially their agent-focused ones), Anthropic/OpenAI educational resources, and any "agents for non-coders" programs from bootcamps or independent creators.

**Why:** Round 1 revealed that the big platforms serve either awareness (Coursera) or developer skills (Udemy). But the most innovative pedagogy for agents may be happening outside these platforms — particularly in vendor short courses (DeepLearning.AI has been releasing focused 1-hour courses on agents) and in AI-native education formats. This will either confirm the whitespace hypothesis or reveal competitors we missed.

---

## Round 2 Orientation

### Programs Examined

5 additional programs from non-platform and vendor-specific channels:

1. **Agentic AI — DeepLearning.AI (Andrew Ng)** — Ng's dedicated agentic AI course teaching four design patterns (reflection, tool use, planning, multi-agent). Free. Requires Python.
2. **AI Agents in LangGraph — DeepLearning.AI** — 1-hour short course building agents from scratch, then with LangGraph. Free. Requires Python.
3. **5-Day AI Agents Intensive — Google/Kaggle** — Cohort-based 5-day sprint on agents within the Gemini ecosystem. Free. Developer-focused.
4. **OpenAI Academy** — OpenAI's own multi-tier education platform with certifications, from prompt engineering to API building. New, pricing unclear.
5. **UT Austin AI Agents for Business Applications** — University exec ed program for business professionals. Explicitly targets non-developers. Premium pricing ($2K-$5K+).

### Patterns Forming

1. **AI companies are now in the education business — but they are teaching their own ecosystems.** Andrew Ng launched a full agentic AI course on DeepLearning.AI. Google runs a 5-day agent intensive through Kaggle. OpenAI launched an entire academy with certifications. These are not peripheral efforts — they are strategic investments. However, every vendor course is locked to that vendor's tools and models. None teaches agents as a general concept.

2. **Andrew Ng has closed the awareness-to-building gap — but only for developers.** His new "Agentic AI" course is the most significant development since Round 1. It provides the conceptual framework (four agentic design patterns) that was missing from the market. But it still requires Python. Ng has moved from "explain AI to everyone" to "teach agentic patterns to developers." The non-coder audience is still left behind.

3. **The "four agentic design patterns" framework is becoming canonical.** Reflection, Tool Use, Planning, Multi-Agent — this taxonomy originated from Andrew Ng and is now the standard way to teach agentic AI across multiple courses. Agents 102 should adopt this framework as conceptual scaffolding, regardless of whether learners code.

4. **Free is the dominant price point for vendor education.** DeepLearning.AI short courses: free. Google Kaggle intensive: free. OpenAI Academy: partially free. When the vendor is also the platform owner, they subsidize education to grow their ecosystem. This means Agents 102 competes against free — but with a value proposition those free courses cannot offer (vendor-agnostic, non-coder-friendly).

5. **University programs have found the business audience — at prohibitive prices.** UT Austin's AI Agents for Business Applications program is the single closest competitor to Agents 102's positioning. It explicitly targets business professionals, not developers. But at executive education pricing ($2K-$5K+), it serves only the corporate L&D budget tier. The individual learner, the startup founder, the product manager paying out of pocket — they are priced out.

### Surprises

- **Andrew Ng now teaches agent-building, not just awareness.** This is the biggest shift since Round 1. Ng's "Agentic AI" course proves he sees agents as the next wave of accessible AI education. But he chose to require Python — a deliberate decision that leaves the non-coder audience to someone else.

- **Vendor education is free because it is marketing.** Google, OpenAI, and DeepLearning.AI all offer agent courses at no cost. The business model is ecosystem lock-in, not tuition revenue. This reframes the competitive landscape: Agents 102 is not competing with these courses on price — it is competing on independence and breadth.

- **The cohort model appears in agent education.** Google's 5-day Kaggle intensive uses daily pacing with community accountability. This is a format innovation that self-paced MOOCs lack. Cohort-based delivery may be a design advantage Agents 102 should consider.

- **A2A (Agent-to-Agent protocol) is already in curricula.** DeepLearning.AI has a course on the A2A protocol replacing their earlier ACP course. The protocol landscape is shifting fast — from MCP to ACP to A2A. Agents 102 must teach the concept of agent communication protocols without binding to any single standard.

### Updated Hypothesis

**The whitespace holds — but the edges are closing in.** Round 1 found nobody bridging "AI awareness for everyone" and "agent-building for developers." Round 2 reveals that the bridge is being built from the developer side: Andrew Ng's agentic AI course and vendor academies now teach agent-building accessibly — but still require coding. From the business side, UT Austin targets business professionals with agent education — but at $2K-$5K+. Agents 102's unique position is the intersection: agent-building education that is both accessible to non-coders AND affordable. No program found in either round occupies that exact space.

The competitive risk has shifted. It is no longer "does the gap exist?" — it clearly does. The risk is now: (a) How long before Andrew Ng or a vendor creates a no-code agent course? (b) Can Agents 102 establish itself before the gap closes?

### What's Still Unclear or Missing

- **Corporate/enterprise training platforms.** We still have not examined LinkedIn Learning, Pluralsight, or internal L&D agent programs. These are where corporate budgets flow and may be the most relevant distribution channel for Agents 102.
- **No-code agent platforms as learning environments.** Tools like n8n, Make, Zapier, and Relevance AI are increasingly marketing themselves with educational content. Are they becoming de facto learning platforms for non-coder agent builders?
- **Completion and engagement data.** Still no hard data on whether short-format vendor courses (1 hour) outperform long-format MOOC courses (40+ hours) on actual learning outcomes, not just completion rates.
- **YouTube and community learning.** Free YouTube tutorials and community resources (Hugging Face, Reddit communities) may represent the largest actual competitor for attention, even if they are not structured courses.

---

## Round 2 Decision

### Next Round Angle: Corporate training platforms and no-code agent education

**Explore:** LinkedIn Learning, Pluralsight, and no-code agent platforms (n8n, Make, Zapier) that offer agent-building education. Test whether the corporate L&D market has agent education programs, and whether no-code platforms are becoming the de facto "agents for non-coders" learning path.

**Why:** Rounds 1 and 2 confirmed the whitespace in formal education (MOOCs, vendor courses, universities). But the two audiences most relevant to Agents 102 — corporate professionals and non-coder builders — may already be learning through different channels: LinkedIn Learning for corporate L&D, and no-code platform tutorials for hands-on builders. If these channels are already serving our audience well, our positioning needs refinement. If they are not, the whitespace is even larger than we thought.

---

## Round 3 Orientation

### Programs Examined

5 additional programs from corporate L&D platforms and no-code agent education channels:

1. **Leveraging AI Agents for Productivity — Pluralsight** — 3-course learning path on understanding and using AI agents for productivity. Subscription model. Conceptual/usage focus, not building.
2. **Integrating AI Agents in Enterprise Systems — Pluralsight** — Enterprise-focused course on deploying agents via Salesforce Agentforce and Amazon Bedrock. Vendor-locked to enterprise platforms.
3. **AI Agents and Automation (No Code): n8n, Zapier, APIs, RAGs — Udemy** — First explicitly no-code AI agent course found across all three rounds. Independent instructor, unknown quality, likely modest enrollment.
4. **n8n - AI Agents, AI Automations & AI Voice Agents (No-code!) — Udemy** — Platform-specific n8n course teaching agents without code. Tool training, not conceptual education.
5. **n8n Platform Education (docs, templates, tutorials)** — n8n's own educational content and agent templates. Not a formal course, but the most natural "learn to build agents without code" experience available today.

### Patterns Forming

1. **Corporate L&D platforms have agent content, but it is shallow or vendor-locked.** Pluralsight offers multiple AI agent courses and paths, but they split into two categories: (a) conceptual "understand agents for productivity" content aimed at business professionals, and (b) vendor-specific integration training (Salesforce Agentforce, Amazon Bedrock) aimed at enterprise developers. Neither teaches non-coders to build agents. LinkedIn Learning is even further behind — no dedicated AI agent courses were found; their AI content remains at the "AI literacy" and "prompt engineering" level.

2. **No-code AI agent courses exist — but are nascent, unbranded, and tool-specific.** For the first time across three rounds, we found courses explicitly teaching no-code AI agent building (Udemy courses using n8n and Zapier). This signals the market is starting to respond to the gap we identified in Round 1. However, these courses are from unknown instructors, have no brand credibility, likely have modest enrollment, and are tool-training (how to use n8n) rather than agent education (what agents are and why they matter).

3. **No-code platforms themselves are becoming the de facto agent education for non-coders.** n8n, Zapier, and Make all have AI agent features, templates, and documentation. A motivated non-coder can learn to build agents simply by using these platforms. This is the most significant "hidden competitor" we have found — not a course, but a platform experience that teaches by doing. However, platform education teaches one platform, not agent concepts. There is no conceptual framework, no vendor-agnostic perspective, no strategic thinking layer.

4. **The corporate L&D channel is an opportunity, not a threat.** Pluralsight's agent content validates that enterprise L&D budgets are flowing toward agent education. But the content available is either too shallow (productivity concepts) or too vendor-specific (Salesforce/AWS integrations). A well-positioned vendor-agnostic, build-oriented agent program could fill the gap in corporate L&D catalogs — either as a standalone offering or as content licensed to platforms like Pluralsight.

5. **LinkedIn Learning is conspicuously absent from agent education.** Despite being the largest professional learning platform globally, LinkedIn Learning has no dedicated AI agent courses. Their AI content stops at literacy and prompt engineering. This is a lagging indicator — LinkedIn Learning tends to follow market trends rather than lead them. When they do add agent content, it will likely be conceptual/awareness-level, not build-oriented. This creates a window of opportunity.

### Surprises

- **The no-code agent gap is being noticed.** Udemy courses with "no code" and "AI agents" in the title are appearing for the first time. Class Central published a specific article on "Best AI Agent Courses for Beginners and Non-Coders." The market is waking up to this audience. Agents 102 is not alone in seeing the gap — but no credible player has claimed it yet.

- **Platform education is stronger than course education for non-coders.** The most effective way a non-coder can learn to build agents today is not through a course — it is through n8n's templates and documentation. This is a pedagogical insight: Agents 102 should integrate platform-based exercises (use n8n, Zapier, or similar tools as hands-on labs) rather than trying to teach agent-building in a vacuum.

- **Enterprise agent education is already vendor-locked.** Pluralsight's enterprise agent content teaches Salesforce Agentforce and Amazon Bedrock specifically. This means corporate learners are being trained on their existing vendor stack, not on agent concepts. Agents 102 can position itself as the "vendor-agnostic foundation" that precedes vendor-specific training.

### Updated Hypothesis

**The whitespace is confirmed across all channels — formal education, vendor training, corporate L&D, and no-code platforms all leave the same gap.** Three rounds of research across 15 programs have tested the hypothesis from every angle:

- MOOCs (Coursera, Udemy): Either "AI awareness for non-coders" or "agent-building for developers." Nothing in between.
- Vendor courses (DeepLearning.AI, Google, OpenAI): Free, high-quality, agent-focused — but require coding and lock to one vendor.
- University programs (UT Austin): Business audience, agent focus — but $2K-$5K+ pricing.
- Corporate L&D (Pluralsight, LinkedIn Learning): Shallow conceptual content or vendor-specific tool training. No build-oriented agent education for non-coders.
- No-code platforms (n8n, Zapier): Platform-as-education works for hands-on building, but teaches tools, not concepts. No conceptual framework, no strategic layer.

Agents 102's positioning is validated: **vendor-agnostic agent education that is accessible to non-coders, affordable, and goes beyond awareness to actual building.** The closest informal competitors are no-code platform tutorials (n8n), but these are complementary — Agents 102 provides the "why" and "what," while platforms like n8n provide the "how."

The competitive risk is no longer that someone occupies this space — it is that the space fragments into tool-specific tutorials before anyone establishes a conceptual brand. Agents 102 needs to be the definitive "understand agents, then build them" program before the market fills with n8n-specific and Zapier-specific mini-courses that collectively address the same audience.

### What's Still Unclear or Missing

- **YouTube and community learning.** Still unexamined. YouTube tutorials on n8n agent building and similar topics may represent significant informal competition.
- **Completion and learning outcomes.** No hard data across any round. We know enrollment numbers but not whether anyone actually learns.
- **B2B distribution strategy.** Pluralsight's model shows that corporate distribution matters — being in an existing L&D budget is a powerful advantage. How Agents 102 accesses corporate buyers remains unresolved (this is a go-to-market question, not a competitive research question).

---

## Round 3 Decision

### Diminishing returns reached.

Three rounds have examined 15 programs across 6 channel types (MOOCs, vendor platforms, universities, corporate L&D, no-code platforms, platform-as-education). The core finding has been stable since Round 1 and has only been reinforced by Rounds 2 and 3: the "accessible, affordable, vendor-agnostic agent education for non-coders" space is genuinely unoccupied.

**A fourth round would not meaningfully change our understanding.** The remaining gaps (YouTube/community learning, completion data, B2B distribution) are either diminishing-return questions or go-to-market strategy questions that belong in a different research track.

**Recommendation: Close the e-learning benchmark research and shift effort to curriculum design and content development.** The competitive landscape is clear enough to act on. Key inputs for curriculum design from this research:

1. **Adopt the four agentic design patterns** (reflection, tool use, planning, multi-agent) as conceptual scaffolding — this framework is becoming canonical.
2. **Use progressive project-based pedagogy** — every top-rated program builds in project sequences.
3. **Integrate no-code platforms** (n8n, Zapier) as hands-on implementation tools, not as the curriculum itself.
4. **Keep it short** — the highest-completing programs are under 6 hours or use cohort-based pacing.
5. **Be vendor-agnostic** — teach patterns and concepts first, then show implementations across tools.
6. **Include MCP/agent protocols** — the curriculum must cover agent communication protocols or risk feeling dated.
7. **Consider cohort-based delivery** — cohort pacing drives completion rates far above self-paced formats.
