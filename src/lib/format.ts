/** Schweizer Frankenformat: CHF 1'234.50 */
export function formatCHF(value: number): string {
  return new Intl.NumberFormat("de-CH", {
    style: "currency",
    currency: "CHF",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

/** m² mit Schweizer Tausendertrennung */
export function formatM2(value: number): string {
  return `${new Intl.NumberFormat("de-CH").format(value)} m²`;
}
