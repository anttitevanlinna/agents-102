# Source sweep 2026-05-25 — Group B (M6 / composition cluster)

Auditor: source-verification agent. Date: 2026-05-25. Window: current = published on/after ~2025-11-25.

Files audited (exhaustive):
- curriculum/lectures/composing-the-workflow.md
- curriculum/lectures/agents-that-build-agents.md
- curriculum/trainings/agentic-engineering-101/supplementary/workflow-composition-lineages.md
- curriculum/trainings/agentic-engineering-101/spot-gaps-build-the-loop.md

Local cross-checks: continuous-research/observations/ramp.md, intercom.md; continuous-research/findings/by-pattern/workflow-composition-{1a,3-confirmation}.md.

---

## FILE: curriculum/trainings/agentic-engineering-101/spot-gaps-build-the-loop.md

### B1 — Klaassen compounding "four-step loop + 80/20 ratio" — MISATTRIBUTED URL (CORRECT)
- **file:line:** spot-gaps-build-the-loop.md:152 and :160
- **body claim (152):** "**Compound engineering** — Kieran Klaassen, [Compound Engineering: The Definitive Guide](https://every.to/source-code/compound-engineering-the-definitive-guide) ... Live + accurate 2026-05-25."
- **body claim (160):** "**Klaassen compounding** — `https://every.to/source-code/compound-engineering-the-definitive-guide` (Kieran Klaassen, 2026-02-09) ... The four-step loop + 80/20 ratio (80% planning+review, 20% execution) carry the closing lecture; within 6-month window as of 2026-05-25"
- **URL:** https://every.to/source-code/compound-engineering-the-definitive-guide
- **VERDICT: CORRECT** — [practitioner direct, vendor venue]
- **findings:** Article byline Kieran Klaassen, date 2026-02-09 (CONFIRMED, within window). BUT the Definitive Guide article does NOT contain the four-step loop OR the "80% planning+review, 20% execution" ratio. WebFetch of the article: "does not name or describe a four-step loop" and "does not state an 80/20 ratio." The 80/20 ratio and the loop verbs live in the **plugin README** (https://github.com/EveryInc/compound-engineering-plugin), which states verbatim: *"80% is in planning and review, 20% is in execution"* and describes the loop as *"brainstorm the requirements, plan the implementation, work through the plan, review the result, compound the learning, then repeat."* The spot-gaps source-verification note attributes both the loop and the 80/20 to the Definitive Guide URL — that source does not carry them. The article IS live and accurate for the *philosophy* of compound engineering ("each unit of engineering work should make subsequent units easier"); it is the wrong citation for the loop+ratio.
- **EXACT FIX (line 160):** replace the URL-attribution so the loop+ratio is sourced to the plugin README, e.g.:
  `**Klaassen compounding** — four-step loop + 80/20 ratio ("80% is in planning and review, 20% is in execution") sourced to the plugin README \`https://github.com/EveryInc/compound-engineering-plugin\` [practitioner direct, vendor venue]; the philosophy framing is in the Definitive Guide \`https://every.to/source-code/compound-engineering-the-definitive-guide\` (Klaassen, 2026-02-09). Both live + accurate 2026-05-25.`
  Also soften line 152's body attribution if the closing lecture asserts the 80/20 as coming from the Definitive Guide — confirm what the closing lecture (`the-loop-has-a-name.md`, NOT in this group) actually cites before re-stamping.
- `[checked:2026-05-25 result:CORRECT due:asap]` <https://github.com/EveryInc/compound-engineering-plugin> — [practitioner direct, vendor venue] 80/20 ratio + four-step loop live in the plugin README, NOT the Definitive Guide article. fallback: cite the README for loop+ratio, the Every.to article for the philosophy only.

### B2 — Ronacher three-pattern "10h, 2.2M tokens" — OK
- **file:line:** spot-gaps-build-the-loop.md:156
- **body claim:** "Ronacher's three-pattern — `https://lucumr.pocoo.org/2026/1/14/minijinja-go-port/` (Armin Ronacher, 2026-01-14) ... reference / plan.md-equivalent / verifier named or cleanly inferable; 10h, 2.2M tokens; Rust snapshot test reuse."
- **URL:** https://lucumr.pocoo.org/2026/1/14/minijinja-go-port/
- **VERDICT: OK** — [practitioner direct]
- **findings:** Byline Armin Ronacher, 2026-01-14 (CONFIRMED, within window). Verbatim figures present: *"Agent run duration: 10 hours (3 hours supervised)"* and *"Total tokens: 2.2 million"*. Reference impl (MiniJinja Rust) + snapshot-test verifier + incremental porting plan (*"reuse the existing Rust snapshot tests and port incrementally (lexer -> parser -> runtime)"*) all present. CAVEAT on framing: there is no literal "plan.md" file in the post; the "plan.md-equivalent" is an inference (incremental staged port). Body already hedges "or cleanly inferable" — acceptable. $60 API cost / ~45 min active human also present.
- `[checked:2026-05-25 result:OK due:2026-11-25]` <https://lucumr.pocoo.org/2026/1/14/minijinja-go-port/> — [practitioner direct] reference + incremental-port plan + snapshot-test verifier; 10h run / 2.2M tokens verbatim. fallback: "plan.md-equivalent" is an inference, not a literal file in the post.

### B3 — Cherny three verifier shapes (secondary sources) — CAVEAT
- **file:line:** spot-gaps-build-the-loop.md:157 and :149
- **body claim (157):** "Cherny's three verifier shapes — confirmed 2026-05-25 against `https://getpushtoprod.substack.com/p/how-the-creator-of-claude-code-actually` (John Kim, 2026-02-21) + `https://newsletter.pragmaticengineer.com/p/building-claude-code-with-boris-cherny` (Gergely Orosz, 2026-03-04). The three-shape framing is Cherny's own ... Both within 6-month window 2026-05-25."
- **URLs:** https://getpushtoprod.substack.com/p/how-the-creator-of-claude-code-actually ; https://newsletter.pragmaticengineer.com/p/building-claude-code-with-boris-cherny
- **VERDICT: CAVEAT** — Kim source [practitioner analysis]; Orosz source [practitioner analysis] but does NOT corroborate the three shapes
- **findings:** Push-to-Prod: byline John Kim, 2026-02-21 (CONFIRMED, within window). Tip 12 verbatim: Cherny *"prompts Claude to verify its work with a background agent when it's done, uses an agent-stop hook for deterministic verification, or uses the Ralph Wiggin plugin for autonomous looping."* — confirms all three shapes. Kim is the writer interviewing/synthesizing Cherny → correct label is **[practitioner analysis]** (Kim on Cherny), NOT practitioner-direct; the body says "Cherny's own" framing which is true of the moves but the source-type for citation is analysis. Pragmatic Engineer: byline Gergely Orosz, 2026-03-04 (CONFIRMED, within window), is a Cherny interview — BUT WebFetch found it does NOT cover verifier shapes / long-running-task verification. So citing it as a second corroborator of the three-shape framing is an overclaim; it corroborates Cherny's general workflow authority, not the three shapes specifically.
- **EXACT FIX (line 157):** drop the Orosz URL as a corroborator of the three shapes (or re-scope it to "general Cherny-workflow context"); label Kim as [practitioner analysis]. Suggested: `Cherny's three verifier shapes — confirmed against John Kim, *How the creator of Claude Code actually...* https://getpushtoprod.substack.com/p/how-the-creator-of-claude-code-actually (2026-02-21) [practitioner analysis, Kim on Cherny], tip 12 lists all three (background-agent verify / agent-stop hook / Ralph Wiggin plugin). Orosz interview (2026-03-04) does not cover the three shapes; not a corroborator for this claim.`
- `[checked:2026-05-25 result:CAVEAT due:2026-11-25]` <https://getpushtoprod.substack.com/p/how-the-creator-of-claude-code-actually> — [practitioner analysis] Kim on Cherny, tip 12 = three verifier shapes verbatim. fallback: Orosz interview does NOT cover the three shapes — do not cite it as corroborator.

### B4 — Ramp Dojo "350+ skills / 99.5% AI-active / 84% coding agents weekly" — OK
- **file:line:** spot-gaps-build-the-loop.md:150 and :158
- **body claim (158):** "Ramp Dojo 350-skill marketplace — verified 2026-05-25 against `continuous-research/observations/ramp.md` [practitioner direct, Geoff Charles CPO, 2026-04-09]. 350+ shared skills confirmed ... 99.5% AI-active and 84% coding-agents-weekly also confirmed in ramp.md scale table. Public X primary `x.com/geoffintech/status/2042002590758572377` paywalled at re-verify; observation file is the working primary."
- **URL:** https://x.com/geoffintech/status/2042002590758572377 (paywalled) → local primary ramp.md
- **VERDICT: OK** — [practitioner direct] (Geoff Charles, CPO; vendor self-reported metrics — operational facts treated as evidence, the scale percentages are vendor-self-reported and flagged as such)
- **findings:** Cross-checked against ramp.md: line 24 "Skills marketplace (internal) | **350+ skills shared**"; line 38 "Dojo, an internal skills marketplace (350+ skills)"; line 19 "Team active on AI tools | **99.5%**"; line 20 "Team using coding agents weekly | **84%**". All three numbers CONFIRMED in the local observation file. Source = Geoff Charles (CPO) X post "How to get your company AI pilled" dated 2026-04-09. X URL returns paywall (could not re-fetch live — consistent with body note). Date 2026-04-09 is within the 6-month window as of 2026-05-25 (about 6.5 weeks old); body correctly frames as "Past 6-month window for cohorts after 2026-04-09 — dated context; re-verify at delivery." NOTE: these are vendor-self-reported scale metrics from a CPO on his own marketing surface — operational facts (Dojo exists, 350+ skills) are evidence; the round percentages (99.5%, 84%) should stay flagged as self-reported, which the closing-lecture attribution should preserve. Body line 150 attribution is consistent.
- `[checked:2026-05-25 result:OK due:2026-11-25]` <https://x.com/geoffintech/status/2042002590758572377> — [practitioner direct, vendor venue] Charles CPO; 350+ skills / 99.5% AI-active / 84% coding-weekly confirmed via ramp.md (X paywalled). fallback: percentages are vendor-self-reported — keep flagged; observation file ramp.md is the working primary.

### B5 — Intercom Tier 1/2/3 four numbers — OK
- **file:line:** spot-gaps-build-the-loop.md:151 and :159
- **body claim:** "Intercom Tier 1/2/3 — Darragh Curran, [2x Nine Months Later](https://ideas.fin.ai/p/2x-nine-months-later) [practitioner direct, vendor venue, 2026-04-16]. 19.2% auto-approved / 14.6 min vs 75.8 min org median / 86% ≤20 lines / ~500-person R&D — four numbers confirmed verbatim 2026-05-25."
- **URL:** https://ideas.fin.ai/p/2x-nine-months-later
- **VERDICT: OK** — [practitioner direct, vendor venue]
- **findings:** Cross-checked against intercom.md line 41: "19.2% of PRs auto-approved by AI ... merge in 14.6 min (vs 75.8 min org median). 86% of auto-approved PRs are ≤20 lines"; line 3 "~500 R&D". All four numbers CONFIRMED in local observation file. Source Darragh Curran, "2× – nine months later", 2026-04-16 (within window; ~5.5 weeks old). Body note correctly labels author as Curran (observation file lists him as CTO; spot-gaps body just uses "Darragh Curran" — no title mismatch in body). Did not re-fetch the URL live this pass (local observation file is dated 2026-04-16 and matches); body says "Re-verify at delivery — must be within six-month window of cohort date" which is the correct guard.
- `[checked:2026-05-25 result:OK due:2026-11-25]` <https://ideas.fin.ai/p/2x-nine-months-later> — [practitioner direct, vendor venue] Curran (CTO), four numbers confirmed via intercom.md. fallback: vendor-venue self-report; numbers are operational — re-verify within window of cohort date.

---

## FILE: curriculum/trainings/agentic-engineering-101/supplementary/workflow-composition-lineages.md

### B6 — Klaassen Compound Engineering plugin (loop + slash commands) — OK
- **file:line:** workflow-composition-lineages.md:17, :24, :159
- **body claim:** plugin `EveryInc/compound-engineering-plugin` names the four-step loop "Plan → Work → Assess → Compound"; slash commands `/ce-plan`, `/ce-work`, `/ce-code-review`, `/ce-compound`; "dozens of skills and review agents."
- **URL:** https://github.com/EveryInc/compound-engineering-plugin
- **VERDICT: OK (with minor naming caveat)** — [practitioner direct, vendor venue]
- **findings:** README CONFIRMED live. Slash commands present: /ce-strategy, /ce-ideate, /ce-brainstorm, /ce-plan, /ce-work, /ce-debug, /ce-code-review, /ce-compound, /ce-product-pulse — all four cited commands exist. The 80/20 ratio is HERE verbatim ("80% is in planning and review, 20% is in execution"). CAVEAT: the README's loop verbs are "brainstorm / plan / work / review / compound" (5-6 verbs), not the literal four-word "Plan → Work → Assess → Compound." The supplementary's "Plan → Work → Assess → Compound" is a tightened paraphrase; "Assess" maps to "review the result." Defensible as paraphrase but a judge could flag "Assess" as a word not in the source. Optional tightening: note it's a paraphrase, or align to README verbs. "Dozens of skills + review agents" — body avoids count-drift; OK.
- `[checked:2026-05-25 result:OK due:2026-11-25]` <https://github.com/EveryInc/compound-engineering-plugin> — [practitioner direct, vendor venue] /ce-plan,/ce-work,/ce-code-review,/ce-compound + 80/20 ratio confirmed in README. fallback: "Plan→Work→Assess→Compound" is a paraphrase; README verbs are brainstorm/plan/work/review/compound.

### B7 — Pocock skills kit — OK
- **file:line:** workflow-composition-lineages.md:28, :32, :35-36, :162
- **body claim:** `mattpocock/skills` ships small named skills (to-prd, to-issues, handoff, prototype, write-a-skill, setup-matt-pocock-skills); no compose/orchestrator; README opening "My agent skills that I use every day to do real engineering, not vibe coding."
- **URL:** https://github.com/mattpocock/skills
- **VERDICT: OK (one-char punctuation caveat)** — [practitioner direct]
- **findings:** Repo live. All named skill files CONFIRMED to exist (to-prd, to-issues, handoff, prototype, write-a-skill, setup-matt-pocock-skills). No dedicated compose/orchestrator skill CONFIRMED — body claim holds. README opening sentence verbatim is *"My agent skills that I use every day to do real engineering - not vibe coding."* — uses a DASH, body quotes it with a COMMA ("engineering, not vibe coding"). Substance identical; trivial punctuation. Note `check_sales_copy.md` em-dash ban is site-only, not relevant here. Optional fix: match the dash for exact-quote fidelity.
- `[checked:2026-05-25 result:OK due:2026-11-25]` <https://github.com/mattpocock/skills> — [practitioner direct] skill files present, no orchestrator, README opener confirmed. fallback: README uses "engineering - not vibe coding" (dash, not comma) — trivial.

### B8 — Yan/Cognition "Multi-Agents: What's Actually Working" (two verbatim quotes) — OK
- **file:line:** workflow-composition-lineages.md:40, :44, :49, :163
- **body claim:** Walden Yan, 2026-04-22; verbatim "multi-agent systems work best today when writes stay single-threaded and the additional agents contribute intelligence rather than actions"; verbatim "Devin Review catches an average of 2 bugs per PR, of which roughly 58% are severe (logic errors, missing edge cases, security vulnerabilities)."
- **URL:** https://cognition.ai/blog/multi-agents-working
- **VERDICT: OK** — [practitioner direct, vendor venue] (Yan on Cognition's own surface; the 58%/2-bugs metric is vendor-self-reported — flag as such)
- **findings:** Byline Walden Yan, 04.22.26 (CONFIRMED, within window). Both quotes confirmed VERBATIM, exact match to body. CAVEAT per rules: "Devin Review catches 2 bugs/PR, 58% severe" is a vendor-self-reported product metric on the vendor's own blog — operational architecture claim (single-threaded writes + advisors) is evidence; the bug metric should stay flagged as vendor-self-reported. Body presents it as "Yan's published metric" which is honest about provenance.
- `[checked:2026-05-25 result:OK due:2026-11-25]` <https://cognition.ai/blog/multi-agents-working> — [practitioner direct, vendor venue] Yan 2026-04-22, both quotes verbatim. fallback: the 2-bugs/58%-severe Devin Review figure is vendor-self-reported — keep flagged.

### B9 — Cognition "Don't Build Multi-Agents" (historical pair) — OK
- **file:line:** workflow-composition-lineages.md:50, :164
- **body claim:** Cognition's original 2025 stance, paired for the trajectory.
- **URL:** https://cognition.ai/blog/dont-build-multi-agents
- **VERDICT: OK** — [practitioner direct, vendor venue]
- **findings:** Byline Walden Yan, 06.12.25 (2025-06-12). CONFIRMED live; confirmed it argues against multi-agent architectures. OUTSIDE the 6-month window (≈11 months old) — but body uses it explicitly as "Cognition's original 2025 stance" / historical trajectory anchor, which is the sanctioned historical-context use. Dated correctly. Not current evidence; not presented as such.
- `[checked:2026-05-25 result:OK due:2026-11-25]` <https://cognition.ai/blog/dont-build-multi-agents> — [practitioner direct, vendor venue] Yan 2025-06-12, historical 2025 stance. fallback: outside freshness window — historical context only, body dates it correctly.

### B10 — Amp "Feedback Loopable" (Metcalf, three components) — OK
- **file:line:** workflow-composition-lineages.md:56, :65, :165
- **body claim:** Lewis Metcalf at Sourcegraph, 2026-02-05; methodology "making it feedback loopable"; three components verbatim "1. Built a playground. 2. Set up Experiments. 3. Made the inner loop fast."
- **URL:** https://ampcode.com/notes/feedback-loopable
- **VERDICT: OK** — [practitioner direct, vendor venue]
- **findings:** Byline "Lewis Metcalf // February 5, 2026" (CONFIRMED, within window). Three components confirmed verbatim: "Built a playground", "Set up Experiments", "Made the inner loop fast". Phrase "making it feedback loopable" CONFIRMED. Third component is "Made the inner loop fast" in Metcalf's words (body correctly notes the earlier OODA "Verification Loop" relabel was dropped). Solid.
- `[checked:2026-05-25 result:OK due:2026-11-25]` <https://ampcode.com/notes/feedback-loopable> — [practitioner direct, vendor venue] Metcalf 2026-02-05, three components + "making it feedback loopable" verbatim. fallback: vendor-venue methodology; treat as practitioner-coined, not industry standard (body already says so).

### B11 — Amp "Handoff" (feature post, historical) — OK
- **file:line:** workflow-composition-lineages.md:58, :66, :166, :171; also referenced in composing-the-workflow.md:33
- **body claim:** anonymous team byline, 2025-10-23; verbatim "Handoff lets you specify your goal for the new thread. Amp then analyzes the current thread and generates a prompt..."; "It's lossy, for one. Every time you compact a thread, what's in the context window gets replaced with a summary."
- **URL:** https://ampcode.com/news/handoff
- **VERDICT: OK** — [practitioner analysis] / anonymous team byline (vendor venue)
- **findings:** Byline "Chronicle (Amp)" — anonymous team, NOT individually attributed; date October 23, 2025 (2025-10-23). Both quotes CONFIRMED verbatim. OUTSIDE the 6-month window (~7 months old). Body + Freshness note both correctly flag this as historical context per check_research_claims.md §2 and explicitly say "Do not auto-flag." Byline label corrected to anonymous-team in Cycle 3 — consistent. Treated correctly.
- `[checked:2026-05-25 result:OK due:2026-11-25]` <https://ampcode.com/news/handoff> — [vendor, anonymous team byline] Handoff + "lossy compaction" quotes verbatim, 2025-10-23. fallback: outside freshness window — historical context, body flags do-not-auto-flag.

### B12 — Cherny X thread (canonical moves) — BLOCKED
- **file:line:** workflow-composition-lineages.md:85, :160; also referenced in composing-the-workflow.md source note
- **body claim:** Cherny's 2026-01-02 X thread is the canonical run-down: slash commands in `.claude/commands`, subagents (code-simplifier, verify-app), PostToolUse formatting hook, /permissions, MCP, long-running options incl. ralph-wiggum plugin, "give Claude a way to verify its work ... 2-3x the quality."
- **URL:** https://x.com/bcherny/status/2007179832300581177
- **VERDICT: BLOCKED** — [practitioner direct] (intended)
- **findings:** WebFetch returned HTTP 402 Payment Required (X.com paywall) — could not re-fetch live this pass. Two fetch attempts (direct + nitter mirror blank). DID NOT invent content. Body already anticipates this: "If X.com access is paywalled at re-verify time, the moves are also documented in CarolinaCherry's digest below as a fallback aggregator." Fallback digest (B13) WAS reachable and corroborates the moves + the 2-3x verify tip + the subagent names. So the claim is corroborated via fallback even though the primary is blocked. Last good direct verification = 2026-05-21 batch per body. Date (2026-01-02) is within window. No fix needed; BLOCKED on the primary, mitigated by the fallback digest.
- `[checked:2026-05-25 result:BLOCKED due:asap]` <https://x.com/bcherny/status/2007179832300581177> — [practitioner direct] X thread 402-paywalled; not re-fetched. fallback: moves corroborated via CarolinaCherry digest (B13); last direct-verify 2026-05-21.

### B13 — CarolinaCherry "How Boris Uses Claude Code" digest — OK (byline-check passes)
- **file:line:** workflow-composition-lineages.md:80, :86, :161
- **body claim:** fan-curated digest by @CarolinaCherry, third-party aggregation of Cherny's scattered tips; subagent names that "circulate in third-party digests" (code-architect, build-validator, oncall-guide) come from here, NOT from Cherny's one thread.
- **URL:** https://howborisusesclaudecode.com/
- **VERDICT: OK** — [practitioner analysis] (CarolinaCherry on Cherny)
- **findings:** CONFIRMED: site built by @CarolinaCherry (github.com/carolinacherry), explicitly "a fan-made resource not affiliated with Anthropic", chronological compilation of Cherny's X tips. Lists subagents code-simplifier, verify-app, code-architect, build-validator, oncall-guide — matches body's claim that the extra names come from the digest not the thread. Features "give Claude a way to verify its work...2-3x the quality." THE BYLINE-CHECK THE RULES FLAG IS CORRECTLY HANDLED: body labels this [practitioner analysis] "CarolinaCherry on Cherny", NOT practitioner-direct — exactly per the howborisusesclaudecode.com warning in the rules. No undated/zombie issue. Clean.
- `[checked:2026-05-25 result:OK due:2026-11-25]` <https://howborisusesclaudecode.com/> — [practitioner analysis] CarolinaCherry on Cherny, fan-compiled aggregator. fallback: not Cherny-direct — use only as aggregator, never attribute its unifications to Cherny.

### B14 — Ronacher "The Final Bottleneck" — OK
- **file:line:** workflow-composition-lineages.md:90, :97, :167
- **body claim:** Ronacher 2026-02-13; verbatim "If the machine writes the code, the machine better review the code at the same time."
- **URL:** https://lucumr.pocoo.org/2026/2/13/the-final-bottleneck/
- **VERDICT: OK** — [practitioner direct]
- **findings:** Byline Armin Ronacher, Feb 13 2026 (CONFIRMED, within window). Quote CONFIRMED verbatim. Argument (review bandwidth = the constraint composition cannot relax) CONFIRMED. Solid.
- `[checked:2026-05-25 result:OK due:2026-11-25]` <https://lucumr.pocoo.org/2026/2/13/the-final-bottleneck/> — [practitioner direct] Ronacher 2026-02-13, quote verbatim. fallback: none needed.

### B15 — Ronacher "Pi: The Minimal Agent" — CORRECT (one-word quote drift)
- **file:line:** workflow-composition-lineages.md:92, :99, :169
- **body claim (92, 169):** verbatim "My agent has quite a few skills and crucially I throw skills away if I don't need them." Also body line 99 title "Pi: The Minimal Agent Within OpenClaw."
- **URL:** https://lucumr.pocoo.org/2026/1/31/pi/
- **VERDICT: CORRECT** — [practitioner direct]
- **findings:** Byline Armin Ronacher, Jan 31 2026 (CONFIRMED, within window). Quote is NEARLY verbatim but ONE WORD differs: live text reads *"...if I don't **use** them"*; the supplementary (lines 92 and 169) quotes *"...if I don't **need** them."* Since the body presents this inside quotation marks as a verbatim quote (and line 169 says "verify verbatim quote"), the word must match. Substance is the same (disposable skills) but a student/trainer checking the quote will find "use" not "need." Title note: post is about Pi (by Mario Zechner) within OpenClaw — body framing fine.
- **EXACT FIX (lines 92 and 169):** change "if I don't need them" → "if I don't use them" in both the body quote (92) and the verification note (169).
- `[checked:2026-05-25 result:CORRECT due:asap]` <https://lucumr.pocoo.org/2026/1/31/pi/> — [practitioner direct] Ronacher 2026-01-31; live quote is "if I don't USE them" not "need them". fallback: fix the one-word drift in body line 92 + note line 169.

### B16 — Ronacher "Agent Psychosis" — OK
- **file:line:** workflow-composition-lineages.md:92, :98, :168
- **body claim:** Ronacher 2026-01-18; post on unstructured composition loops, dopamine-driven workflows trading short-term satisfaction for long-term review debt.
- **URL:** https://lucumr.pocoo.org/2026/1/18/agent-psychosis/
- **VERDICT: OK** — [practitioner direct]
- **findings:** Byline Armin Ronacher, Jan 18 2026 (CONFIRMED, within window). Title "Agent Psychosis: Are We Going Insane?" CONFIRMED. Argument (dopamine-fueled output volume over quality; asymmetric review burden on maintainers; "reviewing a PR takes many times longer than prompting") CONFIRMED. No verbatim quote pulled into body — paraphrase is faithful.
- `[checked:2026-05-25 result:OK due:2026-11-25]` <https://lucumr.pocoo.org/2026/1/18/agent-psychosis/> — [practitioner direct] Ronacher 2026-01-18, paraphrase faithful. fallback: none needed.

### B17 — Willison "normalization of deviance" pointer — OK (no body URL, convergent pointer)
- **file:line:** workflow-composition-lineages.md:94, :181
- **body claim:** "Willison has flagged the same pattern from a different angle, calling it *normalization of deviance*." Frameworks-attributed note: "[practitioner direct]; sourced from Cycle 1A practitioner sweep, no direct URL in supplementary body but URL in OODA findings."
- **URL:** none in body (intentional).
- **VERDICT: OK** — [practitioner direct] convergent-pattern pointer
- **findings:** Grounded in continuous-research/findings/by-pattern/workflow-composition-1a-practitioners.md (Willison representative quote re: blurring agentic engineering with vibe coding) and workflow-composition-3-confirmation.md ("normalization of deviance pointer in Ronacher's section"). The 3-confirmation file (L1 reading note) explicitly keeps Willison as a supporting voice, not a primitive-shipping lineage — body uses it exactly that way (a one-line cross-reference, not a load-bearing framework). Honest about the missing body URL. No overclaim. Optional: surface the OODA-findings URL into the source-verification note so a future auditor can trace without grepping.
- `[checked:2026-05-25 result:OK due:2026-11-25]` <no body URL — OODA findings workflow-composition-1a/3-confirmation> — [practitioner direct] Willison "normalization of deviance" supporting pointer. fallback: convergent pointer grounded in OODA findings; not a body-cited claim.

### B18 — Dino skill-stacking worked example — NEEDED (no external source; internal trainer artefact)
- **file:line:** workflow-composition-lineages.md:101-130, :182; composing-the-workflow.md:10, :36
- **body claim:** Dino (AE101 trainer) shipped a composed skill stack 2026-05-24; three-layer model, four composition mechanisms, six workflow archetypes, seven design principles; primary doc + three diagrams at supplementary/skill-stacking/.
- **URL:** internal — [Dino's skill stacking system](trainings/agentic-engineering-101/supplementary/skill-stacking.md)
- **VERDICT: NEEDED (verify artefact exists on disk)** — [practitioner direct, AE101 trainer]
- **findings:** This is an internal trainer-authored artefact, not an external evidence source — out of strict scope for URL-byline verification (nothing to WebFetch). The claim "shipped 2026-05-24 with author permission" is an internal provenance assertion. Not an evidence-ladder source; classify as internal-original-content. ON-DISK VERIFIED: primary doc exists at `supplementary/skill-stacking.md` (flat, 10KB); three diagrams (01-meta-model, 02-ship-anatomy, 03-workflows as .mmd + .svg) exist under `supplementary/skill-stacking/`. The subdir contains NO .md. CONSEQUENCE: the supplementary link (workflow-composition-lineages.md:130 → `skill-stacking.md`) is CORRECT. The lecture link (composing-the-workflow.md:36 → `skill-stacking/skill-stacking.md`) is a BROKEN LINK — points into the diagrams subdir where no .md exists. Flagging NEEDED on that broken-link fix, not on source credibility.
- **EXACT FIX (composing-the-workflow.md:36):** change the link target from `trainings/agentic-engineering-101/supplementary/skill-stacking/skill-stacking.md` → `trainings/agentic-engineering-101/supplementary/skill-stacking.md` (drop the `skill-stacking/` subdir segment). The supplementary's own link (line 130) is already correct and needs no change.
- `[checked:2026-05-25 result:NEEDED due:asap]` <internal: supplementary/skill-stacking.md> — [practitioner direct, AE101 trainer] internal artefact; file + 3 diagrams confirmed on disk. fallback: lecture link composing-the-workflow.md:36 is broken (points into diagrams subdir) — drop `skill-stacking/` segment; supplementary link is correct.

---

## FILE: curriculum/lectures/composing-the-workflow.md

### B19 — practitioner-name walk + shared-source re-confirmations — OK (delegates to supplementary)
- **file:line:** composing-the-workflow.md:8, :33-36
- **body claim:** lecture body names Klaassen/Cherny/Pocock/Cognition/Amp/Ronacher (P2) + Dino (P3) one line each; source note re-confirms Amp handoff (2025-10-23) and Klaassen Definitive Guide (2026-02-09) live + accurate 2026-05-25.
- **URLs:** all delegated to the supplementary (verified above: B6-B17); the two re-confirmed here are B11 (Amp handoff) and B1 (Klaassen Definitive Guide).
- **VERDICT: OK** — pointer lecture, no independent evidence URLs in body
- **findings:** Lecture body carries NO standalone evidence URLs — it is a pointer to the supplementary, where each practitioner gets a verified section. Source-verification note (lines 32-36) is accurate: Amp handoff confirmed (B11), Klaassen Definitive Guide confirmed live (B1 — but see B1: the loop+80/20 the note implies live there are actually in the plugin README, so if this lecture leans on the 80/20 it inherits B1's misattribution; the lecture body itself does NOT state the 80/20, so it is clean). Dino worked-example pointer (line 36) → see B18 path-mismatch flag. Sample-not-universe framing ("at least five approaches... the practitioners this curriculum surveys") is internal scoping, not a research claim — no URL needed, correct.
- **NOTE:** this lecture carries the BROKEN Dino link (line 36 → `skill-stacking/skill-stacking.md`); see B18 for the exact fix (drop the subdir segment).
- `[checked:2026-05-25 result:OK due:2026-11-25]` <delegates to workflow-composition-lineages.md> — pointer lecture, evidence verified in supplementary (B6-B17). fallback: if lecture ever asserts the 80/20 directly, inherit B1's plugin-README fix; fix the broken Dino link per B18.

---

## FILE: curriculum/lectures/agents-that-build-agents.md

### B20 — Huntley "Ralph" — OK (historical, correctly dated)
- **file:line:** agents-that-build-agents.md:39-49, :74, :76
- **body claim:** Geoffrey Huntley, Ralph Loop, https://ghuntley.com/ralph/ (2025-07-14, historical foundational — outside freshness, cite as origin not current evidence). The `while :; do cat PROMPT.md | claude-code; done` one-liner; named after the Simpsons.
- **URL:** https://ghuntley.com/ralph/
- **VERDICT: OK** — [practitioner direct]
- **findings:** Byline Geoffrey Huntley, July 14 2025 (2025-07-14) CONFIRMED. The bash loop `while :; do cat PROMPT.md | claude-code ; done` CONFIRMED verbatim. Named after Ralph Wiggum from The Simpsons CONFIRMED. OUTSIDE the 6-month window (~10 months old) — body explicitly flags "historical foundational — outside 6-month freshness, cite as origin not current evidence." Correctly dated and scoped. The `/goal` live-verification (Claude Code 2.1.142, `No goal set. Usage: /goal <condition>`) is a platform-behavior claim verified in a prior pass (2026-05-15), not a web source — out of scope for this sweep, noted as already-verified in the maintainer block.
- `[checked:2026-05-25 result:OK due:2026-11-25]` <https://ghuntley.com/ralph/> — [practitioner direct] Huntley 2025-07-14, bash loop + Simpsons origin verbatim. fallback: outside freshness window — origin/historical only, body flags it correctly.

### B21 — Klaassen prework article "My AI Had Already Fixed the Code Before I Saw It" — STALE (in spot-gaps prework, surfaced here)
- **file:line:** spot-gaps-build-the-loop.md:8 (prework link)
- **body claim:** "Optional pre-read ... Kieran Klaassen, [My AI Had Already Fixed the Code Before I Saw It](https://every.to/source-code/my-ai-had-already-fixed-the-code-before-i-saw-it)."
- **URL:** https://every.to/source-code/my-ai-had-already-fixed-the-code-before-i-saw-it
- **VERDICT: STALE** — [practitioner direct, vendor venue]
- **findings:** Byline Kieran Klaassen, published **August 18, 2025** (2025-08-18) — CONFIRMED live. OUTSIDE the 6-month window (~9 months old as of 2026-05-25). It is offered as an OPTIONAL pre-read, not cited for a load-bearing number/quote, so the staleness is low-severity. The article describes a five-step compounding playbook (teach through work / turn failures into upgrades / orchestrate in parallel / keep context lean / trust the process), NOT the four-step loop and NOT the 80/20 — so it must not be used to source B1's loop+ratio either. Body does not date it; an optional pre-read of a 9-month-old piece is defensible but should be dated so trainers know it predates the current framing.
- **EXACT FIX (spot-gaps :8):** add a date marker, e.g. "Kieran Klaassen, [My AI Had Already Fixed the Code Before I Saw It](...) (2025-08-18, foundational/early framing)." so its age is explicit; or swap for a within-window Klaassen piece if one exists at delivery.
- `[checked:2026-05-25 result:STALE due:asap]` <https://every.to/source-code/my-ai-had-already-fixed-the-code-before-i-saw-it> — [practitioner direct, vendor venue] Klaassen 2025-08-18, ~9mo old, optional pre-read. fallback: date-stamp it as early-framing, or swap for a within-window Klaassen piece.

---

## COUNTS

- OK: 13 (B2, B4, B5, B6, B7, B8, B9, B10, B11, B13, B14, B16, B17, B19, B20) — note: 15 entries land OK; B6/B7 carry trivial caveats but verdict OK.
- CORRECT: 2 (B1 Klaassen loop+80/20 URL misattribution; B15 Ronacher Pi one-word quote drift)
- CAVEAT: 1 (B3 Cherny three-shape — Orosz not a corroborator, Kim is [practitioner analysis])
- STALE: 1 (B21 Klaassen prework 2025-08-18, optional pre-read, undated)
- NEEDED: 1 (B18 Dino skill-stacking — internal artefact; link-path mismatch to confirm)
- GONE: 0
- BLOCKED: 1 (B12 Cherny X thread 402 paywall — mitigated by fallback digest B13)

(21 entries; some OK entries grouped.)
