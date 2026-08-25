# Exercise: Your first *scheduled* agent

**Time:** 35 minutes to set up. One glance a day for a week.

**What you do:**

You built a memory today. One live challenge, curated sources, a compiled set of claims. Now give it a pulse. This homework puts a scheduled agent in front of your memory so it reads the thing every morning and tells you something useful before you've had coffee.

**Pick one of three jobs.** Choose whichever fits your week:

- **Morning plan informed by the challenge**, reads the memory and your calendar, produces a 5-line plan that names which of today's meetings actually move the challenge forward and which are noise
- **Daily risk scan**, reads the memory and flags the one assumption in it most likely to be wrong, or the one open question that's gone unanswered longest
- **Draft today's next move**, reads the memory and drafts a single concrete next action for the challenge: a message to send, a question to ask someone, a small decision to make before end of day

Pick one. Not all three. Something you'd actually read tomorrow morning.

## Phase 1: Connect any data the job needs

*8 min*

For the morning-plan job, you'll want your calendar connected. Open Claude Code desktop. Click the **+** next to the prompt box (or go to **Settings → Connectors**). Enable Google Calendar or Microsoft Outlook Calendar. Sign in with your work account.

For the risk-scan and next-move jobs, no connector needed, the agent reads your memory and that's enough.

## Phase 2: Capture the look

*7 min*

Your daily output shouldn't read like a terminal dump. Steal the look and feel from your company's website (colours, typography, headers, the voice) and store it as a pattern the agent reuses forever. Same lesson as the memory: text on disk, referenced by name.

Remember Module 1's `module-1/site.html`, and the prework `prework/snake.html` before it? Claude writes HTML files. You're about to give those files a house style.

Ask Claude to extract the visual pattern from your company website and write it as a plain-language style file the agent reuses forever.

{{prompt:personal-agent-homework-1}}

Give Claude the URL or paste a key page. It extracts, writes `./style.md`, appends the `./CLAUDE.md` rule. Read both. Edit `./style.md` where Claude missed something, if your brand has a hard rule ("never pure black," "always serif headings"), put it in. The rule you just added to `./CLAUDE.md` means every agent you build from here on will use this style when it produces HTML.

## Phase 3: Write the agent's instructions

*10 min*

In your training directory, create `module-2/morning-agent/`. Ask Claude to interview you on the job, the output shape, and the hard boundary, then write the agent's instruction file.

{{prompt:personal-agent-homework-2}}

Claude asks, you answer, the file lands. Read it. Edit anything that doesn't sound like you.

## Phase 4: Schedule it

*6 min*

In the desktop app, open the **Schedule** sidebar. Click **New task → New local task**. Fill in:

- **Name:** `Morning memory` (or whatever you want to see)
- **Frequency:** Daily at the time you actually want it to fire, 7:00 AM for most people
- **Prompt:** the scheduling prompt on this slide.

Ask Claude to read the morning brief, follow the rules, and write the daily output to `latest.html`.

{{prompt:personal-agent-homework-3}}

Save. Click **Run now** once. Double-click `module-2/morning-agent/latest.html` in your file browser, it opens in your browser and should look like it came off your company site. Fix anything off by editing `module-2/morning-agent/morning.md` or `./style.md`, the scheduled task reads both every session, so tomorrow picks up the change.

## Phase 5: Let it run for a week

*4 min*

Don't retune for the first three days. Watch what it produces as-is. Every morning, open `module-2/morning-agent/latest.html`. Watch for:
- Days when the output is genuinely useful, what made it work?
- Days when the output is comical or wrong, what was missing from the memory that would have saved it?
- Claims the agent made that you, the domain expert, know are off, those are your next memory edits.
- Styling drift, is `module-2/morning-agent/latest.html` still looking like your company site, or has it slowly gone generic? That's a signal to sharpen `./style.md`.

The memory is alive now. What the agent misses today is a prompt to sharpen the memory tomorrow, and the HTML you open with your coffee is a system, not a document.

## Turn the memory into a running loop

**What happened:**

Your memory stops being a snapshot and starts being a system. Every morning the agent reads it, pushes something back at you, in your own house style, not Claude's, and gives you one more piece of evidence about what's sharp and what's soft. A week of this and the memory has more edge. The HTML belongs to the company, not Claude.

**The point:**

A memory that sits there is a document. A memory that gets read by an agent on a schedule, producing output that looks like it belongs to your company and that you actually respond to, is the start of a loop. Module 2 built the memory; this homework builds the loop. Every subsequent module compounds on it, and `./style.md` travels with you. Every agent you build from here on that produces HTML will look native to the organisation, because the rule is in the file every agent reads.

<!-- maintainer -->

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
- Laptop-awake / catch-up / cloud-scheduling notes live in `curriculum/trainings/agents-101/reference/claude-quick-reference.md` → Scheduling section. Students who want the mental model read it there; the exercise body stays narrative.
- Future variant note: when this training ships in a Cowork edition, the surface changes (Cowork's own scheduling flow replaces the desktop app's Schedule sidebar) but the shape — instructions in a file, style in a file, triggered on a clock, reading the memory, producing the same output shape — stays identical.

**Capability check owed:**
- Verify via `claude-code-guide` that a scheduled local task can reliably write HTML files to an arbitrary path inside the working directory (nothing sandboxed about `module-2/morning-agent/latest.html`). Also verify that `Run now` opens a session with full working-directory context including the root `CLAUDE.md`. Both assumed throughout Phase 4; neither should be left to training-day discovery.

**Quality:** compendium-audited 2026-08-25 (behavior@725101ec pedagogy@725101ec strategy@725101ec slides@4d9c4af2)
- judges @4d9c4af2: writing grandfathered, story grandfathered, technical grandfathered, behavior PASS, pedagogy PASS, strategy PASS, slides PASS
