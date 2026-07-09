# Prework: before Module 1

> Pick your model when you open a session. `/model` swaps between Sonnet and Opus. Sonnet runs every exercise in this training. Opus is the heavier option if you want it. Your call.
>
> Run modules on `high` thinking effort by default. xhigh adds latency without commensurate value on the work. M2 calls out a medium override at the top of that module.

Land at Module 1 with a Claude Code session started in the repo you're going to grow, the curated skills installed, and one trivial bug picked.

## What to bring

The training runs on YOUR real work, not exercises. Across six modules you'll work at four task sizes, bring something at each size from your backlog. You don't need them all picked now; you need to know they're there.

- **Trivial bug** for Module 1: a few lines here and there. Picked from your repo's backlog or a recurring annoyance.
- **A small multi-file task** for Module 2: work you'd ship today if you had the hour. Plan mode wants something a few files wide.
- **A small feature** for Module 3: external or user-facing surface, shippable in a few hours.
- **A real task you'd send off** for Module 4 onward: an epic-shaped or refactor-shaped piece you've been avoiding. The kind you'd hand to an agent rather than nudge bit by bit.

Plus the repo itself (picked in Step 1 below), your team's tracker if you've got one (Linear / Jira / GitHub Issues), and `git worktree` available on your laptop. The curated security skills install in Step 4.

## 1. Pick THE repo

One decision, and you probably have a strong candidate already: which repo are you going to grow rules and memory on across the training?

- One you ship to regularly and will still work in six months
- Real code, real tests, real history, somewhere with enough surface area for rules and memory to land on
- Real work ahead at two sizes. Module 1 ships a small fix, a few lines here and there. Module 4 onward runs experiments on bigger things: an epic you're about to start, a refactor that's been sitting, a feature with unknowns. The repo should have both.

Pick one. Every module of this training starts from a Claude Code session in this repo. Every rule, every memory, every skill you build during the training lands here.

*Really stuck for a repo that fits? Ask your trainer for the fallback repo, or [build one from zero](trainings/agentic-engineering-101/supplementary/build-a-project-from-zero.md) and grow it across the six modules.*

## 2. Open a Claude Code session in that repo

**Session** *(new, "prework")*

Open a new Claude Code session at the repo you just picked. CLI or desktop, your call. If Claude Code doesn't start cleanly here, sort the install before you go further, the rest of prework rides on a working session.

## 3. Get the content folder onto your laptop

Ask Claude to fetch `ae101-content.tar.gz` to `~/Downloads/`.

{{prompt:ae101-prework-download-tarball}}

You can also download manually from [the cohort URL](<CONTENT_URL>) to `~/Downloads/`.

## 4. Extract the bundle and install the curated skills

Mechanical setup. Claude needs to write outside the repo (`~/Documents/ae101-content/` and `~/.claude/skills/`); approve the permission prompts when they fire.

{{prompt:ae101-prework-extract-and-install}}

## 5. Pick a trivial bug and confirm M1 readiness

Now the interactive step. Claude walks three trivial bug candidates from your repo's backlog, helps you pick one, then confirms the repo can test, branch, commit, and open a PR.

When Claude gets to the bug screen, push back if it dumps all four criteria at once. One bug at a time, then the next. Trivial means a few lines here and there, not a multi-file refactor.

{{prompt:ae101-prework-screen-and-ready}}

If Claude's screening feels like everything-at-once, ask Claude to use the AskUserQuestion tool, or to give you the candidate-bug screen one bug at a time. Your call.

{{prompt:ae101-prework-one-at-a-time}}

*Small steer, small trick. A minute here, another there. You find them.*

## Bring to Module 1

Close the prework session when Claude confirms readiness. Module 1 opens fresh in the same repo.

A picked bug from Step 5. Write it down, file/line, or a one-sentence summary in a note. The prework session closes; the bug needs to survive into M1. Come to Module 1 without one and you'll be scrambling for one while the room is already fixing theirs. Your call.

The opening question at Module 1: *what's one trick you figured out with Claude Code that nobody taught you?* Bring one. Doesn't have to be big. No trick? Bring a moment Claude Code frustrated you.

<!-- maintainer -->

**Quality:** compendium-audited 2026-07-08 (writing@1fd0f66 story@1fd0f66 technical@1fd0f66 behavior@1fd0f66 pedagogy@1fd0f66 strategy@1fd0f66 slides@47f3357)
- judges @47f3357: writing PASS, story PASS, technical PASS, behavior PASS (override-fresh-install-context-no-collision-norm-see-instances/ae101--prework.behavior.json), pedagogy PASS, strategy PASS, slides PASS
- cross_module @1765c51: PASS — override-§3-student-noted-path-by-design-§5-contract-row-added-see-instances/ae101--prework-M1-M3.cross_module.json set=[prework,getting-going,plan-mode-done-right,earn-the-trust]
- maintainer-reviewed 2026-04-28 (Antti, full AE101 pass — pre-reshape)

