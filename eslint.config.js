import neostandard from 'neostandard'
import pluginVue from 'eslint-plugin-vue'
import vueParser from 'vue-eslint-parser'
import tseslint from 'typescript-eslint'
import globals from 'globals'
import stylistic from '@stylistic/eslint-plugin'

export default [
  {
    ignores: [
      'dist/',
      'src-capacitor/',
      'src-cordova/',
      'src-tauri/',
      'android/',
      '.quasar/',
      'node_modules/',
      'docs/.vitepress/',
      'eslint.config.js',
      'quasar.config.*.temporary.compiled*'
    ]
  },

  // ESLint typescript rules
  ...tseslint.configs.recommended,

  // Base standard rules
  ...neostandard({ ts: true, noJsx: true }),

  // https://eslint.vuejs.org/rules/#available-rules
  // Priority B: Strongly Recommended (Improving Readability)
  ...pluginVue.configs['flat/strongly-recommended'],

  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tseslint.parser,
        extraFileExtensions: ['.vue']
      }
    }
  },

  {
    plugins: { '@stylistic': stylistic },
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        ga: 'readonly', // Google Analytics
        cordova: 'readonly',
        __statics: 'readonly',
        __QUASAR_SSR__: 'readonly',
        __QUASAR_SSR_SERVER__: 'readonly',
        __QUASAR_SSR_CLIENT__: 'readonly',
        __QUASAR_SSR_PWA__: 'readonly',
        process: 'readonly',
        Capacitor: 'readonly',
        chrome: 'readonly'
      }
    },

    rules: {
      // allow async-await
      '@stylistic/generator-star-spacing': 'off',
      // allow paren-less arrow functions
      '@stylistic/arrow-parens': 'off',
      'one-var': 'off',
      'no-void': 'off',
      '@stylistic/multiline-ternary': 'off',

      'prefer-promise-reject-errors': 'off',

      '@stylistic/quotes': ['warn', 'single', { avoidEscape: true }],

      // this rule, if on, would require explicit return type on the `render` function
      '@typescript-eslint/explicit-function-return-type': 'off',

      // in plain CommonJS modules, you can't use `import foo = require('foo')` to pass this rule, so it has to be disabled
      '@typescript-eslint/no-var-requires': 'off',

      // The core 'no-unused-vars' rules (in the eslint:recommended ruleset)
      // does not work with type definitions
      'no-unused-vars': 'off',

      '@stylistic/space-before-function-paren': 'off',
      'no-prototype-builtins': 'off',

      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-expressions': ['error', {
        allowShortCircuit: true,
        allowTernary: true,
        allowTaggedTemplates: true
      }],
      'no-redeclare': 'off',
      '@typescript-eslint/no-redeclare': 'error',

      // allow debugger during development only
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
    }
  }
]
