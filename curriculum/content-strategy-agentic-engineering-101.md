# Content Strategy — Agentic Engineering 101 *(working name)*

Skeleton. Third training in the portfolio. Outline-level only. Brief captured 2026-04-20; pair-training of Engineering Management.

## Positioning

**From chat to L3 — the software engineer's path through the agentic transformation.**

*"Most engineers are stuck at L1 because the path to L3 isn't documented, it's practiced. This training is the path."*

Most "Claude Code for engineers" material ships students to L1 (custom GPTs, plan mode, CLAUDE.md) and stops — because that's what Anthropic's docs already cover. This training is the full climb to L3 (systems builders, force multipliers who build the infrastructure that levels up the team). It ends where the commodity stops.

## Audience

Software engineers, individual contributors. 1–8 years experience. They write code for a living and already chat with Claude weekly. Adjacent fits: platform / data / ML engineers operating in the same world. Not for managers (that's Engineering Management). Not for non-engineers (that's a future variant or Bootstrap).

**Baseline:** chatting-level fluency with LLMs. Some will have dabbled in Claude Code; many will have used Copilot or Cursor. Terminal-comfortable. CLAUDE.md, skills, MCP, scheduled agents are foreign but not scary.

**Why narrow to software engineers:** the L3 path is most legible and most validated here. Intercom and Ramp both published evidence from software-engineering teams specifically. Coding agents are the meta-platform; software ICs are the population already touching the substrate. Start where the ladder is cleanest; adjacent variants later.

## The correlation at the heart of the training

**Theory × codebase-knowledge = durable leverage.** We supply the theory and the agents. The engineer supplies the codebase knowledge — *"here's what my system is really like, what's brittle, what pattern nobody's documented, what convention this team actually follows."* Agents amplify the multiplication.

Generic Claude Code usage without codebase knowledge = generic output that gets reviewed harshly. Codebase knowledge without structured agent practice = expertise that doesn't compound. Both + agents = L3 velocity.

**Dorsey's question at IC scale:** *what does your understanding of this codebase gain every day?* The brain is where it compounds.

## The student's journey — structural muscle, not syntax mastery

Students leave with *muscle*, not with recall. Muscle = structural practice that keeps paying off as the stack moves. Syntax mastery decays in weeks; muscle compounds over years.

**Beliefs the training forms:**

- *My brain is my edge — not my keystrokes.*
- *Mastery isn't knowledge; it's structural practice that stays current as the frontier moves.*
- *Agents that build agents is the L3 identity.*
- *Quality is infrastructure, not craft heroics.*
- *Half my agentic bets will miss. That's the curriculum.*
- *Frontier awareness is a daily habit, not a quarterly update.*

**The Rory:** most engineering training sells syntax and framework checklists. Ours sells a practice that compounds for years. The syntax we teach will be obsolete by the training's second cohort; the practice won't.

## The backbone — the brain (three blocks + swarm), IC-scope

Same Bootstrap / Engineering Management backbone, ported to IC scale. See `content-strategy-engineering-management.md` § "The Backbone — The Brain" for the parent description.

**At IC scale:**

- **Block 1 — Codebase Knowledge Architecture.** Tiered store of what the engineer knows about THIS codebase. Observations (raw — "the queue handler retries silently on deploy") → hypotheses ("deploy coincides with retry storms; worth measuring") → rules ("the queue handler requires a drain step before deploys"). Promoted when confirmed, demoted when contradicted. Domain folders: subsystems, failure modes, team conventions, personal patterns.
- **Block 2 — Decision Journal.** Every meaningful technical decision logged with forced alternatives. Architecture picks, library choices, pattern selections, refactor scope. Claude searches prior decisions before proposing new ones — no re-debating settled choices.
- **Block 3 — Quality Gate.** Project-specific testable criteria for code the engineer ships. Evolves weekly: catches promote to automatic gates, never-triggered checks get pruned. Sharpens around actual failure modes, not theoretical ones.
- **Swarm.** Diagnostic agent (reads codebase, surfaces patterns); gate-watcher (monitors PR quality); frontier-scanner (surfaces relevant practitioner signal weekly); skills-builder (packages workflows as reusable skills for the team marketplace). All scheduled, all compounding.

## Six modules — the L0 → L3 ladder made walkable

Shape, not settled detail. Exercises designed case-by-case, agentic, chat-and-save banned.

