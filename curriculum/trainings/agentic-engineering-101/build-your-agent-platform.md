# Build your agent platform

## Big Idea
The model is one component. The platform is the agent you can authorize, observe, stop, and improve.

## Prework
Bring a laptop with Git and Claude Code. You do not need an AWS account, cloud credentials, or a Slack or Teams connection.

## What You'll Learn
After this module, you will be able to:
- **Define** a controlled execution boundary around a headless coding worker
- **Choose** three rules that govern your own internet research
- **Challenge** another engineer's evidence and architecture without rewriting their plan
- **Synthesize** competing plans into one coherent design and test it with traces

## Start here

One shared challenge is going to produce several different answers. The interesting variable is not only the model. It is what each engineer lets into the evidence base.

[The platform is the agent](lectures/the-platform-is-the-agent.md)

[Exercise: Research, challenge, and select an agent platform](exercises/research-and-select-agent-platform.md)

[A trace is an argument](lectures/a-trace-is-an-argument.md)

## Key Concepts

- A headless coding tool is a replaceable worker inside a larger control system.
- Tool access is authority, so each tool needs an identity, policy decision, bounded credential, and recorded result.
- Three explicit search rules make research choices inspectable before architecture preferences harden.
- Cross-evaluation tests both the evidence and the compatibility of the design.
- The selected plan is best only within this candidate set, objective, evidence, and constraints.

## Next

Commit the selected design and tabletop evidence in the cohort exchange branch or worktree, then close this session. The next module starts a new session in that same checkout and asks a harder question: should the platform have received, copied, inferred, or retained that data at all?

<!-- maintainer -->

**Quality:** compendium-audited 2026-09-27 (story@b00c409c)
- judges @b00c409c: writing grandfathered, story PASS, technical grandfathered, behavior grandfathered, pedagogy grandfathered, strategy grandfathered
- cross_module @b00c409c: PASS — set=[build-your-agent-platform,data-handling-you-can-defend]

**Meta (trainer):**
- **Primary Bloom's level:** Analyze + Evaluate + Create
- **Pacing:** Runtime is computed with `node scripts/calculate-time.js build-your-agent-platform`. The research phase is the flex point; preserve peer review, synthesis, and both tabletop traces.
- **Transitions:** opening 5 @start · debrief 10 @after:research-and-select-agent-platform · bridge 5 @end
- **Mood target:** principled pluralism. Several defensible search policies produce real disagreement, then the room has to make one coherent choice.
- **Delivery:** Optional two-hour production extension after the six-module core. Every participant solves the same CI-triage challenge independently. No AWS account or provisioning. Slack or Teams is an approved transport when available; Git files and the publication manifest remain the durable exchange.
- **Trainer prep:** Put the reference challenge in the exchange repo as `docs/agent-platform/challenge.md`; create participant branches or worktrees; assign each candidate to two reviewers; name the approved channel or say that the human publication fallback is the exercise path.

**Leap test:**
- The engineer can draw a complete execution from trigger to verified result or correct no-action, with authority boundaries at every tool.
- The engineer can show which of their three research rules admitted or rejected the evidence behind a design choice.
- The engineer can reject an attractive component because it is incompatible with the selected plan's identity, credential, or retry model.

**Artefact contracts:**

| Artefact | Stable identifier | Produced by | Consumed by |
|---|---|---|---|
| Shared challenge | `docs/agent-platform/challenge.md` | Trainer setup from `reference/agent-platform-challenge.md` | Every candidate, reviewer, synthesizer, and tabletop |
| Candidate packet | `docs/agent-platform/candidates/<student-slug>/` | Independent research prompt | Publication, two peer reviews, central synthesis |
| Exchange manifest | `docs/agent-platform/exchange-manifest.md` | Trainer after publication | Review packet roster and synthesis integrity check |
| Peer review | `docs/agent-platform/reviews/<reviewer-slug>--<candidate-slug>.md` | Cross-evaluation prompt | Central synthesis |
| Selection record | `docs/agent-platform/selection-board.md` | Central synthesis | Tabletop and trainer debrief |
| Selected architecture | `docs/agent-platform/architecture.md` | Central synthesis | Tabletop and Module 8 |
| Tabletop evidence | `docs/agent-platform/tabletop-traces.md` | Tabletop prompt | Architecture correction and trainer debrief |

**Failure modes + escape hatches:**
- **Rules:** criteria collapse into generic quality words. Ask what each rule excludes, prefers, or forces the search to do.
- **Research:** one participant reads peer plans early. Move them to a clean worktree and restart before publication.
- **Exchange:** Slack or Teams becomes the only copy. Require revisions or checksums in `publication-manifest.md` and keep Git as source of truth.
- **Review:** reviewers rank prose polish. Point them back to the author's search rules and the common architecture contract.
- **Synthesis:** the agent averages incompatible components. Select a coherent whole first; import only components that share its assumptions.
- **Tabletop:** both cases end in action. Replace the second case until correct no-action or escalation is observable.
