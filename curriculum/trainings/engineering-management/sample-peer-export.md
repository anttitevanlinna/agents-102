# Peer export: payments platform team

Shared by the engineering manager of the payments platform team (eight engineers). Everyone is named by role. Quotes from the team's answers and anything personal are left out.

## Team Knowledge

### Where people sit (ADKAR)

- **Staff engineer:** Ability. Runs agents on migrations most weeks and builds small helpers for them. Nobody else on the team has seen one of these runs from start to finish. *Hypothesis.*
- **Senior engineer A:** Desire, not yet Knowledge. Asked twice for time to try agents on the reconciliation service. Both times the answer was "after the release". *Observation.*
- **Senior engineer B:** Awareness. Reviews most changes to the ledger code. Says agent-written code is harder to review than a colleague's. *Hypothesis.*
- **Two mid-level engineers:** Knowledge. They use chat assistants daily and have not run an agent on a real ticket. One said they would try it if someone showed them on our own repo. *Observation.*
- **Two junior engineers:** Desire. They are keen, and they worry that using agents will look like cutting corners in review. *Observation.*
- **QA engineer:** Awareness. Not asked yet. *Thin: no notes beyond role.*

### Where the team sits (adoption curve)

Mostly chatting, with one person in agentic workflows. *Hypothesis.* Usage is individual. Nothing is shared in a channel, a repo or a demo.

### What the team has tried

A shared prompt library a year ago. It went stale within a month because nobody owned it. The team still believes shared AI material rots. *Rule, seen three times.*

### What the answers showed

- Three of the six answers named review load as the reason they don't experiment.
- Two answers asked for "permission" in some form. Nobody has forbidden anything, but release pressure reads as a no.
- Nobody mentioned tools or licences.

## Shortlists

### Move candidates

1. The staff engineer pairs with one mid-level engineer on a real ticket, with the whole team watching.
2. Protect a two-hour slot every other week, outside release work, for anyone who wants to try agents on our own code.
3. Agree a lighter review path for agent-written test code only.

### Coalition candidates

- **Staff engineer:** already doing it and willing to show others. Answered within the hour.
- **Senior engineer A:** asked for time twice, unprompted.
- **One mid-level engineer:** offered to go first if paired.

## Decision Journal (shared entry)

**First move:** the pairing session (move 1). The protected slot lost because it needs the director's sign-off. Review-path changes lost because senior engineer B would read them as a verdict on their reviews. **Trade-off accepted:** only one person learns hands-on this week.
