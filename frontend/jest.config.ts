import type { Config } from 'jest';

const config: Config = {
  testEnvironment: 'jsdom',

  // TextEncoder, TextDecoder polyfill을 가장 먼저 실행
  setupFiles: ['<rootDir>/src/jest.polyfill.ts'],

  // dom, msw 등의 테스트 셋업은 이 후에
  setupFilesAfterEnv: [
    '@testing-library/jest-dom',
    '<rootDir>/src/setupTests.ts',
  ],

  transform: {
    '^.+\\.(t|j)sx?$': [
      '@swc/jest',
      {
        jsc: {
          parser: {
            syntax: 'typescript',
            decorators: true,
          },
          transform: {
            react: {
              runtime: 'automatic',
            },
          },
        },
      },
    ],
  },

  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  testEnvironmentOptions: {
    customExportConditions: [''],
  },
};

export default config;
