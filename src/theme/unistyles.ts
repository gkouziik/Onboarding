import { StyleSheet } from 'react-native-unistyles';

import { type AppThemes, themes } from '@/theme/theme.ts';

declare module 'react-native-unistyles' {
  export interface UnistylesThemes extends AppThemes {}
}

StyleSheet.configure({
  themes: themes,
  settings: { initialTheme: 'cool' },
});
