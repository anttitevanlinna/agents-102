import { createHash } from 'node:crypto'
import { mkdir, open } from 'node:fs/promises'
import path from 'node:path'

export async function claimOnce(outDir, idempotencyKey) {
  const claimsDir = path.join(outDir, 'runtime', 'claims')
  await mkdir(claimsDir, { recursive: true })
  const name = createHash('sha256').update(idempotencyKey).digest('hex')
  const claimPath = path.join(claimsDir, name)
  try {
    const handle = await open(claimPath, 'wx')
    await handle.writeFile(`${idempotencyKey}\n`)
    await handle.close()
    return { claimed: true, claimPath }
  } catch (error) {
    if (error.code === 'EEXIST') return { claimed: false, claimPath }
    throw error
  }
}
