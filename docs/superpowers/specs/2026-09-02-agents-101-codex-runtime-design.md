# Agents 101 Codex runtime and simulation design

**Status:** Approved in conversation, 2026-09-02

## Goal

Make Codex a fully supported Agents 101 runtime without cloning the curriculum or weakening the existing Claude experience. A student can select Codex Desktop or Codex CLI, receive prompts whose concrete mechanics match that runtime, and build the same compounding agent system through Modules 1–8.

The real verification surface is Codex CLI. A deterministic runner must execute the resolved prompt chain through real Codex sessions, preserve the training's cross-module working-directory state, and retain enough evidence to diagnose both tool failures and cross-prompt drift.

## Scope lock

This work is for **Agents 101 only**.

It may change shared compiler or site machinery only when the change is inert for other trainings. In particular, it must not edit or regenerate Agentic Engineering 101 prompts, curriculum sources, scenarios, artifacts, client builds, or runner behavior. An AE101 byte-identity check protects that boundary.

The branch begins with two unrelated dangling-document-path failures already present on `main`. One points into AE101. They remain untouched. The integration criterion is no new repository failures, all relevant Agents 101/Codex checks green, and the pre-existing failures reported separately.

## Design principles

1. **One semantic curriculum.** Claude and Codex teach the same concepts, use the same artifact graph, and compound through the same eight-module arc.
2. **Runtime-neutral identities.** Downstream prompts refer to what an artifact means, not the filename chosen by a runtime.
3. **Resolve mechanics at build time.** Students see real paths and real runtime instructions. They never see unresolved abstraction tokens.
4. **No authored prompt forks.** A canonical prompt remains a single source. Small runtime-specific fragments are allowed only where mechanics genuinely differ.
5. **One prompt compiler for every consumer.** The site and the simulation runner consume the same compiled prompt text.
6. **Evidence before prompt edits.** Run the existing chain against Codex first, classify the first real incompatibility, then propose the smallest prompt change.
7. **Prompt changes require cards.** Every student-copyable prompt change is presented and approved individually before editing.
8. **Preserve Claude behavior.** Existing Claude profiles and the tmux transport remain supported rather than being rewritten around Codex.

## Runtime model

Agents 101 exposes five student-facing profiles:

- Cowork
- Claude Code Desktop
- Claude Code CLI
- Codex Desktop
- Codex CLI

Each profile is data, not a separate curriculum branch. A profile declares:

- its stable profile key and student-facing label;
- its runtime family (`claude` or `codex`);
- its surface (`cowork`, `desktop`, or `cli`);
- logical-artifact bindings;
- the capabilities available to conditional prompt fragments;
- the simulation transport used for executable profiles.

The existing Claude choices keep their current resolved behavior. Codex Desktop and Codex CLI share Codex artifact bindings. Codex CLI additionally supplies the executable transport used by the real simulation.

### Logical artifacts

The registry initially needs at least these identities:

| Logical identity | Claude binding | Codex binding |
|---|---|---|
| `root-instructions` | `CLAUDE.md` | `AGENTS.md` |
| `project-skills` | `.claude/skills` | `.agents/skills` |

The identity is the dependency carried by the prompt graph. The concrete binding is what appears in the selected student's prompt and what the runner asserts on disk.

More identities are added only when an observed cross-prompt dependency needs one. The registry must not become an alternate vocabulary for ordinary paths that do not vary by runtime.

## Canonical prompt source and compilation

Prompt files remain canonical Markdown sources. A runtime-dependent artifact reference uses a typed expression such as:

```text
{{artifact:root-instructions}}
```

Compilation resolves that expression through the selected runtime profile. The canonical source carries the semantic relationship; the built prompt contains the concrete path, such as `./CLAUDE.md` or `./AGENTS.md`.

Small conditional fragments may express mechanics that cannot be represented by an artifact binding—for example, an actual runtime command or a feature that exists on only one surface. Conditions are capability-based and local. Whole-prompt Claude/Codex siblings are forbidden.

The compiler:

1. loads the canonical prompt and selected runtime profile;
2. resolves every logical-artifact expression;
3. includes or removes local capability fragments;
4. emits the concrete prompt text and its dependency metadata;
5. fails closed on unknown identities, missing bindings, unknown capabilities, malformed or unbalanced syntax, or unresolved expressions.

Generated duplication in a compiled JSON registry is acceptable. Authored duplication is not.

### Prompt graph

The prompt graph is validated independently for all five profiles. Dependencies and products use logical identities where paths vary. A profile fails validation when:

- a required logical artifact has no binding;
- a resolved dependency is never produced;
- a conditional fragment removes a load-bearing producer or consumer;
- an artifact is produced at an incompatible concrete path;
- any prompt retains an unresolved runtime expression.

This catches cross-prompt suitability failures before a live model run while keeping one semantic chain.

## Site behavior

The Agents 101 runtime switcher gains Codex Desktop and Codex CLI. Selection controls which compiled prompt text is shown for every prompt in the training.

The runtime registry is the source of the switcher's labels, profile keys, and prompt-resolution context. The site must not maintain a second hard-coded mapping from logical identities to paths.

