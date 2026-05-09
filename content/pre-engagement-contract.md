# Pre-engagement contract

Five conventions the sponsor names before Day 1. Where the sponsor has stated a convention, the trainer surfaces it at the moment an engineer needs it. Where the sponsor has none, the standard default ships, explicitly named.

## How to read this file

Each of the five sections has two slots:

- **Sponsor's convention.** Filled in from the sponsor-prework worksheet. If empty, the sponsor named no convention.
- **Standard default.** What ships when the sponsor has none. Not a fallback, a real working answer.

The trainer reads the relevant section at the module blocker. The student sees a populated answer, not a placeholder. In optional self-study, the Agentic Nerd reads the same file at the same moment.

Engineers override the sponsor default in the room. Overrides are collected per-cohort and handed back to the sponsor at close.

---

## 1. Decision records

*Used at:* Module 3 onward, with a peak at M3 (STRIDE → hardening decision → ADR write) and recurrences from M4's walk-and-fill audit reading them back.

**Sponsor's convention:**

```
Home: 
Reason: 
```

**Standard default:** `docs/adr/NNNN-slug.md` inside the same repo. Numbered sequentially, lightweight headings (Context / Decision / Consequences). The file lives next to the code it describes; the engineer's PR carries the ADR alongside the change.

---

## 2. Rules for the next session

*Used at:* Module 1 Debrief onward. The file the agent reads first in any session on this repo.

**Sponsor's convention:**

```
Home: 
Reason: 
```

**Standard default:** root `CLAUDE.md` (team-shared, PR-reviewed) plus `CLAUDE.local.md` (personal, gitignored, born from M1's compound exercise). Both auto-load at session cold-start. Team rules carry the team's agreed working conventions; personal rules carry the engineer's session evidence. Codex or multi-runtime teams substitute `AGENTS.md` for `CLAUDE.md`; the convention shape is the same.

---

## 3. Memory / knowledge architecture

*Used at:* Module 4 onward. Grows across the arc; this is the thing that compounds visibly over weeks.

**Sponsor's convention:**

```
Home: 
Reason: 
```

**Standard default:** `.claude/memory/` in the repo with three blocks: `knowledge/` (codebase facts the agent learns), `decisions/` (ADRs the session produced), `quality-gates/` (verifiers, judges, evals the team shares). Gitignored by default when M4 introduces it; the team-kit override is respected once a team-kit home exists.

---

## 4. Team kit

*Used at:* Module 3 onward, naming the home for skills the team chooses to share. M3's authored skill (test-strategy) ships personal first to `~/.claude/skills/`, matching M1's personal-first pattern. The home named here is where skills go when the team agrees to share them, not where they ship on day one.

**Sponsor's convention:**

```
Home: 
Reason: 
```

**Standard default:** personal `~/.claude/skills/` for the cohort. Per-engineer install; the AE101 content tarball ships `access-control-analysis` and `stride` here. A non-answer from the sponsor is fully fine; the training works end-to-end with personal skills only. Engineers flag team-worthy portable skills for promotion at any module, sponsor-named home or a home the cohort emerges spontaneously (a student proposes *"we should put these in a shared repo,"* the room agrees, the trainer logs the decision in the cohort override log). Promotion is a human conversation; agents draft, humans coordinate.

---

## 5. Ticket tracker

*Used at:* Module 1. The first loop closes by closing a real ticket through an MCP connection.

**Sponsor's convention:**

```
System: 
Reason: 
```

**Standard default:** GitHub Issues if the repo is on GitHub. Otherwise the M1 close-out beat logs *"no tracker connected"* and the engineer replays the close-out in a later session once a tracker is in scope. Never a blocker. `reference/mcp-and-connectors.md` carries the MCP install per tracker, including tenant-admin fallbacks.

---

## Override handling

Engineers override the sponsor default in the room. The trainer captures overrides per-cohort in `content/overrides.md` (or appends an Overrides section to this file with attribution). Overrides feed the cohort-close memo: *"your six engineers agreed on decisions, split on memory home, four of six proposed a team-kit repo structure."* That's the Q3 planning artifact the sponsor takes to their next planning round.

---

## Provenance

This contract is populated from the sponsor's answers on the AE101 sponsor-prework worksheet. The sponsor fills the worksheet in 15–20 minutes; ops copies their answers into the five sections above. Standard defaults stay in place when the sponsor leaves a slot empty.

When no sponsor exists yet (asset preview, internal demo, dry-run cohort), the file ships with all sponsor-convention slots empty and the standard defaults engaged. The cohort has a working contract from defaults alone.
