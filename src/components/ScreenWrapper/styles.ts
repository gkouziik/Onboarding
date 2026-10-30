import { StyleSheet } from 'react-native-unistyles';

export const styles = StyleSheet.create((theme, rt) => ({
  base: {
    flex: 1,
    backgroundColor: theme.colors.bg,
  },
  insets: (top: boolean, bottom: boolean) => ({
    paddingTop: top ? rt.insets.top : 0,
    paddingBottom: bottom ? rt.insets.bottom : 0,
  }),
}));
