import { StyleSheet } from 'react-native-unistyles';

export const styles = StyleSheet.create(theme => ({
  button: {
    minHeight: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spaces.gap['8'],
    paddingHorizontal: theme.spaces.padding['16'],
    borderRadius: theme.sizes.radius['24'],
    variants: {
      variant: {
        primary: { backgroundColor: theme.colors.brand },
        secondary: {
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: theme.colors.border,
        },
        danger: { backgroundColor: theme.colors.borderStrong },
      },
      disabled: {
        true: { opacity: 0.5 },
        false: {},
      },
    },
  },
  pressed: {
    opacity: 0.8,
  },
}));
