# Claude Code for engineers — reference

Flat look-up for the primitives AE101 leans on. No pedagogy, no hand-holding. When a module says *"see the reference for CLAUDE.md precedence"* or *"plan-mode options"*, this is where.

Source of truth is Anthropic's docs. Links and verbatim quotes below point at [code.claude.com/docs/en/memory.md](https://code.claude.com/docs/en/memory.md), [skills](https://code.claude.com/docs/en/skills), [sub-agents](https://code.claude.com/docs/en/sub-agents), [settings](https://code.claude.com/docs/en/settings), [hooks](https://code.claude.com/docs/en/hooks), [cli-reference](https://code.claude.com/docs/en/cli-reference). This reference is a shortcut. When the shortcut disagrees with the docs, the docs win.

**Last verified against docs:** 2026-04-23.

---

## 1. The memory hierarchy — where your rules actually live

Four layers. More specific overrides broader. All loaded files **concatenate** — they don't replace each other.

| Scope | Path | Governance | Audience |
|---|---|---|---|
| **Managed policy** | macOS `/Library/Application Support/ClaudeCode/CLAUDE.md` · Linux/WSL `/etc/claude-code/CLAUDE.md` · Windows `C:\Program Files\ClaudeCode\CLAUDE.md` | IT/DevOps deploys via MDM / Group Policy / Ansible. Cannot be excluded. | Everyone on the managed machine |
| **Project** | `./CLAUDE.md` OR `./.claude/CLAUDE.md` | Checked into git → PR review | Your team |
| **User** | `~/.claude/CLAUDE.md` | You own | You, across every project |
| **Local** | `./CLAUDE.local.md` | You own; **gitignore** it | You, this project only |

**Precedence within a directory:** `CLAUDE.local.md` loads after `CLAUDE.md`, so your local file wins on conflict.

**Walk-up behavior:** Claude Code walks up the directory tree from your working directory, loading `CLAUDE.md` and `CLAUDE.local.md` at every level. If you run Claude Code in `foo/bar/`, it loads from `foo/bar/`, `foo/`, and up — everything concatenates into context.

**Subdirectory behavior:** CLAUDE.md / CLAUDE.local.md in *sub*directories (below the working directory) are NOT loaded at launch. They load on demand when Claude reads a file in that subdirectory.

**`CLAUDE.local.md` is the intended gitignored pattern.** Verbatim from docs:

> For private per-project preferences that shouldn't be checked into version control, create a `CLAUDE.local.md` at the project root. It loads alongside `CLAUDE.md` and is treated the same way. Add `CLAUDE.local.md` to your `.gitignore` so it isn't committed; running `/init` and choosing the personal option does this for you.

**Worktree gotcha:** gitignored `CLAUDE.local.md` only exists in the worktree where you created it. Cross-worktree personal instructions → import from home directory instead: `@~/.claude/my-project-instructions.md` in your `CLAUDE.md`.

**Which layer compounds per AE101 session:** `CLAUDE.local.md` by default (personal, fast loop, no PR friction). Team rules land in `./CLAUDE.md` via PR — rare, intentional, earns review. Global personal patterns that travel across codebases → `~/.claude/CLAUDE.md`.

