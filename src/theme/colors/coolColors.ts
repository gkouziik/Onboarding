import { primitiveColor } from './primitiveColor.ts';

export const coolColors = {
  palette: { ...primitiveColor },

  bg: primitiveColor.bg2,
  surface: primitiveColor.surface2,
  surface2: primitiveColor.surface5,

  border: primitiveColor.border2,
  borderStrong: primitiveColor.borderStrong2,

  text: primitiveColor.text2,
  text2: primitiveColor.text5,
  textMuted: primitiveColor.textMuted2,

  brand: primitiveColor.brand2,
  brandSubtle: primitiveColor.brandSubtle2,
} as const;
