# AE101 Prompt Progression

Student-facing prompt blocks, in prework/module/include order. Maintainer sections are excluded.

## Prework — do this before Module 1

Source: `curriculum/trainings/agentic-engineering-101/prework.md`

**Prompt 1: 3. Get the content folder onto your laptop (3 min)**

Source: `curriculum/trainings/agentic-engineering-101/prework.md:33`

**Prompt** *(Claude Code)*

```
Download the AE101 content tarball to ~/Downloads. Use Bash:

  curl -fsSL <CONTENT_URL> -o ~/Downloads/agents-102-content.tar.gz

Confirm the file exists and report its size.
```

**Prompt 2: 4. Hand the rest to Claude (12 min)**

Source: `curriculum/trainings/agentic-engineering-101/prework.md:47`

**Prompt** *(Claude Code)*

```
I'm starting a six-module training called Agentic Engineering 101. Walk these in order, ask one question at a time if you need to, no preamble.

1. Extract the content folder. Use Bash:

     mkdir -p ~/Documents/ae101-content
     tar xzf ~/Downloads/agents-102-content.tar.gz -C ~/Documents/ae101-content

   Confirm the absolute path of ~/Documents/ae101-content back to me. The tarball expands to lectures/, exercises/, reference/, supplementary/, content/skills/.

2. Install the curated skills as personal skills:

     cp -r ~/Documents/ae101-content/content/skills/* ~/.claude/skills/

   Confirm each skill folder now exists at ~/.claude/skills/<name>/SKILL.md. These are personal to me, auto-discovered by Claude Code in every session.

3. Ask me for three trivial-and-visible candidate bugs in this repo. Screen against: under 50 lines changed, visible (wrong error message, date off by a day, wrong total, a log line that lies), mine or co-owned, shippable. Help me pick the most trivial-and-visible one.

4. Once I've picked, confirm the repo is ready for Module 1. Tests run (or name how the repo checks code), git status is clean, I can make a PR. Flag anything that would get in my way.
```

## Module 1: Getting going + context

Source: `curriculum/trainings/agentic-engineering-101/getting-going.md`

### The wizard move

Source: `curriculum/lectures/the-wizard-move.md`

### Orient and introspect

Source: `curriculum/exercises/orient-and-introspect.md`

**Prompt 3: Orient and introspect**

Source: `curriculum/exercises/orient-and-introspect.md:17`

**Prompt** *(Claude Code)*

```
Read enough of this repo to tell me what's here: the shape, the structure, what looks load-bearing, what's been touched recently, what looks stale. Don't try to be complete. Read what you judge worth reading; skip what you judge isn't.
```

**Prompt 4: Orient and introspect**

Source: `curriculum/exercises/orient-and-introspect.md:28`

**Prompt** *(Claude Code)*

```
What did you read, and why those files? What didn't you read, and why not? Name the specific files or directories you skipped and the call you made on each.
```

**Prompt 5: Orient and introspect**

Source: `curriculum/exercises/orient-and-introspect.md:37`

**Command** *(Claude Code)*

```
/context
```

### Fix tests-first

Source: `curriculum/exercises/fix-tests-first.md`

**Prompt 6: Fix tests-first**

Source: `curriculum/exercises/fix-tests-first.md:19`

**Prompt** *(Claude Code)*

```
Find the root cause of this bug by writing the tests that would reveal it. Run the tests and confirm they fail the way you'd expect. Then fix the root cause, not the symptom. Run the tests again. Show me the diff before you commit.

Let's work on this bug:
```

**Prompt 7: Fix tests-first**

Source: `curriculum/exercises/fix-tests-first.md:34`

**Prompt** *(Claude Code, optional)*

```
Was the change you just made the root cause of the bug, or a layer above it? If a layer above, name what the deeper edit would touch. Don't change anything yet. Re-read your own diff and tell me what's still surface.
```

**Prompt 8: Fix tests-first**

Source: `curriculum/exercises/fix-tests-first.md:42`

**Prompt** *(Claude Code, optional)*

```
Now do it properly, TDD-style. Write the failing test that names the deeper issue you just identified, run it, watch it fail. Fix the root cause. Run again, watch it pass. Show me the diff before you commit.
```

### Compound and close

Source: `curriculum/exercises/compound-and-close.md`

**Prompt 9: Compound (~10 min)**

Source: `curriculum/exercises/compound-and-close.md:17`

**Prompt** *(Claude Code)*

```
Review this session end-to-end: the orientation and introspection, the /context read, the TDD bug fix, the diff push-back. Write ./CLAUDE.local.md at the root of this repo (create it if it doesn't exist; add it to .gitignore if it's not already; if the file already exists, integrate, don't append). This is my personal gitignored rules file, not the team ./CLAUDE.md. Add rules that came from how we actually worked, not rules that sound good. Name the shape of the loop we ran and cite the practitioner who wrote it up if one fits.

If any rule is team-worthy (one every engineer on this codebase should know) flag it in the summary below, don't PR it. I'll decide whether to open a separate PR against team ./CLAUDE.md.

Tell me in 3–5 lines: what you wrote and why, grounded in specific session moments. I shouldn't need to open the file to know.
```

