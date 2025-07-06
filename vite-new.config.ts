import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const isProduction = mode === 'production';

  const baseConfig = {
    plugins: [react(), tsconfigPaths()],
    server: {
      port: 8989, // 与主应用期望的端口一致
      cors: true,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization, Cache-Control",
      },
    },
    base: "/",
    define: {
      'process.env.NODE_ENV': JSON.stringify(mode),
    },
  };

  if (isProduction) {
    // 生产环境构建为 UMD 格式供 qiankun 2.7.2 使用
    return {
      ...baseConfig,
      build: {
        target: "es2015",
        lib: {
          name: "heroui-app", // 修正：与主应用注册的名称一致 (heroui-app 不是 heorui-app)
          entry: "./src/main.tsx",
          formats: ["umd"],
          fileName: () => "heroui-app.js", // 修正文件名
        },
        rollupOptions: {
          external: ["react", "react-dom"],
          output: {
            globals: {
              react: "React",
              "react-dom": "ReactDOM",
            },
            format: "umd",
            name: "heroui-app", // 修正全局变量名
            inlineDynamicImports: true,
          },
        },
        cssCodeSplit: false,
        sourcemap: false,
        outDir: "dist",
        minify: false,
      },
    };
  }

  // 开发环境配置
  return baseConfig;
});
