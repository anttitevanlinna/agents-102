# Decide the agent data boundary

**Time:** 85 minutes.

**Session** *(new, in your current repository)*

Start a new session in the Module 5 worktree at `../<repo-name>-m5`. Confirm that it contains `docs/agent-platform/architecture.md` and `proof.md` from Module 7 before continuing. If you are using the trainer's example evidence set, use the checkout path the trainer names. Use only the fictional case data in the prompts.

**What you do:** trace two data flows, compare their decisions, and narrow the shared platform boundary.

**What you build:** two data maps, one cross-case decision record, and a revised architecture.

**The point:** a defensible agent begins with visible data movement and explicit ownership, not a compliance label.

---

## Phase 1: Map the ticket handler

*20 minutes*

The support ticket looks like one input. Follow it until it becomes several copies: ingestion, context, tool arguments, drafts, internal notes, traces, review queues, backups, and deletion jobs.

{{prompt:ae101-m8-map-ticket-data}}

Find the highest-risk copies the tested design omitted or underspecified. Check that customer-visible sending has a stronger authority boundary than drafting.

## Phase 2: Map the recommendation bot

*20 minutes*

The recommender begins with familiar product telemetry, then creates inferred preferences and ranked visibility. Map both the collected data and what the system infers.

{{prompt:ae101-m8-map-recommendation-data}}

Do not let continuous learning stand in for a purpose, a retention decision, or a rights path. Leave legal questions open when the case lacks the facts to answer them.

## Phase 3: Compare without flattening

*20 minutes*

Put the two maps side by side. The shared platform needs common controls, but the two products do not need identical permissions, review, retention, or launch boundaries.

{{prompt:ae101-m8-compare-data-cases}}

Read the provisional launch states as engineering recommendations within stated boundaries. They are not legal verdicts. Every unresolved legal or product judgement needs a named owner and the missing facts that owner needs.

## Phase 4: Revise the platform boundary

*25 minutes*

Now make the architecture answer the maps. The agent will offer no more than three consequential changes, one at a time. Accept, reject, or revise each before seeing the next.

{{prompt:ae101-m8-revise-platform-boundary}}

Finish by reading only the changed sections of `architecture.md`. For each change, ask which data-flow row forced it, which case it protects, and which decision still belongs to a human owner.

<!-- maintainer -->

**Primary Bloom's level:** Analyze + Evaluate + Create.

**Mood target:** sober agency.

**Leap test:**
- Maps every material copy and inference through trace, review, retention, deletion, and backup rather than stopping at the model call.
- Keeps ticket drafting and recommendation ranking in separate decision lanes where their purpose and effects differ.
- Revises a real architecture control while leaving context-specific legal calls assigned to named owners.

**Failure modes + escape hatches per phase:**

| Phase | Dominant failure | Escape hatch |
|---|---|---|
| Ticket map | One row describes the ticket while secondary copies remain invisible | Split the row at every new location, recipient, retention clock, or deletion path |
| Recommendation map | Inferences vanish because the user never typed them | Add an explicit row for each derived preference, score, segment, or feedback label |
| Compare | Agent declares GDPR compliance or a legal basis | Replace the declaration with a decision question, named owner, and missing facts |
| Revise | Controls become universal without a workload reason | Label every change common or case-specific and trace it back to the forcing row |

**Prompt chain:** `ae101-m8-map-ticket-data` + `ae101-m8-map-recommendation-data` → `ae101-m8-compare-data-cases` → `ae101-m8-revise-platform-boundary`.
