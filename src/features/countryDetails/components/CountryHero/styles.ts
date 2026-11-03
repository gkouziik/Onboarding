import { StyleSheet } from 'react-native-unistyles';

export const styles = StyleSheet.create(theme => ({
  container: {
    alignItems: 'center',
    gap: theme.spaces.gap['8'],
    paddingVertical: theme.spaces.padding['16'],
  },
  center: {
    textAlign: 'center',
  },
}));
