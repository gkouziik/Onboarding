export const fonts = {
  light: 'AnytimeSans-Light',
  lightItalic: 'AnytimeSans-LightItalic',
  regular: 'AnytimeSans-Regular',
  regularItalic: 'AnytimeSans-RegularItalic',
  bold: 'AnytimeSans-Bold',
  boldItalic: 'AnytimeSans-BoldItalic',
} as const;

export type FontName = (typeof fonts)[keyof typeof fonts];
