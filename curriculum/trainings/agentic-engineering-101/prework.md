# Prework: before Module 1

Land at Module 1 with Claude Code open in the repo you're going to grow, the curated skills installed, and one trivial bug picked. About 30 minutes. (The framing for what we're doing lands live in Module 1; you don't need to pre-read anything.)

## 0. Get Claude Code started (1 min)

Fire up Claude Code on the laptop you'll use during the training.

## 1. Pick THE repo (10 min)

One decision, and you probably have a strong candidate already: which repo are you going to grow rules and memory on across the training?

- One you ship to regularly and will still work in six months
- Real code, real tests, real history, somewhere with enough surface area for rules and memory to land on
- Real work ahead at two sizes. Module 1 ships a one-line fix. Module 4 onward runs experiments on bigger things: an epic you're about to start, a refactor that's been sitting, a feature with unknowns. The repo should have both.

Pick one. Every module of this training opens Claude Code against this repo. Every rule, every memory, every skill you build during the training lands here.

## 2. Start a new Claude Code session in THAT repo (2 min)

CLI or desktop, your call. Open a new session with the repo as the working directory.

## 3. Get the content folder onto your laptop (3 min)

You need `agents-102-content.tar.gz` saved to `~/Downloads/`. Two paths to the same destination. Pick whichever fits your network and trust posture.

**3.a. Download from the cohort URL.** Open <CONTENT_URL> in your browser. Save to `~/Downloads/`. (If your work network blocks the download, your trainer can email it or share via SharePoint. Same destination.)

**3.b. Or have Claude download it for you.** Ask Claude to fetch the content tarball to `~/Downloads/`.

**Prompt** *(Claude Code)*

```
Download the AE101 content tarball to ~/Downloads. Use Bash:

  curl -fsSL <CONTENT_URL> -o ~/Downloads/agents-102-content.tar.gz

Confirm the file exists and report its size.
```

## 4. Hand the rest to Claude (12 min)

Ask Claude to extract the tarball, install the curated skills, screen three candidate bugs, and confirm the repo is ready for Module 1. Claude will need to write outside the repo (`~/Documents/ae101-content/` and `~/.claude/skills/`); approve the permission prompts when they fire.

When Claude gets to the bug screen, push back if it dumps all four criteria at once. One bug at a time, then the next.

**Prompt** *(Claude Code)*

```
I'm starting a six-module training called Agentic Engineering 101. Walk these in order, ask one question at a time if you need to, no preamble.

1. Ensure my AE101 content directory exists. Use ~/Documents/ae101-content unless there is a good reason not to. Create it if necessary.

2. Extract ~/Downloads/agents-102-content.tar.gz into that AE101 content directory. Confirm the extracted folder contains lectures/, exercises/, reference/, supplementary/, and content/skills/.

3. Install these as personal Claude Code skills:
   - access-control-analysis
   - stride

   Use the extracted content/skills/ folder as the source. Install them wherever personal Claude Code skills belong on this machine. Confirm each installed skill has a SKILL.md file and tell me the absolute path.

4. Ask me for three trivial-and-visible candidate bugs in this repo. Screen against: under 50 lines changed, visible (wrong error message, date off by a day, wrong total, a log line that lies), mine or co-owned, shippable. Help me pick the most trivial-and-visible one.

5. Once I've picked, confirm the repo is ready for Module 1. Tests run (or name how the repo checks code), git status is clean, I can make a PR. Flag anything that would get in my way.

Report success on each step and tell me what you did.
```

If Step 4's screening feels like Claude is asking everything at once, ask it to use the AskUserQuestion tool, or to give you the candidate-bug screen one bug at a time. Your call.

## Bring to Module 1

Connections question. We'll ask at the opening: *what's one trick you figured out with Claude Code that nobody taught you?* Bring one. Doesn't have to be big. No trick? Bring a frustration instead.

<!-- maintainer -->

**Quality:** compendium-audited 2026-05-03 (story@60b1b6c)
- judges @60b1b6c: writing grandfathered, story PASS, technical grandfathered, behavior grandfathered
- maintainer-reviewed 2026-04-28 (Antti, full AE101 pass)

**DEFERRED** (held — not for autonomous fix; sim-surfaced 2026-04-27, structural call, decided together):
- Fast-operator + opinionated-senior flagged: collapse Step 0+2 into one move (5/6 mood scores there); demote 3.a to a one-line footnote for cohort default; split Step 4 prompt at the seam between mechanical install and interactive bug-screen.
- Mid-competent: Windows path/shell assumptions (`~/Downloads/`, `tar xzf`, `mkdir -p`) unstated; acknowledge Git Bash once. Step 4's 12-min budget tight when student hasn't pre-thought a candidate bug; consider rebadging as "mechanical setup + bring-a-bug homework."