The switcher change is scoped by training. Other trainings retain their current runtime controls and generated output. In particular, AE101 remains on its present runtime behavior and its generated assets compare byte-for-byte with the pre-change baseline.

Codex Desktop is a supported presentation surface, but Codex CLI is the executable truth surface. Desktop support is accepted when every prompt resolves to concrete Codex mechanics and the rendered prompt matches the text compiled for that profile; the design does not attempt to automate the Desktop UI.

## Simulation architecture

The existing Agents 101 tmux runner becomes a runtime-aware simulation harness without duplicating its curriculum scenario model.

### Shared simulation layer

The shared layer owns:

- the Ingrid/Nordveil fixture and planted seams;
- the growing training working directory;
- prompt order and module boundaries;
- runtime-neutral setup facts and persona responses;
- artifact and behavioral assertions;
- token and timing accounting;
- per-turn evidence layout;
- module and full-chain orchestration.

Scenario definitions refer to logical artifacts. Runtime-specific headless controls, such as how to prevent interactive questions during an unattended run, are structured scenario fields rendered by the selected adapter rather than prose copied across scenario files.

### Transport contract

A transport implements four operations:

1. `start` — create a fresh runtime session for a module and return its stable session identity;
2. `send` — submit one already-resolved prompt to that session;
3. `wait/capture` — wait for completion and return normalized status plus raw evidence;
4. `close` — release runtime resources and perform cleanup.

The normalized result never replaces the raw transcript. Assertions can consume normalized facts, while diagnosis retains the runtime-native evidence.

### Claude transport

Claude continues to use the established tmux/TUI transport and Stop-hook synchronization. The refactor puts that behavior behind the transport contract; it does not redesign a working runner.

The current Claude profile remains the default for existing commands so old operator workflows do not silently change.

### Codex transport

Codex runs non-interactively through structured CLI output:

- the first turn uses `codex exec --json`;
- the runner captures the exact thread identifier from the structured event stream;
- subsequent turns use `codex exec resume <thread-id> --json`;
- every module starts a fresh thread;
- every module points at the same growing training directory.

The event parser recognizes successful completion, `turn.failed`, explicit error events, malformed JSONL, missing or changing thread identifiers, non-zero process exits, and timeouts. Any of these fails the turn with a specific failure class.

The runner records, per turn:

- module and prompt key;
- selected runtime profile;
- exact resolved prompt text before synthetic headless controls;
- exact submitted input;
- raw Codex JSONL;
- final assistant response;
- stderr and exit status;
- thread identifier;
- assertion results;
- token and duration data when emitted.

### Isolation

Live Codex runs must not inherit personal instructions, personal skills, or unrelated project configuration from the operator. Tests create a per-run configuration boundary and expose only the credentials required to call Codex. Any credential bridge is temporary, minimally scoped, and removed on cleanup.

The harness must prove that user-global `AGENTS.md`, user-global skills, and unrelated MCP configuration do not influence the run. Credentials may be reused; behavior-shaping configuration may not.

## Eight-module executable chain

Modules 1–6 continue to use the synthetic Ingrid/Nordveil company and its deliberately planted defects. The same fixture and semantic assertions run under Claude and Codex; only logical-artifact bindings differ.

Modules 7 and 8 become executable rather than remaining an acknowledged gap:

- **Module 7:** a deterministic synthetic recipient supplies the feedback and adoption signals needed to test the personal-to-team handoff.
- **Module 8:** a deterministic synthetic shared-folder room supplies multiple proposals and reactions needed to exercise the agent-proposal forum and flywheel close.

These are simulations of missing people and room state, not fallback exercises. They preserve the load-bearing mechanics of each module.

The full run uses one growing directory from Module 1 through Module 8, with a fresh runtime session at every module boundary. Disk artifacts provide continuity; hidden conversation state must not.

The final clean-room fixture contains no seeded result that a student prompt is supposed to create. Assertions verify both the expected artifact and the planted seam that proves the agent actually performed the work.

## Verification model

Verification has four layers.

### 1. Static compilation

- Compile the full Agents 101 prompt set for all five profiles.
- Validate the prompt graph separately for each profile.
- Reject unresolved expressions, missing bindings, incompatible products, and inactive load-bearing links.
- Compare AE101 generated outputs against the captured pre-change bytes.

### 2. Adapter contract tests

A fake Codex executable emits controlled JSONL streams. Tests prove:

- the first turn captures the correct thread identifier;
- later turns resume that exact thread;
- a new module does not reuse the previous thread;
- successful completion is distinguished from a final-looking message followed by failure;
- malformed streams, timeouts, non-zero exits, and missing IDs fail deterministically;
- cleanup runs after both success and failure;
- prompt text reaching the fake transport equals the site/compiler result before the synthetic tail.

Existing Claude runner tests continue to pass against the same transport contract.

### 3. Live runtime execution

The Codex CLI run executes every selected prompt turn for Modules 1–8. It verifies:

