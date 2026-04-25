# Blind OODA — Boris Cherny's 6-Module Agentic Coding Curriculum (as of 2026-04-24)

## Method
Searched for Cherny's public output in the last 6 months: three X threads (Jan/Feb 2026 "tips from the team"), Threads post announcing Claude Code's origin, Lenny's Podcast appearance (2026), Every/AI&I podcast with Cat Wu, Latent Space podcast, Pragmatic Engineer (Orosz) interview March 2026, howborisusesclaudecode.com, and practitioner analyses (Ernest Chiang, Reza Rezvani, paddo.dev, vlad.build). Paywalls blocked two sources (Lenny full transcript, anup.io tips list); I cross-triangulated across the analyses. Confidence: medium-high on what he emphasizes (multiple independent practitioner recaps converge); lower on ordering/weighting.

## The 6 Modules (my read of what Boris would teach)

### M1: Plan Mode and the Brief
**Big idea:** Put your energy into the plan, not the prompt — a solid plan lets Claude one-shot most implementations and "2-3x success rates."
**Evidence he'd prioritize this:**
- "Not using plan mode enough" is one of the "really common mistakes" he names on the Every/AI&I podcast — [practitioner direct] https://every.to/podcast/transcript-how-to-use-claude-code-like-the-people-who-built-it
- "Start every complex task in plan mode" — X thread, Jan 2026 — [practitioner direct] https://x.com/bcherny/status/2017742741636321619
- On Pragmatic Engineer he frames it as "start in plan mode, iterate on the plan, then let it one-shot" — [practitioner analysis] https://newsletter.pragmaticengineer.com/p/building-claude-code-with-boris-cherny

### M2: Verification as the Force Multiplier
**Big idea:** Give Claude a way to check its own work — that feedback loop is worth a 2-3x quality jump, and it's his stated #1 principle.
**Evidence he'd prioritize this:**
- "Give Claude a way to verify its work. If Claude has that feedback loop, it will 2-3x the quality" — X thread — [practitioner direct] https://x.com/bcherny/status/2017742741636321619
- Chrome extension for frontend, bash/tests for backend — howborisusesclaudecode.com — [practitioner direct — vendor-hosted; ambiguity: site is Boris-authored marketing] https://howborisusesclaudecode.com/
- Stop hooks as determinism: "you can just make the model keep going until the thing is done" — [practitioner direct] https://every.to/podcast/transcript-how-to-use-claude-code-like-the-people-who-built-it

### M3: Parallel Sessions and Context Switching
**Big idea:** Run 5-10 Claude sessions across git worktrees/checkouts — the job shifts from deep focus to fast context switching, "the single biggest productivity unlock."
**Evidence he'd prioritize this:**
- "Spin up 3-5 git worktrees at once ... the single biggest productivity unlock, and the top tip from the team" — X, Jan 2026 — [practitioner direct] https://x.com/bcherny/status/2017742743125299476
- "20-30 PRs a day" across 5 instances, Pragmatic Engineer — [practitioner analysis] https://newsletter.pragmaticengineer.com/p/building-claude-code-with-boris-cherny
- Role shifted to "how good I am at context switching" — same — [practitioner analysis]

### M4: CLAUDE.md as Compounding Memory
**Big idea:** Every correction becomes a rule — CLAUDE.md is institutional memory checked into git, and each session gets smarter because the team teaches it once.
**Evidence he'd prioritize this:**
- "After every correction, ask Claude to update CLAUDE.md so it doesn't make that mistake again" — X thread — [practitioner direct] https://x.com/bcherny/status/2017742741636321619
- Frames it as "Compounding Engineering" (crediting Shipper) — practitioner recap of his Lenny episode — [practitioner analysis] https://alirezarezvani.medium.com/boris-chernys-claude-code-tips-are-now-a-skill-here-is-what-the-complete-collection-reveals-b410a942636b
- "Human spots issue, Claude updates the rules, future Claude sessions avoid the issue entirely" — same source — [practitioner analysis]

### M5: Slash Commands, Skills, and Subagents — Codifying the Inner Loop
**Big idea:** Anything you do many times a day becomes a slash command or Skill; map-reduce big jobs across subagents. Share the logic so humans and agents use the same tool.
**Evidence he'd prioritize this:**
- `/commit-push-pr` "runs dozens of times daily" — howborisusesclaudecode.com — [practitioner direct — vendor-hosted] https://howborisusesclaudecode.com/
- "Introducing two new Skills: /simplify and /batch ... I have been using both daily" — X, 2026 — [practitioner direct] https://x.com/bcherny/status/2027534984534544489
- Subagent map-reduce for migrations: "main agent makes a big to-do list ... map reduces over a bunch of subagents" — [practitioner direct] https://every.to/podcast/transcript-how-to-use-claude-code-like-the-people-who-built-it
- On slash commands as dual-use: "we get to share this logic ... both get to use it" — same — [practitioner direct]

