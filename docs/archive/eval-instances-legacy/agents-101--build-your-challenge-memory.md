# Eval Instance — Agents 101 / Build your challenge memory exercise

Filled-in instance of `curriculum/evals/exercise.md` for the Module 2 (Building Agent Systems) exercise in the Agents 101 training.

**Target exercise file:** `curriculum/exercises/build-your-challenge-memory.md`

**Note on vocabulary:** renamed 2026-04-21 from *"brain"* → *"memory"* as part of a project-wide rename (our own vocabulary for the `brain/` folder → `memory/`, to free "Second Brain" for external-concept citation). Historical run notes below still say "brain" — intentional, they describe what the exercise was called at the time. Judges and structural content reference "memory" going forward.

**Eval runs:**
- 2026-04-17 (pass 1) — **APPROVE WITH TODOs** — 15/16 judges pass; Length fails (~900 words vs. 400–700 target). Three pass-2 sharpen items applied: (1) "Quality beats quantity — you are the curator" promoted to its own line with Rory-style reframe ("Most brains fail in the first ten minutes, not the last ten"); (2) "Ten seconds here saves an hour" + "Don't hover" padding removed; (3) Phase 3 seam tightened — added "Second batch made the first batch better. Chat literally cannot do this." so the compounding aha lands before the audit pivot; Module 5/6 forward-reference line removed from body.
- 2026-04-17 (pass 2) — above applied. Judge's pass-1 overall: *"A strong reframe — scoping to one live challenge plus the guided-curation opening turns a generic KB exercise into a specific, personal artifact the participant would actually use Monday."* Length still slightly over target (~860 words after trim); logged as TODO for future polish.
- 2026-04-17 (pass 3) — simulation-driven fixes: (a) crux-skill invocation in the Debrief was calling a skill name that doesn't exist in the Module 2 scaffold — **replaced with inline skill logic**, Rumelt named directly; Module 2 deposits the *concept*, Module 8 reveals it's been a skill; (b) business-audience jargon sweep: "ingest" → "load"/"bring in", "substrate" → "same stuff — text on disk"; (c) Phase 1 title "Curate with Claude, then ingest" → "Curate with Claude, then load."

**Simulations:**
- 2026-04-17 — SVP-Marketing persona (Anneli Rantanen, Nordic observability-SaaS, 600 people, challenge: "why we keep losing late-stage deals to Datadog and Grafana"). **Monday-useful rating: 7.5/10.** Surfaced three breaks in the classroom, ten ambiguous/under-scaffolded spots, four new Claude-behavior patterns. Most critical break — **crux-skill invocation died silently** because the skill wasn't in the Module 2 scaffold — fixed in pass 3 by inlining the skill logic. Other surfaced fixes deferred as TODOs (logged below).

**Simulation-surfaced TODOs (not yet applied — future polish):**
- Phase 1 + button + OneDrive ingestion prose does not carry the UI load — 40-slide PPTX wobbles. Consider one-line UI hint or Quick Reference cross-ref.
- Phase 1 self-audit prompt is too charitable — Claude under-flags its own generic pages (lists 2 when reality is 4). Sharpen the audit prompt: "be harsher than you think necessary — flag at least 3 pages or half, whichever is greater."
- Phase 1 time budget is aspirational — 10 min curation-to-sources transfer is realistically 20. Either bump module to 55–60 min or pre-stage one source bucket in prework.
- Phase 3 "revisit soft-pages.md" assumes continuity across 25 minutes — consider a one-line reminder ("soft-pages.md from Phase 1 — the generic pages we parked").
- Emotional arc dent Phase 2 → Phase 3: Phase 2 produces joy (first agent works); Phase 3 is housekeeping on the brain. Consider letting the agent consume the new source in Phase 3 — "your agent just got a new fact; watch it change" — instead of routing through brain-update first.
- ~~Neighbor-swap confidentiality note~~ — resolved 2026-04-18: neighbor swap replaced with "Close — put it to work" (participant runs a real working question against their own brain). Removes confidentiality surface entirely; classroom-only mechanic dropped in favor of a move that's identical in both modes.
- ~~"Plan mode" Shift+Tab cycle with three modes — novice cycles past. Consider emphasizing Shift+P as the canonical alternative.~~ — resolved 2026-04-21: prompt-toggle (*"Enable plan mode"*) named as the primary method; Shift+P removed from all material (unreliable); desktop mode dropdown named as the GUI alternative; Shift+Tab kept as keyboard alternative.

