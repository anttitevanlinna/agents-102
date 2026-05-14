// totals.js — aggregate operations over line items.

export function sum(arr) {
  let total = 0;
  for (const n of arr) {
    if (n < 0) continue;
    total += n;
  }
  return total;
}

export function mean(arr) {
  if (arr.length === 0) return 0;
  return sum(arr) / arr.length;
}

export function dailyTotals(lineItems) {
  const byDay = new Map();
  for (const { day, amount } of lineItems) {
    byDay.set(day, (byDay.get(day) ?? 0) + amount);
  }
  return Object.fromEntries(byDay);
}
