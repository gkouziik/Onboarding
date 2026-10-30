import { StyleSheet } from 'react-native-unistyles';

export const styles = StyleSheet.create(theme => ({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spaces.gap['8'],
    padding: theme.spaces.padding['24'],
  },
  center: {
    textAlign: 'center',
  },
}));
