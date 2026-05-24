# Prework: before Module 1

> Pick your model when you open a session. `/model` swaps between Sonnet and Opus. Sonnet runs every exercise in this training. Opus is the heavier option if you want it. Your call.
>
> Run modules on `high` thinking effort by default. xhigh adds latency without commensurate value on the work. M2 calls out a medium override at the top of that module.

Land at Module 1 with a Claude Code session started in the repo you're going to grow, the curated skills installed, and one trivial bug picked. (The framing lands live in Module 1; no pre-read.)

## What to bring

The training runs on YOUR real work, not exercises. Across six modules you'll work at four task sizes, bring something at each size from your backlog. You don't need them all picked now; you need to know they're there.

- **Trivial bug** for Module 1: a few lines here and there. Picked from your repo's backlog or a recurring annoyance.
- **A small multi-file task** for Module 2: work you'd ship today if you had the hour. Plan mode wants something a few files wide.
- **A small feature** for Module 3: external or user-facing surface, shippable in a few hours.
- **A real task you'd send off** for Module 4 onward: an epic-shaped or refactor-shaped piece you've been avoiding. The kind you'd hand to an agent rather than nudge bit by bit.

Plus the repo itself (picked in Step 1 below), your team's tracker if you've got one (Linear / Jira / GitHub Issues), and `git worktree` available on your laptop. On Windows, Claude Code runs through Git Bash, the shell paths below resolve normally there. The curated security skills install in Step 4; no need to do it manually beforehand.

## 1. Pick THE repo

One decision, and you probably have a strong candidate already: which repo are you going to grow rules and memory on across the training?

- One you ship to regularly and will still work in six months
- Real code, real tests, real history, somewhere with enough surface area for rules and memory to land on
- Real work ahead at two sizes. Module 1 ships a small fix, a few lines here and there. Module 4 onward runs experiments on bigger things: an epic you're about to start, a refactor that's been sitting, a feature with unknowns. The repo should have both.

Pick one. Every module of this training starts from a Claude Code session in this repo. Every rule, every memory, every skill you build during the training lands here.

*Really stuck for a repo that fits? Ask your trainer. There's a fallback repo you can use for the training.*

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

Now the interactive beat. Claude walks three trivial bug candidates from your repo's backlog, helps you pick one, then confirms the repo can test, branch, commit, and open a PR.

When Claude gets to the bug screen, push back if it dumps all four criteria at once. One bug at a time, then the next. Trivial means a few lines here and there, not a multi-file refactor.

{{prompt:ae101-prework-screen-and-ready}}

If Claude's screening feels like everything-at-once, ask Claude to use the AskUserQuestion tool, or to give you the candidate-bug screen one bug at a time. Your call.

{{prompt:ae101-prework-one-at-a-time}}

*Small steer, small trick. A minute here, another there. You find them.*

## Bring to Module 1

Close the prework session when Claude confirms readiness. Module 1 opens fresh in the same repo.

A picked bug from Step 5. Write it down, file/line, or a one-sentence summary in a note. The prework session closes; the bug needs to survive into M1. Come to Module 1 without one and you'll be scrambling for one while the room is already fixing theirs. Your call.

Connections question at the opening: *what's one trick you figured out with Claude Code that nobody taught you?* Bring one. Doesn't have to be big. No trick? Bring a moment Claude Code frustrated you.

<!-- maintainer -->

**Quality:** compendium-audited 2026-05-22 (writing@1a9e10b story@1a9e10b technical@1a9e10b behavior@1a9e10b pedagogy@1a9e10b strategy@1a9e10b)
- judges @1a9e10b: writing PASS, story PASS, technical PASS, behavior PASS, pedagogy PASS, strategy PASS
- cross_module @1a9e10b: PASS — set=[prework, getting-going, plan-mode-done-right, earn-the-trust]
- mechanical @6121abd: PASS — ae101-prework via bin/judge.sh
- maintainer-reviewed 2026-04-28 (Antti, full AE101 pass)

