import { StyleSheet } from 'react-native-unistyles';

export const styles = StyleSheet.create(theme => ({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: theme.spaces.gap['12'],
    paddingVertical: theme.spaces.padding['8'],
  },
  value: {
    flexShrink: 1,
    textAlign: 'right',
  },
}));
