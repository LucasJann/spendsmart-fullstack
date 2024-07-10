module.exports = {
  maxWorkers: 1,
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|webp|svg)$": "<rootDir>/fileMock.ts",
    "\\.(css|less|scss)$": "identity-obj-proxy",
  },
  transformIgnorePatterns: [
    '<rootDir>/node_modules/(?!(jest-)?react-native|@react-native-community|@react-navigation)',
  ],
};
