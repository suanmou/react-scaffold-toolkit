const OFF = 0
const WARN = 1
const ERROR = 2
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb',
    'airbnb/hooks',
    'plugin:react/recommended',
    'plugin:unicorn/recommended',
    'plugin:promise/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    // 8.0.0版本后已合并不同prettier,使用prietter即可
    // 'prettier/@typescript-eslint',
    // 'prettier/react',
    // 'prettier/unicorn',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.tsx', '.ts', '.js', '.json'],
      },
      typescript: {},
    },
  },
  plugins: ['react', 'unicorn', 'promise', '@typescript-eslint'],
  rules: {
    'import/extensions': [
      ERROR,
      'ignorePackages',
      {
        ts: 'never',
        tsx: 'never',
        js: 'never',
      },
    ],
    'import/prefer-default-export': OFF,
    'import/no-extraneous-dependencies': [ERROR, { devDependencies: true }], // 模块引入的检查 If set to false, then the rule will show an error when devDependencies are imported. Defaults to true
    'import/no-unresolved': ERROR,
    'unicorn/prevent-abbreviations': OFF, // 不校验是否为缩写单词
    'unicorn/better-regex': ERROR,
    'unicorn/filename-case': [
      ERROR,
      {
        cases: {
          // 中划线
          kebabCase: true,
          // 小驼峰
          camelCase: true,
          // 下划线
          snakeCase: false,
          // 大驼峰
          pascalCase: true,
        },
      },
    ],
    'unicorn/no-array-instanceof': WARN,
    'unicorn/no-for-loop': WARN, // 使用 for of 和 .entries 代替传统的 for 循环
    'unicorn/prefer-query-selector': ERROR,
    'unicorn/no-null': OFF,
    camelcase: [OFF, { properties: 'never' }],
    '@typescript-eslint/no-useless-constructor': ERROR,
    '@typescript-eslint/no-empty-function': WARN,
    '@typescript-eslint/explicit-function-return-type': OFF,
    '@typescript-eslint/explicit-module-boundary-types': OFF, // ts每个函数都要显式声明返回值
    '@typescript-eslint/no-explicit-any': OFF,
    '@typescript-eslint/no-use-before-define': OFF,
    '@typescript-eslint/no-var-requires': OFF, // 关闭对require语句不属于import校验
    'no-use-before-define': OFF,
    'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    'react/jsx-indent-props': [ERROR, 2],
    'react/jsx-indent': [ERROR, 2],
    'react/jsx-one-expression-per-line': OFF,
    'react/destructuring-assignment': OFF,
    'react/state-in-constructor': OFF,
    'react/jsx-props-no-spreading': OFF,
    'react/prop-types': OFF,
    'jsx-a11y/click-events-have-key-events': OFF,
    'jsx-a11y/no-noninteractive-element-interactions': OFF,
    'global-require': OFF,
    'no-console': OFF,
    'no-plusplus': OFF,
    'lines-between-class-members': [ERROR, 'always'],
    'class-methods-use-this': ERROR,
    quotes: [ERROR, 'single'],
    semi: [ERROR, 'never'],
  },
}
