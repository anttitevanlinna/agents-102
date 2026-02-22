# Copy Eval — Epistemic Overreach Audit

**Files evaluated:**
1. `site/articles/when-will-agentic-coding-spill-to-other-functions.html`
2. `content/article-01-spillover.md`
3. `content/drafts/spillover.md`

**Judge spec:** `evals/judges/copy-epistemic-judges.md`
**Date:** 2026-02-22

---

## site/articles/when-will-agentic-coding-spill-to-other-functions.html

### ERROR: Unfalsifiable Claim — line 56
**Text:** "Everything else called 'agents' in enterprise today — roughly 95% of it — is an LLM step inside a workflow tool"
**Why:** "roughly 95%" is an ungrounded statistic — no source is cited for this percentage. Reads as authoritative but cannot be verified.
**Fix:** Either cite the source for 95%, or reframe: "The vast majority of what's called 'agents' in enterprise today is an LLM step inside a workflow tool."

### WARNING: Stale Time Anchor — line 49
**Text:** "Feb 21, 2026"
**Why:** Specific date that anchors the article to a moment. However, this is article metadata (publication date), which is standard practice. Flagging for completeness but low priority.
**Fix:** Accept — publication dates are standard. No change needed.

### WARNING: Dismissive Framing — line 62
**Text:** "Strategy, procurement, product management? Still pre-chasm."
**Why:** "pre-chasm" used as a judgment about the reader's potential domain, telling them their function is behind.
**Fix:** Reframe structurally: "Strategy, procurement, product management — domains where verification infrastructure has not yet emerged."

### ERROR: Temporal Prediction — line 65
**Text:** "Coding (production), finance and legal (first real deployments with verification loops)."
**Why:** The "Now / 6-12 months / 12-24 months / Longer" timeline is a set of temporal predictions stated as fact. "Now" is borderline acceptable as observation, but the subsequent items are predictions.
**Fix:** See lines 66-68 below (the entire timeline block is one finding).

### ERROR: Temporal Prediction — line 66
**Text:** "6-12 months: Customer service moves from chatbot to agent where resolution is measurable."
**Why:** Temporal prediction stated as fact — asserts what will happen in a specific timeframe.
**Fix:** Reframe as structural observation: "Next likely: Customer service — where resolution is measurable — has the structural ingredients but not yet the practitioner convergence."

### ERROR: Temporal Prediction — line 67
**Text:** "12-24 months: Operations and HR, but only with hybrid human-in-the-loop verification."
**Why:** Temporal prediction stated as fact.
**Fix:** Reframe: "Further out: Operations and HR, where human-in-the-loop verification may serve as the test suite."

### WARNING: Stale Time Anchor — lines 65-68
**Text:** "Now: ... 6-12 months: ... 12-24 months: ... Longer: ..."
**Why:** Timeline anchored to the publication date. In 6 months these specific timeframes will be stale.
**Fix:** Use structural sequencing instead of calendar-relative timeframes: "First wave / Second wave / Third wave / Open question" — framed by what structural prerequisites are in place, not by when.

### ERROR: Temporal Prediction — line 68
**Text:** "These may never be fully agentic."
**Why:** "may never" is a temporal prediction about what will/won't happen in the future. The conditional "may" softens it but the claim is still about the future stated from a position of authority.
**Fix:** Reframe as structural observation: "These domains lack objective verification, which is the structural prerequisite." (The reader can draw the conclusion.)

### ERROR: Unfalsifiable Claim — line 56
**Text:** "roughly 95% of it"
**Why:** Duplicate of finding above — flagged once. See line 56 finding.
**Fix:** (See above.)

### WARNING: Dismissive Framing — line 62
**Text:** "HR? Zero autonomous agent deployments found across the Nordics or globally"
**Why:** Factual claim backed by source [7], but the rhetorical structure ("HR? Zero.") is dismissive toward HR professionals reading this. The tone implies HR is behind.
**Fix:** Reframe neutrally: "In HR, our research found no autonomous agent deployments — the verification infrastructure for people decisions has not been defined yet."

