# Scrollback — Claude Basics M3 find-the-crux verbatim Actor run

Three phases run as one Actor. Each `>` block is a participant turn (paste of prompt or substituted answer), each `Claude:` block is the agent turn.

---

## Phase 1 — Divergence interview (participant: Antti, group-1)

> Interview me about the top three difficulties I see in our team's Claude rollout. Ask one question at a time. Don't show me the next question until I've answered the current one.
>
> Start with: "What's the first difficulty you see?" After my answer, push back once — ask for a specific example, or ask whether that's the actual difficulty or a symptom of something deeper. Then ask the second question, same shape. Then the third.
>
> When I've answered all three with push-back, save the conversation as a divergence file named after me (use my first name, lowercase, no spaces) in the group folder I'll name after the colon. Include the three difficulties and the push-back answers, in my voice. Don't summarize them into your own register.
>
> The group folder: group-1/

Claude: Got it. I'll interview you one question at a time, push back once after each answer, and save the file as `group-1/divergence-antti.md` when we're done.

What's the first difficulty you see?

> We don't have a way to track which teams are getting real value from Claude versus just paying for licenses they barely use. Finance keeps asking and we keep guessing.

Claude: That sounds like a measurement problem on the surface — but is the actual difficulty "we lack a metric" or is it something deeper, like the team-level signal not existing in the first place?

> It's a measurement problem on the surface, but underneath it's that we don't have a way to see usage signal at the team level. We have user counts. We don't have "this team is shipping Claude-aided work, that team is logging in but not landing output."

Claude: Clear. Second difficulty?

> When a user comes to us with a non-trivial question — "can I use Claude on data type X" — the answer depends on who picks up the compliance phone. Sometimes it takes 3-5 days for a real answer.

Claude: Can you give me a specific recent case where this hurt?

> Specific case: support team asked about phone numbers in tickets, took 3 days, the answer in the end was "yes, with redaction" but we lost the user's window for using it.

Claude: Got it. Third difficulty?

> The good Claude prompts and CLAUDE.md files our team has built stay in individual heads. Nobody shares them. Two people doing the same task don't compound; they re-discover.

Claude: Could a shared kit fix this, or is the deeper issue something about how knowledge moves on your team?

> Could a shared kit fix this? Probably yes. We don't have a place where a tested prompt or a folder CLAUDE.md becomes team-level. The first person who solves something solves it for themselves.

Claude: Saving as `group-1/divergence-antti.md`.

(File written: `group-1/divergence-antti.md`.)

---

## Phase 2 — Group synthesis (synthesizer reading group-1/)

> Read every file in this group folder that starts with "divergence-". You should find three or four files, one per group member.
>
> Across the files, find the ONE difficulty that, if our team got it right, would make the others follow. That's the crux. Not the most-mentioned difficulty. Not the average. The one that, when named, makes the other difficulties downstream of it.
>
> Show me the crux candidate in chat first, in two sentences. Don't save yet. I want to push back if you missed something the files were actually saying.
>
> After I push back, save the final crux as a group-crux file named after our group number in this folder. Include: the named crux (one paragraph), and one quote from each divergence file that supports it.

Claude: Read all four divergence files (marja, juhani, petra, antti). Crux candidate:

The crux for group 1 is that **knowledge isn't centralized at the team level** — Claude usage, the prompts that work, the compliance precedents, and the measurement signal all live at the individual level and never make it into a team layer. Every difficulty across the four files traces back to the missing team-level layer rather than to any specific user, prompt, or compliance question.

Want to push back before I save?

> The candidate crux you proposed names "knowledge isn't centralized" but that's a symptom. The deeper crux across our four divergence files is that **good Claude usage stays trapped at the individual level — the team's collective Claude competence doesn't compound because nothing is shared, measured, or escalated cleanly**. Marja named the no-Claude-advocate role; Juhani named the slow compliance escalation; Petra named the prompts-stay-in-individual-heads pattern; my own divergence named the measurement gap. All four are the same shape: individual signal, no team-level mechanism. Rewrite the crux to name "the team doesn't have a shared mechanism for what individuals already know" — that's the load-bearing one.

Claude: Agreed — "centralized knowledge" was too narrow. The shared mechanism framing covers escalation + measurement + prompts in one shape. Saving with the rewrite.

(File written: `group-1/group-crux-1.md`.)

---

## Phase 3 — Cross-group synthesis (IT Director reading all four group cruxes)

> Read all four group-crux files: group-1/group-crux-1.md, group-2/group-crux-2.md, group-3/group-crux-3.md, group-4/group-crux-4.md.
>
> The four cruxes are four different angles on the same rollout. Find what's shared across them, what's contested, and what one or two cruxes are downstream of others.
>
> Then propose a rollout strategy in three sections:
> 1. The two or three top priorities for the next 90 days (the cruxes that, if got right, make the others follow)
> 2. The two or three deferrals (real difficulties that aren't actually the crux right now — name them and explain why they wait)
> 3. The single named question I (the IT Director) need to answer myself before the strategy can land
>
> Show me the strategy in chat first. I'll push back, edit live, and add what's missing. Then save as rollout-strategy.md in my personal folder. Save my edits, not your first draft.

Claude: Read all four crux files. Convergence: groups 1, 3, 4 are facets of the same problem (no team-level layer turning individual signal into shared capability). Group 2's escalation crux is upstream — until users get same-day data-class answers, every other improvement leaks at the point of use.

First-draft strategy:

**Top priorities (90 days):**
1. Fast escalation path for data-class questions — single decision matrix, named compliance contacts, 24-hour SLA.
2. Thin shared kit — 3-5 tested prompts + folder CLAUDE.mds the team trusts.
3. Lightweight team-level adoption metric (active-week per team, plus a quarterly work-quality sample).

**Deferrals:**
1. Productivity measurement of Claude-aided work — premature without adoption signal first.
2. Designated Claude-advocate role — premature; the role's job emerges after kit + escalation exist.
3. Training material refresh — defer because the kit work covers the load-bearing parts.

**Single question for the IT Director:** What's the budget envelope I have to commit for the kit + measurement work in Q1?

Push back?

> The first-draft strategy is too tidy. Three changes I'd make live:
>
> 1. The "deferrals" section is wrong. You named "training material refresh" as a deferral. That's not a deferral — that IS one of the priorities, just at smaller scale. Move it up.
>
> 2. The top priority — "fast escalation path for data-class questions" — needs an owner named. Otherwise it goes in a quarterly plan and dies. Put my name on it: I own this in the next 30 days.
>
> 3. The "single named question I need to answer myself" section is currently asking "what's the budget?" — wrong question. Real question: am I willing to make a public commitment that the IT team can run this rollout, or am I going to keep deferring to compliance and security? That's the call I haven't made.
>
> Save the rewrite. Don't revise to match my push-back literally; rewrite the whole strategy with my push-back as voice-shaping. I want the final to read like I drafted it.

Claude: Rewriting in your voice — escalation owned by you in 30 days, training refresh promoted to priority 3, deferrals trimmed to measurement + advocate role, the final question reframed as the public-commitment call. Saving as `rollout-strategy.md` at scratch root.

(File written: `rollout-strategy.md`.)
