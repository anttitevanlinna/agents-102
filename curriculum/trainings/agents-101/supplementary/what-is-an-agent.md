# What is an Agent

A reference document that grows across the training. Each module adds the next section. This is section one. Read it before Module 1 so you walk in with a rough mental frame, not a blank one.

---

## The short version

An agent is an LLM doing multi-step work with context, tools, a goal, and bounded autonomy.

Five facets matter:

1. **Multi-step work.** It carries a task across steps, not just one response.
2. **Context.** It reads relevant material beyond the prompt, including durable memory.
3. **Tools.** It can fetch, write, run, call, update, or connect.
4. **Goal.** It is working toward an outcome, not merely answering.
5. **Bounded autonomy.** It can keep going inside a task, but only within explicit limits: checks, evals, permissions, handback points, and safe-action rules.

Not every useful agent has all five at full strength. A small agent may only read files and write a briefing. A stronger one may run on a schedule, use connectors, call other agents, and check its own output. The point is not the label. The point is the shape: the LLM is no longer just replying. It is doing work inside a bounded system.

## A concrete example

Picture a Slack bot running in AWS.

Someone asks it a work question in a channel. The bot sends the request into a small backend service. That service uses the Claude Code SDK as the runtime: the layer that lets the agent read the right files, follow the project rules, call tools, write an answer, and return it to Slack.

In effect, the agent is not "the Slack bot." The Slack bot is the interface.

The agent is the whole arrangement: Claude as the LLM, the context it can read, the tools it may call, the goal it is trying to complete, the checks it runs, the AWS service that keeps it alive, and the Slack surface where people meet it.

That is why the word agent can feel slippery. Sometimes people use it to mean the LLM. Sometimes they mean the bot. Sometimes they mean the backend service. For useful work, it helps to see the full shape.

## The parts of an agent

An agent is not one thing. It is a few pieces arranged around the LLM.

**The model** is the LLM. It reads text and produces text. It is powerful, but it does not know your situation unless the situation is in the context it reads.

**The context** is what the model reads before and during the task: your prompt, files, rules, memory, sources, prior outputs, and connected work material. Context is how the agent knows what world it is working in.

**The tools** are what the agent can use: connectors, file reads and writes, code execution, search, APIs, calendars, tickets, mail, or other agents. Tools give the agent hands. The model chooses among them by reading tool names, descriptions, input shapes, and the current context. The description is part of the mechanism, not documentation off to the side.

**The goal** is the job. A chatbot answers the next message. An agent works toward an outcome: build the memory, prepare the briefing, check the claims, update the ticket, run the loop.

**The loop** is how the agent keeps going: plan, act, observe what happened, revise, continue. A weak loop drifts. A strong loop leaves artifacts you can inspect.

**The checks** decide whether the work is good enough to trust or continue. They can be simple source checks, rules in `./CLAUDE.md`, tests, judges, evals, or human review.

**The boundary** says what the agent may read, change, propose, or do. It also says when the agent must stop and hand the decision back to you.

**The interface** is where you meet the agent: a chat, a scheduled run, a Cowork task, a Claude Code session, a workflow button, a shared document, or an output someone reads.

Most failures happen because one part is missing or vague. No context: generic output. No tools: trapped in chat. No goal: busy answer, no outcome. No checks: plausible but wrong. No boundary: unsafe action. No interface: useful work nobody sees.

## LLM vs chat

You've chatted with ChatGPT, Claude, or Copilot. A single conversation: you type a prompt, it replies, you type again, it replies. The conversation ends when you close the chat window.

That's the LLM doing its core thing: reading a pile of text (the conversation so far) and predicting the next bit of text that fits. No magic. Good pattern matching, at enormous scale.

Two ideas worth separating, because most people collapse them and then get confused:

**The model** is the LLM itself: the trained pattern-matcher. It doesn't know the date. It doesn't know what you did yesterday. It doesn't know if the previous conversation ever happened. It reads whatever you hand it, generates the next response, and then has no idea the response ever existed. Unsettling when you first realise it. Also liberating once you do.

**The chat** is what surrounds the model. Your messages plus its replies, held in a single running window, fed back in every time you hit send. That's why it can "remember" earlier in the conversation: not because it has memory, but because the whole conversation is re-read on every turn. The illusion of memory is a trick of the interface.

Close the chat window. That conversation ends. Start a new one. The model has amnesia from turn one. This is important. It means "how do I make Claude remember?" is the wrong question. The right question is: *what context do I arrange for it to re-read?*

