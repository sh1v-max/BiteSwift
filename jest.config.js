/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  // Components import their own CSS; Jest can't parse it, so map it to a stub.
  moduleNameMapper: {
    '\.(css)$': 'identity-obj-proxy',
    '\.(png|jpe?g|gif|svg|webp)$': '<rootDir>/src/__mocks__/fileMock.js',
  },
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  collectCoverageFrom: ['src/**/*.js', '!src/App.js', '!src/__tests__/**', '!src/__mocks__/**', '!src/mocks/**', '!src/components/_archive/**'],
  clearMocks: true,
}
