import { StyleSheet } from 'react-native-unistyles';

export const styles = StyleSheet.create(theme => ({
  chip: {
    minHeight: 36,
    justifyContent: 'center',
    paddingHorizontal: theme.spaces.padding['12'],
    borderRadius: theme.sizes.radius['999'],
    borderWidth: 1,
    variants: {
      selected: {
        true: {
          backgroundColor: theme.colors.surface2,
          borderColor: theme.colors.borderStrong,
        },
        false: {
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.border,
        },
      },
    },
  },
  pressed: {
    opacity: 0.7,
  },
}));
