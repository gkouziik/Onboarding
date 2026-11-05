import { StyleSheet } from 'react-native-unistyles';

export const styles = StyleSheet.create(theme => ({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
    padding: 24,
    backgroundColor: theme.colors.bg,
  },
  input: {
    width: 160,
    textAlign: 'center',
    fontSize: 24,
    letterSpacing: 12,
    paddingVertical: 12,
    borderBottomWidth: 2,
    borderColor: theme.colors.border,
    color: theme.colors.text,
  },
  error: {
    color: theme.colors.danger,
  },
}));
