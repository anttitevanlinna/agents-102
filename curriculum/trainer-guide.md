# Trainer delivery guide

**What this file is.** Trainer delivery operations — read once before your first cohort, re-skim by section before each session. Authoring rules and content-generation rules live in `memory/check_*.md` compendiums and `.claude/skills/content-creation/SKILL.md`. Curriculum architecture lives in `curriculum/CLAUDE.md`. This guide is for what happens in the room, not what happens before the file ships.

Read this once before you deliver your first cohort. Re-skim the section that matches what you're about to do (prepare, run a session, handle a thing going wrong). Not secret — students can read this too. They mostly won't. The rules are the same either way; this just names them.

Written for: anyone leading an Agents 102 cohort. The portfolio currently runs **two trainings** with different audiences and different delivery architectures:

- **Bootstrap** — for builder leaders making the chat-to-systems leap. Business audience. Eight-module mood arc (joy → compound → unease → deeper unease → rescue → leverage → generosity → awe). Shipped artifacts land in a training directory with `module-N/` folders.
- **Agentic Engineering 101 (AE101)** — for software engineer ICs (L0 → L3 path). Different delivery architecture: content folder unzipped by the student, all compounding artifacts land in the student's real repo. **No `module-N/` training-dir state.** AE101 currently runs M4–M6 in the long-running pattern in production. Its mood arc differs (wonder → discipline → unease → patience → diagnosis → leverage). For canonical AE101 architecture, see `bosser-strategy:content-strategy-agentic-engineering-101.md`.

The training is hands-on from minute one in either variant; the trainer's job is to keep the room moving together while every student does the work themselves on their own laptop.

**Two baseline assumptions** this guide rests on:

- **You're an expert-level Claude Code user.** This guide doesn't teach the tool — that's not its job. Skills, slash commands, plan mode, sub-agents, settings layers, hooks, MCP — you use these fluently. If a curriculum file references a Claude Code primitive you haven't met, that's a curriculum bug to flag, not a gap in your skill set.
- **You've dry-run every exercise on your own setup before the session.** Not "read it" — actually run it, end to end, on the demo repo. The dry run is what gives you the live cadence (timing per phase, what the agent tends to do, where the room will get stuck) AND a stockpile of war stories to fill agent waits with. A trainer who hasn't dry-run is improvising on stage.

## Dual-runtime — know which surface the cohort is on

The training platform is **Claude Code (CLI + Desktop) + Cowork**, current as of 2026-04-29. Same prompts, same artifacts; skill install surfaces differ. Before each session, **confirm with the customer which surface their cohort is using** and adjust your narration vocabulary to match.

- **Claude Code surface (CLI or Desktop app).** Vocabulary: *subagent*, slash commands, plan mode (Shift+Tab cycle), `/loop`, `/schedule`, the **Schedule sidebar**, the **+** button next to the prompt, **Settings → Connectors**, the desktop **mode dropdown**.
- **Cowork surface (Cowork tab in Claude Desktop).** Vocabulary: *agent* (not subagent), the **Cowork tab** in Claude Desktop, **Customize → Skills → New → Create with Claude**, skill save after authoring, and the **connected-folder model** in place of CWD.

Mixing vocabularies live ("the subagent — uh, the agent —") signals you don't know the surface. Pick one before the session and stay in it. If a curriculum file uses the runtime-fork paired-divs pattern (`<div class="rt-code">` / `<div class="rt-cowork">`), the projected site auto-swaps based on the cohort's runtime — you don't have to read both.

## What you do, in one paragraph

