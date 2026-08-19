# Prework: before Module 1

> Pick your model when you open a session. `/model` swaps between Sonnet and Opus. Sonnet runs every exercise in this training. Opus is there if you want the heavier option.
>
> Run modules on `high` thinking effort by default. xhigh adds latency without commensurate value on the work. Module 2 runs on medium instead, because high feels sluggish on a tight slot.

Come to Module 1 with the repo picked,<!--flag:payload--> the curated skills installed,<!--/flag:payload--> and one trivial bug.

## Bring real work

The training runs on YOUR real work. You'll work at different task sizes across the training, bring something at each size from your backlog. You don't need them all picked now; you need to know they're there.

Roughly in the order you'll reach for them:

- **Trivial bug**, wanted on day one: a few lines here and there. Picked from your repo's backlog or a recurring annoyance.
- **A small multi-file task**, soon after: work you'd ship today if you had the hour. Plan mode wants something a few files wide.<!--flag:module:earn-the-trust-->
- **A small feature**: external or user-facing surface, shippable in a few hours.<!--/flag:module:earn-the-trust-->
- **A bigger piece**: a refactor, or a feature with unknowns. Size this one by the agent rather than by yourself. Roughly 30 to 120 minutes of the agent working, not counting the time you spend writing prompts.

Separate tasks off your backlog.

Plus the repo itself (picked next) and your team's tracker if you've got one (Linear / Jira / GitHub Issues). Make sure your Claude Code can operate the GitHub CLI. Ask it to install `gh` if it isn't there.<!--flag:payload--> The curated security skills install when you extract the bundle.<!--/flag:payload-->

## 1. Pick THE repo

One decision, and you probably have a strong candidate already: which repo are you going to grow rules and memory on across the training?

- One you ship to regularly and will still work in six months
- Real code, real tests, real history, somewhere with enough surface area for rules and memory to land on
- Real work ahead at two sizes. You open with a small fix, a few lines here and there. Later the training runs experiments on bigger things: an epic you're about to start, a refactor that's been sitting, a feature with unknowns. The repo should have both.

Pick one. Every rule and every memory you build during the training lands here.

*Really stuck for a repo that fits? Ask your trainer for the fallback repo, or [build one from zero](trainings/agentic-engineering-101/supplementary/build-a-project-from-zero.md), and grow that across the training.*

## 2. Open a Claude Code session in that repo

**Session** *(new, "prework")*

Open a new Claude Code session at the repo you just picked. CLI or desktop both work.

<!--flag:payload-->
## 3. Get the content folder onto your laptop

Ask Claude to fetch `ae101-content.tar.gz` to `~/Downloads/`.

{{prompt:ae101-prework-download-tarball}}

You can also download manually from [the cohort URL](<CONTENT_URL>) to `~/Downloads/`.

## 4. Extract the bundle and install the curated skills

Mechanical setup. Claude needs to write outside the repo (`~/Documents/ae101-content/` and `~/.claude/skills/`); approve the permission prompts when they fire.

{{prompt:ae101-prework-extract-and-install}}

<!--/flag:payload-->
## 5. Pick a trivial bug and confirm Module 1 readiness

Now the interactive step. Claude walks three trivial bug candidates from your repo's backlog, helps you pick one, then confirms the repo can test, branch, commit, and open a PR.

When Claude gets to the bug screen, push back if it dumps all four criteria at once. One bug at a time, then the next. Trivial means a few lines here and there, not a multi-file refactor.

{{prompt:ae101-prework-screen-and-ready}}

If Claude's screening feels like everything-at-once, ask Claude to use the AskUserQuestion tool, or to give you the candidate-bug screen one bug at a time. Whichever reads better.

{{prompt:ae101-prework-one-at-a-time}}

*Small steer, small trick. A minute here, another there.*

## Pre-read before Module 1

Optional. One read, any time before the first session.

