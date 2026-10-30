import { StyleSheet } from 'react-native-unistyles';

export const styles = StyleSheet.create(theme => ({
  card: {
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: theme.sizes.radius['32'],
    padding: theme.spaces.padding['16'],
    gap: theme.spaces.gap['12'],
  },
}));
