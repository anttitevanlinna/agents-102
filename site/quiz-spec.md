# Self-Selection Quiz — "Are You a Builder Leader?"

A belief filter disguised as a quiz. Inspired by David J. Bland's validation experiments. The opinionated questions ARE the assumption tests. Those who pass are buyers. Those who don't self-select out. Every response is assumption validation data.

## The Game

- Share a link on LinkedIn / in DMs
- 8 binary questions, one at a time, full screen
- Two cards side by side — pick A or B. No middle ground. Force the choice.
- Results page with sharp, provocative personality typing
- Email capture for "builder leaders" — offer the proto-practice pack as reward
- Every answer maps to a specific assumption from `strategy/assumption-map.md`

## Design

- Matches the existing site: dark theme (#0a0a0a), Inter font, orange accent (#ff6b35)
- Lives at `site/quiz.html` — standalone, no backend needed
- One question per screen, progress bar at top
- Two choice cards side by side, hover glow, click to advance
- Smooth transitions between questions
- Mobile-friendly (cards stack vertically on small screens)

## The 8 Questions

Each question has an A answer (conventional/consultant worldview) and a B answer (builder leader worldview). B = 1 point. The A answers are NOT straw men — they're legitimate beliefs that many leaders hold. That's what makes the filter work.

### Q1: Where transformation starts (tests P5, P6)
- **A:** "AI transformation starts with a clear strategy from the top."
- **B:** "AI transformation starts when people build something real. The strategy follows."

### Q2: Own vs outsource (tests P3)
- **A:** "The best transformations are guided by expert partners who've done it before."
- **B:** "The best transformations are owned by the people inside — they build the capability, not rent it."

### Q3: Who do you trust (tests P1, P2)
- **A:** "I trust published frameworks and expert analysis."
- **B:** "I trust a company that already deployed agents and will tell me what actually happened."

### Q4: How you start (tests Bosser DNA / P6)
- **A:** "Before we act, we need a thorough assessment of the landscape."
- **B:** "Before we plan, we need our hands on the thing."

### Q5: Timing (tests P10)
- **A:** "We're watching the agent space carefully. We'll invest when the time is right."
- **B:** "If we're not building agent capability now, we're already behind."

### Q6: Framework preference (tests P12)
- **A:** "Give us a proven methodology — clear roles, defined stages, certification."
- **B:** "Give us a flexible framework we own and adapt to our reality."

### Q7: Platform vs principles (tests P11)
- **A:** "Train us deep on the platforms we already use."
- **B:** "Teach us the thinking. We'll apply it to any platform."

### Q8: Where insight comes from (tests P13)
- **A:** "We learn best from companies in our own industry."
- **B:** "The sharpest insights come from companies solving the same problem in a completely different context."

## Scoring & Results

### 7-8 B answers: "Builder Leader"
> **You're a builder leader.** You believe competence precedes vision. You'd rather own the transformation than outsource it. You trust peers over consultants. You want your hands on the thing before you plan. **You're exactly who we built this for.**
>
> CTA: "We're building a network of leaders like you. Leave your email — we'll send you the first practice pack."

### 5-6 B answers: "Almost Builder"
> **You're leaning builder — but you haven't fully let go of the playbook.** You sense that the old transformation model won't work for agents. You're right. The question is whether you'll act on it or wait for someone to hand you a strategy.
>
> CTA: "Curious? Leave your email. We'll send you something that might tip the balance."

### 3-4 B answers: "Consultant Mode"
> **You still believe in the playbook.** Strategy first, execution second, experts leading the way. It worked for digital. It worked for cloud. For agents — we think it won't. But we could be wrong. Keep watching.
>
> CTA: (no email capture — just a link back to the main site)

### 0-2 B answers: "Traditional Path"
> **You prefer the proven path.** Hire the experts. Follow the framework. Get the certification. There's nothing wrong with that — it's how most transformations are run. We just think this one is different.
>
> CTA: (no email capture — just a link back to the main site)

## What You Learn (the real experiment)

This quiz is not content marketing. It's a validation instrument. Every response teaches you something:

| Question | Assumption tested | What the data tells you |
|----------|------------------|------------------------|
| Q1 | P5 + P6 | Does "competence before strategy" resonate or feel backwards? |
| Q2 | P3 | Is the builder-leader psychographic real or aspirational? |
| Q3 | P1 + P2 | Do buyers value peer intelligence over expert analysis? |
| Q4 | Bosser DNA | Is "action before analysis" a buying criterion or a nice philosophy? |
| Q5 | P10 | Is urgency real or are people still in "watch and wait"? |
| Q6 | P12 | Do buyers want ownership or institutional cover? |
| Q7 | P11 | Is vendor-agnostic a feature or irrelevant? |
| Q8 | P13 | Will cross-industry network be valued? |

**Distribution of A vs B across ALL respondents = market signal.** If 80% pick B on Q1 but only 30% on Q6, you know the competence thesis lands but the anti-certification stance doesn't. That's actionable.

**Who scores 7-8 and leaves email = your first buyer list.** These people self-selected through a belief filter. They didn't respond to a pitch — they revealed their worldview matches yours.

**Who scores 0-4 = what the resistance looks like.** Their A answers tell you which conventional beliefs are hardest to dislodge.

## Email Capture & Data

For MVP: use a simple form service (Tally, Formspree, or Typeform embed) to capture:
- Email
- Company (optional)
- Role (optional)
- Score (hidden field, auto-populated)
- Individual answers (hidden fields — for assumption analysis)

The answers should be encoded in the form submission so you can analyze which questions split the audience.

## Distribution Strategy

1. Post on LinkedIn with a hook: "I made a 2-minute quiz that tells you whether you're ready for the agentic transformation — or still running the old playbook. Most leaders won't like their result."
2. DM it to specific people you want to validate with
3. Drop it in Nordic tech/leadership communities
4. The quiz itself is the content — it's provocative enough to share

## Implementation Notes

- Pure client-side HTML/JS/CSS — no backend needed for the quiz logic
- Form submission goes to external service (Tally/Formspree)
- Reuse CSS variables from existing `style.css` for visual consistency
- Animate transitions between questions (fade or slide)
- Progress bar at top shows 1/8, 2/8, etc.
- Mobile: choice cards stack vertically
- Share button on results page (pre-filled LinkedIn/Twitter text)
- URL hash encodes answers so results page is linkable/shareable
