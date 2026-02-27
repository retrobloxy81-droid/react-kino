/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [
    "eslint:recommended",
  ],
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  rules: {
    "no-console": "warn",
  },
};