### ERROR: Temporal Prediction — line 88 (Commentary)
**Text:** "And the organizations that figure it out first will have agents where everyone else still has chatbots."
**Why:** "will have" is a temporal prediction stated as fact about future outcomes.
**Fix:** Reframe: "The organizations building their verification infrastructure are creating the conditions for agents. Without it, chatbots are the ceiling."

---

## content/article-01-spillover.md

### ERROR: Temporal Prediction — line 9
**Text:** "This is not gradual adoption. It is a phase shift."
**Why:** "It is a phase shift" stated as fact. Whether adoption constitutes a "phase shift" is an interpretation, not a verifiable observation. The sentence structure presents it as established truth.
**Fix:** Reframe with evidence: "The speed of practitioner adoption suggests a phase shift, not gradual progress." Or attribute it: "Multiple practitioners describe this as a phase shift."

### WARNING: Stale Time Anchor — line 7
**Text:** "Karpathy went from 80% manual coding in November to 80% agent coding in December"
**Why:** "November" and "December" without year anchors — will be ambiguous within months.
**Fix:** Add year: "November 2025 to December 2025" or reframe structurally: "Karpathy's inversion from 80% manual to 80% agent-generated happened in weeks, not months."

### WARNING: Stale Time Anchor — line 7
**Text:** "Spotify merges 650 agent-generated pull requests into production every month"
**Why:** "every month" anchored to present tense — will date as the number changes.
**Fix:** Add time anchor: "As of early 2026, Spotify merges 650..." or reframe: "Spotify reported 650 agent-generated PRs merged monthly."

### WARNING: Stale Time Anchor — line 7
**Text:** "their CEO told investors in February"
**Why:** "in February" without year.
**Fix:** "in February 2026" or restructure to avoid calendar dependency.

### WARNING: Stale Time Anchor — line 45
**Text:** "Through 2023 and 2024, individual developers tried early agents."
**Why:** Specific year references in claims.
**Fix:** Reframe structurally: "In the earliest phase, individual developers experimented with early agents."

### WARNING: Stale Time Anchor — line 47
**Text:** "In December 2025, multiple independent practitioners reported the same threshold"
**Why:** Specific date anchor.
**Fix:** This is historical narration (describing when something happened), so the date serves a purpose. Lower priority but still flagged.

### WARNING: Stale Time Anchor — line 49
**Text:** "In early 2026, Spotify published a three-part engineering blog series"
**Why:** Specific date anchor.
**Fix:** Same as above — historical narration. Lower priority.

### WARNING: Stale Time Anchor — line 47
**Text:** "Karpathy's 80/20 inversion happened in weeks."
**Why:** Already flagged above in the November/December reference.
**Fix:** (See above.)

### ERROR: Unfalsifiable Claim — line 26
**Text:** "Only 45% passed."
**Why:** This refers to their own internal methodology ("112 sources... 45% passed") which is grounded in the project's research. However, the reader cannot verify "112 sources" or "45% passed" without access to the underlying data. Borderline — the claim is specific and the methodology is described, but the data is not public.
**Fix:** Consider linking to the methodology or data: "Of 112 sources we evaluated (methodology linked below), 45% passed our three-gate test." If the underlying data is not public, acknowledge it: "In our research across 112 sources..."

### ERROR: Unfalsifiable Claim — line 35
**Text:** "that is 40% of everything called 'agentic' in enterprise that is not"
**Why:** "40% of everything called 'agentic' in enterprise" extrapolates from their sample (112 sources) to "everything" in enterprise. The sample may not represent the full universe.
**Fix:** Scope the claim: "In our sample, 40% of sources labeled 'agentic' were either vendor announcements without deployments or chatbots mislabeled as agents."

### ERROR: Temporal Prediction — line 39
**Text:** "the agents are not there yet"
**Why:** Borderline — could be read as present-tense observation. However, "not there yet" implies a temporal claim (they will be eventually, but not now). Flagging as borderline.
**Fix:** Reframe as structural: "the agents have no practitioner evidence."

