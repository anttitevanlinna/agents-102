# The agent loop

## The agent, the harness, the loop

- An **agent** is an LLM that runs in a loop, calling tools to take action. Each iteration the LLM receives context (system prompt, conversation, tool results), decides on the next step, and either responds to you or calls a tool.
- The **agent harness** is the surrounding code that runs the loop. It exposes tool definitions to the LLM, executes the tool calls, and feeds results back in. Claude Code is one harness; Cursor, Cline, Gemini CLI are others.
- The **agent loop** is that iteration itself. Prompt → reason → tool call → result → reason again, until the agent decides to stop.
- A long run is this same loop, iterated. Nothing new takes over when the run gets long; the loop keeps choosing the next step from context and tool results, hour after hour.

## See the loop in your live session

Three prompts to make the loop concrete in your current session.

Ask Claude to draw the loop as an ASCII diagram.

{{prompt:ae101-agent-loop-ascii}}

Get the tool list this session is actually carrying.

{{prompt:ae101-agent-loop-tools-list}}

Surface where the tool list comes from, then how MCP-connector tools land in the same set.

{{prompt:ae101-agent-loop-tool-injection}}

> Feel free to dive deeper on any aspect.

<!-- maintainer -->

**Emphasis pass (2026-07-09, Antti-directed "go very lightly on the bold"):** definitional slide keeps bullets; bold reduced to the three defined terms as sub-spans — **agent** · **agent harness** · **agent loop** — and the fourth bullet de-bolded. Slide 2 (live-session prompts) carried no bold and is untouched; blockquote and `{{prompt:}}` refs byte-intact. Per `theory-plan.md § Slide format — emphasis budget` + `check_slides.md §9`. Wording near-verbatim; no claims added or cut.

**Promotion (2026-07-02, Antti-directed):** M1 supplementary → M4 lecture, wired into `run-the-first-experiment.md § Start here`. Slide-format pass per `theory-plan.md` § Slide format + dosage: two slides (anatomy + live introspection). Body changes beyond re-chunking: the defining paragraph became slide-1 bullets (wording preserved); the fourth anatomy bullet (*a long run is this same loop, iterated*) is the ONLY new content — the M4-fit line. The three `{{prompt:ae101-agent-loop-*}}` refs are byte-intact. No packaging laws (0.85ⁿ / triad / principal–agent stay out until M5), no "one loop, three sizes" naming (M3's beat), no cross-module sequencing in body (`check_lectures §3`).

**Placement rationale:** inlined between the far-half opener and Test and learn. The far half names the country (feedback goes quiet, the result arrives all at once); this names the machine that keeps stepping through it — and the three prompts run on the live session that will carry the send-off, so the tool list that comes back is the one the long run rides. Vocabulary lecture at module open per `check_lectures §1`; it arms (mechanism + one introspection move), it doesn't teach the far-half laws.

**Unwiring (promotion = relocation):** both M1 callout links removed — `getting-going.md` "if time allows" blockquote (deleted) and `compound-and-close.md` timebox note (pointer sentence trimmed; the note itself stays). Reversibility: git carries the old wiring — restoring = the two callout lines + the `the-agent-loop` row in `TRAININGS['agentic-engineering-101'].supplementaries` in `site/layouts/curriculum.js`.

**Eyeball questions (Antti):**
1. Does M1 keep any pointer? The compound-and-close timebox note lost its "something to chew on" target; point that wait-beat at another supplementary, or accept the trim.
2. Placement beat: after the far-half container, before Test and learn — or later, right before the send-off prompts?
3. Slide count: +2 slides onto M4's raw count of 15 vs the ~6 budget (fan-out eyeball queue #1's counting question decides whether re-chunked legacy counts; both slides here are re-chunked M1 supplementary content plus one new bullet).
4. The fourth anatomy bullet is the only new sentence — close enough to M3's loop-sizes beat to cut?
5. The three prompts' registry `origin:` frontmatter still reads `agentic-engineering-101/supplementary/the-agent-loop` (documentation-only field per `compile-prompts.js`; left alone to avoid a registry edit). Update on the next prompt-registry pass?
6. ~~Eval coverage.~~ **Closed 2026-08-01, both halves stale.** `SURFACES.lectures` is derived from `theoryManifestLectures()`, so the slug arrives with the M4 manifest entry and needs no hand-listing; and all seven `ae101--the-agent-loop.*.json` instances point at `curriculum/lectures/the-agent-loop.md`, not the supplementary path. `audit-eval-coverage.js --surface lectures` reports this file at 100% applicable on all four compendiums. Verified, not asserted.

