import { withUnistyles } from 'react-native-unistyles';
import { ActivityIndicator } from 'react-native';

export const ThemedActivityIndicator = withUnistyles(
  ActivityIndicator,
  theme => ({
    color: theme.colors.borderStrong,
  }),
);
