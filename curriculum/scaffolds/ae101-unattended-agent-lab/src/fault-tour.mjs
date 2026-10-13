import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { faults, verdict } from './faults.mjs'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const contract = JSON.parse(await readFile(path.join(root, 'config', 'tool-contract.json'), 'utf8'))
const all = faults(contract)

const selected = process.argv[2]
const chosen = selected ? all.filter(fault => fault.name === selected) : all
if (chosen.length === 0) {
  console.error(`unknown fault: ${selected}`)
  console.error(`known faults: ${all.map(fault => fault.name).join(', ')}`)
  process.exit(2)
}

let failed = false
for (const fault of chosen) {
  const result = fault.run()
  const ok = verdict(fault, result)
  if (!ok) failed = true
  console.log(`${fault.name}: ${ok ? 'PREVENTED' : 'NOT PREVENTED'}`)
  console.log(`  invariant: ${fault.invariant}`)
  console.log(`  reason:    ${result.reason ?? '(none, the boundary accepted it)'}`)
  if (result.reason !== fault.expected) console.log(`  expected:  ${fault.expected}`)
  console.log(`  before:    ${JSON.stringify(result.before)}`)
  console.log(`  after:     ${JSON.stringify(result.after)}${result.unchanged ? ' (unchanged)' : ' (CHANGED)'}`)
  console.log('')
}
if (failed) process.exitCode = 1
