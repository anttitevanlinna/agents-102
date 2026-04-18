# Exercise: Personal site with guardrails

**What you do:**

**Phase 1 — the boring baseline.**

The baseline is boring on purpose. You need it boring so you can feel how much the later phases change. Don't skip it, even if your instinct is "I know what's coming."

Open Claude Code. Paste your LinkedIn profile into the chat, then this prompt:

```
Build me a personal HTML one-pager site from the LinkedIn profile above.
```

Watch the result. It works. It looks okay. It's also generic — the site a competent LLM produces from a résumé when it doesn't know what matters. Claude keeps the version in its memory; you'll come back to it in Phase 4 without having to save anything.

**Phase 2 — differentiation as a colleague-guide.**

Most personal sites try to sell a product. Yours isn't going to, because you don't have one — you have a kind of help. An employee is a value prop for the people around them. Start there. Tell your colleagues (and the peers outside your company who might come knocking) what you're the go-to person for. Paste this prompt:

```
I want to regenerate my site with a sharper differentiation frame. Ask me these five questions in turn, then use my answers as context and regenerate:

1. Who comes to me for help at work? Name a real situation — their role, context, what they're stuck on.
2. What problem do they struggle with that I see clearly?
3. Why am I the guide — what proves I've solved this before? I'll tell you one specific story. (If you don't have a crisp single story, describe a pattern you've solved more than once.)
4. How does my help work — not "I advise" but the shape of my engagement. Do I build, teach, unblock, redesign?
5. What does success look like for them? What changes on their Monday?
```

Claude asks question one. Answer. Claude asks question two. Answer. And so on. After the fifth answer, Claude regenerates the site.

Read the new version. Notice how it shifts from "about me" to "useful to someone who needs what you do."

**Phase 3 — your strengths, for them.**

Three strengths you have that directly serve the colleague you described in Phase 2. Not generic ("detail-oriented"). Specific ("I can read a 40-page platform doc and name the three architectural decisions that matter in 20 minutes").

Paste this prompt, then your three strengths on separate lines right after:

```
Rewrite the site using these three strengths as voice-shaping context. Don't just add a "How I help" section — let the strengths change what the whole site claims and how it sounds. Tie them to the colleague you described earlier. Each strength is something I do specifically well for them:
```

Read the new version.

**Phase 4 — look back.**

Reading the old version yourself would take ten minutes and probably reveal nothing — you wrote it, so you'll skim past what's missing. Better plan: ask Claude to do the comparison. Paste this prompt:

```
Look at the very first site you generated from just my LinkedIn profile, before I added any differentiation context. Find three specific claims you made in that version that turned out to be generic, empty, or wrong about me once we added real context. Name them and say why each one was a statistical default rather than something true of me.
```

Read Claude's three answers. Those are the LLM filling in gaps with statistical defaults — what most LinkedIn profiles of people like you look like, not what's actually true of you. Not a bug. It's what happens when context is thin. Context fixed it. You'll meet this mechanism again in Module 5 when the stakes are higher.

No regeneration in this phase. Just observation.

**Phase 5 — the mirror.**

Complaining is easier than praising. Most people can list what drives them mad at work in thirty seconds; the same people will stall for five minutes if asked what they're great at. Use the asymmetry.

Five things you hate about your work. Bad meetings. Vague strategy. Status decks that say nothing. Whatever. Be specific.

Paste this prompt, then your hate list right after:

```
Help me do a mirror exercise. Below is a list of things I hate about work. For each, flip it to what I love and am probably great at — the opposite of what I hate tells me what I am. Keep the edge — don't soften stances into generic virtues.

Once you have the love/great-at list, use it to rewrite the site's voice — headline, hero line, section framings, the overall stance. Don't just add a "What I love" section. Let the list change how the site SOUNDS. It should feel more vivid, more personal, more like someone with a spine wrote it.

My hate list:
```

Read the new version. The site gets sharper.

**Phase 6 — free iteration.**

