module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    'no-console': 'off',
    'no-optional-chaining': 'off',
    'no-undefined': 'off',
    'no-unused-vars': 'warn',
    'no-restricted-syntax': [
      'error',
      {
        selector: "BinaryExpression[operator=!=]",
        message: "Use !== instead of !==="
      },
    ],
  },
};