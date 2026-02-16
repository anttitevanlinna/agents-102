# Competitor Research — OODA Loop Prompts

## How It Works

Research runs as small OODA loops, not one big sweep.

Each round:
1. **Observe** — 1-2 targeted searches, find 3-5 programs
2. **Orient** — What did we learn? What patterns emerge? What surprised us?
3. **Decide** — Where should we look next? What hypothesis to test?
4. **Act** — Write findings to file, propose the next round's focus

Each round is a separate agent call. Small context, fast, writes output immediately.

## Running a Round

1. Copy the track prompt into `PROMPT.md`
2. For Round 1, use the seed search angle provided
3. For Round 2+, include the orientation log from the previous round — the agent reads existing files and builds on them
4. Review between rounds. Steer if needed.
5. Stop when you have enough signal, not when you hit a number

## Research Run Log

| Track | Round | Date | Programs Added | Orientation Summary |
|-------|-------|------|----------------|---------------------|
| Direct Competitors | 1 | 2026-02-09 | 5 | Market splits into dev bootcamps vs strategy programs. Gap is real. |
| Direct Competitors | 2 | 2026-02-09 | 5 | Vendor training is 3rd force — free, massive, locked. Vendor-agnostic = strength for org decisions. |
| Direct Competitors | 3 | 2026-02-09 | 5 | Consulting firms don't train. No-code tutorials = 4th category. Diminishing returns — stopped. |
| E-Learning Benchmarks | 1 | 2026-02-09 | 5 | "AI for everyone" vs "agents for devs" split. 116K students in top agent course (dev-only). |
| E-Learning Benchmarks | 2 | 2026-02-09 | 5 | Andrew Ng teaches agents now but requires Python. UT Austin found biz audience at $2K-5K. |
| E-Learning Benchmarks | 3 | 2026-02-09 | 5 | Corporate L&D shallow or locked. No-code courses nascent/unbranded. Diminishing returns — stopped. |
| Practice Curators | 1 | 2026-02-09 | 5 | Three models: benchmarking (APQC), analyst (Gartner), collaborative (IHI/CNCF). IHI closest match. |
| Practice Curators | 2 | 2026-02-09 | 3 | IHI BTS blueprint detailed. Carnegie NICs + Toyota Kata add context tagging + meta-practice. Stopped. |
| AI Network Curators | 1 | 2026-02-09 | 6 | Nobody building peer network + curated practices for AI agents. 8/10 confidence. Gap genuine. |
| Helsinki Consultancies | 1 | 2026-02-09 | 8 | Zero have agentic AI training or network models. Pure consulting. Credibility capture is the threat. |
| Helsinki Consultancies | 2 | 2026-02-09 | 5 | Aalto EE is the buyer gatekeeper. Solita has AI depth. Renessai = referral partner. Stopped. |
| AI Transformation Fwks | 1 | 2026-02-09 | 10 | Gen 3 "agentic enterprise" is mainstream. All say upskill, none provide training. Network model novel. |

---

## Track 1: Direct Competitors

### Research: Direct Competitors — Agentic Training Programs

#### Goal

Find training programs that teach AI agent creation at an organizational level. Build understanding incrementally.

#### What Qualifies

A direct competitor meets ALL of:
- **Agentic**: Teaches AI agent creation specifically (not just AI/ML broadly)
- **Transformative**: Aims to change how organizations operate
- **Company-scale**: Designed for organizational adoption
- **Hands-on**: Participants build real things

Programs meeting only some criteria: still catalog them, flag what's missing.

#### Per-Program Documentation

For each program found, document:
- Name, URL, Provider, Type (corporate training / bootcamp / executive ed / workshop / certification / consulting)
- 2-3 sentence description
- Target audience, key topics, format, duration, price range
- Enrollment/scale if available

Score on these dimensions (1-5):

| Dimension | 1 | 5 |
|-----------|---|---|
| **Agentic Depth** | AI/ML broadly; agents are a sidebar | Entirely focused on building AI agents |
| **Audience Level** | Developer-only; requires coding | Designed for leaders/non-coders |
| **Transformation Scope** | Individual upskilling | Organization-wide transformation |
| **Hands-On Intensity** | Lecture dominant | Participants build real things |
| **Fundamentals vs. Tools** | Locked to specific vendors | Tool-agnostic principles first |

Note strengths and gaps relative to Agents 102.

#### Output Files

- `research/competitors-direct-resources.md` — Program catalog (append each round)
- `research/competitors-direct-findings.md` — Orientation log + evolving analysis

#### OODA Round Instructions

**Every round, you MUST follow this sequence:**

**1. OBSERVE** (max 2 web searches)
Read existing files first if they exist. Then do 1-2 focused searches. Document 3-5 programs.

**2. ORIENT** (this is the most important step)
Write an orientation entry in the findings file:
- What patterns are forming?
- What surprised us?
- What's our current hypothesis about this market?
- What's still unclear or missing?

**3. DECIDE**
Based on orientation, state:
- What angle should the next round explore?
- Why that angle? What will it confirm or challenge?

**4. ACT**
- Append new programs to the resources file
- Update the findings file with orientation + decision
- Output `ROUND COMPLETE` when done

#### Seed Search (Round 1)

Start with: "AI agent training programs for businesses" and "agentic AI bootcamp enterprise". These are the most direct searches. See what comes back, then orient.

---

## Track 2: High-Volume E-Learning

### Research: High-Volume E-Learning — Market Quality Benchmarks

#### Goal

Find high-volume, well-regarded AI/LLM courses. These are quality benchmarks, not necessarily competitors. Build understanding incrementally.

#### What Qualifies

- Great reputation (high ratings, strong brand)
- High enrollment
- AI, agents, or LLM topics

#### Per-Program Documentation

For each program found, document:
- Name, URL, Provider, Type (MOOC / certification / specialization / course)
- 2-3 sentence description
- Target audience, key topics, format, duration, price
- Enrollment count and rating if available

Score on these dimensions (1-5):

| Dimension | 1 | 5 |
|-----------|---|---|
| **Market Reputation** | Unknown/poor | Exceptional (4.5+), strong brand |
| **Enrollment Scale** | Under 1K | 100K+ |
| **Content Quality** | Dated/shallow | Best-in-class |
| **Completion/Engagement** | Low completion | High completion, strong community |
| **Pricing Model** | Expensive, inflexible | Accessible, free tier |
| **AI/Agent Relevance** | Generic tech | Directly teaches agents |

Note what makes it work and lessons for Agents 102.

#### Output Files

- `research/competitors-elearning-resources.md` — Program catalog (append each round)
- `research/competitors-elearning-findings.md` — Orientation log + evolving analysis

#### OODA Round Instructions

**Every round, you MUST follow this sequence:**

**1. OBSERVE** (max 2 web searches)
Read existing files first if they exist. Then do 1-2 focused searches. Document 3-5 programs.

**2. ORIENT** (this is the most important step)
Write an orientation entry in the findings file:
- What patterns are forming?
- What surprised us?
- What's our current hypothesis about this market?
- What's still unclear or missing?

**3. DECIDE**
Based on orientation, state:
- What angle should the next round explore?
- Why that angle? What will it confirm or challenge?

**4. ACT**
- Append new programs to the resources file
- Update the findings file with orientation + decision
- Output `ROUND COMPLETE` when done

#### Seed Search (Round 1)

Start with: "most popular AI courses highest enrollment Coursera Udemy 2025" — cast a wide net on the biggest platforms first. Orient on what "big" looks like, then go deeper.
