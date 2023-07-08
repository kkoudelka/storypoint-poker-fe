const config = {
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "jsx-a11y", "import"],
  extends: [
    "next/core-web-vitals",
    "plugin:react/recommended", // Uses the recommended rules from @eslint-plugin-react
    "plugin:@typescript-eslint/recommended", // Uses the recommended rules from @typescript-eslint/eslint-plugin
    "plugin:jsx-a11y/strict", // Uses strict rules from jsx-a11y
    "plugin:prettier/recommended",
    "plugin:react-hooks/recommended",
    "prettier/prettier",
  ],
  rules: {
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/no-unused-vars": ["error", { varsIgnorePattern: "_+" }],
    "import/order": ["error"],
    "no-console": "warn",
    curly: ["error", "all"],
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "error",
    "react/jsx-curly-brace-presence": ["error", "never"],
    "react/self-closing-comp": ["error", { component: true, html: true }],
    "no-restricted-imports": [
      "error",
      {
        patterns: [
          {
            group: ["@mui/*/*/*"],
            message:
              "Please import from @mui/material/<module>. Example: import Box, { type BoxProps } from '@mui/material/Box'",
          },
        ],
      },
    ],
  },
};

module.exports = config;
