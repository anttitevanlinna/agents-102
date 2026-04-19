# Agents 102

**The agentic transformation is different.** Without agent competence, a CTO is choosing between vendor marketing stories — not between real capabilities. This knowledge base exists because Google search returns vendor press releases, analyst predictions, and rewritten announcements. We return practitioner evidence.

## What You Get

A curated, continuously updated research system that answers the questions vendors won't:

- **Which platform actually leads?** (Nobody. The entire business agent space is pre-chasm. We show why.)
- **Which domains have real agent deployments?** (Three have crossed. We name the companies and the evidence.)
- **What are practitioners building — on what?** (60+ named practitioners tracked by domain. Not vendor claims.)
- **What's the real CTO playbook?** (Competence first, platform second. We show the evidence for that sequence.)
- **What's happening in the Nordics?** (Almost nothing — and that IS the finding.)

Every claim is evidence-graded: Level 0 (vendor marketing) through Level 4 (cross-domain meta-pattern confirmed across independent sources). Counter-evidence included. Nordic signal tracked.

## Get Started

**Prerequisites:** [Claude Code](https://claude.ai/code) installed — CLI is the smoothest for self-study, desktop app also works. Git and Python 3 available on your machine. **Install all of these through your company's approved channel** (IT self-service catalog, software request process, or whatever your org uses for dev tools) — direct download is a fallback for personal laptops. A terminal to clone the repo.

```bash
git clone https://github.com/anttitevanlinna/agents-102.git
cd agents-102
claude
```

Then type `/research` — the system orients you and asks what you're trying to figure out.

Or go straight to a question: *"Which platform should we build on?"* — and the system answers from 74+ research cycles of evidence.

## Do the Training (Self-Study)

Agents 102 Bootstrap is an eight-module intensive — normally with a trainer, scheduled anywhere from a tight couple of days to a module-a-week over two months. You can also do it alone, at your own pace — Claude Code becomes your facilitator.

In Claude Code, type `/self-study`. The facilitator sets up your working directory (`~/Documents/agents-102-bootstrap/` by default), starts the lecture server itself (no second terminal), leads you through prework, tracks progress across sessions, and holds the rhythm of each module.

Expect ~14 hours total. Split it however fits — 30-minute sessions, a full weekend, a module a week. If you close Claude Code and come back later, type `/self-study` again and it picks up where you left off.

Claude Code CLI is recommended (the terminal flow is smoothest), but the desktop app works too. Use whichever fits your habits. The lecture server runs on your machine at `localhost:8000`, so your browser needs to reach it — which means running Claude Code on the same machine you're reading lectures on.

## Example

**You ask:** "Which domain is leading in agentic — why?"

**You get:** Three domains at Level 3 convergence (CS, coding, finance/accounting), the Level 4 meta-pattern that predicts which domains cross next (rules codified + correctness verifiable + talent scarce), named companies and practitioners, counter-evidence, and Nordic signal. Sourced from 2 files in under 10 seconds.

Not a summary of Google results. A structured, evidence-grounded answer with the counter-arguments built in.

## How It Works

Three research systems feed each other:

1. **Platform watch** — continuous OODA cycles tracking Microsoft, Google, OpenAI, Anthropic, Salesforce, ServiceNow, Zendesk, SAP. 47 cross-platform patterns established.
2. **Domain research** — who is doing real agentic work in operations, finance, HR, compliance, customer service, sales. 7 domains tracked, evidence-leveled.
3. **Your questions** — what you ask and comment is automatically captured and steers future research. The system gets smarter because you use it.

**Start here:** [`continuous-research/synthesis/index.md`](continuous-research/synthesis/index.md) routes you to the right topic file in one read.

## Why This Exists

Gartner sells predictions. Vendors sell announcements. Consultancies sell frameworks. None of them have built an agent or deployed one in production.

This system tracks what practitioners — the people who actually build and deploy — are doing. It follows people, not topics. It reports convergence (10-20 independent signals pointing the same direction), not individual experiments. And it tells you what it did NOT find — because absence of evidence is often the most valuable finding.

Built by [Bosser](https://bosser.consulting). Independent. Practitioner-led.

## Contributing

- `git pull` at the start of each session — research runs continuously
- Ask questions, push back on findings, add context — it all steers the research
- Work on branches for experimental work; `main` is the shared knowledge base

## Evidence Ladder

| Level | Meaning | How we use it |
|-------|---------|---------------|
| 0 | Vendor marketing, analyst predictions | Not evidence. Context only. |
| 1 | Practitioner opinion | Noted, never reported as finding |
| 2 | Single company deployed, reports results | Supporting evidence, labeled |
| 3 | 10-20 independent practitioners report same pattern | **This is where we report** |
| 4 | Pattern holds across multiple domains | Premium insight |