- artifact creation at the Codex bindings;
- planted-seam and content assertions;
- fresh session identity at module boundaries;
- disk continuity across modules;
- prompt order and cross-prompt dependencies;
- absence of seeded answers in the clean fixture;
- complete per-turn transcripts and status evidence.

Claude regression runs cover the shared harness and the existing supported chain.

### 4. Audit evidence

A green exit code alone is insufficient. The final audit samples transcripts and artifacts across the chain, with special attention to:

- instruction creation and later instruction updates;
- skill creation and later skill use;
- multi-agent mechanics;
- security boundaries;
- grounded-output evidence;
- eval-loop iteration;
- the M7 recipient handoff;
- the M8 shared-room proposal loop.

Failures remain partitioned as compiler, graph, transport, runtime, assertion, prompt-suitability, or environment failures. The runner does not flatten these into a generic timeout or red build.

## Prompt-change protocol

Infrastructure and test work proceeds before prompt-body migration. The first Codex run uses the current canonical prompt chain resolved as far as the new artifact system permits.

When a prompt fails because its authored text is unsuitable across runtimes:

1. retain the failing transcript and artifacts;
2. identify the smallest authored change that addresses the observed failure;
3. present one approval card with **BEFORE**, **AFTER**, **WHY**, and **RISK**;
4. wait for the exact approval token `prompt-ok`;
5. record the repository approval marker required by the prompt rules;
6. edit the canonical prompt only;
7. rerun its static checks, the affected live module, and relevant downstream modules;
8. continue to the next observed blocker.

Cards display the canonical source change, including logical-artifact expressions. They do not show separate Claude and Codex copies because none are authored.

No batch approval is inferred from approval of a previous card.

## Implementation sequence

### Phase 1: Runtime foundation

- Introduce the runtime-profile registry and logical-artifact bindings.
- Add typed artifact resolution and narrowly scoped capability fragments to the prompt compiler.
- Add compiler and per-profile graph tests.
- Capture and enforce AE101 byte identity.
- Add Codex Desktop and Codex CLI to the Agents 101 switcher using registry data.

### Phase 2: Transport refactor

- Extract the shared simulation lifecycle from the current runner.
- Place existing Claude/tmux behavior behind the transport contract.
- Add the Codex exec/resume adapter.
- Add fake-CLI JSONL, failure, isolation, and cleanup tests.

### Phase 3: Scenario completion

- Move remaining runtime-specific scenario prose into structured adapter controls.
- Verify Modules 1–6 under both transports.
- Add the synthetic M7 recipient and M8 shared-room scenario state.
- Add assertions for the complete eight-module compound.

### Phase 4: Evidence-driven prompt migration

- Run Codex against the current chain.
- Diagnose the first prompt-suitability failure.
- Use one prompt approval card per canonical edit.
- Rerun affected and downstream coverage after each approval.

### Phase 5: Clean-room completion

- Run the complete Codex CLI chain from a clean fixture.
- Run Claude regression coverage.
- Audit representative transcripts and artifacts.
- Verify all five profile builds and both Codex UI presentations.
- Verify no new repository failures and AE101 byte identity.

Implementation should land as small, independently verifiable commits: runtime/compiler model, Agents 101 UI wiring, transport boundary and Codex adapter, M7–M8 simulation coverage, then individually approved prompt migrations.

## Alternatives considered

### Duplicate Codex prompt files

Rejected. Sibling prompt variants would drift, duplicate pedagogy, and force every future edit through parallel review. The mechanical differences are too sparse to justify a second chain.

### Runtime-neutral prose shown directly to students

Rejected. Telling every student to choose between `CLAUDE.md` and `AGENTS.md` leaks implementation branching into the learning experience and makes prompts harder to execute correctly.

### Rewrite the runner around tmux for Codex

Rejected. Codex already exposes structured non-interactive execution and exact-thread resume. Parsing its JSONL is simpler and more diagnostic than screen-scraping another TUI, while the proven Claude tmux transport can remain intact.

### Test only representative prompts

Rejected. The main risk is cross-prompt suitability in a compounding directory. Sampling individual prompts cannot prove that earlier artifact names and mechanics remain valid for later consumers.

## Acceptance criteria

The work is complete when:

- Agents 101 offers Cowork, Claude Desktop, Claude CLI, Codex Desktop, and Codex CLI profiles.
- All 93 Agents 101 prompts compile without unresolved runtime expressions for every profile.
- Runtime-varying prompt dependencies use logical artifacts and validate across the whole chain.
- No authored Claude/Codex prompt duplicates exist.
- The site and runner consume byte-identical compiled prompt text before runner-only synthetic controls.
- Codex CLI executes the clean Modules 1–8 simulation with fresh per-module threads and one persistent working directory.
- Per-turn Codex JSONL, prompts, responses, status, assertions, tokens, and timing evidence are retained.
- M7 and M8 exercise their real load-bearing mechanics through deterministic synthetic human/room state.
- Claude regression coverage remains green.
- Every prompt-body change has its own approved card and approval marker.
- AE101 sources, scenarios, artifacts, runtime behavior, and generated bytes are unchanged.
- The branch introduces no new repository test failures; the two documented baseline dangling paths remain separate and untouched.
