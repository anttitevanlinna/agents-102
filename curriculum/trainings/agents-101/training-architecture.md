# Agents 101 Training Architecture

Agents 101 uses a compounding working-directory model. The student is not just reading modules; they are building a local agent system that carries memory, sources, agents, judges, outputs, and operating rules forward.

## Platform

Agents 101 runs on Claude Code (CLI + Desktop) and Cowork. Not Claude.ai chat.

The two runtimes use the same prompts and artifacts. Differences live in install-step UI language and terminology:
- Claude Code: subagent, local working directory, `+` button next to the prompt, Settings -> Connectors, Schedule sidebar, `/loop`, plan mode, desktop mode dropdown, Shift+Tab cycle.
- Cowork: agent, Cowork tab in Claude Desktop, Customize -> Skills -> New -> Create with Claude, connected-folder model in place of CWD.

For the runtime split, see `curriculum/reference/claude-code-for-engineers.md` section "Claude Cowork -- same engine, different surface".

Cloud/remote features are out of scope for Agents 101 exercises. Remote tasks need a cloud source for the working directory, typically a cloud Git repo. Agents 101 uses a local training directory.

## Material Distribution

Participants receive:

1. A password-protected curriculum site, rendered with the same site renderer used locally.
2. One prework starter download.
3. A local training directory on their laptop.
4. For Module 8 classroom delivery only: a separate, nearly empty shared deliberation folder in SharePoint or OneDrive.

Never ask participants to clone Git.

The default training directory is defined in `.claude/skills/self-study/SKILL.md`. Curriculum prose should refer to it generically as the training directory.

## Training Directory Shape

```
<training-dir>/
├── CLAUDE.md                      # NOT shipped; student creates in Module 2 Debrief
├── memory/                        # cross-module, Module 2 onward
├── agents/                        # cross-module, custom agent files
├── sources/                       # cross-module, raw company material
├── outputs/                       # cross-module audit / report results; first appears at Module 4
├── prework/                       # prework outputs live here
├── module-1/                      # created when Module 1 writes outputs
├── module-2/
├── ...
└── module-4/policies/             # policy reference files installed in prework
```

The folder stays the same. What changes is what the agent is allowed to make durable at the root.

Session scope changes at two seams: prework -> Module 1 -> Module 2 onward. Scope is controlled by output paths and rule-file loading, not by opening deeper subfolders.

- Prework: open the training-directory root; write prework outputs under `prework/`.
- Module 1: open the training-directory root; write only inside `module-1/`.
- Module 2 onward: keep the training-directory root open; write cross-module artifacts at the root plus per-module working files.

The Module 1 -> Module 2 transition is conceptual: from building one scoped thing to building a system.

## Session Boundaries

Agents 101 assumes a fresh session or task at the start of each module. Participants arrive after a gap, usually without last week's scrollback. That is the point: cross-module continuity must live on disk, not in chat history.

The session widget (source shape `**Session** *(verb, "name")*`) lands where the work begins, not where the module file opens. Place it by learning flow. Few canonical patterns:

