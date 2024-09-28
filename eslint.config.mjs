import deprecation from 'eslint-plugin-deprecation';
import prettier from 'eslint-plugin-prettier';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    ignores: [
      'projects/**/*',
      'src/test.ts',
      'src/typings.d.ts',
      'src/main.ts',
      'src/polyfills.ts',
      'src/**/*.spec.ts',
    ],
  },
  {
    plugins: {
      deprecation,
      prettier,
    },
  },
  {
    files: ['**/*.js'],

    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'script',
    },
  },
  ...compat
    .extends(
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:@angular-eslint/recommended',
      'plugin:@angular-eslint/template/process-inline-templates',
      'plugin:prettier/recommended'
    )
    .map(config => ({
      ...config,
      files: ['**/*.ts'],
    })),
  {
    files: ['**/*.ts'],

    languageOptions: {
      ecmaVersion: 5,
      sourceType: 'script',

      parserOptions: {
        project: ['tsconfig.json'],
        createDefaultProgram: true,
      },
    },

    rules: {
      'no-console': 'error',
      'default-case': 'error',
      'semi': 'off',
      '@typescript-eslint/semi': ['error'],
      'prefer-const': 'error',

      '@typescript-eslint/explicit-member-accessibility': [
        'off',
        {
          accessibility: 'explicit',
        },
      ],

      'arrow-parens': ['off', 'always'],
      'deprecation/deprecation': 'warn',
      'import/order': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
  ...compat.extends('plugin:@angular-eslint/template/recommended').map(config => ({
    ...config,
    files: ['**/*.html'],
  })),
  {
    files: ['**/*.html'],
    rules: {},
  },
  ...compat.extends('plugin:prettier/recommended').map(config => ({
    ...config,
    files: ['**/*.html'],
    ignores: ['**/*inline-template-*.component.html'],
  })),
  {
    files: ['**/*.html'],
    ignores: ['**/*inline-template-*.component.html'],

    rules: {
      'prettier/prettier': [
        'error',
        {
          parser: 'angular',
        },
      ],
    },
  },
];
