**Context:** Reading `what-is-an-agent.md` after meeting "connector" in prework Task 2. Live test 2026-04-21.

**Signal:** The doc said *"If you add tools — things the model can call to fetch data, write files, run code"* immediately after the student had just learned *"connector."* "Tools" is the agent-builder umbrella term but unfamiliar to a business-leader audience; "connector" is what they just learned; "actions" is what they recognize from Power Automate / Zapier. Cutting the description to *"tools"* alone strands the unfamiliar word and discards two recognizable strands.

**Fix applied:** rewritten as *"connectors, actions, and tools"* with a one-paragraph passage naming each angle: connector = wires into your work apps (Claude's settings word), action = verb with effect in the world (low-code platform word), tool = umbrella for anything the model can call (agent-builder word).

**Policy (proposed):** establish the triple ONCE at first introduction (in this supplementary doc, which is prework). After that, "tools" alone is fine as the umbrella, OR use the specific word for the specific surface (connector / action / tool). Don't bulk-rewrite every later use — but DO check that any module that introduces a new "tool"-shaped capability for the first time names which of the three it is.

**Where to look next (deferred):**
- Module 4 (`module-4-prework.md`, `audit-your-agent.md`) — heavy "tool" usage in security/audit context. The audit reader is an SVP who needs to map abstractions to concrete surfaces; using all three nouns where they apply helps the audit land.
- `building-agent-systems.md:10` — M2 prework points at *"tools, memory, context"* in the supplementary doc; already covered by the triple now.
- `lectures/when-to-split-an-agent.md` — *"its own tools," "they share tools"* — agent-tools sense, fine since the triple has been established earlier.

**Codify:** add a short note to `.claude/skills/content-creation/SKILL.md` § Business-audience jargon ban — "When introducing the agent-tools concept, name the triple (connectors, actions, tools). Don't lead with 'tools' alone."