**New Claude-behavior patterns surfaced (added to content-creation skill known-patterns list):**
- **Plan-mode approval inflation** — 7-page plans get rubber-stamped; the plan *looks* structured so participants approve without reading. The self-audit prompt catches it but assumes reading happened.
- **Source-type blindness on ingestion** — Claude silently ingests a PPTX and derives claims from slide titles only. Dense slideware → thin extraction, unreported.
- **Citation cargo-cult** — Claude cites `brain/x.md` dutifully, but the cited file may not actually contain the claim. Citations become performative, not verified.
- **Self-audit charity** — Claude under-flags its own generic/soft output when asked to critique itself. Charitable self-audit is the default.

---

## The judges

### Primary — the leap test

After completing this exercise, the participant can:
- **Describe compounding** — point to a specific moment in Phase 3 when a memory page about their challenge got *sharper* from new sources (not just longer), and explain why that matters
- **Recognize the substrate pattern** — state in plain terms that the memory is markdown files, the custom agent is also a markdown file, and the rules file (`CLAUDE.md`) is also a markdown file — one kind of object doing three jobs — and why that beats a fancier setup
- **Build a second custom agent solo** — back at work, pick a different recurring job on the same challenge (or a new one) and create another `agents/<name>.md` file without trainer support

If an SVP marketing or SVP operations walks out able to do these three things, and says "this is something I'd actually use on Monday for the challenge I'm carrying," it's good enough.

### Framing fidelity

Leads with Module 2's Big Idea: **A system remembers, grows, and compounds. Chat doesn't. Your next big challenge is the foundation.**

Avoids:
- Framing the memory as "documentation" (documentation is static; a memory compounds)
- Framing the custom agent as a "chatbot" (chatbot = single turn; agent = a reusable role with rules, invoked by pointing Claude at the file)
- Framing the root `CLAUDE.md` as a "system prompt" (tech jargon; the rules file is a living document students edit every module)
- Framing the memory as "knowledge management" at company scale — the scope is *this challenge*, not the whole company

### Learning goal fit

