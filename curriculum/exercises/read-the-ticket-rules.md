# Read the rules *hiding in a ticket*

**Time:** about 10 minutes, on your own.

**What you do:** paste one real ticket from your tracker into Claude and have it infer how your team uses the fields, then propose a few backlog-refinement rules you can fold into your task-shaping file.

**What you build:** a short set of field-use rules, read off one ticket, added to the rules file you started in Module 2.

**The point:** your tracker already encodes how your team works. Status, labels, priority, estimate: each field carries a convention nobody wrote down. One ticket is enough for Claude to start reading those conventions back to you.

Module 2 gave you a rules file for shaping tasks. Your tracker holds a different layer: how your team sizes, labels, and routes work. One ticket is enough for a first read.

## Read one real ticket

- One ticket is enough for a first read. Open one real ticket from Jira, Linear, GitHub Issues, Azure Boards, or whatever your team uses. Copy the ticket into Claude with the visible fields: title, description, comments, and links.

Ask Claude to infer how your team uses its tracker from that one ticket, and to propose a few backlog-refinement rules.

{{prompt:extract-the-task-shaping-rule-4}}

## Fold the field-use rules into your file

- One ticket gives basic rules, not policy. Which fields matter, which labels carry meaning, which wording signals "too big," which status changes imply ownership.
- The rules fold back into the file. These field-use rules become the first add-on to the task-shaping `.md` file you saved in Module 2, or a small companion file beside it.
- Depth comes from more tickets. Three to five tickets from different work types surface stronger rules than one ticket, and Claude should keep separating strong signals from guesses as the sample grows.

## What happened

You pasted one real ticket, and Claude inferred how your team uses fields like status, labels, priority, component, estimate, owner, and epic. It separated strong signals from guesses, and proposed a few backlog-refinement rules. You folded the ones that held into your task-shaping file.

<!-- maintainer -->

**Homework exercise — M2 ticket-inference beat, pulled out of `extract-the-task-shaping-rule` where it already lived as an optional "if time remains" step. Promoting it to its own take-home file keeps the in-class exercise focused on the task-shaping rules file.** No Quality line yet: this file needs a `curriculum-pre-ship-audit` pass before ship. Prompt `extract-the-task-shaping-rule-4` is re-parented here (body unchanged; `origin:` frontmatter points at this file).

**Meta (trainer):**
- **Primary Bloom's level:** Analyze (infer field conventions from one ticket) + Apply (fold the rules into the file).
- **Time:** about 10 min, homework after Module 2. Optional; the required M2 artifact is the task-shaping `.md`, this extends it.
- **Session continuity:** self-contained. The prompt needs only one pasted ticket; the task-shaping `.md` it folds into is on disk, resolvable from any session in the repo.

**Push-back moves (trainer / self-directed):**
- **One-ticket overreach** — student treats one-ticket inference as policy. Push: *"one ticket gives basic rules. Mark the guesses, then test them on more tickets later."*
- **Signal / guess blur** — Claude reports every inference as a strong signal. Push: *"which of these are you sure about from one ticket, and which need a second ticket to confirm?"*

**Plug points:**
- One real ticket from the student's task manager.
- Sponsor-stated rules home for students who fold the field-use rules into a team-shareable path.

**Frameworks riffed on (attributed at the lecture, not this exercise's body):**
- The three automation shapes are named in `lectures/where-the-rule-could-live.md`. This exercise stays anchored to the student's own ticket.

**Leap test (Monday):** three observable outcomes the engineer exhibits on their own codebase by the next working day:
- **Reverse-engineers a team convention from one real ticket** — reads field use off a single ticket instead of asking someone. Falsifiable: scrollback shows Claude inferring status / label / estimate conventions from a pasted ticket.
- **Marks inferences as strong-signal vs guess** rather than treating all of them as fact. Falsifiable: the proposed rules carry a confidence split.
- **Adds one field-use rule to the task-shaping file** born from a real ticket. Falsifiable: the `.md` from Module 2 gains a tracker-convention rule that quotes a real field.

**Arc:**
- Picks up from: `extract-the-task-shaping-rule` — the task-shaping `.md` saved there is where these field-use rules fold in.
- Hands off to: nothing by stable path. The field-use rules live in the student's own rules file (terminal artifact).