## What changes when you build a system

A chat ends. A system doesn't. That's not a feature; that's the whole difference.

If you write instructions into a file the model reads at the start of every conversation, the instructions persist. The model itself still has no session memory. That file is context. Sometimes people call it a *guardrail* when it shapes behaviour, a *prompt* when it kicks off a task, or a *memory* when it holds knowledge. Different names, same mechanism: text the model re-reads at the start.

If you add **connectors, actions, and tools**, the things the model can call to fetch data from your work apps, do things in them, write files, run code, or talk to other agents, it stops being a chatbot and starts being an agent. A chatbot has words. An agent has words and hands. That's the step-change.

The three names cover roughly the same surface area, just from different angles. **Connectors** are the wires into your work apps (calendar, email, files). That's the word you'll see in Claude's settings. **Actions** are the verbs an agent can perform with effects in the world (send the email, create the ticket, file the document). That's the word Power Automate, Zapier, and most low-code platforms use. **Tools** is the umbrella term agent-builders use for *anything* the model can call. You don't need to memorise the distinction; you'll meet each as you go.

If the agent runs on a schedule, chains to another agent, or decides what to do next based on what it finds, now it's operating without you sitting there. That's the leap this training is about. You already use email filters and calendar reminders. An agent is the same basic shape, just capable of a much wider set of tasks. And a much wider set of failure modes.

## What you'll meet, when

Each module adds the next part of the answer:

- **Module 1:** Context is the mechanism. You already have a taste from the prework. The snake game and the meetings summary both happened because Claude read your input and produced output shaped by it.
- **Module 2:** Context in a file, growing over time (the "memory"). Where chat's amnesia gets cured.
- **Module 3:** Multiple agents doing different jobs, passing work between them.
- **Module 4:** Tools with boundaries: skills.
- **Module 5–6:** How do you know the output is actually good?
- **Module 7:** When your agent becomes your team's agent.
- **Module 8:** Agents that build other agents.

Don't skim ahead. Each module earns the next, and reading ahead mostly replaces the feeling with a vocabulary. That is exactly what this training is trying to avoid. Close this file. See you in the room.

## The autonomy ladder: what may the agent do?

*Referenced from: Module 5 (output quality).*

Once the agent can read your material, use tools, call other agents, and run checks, the question changes.

Not: "Should I trust the agent?"

Better: **what is the agent allowed to do at this rung?**

Autonomy is a ladder:

1. **Draft only.** The agent writes something. You decide what happens next.
2. **Draft and check.** The agent writes something and runs the relevant judge, rubric, source check, or policy check before you read it.
3. **Propose the action.** The agent writes the exact email, ticket update, CRM change, query, or command it would run. You apply it.
4. **Take reversible safe actions.** The agent can do low-risk actions that are easy to inspect or undo: label a note, draft a ticket, update a private working file, create a calendar hold.
5. **Take routine actions automatically.** The agent can do a narrow class of repeated actions when the checks pass and the blast radius is low.
6. **Escalate the rest.** Anything high-risk, irreversible, external-facing, sensitive, or politically loaded comes back to you.

The move is not to jump from rung 1 to rung 6.

The move is to earn the next rung.

Run the proposal version first. Read what the agent would have done. Add the check that would have caught the bad version. Let the agent take the action only after the proposal version has worked enough times that the failure mode is boring.

This is why text matters. Most agent actions begin as text: a proposed mail, a ticket update, a CRM change, a query, a command. Check the proposal before it becomes the action.

Connectors expand what the agent can reach. Evals decide what it may do with what it reaches.

That is the shape of responsible autonomy: more reach, clearer checks, smaller first steps.

## Agents as judges: when the agent checks the work

*Referenced from: Module 6 (evaluations).*

By Module 6, the agent is not only producing work. It can also check work.

That does not mean the judge is magically right. It means the system has separated two jobs that are easy to confuse:

1. **Generate the best possible version.**
2. **Check that version against a clear standard.**
3. **Use the result to improve the next attempt.**

This is why Module 6 uses separate agents for generation and judging. The generator tries to make the output better. The judge looks for the failure mode you care about. The main session watches the evidence, updates the tactic, and runs the loop again.

This is also the small-system version of a much larger AI pattern: generate, score, adjust, repeat. You are not training the base model. You are training the system around the model: the prompt, the context, the judge, the tactic, the boundaries, and the habit of checking before scaling.

The important move is not "let the agent decide everything."

The important move is: **make the standard visible enough that an agent can help you apply it repeatedly.**
