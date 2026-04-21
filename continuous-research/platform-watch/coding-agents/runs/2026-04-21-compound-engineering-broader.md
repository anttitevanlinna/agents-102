# Compound engineering — broader than Klaassen — OODA 2026-04-21

Scope: is "compound engineering" a genuinely shared practice, or still an Every-house idiom with outward-bound reach?

## Practitioners using the concept beyond Every

- **Will Larson (Imprint CTO)** — *Learning from Every's Compound Engineering*, 2026-01-19. Calls it "two extremely well-known patterns, one moderately well-known pattern, and one pattern many practitioners have intuited but not found a consistent mechanism to implement." Frames it as "a cheap, useful experiment you can implement in an hour." Adopted the plugin; describes the Compound step as the load-bearing novel piece. https://lethain.com/everyinc-compound-engineering/ [practitioner direct]
- **Aniket Panjwani** — *A Practitioner's Guide to Compound Engineering*, 2026-02-03. Reports daily use of the plugin and claims to have taught "dozens of agentic coding newcomers." Not Every-affiliated. [practitioner direct — title cited via search summary, SOURCE NEEDED for direct URL]
- **Ryan Spletzer** — *A Tale of Acceleration and Compound Engineering*, 2026-02. Independent engineer recounting adoption. https://www.spletzer.com/2026/02/a-tale-of-acceleration-and-compound-engineering/ [practitioner direct]
- **Vinci Rufus** — calls compound engineering "the next paradigm shift in software engineering." https://www.vincirufus.com/en/posts/compound-engineering/ [practitioner direct — opinion/Level 1]
- **Soumitra Shukla** — on X, 2026: "compound engineering plugin is basically my go-to plan mode in CC now." https://x.com/soumitrashukla9/status/2019108862767558779 [practitioner direct — single experiment]
- **snarktank/compound-product** — GitHub, 2026-01-22. Explicitly fuses Klaassen's compound engineering + Geoffrey Huntley's Ralph pattern + Ryan Carson's implementation. https://github.com/snarktank/compound-product [practitioner direct]
- **JP Caparas** — *Claude Code: The Proven Plan → Work → Review → Compound Method*, Dev Genius. https://blog.devgenius.io/claude-code-the-proven-plan-work-review-compound-method-cbf07c24ae85 [practitioner direct]

Roughly 7–10 named independent practitioners writing about the term under its own name. That's Level 2 bordering Level 3 convergence — **on the specific four-step framing**.

## Alternative framings for the same idea

Same concept, different labels, appearing independently:

- **Self-improving CLAUDE.md files** — Martin Alderson. https://martinalderson.com/posts/self-improving-claude-md-files/ [practitioner direct]
- **Self-Improving Agent skill** — uses a dedicated `.learnings/` directory. https://mcpmarket.com/tools/skills/self-improving-agent [practitioner direct]
- **learnings.md pattern** — MindStudio write-up, dated structured notes appended after each run. https://www.mindstudio.ai/blog/self-learning-claude-code-skill-learnings-md [practitioner analysis]
- **Recursive Self-Improvement** — David R Oliver, Medium 2026-03. https://medium.com/@davidroliver/recursive-self-improvement-building-a-self-improving-agent-with-claude-code-d2d2ae941282 [practitioner direct]
- **Self-Improving Agentic System with Claude** — Product Compass PM, full system writeup. https://www.productcompass.pm/p/self-improving-claude-system [practitioner analysis]
- **Ralph pattern** — Geoffrey Huntley, predates compound engineering, now being fused with it.

Broader than the Every-house term: the idea that *the agent writes files that make the next session better* is Level 3 convergence. Many independent people arrived at it without adopting the "compound engineering" label.

## Cross-tool-stack convergence

