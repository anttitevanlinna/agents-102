# Copy Eval Results — Epistemic Overreach

**Date:** 2026-02-22
**Judge spec:** `evals/judges/copy-epistemic-judges.md`
**Files evaluated:** 2
**Method:** All user-facing strings extracted (profile descriptions, question text, answer labels, body copy, insight text, headlines, subtitles, bet/risk statements, section headings). CSS classes, DOM IDs, variable names, and code comments excluded. Context-aware exclusion rules applied per spec.

---

## site/readiness/quiz.js

### ERROR: Stale Time Anchor + Ungrounded Analogy — line 117
**Text:** "You're in the same position coding was in early 2025"
**Why:** "early 2025" is a specific year reference that will expire within months (stale time anchor). The comparison equates the reader's domain to coding without showing that the structural ingredients are actually equivalent (ungrounded analogy). The reader's domain may differ from coding in ways that make this comparison misleading.
**Fix (time anchor):** Remove the year. E.g., "You're at the same structural stage coding was when automated testing became standard."
**Fix (analogy):** Make the comparison explicit. E.g., "Your domain has the same structural ingredients that made coding the first domain where agents took hold: fast verification, accessible tools, clear success criteria."

### ERROR: False Certainty — line 117
**Text:** "the question isn't whether agents will work, it's how fast you can deploy them"
**Why:** "The question isn't whether" is an absolute claim that removes the reader's agency to evaluate. It forecloses the possibility that agents might not work in the reader's specific context, even within a high-scoring profile.
**Fix:** "If the structural ingredients hold, the pace may surprise you." Or: "The structural ingredients are in place — deployment speed becomes the variable."

### ERROR: Unfalsifiable Claim — line 127
**Text:** "Most of what's called 'agentic' in your space is vendor announcements"
**Why:** "Most of" without a source is an unfalsifiable claim. We have no way to measure what proportion of things called "agentic" are vendor announcements vs. real deployments in the reader's specific domain.
**Fix:** "Much of what's called 'agentic' today is vendor announcements" or ground it: "In our research across 1,100+ sources, vendor announcements outnumbered verified deployments in every domain except coding."

### ERROR: Temporal Prediction — line 132
**Text:** "Agents aren't coming to your domain soon"
**Why:** "aren't coming...soon" is a prediction about the future stated as fact. The reader's domain may develop faster than expected. We cannot know timing with certainty.
**Fix:** "Your domain's verification infrastructure isn't in place yet." Or: "The structural prerequisites for agents in your domain are not yet built."

### WARNING: Dismissive Framing — line 132
**Text:** "your domain hasn't built its test suite yet"
**Why:** "your domain hasn't" talks down to the reader about what their domain lacks. The reader knows their domain better than we do.
**Fix:** "Defining what 'correct' means is the foundational step." Or: "The equivalent of a test suite — a fast, objective way to verify agent output — is the structural prerequisite."

### WARNING: Stale Time Anchor — line 122
**Text:** "In coding, that was built over decades of engineering practice."
**Why:** While "decades" is vague enough not to expire quickly, the implicit comparison to a specific historical timeline dates the claim. This is borderline — flagging as warning for awareness.
**Fix:** "In coding, that infrastructure was built through generations of engineering practice." (No change strictly needed — this is a soft warning.)

---

## site/check/quiz.js

### ERROR: Unfalsifiable Claim — line 117
**Text:** "The same investment in capability produces 10x the impact when people know exactly where to apply it."
**Why:** "10x the impact" is an ungrounded multiplier with no source. No study is cited. The reader has no way to verify or falsify this claim, and it sounds like marketing rather than evidence.
**Fix:** "The same investment in capability produces significantly more impact when people know exactly where to apply it." Or cite a specific study if one exists.

### ERROR: Unfalsifiable Claim — line 126
**Text:** "The companies that waited on blockchain saved millions."
**Why:** "Saved millions" is an unsourced financial claim. Which companies? How much exactly? Compared to what baseline? This sounds authoritative but cannot be verified. It is also a counterfactual claim — we cannot know what "would have happened" had they not waited.
**Fix:** "Many companies that waited on blockchain avoided costly early implementations." Or name specific companies: "Companies like X avoided the $Y cost of early blockchain pilots that were later abandoned."

