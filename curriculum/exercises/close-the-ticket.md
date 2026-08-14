# Close the ticket *your team's way*

**Time:** 20 minutes.

**What you do:** read one real ticket, have the agent work out how your team uses its tracker, then close the bug's ticket in that voice.

**What you build:** bug rules read off your own tracker, and a close-out note on the bug you shipped.

**The point:** the agent can reverse-engineer your team's rules.

## Read the ticket for your bug

- Open the ticket for the bug you fixed and paste its link.
- If there is no ticket for this bug, say so in the chat. The agent will offer to create one.

Drop the ticket link after the colon.

{{prompt:close-the-ticket-1}}

## Read the conventions off the ticket

- Every field carries a convention. Status, labels, severity, component, owner, repro steps: how your team fills them is a rule your tracker has been keeping for years.
- One ticket gives a sample of your team's rules, not the policy. The agent separates strong signals from guesses, and names what it cannot tell from a single ticket.
- No ticket of your own to read? Any other real ticket from your tracker works. One the agent just wrote carries none of your team's conventions.
- The rules the agent proposes are for this bug and the ones after it.

Ask Claude to reverse-engineer how your team handles bugs and propose five bug rules.

{{prompt:close-the-ticket-2}}

Push back on the five. The ones you reject sharpen the read as much as the ones you keep. A second bug ticket from a different part of the system shows which rules hold beyond one sample.

## Write the close-out and send it

- Adding a connector is one command per tracker. [MCP and connectors](../trainings/agentic-engineering-101/reference/mcp-and-connectors.md) has them, and it pays back on every session after this one.

Ask Claude to write the close-out, update the ticket, and report what it wrote.

{{prompt:close-the-ticket-3}}

## Double-check the voice

- Does it sound like the comments already on the ticket? If a line reads stiffer than your team's, name it and say what style you want instead.

## Anything can be reverse-engineered

- The ticket is one instance. Anything can be inspected and reverse-engineered with an LLM: a codebase nobody documented, a CI pipeline, a config, an API you did not write, the system your team runs on and cannot explain.
- The move is the same every time. Ask the agent to study the pipeline, the config, the undocumented code. Extract a `.md` file. Use that file as context in the next agent.

## What happened

The ticket gave up two things: a close-out note on the bug you shipped, and the conventions your team has been encoding in its fields all along. The loop that started with a failing test closed.

The field rules stay in the scrollback. The next exercise sweeps this whole session.

<!-- maintainer -->

**View summary:** The student reads one real ticket, has the agent reverse-engineer the team's field conventions from it, and closes the bug's ticket with a close-out note written in that register. Two artifacts: bug rules headed for the rules file, and a close-out note in the team's tracker.

**In-class M1 exercise, third of four.** Runs after `fix-tests-first` (the PR is shipped) and before `compound-and-close`, so the field rules the agent surfaces here are session evidence the compound sweep picks up. No separate fold step, and no rules-file write in this exercise.

**Connector install is named, not taught — because it is a one-liner, not because it is hard.** A connector added at the Claude account's connector surface inherits into a logged-in Claude Code session, and `claude mcp add --transport http <name> <url>` is a single command otherwise (verified against Claude Code 2.1.220 and the reference page's 2026-07-26 stamp). Spending room time on that choreography earns nothing, so the body carries one pointer to `reference/mcp-and-connectors.md` and nothing else. The three-routes bullet (gh / inherited connector / paste) was cut 2026-08-12 as NVA: the session picks the route, the student neither chooses nor acts on it, and the paste fallback needs no forewarning. Do not restore it. The exercise completes on any of them, so per `check_pedagogy.md §17` the connector stays enhancement and never a forcing function.

**Trainer plug-point caveat, deliberately not in the body:** on Team and Enterprise Claude.ai plans only admins can add at the connector surface. Where the sponsor's tenant has not enabled tracker connectors, the room falls to `gh` and paste, and the ask is worth raising with the sponsor before the cohort rather than in the slot.

**Emphasis budget (`check_slides.md §9`):** no bolded handle in the body. All bullet leads plain; widget chrome (`**Time:**`, `**What you do:**`, `**What you build:**`, `**The point:**`) stays bold.