**Meta:**
- **Runtime:** 30 min target. Steps 1–3 are crisp; step 4 is where time can expand if the student's repo is messy.
- **Delivery architecture:** student's repo is the working directory across every module. The content folder sits on disk for the student's own browsing reference (lectures + exercises + reference also render on the workbook site); Claude never reads from it. Skills install to `~/.claude/skills/` (user-level), auto-discover in every session regardless of cwd. Compounding artifacts split clean: rules → `CLAUDE.local.md` (personal, gitignored); team rules → `CLAUDE.md` via PR.
- **Transport — two paths to the same disk state.** Step 3 forks: 3.a manual download from `<CONTENT_URL>` to `~/Downloads/agents-102-content.tar.gz`, 3.b Claude downloads via Bash `curl`. Step 4 is identical in both paths — agent extracts the tarball from `~/Downloads/`, installs skills, screens bugs. Cross-platform via Claude Code's Bash tool: macOS/Linux native, Windows via Git Bash (which Claude Code requires). Confirmed against 2026-04 Anthropic Claude Code setup docs + Microsoft devblogs (Win10 1803+ ships native `curl.exe` and `tar.exe`). Manual path covers IT-locked environments where outbound to the customer URL is blocked — trainer ships tarball via email or SharePoint.
- **`<CONTENT_URL>` placeholder is build-time substituted** by `scripts/build-workbook.js` per-customer (e.g., `https://agents102.bosser.consulting/clients/acme/agentic-engineering-101/agents-102-content.tar.gz`). Source markdown carries the literal placeholder so the substitution is auditable; rendered workbook never shows the placeholder. Rule-compliance note: this is the explicit exception to `check_prompts.md §1` (no placeholders in fenced blocks) — covered by build-time substitution, not student fill-in.
- **No pre-fabricated files.** Violates the *ask-the-agent-don't-type-in-a-terminal* pedagogy. Student generates all state in conversation with Claude. The exception is the manual download (3.a), a transport primitive, not a file-edit.
- **Artifacts at end of prework:** chosen repo (Claude Code open in it), content folder on disk, one picked bug (in the scrollback), two curated skills installed personally at `~/.claude/skills/access-control-analysis/SKILL.md` and `~/.claude/skills/stride/SKILL.md`.
- **Install blockers:** one-line help prompt in the cohort Slack for classroom; self-study fallback DEFERRED (needs ops decision). Don't absorb install debugging into Module 1 time.

**Artefact contracts** (M0 setup artefacts consumed by later modules; maintainer-only metadata for handoff audits):

| Artefact | Stable identifier | Produced by | Consumed by |
|---|---|---|---|
| AE101 content bundle | `~/Downloads/agents-102-content.tar.gz` extracted to `~/Documents/ae101-content/` (or student-confirmed equivalent) | Prework Step 3/4 download + extract prompt | Every module as local reference material; M3 skill install source; scheduled-agents/reference links remain browsable from the content folder |
| Curated security skills | `~/.claude/skills/access-control-analysis/SKILL.md` and `~/.claude/skills/stride/SKILL.md` | Prework Step 4 install prompt | M3 Exercise 1 invokes `access-control-analysis`; M3 Exercise 2 invokes `stride` |
| Chosen trivial bug | Prework session scrollback in the chosen repo, plus tracker/repo context if one exists | Prework Step 4 bug-screen conversation | M1 `fix-tests-first` prompt consumes the selected bug |
| Repo readiness read | Prework session summary: test command or named check path, git status, PR readiness blockers | Prework Step 4 readiness check | M1 trainer/student triage; M1 `fix-tests-first` and `compound-and-close` assume the repo can test, branch, commit, and open or draft a PR |

**Packaging:** `scripts/build-ae101-content-tarball.sh` builds `agents-102-content.tar.gz` from `curriculum/lectures/`, `curriculum/exercises/`, `curriculum/reference/`, `curriculum/supplementary/`, `content/skills/` (excluding the optional `agentic-nerd` host skill — cohort-default install ships only `access-control-analysis` + `stride`). Maintainer blocks stripped at build time. `scripts/build-workbook.js` invokes the tarball script for AE101, copies the result into `site/clients/<customer>/agentic-engineering-101/agents-102-content.tar.gz`, and substitutes `<CONTENT_URL>` at workbook-render time.
