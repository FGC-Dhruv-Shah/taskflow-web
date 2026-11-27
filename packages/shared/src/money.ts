/** Round a monetary amount to two decimal places, away from floating-point noise. */
export function roundToCents(amount: number): number {
  return Math.round(amount * 100) / 100;
}

/** Return whether `amount` is a usable positive monetary value. */
export function isPositiveAmount(amount: number): boolean {
  return Number.isFinite(amount) && amount > 0;
}
