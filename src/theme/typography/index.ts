import { fontSizes } from './fontSizes.ts';
import { fonts } from './fonts.ts';
import { letterSpacing } from './letterSpacing.ts';
import { lineHeight } from './lineHeight.ts';

export const typography = {
  fonts,
  fontSizes,
  lineHeight,
  letterSpacing,
  h1: {
    fontFamily: fonts.bold,
    fontSize: fontSizes['32'],
    lineHeight: lineHeight['40'],
    letterSpacing: letterSpacing['0'],
  },
  h2: {
    fontFamily: fonts.bold,
    fontSize: fontSizes['24'],
    lineHeight: lineHeight['34'],
    letterSpacing: letterSpacing['0_25'],
  },
  h3: {
    fontFamily: fonts.bold,
    fontSize: fontSizes['20'],
    lineHeight: lineHeight['30'],
    letterSpacing: letterSpacing['0_25'],
  },
  h4: {
    fontFamily: fonts.bold,
    fontSize: fontSizes['17'],
    lineHeight: lineHeight['20'],
    letterSpacing: letterSpacing['0_25'],
  },
  h5: {
    fontFamily: fonts.bold,
    fontSize: fontSizes['15'],
    lineHeight: lineHeight['17'],
    letterSpacing: letterSpacing['0_25'],
  },
  h6: {
    fontFamily: fonts.bold,
    fontSize: fontSizes['12'],
    lineHeight: lineHeight['16'],
    letterSpacing: letterSpacing['0_25'],
  },
  p1: {
    fontFamily: fonts.regular,
    fontSize: fontSizes['17'],
    lineHeight: lineHeight['24'],
    letterSpacing: letterSpacing['0_25'],
  },
  p2: {
    fontFamily: fonts.regular,
    fontSize: fontSizes['15'],
    lineHeight: lineHeight['20'],
    letterSpacing: letterSpacing['0_25'],
  },
  p3: {
    fontFamily: fonts.regular,
    fontSize: fontSizes['12'],
    lineHeight: lineHeight['16'],
    letterSpacing: letterSpacing['0_25'],
  },
};

export type TypographyVariant = Exclude<
  keyof typeof typography,
  'fonts' | 'fontSizes' | 'lineHeight' | 'letterSpacing'
>;
