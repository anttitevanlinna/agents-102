# Prework: before Module 1

Land at Module 1 with a Claude Code session started in the repo you're going to grow, the curated skills installed, and one trivial bug picked. (The framing lands live in Module 1; no pre-read.)

## 0. Get Claude Code started

Fire up Claude Code on the laptop you'll use during the training.

## 1. Pick THE repo

One decision, and you probably have a strong candidate already: which repo are you going to grow rules and memory on across the training?

- One you ship to regularly and will still work in six months
- Real code, real tests, real history, somewhere with enough surface area for rules and memory to land on
- Real work ahead at two sizes. Module 1 ships a one-line fix. Module 4 onward runs experiments on bigger things: an epic you're about to start, a refactor that's been sitting, a feature with unknowns. The repo should have both.

Pick one. Every module of this training starts from a Claude Code session in this repo. Every rule, every memory, every skill you build during the training lands here.

*Really stuck for a repo that fits? Ask your trainer. There's a fallback repo you can use for the training.*

## 2. Start a new Claude Code session in THAT repo

CLI or desktop, your call. Open a new session with the repo as the working directory.

## 3. Get the content folder onto your laptop

You need `agents-102-content.tar.gz` saved to `~/Downloads/`. Two paths to the same destination. Pick whichever fits your network and trust posture.

**3.a. Download from the cohort URL.** Open <CONTENT_URL> in your browser. Save to `~/Downloads/`.

**3.b. Or have Claude download it for you.** Ask Claude to fetch the content tarball to `~/Downloads/`.

{{prompt:ae101-prework-download-tarball}}

## 4. Hand the rest to Claude

Ask Claude to extract the tarball, install the curated skills, screen three candidate bugs, and confirm the repo is ready for Module 1. Claude will need to write outside the repo (`~/Documents/ae101-content/` and `~/.claude/skills/`); approve the permission prompts when they fire.

When Claude gets to the bug screen, push back if it dumps all four criteria at once. One bug at a time, then the next.

{{prompt:ae101-prework-extract-and-install}}

If Step 4's screening feels like Claude is asking everything at once, ask Claude to use the AskUserQuestion tool, or to give you the candidate-bug screen one bug at a time. Your call.

{{prompt:ae101-prework-one-at-a-time}}

*Small steer, small trick. A minute here, another there. You find them.*

## Bring to Module 1

Connections question at the opening: *what's one trick you figured out with Claude Code that nobody taught you?* Bring one. Doesn't have to be big. No trick? Bring a moment Claude Code frustrated you.

<!-- maintainer -->

**Quality:** compendium-audited 2026-05-14 (writing@0f32201 story@0f32201 technical@0f32201 behavior@ab4b0bd)
- judges @ab4b0bd: writing PASS, story PASS, technical PASS, behavior PASS
- mechanical @6121abd: PASS — ae101-prework via bin/judge.sh
- maintainer-reviewed 2026-04-28 (Antti, full AE101 pass)

**DEFERRED** (held — not for autonomous fix; sim-surfaced 2026-04-27, structural call, decided together):
- Fast-operator + opinionated-senior flagged: collapse Step 0+2 into one move (5/6 mood scores there); demote 3.a to a one-line footnote for cohort default; split Step 4 prompt at the seam between mechanical install and interactive bug-screen.
- Mid-competent: Windows path/shell assumptions (`~/Downloads/`, `tar xzf`, `mkdir -p`) unstated; acknowledge Git Bash once. Step 4's 12-min budget tight when student hasn't pre-thought a candidate bug; consider rebadging as "mechanical setup + bring-a-bug homework."

