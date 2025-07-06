import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const isProduction = mode === 'production';

  if (isProduction) {
    // 生产环境构建为 UMD 格式供 qiankun 2.7.2 使用
    return {
      plugins: [react(), tsconfigPaths()],
      base: "/",
      build: {
        target: "es2015",
        lib: {
          name: "heorui-app", // 与主应用注册的名称一致
          entry: "./src/main.tsx",
          formats: ["umd"],
          fileName: () => "heorui-app.js", // 确保生成 .js 文件
        },
        rollupOptions: {
          external: ["react", "react-dom"],
          output: {
            globals: {
              react: "React",
              "react-dom": "ReactDOM",
            },
            format: "umd",
            name: "heorui-app",
            inlineDynamicImports: true,
            // 确保导出正确的生命周期函数
            exports: "named",
          },
        },
        cssCodeSplit: false,
        sourcemap: false,
        outDir: "dist",
        minify: false,
      },
      define: {
        'process.env.NODE_ENV': JSON.stringify('production'),
      },
    };
  }

  // 开发环境配置 - 兼容 qiankun 2.7.2
  return {
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
    build: {
      target: "es2015",
      rollupOptions: {
        external: ["react", "react-dom"],
        output: {
          globals: {
            react: "React",
            "react-dom": "ReactDOM",
          },
        },
      },
    },
    define: {
      'process.env.NODE_ENV': JSON.stringify('development'),
      // 确保在开发环境下也能正确识别 qiankun 环境
      '__QIANKUN_DEVELOPMENT__': true,
    },
  };
});
