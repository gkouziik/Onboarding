import { Currency } from '@/utils/types.ts';

/**
 * Formats a numeric value into a compact, human-readable string
 * @param value - The numeric value to format
 * @returns The formatted value as a string (e.g "1.5K")
 */
export const formatCompact = (value: number): string => {
  if (value >= 1e9) {
    return `${(value / 1e9).toFixed(1)}B`;
  }
  if (value >= 1e6) {
    return `${(value / 1e6).toFixed(1)}M`;
  }
  if (value >= 1e3) {
    return `${(value / 1e3).toFixed(1)}K`;
  }
  return String(Math.round(value));
};

/**
 * Formats a currency object into a human-readable string containing
 * its name, currency code, and optionally its symbol.
 * @param currency - The currency information to format.
 * @param code - The currency code "EUR".
 * @param name - The full currency name.
 * @param symbol - The currency symbol "€".
 * @returns A formatted currency string containing its name, code, and optionally symbol
 **/
function formatCurrency({ code, name, symbol }: Currency): string {
  return symbol ? `${name} (${code}, ${symbol})` : `${name} (${code})`;
}

export default formatCurrency;
