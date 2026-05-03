# Boris Cherny — How the Builder of Claude Code Uses Claude Code

**Type:** Practitioner observation (Anthropic, Claude Code lead) | **Evidence:** L2 single-practitioner observation, corroborated by 5+ independent recaps
**Key sources:** Cherny's X.com threads (Jan–Apr 2026), Threads posts, Every/AI&I podcast transcript (Oct 2025, updated Mar 2026), Pragmatic Engineer write-up (Mar 2026), independent practitioner analyses (Rezvani, paddo.dev)

---

## Why this case

Cherny built Claude Code. His public output across the last 6 months is unusually coherent and load-bearing for what an "agentic engineering" curriculum should teach — the same six principles repeat across X threads, podcast appearances, and independent practitioner recaps. Treat this as a curriculum-shape observation, not as Anthropic-product evidence.

## The six emphases

### 1. Plan mode is the unlock — put energy into the plan, not the prompt

A solid plan lets Claude one-shot most implementations. "Not using plan mode enough" is one of the common mistakes he names; he frames the workflow as "start in plan mode, iterate on the plan, then let it one-shot."

- "Start every complex task in plan mode" — Cherny on X, Jan 2026 — https://x.com/bcherny/status/2017742741636321619
- Shipper on Cherny + Wu, *How to use Claude Code like the people who built it* (AI & I podcast, Oct 2025) — https://every.to/podcast/transcript-how-to-use-claude-code-like-the-people-who-built-it
- Gergely Orosz on Cherny, *Building Claude Code with Boris Cherny* (Pragmatic Engineer, Mar 2026) — https://newsletter.pragmaticengineer.com/p/building-claude-code-with-boris-cherny

### 2. Verification as the force multiplier

Give the model a way to check its own work — that feedback loop is worth a 2–3x quality jump and is his stated #1 principle. Chrome extension for frontend, bash and tests for backend. Stop hooks turn verification into determinism: "you can just make the model keep going until the thing is done."

- "Give Claude a way to verify its work. If Claude has that feedback loop, it will 2-3x the quality" — Cherny on X — https://x.com/bcherny/status/2017742741636321619
- Stop-hooks framing — AI & I transcript above

### 3. Parallel sessions across worktrees — the productivity unlock

Run 3–10 Claude sessions across git worktrees. The job shifts from deep focus to fast context switching.

- "Spin up 3-5 git worktrees at once… the single biggest productivity unlock, and the top tip from the team" — Cherny on X, Jan 2026 — https://x.com/bcherny/status/2017742743125299476
- "20–30 PRs a day" across 5 instances — Orosz on Cherny, Pragmatic Engineer

### 4. CLAUDE.md as compounding memory

Every correction becomes a rule. "After every correction, ask Claude to update CLAUDE.md so it doesn't make that mistake again." Frames it as "Compounding Engineering," explicitly crediting Dan Shipper.

- Cherny on X — https://x.com/bcherny/status/2017742741636321619
- Alireza Rezvani on Cherny, *Boris Cherny's Claude Code Tips Are Now a Skill* (Mar 2026) — https://alirezarezvani.medium.com/boris-chernys-claude-code-tips-are-now-a-skill-here-is-what-the-complete-collection-reveals-b410a942636b

### 5. Slash commands, Skills, and subagents — codify the inner loop

Anything you do many times a day becomes a slash command or Skill; map-reduce big jobs across subagents. The slash command is dual-use logic — humans and agents invoke the same tool.

- "Introducing two new Skills: /simplify and /batch… I have been using both daily" — Cherny on X — https://x.com/bcherny/status/2027534984534544489
- Subagent map-reduce for migrations — AI & I transcript

### 6. Delegation over pair-programming

Treat Claude like an engineer you're delegating to: write the full brief (goal, constraints, acceptance), pre-allow safe commands via `/permissions`, let auto mode run. Prefers pre-allow over `--dangerously-skip-permissions`.

- *paddo.dev* recap of Cherny's setup — [practitioner analysis] — https://paddo.dev/blog/how-boris-uses-claude-code/
- Cherny on Threads, "Increasingly, code is not the bottleneck" — [practitioner direct] — https://www.threads.com/@boris_cherny/post/DSxC5JZCKFs/

## What he downplays

