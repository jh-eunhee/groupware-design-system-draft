module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react-hooks/recommended',
    'plugin:react-refresh/recommended',
  ],
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
  },
}
