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
        { type: "app", pattern: "src/app/**" },
        { type: "pages", pattern: "src/pages/*/**" },
        { type: "widgets", pattern: "src/widgets/*/**" },
        { type: "features", pattern: "src/features/*/**" },
        { type: "entities", pattern: "src/entities/*/**" },
        { type: "shared", pattern: "src/shared/**" },
      ],
      "import/resolver": {
        typescript: {
          project: "./tsconfig.app.json",
        },
      },
    },

    rules: {
      "boundaries/dependencies": [
        "warn",
        {
          default: "disallow",

          rules: [
            // FSD layer direction
            {
              from: "app",
              allow: ["pages", "widgets", "features", "entities", "shared"],
            },
            {
              from: "pages",
              allow: ["widgets", "features", "entities", "shared"],
            },
            { from: "widgets", allow: ["features", "entities", "shared"] },
            { from: "features", allow: ["entities", "shared"] },
            { from: "entities", allow: ["shared"] },
            { from: "shared", allow: [] },
          ],
        },
      ],
    },
  },
];
