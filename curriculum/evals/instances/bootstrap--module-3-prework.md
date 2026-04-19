# Eval Instance — Bootstrap / Module 3 prework

Filled-in instance of `curriculum/evals/exercise.md` for the Module 3 prework in the Bootstrap training. Prework is exercise-shaped (reading + note-taking activity), so the exercise eval template applies.

**Target file:** `curriculum/exercises/module-3-prework.md`

**Eval runs:**
- 2026-04-19 (pass 1) — **APPROVE WITH TODOs.** 16/16 judges pass; length at ~720 words (top of 400–700 band, defensible because Reading 2 is a mechanic primer). Judge's overall: *"A disciplined, ceiling-before-coordination prework that earns every piece of jargon it uses, steers cleanly off Module 2, and hands Phase 2 exactly the subagent-launch intuition it needs — ship it pending the Huang-quote and UI-label verifications already logged."* Three items flagged (Huang-quote verification, Reading 2 trim, subagent-launch capability check).
- 2026-04-19 (pass 2) — simulation-driven patch applied: OpenClaw orientation paragraph tightened from 4 sentences (Jensen Huang / ClawHub / "two serious paths") to a one-line inline parenthetical plus a "you don't need to install it" reassurance. Simulation Anneli reported the longer version "disorients rather than orients — it creates homework rather than discharging it, cost 4 minutes of anxiety, contributed nothing to the exercise." Cut the quote framing; kept OpenClaw named because the practitioner list genuinely covers both tools.

**Simulations:**
- 2026-04-19 (pass 1) — whole-module Anneli simulation across prework → Connections → exercise → Close. **"This is me" rating: 7.5/10** on the final synthesized answer (vs. 7/10 baseline from exercise-only run — marginal lift). Prework improved smoothness, not output quality.
  - **Paid off:** Subagent primer. Anneli pasted Phase 2 without hesitation, correctly didn't try to chat with running Task blocks. Keep this; load-bearing.
  - **Paid off:** Ball/Hashimoto readings gave her vocabulary ("trust boundaries," "write down the rules") that surfaced in her Connections answer and her coordination rule.
  - **Did not pay off:** Original OpenClaw orientation paragraph. Cost 4 minutes of anxiety; contributed zero to the exercise. Patched in pass 2 (simpler inline framing).
  - **Hallucination catch:** Internet retriever invented a Willison URL on positioning; Anneli caught it only because she'd just read him. Exercise patched separately (URL spot-check instruction added to Phase 1).
  - **Window-opening mechanics still stall (~5–7 min).** Prework doesn't cover; exercise assumes. Capability-check-gated — not patched here.
  - **Missing "When to split an agent" lecture noticed at the Close → Bridge seam.** Anneli walks out able to DO the move but not to defend or generalise it. Over-apply risk.

---

## The judges

### Primary — the leap test

After completing this prework, the participant can:
- **Name the ceiling** — describe, in one sentence, what a single well-shaped agent is already doing for one of the five practitioners ("Willison is having Claude Code maintain his blog's tagging," "Karpathy is comparing Claude Code and OpenClaw on the same coding task," etc.). Not a book report — a takeaway the participant wrote in their own words.
- **Orient to OpenClaw** — place OpenClaw in plain terms as the open-source counterpart to Claude Code in the agent-coding category. No vendor fluency required; a one-line "there are two serious paths, one commercial and one open" mental model is the bar.
- **Launch a subagent with a plain-language prompt** — know that "use a subagent to…" or "launch these three in parallel" is enough, recognize a running Task block when they see one, and not need to be taught this in Module 3's room.

If an SVP walks into Module 3 able to do these three things without the facilitator re-teaching any of them, the prework earned its 30–40 minutes.

### Framing fidelity

The prework leads with Module 3's Big Idea: **Hire three agents to search. Three more to decide. The filesystem is the meeting room.** Reading 1 primes the first half (ceiling of what one agent does, so the added coordination is visible). Reading 2 primes the second half (subagents — the mechanism Phase 2 rides on).

Avoids:
- Framing OpenClaw as a competitor Claude Code is losing to (or vice versa) — both are serious paths; position-free.
- Framing subagents as a developer concept the student needs to "graduate" to — they're the native pattern, launched in plain language.
- Framing the practitioner list as mandatory full reading — explicitly *pick three*, not five, so a 30–40 minute budget holds.
- Framing the subagent primer as configuration documentation — shape not syntax; explicit "you don't need to use `/agents`" line.

