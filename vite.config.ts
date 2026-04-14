import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

const ReactCompilerConfig = {
    /* ... */
};

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react({
            babel: {
                plugins: [["babel-plugin-react-compiler", ReactCompilerConfig]],
            },
        }),
    ],
    base: "./",
    build: {
        assetsDir: "./",
        assetsInlineLimit: 0,
        minify: true,
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
            "#": path.resolve(__dirname, "./"),
        },
    },
});
