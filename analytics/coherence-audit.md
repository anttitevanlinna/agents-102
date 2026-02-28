# Coherence Audit — 2026-02-28

Cross-file comparison of CLAUDE.md, business-model-canvas.md, lecture-guardrails.md, training-outline.md, learning-goals.md, and content-strategy.md.

---

## 1. Module Count and Names

### Misalignment: training-outline.md still describes an old 6-part structure

**CLAUDE.md** (line 44) and **lecture-guardrails.md** (lines 57-68) both describe **8 modules**:
1. Getting Going
2. Building Agent Systems
3. Multi-Agent Systems
4. Security
5. Output Quality
6. Evals
7. Agent Platforms
8. Agents Building Agents

**training-outline.md** describes a completely different structure:
- Module 1: "Your Personal Profile Agent"
- Module 2: "Evaluations -- Catching Fabrication Systematically"
- Part 3: "The Fundamentals -- How Agents Work with LLMs" (note: "Part", not "Module")
- Part 4: "Security -- Building Agents You Can Trust"
- Part 5: "Lifecycle -- From Experiment to Production"
- Part 6: "What's Next -- The Journey Beyond Bootstrap"

This is a 6-part structure with entirely different module names and a different pedagogical arc. The old outline front-loads evals at Module 2 and puts fundamentals at Part 3. The new 8-module structure puts evals at Module 6 and eliminates the standalone "Fundamentals" and "Lifecycle" parts (these concepts are now woven through other modules).

**Files affected:** `/Users/anttitevanlinna/Projects/agents-102/training-outline.md`
**Fix:** Rewrite training-outline.md to reflect the 8-module structure from CLAUDE.md and lecture-guardrails.md. The old structure is entirely superseded.

---

## 2. Module 1 Identity

### Misalignment: "Personal Profile Agent" vs. "Creativity and generative abundance with control"

**training-outline.md** Module 1 is "Your Personal Profile Agent" -- participants build a LinkedIn profile agent, push it until it fabricates, and learn the tension between useful and unreliable.

**lecture-guardrails.md** (lines 357-369) redefines Module 1 as "Creativity and generative abundance with control" -- participants create a personal site with guardrails that infuse differentiation and storytelling. The insight is structured generation (guardrails/CLAUDE.md), not fabrication detection.

**CLAUDE.md** (line 49) names Module 1 "Getting Going" -- a neutral name compatible with the guardrails description but not with the profile agent concept.

**lecture-guardrails.md** (line 178) states Module 1's big idea is: "Agents are useful AND unreliable." This aligns with the OLD training-outline.md concept (fabrication) but contradicts the SAME FILE's own section 7 (lines 357-369), which frames Module 1 as creative abundance with control, not unreliability.

**Files affected:** `/Users/anttitevanlinna/Projects/agents-102/training-outline.md`, and an internal contradiction within `/Users/anttitevanlinna/Projects/agents-102/curriculum/lecture-guardrails.md` (section 3 line 178 vs. section 7 lines 357-369).
**Fix:** Align training-outline.md Module 1 with the guardrails file's section 7 vision (personal site with guardrails). Resolve the internal contradiction in lecture-guardrails.md: either update the "big idea" in section 3 to match section 7, or reconcile both (the site exercise can still surface unreliability, but the PRIMARY framing should be consistent).

---

## 3. "Three Things" vs. "Four Things"

### Misalignment: content-strategy.md still says "Three things"

**CLAUDE.md** (line 3): "Four things: **Train -> Curate -> Connect -> Advise.**"

**business-model-canvas.md** (lines 3, 17, 147-149): "Four things: **Train -> Curate -> Connect -> Advise.**" -- fully updated, with a detailed "Advise" section.

**content-strategy.md** (line 125): "Three things: **Train -> Curate -> Connect.**" -- no mention of Advise anywhere in the file. The entire Agent Platform Advisory offering is absent.

**MEMORY.md** (loaded in system prompt): "Three things: Train -> Curate -> Connect." on line 4 of the Business Model section, and "**Three things: Train -> Curate -> Connect.**" in the Project Identity section. Both are stale.

