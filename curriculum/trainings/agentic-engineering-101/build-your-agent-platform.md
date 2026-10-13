# Build your agent platform

## Big Idea
An unattended agent is a responsibility, not a process: the system around it decides what it may do, when it must stop, and what proves it worked.

## Prework
Bring the existing Module 5 worktree at `../<repo-name>-m5`, where Module 6 finished; you will use its prior work only for the closing transfer note. The room designs the supplied CI-triage responsibility together. The AE101 content folder must still be at `~/Documents/ae101-content/`; it contains the local failure lab and worked execution. No cloud account or credentials are needed.

## What You'll Learn
After this module, you will be able to:
- **Diagnose** authorization, duplicate-delivery, timeout, and trace-data failures in a working local control plane
- **Frame** CI-failure triage as useful action, correct restraint, and escalation
- **Design** a headless coding worker behind explicit policy, tool, credential, network, and verification boundaries
- **Test** the design against concurrent delivery, untrusted repository content, failed cancellation, and production-readiness claims

## Start here

Your long-running task already taught the agent how to work. Unattended operation adds a different problem: the system must decide whether work should start, what the worker may request, and what evidence makes the result acceptable.

[The platform is the agent](lectures/the-platform-is-the-agent.md)

[Exercise: Build and test an unattended agent boundary](exercises/build-and-prove-agent-platform.md)

[A trace is an argument](lectures/a-trace-is-an-argument.md)

## Key Concepts

- A headless coding tool is a replaceable worker inside a controlled responsibility.
- An effect is a proposal. Inside its workspace the worker acts directly; the trusted platform owns authorization, credentials, network reach, side effects, and verification. AWS services only implement that boundary.
- A checked-out commit is untrusted input. Its code, instructions, and Claude Code configuration can steer the worker unless the platform ignores them and closes the network.
- Duplicate delivery and late results are state transitions to control, not retry details to document later.
- Evidence levels matter: a local demonstration, a fixture simulation, a specified control, and a production-like test are different claims.
- A controlled transition earns trust when a known violation makes it fail; it names who may change state, what evidence justifies it, and how the system stops or recovers.

## Optional challenges
<!--tier:1-->

Resolve one consequential uncertainty in your architecture with bounded research. The agent offers two candidates; you choose one and give it exactly three rules, each one rejecting, preferring, or forcing something specific.

{{prompt:ae101-m7-research-boundary-decision}}

The decision record should make one call. An unresolved question with strong evidence for why it remains unresolved is better than a broad survey that changes nothing.

## Next

Commit `docs/agent-platform/` with its failure-tour record, architecture, and evidence ledger, then close this session. The next module starts a new session in the same Module 5 worktree at `../<repo-name>-m5` and asks whether the designed execution copies, infers, or retains data it should not have.

<!-- maintainer -->

**Review status:** static review only, real audit pending. No judge run has scored this file, so it carries no Quality line.

**Meta (trainer):**
- **Primary Bloom's level:** Analyze + Evaluate + Create
- **Pacing:** Runtime is computed with `node scripts/calculate-time.js build-your-agent-platform`: 109 of 120 minutes, 11 minutes of float. Phase budgets are estimates until a sim run measures them. Protect the fault tour and the two room incidents. Bounded research sits in `## Optional challenges`, outside the timed path; the cancellation incident is a take-home row in `proof.md`.
- **Transitions:** opening 5 @start · debrief 10 @after:build-and-prove-agent-platform · bridge 5 @end
- **Mood target:** architectural ownership. The student can point to the exact mechanism that allows action or forces restraint, and can say what evidence would actually establish the claim.
- **Delivery:** Optional two-hour production extension after the six-module core. Work continues in each student's real repository. The boundary model runs locally; its invariants map onto AWS while its unproven claims stay visible. No AWS account or provisioning.
- **Trainer prep:** Build the content tarball and run `npm test` plus `npm run tour` inside its `labs/unattended-agent/` directory. Verify `claude --help` is available on the classroom setup. If a student's Modules 4–6 work has no recurring responsibility, the transfer note may name a generic CI job.

**Leap test:**
- The engineer can name which platform invariant rejects unauthorized, duplicate, late, and data-leaking executions.
- The engineer can separate what the local model demonstrates from what concurrency, cancellation, isolation, credentials, and recovery still require.
- The engineer can show how a commit's own configuration and the worker's network reach are kept outside the broker's authority.
- The engineer can walk two incidents through the AWS design and separate local evidence from production approval.

**Artefact contracts:**

| Artefact | Stable identifier | Produced by | Consumed by |
|---|---|---|---|
| Failure-tour record | `docs/agent-platform/failure-tour.md` | Supplied lab + failure-tour prompt | Architecture and incident review |
| Platform architecture | `docs/agent-platform/architecture.md` | Framing + runtime-design prompts; optional research prompt adds `Research decision` | Incident review, Module 8, future implementation |
| Evidence ledger | `docs/agent-platform/proof.md` | Incident-review prompt | Module 8 and human review before deployment work |

**Failure modes + escape hatches:**
- **Tour:** the student sees four red results but cannot name the owning invariant. Re-run one fault and ask who must prevent the unsafe outcome if the worker is wrong.
- **Responsibility:** the task remains broad enough to hide several permissions. Reduce it to one trigger, one bounded effect, one no-action condition, and one escalation path.
- **Research (optional challenge):** criteria collapse into generic quality words. Ask what each rule rejects, prefers, or forces the search to do.
- **Design:** service names replace control logic. Strip the services, state the owner and invariant, then map the services back.
- **Incident:** the review stays at threat labels. Require the prior state, attempted transition, terminal state, and operator evidence.
- **Evidence:** a specified control is described as proven. Downgrade the row and name the production-like test still owed.
