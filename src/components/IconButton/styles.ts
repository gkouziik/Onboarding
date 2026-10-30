import { StyleSheet } from 'react-native-unistyles';

export const styles = StyleSheet.create(theme => ({
  button: {
    width: theme.sizes.iconSize['40'],
    height: theme.sizes.iconSize['40'],
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.sizes.radius['999'],
  },
  pressed: {
    opacity: 0.6,
  },
  disabled: {
    opacity: 0.4,
  },
}));
