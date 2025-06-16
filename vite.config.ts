import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path, { resolve } from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@testing": path.resolve(__dirname, "src/testing"),
      "@core": path.resolve(__dirname, "src/core"),
      "@constants": path.resolve(__dirname, "src/constants"),
      "@assets": path.resolve(__dirname, "src/assets"),
      "@mocks": path.resolve(__dirname, "src/mocks"),
      "@hooks": path.resolve(__dirname, "src/shared/hooks"),
      "@contexts": path.resolve(__dirname, "src/shared/contexts"),
      "@components": path.resolve(__dirname, "src/shared/components"),
      "@utils": path.resolve(__dirname, "src/shared/utils"),
      "@models": path.resolve(__dirname, "src/core/models"),
      "@root": path.resolve(__dirname, "src/root"),
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        404: resolve(__dirname, "404.html"),
      },
    },
  },
});
