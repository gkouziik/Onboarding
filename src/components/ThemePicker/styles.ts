import { StyleSheet } from 'react-native-unistyles';

export const styles = StyleSheet.create(theme => ({
  anchor: {
    position: 'relative',
    zIndex: 10,
  },
  dropdown: {
    position: 'absolute',
    top: '100%',
    right: 0,
    marginTop: 4,
    minWidth: 160,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: theme.colors.surface,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.border,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  radio: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: theme.colors.border,
  },
  radioSelected: {
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.border,
  },
}));