Enables these LOs from `trainings/agents-101/building-agent-systems.md`:
- **Build** an LLM memory on your next big challenge, curated from internal wikis, recent work, and practitioner best practice — Phase 1 curates then ingests
- **Construct** your first custom agent — a plain markdown file with instructions (what it's for, and the rules it follows) — Phase 2
- **Use** Claude Code's plan mode to review multi-step agent actions before they run — Phase 1 uses plan mode; Phase 2 contrasts with direct execution
- **Analyze** the three layers of the system — emerges from Phases 1–3; named in the Compounding lecture after
- **Evaluate** whether the memory is compounding or merely growing — Phase 3's "sharper, not longer" check + audit pushback is the direct measurement

### Module-to-module arc

Picks up from **Name your next big challenge** (Module 2 opener, first 15 min) — the one-paragraph brief in `./challenge.md` is the seed Phase 1 curation grows from. Also picks up from **Module 1 (Getting Going)** — "same move, different shelf" references the Module 1 guardrail/context mechanism at memory-page and agent-file level.

Hands off to **Schedule your personal agent** (homework) — the memory built here is what the scheduled agent reads every morning. Also hands off to **Module 3 (Multi-Agent Systems)** via the Bridge ("the job is getting too big for one agent — what do you split?") and to Module 7/8 where personal memories get promoted to team and synthesized across people.

### The teaching moment lands

The exercise reliably produces these ahas:
- **"Three pages got SHARPER in Phase 3."** — the compounding moment. A chat can't do this; a folder of markdown files can.
- **"The agent is also just an .md file."** — the substrate moment. Knowledge, capability, and guardrail are the same kind of object.
- **"Claude proposed search terms and sources I wouldn't have thought of."** — the guided-curation moment. New to this version. Curation becomes craft, not shovel.
- **"The memory answered my real working question with specifics and citations, not a generic industry take."** — the differentiation-at-personal-scale moment, parallel to Module 1's personal-site payoff. The contrast holds because the challenge is the participant's own; a generic answer exposes thin spots they can feel immediately.

If reasonable variation in participant skill can skip any of these moments, the exercise is fragile. Plan mode protects the first; the agent-rules defaults protect the second; the guided-curation prompt protects the third; the Close "put it to work" question forces the fourth — a real working question answered against your own memory either lands specific or reveals what's thin.

### Riffs on a recognized framework

- **Karpathy's LLM Wiki pattern** — named explicitly in prework; this exercise IS the operationalization.
- **Second Brain / personal knowledge management** (Tiago Forte lineage) — the vibe transfers for those who've heard of it. The scope pivot (whole-life → single live challenge) sharpens the Second Brain idea rather than dilutes it.
- **Jobs-to-be-Done** — what is this memory *hired* to help you do? The challenge brief is the job spec.
- **Librarian and library** — Phase 2 frames the agent as the librarian for the memory. Classical knowledge-work framing; lands instantly.
- **File-based agentic RAG** (Boris Cherny / Anthropic observation) — stays in trailing metadata (not in student-facing body per business-audience rule). Emerges as a concept in the Compounding lecture via plain language.

Integrated, not decorative.

### Failure modes named

Deferred in detail to facilitator notes; here as check material for simulation:
- **Weak in-session brief** — participant produces "improve sales performance" in the Module 2 opener (`name-your-challenge.md`). Phase 1 curation produces generic search terms. Fix: trainer intercepts in Module 2 opening, 2-minute narrowing conversation with the room before Phase 1 curation starts.
- **Phase 1 curation is thin** — Claude proposes three obvious search terms and no practitioner authors. Fix: push back in conversation — "give me three practitioners by name, not topic areas."
- **Connectors not live** — Confluence or Office365 connector didn't install, or OAuth pending admin approval. Fallback: pull content manually (copy-paste from browser into markdown files in `sources/`), or skip to the internet-best-practice sources for this run.
- **Phase 3 memory got longer, not sharper** — Claude padded. Fix: the literal push-back prompt is in the body.
- **Custom agent boilerplate** — the "Rules" section reads like defaults, no voice. Fix: Phase 2's "change at least one so it's actually mine" line.
- **Close "put it to work" question is vague** — participant asks "summarize my challenge" instead of a real working decision. Fix: push back in the body already ("not summarize the sources — a real working question"); facilitator can reinforce with "what's the question you'd answer for your CEO?"

### Time-boxed

**Target: 45 minutes.** Phase 1 ~12 min (curation + load), Phase 2 ~12 min, Phase 3 ~10 min (including 3-min source hunt), Phase 4 ~6 min, Close ~5 min. Under 35 = rushed; over 55 = curation sprawled or Phase 3 didn't sharpen and we're diagnosing. Banter welcomed.

### Facilitator briefing complete

**Deferred per student-facing-first principle.** Trailing metadata in the exercise file lists watch-fors, fallback paths, and setup verification. Facilitator-notes pass will promote these to a real briefing artifact.

### Scaffold / worked example provided

Participants haven't built a curated source list, a memory, or a custom agent before. The exercise provides:
- **The opener brief** as the anchoring artifact — Phase 1 curation keys to it (produced by `name-your-challenge.md` in the first 15 min of Module 2).
- **The three-sources framing** in the Phase 1 prompt — Claude proposes under three named buckets, not free-form.
- **Plan mode** in Phase 1 ingestion — Claude proposes the topic list, student approves. The scaffold is Claude's draft.
- **Default rules** in Phase 2's prompt — "cite the memory file for every claim, never invent, ask when a source is thin, keep my voice." Student accepts or overrides. No blank-page moment.
- **Root `CLAUDE.md` (in the Module 2 starter scaffold)** — gives Claude the topic-page shape, citation convention, and index format.
- **Explicit file-path references** throughout — `sources/`, `memory/`, `agents/`, `memory/soft-pages.md` — so students see exactly where things land.

### Prompt design

Every prompt is a complete copy-paste block with no mid-prompt `[BRACKETS]` for the student to edit. Patterns used:
- **Phase 1 curation** — conversation-after (Claude asks about the challenge first, then proposes the plan under three buckets).
- **Phase 1 ingestion** — direct prompt; plan mode makes it interactive.
- **Phase 1 audit** — direct prompt; produces `memory/soft-pages.md` for Phase 3 pickup.
- **Phase 2 first prompt** — conversation-after (Claude asks three questions in turn).
- **Phase 2 second prompt** — references session memory ("the agent file you just created") rather than taking a filename parameter.
- **Phase 3** — direct prompt; new sources are in the folder already.
- **Phase 3 audit pushback** — direct prompt; tests Claude's self-report against the files.
- **Phase 4** — direct prompt; Claude produces proposals, student approves/rejects each.

Close ("put it to work") uses a copy-paste prompt the participant wraps their own working question with.

### Plug points real

Participant uses:
- **Their own challenge** (named in prework, written to `./challenge.md`)
- **Their own sources** — curated live in Phase 1 from Confluence / Office365 / internet, per the guided plan
- **A task they choose** in Phase 2 (drawn from the challenge, not a generic demo)
- **Their judgment** on Phase 3's "sharpened vs. longer" and Phase 4's proposed fixes
- **A real working question from their challenge** in the close — the hardest open decision they face, answered against their own memory

Nothing pre-built for any specific participant.

### Business-audience language

Student-facing body audited: no `embeddings`, `vector`, `RAG`, `retrieval` (tech sense), `pipeline`, `orchestration`, `schema`, `architecture`, `subagent`, `frontmatter`, `prompt engineering`, or `framework` (tech sense). "Plan mode" earned at first use ("turn on plan mode — Shift+Tab until the footer says plan mode"). "Custom agent" earned at first use ("an agent, at its simplest, is a markdown file: instructions the model reads at the start of every run — what this agent is for, and the rules it follows"). "Connectors" earned implicitly via the **+** button and Settings → Connectors reference. Trailing metadata below `<!-- maintainer -->` is exempt.

### Voice

Second person, builder, Seth/Rory/Risto flavor. Opening "A chat forgets. A memory remembers." No consultant-speak, no LLM-tell words.

### Length

**Target: 400–700 words.** Current student-facing body (above the `<!-- maintainer -->` cut): ~900 words. Slightly over target but justified — four phases + close + the added guided-curation step in Phase 1 earns the density. If the judge flags length, consider trimming Phase 1 preamble or the Phase 3 audit explanation.

### Specificity

Named phases, concrete prompts, real file paths (`sources/`, `memory/`, `agents/`, `memory/soft-pages.md`, `./challenge.md`), realistic challenge examples (pricing redesign, EU market entry, replatforming decision), named mechanics (plan mode, Shift+Tab, **+** button, Settings → Connectors).

---

## Auto-fail red flags check

- ❌ Framed as a "test" or "validation check" — NO; framed as building + iterating
- ❌ Student's artifact pre-built for them — NO; everything is their own work
- ❌ No time estimate — present (45 min)
- ❌ LLM-tell word — audit clean
- ❌ Toy data instead of participant's own — uses their live challenge
- ❌ Could run without the teaching moment — plan mode + Phase 3 audit + Close "put it to work" reinforce
- ❌ Unfamiliar artifact from thin air — scaffolded (brief, plan mode, default rules, starter CLAUDE.md)
- ❌ Mid-prompt `[BRACKET]` placeholder — audit clean
- ❌ More than one H1 — one
- ❌ `---` YAML frontmatter — no
- ❌ Unearned tech jargon — audit clean

---

## LLM-as-judge prompt

See the prompt at the bottom of `curriculum/evals/exercise.md`. Paste this instance's `## The judges` section + the target exercise file into the `[PASTE]` blocks.