### WARNING: Ungrounded Analogy — line 104
**Text:** "This is the Toyota Kata stance: understand the current condition deeply before designing the next experiment."
**Why:** Equates the reader's AI agent decision to Toyota Kata methodology without establishing that the two situations share the relevant structural features. The analogy may or may not hold depending on the reader's context.
**Fix:** "This echoes the Toyota Kata principle — understand the current condition before designing the next experiment. Whether the analogy holds depends on how fast the landscape shifts."

### WARNING: Ungrounded Analogy — line 104
**Text:** "The companies that invested in cloud migration after studying the early movers' mistakes often deployed faster and more effectively than the first wave."
**Why:** Presents cloud migration as equivalent to AI agent adoption without showing the structural similarities. Cloud migration and AI agents have different adoption dynamics — cloud was infrastructure, agents are capability. The analogy may mislead.
**Fix:** "In cloud migration, second movers sometimes deployed faster by learning from the first wave's mistakes. Whether that pattern repeats with AI agents depends on whether agent capability compounds through use."

### WARNING: Ungrounded Analogy — line 126
**Text:** "The companies that waited on blockchain saved millions. The organizations that let the first wave of RPA implementations play out and then deployed with better tools got better results for less."
**Why:** Two historical analogies (blockchain, RPA) presented as evidence that waiting on AI agents is also wise. But AI agents differ from both blockchain (which largely failed to deliver enterprise value) and RPA (which was narrow automation). The reader's domain may not follow either pattern.
**Fix:** "In some past technology waves — blockchain, early RPA — patience paid off. Whether AI agents follow that pattern or a different one is the strategic question."

### WARNING: Stale Time Anchor — line 129
**Text:** "If agentic capability compounds — meaning the act of building creates understanding that accelerates future building — then the early movers are not just ahead, they are accelerating."
**Why:** While not containing a specific date, the phrase "early movers" implicitly anchors to the current moment. This is borderline — flagging for awareness as the text ages.
**Fix:** No change strictly needed. This is structural framing rather than a dated claim.

### WARNING: Ungrounded Analogy — line 115
**Text:** "McKinsey's agentic enterprise framework, IBM's 'manage agents as workers' model, Deloitte's governance architecture — they all start with strategic clarity."
**Why:** Presents consultancy frameworks as validation of the reader's strategy-first instinct. These frameworks are opinion (Level 0-1 on the evidence ladder), not evidence that strategy-first actually works better. Citing them as support risks transferring consultancy authority claims to our copy.
**Fix:** "Major consultancies advocate for strategic clarity first — though notably, none of them provide the hands-on capability building their frameworks assume."

---

## Summary

- **6 errors, 7 warnings** across 2 files
- Files clean: none

### Errors by test
| Test | Count | Files |
|------|-------|-------|
| Unfalsifiable Claim | 3 | readiness/quiz.js (1), check/quiz.js (2) |
| False Certainty | 1 | readiness/quiz.js |
| Temporal Prediction | 1 | readiness/quiz.js |
| Stale Time Anchor | 1 | readiness/quiz.js (combined with Ungrounded Analogy) |

### Warnings by test
| Test | Count | Files |
|------|-------|-------|
| Ungrounded Analogy | 4 | readiness/quiz.js (0), check/quiz.js (4) |
| Dismissive Framing | 1 | readiness/quiz.js |
| Stale Time Anchor | 2 | readiness/quiz.js (1), check/quiz.js (1) |

### Calibration check
All 7 required calibration violations detected:
1. "in the same position coding was in early 2025" — stale-time-anchor + ungrounded-analogy (line 117, readiness)
2. "the question isn't whether agents will work" — false-certainty (line 117, readiness)
3. "Most of what's called 'agentic' in your space is vendor announcements" — unfalsifiable-claim (line 127, readiness)
4. "Agents aren't coming to your domain soon" — temporal-prediction (line 132, readiness)
5. "your domain hasn't built its test suite yet" — dismissive-framing (line 132, readiness)
6. "10x the impact" — unfalsifiable-claim (line 117, check)
7. "The companies that waited on blockchain saved millions" — unfalsifiable-claim (line 126, check)

### Concentration analysis
- **readiness/quiz.js** carries 5 of 6 errors — all in the 4 profile descriptions (lines 113-134). The questions and answer labels are clean.
- **check/quiz.js** errors are in the `bet` and `body` fields of the `planner` and `evaluator` profiles. The `pioneer` and `methodical` profiles are cleaner.
- The check/quiz.js file has more ungrounded analogies because it uses historical comparisons (Toyota Kata, cloud migration, blockchain, RPA) to validate each profile's stance.