**Files affected:** `/Users/anttitevanlinna/Projects/agents-102/content-strategy.md`, and the MEMORY.md file (`.claude/` memory).
**Fix:** Update content-strategy.md to say "Four things" and add an Advise section (or at minimum reference it). Update MEMORY.md to say "Four things."

---

## 4. Tooling: No-Code Platforms (n8n, Zapier) vs. Claude Code Desktop/Web

### Misalignment: multiple files still reference no-code platforms as the primary building tool

**lecture-guardrails.md** (lines 310-316) makes the strategic decision explicit: "Plan for Claude Code in GUI/web mode. Do not assume terminal comfort." Exercises describe what to do conceptually, not terminal commands.

**business-model-canvas.md** still references no-code platforms as the primary lab environment in multiple places:
- Line 106: "Hands-on exercises using no-code platforms"
- Line 343: "No-code platform integrations -- n8n, Zapier, etc. as hands-on labs"
- Line 373: "No-code platforms -- Hands-on lab environment. n8n, Zapier, Make."
- Line 390: "Platform/tooling -- n8n is open source; others have free tiers"

**learning-goals.md** (lines 27-32) lists tooling as: "Claude Code, GitHub Actions, n8n, Claude Code SDK (headless)." This is a mixed bag -- Claude Code is correct, but n8n is listed as a primary tool alongside it, and GitHub Actions / SDK (headless) may not match the "no terminal assumptions" decision.

**training-outline.md** (line 2 of Module 1): "Use Claude Code to create a personal profile agent" -- this is fine, but the file also doesn't mention n8n or Zapier, making it accidentally more aligned with the new direction.

**content-strategy.md** (lines 95-98) lists "n8n, Make, Power Automate" as examples of existing tools that lack a flywheel, and (line 103) positions Claude Code as the primary tool. This framing is actually fine -- it doesn't present n8n as the training tool but as context.

**Files affected:** `/Users/anttitevanlinna/Projects/agents-102/strategy/business-model-canvas.md` (lines 106, 343, 373, 390), `/Users/anttitevanlinna/Projects/agents-102/learning-goals.md` (lines 27-32).
**Fix:** In business-model-canvas.md, replace "no-code platforms" / "n8n, Zapier" references with "Claude Code desktop/web" or make tooling language platform-agnostic per the guardrails decision. In learning-goals.md, reconsider whether n8n, GitHub Actions, and SDK (headless) belong in the "Reality Check" tooling list given the audience is chat users with no terminal assumptions.

---

## 5. Audience Description

### Misalignment: "non-coders" / "non-technical business professionals" vs. "chat users making the leap to systems"

**lecture-guardrails.md** (section 5, lines 254-289) defines the audience precisely: "chat users making the leap to systems." Entry requirement is: "you can have a lengthy conversation with an LLM." The audience ranges from basic chat users to deep prompters. The unifying trait is that nobody is building systems yet.

**business-model-canvas.md** (line 52-56): "End learner: Non-technical business professionals -- Product managers, analysts, team leads, operations staff. Not developers, but not afraid to learn." This is compatible but uses different language ("non-technical" vs. "chat users").

**business-model-canvas.md** (line 86): "Build working agents without writing code." This statement may conflict with the Claude Code desktop/web approach if Claude Code involves any code-adjacent interaction.

**business-model-canvas.md** (line 340): "Vendor-agnostic patterns, non-coder-accessible." Same issue -- "non-coder" framing vs. the guardrails' more precise "chat users" framing.

**learning-goals.md** (line 80): "A graduate doesn't need to be a software engineer." Compatible but less specific than the guardrails framing.

**content-strategy.md** (line 19): References "super early adopters" who are "using Claude Code, ChatGPT, Codex -- automating their lives and businesses right now." This describes the people to watch, not the audience. The audience itself is not explicitly redefined as "chat users" in this file.

