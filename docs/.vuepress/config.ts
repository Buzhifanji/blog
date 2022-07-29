import { searchPlugin } from "@vuepress/plugin-search";
import { defineUserConfig } from "vuepress";
import theme from "./theme";

export default defineUserConfig({
  lang: "zh-CN",
  title: "Buzhifanji",
  description: "Buzhifanji博客",
  theme,
  base: "/blog/",
  plugins: [
    searchPlugin({
      // 你的选项
    }),
  ],
});
