import { StyleSheet } from 'react-native-unistyles';

export const styles = StyleSheet.create(theme => ({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: theme.spaces.padding['8'],
    backgroundColor: theme.colors.bg,
  },
  main: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spaces.gap['12'],
    minHeight: 12,
    paddingVertical: theme.spaces.padding['12'],
    paddingLeft: theme.spaces.padding['16'],
    paddingRight: theme.spaces.padding['8'],
  },
  pressed: {
    backgroundColor: theme.colors.surface,
  },
  text: {
    flex: 1,
  },
}));