| # | Move | Mood | Ladder step | Artifact (direction) |
|---|---|---|---|---|
| M1 | **Ship real work with agents.** Plan mode + CLAUDE.md + their actual PR queue. Build one working thing in the session. First agents scheduled. | joyful creation — *"it works, and it's on my repo"* | L0 → L1 | One shipped PR driven through Claude Code + brain installed + weekly scan agent scheduled |
| M2 | **Build your brain for your codebase.** Three blocks populated with real codebase observations. Skills for recurring personal workflows. Sources curated. | satisfied compounding — *"it reads my system now"* | L1 → L1.5 | Populated brain + 3–5 personal skills + codebase-reader agent scheduled |
| M3 | **Orchestrate, don't type.** Multi-agent execution on a real task — subagents + orchestrator. Read trajectory, not lines. First "close your laptop, agents kept working" experience. | unleashed leverage — *"I'm directing, not typing"* | L1.5 → L2 | Real task shipped via orchestration + subagent pattern in the brain's skill library |
| M4 | **Evals as infrastructure.** Auto-review for low-risk PRs; tiered verification for the rest. Absorption bottleneck named and fixed at the PR level. Judge agents ported in. | honest rescue — *"the review queue is a system, not a grind"* | L2 ship | Tiered review setup on their actual PR workflow + gate-watcher agent live |
| M5 | **Build agents that build agents.** Contribute to the team skills marketplace (if it exists) or bootstrap one. MCP server for a team-specific capability. Meta-agents that generate others. | generous compound — *"my skill just shipped to everyone"* | L2 → L3 | At least one skill contributed to the team repo + one meta-agent pattern live |
| M6 | **Stay at the frontier.** Personal practice for L3 durability: reading rhythm, skills-update cadence, public work, cohort cross-pollination. Self-assessment + day-91 review scheduled. | mastery as generative hunger — *"I want the next move"* | L3 durable | Frontier-scanner running + day-91 reflection agent scheduled + personal public artifact shipped |

**Agentic walk-away test:** by M3 onward, student closes the laptop and finds the agents still working. If every artifact requires typing, the exercise failed the rule.

## Mood arc

**joyful creation → satisfied compounding → unleashed leverage → honest rescue → generous compound → mastery-as-hunger-for-next**

Closer to Bootstrap's arc than Engineering Management's. This is still personal discovery — the engineer experiencing their own capability multiplication. Leadership drama is absent here; the drama is in the engineer's own interior (am I still keeping up?) and the team's infrastructure (is our floor rising?).

## Self-assessment metric

> **Rate 1–10: your confidence operating as an L3 agentic engineer — someone who builds infrastructure that levels up the team.**

Same structure as Engineering Management: M1 start, M6 end, day-91.

**Target movement:**

