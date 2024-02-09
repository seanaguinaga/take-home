const CURRENCY = "USD";
const LOCALE = "en-US";
export function formatCurrency(
  value: number,
  locale: string = LOCALE,
  currency: string = CURRENCY
): string {
  const formatter = new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  });
  return formatter.format(value / 100);
}