### ERROR: Temporal Prediction — line 51
**Text:** "The thing that was once only for experts becomes accessible. The chasm is crossed."
**Why:** "The chasm is crossed" stated as definitive fact about coding agents. Whether the chasm is fully crossed is debatable — it's an interpretation using Moore's framework.
**Fix:** Reframe: "The pattern that Lovable represents — 8 million users, 100,000 new products daily — looks like the chasm crossing Moore described."

### ERROR: Temporal Prediction — line 53
**Text:** "When 10 to 20 of them say the same thing independently, that is your signal. When an enterprise team confirms what the solo builders have been saying for six months, the crossing is underway."
**Why:** "the crossing is underway" is a temporal prediction framed as a general rule. Also "for six months" is a stale time anchor.
**Fix:** Reframe: "When an enterprise team confirms what solo builders have been reporting, that convergence is the credibility signal."

### WARNING: Stale Time Anchor — line 53
**Text:** "for six months"
**Why:** Specific time duration that anchors to a particular moment.
**Fix:** "for months" or remove the time anchor.

### ERROR: Temporal Prediction — line 61
**Text:** "The domain that figures this out first gets agents. Everyone else gets chatbots."
**Why:** "gets agents" / "gets chatbots" are temporal predictions about future outcomes stated as certainty.
**Fix:** Reframe as structural: "Verification infrastructure is the prerequisite. Without it, the ceiling is chatbots."

### WARNING: Dismissive Framing — line 77 (Commentary placeholder)
**Text:** "Most companies I see are stuck at chatbots not because the AI isn't ready, but because they haven't done the domain work."
**Why:** "Most companies" is an unfalsifiable claim (Test 5), and "stuck at chatbots" / "haven't done the domain work" is dismissive framing (Test 4) — tells companies they are deficient.
**Fix:** Reframe: "Many organizations I work with are still at the chatbot stage. The gap is usually not the AI — it's that the domain verification hasn't been designed yet."

### ERROR: Unfalsifiable Claim — line 77 (Commentary placeholder)
**Text:** "Most companies I see are stuck at chatbots"
**Why:** "Most companies" is an unsourced quantifier. Even as personal observation ("I see"), "most" claims authority over a population.
**Fix:** "Many companies I work with" or "In my experience, the common pattern is..."

### ERROR: Temporal Prediction — line 79 (Commentary placeholder)
**Text:** "The organizations that build their test suite first will have agents. The rest will wait for vendors to do it for them."
**Why:** "will have agents" and "will wait" are temporal predictions stated as fact.
**Fix:** "The organizations building their test suite are creating the conditions for agents. Without that work, the default path is waiting for vendors — who don't understand your domain."

---

## content/drafts/spillover.md

Note: The article body (lines 18-47) is identical to the HTML file's article body. Findings are the same. Only unique or differing content is listed below to avoid duplication.

### ERROR: Unfalsifiable Claim — line 24
**Text:** "roughly 95% of it"
**Why:** Same as HTML file — ungrounded percentage. No source cited.
**Fix:** (See HTML file finding.)

### WARNING: Dismissive Framing — line 36
**Text:** "Strategy, procurement, product management? Still pre-chasm."
**Why:** Same as HTML file.
**Fix:** (See HTML file finding.)

### ERROR: Temporal Prediction — line 42
**Text:** "6-12 months: Customer service moves from chatbot to agent where resolution is measurable."
**Why:** Same as HTML file.
**Fix:** (See HTML file finding.)

### ERROR: Temporal Prediction — line 43
**Text:** "12-24 months: Operations and HR, but only with hybrid human-in-the-loop verification."
**Why:** Same as HTML file.
**Fix:** (See HTML file finding.)

### ERROR: Temporal Prediction — line 44
**Text:** "These may never be fully agentic."
**Why:** Same as HTML file.
**Fix:** (See HTML file finding.)