- **Start avg:** ~2–4 (L0 / early L1 — they chat, maybe dabble with Claude Code; they don't build infrastructure yet)
- **End avg:** ~5–7 (L2 ship / L3 emerging — they've shipped real work via orchestration, contributed a skill, set up review infrastructure)
- **Day-91 avg:** should hold or climb; L3 durability is the bet

Delta target ~+3. Bigger than Engineering Management's +2 because the ladder here has more rungs to climb. Aggregate delta across single-company cohort = sponsor's finding.

## Two tracks

Same shape as Engineering Management:

- **Track 1 — Personal IC capability.** M1–M6 arc. The brain populates with codebase specifics. Runs with conviction; half miss; learns what works on this codebase.
- **Track 2 — Frontier muscle.** Parallel. Reading Karpathy, Willison, Huryn, Cherny, Sottiaux and whoever's shipping this quarter. Cohort cross-share. Frontier-scanner agent. Brain's frontier tier alongside codebase tier. Why the brain doesn't decay after day 91.

## Pair with Engineering Management

These two trainings are designed to pincer the transformation:

- **Manager takes Engineering Management** → leads with conditions-creator practice, brain + swarm at team scale, Intercom/Ramp playbook.
- **Team takes Agentic Engineering 101** → engineers level up from L0/L1 toward L3 on the ladder the manager is creating conditions for.
- **Together:** single-company cohort generates aggregate L0→L2/L3 movement as the sponsor's finding. Manager's conditions × engineers' capability = compounding transformation velocity.

**Design assumption (to verify):** 101 works best when the manager has done EM first or is doing it in parallel. Possible: M1 of 101 includes a "does your manager know what you're about to build?" moment — if the team has the team-2x infrastructure already, ride it; if not, M5 includes bootstrapping it.

## Hard exclusions

- Chatting basics (baseline, not content — Ramp L0 doesn't survive this training)
- Plan mode as central content (it's M1's first 15 minutes)
- Basic context management as the training's main subject (M1/M2 move past it fast)
- ML engineering (model training, fine-tuning) — out of scope
- Non-software-engineering domains — future variants
- Leading change at team scale — that's Engineering Management
- Vendor/platform comparison — Claude Code is the substrate

## Anchor cases (research-grounded)

Same set as Engineering Management; different lens:

- **Intercom R&D 2x** (`observations/intercom.md` Side A) — M4 (93.6% Agent-driven PRs, 19.2% auto-approved), M5 (team-2x plugin repo: 267 skills, 31% R&D contributing), M6 (top 5% = 6× median as L3 destination chart).
- **Ramp AI-pilled** (`observations/ramp.md`) — M1 (L0–L3 ladder as diagnostic), M5 (Glass + Dojo as contribution targets), cost-posture (leverage over tokens) as cultural frame.
- **Block Hierarchy→Intelligence** (`observations/block.md`) — pressure-test at M6 (what does an L3 engineer's role become when the hierarchy thins?).
- **Huryn three blocks** (`insights.md`) — the brain structure, direct import from Bootstrap M2 lineage.
- **Cross-cutting:** `coding-agent-as-general-platform`, `absorption-bottleneck` (M4 named it), `conditions-creator` (M5 lives it from IC side), `rules-verification-scarcity` (M4 meta-pattern).

## Preferences for next sessions (captured for continuity)

**Settled (opening bids from this session's brief — validate with Antti before treating as commitments):**

- Positioning: *"From chat to L3."* Placeholder name: Agentic Engineering 101.
- Audience: software engineers, IC, chatting-level fluency.
- Arc: L0 → L3 explicit; doesn't stop at plan mode / CLAUDE.md.
- Brain + swarm backbone, ported from Engineering Management / Bootstrap M2.
- Agentic rule applies throughout. Chat-and-save banned.
- Six modules. Starting shape in table above; exercises designed case-by-case.
- Format: likely 2 days or 6 weeks (consistent with EM).
- Single-company cohort.
- Belief > correctness, 50%-wrong-is-curriculum (ports from EM).
- Calibration question (*did you make progress? did you lay ground?*) applies to every module.
- Self-assessment 1–10 at M1 start, M6 end, day-91; target delta ~+3.
- Pair-training with Engineering Management.

**Open, awaiting decision:**

- Training name. "Agentic Engineering 101" is a placeholder; might land as something stronger.
- Prerequisite: Bootstrap hard-required, assumed-but-not-enforced, or irrelevant?
- Does 101 assume the team has team-2x-style infrastructure (from manager's EM run), or does it include bootstrapping the infrastructure?
- Session runtime per module (Bootstrap canonical 1h45; revisit).
- 2-day format's internal shape (intensive sessions + homework vs. 1-day install + 1-day review).
- Scaffolds: Day-1 CLAUDE.md paste + starter agents zip, co-designed with the EM scaffold.

**TODOs sharper than the skeleton:**

- **M1 install mechanic.** What ships in the Day-1 zip? What's the first real PR the student runs through Claude Code (ideally their own repo, not a provided sample)?
- **M5 marketplace mechanic.** If the team has no existing skills marketplace, does M5 include bootstrapping one? How does that split with Engineering Management's M3/M5?
- **M3 orchestration case.** What's the canonical orchestrator-plus-subagents task for a software engineer that's complex enough to require it but small enough to finish in-session?
- **Frontier reading list.** Named practitioners students subscribe to. Maintained in the research KB; curated list refreshed per cohort.

**Bootstrap reuse candidates:**

- Plan mode primer → M1 first 15 minutes.
- Context is King → M1 framing.
- Compounding lecture → M2 framing.
- When to split an agent → M3 subagent exercise.
- Hallucination bake-off pattern → M4 judge-agent design.
- Orchestrator + eval loop → M3 orchestration exercise.
- Crux / assumption-test / pre-mortem skills → M5 meta-agent patterns.

---

*Last updated: 2026-04-20 evening. Skeleton only. Next: verify positioning with Antti, then three-pass build.*
