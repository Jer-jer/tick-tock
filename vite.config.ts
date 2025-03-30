import { defineConfig } from "vite";
import inject from "@rollup/plugin-inject";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		inject({
			$: "jquery",
			jQuery: "jquery",
		}),
		tsconfigPaths(),
		react(),
	],
});
