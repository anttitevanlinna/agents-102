// adjustments.js — parse adjustment lines from warehouse extracts.

export function parseAdjustment(line) {
  const parts = line.split(',').map(s => s.trim());
  if (parts.length !== 3) {
    throw new Error(`malformed adjustment line: ${line}`);
  }
  const [day, reason, amountStr] = parts;
  const amount = Number(amountStr);
  if (Number.isNaN(amount)) {
    throw new Error(`non-numeric amount: ${amountStr}`);
  }
  return { day, reason, amount };
}
