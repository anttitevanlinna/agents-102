The human gate in a learning agent has two functions: authority control and gradual teaching. Human accept, reject, edit, and rationale are the grounded signals the agent should compound; an approval-only gate throws the learning away.

In deployment, this becomes double-loop learning: the first loop handles the ticket, while the second reads the trace and human outcome and proposes a governed change to the handler. A simple bug-fix agent can start at `bug created → try fix → pull request`, then learn from what happens to that pull request.

**Gap:** How should the system preserve that judgment and prove that it improves later calibration without accumulating narrow or contradictory rules?