Now make it yours. Color, layout, tone, a quote at the top, a section that shouldn't exist on most sites but does on yours because the rest of you doesn't fit a template either. Iterate until looking at the screen makes you say — "yes, this is me."

Open prompts. You drive.

**Close — Claude as cold critic.** Open a fresh Claude window (no context). Paste this:

```
Read this personal site. Two questions:
1. Quote the one line that feels most uniquely this person — not the best line, the most UNIQUELY them.
2. Quote the most generic line that could be copy-pasted from anyone's site.

Here's the site:
```

Paste the site after the prompt.

Compare Claude's picks to what you expected. Where cold-Claude sees generic, your context is still thin — add one more sharp detail there and regenerate. Where Claude's pick of "uniquely you" matches your own gut — solid ground.

**What happens:**

Phase 1 is fine. Phase 6 is yours. The mechanism is the same every phase — Claude's output is shaped entirely by what you put in the context ahead of the task. Your LinkedIn was context. Your colleague-guide frame was context. Your strengths were context. Your mirror-list was context. The more specific the context, the more genuinely "you" the output.

That's the whole of Module 1's big idea, proven with your own name on it.

**The point:**

Generic output comes from generic context. The LLM didn't get better between Phase 1 and Phase 6 — you did. You became better at feeding it what it needs to produce YOUR output instead of everyone-else's. The same mechanism scales: business proposals, competitor analysis, compliance reviews, product strategy. Anything where output quality depends on "is this genuinely ours or just fine?"

**Time:** 45 minutes. Banter expected.

<!-- maintainer -->

**TODO (applied in pass 2 — 2026-04-17):**
- Prompts now first-class in each phase — participant has a specific prompt to paste, not a vague "add to context."
- Phase 5 dropped "optional" — required phase; mirror is the most distinctive move in the exercise.

**TODO (applied in pass 3 — 2026-04-17, from student-persona simulation):**
- Phase 1: dropped "save this output somewhere" — Claude keeps it in session memory; no preservation instruction needed.
- Phase 4: replaced the "read both versions" cognitive-load ask with a Claude-driven comparison prompt. Claude looks back at its own earlier output and surfaces three specific generic/empty claims. Zero reading burden; pedagogically fitting (Claude observing its own pre-context output).
- Phase 2 Q3: added fallback for participants without a crisp single story ("describe a pattern you've solved more than once").
- Phase 5: added "Keep the edge — don't soften stances into generic virtues" to the mirror prompt — counters Claude's RLHF niceness tax on edgy claims.

**TODO (applied in pass 4 — 2026-04-17, append-vs-integrate fix):**
- Phase 3 + Phase 5 prompts were saying "add X to context and regenerate" — Claude reads that as "append X as a new section" and produces a bullet list rather than a voice-rewritten site. Updated both prompts to direct Claude to REWRITE using X as voice-shaping context, not append X as a new section. Added the "add vs. rewrite" pattern to prompt design rules and to the simulation protocol's known Claude-behavior list.

**TODO (applied in pass 5 — 2026-04-17, neighbor → Claude-as-cold-critic):**
- Phase 6 closing was "pair exchange: show your neighbor, they tell you the one line that feels most uniquely you." For this specific exercise, replaced with Claude-as-cold-critic: fresh window, no context, structured prompt asking for the most-uniquely-you line and the most generic line. Produces an artifact, foreshadows Module 6.
- **But the design rule is not "always Claude" — it's vary deliberately.** CLAUDE.md + SKILL.md now list five closing mechanics (Claude-critic, pair, group, solo retro, show-to-room) and frame selection as a per-exercise design question. Module 1's answer is Claude-critic. Module 3 or 8 might well be group discussion.

**Deferred per student-facing-first rule:**
- Facilitator notes: watch-fors (generic Phase 2 answers; Phase 3 strengths that don't serve anyone specific; Phase 5 hate-list that doesn't flip cleanly), decision points, per-phase timings (Phase 6 free iteration tends to run long), Claude Code setup prerequisites.
