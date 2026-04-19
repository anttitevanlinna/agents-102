# What is an Agent

A reference document that grows across the training. Each module adds the next section. This is section one — meant to be read before Module 1 so you walk in with a rough mental frame, not a blank one.

---

## 1. LLM vs chat — what's the difference?

You've chatted with ChatGPT, Claude, or Copilot. A single conversation: you type a prompt, it replies, you type again, it replies. The conversation ends when you close the tab.

That's the LLM doing its core thing — reading a pile of text (the conversation so far) and predicting the next bit of text that fits. No magic. Good pattern matching, at enormous scale.

Two ideas worth separating, because most people collapse them and then get confused:

**The model** is the LLM itself — the trained pattern-matcher. It doesn't know the date. It doesn't know what you did yesterday. It doesn't know if the previous conversation ever happened. It reads whatever you hand it, generates the next response, and then has no idea the response ever existed. Unsettling when you first realise it. Also liberating once you do.

**The chat** is what surrounds the model. Your messages plus its replies, held in a single running window, fed back in every time you hit send. That's why it can "remember" earlier in the conversation: not because it has memory, but because the whole conversation is re-read on every turn. The illusion of memory is a trick of the interface.

Close the tab — the chat ends. Start a new conversation — the model has amnesia. This is important. It means "how do I make Claude remember?" is the wrong question. The right question is: *what context do I arrange for it to re-read?*

## What changes when you build a system

A chat ends. A system doesn't. That's not a feature; that's the whole difference.

If you write instructions into a file the model reads at the start of every conversation, the instructions persist — even though the model itself has no memory. That file is context. Sometimes people call it a *guardrail* when it shapes behaviour, a *prompt* when it kicks off a task, or a *brain* when it holds knowledge. Different names, same mechanism: text the model re-reads at the start.

If you add tools — things the model can call to fetch data, write files, run code — it stops being a chatbot and starts being an agent. A chatbot has words. An agent has words and hands. That's the step-change.

If the agent runs on a schedule, chains to another agent, or decides what to do next based on what it finds — now it's operating without you sitting there. That's the leap this training is about. You already use email filters and calendar reminders; an agent is the same basic shape, just capable of a much wider set of tasks. And a much wider set of failure modes.

## What you'll meet, when

Each module adds the next part of the answer:

- **Module 1:** Context is the mechanism. You already have a taste from the prework — the snake game and the meetings summary both happened because Claude read your input and produced output shaped by it.
- **Module 2:** Context in a file, growing over time (the "brain"). Where chat's amnesia gets cured.
- **Module 3:** Multiple agents doing different jobs, passing work between them.
- **Module 4:** Tools with boundaries — skills.
- **Module 5–6:** How do you know the output is actually good?
- **Module 7:** When your agent becomes your team's agent.
- **Module 8:** Agents that build other agents.

Don't skim ahead. Each module earns the next, and reading ahead mostly replaces the feeling with a vocabulary — which is exactly what this training is trying to avoid. Close this file. See you in the room.
