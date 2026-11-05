import { StyleSheet } from 'react-native-unistyles';

export const styles = StyleSheet.create(theme => ({
  title: {
    paddingHorizontal: theme.spaces.padding['16'],
    paddingVertical: theme.spaces.padding['12'],
  },
  emptyContent: {
    flexGrow: 1,
  },
}));
