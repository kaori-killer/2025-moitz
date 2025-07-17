import importPlugin from 'eslint-plugin-import';
import tseslint from 'typescript-eslint';
import globals from 'globals';

export default [
  // TypeScript 추천 규칙
  ...tseslint.configs.recommended,

  // eslint-plugin-import Flat Config 추천 규칙
  importPlugin.flatConfigs.recommended,
  importPlugin.flatConfigs.typescript,

  {
    files: ['**/*.{ts,tsx,js,jsx,mjs,cjs}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.browser,
    },
    rules: {
      // ✅ import 관련 규칙들
      'import/extensions': [
        'error',
        'ignorePackages',
        { checkTypeImports: true },
      ],
      'import/newline-after-import': 'error',
      'import/no-duplicates': 'error',
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            ['parent', 'sibling', 'index'],
            'object',
            'type',
          ],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
          pathGroups: [
            { pattern: '@/**', group: 'internal', position: 'before' },
          ],
          pathGroupsExcludedImportTypes: ['builtin'],
        },
      ],
      // ✅ Flat Config 스펙에 맞게 수정
      'no-restricted-imports': [
        'error',
        { patterns: ['../*'] }, // ✅ 메시지 제거
      ],
    },
    settings: {
      'import/resolver': {
        typescript: {},
        node: { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
      },
    },
    ignores: ['**/node_modules/**', '**/dist/**', '**/build/**'],
  },
];
