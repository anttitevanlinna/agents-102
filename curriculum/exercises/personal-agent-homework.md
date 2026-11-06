# Exercise: Your first *scheduled* agent

**Time:** 35 minutes to set up. One glance a day for a week.

**What you do:**

Put a scheduled agent in front of your memory. Each morning it reads the memory and tells you something useful.

**Pick one of three jobs:**

- **Morning plan**: reads memory and calendar, writes a 5-line plan naming which meetings move the challenge and which are noise
- **Daily risk scan**: reads memory, flags the assumption most likely wrong or the question open longest
- **Next move**: reads memory, drafts one action: a message, a question, or a small decision for today

Pick the one you would read tomorrow morning.

## Phase 1: Connect any data the job needs

*8 min*

For the morning-plan job, enable Google Calendar or Microsoft Outlook Calendar in your agent runtime's connector settings and sign in with your work account. Without a connector, use a calendar screenshot or exported agenda. The other two jobs need no connector.

## Phase 2: Capture the look

*7 min*

Give your daily output your company website's look: colours, typography, headers, voice. The agent extracts the pattern into a plain-language style file on disk and reuses it by name, like the memory.

{{prompt:personal-agent-homework-1}}

Give the agent the URL or paste a key page. The agent writes `./style.md` and appends the rule to the root instructions file. Spot-check both. Add any hard brand rule the agent missed ("never pure black," "always serif headings") to `./style.md`.

## Phase 3: Write the agent's instructions

*10 min*

Create `module-2/morning-agent/`. Have the agent interview you on the job, output shape and hard boundary, then write its instruction file. Edit what doesn't sound like you.

{{prompt:personal-agent-homework-2}}

## Phase 4: Schedule it

*6 min*

Open the **Schedule** sidebar in the desktop app and click **New task → New local task**:

- **Name:** `Morning memory`
- **Frequency:** Daily at 7:00 AM, or the time you want it to fire
- **Prompt:** the scheduling prompt below. It writes the daily output to `latest.html`.

{{prompt:personal-agent-homework-3}}

Save, then click **Run now** once. Double-click `module-2/morning-agent/latest.html` to open it in your browser. To fix anything, edit `module-2/morning-agent/morning.md` or `./style.md`. The scheduling prompt names both files, so tomorrow's run picks up the change.

## Phase 5: Let it run for a week

*4 min*

For the first three days, don't retune. Open `module-2/morning-agent/latest.html` each morning and watch for:
- Useful days: what made them work?
- Comical or wrong days: what was missing from the memory?
- Claims you, the domain expert, know are off: your next memory edits.
- Styling drift from your company site: sharpen `./style.md`.
- Who else would read this output, and what would make them open it?

## Turn the memory into a running loop

**What happened:**

Each morning's output shows what is sharp and what is soft in your memory.

**The point:**

A memory an agent reads on a schedule, producing output you respond to, is the start of a loop. Every HTML agent you build looks native to your organisation, because the root instructions file points each agent to `./style.md`.

<!-- maintainer -->

**Quality:** compendium-audited 2026-08-25 (behavior@725101ec pedagogy@725101ec strategy@725101ec slides@4d9c4af2)
- judges @4d9c4af2: writing grandfathered, story grandfathered, technical grandfathered, behavior PASS, pedagogy PASS, strategy PASS, slides PASS

**Frameworks riffed on:**
- Toyota Kata — the morning agent is a daily PDSA beat on the challenge. Running it, observing, adjusting — kata made file-based.
- Drucker-adjacent knowledge-work routines — attaches a file-based system to the morning routine participants already have.
- Design-system-as-text-file — `style.md` is a brand-pattern file the way the memory is a knowledge-pattern file. Same move.

**Cross-module ripple from Phase 2 (style.md + CLAUDE.md rule):**
- `style.md` lives at the training-directory root, so every subsequent module's agents inherit the house style the moment they produce HTML output. Module 3's synthesizer answer, Module 7's team report, Module 8's strategic deliverable — all can render stylised without a second styling exercise. The rule line in `CLAUDE.md` is the mechanism.
- This is the first cross-cutting rule the student writes into the root `CLAUDE.md` that isn't about the memory itself. Sets up the pattern Module 3's Close ("write one coordination rule to `CLAUDE.md`") builds on.

**Prerequisites (in place before this homework):**
- Claude Code **desktop app** installed (macOS or Windows). The web version doesn't run local scheduled tasks.
- Module 2 completed — `memory/` has an `index.md` and at least two topic pages with citations; root `CLAUDE.md` exists (from the Module 2 scaffold).
- For the morning-plan job: Google Calendar / Outlook Calendar connector enabled via Settings → Connectors, or acceptance that the participant will use a non-calendar job variant.
- A company website URL the participant can point Claude at (or a key page they can paste). Public sites work without auth; for intranet-only brand guidelines, paste a representative page directly into the prompt.

**Deferred per student-facing-first rule:**
- Facilitator notes: common setup issues (OAuth admin-approval blocking — route to IT via pre-training comms; scheduled task didn't fire because laptop slept — catches up on wake, one run, 7-day window; timezone confusion between Claude's schedule display and the student's clock; question-dump from Claude when asked to ask-in-turn — tell the participant to answer in order); **style.md watch-fors** — Claude over-abstracts on extraction ("uses bold colours") instead of naming specifics ("primary #0B5394, accent #F4B400, headings in Söhne, body in Inter") — push back if the file reads generic; Claude sometimes skips the "append one line" instruction and rewrites larger sections of `CLAUDE.md` — diff the file before approving; **HTML output watch-fors** — first render often ignores `style.md` entirely (generic Claude default HTML) — the student sees generic and doesn't know the style.md wasn't read; fix is one regeneration with explicit "use style.md at root" restated; watch-for behaviors in Module 3 opening Connections — participants whose agent surfaced a genuine miss in the memory vs. participants whose agent said "I couldn't read the memory" every morning; per-cohort Slack nudge on days 3 and 6 reminding participants to glance at output.
- Live support: push troubleshooting through the cohort Slack/Teams during the homework window. OAuth admin approval is the most common blocker; HTML-doesn't-look-native is the second — neither belongs in the exercise body.
- Fallback when connectors aren't enabled: swap the job for the risk-scan or next-move variant — neither requires calendar or email access.
- Fallback when a company website isn't accessible or isn't distinctive: student can pick a brand they admire (a publication, a product they use) and style after that — the pedagogical move (file-based style rule, applied to HTML output) survives.
- Future variant note: when this training ships in a Cowork edition, the surface changes (Cowork's own scheduling flow replaces the desktop app's Schedule sidebar) but the shape — instructions in a file, style in a file, triggered on a clock, reading the memory, producing the same output shape — stays identical.

**Capability check owed:**
- Verify via `claude-code-guide` that a scheduled local task can reliably write HTML files to an arbitrary path inside the working directory (nothing sandboxed about `module-2/morning-agent/latest.html`). Also verify that `Run now` opens a session with full working-directory context including the root `CLAUDE.md`. Both assumed throughout Phase 4; neither should be left to training-day discovery.

**View summary:** You put a scheduled agent in front of the memory you built, so it reads it every morning and reports something useful before coffee. One glance a day for a week. The artifact is a running loop, plus a style file every later agent inherits.
