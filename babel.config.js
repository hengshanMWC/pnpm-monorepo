module.exports = function (api) {
  api.cache(true)
  const options = {
    presets: [
      "@babel/env"
    ],
    plugins: [
      '@babel/proposal-class-properties',
      '@babel/transform-runtime'
    ],
  }
  return {
    ...options,
    env: {
      test: options
    }
  }
}