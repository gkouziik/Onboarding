import { StyleSheet } from 'react-native-unistyles';

export const styles = StyleSheet.create(theme => ({
  scroll: {
    flexGrow: 0,
  },
  tabs: {
    gap: theme.spaces.gap['8'],
    paddingHorizontal: theme.spaces.padding['16'],
    paddingVertical: theme.spaces.padding['8'],
  },
}));
