import { typography } from '@/theme/typography';
import { padding } from '@/theme/spaces/padding';
import { gap } from '@/theme/spaces/gap';
import { iconSize } from '@/theme/sizes/iconSize';
import { borderWidth } from '@/theme/sizes/borderWidth';
import { radius } from '@/theme/sizes/radius';
import { coolColors } from '@/theme/colors/coolColors.ts';
import { warmColors } from '@/theme/colors/warmColors.ts';
import { darkColors } from '@/theme/colors/darkColors.ts';
import { flagSize } from '@/theme/sizes/flagSizes';

/**
 * Shared elements between themes
 */
const shared = {
  typography,
  spaces: { gap, padding },
  sizes: { borderWidth, iconSize, radius, flagSize },
} as const;

// TODO extend the type , what happens if dark or warm has extra keys , TS will fail
export type ThemeColors = typeof coolColors;

export type ColorsKeys = keyof typeof coolColors;

/**
 * Palettes of different kind of colors based on the Themes
 */
const palettes: Record<'cool' | 'warm' | 'dark', ThemeColors> = {
  cool: coolColors,
  warm: warmColors,
  dark: darkColors,
};

/**
 * coolTheme , shared elements plus cool color palette
 */
export const cool = { colors: palettes.cool, ...shared };

/**
 * warmTheme , shared elements plus warm color palette
 */
export const warm = { colors: palettes.warm, ...shared };

/**
 * darkTheme , shared elements plus dark color palette
 */
export const dark = { colors: palettes.dark, ...shared };

/**
 * Combination of themes of the app
 */
export const themes = { cool, warm, dark };

export type AppThemes = typeof themes;
export type ThemeName = keyof AppThemes;
