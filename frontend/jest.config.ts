import type { Config } from 'jest';

const config: Config = {
  // 테스트 환경: 브라우저 환경 시뮬레이션
  testEnvironment: 'jsdom',

  // TextEncoder, TextDecoder 등 브라우저 전역 객체 polyfill
  setupFiles: ['<rootDir>/src/jest.polyfill.ts'],

  // jest-dom, MSW 등 테스트 도구 셋업
  setupFilesAfterEnv: [
    '@testing-library/jest-dom',
    '<rootDir>/src/setupTests.ts',
  ],

  // SWC 사용 (Babel 대체, 빠른 테스트 실행)
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
              runtime: 'automatic', // Emotion 사용 시에도 적절
            },
          },
        },
      },
    ],
  },

  // ESM 지원 확장자
  extensionsToTreatAsEsm: ['.ts', '.tsx'],

  // Jest에서 사용하는 module export 조건
  testEnvironmentOptions: {
    customExportConditions: [''],
  },

  // 경로 alias + CSS mocking
  moduleNameMapper: {
    // CSS Modules
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
    // 일반 CSS
    '^.+\\.(css|sass|scss)$': '<rootDir>/src/mocks/styleMock.ts',
    // SVG
    '^.+\\.svg$': '<rootDir>/src/mocks/svgMock.ts',

    // tsconfig.json과 맞춘 alias 경로
    '^@app/(.*)$': '<rootDir>/src/app/$1',
    '^@pages/(.*)$': '<rootDir>/src/pages/$1',
    '^@widgets/(.*)$': '<rootDir>/src/widgets/$1',
    '^@features/(.*)$': '<rootDir>/src/features/$1',
    '^@shared/(.*)$': '<rootDir>/src/shared/$1',
    '^@shared/components/(.*)$': '<rootDir>/src/shared/components/$1',
    '^@shared/styles/(.*)$': '<rootDir>/src/shared/styles/$1',
    '^@shared/types/(.*)$': '<rootDir>/src/shared/types/$1',
    '^@icons/(.*)$': '<rootDir>/assets/icon/$1',
  },
};

export default config;
