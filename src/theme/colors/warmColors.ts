import { primitiveColor } from './primitiveColor.ts';

export const warmColors = {
  palette: { ...primitiveColor },
  bg: primitiveColor.bg1,
  surface: primitiveColor.surface1,
  surface2: primitiveColor.surface4,

  border: primitiveColor.border1,
  borderStrong: primitiveColor.borderStrong1,

  text: primitiveColor.text1,
  text2: primitiveColor.text4,
  textMuted: primitiveColor.textMuted1,

  brand: primitiveColor.brand1,
  brandSubtle: primitiveColor.brandSubtle1,
} as const;