### Learning goal fit

Enables these LOs from `trainings/bootstrap/multi-agent-systems.md`:
- **Design** a multi-agent pipeline in two shapes — prework primes the subagents shape explicitly; the sessions-on-shared-files shape is left for Phase 1 discovery.
- **Build** three retrieval agents and a synthesizer orchestrating three subagent personas — the subagent primer makes the Phase 2 launch mechanic familiar before class.
- **Evaluate** when splitting earns its keep — Reading 1 (single-agent ceiling) is the baseline the student will compare three-agent coordination against.

Analyze (handoff failure modes) and Create (framework-guided answer) are downstream of the exercise itself; prework doesn't need to touch them.

### Module-to-module arc

Picks up from **Module 2** explicitly: "Module 3 runs on the brain you already built in Module 2." Also forward-references the Module 2 Karpathy LLM Wiki prework — explicitly steers the student to read something of Karpathy's *other* than the Wiki, to avoid duplicate reading.

Hands off to **Module 3 Phase 2** — the subagent primer's "launch in parallel" phrasing is identical to the Phase 2 synthesizer prompt's phrasing. No re-teaching needed in the room.

### The teaching moment lands

The prework reliably produces these ahas:
- **"One agent is already doing more than I thought."** — from the practitioner takeaways. The ceiling-before-coordination move.
- **"OpenClaw is a named thing I should have an opinion about."** — from the in-line explainer. Sets up the CTO-answer muscle Module 8 uses.
- **"Launching a subagent is asking in plain language."** — from the primer. Removes the biggest friction point Phase 2 would otherwise hit.
- **"I don't need to author subagents to use them."** — the explicit "what you don't need" line prevents students going down the `/agents` rabbit hole and arriving at class half-done.

If reasonable variation in participant skill can skip any of these, the prework is fragile. Protection: the takeaway requirement (three bullets, one per practitioner) enforces the first; the in-line OpenClaw paragraph enforces the second; the "how to launch one" subsection with explicit phrasing enforces the third; the "what you don't need" subsection enforces the fourth.

### Riffs on a recognized framework

- **Ceiling-before-addition** — see what ONE of something does well before adding coordination, so the cost of coordination is visible. General principle (applies to management, software architecture, research methodology); named explicitly in the body.
- **Practitioner-before-pattern** — read five people doing the thing before hearing the name for the thing. Same move as Module 2's Karpathy-first sequencing. Named in maintainer notes.
- No business-model framework deployed; the prework is orientation, not applied methodology. This is an acceptable exception to "riffs on a framework" per the eval template's rare-exception clause (primarily an orientation reading, not a business-skill drill).

### Failure modes named

- **Student reads all five instead of three** — not a break; generous. Facilitator can coach in Module 3 opening: "which two did you skip, and why?"
- **Student reads none because the list feels long** — the "pick three" hedge plus the 30–40-minute budget should protect this. If a cohort drifts here, the facilitator can assign specific practitioners per participant.
- **Student hits paywall or dead link** — the maintainer-side URL verification pass is designed to prevent this; fallback swap-ins named (Ronacher).
- **OpenClaw context sentence confuses rather than orients** — if the student arrives thinking OpenClaw is a specific tool they need to install vs. a category name, Module 3's opening Connections correct with one sentence ("you don't need OpenClaw for the exercise — we're on Claude Code"). Low-risk.
- **Student memorizes subagent schema instead of launch phrasing** — explicit "you don't need to memorize the configuration; you need the shape" line in Reading 2 prevents. Facilitator catches: "you're trying to write an agent definition file — you don't have to, just ask."
- **Student tries `/agents` during the prework despite the instruction** — benign; they'll see the authoring surface, file a "huh, neat" mental bookmark, and still be fine for Phase 2. Not a break.

### Time-boxed

**Target: 30–40 minutes.** 25 reading (three practitioner pieces at 5–10 min each); 5 noting takeaways; 10 on the subagent primer. Under 20 = student skimmed; over 50 = student is deep-diving where the prework meant to prime. Facilitator-side: a per-cohort check at Module 3 opening ("show of hands — who read three?") gives the real signal.

### Facilitator briefing complete

