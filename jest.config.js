module.exports = {
  preset: '@react-native/jest-preset',
  setupFiles: ['react-native-unistyles/mocks', '<rootDir>/jest.setup.ts'],
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?|@react-navigation|react-native-unistyles|react-native-nitro-modules|react-native-safe-area-context|react-native-screens|react-native-config|react-native-svg)/)',
  ],
  testPathIgnorePatterns: ['/node_modules/', '/android/', '/ios/'],
  moduleNameMapper: {
    '\\.svg$': '<rootDir>/src/__mocks__/svgMock.js',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};