**Meta (trainer):**
- **Primary Bloom's level:** Analyze (read conventions off one ticket) + Apply (write and land the close-out).
- **Atomic — no phase markers.** Line 3 is authored, not generated.
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
- `agent-reverse-engineers-unwritten-rules` · vision · "the agent can reverse-engineer your team's rules" ← none-owed
- `each-field-carries-a-convention` · vision · "Every field carries a convention." ← none-owed
- `conventions-read-shapes-the-close-out-voice` · vision · "If a line reads stiffer than your team's, name it and say what style you want instead." ← none-owed
- `one-ticket-gives-rules-not-policy` · vision · "One ticket gives a sample of your team's rules, not the policy." ← none-owed
- `rejected-rules-sharpen-the-read` · vision · "The ones you reject sharpen the read as much as the ones you keep." ← none-owed
- `anything-can-be-reverse-engineered` · vision · "Anything can be inspected and reverse-engineered with an LLM" ← maintainer-frame
- `study-extract-carry-forward` · vision · "Ask the agent to study the pipeline, the config, the undocumented code. Extract a `.md` file. Use that file as context in the next agent." ← maintainer-frame

Sources
- maintainer-frame `[checked:2026-08-03 result:ATTESTED due:none]` — [maintainer-attested] Antti's own working frame, given verbatim in session and carried near-verbatim into the closing slide: *"Anything can be inspected and reverse engineered with LLM. The move is: ask LLM to study it. Extract .md file. Use .md file as context in the next agent."* Per `check_research_claims.md §1` a maintainer-attested claim is the author's own word and owes no URL. One reshape on the record: *LLM* → *the agent* on the three action steps, per the acting-versus-thinking vocabulary split; the capability sentence keeps *LLM*. fallback: cut the generalisation and the exercise stands as a tracker read, losing the Monday-morning transfer.
- No other source owed. The body cites no practitioner and asserts no platform capability beyond the frame above. The one external pointer is to a local reference page, which carries its own stamps. (*Refinement* left this file 2026-08-12 when the beat was scoped to bugs, and was NOT re-homed — M2's story-ticket read does the activity without naming it, and `extract-the-task-shaping-rule-3` already describes backlog work in plain words. The term is retired from AE101 body prose; if a later pass wants it back, it earns itself at M2, not here.)

Frameworks
- Access-trust gap · [borrow:none] · law:access-trust-gap · ← none — reaching past the repo is the first place granted access outruns earned trust
- Blast radius · [borrow:safety engineering] · law:blast-radius-error-budget · ← cultural-vocab — a write into the team's tracker is the first irreversible-in-public action of the training

Stance `[stance:2026-08-03 level:L1]`
- holds: that the study-extract-carry-forward move generalises past tickets to any inspectable artifact. Single-practitioner origin, maintainer-attested, so L1 and not higher — the frame is Antti's working practice, not a converged community claim. The mechanics of the exercise itself assert nothing and would sit at L0 on their own.
- contested: the reach of *anything*. The slide states it bare and carries its boundary in the third bullet per `check_writing.md §12`, which is a deliberate choice over hedging the line itself. A judge reading the slogan alone will over-read it; read the third bullet before flagging. That bullet is the whole caveat: extraction quality tracks the quality of the tracker data sampled. It replaced a three-sentence version that said the same thing twice and buried a second idea (a thin tracker being itself a finding about the team) inside the restatement; that second idea is not carried anywhere on this slide by design.
- would-move-it: a second practitioner publishing the same three-step shape independently, which would take this toward L2 and let the body drop the attribution. Or cohort evidence that the read collapses on low-discipline trackers often enough to make the carve-out the headline rather than the footnote.

OODA
- question: does the conventions read hold up across trackers with thin field discipline, where one ticket carries almost no signal? And has anyone else published the study-extract-carry-forward move under a name?
- roster: cohort observation on tracker quality, Kieran Klaassen and the Every source-code feed, Geoffrey Huntley, Dex Horthy
- last-run: 2026-08-03

<!-- /backing -->

**Quality:** compendium-audited 2026-08-03 (writing@d1c41dd story@d1c41dd technical@d1c41dd behavior@d1c41dd pedagogy@d1c41dd strategy@d1c41dd slides@d1c41dd)
- judges @d1c41dd: writing PASS, story PASS, technical PASS, behavior PASS, pedagogy PASS, strategy PASS, slides PASS
