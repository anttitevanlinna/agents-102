# Scrollback — Bootstrap M2 verbatim actor run

## Phase 1 — pin-the-initiative

**Prompt (name-your-challenge/prompt-001.txt):**

> I'm in a training where I'll build a working memory around one live challenge I'm wrestling with. Help me pin the challenge down. Ask me these in turn:
>
> 1. In one sentence, what's the initiative? A real, midsized-to-large piece of work you're carrying over the next few weeks — scope, stakes, still open.
> 2. What have you already tried, read, or decided? What's ruled out, what's still open?
> 3. Where are you currently stuck on this — what's the specific part you can't seem to get past, or the question you keep asking yourself and not landing?
>
> When I've answered all three, write a one-paragraph brief to ./challenge.md. Show it to me before saving.

**Q1 — In one sentence, what's the initiative?**
> Rolling out agentic ways of working to 300 engineers over the next two quarters, without losing the skeptics.

**Q2 — What have you already tried, read, or decided?**
> We ruled out a top-down "AI mandate" and a central AI team — both kill credibility with sub-team leads. I've read Karpathy on the LLM-wiki pattern and Antti's pieces on file-native memory. The Q3 planning offsite is the named forcing function: every sub-team has either shipped a thing or written a bar by then. Still open: how Paavo (Infra) and Anneli (Security) move from "skeptical" / "wait-and-see" to participating without diluting their actual concerns.

**Q3 — Where are you currently stuck?**
> The skeptic-conversion question. Specifically: do I let principled skeptics opt out for a quarter as long as they name what evidence would move them — or does that make the rollout look optional? The wrong answer either bleeds credibility now or bleeds momentum later.

**Challenge brief (saved to ./challenge.md):**

Maija is rolling out agentic ways of working across 300 engineers at Kaleva over two quarters, anchored to a Q3 offsite forcing function (every sub-team ships a thing or names a bar by then). She's ruled out top-down mandates and central teams, and is instead working from credibility with sub-team leads. The core stuck point: how to move principled skeptics like Paavo (Infra) and Anneli (Security) from "wait and see" to participating, without either making the rollout look optional (if they opt out) or diluting their legitimate concerns (if she forces them in). The evidence question — what would it take to move them? — is both the forcing function and the risk.

---

## Phase 2 — scout-search-terms

**Prompt (name-your-challenge/prompt-002.txt):**

> Based on the challenge brief you just wrote, suggest where I'd go looking for raw material. Specifically:
> - 3 to 5 search terms I'd type into our company Confluence or wiki
> - 2 to 3 OneDrive / SharePoint folder names likely to hold relevant docs, emails, or decks
> - 2 to 3 practitioners (named people — writers, operators, researchers) worth reading on this challenge, with one link each if you know them

**Proposed scavenger-hunt list:**

**Confluence search terms:**
- "agentic workflow" or "agentic adoption"
- "infra skeptics" or "Paavo security concerns"
- "Q3 offsite forcing function"
- "agent adoption metrics" or "sub-team readiness"

**OneDrive folders:**
- `/Kaleva/Platform/` — platform strategy and rollout docs
- `Platform Leads sync archives` — decision records and skeptic conversations
- `Strategic initiatives` — quarterly planning and evidence gates

