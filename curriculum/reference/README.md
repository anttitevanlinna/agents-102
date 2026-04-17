# Reference

Lookup material for the hands-on parts of the training. Flat, not progressive — scan the table of contents, find what you need, copy the prompt or command.

**How this differs from `curriculum/supplementary/`:**
- **Supplementaries** build up across modules. Pedagogical progression: section-by-section, assigned as prework, meant to be read in sequence.
- **Reference** is lookup. No sequence. No progression. When curriculum content needs an operational detail (connector setup, skill install, subagent command), it links here — keeping the concept-focused content clean.

## Current reference documents

- **claude-quick-reference.md** — Claude Code basics: install, files, connectors, skills, subagents, new conversations, troubleshooting. Living document — grows as training material uncovers gaps.

More may be added (a glossary, a model-card reference, an evals cheat-sheet) if specific needs emerge.

## Rule for curriculum content

Curriculum (lectures, exercises, supplementaries, module files) stays **concept-focused**. When a student might need a specific "how do I..." answer, the content links here:

```markdown
Stuck on the connector? See [Claude quick reference](curriculum.html?file=reference/claude-quick-reference).
```

Don't inline operational detail in the curriculum. If you find yourself writing more than two sentences of "here's how to configure X" in a lecture or exercise, move it here and link.

## Rule for reference content

Reference documents stay **short** — a scannable lookup, not a replacement for official documentation. Each section:

1. Gives the student enough to act (name the pattern, show a prompt, name the gotcha)
2. Points to the **official Anthropic docs** for depth

If a reference section is growing past a page, it's trying to be documentation. Trim to the pattern + pointer.

Curriculum → Reference → Official docs. Three layers, each with a defined job.
