// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import prettier from 'eslint-config-prettier';
import pluginImport from 'eslint-plugin-import';
import pluginReact from 'eslint-plugin-react';
import storybook from 'eslint-plugin-storybook';
import globals from 'globals';

export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    plugins: {
      js,
      import: pluginImport,
      '@typescript-eslint': tseslint,
      react: pluginReact,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest,
      },
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    // 🚨 'react/react-in-jsx-scope' 규칙을 'off'로 설정
    rules: {
      // JavaScript 기본 권장 규칙들
      ...js.configs.recommended.rules,

      // TypeScript ESLint 권장 규칙들
      ...tseslint.configs.recommended.rules,

      // React 권장 규칙들
      ...pluginReact.configs.recommended.rules,

      // 커스텀 규칙들
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' },
      ],
      // Jest 권장 규칙들
      'no-undef': 'warn',

      // emotion css prop를 쓰기 위한 규칙
      'react/no-unknown-property': ['error', { ignore: ['css'] }],
      indent: ['error', 2],
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
            'type',
          ],
          pathGroups: [
            // 1. 외부 라이브러리
            // 2. 상위 레이어 → 하위 레이어 순서 (FSD 아키텍처)
            {
              pattern: '@app/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '@pages/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '@widgets/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '@features/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '@entities/**',
              group: 'internal',
              position: 'before',
            },
            // 3. shared 하위 모듈들 (components, styles, types 제외)
            {
              pattern: '@shared/!(types)/**',
              group: 'internal',
              position: 'before',
            },
            // 4. shared 하위 types
            {
              pattern: '@shared/types/**',
              group: 'internal',
              position: 'before',
            },
            // 5. 스타일 파일들
            {
              pattern: '**/*.{css,styled.ts}',
              group: 'internal',
              position: 'before',
            },
            // 6. assets
            {
              pattern: '@icons/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '@image/**',
              group: 'internal',
              position: 'before',
            },
            // 7. mocks
            {
              pattern: '@mocks/**',
              group: 'internal',
              position: 'before',
            },
            // 8. config
            {
              pattern: '@config/**',
              group: 'internal',
              position: 'before',
            },
            // 9. storybook
            {
              pattern: '@sb/**',
              group: 'internal',
              position: 'before',
            },
          ],
          pathGroupsExcludedImportTypes: ['react'],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
    },
    // 🚨 ignore 설정
    ignores: ['**/node_modules/**', '**/dist/**', '**/build/**'],
  },
  ...storybook.configs['flat/recommended'],
  prettier,
];