- **Exercise-top (default).** The first exercise in a module carries the widget. Lectures before the exercise are trainer-projected or pre-reading and don't require a live agent.
- **Module-opener prose only.** `## Start here` carries framing prose (recapping the previous module's residuals, naming the mood). No widget at the module file. The exercise opens the session.
- **Lecture-top.** When a lecture is interactive (student runs prompts inside the lecture), it carries its own widget. Rare in Agents 101.
- **Mid-exercise re-fork.** When an exercise intentionally needs a fresh session partway through (worktree fork, isolation read, deliberate context drop), the exercise body carries a second widget and names the reason.

Inside a module, keep the same session running by default. Exercises in the same module may rely on short-term scrollback from the previous exercise, plus files written on disk.

The durable handoff between modules is always file-based: `./CLAUDE.md`, `./challenge.md`, `memory/`, `sources/`, `agents/`, `judges/`, `outputs/`, and the relevant `module-N/` evidence. The session is disposable; the training directory compounds.

## Agents 101 Rule Files

Module 1 starts with zero context on purpose. `module-1/` ships empty: no `CLAUDE.md`, no scaffolded material. Module 1 does not create a `CLAUDE.md`; doing so would install an always-loaded rule file before the student understands the scope. The exercise creates and sharpens `module-1/personal-brand-generation.md`, a portable generation-rules file for one task family. It stays scoped to Module 1.

Module 2 starts with zero root rules. The training-directory root is empty of always-loaded rules when Module 2 begins: no `CLAUDE.md`, no READMEs in `memory/`, `sources/`, or `agents/`. Rules that matter for the exercise live in the pasted prompts. Module 2 Debrief creates the wider root `CLAUDE.md` from session evidence, with student pushback.

Do not ship a prewritten root `CLAUDE.md`. It violates the "student writes their own rules" principle and causes agents to auto-execute behavior the student never authorized.

The root `CLAUDE.md` grows through each later module's Debrief. Claude reviews the session, rewrites in place, integrates rather than appends, and reports what changed. The student pushes back.

## Artifact Conventions

Module directories are side pockets. Root is the compounding system.

Use `module-N/` when an artifact belongs to that module's local episode, example, benchmark, or evidence trail. It matters, but it should not become ambient system memory. Module 1's personal site is the canonical case: `module-1/site.html` is visible proof and emotional payoff, but later sessions should not live with it automatically.

Use root-level homes when an artifact should travel forward and shape later agent behavior. Cross-module artifacts live at the root:
- `memory/`
- `agents/`
- `sources/`
- `outputs/`
- root `CLAUDE.md`
- `judges/` when introduced by Module 5

Per-module working files live inside `module-N/`. The diagnostic is: should future sessions automatically live with this artifact, or deliberately reach back to it as evidence? If automatically, use the root or a root-level home. If deliberately, use `module-N/`.

Module 8 uses a separate shared deliberation folder, not a synced subfolder inside the local training directory. The folder starts almost empty and contains one subfolder per participant. At the start of the module, the trainer posts the actual folder path or name in chat. Prompts refer to "the shared folder the trainer posted in chat" rather than a fixed alias. Every participant's agent writes only to its own named subfolder and can read the others. The buyer or sponsor seeds `challenge.md` at the shared root. The central synthesizer agents own the selection and synthesis files at the shared root: `selection-board.md`, `midway-instructions.md`, `strategy-kernel.md`, `agent-set.md`, and `plan.md`.

Use `outputs/` when a prompt produces a result describing the cross-module system rather than the current module's work product. Module 4 audit reports are the canonical case: `outputs/policy-report.md`, `outputs/security-report.md`. Per-module evidence and inputs stay in `module-N/`.

Latest-only: reruns overwrite; git carries history.

Diagnostic at prompt-write time: does this artifact describe the cross-module system or the current module's working state? If cross-module, use `outputs/`. If module-specific, use `module-N/`.

## Starter Rules

Agents 101 installs all trainer-provided working material during prework. Do not design module-day downloads or zip patches.

The prework starter must be:
- Installed once and idempotent. Extracting it twice produces the same tree.
- Non-clobbering. Do not ship a `CLAUDE.md`, agent file, judge file, report, or other artifact the student is meant to create or compound.
- Reference material only. Module 4 can ship `module-4/policies/*.md` because those files are source material the student runs raw. Module 4 must not ship a prebuilt security skill.
- Small. Include `prework/`, `.claude/skills/self-study/`, and cross-module homes (`memory/`, `sources/`, `agents/`) because the student uses them early. Include module folders only when they contain shipped reference material, such as `module-4/policies/`.

The Agents 101 starter is maintained in Git at `curriculum/scaffolds/training-starter/`. Participants never see Git. Export the starter per cohort and host it on the customer's site or SharePoint.

## Skill Invocation

Agents 101 should inline method moves unless a module actually ships the skill it asks students to invoke.

Current Agents 101 stance:
- Module 2 Debrief inlines the crux move and names Rumelt directly.
- Module 7 uses the same family of methods as plain exercise moves: absorption bottleneck, switch assumptions, failure stories.
- Module 8 may name the lineage explicitly at room scale, but still invokes the moves inline rather than relying on pre-shipped strategy skills.
- No Agents 101 scaffold should require `crux`, `assumption-test`, or `pre-mortem` skills to exist.

## Local-Only Work

Do not place the whole training directory inside OneDrive, Google Drive, Dropbox, or another synced folder. Claude writes files faster than sync daemons reconcile; conflict copies will happen.

Module 8 deliberately uses a separate synced shared folder for live deliberation. Keep the blast radius small: the shared surface starts nearly empty, every participant writes only inside their own named subfolder, and only the central synthesizer agents write shared synthesis files at the root.
