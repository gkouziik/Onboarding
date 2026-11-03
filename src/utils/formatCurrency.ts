import { Currency } from '@/utils/types.ts';

/**
 * "Euro (EUR, €)" or "Euro (EUR)" when there is no symbol.
 */
export function formatCurrency({ code, name, symbol }: Currency): string {
  return symbol ? `${name} (${code}, ${symbol})` : `${name} (${code})`;
}
