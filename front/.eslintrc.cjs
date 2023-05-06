/** @type {import('eslint').Linter.Config} */
const config = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  extends: [
    'airbnb-base',
    'airbnb-typescript/base',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:solid/typescript',
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
    'arrow-body-style': 'off',
    'import/extensions': 'off',
    // TypeScript
    // '@typescript-eslint/explicit-function-return-type': 'error',
    '@typescript-eslint/no-misused-promises': [
      'error',
      {
        checksVoidReturn: {
          attributes: false,
        },
      },
    ],
    '@typescript-eslint/typedef': [
      'error',
      {
        parameter: true,
        propertyDeclaration: true,
        // variableDeclaration: true,
      },
    ],
  },
};

module.exports = config;
