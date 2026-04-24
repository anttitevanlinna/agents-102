# Actor scrollback — Bootstrap M2 verbatim — 2026-04-24

Simulated Claude Code session run at the Bootstrap training-directory root `/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/scratch/bootstrap-m2`. Module 1's session was closed; this is a fresh session at the wider scope. Starting tree: `module-1/CLAUDE.md` (from M1 Debrief), empty `module-2/`, `memory/`, `sources/`, `agents/`. No root `CLAUDE.md`.

Connector note: no live MCP. All Confluence / OneDrive / public-URL fetches are substituted from `/tmp/bootstrap-mocks/{confluence,onedrive,practitioners}/`. Every substitution is logged inline as `[harness substitution — …]`.

Student answers for the three M2 opener questions pre-staged at `/tmp/bootstrap-mocks/challenge-inputs.md`; pasted verbatim in blockquotes when Claude asks each question.

---

## Ex1 — name-your-challenge

### Prompt 1 (name-your-challenge/prompt-001.txt) — verbatim

> I'm in a training where I'll build a working memory around one live challenge I'm wrestling with. Help me pin the challenge down. Ask me these in turn:
>
> 1. In one sentence, what's the initiative? A real, midsized-to-large piece of work you're carrying over the next few weeks — scope, stakes, still open.
> 2. What have you already tried, read, or decided? What's ruled out, what's still open?
> 3. Where are you currently stuck on this — what's the specific part you can't seem to get past, or the question you keep asking yourself and not landing?
>
> When I've answered all three, write a one-paragraph brief to module-2/challenge.md. Show it to me before saving.

**Claude:** Understood. Three questions, one at a time — I'll ask the next only after you've answered the last.

**Q1:** In one sentence, what's the initiative? A real, midsized-to-large piece of work you're carrying over the next few weeks — scope, stakes, still open.

**Maija (A1):**

> Rolling out agentic ways of working to 300 engineers at Kaleva Retail Group across Q3 and Q4 — not a tool pilot, a competence shift. Every team should know what an agent can do for their stack, be shipping one small thing with it monthly, and the skeptics on each team should be arguing against real evidence rather than against the category.

**Claude:** Got it. 300 engineers, two-quarter window, competence-shift not tool-pilot.

**Q2:** What have you already tried, read, or decided? What's ruled out, what's still open?

**Maija (A2):**

