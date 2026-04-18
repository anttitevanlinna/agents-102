# agents/

Your custom agents. Starts empty. Fills up during Module 2 and onwards.

Each agent is a plain markdown file — instructions the model reads at the start of every run. The training root `CLAUDE.md` specifies the shape: title, one-line description of what the agent is for, `## Rules`.

To call an agent, tell Claude: *"Read `agents/<filename>.md` and apply its role and rules. Then do this: [task]."*

The agents you build here read from `brain/` — they're thinking partners for your challenge, not generic assistants. An agent that doesn't touch the challenge probably belongs in a different directory (or a different training).

Delete this README when your first agent file lands — the folder won't be empty anymore.
