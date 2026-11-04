module.exports = {
  preset: '@react-native/jest-preset',
  setupFiles: ['react-native-unistyles/mocks', '<rootDir>/jest.setup.ts'],
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?|@react-native-async-storage|@react-navigation|react-native-unistyles|react-native-nitro-modules|react-native-safe-area-context|react-native-screens|react-native-config|react-native-svg|react-native-reanimated|react-native-worklets|immer|@reduxjs/toolkit|redux|reselect|react-redux|i18next|react-i18next)/)',
  ],
  testPathIgnorePatterns: ['/node_modules/', '/android/', '/ios/'],
  moduleNameMapper: {
    '\\.svg$': '<rootDir>/src/__mocks__/svgMock.js',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};
