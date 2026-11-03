import { StyleSheet } from 'react-native-unistyles';

export const styles = StyleSheet.create(theme => ({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spaces.gap['8'],
    paddingHorizontal: theme.spaces.padding['16'],
  },
  search: {
    flex: 1,
  },
}));