You project the recap site for the module the room is doing. You demo each exercise prompt slowly on your own Claude Code while the room copy-pastes into theirs. You honor the conversation pauses written into the exercise (say them out loud; they're as much for you as for the room). When the agent runs, you fill the air — usually with what happened on your dry run, or with a Claude Code tip the room will use later. You watch your own session and the room's faces; you don't switch to a hidden trainer-only document mid-flow. When a student is stuck, you triage in seconds — recover or defer. The curriculum carries the teaching; you carry the cadence.

## How a session looks

The shape is the same every session, every module:

1. **Open the recap site to the module page**, project to the room. The recap site is at the URL the customer's L&D contact gave you; bookmark it. Check the projection legibility from the back row before students arrive — font size, contrast, header chip readability on prompt blocks.
2. **Open your own Claude Code session** in your demo repo (more on the demo repo below). Make sure you're on the network and license you'll use throughout — switching mid-session is friction. Confirm you're on the same surface (Code or Cowork) the cohort is using.
3. **Walk through the module page top to bottom.** Read the Big Idea aloud. Read the Connections question, take answers from the room. Move into the exercises in order.
4. **At each prompt block:** click the Copy button on the projected site, paste into your Claude Code, send. Narrate as the response streams. The room copy-pastes the same prompt into their own session concurrently — this is follow-along, not watch-along. Per the cadence rule below, your time budget is the slower of the two paces, not their sum.
5. **At each conversation pause:** stop. Read the pause prompt aloud. Take 60–90 seconds of room conversation. Then move on. Pauses are how the room stays together; skipping them is how stragglers fall off.
6. **Close the module's Debrief and Bridge.** Name the artifact the room just produced. Name what's coming next.

There are no slides. The curriculum site is the slide. There is no separate trainer pane on your screen; if it's on your screen, the room sees it (more on this below).

## The classroom rules — what's load-bearing

These are documented in `curriculum/CLAUDE.md` § Classroom delivery — default mode, but they're load-bearing enough to repeat here.

**1. The recap site is the projection surface.** Open it to the module page. Don't toggle to a deck, a doc, a Slack window, an editor. The room's eyes track yours; if you're somewhere they can't follow, you've lost them.

**2. Every exercise is follow-along; the time budget is `max(trainer, student)`, not the sum.** You demo, the room copy-pastes the same prompt at the same time. The Copy button on every prompt block exists for this — students click it, paste into their own Claude Code, watch their session run alongside yours. Two paces happen concurrently; the budget is the slower of the two (usually yours, the demonstrator), **not the sum of trainer-time plus student-time**. A 25-min exercise stays in 25 min when the trainer paces deliberately. (Per `2026-04-24-pedagogy-in-class-concurrent-pace.md` — the most-violated cadence rule in first-time delivery.)

**3. Conversation pauses are written into the exercise.** They look like *"Take 90 seconds and compare what your session printed with the person next to you"* in the body prose. When you reach one, stop and read it aloud. Don't skip them; they're not optional polish, they're the structural beat that lets stragglers catch up. If you find yourself ahead of the room, you skipped a pause — back up.

**4. Your screen is shared most of the session.** Whatever is on your screen is visible to the room. There is no private trainer pane during delivery. Anything you need to read in private has to happen before you start sharing — read this guide before the session, not during. If you really need a private surface during delivery (timer, pacing notes, a secondary cheat sheet), use a phone or a second device, not a window on your laptop.

**5. Hard rule — don't read maintainer blocks during the session.** Maintainer blocks (the section below `<!-- maintainer -->` in module and exercise files) hold source citations, eval logs, design history, quality-state tags. They are **pre-rehearsal material only**. Run-time cues live in student-visible prose — a pause beat written as *"Take 90 seconds and compare what your session printed with the person next to you"* reads as instruction to the room AND as cue to you. Cognitive load of running the room + projecting + operating Claude Code is already maxed; there is no spare attention for a hidden context-switch. If you find yourself wishing for a cue that isn't on the projected page, the curriculum has a bug — flag it for the editors, don't paper over it by toggling to the maintainer block.

**6. The cadence rule beats the script rule.** You won't say the words on the page verbatim every time. The room's energy, the questions that come up, what the agent decides to do this run — all of it shapes what comes out of your mouth. The curriculum carries WHAT to do and roughly WHY. You carry the room.

**7. In cohort delivery, you carry the push-backs by default.** The host-skill (Teacher Claude in self-study, Agentic Nerd in Bootstrap variants) is **optional** in cohort mode. Don't expect a pre-installed Nerd skill in the room. The trainer delivers the push-backs, the contrast moments, the "now do it again differently" beats live. Host-skill stays for self-study, or for specific cohort opt-in when the customer asks for it. (Per `2026-04-24-pedagogy-host-skill-optional-trainer-default.md`.)

## How to prepare for a cohort

The work that protects the live session.

### A week or so before Day 1

- **Send the cohort onboarding email.** Template at `curriculum/trainings/agentic-engineering-101/cohort-onboarding-email.md` (AE101) — equivalent for Bootstrap when that cohort lands. The email confirms license, install, repo, network, **and which runtime surface (Code vs Cowork) the cohort will be using**. Sending it 5 working days ahead gives engineers time to escalate to IT if needed. Don't skip — install issues that surface in Module 1 are the single biggest first-cohort risk and you cannot rescue them from the front of the room.

### A few days before each session

- **Read the module page top to bottom.** Including every exercise it inlines, every lecture it inlines, the Connections question, the Debrief, the Bridge. Read it the way a student will, on the recap site. If you're delivering for the first time, also read the matching reference pages and supplementaries. **Pre-reads convention:** between-module reading appears in BOTH the previous module's closing section AND the current module's Prework. Same reference, two places — that's intentional, not a duplicate. You'll see it twice; the room will too.
- **Check the maintainer-block Quality tag** during prep (not during session). The tag tells you what audit level the file has cleared:
  - `draft` — fresh from generation; no audit cleared. Dry-run extra carefully and expect to flag issues.
  - `compendium-audited` — static rules cleared at ship time. Safe but unproven live.
  - `sim-passed` — three-persona register sim cleared. The voice and smell are clean.
  - `mechanical-tested` — prompt chain executed on a real scratch repo and passed assertions. The prompts actually work.
  - `cohort-tested` — survived ≥1 real cohort delivery. Known-good in the room.
  - `battle-tested` — ≥3 cohorts in trailing 12 months. Trust it.
  Higher tier ≠ skip the dry run. But a `draft` file in your slot warrants a longer dry run and a backup plan.
- **Dry-run every exercise on your demo repo, end to end.** Not skim, not partial — actually run each prompt, watch the agent do its thing, take the artifact through to its real conclusion. This is non-negotiable. The dry run gives you (a) timing calibration per phase, (b) a feel for what the agent tends to do this week, and (c) the war stories you'll use as agent-wait filler. If a demo behaves unexpectedly, flag it for the editors before the room sees it. (The curriculum file remains the source of truth; if your run differed, the curriculum is what students follow.)
- **Stockpile filler material from the dry run.** Note specific moments worth telling the room about: where the agent surprised you, what it produced that wasn't in the curriculum, what you'd have done differently. These are the lines you'll deliver during agent waits — see "What to talk about during agent waits" below.
- **Mentally place the conversation pauses.** Find them in the prose. Notice their rhythm. You'll read them aloud in the room.
- **Verify your own setup.** Your Claude Code version, your installed skills, your network, your demo repo's clean state, the recap site URL bookmarked. Anything you'll switch to during the session is something the room sees; rehearse the switches.

### The demo repo

The repo you'll demo from. Two viable shapes:

- **A real codebase you own.** Highest credibility (the room watches you debug for real), highest variance (anything can happen). Recommended once you've delivered the module a couple of times and know which moments tend to misbehave. If you do this, pick a repo where you genuinely have work to do — students smell theatre. **For AE101**, this is the default — AE101 students work in their own real repos, so a real demo repo matches their architecture.
- **A rehearsal repo prepared for the training.** Lower credibility ("oh, the trainer pre-baked it"), lower variance (each exercise produces a known outcome). Recommended for first delivery and for high-stakes cohorts where a derailed demo costs the room's trust. The rehearsal repo lives in your own GitHub; treat it as a personal artifact, not a curriculum scaffold.

Either way: the repo is yours, not the curriculum's. Choose deliberately, rehearse on it, keep it clean between cohorts.

## When things go wrong — triage moves

Not every move; the common ones.

**A student's Claude Code stopped working mid-exercise.** Triage in 30 seconds. If it's a known-fast fix (re-auth, network blip, repo permission), help. If it's a corp-laptop install issue, defer — name a buddy in the room who can help during the next pause, or refer to the cohort's IT escalation path. Don't pause the whole room for one laptop.

**A student's exercise output looks different from yours.** Often this is correct — agents are non-deterministic and the curriculum names this as a feature, not a bug. Read aloud the spirit of what the exercise was supposed to surface; ask the student to name what their version produced; compare in the room. The contrast is often the teaching moment.

**The room is moving slower than the time budget.** Don't sprint to catch up; you'll lose more people. Compress the demo (skip an optional aside, fold two pauses into one, accept that a phase ran long). The next session has its own slot; you can pick up the slack at the next module's bridge.

**The room is moving faster than the time budget.** Don't pad. The exercise is done when the artifact lands and the pause has happened. Use the recovered time on the Connections question, on a deeper pause, or on letting people start packing.

**You're falling behind your own slot.** Tell the room. *"I'm going to compress the next phase to land us on time."* Adults appreciate transparency. Don't pretend the slot is fine when it isn't.

**You don't know the answer to a question.** Say so. *"I haven't tried that — let's see what Claude does."* Try it live. The curriculum is honest about what's load-bearing and what's improvisation; you're allowed to be too.

## What to talk about during agent waits

Most exercises have at least one agent run that takes 30 seconds to several minutes. Agent waits are designed pause anchors, not dead air. The room watches both your projected screen (the agent thinking) and your face (you, talking). Three reliable filler categories, ranked by how much value they deliver to the room:

**1. War stories from your dry run.** *"When I ran this on Tuesday, the agent first wanted to do X — I had to push back twice before it did Y. Watch your own session; you'll probably see something similar."* This is the highest-value filler because it primes the room for what's about to happen and signals you've done the work. The dry run exists to produce this material.

**2. Personal Claude Code tips and tricks.** Things you do every day that the room hasn't met yet. *"While we wait — I keep a `~/.claude/CLAUDE.md` with three rules every project inherits. The first one is..."*. *"Quick aside while this runs — when I want a sub-agent to NOT inherit my session's context, I pass `isolation: \"worktree\"`. Worth knowing for Module 4."* Tips land best when they're either (a) a preview of what a later module will land formally, or (b) something the curriculum doesn't cover but the trainer uses anyway. Don't invent; tell what you actually do.

**3. Why the curriculum is shaped this way.** *"You'll notice this exercise asks you to push back twice on the plan. The reason — every plan-mode session in production drifts toward over-confidence on the second pass; the push-back move is what catches it. We'll see this again in Module 5."* Usable when you actually know the design intent. Don't fake it.

What NOT to fill agent waits with: filler-shaped filler. *"Soooo, while we wait..."*, *"This is a great moment to ask if anyone has questions"* (it isn't — direct it), *"Claude is thinking really hard right now"* (the room can see). If you don't have material, let the silence sit for 20 seconds. Silence is OK. Performed conversation isn't.

## Multi-week format specifics

Trainings that run one module per weekly session (AE101 default) carry a context-decay cost: between sessions, the student's working memory is gone. What survives is what's on disk. Your job at the start of each non-first session is to re-anchor.

- **First 5 minutes of the new session: lead a recap.** Name the artifact the room shipped last week. Name the mood the module landed in. Name the tools and state that should still be on disk (skills installed, content folder added, repo open). The curriculum will eventually carry per-module recap prompts at the top of each module; until then, you carry the recap.
- **Verify state, don't assume it.** Ask the room to confirm their setup is intact — skills present, content folder reachable, repo clean. Surface broken state early, not mid-exercise.
- **End of session: name what's on disk.** Before the room logs off, tell them what they just produced and what file/folder/state they need to keep around for next week. The student who deletes their content folder or repo state between sessions is the student who can't follow Module 4.

## Self-study mode (when there's no trainer in the room)

Some students will go through the curriculum solo. Self-study is treated as a bonus mode, not the primary delivery; the primary mode is classroom.

For solo students, the trainer's role is played by the **host-skill** — Teacher Claude (`/self-study`) for Bootstrap, or its AE101 equivalent. The skill orients the student to the working directory, paces them through modules, and stands in for the conversation pauses. Solo students invoke the skill at the start of their first session.

You don't need to do anything for self-study delivery; the skill carries it. If a student asks how to do the training without a cohort, point them at the appropriate host-skill.

## Per-training notes

### Agentic Engineering 101

- **Audience: software engineer ICs.** Not chat users, not business audience. Narrate at engineer register — concrete, system-shaped, no L&D corporate-speak.
- **Voice quintet — Boris × Martin × Godin × Rory × Risto.** Match the curriculum's register when narrating: factual+direct (Boris), strategic+logical (Martin), generous+social (Godin), insightful+counterintuitive (Rory), Nordic-engineer-grounded (Risto). Lead with the right one per moment; don't try to layer all five into one sentence. (Per `memory/compounded/2026-04-25-writing-ae101-voice-quartet.md` and its quintet extension.)
- **Delivery architecture: content folder + student's real repo.** No `module-N/` training-dir state. The student unzips a content folder once, then all compounding artifacts (skills, memory, agents, sources) land in their actual working repo. If a student asks about a "module-N folder," they're confusing it with Bootstrap — redirect.
- **Tool default: Claude Code CLI.** Most AE101 students use the CLI; the desktop app is a fine alternative; Cowork works equally if the cohort is on it. Demo on whichever the cohort uses; the prompts work in all three.
- **Multi-week cadence.** One module per weekly session, six sessions plus prework. M4–M6 currently run the long-running pattern in production — students dispatch a long-running agent at end of session and return next session to a completed (or partly-completed) artifact. The recap-at-session-open routine matters; see Multi-week section above.
- **The wizard-move framing lives in M1's live demo, not in prework.** Prework gets the student to the right state (repo, content folder, skills, picked bug); M1 lands the framing through the projected demo. If a student mentions they pre-read the wizard-move lecture, no harm done — but the M1 opening still earns the move live.
- **Bug-fix in M1, plan-mode in M2, security in M3, send-off in M4, return in M5, loop in M6.** That's the spine. The mood arc — wonder → discipline → unease → patience → diagnosis → leverage — is engineered. Don't resolve a mood early.

### Bootstrap

- **Audience: builder leaders making the chat-to-systems leap.** Business audience, not engineers. Different register from AE101 — less code-shop, more leverage-and-systems framing.
- **Eight-module mood arc:** joy → compound → unease → deeper unease → rescue → leverage → generosity → awe. Each module's mood is engineered; don't resolve a mood early. The mood-arc table lives in `.claude/skills/content-creation/SKILL.md` — read it once during prep so you know which beat each module is meant to land.
- **Delivery architecture: training directory with `module-N/` folders.** Students open `prework/` for prework, `module-1/` for Module 1, the training-directory root for everything Module 2 onward. Two folder-switch seams across the training. Architecture details in `curriculum/CLAUDE.md` § Material Distribution.
- **Cohort delivery in production landing.** Cohort-specific delivery notes will land here once Bootstrap cohorts run. Same delivery shape as AE101; mood arc differs.

## What you don't do

The list of moves that look like trainer behaviour but aren't.

- **Don't read maintainer blocks during the session.** Already named under the rules. Repeated because it's the failure mode this guide most wants to prevent.
- **Don't lecture from slides.** The curriculum site is the slide. If you reach for a deck, you've left the system.
- **Don't try to fix every install issue in the room.** Triage; defer corp-laptop debugging to a buddy or to IT. Your job is the room, not one laptop.
- **Don't summarise lectures the curriculum will land live.** A lecture is a teaching moment; pre-summarising it steals the punchline. The curriculum is structured so that each lecture lands in its slot — trust the slot.
- **Don't apologise for agent waits.** A multi-minute send-off is a designed pause anchor, not dead air. Talk the room through what's happening, what the agent is doing, what to look for in the response.
- **Don't pretend to know more than you do.** When a student's session does something you've never seen, name it as such. Try things live. The room learns more from watching you debug honestly than from watching you fake certainty.
- **Don't skip the Debrief.** It's the artifact the student carries forward. Even when the slot is tight, the Debrief lands.
- **Don't mix runtime vocabulary.** If the cohort is on Cowork, say *agent* and *connected folder*. If they're on Claude Code, say *subagent* and *CWD*. Mixing live signals you're not on the cohort's surface.

## Feedback loop — make this guide better

This is a living document. If you delivered a cohort and something here was wrong, missing, or unhelpful, file a note for the editors. The signal flows back to the curriculum and to the next trainer.

Two ways:

- **For the cohort you just delivered:** drop a short post-session note in `curriculum/self-study-signals/friction/` — anything the room got stuck on, anything the curriculum promised that didn't land. Filename: `YYYY-MM-DD-<short-slug>.md`. The editors read these on their refresh cadence.
- **For this guide specifically:** open a PR against `curriculum/trainer-guide.md` with the change. The customisation notes belong in your customer's per-cohort doc; the structural changes belong here.

The training compounds across cohorts. Your delivery is a data source.
