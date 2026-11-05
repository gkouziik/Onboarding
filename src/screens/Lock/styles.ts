import { StyleSheet } from 'react-native-unistyles';

export const styles = StyleSheet.create(theme => ({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: theme.colors.bg,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
    padding: 24,
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
  biometricButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
}));
