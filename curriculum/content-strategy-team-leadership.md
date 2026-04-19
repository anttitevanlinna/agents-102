# Content Strategy — Agents 102 Team Leadership *(working name)*

Skeleton. Second training in the portfolio. Outline-level only.

## Positioning

**Lead agentic change by building with AI.**

The offer compressed: leadership (your actual job) × agentic (the specific wave, not AI-in-general) × building (hands-on, you go first, the demonstration IS the leadership). CTO hears "the scaling move." Team lead hears "I don't have to become a builder — I lead by building alongside, on my own team's real work, and leave with a plan."

## Audience

Team leads and mid-managers (engineering, marketing, sales, ops, HR, finance — function-agnostic). 5–50 reports.

**Assumption:** top management has done Bootstrap. Buyer has agent competence. Training doesn't re-teach it.

> TODO before detailed design: ground every module in `continuous-research/` — absorption bottleneck, compound triggers, conditions-creator role, experience-first adoption, cross-domain meta-patterns. The three heroes are the scaffolding; research supplies the evidence.

## Problem

Top management gets it. The team doesn't. Bottleneck = absorption at team scale. Some members shipped ten agents; some are still on ChatGPT weekly; some are sceptical. AI stays personal when the point was for it to become collective.

## Deliverable

Student leaves with **the agents and plan for change** — a one-page document their team will execute over the next 90 days.

## Two load-bearing insights

### 1. The three heroes

- **Kotter — the story arc.** The six modules ARE Kotter's 8 steps, compressed. M1 = urgency. M2 = urgency + short-term win setup. M3 = guiding coalition. M4 = vision + communicate. M5 = enable action + first win. M6 = sustain + institute. Kotter gives the training its shape end to end.
- **ADKAR — the lens on people.** Used inside each Kotter step: where is each person on Awareness / Desire / Knowledge / Ability / Reinforcement, and what do they need next?
- **Crossing the Chasm — the lens on practices.** Used inside each Kotter step to pick the right practice to push for. *Chatting = late majority. Custom GPTs = early majority. Agentic workflows = early adopters. Compounding engineering = innovators / early adopters.* Match what you push to where the team is.

### 2. AI-first is not static

The frontier keeps moving. *The future is already here, just not evenly distributed.* Today's compounding engineering is tomorrow's baseline. A team that crosses one chasm and stops has fallen behind the next one forming upstream. Goal is a team that **keeps crossing**, not one that arrives.

## Starting assumption for students

Chatting-level fluency. Not Bootstrap-level. Build a working system fast — like Bootstrap's early rhythm, but scoped to leadership work. Agent-making basics get sprinkled through M1–M3 as a tool, not the subject. **Evals stay out.** Depth comes from the leadership frameworks, not from agent craft.

## Six modules

M1–M3 = **set up.** M4–M6 = **let's lead** — student makes first moves WITH the guiding coalition during the training itself, not just designs them for later. Each M4–M6 module produces a rehearsed or executed leadership move, not only an artifact.

| # | Big idea | Mood | Artifact |
|---|---|---|---|
| M1 | Change is with people. Build an agentic team workshop that diagnoses team state + per-person ADKAR, reflect with agents + frameworks, produce an intervention backlog. | diagnostic honesty → naming the moves | **intervention backlog** (student-made agents generate it — TODO: sharpen mechanism) |
| M2 | Pick the process where a win by week 3 feels obvious AND the practice is one Chasm step from now. Input: the intervention backlog. | specific clarity | `first-move.md` |
| M3 | Co-build the agent with early adopters first — they become the guiding coalition. | co-creation | Actual agent files + named coalition |
| M4 | **Paint the vision with the coalition + communicate it.** Vision makes conditions obvious. Kotter step 3, missing until now. | let's lead — clarity of aim | `vision.md` (coalition-owned) + first communication move to broader team (rehearsed or done) |
| M5 | **Set conditions AND run the first visibility ritual with the coalition.** Rules of engagement + one ritual actually executed during training. | let's lead — first real move | `team-ai-rules.md` + one visibility ritual done once, not just scheduled |
| M6 | Read signals (including frontier-awareness) + commit the 90-day plan + schedule day-91 review. First cycle, not the only one. | let's lead — concrete commitment | `compounding-signals.md` + `agents-and-plan-for-change.md` (+ day-91 review scheduled) |

## Mood arc

**diagnostic honesty → specific clarity → co-creation → holding space → signal literacy → concrete commitment**

Flatter volatility than Bootstrap. Leadership work, not personal discovery. The drama is in the team's reaction, not the student's interior.

## Open design questions

- Name?
- Single day vs. distributed over 6 weeks (weekly cohort — real team reactions feed subsequent sessions)?
- Session runtime — same 1h45 as Bootstrap?
- Bootstrap as hard prerequisite?
- Scaffolds = templates, not agent code — confirm.

## What this training does NOT teach

- Personal agent craft (that's Bootstrap)
- Enterprise AI governance (that's a CIO conversation)
- Vendor/platform comparison
- How to "sell AI" to the team (wrong frame)
- Evals (out of scope for this training — depth comes from leadership frameworks, not agent craft)

## Preferences for next sessions (captured for continuity)

**Settled (don't re-open unless explicitly asked):**
- Three heroes: Kotter (arc), ADKAR (people lens), Crossing the Chasm (practice lens).
- Positioning line: *"Lead agentic change by building with AI."*
- Six modules. M1–M3 set up; M4–M6 are let's lead — student makes first moves WITH the coalition during the training itself.
- AI-first is not static. Frontier moves; training teaches a method, not a destination.
- Student assumption = chatting-level fluency. Agent basics sprinkled M1–M3 only where needed. No evals.
- Build a working system fast (Bootstrap rhythm, scoped to leadership work).
- M1 output = intervention backlog, generated with student-made agents.
- Visioning belongs in M4 (Kotter step 3, was missing).

**Open, awaiting decision:**
- Training name.
- Format: single-day intensive vs. distributed over 6 weeks (distributed lets real team reactions feed subsequent sessions — a strong fit for the "let's lead" M4–M6 span).
- Session runtime per module (Bootstrap canonical is 1h45; revisit if distributed format).
- Bootstrap as hard prerequisite vs. assumed-but-not-enforced.

**TODOs sharper than the skeleton:**
- **M1 agent-made intervention backlog — mechanism.** Student builds diagnostic agents that produce the backlog. What exactly does the student build? How much agent-craft is needed to get there from chatting-level? This is the highest-risk design question — if M1 doesn't work, M2–M6 have no fuel. Next session priority.
- **Visioning exercise (M4).** Kotter step 3, newly added. No design yet. How does the coalition co-draft a vision in the room, in 45–60 min, that holds up against a team?
- **"Let's lead" first-moves — what can realistically be DONE during training.** The coalition is not physically present for most of the training. Which moves can be rehearsed with partners in the room? Which require the student to break out mid-module and call/message a coalition member? Format decision is entangled with this.
- **Research grounding pass.** Before detailed module design, pull from `continuous-research/` — absorption bottleneck, compound triggers, conditions-creator role, experience-first adoption, cross-domain meta-patterns. Heroes are the scaffolding; research supplies the evidence.

**Bootstrap reuse candidates (for when detailed design starts):**
- Context is King (M1 Bootstrap lecture) → M3 co-build framing.
- Compounding (M2 Bootstrap lecture) → M6 compounding-signals framing.
- When to split an agent (M3 Bootstrap lecture) → M3 extension.