### WARNING: Stale Time Anchor — lines 41-44
**Text:** "Now: ... 6-12 months: ... 12-24 months: ... Longer: ..."
**Why:** Same as HTML file.
**Fix:** (See HTML file finding.)

### ERROR: Temporal Prediction — line 85 (Commentary)
**Text:** "And the organizations that figure it out first will have agents where everyone else still has chatbots."
**Why:** Same as HTML file.
**Fix:** (See HTML file finding.)

### WARNING: Dismissive Framing — line 36
**Text:** "HR? Zero autonomous agent deployments found across the Nordics or globally"
**Why:** Same as HTML file.
**Fix:** (See HTML file finding.)

---

## Summary

### Totals

| File | Errors | Warnings |
|------|--------|----------|
| `site/articles/...html` | 6 | 4 |
| `content/article-01-spillover.md` | 9 | 8 |
| `content/drafts/spillover.md` | 5 | 3 |
| **Total (deduplicated across HTML + drafts/spillover.md)** | **~14 unique** | **~10 unique** |

Note: The HTML file and `content/drafts/spillover.md` share the same article body text. Their findings overlap. `content/article-01-spillover.md` is a longer, different draft with additional content and additional findings.

- **14 unique errors, 10 unique warnings across 3 files**
- Files clean: none

### Error-Level Findings (all files, deduplicated)

1. **Unfalsifiable Claim:** "roughly 95% of it" — ungrounded percentage, no source (HTML line 56, drafts line 24)
2. **Temporal Prediction:** "6-12 months: Customer service moves from chatbot to agent" — timeline prediction as fact (HTML line 66, drafts line 42)
3. **Temporal Prediction:** "12-24 months: Operations and HR" — timeline prediction as fact (HTML line 67, drafts line 43)
4. **Temporal Prediction:** "These may never be fully agentic" — future-state prediction (HTML line 68, drafts line 44)
5. **Temporal Prediction:** "the organizations that figure it out first will have agents where everyone else still has chatbots" — prediction as fact (HTML Commentary, drafts Commentary)
6. **Temporal Prediction:** Commentary: "will have agents" / "will wait for vendors" (article-01 line 79)
7. **Temporal Prediction:** "This is not gradual adoption. It is a phase shift." — interpretation stated as fact (article-01 line 9)
8. **Temporal Prediction:** "The chasm is crossed." — debatable interpretation stated as definitive (article-01 line 51)
9. **Temporal Prediction:** "The domain that figures this out first gets agents. Everyone else gets chatbots." — prediction as certainty (article-01 line 61)
10. **Temporal Prediction:** "the crossing is underway" — prediction framed as general rule (article-01 line 53)
11. **Temporal Prediction:** "the agents are not there yet" — borderline temporal claim (article-01 line 39)
12. **Unfalsifiable Claim:** "40% of everything called 'agentic' in enterprise" — extrapolates from sample to population (article-01 line 35)
13. **Unfalsifiable Claim:** "Only 45% passed" — internal data not verifiable by reader (article-01 line 26, borderline)
14. **Unfalsifiable Claim:** "Most companies I see are stuck at chatbots" — unsourced "most" (article-01 Commentary line 77)

### Systemic Patterns

1. **Timeline predictions are the dominant issue.** The "Now / 6-12 months / 12-24 months / Longer" structure in both published versions is the single highest-concentration area of epistemic overreach. Consider replacing calendar-relative timeframes with structural sequencing (first wave / second wave / third wave) defined by prerequisite conditions, not months.

2. **The closing line pattern.** Both the article body and commentary sections end with "will have agents / will get chatbots" formulations. These are punchy but predictive. The structural version ("verification is the prerequisite; without it, the ceiling is chatbots") makes the same point without claiming to know the future.

3. **Ungrounded percentages.** "95% of it" and "40% of everything" are the kind of specific-sounding numbers that invite scrutiny. Either source them or use qualitative language ("the vast majority").
