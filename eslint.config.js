import tsParser from "@typescript-eslint/parser";
import boundaries from "eslint-plugin-boundaries";

export default [
  {
    files: ["src/**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.app.json",
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      boundaries,
    },

    settings: {
      "boundaries/root-path": import.meta.dirname,
      "boundaries/elements": [
        { type: "app", category: "app", pattern: "src/app" },

        {
          type: "slice",
          category: "pages",
          pattern: "src/pages/*",
          capture: ["slice"],
        },
        {
          type: "slice",
          category: "widgets",
          pattern: "src/widgets/*",
          capture: ["slice"],
        },
        {
          type: "slice",
          category: "features",
          pattern: "src/features/*",
          capture: ["slice"],
        },
        {
          type: "slice",
          category: "entities",
          pattern: "src/entities/*",
          capture: ["slice"],
        },

        { type: "shared", category: "shared", pattern: "src/shared/**" },
      ],
      "import/resolver": {
        typescript: {
          project: "./tsconfig.app.json",
        },
      },
    },

    rules: {
      "boundaries/dependencies": [
        "error",
        {
          default: "disallow",
          message:
            "{{from.category}} is not allowed to depend on {{to.category}}",
          rules: [
            // 1) Allow imports inside the same slice only
            {
              allow: {
                dependency: {
                  relationship: {
                    to: "internal",
                  },
                },
              },
            },

            // 2) Layer rules by category
            {
              from: { category: "app" },
              allow: {
                to: [
                  { category: "pages" },
                  { category: "widgets" },
                  { category: "features" },
                  { category: "entities" },
                  { category: "shared" },
                ],
              },
            },
            {
              from: { category: "pages" },
              allow: {
                to: [
                  { category: "widgets" },
                  { category: "features" },
                  { category: "entities" },
                  { category: "shared" },
                ],
              },
            },
            {
              from: { category: "widgets" },
              allow: {
                to: [
                  { category: "features" },
                  { category: "entities" },
                  { category: "shared" },
                ],
              },
            },
            {
              from: { category: "features" },
              allow: {
                to: [{ category: "entities" }, { category: "shared" }],
              },
            },
            {
              from: { category: "entities" },
              allow: {
                to: [{ category: "shared" }],
              },
            },
            {
              from: { category: "shared" },
              allow: { to: [] },
            },
          ],
        },
      ],
    },
  },
];
