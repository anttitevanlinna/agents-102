# daily-totals

Internal Node library for daily reporting totals.

## Modules

- `src/totals.js` — `sum`, `mean`, `dailyTotals`.
- `src/adjustments.js` — adjustment-line parsing.
- `src/index.js` — public surface.

## Run the tests

```
npm test
```

Node 20+. No runtime dependencies.

## Notes

Daily totals are computed across line items pulled from the warehouse extract. Negative line items represent adjustments (returns, corrections) and reduce the day's total.

Owner: data-platform.
