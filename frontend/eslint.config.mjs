import importPlugin from 'eslint-plugin-import';
import globals from 'globals';
import { configs as tsConfigs } from 'typescript-eslint';

export default [
  ...tsConfigs.recommended,

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
      'no-restricted-imports': [
        'error',
        { patterns: ['../*'] },
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
