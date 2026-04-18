# Exercise: Your first scheduled agent

**What you do:**

You built a brain today. One live challenge, curated sources, a compiled set of claims. Now give it a pulse. This homework puts a scheduled agent in front of your brain so it reads the thing every morning and tells you something useful before you've had coffee.

**Pick one of three jobs.** Choose whichever fits your week:

- **Morning plan informed by the challenge** — reads the brain and your calendar, produces a 5-line plan that names which of today's meetings actually move the challenge forward and which are noise
- **Daily risk scan** — reads the brain and flags the one assumption in it most likely to be wrong, or the one open question that's gone unanswered longest
- **Draft today's next move** — reads the brain and drafts a single concrete next action for the challenge: a message to send, a question to ask someone, a small decision to make before end of day

Pick one. Not all three. Something you'd actually read tomorrow morning.

**Step 1 — connect any data the job needs.**

For the morning-plan job, you'll want your calendar connected. Open Claude Code desktop. Click the **+** next to the prompt box (or go to **Settings → Connectors**). Enable Google Calendar or Microsoft Outlook Calendar. Sign in with your work account.

For the risk-scan and next-move jobs, no connector needed — the agent reads your brain and that's enough.

**Step 2 — write the agent's instructions.**

In `~/agents-102-bootstrap/`, create `module-2/morning-agent/`. Paste this prompt:

```
I'm setting up a daily agent that reads my challenge brain every morning and reports back. Ask me, one at a time:

1. Which job — morning plan, daily risk scan, or next-move draft?
2. What should the output look like — how long, what shape, what voice?
3. What must this agent never do? Name at least one hard boundary.

When I've answered all three, write the file at module-2/morning-agent/morning.md. Show it to me before saving.
```

Claude asks, you answer, the file lands. Read it. Edit anything that doesn't sound like you.

**Step 3 — schedule it.**

In the desktop app, open the **Schedule** sidebar. Click **New task → New local task**. Fill in:

- **Name:** `Morning brain` (or whatever you want to see)
- **Frequency:** Daily at the time you actually want it to fire — 7:00 AM for most people
- **Prompt:** the single line below

```
Read module-2/morning-agent/morning.md and run the job. Read the current state of brain/ as context. Follow the rules in the file. Show me the output.
```

Save. Click **Run now** once to check the output. Fix anything off by editing `morning.md` — the scheduled task reads the file every run, so tomorrow picks up the change.

**Step 4 — let it run for a week.**

Don't retune for the first three days. Let it land as it is. Watch for:
- Days when the output is genuinely useful — what made it work?
- Days when the output is comical or wrong — what was missing from the brain that would have saved it?
- Claims the agent made that you, the domain expert, know are off — those are your next brain edits.

The brain is alive now. What the agent misses today is a prompt to sharpen the brain tomorrow.

**What happens:**

Your brain stops being a snapshot and starts being a system. Every morning the agent reads it, pushes something back at you, and gives you one more piece of evidence about what's sharp and what's soft. A week of this and the brain looks different from the one you left class with — because you kept noticing.

**The point:**

A brain that sits there is a document. A brain that gets read by an agent on a schedule, producing output you respond to, is the start of a loop. Module 2 built the brain; this homework builds the loop. Every subsequent module compounds on it.

**Time:** 30 minutes to set up. One glance each morning for a week.

<!-- maintainer -->

**Frameworks riffed on:**
- Toyota Kata — the morning agent is a daily PDSA beat on the challenge. Running it, observing, adjusting — kata made file-based.
- Drucker-adjacent knowledge-work rituals — attaches a file-based system to the morning routine participants already have.

**Prerequisites (in place before this homework):**
- Claude Code **desktop app** installed (macOS or Windows). The web version doesn't run local scheduled tasks.
- Module 2 completed — `brain/` has an `index.md` and at least two topic pages with citations.
- For the morning-plan job: Google Calendar / Outlook Calendar connector enabled via Settings → Connectors, or acceptance that the participant will use a non-calendar job variant.

**Deferred per student-facing-first rule:**
- Facilitator notes: common setup issues (OAuth admin-approval blocking — route to IT via pre-training comms; scheduled task didn't fire because laptop slept — catches up on wake, one run, 7-day window; timezone confusion between Claude's schedule display and the student's clock; question-dump from Claude when asked to ask-in-turn — tell the participant to answer in order); watch-for behaviors in Module 3 opening Connections — participants whose agent surfaced a genuine miss in the brain vs. participants whose agent said "I couldn't read the brain" every morning; per-cohort Slack nudge on days 3 and 6 reminding participants to glance at output.
- Live support: push troubleshooting through the cohort Slack/Teams during the homework window. OAuth admin approval is the most common blocker — name it in pre-training comms, not in the exercise body.
- Fallback when connectors aren't enabled: swap the job for the risk-scan or next-move variant — neither requires calendar or email access.
- Laptop-awake / catch-up / cloud-scheduling notes live in `curriculum/reference/claude-quick-reference.md` → Scheduling section. Students who want the mental model read it there; the exercise body stays narrative.
- Future variant note: when this training ships in a Cowork edition, the surface changes (Cowork's own scheduling flow replaces the desktop app's Schedule sidebar) but the shape — instructions in a file, triggered on a clock, reading the brain, producing the same output shape — stays identical.
