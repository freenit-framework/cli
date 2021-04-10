const eslintConfig = {
  parser: 'babel-eslint',
  extends: ['prettier'],
  plugins: ['prettier'],
  env: {
    browser: true,
  },
}

module.exports = eslintConfig
