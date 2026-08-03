# Close the ticket *your team's way*

**Time:** 20 minutes.

**What you do:** read one real ticket, have the agent work out how your team uses its tracker, then close the bug's ticket in that voice.

**What you build:** field-use rules read off your own tracker, and a close-out note on the bug you shipped, landed where your team reads it.

**The point:** your tracker already encodes how your team works. Status, labels, priority, estimate: each field carries a convention nobody wrote down. An agent that has read those conventions writes a close-out that sounds like your team wrote it.

The PR shipped. The loop's last move outside the repo is the ticket for the bug you just fixed.

## Read the ticket for your bug

- One ticket is enough for a first read. Open the ticket for the bug you fixed here. Paste its ID, its URL, or the visible fields: title, description, comments, links.
- If there is no ticket for this bug, say so in the chat. The agent will offer to create one, and for the next step paste any other real ticket from your tracker: a ticket the agent just wrote carries none of your team's conventions.

Ask Claude to read the ticket for the bug and report what it says.

{{prompt:compound-and-close-2}}

## Read the conventions off the ticket

- Every field carries a convention nobody wrote down. Status, labels, priority, component, estimate, owner, epic: how your team fills them is a rule your tracker has been keeping for years.
- One ticket gives basic rules, not policy. The agent separates strong signals from guesses, and names what it cannot tell from a single sample.
- **Refinement** is the backlog-grooming work. Sizing, splitting, and sharpening tickets before they are worked. The rules the agent proposes are for that job, not for this one ticket.

Ask Claude to reverse-engineer how your team uses its tracker and propose five refinement rules.

{{prompt:extract-the-task-shaping-rule-4}}

Push back on the five. The ones you reject sharpen the read as much as the ones you keep. A second ticket from a different kind of work shows which rules hold beyond one sample.

## Write the close-out and send it

- The close-out is the first thing you have written today that a teammate reads. Root cause, how you fixed it, a link to the PR, in the register the ticket's own comments just showed you.
- Three routes, and your session decides which. `gh` covers GitHub Issues with nothing added. A connector already on your Claude account is already in this session. Without either, the agent hands you the text and you paste it.
- Adding a connector is one line per tracker. [MCP and connectors](../trainings/agentic-engineering-101/reference/mcp-and-connectors.md) has them, and it pays back on every session after this one.

Ask Claude to write the close-out, update the ticket, and report what it wrote.

{{prompt:compound-and-close-3}}

## Read the close-out before it stands

- Read what the agent wrote against the comments already on the ticket. If it reads stiffer than the ones your team wrote, say which line and why.
- The bug fix is now visible where it should be. In the tracker your team reads, not only in the repo.

## Anything can be reverse-engineered

- The ticket is one instance. Anything can be inspected and reverse-engineered with an LLM: a codebase nobody documented, a CI pipeline, a config, an API you did not write, the system your team runs on and cannot explain.
- The move is the same every time. Ask the agent to study it. Extract a `.md` file. Use that file as context in the next agent.
- The ticket is that move at its smallest.
- The read is only as good as what the thing has recorded. A tracker nobody fills in carefully gives thin rules, and that thinness is itself a finding about the system. Match the depth of the read to what is actually written down, not to the slogan.

## What happened

The ticket gave up two things: a close-out note on the bug you shipped, and the conventions your team has been encoding in its fields all along. The loop that started with a failing test closed where the work is actually visible.

The field rules stay in the scrollback. The next exercise sweeps this whole session into `./CLAUDE.local.md`, and they land there with everything else.

<!-- maintainer -->

**View summary:** The student reads one real ticket, has the agent reverse-engineer the team's field conventions from it, and closes the bug's ticket with a close-out note written in that register. Two artifacts: refinement rules headed for the rules file, and a close-out note in the team's tracker.

**In-class M1 exercise, third of four.** Runs after `fix-tests-first` (the PR is shipped) and before `compound-and-close`, so the field rules the agent surfaces here are session evidence the compound sweep picks up. No separate fold step, and no rules-file write in this exercise.

