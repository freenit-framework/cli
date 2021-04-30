const eslintConfig = {
  parser: '@babel/eslint-parser',
  parserOptions: {
    requireConfigFile: false,
  },
  extends: ['prettier'],
  plugins: ['prettier'],
  env: {
    browser: true,
  },
}

module.exports = eslintConfig