### M6: Delegation, Permissions, and the Builder Mindset
**Big idea:** Treat Claude like an engineer you're delegating to, not a pair-programming buddy — write the full brief (goal, constraints, acceptance), pre-allow safe commands, and let auto mode run. The "software engineer" title is being replaced by "builder."
**Evidence he'd prioritize this:**
- With Opus 4.7 he shifted from step-by-step to full task briefs, treating Claude "like an engineer you're delegating to" — howborisusesclaudecode.com recap — [practitioner direct — vendor-hosted] https://howborisusesclaudecode.com/
- Prefers `/permissions` pre-allow over `--dangerously-skip-permissions` — paddo.dev summary of his setup — [practitioner analysis] https://paddo.dev/blog/how-boris-uses-claude-code/
- "Software engineer title will go away ... everyone will be a PM and everyone will write code" — Finalround recap of Lenny — [practitioner analysis] https://www.finalroundai.com/blog/software-engineer-title-go-away
- Threads: "Increasingly, code is not the bottleneck" — [practitioner direct] https://www.threads.com/@boris_cherny/post/DSxC5JZCKFs/

## What he'd DOWNPLAY or leave out
- **MCP as central curriculum.** He uses MCP (Slack, BigQuery, Sentry checked into config) but doesn't evangelise it as the unlock. It's plumbing, not pedagogy.
- **Exotic customization.** "My setup might be surprisingly vanilla ... I personally don't customize it much" — [practitioner direct] Threads https://www.threads.com/@boris_cherny/post/DTBVlMIkpcm/
- **Vector search / RAG / embeddings.** Latent Space: agentic search (grep + read) beats embeddings for their use case — [practitioner direct] https://www.latent.space/p/claude-code
- **Formal eval frameworks for end users.** He talks about verification loops (tests, browser, hooks) — not about shipping eval harnesses. Evals are Anthropic's internal problem; verification is the user's.
- **Multi-agent orchestration as a separate discipline.** Subagents exist inside Claude Code's map-reduce; he doesn't teach "deliberation panels" or cross-agent protocols as first-class material.
- **Smaller/cheaper models.** Opus with thinking for everything. Cost is "an ROI question, not a cost question." Scripting for Haiku is "not the top priority."

## What he'd teach that's non-obvious
- **Finish the migration.** Partial migrations confuse both humans and models; plan for completion before starting. Almost nobody teaches this as an agentic-coding rule; he does.
- **Slash command = shared tool.** The slash command isn't a shortcut — it's a piece of logic humans and agents both invoke. Dual-use is the point.
- **The plan IS the product of the first session.** Most courses show prompt → code. Boris shows prompt → plan → (new session) → code. The seam is pedagogical.
- **Classifier-gated auto mode over YOLO.** "Dangerously skip permissions" is a teaching antipattern; pre-allowed commands + auto mode's classifier is the default.
- **Correction → rule, same session.** The compounding move isn't "write good rules"; it's "when Claude gets it wrong, have Claude write the rule that prevents it next time." Forcing function, not discipline.

## Sources
- https://x.com/bcherny/status/2017742741636321619 [practitioner direct]
- https://x.com/bcherny/status/2017742743125299476 [practitioner direct]
- https://x.com/bcherny/status/2007179832300581177 [practitioner direct]
- https://x.com/bcherny/status/2027534984534544489 [practitioner direct]
- https://www.threads.com/@boris_cherny/post/DSxC5JZCKFs/ [practitioner direct]
- https://www.threads.com/@boris_cherny/post/DTBVlMIkpcm/ [practitioner direct]
- https://howborisusesclaudecode.com/ [practitioner direct — vendor-hosted; Boris-authored marketing site, ambiguous]
- https://every.to/podcast/transcript-how-to-use-claude-code-like-the-people-who-built-it [practitioner direct — podcast transcript]
- https://www.latent.space/p/claude-code [practitioner direct — podcast, May 2025, borderline freshness]
- https://newsletter.pragmaticengineer.com/p/building-claude-code-with-boris-cherny [practitioner analysis — March 2026]
- https://alirezarezvani.medium.com/boris-chernys-claude-code-tips-are-now-a-skill-here-is-what-the-complete-collection-reveals-b410a942636b [practitioner analysis — March 2026]
- https://paddo.dev/blog/how-boris-uses-claude-code/ [practitioner analysis]
- https://www.finalroundai.com/blog/software-engineer-title-go-away [general press — bare fact about his Lenny claim]
- https://www.lennysnewsletter.com/p/head-of-claude-code-what-happens [practitioner direct — paywalled, could not verify contents]

## Confidence
- **L3 (convergence across independent recaps):** Plan mode, verification, parallel sessions/worktrees, CLAUDE.md/compounding, slash commands, vanilla-setup stance. Multiple practitioner recaps + his own X threads all say the same thing.
- **L2 (single source, his own):** Subagent map-reduce for migrations (Every transcript only); Skills-as-tips (X thread only); "finish the migration" rule (Pragmatic Engineer only).
- **L1 inference from his stance:** M6 "builder mindset" framing — he says "code is not the bottleneck" and "title will go away" but hasn't packaged it as curriculum; it's inferred as the closing module.
- **Downplay claims** (MCP-as-plumbing, no formal evals, Opus-for-everything, no RAG) are drawn from absence-of-emphasis across 8+ sources plus explicit Latent Space statements — medium confidence but defensible.
- **[SOURCE NEEDED]:** direct verbatim on "treat Claude like an engineer you're delegating to" — sourced only from paddo.dev and howborisusesclaudecode.com recaps, not a primary quote I could verify against original audio.
- **Freshness caveat:** Latent Space is May 2025 (just outside strict 6-month window); used as historical context for his stance on embeddings/agentic search, which his 2026 output has not contradicted.
