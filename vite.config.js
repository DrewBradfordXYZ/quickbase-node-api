import { defineConfig } from "vite";
import { resolve } from "path";
import dts from "vite-plugin-dts";
import { dependencies } from "./package.json";

console.log(resolve(__dirname, "src/index.ts"));
export default defineConfig({
  plugins: [
    dts({
      outputDir: "dist",
      rollupTypes: true,
    }),
  ],
  build: {
    outDir: "dist",
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "quickbase-node-api",
      fileName: (format) => `quickbase-node-api.${format}.js`,
      formats: ["es"],
    },
    rollupOptions: {
      output: {
        format: "es",
      },
      // Exclude all dependencies from the bundle
      external: Object.keys(dependencies),
    },
  },
});
