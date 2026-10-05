# Group Work Plan — agents in room-scale exercises

**Status:** v0.1 — 2026-10-01. Exploration, not design. Collects group exercise formats that put agents into a room working on a shared board. First carrier: the agentic PO / product-management training (strategy: `bosser-strategy:content-strategy-agentic-product-management.md`). Sibling of `theory-plan.md`, same role: one place the patterns gather until each finds its home in a module or a rule. Room rules already in force → `check_workshop.md` (core); nothing here amends it yet.

**Why this exists.** agents-102 prompts are solo-shaped: one person, one Claude session. The post-it-era PO training put 3–4 people on one group, one story, one wall, and that was what people loved. The question is how the room stays a room with an agent in it.

---

## The setup

- **Shared board** (Miro-class). Humans write by hand in the web UI. The board is the commons: parallel, loud, democratic.
- **Each person's own Claude chat** for exploring the material between and inside beats. Solo agents-102 prompts live here; they become the "me" of me-we-us.
- **Agents reach the board** through the connector: read frames, post candidates.
- **Runs on the customer's Claude and the customer's board tenant.** Their data governance covers the material; the students' own customer material is fine to use. Connector and IT plumbing are out of scope for the design.
- **Student's own material and challenges first**; synthetic material is the fallback (§ Evals).

## Patterns that emerged

1. **Agent feeds the edge, humans own the middle.** Maintainer's cut of the hypothesis beat: one person runs transcript → post-it candidates of 1–2 words, parked on the side of the board. Everyone looks, moves, rewrites, adds. Done. The word cap is the forcing function: a paragraph cannot be argued with, "board visibility" can. One agent call per beat, then hands.
2. **The agent's value is the catch nobody could make by hand.** Example: the pitch transcript repeats a promise twice that never made it onto the product box. A post-it session never sees that.
3. **Agents hold one job each.** Consensus keeper, grillers, jester (below). A role, not a personality.
4. **The agent knows the material; the room knows the company.** Politics, IT, sales, unions are not in any folder. Formats that ask "what's missing?" after the agent has shown its hand surface that knowledge.

## Format library

Each entry: the classic, why it always works, the agent version.

### Hypothesis statements (10 min)
Classic: Barry O'Reilly's *We believe [capability] will result in [outcome]. We will know we have succeeded when [signal].* Input: product box + 2-min pitch transcript. Board: two frames, empty templates.
Agent version: pattern 1 above. One person runs the transcript → 1–2 word candidates at the edge; the group fills the frames.

### Opportunity solution tree (45 min, me-we-us)
Classic: Torres. Outcome → opportunities → solutions.
Agent version (exploratory, maintainer sketch):
- 20 min personal: everyone builds their own map with their own Claude over the insight material.
- 20 min joint: one agent maintains the consensus map from the personal maps; humans own the edits.
- Then one or two **griller** agents (evidence: which branch has least behind it, which solution sits under no opportunity; customer voice from the interviews).
- A **jester** agent throughout: reads the board, posts one line, says what the room won't.
Risk to watch: a consensus mechanism buries the minority's find by default. The branch seen by 1 of 4 is often the real insight; the consensus map shows spread, not average.

### Pre-mortem (between tree and story map)
Classic: Gary Klein. "It failed a year from now. Why?" Permission to doubt without being the pessimist.
Why at this slot: confidence peaks right after the tree (IKEA effect), the story map is about to add detail that makes the choice feel real, and this is the last cheap moment to switch branches. It is also Torres's assumption-testing step in a friendlier form, and it hands the story map its slicing rule: the riskiest failure cause decides the first slice. Humility beat of the arc.
Agent version (maintainer): Claude serves repeated 3-item rankings, Kahoot-style (a live voting page as a Claude artifact works) → after a few rounds Claude asks "what has been missing?" → crunch: ranking + vote spread + student-added causes marked → **laptops shut, plain conversation** on the top cause and the most split one.

### Story mapping
Classic: Jeff Patton. Backbone, walking skeleton, release slices.
Agent version: map 80% pre-populated from the box, hypotheses, tree and pre-mortem. Students do all four moves (maintainer: not a pick-one):
1. find the missing 20% (deliberately absent awkward steps);
2. slice: the thinnest slice that tests the riskiest hypothesis;
3. walk it: a customer persona from the insights walks the backbone and stumbles where the map is thin;
4. build the slice: someone's Claude builds it as a clickable prototype while the group keeps mapping.
Move 4 is the agentic shift: Patton slices by effort because building was expensive; when building is cheap, you slice by what you learn.

### Gallery walk
Classic: groups rotate through each other's boards, add challenges and steals.
Agent version: easy with Miro. A single agent can synthesize across all boards.

### Also always works (not yet placed)
- **1-2-4-All** (Liberating Structures) — covered by me-we-us.
- **TRIZ** (Liberating Structures) — "how would we guarantee the worst outcome?" then "which are we doing already?"

## Three-day sketch: fused with Agents 101

Design sketch, not settled. The fusion bets and mood alignment live in the strategy doc; this is one way the days could fall.

**Day 1: Our product, our system** (pride, joy, compounding)
- Vision: physical product box + pitch. Then Agents 101 M1's move: Claude writes the press release from the transcript, generic vs grounded in their context; they catch it inventing facts about the product they know best.
- Hypotheses: transcript → candidates at the edge.
- Insight memory (A101 M2): each person wires one source (tickets, interviews, docs, analytics) into one shared memory. Group owns the system, each person owns a part.
- Out the door: overnight synthesis scheduled.

**Day 2: What's actually true?** (unease, rescue, humility)
- Overnight digest waiting.
- Retrieval + opportunity tree (A101 M3): retrievers + curator over the evidence, then me-we-us tree. The three deciders grill; jester stays.
- Grounding (A101 M5): every branch cites its evidence; hunt the fabricated opportunity.
- Skills + security (A101 M4), compressed: one personal skill each, e.g. a hypothesis-statement checker; customer data through agents in plain terms, GDPR and the EU AI Act included: what may go in, what stays out, who decides. Weakest fit; the data question is the candidate angle.
- Pre-mortem: ranking rounds → what's missing → laptops shut.

**Day 3: Learn faster than the market** (leverage, rhythm, awe)
- Evals (A101 M6): groups write their own criteria and run them over Days 1–2.
- Story map + build the slice: the flywheel moment, an agent builds what the agents helped decide.
- Test the slice; read the "we will know when" signal.
- Personal to team (A101 M7): a proposal for the rest of the team to decide on: who keeps the insight memory, what the weekly rhythm is.
- Close (A101 M8 mood): what is each of us for, the product owner, the designer and the team lead, when building gets cheap?

## Evals

The students' work is evaluated against the training's own principles: outcome first, feedback drives, early to market. Two kinds:
- **Principle evals** check the shape of reasoning: every slice traces to an outcome, the signal can come back negative, each opportunity has evidence under it, the slice names who it is for. Domain-blind, so they work on students' own material, including domains Claude does not know.
- **Ground-truth evals** check whether a planted insight was found. Synthetic material only.

Evals that fire during the work, not only at the end, are the principle enacted: the training that preaches feedback loops runs one. Goodhart is the debrief's gift: some group will optimise for the score, which is the feature factory again with a dashboard.

## Open

- Who hosts the room-level agents (consensus, grillers, jester): a group member each, or the trainer.
- Jester cadence, and whether the room can silence it.
- Four Claudes converge on the same sensible answer: variety has to be designed in (lenses, roles, sources).
- Whoever asks Claude to read the board quietly holds the pen.
