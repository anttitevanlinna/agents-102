# Research, challenge, and select an agent platform

**Time:** 85 minutes.

**Session** *(new, in the cohort exchange repository)*

Open Claude Code in your assigned branch or worktree. Confirm that `docs/agent-platform/challenge.md` exists and that no candidate packet has been opened in this session.

**What you do:** choose your search rules, research one shared challenge, challenge two peers, and help select one design.

**What you build:** an evidence-linked candidate packet, two reviews, a selection board, an architecture, and two tabletop traces.

**The point:** research policy changes architecture, and architecture improves when independent plans are made to disagree in public.

---

## Phase 1: Choose three search rules

*10 minutes*

Before the agent searches, decide how it should judge the search itself. You need exactly three criteria, in your own words.

A criterion can reject vendor fluff, prefer primary operational evidence, force counter-evidence, demand a recent source for a changing claim, or kill a statistic that has no original method. These are examples, not a checklist. Choose the three rules that matter for this challenge.

The research prompt asks for one rule at a time and saves your wording before it opens the web.

{{prompt:ae101-m7-research-platform-plan}}

## Phase 2: Research and plan independently

*25 minutes*

Let the agent research under your three rules and build the four-file packet. The hard budget is eight queries and twelve opened sources; the agent writes the trace as it goes and starts drafting after six accepted sources cover the critical path. Stay independent: do not open another participant's branch, packet, channel post, or screen.

Read `research-policy.md` first, then sample `search-trace.md`. Challenge any accepted source whose admission cannot be explained by one of your rules. In `plan.md`, find the correct no-action path and the credential boundary before you accept the packet.

Stop when the plan is evidence-linked and coherent enough to challenge. It does not need to be exhaustive.

## Phase 3: Publish the packet

*10 minutes*

Commit the four files. Then publish them through the approved exchange. Slack or Teams can notify and carry files or immutable links; it is not automatically the source of truth.

{{prompt:ae101-m7-publish-platform-plan}}

If the connection is absent, the human fallback is the intended path. Commit `publication-manifest.md`, then share its prepared message yourself if the trainer asks.

When every packet is committed, the trainer writes `docs/agent-platform/exchange-manifest.md`: candidate name, packet path, commit revision or file checksums, and publication state. That file is the exact roster the reviewers and synthesizer trust.

## Phase 4: Cross-evaluate two plans

*15 minutes*

Open only the two candidates assigned to you. Each candidate must receive two independent reviews.

{{prompt:ae101-m7-cross-evaluate-platform-plan}}

Compare your two reviews. If the strongest objection is merely a different preference, sharpen it until it names evidence, an unhandled constraint, or incompatible assumptions.

## Phase 5: Synthesize the best available plan

*15 minutes*

The trainer starts one central synthesizer after every packet and assigned review is committed. One operator runs the prompt while the room watches the selection board form.

{{prompt:ae101-m7-synthesize-platform-plans}}

Do not vote on architecture components in isolation. The synthesizer selects a coherent whole first and imports a component only when the authority and runtime assumptions still fit.

## Phase 6: Tabletop action and restraint

*10 minutes*

Run one useful CI-triage action and one case where the correct outcome is no action or escalation.

{{prompt:ae101-m7-tabletop-platform}}

Read the trace as an argument: can you reconstruct why the outcome was allowed, denied, retried, stopped, or escalated without recovering sensitive content the trace should never have stored?

Commit the selected architecture, selection board, and tabletop trace in the cohort exchange branch or worktree, then close this session. Module 8 starts a new session in that same branch or worktree. Do not switch back to a candidate or reviewer checkout.

<!-- maintainer -->

**Quality:** compendium-audited 2026-09-27 (behavior@b00c409c)
- judges @b00c409c: writing grandfathered, story grandfathered, technical grandfathered, behavior PASS, pedagogy grandfathered, strategy grandfathered

**Primary Bloom's level:** Analyze + Evaluate + Create.

**Mood target:** principled pluralism, then earned convergence.

**Leap test:**
- Uses three explicit, personally chosen search criteria to accept and reject sources for a real architecture decision.
- Reviews a peer plan against both its own research policy and the shared execution contract, with quoted evidence.
- Produces a coherent selected design that survives both a useful-action and a no-action tabletop trace.

**Failure modes + escape hatches per phase:**

| Phase | Dominant failure | Escape hatch |
|---|---|---|
| Choose rules | Student repeats the examples without making a real tradeoff | Ask what each rule excludes and which apparently credible source it might reject |
| Research | Agent reads peers or produces an AWS service catalogue | Restart clean if independence broke; otherwise demand one controlled execution from trigger to outcome |
| Publish | Channel post drifts from committed files | Recompute revisions or checksums and update the manifest before review |
| Cross-evaluate | Review scores confidence or prose | Require quoted evidence and one incompatible pair of choices |
| Synthesize | Components are averaged into a design with split assumptions | Select the strongest whole first and test every import against its authority model |
| Tabletop | Trace records payloads rather than references | Replace sensitive fields with references or classifications, then prove the incident remains reconstructable |

**Prompt chain:** `ae101-m7-research-platform-plan` → `ae101-m7-publish-platform-plan` → `ae101-m7-cross-evaluate-platform-plan` → `ae101-m7-synthesize-platform-plans` → `ae101-m7-tabletop-platform`.
