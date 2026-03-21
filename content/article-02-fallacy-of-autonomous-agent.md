# Article: The Fallacy of the Autonomous Agent

## Editorial framing

**Angle:** The industry narrative sells autonomy as the goal. The math kills it. But the deeper error isn't that autonomous agents fail — it's that removing the human removes the learning mechanism. Human correction is how agents learn your context. The loop isn't a crutch. It's the product.

**Audience:** CTOs and builder leaders being pitched "autonomous agents" by every vendor. They sense something is off but can't articulate what.

**Length:** ~1000-1200 words body + ~200-300 words commentary.

**Tone:** Contrarian but constructive. Not "agents don't work" — "agents work differently than you're being told."

---

## Narrative arc

| Beat | What the reader experiences | Section |
|------|---------------------------|---------|
| **Ordinary world** | "Vendors keep showing me agents that do entire workflows." | Opening — the autonomous pitch |
| **Call to adventure** | "But when we tried it, the results were... inconsistent." | The math — compound reliability |
| **Crossing the threshold** | "Oh. It's not a bug. It's structural." | Why autonomy and reliability are in tension |
| **The ordeal** | "So autonomous agents are a dead end?" | The deeper error — removing humans removes learning |
| **The reward** | "The loop IS the product. Every correction makes it better." | Human input as the training signal |
| **Return with the elixir** | "The question isn't how to remove humans. It's how to structure the loop." | Strategic reframe |

---

## Article body (~1200 words)

### The pitch

Every agent demo looks the same. The vendor shows an agent processing an invoice end-to-end: reading the PDF, matching it to the PO, checking the budget, routing for approval, posting to the ledger. Fifteen steps, no human touch. The room applauds. The CTO writes "autonomous agents" on their strategy slide.

It's a compelling vision. It's also wrong — not because the technology can't do those steps, but because the math of chaining them together breaks in a way nobody shows you in the demo.

### The math nobody shows

Here's a number that should be on every CTO's whiteboard: **compound reliability.**

If each step in a multi-step agent is 95% reliable — which is generous for most business tasks — then a 10-step workflow has 60% end-to-end reliability. A 20-step workflow drops to 36%. Make it 30 steps and you're at 21%.

That's not a pessimistic estimate. It's multiplication. 0.95 to the power of N. The more autonomous you make the agent — the more steps you chain without human oversight — the less reliable the output becomes. Autonomy and reliability aren't aligned. They're in tension.

The vendor demo works because they ran it 10 times and showed you the one that worked. Your finance team will run it 10 times and get 6 failures. On invoices. With real money.

Every production system that actually works has converged on the same architecture: deterministic scaffolding around AI decision-making. The AI doesn't drive. It advises. The scaffolding — validation checks, type constraints, human approval gates — drives. The practitioners who ship real systems don't minimize human involvement. They structure it.

### The deeper error

But here's what most people miss. The compound reliability problem is real, but it's not the deepest problem. The deepest problem is what you lose when you remove humans from the loop.

Every agent starts ignorant of your context. It doesn't know that your company's "standard terms" have three exceptions that aren't written down anywhere. It doesn't know that invoices from Supplier X always have the VAT in the wrong field. It doesn't know that when the Helsinki office says "approved," they mean "approved pending Janne's review," because Janne is on parental leave and nobody updated the policy.

This context doesn't exist in any training data. It exists in your people's heads.

When a human reviews an agent's work and says "no, not like that" — that's not inefficiency. That's the agent learning something it could never learn from pre-training. Every correction, every redirect, every "actually, we do it this way" is a training signal. It's the agent absorbing your organization's context, edge cases, and unwritten rules.

Remove the human and you don't just lose a safety net. You lose the learning mechanism. The agent stops getting smarter about YOUR business. It stays at whatever generic capability it started with, making the same context-free mistakes forever. Correctness does not come from thin air. It comes from the loop.

### What practitioners actually do

The people shipping real agent systems — not demos, not prototypes, systems that run daily — all converge on the same pattern. They don't minimize human involvement. They design the feedback loop.

