import { StyleSheet } from 'react-native-unistyles';

const BACKDROP_COLOR = 'rgba(0, 0, 0, 0.4)';
const RADIO_SIZE = 20;

export const styles = StyleSheet.create(theme => ({
  backdrop: {
    flex: 1,
    justifyContent: 'center',
    padding: theme.spaces.padding['24'],
    backgroundColor: BACKDROP_COLOR,
  },
  sheet: {
    gap: theme.spaces.gap['8'],
    padding: theme.spaces.padding['16'],
    borderRadius: theme.sizes.radius['24'],
    backgroundColor: theme.colors.surface,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spaces.gap['12'],
  },
  radio: {
    width: RADIO_SIZE,
    height: RADIO_SIZE,
    borderRadius: RADIO_SIZE / 2,
    borderWidth: 2,
    borderColor: theme.colors.text2,
  },
  radioSelected: {
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.border,
  },
}));
