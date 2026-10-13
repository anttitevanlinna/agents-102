#!/usr/bin/env node
'use strict';

// Adapter from the repository's canonical Claude Workflow script shape to
// GitHub Copilot's dynamic-workflow context. The workflow body stays single-
// sourced in .claude/workflows; only runtime names and option spellings move.

const fs = require('node:fs');
const { compileWorkflow, extractMeta } = require('./check-workflow-scripts.js');

const CLAUDE_MODEL_ALIASES = new Set(['sonnet', 'haiku', 'opus', 'inherit']);

function copilotMeta(meta) {
  const description = meta.whenToUse
    ? `${meta.description}\n\nWhen to use: ${meta.whenToUse}`
    : meta.description;
  const portable = { name: meta.name, description, phases: meta.phases };
  if (meta.argsSchema) portable.argsSchema = meta.argsSchema;
  if (meta.limits) portable.limits = meta.limits;
  return portable;
}

function copilotAgentOptions(options = {}) {
  const { effort, model, ...portable } = options;
  if (effort != null) portable.reasoningEffort = effort;
  // Claude's aliases are not Copilot model IDs. Omit them so the workflow
  // inherits the session model; explicit Copilot model IDs pass through.
  if (model && !CLAUDE_MODEL_ALIASES.has(model)) portable.model = model;
  return portable;
}

function runtimeArgs(ctx) {
  const agent = (prompt, options) => ctx.agent(prompt, copilotAgentOptions(options));
  const parallel = (thunks) => ctx.parallel(thunks);
  const pipeline = (items, ...stages) => ctx.pipeline(items, ...stages);
  const log = (message) => ctx.log(message);
  const phase = (title) => ctx.phase(title);
  const unsupportedBudget = () => {
    throw new Error('canonical workflow started using the Claude budget API; add an explicit Copilot mapping');
  };
  const budget = { total: null, spent: unsupportedBudget, remaining: unsupportedBudget };
  const workflow = (name, args) => ctx.workflow(name, args);
  return [agent, parallel, pipeline, log, phase, ctx.args || {}, budget, workflow];
}

function loadClaudeWorkflow(scriptPath) {
  const body = fs.readFileSync(scriptPath, 'utf8');
  const meta = extractMeta(body);
  const run = compileWorkflow(body);
  return {
    meta: copilotMeta(meta),
    run,
    copilotRun: (ctx) => run(...runtimeArgs(ctx)),
  };
}

module.exports = { copilotMeta, copilotAgentOptions, loadClaudeWorkflow, runtimeArgs };
