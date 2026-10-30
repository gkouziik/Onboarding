import { StyleSheet } from 'react-native-unistyles';
import { TypographyVariant } from '@/theme/typography';
import { ColorsKeys } from '@/theme/theme.ts';

export const styles = StyleSheet.create(theme => ({
  text: (variant: TypographyVariant, color: ColorsKeys) => ({
    ...theme.typography[variant],
    color: color,
  }),
}));