**Files affected:** `/Users/anttitevanlinna/Projects/agents-102/strategy/business-model-canvas.md` (lines 52-56, 86, 340), and to a lesser extent `/Users/anttitevanlinna/Projects/agents-102/learning-goals.md` and `/Users/anttitevanlinna/Projects/agents-102/content-strategy.md`.
**Fix:** Consider adopting "chat users making the leap to systems" as the canonical audience description across all files. The "non-coder" and "non-technical" labels may undersell the audience and create a framing mismatch with the actual entry requirement (active LLM chat experience).

---

## 6. Four Pillars (training-outline.md)

### Potentially stale: "Four Pillars" framework not referenced elsewhere

**training-outline.md** (lines 19-28) defines "Four Pillars" that every agent must satisfy:
1. LLM-based
2. Secure
3. Lifecycle-managed
4. Reliable

This framework does not appear in any other file:
- **lecture-guardrails.md** never mentions "four pillars." Its organizing principle is the 8-module Bloom's progression + 4 Cs + three emergences (emergent knowledge, emergent control, emergent leadership).
- **CLAUDE.md** never mentions "four pillars."
- **learning-goals.md** organizes capabilities into 6 categories (Design & Architecture, Building & Implementation, Quality & Reliability, Security & Trust, Lifecycle & Operations, Scaling & Multiplication) -- different from the four pillars.
- **business-model-canvas.md** does not reference the four pillars.

The "four pillars" concept (LLM-based, secure, lifecycle, reliable) is not wrong, but it is orphaned. The training-outline.md says (line 118) "The four pillars are woven through, not bolted on" -- but the 8-module structure in lecture-guardrails.md uses "three throughlines" (continuous improvement, discovery and learning, strategy as assumptions) and "three emergences" as its weaving mechanisms instead.

**Files affected:** `/Users/anttitevanlinna/Projects/agents-102/training-outline.md` (lines 19-28, 118).
**Fix:** Decide whether the four pillars still serve a purpose alongside the throughlines and emergences, or whether they've been superseded. If superseded, remove from training-outline.md. If retained, reference them in lecture-guardrails.md so the connection is clear.

---

## 7. Act 4 Storyline (content-strategy.md) vs. Modules 4-8

### Misalignment: content-strategy.md storyline maps to the old module structure

**content-strategy.md** (lines 75-89) describes a 4-act storyline:
- Act 1: "I can create something" -- maps to Module 1
- Act 2: "How do I scale it?" -- maps loosely to Modules 2-3
- Act 3: "How do I control it?" -- maps loosely to Modules 4-6 (security, quality, evals)
- Act 4: "The deep mechanics and the flywheel" -- lists Memory, Self-introspection, Continuous improvement, The flywheel

Act 4 mentions "Memory" and "Self-introspection" as standalone topics. Neither appears as a module in the 8-module structure. The 8-module arc ends with Module 7 (Agent Platforms) and Module 8 (Agents Building Agents / Flywheel). "Memory" and "Self-introspection" are likely now absorbed into other modules rather than being standalone topics.

**Files affected:** `/Users/anttitevanlinna/Projects/agents-102/content-strategy.md` (lines 84-89).
**Fix:** Update the storyline acts to match the 8-module arc, or at least verify that "Memory" and "Self-introspection" have a home in the current structure.

---

## 8. Evals Positioning

### Misalignment: three different positions on evals across files

**training-outline.md** Module 2: Evals as "Catching Fabrication Systematically" -- positioned as the second thing you learn, right after building your first agent. Framed as quality control / fabrication detection.

**lecture-guardrails.md** Module 6: Evals at Bloom's level "Create" -- participants design their own evaluation system. Positioned late in the arc, after security and output quality. Framed (lines 401-409) as "strategic steering, not testing."

**learning-goals.md** (lines 55-58): Evals under "Quality & Reliability" -- "Design and implement evals that catch fabrication and quality problems." This aligns more with the old fabrication-focused framing than with the "strategic steering" framing in lecture-guardrails.md.

**Files affected:** `/Users/anttitevanlinna/Projects/agents-102/training-outline.md` (Module 2), `/Users/anttitevanlinna/Projects/agents-102/learning-goals.md` (lines 55-58).
**Fix:** training-outline.md needs a complete rewrite (see item 1). learning-goals.md evals section should be reviewed to incorporate the "strategic steering" dimension from lecture-guardrails.md -- evals are not just catching fabrication, they are steering output toward strategically significant factors.

