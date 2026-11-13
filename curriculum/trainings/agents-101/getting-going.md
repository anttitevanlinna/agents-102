# Getting Going

## Big Idea
Context is how you paint by LLM. What you give the agent shapes what comes back, and you can go very deep with it: your profile, your rules, your judgement on the result.

## Prework

Set up your agent runtime. Build a snake game as HTML. Connect your calendar (M365 / Google Workspace / screenshot fallback) and save a 5-line summary of this week's meetings. Read [LLM vs chat](trainings/agents-101/supplementary/what-is-an-agent.md#llm-vs-chat).

## What You'll Learn
You can:
- **Generate** an HTML one-pager
- **Apply** context in layers and compare outputs
- **Evaluate** output against your domain knowledge
- **Package** guardrails as reusable rules

## Start here

Outputs go in `module-1/`.

**The question, to you:** where did LLM output on your work come out generic, and what made it yours?

[Opening: Context is King](lectures/context-is-king.md)

[Exercise: Paint by agent with guardrails](exercises/personal-site-with-guardrails.md)

[Closing: Iterate and learn](lectures/what-just-happened.md)

## Debrief

Five minutes. The retro is a second pass on `module-1/personal-brand-generation.md`: the agent reads the file against the session for what worked, what fell flat, what to keep, what to drop.

Ask the agent to retro your rules file.

{{prompt:a101-m1-debrief-rules-retro}}

The agent updates the file and summarises the changes. Expect the generation rules to change a lot.

## Push back on what the retro missed

The LLM is generous to a rules file it just helped write. Push back on anything that doesn't match your sense of the work.

Each round the agent turns the work into sharper rules and drops what the work disproved: do the work → capture → reflect → sharpen. Repeat on every rules file.

## Get a cold read

**Then, use a cold critic.** Ask the agent to open a second, independent reader with only the site as context.

{{prompt:a101-m1-debrief-cold-critic}}

Where the critic sees generic, your context is thin: add one sharp detail, then regenerate the site. Where its *"uniquely you"* pick matches your own read, you're on solid ground. Your read outweighs the agent's.

## Key Concepts
- Context is the brush: what you give the agent shapes the output.
- Output got specific because the context did.
- Guardrails are context the agent reuses on the next run.
- Your domain expertise is the test.

## Bring to Module 2

Bring a live challenge and working access to Confluence and OneDrive. Complete the linked Module 2 prework before you come.

## Pre-reads before Module 2

Optional: Karpathy's LLM Wiki post; Lindenberg's memory-architecture piece.

[Module 2 prework](lectures/module-2-prework.md)

Save the prework, end this session, then start Module 2 fresh at `~/Documents/agents-101/`.

## Next
The agent re-reads the output file next time.

<!-- maintainer -->

**Red thread (2026-11-13, Antti).** "It is not to add sentences. It is to align on common theme. Say it in different ways without adding more content." Added openers, four-ideas slides and own-agent callouts were tried and removed the same evening. Align existing lines; add none.

**Big Idea back to the strategy line (2026-11-13, Antti: "M1 is really context and painting with LLM").** The page had drifted to guardrails; Big Idea, the Apply LO and Key Concepts now lead with context as the brush, guardrails as reusable context. Big Idea stated cold 54 -> 63 (n=12, inside noise, direction right).

**Quality:** compendium-audited 2026-08-25 (writing@19381896 story@5755beb6 technical@725101ec behavior@725101ec pedagogy@725101ec strategy@194c81b0 slides@19381896)
- judges @19381896: writing PASS, story PASS, technical PASS, behavior PASS, pedagogy PASS, strategy PASS, slides PASS
- cross_module @12bf0d81: PASS — set=[prework,getting-going,building-agent-systems,multi-agent-systems,security,output-quality,evaluations,personal-to-team,agents-building-agents]

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
