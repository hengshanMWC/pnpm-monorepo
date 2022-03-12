module.exports = {
  "preset": "ts-jest",
  "transform": {
    "^.+\\.(js|jsx)$": "babel-jest"
  },
  "testMatch": [
    '<rootDir>/packages/**/__tests__/*.test.ts'
  ]
}