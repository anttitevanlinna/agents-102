# APT101 full-training build plan

**Status:** design, not student-facing (2026-10-07). Built from the squint (`apt101-squint.md`), the Day 2 beat sheet (`apt101-day-2-beats.md`, v9) and Agents 101's exercises, per the strategy appendix's *Build next*. Maintainer brief (2026-10-07): "exercises can be built without expanding the prompts. Just placing pretty much the name of the prompt inline… reuse very much from a101. The prompt sequences there are tested and good. Sprinkle in PO-style: story map, outcome tree, hypothesis statement, …"

## Hidden spine (depth: ideas whose meaning changes)

The storyline is the strategy appendix's: *you were right all along, and now it is dangerous*. Depth comes from five threads, each planted, complicated and paid off across the days. Every edit protects them, and none is restated without a change in meaning.

1. **The digest.** Day 1: each of you sends an agent off with your own look-for line. Day 2: it comes back agreeing with your bet, and you find your own sentence that made it agree. Day 3: your own written criteria catch it (`team/caught.md`).
2. **The bet.** Day 1: written so it can lose. Day 2: chosen with evidence under it. Day 3: five users show the trio where its own certainty was wrong, and the call is persevere, pivot or stop.
3. **What each of us is for when building gets cheap.** Day 1: the box says what the product is for. Day 2: each role makes its own piece; the agent writes in your users' voice and someone has to catch it. Day 3: three jobs rewritten, and the team decides on Monday.
4. **The stance question.** *When models analyse wider, deeper and faster, what is your insight?* Planted Day 1, sharpened at the Day 2 turn ("it analysed everything and still had no insight"), answered Day 3 as real strategy work, asked again at the close and left open.
5. **The craft was a rationing device.** Day 1: the post-it was the craft on a budget. Day 2: a faster feature factory is still a feature factory. Day 3: slice by what you learn, because building is no longer the cost.

The guide (essays) stands beside the trio at the start, the turn and the close, and never takes the hero's place.

## Prompt convention

- **Reused Agents 101 prompt** → `{{prompt:<key>}}`, unchanged. The build expands it, and it carries its tested body and its `requires:`/`produces:` chain. Never edit an Agents 101 prompt to fit; frame it in the exercise prose instead ("your challenge is the bet you wrote this morning").
- **New prompt** → a named line, never a `{{prompt:}}` marker (strict build fails on an unknown key):
  `**Prompt** · \`apt101-d<N>-<slug>\` — <what it asks Claude to do, one line>`
  Bodies come in the next pass, once the beats survive evaluation (titles before bodies, prompts likewise).
- Agents 101 prompts keep their own paths (`module-5/`, `module-7/`, `judges/`). Known wrinkle: Day 2 writes into `module-5/` because the benchmark prompts say so. Rename at the prompt-body pass, not now.

## Delivery (pinned before any page)

Agents 101's model, for a trio:
- **Each person** runs Claude Code (or Cowork) on their own laptop, in their own training folder `~/Documents/apt101/`. Personal material, memory and agents live there. Exercises carry the same `rt-code` / `rt-cowork` spans as Agents 101.
- **The team folder:** a shared folder the trainer posts in chat (Agents 101 M8 pattern). Each person writes only to `team/<your-name>/`. Team artefacts (product box, bet, tree, chosen bet, story map, way of working) sit at the team folder root, written by whoever drives that beat; the exercise names the driver.
- One session per day per person: `**Session** *(new, "Day N - …")*` at the day's first exercise, `/rename apt101-day-N`.
- **The team board is Miro** (strategy: "runs on the customer's own Claude and Miro", "Miro-style group work part of the time, each person exploring in their own Claude chat the rest"). Group-made, visual artefacts live on one Miro board per team, one frame per beat, set up by the trainer: the product box sketch, the assumption map, the opportunity solution tree (sketched alone, then merged), the bet choice, the pre-mortem stickies and votes, the story map, the five-users wall. Claude reads the board and writes back to it through the Miro connector; if the company hasn't enabled it, a board screenshot or export goes into the chat instead. Text the agents must keep reading (memory, `bet.md`, the judge, `CLAUDE.md`, rules) stays in files. Rhythm per room beat: post-its on the board first, then Claude works on what the board holds, then the board again.
- **No governance taught.** Data is one plain door on Day 1: the team agrees what may go in before anything goes in. Day 2 v9 beat 5 (legal, GDPR, AI Act) is cut; its time goes to the made-up-claims benchmark.

## Artefact chain (the overnight digest is the thread)

