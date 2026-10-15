import { fileURLToPath } from "node:url";
import { defineWorkflow, joinSession } from "@github/copilot-sdk/extension";
import workflowAdapter from "../../../scripts/copilot-workflow-adapter.js";

const scriptPath = fileURLToPath(
  new URL("../../../.claude/workflows/eval-sweep.js", import.meta.url),
);
const canonical = workflowAdapter.loadClaudeWorkflow(scriptPath);

const evalSweep = defineWorkflow({
  meta: canonical.meta,
  run: canonical.copilotRun,
});

await joinSession({ workflows: [evalSweep] });
