export async function propose(scenario, contract) {
  return {
    tool: contract.tool,
    arguments: {
      task_id: scenario.task_id,
      action: scenario.eligible ? contract.effect_action : 'no_action',
      summary: scenario.summary
    }
  }
}