**Prompt 10: Close the ticket (~15 min)**

Source: `curriculum/exercises/compound-and-close.md:52`

**Prompt** *(Claude Code)*

```
Read the ticket for the bug we just fixed. Tell me what it says: reporter, description, any comments. If you can't find it, search the tracker by keywords from the bug; if there still isn't one, say so and we'll create one.

Ticket:
```

**Prompt 11: Close the ticket (~15 min)**

Source: `curriculum/exercises/compound-and-close.md:65`

**Prompt** *(Claude Code)*

```
Update the ticket: short close-out note naming what the root cause was and how we fixed it, link to the PR you opened earlier. If we needed to create the ticket just now, create it first, then update. Tell me what you wrote.
```

**Prompt 12: Close the ticket (~15 min)**

Source: `curriculum/exercises/compound-and-close.md:80`

**Prompt** *(Claude Code)*

```
We're preparing to close this session. Anything more to learn and compound into ./CLAUDE.local.md since the first compound — refusals, push-backs, sequence catches, anything that earned a rule? Integrate into the existing file, don't append. Tell me in 2–3 lines what you added, or "nothing new" if nothing did.
```

### How this training was built

Source: `curriculum/lectures/how-this-training-was-built.md`

## Module 2: Plan mode, done right

Source: `curriculum/trainings/agentic-engineering-101/plan-mode-done-right.md`

### Lecture: When a plan is good

Source: `curriculum/lectures/when-a-plan-is-good.md`

**Prompt 13: Optional: ask plan mode directly**

Source: `curriculum/lectures/when-a-plan-is-good.md:23`

**Prompt** *(Claude Code)*

```
How did your behaviour change now that we are in plan mode? Did your base prompt change, or what?
```

### Exercise: Push back on the plan

Source: `curriculum/exercises/push-back-on-the-plan.md`

**Prompt 14: Phase 2: Enter plan mode, read what arrives (15 min)**

Source: `curriculum/exercises/push-back-on-the-plan.md:25`

**Prompt** *(Claude Code)*

```
Plan the task I describe below. Explore the files you need to understand the scope. Write the plan to a plan file. Each step names files touched, shape of the change, tests you'd write or update before any code lands, and what you'd check before declaring it done. Detail over brevity.

My task:
```

**Prompt 15: Phase 4: Second-pass read (15 min)**

Source: `curriculum/exercises/push-back-on-the-plan.md:55`

**Prompt** *(Claude Code)*

```
Do a second-pass read of the current plan. Walk down every unresolved branch of the design tree one at a time: dependencies, decisions, side-effects I haven't named. Ask me one question at a time. For each question, recommend an answer. If a question can be answered by reading the codebase, read the codebase instead of asking me. I'll confirm or correct one at a time.
```

**Prompt 16: Phase 5: Stop. See the design pattern. (10 min)**

Source: `curriculum/exercises/push-back-on-the-plan.md:74`

**Prompt** *(Claude Code)*

```
Looking back at this session: what new information and decisions did the second-pass read surface that my two push-backs didn't? Would any of them have mattered in execution? What's the design pattern I just ran, as a repeatable move I could apply to my next non-trivial plan?
```

**Prompt 17: Phase 5: Stop. See the design pattern. (10 min)**

Source: `curriculum/exercises/push-back-on-the-plan.md:89`

**Prompt** *(Claude Code)*

```
are these rules auto-loaded to each session context?
```

### Exercise: Extract the task-shaping rule

Source: `curriculum/exercises/extract-the-task-shaping-rule.md`

**Prompt 18: Phase 1: Surface the rules from this session (4 min)**

Source: `curriculum/exercises/extract-the-task-shaping-rule.md:19`

**Prompt** *(Claude Code)*

```
Read this session end-to-end. Propose three to five rules about what makes a multi-file task plan-mode-able on this codebase. Phrase each as a one-liner I could re-read tomorrow. Anchor each rule in a specific moment from the session: the task I picked, what the second-pass read surfaced, what my push-backs caught, where the plan factored cleanly and where it didn't. Rules about task shape, not about plan-reading craft. After proposing, stop and ask which one I want to rewrite and which one I want to reject. Wait for my answer before continuing.
```

**Prompt 19: Phase 2: Save it where you'll find it again (2 min)**

Source: `curriculum/exercises/extract-the-task-shaping-rule.md:32`

**Prompt** *(Claude Code)*

```
Let's decide together where we store this for optimal use in future. Propose two or three plausible paths with their loading models — fires-anywhere-on-this-laptop vs fires-only-when-this-repo-is-open — and tell me which one you'd pick for these rules and why. I'll confirm or steer. Once we agree, write the rules in the wording I sharpened. After saving, show me the first three rules from the file so I can confirm the wording stuck. If a file already exists at the path we pick, ask before overwriting.
```

**Prompt 20: Phase 3: Where could this go next? (6 min)**

Source: `curriculum/exercises/extract-the-task-shaping-rule.md:47`

**Prompt** *(Claude Code)*

