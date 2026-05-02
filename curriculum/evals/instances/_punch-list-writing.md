# Writing-class punch list — 32 files

**17 PASS** · **1 PASS-with-todos** · **14 REVISE**  (29 blocking findings, 13 TODOs across all files; 6 false positives stripped by post-filter)


## REVISE (14)

### audit-your-agent — 1 blocking, 0 TODOs
- [BLOCK] **check_prompts.md#2** — Every prompt block gets a one-sentence action lead-in.
  - line 19: "The CLI auto-loads standalone skills under..." — this is explanation, not action lead-in. Should name what the prompt does in one sentence.
  - **fix:** Before the **Prompt** label on line 19, add: "Install the authored skill as a standalone CLI tool by copying it to `~/.claude/skills/`."; before line 56, lead-in is already present and correct ("Ask C


### debugging-stuck-agents — 1 blocking, 1 TODOs
- [todo] **check_writing.md#6.3** — Author-we ban — first-person-plural extension
  - line 36: "The habit is simple: prompt for diagnosis before repair." Reads as author-we ("we teach this habit") masked as universal truth.
  - **fix:** Recast to second-person: "The habit is simple: you prompt for diagnosis before repair." Or: "Start with diagnosis before repair—that's the habit."

- [BLOCK] **check_writing.md#13** — Value-prop / positioning framing belongs in sales copy + strategy docs, NOT stud
  - lines 5-7: "Do not start by tracing everything by hand. / Start by prompting the system." The negation-callout (agent-over-manual) is positioning-defense (why agents work better) leaking into the teac
  - **fix:** Drop the negation-callout framing. Lead with pure practice: "Start by prompting the system to find the root cause. First, ask Claude whether the failure is mainly a source problem, a processing proble


### eval-loop — 2 blocking, 1 TODOs
- [BLOCK] **check_writing#14** — Watch out for planting jargon too early
  - line 11: 'generation and judging happen in separate subagents' introduces term without one-breath primer. Same at line 39. Subagent is a Claude Code primitive not yet earned in module body.
  - **fix:** Either (a) add one-breath primer on first use at line 11 — 'subagents are isolated Claude sessions that let multiple processes run in parallel' — then use the real term, or (b) use plain language 'sep

- [BLOCK] **check_student_facing#2** — Earn every technical term on first use
  - line 11: 'subagents' appears in body prose without a one-breath primer tied to what the student just did or is about to do
  - **fix:** Provide a single-sentence earn before line 11: 'Subagents are isolated execution contexts within Claude Code — each one gets fresh context for a specific task.' Then introduce the term.

- [todo] **check_prompts#25** — Subagent use — explain why after the prompt
  - lines 41–81 (.rt-code) and 82–122 (.rt-cowork) prompt blocks use 'subagent'/'agent' but no explanation follows (at line 124+) of why the separation matters pedagogically or mechanically
  - **fix:** After line 122 (before line 124), add one sentence: 'Subagents keep the generator and judge isolated — each gets fresh context and neither can see the other working, so the judge can't be biased by th


### module-2-prework — 3 blocking, 0 TODOs
- [BLOCK] **check_writing.md#8** — Don't smuggle terms of art from maintainer into body
  - 23:23 | 'In Claude Code Desktop, click the **+** next to the prompt, then **Settings → Connectors**. In Cowork, open **Customize → Connectors**. Look for Microsoft 365, Google Workspace, Confluence, S
  - **fix:** Add one-breath primer on first use: 'Look for **connectors** — connections to places where your work lives (Microsoft 365, Google Workspace, Confluence, SharePoint, OneDrive, Google Drive, or the syst

- [BLOCK] **check_writing.md#14** — Watch out for planting jargon too early
  - 23:23 | 'Connector' appears in UI path ('Settings → Connectors') before functional context establishes what a connector IS. Student at prework stage does not yet have Claude Code opened; the term land
  - **fix:** Earn the term one breath before naming the UI path: 'Look for **connectors** — connections to places where your work lives (Microsoft 365, Google Workspace, Confluence, SharePoint, OneDrive, Google Dr

- [BLOCK] **check_student_facing.md#2** — Earn every technical term on first use
  - 23:23 | 'Connector' used as UI label and path reference before earning
  - **fix:** See check_writing.md rule 14 fix above — same violation.


### module-3-prework — 1 blocking, 0 TODOs
- [BLOCK] **check_writing.md#14** — Watch out for planting jargon too early.
  - line 9: "Claude Code and OpenClaw" appear in prework opener without operational primers. Parenthetical defines relationship, not operation. Student hasn't seen either tool run yet.
  - **fix:** Add one sentence explaining operationally what Claude Code and OpenClaw each DO (not what they are) before naming them in the list context at line 11. Example: 'Claude Code is Anthropic's official age


### module-4-prework — 4 blocking, 1 TODOs
- [BLOCK] **check_writing.md#4** — Register match — Bootstrap voice trio (Godin × Sutherland × Siilasmaa)
  - line 13: "In Cowork, you create one by going to *Customize* → *Skills* → *New* → *Create with Claude*. In Claude Code, the same shape is a `SKILL.md` under `~/.claude/skills/<name>/`."
  - **fix:** Move runtime-specific UI details to maintainer block; teaching stays to the concept (personal skills are author-able in both runtimes). Remove the "same shape" equivalence framing that defensively com

- [BLOCK] **check_writing.md#8** — Don't smuggle terms of art from maintainer into body
  - line 18: "**The check carries the expertise you fed it, and you author it.**" — structural framing with "compounding" concept not yet operationally earned in student-facing body at prework stage.
  - **fix:** Replace "compounding" framing with plain operational language: "The check carries the expertise you fed it; you write the logic." Or move the structural concept-framing to maintainer notes until M2 wh

- [todo] **check_writing.md#9** — Over-hedge detector — cut reassurance-shaped sentences
  - line 15: "Not a separate model. Not magic. Not something you install per-seat."
  - **fix:** Cut the reassurance. Replace with operational statement: "You author one in your runtime, and it loads when the same kind of work appears again." The structural framing (personal + reusable) carries t

- [BLOCK] **check_writing.md#13** — Value-prop / positioning framing belongs in sales copy + strategy docs, NOT in s
  - line 13: runtime-equivalence framing (defending Cowork parity with Claude Code) is positioning/marketing-shaped, not teaching-shaped. Reads as answering an objection (are these runtimes equivalent?) r
  - **fix:** Move UI paths and runtime comparison to maintainer notes or training-architecture docs. Body teaches the concept (personal skills = author-able, reusable expertise); maintainer context specifies where

- [BLOCK] **check_student_facing.md#2** — Earn every technical term on first use
  - line 29: "Non-deterministic behaviour. The same prompt, the same files, the same tools can produce different outputs on different runs." — term lands cold; context explains but does not earn operation
  - **fix:** Earn in one breath before the abstract word. Replace: "The agent can produce different outputs from the same input — same prompt, same files, same tools, different results on different runs. This vari


### multi-agent-systems — 2 blocking, 1 TODOs
- [BLOCK] **check_writing.md#1** — Banned words — grep zero-tolerance.
  - 64:Add an agent to solve a crucial dependency?
  - **fix:** Replace 'crucial' with 'critical' or drop the adjective ('a dependency').

- [todo] **check_student_facing.md#3** — No narrating the student's past or present state.
  - 21:Last module you were the librarian.
  - **fix:** Rephrase to remove identity/state narration. Example: 'Last module, the librarian role was yours.' or shift to artifact-focus.

- [BLOCK] **check_student_facing.md#14** — No em-dashes. Simple sentences.
  - 39:Different shapes, different territories — the lecture draws the line. | 41:different angle — harder to do well in one head, in one pass.
  - **fix:** Replace em-dashes with periods. Line 39: 'Different shapes, different territories. The lecture draws the line.' | Line 41: 'different angle. Harder to do well in one head, in one pass.'


### name-your-challenge — 2 blocking, 1 TODOs
- [BLOCK] **check_prompts.md#2** — Every prompt block gets a one-sentence action lead-in.
  - Line 37: `**Prompt** *(Claude Code)*` — no lead-in before label. Line 56: `**Prompt** *(Claude Code)*` — no lead-in before label. check_prompts.md §2 requires a lead-in under 20 words with a command v
  - **fix:** Prompt 1 (before line 37): Add `Ask Claude to help you clarify your challenge by asking three focusing questions, then write a summary brief.` or similar. Prompt 2 (before line 56): Add `Ask Claude to

- [todo] **check_student_facing.md#14** — No em-dashes. Simple sentences.
  - Lines 42, 44, 63 (in fences — PASS); Lines 82, 85, 86, 90, 93, 94, 98 (in maintainer — PASS). However, lines 18, 19, 20, 21, 22, 24, 31 contain em-dashes in student-facing body. Line 18: `'The pricing
  - **fix:** In the 'Good' list (lines 18–24), convert em-dash separations to periods: 'The pricing redesign we're shipping in Q2. Usage-based vs. seats, the pilot cohort, and how we brief the sales org.'

- [BLOCK] **check_prompts.md#3** — Canonical presentation shape — lead-in, label with destination, blank line, fenc
  - Both prompts are missing the lead-in. Lines 37 and 56 jump directly to `**Prompt** *(Claude Code)*` without a prior sentence.
  - **fix:** Add one-sentence lead-in before each prompt (see Rule 2 fix above).


### name-your-crux — 1 blocking, 0 TODOs
- [BLOCK] **check_prompts#23** — Artifact destinations are explicit subpaths, never naked filenames (Bootstrap-sp
  - 21:Save it to ./crux.md / 36:Append a `## Question` section to ./crux.md
  - **fix:** Line 21 and 36 should use module-3/crux.md (or equivalent module-N/ per Bootstrap directory structure). Naked filenames let Claude infer root location; structured tree requires explicit path prefix.


### output-quality — 5 blocking, 2 TODOs
- [BLOCK] **check_writing.md#13** — Value-prop / positioning framing belongs in sales copy + project-level strategy 
  - 38: 'The scoreboard IS the explanation.' — positions scoreboard as defense against vendor narrative; reads defensive. 41: 'Magic that you can point at' — defensive against 'black-box' vendor critique.
  - **fix:** Reframe Key Concepts as emergent learning, not defensive positioning. Lead with what the student understands: 'Benchmarking teaches you how to evaluate evaluators—a move you'll use for every future qu

- [BLOCK] **check_writing.md#33** — Author-"we" ban — first-person-plural extension
  - 45: 'Today we measure what the system actually says inside its scope.'
  - **fix:** Recast as second-person or module-as-subject: 'In this module, measure what the system actually says inside its scope.' Or: 'The module measures what the system actually says.' Removes author-we.

- [BLOCK] **check_writing.md#14** — Watch out for planting jargon too early
  - 9: 'Agent-sprawl reading from Module 4 covered shadow agents' — terms appear without earning. 28: 'four detectors' appear before explaining what detection is. 36: 'Benchmarking as a pattern' — jargon 
  - **fix:** Earn jargon on first use: 'Module 4 reading covered how multiple uncoordinated agents (agent-sprawl) create visibility gaps. Now you measure which detection method works for your output.' Or move jarg

- [BLOCK] **check_student_facing.md#2** — Earn every technical term on first use
  - 16: 'synthesized judge file' appears without one-breath primer. 21: 'judge' appears 2x before earning. 40: 'judge file' at Key Concepts line 40 — still unearned. Line 40 is in body above fence.
  - **fix:** On line 15 or 16, add primer before first use of 'judge': 'and save the winning detector method as a reusable file — a judge that names what it catches and what it can't reach.' Then the term is earne

- [todo] **check_student_facing.md#3** — No narrating the student's past or present state
  - 23: 'Your Module 4 residuals stay named, not solved' — presumes the student has Module 4 residuals and is aware of them. Patronizing narration of assumed student state. 22: 'You'd stake your reputatio
  - **fix:** Recast as module-state or artifact-state, not student-state: 'Module 3's claims vary in strength. Module 4's residuals stay named, not solved — that's orthogonal to groundedness.' Removes presumption 

- [BLOCK] **check_prompts.md#2** — Every prompt block gets a one-sentence action lead-in
  - Line 48 ('Prompt' label) precedes the fenced block at line 50, but the semantic lead-in (lines 47-49) is buried in narrative prose. Should be: one short sentence with command verb BEFORE the **Prompt*
  - **fix:** Add explicit one-sentence lead-in before line 48: 'Ask Claude to review the session and update `./CLAUDE.md` with groundedness operating rules.' Then blank line, then **Prompt** label. Current structu

- [todo] **check_strategy_tie_in.md#1** — Mood contract named
  - 3-42: Big Idea and body do not explicitly name the emotional endpoint. Mood ('mechanical rescue, not triumph') lives only in maintainer block (lines 112-116), not visible to student.
  - **fix:** Body must name what state the student leaves in. Add to Big Idea or opening: 'You walk out with the first judge you can defend — not magic, just measured' or similar. Mood lives in student-visible pro


### personal-agent-homework — 4 blocking, 0 TODOs
- [BLOCK] **check_student_facing#22** — No time-of-day anchors in body prose
  - 87:One glance each morning for a week — 'morning' is time-of-day anchor
  - **fix:** Replace 'One glance each morning for a week' with 'One observation per run, over a week' or 'Watch the output for one week, one check per run'

- [BLOCK] **check_prompts#3** — Canonical presentation shape — lead-in, label with destination, blank line, fenc
  - 28:Prompt label missing destination chip: **Prompt** ← should be **Prompt** *(Claude Code)*; same at lines 43 and 63
  - **fix:** Add *(Claude Code)* parenthetical after each **Prompt** label (lines 29, 44, 64)

- [BLOCK] **check_prompts#9** — Markdown shout inside fenced prompt blocks is dead weight
  - 30:**+** (bold asterisks in fence — renders literal); 31:**Settings → Connectors** (bold in fence); 45:**Schedule** (bold in fence); 49:**- Morning plan** / **- Daily risk** / **- Draft today's** (bol
  - **fix:** Remove **bold** markup inside all three fenced blocks — use plain text or bullets only. Lines 30-31, 44-48: unmark everything from ``` to ```.

- [BLOCK] **check_prompts#15** — Question-dump default — in turn is too soft for one-at-a-time rhythm
  - 46-48:Three questions listed sequentially ('1. Which job', '2. What should', '3. What must'); prompt reads 'ask one at a time' nowhere, allowing Claude to batch-dump all three
  - **fix:** Inside the prompt at lines 46-51, add explicit one-at-a-time phrasing: 'Ask me one question, wait for my answer, then ask the next. Do not show me the question list.' Also remove the leading numbered 


### three-minds-one-synthesis — 1 blocking, 2 TODOs
- [todo] **check_writing.md#8** — Don't smuggle terms of art from maintainer into body
  - line 5: 'strategy framework' used in body without earning it in prior modules; context is that the student has just completed Module 3 exercises, but 'Rumelt's strategy kernel' appears first time mid-
  - **fix:** Line 13 (body prose before first fence) — add one-breath earning: 'applies a framework like Rumelt's strategy kernel (diagnosis + guiding policy + coherent actions)' OR move the earned landing into th

- [BLOCK] **check_student_facing.md#2** — Earn every technical term on first use
  - line 13: 'Rumelt's strategy kernel' named without a one-breath primer. The term appears for the first time here and continues into the fence without body-context earning
  - **fix:** Predecessor sentence (line 13) should anchor it: 'applies a strategy framework — Rumelt's three-part kernel of diagnosis, guiding policy, and coherent actions — inline.' Then the prompt can reference 

- [todo] **check_prompts.md#2** — Every prompt block gets a one-sentence action lead-in
  - line 29: '**Prompt** *(Claude Code)*' has no semantic action lead-in. Prose at lines 14-13 describes the overall move, but no single sentence immediately precedes the fence summarizing 'Ask Claude to 
  - **fix:** Add before line 29: 'Ask Claude to spawn three subagents, each with a different strategic stance, and synthesize their notes into a coherent answer.' (or similar one-liner under 20 words)


### three-retrievers-one-curator — 1 blocking, 0 TODOs
- [BLOCK] **check_prompts.md#2** — Every prompt block gets a one-sentence action lead-in
  - line:45|Session 1 prompt lacks lead-in (label appears at line 45 without preceding semantic sentence); line:66|Session 2 prompt; line:87|Session 3 prompt; line:109|'Push another round' prompt has lead
  - **fix:** Add one-sentence action lead-in before each prompt's **Prompt** label. Example: 'Ask Claude to propose wiki search terms, wait for your edits, then search and extract findings.' (20 words max, command


### when-to-split-an-agent — 1 blocking, 0 TODOs
- [BLOCK] **check_student_facing.md#2** — Earn every technical term on first use
  - 19:A Confluence retriever can't pretend to be a web search|21:A backward planner and a reframer
  - **fix:** Line 19: 'retriever' is jargon without a primer. Replace 'A Confluence retriever' with 'A connector that searches Confluence' or 'A tool that reads Confluence.' Line 21: 'reframer' is an agent stance 



## PASS-with-todos (1)

### grounded — 4 TODOs
- check_student_facing.md#2 — Earn every technical term on first use. :: line 59: '**Source triangulation.**' — term appears with no earned primer. The compendium requires 'one-breath primer tied to what the student just did,' followed by the real word. Currently drops 'tr
- check_student_facing.md#2 — Earn every technical term on first use. :: line 61: '**Entailment.**' — same issue, dropped cold. No primer. 'Entailment' is a linguistics term the student hasn't encountered.
- check_student_facing.md#2 — Earn every technical term on first use. :: line 63: '**Citation integrity.**' — same pattern. Dropped cold. No primer.
- check_student_facing.md#2 — Earn every technical term on first use. :: line 65: '**Counter-evidence search.**' — same issue. Dropped cold.


## PASS (17)

- agent-loop-raw
- agent-that-takes-action
- agent-trigger-list
- author-security-skill
- build-your-challenge-memory
- building-agent-systems
- compounding
- evals-as-steering
- evaluations
- first-scheduled-agent
- hallucination-bakeoff
- module-5-prework
- new-human-role-in-the-loop
- practice-of-risk
- security
- self-consistency-after-scoreboard
- what-is-an-agent
