// Please don't modify this file, without first checking if it makes sense to
// adopt for most other Kapost projects. Instead, check with a tech lead.
// If the config should be shared, open a PR in the codeclimate-common repo
// at https://github.com/kapost/codeclimate-common and allow the leads to
// determine if and when to merge.

module.exports = {
  parser: "babel-eslint",
  extends: "airbnb",

  settings: {
    "import/resolver": {
      node: {
        // Resolves additional paths like NODE_PATH / test app-module-paths
        moduleDirectory: ["node_modules", "app", "test"],
      },
    },
    "import/extensions": [".js", ".jsx", ".json"],
  },

  env: {
    browser: true,
    node: true,
  },

  globals: {
    __CLIENT__: true,
    __SERVER__: true,
    __DEVELOPMENT__: true,
    __PRODUCTION__: true,
    __DEPLOY_ENV__: true,
    __PROJECT_ROOT__: true,
    __SERVER_LOG_LEVEL__: true,
    __RELATIVE_ROOT__: true,
    __DEVTOOLS__: true,
    Promise: true,
  },

  rules: {
    // We let the developer decide on whether to add arrow function braces or not, as it is a readability judgement.
    "arrow-body-style": "off",
    // We also let the developer decide when to add parens. This is nicer for flow with single-arity function chains.
    "arrow-parens": "off",
    // More reasonable comma-dangle config (only when we get a benefit in git diff). Functions are a bit ugly so we ignore comma dangle
    // (allowing the developer to determine readability).
    "comma-dangle": [
      "error",
      {
        "arrays": "always-multiline",
        "objects": "always-multiline",
        "imports": "always-multiline",
        "exports": "always-multiline",
        "functions": "ignore",
      }
    ],
    // We are stricter with complexity
    "complexity": ["error", 6],
    // There are enough cases where this is more annoying than helpful (React components)
    "consistent-return": "off",
    // We allow the developer to decide what is best for readability, only looking for consistency
    "function-paren-newline": ["error", "consistent"],
    // Adjust extension warnings, allowing json to be imported.
    "import/extensions": ["error", "always", {
      js: "never",
      jsx: "never",
      json: "never",
    }],
    // We adjust the import order to be enforced by "import/order" rather than "import/first".
    // This allows use to be more particular in order and autofix when possible.
    "import/first": ["error", { "absolute-first": false }],
    // We should be using es2015 imports in all modern .js and .jsx files
    "import/no-commonjs": "error",
    // We expect imports to be sorted by the convention we have been keeping to in the weeds.
    "import/order": ["warn", {
      "groups": ["builtin", "external", "internal", "parent", "sibling"],
      "newlines-between": "always-and-inside-groups",
    }],
    // We turn on max lines
    "max-lines": ["error", {
      max: 300,
      skipBlankLines: true,
      skipComments: true
    }],
    // We turn on max nested callbacks
    "max-nested-callbacks": ["error", 3],
    // Disallow undefined used as a keyword
    "no-undefined": "error",
    // Keep the same dangle rules but ignore globals provided by webpack/node
    "no-underscore-dangle": ["error", {
      allow: [
        "__CLIENT__",
        "__SERVER__",
        "__DEVELOPMENT__",
        "__PRODUCTION__",
        "__DEPLOY_ENV__",
        "__PROJECT_ROOT__",
        "__SERVER_LOG_LEVEL__",
        "__RELATIVE_ROOT__",
        "__DEVTOOLS__",
      ],
    }],
    // We extend the config to allow underscore ignore style
    "no-unused-vars": ["error", { vars: "all", args: "all", argsIgnorePattern: "^_" }],
    // We allow the developer to decide what is best for readability, only looking for consistency
    "object-curly-newline": ["error", { "consistent": true }],
    // We don't require array destructuring like airbnb
    "prefer-destructuring": ["error", {
      VariableDeclarator: {
        array: false,
        object: true,
      },
      AssignmentExpression: {
        array: false,
        object: true,
      },
    }, {
      enforceForRenamedProperties: false,
    }],
    // We stick with double quotes to be consistent with ruby and keep to our muscle memory
    "quotes": ["error", "double", { "avoidEscape": true }],
    // We do not care if react is within .js or .jsx extensions, unlike airbnb.
    "react/jsx-filename-extension": ["error", { extensions: [".js", ".jsx"] }],
    // While this rule would be nice--it doesn't work correctly right now.
    // See https://github.com/yannickcr/eslint-plugin-react/issues/1389 and
    // https://github.com/yannickcr/eslint-plugin-react/issues/1607.
    // NB: I took a stab at fixing this in the plugin, and am pretty sure it is not possible to
    // follow the propType variables without building a full JS interpreter inside the linter.
    "react/no-typos": ["off"],
    // Consistent component style is valuable.
    "react/prefer-stateless-function": ["off"],
    // We ignore children as it's up to the developer to validate when not an element.
    "react/prop-types": ["error", { ignore: ["children"] }],
    // OPINIONATED: we define the sort order we have kept to in the weeds, Shared UI, and other packages.
    // It prefers a "read top-to-bottom style".
    "react/sort-comp": [
      "warn",
      {
        order: [
          "static-methods",
          "lifecycle",
          "render",
          "/^render.+$/",
          "/^handle.+$/",
          "everything-else",
        ],
      }
    ],
    // We prefer no spaces as we already warn with function declaration without names.
    "space-before-function-paren": ["error", {
      "anonymous": "never",
      "named": "never",
      "asyncArrow": "always",
    }],
  },

  overrides: [
    {
     files: ["**/*Reducer.js", "**/reducers/**"],
     rules: {
       // Reducers frequently have many switch/case returns which drive up
       // complexity. Refactoring this often leads to reduced readability, so
       // we bump up the value. If over 20 conditions, it's usually a good sign
       // we need to refactor to a couple functions, an event mapping,
       // or break up the state.
       "complexity": ["error", 20],
      },
    },
    {
      files: ["**/*Spec.js", "**/specs/**", "**/test/**"],

      env: {
        browser: true,
        node: true,
        mocha: true,
      },

      globals: {
        expect: true,       // specHelper
        context: true,      // specHelper
        chai: true,         // specHelper
        browser: true,      // webdriverio
        $: true,            // webdriverio
        $$: true,           // webdriverio
      },

      rules: {
        // We frequently use the `function` keyword for dynamic scope and do not need names on it
        "func-names": "off",
        // We do not want warnings on importing dev deps here, as that is fine in specs
        "import/no-extraneous-dependencies": "off",
        // We frequently use the `function` keyword for dynamic scope and should not prefer arrows
        "prefer-arrow-callback": "off",
        // Boost the line count for tests. After 500, it's reasonable to expect splitting apart specs.
        "max-lines": ["error", {
          max: 500,
          skipBlankLines: true,
          skipComments: true
        }],
        // Should have no limits on callbacks in specs
        "max-nested-callbacks": "off",
        // Same for statements
        "max-statements": "off",
        // Chai matchers sometimes use properties as checks rather than function calls
        "no-unused-expressions": "off",
        // It's ok to use `undefined` for tests (i.e. initial reducer state)
        "no-undefined": "off",
      }
    }
  ]
};