```
Suppose I wanted this rules file to drive automated task-splitting in the future — running over a backlog, an issue queue, or a stream of incoming requests, splitting epics into shippable slices using these rules as the guardrail. What two or three shapes does that automation typically take? Name each shape, what would invoke it, and where the rules file would sit in the loop. Don't propose code today.
```

**Prompt 21: Optional: Reverse-engineer your task manager (5 min)**

Source: `curriculum/exercises/extract-the-task-shaping-rule.md:62`

**Prompt** *(Claude Code)*

```
Reverse-engineer how this team uses its task manager from one ticket. Infer basic rules from the fields and wording: status, labels, priority, component, estimate, owner, epic, acceptance criteria, comments, links, and custom fields.

Separate strong signals, guesses that need more tickets, and things you cannot tell.

Then propose five basic rules a backlog-refinement agent could use on future tickets.

Ticket:
```

### Lecture: Where the rule could live

Source: `curriculum/lectures/where-the-rule-could-live.md`

**Prompt 22: Save the rule if it earned itself**

Source: `curriculum/trainings/agentic-engineering-101/plan-mode-done-right.md:44`

**Prompt** *(Claude Code, only if something earned itself)*

```
If one branch from this session sharpened how plans get read in this codebase, integrate it into ./CLAUDE.local.md (create + gitignore if missing; personal file, not team ./CLAUDE.md). Name the branch, not the rule. Quote the specific moment. If the rule is team-worthy, flag it in your summary so I can open a separate PR against ./CLAUDE.md later. If nothing earned itself, say so and stop.
```

## Module 3: Earn the trust

Source: `curriculum/trainings/agentic-engineering-101/earn-the-trust.md`

### Lecture: Skills from the frontier, skills of your own

Source: `curriculum/lectures/skills-from-the-frontier.md`

### Exercise: Map the access surface

Source: `curriculum/exercises/map-the-access-surface.md`

**Prompt 23: Phase 1: invoke the skill (~7 min)**

Source: `curriculum/exercises/map-the-access-surface.md:19`

**Command** *(Claude Code)*

```
/skills
```

**Prompt 24: Phase 1: invoke the skill (~7 min)**

Source: `curriculum/exercises/map-the-access-surface.md:29`

**Prompt** *(Claude Code)*

```
List my installed skills. Tell me also their storage location and whether or not they are loaded onto context.
```

**Prompt 25: Phase 1: invoke the skill (~7 min)**

Source: `curriculum/exercises/map-the-access-surface.md:39`

**Prompt** *(Claude Code)*

```
Invoke the access-control-analysis skill on the feature I'll name. Save the surface map to a temp directory and tell me the path. Use the skill's default output shape; don't prompt me to customize.

The feature is:
```

**Prompt 26: Phase 2: walk the map in conversation (~3 min)**

Source: `curriculum/exercises/map-the-access-surface.md:54`

**Prompt** *(Claude Code)*

```
Read the surface map you wrote at the path you told me. Walk me through it in chat: what categories of surface you found, the two or three findings that stood out most, and any surface you flagged as ambiguous. Concise — this primes me for the deltas I'll tell you in the next phase.
```

**Prompt 27: Phase 3: write the delta (~7 min)**

Source: `curriculum/exercises/map-the-access-surface.md:66`

**Prompt** *(Claude Code)*

```
Update the surface-map file in the temp directory to integrate the delta below — pull the item to the top of its category and explain in one line why this codebase's deployment model elevates it. Show me the diff.

The surface the skill called out harder than I would have:
```

**Prompt 28: Phase 3: write the delta (~7 min)**

Source: `curriculum/exercises/map-the-access-surface.md:76`

**Prompt** *(Claude Code)*

```
Add a new surface to the map that the skill didn't catch but matters in this codebase. One sentence on what it is, one sentence on why the skill missed it (likely codebase-specific: framework, deployment model, team convention). Show me the diff.

The surface the skill missed that I know matters is:
```

### Exercise: Threat-model with STRIDE

Source: `curriculum/exercises/threat-model-with-stride.md`

**Prompt 29: Phase 1: invoke the skill on the mapped surface (~7 min)**

Source: `curriculum/exercises/threat-model-with-stride.md:19`

**Prompt** *(Claude Code)*

```
Invoke the stride skill on the access-surface map from the previous exercise (path is earlier in this scrollback). Run it in a subagent so the six-category output doesn't flood this thread. Save the threat list next to the surface map. Flag the high-severity ones for this feature. Don't pick yet — I'll decide next. Report whether or not the skill loaded in the subagent.
```

**Prompt 30: Phase 2: pick the one (~8 min)**

Source: `curriculum/exercises/threat-model-with-stride.md:34`

**Prompt** *(Claude Code)*

```
Walk me through picking the load-bearing STRIDE category for this feature. Start by proposing the most plausible incident story (one or two sentences, from the access surface and threat list), then map that story to the STRIDE class it best fits (S/T/R/I/D/E), name what the threat actually is in one sentence, and propose the hardening shape (scope/split/filter/gate/review). I'll steer if the story or mapping misses.
```

**Prompt 31: Phase 3: write the ADR (~5 min)**