**Connector install is named, not taught — because it is a one-liner, not because it is hard.** A connector added at the Claude account's connector surface inherits into a logged-in Claude Code session, and `claude mcp add --transport http <name> <url>` is a single command otherwise (verified against Claude Code 2.1.220 and the reference page's 2026-07-26 stamp). Spending room time on that choreography earns nothing, so the body names the three routes in two lines and points at `reference/mcp-and-connectors.md`. The exercise completes on any of them, so per `check_pedagogy.md §17` the connector stays enhancement and never a forcing function.

**Trainer plug-point caveat, deliberately not in the body:** on Team and Enterprise Claude.ai plans only admins can add at the connector surface. Where the sponsor's tenant has not enabled tracker connectors, the room falls to `gh` and paste, and the ask is worth raising with the sponsor before the cohort rather than in the slot.

**Emphasis budget (`check_slides.md §9`):** one bolded handle in the body, **Refinement**, at its term-earning moment on the conventions slide. All other bullet leads plain; widget chrome (`**Time:**`, `**What you do:**`, `**What you build:**`, `**The point:**`) stays bold.

**No Quality line: this file has never been audited.** It needs a `curriculum-pre-ship-audit` pass before ship, and it is now in-class rather than take-home, which raises the bar. Tracked in `pre-cohort-todos.md`.

**Meta (trainer):**
- **Primary Bloom's level:** Analyze (read conventions off one ticket) + Apply (write and land the close-out).
- **Time:** 20 min inside M1's slot. Beat split: read the ticket 3 / conventions 5 / push-back 4 / close-out 5 / read and ship 3.
- **Delivery architecture** (working-dir model, no training-dir state): canonical in `training-architecture.md`. Not restated here.
- **Session continuity:** runs in the same M1 session as the fix and the PR, so *"the bug we just fixed"* resolves from warm scrollback.

**Push-back moves (trainer delivers):**
- **Rules rubber-stamp** — student accepts all five proposed rules without rejecting one. Push: *"which of the five did the agent guess at? Make it separate the ones it read from the ones it inferred."*
- **Close-out rubber-stamp** — student ships the agent's first draft without reading. Push: *"read the close-out against the comments already on that ticket. Does it sound like the same team wrote it?"*
- **Ticket has no comments** — nothing to read a register off. The field conventions still land; the close-out register falls back to the description's own wording.

**Decision points:**
- **Sponsor stated a tracker the cohort's Claude Code cannot reach.** The paste path covers the read; for the write, fall back to a markdown ticket in the repo (*"write a ticket into `docs/tickets/` and link the PR"*). Sponsor gets a signal.

**Plug points:**
- Sponsor-stated ticket tracker (Linear / Jira / GitHub Issues / other) — the field vocabulary the agent reverse-engineers is the sponsor's own; a tracker with disciplined labels yields sharper rules than one without, and that gap is itself worth naming to the room.

