// eslint.config.ts
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import importPlugin from "eslint-plugin-import";
import unusedImports from "eslint-plugin-unused-imports";
import sonarjs from "eslint-plugin-sonarjs";
import security from "eslint-plugin-security";
import prettier from "eslint-config-prettier/flat";
import unicorn from "eslint-plugin-unicorn";

const eslintConfig = defineConfig([
  // ── Base: Next.js + TS (recommended by Next) ──────────────────────────────
  ...nextVitals,
  ...nextTs,
  prettier,
  // ── Global ignores ────────────────────────────────────────────────────────
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "coverage/**",
    "next-env.d.ts",
    "node_modules/**",
    "public/**",
    "**/*.min.*",
    "*.config.{mjs,ts,js}",
    "**/generated/**", // لو عندك codegen
  ]),

  // ── Project-wide rules (SaaS-grade) ───────────────────────────────────────
  {
    plugins: {
      import: importPlugin,
      "unused-imports": unusedImports,
      sonarjs,
      security,
      unicorn,
    },

    rules: {
      // ── Naming conventions ─────────────────────────────────────
      "unicorn/filename-case": [
        "error",
        {
          cases: {
            kebabCase: true,
          },
          ignore: ["page.tsx", "layout.tsx", "loading.tsx", "error.tsx", "route.ts"],
        },
      ],
      "react/jsx-pascal-case": [
        "error",
        {
          allowAllCaps: false,
          ignore: [],
        },
      ],

      // ── TypeScript correctness ────────────────────────────────────────────
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/consistent-type-imports": "warn",
      "react/react-in-jsx-scope": "off",
      "react-hooks/exhaustive-deps": "warn",
      "@next/next/no-img-element": "error",
      "unused-imports/no-unused-imports": "error",
      "import/first": "error",
      "import/no-duplicates": "error",
      "import/newline-after-import": "error",
      "import/no-cycle": ["warn", { maxDepth: 2 }],
      "import/no-anonymous-default-export": "warn",

      // ── Bug-catching / Code smells ─────────────────────────────────────────
      "sonarjs/no-identical-functions": "warn",
      "sonarjs/no-inverted-boolean-check": "warn",
      "sonarjs/no-redundant-boolean": "warn",
      "sonarjs/cognitive-complexity": ["warn", 18],
      // ── Security heuristics ────────────────────────────────────────────────
      "security/detect-object-injection": "off",
      "security/detect-non-literal-fs-filename": "warn",
      "security/detect-possible-timing-attacks": "warn",
      "security/detect-child-process": "error",
      // ── General quality ────────────────────────────────────────────────────
      "no-console": ["warn", { allow: ["warn", "error", "info"] }],
      "prefer-const": "error",
      "no-var": "error",
      eqeqeq: ["error", "always"],
      "no-debugger": "error",
      "no-eval": "error",
    },
  },

  // ── Overrides: API routes / server code ───────────────────────────────────
  {
    files: ["**/app/api/**/*.{ts,tsx}", "**/pages/api/**/*.{ts,tsx}", "**/*.server.{ts,tsx}"],
    rules: {
      "no-console": ["warn", { allow: ["warn", "error", "info", "debug"] }],
    },
  },
  // ── Overrides: JS/MJS config files (no typed rules) ─────────────────────────
  {
    files: ["**/*.{js,cjs,mjs}"],
    rules: {
      "@typescript-eslint/no-floating-promises": "off",
      "@typescript-eslint/no-misused-promises": "off",
    },
  },
]);

export default eslintConfig;
