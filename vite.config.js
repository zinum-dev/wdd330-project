import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "src/",
  base: "/wdd330-project/",
  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        recipe: resolve(__dirname, "src/pages/recipe.html"),
        meal_plan: resolve(__dirname, "src/pages/meal-plan.html"),
      },
    },
  },
});
