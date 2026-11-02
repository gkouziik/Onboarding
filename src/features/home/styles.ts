import { StyleSheet } from 'react-native-unistyles';

export const styles = StyleSheet.create(theme => ({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    backgroundColor: theme.colors.bg,
    paddingHorizontal: 20,
  },
  text: { ...theme.typography.p1, color: theme.colors.text },
  button: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  searchContainer: {
    marginLeft: 16,
  },
}));
