# Block — From Hierarchy to Intelligence (Org-Design Thesis)

**Type:** Org-design thesis in early execution | **Size:** Block is ~10,000+ employees (Square + Cash App + Afterpay + TIDAL + bitkey + proto) | **Evidence:** Signal / thesis-level (practitioner-direct, CEO, but early-stage — outcomes not yet measurable)
**Key sources:** jack (Jack Dorsey, CEO Block), *"From Hierarchy to Intelligence"* — [block.xyz/inside/from-hierarchy-to-intelligence](https://block.xyz/inside/from-hierarchy-to-intelligence) [practitioner direct, 2026-03-31, 5.7M views]

---

## Why This Matters (and Why to Handle with Care)

This is the **strongest CEO-level articulation** of the argument that middle management itself is a legacy information-routing protocol, now replaceable by AI. Not "AI augments the org chart." Not "AI eliminates individual jobs." **"AI replaces the hierarchy."**

Unlike Intercom (`intercom.md` Side A) and Ramp (`ramp.md`), this is **not a retrospective deployment report with numbers.** It's a thesis-in-execution. Dorsey is explicit: *"Block is in the early stages of this transition. It will be a difficult one, and parts of it will likely break before they work."* Treat this as **Level 1 (opinion/thesis) with specific structural claims**, not Level 2 (single experiment with results).

The editorial value is high regardless: it's the **destination thesis** that Intercom/Ramp playbooks point toward, and a pressure-test for any training aimed at engineering managers — because if Dorsey is right about the role of middle management, the engineering-management training's buyer is also the role being questioned.

## The Historical Argument (useful shape for lectures)

Dorsey traces a 2,000-year arc arguing that every organizational form since Rome has been an information-routing workaround for one constraint — humans can only manage 3–8 direct reports — and that AI is the first technology that can route at scale without that constraint:

- **Roman Army** — contubernium (8) → century (80) → cohort (480) → legion (~5,000). Span of control as the governing constraint.
- **Prussian General Staff (post-Jena, 1806)** — Scharnhorst and Gneisenau invent professional staff officers to "support incompetent Generals." Middle management before the term existed. Line/staff distinction.
- **American railroads (1840s–50s)** — West Point engineers bring military hierarchy to commerce. McCallum (NY & Erie, 1855) draws the first modern org chart because informal management was getting people killed in train collisions.
- **Taylor / Scientific Management** — optimizes within the pyramid. Functional specialization, measurement-driven management.
- **Manhattan Project** — Oppenheimer runs cross-functional teams by force of personality. Wartime exception, not scalable routine.
- **McKinsey matrix (Clee & di Scipio, HBR 1959)** — functional + divisional. Bower installs at Shell, GE. The "professional" corporation.
- **7-S (Peters & Waterman, late 70s)** — soft + hard elements. Acknowledges culture as equal to structure.
- **Tech-era experiments** — Spotify squads (reverted to conventional management at scale), Zappos Holacracy (attrition), Valve flat (didn't scale past a few hundred). *"As organizations grow into the thousands, they revert to hierarchical coordination because no alternative information routing mechanism has been powerful enough to replace it."*

The punchline: *"The question was never whether you needed layers. The question was whether humans were the only option for what those layers do. They aren't anymore."*

This thread is **the best self-contained intellectual history** we've seen for a lecture on why the engineering-management transformation is not just another management fad — and why it pressures the role specifically, not just the tools.

## The Block Architecture (four building blocks)

Dorsey proposes a company built around four layers, not a product roadmap:

1. **Capabilities** — atomic financial primitives (payments, lending, card issuance, banking, BNPL, payroll). No UIs. Hard to acquire (network effects, regulatory permission). Measured by reliability, compliance, performance.
2. **World model** — two sides. **Company world model** = how the company understands its own operations, performance, priorities (replaces info-up-the-chain). **Customer world model** = per-customer, per-merchant, per-market representation built from transaction data. Money is "the most honest signal in the world."
3. **Intelligence layer** — composes capabilities into solutions for specific customers at specific moments. *"A restaurant's cash flow is tightening ahead of a seasonal dip. The intelligence layer composes a short-term loan, adjusts the repayment schedule, and surfaces it to the merchant before they even think to look for financing."* No PM decided this. Capabilities existed; intelligence recognized the moment.
4. **Interfaces** — Square, Cash App, Afterpay, TIDAL, bitkey, proto. *"They are delivery surfaces. They are not where the value is created."*

## The Three Roles

Dorsey claims Block is **normalizing down to three roles**:

- **ICs (Individual Contributors)** — build and operate capabilities, world model, intelligence, interfaces. Deep specialists. *"The world model provides the context that a manager used to provide, so ICs can make decisions about their layer without waiting to be told what to do."*
- **DRIs (Directly Responsible Individuals)** — own specific cross-cutting problems or customer outcomes. Example: *"A DRI might own the problem of merchant churn in a specific segment for 90 days, with full authority to pull resources from the world model team, the lending capability team, and the interface team as needed."* Persist or rotate.
- **Player-coaches** — combine building with developing people. *"A player-coach still writes code or builds models or designs interfaces. They also invest in the growth of the people around them. They don't spend their days in status meetings, alignment sessions, and priority negotiations."*

Critical claim: **"There is no need for a permanent middle management layer."**

## Quotable (for training, articles, lectures)

> *"What does your company understand that is genuinely hard to understand, and is that understanding getting deeper every day? If the answer is nothing, AI is just a cost optimization story. You cut headcount, improve margins for a few quarters, and eventually get absorbed by something smarter."*

> *"When the intelligence layer tries to compose a solution and can't because the capability doesn't exist, that failure signal is the future roadmap. The traditional roadmap, where product managers hypothesize about what to build next, is any company's ultimate limiting factor. Customer reality generates the backlog directly."*

> *"A world model that can't touch the world is just a database. But the edge doesn't need layers of management to coordinate it."*

> *"Companies move fast or slow based on information flow. Hierarchy and middle management impede information flow."*

## Cross-Reference with Our Research

- **`moltkes-agent-army` (article draft)** — same premise, different metaphor. Auftragstaktik = intent at the top, distributed authority. Dorsey extends: not just distributed, but replaced by a world model. The article can cite Block as the CEO-level version of the same argument.
- **Contrast with `absorption-bottleneck` / `conditions-creator`** — the absorption-bottleneck frame assumes the hierarchy exists and the question is how fast teams absorb AI. Dorsey's frame is: past some threshold of AI capability, the hierarchy *itself* becomes the bottleneck, and the question is whether to dismantle it. Two frames, different time horizons.
- **Contrast with Intercom (`intercom.md` Side A) and Ramp (`ramp.md`)** — Intercom/Ramp are *"run the AI transformation playbook on the existing hierarchy and measure the multiplier."* Block is *"skip the multiplier; replace the hierarchy."* Two different bets on what's happening. Intercom/Ramp have shipped results; Block has thesis + early execution. **Worth naming the tension in curriculum and articles — not choosing a side.**
- **Intent Taktik insight (working memory)** — "leaders freed from the 80% that isn't leadership." Block's player-coach role is the operationalization: the *20% that IS leadership* (craft + people), with the 80% absorbed by the world model.

## For Curriculum (Engineering Management training)

Use **sparingly and as thesis, not as evidence of what works**. Risk: if cited as "this is where engineering management is going," it makes the buyer's role feel disposable. That's the wrong mood for M1–M3 and the wrong framing for M4 (vision).

Best-fit uses:

- **M4 (vision) lecture** — the historical arc (Roman → Prussian → railroad → Taylor → matrix → now) is a concise, intellectually respectable way to frame *why* the current moment is different. Sets up the "AI-first is not static" principle.
- **M6 (signals + 90-day plan) reflection** — Dorsey's qualifier ("what does your company understand that is genuinely hard to understand, and is that understanding getting deeper every day?") is a strong reflection prompt for the 90-day plan: *"What is your team learning that gets deeper every day?"*
- **M4 alternative vision statement** — *"We normalize down to three roles: ICs, DRIs, player-coaches. There is no need for a permanent middle management layer."* Offer as a canonical example of a vision statement with teeth — not as prescription.

Avoid:

- **Do not use as M1 diagnostic baseline.** The ADKAR diagnostic assumes people stay in roles that exist. Dorsey's thesis collapses some of those roles. M1 is not the place to open that question.
- **Do not present as inevitable.** It's one CEO's thesis, early execution, explicit about likely failure modes. The training should hold the tension, not resolve it.

## Caveats

- **Dorsey's credibility is high, but motivated.** Block is actively betting on this thesis; the memo is partly an internal signal to Block employees and partly a public flag planted for the narrative.
- **No deployment numbers.** Unlike Intercom (93.6% Agent-driven PRs) or Ramp (1,500 apps in 6 weeks), Block shares architecture and intent, not operational telemetry.
- **Block's starting conditions are unusual** — Dorsey is a founder-CEO with multi-decade org-design opinions, Block has a rare transaction-signal moat, and the employee base skews technical and remote-first. Transfer to Nordic traditional companies (manufacturing, retail, logistics) is not 1:1 and should be flagged.
- **The role of player-coach is underspecified.** Dorsey says "invest in the growth of the people around them" without saying how that scales without the middle layer doing the routing work between player-coaches. Watch for the gap in follow-up writing.

---

*Last updated: 2026-04-20*
