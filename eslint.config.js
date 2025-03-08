import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config({
	extends: [js.configs.recommended, ...tseslint.configs.recommended],
	files: ["**/*.{ts,tsx}"],
	ignores: ["dist"],
	languageOptions: {
		ecmaVersion: 2020,
		globals: globals.browser,
	},
	plugins: {
		"react-hooks": reactHooks,
		"react-refresh": reactRefresh,
	},
	settings: {
		"import/resolver": {
			typescript: {
				alwaysTryTypes: true, // Always try to resolve types under `@types` directory even it doesn't contain any source code, like `@types/unist`
			},
		},
	},
	rules: {
		...reactHooks.configs.recommended.rules,
		"react-refresh/only-export-components": [
			"warn",
			{ allowConstantExport: true },
		],
		"import/no-restricted-paths": [
			"error",
			{
				zones: [
					// disables cross-feature imports:
					// eg. src/features/discussions should not import from src/features/comments, etc.
					{
						target: "./src/features/background",
						from: "./src/features",
						except: ["./background"],
					},
					{
						target: "./src/features/countdown",
						from: "./src/features",
						except: ["./countdown"],
					},
					{
						target: "./src/features/menu",
						from: "./src/menu",
						except: ["./menu"],
					},
					{
						target: "./src/features/music",
						from: "./src/features",
						except: ["./music"],
					},
					{
						target: "./src/features/users",
						from: "./src/features",
						except: ["./users"],
					},

					// More restrictions...
				],
			},
		],
	},
});
