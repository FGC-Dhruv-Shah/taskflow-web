/** Collapse internal whitespace and lowercase `value`. */
export function normalizeText(value: string): string {
  if (!value || !value.trim()) {
    return "";
  }
  return value.trim().split(/\s+/).join(" ").toLowerCase();
}

/** Return the whole number of seconds between `start` and `end`. */
export function calculateDuration(start: Date, end: Date): number {
  return Math.floor((end.getTime() - start.getTime()) / 1000);
}

/** Render a currency amount as a human-readable string, e.g. `'$1,250.00'`. */
export function formatCurrency(currency: string, amount: number): string {
  const symbols: Record<string, string> = { USD: "$", EUR: "€", GBP: "£" };
  const symbol = symbols[currency] ?? `${currency} `;
  return `${symbol}${amount.toFixed(2)}`;
}

/** Render a 0-1 fraction as a percentage string, e.g. `0.42 -> '42%'`. */
export function formatPercentage(fraction: number): string {
  return `${Math.round(fraction * 100)}%`;
}

/** Convert `value` into a URL-safe slug, e.g. `'My Project!' -> 'my-project'`. */
export function slugify(value: string): string {
  const normalized = normalizeText(value);
  const cleaned = Array.from(normalized)
    .filter((ch) => /[a-z0-9 ]/i.test(ch))
    .join("");
  return cleaned.split(/\s+/).filter(Boolean).join("-");
}

/** Return the page of `items` for a 1-indexed `page`. */
export function paginate<T>(items: T[], page: number, pageSize: number): T[] {
  if (page < 1 || pageSize < 1) {
    return [];
  }
  const start = (page - 1) * pageSize;
  return items.slice(start, start + pageSize);
}

/** Render `date` as an ISO-8601 string, used for audit and report output. */
export function formatTimestamp(date: Date): string {
  return date.toISOString();
}

/** Return the number of whole days between `start` and `end`. */
export function daysBetween(start: Date, end: Date): number {
  return Math.floor((end.getTime() - start.getTime()) / (24 * 60 * 60 * 1000));
}

/** Clamp `value` to the inclusive range [min, max]. */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
