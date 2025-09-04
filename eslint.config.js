import js from '@eslint/js'
import tseslint from 'typescript-eslint'

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: tseslint.parser
    },
    rules: {
      semi: ['error', 'never'],
      quotes: ['error', 'single'],
      indent: ['error', 2],
      'no-unused-vars': ['error', { args: 'none', ignoreRestSiblings: true }],
      'space-before-function-paren': ['error', 'always'],
      'keyword-spacing': ['error', { before: true, after: true }],
      'comma-dangle': ['error', 'never'],
      'no-multi-spaces': 'error',
      'no-trailing-spaces': 'error',
      'object-curly-spacing': ['error', 'always'],
      'array-bracket-spacing': ['error', 'never'],
      'eol-last': ['error', 'always'],
      'no-var': 'error',
      'prefer-const': 'error',
      'eqeqeq': ['error', 'always'],
      'no-extra-semi': 'error',
      'arrow-spacing': ['error', { before: true, after: true }],
      'space-infix-ops': 'error',
      'spaced-comment': ['error', 'always', { markers: ['/'] }],
      'no-multiple-empty-lines': ['error', { max: 1 }],
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }]
    }
  }
]
