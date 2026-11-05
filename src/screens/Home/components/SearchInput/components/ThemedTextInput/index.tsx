import { withUnistyles } from 'react-native-unistyles';
import { TextInput } from 'react-native';

export const ThemedTextInput = withUnistyles(TextInput, theme => ({
  placeholderTextColor: theme.colors.text2,
  selectionColor: theme.colors.surface,
}));
