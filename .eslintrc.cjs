module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'standard-with-typescript',
    'plugin:@typescript-eslint/recommended',
    'eslint-config-prettier'
  ],
  overrides: [
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['tsconfig.json', 'tsconfig.eslint.json'],
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  
  plugins: [
    'react',
    'react-refresh'
  ],
  rules: {
    'react-refresh/only-export-components': 'warn',
    '@typescript-eslint/explicit-function-return-type': 'off'
  }
}
