jest.mock(
  'react-native-safe-area-context',
  () => require('react-native-safe-area-context/jest/mock').default,
);
require('react-native-reanimated').setUpTests();
import './src/theme/unistyles';
