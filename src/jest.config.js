// jest.config.js para Windows
module.exports = {
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
  },
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },
  transformIgnorePatterns: [
    '/node_modules/',
    '^.+\\.module\\.(css|sass|scss)$',
  ],
  moduleDirectories: ['node_modules', '<rootDir>'],
  globals: {
    // Esto puede ser necesario para algunos entornos
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.jest.json',
    },
  },
};