module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true
  },
  extends: [
    'standard-with-typescript'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    target: "es6",
    module: "esnext",
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
    extraFileExtensions: ['.svelte']
  },
  plugins: ['svelte3', '@typescript-eslint', 'import'],
  overrides: [
    {
      files: ['*.svelte'],
      processor: 'svelte3/svelte3'
    }
  ],
  // https://github.com/sveltejs/eslint-plugin-svelte3/blob/master/OTHER_PLUGINS.md#eslint-plugin-import    
  rules: {
    'import/first': 'off',
    'import/no-duplicates': 'off',
    'import/no-mutable-exports': 'off',
    'import/no-unresolved': 'off',
    'no-multiple-empty-lines': 'off',
    'no-undef-init': 'off',
    'no-use-before-define': 'off'
  },
  settings: {
    'svelte3/typescript': require('typescript'),
    // Ignore styles since SASS preprocessor is not supported in svelte plugin: https://github.com/sveltejs/eslint-plugin-svelte3/issues/10
    'svelte3/ignore-styles': () => true
  }
}
