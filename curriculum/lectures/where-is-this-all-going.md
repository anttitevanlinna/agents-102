# Lecture: Where is this all going?

## Your agent can improve your agent

The eval loop rewrote a generation tactic from judge feedback while the judge stayed fixed. Point the same loop at one of your agents: its instructions, its skill, its checks.

The same loop can improve the agent that improves your agents, as long as the judge stays out of its reach. The SHA check in Module 6 was that rule.

## You described it; something else built it

The parts of an agent stay the same: context, a goal, tools, checks, a boundary, a loop. You decide each one. Your agent assembles them from your description.

Your agent is an agent too, so it sharpens its own tools. The tool that builds tools compounds.

[The parts hold; the model rotates](slides/parts-hold-model-rotates.md)

## Every improvement is learning that compounds

A fix one agent makes to another stays on disk once a check has measured it. The next agent starts from it, and so does the next model.

What multiplies your work is how fast you and your organisation learn. Agents that improve agents speed up that learning as far as a check measures it.

[Will your organisation learn faster than the model changes underneath it?](slides/learn-faster-than-the-model.md)

## A flywheel, not a graduation

Everyone wants their 100 agents. From here, a hundred agents is a matter of describing them, one gap at a time, each checked like the first.

Name your next gap. Describe the agent for it. Your agent builds it; you test it on your own work before it reaches anyone else's.

<!-- maintainer -->
**Decision note 2026-11-13 (Antti yes, after the teaching scores).** One thread: your agent improves your agent, each fix stays on disk, leverage = learning rate. Cut: `## Agents reading agents must cite`, `## Three walls past the laptop`, `## Which half of this is obsolete next year?`, `## What would change our mind?`. Students took those home instead of the Big Idea: stated cold 16 → 28 (lean scorer, n=24 each); putting the obsolete-next-year slide back fell to 19 (n=12). Citation stays taught in `joint-double-diamond.md`. Cost: story judge POV 38 → 28. Evidence: agents-102 `curriculum/evals/loops/rollout/pass-2/`.

**Meta:**
- **Time:** 4 minutes.
- **Role:** closer for Agents 101 Module 8 and for the training, after the proposal forum and before Debrief. Turns what the room just watched into the meta loop (your agent improves your agent) and leaves the door open to a hundred agents.
- **Mood target:** awe and forward hunger, never a tidy graduation. The flywheel beat is a turn, not a summary. No identity line, no certificate register (that beat is the sponsor's, spoken, per `agents-building-agents.md`).
- **Voice:** Boris-flat on what the room did; Risto-forward on the leverage and the hundred agents.

**Placement:** After `extend-your-system.md` and `joint-double-diamond.md`, before Debrief.

**Origin 2026-09-23:** new lecture from `a101-story-proposals/blend.md` § M8; slide set replaced 2026-11-13 (note above).

<!-- backing -->

Claims
- `your-agent-can-improve-your-agent` · vision · "Point the same loop at one of your agents: its instructions, its skill, its checks." ← none-owed
- `the-parts-hold-the-model-rotates` · vision · "The parts are stable … What the model can do with each part moves on the vendor's release schedule." ← none-owed
- `learning-rate-multiplies` · vision · "What multiplies your work is how fast you and your organisation learn." ← none-owed
- `two-curves` · vision · "The model gets better on its own … What your company knows about its own work gets better only when somebody writes it down and somebody else picks it up." ← none-owed

Sources
- none owed. Every claim on this page is a design stance of the training's own. The bitter-lesson question the module inherits is cited where it is taught, in `evals-as-steering.md`.

Frameworks
- Crux · what would have to be true · pre-mortem · [borrow:strategy] · law:none · ← cultural-vocab — named as portable moves in the module's Key Concepts; the lecture adds the fourth question and does not re-credit
- The full agent picture · [house] · law:none · ← none-owed — the refrain's last turn; the anatomy is named at M6 and turned here

Stance `[stance:2026-09-23 level:L2]`
- holds: that the assembly outlasts the model, and that an organisation's uptake rate is the binding constraint rather than model capability. Both are vision-grade positions, argued rather than evidenced.
- contested: whether the parts list stays stable through the next capability step. A model that plans, checks and bounds itself end to end would collapse several parts into one, and the lecture would then be teaching an anatomy the platform had absorbed.
- would-move-it: a shipped agent runtime where the boundary and the check are not authored by the operator at all.

OODA
- question: is the eight-part anatomy still the right decomposition, or has the platform swallowed parts of it?
- roster: Anthropic and OpenAI platform release notes, Ethan Mollick, Simon Willison, the agent-runtime vendors' default configurations
- last-run: none. Block authored 2026-09-23; the question has not been hunted from this file.

<!-- /backing -->
