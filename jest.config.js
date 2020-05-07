const path = require('path');
module.exports = {
  // preset: '@vue/cli-plugin-unit-jest',
  //覆盖情况目录
  coverageDirectory: '<rootDir>/tests/unit/coverage',
  //测试文件目录
  testMatch: [
    '<rootDir>/tests/unit/*.spec.js'
  ],
  //测试文件类型
  moduleFileExtensions: [
    'js',
    'json',
    'vue',
    'node'
  ],
  
  //语法转换器
  // transform: {
  //   '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
  //   '.*\\.(vue)$': '<rootDir>/node_modules/vue-jest'
  // },
  collectCoverageFrom: [
    'src/views/**/*.(js|vue)',
    '!src/main.js',
    '!src/router/index.js',
  ]
}
