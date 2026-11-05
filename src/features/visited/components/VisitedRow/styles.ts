import { StyleSheet } from 'react-native-unistyles';

export const ACTION_WIDTH = 96;

export const styles = StyleSheet.create(theme => ({
  container: {
    backgroundColor: theme.colors.danger,
  },
  rowBackground: {
    backgroundColor: theme.colors.bg,
  },
  action: {
    width: ACTION_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.danger,
  },
  actionLabel: {
    color: theme.colors.onDanger,
    fontWeight: '600',
  },
}));