**Meta:**
- **Runtime:** 30 min target. Step breakdown: pick repo 10 / open session 3 / content folder 3 / extract + install 5 / pick bug + readiness 8. Steps 1–4 are crisp; step 5 is where time can expand if the student's repo is messy.
- **Delivery architecture** (working dir, content folder, skills install, compounding-artifact split): canonical in `training-architecture.md` §Working directory model / §Material distribution / §Skills / §Rule files. Not restated here.
- **Transport:** two download paths — agentic default (Claude `curl`s `<CONTENT_URL>`) and manual browser fallback; both land the same tarball, Steps 4–5 identical after. Cross-platform via Claude Code's Bash tool. **Auth gate:** `<CONTENT_URL>` sits behind HTTP basic auth. Agentic path — the download prompt warns Claude of the wall and has it ask the student for username/password on a 401, then retry (`curl -u`). Manual path — the browser pops its own basic-auth dialog on the same credentials. Cohort credentials distributed out-of-band (not in the workbook). **Windows shell, verified 2026-05-24 against `code.claude.com/docs/en/setup`:** Claude Code requires **Win10 1809+/Server 2019+** (not 1803 — `curl.exe`+`tar.exe` ship from 1803/build 17063, but Claude Code's own floor is 1809, and that's the binding number). Git for Windows is **optional**; with it the Bash tool runs through Git Bash, without it Claude Code falls back to the **PowerShell tool**, and WSL is a third path. No student-facing Windows note needed: a pro who has `git worktree` already has Git Bash or WSL, and on the PowerShell-tool path the agent translates the M3/M5 worktree prompts' shell snippets (`cp -r`, `mkdir -p`) into PowerShell itself — they sit under a natural-language lead-in ("copy the gitignored personal files into the worktree…") as intent-illustration, not a literal script, so `runtime: any` holds.
- **`<CONTENT_URL>`:** literal placeholder in source, build-time substituted per-customer by `scripts/build-workbook.js`. Explicit exception to `check_prompts.md §1` (no placeholders in fenced blocks) — covered by build substitution, not student fill-in.
- **No pre-fabricated files.** Student generates all state in conversation (the *ask-the-agent-don't-type-in-a-terminal* pedagogy); the manual-download fallback is a transport primitive, not a file-edit.
- **Install blockers are non-fatal.** Curated skills first fire at M3, so a failed Step-4 install is repairable before then — don't absorb debugging into M1. Rescue paths (classroom live, self-study email) in `trainer-guide.md`.

**Artefact contracts** (M0 setup artefacts consumed by later modules; maintainer-only metadata for handoff audits):

| Artefact | Stable identifier | Produced by | Consumed by |
|---|---|---|---|
| AE101 content bundle | `~/Downloads/ae101-content.tar.gz` extracted to `~/Documents/ae101-content/` (or student-confirmed equivalent) | Prework Step 3 download + Step 4 extract prompt | Every module as local reference material; M3 skill install source; reference + supplementary links remain browsable from the content folder |
| Curated skills | `~/.claude/skills/access-control-analysis/SKILL.md`, `~/.claude/skills/stride/SKILL.md`, `~/.claude/skills/security-tools/SKILL.md` | Prework Step 4 install prompt | M3 Exercise 1 invokes `access-control-analysis`; M3 Exercise 2 invokes `stride` and `security-tools` (the latter as the rick-roll pre-flight) |
| Chosen trivial bug | Prework session scrollback in the chosen repo, plus tracker/repo context if one exists | Prework Step 5 bug-screen conversation | M1 `fix-tests-first` prompt consumes the selected bug |
| Repo readiness read | Prework session summary: test command or named check path, git status, PR readiness blockers | Prework Step 5 readiness check | M1 trainer/student triage; M1 `fix-tests-first` and `compound-and-close` assume the repo can test, branch, commit, and open or draft a PR |

**Packaging:** see `scripts/build-ae101-content-tarball.sh` header — it owns the source whitelist (incl. the 3-skill `SKILLS=()` array), maintainer-block stripping, and the `build-workbook.js` deploy/`<CONTENT_URL>`-substitution chain. Tarball filename owned by `training-architecture.md` §Material distribution.