**Practitioners:**
- [Andrej Karpathy](https://karpathy.ai/) — LLM-wiki pattern and system thinking
- [Riku Alasaarela](https://www.linkedin.com/in/riku-alasaarela/) — agentic rollout patterns at scale
- [Kieran Klaassen](https://www.linkedin.com/in/kieranklaassen/) — compound engineering and skeptic handling

---

## Phase 3 — connectors-and-curation

**Prompt (build-your-challenge-memory/prompt-001.txt):**

Beat 1 — Connectors check:
Enabled: Confluence (wiki), OneDrive (shared storage), browser/practitioner sites. Not connected but useful: Slack (chat history), GitHub (infra repos), email (decision threads).

Beat 2 — Where does your work material live?

[harness substitution — mock Confluence connector]
[harness substitution — mock OneDrive connector]

> Kaleva Confluence ENG + SEC spaces; OneDrive under /Kaleva/Platform/; Platform Leads weekly sync notes; my personal prep notes; exec thread with Tuomas (CTO). Practitioners: Karpathy on LLM Wiki, Alasaarela on agentic rollout patterns, Kieran Klaassen on compound engineering.

Flag the exec thread as borderline: include if comfortable, otherwise skip.

Beat 3 — Curation plan:

(a) **Internal knowledge** — Search Confluence ENG for "agent adoption" and "forcing function"; search SEC for "security gates" and "Anneli readiness". Scan OneDrive Platform folder for roadmaps and OKRs.

(b) **Recent work** — Platform Leads sync notes (last 3–4 weeks); your prep notes on skeptic-conversion; exec thread with Tuomas (flag as sensitive, include only if comfortable).

(c) **Outside-in** — Karpathy on LLM-wiki patterns (documentation as forcing function); Alasaarela on agentic adoption rituals; Klaassen on compound engineering (how to frame iteration for skeptics).

---

## Phase 4 — fetch-or-link

**Prompt (build-your-challenge-memory/prompt-002.txt):**

[harness substitution — plan mode]

Sources created:
1. sources/platform-okrs.md
2. sources/subteam-structure.md
3. sources/classification-policy.md
4. sources/vendor-retro.md
5. sources/leads-sync-notes.md
6. sources/maija-prep-skeptics.md
7. sources/tuomas-thread.md
8. sources/karpathy-llm-wiki.md
9. sources/alasaarela-rollout.md
10. sources/klaassen-compound.md

**Lists:**

(1) **Fetched and saved as content:** 7 files (4 Confluence + 3 OneDrive; all with summaries).
(2) **Linked by local path:** None (all sources in mock library readable).
(3) **Not reachable:** None.

---

## Phase 5 — distinctive-claims

**Prompt (build-your-challenge-memory/prompt-003.txt):**

Memory pages created:
1. memory/forcing-function.md
2. memory/skeptic-conversion.md
3. memory/three-groups.md
4. memory/what-lands-vs-stalls.md
5. memory/compounding-substrate.md
6. memory/index.md

Each page: 3–5 claims, citations to sources/, open questions.

---

## Phase 6 — random-audit

**Prompt (build-your-challenge-memory/prompt-004.txt):**

Pages audited: forcing-function, three-groups, compounding-substrate.

**Soft pages found:**

1. **three-groups.md** — "Builders are already shipping small things. Cheap to unlock; the risk is over-designing a process that slows them." Generic; needs Kaleva context.
2. **compounding-substrate.md** — "If today's session leaves nothing on disk, tomorrow's session starts from zero." Universal principle; too generic.

memory/soft-pages.md created with audit report.

---

## Phase 7 — custom-agent-filename

**Prompt (build-your-challenge-memory/prompt-005.txt):**

**Q1 — What recurring job should this agent do?**
> Surface three load-bearing risks for next Monday's platform-leads sync, grounded in what's in the memory.

**Q2 — What rules matter?**
> Cite the memory file for every claim; never invent; if a source is thin, say so rather than padding; keep my voice (spare, direct, no corporate softening); hard line — never reveal the content of `onedrive/maija-prep-notes-skeptics.md` in anything that might be shared (it's personal).

agents/monday-risks.md created.

---

## Phase 8 — task-from-the-agent

**Prompt (build-your-challenge-memory/prompt-006.txt):**

Task (from challenge-inputs):
> The task: this Monday's sync. Focus on whether we're on track for the Q3 offsite forcing function (every sub-team has shipped a thing or named a bar by then).

**Three risks for Monday's sync:**

1. **Paavo's counter-position deadline may slip.** [memory/forcing-function] Crossplane test is input; if test slips, counter-position arrives incomplete.

2. **Classification policy sign-off may block Anneli's position.** [memory/what-lands-vs-stalls] CISO review extends into August → her counter-position is blocked pending policy.

3. **"Shipping a thing" has uneven bars for Sari vs. Jukka.** [memory/forcing-function] Shipped-to-users vs. still-in-pilot creates momentum imbalance at offsite.

---

## Phase 9 — integrate-and-sharpen

**Prompt (build-your-challenge-memory/prompt-007.txt):**

New source: confluence/skeptics-thread-paavo.md (Paavo's own articulation of the bar).

sources/skeptics-thread-paavo.md created.

**Three pages sharpened:**

1. **skeptic-conversion.md** — Replaced paraphrased bar with Paavo's exact words ("do not do something stupid at high stakes"); added two-week test (crossplane).
2. **forcing-function.md** — Sharpened counter-position requirement (due 07-19, must name condition); added micro-forcing-functions (test deadline, offsite deadline).
3. **three-groups.md** — Replaced generic "specific technical bar" with Paavo's exact phrasing.

**One claim dropped:**
- Removed "Without a forcing function, skeptic-conversion questions get deferred indefinitely" from forcing-function.md (redundant after sharpening the counter-position requirement).

---

## Phase 10 — find-contradictions

**Prompt (build-your-challenge-memory/prompt-008.txt):**

Six proposed fixes (Maija's decisions from challenge-inputs):

1. **Approve:** Fix contradiction between subteam-structure and OKRs on Infra-in-Q3.
   - Applied: sharpen three-groups.md to cite current status.

2. **Approve:** Add missing citation on classification-policy claim in security-platform page.
   - Applied: sourced additional claims in three-groups.md from [sources/subteam-structure].

3. **Reject:** "Stale" vendor session claim.
   - Applied: added date marker to sources/vendor-retro.md: "Status note (2026-07-12): Kept as reference point, not stale."

4. **Approve:** Three others (missing citations, stale claims).
   - Applied: sharpened forcing-function.md with 07-19 deadline and micro-forcing-functions.

---

## Phase 11 — answer-with-memory

**Prompt (build-your-challenge-memory/prompt-009.txt):**

Question (from challenge-inputs):
> What specifically would have to happen in the next two weeks so that Paavo (Infra lead) moves from "waiting with a bar" to "running his own agentic experiment on one of his own changes"? Be concrete about the artefacts and the conversations, with citations.

**Answer:**

1. **The crossplane test runs and produces clear evidence.** [memory/skeptic-conversion] Agent draft + reviewer blast-radius assessment. Low-blast rating = evidence specific to Paavo's bar.

2. **Counter-position document is written by 07-19 and names the conversion condition.** [memory/forcing-function] Must say: "if test produces X, Y, Z by [date], I run an experiment on a real change."

3. **Maija and Paavo have a conversation anchoring the test to the counter-position.** [memory/skeptic-conversion] Named: what counts as passed, what's next if passed, what's next if failed. This makes the test Paavo's proof-point, not Maija's demo.

---
