import { defineConfig } from "eslint/config";
import drizzle from 'eslint-plugin-drizzle';

export default defineConfig([
	{
    plugins: {
      drizzle,
    },
    rules: {
      ...drizzle.configs.recommended.rules,
    },
	},
]);