Source: `curriculum/exercises/threat-model-with-stride.md:47`

**Prompt** *(Claude Code)*

```
Write an ADR for the hardening decision we just made. Use my repo's ADR convention: check for an existing docs/adr/ folder or whatever the repo uses; if there isn't one, use docs/adr/NNNN-slug.md with a minimal template (Context / Decision / Consequences / Alternatives considered).

Ground each section in what we discussed: the plausible incident story is the Context; the threat we picked and the hardening we chose is the Decision; the Consequences section names what this costs (latency, complexity, operational burden) and what it protects; Alternatives considered names the 2–3 options we didn't pick and one line on why.

Show me the ADR before saving.
```

**Prompt 32: Phase 3: write the ADR (~5 min)**

Source: `curriculum/exercises/threat-model-with-stride.md:64`

**Prompt** *(Claude Code)*

```
Will ADRs auto-load to future sessions?
```

### Exercise: Author your test-strategy skill

Source: `curriculum/exercises/author-test-strategy-skill.md`

**Prompt 33: Phase 1: ask Claude to author the skill (~12 min)**

Source: `curriculum/exercises/author-test-strategy-skill.md:25`

**Prompt** *(Claude Code)*

```
I want to author a test-strategy skill for this codebase. Ask me the questions you need to encode it well: the ones that'd make the skill give a teammate on a different service a test strategy tuned to OUR system, not a generic pyramid.

Cover at minimum: which testing framework, what's mocked and what isn't, where the integration boundary actually runs (real dependencies vs. stubs), what "flaky" means in our system (what actually fails intermittently and why), what regression scope looks like on this team, which tests are load-bearing (the ones reviewers always check), what's NOT worth testing here (and why).

Ask ONLY question 1 first. Do not preview questions 2-N. Wait for my reply, then ask the next. Push back if my answer is generic. A test-strategy skill that says "write unit tests first" is useless. I need you to extract codebase-specific detail.

When you have enough, write `~/.claude/skills/test-strategy/SKILL.md` as a personal skill (frontmatter with `name` + `description`, then instructions). Show me before saving.
```

**Prompt 34: Phase 2: invoke the skill on the security-tested feature (~6 min)**

Source: `curriculum/exercises/author-test-strategy-skill.md:44`

**Prompt** *(Claude Code)*

```
Invoke the test-strategy skill we just wrote on the feature I'm shipping: the same feature from the previous two exercises, now including the hardening decision from the ADR.

Produce the test strategy the skill asks you to produce.

Then, in the same response, read the test strategy you just produced above and answer: is it good? Specifically: does the strategy cover the hardening decision we made in the STRIDE exercise? Does it reflect how testing actually works on this codebase, or does it read generic? Would a teammate opening the PR feel the test coverage is sufficient, or would they ask for more?
```

**Prompt 35: Sharpen the skill from evidence**

Source: `curriculum/trainings/agentic-engineering-101/earn-the-trust.md:57`

**Prompt** *(Claude Code)*

```
Read the test-strategy SKILL.md I authored earlier. Read this scrollback: the access-control output, the STRIDE decision and ADR, the moment I invoked the skill on the security-tested feature, the place I pushed back.

First: find the one section of the skill where session evidence shows it underdelivered (a convention I named in conversation that isn't encoded, a codebase-specific failure mode the skill missed, an assumption I had to correct mid-invocation). Rewrite that section in place. Do not append a critique addendum. Show me before and after, two or three lines each.

Then, separately: if one rule about how I worked with security skills, wrote ADRs, or authored skills on this codebase earned itself this session, integrate it into ./CLAUDE.local.md (integrate, don't append; personal file, not team ./CLAUDE.md). Name the moment, not the rule. Quote the specific session beat. If the rule is team-worthy, flag it in your summary so I can open a separate PR against ./CLAUDE.md later. If nothing earned itself, say so and skip the rules-file write.
```

**Prompt 36: Ready to clear**

Source: `curriculum/trainings/agentic-engineering-101/earn-the-trust.md:71`

**Prompt** *(Claude Code)*

```
Ready to clear? All learnings in?
```

**Prompt 37: Ready to clear**

Source: `curriculum/trainings/agentic-engineering-101/earn-the-trust.md:79`

**Prompt** *(Claude Code)*

```
/clear
```

## Module 4: Run the first experiment

Source: `curriculum/trainings/agentic-engineering-101/run-the-first-experiment.md`

### Lecture: Test and learn

Source: `curriculum/lectures/test-and-learn.md`

### Exercise: Walk and send off

Source: `curriculum/exercises/walk-and-send-off.md`

**Prompt 38: Phase 1: Pick the task (~10 min)**

Source: `curriculum/exercises/walk-and-send-off.md:23`

**Prompt** *(Claude Code)*

```
I'm about to run my first long-running experiment. Screen the candidates below against three criteria:

- **Send-off shape:** the task lets the agent push past 3-4 ambiguities without checking in at every step.
- **Requirement-weaving:** the task has multiple constraints that interact — getting one right means knowing the others.
- **Multi-file reasoning:** touches at least 3 files where touching the wrong one matters.

For each candidate, give me your read (fit / marginal / wrong shape) and why. If one is a clear fit, scope it into two or three sentences I can refer back to. If neither fits, tell me what's missing; if both fit, push me to pick the one that'll teach me more.

Candidates:
```