---

## 9. Missing Cross-References

### content-strategy.md does not reference lecture-guardrails.md

**CLAUDE.md** (line 46) identifies three source-of-truth documents: training-outline.md, learning-goals.md, content-strategy.md. It also says (line 64): "lecture-guardrails.md defines the pedagogical rules every module must pass."

**content-strategy.md** does not reference lecture-guardrails.md, and lecture-guardrails.md does not reference content-strategy.md. They cover overlapping territory (audience, module arc, teaching philosophy) but evolved independently, leading to the drift documented in this audit.

**Files affected:** `/Users/anttitevanlinna/Projects/agents-102/content-strategy.md`, `/Users/anttitevanlinna/Projects/agents-102/curriculum/lecture-guardrails.md`.
**Fix:** Add cross-references. Consider whether content-strategy.md's storyline role has been absorbed by lecture-guardrails.md's throughlines, or whether they serve genuinely different purposes (external positioning vs. internal pedagogy).

---

## 10. Bootstrap Pricing Discrepancy

### Minor: content-strategy.md mentions a different price point

**content-strategy.md** (line 25): "You cannot train everyone at EUR1000/head." This implies an earlier pricing model. All other files consistently say EUR500/person for Bootstrap.

This is not a contradiction (it says you *cannot* charge EUR1000), but it introduces a number that might confuse readers who see EUR500 everywhere else.

**Files affected:** `/Users/anttitevanlinna/Projects/agents-102/content-strategy.md` (line 25).
**Fix:** Minor. Consider rephrasing to avoid introducing the EUR1000 figure, or leave as-is since it's a rhetorical point about what doesn't work.

---

## 11. "Build working agents without writing code" claim

### Potential contradiction with Claude Code tooling

**business-model-canvas.md** (line 86): "Build working agents without writing code."

**lecture-guardrails.md** (lines 310-316): Claude Code is the chosen tool. While it has GUI/web modes, Claude Code is fundamentally a code-generation tool. Participants using Claude Code will interact with code even if they don't write it themselves.

**content-strategy.md** (lines 101-103): "Claude Code, ChatGPT Codex, and their successors are fundamentally different. They are agents that build agents. The output of using a code-generating agent is not just a result -- it is more capability."

The phrase "without writing code" may need qualification. Participants may not write code from scratch, but they will direct a code-generating agent and interact with code artifacts.

**Files affected:** `/Users/anttitevanlinna/Projects/agents-102/strategy/business-model-canvas.md` (line 86).
**Fix:** Consider rephrasing to "Build working agents without needing to be a developer" or similar language that acknowledges the code-generating nature of the tool while maintaining the low-barrier message.

---

## Summary: Priority Order

| # | Severity | Issue | Primary file to fix |
|---|----------|-------|-------------------|
| 1 | Critical | training-outline.md still describes old 6-part structure | training-outline.md |
| 2 | Critical | Module 1 identity mismatch (profile agent vs. personal site + guardrails) | training-outline.md + lecture-guardrails.md internal |
| 3 | High | content-strategy.md still says "Three things" (missing Advise) | content-strategy.md |
| 4 | High | business-model-canvas.md still references n8n/Zapier as primary lab tools | business-model-canvas.md |
| 5 | Medium | Audience framing inconsistency ("non-coders" vs. "chat users") | business-model-canvas.md |
| 6 | Medium | Four pillars framework orphaned | training-outline.md |
| 7 | Medium | content-strategy.md storyline Act 4 references topics not in 8-module structure | content-strategy.md |
| 8 | Medium | Evals positioning differs across files | learning-goals.md |
| 9 | Low | Missing cross-references between content-strategy.md and lecture-guardrails.md | Both files |
| 10 | Low | EUR1000 figure in content-strategy.md | content-strategy.md |
| 11 | Low | "Without writing code" claim vs. Claude Code reality | business-model-canvas.md |
