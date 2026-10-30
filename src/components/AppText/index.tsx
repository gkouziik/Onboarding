import { Text, TextProps } from 'react-native';

import { TypographyVariant } from '@/theme/typography';
import { ColorsKeys } from '@/theme/theme.ts';
import { styles } from '@/components/AppText/styles.ts';

interface AppTextProps extends TextProps {
  /**
   * Typography style from the theme
   */
  variant?: TypographyVariant;
  /**
   * Theme color key
   */
  color?: ColorsKeys;
}

/**
 * Themed text component. All text components in the app go through this
 * text component so fonts, sizes and colors come from the active theme.
 */
export function AppText({
  variant = 'p1',
  color = 'text' as ColorsKeys,
  style,
  ...rest
}: AppTextProps) {
  return <Text style={[styles.text(variant, color), style]} {...rest} />;
}
