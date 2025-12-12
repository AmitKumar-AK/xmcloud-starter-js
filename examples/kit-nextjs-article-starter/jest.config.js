const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^components/(.*)$': '<rootDir>/src/components/$1',
    '^shadcd/(.*)$': '<rootDir>/shadcn/$1',
    '^lib/(.*)$': '<rootDir>/src/lib/$1',
    '^temp/(.*)$': '<rootDir>/src/temp/$1',
    '^assets/(.*)$': '<rootDir>/src/assets/$1',
    '^enumerations/(.*)$': '<rootDir>/src/enumerations/$1',
    '^types/(.*)$': '<rootDir>/src/types/$1',
    '^graphql-types$': '<rootDir>/node_modules/@types/graphql-let/__generated__/__types__',
    '^react$': '<rootDir>/node_modules/react',
    '^@/tw/(.*)$': '<rootDir>/tailwind-config/$1',
  },
  testEnvironment: 'jest-environment-jsdom',
  testMatch: [
    '**/tests/**/*.(test|spec).(ts|tsx|js)',
    '**/__tests__/**/*.(test|spec).(ts|tsx|js)',
    '**/*.(test|spec).(ts|tsx|js)'
  ],
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/**/*.d.ts', '!src/**/*.stories.{ts,tsx}'],
};

module.exports = createJestConfig(customJestConfig);
