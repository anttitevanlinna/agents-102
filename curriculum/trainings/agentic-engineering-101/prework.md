# Prework: before Module 1

Land at Module 1 with Claude Code open in the repo you're going to grow, the content folder visible to Claude, and one trivial bug picked. About 30 minutes. (The framing for what we're doing lands live in Module 1; you don't need to pre-read anything.)

## 0. Get Claude Code started (1 min)

Fire up Claude Code on the laptop you'll use during the training.

## 1. Pick THE repo (10 min)

One decision: which repo are you going to grow rules and memory on over the next six weeks?

- One you ship to regularly and will still work in six months
- Dense enough that rules and memory have somewhere to build up over six weeks (the Hello World you cloned to try Claude Code isn't it)
- Real work ahead at two sizes. Module 1 ships a one-line fix. Module 4 onward runs experiments on bigger things: an epic you're about to start, a refactor that's been sitting, a feature with unknowns. The repo should have both.

Pick one. Every module of this training opens Claude Code against this repo. Worktrees fine. Every rule, every memory, every skill you build over six weeks lands here.

## 2. Start a new Claude Code session in THAT repo (2 min)

CLI or desktop, your call. Open a new session with the repo as the working directory.

## 3. Get the content folder onto your laptop (3 min)

You need `agents-102-content.tar.gz` saved to `~/Downloads/`. Two paths to the same destination. Pick whichever fits your network and trust posture.

**3.a. Download from the cohort URL.** Open <CONTENT_URL> in your browser. Save to `~/Downloads/`. (If your work network blocks the download, your trainer can email it or share via SharePoint or USB. Same destination.)

**3.b. Or have Claude download it for you.** Paste this prompt instead:

**Prompt** *(Claude Code)*

```
Download the AE101 content tarball to ~/Downloads. Use Bash:

  curl -fsSL <CONTENT_URL> -o ~/Downloads/agents-102-content.tar.gz

Confirm the file exists and report its size.
```

## 4. Hand the rest to Claude (12 min)

Ask Claude to extract the tarball, install the curated skills, screen three candidate bugs, and confirm the repo is ready for Module 1.

**Prompt** *(Claude Code)*

```
I'm starting a six-module training called Agentic Engineering 101. Walk these in order, ask one question at a time if you need to, no preamble.

1. Extract the content folder. Use Bash:

     mkdir -p ~/Documents/ae101-content
     tar xzf ~/Downloads/agents-102-content.tar.gz -C ~/Documents/ae101-content

   Confirm the absolute path of ~/Documents/ae101-content back to me. The tarball expands to lectures/, exercises/, reference/, content/skills/.

2. Install the curated skills as personal skills:

     cp -r ~/Documents/ae101-content/content/skills/* ~/.claude/skills/

   Confirm each skill folder now exists at ~/.claude/skills/<name>/SKILL.md. These are personal to me, auto-discovered by Claude Code in every session.

3. Tell me to run this slash command in the Claude Code chat:

     /add-dir ~/Documents/ae101-content

   Session-only for now. Module 1 finishes by saving this to `.claude/settings.local.json` so future sessions load it automatically.

4. Ask me for three trivial-and-visible candidate bugs in this repo. Screen against: under 50 lines changed, visible (wrong error message, date off by a day, wrong total, a log line that lies), mine or co-owned, shippable. Help me pick the most trivial-and-visible one.

5. Once I've picked, confirm the repo is ready for Module 1. Tests run (or name how the repo checks code), git status is clean, I can make a PR. Flag anything that would get in my way.
```


## Bring to Module 1

Connections question. We'll ask at the opening: *what's one trick you figured out with Claude Code that nobody taught you?* Bring one. Doesn't have to be big. No trick? Bring a frustration instead.

<!-- maintainer -->

**Quality:** compendium-audited 2026-04-27
- compendium-audited 2026-04-27 (check_writing + check_student_facing + check_prompts; three-persona sim 7/8/mixed; `claude-code-guide` capability check all confirmed; em-dash fix on line 25 + 3.a/3.b labels applied this cycle)

**Approve-with-todos** (next iteration, non-blocking):
- Fast-operator flagged: collapse Step 0+2 into one move; demote 3.a to a one-line footnote for cohort default; split Step 4 prompt at the seam between mechanical install and interactive bug-screen.
- Mid-competent flagged: Windows path/shell assumptions (`~/Downloads/`, `tar xzf`, `mkdir -p`) unstated; acknowledge Git Bash once. Step 4's 12-min budget tight when student hasn't pre-thought a candidate bug — consider rebadging as "mechanical setup + bring-a-bug homework."

**Meta:**
- **Runtime:** 30 min target. Steps 1–3 are crisp; step 4 is where time can expand if the student's repo is messy.
- **Delivery architecture:** student's repo is the working directory across every module. Prework adds the content folder via `/add-dir` (session-only). M1 Ex3 compound step promotes the path to `.claude/settings.local.json` under `additionalDirectories` so every subsequent session auto-loads it. Split kept clean: rules → `CLAUDE.local.md`; config → `settings.local.json`. Skills install to `~/.claude/skills/` (user-level), auto-discover in every session regardless of cwd.
- **Transport — two paths to the same disk state.** Step 3 forks: 3.a manual download from `<CONTENT_URL>` to `~/Downloads/agents-102-content.tar.gz`, 3.b Claude downloads via Bash `curl`. Step 4 is identical in both paths — agent extracts the tarball from `~/Downloads/`, installs skills, screens bugs. Cross-platform via Claude Code's Bash tool: macOS/Linux native, Windows via Git Bash (which Claude Code requires). Confirmed against 2026-04 Anthropic Claude Code setup docs + Microsoft devblogs (Win10 1803+ ships native `curl.exe` and `tar.exe`). Manual path covers IT-locked environments where outbound to the customer URL is blocked — trainer ships tarball via email / SharePoint / USB.
- **`<CONTENT_URL>` placeholder is build-time substituted** by `scripts/build-workbook.js` per-customer (e.g., `https://agents102.bosser.consulting/clients/acme/content.tar.gz`). Source markdown carries the literal placeholder so the substitution is auditable; rendered workbook never shows the placeholder. Rule-compliance note: this is the explicit exception to `check_prompts.md §1` (no placeholders in fenced blocks) — covered by build-time substitution, not student fill-in.
- **No pre-fabricated files.** Violates the *ask-the-agent-don't-type-in-a-terminal* pedagogy. Student generates all state in conversation with Claude. The exceptions are the manual download (3.a) and the `/add-dir` slash command, both UI/transport primitives not file-edits.
- **Artifacts at end of prework:** chosen repo (Claude Code open in it), content folder on disk + added to the session via `/add-dir`, one picked bug (in the scrollback), two curated skills installed personally at `~/.claude/skills/access-control-analysis/SKILL.md` and `~/.claude/skills/stride/SKILL.md`.
- **Install blockers:** one-line help prompt in the cohort Slack for classroom; self-study fallback TBD. Don't absorb install debugging into M1 time.

**Packaging:** `scripts/build-ae101-content-tarball.sh` builds `agents-102-content.tar.gz` from `curriculum/lectures/`, `curriculum/exercises/`, `curriculum/reference/`, `content/skills/` (excluding the optional `agentic-nerd` host skill — cohort-default install ships only `access-control-analysis` + `stride`). Maintainer blocks stripped at build time. `scripts/build-workbook.js` invokes the tarball script for AE101, copies the result into `site/clients/<customer>/content.tar.gz`, and substitutes `<CONTENT_URL>` at workbook-render time.