**Prompt 39: Run the audit (~10 min)**

Source: `curriculum/exercises/walk-and-send-off.md:50`

**Prompt** *(Claude Code)*

```
Audit my system against the task we just scoped. Read both `CLAUDE.md` (team, if it exists) and `CLAUDE.local.md` (personal, gitignored), everything at `.claude/memory/` (the three-block memory home; if my team kit pins a different path, use that), the ADRs in this repo, the skills at both `.claude/skills/` (repo-level) AND `~/.claude/skills/` (personal, including the test-strategy skill I authored at M3), and the connectors I've wired.

Run this audit in a fresh context: spawn a sub-task via the Task tool so you read my setup without this conversation colouring it. Keep this session's scrollback intact — we'll need it for later phases. Return a structured report.

Return a ranked top-5: thin spots, missing context, wrong assumptions, or unwired tools that will hurt the agent if it tries this task un-packaged. Rank by how much damage each will do during a send-off run.

For each item, say: (a) what's thin, (b) what a properly-prepared agent would need instead, (c) the cheapest way to close the gap today: add an observation, sharpen a rule, wire a connector, or name it as a business-rules gap.
```

**Prompt 40: Fill the gaps (~25 min)**

Source: `curriculum/exercises/walk-and-send-off.md:82`

**Prompt** *(Claude Code, optional)*

```
You propose solutions and ask questions. Use the ask-questions tool to speed up my work.
```

**Prompt 41: Phase 3: See the frame (~15 min)**

Source: `curriculum/exercises/walk-and-send-off.md:94`

**Prompt** *(Claude Code)*

```
Look at everything in my memory, my ADRs, and my test-strategy skill. Rearrange what's there into Paweł Huryn's three-block memory frame:

- Block 1: observations → hypotheses → rules (what I've noticed about this codebase, what I've started to suspect, what I've decided to treat as true)
- Block 2: decisions with alternatives (architectural or design choices + what else was considered; the ADRs live here)
- Block 3: quality criteria (what I expect to be true of shipped code in this codebase; the test-strategy skill contributes)

Don't invent new material. Rearrange what's there.

Before you name the frame or propose a new structure, show me one concrete example from each block. Quote a specific observation from my memory (Block 1), a specific ADR I've already written (Block 2), a specific check from my test-strategy skill (Block 3).

If you propose file moves or renames, cap the proposal at one or two; the send-off fires shortly after this phase and I want the tree settled before that.
```

**Prompt 42: Send the task off**

Source: `curriculum/trainings/agentic-engineering-101/run-the-first-experiment.md:48`

**Prompt** *(Claude Code)*

```
Commit the current state of the repo on a fresh feature branch named m4/<short-task-slug>. Stage everything, commit with message "M4 starting point". Tell me the short SHA.
```

**Prompt 43: Send the task off**

Source: `curriculum/trainings/agentic-engineering-101/run-the-first-experiment.md:56`

**Prompt** *(Claude Code, final move of the module)*

```
I want you to take the task we scoped earlier in this session end to end. Work from the rules I've set up (`CLAUDE.md` team and `CLAUDE.local.md` personal both load automatically), plus the memory at `.claude/memory/`, the ADRs, and the skills available by name in this session. That's everything you have. Go.

I'm leaving the laptop awake and walking away. Work through it. If you get stuck, write what you tried and why it didn't work rather than inventing a way forward. If you finish, tell me what you shipped and what you didn't.
```

**Prompt 44: Send the task off**

Source: `curriculum/trainings/agentic-engineering-101/run-the-first-experiment.md:73`

**Prompt** *(Claude Code, optional)*

```
Continue --- you can do it. Can't you?
```

## Module 5: Learn from the test, re-send packaged

Source: `curriculum/trainings/agentic-engineering-101/learn-from-the-test.md`

**Prompt 45: Set up the Module 5 worktree**

Source: `curriculum/trainings/agentic-engineering-101/learn-from-the-test.md:30`

**Prompt** *(Claude Code)*

```
Find the branch starting with `m4/` (run `git branch -a | grep '/m4/'` — there'll be one) and the commit messaged "M4 starting point" on it. Spin up a git worktree at that commit. Put the worktree at `../<repo-name>-m5` on a new branch named `m5/` followed by the same task slug as the m4 branch.

Then copy the gitignored personal files into the worktree so M5/M6 compounding has the M1/M3 evidence to build on:
  cp ../<repo-name>/CLAUDE.local.md ../<repo-name>-m5/  (if it exists)
  cp -r ../<repo-name>/.claude/memory/ ../<repo-name>-m5/.claude/memory/  (if it exists)

These won't sync back automatically — the worktree's copies are independent from this point. Tell me the worktree path and confirm which files copied across.
```

### Lecture: Reading the return

Source: `curriculum/lectures/reading-the-return.md`

### Lecture: Learning through contrast

Source: `curriculum/lectures/learning-through-contrast.md`