**Quality:** compendium-audited 2026-07-12 (writing@b3143a4 story@b3143a4 technical@b3143a4 behavior@b3143a4 pedagogy@b3143a4 strategy@b3143a4 slides@b3143a4)
- judges @b3143a4: writing PASS, story PASS, technical PASS, behavior PASS, pedagogy PASS, strategy PASS, slides PASS

**Meta:** *M4 teaching lecture, ~5 minutes projected. Audience: the engineer about to send a multi-hour task off in this same session. The three prompts demonstrate the loop on the student's live session; that's the teaching move — the anatomy slide is scaffolding for the prompts, not the lesson.*

**Voice:** Boris-flat technical (mechanism description, not framing).

**Watch-fors (delivery):**
- The tool list the prompts return is the one the send-off will carry, MCP-connector tools included. A student surprised by their own list IS the lesson; don't rush past it.
- Keep it under 5 minutes; past that it starts teaching harness trivia the send-off doesn't need.

<!-- backing -->

Format → `curriculum/backing-format.md`. Highest-decay file in the M4 block: every claim above is a mechanism or a product fact, so this block's stamps go stale on platform time, not evidence time. Most sources here are `due:cohort` by design.

**Claims**
- `agent-is-llm-in-a-loop` · borrowed · "An **agent** is an LLM that runs in a loop, calling tools to take action." ← `[SOURCE NEEDED]`
- `loop-iteration-anatomy` · detail · "Each iteration the LLM receives context (system prompt, conversation, tool results), decides on the next step, and either responds to you or calls a tool." ← `[SOURCE NEEDED]`
- `harness-is-the-runner` · detail · "The **agent harness** is the surrounding code that runs the loop. It exposes tool definitions to the LLM, executes the tool calls, and feeds results back in." ← `[SOURCE NEEDED]`
- `named-harnesses` · detail · "Claude Code is one harness; Cursor, Cline, Gemini CLI are others." ← `[SOURCE NEEDED]`
- `loop-runs-until-the-agent-stops` · detail · "Prompt → reason → tool call → result → reason again, until the agent decides to stop." ← `[SOURCE NEEDED]`
- `long-run-is-the-same-loop` · detail · "A long run is this same loop, iterated. Nothing new takes over when the run gets long; the loop keeps choosing the next step from context and tool results, hour after hour." ← `[SOURCE NEEDED]`
- `tool-list-is-introspectable` · detail · "List the tools you have available in this session." — the session can report its own tool set on request ← `[SOURCE NEEDED]`
- `mcp-tools-join-the-same-set` · detail · "how MCP-connector tools get injected into the same set" — connector tools are not a second mechanism ← `[SOURCE NEEDED]`

**Sources**
- *(pending first OODA run — 2026-08-01)*

**Frameworks**
- The agent loop as closed-loop control · [borrow:control theory] · law:is-a-closed-loop-controller · ← cultural-vocab. `theory-plan.md` tags this file as the enacting surface (`[curr:the-agent-loop]`), and the body walks act → observe → correct without ever naming it. The naming happens at M6; nothing here should reach for it.
- Agent = model + tools + loop · [borrow:practitioner-coined] · law:none · ← `[SOURCE NEEDED]`

**Stance** `[stance:2026-08-01 level:L1]`
- holds: *pending first run.* Provisional: the model-plus-tools-in-a-loop definition is the settled minimal one across the practitioner layer, and the harness/model split is the standard architectural cut.
- contested: *pending first run.* The live one is `long-run-is-the-same-loop`. Harnesses interpose machinery that fires **only** on long runs — context compaction, subagent delegation, persisted todo/plan state — and a student who watches their own hour-long run will see some of it happen.
- would-move-it: a documented harness mechanism where something **other than the model reading context** chooses the next step on a long run — a scheduler, a planner/executor split, a non-LLM controller. Compaction and subagents do not qualify on their own: both change *what* the model reads, and the bullet's claim is about *who chooses*. If that distinction cannot be held in one student-legible sentence, the bullet is the thing that has to move, not the stance.

**OODA**
- question: does *"nothing new takes over when the run gets long"* survive the long-run-only machinery shipped in current harnesses — and is the four-name harness list still true on the day a cohort reads it?
- roster: Simon Willison, Anthropic engineering (Boris Cherny, Cat Wu), Armin Ronacher, Thorsten Ball, Dex Horthy; plus `platform-watch/coding-agents/state.md` and `memory/reference_gemini_cli_capabilities.md`.
- last-run: never

<!-- /backing -->
