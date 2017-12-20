module.exports = {
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testRegex: '(\\.(test|spec))\\.(ts|tsx|js)$',
  moduleFileExtensions: [
    'js',
    'ts',
    'tsx',
    'json',
    'node',
  ],
  moduleNameMapper: {
    '\\.(png|jpg|svg|woff|woff2|ico|css|scss)$': '<rootDir>/test/setup/file-mock.ts',
  },
  setupFiles: [
    '<rootDir>/test/shim.ts',
  ],
  setupTestFrameworkScriptFile: '<rootDir>/test/enzyme.ts',
  collectCoverageFrom: [
    'src/**/*.ts',
    'src/**/*.tsx',
    '!src/**/*.story.ts',
    '!src/**/*.story.tsx',
    '!**/webpack.config.*',
  ],
  coveragePathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/assets/',
    '<rootDir>/dist/',
    '/__snapshots__/',
  ],
  snapshotSerializers: [
    'enzyme-to-json/serializer',
  ],
  roots: [
    'src',
    'test',
  ],
};
