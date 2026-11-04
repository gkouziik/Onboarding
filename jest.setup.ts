import './src/theme/unistyles';
import './src/i18n';

jest.mock(
  'react-native-safe-area-context',
  () => require('react-native-safe-area-context/jest/mock').default,
);

jest.mock('react-native-worklets', () =>
  require('react-native-worklets/lib/module/mock'),
);

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest'),
);

jest.mock('react-native-reanimated', () => {
  const { View } = require('react-native');

  return {
    __esModule: true,
    default: { View },
    useSharedValue: <T>(initial: T) => ({ value: initial }),
    withTiming: <T>(toValue: T) => toValue,
    useAnimatedStyle: <T>(updater: () => T) => updater(),
  };
});
