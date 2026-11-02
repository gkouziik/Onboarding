import { StyleSheet } from 'react-native-unistyles';

export const styles = StyleSheet.create(theme => ({
  card: {
    margin: theme.spaces.padding['16'],
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerText: {
    flex: 1,
    gap: theme.spaces.gap['4'],
  },
  chevron: {
    transform: [{ rotate: '0deg' }],
  },
  chevronExpanded: {
    transform: [{ rotate: '90deg' }],
  },
  section: {
    gap: theme.spaces.gap['4'],
  },
}));
