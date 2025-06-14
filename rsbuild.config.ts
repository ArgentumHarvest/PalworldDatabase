import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [pluginReact()],
  server: {
    port: 5677,
  },
  html: {
    title: "帕鲁百科",
    tags: [
      {
        tag: "html",
        attrs: {
          // 给html添加lang=zh-CN属性
          lang: "zh-CN",
        },
      },
      {
        tag: "meta",
        attrs: {
          // 给meta添加charset=utf-8属性
          "http-equiv": "Content-Security-Policy",
          content: "script-src 'self'; object-src 'none'",
        },
      },
      {
        tag: "link",
        attrs: { href: "/font/iconfont.css", rel: "stylesheet" },
        head: true,
        append: true,
        publicPath: true,
        hash: true,
      },
    ],
  },
  source: {
    entry: {
      // 指定入口文件
      index: "./src/renderer/index.tsx",
      status: "./src/renderer/diy_status/root.tsx",
    },
  },
  output: {
    distPath: {
      // 指定输出目录
      root: "dist/web",
    },
    // 指定资源路径前缀
    assetPrefix: "./",
  },
  resolve: {
    // 配置别名
    alias: {
      "@": path.resolve(__dirname, "./src/renderer"),
      "@mobx": path.resolve(__dirname, "./src/renderer/mobx"),
      "@global": path.resolve(__dirname, "./src/renderer/global"),
    },
  },
});