### Exercise: Diagnose and re-send

Source: `curriculum/exercises/diagnose-and-resend.md`

**Prompt 46: Phase 1: Read the return (~15 min)**

Source: `curriculum/exercises/diagnose-and-resend.md:21`

**Prompt** *(Claude Code)*

```
Find the path to the previous session's transcript .jsonl. Claude Code stores every session's scrollback at `~/.claude/projects/<encoded-folder>/<uuid>.jsonl`. The `<encoded-folder>` name is the absolute path of the original repo (where the un-packaged run happened) with `/` replaced by `-` — e.g., `/Users/me/Projects/lemmings` → `-Users-me-Projects-lemmings`. Since you're in a worktree, find the original repo path via `git rev-parse --git-common-dir` (its parent is the original repo). List the .jsonl files in that folder by mtime; pick the most recent one that is NOT this current session. Tell me the absolute path.
```

**Prompt 47: Phase 1: Read the return (~15 min)**

Source: `curriculum/exercises/diagnose-and-resend.md:32`

**Prompt** *(Claude Code)*

```
I sent off a long-running task un-packaged — no plan.md, no verifier, no reference artefact. I want to read what came back through three failure-mode lenses.

Read what the un-packaged agent did. Find the previous-run branch (run `git branch -a | grep '/m4/'` — it'll be the only branch starting with `m4/`). Start with the repo state on that branch: commits since the "M4 starting point" commit, files modified, branch state. Then read the previous session's transcript at the path you just found. The file changes alone miss the drift and the dead-ends.

Then walk the work through three lenses:

- **Goal drift** — moments where the agent solved an adjacent problem instead of the asked one. Buried instruction, redirected scope.
- **Context rot** — moments where the agent rehashed an approach it had already considered and ruled out, or re-derived something already in the working window.
- **Plausible-but-wrong** — outputs that look reasonable in isolation but don't match the original task spec.

For EACH lens, quote one specific moment from the artefact (commit message, file change, scrollback line). Don't generalise; quote. If a lens has no instance, say so — that's data too.

End with: which of the three was the DOMINANT failure mode? You'll build the verifier against that one.
```

**Prompt 48: Phase 2: Align-then-run, in reverse (~10 min)**

Source: `curriculum/exercises/diagnose-and-resend.md:63`

**Prompt** *(Claude Code)*

```
For each of the three failures we just named, walk it backwards: what specific validation would have caught it in minutes, not hours?

Practitioners running multi-hour coding agents in the last six months converge on three validation categories. Use these as the answer shape:

- **A re-readable spec.** Scope + success criteria + constraints the agent can diff its in-progress work against, mid-run. Holds the goal pinned down when the conversation grows.
- **A working document the agent owns and updates.** Durable state the agent re-reads when its working window fills. Phase breakdown, current-phase marker, decisions log, what-didn't-work list. Survives compaction.
- **An automated check on produced work.** Tests, lint, compile, a deterministic hook, or an LLM judge. Fires on agent output and decides pass/fail against a quality bar.

For each failure I diagnosed, map it to the validation category that would have caught it. Be specific: not "a re-readable spec" generically, but what THAT spec would have said to catch THIS particular goal-drift moment. Name when the validation would have fired (start of run, mid-run, end-of-task, on commit).

Don't name frameworks or practitioners by label ("Ronacher's three-pattern," "Huntley's Ralph," etc.) — walk from the specific failure to the specific validation. The naming happens later.
```

**Prompt 49: Phase 3: Build the verifier (~20 min)**

Source: `curriculum/exercises/diagnose-and-resend.md:94`

**Prompt** *(Claude Code)*

```
Build the verifier for my dominant failure, scoped to the task we ran un-packaged. The verifier should fire on agent-produced work and decide pass/fail against a quality bar that, if it had been in place, would have caught the failure I diagnosed.

If shell-hook: write the script and tell me where it lives in this repo (CI config, `.claude/hooks/`, or pre-commit, whichever fits the repo's existing conventions).

If background-agent: write the prompt and tell me how to invoke it (slash-command, sub-task dispatch, or scheduled run).

If Ralph re-feed: write the loop wrapper and the check it runs each iteration.

Show me the verifier before you save anything; I'll push back, then we save.

Shape:
```

**Prompt 50: Phase 3: Build the verifier (~20 min)**

Source: `curriculum/exercises/diagnose-and-resend.md:117`

**Prompt** *(Claude Code)*

```
Smoke-test the verifier you just built. Fire it on two synthetic inputs: one designed to PASS (matches the quality bar) and one designed to FAIL (the failure shape we diagnosed). Show me what fired, what each input returned, and what would have to change for the verifier to actually be in play during the packaged re-send. If a wiring step (hook install, slash-command registration, file path) is missing, name it and fix it before we move on.
```

**Prompt 51: Phase 4: Assemble reference + plan.md (~20 min)**

Source: `curriculum/exercises/diagnose-and-resend.md:131`

**Prompt** *(Claude Code)*

