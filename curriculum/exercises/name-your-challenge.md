# Exercise: Name your next big *challenge*

**What you do:**

Module 2 builds you a memory: a folder of your own notes and source material that Claude reads before answering, so it's grounded in *your* world, not the open internet. Think of it as a curated library Claude checks first. It helps you think through a real, live problem you're currently wrestling with. Before anything gets built, the problem gets pinned.

*You've read two pieces on this move in prework. Karpathy showed the pattern on himself: LLM as librarian, not answerer. Antti argued that the same move scales to company knowledge: files, not wikis; version it like code. In the next 15 minutes you name the one challenge it all aims at.*

**What counts as a "next big challenge."**

A real, midsized-to-large initiative you own, that you will actually be working on during these training weeks or the weeks right after. We're going to build you a system that helps stuff happen on this initiative. Two tests:

1. **You own it.** It's yours to move. Not your boss's, not the org's in the abstract.
2. **Work ships from it.** A memo, a plan, a decision, a brief, a campaign, a rollout. Something the system can help you produce.

If both are true, it's in. A topic that sounds vague in a sentence (*"improve marketing"*) is fine if you're the person who owns marketing this quarter and real work ships from it.

Good:
- *The pricing redesign we're shipping in Q2: usage-based vs. seats, the pilot cohort, and how we brief the sales org.*
- *Our EU market entry: Germany vs. Netherlands first, staffing model, and the first-year commercial plan.*
- *Improve marketing across the funnel. I own it as CMO, and the next two quarters land positioning, content ops, and a new segment play.*
- *The platform replatforming decision and rollout: build, buy, or partner, and the org changes each choice forces.*
- *Our AI strategy for the next two quarters: which processes we move first, what we stop doing, how we brief the board.*
- *Rolling out agentic ways of working to 300 engineers over the next two quarters, without losing the skeptics.*

Bad (the genuine non-starters):
- *The re-org we did last year.* (Done. No work left to ship.)
- *Becoming a better leader.* / *Being a better human being.* (Self-improvement. Nothing for a system to produce.)
- *Understanding AI.* (A learning goal. A system can't ship your understanding for you.)

Pick the one you'll be carrying anyway over the next few weeks. If two are tied, pick the one where a sharper thought-partner would actually change what you do this month.

**Write the brief.**

The brief lands at your training-directory root as `./challenge.md`, where every later module reads from.

**Prompt** *(Claude Code)*

```
I'm in a training where I'll build a working memory around one live challenge I'm wrestling with. Help me pin the challenge down. Ask me these in turn:

1. In one sentence, what's the initiative? A real, midsized-to-large piece of work you're carrying over the next few weeks — scope, stakes, still open.
2. What have you already tried, read, or decided? What's ruled out, what's still open?
3. Where are you currently stuck on this — what's the specific part you can't seem to get past, or the question you keep asking yourself and not landing?

When I've answered all three, write a one-paragraph brief to ./challenge.md. Show it to me before saving.
```


Claude asks, you answer, the brief lands. Read it. If it doesn't sound like the thing actually keeping you up, edit it. You're the domain expert.

**Preview your sources.**

The memory will be built from three kinds of raw material: pages from your company's Confluence (or wiki), docs and emails from Office365, and a few practitioner articles from the open web. Next phase you'll actually pull them. Right now you're scouting.

**Prompt** *(Claude Code)*

```
Based on the challenge brief you just wrote, suggest where I'd go looking for raw material. Specifically:

- 3 to 5 search terms I'd type into our company Confluence or wiki
- 2 to 3 OneDrive / SharePoint folder names likely to hold relevant docs, emails, or decks
- 2 to 3 practitioners (named people — writers, operators, researchers) worth reading on this challenge, with one link each if you know them

Keep it short. I'll use this as a scavenger-hunt list in the next phase.
```


Scan the list. Some suggestions will be obvious; some will surprise you. Circle the two or three from each bucket you'd actually go pull first.

**The point:**

The hardest part of a memory isn't the tool. It's the scope. A memory about "our company" is a landfill. A memory about *this decision, this month* is a weapon. Picking the challenge well is half the work; the rest of the module does the other half.

**Time:** 15 minutes.

<!-- maintainer -->

**Role in Module 2:** This is the opening exercise of Module 2 — the first 15 minutes of the main session. Prework handed them the nudge ("bring a live challenge"); this exercise pins it into `./challenge.md` before `build-your-challenge-memory` runs. Do not treat as prework — students skip prework, and the rest of Module 2 cannot proceed without a pinned challenge.

**Frameworks riffed on:**
- Jobs-to-be-Done framing (*what is this memory hired to help you do?*) — narrows scope from topic to outcome.
- Roger Martin strategy-as-assumptions — the challenge brief is a set of assumptions the memory will help you stress-test.

**Prerequisites:**
- Claude Code installed, training directory created (per training prework Step 0).
- Both prompts run on pure text conversation — no connectors required for this exercise. Connector verification is a separate prework item.

**Watch-fors in class:**
- Participants who show up with a generic brief ("improve sales performance") — redirect in the first few minutes. The memory won't work without narrowing. Facilitator may run a 2-minute narrowing conversation with the room before unleashing the prompt.
- Participants who picked something already-decided — the memory becomes a post-mortem exercise, low energy. Push for something still open.
- Source-preview list quality varies by how specific the brief is. Weak brief → generic suggestions. Use the source-preview list as a diagnostic for brief quality before `build-your-challenge-memory` starts.

**Deferred per student-facing-first rule:**
- Facilitator notes: how to coach participants mid-class when the brief is too broad or too narrow; the "one-sentence test" — if they can't state the challenge in one sentence, the brief isn't ready; fallback when a participant genuinely doesn't have a live challenge (rare but happens — assign them a teammate's challenge they're close to, or a live org-wide decision the whole cohort can discuss).
