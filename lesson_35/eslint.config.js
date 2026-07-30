// module.exports = {
//   env: {
//     browser: true,
//     es2021: true,
//     node: true,
//   },
//   extends: ["eslint:recommended"],
//   parseOptions: {
//     ecmaVersion: "latest",
//     sourceType: "module",
//   },
//   rules: {
//     "no-console": "warn",
//     "no-unused-vars": "warn",
//     "prefer-const": "error",
//     "no-var": "error",
//   },
// };
module.exports = {
  extends: "eslint:recommended",
  rules: {
    semi: ["warn", "always"],
  },
};