```
Build me two task-scoped artefacts for re-running the un-packaged task packaged.

First, the reference artefact. A task-local file (not my codebase rules — those already exist). Should hold:
- The task scope and success criteria, in two or three sentences
- Pointers to the memory pages, ADRs, skills, and connectors most relevant to THIS task
- The constraints the verifier we just built will enforce (the verifier owns execution checks; the reference names WHAT good looks like, not how it's measured)
- **The tests that name the bar** — scoped to this task's core paths, named before any code lands. Tests are a first-class part of the task spec for anything load-bearing; throwaway experiments can skip. Where a core requirement resists being named as a test, flag it as a question, not a rule.
- A "done means" line — what the agent should produce that signals task completion (tests green + requirements met)

Second, plan.md. A working document the agent owns and mutates as it runs. Should start with:
- The task broken into 3–7 phases the agent can re-anchor against
- **Tests-first phase** — the first phase writes or updates the tests from the reference spec. Code phases come after. The plan makes this ordering explicit.
- A "current phase" line the agent updates as it progresses
- A "decisions log" section the agent appends to when it makes a load-bearing choice
- A "what I tried that didn't work" section to prevent context-rot re-derivations

Propose the file paths (next to each other; same task-scoped folder). Show me both files before you save. I'll push back, then we save.

Before you save, grill me on missing details that can ruin the smooth run.
```

**Prompt 52: Key Concepts**

Source: `curriculum/trainings/agentic-engineering-101/learn-from-the-test.md:67`

**Prompt** *(Claude Code, final move of the module)*

```
Re-run the task we just packaged. The reference, plan.md, and verifier are at the paths we wrote in this session.

Rules: run the verifier per plan.md cadence; don't paper over failures; if you get stuck, write into RUN-NOTES.md and try a different angle; I'm walking away.

Before you start, ask for or write anything else you want for this run.

Tell me what shipped, what didn't, and what the verifier surfaced.
```

### Lecture: What packaging is

Source: `curriculum/lectures/what-packaging-is.md`

## Module 6: Spot gaps, build the loop

Source: `curriculum/trainings/agentic-engineering-101/spot-gaps-build-the-loop.md`

### Story of Module 6

Source: `curriculum/lectures/story-of-module-6.md`

### Spot gaps, build the loop

Source: `curriculum/exercises/spot-gaps-build-the-loop.md`

**Prompt 53: Phase 1: Diff and name the gaps (~15 min)**

Source: `curriculum/exercises/spot-gaps-build-the-loop.md:21`

**Prompt** *(Claude Code)*

```
I have two runs of the same long-running task on disk. Find them: the un-packaged run is on a branch starting with `m4/` (run `git branch -a | grep '/m4/'`); the packaged re-run is on a branch starting with `m5/`. The un-packaged run had no reference artefact, no plan.md, no verifier. The packaged re-run had all three pieces in play, verifier fired during the run.

Read both. Start with repo state: commits on the `m4/` branch after the "M4 starting point" commit, commits on the `m5/` branch after the worktree fork, what each run touched. Then read both session transcripts. Claude Code stores every session's scrollback under `~/.claude/projects/<encoded-folder>/<uuid>.jsonl` — the encoded-folder is the absolute path of the original repo (not this worktree) with `/` replaced by `-`. Use `git rev-parse --git-common-dir` to find the original repo path, then walk the un-packaged session's transcript and the packaged session's transcript. File changes tell you what each agent did; the transcripts tell you how it got there, including drift and re-reads.

Walk the diff across four dimensions:

- **What packaging caught.** Specific moments in the packaged run where the reference, the plan.md, or the verifier prevented a drift the un-packaged run actually experienced. Quote the un-packaged moment and the packaged moment both.
- **What packaging missed.** Places the packaged run drifted even with packaging in play. Where the reference was too thin, where the plan.md carried the wrong state, where the verifier's quality bar sat beside the real failure.
- **What packaging introduced.** New failure shapes that only exist because of the packaging itself — over-fitted verifier, plan.md staleness, reference-as-cage.
- **Where the fix belongs.** For each named gap: memory (observation, hypothesis, rule), a sharper verifier, a rule in CLAUDE.local.md, or a new skill. Don't prescribe the skill's shape yet.

For every claim, quote a specific moment from the artefacts. Don't generalise.

End with: which gap matters most? Rank by damage-to-a-future-run, not by how interesting it reads.
```

**Prompt 54: Phase 1: Diff and name the gaps (~15 min)**

Source: `curriculum/exercises/spot-gaps-build-the-loop.md:49`

**Prompt** *(Claude Code, only if a rule earned cutting)*

```
Read ./CLAUDE.local.md. Read this session's scrollback: the gap list I just ranked, the un-packaged-vs-packaged contrast moments, the dominant gap. Find the one rule the two-run diagnosis showed is wrong, stale, or never fires when it should. Cut it from ./CLAUDE.local.md in place. Show me the line you cut, in two sentences why diagnosis killed it. If every rule still holds under diagnosis, say so and stop.
```

**Prompt 55: Phase 2: Author the session-shaper (~25–35 min)**

Source: `curriculum/exercises/spot-gaps-build-the-loop.md:73`

**Prompt** *(Claude Code)*

