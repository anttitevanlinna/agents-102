# Lint — Philosophy Callout Collisions (STUB)

**Catches:** the same `philosophy.md` belief number quoted across adjacent lectures in a session, or quoted more than once in a single lecture without deliberate build-up.

Per SKILL.md § Philosophy callouts: *"Session-level budget: within a day that has multiple lectures, avoid repeating the same belief number across lectures unless the repetition is deliberate and named."*

## Status

STUB — to be fleshed out when a callout-collision bug surfaces. The rule exists in SKILL.md; a lint is only worth writing when the first real violation happens.

## Rough shape (to fill in later)

- Read all lectures in arc order
- Find every explicit reference to a philosophy belief (e.g., "belief #7," or quoted lines matching philosophy.md)
- Report:
  - Beliefs quoted >1 time in a single lecture
  - Beliefs quoted in adjacent lectures without an explicit "building on X" note
  - Beliefs quoted at front-load position (before the exercise)

## Build trigger

First cohort where Antti notices a callout repetition that wasn't deliberate — flesh this out.
