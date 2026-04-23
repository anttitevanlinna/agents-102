# Ship a trivial bug

**What you do:** run one trivial bug from your repo through a deliberate three-phase loop. Orient and introspect (Phase 1). Fix it tests-first, no plan mode (Phase 2). Retro, wire one MCP, close the ticket (Phase 3). Your personal `CLAUDE.local.md` (gitignored, yours — see [reference § 1](../reference/claude-code-for-engineers.md)) gets seeded from what you did, not from a template.

**What happens:** a real PR ships. A personal `CLAUDE.local.md` is born from session evidence (gitignored — doesn't touch team review). One ticket closes via MCP. You've seen `/context` — the instrument that shows where the 10% you couldn't address actually lives.

**The point:** every module after this one rides on this loop. The loop isn't the bug fix — the loop is the shape: orient, fix, compound, extend. Teach the shape abstractly and engineers nod. Run it head-on and the shape lives in muscle memory.

**Time:** 85–95 minutes, three phases.

## Phase 1 — Open and introspect (15–20 min)

Claude Code is open on your repo. Prework gave Claude a rough look at what's here. Now: deliberate orientation, then the instrument that shows you what Claude actually read.

**Prompt** *(copy → Claude Code)*

```
Read enough of this repo to tell me what's here — the shape, the substrate, what looks load-bearing, what's been touched recently, what looks stale. Don't try to be complete. Read what you judge worth reading; skip what you judge isn't.
```

*(end of prompt)*

Claude reads and reports. Let it finish.

Now introspect on the read:

**Prompt** *(copy → Claude Code)*

```
What did you read, and why those files? What didn't you read, and why not? Name the specific files or directories you skipped and the call you made on each.
```

*(end of prompt)*

Read Claude's own account. This is one of the most useful moves in the training: Claude can introspect on what it did and why, including what it chose to skip. The caveat is load-bearing — the self-report is a hypothesis, not ground truth. Claude confabulates reasons sometimes. Take it with a grain of salt; verify against the actual output and the instrument below.

Now look at the instrument directly. In the Claude Code chat, type:

```
/context
```

That's the slash command for the context window — what's loaded, how much, what's been consumed reading files. Look at the number. The rest of the repo — the slice Claude *didn't* load — is where the 10% it couldn't address lives. Not a bug; the shape of working with a bounded window. Your job going forward is to steer what lands in those bytes.

## Phase 2 — Fix it right (40–45 min)

No plan mode here. Plan mode earns its keep in M2 on multi-file work; on a trivial bug, it's overhead. The move is tests-first, root-cause-driven.

Bring the bug back. In prework, Claude surfaced three candidates and you picked one. Paste the bug — a sentence or two — back into the conversation. If prework's scrollback is still open, tell Claude to look back.

**Prompt** *(copy → Claude Code)*

```
Find the root cause of this bug by writing the tests that would reveal it. Run the tests — confirm they fail the way you'd expect. Then fix the root cause, not the symptom. Run the tests again. Show me the diff before you commit.
```

*(end of prompt)*

Claude writes the failing test, watches it fail, fixes the code, watches it pass. Read the diff. If a line isn't what you'd have written, push back — quote the line and say why. Whoever has the better argument wins.

Ask Claude to commit, push a branch, and open the PR (merge or draft, your call).

Now write the rule — while the move is warm, before the retro.

**Prompt** *(copy → Claude Code)*

```
Look at the loop we just ran — tests first, root cause not symptom, diff read with a push-back. Write a short rule into my personal `CLAUDE.local.md` at the root of this repo (create it if it doesn't exist; add it to `.gitignore` if it's not already). Four to six lines. Name the preference concretely enough that the next session reads it and runs the same loop without being prompted. If the file exists, integrate — don't append.

If this rule is team-worthy — if every engineer shipping this codebase would benefit — flag it when you tell me what you wrote, so I can open a PR against team `CLAUDE.md` separately. Don't PR it automatically.

When you're done, tell me in two lines what you wrote and why.
```

*(end of prompt)*

Read what Claude wrote into the file. Push back if it misread the move — quote the session moment that should have gone in differently. This is the first compound step. Every module extends this file from here.

## Phase 3 — Retro, MCP, close the ticket (30 min)

### Retro (~10 min)

**Prompt** *(copy → Claude Code)*

```
Review this session end-to-end — Phase 1's orientation and introspection, the /context read, the TDD bug fix, the diff push-back, the rule we just seeded. Rewrite `CLAUDE.local.md` in place (integrate, don't append — this is my personal gitignored file, not the team `CLAUDE.md`). Add rules that came from how we actually worked, not rules that sound good. Name the shape of the loop we ran and cite the practitioner who wrote it up if one fits.

If any rule is team-worthy — one every engineer on this codebase should know — flag it in the summary below, don't PR it. I'll decide whether to open a separate PR against team `CLAUDE.md`.

Tell me in 3–5 lines: what you added, what you sharpened, what you removed, and why. Be specific about session moments — I shouldn't need to open the file to know.
```

*(end of prompt)*

Read Claude's summary. Push back where it misreads — quote the moment. That push-back is the reflection move. The rules file stops being a blank template and starts being yours.

### MCP — why your agent needs to reach outside the repo (~5 min)

Up to this point, your agent's reach stops at the repo. Real engineering work spans tickets, pull requests, CI, chat, documentation — the system around the code. **MCP** is the protocol Claude Code uses to connect to that system. Three words that land together — **connector** (the wire into a work app), **action** (a verb with effect in the world), **tool** (the umbrella for anything the model can call) — full primer in `reference/mcp-and-connectors.md`.

One connector, two actions (read + update), is enough to close the loop you just ran on the bug in the tracker your team actually lives in.

### Close the ticket (~15 min)

Wire one connector to your ticket tracker, read the ticket matching the bug you just fixed, update it with a close-out note and the PR link. Your sponsor named the tracker (Linear, Jira, GitHub Issues, or similar) in the pre-engagement contract — use that one.

**Two-minute setup.** If your tracker is GitHub Issues: in Claude Code, check `gh auth status` — Claude runs `gh` for you via Bash, no MCP install needed. For Linear or Jira: follow the install line in `reference/mcp-and-connectors.md` for your tracker. That reference stays current with Claude Code's install surface; this exercise doesn't carry the command itself so it can't go stale.

Once the connector (or `gh`) is live:

**Prompt** *(copy → Claude Code)*

```
Read the ticket for the bug we just fixed. Tell me what it says — the reporter, the description, any comments on it. If you can't find a matching ticket, search by the bug's keywords; if there still isn't one, say so and we'll create one.
```

*(end of prompt)*

Claude reads the ticket (or confirms there isn't one). Then:

**Prompt** *(copy → Claude Code)*

```
Update the ticket: short close-out note naming what the root cause was and how we fixed it, link to the PR you opened in Phase 2. If we needed to create the ticket just now, create it first, then update. Show me what you'll write before you post it.
```

*(end of prompt)*

Read the close-out. If Claude wrote something that reads stiff or wrong, push back — tell it how your team actually writes ticket comments. It'll adjust.

Ship the update. The bug fix is now visible where it should be: in the tracker your team reads, not only in the repo.

You ran the loop. You have a PR, a rules file born from session evidence, and a ticket that closed itself from inside Claude Code. The substrate is in place.

<!-- maintainer -->

**Meta (trainer):**
- **Primary Bloom's level:** Apply (run the three-phase loop) + Analyze (read Claude's own introspection against `/context`; read the retro summary against session moments)
- **Exercise time band:** 85–95 min inside a 2h M1 slot (Connections 10 / Lecture 10 / Exercise 85–95 / Bridge 5). 2h is deliberate for M1 — longer than M2–M4's 1h45 because of the orientation ramp + MCP wiring.
- **Delivery architecture** (strategy doc § "Delivery architecture"): all compounding artifacts land in the student's real repo. `CLAUDE.local.md` (personal, gitignored) is seeded at P2, extended at P3 retro. Team `CLAUDE.md` is untouched unless the student explicitly chooses to PR a team-worthy rule. No training-dir state. No `module-1/` folder. No `prework/bug.md`. See `reference/claude-code-for-engineers.md § 1` for the four-layer hierarchy.
- **Artifact locations — governed by the pre-engagement contract** (strategy doc § "Pre-engagement contract"):
  - **Personal rules file** (seeded at P2, extended at P3) → `./CLAUDE.local.md` by default (gitignored). Cross-repo-portable personal rules → `~/.claude/CLAUDE.md` as an override. Both load alongside team `CLAUDE.md` at session start per `reference/claude-code-for-engineers.md § 1`.
  - **Team rules home** → sponsor-stated (pre-engagement contract); `./CLAUDE.md` / `.claude/CLAUDE.md` / `AGENTS.md` are the common shapes. PR-gated; not session-compounded.
  - PR → the student's usual VCS (GitHub / GitLab / etc.); whatever the team already uses.
  - Ticket tracker (P3) → sponsor-stated tracker (Linear / Jira / GitHub Issues / other).
  - **Student override is legitimate, not rebellion.** A reasoned move to a better home feeds back to the sponsor as signal.
  - **Opting out is not a path.** Compound step needs a durable home.

**Frameworks riffed on:**
- **TDD (test-driven development)** — Phase 2's tests-first, root-cause-driven fix riffs on a framework engineers already know. Named implicitly ("tests-first"); the rule seeded into `CLAUDE.local.md` is the student's own TDD-style preference.
- **Compound engineering** — Kieran Klaassen (Every Inc.). Plan → Work → Review → Compound. Convergence Level 3. Source: `continuous-research/platform-watch/coding-agents/runs/2026-04-21-klaasen-compounding-engineering.md`. URL: `every.to/source-code/compound-engineering-the-definitive-guide` `[practitioner direct]`. Attributed inside Claude's P3 retro summary (the retro prompt asks it to cite if one fits), not in a lecture.
- **Three-block memory** — Paweł Huryn (productcompass.pm). Level 2 single-experiment. Source: `continuous-research/insights.md` lines 1051–1065. URL: `productcompass.pm/p/claude-md-snippets` `[practitioner direct]`. Materials are seeded in M1 (observation at P1 → Block 1; TDD rule + diff push-back → Block 2; the test itself → Block 3). The three-block *frame* earns its name in M4 when the materials get rearranged. Don't teach three-block in M1.

**Themes planted (content-strategy § "Recurring themes"):**
- **Theme 3 (mirror)** — P1's "read the repo" shows the student their prompt reflected in Claude's read.
- **Theme 4 (self-aware, grain of salt)** — P1's introspection prompt; P3's retro summary; the "verify against artifact" move in both.
- **Theme 1 (90% correct)** — `/context` makes the bounded window and the unread slice visible.
- **Theme 2 (compounding builds the system)** — P2's rule-to-`CLAUDE.local.md` is the first compound step; P3 extends it; the file grows across the training.

**Watch-fors:**
- **P1 skim past introspection.** Student reads Claude's repo summary without running the second prompt. Diagnostic: conversation moves to the bug fix without a "what did you read/skip" exchange. Nerd push: *"before we move on — what did Claude choose not to read, and does that match what you'd have expected?"*
- **P1 `/context` skipped.** Slash command is easy to miss as "a line of prose" rather than a command. Nerd push if they skip: *"type /context in the chat — look at the number."*
- **P2 tests-skipped.** Student pastes the bug and Claude jumps straight to a fix. Common failure mode. Nerd push: *"back up — what's the failing test that would prove this bug exists?"* If the repo has no test infrastructure on this path, log *"no verifier here"* and name it as the first Quality-Gate entry (landing in M4).
- **P2 diff rubber-stamp.** Student says "looks fine" under 30 seconds. Nerd push: *"find me one line you'd have written differently — not wrong, just different."*
- **P2 `CLAUDE.local.md` rule-rubber-stamp.** Student accepts whatever Claude writes without reading. Nerd push: *"read it aloud — if you opened a new session tomorrow, would this line make you run the same loop?"*
- **P3 retro confabulation.** Claude's 3–5 line summary name-drops moments without quoting. Nerd push: *"quote the specific session moment that made you add rule X. If you can't, take it out."*
- **P3 MCP install gate.** Corporate tenant blocks connector install. Tenant-admin fallback named per tracker (see Phase 3 TODO). Do not treat as blocker — fallback path always exists.

**Decision points:**
- **P2 runs over 50 min.** Bug wasn't trivial. Let it complete; trim P3 MCP exercise to read-only (skip the update), flag for follow-up. Note for M2 — student benefits more from plan-mode-at-depth than average.
- **Student finishes P1–P2 under 45 min total.** Picked something too small. Offer second bug, or use saved time to explore `/context` and introspection more deliberately.
- **Student's repo has no test infrastructure.** P2 ends without test verification. Log "no verifier on this path" in the `CLAUDE.local.md` rule — real finding, not exercise failure. M4 picks it up.
- **Student's sponsor stated a tracker the cohort's Claude Code can't connect to.** Fall back to create-a-markdown-ticket in the repo; MCP exercise converts to *"write a ticket into `docs/tickets/` and link the PR."* Sponsor gets a signal.

**Plug points:**
- Student's own repo (chosen in prework)
- Student's own bug (surfaced by Claude in prework)
- Sponsor-stated tracker for P3 MCP
- Agentic Nerd push-back moves at P1 / P2 / P3 retro

**Agentic Nerd logic (TODO — skill not yet created; the Nerd reads this file + `lectures/the-wizard-move.md` from the content folder):**
- **P1 introspection skip:** invoke the "what did you not read" push.
- **P1 `/context` skip:** remind to run the command.
- **P2 tests-skipped:** invoke the tests-first push.
- **P2 diff/rule rubber-stamp:** invoke the push-backs above.
- **P3 retro confabulation:** invoke the quote-the-moment push.
- **P3 MCP install gate:** surface the sponsor-stated fallback path.

**Arc:**
- Picks up from: Connections (trick exchange) + the-wizard-move lecture (framing).
- Hands off to: Bridge into M2.
- M2 picks up: plan mode at depth on multi-file work, now that the bug-fix loop is muscle memory and `CLAUDE.local.md` (+ team `CLAUDE.md` if it exists) sits at the top of the next session's read.

**Dependencies shipped 2026-04-23 (reconstruction pass):**
- **`curriculum/reference/mcp-and-connectors.md`** — flat-lookup reference for MCP install, per-tracker (GitHub `gh` CLI / Jira Rovo MCP / Linear third-party bridge), tenant-admin fallbacks. Exercise P3 points at it; reference stays current with Claude Code's install surface.
- Capability check completed via `claude-code-guide` (2026-04-23): Claude Code MCP is CLI-first as of 2026-Q2; no GUI yet. GitHub Issues cleanest via `gh`. Jira via Atlassian Rovo MCP (official). Linear via Composio/Merge (third-party).

**TODO (follow-up — next turn):**
- Update module file `getting-going.md` per alignment duty:
  - LOs — replace *"plan mode used deliberately"* with the three-phase framing (orient+introspect / fix-without-plan-mode / retro-and-extend).
  - Session runtime — 1h45 → 2h.
  - Debrief section — replace with a one-line pointer that the retro runs inside exercise P3; no separate Debrief block.
  - Big Idea — drop *"invoke your first skill"* (new shape uses `/context` + MCP, not Claude Code Skills; adjudicate with Antti whether skill-invocation returns or moves to M3).
- Three-persona simulation on the new shape (Maija mid-competent / Greg opinionated senior / Jin fast operator) focusing on P1 introspection feel, P2 tests-first pressure, P3 MCP gate realism.
- Bootstrap alignment spot-check — the `curriculum/reference/` directory is now used. If this is the first file there, confirm the content-folder zip script includes it.