- **Official plugin now ports to** Codex, Cursor, Windsurf, Gemini CLI, GitHub Copilot, Factory Droid, Pi, Kiro CLI, Qwen Code, OpenCode (per Every's CLI converter). https://github.com/EveryInc/compound-engineering-plugin
- **Cursor — Bugbot self-improvement**, 2026. Independent of Every. Went from 52% → ~80% resolution rate by learning rules from PR-feedback reactions; promotes rules that accumulate positive signal, disables ones that stop being useful. https://cursor.com/blog/bugbot-learning [vendor press release — Level 0 for claim, but confirms the mechanism ships]
- **Cursor 2.4** introduced a Skills Marketplace; "project knowledge still resets every session" critique surfaced. https://memu.pro/blog/cursor-2-4-subagents-skills-memory [tech press]
- **Sashido** — *Supercharge Your Codebase: Automate Cursor Rules* (self-improving rules via `self-improvement.mdc`). https://www.sashido.io/en/blog/cursor-self-improving-rules [practitioner direct]

Cross-stack: the mechanism (learned rules, structured memory files) is genuinely converging — the *term* "compound engineering" is mostly still following the plugin.

## Counter-evidence / critique

Searched Hacker News threads on "Compound Engineering" (46948269, 46484548, 46237139, 47027193) and actively sought "overhyped / packaging / just prompting" takes.

- **Larson himself is the closest thing to polite critique**: 3 of 4 patterns are "extremely well-known" or "moderately well-known." Translation: the novelty-to-packaging ratio is maybe 25%. That is a measured take, not a takedown. https://lethain.com/everyinc-compound-engineering/
- **"Context Engineering Is Solved. Compound Engineering Is Next"** HN thread title — suggests some commenters view it as the next hype cycle in a sequence (prompt → context → compound). [SOURCE NEEDED for comment-level quotes — HN comment bodies not retrieved]
- **No hard takedown found.** No "this is vendor packaging," no "only works for toy tasks," no "the Compound step produces noise that degrades future runs." The skeptic literature is thin — either it genuinely works for people using it, or the backlash wave hasn't arrived yet. Hold this loose: absence of critique at 4 months is suspicious.

## Academic / structured lineage

Convergent academic work in the same 6-month window — not citing Klaassen but solving the same problem:

- *Memory in the Age of AI Agents: A Survey*, arXiv 2512.13564, 2026. [academic/research]
- *MemRL: Self-Evolving Agents via Runtime Reinforcement Learning on Episodic Memory*, 2026-01. [academic/research]
- *Learning Hierarchical Procedural Memory for LLM Agents through Bayesian Selection and Contrastive Refinement* (MACLA), arXiv 2512.18950. [academic/research]
- *From Experience to Strategy: Empowering LLM Agents with Trainable Graph Memory*, arXiv 2511.07800. [academic/research]

Academic frame: factual / experiential / working memory taxonomy. Compound engineering is the file-based folk version of "experiential memory with human-readable procedural storage." Practitioners implemented the cheap version before the field formalised it — familiar pattern.

## Convergence level assessment

- **"Compound engineering" as a term:** Level 2 → early Level 3. ~10 named non-Every practitioners in 4 months. Still travelling outward from Every but genuine third-party adoption exists (Larson, Panjwani, Spletzer, snarktank fusion project).
- **The underlying concept (agent writes files that make next session better):** Level 3 convergence. Multiple independent naming — self-improving CLAUDE.md, learnings.md, Ralph pattern, Bugbot learned rules, academic experiential-memory work. Different people, different stacks, same mechanism.
- **Verdict:** The *concept* is a genuinely shared practice. The *term* is still Every-house-with-diaspora. The plugin is the distribution vehicle; the idea predates and exceeds it.

## What I looked for but didn't find

- A clear sceptic post calling it packaging or overhyped. Absence is notable.
- Nordic practitioners using either the term or the concept by name — nothing surfaced in this OODA.
- Evidence on whether the Compound step *degrades* over time (noise accumulation, contradictory rules). Nobody is publishing on the failure mode yet.
- Enterprise-team reports (the credibility signal). Still mostly solo builders and small-team CTOs (Imprint).