Paths are in the student's training folder or the team folder, not this repo.

| Artefact | Made | Read |
|---|---|---|
| team/product-box.html | Day 1, product box | Day 1 bet; Day 3 five users |
| team/bet.md (outcome, hypothesis statements, assumption map) | Day 1, write the bet | Day 1 memory (`challenge.md` points at it); Day 2 outcome; Day 3 story map |
| team/what-goes-in.md | Day 1, the door | Day 1 memory curation; Day 2 digest read |
| ./challenge.md, sources/, memory/ (personal) | Day 1, product memory | Day 1 agent; every Day 2 prompt |
| agents/<job>.md, module-2/morning-agent/ | Day 1, send it off | The overnight digest, Day 2 opening |
| ./crux.md | Day 2, pick the outcome | Day 2 retrievers, benchmark |
| team/tree.md (opportunity solution tree, branches attributed) | Day 2, grow the tree | Day 2 choose the bet; Day 3 story map |
| judges/groundedness-judge.md | Day 2, catch it making things up | Day 3 what good means |
| team/chosen-bet.md, each role's piece in team/<name>/ | Day 2 afternoon | Day 3 slice, five users, way of working |
| ./CLAUDE.md (personal), team/team-rules.md | Day 1 close, sharpened Day 2 close | Every later run |
| team/story-map.md, the first slice | Day 3 | Day 3 five users |
| module-6/eval-notes.md, ./generation-tactic.md | Day 3, what good means | Day 3 close |
| team/five-users.md | Day 3 | Day 3 way of working |
| module-7/… → team/monday.md | Day 3, to the team | Monday |

## Exercise reuse map

