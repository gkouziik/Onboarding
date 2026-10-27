import { StyleSheet } from 'react-native-unistyles';

const temp = {
  colors: { background: '#111', text: '#435' },
};

type AppThemes = { temp: typeof temp };

declare module 'react-native-unistyles' {
  export interface UnistylesThemes extends AppThemes {}
}

StyleSheet.configure({
  themes: { temp },
  settings: { initialTheme: 'temp' },
});