```
Author a session-shaper as a personal skill. The skill's job is to shape future sessions on this kind of task so the dominant gap I diagnosed in Phase 1 doesn't recur. Shape: one of sharpened-verifier, LLM-judge, or gap-finder — I'll tell you which after you ask. Same authoring approach as the test-strategy skill at `~/.claude/skills/test-strategy/SKILL.md`.

Interview me one question at a time. Cover: what the skill fires on (agent output, proposed plan, mid-run state), what the quality bar is in terms I can defend to a teammate, what to flag vs. what to let through, how it outputs (pass/fail, ranked findings, inline critique), and what the failure shape looks like when the skill itself is wrong.

Push back when my answer is generic. A judge that says "check if the output is good" is useless; a verifier that duplicates the existing test suite is noise. Codebase-specific and failure-specific.

When you have enough, propose a skill name. Write `~/.claude/skills/<proposed-name>/SKILL.md`: frontmatter (name + description), then instructions. Show me before saving.
```

**Prompt 56: Phase 2: Author the session-shaper (~25–35 min)**

Source: `curriculum/exercises/spot-gaps-build-the-loop.md:90`

**Prompt** *(Claude Code)*

```
Before I ship this skill, critique it. Read the SKILL.md you just wrote. Tell me:

- What's the weakest part? Name the assumption most likely to be wrong for my codebase, or the section a teammate would push back on first.
- Is there anything generic dressed up as codebase-specific? Advice a pyramid-shaped test book would give, or a verifier template from a blog post.
- Is there anything from the two runs' diff that didn't make it into the skill? A quoted failure moment I named in Phase 1 that would sharpen the skill if it were encoded?

Don't reassure me. Name weak parts.
```

**Prompt 57: Phase 2: Author the session-shaper (~25–35 min)**

Source: `curriculum/exercises/spot-gaps-build-the-loop.md:107`

**Prompt** *(Claude Code)*

```
Invoke the skill we just authored — by its name — on the M5 packaged re-run. Not on a toy example. The actual artefacts: the commits, the files, the session transcript.

Produce whatever output the skill asks you to produce (pass/fail, ranked findings, inline critique).

Then, in the same response, answer: is the skill any good? Specifically: does the output catch the dominant gap we named in Phase 1? Does it miss things a staff engineer reviewing this run would catch? Would the M4 un-packaged run have come out better if this skill had fired on it retroactively?
```

### Steering the wiring

Source: `curriculum/lectures/steering-the-wiring.md`

### Arc-named retrospective

Source: `curriculum/exercises/arc-retrospective.md`

**Prompt 58: Arc retrospective**

Source: `curriculum/exercises/arc-retrospective.md:19`

**Prompt** *(Claude Code)*

```
Read my work across this repo. Specifically:

- My team `CLAUDE.md` (if present) and my personal `CLAUDE.local.md`.
- Everything at `.claude/memory/` (three-block memory: observations/hypotheses/rules, decisions, quality criteria).
- The ADRs in this repo — wherever our convention puts them (`docs/adr/` or equivalent).
- Both skills I authored at `~/.claude/skills/` (the test-strategy skill from earlier, and the skill I authored today).
- The M4 un-packaged run artefact (commits, files, the session transcript under `~/.claude/projects/` in a folder matching this repo — the earliest long-running run).
- The M5 packaged re-run artefact (commits, files, the session transcript from the re-send of the same task).

Run this audit in a fresh sub-task via the Task tool so you have the cold-read view, then combine those findings with insights you have from this session's scrollback. I want both viewpoints: the fresh read uncoloured by our conversation, and what you noticed while we worked together.

Write a one-page note on what changed across this body of work. Not a changelog. What shape did my practice have at the start, what shape does it have now, what specific artefacts show the shift. Quote from my files. Name the pattern that you see recurring across modules if you see one. Don't invent a pattern to make the note tidy; if the arc is uneven, say so and show where.

Propose where the note should live in my repo (ADR, memo in `.claude/memory/`, or a standalone file). Show me the note before you save it. I'll push back, then we save.
```

### The loop has a name

Source: `curriculum/lectures/the-loop-has-a-name.md`

### Agents that build agents

Source: `curriculum/lectures/agents-that-build-agents.md`

**Prompt 59: A prompt to try**

Source: `curriculum/lectures/agents-that-build-agents.md:35`

**Prompt** *(Claude Code, fresh session in the same repo)*

```
Enable plan mode.

Read these artefacts end to end:

- ./CLAUDE.local.md
- .claude/memory/
- the most recent un-packaged run's commit history and modified files
- the most recent packaged run's commit history and modified files
- the SKILL.md of the skill you authored at Module 6, in `~/.claude/skills/`

Then design the next iteration of the kit. Three questions:

1. What gap in the kit would the next run want closed? Name it as a memory rule, a sharper verifier, or a third skill. Pick the home; do not split.
2. What rule already in memory has gone stale across the two runs? Name one to subtract.
3. What shape of skill is missing from the menu of verifier / judge / gap-finder? If none is missing, say so. Do not invent.

Return a plan with the three answers. No preamble.
```

_Total prompts: 59_
