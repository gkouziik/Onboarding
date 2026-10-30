import { Value } from '@/components/InfoRow/types.ts';
import { EMPTY } from '@/components/InfoRow/constants.ts';

/**
 * Turns a value into display text: arrays are joined,
 * missing values become "—"
 * */
export function formatInfoValue(value: Value): string {
  if (Array.isArray(value)) {
    const items = value.filter(Boolean);
    return items.length > 0 ? items.join(', ') : EMPTY;
  }
  return value ? value : EMPTY;
}
