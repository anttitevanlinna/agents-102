# Agentic systems demo script

**Time:** 35 minutes.

This is a live demo script for the agents-102 repo and the Claude Basics workbook. The point is not to tour files. The point is to show how an agentic system behaves when rules, prompts, checks, build output, and compounding sit in one working system.

## 1. Start with the question

Ask what makes this different from a good chat answer. The answer to look for is repeatability: a chat gives a response, while a system leaves behind structure that can run again.

## 2. Show the workbook first

Open the deployed Claude Basics workbook. Start from the page the room will actually use, then work backward to show that the page is built output, not a hand-written slide deck.

## 3. Show the rules

Ask Claude Code what rules govern Claude Basics work in this repo. Let it name the root `CLAUDE.md`, `curriculum/CLAUDE.md`, and the Claude Basics rules before opening anything manually.

## 4. Show how rules steer behavior

Ask why the workbook says "people helping their organisation roll out Claude." This makes the rules visible as judgment, not decoration: the workbook is written for everyone who may need to help the rollout succeed.

## 5. Inspect the system

Ask Claude Code to find the module order, source module files, shared exercises, and build command. The point is the map: source content, rendering code, generated customer output, and deployment path all live in the same system.

## 6. Make one small strategic change

Use a tiny wording or structure change, not a rewrite. Ask Claude Code to explain the plan before editing so the room sees the discipline: inspect, propose, edit, verify.

## 7. Rebuild the customer workbook

Run the customer build command for `acme claude-basics`. Show that one source change becomes a customer workbook change through the build system.

## 8. Run checks

Ask Claude Code to grep for the old wording and run the cheap checks that fit the change. The teaching point is reliability math in miniature: the system does not trust a clean-looking answer; it checks the artifact.

## 9. Show the diff

Ask Claude Code to summarize the diff. The diff is the system's receipt: what changed in source, what changed in generated output, and what stayed untouched.

## 10. Show compounding

Ask what rule or memory should change so the same mistake is less likely next time. This is the compounding move: the output is not only the workbook, but the improved system that will shape the next edit.

## 11. Name the pattern

Close by naming the loop: rules, inspect, plan, edit, check, build, compound. That loop is the difference between asking Claude for help and working inside an agentic system.

<!-- maintainer -->

**Lecture meta:** *Live demo script for Claude Basics Module 1. Keep this as a demo spine, not a reading. Do not expand into a file-by-file repo tour.*

**Quality:** draft 2026-04-30
- draft 2026-04-30 (created from rough repo-demo script; sim/eval not run)