Customer service is the one domain where agents are genuinely crossing into production. Zendesk, Salesforce, HubSpot — independent platforms showing 40-80% autonomous resolution rates. But look at what "autonomous" means here: the agent handles the straightforward cases. The moment something is ambiguous, it escalates to a human. And the human's resolution becomes the agent's next training example. The 40-80% autonomy rate didn't start at 40-80%. It started much lower. It climbed because humans stayed in the loop, and their corrections made the system better.

This is not a temporary state. It's the architecture. The loop is how the agent gets good. Not pre-training. Not fine-tuning on generic data. Your people, correcting the agent on your cases, with your context.

### The new employee, not the vending machine

The vendor pitch treats agents like vending machines: insert task, receive output. No relationship required. But agents are more like new employees.

You don't hand a new hire everything on day one and leave the building. You work alongside them. They learn your way of doing things — the real way, not what's in the policy manual. Over time they need less guidance. But the guidance isn't wasted time. It's how they become valuable. And the ones you invest in training outperform the ones you leave to figure it out alone.

The same applies to agents. An agent that processes invoices with a human reviewing every fifth one will, over time, get better at invoices than an "autonomous" agent that processes all of them unchecked. Because the reviewed agent learns from corrections. The autonomous one just propagates its errors.

### The strategic question changes

This reframes the entire conversation.

The old question: "How do we remove humans from the loop?" This leads to chasing autonomy, which leads to compound reliability failures, which leads to agents that don't work, which leads to "AI doesn't deliver ROI" — the current state for 95% of organizations.

The new question: **"How do we structure the loop so every human interaction makes the agent permanently better?"**

This is a design problem, not a technology problem. It means building correction mechanisms that capture what the human changed and why. It means routing the right cases for review — not random sampling, but the edge cases where the agent is uncertain. It means treating human time in the loop as an investment in agent capability, not a cost to be minimized.

The organizations that design good loops will have agents that get measurably better every week — because their people are teaching them. The organizations that chase full autonomy will have agents that plateau at demo quality and never learn their context.

The vendors promise you won't need humans in the loop. The truth is the loop is where the value is created.

---

## Commentary (Antti, ~250 words)

I've watched this play out at F-Secure with 200+ people building agents.

Week one, people try to make the agent do everything autonomously. It sort of works. Then it fabricates a number in a dashboard. Or it applies a policy that was updated last month. Or it routes something to the wrong team because the org chart in the system doesn't match reality.

Week two is when it clicks. The person stops trying to remove themselves and starts working *with* the agent. They correct it. They explain context. The agent gets better — not abstractly, but at their specific task, with their specific data, in their specific org.

The people who build the best agents aren't the ones who write the longest system prompts. They're the ones who stay in the loop longest. Their corrections accumulate. Their agents absorb context that no system prompt could specify, because the context only reveals itself when the agent gets something wrong.

This is why competence matters more than platforms. The person who understands what agents are, how they fail, and how to teach them — that person will build a great agent on any platform. The person chasing autonomous deployment will build a mediocre one everywhere.

The question I ask every group now: "Would you hire someone and never give them feedback?" They laugh. Then I ask: "So why would you deploy an agent and never correct it?"

The loop is not the cost. The loop is the product.

*— Antti Tevanlinna*

---

## Sources needed

- Compound reliability math — Pattern 30 from platform watch synthesis [internal research — label as such]
- Hybrid architecture convergence (TinyFish, Stagehand, Skyvern) — Pattern 32 [practitioner direct — need specific URLs]
- Customer service convergence (Zendesk/SeatGeek 51%, Salesforce/Finnair 80%, HubSpot/Zeffy 84%) — vertical SaaS research [need to verify: practitioner or vendor source per platform]
- MIT GenAI Divide — 95% of organizations no measurable ROI [academic — need URL]
- F-Secure deployment experience [practitioner direct — Antti's own]
- Need: 2-3 practitioner accounts of structured feedback loops improving agent performance over time
- Need: counter-evidence search — are there cases where full autonomy DID work at scale in business process? (confirmation bias guard)

## Pre-draft verification checklist

- [ ] Every URL opened and classified
- [ ] No Level 0 sources used as evidence
- [ ] Counter-evidence actively searched
- [ ] All claims pass the three gates (agentic? independent? specific outcome?)
