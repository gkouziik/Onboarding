import { StyleSheet } from 'react-native-unistyles';

export const styles = StyleSheet.create(theme => ({
  container: {
    minHeight: 44,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spaces.gap['8'],
    paddingLeft: theme.spaces.padding['12'],
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border,
    borderWidth: 1,
    borderRadius: theme.sizes.radius['32'],
  },
  input: {
    flex: 1,
    paddingVertical: theme.spaces.padding['8'],
    ...theme.typography.p1,
    color: theme.colors.text,
  },
}));
