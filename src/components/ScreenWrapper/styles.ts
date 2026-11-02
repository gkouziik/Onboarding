import { StyleSheet } from 'react-native-unistyles';

export const styles = StyleSheet.create((theme, rt) => ({
  base: {
    flex: 1,
    backgroundColor: theme.colors.bg,
    paddingHorizontal: 16,
  },
  insets: (top: boolean, bottom: boolean) => ({
    paddingTop: top ? rt.insets.top : 0,
    paddingBottom: bottom ? rt.insets.bottom : 0,
  }),
}));
