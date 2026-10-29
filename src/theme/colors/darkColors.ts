import { primitiveColor } from './primitiveColor.ts';

export const darkColors = {
  palette: { ...primitiveColor },
  bg: primitiveColor.bg3,
  surface: primitiveColor.surface3,
  surface2: primitiveColor.surface6,

  border: primitiveColor.border3,
  borderStrong: primitiveColor.borderStrong3,

  text: primitiveColor.text3,
  text2: primitiveColor.text6,
  textMuted: primitiveColor.textMuted3,

  brand: primitiveColor.brand3,
  brandSubtle: primitiveColor.brandSubtle3,
} as const;