**Meta:**
- **Runtime:** 30 min target. Step breakdown: get Claude Code started 1 / pick repo 10 / start session 2 / content folder 3 / hand rest to Claude 12. Steps 1–3 are crisp; step 4 is where time can expand if the student's repo is messy.
- **Delivery architecture:** student's repo is the working directory across every module. The content folder sits on disk for the student's own browsing reference (lectures + exercises + reference also render on the workbook site). Claude doesn't read exercise/lecture bodies by default; the canonical reading surface is the rendered workbook. Exception: when the student invokes the `agentic-nerd` self-study skill, it resolves `{{prompt:<key>}}` markers in exercise bodies against the prompt registry shipped alongside at `~/Documents/ae101-content/prompts/`. Skills install to `~/.claude/skills/` (user-level), auto-discover in every session regardless of cwd. Compounding artifacts split clean: rules → `CLAUDE.local.md` (personal, gitignored); team rules → `CLAUDE.md` via PR.
- **Transport — two paths to the same disk state.** Step 3 forks: 3.a manual download from `<CONTENT_URL>` to `~/Downloads/agents-102-content.tar.gz`, 3.b Claude downloads via Bash `curl`. Step 4 is identical in both paths — agent extracts the tarball from `~/Downloads/`, installs skills, screens bugs. Cross-platform via Claude Code's Bash tool: macOS/Linux native, Windows via Git Bash (which Claude Code requires). Confirmed against 2026-04 Anthropic Claude Code setup docs + Microsoft devblogs (Win10 1803+ ships native `curl.exe` and `tar.exe`). Manual path covers IT-locked environments where outbound to the customer URL is blocked — trainer ships tarball via email or SharePoint.
- **`<CONTENT_URL>` placeholder is build-time substituted** by `scripts/build-workbook.js` per-customer (e.g., `https://agents102.bosser.consulting/clients/acme/agentic-engineering-101/agents-102-content.tar.gz`). Source markdown carries the literal placeholder so the substitution is auditable; rendered workbook never shows the placeholder. Rule-compliance note: this is the explicit exception to `check_prompts.md §1` (no placeholders in fenced blocks) — covered by build-time substitution, not student fill-in.
- **No pre-fabricated files.** Violates the *ask-the-agent-don't-type-in-a-terminal* pedagogy. Student generates all state in conversation with Claude. The exception is the manual download (3.a), a transport primitive, not a file-edit.
- **Artifacts at end of prework:** chosen repo (Claude Code session started in it), content folder on disk, one picked bug (in the scrollback), two curated skills installed personally at `~/.claude/skills/access-control-analysis/SKILL.md` and `~/.claude/skills/stride/SKILL.md`.
- **Install blockers:** one-line help prompt in the cohort Slack for classroom; self-study fallback DEFERRED (needs ops decision). Don't absorb install debugging into Module 1 time.

**Artefact contracts** (M0 setup artefacts consumed by later modules; maintainer-only metadata for handoff audits):

| Artefact | Stable identifier | Produced by | Consumed by |
|---|---|---|---|
| AE101 content bundle | `~/Downloads/agents-102-content.tar.gz` extracted to `~/Documents/ae101-content/` (or student-confirmed equivalent) | Prework Step 3/4 download + extract prompt | Every module as local reference material; M3 skill install source; scheduled-agents/reference links remain browsable from the content folder |
| Curated security skills | `~/.claude/skills/access-control-analysis/SKILL.md` and `~/.claude/skills/stride/SKILL.md` | Prework Step 4 install prompt | M3 Exercise 1 invokes `access-control-analysis`; M3 Exercise 2 invokes `stride` |
| Chosen trivial bug | Prework session scrollback in the chosen repo, plus tracker/repo context if one exists | Prework Step 4 bug-screen conversation | M1 `fix-tests-first` prompt consumes the selected bug |
| Repo readiness read | Prework session summary: test command or named check path, git status, PR readiness blockers | Prework Step 4 readiness check | M1 trainer/student triage; M1 `fix-tests-first` and `compound-and-close` assume the repo can test, branch, commit, and open or draft a PR |

**Packaging:** `scripts/build-ae101-content-tarball.sh` builds `agents-102-content.tar.gz` from `curriculum/lectures/`, `curriculum/exercises/`, `curriculum/trainings/agentic-engineering-101/reference/`, `curriculum/trainings/agentic-engineering-101/supplementary/`, `content/skills/` (excluding the optional `agentic-nerd` host skill — cohort-default install ships only `access-control-analysis` + `stride`). Maintainer blocks stripped at build time. `scripts/build-workbook.js` invokes the tarball script for AE101, copies the result into `site/clients/<customer>/agentic-engineering-101/agents-102-content.tar.gz`, and substitutes `<CONTENT_URL>` at workbook-render time.
