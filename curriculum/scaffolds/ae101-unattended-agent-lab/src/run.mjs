import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { runScenario } from './platform.mjs'
import { checkTrace } from './check-trace.mjs'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const args = process.argv.slice(2)
const flag = name => {
  const index = args.indexOf(name)
  return index >= 0 ? args[index + 1] : undefined
}
const scenarioPath = args[0]
const workerName = flag('--worker') || 'stub'
const outArg = flag('--out')
if (!scenarioPath || scenarioPath.startsWith('--') || !outArg || outArg.startsWith('--') || !['stub', 'real'].includes(workerName)) {
  console.error('usage: npm run run -- <scenario.json> --worker stub|real --out <directory>')
  process.exit(2)
}

const scenario = JSON.parse(await readFile(path.resolve(scenarioPath), 'utf8'))
const contract = JSON.parse(await readFile(path.join(root, 'config', 'tool-contract.json'), 'utf8'))
const worker = await import(workerName === 'real' ? './real-worker.mjs' : './worker-stub.mjs')
const result = await runScenario({ scenario, contract, proposer: worker.propose, outDir: path.resolve(outArg) })
const check = checkTrace(result.events, contract)
console.log(JSON.stringify({ outcome: result.outcome, trace: result.tracePath, check }, null, 2))
if (!check.ok) process.exitCode = 1
