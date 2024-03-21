module.exports = {
  root: true,
  extends: ['@react-native', 'plugin:react/jsx-runtime'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'no-console': 'off',
    'react-native/no-inline-styles': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    'react/no-unstable-nested-components': 'off',
  },
};
