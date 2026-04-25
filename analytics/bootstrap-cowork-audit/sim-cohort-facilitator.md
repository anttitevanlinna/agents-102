# Sim — Cohort facilitator (M4, Cowork-default room of 12 SVPs, 1h45)

**Persona:** Tuesday-morning facilitator. Projector live, screen-share on, my Claude pane is the room's pane. I read the page the way the SVP in row 3 reads it. I don't read maintainer blocks during delivery — they don't exist for me on the clock.

---

## File 1 — `author-security-plugin.md` (NEW, ~25 min)

**Can I deliver Tuesday?** **With prep.** One dry-run of Phase 3 across both runtimes, or I'm improvising the install moment in front of 12 SVPs.

**Pacing.** Phase 1 (5 min) is the cleanest beat in the module — one prompt, room types three to five lines, designed dwell while everyone finishes. Phase 2 is where the rhythm goes. The 12-min budget assumes the four-attack-class enumeration lands in two-to-three turns; for the slow learner whose first draft omits indirect prompt injection AND blurs supply-chain, that's three turns of typing pushback while the projected screen shows something else. No designed pause beat between "read what Claude proposes" and "push back where it is off" — the trainer has to invent one. Phase 3 is the cliff: the install moment is genuinely different per runtime and the page knows it (three `.rt-*` blocks), but in the room there is no "ok, Cowork people first, then we sync" pause written in.

**Projector readability.** The body uses `module-4/policies/` and `~/.claude/plugins/<plugin-name>/` paths inline — fine projected. The Phase 2 prompt is 30+ lines of fenced text with a four-bullet attack-class list nested inside. At projection distance row-3 sees a wall. Per `check_pedagogy.md` no-megaprompts-in-classroom rule, this is the longest prompt in the module and it's exactly the one the room copy-pastes. Mitigation: trainer hits the Copy button (designed-in), but the room then waits while their pane scrolls through the Claude response. That's the natural conversation pause — but it's not authored, just available.

**Runtime-fork hazard.** Real. The Cowork block (lines 90–106) is the longest of the three and reads as "the smoothest path." The Desktop and CLI blocks are factual but shorter. With Cowork toggle active per the reading-discipline filter, I see only Cowork — fine. With CLI/Desktop toggle, I see only that block — also fine. **But in a real room, the trainer projects ONE toggle.** If the room is mixed (default Cowork + two CLI users), the projected page shows one path; the two CLI users improvise from the unrendered branches or ask. The page handles this structurally (the conditional blocks exist) but the trainer-facing reconciliation move is not written down. I'd add one line at Phase 3 top: *"Cowork users: follow the chat-button install. CLI/Desktop: follow your runtime's block. We sync at the verify prompt."*

**Time math.** 5 + 12 + 8 = 25 min, no transition slack inside the exercise. Realistic if Phase 2 is two turns. Three turns = 28–30 min and we eat the audit's slack.

**The student who freezes on Phase 1.** The body coaches the SVP toward specifics ("the customer your CEO would not want named"). That helps the SVP who has an opinion but can't articulate it. It does not help the SVP who genuinely does not have an opinion ready — typical in a regulated Nordic enterprise where the policy-owner is two floors away. **The forcing function assumes preparation the prework didn't enforce.** Mitigation in the room: the facilitator pairs the freezer with the policy `.md` files for two minutes — but that breaks the "don't pre-read" rule. The honest fix is a Phase-0 prework prompt: *"Before M4, type three to five lines about your company's data, somewhere you can paste from."* Not in the file currently.

**Named attack classes — can I defend each?** Direct prompt injection: yes, one line ("hostile input in a user prompt"). Indirect: yes, the body glosses it ("hostile content in a retrieved source"). Secrets-in-context: yes, named with examples (API keys, NDA material). Tool confusion: **the gloss in the body is the weakest** — *"agent invokes the wrong tool, or the right tool with the wrong scope"* is fine on the page but I'd want a one-sentence example projected ("agent uses the production DB connector when test would do"). Plugin supply-chain: defensible, but the recursive joke ("the plugin you just authored is itself a supply-chain question") is a closer that needs the lecturer's voice, not body prose. Verdict: three of four self-explanatory; tool-confusion needs an inline example or the trainer improvs.

**Helps me in the room (quote):** *"The plugin carries your judgment. Reading the files first dilutes the judgment with the file's vocabulary."* — that's a one-liner I can repeat to the freezing SVP without breaking flow.

**I'd rewrite (quote):** *"Plugins load at session start, not into the current session, so the verify step is a fresh session."* — true, but at projection distance and under cognitive load this reads as a runtime gotcha. I'd lift it to a callout box or front-load it at the top of Phase 3.