- **MCP as central pedagogy.** Uses it (Slack, BigQuery, Sentry); doesn't evangelise it. Plumbing, not curriculum.
- **Exotic customisation.** "My setup might be surprisingly vanilla" — Cherny on Threads — https://www.threads.com/@boris_cherny/post/DTBVlMIkpcm/
- **Vector search / RAG / embeddings.** Agentic search (grep + read) beats embeddings for their use case — historical context: Cherny on the *Latent Space* podcast (May 2025, outside the 6-month freshness window; used here for stance only, his 2026 output has not contradicted it) — https://www.latent.space/p/claude-code
- **Formal eval frameworks for end users.** He talks about verification loops, not eval harnesses. Evals are Anthropic's internal problem; verification is the user's.
- **Smaller / cheaper models.** Opus with thinking for everything. Cost is "an ROI question, not a cost question."

## What's non-obvious in his teaching

- **The plan IS the product of the first session.** Most courses show prompt → code; Cherny shows prompt → plan → (new session) → code. The seam is pedagogical.
- **Correction → rule, same session.** The compounding move isn't "write good rules"; it's "when Claude gets it wrong, have Claude write the rule that prevents it." Forcing function, not discipline.
- **Classifier-gated auto mode over YOLO.** Pre-allowed commands + auto mode is the default; `--dangerously-skip-permissions` is a teaching antipattern.
- **Finish the migration.** Partial migrations confuse both humans and models. Almost nobody teaches this.

## Limitations

- Anthropic-internal vantage point — his stack assumptions (Opus everywhere, vanilla setup, terminal-first) reflect a team that builds the product. Survivorship-bias risk on the "vanilla is enough" claim.
- Single-practitioner observation; convergence comes from independent recaps of his output, not from independent practitioners doing the same thing. Pairs with the Klaassen observation (`kieran-klaassen.md`) and the Every Inc case (`every-inc.md`) for the convergence read.

---

<!-- maintainer -->

**Last updated:** 2026-05-03

**Source verification — MUST DO before first cohort:**

1. Open every URL above against the original. Two specifically need re-checking:
   - The "treat Claude like an engineer you're delegating to" framing is recapped in *paddo.dev* and the *howborisusesclaudecode.com* fan site, but the primary-quote audio on Lenny's podcast is **paywalled** — could not verify against the original. **[UNVERIFIED]** — flagged for first-cohort verification or reframe as "practitioners summarise his stance as…" without single-quote attribution.
   - The *howborisusesclaudecode.com* site is a fan-built archive by [@CarolinaCherry](https://github.com/carolinacherry), explicitly "not affiliated with Anthropic" and "sourced directly from Boris's posts." Per the byline-check rule: cite Cherny's underlying X/Threads posts directly when load-bearing; treat the archive site as a navigational aid, not a primary source. Removed from the citation chain in this file.
   - The *finalroundai.com* article on the "software engineer title will go away" claim is a journalist's recap referencing Y Combinator's *Lightcone* podcast (not Lenny's, despite the Lenny preview heading on the Final Round piece). Author byline absent. Treat as **[UNVERIFIED]** until the original Y Combinator clip is opened — alternative: cite Cherny's Threads post on "code is not the bottleneck" as the load-bearing claim, since that one is practitioner-direct.

2. Latent Space podcast (May 2025) is **outside the 6-month freshness window**. Used in this file as historical stance context only, explicitly dated. Do not cite as current evidence. If the embeddings-vs-agentic-search claim is load-bearing for a module, find a 2026 restatement before shipping.

3. Numbers to triple-check at delivery: "2–3x quality" (Cherny's own claim, single source); "20–30 PRs a day" (Orosz on Cherny, single secondary source); "single biggest productivity unlock" (Cherny's own framing on X — opinion, label as such).

**Provenance — source-type labels:**

- Cherny's X.com threads, Threads posts — [practitioner direct]
- AI & I transcript (Dan Shipper interviewing Cherny + Cat Wu) — [domain trade publication]; attribute as "Shipper on Cherny + Wu" per byline-check rule
- Pragmatic Engineer (Orosz interviewing Cherny) — [practitioner analysis], attribute as "Orosz on Cherny"
- Rezvani Medium post — [practitioner analysis], attribute as "Rezvani on Cherny"
- paddo.dev — [practitioner analysis], attribute as "paddo on Cherny"
- howborisusesclaudecode.com — fan-built archive; **not cited as primary** in body
- finalroundai.com — author byline absent; **[UNVERIFIED]**, removed from primary citations
- Latent Space (May 2025) — [practitioner direct] but outside 6-month window; historical context only
- Lenny's Newsletter — paywalled; **[UNVERIFIED contents]**

**Companion files:** `every-inc.md` (Klaassen / compound engineering at Every — the company shape), `kieran-klaassen.md` (Klaassen practitioner observation).
