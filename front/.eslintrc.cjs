/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  env: {
    browser: true,
    es2017: true,
    node: true,
  },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:react/jsx-runtime',
    'prettier',
  ],
  overrides: [
    {
      files: ['.eslintrc.cjs', '.prettierrc.cjs', '*.config.cjs'],
      env: {
        node: true,
      },
    },
  ],
  rules: {
    // ESLint
    // 'import/extensions': 'off',
    // TypeScript
    // '@typescript-eslint/explicit-function-return-type': 'error',
    // '@typescript-eslint/typedef': [
    //   'error',
    //   {
    //     parameter: true,
    //     propertyDeclaration: true,
    //     variableDeclaration: true,
    //   },
    // ],
  },
};