**Deferred per student-facing-first principle.** Maintainer notes already list watch-fors (participant going deep on one instead of three; trying to memorize subagent schema; hitting a dead link), decision points (swap-in Ronacher if any of the five drifts), and the URL verification pass. Full facilitator briefing is a later artifact.

### Scaffold / worked example provided

Participants haven't written one-line practitioner takeaways in this format before. The prework provides:
- **An explicit question to answer** for each practitioner read ("what is this person automating that they used to do by hand, and what's the move that made it work?")
- **A worked shape** implicitly through the question structure — two clauses, plain language, under one line each.
- **A target artifact** (three bullets, one per practitioner, kept somewhere they'll see on training day).
- **The OpenClaw orientation sentence in-line** — no outside research required.
- **Explicit phrasing for launching subagents** ("Launch a subagent to…" / "Launch these three subagents in parallel") — no inference required.

### Prompt design

Not applicable — the prework contains no copy-paste prompts for Claude. All activity is reading + manual note-taking. The subagent primer *names* the Phase 2 launch phrasing, but that phrasing is the Module 3 exercise's, not a prework prompt. Judge N/A → pass by default.

### Plug points real

Participant uses:
- **Their own three practitioners** — picks any three of the five named. Personal choice.
- **Their own takeaways** — written in their own words, tied to the practitioner's work, not a canned summary.
- **Their own subagent-launch intuition** — built by reading the primer, tested in the Phase 2 exercise the next day.

No pre-built artifacts, no canned takeaways. Plug points real.

### Business-audience language

Student-facing body audit:
- `subagent` — earned in Reading 2 with a definition paragraph ("A subagent in Claude Code is a helper the main agent dispatches to do one focused job"). Business-audience-safe after that.
- `OpenClaw` — named with a one-sentence definition in Reading 1 ("the open-source counterpart to Claude Code — the OSS coding / computer-use agent category"). Earned.
- `ClawHub` — mentioned only in the OpenClaw context sentence as "its own skills marketplace." Not reused; safe.
- `context window` — used once in Reading 2 with a plain-language hint ("a clean slate, so its work doesn't clutter yours"). Safe.
- `filesystem` — business-safe (everyone uses a file browser).
- No `RAG`, `embeddings`, `vector`, `pipeline` (tech sense), `orchestration`, `schema`, `architecture` (tech sense), `prompt engineering`, `frontmatter` (explicitly avoided — "short frontmatter" replaced with "short header").

Trailing metadata below `<!-- maintainer -->` is exempt.

### Voice

Second person, builder, Seth × Rory × Risto. "You don't type a special command. You ask Claude, in plain language, to use one." "Shape, not syntax." No consultant-speak, no LLM-tell words. Audit clean.

### Length

**Target: 400–700 words.** Current student-facing body (above `<!-- maintainer -->` cut): ~700 words. Within target. Shorter than the Module 2 exercise (~900) because prework is orientation, not doing.

### Specificity

Named practitioners (five), named domains (five), named readings (Fortune piece for Karpathy by context), named Claude Code mechanics ("`.claude/agents/` as markdown files" in Reading 2 context, `/agents` slash command by name in "what you don't need"), named artifact (three bullets on training day), named time budgets (25 + 5 + 10).

---

## Auto-fail red flags check

- Framed as "test" or "validation check" — NO; framed as orientation + takeaway
- Student's artifact pre-built — NO; takeaways are their own
- No time estimate — 30–40 min named
- LLM-tell word — audit clean (scan for "honestly", "delve", "landscape" verb, "importantly", "crucial")
- Toy data instead of own initiative — prework precedes the own-work phase; practitioner takeaways are about real people's real work, not toy
- Could run without teaching moment — the "pick three and write three bullets" structure enforces takeaways; the subagent primer's "how to launch" and "what you don't need" enforce orientation
- Unfamiliar artifact from thin air — worked shape through question structure; artifact target named
- Mid-prompt `[BRACKET]` placeholder — N/A, no copy-paste prompts
- More than one H1 — one
- `---` YAML frontmatter — no
- Unearned tech jargon — `subagent`, `OpenClaw`, `context window` all earned at first use; no other tech jargon

---

## LLM-as-judge prompt

See the prompt at the bottom of `curriculum/evals/exercise.md`. Paste this instance's `## The judges` section + the target file into the `[PASTE]` blocks.