Docs: [memory.md § Choose where to put CLAUDE.md files](https://code.claude.com/docs/en/memory.md#choose-where-to-put-claude-md-files).

---

## 2. CLAUDE.md vs. auto memory — two systems, not one

Two memory systems load at session start. You write one; Claude writes the other.

| | CLAUDE.md | Auto memory |
|---|---|---|
| **Who writes** | You | Claude |
| **Contains** | Instructions, rules, conventions | Learnings, patterns, things Claude noticed |
| **Scope** | Project / user / org (per § 1) | Per working tree (per-repo) |
| **Location** | Per § 1 hierarchy | `~/.claude/projects/<project>/memory/` |
| **Loaded into context** | Every session, in full | Every session, first 200 lines or 25KB of `MEMORY.md` |
| **Use for** | *"Always do X"* rules | *"I learned X about this codebase"* notes |

**Auto memory structure:**

```
~/.claude/projects/<project>/memory/
├── MEMORY.md          # index; loaded at launch
├── debugging.md       # topic file; loads on demand
├── api-conventions.md # topic file; loads on demand
└── ...
```

**`MEMORY.md` is an index.** Claude keeps it concise and moves detail into topic files. Topic files load when Claude reads them — not at launch.

**Version requirement:** auto memory needs Claude Code **v2.1.59+**. Check with `claude --version`.

**Disable auto memory:**
- In-session toggle: `/memory` → auto memory toggle
- Settings: `"autoMemoryEnabled": false` in project settings
- Env var: `CLAUDE_CODE_DISABLE_AUTO_MEMORY=1`

**Relocate auto memory:** `"autoMemoryDirectory": "~/my-custom-memory-dir"` in user or local settings. Not accepted from project settings (security — prevents a shared project from redirecting your memory writes).

Docs: [memory.md § Auto memory](https://code.claude.com/docs/en/memory.md#auto-memory).

---

## 3. `.claude/rules/` — path-scoped rules

When rules only apply to certain files, don't put them in `CLAUDE.md`. Put them in `.claude/rules/` with a `paths:` frontmatter glob. They load only when Claude reads a matching file.

**Layout:**

```
your-project/
├── .claude/
│   ├── CLAUDE.md
│   └── rules/
│       ├── code-style.md       # loaded always (no paths frontmatter)
│       ├── testing.md          # loaded always
│       └── api/
│           └── handlers.md     # path-scoped (see below)
```

**Path-scoped example:**

```markdown
---
paths:
  - "src/api/**/*.ts"
---

# API Development Rules
- All API endpoints must include input validation
- Use the standard error response format
```

Glob patterns: `**/*.ts`, `src/**/*`, `*.md`, `src/components/*.tsx`. Brace expansion supported: `"src/**/*.{ts,tsx}"`.

**User-level rules:** `~/.claude/rules/preferences.md` and similar apply to every project. Project rules override user rules.

**Symlinks supported.** Link a shared rules repo into multiple projects:

```bash
ln -s ~/shared-claude-rules .claude/rules/shared
ln -s ~/company-standards/security.md .claude/rules/security.md
```

**CLAUDE.md vs. rules vs. skills — the decision:**

| Concern | Home |
|---|---|
| Always-on project conventions | `CLAUDE.md` |
| Rules that only apply to certain paths | `.claude/rules/` with `paths:` |
| Task-specific workflow Claude invokes when relevant | A skill |

Docs: [memory.md § Organize rules with `.claude/rules/`](https://code.claude.com/docs/en/memory.md#organize-rules-with-claude/rules/).

---

## 4. Imports — `@path/to/file`

`CLAUDE.md` (and `CLAUDE.local.md`) can import other files via `@path` syntax. Imported files load into context at launch alongside the parent.

```markdown
See @README for project overview and @package.json for available npm commands.

# Additional Instructions
- git workflow @docs/git-instructions.md
- personal preferences @~/.claude/my-preferences.md
```

Relative paths resolve relative to the importing file, not the working directory. Recursion depth: **5 hops maximum.**

**First-time approval:** the first time a project uses external imports, Claude Code shows an approval dialog. If you decline, imports stay disabled and the dialog doesn't reappear.

Docs: [memory.md § Import additional files](https://code.claude.com/docs/en/memory.md#import-additional-files).

---

## 5. Plan mode at depth

Plan mode: Claude researches and proposes a plan instead of writing files. You approve the plan; Claude executes.

**Toggle on:**
- Prompt: *"Enable plan mode."*
- Shift+Tab cycles permission modes (Default → Auto-accept → Plan → Auto)
- Desktop mode dropdown: pick *Plan*

**Four approval paths when the plan is ready:**

| Option | Behavior | Pick when |
|---|---|---|
| **1. Yes, and use auto mode** | Full execution, no further approval | Plan looks right, work is reversible or low-stakes |
| **2. Yes, manually approve edits** | Claude pauses per file write | Plan looks right, work touches something you need to watch |
| **3. No, refine with Ultraplan on Claude Code on the web** | Cloud-based plan refinement | Plan needs more thought than you want to spend in-session |
| **4. Tell Claude what to change** | Text box for targeted feedback; Claude rewrites plan | Plan is 80% there; one or two named fixes |

**Exit without executing:** *"Disable plan mode,"* mode dropdown, or Shift+Tab cycle.

**Keep-planning-with-feedback (before approval):** instead of approving, push back with specific items. Claude regenerates. Use when you want to sharpen the plan without restarting the whole prompt.

**AE101 cross-refs:** M2 exercise `push-back-on-the-plan.md` teaches the two-read pattern (human push-back → Pocock `grill-me` second-pass → approve). M1 deliberately runs without plan mode (trivial bug doesn't earn it).

Docs: [plan mode overview](https://code.claude.com/docs/en/overview).

---

## 6. Subagents — Task tool, fresh context

When you need Claude to do structured work in a fresh context — breadth-first audits, long structured reports, parallel work on different concerns — spawn a subagent.

**Invocation in practice:**
- Prompt explicitly: *"Run this as a subagent via the Task tool."*
- Or `/clear` if you just want a fresh context without parallelism (coarse alternative)
- Claude decides subagent count; you specify the shape (*"three subagents — one for X, one for Y, one for Z — then synthesize"*)

**When subagent, when main thread:**
- **Subagent:** breadth-first audits, long structured reports that would clutter scrollback, genuinely parallel work, invoking a skill on a one-shot bounded job.
- **Main thread:** interactive authoring (one-question-at-a-time), iterative steering where you want to see every reply, short jobs where context-switch cost > benefit.

**Persistent memory for subagents:** subagents can maintain their own auto memory. See [subagent configuration](https://code.claude.com/docs/en/sub-agents#enable-persistent-memory).

**AE101 cross-refs:** M3 Ex1/Ex2 invoke the curated access-control + STRIDE skills as subagents; Ex3 (test-strategy authoring) stays main-thread. M4 Phase 2 audit runs as a subagent. The discrimination *"which job belongs in which thread"* is a named LO in M3.

Docs: [sub-agents](https://code.claude.com/docs/en/sub-agents).

---

## 7. Skills

Scoped, named capabilities. Markdown file with frontmatter + instructions, lives in `.claude/skills/<name>/SKILL.md` (or equivalent team-kit location per the pre-engagement contract).

**Two invocation modes:**
- Claude invokes when it determines the skill is relevant to the current task
- You invoke explicitly: *"apply the `stride` skill to this feature"*

**When to reach for a skill vs. a rule:**
- **Skill:** task-specific, loads on demand, reusable move (*"review this against our security policy"*)
- **Rule:** always-on (or path-scoped), constraints Claude should honour whenever active

**AE101 cross-refs:** M3 ships two curated skills (`access-control-analysis`, `stride`) and the student authors one (`test-strategy`). M6 authors the second (the learning-loop skill from the two-run diff).

Docs: [skills](https://code.claude.com/docs/en/skills).

---

## 8. Connectors / MCP

Covered separately in `reference/mcp-and-connectors.md`. Per-tracker install (GitHub Issues via `gh` CLI, Jira via Atlassian Rovo MCP, Linear via Composio or Merge), tenant-admin fallbacks, freshness-dated.

Short version: `+` button next to the prompt, or Settings → Connectors. OAuth flow. Tenant admin gate for M365 / Google Workspace. Screenshot fallback when IT hasn't green-lit yet.

Docs: [Claude Code desktop → Connectors](https://code.claude.com/docs/en/desktop).

---

## 9. Scheduling — `/loop`, Desktop scheduled tasks, Routines

Three mechanisms. Pick by intent.

**`/loop` (in-session only.)** `/loop 5m <prompt>` runs the prompt every 5 minutes while the session is open. Closes when you close the session. Use for: polling during a work block, watching a build, monitoring a long-running task's intermediate output.

**Desktop scheduled tasks — local (the everyday choice).** Sidebar: **Schedule → New task → New local task.** Name, prompt, frequency. Runs on your laptop when the task fires; inherits your connectors.

**Missed-run behavior:** if the laptop was asleep at scheduled time, Claude Code catches up **once** for the most recently missed slot (within a 7-day window). A daily task missed for three days runs once on wake, not three times. Encode time-awareness in the prompt if catch-up would misfire (*"only run if it's before 10:00am; otherwise report skipped"*).

**Routines — remote (Anthropic's cloud).** Same Schedule sidebar: **New task → New remote task.** Runs on Anthropic's infra regardless of your laptop. **Requires a cloud-based Git repo** as working directory — AE101's default assumption is a local repo, so Routines is out-of-scope for core modules. Flag for later if your org has cloud-Git workflows.

**M4/M5/M6 send-off implications:** the un-packaged M4 send-off runs in the **same Claude Code session** (not `/loop`, not scheduled). Laptop stays awake + plugged in (see module file for OS-specific power settings). Cancel mid-run is legitimate; traces are data. Scheduled agents are the generalisation M6 names as a callout, not an authoring exercise.

**Session lifecycle — three gotchas** (verified 2026-04-23):
1. **Laptop sleep freezes the session.** The Claude Code process pauses when the OS sleeps and does NOT resume on wake — you reopen Claude Code manually. For overnight runs, prevent sleep (`caffeinate -dims` on macOS; power-plan change on Linux/Windows). Don't close the lid.
2. **Ctrl+C during a tool call can corrupt the session.** Interrupting cleanly between tool calls is fine; interrupting mid-tool can leave the session's `.jsonl` in a state that fails to resume. If the run genuinely needs stopping, wait for a tool call to finish, or accept that `/resume` may not work on that session.
3. **No per-session budget cap.** Auto-compaction keeps context from ballooning, but there's no built-in token budget or time cap. A multi-hour agentic run can burn more than you expect. Watch the scrollback for drift; `stop when you've seen enough` is a real discipline.

Docs: [Desktop scheduled tasks](https://code.claude.com/docs/en/desktop-scheduled-tasks), [`/loop`](https://code.claude.com/docs/en/scheduled-tasks), [How Claude Code works](https://code.claude.com/docs/en/how-claude-code-works.md). Ctrl+C corruption tracked in GitHub issues #3003, #17466, #18880.

---

## 10. Session transcripts — read what actually happened

Claude Code stores session transcripts on disk. They are not the same thing as memory. Memory is the compacted knowledge Claude writes for future sessions. A transcript is the run itself: prompts, tool calls, decisions, dead ends, corrections, and final output.

Default location:

```text
~/.claude/projects/<encoded-project-path>/<session-id>.jsonl
```

The encoded project path is the absolute working-directory path with `/` replaced by `-`. A repo at `/Users/me/Projects/checkout` maps to:

```text
~/.claude/projects/-Users-me-Projects-checkout/
```

In a worktree, this matters. The transcript folder usually follows the working directory where that session ran. The original repo and the M5 worktree may have different encoded folders.

Ask Claude to find and read the right transcript. Expect a narration before the findings; skim past the opening to the numbered list.

**Prompt** *(Claude Code)*

```text
Find the transcript for the previous Claude Code session in this repo. Start from the current working directory. Look under `~/.claude/projects/` for the encoded project path, list the `.jsonl` files by modified time, and pick the most recent session that is not this current one.

Read it enough to tell me:
1. What task the session was trying to do.
2. What files it changed or tried to change.
3. Where it drifted, stalled, restarted, or corrected itself.
4. Which decisions were made in chat but not encoded into files.

Then compare that read against `git log`, `git diff`, and branch state. Tell me where the transcript and git agree, and where one sees something the other misses.

Report literal counts and quoted text: actual restart numbers, exact correction messages. No softened summary.
```

Why both layers: git tells you what changed. The transcript tells you why the agent changed it, what it almost did, what it misunderstood, and where you steered. A good post-run read uses both.

**Subagents:** subagent transcripts may sit in a `subagents/` folder beside the parent session transcript. If a run used subagents, ask Claude to read the parent transcript first, then any subagent files it references.

**Security note:** transcripts can contain secrets, customer data, tickets, pasted logs, and failed attempts. Treat them as sensitive local artifacts. Do not commit them. Do not paste a whole transcript into another system. Point Claude at the file and ask for the narrow read you need.

**AE101 cross-refs:** M4 leaves an un-packaged run behind. M5 reads the transcript plus git state to diagnose what packaging changes. M6 compares two runs, so the transcript becomes evidence, not trivia.

---

## 11. Session-hygiene commands — `/memory`, `/init`, `/compact`

**`/memory`** — lists every `CLAUDE.md`, `CLAUDE.local.md`, and rules file loaded in the current session. Toggle auto memory on/off. Link to open the auto memory folder in your editor. **First stop when Claude seems to be ignoring a rule** — check it actually loaded.

**`/init`** — scans your codebase and drafts a starting `CLAUDE.md`. If one exists, `/init` suggests improvements rather than overwriting. Multi-phase interactive variant: `CLAUDE_CODE_NEW_INIT=1 claude` runs an interactive flow (asks which artifacts to set up — CLAUDE.md, skills, hooks — then explores with a subagent and proposes).

**`/compact`** — summarises the conversation to free context. What survives:
- Project-root `CLAUDE.md` re-reads from disk and re-injects
- Nested subdirectory CLAUDE.md files **do NOT** re-inject; they reload next time Claude reads a file in that subdir
- Conversation-only instructions (things you said in chat but didn't write to a file) are LOST

If an instruction disappeared after `/compact`, it was either conversation-only or lives in a subdirectory CLAUDE.md that hasn't reloaded. Persistent instructions belong in a file, not just in scrollback.

Docs: [memory.md § View and edit with `/memory`](https://code.claude.com/docs/en/memory.md#view-and-edit-with-memory), [context-window § What survives compaction](https://code.claude.com/docs/en/context-window#what-survives-compaction).

---

## 12. `--append-system-prompt` — system-prompt-level instructions

**CLAUDE.md is loaded as a user message, not the system prompt.** Claude reads it and tries to follow, but there's no strict compliance guarantee.

For instructions that need system-prompt-level treatment (stronger adherence, harder to override mid-conversation), use `--append-system-prompt`:

```bash
claude --append-system-prompt "Never edit production config files."
```

Passed at every invocation — suited for scripts, CI, and automation more than interactive use. For interactive sessions, wrap in a shell alias or launcher.

Docs: [cli-reference § system-prompt flags](https://code.claude.com/docs/en/cli-reference#system-prompt-flags).

---

## 13. Hooks — `InstructionsLoaded` for debugging

When a rule isn't firing and `/memory` confirms it's loaded, next stop is the `InstructionsLoaded` hook. Logs exactly which instruction files loaded, when, and why. Useful for path-scoped rules and lazy-loaded subdirectory files.

Hooks configure via `.claude/settings.json` or user settings. Not our primary teaching surface; flag when students need the introspection.

Docs: [hooks](https://code.claude.com/docs/en/hooks).

---

## 14. Monorepo hygiene — `claudeMdExcludes`

Ancestor CLAUDE.md files from *other* teams' directories get picked up by the walk-up. In a monorepo, that's noise.

`.claude/settings.local.json`:

```json
{
  "claudeMdExcludes": [
    "**/monorepo/CLAUDE.md",
    "/home/you/monorepo/other-team/.claude/rules/**"
  ]
}
```

Glob patterns match absolute paths. Configurable at any settings layer (user / project / local / managed); arrays merge across layers.

**Managed-policy CLAUDE.md cannot be excluded.** Org-wide instructions always apply regardless of individual settings.

Docs: [memory.md § Exclude specific CLAUDE.md files](https://code.claude.com/docs/en/memory.md#exclude-specific-claude-md-files).

---

## 15. Managed-policy CLAUDE.md — IT/DevOps controlled

For orgs that centrally manage Claude Code behaviour across dev machines. A `CLAUDE.md` at the managed policy location (paths in § 1) applies to every user on that machine and cannot be excluded by individual settings.

Deploy via MDM, Group Policy, Ansible, or equivalent config-management tool.

**Managed CLAUDE.md vs. managed settings:** different tools for different jobs.

| Concern | Configure in |
|---|---|
| Block specific tools / commands / paths | Managed settings: `permissions.deny` |
| Enforce sandbox isolation | Managed settings: `sandbox.enabled` |
| Env vars / API provider routing | Managed settings: `env` |
| Force login method / org UUID | Managed settings: `forceLoginMethod`, `forceLoginOrgUUID` |
| Code-style and quality guidelines | Managed CLAUDE.md |
| Data-handling / compliance reminders | Managed CLAUDE.md |
| Behavioral guidance for Claude | Managed CLAUDE.md |

Settings are enforced by the client regardless of Claude's behaviour. CLAUDE.md shapes behaviour but is not a hard enforcement layer. Use settings for gates, CLAUDE.md for guidance.

Docs: [memory.md § Manage CLAUDE.md for large teams](https://code.claude.com/docs/en/memory.md#manage-claude-md-for-large-teams), [permissions § managed settings](https://code.claude.com/docs/en/permissions#managed-settings).

---

## 16. Troubleshooting

**"Claude isn't following my CLAUDE.md."** Run `/memory` first. Check the file actually loaded. If loaded and still not followed: specificity (*"Use 2-space indentation"* beats *"format code nicely"*); conflict (two files giving contradictory guidance); and the fundamental non-enforcement — CLAUDE.md is context, not a system-prompt constraint. For strict adherence use `--append-system-prompt` or a hook.

**"Auto memory saved something weird."** `/memory` → open the auto memory folder. Plain markdown. Edit or delete.

**"CLAUDE.md is too large (>200 lines) and adherence is dropping."** Move path-scoped rules to `.claude/rules/`. Move rare-but-needed content to `@path` imports (note: imports still load into context at launch, so they don't reduce size — they only organise). Trim what isn't needed every session.

**"Instructions seem lost after `/compact`."** Project-root CLAUDE.md survives; nested subdirectory CLAUDE.md and conversation-only instructions don't. Put persistent rules in a file at a level that survives.

**"Multiple CLAUDE.md files in a monorepo are polluting context."** `claudeMdExcludes` in settings (§ 14).

**"I want to verify exactly which files loaded and why."** `InstructionsLoaded` hook (§ 13).

Docs: [memory.md § Troubleshoot memory issues](https://code.claude.com/docs/en/memory.md#troubleshoot-memory-issues), [debug your configuration](https://code.claude.com/docs/en/debug-your-config).

---

## Related references

- [`reference/mcp-and-connectors.md`](mcp-and-connectors.md) — per-tracker install and tenant-admin fallbacks
- [`reference/claude-quick-reference.md`](claude-quick-reference.md) — Agents 101 audience (SVP-level) version of some of this material

## Related AE101 modules (where these primitives land)

- **M1 Getting going** — first `CLAUDE.md` seed (user-level or `CLAUDE.local.md`), one connector wire
- **M2 Plan mode, done right** — § 5, plus Pocock `grill-me` skill as second-pass read
- **M3 Earn the trust** — §§ 6 (subagents), 7 (skills); first skill use + first authoring
- **M4 Run the first experiment** — §§ 1 (personal compound target), 6 (subagent audit), 9 (session-left-running for un-packaged send-off), 10 (transcript as trace)
- **M5 Learn from the test, re-send packaged** — §§ 5 (plan.md authoring), 7 (verifier as eval), 9 (send-off), 10 (read transcript plus git)
- **M6 Spot gaps, build the loop** — §§ 7 (second skill authoring), 9 (scheduled-agents callout), 10 (compare two run transcripts)

---

**This document grows.** If you hit something during the training that belongs here and isn't, flag it. For feature-specific detail, the [official docs](https://code.claude.com/docs/en/memory.md) are the source of truth. When docs disagree with anything above, trust the docs.

**Quality:** compendium-audited 2026-05-03 (story@bb9c1d5 behavior@bb9c1d5)
- judges @bb9c1d5: writing grandfathered, story PASS, technical grandfathered, behavior PASS
