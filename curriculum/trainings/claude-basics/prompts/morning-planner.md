# Morning planner — pre-work for Claude Basics

A plain prompt file for use during pre-work. The participant pastes this into a fresh Cowork session connected to their personal SharePoint folder, with the O365 calendar connector enabled. Claude builds the participant a small custom agent that produces a one-page daily plan from their calendar.

The pre-work move is two things at once: (1) the participant feels Claude doing real work on real personal data; (2) the participant ships their first small system before walking into Module 1.

## When to use

- Pre-work before the cohort, ~20 minutes, optional
- Skippable if the cohort's connector setup hasn't landed for the participant by the time pre-work runs

## The prompt

```
I want a small system that produces a one-page plan for my workday from my O365 calendar. Two parts: an agent file Claude reads at the start of the run, and the run itself.

Build the agent file first. Save it as morning-planner.md in this folder. Structure:

- One sentence on what the agent does
- 3 to 5 rules in my voice (you'll need to ask me 2 to 3 questions to learn the voice — keep them short, one at a time, wait for answers)
- One short instruction on what the run produces (a one-page plan in plain text, max 200 words, saved as today-plan.txt)

After morning-planner.md is saved, run the agent: read morning-planner.md, pull today's calendar from the O365 connector, produce today-plan.txt per the rules in the agent file. Show me the plan in chat after saving.

I'll push back if it doesn't sound like me. After my push-back, sharpen morning-planner.md (not just today-plan.txt — the rules file) and run again.
```

## Notes

- The voice-learning step (Claude asks 2-3 questions before drafting the agent file) prevents the agent from being a generic LLM-default. Same pattern as Module 1's CLAUDE.md: rules in the participant's voice, not Claude's
- The pre-work goal isn't a perfect daily planner. The pre-work goal is *the participant has shipped a small system on their data before Module 1 starts*. Anything beyond a 6/10 plan is bonus
- If the O365 connector isn't enabled yet, the participant can paste a screenshot of their calendar week instead. The substitute is named in the cohort's pre-work email; the prompt doesn't need to handle the fallback
- The two artifacts (`morning-planner.md`, `today-plan.txt`) live in the participant's personal SharePoint folder. They survive past the cohort. The participant can keep running the agent after the training
