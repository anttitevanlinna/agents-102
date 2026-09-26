# Context is King

The same question. Two answers. What makes the difference?

## Same question, two answers

Two Claude chat windows.

In one, the first prompt is *"What is the capital of Italy?"* Claude answers *Rome.* Then the second prompt: *"What should we have for dinner?"* Claude suggests something Italian: pasta, osso buco, risotto.

In the other window, the first prompt is *"What is the largest lake in Finland?"* Claude answers *Saimaa.* Then the same second prompt as before. Claude suggests something Finnish: salmon, rye bread, meatballs.

Same words. Different answer. The first exchange became part of context, and the context colored everything after.

Before you watch the second session run, take a guess. What will it suggest? Your guess reveals what you already know about how this works, and what you're about to learn.

## It reads the whole conversation every time

Claude isn't looking your question up in a database. It reads the whole conversation every time and generates the next response from all of it. Your first prompt and its answer are now *part of the input* to the second prompt. Change the front, change the back.

That's context. Unglamorous, isn't it? And yet every useful thing in this training is built on this one idea.

## Context is whatever you tell it

One more window. The first prompt: *"I'm a cardiologist preparing dinner for my patients."*

Then the same second prompt about dinner.

The suggestion shifts again. Heart-healthy. Low-sodium. Vegetable-forward. Not because Claude knows medicine better than Italian cooking. You told it who you are, and every answer after took that into account.

Context is whatever you tell it. A fact. A role. A preference. A constraint. All of it colors what comes next.

## The first piece of the picture

In the full agent picture, this is the first piece: context. Later you add tools, goals, checks, boundaries, and loops. None of them work unless the agent reads the right world first.

## A file it reads every time

So far the context has been one message you typed. Ephemeral. Gone when you close the chat window.

What if the context was a file the agent reads at the start of every conversation? A file you wrote once, tuned carefully, that shaped every answer without you ever retyping it? Same mechanism. Different shelf life.

That's a guardrail. That's your turn.

<!-- maintainer -->

**Quality:** compendium-audited 2026-08-25 (writing@d3ff749e story@5755beb6 technical@725101ec behavior@725101ec pedagogy@725101ec strategy@725101ec slides@4d9c4af2)
- judges @4d9c4af2: writing PASS, story PASS, technical PASS, behavior PASS, pedagogy PASS, strategy PASS, slides PASS

**Story blend, M1 slides (2026-09-23).** Headers per `module-design/a101-story-proposals/blend.md` § Titles, M1: `Same question, two answers`, `It reads the whole conversation every time`, `Context is whatever you tell it`, `The first piece of the picture`, `A file it reads every time`. The refrain paragraph (*In the full agent picture, this is the first piece: context*) is its own slide and sits after the role example, which is the widest statement of context in the lecture. No body prose is rewritten for the re-chunk. `context-is-king-cb.md` names this file as its Source and belongs to another training; it is outside the A101 story blend and its headers are not part of this change.

**Time:** 10 minutes.