| APT101 exercise | Day · beat | Agents 101 source | Reuse |
|---|---|---|---|
| `apt101-paint-the-product-box` | D1 · 2 | `personal-site-with-guardrails` (phases: boring baseline → framework → strengths → anti-mirror → look back → close) + `a101-m1-debrief-cold-critic` shape | **Shape only.** New prompts; Working Backwards box as the framework |
| `apt101-write-the-bet` | D1 · 3 | — | **New.** Outcome statement, hypothesis statements (*We believe… for… will result in… We'll know when…*), assumption map (desirable / viable / feasible × evidence) |
| `apt101-what-goes-in` | D1 · 4 | `name-your-challenge-1,-2` | **Keys** (`challenge.md` = the bet) + new door prompt |
| `apt101-build-your-product-memory` | D1 · 5 | `build-your-challenge-memory` | **Keys** 1–4, 7, 8 |
| `apt101-send-it-off` | D1 · 6 | `build-your-challenge-memory-5,-6`; `personal-agent-homework` 1–3; `a101-m2-debrief-claude-md` | **Keys** |
| `apt101-read-the-digest` | D2 · 1 | `personal-agent-homework` return | **New** (mark the line you trust least) |
| `apt101-pick-the-outcome` | D2 · 2 | `name-your-crux` 1–2 | **Keys** (crux → the outcome the tree hangs from) |
| `apt101-gather-the-evidence` | D2 · 3 | `three-retrievers-one-curator` 1–5 | **Keys**; one retriever per person, one curator |
| `apt101-grow-the-tree` | D2 · 4 | `three-minds-one-synthesis` 1/2, 3 | **Keys** for the role stances + **new** opportunity solution tree prompts (alone, then merged with attribution) |
| `apt101-catch-it-making-things-up` | D2 · 6 | `hallucination-bakeoff` 1–8 | **Keys**; the benchmark plants its own fabrications |
| `apt101-choose-the-bet` | D2 · 7 | — | **New** (prune branches with nothing behind them) |
| `apt101-make-your-piece` | D2 · 8 | — | **New**, three role tracks |
| `apt101-imagine-it-failed` | D2 · 9 | `share-your-work-6` (failure stories) | **Shape only** (pre-mortem on the bet) |
| `apt101-keep-and-run-tonight` | D2 · 11 | `a101-m5-debrief-groundedness-rules`; `personal-agent-homework-3` | **Keys** + new tonight's question |
| `apt101-map-the-story` | D3 · 2 | — | **New**: user story map (backbone, walking skeleton, slices by learning goal), first slice built |
| `apt101-write-what-good-means` | D3 · 3 | `eval-loop` 1, 2, 5 | **Keys** (fixed judge from Day 2; the digest regenerated against your criteria) |
| `apt101-five-users` | D3 · 4 | — | **New**: test script, five sessions, what they did vs what the digest said, persevere / pivot / stop |
| `apt101-take-it-to-the-team` | D3 · 5 | `share-your-work` 1–6 | **Shape only** (job, bottleneck, two plans, switch test, one failure story as named APT101 prompts on the same `module-7/` paths; the keys speak of one teammate) |

## Day 1: You were right all along

**You arrive with** your product, a laptop with Claude installed (prework), and a folder of your own material: interviews, tickets, analytics, retro notes. **By the evening** the three of you have a product box, one bet written as testable hypotheses, an agreement on what may go into the agents, a memory of your own material, and an agent that works overnight. **What you avoid:** handing the agents your guesses.

| # | Moment | What you make | You learn | Min | Taught |
|---|---|---|---|---|---|
| 1 | Open | Room question: the last thing your team built that nobody asked for | Together | 10 | Module |
| 2 | Building rationed the craft | — | Frame | 26 | Lectures *You knew the craft*, *Now building is cheap* |
| 3 | Paint the product box | A product box page for your product, five passes from generic to yours; a cold read | Creativity | 45 | *Start from your customer's sentence* before; *The agent knows only what you tell it* after |
| | Break | | | 15 | |
| 4 | Write the bet | Outcome, three hypothesis statements, an assumption map; the riskiest one marked | Together | 35 | *Your first bet* after |
| 5 | What goes in | The team's door: what may go into the agents, what stays out | Control, together | 15 | Module |
| | Lunch | | | 75 | |
| 6 | Build your product memory | Each of you: your own material, curated, ingested, built, the soft pages found | Control | 45 | *Your material is the moat* after |
| | Break | | | 15 | |
| 7 | Send it off | One agent for one recurring job; the overnight digest scheduled | Control | 35 | *Send it off* before |
| 8 | Close | Each of you writes your first `CLAUDE.md` from the day; Claude retros it; you push back | Control | 15 | Module |

## Day 3: Where your team goes next

**You arrive with** the chosen bet, each role's first piece, a judge that found invented claims, and a digest that ran overnight. **By the evening** you have sliced the bet by what you need to learn, written what good means and seen it catch the digest, put the first slice in front of five users, and drafted how your wider team could work with agents, as a proposal they decide. **What you avoid:** shipping the slice that tells you nothing.

| # | Moment | What you make | You learn | Min | Taught |
|---|---|---|---|---|---|
| 1 | What came back | The overnight digest against yesterday's chosen bet; one line you'd now cut | Control | 10 | Module |
| 2 | Map the story | A story map of the chosen bet; slices cut by what each one teaches; the first slice built | Creativity, together | 55 | *Slice by what you learn* before |
| | Break | | | 15 | |
| 3 | Write what good means | Your criteria as a fixed judge; the digest regenerated until it passes; what the criteria missed | Control | 45 | *What good means is yours to write* before |
| 4 | Five users | A test script; five short sessions with people from other teams; what they did that the digest never said; persevere, pivot or stop | Together | 50 | *Your bet meets five users* after |
| | Lunch | | | 75 | |
| 5 | Three jobs | — | | 15 | *Three jobs, rewritten* |
| 6 | Take it to the team | The job your wider team hires this way of working for; the bottleneck; technical and people plan; failure stories; `monday.md` | Together, transfer | 55 | *From the three of you to your team* after |
| | Break | | | 15 | |
| 7 | Close | Where you go from here; each says the bet, the first Monday move, and what they'd let an agent do | Together | 25 | *Where you go from here* |

## What the writers build

- **Module files** (`curriculum/trainings/agentic-product-teams-101/<day>.md`): module-shape template; lectures and exercises interleaved in beat order; Debrief, Key Concepts, Bring to Day N+1, Next. Days are modules; the existing lecture includes stay, reordered only where a beat needs it.
- **Exercise files** (`curriculum/exercises/apt101-*.md`): Agents 101 exercise shape (Time, Session, What you do, phases, prompts, maintainer block with Role, Frameworks, Artefacts produced/consumed).
- **No edits** to lectures, slides, Agents 101 exercises or prompts.

## Open

- **Miro connector, test live before the exercises promise it** (maintainer has a free Miro on the Google account; connector installed, sign-in via `/mcp` → claude.ai Miro). On a scratch board:
  1. Does Claude read stickies per frame, with the author of each?
  2. Does it write stickies and connectors back (a merged tree, a story map layout)?
  3. Does it read a vote, either the voting tool's results or dot stickies?
  4. Does it stay fast enough on a board with 60+ stickies to hold the room rhythm?

  The result decides whether Claude only reads the board or also writes to it, and becomes the platform fact in § Delivery.
