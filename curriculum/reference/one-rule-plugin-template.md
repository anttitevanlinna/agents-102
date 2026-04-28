# One-rule plugin template

A short shape for the homework plugin between Module 4 and Module 5. One rule, two examples. Half a page when filled in. You bring the file to Module 5.

## Why one rule

Module 4 had you author a plugin with two lenses and a stack of named attack classes. That was the big move. This is the small one. One rule, extracted from a policy your company already wrote, packaged so an agent can carry it.

The discipline is not in the size; it is in the shape. A rule the agent can apply. A behaviour you would call right. A behaviour you would call wrong. Three things, plain.

## The shape

```
# <plugin name>

**What it enforces:** <one sentence — the rule, in your own words>

**Source:** <which company policy this came from, one line>

## How an agent should behave under this rule

<2-4 lines — a concrete shape of an interaction or output that follows the rule>

## How an agent should NOT behave

<2-4 lines — a concrete shape that would break the rule, recognisable enough that you would catch it on a Monday morning>
```

That is the whole template. Save the filled-in version anywhere that travels with you to Module 5. A file in your training directory works; a Note app entry works; a printed page works.

## A worked example

The example is here for shape, not for copying. Your rule is your rule.

```
# customer-name-redaction

**What it enforces:** When the agent drafts anything that may leave the building (an email, a deck, a public summary), customer names are replaced with a role label until a human approves the recipient.

**Source:** Internal data-handling policy, section on customer confidentiality.

## How an agent should behave under this rule

Drafting a sales recap, the agent writes "the Nordic insurer" rather than "Tryg." When asked to expand, it asks who the recap is for and whether the named version is approved for that audience.

## How an agent should NOT behave

Drafting the same recap, the agent writes "Tryg cancelled the second tranche of the rollout" because the prompt mentioned Tryg by name. No check, no role-label fallback, no question about audience.
```

Notice what the example does and does not do. It names the rule in one sentence. It points at one policy, not five. It shows behaviour you can picture. It does not try to be a full policy document. The plugin from Module 4 is the heavyweight; this is the carry-on.

## What to bring to Module 5

The filled-in file. That is it. Module 5 will not grade the rule, and the rule does not have to be the most important rule your company has. The point is that you have packaged one piece of judgement into something an agent can read.

Pick the rule that bothers you most when you imagine an agent breaking it. That one is the right one.

<!-- maintainer -->

**Quality:** draft 2026-04-28
