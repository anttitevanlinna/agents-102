# Exercise: Name your next big challenge

**What you do:**

Module 2 builds you a brain — one that helps you think through a real, live problem you're currently wrestling with. For that to work, you need to walk into class knowing which problem.

*You've read two pieces on this move. Karpathy showed the pattern on himself — LLM as librarian, not answerer. Antti argued that the same move scales to company knowledge: files, not wikis; version it like code. Tomorrow you'll do it on your own challenge. Tonight you pick the challenge.*

**What counts as a "next big challenge."**

Something live. Something you're actively stuck on or moving through right now — a decision you have to make, a bet you're placing, a piece of work where you don't yet see the shape. Not finished. Not hypothetical. Not generic.

Good:
- *The pricing redesign we're shipping in Q2 — I don't know whether to go usage-based or stay on seats.*
- *Our EU market entry — Germany vs. Netherlands first, and how we staff it.*
- *The platform replatforming decision — build, buy, or partner, and the org implications of each.*
- *How I coach my team through the agentic shift without losing the strong people who are skeptical.*

Bad:
- *Improve marketing.* (Too vague — no decision at stake.)
- *The re-org we did last year.* (Finished — nothing to decide.)
- *AI strategy.* (A category, not a challenge. Which decision, which week?)
- *Becoming a better leader.* (Self-improvement, not a live call.)

Pick the one that's on your mind most often this month. If two are tied, pick the one where a better thought-partner would actually change what you do.

**Step 1 — write the brief.**

Open Claude Code desktop. Open your `~/agents-102-bootstrap/module-2/` folder — that's where the brief will land, ready for Day 2. Paste this prompt:

```
I'm heading into a training where I'll build a working brain around one live challenge I'm wrestling with. Help me pin the challenge down. Ask me these in turn:

1. In one sentence, what's the challenge? A decision you have to make, a bet you're placing, a piece of work you don't yet see the shape of.
2. What have you already tried, read, or decided? What's ruled out, what's still open?
3. What would "a good answer" look like a month from now? How would you know the brain helped?

When I've answered all three, write a one-paragraph brief to challenge.md. Show it to me before saving.
```

Claude asks, you answer, the brief lands. Read it. If it doesn't sound like the thing actually keeping you up, edit it — you're the domain expert.

**Step 2 — preview your sources.**

The brain will be built from three kinds of raw material: pages from your company's Confluence (or wiki), docs and emails from Office365, and a few practitioner articles from the open web. On training day you'll actually pull them. Right now you're just scouting.

Paste this prompt:

```
Based on the challenge brief you just wrote, suggest where I'd go looking for raw material. Specifically:

- 3 to 5 search terms I'd type into our company Confluence or wiki
- 2 to 3 OneDrive / SharePoint folder names likely to hold relevant docs, emails, or decks
- 2 to 3 practitioners (named people — writers, operators, researchers) worth reading on this challenge, with one link each if you know them

Keep it short. I'll use this as a scavenger-hunt list on training day.
```

Scan the list. Some suggestions will be obvious; some will surprise you. Circle the two or three from each bucket you'd actually go pull first. Save the list — paste it into `source-preview.md` if you like, or keep it in chat.

**Step 3 — verify your connectors** *(2 min — worth doing now, not Day 2 morning)*

Module 2 Phase 1 relies on your Confluence (or similar wiki) connector and your OneDrive/SharePoint connector. If either needs admin approval, it can take days — and you don't want to find out at 9am on Day 2 when the exercise starts.

In Claude Code desktop, click the **+** next to the prompt (or open **Settings → Connectors**). Enable the Confluence and OneDrive connectors. Sign in with your work account.

If either asks for IT admin approval you don't have, reply to the training coordinator now — they'll route it. If it signs in cleanly, you're done. On Day 2 you won't think about this again.

**Step 4 — bring the brief to class.**

You're done. Module 2 builds the brain around the brief you just wrote. Come in with the one-paragraph brief and the source-preview list. That's all you need.

**The point:**

The hardest part of a brain isn't the tool — it's the scope. A brain about "our company" is a landfill. A brain about *this decision, this month* is a weapon. Picking the challenge well is half the work; Module 2 does the other half.

**Time:** 20 minutes.

<!-- maintainer -->

**Frameworks riffed on:**
- Jobs-to-be-Done framing (*what is this brain hired to help you do?*) — narrows scope from topic to outcome.
- Roger Martin strategy-as-assumptions — the challenge brief is a set of assumptions the brain will help you stress-test.

**Prerequisites:**
- Claude Code desktop installed, `~/agents-102-bootstrap/` directory created (per Step 0 of training prework).
- Steps 1 and 2 run on pure text conversation. Step 3 enables Confluence and OneDrive/SharePoint connectors — admin approval may be in play.

**Watch-fors in class:**
- Participants who show up with a generic brief ("improve sales performance") — redirect in the first 10 minutes of Module 2 opening. The brain won't work without narrowing.
- Participants who picked something already-decided — the brain becomes a post-mortem exercise, low energy. Push for something still open.
- Source-preview list quality varies by how specific the brief is. Weak brief → generic suggestions. Use the source-preview list as a diagnostic for brief quality.

**Time budget tension (noted for review):**
- 20 minutes is plausible for three steps (two Claude conversations + connector enablement), assuming connectors sign in cleanly. If admin approval is in flight, Step 3 becomes an email-to-IT and is 1 minute. Realistic floor: 20; ceiling: 30 if everything needs retry. Flag for Antti: consider splitting "brief before, sources + connectors on day" if time-critical.

**Deferred per student-facing-first rule:**
- Facilitator notes: how to coach participants mid-class when the brief is too broad or too narrow; the "one-sentence test" — if they can't state the challenge in one sentence, the brief isn't ready; fallback when a participant genuinely doesn't have a live challenge (rare but happens — assign them a teammate's challenge they're close to, or a live org-wide decision the whole cohort can discuss).
