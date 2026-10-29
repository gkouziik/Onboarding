import { primitiveSize } from '../primitiveSize.ts';

export const radius = {
  '0': primitiveSize['0'],
  '4': primitiveSize['4'],
  '8': primitiveSize['8'],
  '12': primitiveSize['12'],
  '16': primitiveSize['16'],
  '24': primitiveSize['24'],
  '32': primitiveSize['32'],
  '999': primitiveSize['999'],
} as const;