**Read: Simon Willison, [Vibe engineering](https://simonwillison.net/2025/Oct/7/vibe-engineering/)** (October 2025). Willison draws the line between vibe coding and working with coding agents as an accountable engineer. You start Module 1's first bug fix on the accountable side of that line.

## Bring to Module 1

The bug you picked. Come to Module 1 without one and you'll be scrambling for one while the exercise is already fixing bugs. Your call.

The opening question at Module 1: *what's your favourite Claude Code trick that not many people know?* Bring one. Doesn't have to be big. No trick? Bring a moment Claude Code frustrated you.

<!-- maintainer -->

**Prework owes no licence check and no network/proxy check.** (Antti 2026-08-13, closing a maintainer-call.) When `cohort-onboarding-email.md` was collapsed into a welcome plus a link here, two of its sections had no other home: confirming a paid Claude licence is active, and confirming a corp proxy or VPN is not in the way. The call is that neither is owed. Licensing is settled in the sponsor conversation before anyone reads this page, and a blocked network cannot hide — the student opens a real session at the step below, which fails loudly and immediately if the connection is not there. A check that only ever confirms what the next step proves anyway is ceremony. Do not add a setup beat for either, and do not resolve it by restoring the email, which would re-open the drift the collapse closed.

**The two `{{prompt:}}` fences in `## 5. Pick a trivial bug and confirm Module 1 readiness` are accepted, not an unextracted exercise.** `check_pedagogy.md` §52a treats a fence in module prose as a greppable tell for an exercise nobody extracted, and this section matches the tell. It is not the thing the rule was built from: §52a's precedent is a four-prompt section carrying a Session widget, big enough that the deck hands it one unbreakable slide. This is one screening prompt plus its fallback for when the screen arrives all-at-once — the second only fires if the first misbehaves. Extracting it would give prework an exercise file before the training starts. Accepted-by-design 2026-08-13 (Antti-directed): do not extract, do not re-raise.

**2026-07-30 (pre-read wiring):** added `## Pre-read before Module 1` (Willison, *Vibe engineering*). Body touched — per-class Quality SHAs below predate; re-audit before ship. The read is optional and outside the 30-min prework runtime target (~15 min if taken).

**Source verification — freshness stamps (`source-freshness.sh`; format `curriculum/source-freshness-format.md`).**

- `[checked:2026-07-30 result:OK due:2027-01-30]` https://simonwillison.net/2025/Oct/7/vibe-engineering/ — [practitioner direct] (Willison, 2025-10-07). Outside the 6-month window by decision: named framing piece, dated in body, same treatment as the Cherny video exception in `getting-going.md`. fallback: drop the pre-read; Module 1 stands alone.

**Quality:** compendium-audited 2026-08-19 (writing@a7f3966 story@a7f3966 technical@a7f3966 behavior@1c765f2 pedagogy@a7f3966 strategy@1c765f2 slides@a7f3966)
- judges @a7f3966: writing PASS, story PASS, technical PASS, behavior PASS, pedagogy PASS, strategy PASS, slides PASS
- cross_module @99aeb416: PASS — set=[prework,getting-going,plan-mode-done-right,earn-the-trust]; 3 pairs, 0 blocking; see instances/ae101--module-set--prework-m3.cross_module.json

**Meta:**
- **Runtime:** 30 min target. Step breakdown: pick repo 10 / open session 3 / content folder 3 / extract + install 5 / pick bug + readiness 8. The early steps are crisp; the bug screen is where time can expand if the student's repo is messy.
- **Delivery architecture** (working dir, content folder, skills install, compounding-artifact split): canonical in `training-architecture.md` §Working directory model / §Material distribution / §Skills / §Rule files. Not restated here.
- **Transport:** two download paths — agentic default (Claude `curl`s `<CONTENT_URL>`) and manual browser fallback; both land the same tarball, Steps 4–5 identical after. Cross-platform via Claude Code's Bash tool. **Auth gate:** `<CONTENT_URL>` sits behind HTTP basic auth. Agentic path — the download prompt warns Claude of the wall and has it ask the student for username/password on a 401, then retry (`curl -u`). Manual path — the browser pops its own basic-auth dialog on the same credentials. Cohort credentials distributed out-of-band (not in the workbook). **Windows shell, verified 2026-08-02 against `code.claude.com/docs/en/setup`:** Claude Code requires **Win10 1809+/Server 2019+** (not 1803 — `curl.exe`+`tar.exe` ship from 1803/build 17063, but Claude Code's own floor is 1809, and that's the binding number). Git for Windows is **optional**; with it the Bash tool runs through Git Bash, without it Claude Code falls back to the **PowerShell tool**, and WSL is a third path. No student-facing Windows note needed: a pro who has `git worktree` already has Git Bash or WSL, and on the PowerShell-tool path the agent translates the M3/M5 worktree prompts' shell snippets (`cp`, `cp -r`) into PowerShell itself — they sit under a natural-language lead-in ("copy the gitignored personal files into the worktree…") as intent-illustration, not a literal script, so `runtime: any` holds.
- **`<CONTENT_URL>`:** literal placeholder in source, build-time substituted per-customer by `scripts/build-workbook.js`. Explicit exception to `check_prompts.md §1` (no placeholders in fenced blocks) — covered by build substitution, not student fill-in.
- **No pre-fabricated files.** Student generates all state in conversation (the *ask-the-agent-don't-type-in-a-terminal* pedagogy); the manual-download fallback is a transport primitive, not a file-edit.
- **Install blockers are non-fatal.** Curated skills first fire at M3, so a failed Step-4 install is repairable before then — don't absorb debugging into M1. Rescue framing lives in the trainer handbook (trainer-modules.md, M3 tab, "If the stunt doesn’t fire").

**Artefact contracts** (M0 setup artefacts consumed by later modules; maintainer-only metadata for handoff audits):

| Artefact | Stable identifier | Produced by | Consumed by |
|---|---|---|---|
| AE101 content bundle | `~/Downloads/ae101-content.tar.gz` extracted to `~/Documents/ae101-content/` (or student-confirmed equivalent) | Prework download + extract prompts | Every module as local reference material; M3 skill install source; reference + supplementary links remain browsable from the content folder |
| Curated skills | `~/.claude/skills/access-control-analysis/SKILL.md`, `~/.claude/skills/stride/SKILL.md`, `~/.claude/skills/security-tools/SKILL.md` | Prework extract-and-install prompt | M3 Exercise 1 invokes `access-control-analysis`; M3 Exercise 2 invokes `stride` and `security-tools` (the latter as the rick-roll pre-flight) |
| Chosen trivial bug | Prework session scrollback in the chosen repo, plus tracker/repo context if one exists | Prework bug-screen conversation | M1 `fix-tests-first` prompt consumes the selected bug |
| Repo readiness read | Prework session summary: test command or named check path, git status, PR readiness blockers | Prework readiness check | M1 trainer/student triage; M1 `fix-tests-first` and `compound-and-close` assume the repo can test, branch, commit, and open or draft a PR |

**Packaging:** see `scripts/build-ae101-content-tarball.sh` header — it owns the source whitelist (incl. the 3-skill `SKILLS=()` array), maintainer-block stripping, and the `build-workbook.js` deploy/`<CONTENT_URL>`-substitution chain. Tarball filename owned by `training-architecture.md` §Material distribution.
