import { StyleSheet } from 'react-native-unistyles';

export const styles = StyleSheet.create(theme => ({
  flag: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderRadius: theme.sizes.radius['12'],
    backgroundColor: theme.colors.border,
    variants: {
      size: {
        sm: theme.sizes.flagSize.sm,
        lg: theme.sizes.flagSize.lg,
      },
    },
  },
}));
