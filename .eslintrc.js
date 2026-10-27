module.exports = {
  root: true,
  extends: '@react-native',
  overrides: [
    {
      files: [
        'jest.setup.{js,ts}',
        '__mocks__/**/*.{js,ts}',
        '**/__tests__/**/*.{js,ts,tsx}',
        '**/*.test.{js,ts,tsx}',
      ],
      env: { jest: true },
    },
  ],
};
