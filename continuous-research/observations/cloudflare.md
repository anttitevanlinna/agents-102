# Cloudflare — Internal AI Engineering Stack at Scale

**Type:** Transform-in-place | **Size:** ~6,100 | **Evidence:** Deep case
**Key sources:** Cloudflare Engineering blog, April 2026: [internal AI engineering stack](https://blog.cloudflare.com/internal-ai-engineering-stack/) and [AI code review at scale](https://blog.cloudflare.com/ai-code-review/).

---

## How They Work

- **Internal AI engineering stack:** Cloudflare built its internal AI coding infrastructure on its own platform: Access, AI Gateway, Workers AI, MCP portal, Agents SDK, Sandbox SDK, Workflows, Backstage, AGENTS.md, and AI code review in CI.
- **iMARS tiger team:** An Internal MCP Agent/Server Rollout Squad pulled engineers from across the company for the initial push; sustained ownership moved to Developer Productivity.
- **93% R&D adoption:** In the prior 30 days, 3,683 internal users used AI coding tools, equal to 60% of the company and 93% of R&D.
- **295 teams using agentic tools:** Cloudflare reports 295 teams using agentic AI tools and coding assistants.
- **AI Gateway as control plane:** 47.95M AI requests and 241.37B tokens routed in 30 days, with centralized authentication, model routing, cost tracking, BYOK, and Zero Data Retention controls.
- **Multi-agent code review:** Up to seven specialized reviewers run in CI through OpenCode, with a coordinator agent producing one structured review.

## Formation Story

Cloudflare did not simply buy coding assistants. It built the substrate those assistants need inside a large engineering organization: authentication, model routing, MCP servers, knowledge, sandboxing, standards, review, and telemetry. The initial iMARS team created momentum; Developer Productivity then absorbed the work into normal platform ownership.

## The Skill Shift

Engineers moved toward:
- Working through MCP-compatible clients such as OpenCode and Windsurf
- Encoding repository standards in AGENTS.md and Backstage
- Treating review, onboarding, and change propagation as agent-readable infrastructure
- Using AI review before human review to reduce queue delay and catch low-level issues

## Verification / Quality Approach

- **CI-native review:** AI reviews run automatically on merge requests.
- **Specialist reviewers:** Security, performance, code quality, documentation, release management, AGENTS.md, and internal compliance are split across specialized agents.
- **Signal bias:** Cloudflare deliberately biased prompts toward low-noise findings.
- **Break-glass mechanism:** Human engineers overrode the AI flow 288 times in the first 30-day measurement window, 0.6% of merge requests.
- **Known limits stated:** Cloudflare says the system is not a replacement for human review, especially for architecture and cross-system impact.

## Outcomes

- **131,246 review runs** across **48,095 merge requests** in **5,169 repositories** in 30 days.
- **Median review time:** 3m39s. **P99:** 10m21s.
- **Average review cost:** $1.19. **Median:** $0.98.
- **159,103 total findings** across reviews.
- **Merge-request velocity:** four-week rolling average climbed from about 5,600/week to over 8,700/week; week of March 23 hit 10,952, nearly double the Q4 baseline.

## What Transfers

- **Build the control plane first:** identity, routing, model policy, cost tracking, and data-retention controls make broad adoption governable.
- **Make internal knowledge agent-readable:** Backstage, AGENTS.md, standards, and codified review rules are throughput infrastructure.
- **Review is the absorption bottleneck:** Cloudflare attacked the human review queue directly instead of only optimizing code generation.
- **Specialized agents beat monolithic prompting:** multi-agent review works because each agent has a narrow job and a coordinator deduplicates output.

## Limitations / What We Don't Know

- The evidence is deployer-owned, though practitioner-direct and unusually detailed.
- Merge-request volume is a throughput proxy, not business outcome.
- The relationship between AI review findings and defect reduction is not yet quantified.
- Org-chart changes are not documented; this is platform/process redesign, not formal reporting-line redesign.

## Key Insight

**Cloudflare crossed by redesigning the engineering substrate.** The core move was not "make every engineer use AI"; it was making context, review, identity, routing, sandboxing, and standards available to agents as normal engineering infrastructure.

---

*Last updated: May 2026*
