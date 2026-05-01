import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-plugin-prettier/recommended';
import globals from 'globals';

export default tseslint.config(
  // 1. Папки-исключения
  {
    ignores: ['dist', 'node_modules', 'public', 'vite.config.js'],
  },

  // 2. Базовые настройки для всех файлов
  js.configs.recommended,
  ...tseslint.configs.recommended,
  prettier, // Должен быть последним, чтобы отключать конфликтующие правила

  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      // Общие правила
      // 'no-console': 'warn',
      // 'warn' или 'error' меняем на 'off' для отладки
      'no-console': 'off',
      quotes: ['error', 'single'],
      semi: ['error', 'always'],
      'max-lines-per-function': ['error', { max: 800, skipBlankLines: true, skipComments: true }],
      // Настройка Prettier внутри ESLint
      'prettier/prettier': ['error'],
    },
  },

  // 3. Специфичные настройки только для TypeScript
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
    },
  },
);