**Meta:**
- **Runtime:** 30 min target. Step breakdown: pick repo 10 / open session 3 / content folder 3 / extract + install 5 / pick bug + readiness 8. Steps 1–4 are crisp; step 5 is where time can expand if the student's repo is messy.
- **Delivery architecture:** student's repo is the working directory across every module. The content folder sits on disk for the student's own browsing reference (lectures + exercises + reference also render on the workbook site). Claude doesn't read exercise/lecture bodies by default; the canonical reading surface is the rendered workbook. Exception: when the student invokes the `agentic-nerd` self-study skill, it resolves `{{prompt:<key>}}` markers in exercise bodies against the prompt registry shipped alongside at `~/Documents/ae101-content/prompts/`. Skills install to `~/.claude/skills/` (user-level), auto-discover in every session regardless of cwd. Compounding artifacts split clean: rules → `CLAUDE.local.md` (personal, gitignored); team rules → `CLAUDE.md` via PR.
- **Transport — two paths to the same disk state.** Step 3 has two paths: the agentic default (Claude `curl`s `<CONTENT_URL>` to `~/Downloads/ae101-content.tar.gz` via Bash) and the manual alternative (student downloads from the same URL via browser). Steps 4 and 5 are identical in both paths — Step 4 extracts the tarball and installs the curated skills, Step 5 screens bugs and confirms readiness. Cross-platform via Claude Code's Bash tool: macOS/Linux native, Windows via Git Bash (which Claude Code requires). Confirmed against 2026-04 Anthropic Claude Code setup docs + Microsoft devblogs (Win10 1803+ ships native `curl.exe` and `tar.exe`).
- **`<CONTENT_URL>` placeholder is build-time substituted** by `scripts/build-workbook.js` per-customer (e.g., `https://agents102.bosser.consulting/clients/acme/agentic-engineering-101/ae101-content.tar.gz`). Source markdown carries the literal placeholder so the substitution is auditable; rendered workbook never shows the placeholder. Rule-compliance note: this is the explicit exception to `check_prompts.md §1` (no placeholders in fenced blocks) — covered by build-time substitution, not student fill-in.
- **No pre-fabricated files.** Violates the *ask-the-agent-don't-type-in-a-terminal* pedagogy. Student generates all state in conversation with Claude. The exception is the manual-download alternative in Step 3, a transport primitive, not a file-edit.
- **Artifacts at end of prework:** chosen repo (Claude Code session started in it), content folder on disk, one picked bug (in the scrollback), curated skills installed personally at `~/.claude/skills/access-control-analysis/SKILL.md`, `~/.claude/skills/stride/SKILL.md`, and `~/.claude/skills/security-tools/SKILL.md` (the third is framed as a generic security-utility pre-flight — its M3 reveal is the supply-chain-vector lesson; see `trainer-guide.md` § *M3, the security-tools surprise*).
- **Install blockers are non-fatal.** The curated skills first fire at M3, so anything that doesn't install cleanly at Step 4 can be repaired before then. Classroom: the cohort's trainer rescues live (Slack or in-room). Self-study: student emails the trainer at the cohort's published contact. Don't absorb install debugging into Module 1 time either way.

**Artefact contracts** (M0 setup artefacts consumed by later modules; maintainer-only metadata for handoff audits):

| Artefact | Stable identifier | Produced by | Consumed by |
|---|---|---|---|
| AE101 content bundle | `~/Downloads/ae101-content.tar.gz` extracted to `~/Documents/ae101-content/` (or student-confirmed equivalent) | Prework Step 3 download + Step 4 extract prompt | Every module as local reference material; M3 skill install source; reference + supplementary links remain browsable from the content folder |
| Curated skills | `~/.claude/skills/access-control-analysis/SKILL.md`, `~/.claude/skills/stride/SKILL.md`, `~/.claude/skills/security-tools/SKILL.md` | Prework Step 4 install prompt | M3 Exercise 1 invokes `access-control-analysis`; M3 Exercise 2 invokes `stride` and `security-tools` (the latter as the rick-roll pre-flight) |
| Chosen trivial bug | Prework session scrollback in the chosen repo, plus tracker/repo context if one exists | Prework Step 5 bug-screen conversation | M1 `fix-tests-first` prompt consumes the selected bug |
| Repo readiness read | Prework session summary: test command or named check path, git status, PR readiness blockers | Prework Step 5 readiness check | M1 trainer/student triage; M1 `fix-tests-first` and `compound-and-close` assume the repo can test, branch, commit, and open or draft a PR |

**Packaging:** `scripts/build-ae101-content-tarball.sh` builds the AE101 content tarball (filename owned by `training-architecture.md` § Material distribution) from `curriculum/lectures/`, `curriculum/exercises/`, `curriculum/trainings/agentic-engineering-101/reference/`, `curriculum/trainings/agentic-engineering-101/supplementary/`, and `content/skills/` (excluding the optional `agentic-nerd` host skill — cohort-default install ships only `access-control-analysis` + `stride`). Maintainer blocks stripped at build time. `scripts/build-workbook.js` invokes the tarball script for AE101, copies the result into the customer's deploy directory, and substitutes `<CONTENT_URL>` at workbook-render time.