**Verdict: APPROVE-WITH-TODOs.** TODOs: (1) add Phase-0 prework dictation prep; (2) inline tool-confusion example; (3) one-line runtime-fork sync sentence at Phase 3 top.

---

## File 2 — `audit-your-agent.md` (RESHAPED, ~45 min)

**Can I deliver Tuesday?** **Yes** — this one is the workhorse and the long agent waits ARE the designed conversation pauses.

**Pacing.** Phase 1's audit run takes minutes; the "stay with it" line invites banter, and Phase 1.5 (the Claude-reads-the-report move) is genuinely a new pedagogical beat — exactly the right move at the moment fatigue hits. Phase 2 same shape. Phase 3 is the cleanest in the module: name the risk, "DO NOT make any changes yet" forces the diff-review beat, the room watches one mitigation land. The Close at 4 min is a real beat, not a tail.

**Projector readability.** The Phase 1 prompt is reasonable length. Phase 2's prompt is four paragraphs but each is one logical move; survives projection. Phase 3's prompt has the load-bearing *"DO NOT make any changes yet... Wait for me to type 'apply'"* which projects clearly — that's the kind of forcing-function sentence the room reads aloud naturally.

**Runtime-fork hazard.** Low. No `.rt-*` blocks. The exercise is runtime-agnostic — the plugin authored in exercise 1 is loaded; from here it's all prose-prompt-and-read. Cowork and CLI behave identically.

**Time math.** 12 + 5 + 12 + 12 + 4 = 45 min. Tight but real. The 5-min Phase 1.5 is the pressure-relief valve if Phase 1's audit runs long.

**Helps me in the room (quote):** *"'I can't tell' is a real answer."* — projected, this is the entire pedagogy of the module on one line. I will repeat this verbally during the Close.

**I'd rewrite (quote):** *"The uncomfortable feeling is the evidence."* — beautiful in writing, weird projected to 12 SVPs reading silently. Sounds like a slogan. I'd cut it or move it to the lecture closer.

**Verdict: APPROVE.**

---

## File 3 — `security.md` (M4 module file)

**Can I deliver Tuesday?** **Yes.**

**Pacing.** Connections is one strong question — *"What doesn't sit right?"* — designed pause built in. Lecture before exercises is correct here (the framing is needed; this is not a contrast-mood module). The module-level Debrief at 5 min is a genuine sharpen beat, not retro theatre.

**Projector readability.** Key Concepts (Emergent) is seven bullets — long for a screen but it's read AFTER the exercises so cognitive load is lower. The Debrief prompt is 8 lines, projects fine.

**Runtime-fork hazard.** None at module level.

**Time math.** Module budget: ~75–85 (per maintainer). My math: lecture 10 + exercise 1 25 + exercise 2 45 + Connections 5 + Debrief 5 = 90, plus 4 transitions × ~2 min = ~98. **That's over 1h45 by 13 min if anything slips.** The maintainer says "Fits 1h45 with classroom-pace concurrency" — true only if Phase 2 of the author exercise is two turns and the lecture stays at 10. I'd cut the lecture to 8 and accept Phase 2 occasionally running 14.

**Confused student / freezing.** Module-level: the Connections question is open enough that everyone has something. Safe.

**Named attack classes defence at module level.** Key Concepts callout 3 ("Prompt injection is a class, not a footnote") earns the named-class framing in one paragraph. Defensible without improv.

**Helps me in the room (quote):** *"Run the loop, not the anxiety."* — Key Concepts bullet 1, one-liner I can drop verbally during transitions.

**I'd rewrite (quote):** *"The plugin carries the expertise you fed it."* (Key Concepts 2) — fine, but it's the third time we say this between the two exercises and the module file. One of the three should go. I'd cut from Key Concepts since the exercises earn it.

**Verdict: APPROVE-WITH-TODOs.** TODOs: (1) verify time math under realistic Phase-2 turn count; (2) decide which of the three "plugin carries judgment" repetitions to cut.

---

## Combined verdict

**Ship after a 90-min facilitator dry-run.** Not Tuesday cold.

The audit exercise is cohort-ready. The module file is cohort-ready. The author exercise needs one rehearsal of Phase 3's runtime fork — specifically, Cowork *Save plugin* button reliability and the moment where one CLI user diverges from eleven Cowork users. The Phase 1 freeze case wants a prework dictation prep added before the cohort runs. None of these are revise-the-design problems; they are last-mile facilitator-readiness gaps. A 90-min dry-run with a colleague playing the freezing SVP and a colleague on CLI surfaces both.

The room will get value Tuesday either way. But "either way" is not the bar for 12 SVPs at a Nordic enterprise paying enterprise rates.

WROTE: /Users/anttitevanlinna/Projects/agents-102/analytics/bootstrap-cowork-audit/sim-cohort-facilitator.md
