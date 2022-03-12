
module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    jest: true
  },
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
  ],
  rules: {
    'no-unused-vars': [
      'error',
      // 用来放开ts例如：(test: any) => any,
      // 类型报is defined but never used.eslintno-unused-vars
      { args: 'none' }
    ],
  },
}