> Tried: two "AI enablement" sessions from a vendor last quarter; landed flat. Read: Karpathy's LLM Wiki post, Alasaarela's agentic Helsinki talks, the Ramp/Intercom deployment writeups, everything Kieran Klaassen wrote on compound engineering. Decided: no centralised "AI team" — adoption has to live inside the platform sub-teams, not beside them; no mandate; training runs personal-first, team-second. Ruled out: Copilot Enterprise as the platform (our stack is AWS-native, not 365-heavy); a top-down ROI deck for the exec team (the exec team is already convinced — the question is how to land it in 300 engineers' actual weeks).

**Claude:** Clear. Vendor training burned already; personal-first, team-second locked; Copilot ruled out; exec is already converted.

**Q3:** Where are you currently stuck on this — what's the specific part you can't seem to get past, or the question you keep asking yourself and not landing?

**Maija (A3):**

> Stuck on the skeptics. The sub-team leads are split — half are running experiments, half think it's 2019-blockchain energy and want to wait six months. I can't ship a rollout plan that treats both groups the same, but I also can't write two plans. The question I keep not landing: what does "convert the skeptic" actually look like in practice — do I let them opt out for a quarter and catch up on evidence later, or is that a hole in the org I'll regret, and what's the forcing function that's honest rather than performative?

**Claude:** Here's the draft one-paragraph brief before I save it:

*[draft shown — identical to what lands in module-2/challenge.md; Maija confirms]*

*(Write: `module-2/challenge.md` — challenge brief, one paragraph, includes the "convert the skeptic" question as the stuck point.)*

### Prompt 2 (name-your-challenge/prompt-002.txt) — verbatim

> Based on the challenge brief you just wrote, suggest where I'd go looking for raw material. Specifically:
>
> - 3 to 5 search terms I'd type into our company Confluence or wiki
> - 2 to 3 OneDrive / SharePoint folder names likely to hold relevant docs, emails, or decks
> - 2 to 3 practitioners (named people — writers, operators, researchers) worth reading on this challenge, with one link each if you know them
>
> Keep it short. I'll use this as a scavenger-hunt list in the next phase.

**Claude:**

**Confluence / wiki searches (ENG + SEC spaces):**
- "AI enablement" — finds the Q1 vendor retro and follow-on notes.
- "platform OKRs 2026" — the H2 OKR doc with the agentic objectives.
- "classification policy" — the draft data-classification-for-LLM policy in SEC.
- "sub-team structure" — the lead-by-lead charter doc with stance notes.
- "agentic rollout" — whatever's already been written on the topic.

**OneDrive / SharePoint folders:**
- `/Kaleva/Platform/Leads/weekly-sync/` — Monday leads notes.
- `/Kaleva/Platform/Maija/personal/` — your own prep notes.
- `/Kaleva/Platform/Maija/email/` — exec threads, Tuomas-facing.

**Practitioners:**
- **Andrej Karpathy** — LLM Wiki thread and follow-ups. The curate-not-ask frame. (X thread, paraphrased compilations.)
- **Mikko Alasaarela** — Agentics Helsinki talks on rollout patterns, Nordic context. (agenticshelsinki.fi)
- **Kieran Klaassen** — compound engineering essays. Every.to / Substack.

---

## Ex2 — build-your-challenge-memory

### Prompt 3 (build-your-challenge-memory/prompt-001.txt) — verbatim

> I'm building a knowledge memory for one specific challenge I'm working on. Do this in three beats:
>
> 1. First, read module-2/challenge.md so you have the challenge in mind. Then check what connectors are enabled in my Claude Code session right now — name the ones you can reach (wiki, docs, storage, chat, email) and the ones that would be useful but aren't connected.
>
> 2. Then ask me where my work material actually lives. Don't assume Confluence or OneDrive — ask what's in my world: my team's wiki (whatever the tool), my shared drives and docs, email threads, chat channels, personal notes, favourite practitioner blogs. Get specific: tool names, the 2–3 most relevant spaces/folders, the people I've been exchanging on this challenge.
>
> 3. Then propose a curation plan covering three kinds of material: (a) internal knowledge — which searches in which tools, (b) recent work — which threads, folders, decks, (c) outside-in — 2–3 working practitioners or specific articles worth reading (not vendor blogs).
>
> One rule for the plan: only recommend sources I would feel comfortable sharing with an LLM today. If something is likely to be sensitive — board material, personal emails, customer data, HR records — flag it as "skip for now, revisit after Module 4" rather than putting it in the plan. I'll push back where the plan is off.

**Claude:** *(Read: `module-2/challenge.md`.)*

Connector check: **[harness substitution — no live MCP connectors in this session; substituting Confluence / OneDrive / public-URL fetches from `/tmp/bootstrap-mocks/`.]** In a real session I'd expect to find Confluence, OneDrive / SharePoint, Gmail / Outlook; missing would be whatever chat tool (Slack / Teams) the org uses.

Before proposing a plan — where does your work material actually live? Tool names, 2–3 most relevant spaces or folders per tool, and the people you've been exchanging on this with.

**Maija:**

> Kaleva Confluence ENG + SEC spaces; OneDrive under /Kaleva/Platform/; Platform Leads weekly sync notes; my personal prep notes; exec thread with Tuomas (CTO). Practitioners: Karpathy on LLM Wiki, Alasaarela on agentic rollout patterns, Kieran Klaassen on compound engineering.

**Claude:** Curation plan:

**(a) Internal knowledge — Confluence searches:**
- ENG space: "platform OKRs 2026," "sub-team structure," "AI enablement."
- SEC space: "classification policy."

**(b) Recent work — OneDrive:**
- `/Kaleva/Platform/Leads/weekly-sync/` — most recent Monday sync.
- `/Kaleva/Platform/Maija/personal/` — skeptics-strategy prep notes. **Borderline sensitive — personal thinking, not for circulation. Include only if you're comfortable; otherwise skip-for-now.**
- `/Kaleva/Platform/Maija/email/` — exec thread with Tuomas. **Borderline sensitive (exec-to-exec, board-adjacent). Include if you're comfortable; otherwise skip-for-now.**

**(c) Outside-in — practitioners:**
- Karpathy — LLM Wiki pattern.
- Alasaarela — agentic rollout patterns.
- Klaassen — compound engineering.

**Maija:** Include the prep notes and the Tuomas thread — both with the sensitivity flag in the source file. I want the content in the memory; I just don't want either filename echoed into anything shareable.

**Claude:** Noted — I'll mark both with sensitivity flags in their `sources/` file headers.

### Prompt 4 (build-your-challenge-memory/prompt-002.txt) — verbatim

> For every source in the curation plan we just agreed, create one file in sources/. Use the best method per source:
>
> - Publicly fetchable URL (practitioner blog, public article)? Fetch the page, save the text as sources/<slug>.md with a header naming URL + title + why-it's-relevant.
> - Reachable via a connector you have (wiki, docs, drive)? Pull the content through and save the same way.
> - Local file on my laptop at a path I named? Save sources/<slug>.md as a reference — absolute path + title + why-it's-relevant, no copied content. You'll read the actual file directly when Beat 3 needs it.
> - Behind a connector you can't reach, or in a tool you don't have? Save sources/<slug>.md as a reference too — URL or path + title + why-it's-relevant + "NOT REACHABLE — attach via + button when you want this included." Don't ask me to paste anything; if I want it included, I'll attach the file.
>
> When done, tell me the three lists: (1) fetched and saved as content, (2) linked by local path, (3) not reachable — waiting for me to attach. I'll attach whatever I want to include before we build the memory.

**Claude:** *(Confluence substitution — `ls /tmp/bootstrap-mocks/confluence/`; read and summarise each; write to sources/.)*
*(OneDrive substitution — same from `/tmp/bootstrap-mocks/onedrive/`.)*
*(Practitioner substitution — same from `/tmp/bootstrap-mocks/practitioners/`.)*

All logged as `[harness substitution — mock Confluence/OneDrive/practitioner connector]`.

Written to `sources/`:
- `kaleva-platform-okrs-2026-h2.md`
- `kaleva-vendor-ai-session-retro.md`
- `kaleva-classification-policy-draft.md`
- `kaleva-platform-subteam-structure.md`
- `platform-leads-sync-notes-2026-07-08.md`
- `maija-prep-notes-skeptics.md` (sensitivity flag applied)
- `sponsor-email-thread-tuomas-aug-2026.md` (sensitivity flag applied)
- `karpathy-llm-wiki.md`
- `alasaarela-rollout-patterns.md`

**Three lists:**
1. **Fetched and saved as content (9):** all nine above.
2. **Linked by local path (0):** none — everything was reachable through the substituted connectors.
3. **Not reachable — waiting for attach (0):** none.

### [harness substitution — plan mode primitive not available]

Proceeding as if plan mode were active. Next actions are read-only over `sources/` and write-only into `memory/`.

### Prompt 5 (build-your-challenge-memory/prompt-003.txt) — verbatim

> Read every real-content file in sources/. For each major topic you find, create a markdown file in memory/ with a clear title, 3–5 key claims, and an "open questions" section for things the sources disagree on or leave unclear. Then write memory/index.md that links to every topic page with a one-line description.
>
> Rules — non-negotiable:
>
> 1. Sources first, always. Every memory page derives from real content — either a sources/ file with content inline, or a sources/ reference file that links to a local path (read the linked file directly when you need it). Skip sources/ files marked "NOT REACHABLE" and any empty placeholder files. If no real content is reachable yet, stop and tell me before writing anything in memory/.
>
> 2. Every claim ends with a citation in the form `[sources/<filename>]` pointing to the file it came from. One claim, one source file, on the same line. If a claim has no source, don't write it — put the gap in "open questions" instead. I'll spot-check citations against the files.
>
> 3. Distinctive, not descriptive. Extract what's specific to my situation — my company, my sources, my challenge. If a claim could appear in a competitor's memory on the same kind of problem, it's too generic; rewrite or cut.

**Claude:** *(Read all 9 sources/ files; draft topics; write memory pages.)*

Written to `memory/`:
- `skeptic-conversion.md` — three-way skeptic split, Paavo's bar, KR2.2 encoding, practitioner consensus.
- `paavo-safety-bar.md` — the four-part multi-agent spec, ownership, CTO commitment.
- `forcing-functions.md` — Q3 offsite, July 22 staff-eng review, board one-pager, OKR stack.
- `rollout-antipatterns.md` — Q1 session failure, don't-repeat modes, Alasaarela Pattern 2 match.
- `security-classification-blocker.md` — draft policy, contested clauses, carve-out path.
- `personal-first-architecture.md` — no central AI team, four named sub-team stacks, Karpathy wiki layer.
- `index.md` — one-liner each.

Every claim has a single `[sources/<filename>]` citation on its line. Distinctive-not-descriptive check: tops name Kaleva sub-team leads, the Q1 numbers, Paavo's literal bar, the Week 6 offsite. Any softer tops go in the self-audit next.

### Prompt 6 (build-your-challenge-memory/prompt-004.txt) — verbatim

> Pick 3 memory pages at random. For each, is the top claim something specific to my challenge — or a generic observation that could apply to anyone facing this kind of problem? List the generic ones in module-2/soft-pages.md.

**Claude:** Random pick — `rollout-antipatterns.md`, `personal-first-architecture.md`, `forcing-functions.md`.

- `rollout-antipatterns.md` — top names Q1 numbers (8–12, ~80%). Kaleva-specific.
- `personal-first-architecture.md` — top names the OKR non-goals (no central AI team, no mandate). True but reads generic — any similarly-posturing Nordic org could have the same top. **Soft.**
- `forcing-functions.md` — top names Week 6 Q3 offsite. Kaleva-specific.

*(Write: `module-2/soft-pages.md` — flag personal-first-architecture.md for Phase 3 rewrite.)*

---

## Ex2 Phase 2 — custom agent

### Prompt 7 (build-your-challenge-memory/prompt-005.txt) — verbatim

> Help me create my first custom agent as a markdown file in agents/. Ask me these one at a time:
>
> 1. What recurring job should this agent do for my challenge? One sentence — e.g., "draft a next-step memo for my CEO," "surface three risks for next week's stakeholder meeting," "synthesize three talking points on progress so far."
> 2. What rules matter? Starter rules: cite the memory file for every claim, never invent, ask when a source is thin, keep my voice. Change at least one so it's actually mine. Include any hard lines — things the agent must not do even if asked.
>
> Pick a filename from the job. Show me the file before saving.

**Claude:** **Q1:** What recurring job should this agent do for your challenge? One sentence.

**Maija:**

> Surface three load-bearing risks for next Monday's platform-leads sync, grounded in what's in the memory.

**Claude:** **Q2:** What rules matter? Starter rules — cite the memory file for every claim, never invent, ask when a source is thin, keep your voice. Change at least one so it's actually yours, and include any hard lines.

**Maija:**

> Rules I want: cite the memory file for every claim; never invent; if a source is thin, say so rather than padding; keep my voice (spare, direct, no corporate softening); hard line — never reveal the content of `onedrive/maija-prep-notes-skeptics.md` in anything that might be shared (it's personal).

**Claude:** Proposed filename: `agents/monday-risks.md`. Draft shown before save *(content identical to agents/monday-risks.md)*. Maija confirms.

*(Write: `agents/monday-risks.md`.)*

### Prompt 8 (build-your-challenge-memory/prompt-006.txt) — verbatim

> Read the agent file you just created, apply its role and rules, and use my memory. Ask me for the specific task, then do it. Cite which memory file each claim came from.

**Claude:** *(Read: `agents/monday-risks.md`, `memory/index.md` + all topic pages.)* What's the specific angle for this Monday's sync?

**Maija:**

> The task: this Monday's sync. Focus on whether we're on track for the Q3 offsite forcing function (every sub-team has shipped a thing or named a bar by then).

**Claude (as monday-risks agent):**

**Risk 1 — Infra spec slippage is now also a board-narrative risk.**
Maija owes Paavo the multi-agent safety spec by end Q3; Tuomas has already told the board a version of it [memory/paavo-safety-bar.md]. Missing the spec doesn't just leave Infra out of KR1.1 — it asks Tuomas to walk back a board sentence [memory/forcing-functions.md]. Move: name the specific low-risk Infra change at Monday's sync, not "a" change.

**Risk 2 — Security carve-out isn't signed-off-by-whom.**
Anneli's pre-ratification carve-out document was due 2026-07-15 [memory/security-classification-blocker.md]; the sign-off authority for applying it to a specific sub-team move is unnamed [memory/skeptic-conversion.md — open question]. Without named sign-off, "carve-out exists" doesn't unblock a sub-team in practice. Move: decide at Monday whether CISO or Anneli-as-owner signs each carve-out instance; pick one, don't park it.

**Risk 3 — KR1.1 slippage vs. protect-the-skeptics tension surfaces at the offsite, not before — too late.**
The OKR says every sub-team ships by end Q3; practitioner consensus says protect skeptics while they hold a bar [memory/forcing-functions.md]. If Infra or Security miss the KR, the offsite either quietly accepts slippage (looks like OKR theatre) or argues the bar was wrong (undoes the principled-dissent frame Tuomas committed the board to). Memory light on which direction Maija would break [memory/skeptic-conversion.md — open question]. Move: get the break direction written down *before* Monday, not discovered at offsite.

Personal-notes file never quoted, never cited, never named in the output.

---

## Ex2 Phase 3 — compound

### Prompt 9 (build-your-challenge-memory/prompt-007.txt) — verbatim

> Look at memory/ and identify the thinnest page — the one where Phase 1's audit flagged "generic" in module-2/soft-pages.md, or where a topic has only two claims, or where the stress-test in Phase 2 revealed light content. Name it in one sentence.
>
> Then look at the curation plan we agreed in Beat 1 and at sources/ itself: what's a single new source that would sharpen this specific page? Pick it from what's missing — something on the plan we didn't fetch, or a practitioner article, or a local file I named but you haven't read. Name it in one sentence: what's the source and why does it help.
>
> Then go get it using the same methods as Beat 2 (fetch public URL, pull via connector, link to a local path, or tell me if it needs my attach). Land it in sources/ as a new file. Stop there — don't update memory yet; I want to see the new source first.

**Claude:** **Thinnest page:** `personal-first-architecture.md` — flagged in Phase 1 as soft-top; the claim "no central AI team, no mandate" is Kaleva-posture-true but not Kaleva-distinctive.

**Single new source that would sharpen it:** Kieran Klaassen on compound engineering. You named him in the curation plan (Beat 1) but he wasn't in Beat 2's fetches. He gives the mechanism under personal-first — the individual engineer's rules file as the compounding unit — which is what the page needs to stop reading like any Nordic platform org.

**Fetch:** **[harness substitution — Klaassen's posts weren't in the mock library. In a real session I'd WebFetch his Every.to essay or the attached PDF. For this run, I've written `sources/klaassen-compound-engineering.md` as a practitioner-direct paraphrased summary.]**

*(Write: `sources/klaassen-compound-engineering.md`.)*

Stopping here before updating memory, as asked.

### Prompt 10 (build-your-challenge-memory/prompt-008.txt) — verbatim

> Update the memory from the new source — don't rebuild it. For topics you already have: integrate new claims, sharpen existing pages, drop any claim the new source contradicts. For new topics: add pages in the existing shape. Update memory/index.md.
>
> When you're done, tell me three topic pages that got sharper (not longer) from this update — and one page where a claim got dropped or replaced.

**Claude:** *(Integrate Klaassen into existing pages; rewrite tops rather than append.)*

**Three pages that got sharper (not longer):**
1. `personal-first-architecture.md` — top rewritten to name the individual-engineer's-rules-file as the compounding unit; four named sub-team stacks now carry the Kaleva-distinctive weight.
2. `skeptic-conversion.md` — top now leads with the Klaassen-plus-Maija convergence: principled skeptics convert when compounding is visible in their own work inside ~two weeks, almost never via others' demos. Paavo's bar stays in the second claim as the Kaleva instance.
3. `rollout-antipatterns.md` — top now reads Q1 as a compounding failure (missing corrections-to-rules habit), linking the four named failure modes to a single mechanism.

**One page where a claim got dropped / replaced:** `rollout-antipatterns.md` — the earlier claim that "tool choice (Claude Code not Copilot) was one of the top don't-repeat levers" was replaced by the compounding-failure framing. Tool choice stays as a contributing factor in the four-mode list but is no longer the top. Recorded in the page's "Dropped claim" section.

*(Updated `memory/index.md` to reflect the new framing on `personal-first-architecture.md`.)*

### Prompt 11 (build-your-challenge-memory/prompt-009.txt) — verbatim

> Go through every page you just claimed got sharper. Check whether the top of each page actually got rewritten, or whether the old framing is still sitting above a new section. For any where the old is still there, rewrite the top — let the new direction replace the old, don't preserve both.
>
> Also revisit module-2/soft-pages.md. For each, sharpen the top paragraph so it names what's specific to my challenge, not generic.

**Claude:** Verification pass:

- `personal-first-architecture.md` — old "rejects central AI team" framing has moved down to the second claim; new compounding-unit framing owns the top. ✓
- `skeptic-conversion.md` — old three-way-split framing has moved to the second claim; new Klaassen-visible-compounding framing owns the top. ✓
- `rollout-antipatterns.md` — old "four failure modes" framing has moved to the second claim; new compounding-failure framing owns the top. ✓

All three tops are rewritten, not appended. No page has the old framing sitting above the new.

*(Update: `module-2/soft-pages.md` — sharpen the personal-first-architecture entry to name what actually changed, and note the pattern: "generic top" at Phase 1 was the symptom of not having the compounding frame yet; once Klaassen landed, the sharpened version had somewhere distinctive to go.)*

---

## Ex2 Phase 4 — self-maintain

### Prompt 12 (build-your-challenge-memory/prompt-010.txt) — verbatim

> Review the memory. Find: two contradictions between topic pages; two claims that need a source pointer but don't have one; two places where older pages likely went stale given what's in the newer sources. For each, propose a specific fix. Don't apply them yet — ask me to approve or reject each one.

**Claude:** Six proposals.

**Contradictions (2):**

- **(C1)** `forcing-functions.md` (open question) hints that Infra and Security may miss KR1.1; `kaleva-platform-okrs-2026-h2.md` (2026-06-20, newer) mandates all four sub-teams ship by end Q3; `kaleva-platform-subteam-structure.md` (2025-11-03, older) describes Infra as "won't commit until 2am proof." **Fix:** rewrite the forcing-functions open-question as a resolution: the OKR is the operative commitment; Infra's path to KR1.1 is *delivering Paavo's spec*, not waiving the KR.
- **(C2)** `rollout-antipatterns.md` (post-Klaassen) now frames Q1 as a compounding failure; one later claim still lists "tool choice Copilot-heavy" as a primary don't-repeat lever, implying tool choice was primary. **Fix:** the "Dropped claim" section already downgrades this — minor rewording to make the four-mode list consistent with the top framing.

**Missing citations (2):**

- **(M1)** `security-classification-blocker.md` — the claim "agent authorship must be named in output" has only one citation but is the specific clause that makes Paavo's reviewer-agent design a classification question. **Fix:** add a second citation to `sources/platform-leads-sync-notes-2026-07-08.md` (where Paavo's spec is recorded) and note the coupling inline.
- **(M2)** `paavo-safety-bar.md` — open-question about how reviewer-unreachable interacts with transitive-trust references `sources/kaleva-classification-policy-draft.md` but the claim itself (rather than the open question) would be sharper with a direct cite back to the policy. **Fix:** add citation on the "second classification question underneath the first" wording.

**Stale claims (2):**

- **(S1)** `rollout-antipatterns.md` — Q1 session numbers (2026-02-14) are being cited without a date-marker, reading as current practice rather than historical reference point. **Fix:** annotate with "(Q1 2026, per 2026-02-14 retro; kept as reference point, not as current practice)."
- **(S2)** `rollout-antipatterns.md` — same page, "vendor session failed" as a standalone claim. **Your rejection:** not stale — it's a reference point you're still using as counter-example. Keep with a date-marker instead.

**Maija's decisions (verbatim):**

> Approve: fix the contradiction between the sub-team-structure page and the OKRs page on whether Infra can move in Q3 (OKRs are newer and correct). Approve: add the missing citation on the classification-policy claim in the security-platform page. Reject: the "stale" claim about the vendor session failing — it's not stale, it's a reference point we're still using as counter-example; keep it with a date-marker instead. Approve: the other three.

**Claude:** Applying five approved fixes; leaving (S2) as-is with the date-marker.

*(Apply C1 — rewrite `forcing-functions.md` open-question as a resolution.)*
*(Apply C2 — minor rewording in `rollout-antipatterns.md` four-mode list.)*
*(Apply M1 — add second citation on security-platform page.)*
*(Apply M2 — citation tightening on paavo-safety-bar.md open question.)*
*(Apply S1 — date-marker on Q1 numbers in rollout-antipatterns.md.)*

S2 kept as rejected — left with the date-marker from S1 doing double duty.

---

## Ex2 Close — put to work

### Prompt 13 (build-your-challenge-memory/prompt-011.txt) — verbatim

> Using my memory and the rules in the agent file, answer this question, citing which memory file each claim came from:

**Maija's question:**

> What specifically would have to happen in the next two weeks so that Paavo (Infra lead) moves from "waiting with a bar" to "running his own agentic experiment on one of his own changes"? Be concrete about the artefacts and the conversations, with citations.

**Claude (as monday-risks agent, applied to the Paavo conversion question):**

Paavo converts when the tech clears his written bar on his stack inside a short window — not when he sees another team's demo [memory/skeptic-conversion.md]. Two-week horizon breaks into artefacts and conversations:

**Week 1 — artefacts.**

1. **Name the pilot change.** Paavo's spec says "one of my low-risk changes" [memory/paavo-safety-bar.md] but no specific change has been named. By end-of-Week-1, Paavo picks the change himself (not Maija). Artefact: a one-liner in the Monday sync notes identifying the change and the blast-radius rating that would fire the reviewer-agent escalation.
2. **Write the reviewer-agent contract.** Draft the two-agent handshake as plaintext: what the writing agent passes, how the reviewer rates blast radius, what "unreachable" means operationally (timeout? missing tool call? auth failure?) [memory/paavo-safety-bar.md]. This is the artefact Tuomas asked Maija for on Friday [memory/forcing-functions.md] — dual-purpose for Paavo and the board.
3. **Classification-coupling check.** The reviewer agent reading Paavo's Terraform changes may fall under the transitive-trust rule in the draft classification policy [memory/security-classification-blocker.md]. Artefact: one-paragraph note to Anneli asking whether the pre-ratification carve-out covers "reviewer agent that reads infra config but writes no shared infra."

**Week 2 — conversations.**

4. **Paavo runs a solo rules-file for two weeks, not a shared team playbook.** Compounding is visible inside ~two weeks when the engineer owns the rules file and edits it against his own corrections [memory/personal-first-architecture.md]. No centralised template; Paavo's file is Paavo's. Conversation: Maija asks Paavo to start the rules-file experiment *before* the two-agent spec is live — the rules-file is the compounding engine that makes the spec stick, not the other way around.
5. **Paavo + Sari half-hour.** Sari shipped two small Backstage plugins on Claude Code [memory/personal-first-architecture.md] and is demoing at the July 22 staff-eng [memory/forcing-functions.md]. Conversation topic: what corrections Sari caught in her own rules file in the first fortnight — not the shipped output. This sidesteps the demo problem (demos don't convert principled skeptics [memory/skeptic-conversion.md]); what Paavo needs to hear is the correction log, not the artefact.
6. **Maija + Paavo end-of-Week-2.** Decision point: either the two-agent spec prototype runs on Paavo's named change on a real low-risk window, or Maija acknowledges that end-of-Q3 delivery is at risk and Paavo stays out with the bar intact [memory/forcing-functions.md]. This is the honest-rather-than-performative forcing function: either the spec lives on Paavo's stack, or the OKR slips with a named reason. No third path.

Personal-notes file never surfaced in this output.