**Leap test** (per `check_pedagogy.md` rule 45 — three observable Monday outcomes on the engineer's own codebase by the next working day):
1. **Pastes a real ticket into a session and asks what the fields encode**, before shaping a task from it. Falsifiable: scrollback shows a ticket pasted and a conventions question, not just a task hand-off.
2. **Ships a ticket close-out the agent drafted from the session**, rather than typing one from memory. Falsifiable: the tracker comment names root cause and links the PR, and the wording matches a draft in the session scrollback.
3. **Rejects at least one proposed convention rule as a guess.** Falsifiable: scrollback shows a keep/change/drop call on the agent's proposals, with one dropped.

**Arc:**
- Picks up from: `fix-tests-first` — the shipped PR is what the close-out links to.
- Hands off to: `compound-and-close` — the field rules surfaced here are session evidence the compound sweep integrates into `./CLAUDE.local.md`.

**Per-phase failure mode + escape hatch** (per `check_pedagogy.md` rule 47):

| Phase forcing function | Dominant failure mode | Escape hatch |
|---|---|---|
| Conventions prompt — agent separates strong signals from guesses | Rules rubber-stamp — all five accepted unread | Push: *"which of the five did the agent guess at?"* |
| Close-out prompt — *"tell me what you wrote"* | Close-out rubber-stamp — first draft shipped unread | Push: *"read it against the comments already on that ticket."* |

<!-- backing -->

Claims
- `tracker-encodes-how-the-team-works` · vision · "your tracker already encodes how your team works" ← none-owed
- `each-field-carries-an-unwritten-convention` · vision · "each field carries a convention nobody wrote down" ← none-owed
- `conventions-read-shapes-the-close-out-voice` · vision · "An agent that has read those conventions writes a close-out that sounds like your team wrote it." ← none-owed
- `one-ticket-gives-rules-not-policy` · vision · "One ticket gives basic rules, not policy." ← none-owed
- `refinement-is-backlog-grooming` · detail · "**Refinement** is the backlog-grooming work. Sizing, splitting, and sharpening tickets before they are worked." ← cultural-vocab
- `close-out-is-the-first-thing-a-teammate-reads` · vision · "The close-out is the first thing you have written today that a teammate reads." ← none-owed
- `rejected-rules-sharpen-the-read` · vision · "The ones you reject sharpen the read as much as the ones you keep." ← none-owed
- `anything-can-be-reverse-engineered` · vision · "Anything can be inspected and reverse-engineered with an LLM" ← maintainer-frame
- `study-extract-carry-forward` · vision · "Ask the agent to study it. Extract a `.md` file. Use that file as context in the next agent." ← maintainer-frame
- `read-is-only-as-good-as-the-record` · vision · "The read is only as good as what the thing has recorded." ← none-owed

Sources
- maintainer-frame `[checked:2026-08-03 result:ATTESTED due:none]` — [maintainer-attested] Antti's own working frame, given verbatim in session and carried near-verbatim into the closing slide: *"Anything can be inspected and reverse engineered with LLM. The move is: ask LLM to study it. Extract .md file. Use .md file as context in the next agent."* Per `check_research_claims.md §1` a maintainer-attested claim is the author's own word and owes no URL. One reshape on the record: *LLM* → *the agent* on the three action steps, per the acting-versus-thinking vocabulary split; the capability sentence keeps *LLM*. fallback: cut the generalisation and the exercise stands as a tracker read, losing the Monday-morning transfer.
- No other source owed. The body cites no practitioner and asserts no platform capability beyond the frame above. *Refinement* is standard agile shop vocabulary carried as `[cultural-vocab]` per `check_writing.md §6`; the one external pointer is to a local reference page, which carries its own stamps.

Frameworks
- Access-trust gap · [borrow:none] · law:access-trust-gap · ← none — reaching past the repo is the first place granted access outruns earned trust
- Blast radius · [borrow:safety engineering] · law:blast-radius-error-budget · ← cultural-vocab — a write into the team's tracker is the first irreversible-in-public action of the training

Stance `[stance:2026-08-03 level:L1]`
- holds: that the study-extract-carry-forward move generalises past tickets to any inspectable artifact. Single-practitioner origin, maintainer-attested, so L1 and not higher — the frame is Antti's working practice, not a converged community claim. The mechanics of the exercise itself assert nothing and would sit at L0 on their own.
- contested: the reach of *anything*. The slide states it bare and carries its boundary in the following bullet per `check_writing.md §12`, which is a deliberate choice over hedging the line itself. A judge reading the slogan alone will over-read it; read the fourth bullet before flagging.
- would-move-it: a second practitioner publishing the same three-step shape independently, which would take this toward L2 and let the body drop the attribution. Or cohort evidence that the read collapses on low-discipline trackers often enough to make the carve-out the headline rather than the footnote.

OODA
- question: does the conventions read hold up across trackers with thin field discipline, where one ticket carries almost no signal? And has anyone else published the study-extract-carry-forward move under a name?
- roster: cohort observation on tracker quality, Kieran Klaassen and the Every source-code feed, Geoffrey Huntley, Dex Horthy
- last-run: 2026-08-03

<!-- /backing -->
