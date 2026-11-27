# Getting Going

## Big Idea
Context is how you paint by LLM. What you give the agent shapes what comes back, and you can go very deep with it: your profile, your rules, your judgement on the result.

## Prework

Set up your agent runtime. Build a snake game as HTML. Connect your calendar (M365 / Google Workspace / screenshot fallback) and save a 5-line summary of this week's meetings. Read [LLM vs chat](trainings/agents-101/supplementary/what-is-an-agent.md#llm-vs-chat).

## What You'll Learn

After this module, you will be able to:

- **Engineer** context
- **Write** rules for an agent
- **Judge** agent output

## Start here

Start a fresh session or task at `~/Documents/agents-101/`.

**The question, to you:** where did LLM output on your work come out generic, and what made it yours?

Keep that question in mind. Read the opening, Context is King, then do the exercise, Paint by agent with guardrails.

[Opening: Context is King](lectures/context-is-king.md)

[Exercise: Paint by agent with guardrails](exercises/personal-site-with-guardrails.md)

[Closing: Iterate and learn](lectures/what-just-happened.md)

## Debrief

Five minutes. The agent reviews `module-1/personal-brand-generation.md` against the session and `module-1/context-trace.md`: what worked, what fell flat, what to keep, what to drop.

Ask the agent to review your rules file.

{{prompt:a101-m1-debrief-rules-retro}}

The agent updates the file and summarises the changes. Expect the generation rules to change a lot.

## Push back on what the retro missed

The LLM is generous to a rules file it just helped write. Push back on anything that doesn't match your sense of the work.

Each round the agent turns the work into sharper rules and drops what the work disproved: do the work → capture → reflect → sharpen. Repeat on every rules file.

## Get a cold read

**Then get a cold read.** Ask the agent to start a second, independent agent that sees only the site.

{{prompt:a101-m1-debrief-cold-critic}}

Where the critic calls a part generic, your context is thin there. Add one sharp detail and regenerate the site. Where the critic's *"uniquely you"* pick matches your own view, that part works. When you and the critic disagree, your view counts more.

## Key Concepts
- Context is the brush: what you give the agent shapes the output.
- Output got specific because the context did.
- Guardrails are context you can reuse.
- Your domain expertise is the test.

## Bring to Module 2

One live challenge: a decision you're making, a bet you're placing, or work whose direction is still unclear. Having it in mind is enough. Module 2 opens by pinning it down with the agent.

## Pre-reads before Module 2

Optional: Karpathy's LLM Wiki post; Lindenberg's memory-architecture piece.

[Module 2 prework](lectures/module-2-prework.md)

End this session. Module 2 starts fresh at `~/Documents/agents-101/`.

## Next
Your rules file already carries what you learned into the next session. Module 2 grows that into a memory for one real challenge.

<!-- maintainer -->

**Quality:** compendium-audited 2026-11-26 (writing@cf4fd816 story@78d17fc9 technical@78d17fc9 behavior@78d17fc9 pedagogy@78d17fc9 strategy@78d17fc9 slides@cf4fd816)
- judges @cf4fd816: writing PASS (2 findings see instances/agents-101--module--getting-going.writing.json), story PASS, technical PASS (verify-refuted), behavior PASS, pedagogy PASS, strategy PASS, slides PASS
- cross_module @12bf0d81: PASS — set=[prework,getting-going,building-agent-systems,multi-agent-systems,security,output-quality,evaluations,personal-to-team,agents-building-agents]
- cross_module @42b9610a: PASS — set=[prework,getting-going,building-agent-systems,multi-agent-systems,security,output-quality,evaluations,agents-building-agents-solo]; 7 pairs, 0 blocking; see instances/agents-101--module-set--agents-101-open-edition.cross_module.json

**Red thread (2026-11-13, Antti).** "It is not to add sentences. It is to align on common theme. Say it in different ways without adding more content." Added openers, four-ideas slides and own-agent callouts were tried and removed the same evening. Align existing lines; add none.

**Big Idea back to the strategy line (2026-11-13, Antti: "M1 is really context and painting with LLM").** The page had drifted to guardrails; Big Idea, the Apply LO and Key Concepts now lead with context as the brush, guardrails as reusable context. Big Idea stated cold 54 -> 63 (n=12, inside noise, direction right).

**Key Concepts minimal (2026-09-24, Antti-directed).** A glance list of handles, nothing born here: every law on it is earned in the lecture that follows the exercise, `context-is-king.md` and `what-just-happened.md`.

**Story blend, M1 (2026-09-23).** § Start here carries no thesis line for the module: the demo runs, the exercise lands it, and `what-just-happened.md` names it at the close. Per `module-design/a101-story-proposals/blend.md` § Titles, M1. The Big Idea is the canonical section and holds the claim; do not restore a second statement of it above the lecture link.

**Mood target:** Joyful creation — the student leaves with something recognizably theirs, not a technical warm-up.

**Push-back moves / Watch-fors / Decision points:** [M1 run sheet](trainer-modules.md#m1-glance) owns the live cues, recovery paths, protected beats, and cut order.

**Meta (trainer):**
- **Transitions:** opening 10 @start "Opening: how we work in this room" · debrief 5 @end "Debrief: retro + cold read" · bridge 3 @end "Bridge"
- **Where these numbers come from:** opening is an estimate (AE101 M1 prices its room-agreement opening at 10); debrief from the body ("Five minutes."). Every beat here has no file of its own, so nothing else prices it.
- **Charge:** module-2-prework 0 — the page is inlined here so students find it at the close, but it is read between sittings and costs no room time.
- **Primary Bloom's level:** Apply
- **Prework time:** about 30–60 minutes before Module 1.
- **Materials (trainer):** none — the exercise is vanilla Claude Code + the student's own LinkedIn. The Debrief sharpens `module-1/personal-brand-generation.md`; Module 1 deliberately creates no `CLAUDE.md`.
- **Plug points:** participant's own LinkedIn profile — no org data needed yet

**Artefact contracts**
| Artefact | Stable identifier | Produced by | Consumed by |
|---|---|---|---|
| Module 1 working folder | `module-1/` | M1 exercise writes visible outputs | M1 Debrief only; M2 deliberately starts its wider system at the training root |
| Module 1 personal site | `module-1/site.html` | M1 guardrailed generation exercise | M1 cold-critic read only |
| Module 1 generation rules | `module-1/personal-brand-generation.md` | M1 exercise close and Debrief rewrite | M1 retro only; it stays scoped to `module-1/` and is not an M2 input |

**Plug Points (trainer):**
- **The trainer's CLAUDE.md** has a default (differentiation / storytelling / framing). Variant: orgs with a brand guide can substitute. Default works on its own.

**Sponsor opening note (trainer):**
- In-room only. If the sponsor is present as a participant, they may open with one sentence in their own words: why they are learning alongside the cohort and what they do not yet know. No corporate kickoff, no agenda. Keep it before screen-share or as a spoken room move, not student-facing curriculum text.
