# Opus 4.7 for long-running tasks — OODA findings 2026-04-21

Released 2026-04-16. All sources below freshness-checked; most are <1 week old.

## What changed vs 4.6 (with source URLs)

**Task budgets + running countdown.** The model sees a token budget covering thinking, tool calls, results and final output, and paces the run against it — prioritising work and closing the task gracefully as budget runs down. Three effort levels (standard / high / maximum).
- https://platform.claude.com/docs/en/about-claude/models/whats-new-claude-4-7 [vendor press release — bare fact only]
- https://claude.com/blog/best-practices-for-using-claude-opus-4-7-with-claude-code [vendor press release — bare fact]

**File-system memory improved.** Better at writing, reading and reusing scratchpad / notes files across sessions. Anthropic frames this as "removes the need to re-establish context at the start of every run." Bare fact of the claim; performance needs independent verification.
- https://platform.claude.com/docs/en/about-claude/models/whats-new-claude-4-7 [vendor press release]

**Fewer LLM calls per completed workflow (single independent vendor — Box).** Box's internal agent benchmark: Opus 4.7 averaged 7.1 LLM calls vs 16.3 on 4.6 for the same work; median 282 AI Units vs 401 (~30% reduction). Single source, labelled Level 2.
- https://blog.box.com/claude-opus-47-delivers-powerful-performance-higher-efficiency-vs-opus-46 [vendor case study — third-party infra vendor, treat as Level 2 single experiment]

**Loop-resistance.** Genspark reports 4.6 looped indefinitely on ~1 in 18 queries in their Super Agent benchmark; 4.7 substantially reduces that. Numbers not independently reproduced.
- Reported via https://www.verdent.ai/guides/claude-opus-4-7-vs-4-6-coding-agents [tech press — bare fact of the vendor's claim]

**Tokenizer change costs ~1.0–1.35× more tokens.** Same $5/$25 pricing, but Willison measured 1.46× on his own content. Net: 4.7 is ~40% more expensive per equivalent input.
- https://fedi.simonwillison.net/@simon/116434305816558128 [practitioner direct]

## Practitioner-reported multi-hour runs

**Devin team — "works coherently for hours."** Cognition/Devin quoted as saying the model only shows this behaviour when you stop interrupting mid-flow. Relevant for M3 hand-off-and-walk-away teaching but sourced via secondary reporting, not a Devin blog post.
- Secondary: https://www.anthropic.com/news/claude-opus-4-7 [vendor press release — Devin quote is Level 1 opinion]

**~8-hour autonomous field test (DEV community post, "kai_outputs").** Multi-hour task, no hand-holding. Author credentials unverified — treat as Level 2 single case, not convergence.
- https://dev.to/kai_outputs/claude-opus-47-field-report-eight-hours-of-autonomous-work-10e3 [practitioner direct — but unknown practitioner]

**Gabriel Anhaia — 6-hour session review.** WebFetch blocked in this cycle; couldn't verify substance. Flagging as [NEEDS VERIFICATION].
- https://dev.to/gabrielanhaia/claude-opus-47-just-dropped-i-tested-it-for-6-hours-straight-heres-what-changed-3k50 [practitioner direct — unverified]

**Ronacher: no 4.7 long-run report yet.** He's on Claude Code Max but uses Sonnet, not Opus, for agentic work — so he is counter-signal on Opus being the right default.
- https://lucumr.pocoo.org/2025/06/12/agentic-coding/ [practitioner direct]

**Not found:** substantive Simon Willison long-run review of 4.7 (only tokenizer + system-prompt diffs); no Boris Cherny, Karpathy, Intercom, or Ramp post-release public write-up on 4.7 as of 2026-04-21.

## Failure modes still present in 4.7

**Arguing / circular loops.** Developer reports within 24h of release: the model re-argues the same point after correction. Specific and consistent enough to point at a post-training change, not noise.
- https://www.abhs.in/blog/claude-opus-47-developer-backlash-legendarily-bad-arguing-april-2026 [tech press — bare fact of complaints]

**Hallucinated commit hashes.** Reported pattern: "gaslighted me with a real-looking commit hash." Important for M3 because git is a common agent tool.
- Same URL above [tech press — bare fact]

**Lower one-shot rate on routine coding.** 3-day side-by-side (single practitioner, HN): 4.7 ~74.5% one-shot vs 4.6 ~83.8%; retries per edit ~2×. 4.7 wins on multi-hour coherence but loses on quick single-shot edits. Counter-evidence that "newer = better everywhere" is wrong.
- https://news.ycombinator.com/item?id=47825673 [practitioner direct — single case]

**Zombie-stat watch:** "77 hallucinations per session," "1 in 18 loop rate" — both round-ish numbers circulating from single benchmarks. Mark [UNVERIFIED STAT] until original methodology surfaces.

## What I looked for but didn't find

- No convergence-level (10–20 independent practitioners) multi-hour Opus 4.7 report — release is 5 days old, Level 3 evidence will not exist yet. Honest answer: too early.
- No Intercom / Ramp / Anthropic-customer engineering blog post on 4.7 in production.
- No independent reproduction of Box's 7.1-vs-16.3 call count.
- No public number on tool-calls-before-drift for 4.7 specifically.
- WebFetch was blocked this cycle; two practitioner posts (Anhaia 6h, Huryn ProductCompass guide) remain unverified.

## Curriculum implications for M3

1. **Teach task budgets as a first-class tool.** New in 4.7, practitioner-facing, names the exact thing M3 is about (giving the agent a time/cost envelope and walking away). Don't teach "wait and see" — teach "set a budget."
2. **Teach file-system memory as the hand-off contract.** Agent writes notes, student reads notes, agent reads back its own notes next session. The mechanism 4.7 specifically got better at. Aligns with existing file-based-agentic-RAG teaching.
3. **Build the argue-loop failure mode into the exercise.** Students will see it in the wild within the first hour. Pre-teach: when the agent re-argues after correction, that's the failure mode, not your fault. Name it → students recognise it → students recover.
4. **Don't cite hours-sustained numbers yet.** "8 hours" and "works coherently for hours" are single-case or vendor quotes. Cite mechanism (budgets, memory, progress updates), not duration. Revisit in 4–6 weeks when convergence exists.
5. **Opus 4.7 is not automatically the right default.** Ronacher prefers Sonnet for agentic coding; 4.7 has a lower one-shot rate on quick edits. M3 should teach model choice as a decision, not a given.
