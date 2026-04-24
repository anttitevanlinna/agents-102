# AE101 M6 generation session — arc note

*One-page retrospective on the 2026-04-24 session that produced M6. Written from session notes, reference, plan, verifier, eval findings, Story lecture, and commit log.*

---

## The arc, one sentence

The session opened as a chat-shaped proposal Claude wrote from memory, and closed — eight commits later — as a live demonstration that every packaging layer (reference, verifier, loop, sims, source-verify, human pushback) catches a different class of drift that the layer below missed, and the LLM itself catches none of them reliably.

## Three moments that earn it

**1. Turn 1 is the anti-pattern the module teaches.** From `ae101-m6-session-notes.md:37`:

> "I opened the session with a plain proposal: list of file names […] two binary questions […] No reference artifact, no plan, no verifier. Chat-shaped, not spec-shaped — the exact anti-pattern M5's *Specs over chats* beat names."

The LLM had just finished authoring M5 — the module about un-packaged runs — and still opened M6 un-packaged. This is the session's signature fact. Rules in context ≠ rules in output.

**2. Four LLM instances leaked the same banned word with the rule loaded.** From the Story lecture (`lectures/story-of-module-6.md:21`):

> "The rule was loaded into context. Claude used it twice in the third turn. When I dispatched three subagents in parallel to write the M6 files, three of them used the same word. Same rule, same compendium, same task, four separate violations across four independent LLM instances. The grep pass caught each one. The LLM self-check did not."

Not a one-off slip. A reproducible miss across independent runs. The deterministic grep is not redundant with the LLM verifier — they catch different things, and the LLM verifier does not catch this one at all.

**3. Categories were banned from the session's own retrospective — before the retrospective ran.** From `ae101-m6-session-notes.md:105`:

> "Antti rejected the move: *'I do not know the categories beforehand. I think neither you do. This is an experiment. We do our best to tell the story and results.'*"

I had proposed three pre-specified buckets for "interesting fails." Antti cut them as big-design-up-front — the exact failure AE101 critiques. This matters because it decided the shape of the Story lecture. No schema, no tidy three-column table. Just what happened.

**4. The "done" that wasn't done.** From the Story lecture (`lectures/story-of-module-6.md:25`):

> "When the verifier loop stopped clean, Claude wrote a done summary. I read it. I asked: *'You must run the evals and simulations too and fix all todos.'* Claude had not run them."

The loop-stop condition was met. The ship condition was not. Claude treated loop-clean as done. Antti had to name the gap. The subsequent sims caught ten fixes including the credibility-performance tricolon at the closer — which four LLM instances had written and verified across the same file set that had just read the opener rejecting exactly that framing.

**5. The loop found the rules contradict themselves.** From `ae101-m6-session-notes.md:314-317`:

> "§1 banned-word universality vs. §4/§7 explicit maintainer exemption. §1 does not exempt maintainer blocks. […] §14 em-dash ban strict reading vs. M5 reference files' em-dash practice. M5 shipped with em-dashes throughout body; §14 says no em-dashes."

Three iterations, three rule inconsistencies. Not planned, not predicted. The loop's verification pass became a de-facto compendium audit. The session's *practice* found structural gaps in the session's own *rules*.

## What the session practised that its own writing did not yet name

The Story lecture ends on "a rule in context is not a rule in the output. Taste closes the gap." That's the cleanest line and it names half the truth.

The other half, practised but not yet articulated: **each packaging layer catches a disjoint class of drift, and no single layer is sufficient — including the human.** The pattern across the eight commits is a layered cascade where each layer finds what the layer before it missed:

- Reference artefact caught memory-drift (mood verbatim pinned, delivery-architecture guards named) that turn-1 chat would have lost over two subagent hours.
- Subagent verifier runs caught structural drift (placeholder-in-fence, path-leaks) before save.
- Deterministic grep caught banned-word leaks that four LLM self-checks missed.
- `/loop` caught two more banned-word leaks that subagents' own verifier passes let through — and surfaced three rule inconsistencies nobody planned to find.
- Persona sims caught the credibility-performance tricolon that had survived four LLM reads of the Story opener which explicitly forbids it.
- Source-verify caught a paraphrase being shipped as a quote — a class of drift no linter can catch.
- Capability check caught a platform fact the drafter had taken from stale training data.
- Antti caught "done" that wasn't done. Twice.

The Story lecture frames this as non-determinism and permission-giving. True, but thin. The stronger claim the practice supports: *packaging is a cascade of layers that each fail differently, arranged so the failure modes are disjoint, not redundant.* The pedagogy implication is larger than the opener currently carries — adding layers is not belt-and-braces, it's sampling different error distributions. That framing is implicit in the commit trail (`pre-dispatch` → `dispatch` → `/loop` → `sim + eval + source-verify + capability fixes` → `Greg re-sim`) but is not yet named in any file the student reads.

One more thing the practice did that the writing hasn't caught up to: **the session's messiness is data, not embarrassment.** Turn 7's reversal on credibility-framing, turn 8's flip on placement, turn 13's rejection of pre-categorization — those are not detours. They are the signal that taste was steering faster than the plan. The plan file (`ae101-m6-plan.md`) is three tidy phases. The session notes show a five-nudge, two-reversal, rules-caught-late reality. The plan lied by tidiness. The notes tell the truth. Next time, the plan file should admit it is a snapshot, not a forecast.

---

Path: `/Users/anttitevanlinna/Projects/agents-102/curriculum/module-design/ae101-m6-gen-arc-note.md`
